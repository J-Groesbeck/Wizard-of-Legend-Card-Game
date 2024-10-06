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

$('#relic1').on('mouseenter', function () {
    $('#relic-desc1').show()
})

$('#relic1').on('mouseleave', function () {
    $('#relic-desc1').hide()
})

$('#relic-desc2').hide()

$('#relic2').on('mouseenter', function () {
    $('#relic-desc2').show()
})

$('#relic2').on('mouseleave', function () {
    $('#relic-desc2').hide()
})

$('#relic-desc3').hide()

$('#relic3').on('mouseenter', function () {
    $('#relic-desc3').show()
})

$('#relic3').on('mouseleave', function () {
    $('#relic-desc3').hide()
})

$('#relic-desc4').hide()

$('#relic4').on('mouseenter', function () {
    $('#relic-desc4').show()
})

$('#relic4').on('mouseleave', function () {
    $('#relic-desc4').hide()
})

$('#healing-desc').hide()

$('#healing').on('mouseenter', function () {
    $('#healing-desc').show()
})

$('#healing').on('mouseleave', function () {
    $('#healing-desc').hide()
})



$('#cursed-relic-desc1').hide()

$('#cursed-relic1').on('mouseenter', function () {
    $('#cursed-relic-desc1').show()
})

$('#cursed-relic1').on('mouseleave', function () {
    $('#cursed-relic-desc1').hide()
})

$('#cursed-relic-desc2').hide()

$('#cursed-relic2').on('mouseenter', function () {
    $('#cursed-relic-desc2').show()
})

$('#cursed-relic2').on('mouseleave', function () {
    $('#cursed-relic-desc2').hide()
})

$('#cursed-relic-desc3').hide()

$('#cursed-relic3').on('mouseenter', function () {
    $('#cursed-relic-desc3').show()
})

$('#cursed-relic3').on('mouseleave', function () {
    $('#cursed-relic-desc3').hide()
})

let relicDeck = []

function shuffleRelics() {
    let relicAmount = relics.length
    for (let i = 0; i < relicAmount; i++) {
        let k = Math.floor(Math.random() * relics.length);
        relicDeck.push(relics[k]);
        relics.splice(k, 1);
    }
}
shuffleRelics()

let cursedRelicDeck = []

function shuffleCursedRelics() {
    let cursedRelicAmount = cursedRelics.length
    for (let i = 0; i < cursedRelicAmount; i++) {
        let k = Math.floor(Math.random() * cursedRelics.length);
        cursedRelicDeck.push(cursedRelics[k]);
        cursedRelics.splice(k, 1);
    }
}
shuffleCursedRelics()

function refreshShop() {
    //relics
    if (relicDeck.length < 4) {
        shuffleRelics()
    }
    for (let i = 1; i < 5; i++) {
        $(`#relic-cost${i}`).text(relicDeck[0].cost)
        $(`#relic-img${i}`).attr('src', `/img/relics/${relicDeck[0].img}`)
        $(`#relic-name${i}`).text(relicDeck[0].name)
        $(`#relic-desc${i}`).text(relicDeck[0].description)
        relics.push(relicDeck[0]);
        relicDeck.splice(0, 1);
    }
    //arcana

    //cursed relics
    if (cursedRelicDeck.length < 3) {
        shuffleCursedRelics()
    }
    for (let i = 1; i < 4; i++) {
        $(`#cursed-relic-img${i}`).attr('src', `/img/relics/${cursedRelicDeck[0].img}`)
        $(`#cursed-relic-name${i}`).text(cursedRelicDeck[0].name)
        $(`#cursed-relic-desc${i}`).text(cursedRelicDeck[0].description)
        cursedRelics.push(cursedRelicDeck[0]);
        cursedRelicDeck.splice(0, 1);
    }
    //events

}
refreshShop()