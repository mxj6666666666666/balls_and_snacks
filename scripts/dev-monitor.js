// scripts/dev-monitor.js
const chokidar = require('chokidar');
const { exec } = require('child_process');

// 监控文件变化自动重启
const watcher = chokidar.watch(['./backend/**/*.js'], {
  ignored: /node_modules/,
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`文件变化: ${path}, 重启服务...`);
  exec('npm run restart-backend', (error) => {
    if (error) {
      console.error('重启失败:', error);
    }
  });
});