import { Injectable, NotFoundException } from '@nestjs/common';
import { ParkingSpotsService } from 'src/parking-spots/services/parking-spots.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';
import { ReceiptEntity } from '../entities/receipt.entity';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly parkingSpotService: ParkingSpotsService,
  ) {}

  async checkIn() {
    const available = await this.parkingSpotService.findAvailableParkingSpots();

    const receipt = await this.prismaService.receipt.create({
      data: {
        parkingSpotId: available.ParkingSpot.id,
      },
    });

    return receipt;
  }

  async checkOut(id: string) {
    const checkOut = new Date('2022-07-17T13:30:25.820');
    const receipt = await this.findOne(id);

    const totalValue = this.getTotalValue(receipt, checkOut);

    const checkout = await this.prismaService.receipt.update({
      where: { id },
      data: {
        checkOut,
        totalValue,
      },
      include: {
        ParkingSpot: true,
      },
    });

    return new ReceiptEntity(checkout);
  }

  findAll() {
    return `This action returns all receipt`;
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

  update(id: string, updateReceiptDto: UpdateReceiptDto) {
    return `This action updates a #${id} receipt`;
  }

  remove(id: string) {
    return `This action removes a #${id} receipt`;
  }

  getTotalValue(receipt: ReceiptEntity, checkoutDate: Date) {
    const timeInSpot =
      Math.abs(checkoutDate.getTime() - receipt.checkIn.getTime()) / 36e5;

    return (timeInSpot * 8).toFixed(2);
  }
}
