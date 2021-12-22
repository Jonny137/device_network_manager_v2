import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
const router = Router();

import { swaggerJson, swaggerSpec } from './swagger.controller';

router
  .get('/api-docs.json', swaggerJson)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
