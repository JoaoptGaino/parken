import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateParkingSpotDto {
  @Exclude()
  id?: string;

  @IsOptional()
  @IsString({
    message: "'identification' must be a string",
  })
  identification?: string;
}
