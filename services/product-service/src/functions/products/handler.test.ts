import { main as products } from './handler';
import mockProducts from '@fixtures/products.json';
import { Context } from 'aws-lambda';
import { responseHeaders } from '@libs/response-parser';

describe('products()', () => {
  it('returns all products', async () => {
    const result = await products({}, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(mockProducts),
    });
  });
});
