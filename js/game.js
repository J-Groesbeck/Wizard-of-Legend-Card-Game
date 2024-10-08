$(document).ready(function () {
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
    $('#buy-prompt1').hide()

    $('#relic1').on('mouseenter', function () {
        $('#relic-desc1').show()
        $('#buy-prompt1').show()
    })

    $('#relic1').on('mouseleave', function () {
        $('#relic-desc1').hide()
        $('#buy-prompt1').hide()
    })

    $('#relic-desc2').hide()
    $('#buy-prompt2').hide()

    $('#relic2').on('mouseenter', function () {
        $('#relic-desc2').show()
        $('#buy-prompt2').show()
    })

    $('#relic2').on('mouseleave', function () {
        $('#relic-desc2').hide()
        $('#buy-prompt2').hide()
    })

    $('#relic-desc3').hide()
    $('#buy-prompt3').hide()

    $('#relic3').on('mouseenter', function () {
        $('#relic-desc3').show()
        $('#buy-prompt3').show()
    })

    $('#relic3').on('mouseleave', function () {
        $('#relic-desc3').hide()
        $('#buy-prompt3').hide()
    })

    $('#relic-desc4').hide()
    $('#buy-prompt4').hide()

    $('#relic4').on('mouseenter', function () {
        $('#relic-desc4').show()
        $('#buy-prompt4').show()
    })

    $('#relic4').on('mouseleave', function () {
        $('#relic-desc4').hide()
        $('#buy-prompt4').hide()
    })

    $('#healing-desc').hide()
    $('#buy-prompt5').hide()

    $('#healing').on('mouseenter', function () {
        $('#healing-desc').show()
        $('#buy-prompt5').show()
    })

    $('#healing').on('mouseleave', function () {
        $('#healing-desc').hide()
        $('#buy-prompt5').hide()
    })



    $('#cursed-relic-desc1').hide()
    $('#buy-prompt6').hide()

    $('#cursed-relic1').on('mouseenter', function () {
        $('#cursed-relic-desc1').show()
        $('#buy-prompt6').show()
    })

    $('#cursed-relic1').on('mouseleave', function () {
        $('#cursed-relic-desc1').hide()
        $('#buy-prompt6').hide()
    })

    $('#cursed-relic-desc2').hide()
    $('#buy-prompt7').hide()

    $('#cursed-relic2').on('mouseenter', function () {
        $('#cursed-relic-desc2').show()
        $('#buy-prompt7').show()
    })

    $('#cursed-relic2').on('mouseleave', function () {
        $('#cursed-relic-desc2').hide()
        $('#buy-prompt7').hide()
    })

    $('#cursed-relic-desc3').hide()
    $('#buy-prompt8').hide()

    $('#cursed-relic3').on('mouseenter', function () {
        $('#cursed-relic-desc3').show()
        $('#buy-prompt8').show()
    })

    $('#cursed-relic3').on('mouseleave', function () {
        $('#cursed-relic-desc3').hide()
        $('#buy-prompt8').hide()
    })



    $('#doctor-relic-desc').hide()
    $('#buy-prompt9').hide()

    $('#doctor-relic').on('mouseenter', function () {
        $('#doctor-relic-desc').show()
        $('#buy-prompt9').show()
    })

    $('#doctor-relic').on('mouseleave', function () {
        $('#doctor-relic-desc').hide()
        $('#buy-prompt5').hide()
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

    let doctorRelicDeck = []

    function shuffleDoctorRelics() {
        let doctorRelicAmount = doctorRelics.length
        for (let i = 0; i < doctorRelicAmount; i++) {
            let k = Math.floor(Math.random() * doctorRelics.length);
            doctorRelicDeck.push(doctorRelics[k]);
            doctorRelics.splice(k, 1);
        }
    }
    shuffleCursedRelics()

    let cloakUpgraded = false
    let eventNumber

    function refreshShop() {
        //relics
        if (relicDeck.length < 4) {
            shuffleRelics()
        }
        for (let i = 1; i < 5; i++) {
            $(`#relic-cost${i}`).text(relicDeck[0].cost)
            $(`#relic-img${i}`).attr('src', `../img/relics/${relicDeck[0].img}`)
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
            $(`#cursed-relic-img${i}`).attr('src', `../img/relics/${cursedRelicDeck[0].img}`)
            $(`#cursed-relic-name${i}`).text(cursedRelicDeck[0].name)
            $(`#cursed-relic-desc${i}`).text(cursedRelicDeck[0].description)
            cursedRelics.push(cursedRelicDeck[0]);
            cursedRelicDeck.splice(0, 1);
        }
        //events
        if (cloakUpgraded === false) {
            eventNumber = Math.floor(Math.random() * 2)
        } else {
            eventNumber = 1
        }
        if (eventNumber === 0) {
            $('#event-img').attr('src', '../img/Tailor.png')
            $('#doctor-relic').hide()
        } else if (eventNumber === 1) {
            $('#event-img').attr('src', '../img/Doctor.png')
            $('#doctor-relic').show()
            if (doctorRelicDeck.length === 0) {
                shuffleDoctorRelics()
            }
            $(`#doctor-relic-img`).attr('src', `../img/relics/${doctorRelicDeck[0].img}`)
            $(`#doctor-relic-name`).text(doctorRelicDeck[0].name)
            $(`#doctor-relic-desc`).text(doctorRelicDeck[0].description)
            doctorRelics.push(doctorRelicDeck[0]);
            doctorRelicDeck.splice(0, 1);
        }
    }
    refreshShop()
})