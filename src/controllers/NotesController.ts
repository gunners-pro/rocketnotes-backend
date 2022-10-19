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
}

export { NotesController };
