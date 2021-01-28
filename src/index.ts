// Required External Modules //
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { routes } from './routes/router';

dotenv.config();

// App Variables //
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

// App Configuration //
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/', routes.homeRouter);
app.use('/api/recipes', routes.recipeRouter);

// Server Activation //
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
