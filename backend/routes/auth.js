const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../model/User');
const router = express.Router();

//用户注册
router.post('/register',async(req ,res)=>{
	try{
		const{ username,email,password } = req.body;
		
		//检查用户是否已存在
		const existingUser = await User.findOne({
			$or:[{email},{username}]
		});

		if(existingUser){
			return res.status(400).json({
				message:'用户名或邮箱已经存在'
			});
		}
		
		//创建新用户
		const user = await User.create({
			username,
			email,
			password
		});

		//生成 JWT token
		const token = jwt.sign(
			{id: user._id},
			process.env.JWT_SECRET,
			{expiresIn: process.env.JWT_EXPIRE}
		);

		res.json({
			message: '注册成功',
			token,
			user:{
				id: user._id,
				username:user.username,
				email:user.email,
				balance: user.balance
			}
		});
	}catch(error){
		res.status(500).json({
			message: '注册失败',
			error: error.message
		});
	}
});

module.exports = router;