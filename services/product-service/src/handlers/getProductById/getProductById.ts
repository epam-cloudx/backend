import { Handler } from 'aws-lambda';
import productsMock from '../../__fixtures__/products.json';

export const getProductById: Handler = async (event) => {
  const id = Number(event.pathParameters.productId);

  if (!id) {
    return {
      statusCode: 400,
      body: `Product ID is not valid: ${event.pathParameters.productId}.`,
    };
  }

  const product = await Promise.resolve(productsMock.find((item) => item.id === id));

  if (!product) {
    return {
      statusCode: 404,
      body: `Could not found product with id: ${id}.`,
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
