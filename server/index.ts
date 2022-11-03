import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

dotenv.config();

import routes from './routes';

const finnhub = require('finnhub');


/**
 * App variables
 */
if ( ! process.env.PORT ) {
    process.exit(1);
}

const app: Express = express();

const PORT: number = parseInt(process.env.PORT as string, 10);

app.use(express.json());
app.use(cors());

app.use("/", routes);


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});