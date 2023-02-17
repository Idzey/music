let card_info = document.querySelector('.card-info');
let traks = document.querySelector('.traks');
let search = new URLSearchParams(window.location.search);
let id = search.get(`id`);
let album = albums[id];
function renderAlbumInfo () {
    card_info.innerHTML = `
        <div class="card mb-3">
        <div class="row">
            <div class="col-md-4 col-lg-6">
                <img src="${album.img}" class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8 col-lg-6">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">${album.description}</p>
                    <p class="card-text"><small class="text-muted">Год: ${album.year}</small></p>
                </div>
            </div>
        </div>
        </div>
    `;
}
function renderTracks () {
    if (id != null) {
        for (let i = 0; i < album.traks.length; i++) {
            traks.innerHTML += `
            <li class="list-group-item">
                <div class="col-4 d-flex">
                    <audio class="audio" src="${album.traks[i].src}"></audio>
                        <button type="button" class="btn"><img src="assets/play.svg" alt="play" width="28px" height="28px"></button>
                    <div>
                        <div>${album.traks[i].title}</div>
                        <div class="text-muted">${album.traks[i].author}</div>
                    </div>
                </div>
                <div class="col-8 d-flex align-items-center gap-2">
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" aria-label="Basic example" style="width: 0%" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span class="time ms-auto">${album.traks[i].time}</span>
                </div>
            </li>
            `;
        }
    } else {
        traks.innerHTML = `<h2 class="text-danger text-center">Альбом не выбран</h2>`
    }
}

function SetupAudio() {
    let list_group = document.querySelectorAll('.list-group-item');
    let tracks = album.traks;
    for (let i = 0; i < list_group.length; i++) {
        let item = list_group[i];
        let timeNode = item.querySelector('.time');

        let track = tracks[i];
        let audio = item.querySelector('.audio');

        let img = item.querySelector('img');
        let progress = item.querySelector('.progress-bar');
        item.addEventListener(`click`, function () {
            // Если трек сейчас играет...
            if (track.isPlaying) {
                track.isPlaying = false;
                // Поставить на паузу
                audio.pause();
                img.src = 'assets/play.svg';
                // Если трек сейчас не играет...
            } else {
                track.isPlaying = true;
                // Включить проигрывание
                audio.play();
                img.src = 'assets/pause.svg';
                updateProgress();
            }
        });
        function updateProgress() {
            // Нарисовать актуальное время
            timeNode.innerHTML = getTime(audio.currentTime);
            time = Math.floor(Math.floor(audio.currentTime) / Math.floor(audio.duration) * 100) / 100 * 100;
            progress.style.width = time + `%`;
            // Нужно ли вызвать её ещё раз?
            if (track.isPlaying) {
                  requestAnimationFrame(updateProgress);
            }
            
        }
    }

}
renderAlbumInfo();
renderTracks();
SetupAudio();
function getTime(time) {
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds / 60);
    let seconds = Math.floor(currentSeconds % 60);
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}