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
        res.write("<br/>");
        res.write("<script>function foo1(){ document.getElementById('videoPlayer').src = 'cancel.mp4';}</script>");
        res.write("<button id='videoCancel' onclick='foo1()'>Click me</button>");
        
    } 
    if(audioFile){
        res.write("'<audio id='audioPlayer' controls>");
        res.write("<source src='" + audioFile+"' />");
        res.write("</audio>");
        //button
        res.write("<br/>");
        res.write("<script>function foo(){ document.getElementById('audioPlayer').src = 'cancel.mp3';}</script>");
        res.write("<button id='audioCancel' onclick='foo()'>Click me</button>");
    }
    if(posterImage){
        res.write("<img src='" + posterImage +"' id='posterImage'>");
    }

    res.write("<style>");
    res.write("table, th, td {");
    res.write("  border:1px solid black;}");
    res.write("</style>");
    res.write("<table id='playlist_table'>");
    res.write("<tr><th>No.</th>");
    res.write("<th>URL</th>");
    res.write("<th>Type</th></tr>");
    res.write("</table>");


    
  });



app.listen(4080)
