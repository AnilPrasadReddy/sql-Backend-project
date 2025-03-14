// external modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// local modules
const app = express();

// routers
const { hostRouter } = require('./Routers/hostRouter');
const { ratingRouter } = require('./Routers/ratingRouter');
const { costRouter } = require('./Routers/costRouter');
const { locRouter } = require('./Routers/locRouter');
const { userRouter } = require('./Routers/userRouter');
const  authRouter  = require('./Routers/authRouter');
const rootDir = require('./utils/path');

// setup
app.set('view engine', 'ejs');
app.set('views', 'views');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.use(cookieParser()); 

// routes
app.use("/",authRouter);
app.use("/host", hostRouter);
app.use("/user", userRouter);
app.use(costRouter);
app.use(locRouter);
app.use(ratingRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1>');
});

// server listening
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
