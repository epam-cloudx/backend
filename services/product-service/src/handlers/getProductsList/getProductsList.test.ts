import { getProductsList } from './getProductsList';
import mock from '../../__fixtures__/products.json';
import { Context } from 'aws-lambda';

describe('getProductsList()', () => {
  it('returns all products', async () => {
    const result = await getProductsList({}, {} as Context, jest.fn());

    expect(result).toStrictEqual({
      statusCode: 200,
      body: JSON.stringify(mock),
    });
  });
});
