let app = require('express')();
var sql = require("mssql"); // for sql server database
let http = require('http').Server(app);
let io = require('socket.io')(http);
 // var config = {
 //        user:'sa'            //SQL User Id. Please provide a valid user
 //        ,password:'abc'    //SQL Password. Please provide a valid password
 //        ,server:'ADMIN\\SQLEXPRESS'   
 //        ,database: 'dascher_new_16062017',        //You can use any database here
 //        port:1433
 //    }
//var connection = new sql.Connection(config);

//sql.connect(config);

//Database configuration End
 io.set("transports", ["xhr-polling","polling"]);
io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  });
 
  socket.on('set-nickname', (nickname) => {
    socket.nickname = nickname;
    io.emit('users-changed', {user: nickname, event: 'joined'});    
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
  });
});
///////////////////////
// function loadUser() {
//   sql.connect(config, function (err) {
//  if (err) console.log(err);
//  // create Request object
//  var request = new sql.Request();
//   // sql.connect(function(err){
//  //    var sqlquery="SELECT * FROM tbl_User";
//  //  request.query(sqlquery, function (err, recordset) {
//  //  //connection.close();
//  // if (err) console.log(err)
//  //  console.log(recordset)
//  // send data as a response
//  //res.send(recordset);
//  request.execute('dbo.S_GetgoodsIn', function (err, recordset1) {
 
//  if (err) console.log(err)
 
//  // send data as a response
// console.log("recordset1");
// console.log(recordset1);
 
//  });
//  });
// //});
// }
//10.
//loadUser();

/////////////////// 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});