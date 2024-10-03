let sfxMuted = localStorage.getItem('sfx-muted') === 'true'
let musicMuted = localStorage.getItem('music-muted') === 'true'

document.addEventListener("DOMContentLoaded", function () {
    var myModal = new bootstrap.Modal(document.getElementById('modal1'));
    myModal.show();
});

let bgmSelection = document.getElementById('background-music-selection')

$('#modal-btn').on('click', function () {
    if (musicMuted === false) {
        bgmSelection.play()
        bgmSelection.volume = 1.0
    }
})

$('#relic-desc1').hide()

$('#relic1').on('mouseenter', function() {
    $('#relic-desc1').show()
})

$('#relic1').on('mouseleave', function() {
    $('#relic-desc1').hide()
})