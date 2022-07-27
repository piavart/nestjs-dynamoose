import { flatten } from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { getModelToken } from './common/dynamoose.utils';
import { DYNAMOOSE_INITIALIZATION } from './dynamoose.constants';
import { ModelDefinition } from './interfaces';
import { AsyncModelFactory } from './interfaces/async-model-factory.interface';

export function createDynamooseProviders(models: ModelDefinition[] = []) {
  const providers = (models || []).map((model) => {
    const modelInstance = dynamoose.model(model.name, model.schema);

    if (model.serializers) {
      Object.entries(model.serializers).forEach(([key, value]) => {
        modelInstance.serializer.add(key, value);
      });
    }

    setTimeout(() => {
      new dynamoose.Table(model.name, [modelInstance]);
    }, 100);

    return {
      provide: getModelToken(model.name),
      useValue: modelInstance,
      inject: [DYNAMOOSE_INITIALIZATION],
    };
  });
  return providers;
}

export function createDynamooseAsyncProviders(
  modelFactories: AsyncModelFactory[] = [],
) {
  const providers = (modelFactories || []).map((model) => [
    {
      provide: getModelToken(model.name),
      useFactory: async (...args: unknown[]) => {
        const schema = await model.useFactory(...args);
        const modelInstance = dynamoose.model(model.name, schema);
        if (model.serializers) {
          Object.entries(model.serializers).forEach(([key, value]) => {
            modelInstance.serializer.add(key, value);
          });
        }

        setTimeout(() => {
          new dynamoose.Table(model.name, [modelInstance]);
        }, 100);

        return modelInstance;
      },
      inject: [DYNAMOOSE_INITIALIZATION, ...(model.inject || [])],
    },
  ]);
  return flatten(providers);
}
