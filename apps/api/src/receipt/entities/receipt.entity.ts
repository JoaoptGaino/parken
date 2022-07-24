import { ParkingSpot, Receipt } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Transform } from 'class-transformer';

export class ReceiptEntity {
  id: string;

  parkingSpotId: string;

  @Transform(({ value }: { value: Decimal }) => value.toNumber())
  totalValue: Decimal;

  checkIn: Date;
  checkOut: Date;

  ParkingSpot: ParkingSpot;

  constructor(receipt: Receipt & { ParkingSpot: ParkingSpot }) {
    this.id = receipt.id;
    this.parkingSpotId = receipt.parkingSpotId;
    this.totalValue = receipt.totalValue;
    this.checkIn = receipt.checkIn;
    this.checkOut = receipt.checkOut;
    this.ParkingSpot = receipt.ParkingSpot;
  }
}
