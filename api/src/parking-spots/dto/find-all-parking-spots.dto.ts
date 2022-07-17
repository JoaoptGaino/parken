import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class FindAllParkingSpotsDto extends PaginationQueryDto<Prisma.ParkingSpotOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'identification' must be a string" })
  identification?: string;
}
