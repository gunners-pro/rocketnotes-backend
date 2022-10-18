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
}

export { NotesController };
