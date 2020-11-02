const express = require('express');

const app = express();

app.use(express.static('./dist/game-number'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/game-number/'}),
);

app.listen(process.env.PORT || 8080);
