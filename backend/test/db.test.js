// backend/test/db.test.js
const mongoose = require('mongoose');

// 测试数据库连接
async function testDBConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ 数据库连接成功');
    
    // 测试基本CRUD操作
    const testUser = new User({ 
      username: 'test', 
      email: 'test@test.com' 
    });
    await testUser.save();
    console.log('✅ 数据库读写正常');
    
  } catch (error) {
    console.error('❌ 数据库连接失败:', error);
  }
}