document.addEventListener("DOMContentLoaded", function () {
    var myModal = new bootstrap.Modal(document.getElementById('modal1'));
    myModal.show();
});

let bgm = document.getElementById('background-music')

$('#modal-btn').on('click', function () {
    bgm.play()
})

bgm.volume = 0.1;

$('.options').on('mouseenter', function () {
    $(this).css({
        fontSize: '1.85rem',
        color: 'white'
    })
    if (sfxMuted === false) {
        let snd = new Audio("../audio/index/hover.wav");
        snd.play();
    }
})

$('.options').on('mouseleave', function () {
    $(this).css({
        fontSize: 'calc(1.3rem + .6vw)',
        color: '#999999'
    })
})

let sfxMuted = false

$('#mute-sfx').on('click', function () {
    if (sfxMuted === false) {
        $('#mute-sfx').text('Unmute SFX')
    } else {
        $('#mute-sfx').text('Mute SFX')
    }
    sfxMuted = !sfxMuted
})

$('.options').on('click', function () {
    if (sfxMuted === false) {
        let snd = new Audio("../audio/index/click.wav");
        snd.play();
    }
})

let musicMuted = false

$('#mute-music').on('click', function () {
    if (musicMuted === false) {
        $('#mute-music').text('Unmute SFX')
        document.getElementById('background-music').volume = 0;
    } else {
        $('#mute-music').text('Mute SFX')
        document.getElementById('background-music').volume = 0.1;
    }
    musicMuted = !musicMuted
})

$('#start').on('click', function () {
    localStorage.setItem('sfx-muted', sfxMuted);
    localStorage.setItem('music-muted', musicMuted);
    setTimeout(() => {
        document.location.href = 'game.html';
    }, 300);
})