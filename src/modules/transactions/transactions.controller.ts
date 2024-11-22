import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './interfaces/transaction.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Controller('api/v1/transactions')
 export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) {}
      @Post()
      async createTransaction(
        @Body() createTransactionDTO: CreateTransactionDto) {
          await this.transactionsService.createTransaction(createTransactionDTO)
      }
      
      @Get()
      async searchTransactions(
        @Query('id') id: string
      ): Promise<Transaction | Transaction[]> {
        if (id) {
          return this.transactionsService.searchTransaction(id);
        } else {
          return this.transactionsService.searchAllTransactions();
        }
      }

      @Delete()
      async deleteTransactions(
        @Query('id') id: string
      ): Promise<void> {
        if (!id) {
          throw new BadRequestException('O parâmetro "id" é obrigatório.');
        }
        try {
          await this.transactionsService.deleteTransaction(id);
          console.log(`Transação com ID ${id} foi deletada com sucesso.`);
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(`Erro ao deletar a transação com ID ${id}:`, error.message);
            throw new NotFoundException(`Transação com ID ${id} não encontrada.`);
          }
          throw new NotFoundException('Ocorreu um erro inesperado.');
        }
      }
}