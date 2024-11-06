import { Module } from "@nestjs/common";
import { TransactionModule } from './modules/transactions/transactions.module';

@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: []
})
export class AppModule{}