import { Handler } from 'aws-lambda';
import { responseParser } from '@libs/response-parser';
import { client } from '@libs/client';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import * as process from 'process';

const products: Handler = async (event) => {
  try {
    const id = event.pathParameters.productId;

    if (!id) {
      return responseParser(400, { error: `Product id is required` });
    }

    const product = await client.send(new GetCommand({ TableName: process.env.PRODUCTS_TABLE, Key: { id } }));

    if (!product.Item) {
      return responseParser(404, { error: `Could not found product with id: ${id}.` });
    }

    const stock = await client.send(new GetCommand({ TableName: process.env.STOCKS_TABLE, Key: { product_id: id } }));

    return responseParser(200, { ...product.Item, count: stock.Item?.count || 0 });
  } catch (error) {
    console.error('Unexpected error happened: ', error);
    return responseParser(500, 'Internal Server Error');
  }
};

export const main = products;
