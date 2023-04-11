const mongoose = require('mongoose')

//mongoose.connect('mongodb://localhost:27017/blogApp')

mongoose.connect('mongodb+srv://yati:12345678yati@cluster0.vsy5krb.mongodb.net/blogApp')
// mongoose.connect('mongodb+srv://yati:12345678yati@cluster0.vsy5krb.mongodb.net/?retryWrites=true&w=majority');

module.export = mongoose