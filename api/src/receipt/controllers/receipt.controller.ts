import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';
import { ReceiptService } from '../services/receipt.service';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  checkIn() {
    return this.receiptService.checkIn();
  }

  @Get()
  findAll() {
    return this.receiptService.findAll();
  }

  @Get(':id')
  checkOut(@Param('id') id: string) {
    return this.receiptService.checkOut(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiptService.remove(id);
  }
}
