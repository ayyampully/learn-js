const express = require('express');
const app = express();

app.use('/', express.static(__dirname+'/src'));

app.get('/rest1', function(req, res){
    setTimeout(()=>{
        res.send('First');
    }, 800)
});
app.get('/rest2', function(req, res){
    setTimeout(()=>{
        res.send('second');
    }, 1800)
});
app.get('/rest3', function(req, res){
    setTimeout(()=>{
        res.send('third');
    }, 800)
});
app.listen(3030);
console.log('Server running at localhost:3030')