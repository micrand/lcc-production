module.exports = {
  apps: [
    {
      name: 'lcc-testing',
      cwd: '/var/www/lcc-testing',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3003',
      env: {
        NODE_ENV: 'test',
        PORT: 3003,
      },
    },
  ],
};
