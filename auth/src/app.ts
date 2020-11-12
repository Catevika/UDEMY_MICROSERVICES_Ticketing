import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@catevikatickets/common';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
  signed: false,
  secure: false
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/** Specific to Express because an async expression needs next
 * app.all('*', async (req, res, next) => {
 *  next(new NotFoundError());
 * }) but here we manage it with a npm package express-async-errors to stay in the commonn way to write errors with our error-handler
*/

app.all('*', async (req, res) => {
  throw new NotFoundError();
})

app.use(errorHandler);

export { app };