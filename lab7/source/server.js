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
                        function updateRowNumber() {
                            var table = document.getElementById('playlist_table');
                            var rows = table.rows;
                        
                            for (var i = 1; i < rows.length; i++) {
                                var row = rows[i];
                                var numberCell = row.cells[0];
                                numberCell.textContent = i;
                            }
                        }

                        function moveRowUp(row) {
                            var sibling = row.previousElementSibling;
                            var parent = row.parentNode;
                            var newElement = parent.insertBefore(row, sibling);
                            if (newElement.rowIndex === 0) {
                                    sibling = newElement.previousElementSibling;
                                    parent = newElement.parentNode;
                                    parent.insertBefore(newElement, sibling);
                                }
                        }
                        
                        function moveRowDown(row) {
                            if(row.rowIndex === row.parentNode.rows.length - 1){
                                sibling = row.parentNode.rows[1]
                                parent = row.parentNode;
                                parent.insertBefore(row, sibling);
                            }
                            else {
                                sibling = row.nextElementSibling;
                                parent = row.parentNode;
                                parent.insertBefore(sibling, row);
                            }
                            
                        }

                        function addRow(type, src) {
                            var table = document.getElementById('playlist_table');
                            var row = table.insertRow();
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            var cell3 = row.insertCell(2);
                            var cell4 = row.insertCell(3);
                            cell2.innerHTML = src;
                            cell3.innerHTML = type;
                            cell4.innerHTML =
                                '<button class="removeRowButton" onclick="this.parentNode.parentNode.remove(); updateRowNumber();">Delete</button>' +
                                '<button class="moveRowUpButton" onclick="moveRowUp(this.parentNode.parentNode); updateRowNumber();">Up</button>' +
                                '<button class="moveRowDownButton" onclick="moveRowDown(this.parentNode.parentNode); updateRowNumber();">Down</button>';
                            
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
                                default:
                                    return;
                            }
                            const mediaElement = document.getElementById(elementId);
                            if (mediaElement) {
                                mediaElement.src = cancelSrc;
                            }
                        }


                        function playVideo() { 
                            let video = document.getElementById("videoPlayer");
                            video.play(); 
                        } 

                        function pauseVideo() { 
                            let video = document.getElementById("videoPlayer");
                            video.pause(); 
                        } 
                        

                        function playAudio() { 
                            let audio = document.getElementById("audioPlayer"); 
                            audio.play(); 
                        } 

                        function pauseAudio() { 
                            let audio = document.getElementById("audioPlayer"); 
                            audio.pause(); 
                        } 

                    </script>`;
    res.write(settingsBuild);

    if (!videoFile && !audioFile && !imgFile) {
        res.write("Please provide a video or audio file.");
    } 
    
    if(videoFile){
        let videoBuild = `<video id='videoPlayer' controls src= ${videoFile}></video> <br></br>`;
        videoBuild +=  `<button id='videoCancel' onclick='cancelMedia("video")'>Cancel video</button>`;
        videoBuild +=  `<button id='videoAdd' onclick='addRow("Video", document.getElementById("videoPlayer").src)'>Add video</button> <br>`;
        videoBuild += `<button id='videoPlay' onclick="playVideo()" type="button">Play Video</button>
                        <button id='videoPause' onclick="pauseVideo()" type="button">Pause Video</button><br></br> `;
        res.write(videoBuild);
    } 

    if(audioFile){
        let audioBuild =  `<audio id='audioPlayer' controls src= ${audioFile} ></audio> <br></br>`;
        audioBuild += `<button id='audioCancel' onclick='cancelMedia("audio")'>Cancel audio</button>`;
        audioBuild += `<button id='audioAdd' onclick='addRow("Audio", document.getElementById("audioPlayer").src)'>Add audio</button> <br>`;
        audioBuild += `<button id='audioPlay' onclick="playAudio()" type="button">Play Audio</button>
                        <button id='audioPause' onclick="pauseAudio()" type="button">Pause Audio</button><br></br> `;
        res.write(audioBuild);
    }
    if(imgFile){
        let posterImageBuild =`<img id='posterImage' src= ${imgFile} > <br></br>`;
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
