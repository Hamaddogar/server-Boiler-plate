var express = require('express');
var dbconfiq = require('../Clint Shop Data/db/dbconfig');
var bodyParser = require('body-parser');
let signupUser = require('../Clint Shop Data/api/signup');
let loginUser = require('../Clint Shop Data/api/login');
 let middleware  = require('../Clint Shop Data/db/middleware')
 const  passport = require('passport');

 var soap = require('soap-ntlm');
var fs = require('fs');
var httpntlm = require('httpntlm');

var url = 'https://rs74.net:7501/SCNet/WS/SILK%20CRAFTS%2C%20INC./Page/Customer';
var username = 'ecommerce';
var password = 'ECom!@#123';


var app = express();
var cors = require('cors')

var PORT = 5000;
app.use(cors())
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use('/api/registeruser', signupUser);
app.use('/api/loginuser', loginUser);



httpntlm.get({
  url: url,
  password: password,
  username: username
}, function(err, wsdl) {
  if (err)
  {
      console.log('ERR: -> ');
      console.log(err);
      return;
  }
  fs.writeFile('wsdl_cache/WDCETA.wsdl', wsdl.body, function() {

    soap.createClient(__dirname + '/wsdl_cache/WDCETA.wsdl', function(err, client) {
      if (err) {
        console.log('SOAP ERR: ->');
        console.log(err);
        return;
      }

      client.setSecurity(new soap.NtlmSecurity(username, password));

      console.log(client);
    });

  })

});


app.listen(PORT, function() {
  console.log('Server is running on PORT:', PORT);
});
