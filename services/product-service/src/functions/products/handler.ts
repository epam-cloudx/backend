import productsMock from '@fixtures/products.json';
import { Handler } from 'aws-lambda';
import { responseParser } from '@libs/response-parser';

const products: Handler = async () => {
  const productsData = await Promise.resolve(productsMock);

  return responseParser(200, productsData);
};

export const main = products;
