'use strict';

const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');

// Determine the base URL dynamically based on environment
const isProduction = process.env.NODE_ENV === 'production';
const BASE_URL = isProduction
  ? 'https://cse341-project2-kp3h.onrender.com'
  : 'https://localhost:8443';

// Update Swagger OAuth2 security schema with the correct URLs
swaggerDocument.components.securitySchemes.oauth2.flows.authorizationCode.authorizationUrl = `${BASE_URL}/auth/google`;
swaggerDocument.components.securitySchemes.oauth2.flows.authorizationCode.tokenUrl = `${BASE_URL}/auth/google/callback`;

// Remove OAuth routes from Swagger documentation
if (swaggerDocument.paths['/auth/google']) {
  delete swaggerDocument.paths['/auth/google'];
}
if (swaggerDocument.paths['/auth/google/callback']) {
  delete swaggerDocument.paths['/auth/google/callback'];
}

// Remove the "auth" tag if no remaining paths use it
if (swaggerDocument.tags) {
  swaggerDocument.tags = swaggerDocument.tags.filter((tag) => tag.name !== 'auth');
}

router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    oauth: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
      usePkceWithAuthorizationCodeGrant: true
    },
    oauth2RedirectUrl: `${BASE_URL}/api-docs/oauth2-redirect.html`
  })
);

module.exports = router;
