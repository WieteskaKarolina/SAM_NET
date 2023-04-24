const express = require('express');

const app = express();


app.get('/', function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const posterImage = req.query.imgFile;
  
    res.set("Content-Type", "text/html");
    
    let settingsBuild = `<style> table, th, td {
                            border: 1px solid black;
                            width: 50% }
                        </style>`;

    settingsBuild += `<script>
                        function fun(){
                            var table = document.getElementById('playlist_table');
                            for (var i = 1; i < table.rows.length; i++) {
                                var rowNumberCell = table.rows[i].cells[0];
                                rowNumberCell.innerText = i;
                            }
                        }
                        let rowCounter = 1;
                        function addRow(type, src) {
                            var table = document.getElementById('playlist_table');
                            var row = table.insertRow();
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            cell2.innerHTML = src;
                            cell3.innerHTML = type;
                            cell4.innerHTML = '<button class="removeRowButton" onclick="this.parentNode.parentNode.remove(); fun();">Delete</button>';
                        
                            for (var i = 1; i < table.rows.length; i++) {
                                var rowNumberCell = table.rows[i].cells[0];
                                rowNumberCell.innerText = i;
                            }
                        }
                    </script>`;
    res.write(settingsBuild);

    if (!videoFile && !audioFile && !posterImage) {
        res.write("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        let videoBuild = `<video id='videoPlayer' controls source src= ${videoFile}></video> <br></br>`;
        videoBuild += ` <script>
                            function cancelVideo(){ 
                                document.getElementById('videoPlayer').src = 'cancel.mp4';
                            }
                        </script>`;
        videoBuild +=  `<button id='videoCancel' onclick='cancelVideo()'>Cancel video</button>`;
        videoBuild +=  `<button id='videoAdd' onclick='addRow("Video", "${videoFile}")'>Add video</button> <br></br>`;
        res.write(videoBuild);
    } 

    if(audioFile){
        let audioBuild =  `<audio id='audioPlayer' controls source src= ${audioFile} ></audio> <br></br>`;
        audioBuild += `<script>
                            function cancelAudio(){ 
                                document.getElementById('audioPlayer').src = 'cancel.mp3';
                            }
                        </script>`;
        audioBuild += `<button id='audioCancel' onclick='cancelAudio()'>Cancel audio</button>`;
        audioBuild += `<button id='audioAdd' onclick='addRow("Audio", "${audioFile}")'>Add audio</button> <br></br>`;
        res.write(audioBuild);
    }
    if(posterImage){
        let posterImageBuild =`<img src= ${posterImage} id='posterImage'> <br></br>`;
        posterImageBuild += `<button id='imgAdd' onclick='addRow("Image", "${posterImage}")'>Add image</button> <br></br>`;
        res.write(posterImageBuild);
    }


    let tableBuild = `
    <table id='playlist_table'>
        <tr>
            <th>No.</th>
            <th>URL</th>
            <th>Type</th>
            <th>Action</th>
        </tr>
    </table>`;
    
    res.write(tableBuild);
    res.end();


});


app.listen(4080);
