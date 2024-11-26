import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('api/v1/transactions')
 export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) {}
      @Post()
      async createTransaction(@Body() createTransactionDTO: CreateTransactionDto[]) {
          await this.transactionsService.createTransaction(createTransactionDTO)
      }
      
      @Get()
      async searchTransactions(@Query('id') id?: number): Promise<Transaction | Transaction[]> {
        if (id) {
          return await this.transactionsService.searchTransaction(id);
        } else {
          return await this.transactionsService.searchAllTransactions();
        }
      }

      @Delete()
      async deleteTransactions(@Query('id') id: number): Promise<{message:string}> {
        if (!id) {
          throw new BadRequestException('The "id" parameter is required.');
        }
        try {
          await this.transactionsService.deleteTransaction(id);
          return {
            message: `Transaction with ID ${id} was successfully deleted.`
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(`Error deleting transaction with ID ${id}:`, error.message);
            throw new NotFoundException(`Transaction with ID ${id} not found.`);
          }
          throw new NotFoundException('An unexpected error occurred.');
        }
      }
}