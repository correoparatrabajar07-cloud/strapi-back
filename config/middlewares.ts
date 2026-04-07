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
          // Permite que tu frontend se conecte y cargue Strapi en un iframe
          'frame-ancestors': ["'self'", 'https://strapi-back--correoparatraba.replit.app/'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      // URL de tu frontend para llamadas API
      origin: ['https://strapi-front-mocha.vercel.app'],
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
