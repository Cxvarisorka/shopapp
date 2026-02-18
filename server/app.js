const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// Routers
const authRouter = require('./routers/auth.router');
const productsRouter = require('./routers/product.router');
const globalErrorHandler = require('./controllers/error.controller');

dotenv.config();

const app = express();

app.use(morgan('dev'))
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Routers
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

// Error handler
app.use(globalErrorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MONGO is Connected!');
        app.listen(process.env.PORT, () => {
            console.log('Server is running at port 3000');
        });
    })
    .catch((err) => console.log(err));
