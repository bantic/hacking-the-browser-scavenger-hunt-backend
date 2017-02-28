var express = require('express');
var path = require('path');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index')
});

app.listen(app.get('port'), function() {
  console.log(`Node app is running at http://localhost:${app.get('port')}`);
});
