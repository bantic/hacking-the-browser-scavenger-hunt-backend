var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  console.log('req.headers',req.headers)
  res.render('pages/index')
});

app.get('/debug/headers', (req, res) => {
  let headers = req.headers;
  res.render('pages/debug-headers', {headers})
});

app.get('/quiz/headers1', (req, res) => {
  let header = req.headers['x-secret-code']
  if (header && header.toLowerCase().includes('pineapple')) {
    res.render('pages/quiz-x-header', {correct: true})
  } else {
    res.render('pages/quiz-x-header', {correct: false})
  }
});

app.get('/quiz/headers2', (req, res) => {
  let header = req.headers['accept-language']
  if (header && header.toLowerCase() === 'de') {
    res.render('pages/quiz-lang-header', {correct: true})
  } else {
    res.render('pages/quiz-lang-header', {correct: false})
  }
});

app.get('/quiz/scripts', (req, res) => {
  res.render('pages/quiz-scripts');
});

app.get('/quiz/debugger', (req, res) => {
  res.render('pages/quiz-debugger');
});

const CORRECT_RESPONSES = {
  'headers1': 'guava',
  'headers2': 'ananas',
  'scripts': 'banana',
  'debugger': 'mango'
}

app.post('/api/quiz/:id', (req, res) => {
  let quizId = req.params.id
  let guess = (req.body.guess || '').toLowerCase()
  let correct = CORRECT_RESPONSES[quizId] === guess
  console.log('post',quizId)
  console.log(req.body)
  res.send({correct})
})

app.listen(app.get('port'), function() {
  console.log(`Node app is running at http://localhost:${app.get('port')}`);
});
