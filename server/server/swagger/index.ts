import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
const router = Router();

import { swaggerJson, swaggerSpec } from './swagger.controller';
// import YAML from 'yamljs';

// const swaggerDocument = YAML.load('./api-spec.yml');
// console.log(swaggerDocument);

router
  .get('/api-docs.json', swaggerJson)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
