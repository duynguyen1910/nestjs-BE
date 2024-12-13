import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { LoggerService } from './logger.service';

export abstract class BaseService<
  T extends BaseEntity,
  R extends Repository<T>,
> {
  private readonly repository!: R;
  private readonly loggerService: LoggerService;
  protected readonly DEFAULT_TAKE = 50;

  constructor(repository: R, loggerService?: LoggerService) {
    this.repository = repository;
    this.loggerService = loggerService || new LoggerService();
  }

  protected async _find(
    options: {
      where?: FindOptionsWhere<T>;
      relations?: string[];
      take?: number;
      skip?: number;
      order?: FindOptionsOrder<T>;
    } = {},
  ): Promise<T[]> {
    const {
      where = {},
      relations = [],
      take = this.DEFAULT_TAKE,
      skip,
      order,
    } = options;

    const findOptions: FindManyOptions<T> = {
      where,
      relations: relations as unknown as FindOptionsRelations<T>,
      take,
      skip,
      order,
    };

    try {
      return this.repository.find(findOptions);
    } catch (error) {
      this.loggerService.error('Error executing _find', error.stack);
    }
  }

  protected async _findOne(options: {
    where?: FindOptionsWhere<T>;
    relations?: string[];
    order?: FindOptionsOrder<T>;
  }): Promise<T | null> {
    const { where = {}, relations, order } = options;

    const findOptions: FindOneOptions<T> = {
      where,
      relations: relations as unknown as FindOptionsRelations<T>,
      order,
    };

    try {
      return await this.repository.findOne(findOptions);
    } catch (error) {
      this.loggerService.error('Error executing _findOne', error.stack);
    }
  }

  protected async _findByIds(field: keyof T, ids: string[]): Promise<T[]> {
    const where: FindOptionsWhere<T> = {
      [field]: In(ids),
    } as FindOptionsWhere<T>;

    try {
      return this.repository.find({ where });
    } catch (error) {
      this.loggerService.error('Error executing __findByIds', error.stack);
    }
  }

  protected async _create(data: DeepPartial<T>): Promise<T> {
    try {
      return this.repository.create(data);
    } catch (error) {
      this.loggerService.error('Error creating entity', error.stack);
      throw new Error('Failed to create entity');
    }
  }

  // Overload signatures
  protected async _save(data: DeepPartial<T>): Promise<T>;
  protected async _save(data: DeepPartial<T>[]): Promise<T[]>;
  // Implementation
  protected async _save(
    data: DeepPartial<T> | DeepPartial<T>[],
  ): Promise<T | T[]> {
    try {
      const dataToSave = Array.isArray(data) ? data : [data];
      const savedData = await this.repository.save(dataToSave);

      return Array.isArray(data) ? savedData : savedData[0];
    } catch (error) {
      this.loggerService.error('Error saving entity', error.stack);
      throw new Error('Failed to save entity');
    }
  }
}
