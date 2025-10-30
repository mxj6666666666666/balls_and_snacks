// frontend/test/router.test.js
import { mount } from '@vue/test-utils';
import App from '../App.vue';
import router from '../router';

describe('路由测试', () => {
  test('导航到登录页面', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    });
    
    await router.push('/login');
    await wrapper.vm.$nextTick();
    
    expect(wrapper.find('.login-page').exists()).toBe(true);
  });
});