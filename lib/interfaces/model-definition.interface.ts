import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { SerializerOptions } from 'dynamoose/dist/Serializer';
import { TableOptionsOptional } from 'dynamoose/dist/Table';

export type ModelDefinition = {
  name: string;
  schema: Schema | SchemaDefinition | (Schema | SchemaDefinition)[];
  options?: TableOptionsOptional;
  serializers?: { [key: string]: SerializerOptions };
};
