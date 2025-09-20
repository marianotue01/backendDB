// swagger.js
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Store API",
    version: "1.0.0",
    description: "API REST for Users, Products and User-Products",
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || "http://localhost:5000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(process.cwd(), "api/routes/*.js")], // funciona local + Render
};

const swaggerSpec = swaggerJsDoc(options);

console.log("Swagger paths detected:", Object.keys(swaggerSpec.paths || {}));

export { swaggerUi, swaggerSpec };
