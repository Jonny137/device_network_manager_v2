import { Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDef: any = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Device Network Monitor',
      description: 'Application for monitoring of device/server network status.',
      version: '1.0.0',
      contact: {
        name: 'Nikola Stevanovic',
        email: 'jonnystevanovic@gmail.com'
      }
    },
    servers: [
      {
        url: process.env.SWAGGER_BASE
      },
    ],
  },
  apis: ['./build/swagger/*.swagger.js'],
};

export const swaggerSpec: object = swaggerJSDoc(swaggerDef);

export const swaggerJson = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
};
