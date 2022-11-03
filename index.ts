import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import path from 'path';
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

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});