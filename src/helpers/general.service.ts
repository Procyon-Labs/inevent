import { Document, FilterQuery, Model } from 'mongoose';
import { PaginateModel } from '../interfaces';
// import { UserModel } from '../models';

export class GeneralService<T extends Document> {
  private model: PaginateModel<T>;
  constructor(private readonly _model: any) {
    this.model = _model;
  }

  registerModels = async () => {
    // await UserModel.findOne();
    console.log('Registering user model');
  };

  create = async (body: Partial<T>) => {
    return await this.model.create(body);
  };

  // getAll = async (pagination: number, searchDetails: object = {}): Promise<T[]> => {
  //   return await this.model.find(searchDetails)
  //     .limit(10)
  //     .skip(pagination)
  //     .sort({ updatedAt: 'desc' })
  //     .select('-__v');
  // };

  async getAllWithPagination(filter: any) {
    const page = filter.pagination_page ?? 1;
    const size = filter.pagination_size ?? 10;

    delete filter.pagination_page;
    delete filter.pagination_size;

    const data = await this.model.paginate(filter, { limit: size, page: page });

    return data;
  }

  update = async (searchDetails: object, update: object) => {
    return await this.model
      .findOneAndUpdate({ ...searchDetails }, update, {
        new: true,
      })
      .select('-__v');
  };

  find = async (searchData: object) => {
    return await this.model
      .find({ ...searchData })
      .sort({ updatedAt: 'desc' })
      .select('-__v');
  };

  findOne = async (searchData: object) => {
    return this.model
      .findOne({ ...searchData })
      .sort({ updatedAt: 'desc' })
      .select('-__v');
  };

  softDelete = async (searchParams: object): Promise<T> => {
    return await this.model
      .findOneAndUpdate(
        { ...searchParams /*deleted: false*/ },
        { deleted: true },
        {
          new: true,
        }
      )
      .select('-__v');
  };

  hardDelete = async (searchParams: any): Promise<T> => {
    return await this.model.findOneAndDelete(searchParams).select('-__v');
  };
}
