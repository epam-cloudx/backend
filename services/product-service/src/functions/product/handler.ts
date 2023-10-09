import productsMock from '@fixtures/products.json';
import { Handler } from 'aws-lambda';
import { responseParser } from '@libs/response-parser';

const products: Handler = async (event) => {
  const id = Number(event.pathParameters.productId);

  if (!id) {
    return responseParser(400, { error: `Product ID is not valid: ${event.pathParameters.productId}.` });
  }

  const product = await Promise.resolve(productsMock.find((item) => item.id === id));

  if (!product) {
    return responseParser(404, { error: `Could not found product with id: ${id}.` });
  }

  return responseParser(200, product);
};

export const main = products;
