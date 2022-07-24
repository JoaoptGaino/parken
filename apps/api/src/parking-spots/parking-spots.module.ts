import { Module } from '@nestjs/common';
import { ParkingSpotsService } from './services/parking-spots.service';
import { ParkingSpotsController } from './controllers/parking-spots.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParkingSpotsController],
  providers: [ParkingSpotsService],
  exports: [ParkingSpotsService],
})
export class ParkingSpotsModule {}
