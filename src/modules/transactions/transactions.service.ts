import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './interfaces/transaction.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];
  private readonly logger = new Logger(TransactionsService.name);

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<void> {
    const { email } = createTransactionDto;
    const findedTransaction = this.transactions.find(transaction => transaction.email === email);

    if (findedTransaction) {
      this.update(findedTransaction, createTransactionDto);
    } else {
      this.create(createTransactionDto);
    }
  }

  async searchAllTransactions(): Promise<Transaction[]> {
    return this.transactions;
  }

  async searchTransaction(id: string): Promise<Transaction> {
    const findedTransaction = this.transactions.find(transaction => transaction._id == id)
    if (!findedTransaction) {
      throw new NotFoundException(`Id da transação ${id} não encontrada`)
    }
      return findedTransaction
  }

  private create(createTransactionDto: CreateTransactionDto): void {
    const { nome, telefoneCelular, email } = createTransactionDto;
    const transaction: Transaction = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      positionRaking: 1,
      urlFotoTransaction: 'www.google.com.br/fotos123'
    };
    this.logger.log(`createTransactionDto: ${JSON.stringify(transaction)}`);
    this.transactions.push(transaction);
  }

  private update(findedTransaction: Transaction, createTransactionDto: CreateTransactionDto): void {
    const index = this.transactions.findIndex(transaction => transaction._id === findedTransaction._id);
    if (index !== -1) {
      this.transactions[index] = {
        ...findedTransaction,
        ...createTransactionDto,
        _id: findedTransaction._id
      };
      this.logger.log(`Updated transaction: ${JSON.stringify(this.transactions[index])}`);
    }
  }
  async deleteTransaction(id: string): Promise<void> {
    const findedTransaction = this.transactions.find(transaction => transaction._id === id);
    if (!findedTransaction) {
        throw new Error(`Transaction with ID ${id} not found.`);
    }
    this.transactions = this.transactions.filter(transaction => transaction._id !== id);    
  }
}