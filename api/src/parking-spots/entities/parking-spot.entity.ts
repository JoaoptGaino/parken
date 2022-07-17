import { ParkingSpot, Receipt } from '@prisma/client';

export class ParkingSpotEntity {
  id: string;
  identification: string;
  createdAt: Date;
  updatedAt: Date;

  Receipt: Receipt;

  constructor(parkingSpot: ParkingSpot & { Receipt?: Receipt }) {
    this.id = parkingSpot.id;
    this.identification = parkingSpot.identification;
    this.createdAt = parkingSpot.createdAt;
    this.updatedAt = parkingSpot.updatedAt;

    this.Receipt = parkingSpot.Receipt;
  }
}
