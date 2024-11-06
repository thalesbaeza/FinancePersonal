import { Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './interfaces/transaction.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {

  private transactions: Transaction[] = [];

  private readonly logger = new Logger(TransactionsService.name)

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<void> {
    const { email } = createTransactionDto
    const findedTransaction = await this.transactions.find(transaction=> transaction.email === email);

    if (findedTransaction) {
    }
    await this.create(createTransactionDto);
  }

  async searchAllTransactions(): Promise<Transaction[]> {
    return await this.transactions;
  }

  private create(createTransactionDto: CreateTransactionDto): void {
    const {nome, telefoneCelular, email } = createTransactionDto
    const transaction: Transaction = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      positionRaking: 1,
      urlFotoTransaction: 'wwww.google.com.br/fotos123'
    };
    this.logger.log(`createTransactionDto: ${JSON.stringify(transaction)}`)
    this.transactions.push(transaction)
  }
}
