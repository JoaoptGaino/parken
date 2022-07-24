import { IsNotEmpty, IsString } from 'class-validator';

export class CreateParkingSpotDto {
  @IsNotEmpty({
    message: 'Identification is required',
  })
  @IsString({
    message: "'identification' must be a string",
  })
  identification: string;
}
