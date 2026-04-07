import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Permitir que tu frontend embeba Strapi en un iframe para preview
          'frame-ancestors': [
            "'self'",
            process.env.FRONTEND_URL || 'https://strapi-front-mocha.vercel.app',
            'http://localhost:3000', // si pruebas local
          ],
          // Scripts permitidos
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            process.env.FRONTEND_URL || 'https://strapi-front-mocha.vercel.app',
          ],
          // Opcional: permitir conexión a tu backend para fetch
          'connect-src': ["'self'", process.env.FRONTEND_URL || 'https://strapi-front-mocha.vercel.app'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://strapi-front-mocha.vercel.app',
        'http://localhost:3000', // para pruebas locales
      ],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
