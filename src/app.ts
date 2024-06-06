import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHand';
import notFound from './app/middlewares/noFoundError';

const app: Application = express();
// const port = 3000;
// parser
app.use(express.json());
app.use(cors());
// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  // Promise.reject();
  const a = 10;
  res.send(a);
};
app.get('/', test);
//Not Found
app.use(notFound);
app.use(globalErrorHandler);
export default app;
