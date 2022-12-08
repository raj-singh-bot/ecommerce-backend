const express = require('express')
const cors = require('cors');
const authRoute = require('./routes/authRoute');
require('dotenv').config()
const connectDB = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const adminRoute = require('./routes/admin/auth');
const app = express();

connectDB();
app.use(cors())
app.use(express.json())
app.use(express.static("uploads"));
app.use('/auth', authRoute)
app.use('/auth', adminRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)



app.listen(process.env.PORT, () =>  console.log('sever is running on 8000'))