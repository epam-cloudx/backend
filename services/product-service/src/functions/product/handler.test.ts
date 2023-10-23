import { main as product } from './handler';
import mockProducts from '@fixtures/products.json';
import { Context } from 'aws-lambda';
import { responseHeaders } from '@libs/response-parser';

describe('product()', () => {
  it('throws error, when id is invalid', async () => {
    const result = await product({ pathParameters: { productId: 'non-numeric-id' } }, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 400,
      headers: responseHeaders,
      body: JSON.stringify({
        error: 'Product ID is not valid: non-numeric-id.',
      }),
    });
  });

  it('throws error, when product is not found', async () => {
    const result = await product({ pathParameters: { productId: 999999 } }, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 404,
      headers: responseHeaders,
      body: JSON.stringify({
        error: 'Could not found product with id: 999999.',
      }),
    });
  });

  it('returns product', async () => {
    const mockID = 3;
    const mockProduct = mockProducts.find((item) => item.id === mockID);
    const result = await product({ pathParameters: { productId: mockID } }, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(mockProduct),
    });
  });
});
