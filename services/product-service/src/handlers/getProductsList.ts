import { Handler } from 'aws-lambda';
import productsMock from '../__fixtures__/products.json';

export const getProductsList: Handler = async () => {
  const products = await Promise.resolve(productsMock);

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
