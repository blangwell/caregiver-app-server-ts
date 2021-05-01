import app from './app';

const server = app.listen(process.env.PORT, () => console.log(`🏃‍♀️ running on port ${process.env.PORT}`));

export default server;