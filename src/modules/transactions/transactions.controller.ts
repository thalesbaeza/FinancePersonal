import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './interfaces/transaction.interface';

@Controller('api/v1/transactions')
 export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) {}
      @Post()
      async createTransaction(
        @Body() createTransactionDTO: CreateTransactionDto) {
          await this.transactionsService.createTransaction(createTransactionDTO)
      }
      
      @Get()
      async searchTransactions(): Promise<Transaction[]> {
        return this.transactionsService.searchAllTransactions();
        
      }
}



