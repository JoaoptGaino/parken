import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ParkingSpotsModule } from './parking-spots/parking-spots.module';

@Module({
  imports: [PrismaModule, ParkingSpotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
