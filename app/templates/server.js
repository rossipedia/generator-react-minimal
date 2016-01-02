import express from 'express';

const app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.locals.pretty = true;

app.get('/', (req, res) => res.render('index'));

app.use(express.static(`${__dirname}/dist`));
app.use(express.static(`${__dirname}/public`));

app.listen(3000, () => console.log('Listening on :3000'));
