import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionModule } from './modules/transactions/transactions.module';
import { ConfigModule } from "@nestjs/config";
import { Transaction } from "./modules/transactions/entities/transaction.entity";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: Number(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Transaction],
      synchronize: true,
    }),
    TransactionModule 
  ],
})
export class AppModule {}