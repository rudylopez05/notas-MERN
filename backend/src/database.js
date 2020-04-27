const mongoose = require('mongoose')

const conectionString = process.env.MONGODB_CSTRING ? 
process.env.MONGODB_CSTRING :
'mongodb://localhost/databaseTest';

mongoose.connect(conectionString,{

    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify:false

});

const connection = mongoose.connection;

connection.once('open', () => {

    console.log(conectionString + ' is connected...');
    
});
