import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const port = 3000;

const swaggerDocument = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, async () => {
  const url = `http://localhost:${port}/api-docs`;
  const openModule = await import('open');
  await openModule.default(url);
  console.log(`📗 Swagger is running on ${url}`);
});
