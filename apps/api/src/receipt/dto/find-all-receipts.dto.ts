import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class FindAllReceiptsDto extends PaginationQueryDto<Prisma.ReceiptOrderByWithRelationInput> {
  @IsOptional()
  @IsUUID('4', { message: "'parkingSpotId' must be a UUIDv4" })
  parkingSpotId?: string;

  @IsOptional()
  @IsNumber({}, { message: "'totalValue' must be a number" })
  @Type(() => Number)
  totalValue?: number;
}
