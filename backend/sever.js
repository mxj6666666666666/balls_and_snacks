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
mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost:27017/game-platform',{
	useNewUrlParser:true,
	useUnifiedTopology:true,
});