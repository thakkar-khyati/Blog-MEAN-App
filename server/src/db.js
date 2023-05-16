const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
//mongoose.connect('mongodb://localhost:27017/blogApp')

mongoose.connect(process.env.mongooseURL)
// mongoose.connect('mongodb+srv://yati:12345678yati@cluster0.vsy5krb.mongodb.net/?retryWrites=true&w=majority');

module.export = mongoose