/* eslint-disable @typescript-eslint/naming-convention */
import { LoggerService } from '@nestjs/common';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { TableOptions } from 'dynamoose/dist/Table';
import { DeepPartial } from 'dynamoose/dist/General';

export interface DynamooseModuleOptions {
  aws?: {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
  };
  local?: boolean | string;
  ddb?: DynamoDB;
  tableOptions?: DeepPartial<TableOptions>;
  logger?: boolean | LoggerService;
}

export interface DynamooseOptionsFactory {
  createDynamooseOptions():
    | Promise<DynamooseModuleOptions>
    | DynamooseModuleOptions;
}

export interface DynamooseModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<DynamooseOptionsFactory>;
  useClass?: Type<DynamooseOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<DynamooseModuleOptions> | DynamooseModuleOptions;
  inject?: any[];
}
