import { Document, Model } from 'mongoose';
import { GeneralService } from './general.service';
import { MESSAGES } from '../configs';
import { Request, Response } from 'express';
import {
  SuccessResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponseWithPagination,
} from '../utils';

export class GeneralController<T extends Document> {
  public generalService: GeneralService<T>;

  constructor(model: Model<any>) {
    this.generalService = new GeneralService<T>(model);
    this.create = this.create.bind(this);
    // this.delete = this.delete.bind(this);
    this.find = this.find.bind(this);
    this.getAllWithPagination = this.getAllWithPagination.bind(this);
    this.hardDelete = this.hardDelete.bind(this);
    this.update = this.update.bind(this);
  }

  async create(req: Request, res: Response) {
    // await this.generalService.registerModels();

    const data = await this.generalService.create(req.body);
    if (!data) return InternalErrorResponse(res);

    return SuccessResponse(res, data);
  }

  async getAllWithPagination(req: Request, res: Response) {
    const data = await this.generalService.getAllWithPagination(req.query as any);
    if (!data) return InternalErrorResponse(res);
    if (data.data.length === 0) return NotFoundResponse(res);

    return SuccessResponseWithPagination(res, data.data, data.pagination);
  }

  async find(req: Request, res: Response) {
    const data = await this.generalService.find(req.query);
    if (!data) return InternalErrorResponse(res);
    if (data.length === 0) return NotFoundResponse(res);

    return SuccessResponse(res, data);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.generalService.update({ _id: id }, req.body);
    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.UPDATED);
  }

  // async delete(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const data = await this.generalService.softDelete({ _id: id });
  //   if (!data) return NotFoundResponse(res);

  //   return SuccessResponse(res, data, MESSAGES.DELETED);
  // }

  // Admins only
  async hardDelete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this.generalService.hardDelete({ _id: id });
    if (!data) return NotFoundResponse(res);

    return SuccessResponse(res, data, MESSAGES.DELETED);
  }
}
