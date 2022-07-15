var mongoose = require('mongoose')

// useNewUrlParser ;)
var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
   };

mongoose.connect('mongodb+srv://admin:Hj0x2pvopleKxbKT@cluster0.zmk5l.mongodb.net/morningnews?retryWrites=true',
options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database connection : Success ***');
    }
   }
);
