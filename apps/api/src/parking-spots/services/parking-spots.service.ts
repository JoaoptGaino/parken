import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPaginationQueryData } from 'src/common/pagination-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateParkingSpotDto } from '../dto/create-parking-spot.dto';
import { FindAllParkingSpotsDto } from '../dto/find-all-parking-spots.dto';
import { UpdateParkingSpotDto } from '../dto/update-parking-spot.dto';
import { ParkingSpotEntity } from '../entities/parking-spot.entity';

@Injectable()
export class ParkingSpotsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateParkingSpotDto) {
    const parkingSpot = await this.prismaService.parkingSpot.create({
      data,
    });

    return new ParkingSpotEntity(parkingSpot);
  }

  async findAll({ identification, ...query }: FindAllParkingSpotsDto) {
    const where: Prisma.ParkingSpotWhereInput = {
      identification: { contains: identification, mode: 'insensitive' },
    };

    const totalCount = await this.prismaService.parkingSpot.count({ where });

    const parkingSpots = await this.prismaService.parkingSpot.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
      include: { Receipt: true },
    });

    const entities = parkingSpots.map(
      (parkingSpot) => new ParkingSpotEntity(parkingSpot),
    );

    return {
      totalCount,
      entities,
    };
  }

  async findOne(id: string) {
    const parkingSpot = await this.prismaService.parkingSpot.findUnique({
      where: { id },
      include: { Receipt: true },
    });

    if (!parkingSpot) {
      throw new NotFoundException(`Parking Spot with id ${id} not found`);
    }

    return new ParkingSpotEntity(parkingSpot);
  }

  async update(id: string, data: UpdateParkingSpotDto) {
    const updatedParkingSpot = await this.prismaService.parkingSpot.update({
      where: { id },
      data,
    });

    return new ParkingSpotEntity(updatedParkingSpot);
  }

  remove(id: string) {
    return this.prismaService.parkingSpot.delete({ where: { id } });
  }

  async findAvailableParkingSpots() {
    const parkingSpot = await this.prismaService.parkingSpot.findFirst({
      where: { available: true },
      select: { id: true, available: true },
    });

    if (!parkingSpot) {
      throw new NotFoundException('No parking spot available!');
    }

    const { id, available } = parkingSpot;
    await this.changeAvailableStatus(id, available);

    return parkingSpot.id;
  }

  changeAvailableStatus(id: string, currentStatus: boolean) {
    return this.prismaService.parkingSpot.update({
      where: { id },
      data: { available: !currentStatus },
    });
  }
}
