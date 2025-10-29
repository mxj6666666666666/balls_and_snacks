const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	username:{
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3,
		maxlength: 20
	},
	email:{
		type: String,
		required: true,
		trim: true,
		lowercase: true 
	},
	password:{
		type: String,
		required: true,
		minlength: 6
	},
	balance:{
		type: Number,
		default: 0
	},
	avatar:{
		type: Date,
		default: Date.now
	}
},{
	timestamps: true
});

//密码加密中间件
userSchema.pre('save',async function(next){
	if(!this.isModified('password'))  return next();
	this.password = await bcrypt.hash(this.password,12);
	next();
})

//密码验证方法
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
	return await bcrypt.conpare(candidatePassword,userPassword);
};

module.exports = mongoose.model('User',userSchema);
