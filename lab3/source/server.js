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
        res.write("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        res.write("<video id='videoPlayer' controls>");
        res.write("source src='" + videoFile +"' />");
        res.write("</video>");
        //button
        res.write("<br/>");
        res.write("<br/>");
        res.write("<script>function foo1(){ document.getElementById('videoPlayer').src = 'cancel.mp4';}</script>");
        res.write("<button id='videoCancel' onclick='foo1()'>Cancel</button>");
        res.write("<button id='videoAdd' onclick='addRow('Video', '" + videoFile +"')'>Add video</button>");
        
    } 
    if(audioFile){
        res.write("'<audio id='audioPlayer' controls>");
        res.write("<source src='" + audioFile+"' />");
        res.write("</audio>");
        //button
        res.write("<br/>");
        res.write("<br/>");
        res.write("<script>function foo(){ document.getElementById('audioPlayer').src = 'cancel.mp3';}</script>");
        res.write("<button id='audioCancel' onclick='foo()'>Cancel</button>");
        res.write("<button id='audioAdd' onclick='addRow('Audio', '" + audioFile+"')'>Add audio</button>");
    }
    if(posterImage){
        res.write("<img src='" + posterImage +"' id='posterImage'>");
        res.write("<button id='imgAdd' onclick='addRow('Image', '" + posterImage +"')'>Add image</button>");
    }

    res.write("<br/>");
    res.write("<br/>");

    res.write("<style>");
    res.write("table, th, td {");
    res.write("  border:1px solid black;}");
    res.write("</style>");
    res.write("<table id='playlist_table'>");
    res.write("<tr><th>No.</th>");
    res.write("<th>URL</th>");
    res.write("<th>Type</th></tr>");
    res.write("</table>");

    
    res.write("<button onclick='addRow()'>Create row</button>");
    res.write("<button onclick='deleteRow()'>Delete row</button>");

    res.write("<script>");
    res.write("function addRow(type, src) {");
    res.write("var table = document.getElementById('playlist_table');");
    res.write("var row = table.insertRow();");
    res.write("var cell1 = row.insertCell(0);");
    res.write("var cell2 = row.insertCell(1);");
    res.write("var cell3 = row.insertCell(2);");
    res.write("cell1.innerHTML = table.rows.length-1;");
    res.write("cell2.innerHTML = src;");
    res.write("cell3.innerHTML = type;");

});


app.listen(4080)
