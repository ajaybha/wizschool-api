import 'dotenv/config';
import express from 'express';
import cron from 'node-cron';
import {json} from 'body-parser';
import {assetRouter} from './routes/asset';
import {collectionRouter} from './routes/collection';
import {saleRouter} from './routes/sale';
import {userRouter} from './routes/user';
import {pollActivities} from './apis/blockchaindata';
const app = express();
const PORT = process.env.PORT || 3000;
const NETWORK = (process.env.NETWORK || 'localhost').toLowerCase();

app.use(express.json());
app.use('/images', express.static('public/images'));
app.use("/api", assetRouter);
app.use("/api", collectionRouter);
app.use("/api", saleRouter);
app.use("/api", userRouter);
app.use(express.urlencoded( { extended: true}));

// ErrorHandler (should be last piece of middleware)
//
// TODO:
// app.use(errorHandler);

// polling function to fetch data from blockchain 
// through network or indexer polling/ws APIs
switch(NETWORK) {
    case 'localhost':
        break;
    case 'testnet':
        cron.schedule('0-59/2 * * * *', pollActivities);
        break
}

app.listen(PORT, () => {
    console.log("server is listening on port:" + PORT);
});
