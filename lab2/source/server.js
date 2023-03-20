const express = require('express')

const app = express()

app.get('/', function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
  
    res.set("Content-Type", "text/html");

    function foo(){
        document.getElementById("audioPlayer").src = "cancel.mp3";
    }
    
    function foo1(){
        document.getElementById("videoPlayer").src = "cancel.mp4";
    }
    
   


    if (!videoFile && !audioFile && !posterImage) {
        res.send("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        res.write("<video id='videoPlayer' controls>");
        res.write("source src='" + videoFile +"' />");
        res.write("</video>");
        //button
        res.write("<script>function foo(){ document.getElementById('videoPlayer').src = 'cancel.mp4';}</script>");
        res.write("<button id='videoCancel' onclick='foo1()'>Click me</button>");
        
    } 
    if(audioFile){
        res.write("'<audio id='audioPlayer' controls>");
        res.write("<source src='" + audioFile+"' />");
        res.write("</audio>");
        //button
        res.write("<script>function foo(){ document.getElementById('audioPlayer').src = 'cancel.mp3';}</script>");
        res.write("<button id='audioCancel' onclick='foo()'>Click me</button>");
    }
    if(posterImage){
        res.write("<img src='" + posterImage +"' id='posterImage'>");
    }
    
  });



app.listen(4080)
