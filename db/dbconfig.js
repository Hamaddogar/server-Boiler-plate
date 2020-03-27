var mongoose = require('mongoose');

// if (process.env.type == "production") {
// let   URI =
//     "mongodb+srv://Muhammad:Muhammad@cluster0-oset3.mongodb.net/test?retryWrites=true&w=majority";
// // } else {
//  const LocalURI = "mongodb://localhost:27017/mydb";
// }
// localhost:3000/

   LocalURI = "mongodb+srv://Muhammad:Muhammad@cluster0-oset3.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(LocalURI, { useNewUrlParser: true }, (err, data) => {
  console.log(err || data);
  console.log("mongodb connected");
});