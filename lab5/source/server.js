const express = require('express');

const app = express();


app.get('/', function(req, res) {
    const videoFile = req.query.videoFile;
    const audioFile = req.query.audioFile;
    const imgFile = req.query.imgFile;
  
    res.set("Content-Type", "text/html");
    
    let settingsBuild = `<style> table, th, td {
                            border: 1px solid black;
                            width: 50% }
                        </style>`;

    settingsBuild += `<script>
                        function updateRowNumber(){
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
                            cell4.innerHTML = '<button class="removeRowButton" onclick="this.parentNode.parentNode.remove(); updateRowNumber();">Delete</button>';
                        
                            updateRowNumber();
                        }

                        function cancelMedia(mediaType) {
                            let elementId;
                            let cancelSrc;
                            switch (mediaType) {
                                case 'video':
                                    elementId = 'videoPlayer';
                                    cancelSrc = 'cancel.mp4';
                                    break;
                                case 'audio':
                                    elementId = 'audioPlayer';
                                    cancelSrc = 'cancel.mp3';
                                    break;
                                case 'image':
                                    elementId = 'posterImage';
                                    cancelSrc = 'cancel.jpg';
                                    break;
                                default:
                                    return;
                            }
                            const mediaElement = document.getElementById(elementId);
                            if (mediaElement) {
                                mediaElement.src = cancelSrc;
                            }
                        }
                        
                    </script>`;
    res.write(settingsBuild);

    if (!videoFile && !audioFile && !posterImage) {
        res.write("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        let videoBuild = `<video id='videoPlayer' controls src= ${videoFile}></video> <br></br>`;
        videoBuild +=  `<button id='videoCancel' onclick='cancelMedia("video")'>Cancel video</button>`;
        videoBuild +=  `<button id='videoAdd' onclick='addRow("Video", document.getElementById("videoPlayer").src)'>Add video</button> <br></br>`;
        res.write(videoBuild);
    } 

    if(audioFile){
        let audioBuild =  `<audio id='audioPlayer' controls src= ${audioFile} ></audio> <br></br>`;
        audioBuild += `<button id='audioCancel' onclick='cancelMedia("audio")'>Cancel audio</button>`;
        audioBuild += `<button id='audioAdd' onclick='addRow("Audio", document.getElementById("audioPlayer").src)'>Add audio</button> <br></br>`;
        res.write(audioBuild);
    }
    if(imgFile){
        let posterImageBuild =`<img id='posterImage' src= ${imgFile} > <br></br>`;
        posterImageBuild += `<button id='imgCancel' onclick='cancelMedia("image")'>Cancel image</button>`;
        posterImageBuild += `<button id='imgAdd' onclick='addRow("Image", document.getElementById("posterImage").src)'>Add image</button> <br></br>`;
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
