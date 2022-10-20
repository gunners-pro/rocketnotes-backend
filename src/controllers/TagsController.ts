import { Request, Response } from 'express';

import { database } from '../database';

class TagsController {
  async index(request: Request, response: Response) {
    const { user_id } = request.params;

    const tags = await database('tags').where({ user_id });

    return response.json(tags);
  }
}

export { TagsController };
