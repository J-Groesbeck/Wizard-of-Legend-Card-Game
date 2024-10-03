let sfxMuted = localStorage.getItem('sfx-muted') === 'true'
let musicMuted = localStorage.getItem('music-muted') === 'true'

document.addEventListener("DOMContentLoaded", function () {
    var myModal = new bootstrap.Modal(document.getElementById('modal1'));
    myModal.show();
});

let bgm1 = document.getElementById('background-music1')

$('#modal-btn').on('click', function () {
    if (musicMuted === false) {
        bgm1.play()
    }
})