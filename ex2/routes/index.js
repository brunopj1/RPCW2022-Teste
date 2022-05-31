var express = require('express');
var router = express.Router();
var axios = require("axios")

token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNzU3MywiZXhwIjoxNjU0MDQ2MzczfQ.JkZKXM0AeVGo8jjbImXX4nPAzYBXbFWwdV9Aq6U3ae-Jf3ZS7JyoUUm7pTl7uBWWo6_POPFiPpA6VUuBPPzlo3rWhpg6-_RSunL_NMlCwNJAaHhjCyn5QALtJ4mZvCVhnzMze2vn3kkM0kxoPZ8V4BlHwysqlK7g4eXClVZvnOws4fp6J6GrwAtnazksZElqdJz5I3tEWNn4VyvaVNJNuv-H4AIF-m5PAGjnqRcdhV11kpnVsMRuNim1WESZP43lfNmGOCiwO8eSQvsrZQgkaGxovEaB2tA7cmzEACt92yDapA6-gYK8ek7TKgdaCTnHNsteAL7KUN29XAHpMUHybw"

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Homepage' });
});

router.get('/classes', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
  .then(response => {
    res.render('classes', { title: 'Classes', classes: response.data });
  })
  .catch(error => {
    res.render('error', { title: 'Erro', error: error })
  })
});

router.get('/classes/:id', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/' + req.params.id + '?token=' + token)
  .then(response => {
    res.render('classe', { title: 'Classes', classe: response.data });
  })
  .catch(error => {
    console.log(error)
    res.render('error', { title: 'Erro', error: error })
  })
});

router.get('/termosindice', function(req, res, next) {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
  .then(response => {
    res.render('termosindice', { title: 'Termos de Indice', termos: response.data });
  })
  .catch(error => {
    res.render('error', { title: 'Erro', error: error })
  })
});

module.exports = router;
