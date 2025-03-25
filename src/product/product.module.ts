import { Module } from '@nestjs/common';
import { InventaryService } from './product.service';
import { InventaryController } from './product.controller';

@Module({
  providers: [InventaryService],
  controllers: [InventaryController]
})
export class InventaryModule { }
