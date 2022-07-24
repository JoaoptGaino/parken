import { Module } from '@nestjs/common';
import { ReceiptService } from './services/receipt.service';
import { ReceiptController } from './controllers/receipt.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParkingSpotsModule } from 'src/parking-spots/parking-spots.module';

@Module({
  imports: [PrismaModule, ParkingSpotsModule],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
