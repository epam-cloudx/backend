import mockProducts from './products.json';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const AWSConfig: DynamoDB.Types.ClientConfiguration = {
  region: 'eu-west-1',
};

const client = new DynamoDB.DocumentClient(AWSConfig);

(async () => {
  await Promise.all(
    mockProducts.map(async (product) => {
      const productId = uuidv4();

      await client
        .put({
          TableName: 'Products',
          Item: {
            id: productId,
            title: product.title,
            price: product.price,
            description: product.description,
          },
        })
        .promise();
      await client
        .put({
          TableName: 'Stocks',
          Item: {
            product_id: productId,
            count: 100,
          },
        })
        .promise();

      console.log('Created product with id: ', productId);
    })
  );

  console.log('Migration finished');
})();
