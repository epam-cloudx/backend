import { getProductById } from './getProductById';
import mock from '../../__fixtures__/products.json';
import { Context } from 'aws-lambda';

describe('getProductById()', () => {
  it('throws error, when id is invalid', async () => {
    const result = await getProductById({ pathParameters: { productId: 'non-numeric-id' } }, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 400,
      body: 'Product ID is not valid: non-numeric-id.',
    });
  });

  it('throws error, when product is not found', async () => {
    const result = await getProductById({ pathParameters: { productId: 12 } }, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 404,
      body: 'Could not found product with id: 12.',
    });
  });

  it('returns product', async () => {
    const mockProduct = {
      ...mock[0],
      id: 1,
    };
    const result = await getProductById({ pathParameters: { productId: 1 } }, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify(mockProduct),
    });
  });
});
