const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Application API',
      version: '1.0.0',
      description: 'API for managing user profiles for job applications',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        // ✅ JWT Auth Support
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer <token>',
        },
        // ✅ User Header Support
        UserHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'user',
          description: 'Pass the user ID in the request header',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
      {
        UserHeader: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the route files for documentation
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  // Serve Swagger UI docs at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve Swagger spec as JSON at /swagger.json
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });
};

module.exports = swaggerDocs;
