'use strict'

//モジュールを唱える
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

//（/）が来たら,inded.htmlファイルを返そう
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');    
});

//WEBソケットが接続成功したら、
io.on('connection', (socket) => {
　//サーバーに成功を通知
  console.log('a user connected');
　//chat messageイベントが発火する。
  socket.on('chat message', (msg) => {
    //送信者含む全員にメッセージを送信する魔法の言葉
　　io.emit('chat message', msg);
    //サーバーに通知が来る
    console.log(`message: ${msg}`);
  });
　//もしも接続が切れたら
  socket.on('disconnect', () => {
      //サーバーに切れたことを通知
    console.log('user disconnected');
  });
});



http.listen(PORT, () => {
    console.log(`LIstening on *:${PORT}`);
});