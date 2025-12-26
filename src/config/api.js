// API Configuration
const API_CONFIG = {
  dev: {
    baseUrl: 'http://localhost:8089/api',
    views: 'http://localhost:8089/api/views',
  },
  prod: {
    baseUrl: 'https://portfolio-backend-six-ruby.vercel.app/api',
    views: 'https://portfolio-backend-six-ruby.vercel.app/api/views',
  },
};

// Determine environment
const isDev = import.meta.env.DEV;
const config = isDev ? API_CONFIG.dev : API_CONFIG.prod;

export default config;
