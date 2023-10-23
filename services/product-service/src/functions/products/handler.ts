import { Handler } from 'aws-lambda';
import { responseParser } from '@libs/response-parser';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { client } from '@libs/client';
import * as process from 'process';

const products: Handler = async () => {
  try {
    console.log('Getting all products');

    const products = await client.send(
      new ScanCommand({
        TableName: process.env.PRODUCTS_TABLE,
      })
    );

    const stocks = await client.send(
      new ScanCommand({
        TableName: process.env.STOCKS_TABLE,
      })
    );

    const productsWithStock = products.Items?.map((product) => {
      const stock = stocks.Items?.find(({ product_id }) => product_id === product.id);

      return {
        ...product,
        count: stock?.count || 0,
      };
    });

    return responseParser(200, productsWithStock);
  } catch (error) {
    console.error('Unexpected error happened: ', error);
    return responseParser(500, 'Internal Server Error');
  }
};

export const main = products;
