import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptController } from '../controllers/receipt.controller';
import { ReceiptService } from '../services/receipt.service';

describe('ReceiptController', () => {
  let controller: ReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptController],
      providers: [ReceiptService],
    }).compile();

    controller = module.get<ReceiptController>(ReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
