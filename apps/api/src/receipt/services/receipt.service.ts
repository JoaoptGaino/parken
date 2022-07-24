import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPaginationQueryData } from 'src/common/pagination-query.dto';
import { ParkingSpotsService } from 'src/parking-spots/services/parking-spots.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllReceiptsDto } from '../dto/find-all-receipts.dto';
import { ReceiptEntity } from '../entities/receipt.entity';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly parkingSpotService: ParkingSpotsService,
  ) {}

  async checkIn() {
    const parkingSpotId =
      await this.parkingSpotService.findAvailableParkingSpots();

    const receipt = await this.prismaService.receipt.create({
      data: {
        parkingSpotId,
      },
    });

    return receipt;
  }

  async checkOut(id: string) {
    const checkOutDate = new Date();
    const receipt = await this.findOne(id);

    const totalValue = this.getTotalValue(receipt, checkOutDate);

    const checkout = await this.prismaService.receipt.update({
      where: { id },
      data: {
        checkOut: checkOutDate,
        totalValue,
      },
      include: {
        ParkingSpot: true,
      },
    });

    await this.parkingSpotService.changeAvailableStatus(
      checkout.ParkingSpot.id,
      checkout.ParkingSpot.available,
    );

    return new ReceiptEntity(checkout);
  }

  async findAll({ parkingSpotId, totalValue, ...query }: FindAllReceiptsDto) {
    const where: Prisma.ReceiptWhereInput = {
      totalValue: totalValue && Number(totalValue),
      parkingSpotId,
    };

    const totalCount = await this.prismaService.receipt.count({ where });

    const receipts = await this.prismaService.receipt.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
      include: {
        ParkingSpot: true,
      },
    });

    const entities = receipts.map((receipt) => new ReceiptEntity(receipt));

    return {
      totalCount,
      entities,
    };
  }

  async findOne(id: string) {
    const receipt = await this.prismaService.receipt.findUnique({
      where: { id },
      include: {
        ParkingSpot: true,
      },
    });

    if (!receipt) {
      throw new NotFoundException({
        message: 'Receipt not found',
      });
    }

    return new ReceiptEntity(receipt);
  }

  getTotalValue(receipt: ReceiptEntity, checkoutDate: Date) {
    const timeInSpot =
      Math.abs(checkoutDate.getTime() - receipt.checkIn.getTime()) / 36e5;

    return (5 + timeInSpot * 8).toFixed(2);
  }

  async findAllByDay(day: number) {
    const receipts = await this.prismaService.receipt.findMany();

    const total = receipts.reduce((accumulator, receipt) => {
      if (receipt.checkOut) {
        if (receipt?.checkOut.getDate() === Number(day)) {
          accumulator += Number(receipt.totalValue);
        }
      }
      return accumulator;
    }, 0);

    return {
      totalReceipts: receipts.length,
      total,
    };
  }
}
