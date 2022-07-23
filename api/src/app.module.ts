import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';
import { ReceiptModule } from './receipt/receipt.module';

@Module({
  imports: [PrismaModule, ParkingSpotsModule, ReceiptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
