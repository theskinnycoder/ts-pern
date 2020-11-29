import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import ToDo from './entities/ToDo';
import { customErrorHandler, notFound } from './middleware/errorMiddleware';
import toDoRoutes from './routes/toDoRoutes';
import { __prod__ } from './utils/constants';

// DotENV Config
config();

// Extract required variables
const { PORT, NODE_ENV, TYPEORM_URL } = process.env;

// Main async IIFE
(async () => {
  try {
    // Create DataBase Connection
    const conn = await createConnection({
      type: 'postgres',
      url: TYPEORM_URL,
      logging: !__prod__,
      synchronize: true,
      entities: [ToDo]
    });
    // Check if the connection is made
    console.log(`Server connected to the ${conn.name} PostgreSQL DataBase...`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // Instantiate an Express Web App
  const app = express();

  // Express Middlewares for form data, logger
  app.use(urlencoded({ extended: false }));
  app.use(json());
  if (NODE_ENV === 'development') app.use(morgan('dev'));

  // Forward the ToDo related routes from /api/todos/
  app.use('/api/todos', toDoRoutes); // Primary Route Hitter

  // Attach the Custom Error and Not Found Handlers
  app.use(notFound);
  app.use(customErrorHandler);

  // Listen for requests
  app.listen(PORT, () =>
    console.log(
      `Server up and running in ${NODE_ENV} mode and listening for requests at http://localhost:${PORT}/`
    )
  );
})();
