const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
	cors:{
		origin:"http://localhost:8080",
		methods:["GET","POST"]
	}
});

//中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//静态文件服务
app.use('/uploads',express.static('uploads'));

//数据库连接
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/game-platform');

//Socket.io 连接处理
io.on('connection',(socket)=>{
	console.log('用户连接:',socket.id);

	socket.on('disconnect',()=>{
		console.log('用户断开连接:',socket.id);
	});
});

//路由
app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/games',require('./routes/games'));

//错误处理中间件
app.use((err,req,res,next)=>{
	console.error(err.stack);
	res.status(500).json({message:'服务器内部错误'});
});

const PORT = process.env.PORT ||3000;
server.listen(PORT,()=>{
	console.log(`服务器运行在端口 ${PORT}`);
});