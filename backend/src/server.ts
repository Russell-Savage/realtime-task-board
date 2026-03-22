import dotenv from 'dotenv';
dotenv.config();

import { App } from './app';

const PORT = parseInt(process.env.PORT || '4000', 10);

const app = new App();
app.listen(PORT);
