const express = require('express')

const app = express()

app.get('/', function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
  
    res.set("Content-Type", "text/html");

    if (!videoFile && !audioFile && !posterImage) {
        res.send("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        res.write("<video id='videoPlayer' controls>");
        res.write("source src='" + videoFile +"' />");
        res.write("</video>");
    } 
    if(audioFile){
        res.write("'<audio id='audioPlayer' controls>");
        res.write("<source src='" + audioFile+"' />");
        res.write("</audio>");
    }
    if(posterImage){
        res.write("<img src='" + posterImage +"' id='posterImage'>");
    }
    
  });

app.listen(4080)
