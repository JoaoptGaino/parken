import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ParkingSpotsService } from '../services/parking-spots.service';
import { CreateParkingSpotDto } from '../dto/create-parking-spot.dto';
import { UpdateParkingSpotDto } from '../dto/update-parking-spot.dto';
import { FindAllParkingSpotsDto } from '../dto/find-all-parking-spots.dto';

@Controller('parking-spots')
export class ParkingSpotsController {
  constructor(private readonly parkingSpotsService: ParkingSpotsService) {}

  @Post()
  create(@Body() createParkingSpotDto: CreateParkingSpotDto) {
    return this.parkingSpotsService.create(createParkingSpotDto);
  }

  @Get()
  findAll(@Query() query: FindAllParkingSpotsDto) {
    return this.parkingSpotsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingSpotsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParkingSpotDto: UpdateParkingSpotDto,
  ) {
    return this.parkingSpotsService.update(id, updateParkingSpotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingSpotsService.remove(id);
  }
}
