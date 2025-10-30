// frontend/test/user.test.js
describe('用户系统测试', () => {
  test('注册功能', async () => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    expect(response.status).toBe(201);
  });

  test('登录功能', async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username: 'testuser',
        password: 'password123'
      })
    });
    expect(response.status).toBe(200);
  });
});