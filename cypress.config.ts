import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Assurez-vous que votre application est lancée sur ce port
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
