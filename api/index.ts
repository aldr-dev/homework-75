import express from 'express';
import cors, {CorsOptions} from 'cors';
import {cipherRouter} from "./routers/cipher";

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (origin && whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', cipherRouter);

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});