document.addEventListener("DOMContentLoaded", function () {
    var myModal = new bootstrap.Modal(document.getElementById('modal1'));
    myModal.show();
});

let bgm = document.getElementById('background-music')

$('#modal-btn').on('click', function () {
    bgm.play()
})

bgm.volume = 0.1;

$('.options').on('mouseleave', function () {
    $(this).css({
        fontSize: '1.8rem',
        color: '#999999'
    })
})

let sfxMuted = false
if (localStorage.getItem('sfx-muted')) {
    sfxMuted = localStorage.getItem('sfx-muted') === 'true'
    if (sfxMuted === true) {
        $('#mute-sfx').text('Unmute SFX')
    } else {
        $('#mute-sfx').text('Mute SFX')
    }
}

$('#mute-sfx').on('click', function () {
    if (sfxMuted === false) {
        $('#mute-sfx').text('Unmute SFX')
    } else {
        $('#mute-sfx').text('Mute SFX')
    }
    sfxMuted = !sfxMuted
})

let musicMuted = false
if (localStorage.getItem('music-muted')) {
    musicMuted = localStorage.getItem('music-muted') === 'true'
    if (musicMuted === true) {
        $('#mute-music').text('Unmute Music')
        bgm.volume = 0;
    } else {
        $('#mute-music').text('Mute Music')
        bgm.volume = 0.1;
    }
}

$('#mute-music').on('click', function () {
    if (musicMuted === false) {
        $('#mute-music').text('Unmute Music')
        bgm.volume = 0;
    } else {
        $('#mute-music').text('Mute Music')
        bgm.volume = 0.1;
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