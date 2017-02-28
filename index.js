var express = require('express');
var path = require('path');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static(path.join(__dirname, 'public')))
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

app.get('/quiz/lang', (req, res) => {
  let header = req.headers['x-secret-code']
  if (header && header.toLowerCase().includes('pineapple')) {
    res.render('pages/quiz-lang', {correct: true})
  } else {
    res.render('pages/quiz-lang', {correct: false})
  }
});

app.listen(app.get('port'), function() {
  console.log(`Node app is running at http://localhost:${app.get('port')}`);
});
