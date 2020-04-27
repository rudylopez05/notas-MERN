require('dotenv').config();
const app = require('./app');

require('./database');


async function main () {
    
    app.listen(app.get('port'));
    console.log("Listening on port : ", app.get('port'));
}


main();