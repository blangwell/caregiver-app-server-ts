import app from './app';

const server = app.listen(process.env.PORT, () => {
  console.log(`🏃‍♀ Server running on PORT ${process.env.PORT}`);
});

export default server;