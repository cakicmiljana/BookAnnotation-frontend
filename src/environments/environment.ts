// Production build. Assumes the frontend and the API are served from the same
// origin (e.g. behind a reverse proxy that forwards /api to the NestJS server).
export const environment = {
  production: true,
  apiUrl: '/api',
};
