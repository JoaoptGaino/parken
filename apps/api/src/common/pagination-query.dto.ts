import { Exclude, Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional } from 'class-validator';

export function getPaginationQueryData<T>(
  paginationQueryDto: PaginationQueryDto<T>,
) {
  return {
    take: paginationQueryDto.take ?? paginationQueryDto.limit,
    skip: paginationQueryDto.skip,
    orderBy: paginationQueryDto.sort,
  };
}

export abstract class PaginationQueryDto<T> {
  @IsOptional()
  @IsInt({
    message: "'skip' must be a number",
  })
  @Type(() => Number)
  skip?: number;

  @IsOptional()
  @IsInt({
    message: "'take' must be a number",
  })
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsInt({
    message: "'limit' must be a number",
  })
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsObject({
    message: "'sort' sort must be an object",
  })
  sort?: T;

  @Exclude()
  page?: number;
}
