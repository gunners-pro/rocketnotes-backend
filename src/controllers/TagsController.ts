import { Request, Response } from 'express';

import { database } from '../database';

class TagsController {
  async index(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const tags = await database('tags').where({ user_id });

    return response.json(tags);
  }
}

export { TagsController };
