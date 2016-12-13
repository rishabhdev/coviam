/**
 * Created by rishabhdev on 13/12/16.
 */
var http = require('http');
var express = require('express')
var app = express()
app.listen(3333);

app.use('/',express.static('../client'))

