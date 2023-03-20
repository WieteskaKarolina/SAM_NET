const express = require('express')

const app = express()

app.get('/', function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
  
    if (!videoFile && !audioFile && !posterImage) {
      res.send('Please provide a video or audio file.');
    } 
    
    if(videoFile){
    res.send(`<video id="videoPlayer" controls>
                <source src="${videoFile}" type="video/mp4">
                Your browser does not support the video tag.
                </video>`);
    } 
    if(audioFile){
    res.send(`<audio id="audioPlayer" controls>
                <source src="${audioFile}" type="audio/mpeg">
                Your browser does not support the audio tag.
                </audio>`);
    }
    if(posterImage){
        res.send(`<img src="${posterImage}" id="posterImage">`);
    }
    
  });

app.listen(4080)
