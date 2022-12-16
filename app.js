const express = require('express')
const cors = require('cors');
const authRoute = require('./routes/authRoute');
require('dotenv').config()
const connectDB = require('./config/db');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const adminRoute = require('./routes/admin/auth');
const path = require('path');
const addressRoute = require('./routes/addressRoute');
const app = express();

connectDB();
app.use(cors())
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, "uploads")));
app.use('/auth', authRoute)
app.use('/auth', adminRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/api', addressRoute)

const times = new Array()
app.post('/count', (req, res) => {
    const {time} = req.body;
    times.push(time)
    return res.status(200).json({status: 'success'})
})

app.listen(process.env.PORT, () =>  console.log('sever is running on 8000'))