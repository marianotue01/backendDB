import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Store API",
    version: "1.0.0",
    description: "API REST for Users, Products and User-Products",
  },
  servers: [
    {
      url: "https://propeval.onrender.com",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path relative to swagger.js
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };
