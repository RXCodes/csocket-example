// prepare and launch socket.io server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var behavior = require('./behaviors');
var functions = require('./functions');
var output = {};
console.log(behavior,functions);
// initialize predefined global variables
output.Sockets = behavior.Set_Variable("Sockets","Global",0);


io.on('connection', function(socket) {
  let local = {};
  output.To_Number = behavior.To_Number(behaviors.Get_Variable_Value("Sockets","Global",null).Value);
  output.Add_Values = behavior.Add_Values(output["To_Number"].Result,1);
  output.Set_Variable = behavior.Set_Variable("Sockets","Global",output["Add_Values"].Sum);
  output.Concatenate = behavior.Concatenate(socket.id,"True","joined the server.");
  io.emit("console log",output["Concatenate"].Result);
  io.emit("join",output["Concatenate"].Result);
  
  // Announce new client count
  output.Concatenate3 = behavior.Concatenate("There are now","True",behaviors.Get_Variable_Value("Sockets","Global",null).Value);
  output.Concatenate4 = behavior.Concatenate(output["Concatenate3"].Result,"True","clients online.");
  io.emit("console log",output["Concatenate4"].Result);
  io.emit("socket count",output["Sockets"].Value);
  
  socket.on('disconnect', function(reason) {
    let local = {};
    output.To_Number1 = behavior.To_Number(behaviors.Get_Variable_Value("Sockets","Global",null).Value);
    output.Subtract_Values = behavior.Subtract_Values(output["To_Number1"].Result,1);
    output.Set_Variable1 = behavior.Set_Variable("Sockets","Global",output["Subtract_Values"].Difference);
    output.Concatenate1 = behavior.Concatenate(socket.id,"True","left the server. Reason:");
    output.Concatenate2 = behavior.Concatenate(output["Concatenate1"].Result,"True",reason);
    io.emit("console log",output["Concatenate2"].Result);
    io.emit("leave",output["Concatenate2"].Result);
    
    // Announce new client count
    output.Concatenate3 = behavior.Concatenate("There are now","True",behaviors.Get_Variable_Value("Sockets","Global",null).Value);
    output.Concatenate4 = behavior.Concatenate(output["Concatenate3"].Result,"True","clients online.");
    io.emit("console log",output["Concatenate4"].Result);
    io.emit("socket count",output["Sockets"].Value);
  });
  
  socket.on('console input', function(input) {
    let local = {};
    output.Concatenate5 = behavior.Concatenate(">","True",input);
    io.emit("console log",output["Concatenate5"].Result);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});