import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Draw Contest API',
    version: '1.0.0',
  },
  servers: [{ url: '/'}],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      AuthResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              phone: { type: 'string' },
              role: { type: 'string' },
              isSubscribed: { type: 'boolean' },
            },
          },
        },
      },
      Subscription: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          user: { type: 'string' },
          phone: { type: 'string' },
          billImage: { type: 'string' },
          status: { type: 'string', enum: ['pending', 'accepted', 'rejected'] },
          rejectionMessage: { type: 'string' },
          subscriptionDate: { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

swaggerSpec.paths = {
  '/api/v1/auth/signup': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['name', 'phone', 'password'],
              properties: {
                name: { type: 'string' },
                phone: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Created', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
      },
    },
  },
  '/api/v1/auth/login': {
    post: {
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['phone', 'password'],
              properties: {
                phone: { type: 'string' },
                password: { type: 'string' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/AuthResponse' } } } },
      },
    },
  },
  '/api/v1/auth/profile': {
    get: {
      tags: ['Auth'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: { description: 'OK' },
      },
    },
  },
  '/api/v1/subscription': {
    post: {
      tags: ['Subscription'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['phone', 'bill'],
              properties: {
                phone: { type: 'string' },
                bill: { type: 'string', format: 'binary' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: 'Created' },
      },
    },
  },
  '/api/v1/subscription/pending': {
    get: {
      tags: ['Subscription'],
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'limit', in: 'query', schema: { type: 'integer' } },
      ],
      responses: { 200: { description: 'OK' } },
    },
  },
  '/api/v1/subscription/{id}/status': {
    put: {
      tags: ['Subscription'],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['status'],
              properties: {
                status: { type: 'string', enum: ['accepted', 'rejected'] },
                rejectionMessage: { type: 'string' },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'OK' } },
    },
  },
  '/api/v1/dashboard/stats': {
    get: {
      tags: ['Dashboard'],
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: 'OK' } },
    },
  },
  '/api/v1/dashboard/users': {
    get: {
      tags: ['Dashboard'],
      security: [{ bearerAuth: [] }],
      parameters: [
        { name: 'q', in: 'query', schema: { type: 'string' } },
        { name: 'page', in: 'query', schema: { type: 'integer' } },
        { name: 'limit', in: 'query', schema: { type: 'integer' } },
      ],
      responses: { 200: { description: 'OK' } },
    },
  },
  '/api/v1/dashboard/users/{id}': {
    put: {
      tags: ['Dashboard'],
      security: [{ bearerAuth: [] }],
      parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                phone: { type: 'string' },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'OK' } },
    },
  },
  '/api/v1/dashboard/site-status': {
    get: {
      tags: ['Dashboard'],
      security: [{ bearerAuth: [] }],
      responses: { 200: { description: 'OK' } },
    },
    put: {
      tags: ['Dashboard'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['isActive'],
              properties: {
                isActive: { type: 'boolean' },
              },
            },
          },
        },
      },
      responses: { 200: { description: 'OK' } },
    },
  },
};

export default swaggerSpec;
