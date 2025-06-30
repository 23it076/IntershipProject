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
        UserHeader: {
          type: 'apiKey',
          in: 'header',
          name: 'user',  // The name of the header (user)
          description: 'Pass the user ID in the request header',
        },
      },
    },
    security: [
      {
        UserHeader: [],
      },
    ],
  },
  apis: ['./routes/*.js'],  // Path to the route files to generate documentation from
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  // Serve the Swagger UI docs at /api-docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Serve the Swagger spec as JSON at /swagger.json
  app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
  });
};

module.exports = swaggerDocs;
