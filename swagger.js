'use strict';

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'HeroScape API',
    description: 'This API manages a database of HeroScape figures and their associated data.'
  },
  host: 'localhost:8080',
  basePath: '/',
  schemes: ['http'],
  components: {
    schemas: {
      Army: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string' },
          general: { type: 'string' },
          attack: { type: 'number' },
          defense: { type: 'number' },
          move: { type: 'number' },
          range: { type: 'number' },
          life: { type: 'number' },
          cost: { type: 'number' },
          specialPowers: { type: 'string' },
          class: { type: 'string' },
          species: { type: 'string' },
          personality: { type: 'string' },
          size: { type: 'string' },
          height: { type: 'number' },
          url: { type: 'string' },
          wave: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/armies/{id}': {
      put: {
        description: 'Update an existing army',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'ID of the army to update'
          },
          {
            in: 'body',
            name: 'body',
            required: true,
            schema: {
              $ref: '#/components/schemas/Army'
            }
          }
        ],
        responses: {
          200: { description: 'Army updated successfully' },
          404: { description: 'Army not found' },
          400: { description: 'Invalid data provided' }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
