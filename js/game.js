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

    let relicBought = [false, false, false, false]

    for (let i = 1; i < 5; i++) {
        $(`#relic-desc${i}`).hide()
        $(`#buy-prompt${i}`).hide()
        $(`#relic${i}`).on('mouseenter', function () {
            if (relicBought[(i - 1)] === false) {
                $(`#relic-desc${i}`).show()
                $(`#buy-prompt${i}`).show()
            }
            $(document).on('keyup', function (e) {
                if (e.key === 'f') {
                    $(`#relic-cost${i}`).text('X')
                    $(`#relic-img${i}`).attr('src', `/img/empty_slot.png`)
                    $(`#relic-name${i}`).text('(Empty)')
                    $(`#relic-desc${i}`).text('')
                    $(`#relic-desc${i}`).hide()
                    $(`#buy-prompt${i}`).hide()
                    $(document).off('keyup');
                    relicBought[(i - 1)] = true
                }
            })
        }).on('mouseleave', function () {
            $(`#relic-desc${i}`).hide()
            $(`#buy-prompt${i}`).hide()
            $(document).off('keyup');
        })
    }

    $('#healing-desc').hide()
    $('#buy-prompt5').hide()

    $('#healing').on('mouseenter', function () {
        $('#healing-desc').show()
        $('#buy-prompt5').show()
        $(document).on('keyup', function (e) {
            if (e.key === 'f') {

            }
        })
    }).on('mouseleave', function () {
        $('#healing-desc').hide()
        $('#buy-prompt5').hide()
        $(document).off('keyup');
    })

    let cursedRelicBought = [false, false, false]

    for (let i = 1; i < 4; i++) {
        $(`#cursed-relic-desc${i}`).hide()
        $(`#buy-prompt${i + 5}`).hide()
        $(`#cursed-relic${i}`).on('mouseenter', function () {
            if (cursedRelicBought[(i - 1)] === false) {
                $(`#cursed-relic-desc${i}`).show()
                $(`#buy-prompt${i + 5}`).show()
            }
            $(document).on('keyup', function (e) {
                if (e.key === 'f') {
                    $(`#cursed-relic-cost${i}`).text('X')
                    $(`#cursed-relic-img${i}`).attr('src', `/img/empty_slot.png`)
                    $(`#cursed-relic-name${i}`).text('(Empty)')
                    $(`#cursed-relic-desc${i}`).text('')
                    $(`#cursed-relic-desc${i}`).hide()
                    $(`#buy-prompt${i + 5}`).hide()
                    $(document).off('keyup');
                    cursedRelicBought[(i - 1)] = true
                }
            })
        }).on('mouseleave', function () {
            $(`#cursed-relic-desc${i}`).hide()
            $(`#buy-prompt${i + 5}`).hide()
            $(document).off('keyup');
        })
    }

    let doctorRelicBought = false
    $('#doctor-relic-desc').hide()
    $('#buy-prompt9').hide()

    $('#doctor-relic').on('mouseenter', function () {
        if (doctorRelicBought === false) {
            $('#doctor-relic-desc').show()
            $('#buy-prompt9').show()
        }
        $(document).on('keyup', function (e) {
            if (e.key === 'f') {
                $(`#doctor-relic-cost`).text('X')
                $(`#doctor-relic-img`).attr('src', `/img/empty_slot.png`)
                $(`#doctor-relic-name`).text('(Empty)')
                $(`#doctor-relic-desc`).text('')
                $(`#doctor-relic-desc`).hide()
                $(`#buy-prompt9`).hide()
                $(document).off('keyup');
                doctorRelicBought = true
            }
        })
    }).on('mouseleave', function () {
        $('#doctor-relic-desc').hide()
        $('#buy-prompt9').hide()
        $(document).off('keyup');
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
        relicBought = [false, false, false, false]
        if (relicDeck.length < 4) {
            shuffleRelics()
        }
        for (let i = 1; i < 5; i++) {
            $(`#relic-cost${i}`).text(relicDeck[0].cost)
            $(`#relic-img${i}`).attr('src', `https://j-groesbeck.github.io/Wizard-of-Legend-Card-Game/img/relics/${relicDeck[0].img}`)
            $(`#relic-name${i}`).text(relicDeck[0].name)
            $(`#relic-desc${i}`).text(relicDeck[0].description)
            relics.push(relicDeck[0]);
            relicDeck.splice(0, 1);
        }
        //arcana

        //cursed relics
        cursedRelicBought = [false, false, false]
        if (cursedRelicDeck.length < 3) {
            shuffleCursedRelics()
        }
        for (let i = 1; i < 4; i++) {
            $(`#cursed-relic-cost${i}`).text(relicDeck[0].cost)
            $(`#cursed-relic-img${i}`).attr('src', `https://j-groesbeck.github.io/Wizard-of-Legend-Card-Game/img/relics/${cursedRelicDeck[0].img}`)
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
            $('#event-img').attr('src', 'https://j-groesbeck.github.io/Wizard-of-Legend-Card-Game/img/Tailor.png')
            $('#doctor-relic').hide()
        } else if (eventNumber === 1) {
            $('#event-img').attr('src', 'https://j-groesbeck.github.io/Wizard-of-Legend-Card-Game/img/Doctor.png')
            $('#doctor-relic').show()
            if (doctorRelicDeck.length === 0) {
                shuffleDoctorRelics()
            }
            $(`#doctor-relic-cost`).text('1 Random Arcana')
            $(`#doctor-relic-img`).attr('src', `https://j-groesbeck.github.io/Wizard-of-Legend-Card-Game/img/relics/${doctorRelicDeck[0].img}`)
            $(`#doctor-relic-name`).text(doctorRelicDeck[0].name)
            $(`#doctor-relic-desc`).text(doctorRelicDeck[0].description)
            doctorRelics.push(doctorRelicDeck[0]);
            doctorRelicDeck.splice(0, 1);
        }
    }
    refreshShop()
})