import express from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {ClientController} from './controllers';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/client', ClientController);

const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});

createConnection().catch(error => console.log(error));
