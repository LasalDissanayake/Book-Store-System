import Express, { request, response } from "express";
import Express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { get } from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


const app = Express();

//Midleware for parsing request body
app.use(Express.json());

//Middleware for handling CORS POLICY
//opt1
app.use(cors());
//opt2
//app.use(cors({
//    origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
//})
//);
////////////////////////////////////////

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to the jungle");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((Error) => {
        console.log(Error);
    });