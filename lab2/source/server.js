const express = require('express')

const app = express()

app.get('/', function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
  
    res.set("Content-Type", "text/html");

    var foo = function() {
        document.getElementById("audioPlayer").src = "cancel.mp3";
    };
    
    var foo2 = function() {
        document.getElementById("videoPlayer").src = "cancel.mp4";
    };
    
    var fns = {foo : foo, foo2: foo2}


    if (!videoFile && !audioFile && !posterImage) {
        res.send("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        res.write("<video id='videoPlayer' controls>");
        res.write("source src='" + videoFile +"' />");
        res.write("</video>");
        //buttons
        res.write("<button id='videoCancel' onclick="+fns.foo()+">Click me</button>");
        
    } 
    if(audioFile){
        res.write("'<audio id='audioPlayer' controls>");
        res.write("<source src='" + audioFile+"' />");
        res.write("</audio>");
        //buttons
        res.write("<button id='audioCancel' onclick="+fns.foo2()+">Click me</button>");
    }
    if(posterImage){
        res.write("<img src='" + posterImage +"' id='posterImage'>");
    }
    
  });



app.listen(4080)
