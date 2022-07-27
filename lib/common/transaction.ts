import * as dynamoose from 'dynamoose';
import { CallbackType } from 'dynamoose/dist/General';
import {
  ConditionTransactionInput,
  CreateTransactionInput,
  DeleteTransactionInput,
  GetTransactionInput,
  TransactionSettings,
  UpdateTransactionInput,
} from 'dynamoose/dist/Transaction';

export type Transaction =
  | GetTransactionInput
  | CreateTransactionInput
  | DeleteTransactionInput
  | UpdateTransactionInput
  | ConditionTransactionInput;

export type Transactions = (Transaction | Promise<Transaction>)[];

export abstract class TransactionSupport {
  transaction(
    transactions: Transactions,
    settings?: TransactionSettings,
    callback?: CallbackType<any, any>,
  ): any {
    return dynamoose.transaction(
      transactions,
      settings as any,
      callback as any,
    );
  }
}
