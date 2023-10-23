import { responseParser } from '@libs/response-parser';
import { v4 as uuidv4 } from 'uuid';
import { client } from '@libs/client';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import * as process from 'process';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    console.log('Creating product: ', body);

    const productItem = {
      id: uuidv4(),
      title: body.title,
      price: body.price,
      description: body.description,
    };

    await client.send(
      new PutCommand({
        TableName: process.env.PRODUCTS_TABLE,
        Item: productItem,
      })
    );

    await client.send(
      new PutCommand({
        TableName: process.env.STOCKS_TABLE,
        Item: {
          product_id: productItem.id,
          count: body.count || 0,
        },
      })
    );

    return responseParser(200, { ...productItem, count: body.count });
  } catch (error) {
    console.error('Unexpected error happened: ', error);
    return responseParser(500, 'Internal Server Error');
  }
};

export const main = createProduct;
