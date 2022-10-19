import { Request, Response } from 'express';

import { database } from '../database';
import { Note } from '../models/Note';

interface INote {
  title: string;
  description: string;
  tags: string[];
  links: string[];
}

class NotesController {
  async create(request: Request, response: Response) {
    const { title, description, tags, links } = request.body as INote;
    const { user_id } = request.params;

    const note_id = await database<Note>('notes').insert({
      title,
      description,
      user_id: Number(user_id),
    });

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link,
      };
    });

    await database('links').insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await database('tags').insert(tagsInsert);

    response.json();
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const note = await database<Note>('notes')
      .where({ id: Number(id) })
      .first();

    const tags = await database('tags').where({ note_id: id }).orderBy('name');
    const links = await database('links')
      .where({ note_id: id })
      .orderBy('created_at');

    return response.json({ ...note, tags, links });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await database('notes').where({ id }).delete();

    return response.json();
  }

  async index(request: Request, response: Response) {
    const { user_id, title, tags } = request.query;
    let notes;

    if (tags) {
      const filterTags = String(tags)
        .split(',')
        .map(tag => tag.trim());

      notes = await database('tags')
        .select(['notes.id', 'notes.title', 'notes.user_id'])
        .where('notes.user_id', '=', Number(user_id))
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title');
    } else {
      notes = await database<Note>('notes')
        .where({
          user_id: Number(user_id),
        })
        .whereLike('title', `%${title}%`)
        .orderBy('title');
    }

    const userTags = await database('tags').where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
  }
}

export { NotesController };
