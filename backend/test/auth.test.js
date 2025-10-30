// backend/test/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('认证API测试', () => {
  it('应该成功注册用户', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('应该拒绝重复用户名', async () => {
    // 测试重复注册
  });
});