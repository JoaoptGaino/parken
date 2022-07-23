import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FindAllReceiptsDto } from '../dto/find-all-receipts.dto';
import { ReceiptService } from '../services/receipt.service';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  checkIn() {
    return this.receiptService.checkIn();
  }

  @Get()
  findAll(@Query() query: FindAllReceiptsDto) {
    return this.receiptService.findAll(query);
  }

  @Get(':id')
  checkOut(@Param('id') id: string) {
    return this.receiptService.checkOut(id);
  }

  @Get('/total/:day')
  getTotalOfDay(@Param('day') day: number) {
    return this.receiptService.findAllByDay(day);
  }
}
