import { Injectable, Logger, NotFoundException, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto[]): Promise<void> {
    for (const dto of createTransactionDto) {
      const { id } = dto;

      const existingTransaction = id
        ? await this.transactionRepository.findOneBy({ id })
        : null;
      if (existingTransaction) {

        await this.update(existingTransaction, dto);
      } else {

        await this.create(dto);
      }
    }
  }

  async searchAllTransactions(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async searchTransaction(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException(`Id: ${id} not founded`);
    }
    return transaction;
  }

  private async create(createTransactionDto: CreateTransactionDto): Promise<void> {
    const { date, title, place, amount, expenses, bank, type } = createTransactionDto;

    const newTransaction = this.transactionRepository.create({
      date,
      title,
      place,
      amount,
      expenses,
      bank,
      type,
    });

    this.logger.log(`Creating transaction: ${JSON.stringify(newTransaction)}`);
    await this.transactionRepository.save(newTransaction);
  }

  private async update(existingTransaction: Transaction, updateTransactionDto: CreateTransactionDto): Promise<void> {
    Object.assign(existingTransaction, updateTransactionDto);

    this.logger.log(`Updating transaction: ${JSON.stringify(existingTransaction)}`);
    await this.transactionRepository.save(existingTransaction);
  }

  async deleteTransaction(id: Number): Promise<void> {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found.`);
    }
    await this.transactionRepository.remove(transaction);
  }
}