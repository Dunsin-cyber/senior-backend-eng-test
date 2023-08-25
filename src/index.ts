import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import { AppError } from '../src/middleware/error';
import './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', routes);

// wildcat
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(`requested URL ${req.path} not found!`, 404);
  next(err);
});

//Global error hander
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err?.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
