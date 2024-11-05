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

let gold = 3000
let gems = 50
let relicInventory = []

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
                let relicCost = $(`#relic-cost${i}`).text()
                if (gold >= relicCost || checkIfHaveRelic('Wallet of Vigor') || checkIfHaveRelic('Wallet of Splendor') && (gold + gems) >= relicCost) {
                    if(checkIfHaveRelic('Wallet of Splendor') && (gold + gems) >= relicCost) {
                        gold -= relicCost
                        gems -= Math.abs(gold)
                        gold = 0
                    } else if (checkIfHaveRelic('Wallet of Vigor') && !(gold >= relicCost)) {
                        gold -= relicCost
                        currentHP -= Math.abs(gold)
                        if (currentHP <= 0) {
                            gameOver()
                        }
                        gold = 0
                    } else if (!(checkIfHaveRelic(`Raffle Ticket`) && Math.random() <= 5)) {
                        gold -= relicCost
                    }
                    let relicName = $(`#relic-name${i}`).text()
                    boughtRelicEffect(relicName)
                    let relicIndex = relics.findIndex(relic => relic.name === relicName)
                    relicInventory.push(relics[relicIndex]);
                    relics.splice(relicIndex, 1);
                    if (checkIfHaveRelic(`Supply Crate`)) {
                        let $cost = relicDeck[1].cost
                        if (checkIfHaveRelic('Relic Rewards Card')) {
                            $cost *= .8
                        }
                        if (checkIfHaveRelic('Golden Armor of Envy')) {
                            $cost *= 1.5
                        }
                        if (checkIfHaveRelic('Golden Saber of Envy')) {
                            $cost *= 1.5
                        }
                        $(`#relic-cost${i}`).text(Math.floor($cost))
                        $(`#relic-img${i}`).attr('src', `https://j-groesbeck.github.io/Wizard-of-Legend-Card-Game/img/relics/${relicDeck[0].img}`)
                        $(`#relic-name${i}`).text(relicDeck[0].name)
                        $(`#relic-desc${i}`).text(relicDeck[0].description)
                        relics.push(relicDeck[0]);
                        relicDeck.splice(0, 1);
                    } else {
                        $(`#relic-cost${i}`).text('X')
                        $(`#relic-img${i}`).attr('src', `/img/empty_slot.png`)
                        $(`#relic-name${i}`).text('(Empty)')
                        $(`#relic-desc${i}`).text('')
                        $(`#relic-desc${i}`).hide()
                        $(`#buy-prompt${i}`).hide()
                        $(document).off('keyup');
                        relicBought[(i - 1)] = true
                    }
                }
            }
        })
    }).on('mouseleave', function () {
        $(`#relic-desc${i}`).hide()
        $(`#buy-prompt${i}`).hide()
        $(document).off('keyup');
    })
}

let currentHP = 400
let maxHP = 500
let shield = 0
let potionCost = 100
let potionHealing = .4
let healMult = 1
let dmgMult = 1
let airDmgMult = 0
let fireDmgMult = 0
let waterDmgMult = 0
let earthDmgMult = 0
let lightningDmgMult = 0
let critChance = 0.05
let critDmg = 2
let critHealChance = 0
let evadeChance = 0
let armor = 1
let airResist = 1
let fireResist = 1
let waterResist = 1
let earthResist = 1
let lightningResist = 1
let goldMult = 1

let bachRevive = 0
let ellaHits = 0
let kaliRevive = false
let pazuRevive = false
let haloRevive = false
let loan = 0

function boughtRelicEffect(rName) {
    if (rName === 'Relic Rewards Card') {
        for (i = 1; i < 5; i++) {
            $(`#relic-cost${i}`).text($(`#relic-cost${i}`).text() * .8)
        }
    }
    if (rName === 'Golden Armor of Envy') {
        for (i = 1; i < 5; i++) {
            $(`#relic-cost${i}`).text($(`#relic-cost${i}`).text() * 1.5)
        }
        armor -= .16
    }
    if (rName === 'Golden Saber of Envy') {
        for (i = 1; i < 5; i++) {
            $(`#relic-cost${i}`).text($(`#relic-cost${i}`).text() * 1.5)
        }
        dmgMult += .2
    }
    if (rName === 'Royal Jelly') {
        potionHealing = 1.4
    }
    if (rName === 'Amulet of Sundering') {
        dmgMult += 0.08
    }
    if (rName === 'Analytical Monocle') {
        critChance += 0.08
    }
    if (rName === `Assassin's Blade`) {
        critDmg += 0.5
    }
    if (rName === `Battery of Taranis`) {
        lightningDmgMult += 0.12
    }
    if (rName === `Chaos Scanner`) {
        dmgMult += 0.04
    }
    if (rName === `Ebon Wolf's Cloak`) {
        airDmgMult -= 0.12
        fireDmgMult += 0.12
        waterDmgMult -= 0.12
        earthDmgMult -= 0.12
        lightningDmgMult += 0.12
    }
    if (rName === `Gaia's Shovel`) {
        earthDmgMult += 0.12
    }
    if (rName === `Idealist's Mirror`) {
        currentHP = maxHP
    }
    if (rName === `Idealist's Scorecard`) {
        currentHP = maxHP
    }
    if (rName === `Idealist's Vest`) {
        currentHP = maxHP
    }
    if (rName === `Ifrit's Matchstick`) {
        fireDmgMult += 0.12
    }
    if (rName === `Rudra's Pinwheel`) {
        airDmgMult += 0.12
    }
    if (rName === `Shiva's Water Bottle`) {
        waterDmgMult += 0.12
    }
    if (rName === 'Antiquated Tabi') {
        evadeChance += 0.08
    }
    if (rName === 'Auger of Poetry') {
        earthResist -= 0.25
    }
    if (rName === `Bach's Escape Key`) {
        bachRevive = 1
    }
    if (rName === 'Catalytic Vial') {
        critHealChance += 0.1
    }
    if (rName === `Ella's Glass Kite`) {
        ellaHits = 5
    }
    if (rName === 'Elven Ears') {
        healMult += .2
    }
    if (rName === `Euphie's Shawl`) {
        armor -= .05
    }
    if (rName === `Giant's Heart`) {
        maxHP += 50
        currentHP += 50
    }
    if (rName === 'Insulated Vest') {
        lightningResist += 0.25
    }
    if (rName === `Kali's Flower Diadem`) {
        kaliRevive = true
    }
    if (rName === `Pazu's Favorite Hat`) {
        pazuRevive = true
    }
    if (rName === 'Resolute Svalinn') {
        fireResist += 0.25
    }
    if (rName === 'Three Gorges Bulwark') {
        waterResist += 0.25
    }
    if (rName === `Glove of Midas`) {
        goldMult += .15
    }
    if (rName === `Catalytic Tonic`) {
        critHealChance += .25
    }
    if (rName === `Critical Placebos`) {
        critChance += .12
    }
    if (rName === `Health Care Card`) {
        potionCost = 75
    }
    if (rName === `Messy Prescription`) {
        healMult += .50
    }
    if (rName === `Bewitching Glue`) {
        dmgMult += .2
    }
    if (rName === 'Crimson Clover') {
        critChance += .15
    }
    if (rName === `Glass Cannon`) {
        dmgMult += .2
        maxHP *= .7
    }
    if (rName === 'Graduation Bouquet') {
        goldMult /= 2
    }
    if (rName === `Heartrender's Amulet`) {
        maxHP *= .6
    }
    if (rName === `Horned Halo`) {
        haloRevive = true
        currentHP /= 2
    }
    if (rName === `Jeremiah's Needle`) {
        critDmg += 1
        critChance -= .25
    }
    if (rName === `Magician's Wand`) {
        dmgMult += .2
    }
    if (rName === `Nog's Heavenly Boots`) {
        evadeChance += .45
    }
    if (rName === `Ominous Loan Note`) {
        gold += 250
        loan = 250
    }
    if (rName === `Oversized Needle`) {
        dmgMult *= .25
        critDmg += 8
    }
    if (rName === `Tipsy Gladius`) {
        evadeChance += .15
        critChance /= 2
    }
    if (rName === `Tortoise Shield`) {
        dmgMult -= .2
        armor -= .2
    }
}

function gainGold(amt) {
    if(loan > 0) {
        amt -= loan
        if (amt < 0) {
            loan = Math.abs(amt)
            amt = 0
        }
    }
    return amt * goldMult
}

$('#healing-desc').hide()
$('#buy-prompt5').hide()

$('#healing').on('mouseenter', function () {
    $('#healing-desc').show()
    $('#buy-prompt5').show()
    $(document).on('keyup', function (e) {
        if (e.key === 'f') {
            if (gold >= potionCost) {
                gold -= potionCost
                heal(maxHP * potionHealing)
                if (Math.ceil(potionHealing) != 0) {
                    if (!(checkIfHaveRelic('Royal Jelly'))) {
                        potionHealing -= 0.05
                    }
                    $('#healing-amt').text(Math.ceil(potionHealing * 100))
                }
            }
        }
    })
}).on('mouseleave', function () {
    $('#healing-desc').hide()
    $('#buy-prompt5').hide()
    $(document).off('keyup');
})

function heal(amt) {
    amt *= healMult
    if (Math.random() < critHealChance) {
        amt *= 2
    }

    currentHP += amt

    if (checkIfHaveRelic('Takeout Box') && currentHP > maxHP) {
        gainShield(currentHP - maxHP)
        currentHP = maxHP
    } else if (currentHP > maxHP) {
        currentHP = maxHP
    }
}

function gainShield(amt) {
    shield += amt
}

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
                let cursedRelicCost = $(`#cursed-relic-cost${i}`).text()
                if (gems >= cursedRelicCost) {
                    gems -= cursedRelicCost
                    let cursedRelicName = $(`#cursed-relic-name${i}`).text()
                    boughtRelicEffect(cursedRelicName)
                    let cursedRelicIndex = cursedRelics.findIndex(relic => relic.name === cursedRelicName)
                    relicInventory.push(cursedRelics[cursedRelicIndex]);
                    cursedRelics.splice(cursedRelicIndex, 1);
                    $(`#cursed-relic-cost${i}`).text('X')
                    $(`#cursed-relic-img${i}`).attr('src', `/img/empty_slot.png`)
                    $(`#cursed-relic-name${i}`).text('(Empty)')
                    $(`#cursed-relic-desc${i}`).text('')
                    $(`#cursed-relic-desc${i}`).hide()
                    $(`#buy-prompt${i + 5}`).hide()
                    $(document).off('keyup');
                    cursedRelicBought[(i - 1)] = true
                }
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
        let $cost = relicDeck[0].cost
        if (checkIfHaveRelic('Relic Rewards Card')) {
            $cost *= .8
        }
        if (checkIfHaveRelic('Golden Armor of Envy')) {
            $cost *= 1.5
        }
        if (checkIfHaveRelic('Golden Saber of Envy')) {
            $cost *= 1.5
        }
        $(`#relic-cost${i}`).text(Math.floor($cost))
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
        $(`#cursed-relic-cost${i}`).text('25')
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

function checkIfHaveRelic(relicsName) {
    let boolean = relicInventory.some(relic => relic.name === relicsName)
    return boolean
}

function gameOver() {
    if (Math.random() < bachRevive) {
        bachRevive /= 2
    } else if (kaliRevive) {

    } else if (pazuRevive) {

    } else if (haloRevive) {

    } else {
        console.log('You suck')
    }
}