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

//数据库连接（带错误处理）
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/game-platform', {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log('MongoDB 连接成功');
}).catch(err => {
  console.log('MongoDB 连接失败，但服务器继续运行:', err.message);
});

//Socket.io 连接处理
io.on('connection',(socket)=>{
	console.log('用户连接:',socket.id);

	socket.on('disconnect',()=>{
		console.log('用户断开连接:',socket.id);
	});
});

//测试路由（无需数据库）
app.get('/api/test', (req, res) => {
  res.json({
    message: '后端API工作正常！',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

app.post('/api/test/echo', (req, res) => {
  res.json({
    message: '收到数据',
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    serverTime: new Date().toISOString(),
    uptime: process.uptime()
  });
});

//路由
app.use('/api/auth',require('./routes/auth'));

//错误处理中间件
app.use((err,req,res,next)=>{
	console.error(err.stack);
	res.status(500).json({message:'服务器内部错误'});
});

// 404 处理（修复路径语法）
app.use((req, res) => {
  res.status(404).json({
    message: '路由不存在',
    path: req.originalUrl,
    method: req.method
  });
});

const PORT = process.env.PORT ||3000;
server.listen(PORT,()=>{
	console.log(`服务器运行在端口 ${PORT}`);
});

// 优雅关闭处理
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
  // 服务器继续运行
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  // 服务器继续运行
});
