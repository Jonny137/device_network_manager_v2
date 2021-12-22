import { Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDef: any = {
  info: {
    title: 'Device Network Monitor',
    description: 'Device network monitor',
    version: '1.0.0',
    contact: {
      name: 'Nikola Stevanovic',
      email: 'jonnystevanovic@gmail.com'
    }
  },
  apis: ['./build/swagger/*.swagger.js']
};

export const swaggerSpec: object = swaggerJSDoc({
  definition: swaggerDef.info,
  apis: swaggerDef.apis
});

export const swaggerJson = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};
