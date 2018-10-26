const express = require('express');
const path = require('path');
const MySQL = require('mysql');

const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../funding-widget/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});