class Pokemon {
    constructor(name, sprite1, sprite2, animFunc, pokemonCry = new Audio('./assets/cries/201.wav'), framesOfAnim = 60, spriteAnimSt = [31], spriteAnimNd = [1], animDelay = 0) {
        this.name = name
        this.sprite1 = sprite1
        this.sprite2 = sprite2
        this.spriteAnimSt = spriteAnimSt
        this.spriteAnimNd = spriteAnimNd
        this.cry = pokemonCry
        this.framesOfAnim = framesOfAnim
        this.animDelay = animDelay

        this.animFunc = animFunc
        pokemonCollection.push(this)
    }
}
const diglett =   new Pokemon('diglett', './assets/diglett1.png', './assets/diglett2.png',      animVShake,           new Audio('./assets/cries/050.wav'), 66,  [1,66], [26], 25)
const dodrio =    new Pokemon('dodrio', './assets/dodrio1.png', './assets/dodrio2.png',         animLungeGrow,        new Audio('./assets/cries/085.wav'), 104, [1,25,49,73,96], [13,37,61,85])
const heracross = new Pokemon('heracross', './assets/heracross1.png', './assets/heracross2.png',animLungeGrow,        new Audio('./assets/cries/214.wav'), 66,  [1,22,42], [12,32])
const pidgeot =   new Pokemon('pidgeot', './assets/pidgeot1.png', './assets/pidgeot2.png',      animFrontFlip,        new Audio('./assets/cries/018.wav'), 46,  [21,46], [1,31])
const pikachu =   new Pokemon('pikachu', './assets/pikachu1.png', './assets/pikachu2.png',      animFlashYellow,      new Audio('./assets/cries/025.wav'), 85,  [1,36,71], [16,51])
const tyranitar = new Pokemon('tyranitar', './assets/tyranitar1.png', './assets/tyranitar2.png',animHShake,           new Audio('./assets/cries/248.wav'), 50,  [11,41], [1,31], 10)
const salamence = new Pokemon('salamence', './assets/salamence1.png', './assets/salamence2.png',animHShake,           new Audio('./assets/cries/373.wav'), 110,  [11,55], [1,41], 60)
const rapidash =  new Pokemon('rapidash', './assets/rapidash1.png', './assets/rapidash2.png',   animCircularVibrate_2,  new Audio('./assets/cries/078.wav'), 60,  [1, 51], [11])
const persian =   new Pokemon('persian', './assets/persian1.png', './assets/persian2.png',      dummyFunc,            new Audio('./assets/cries/053.wav'), 70,  [51], [1],  20)
const sunkern =   new Pokemon('sunkern', './assets/sunkern1.png', './assets/sunkern2.png',      animJumpsSmall,       new Audio('./assets/cries/191.wav'), 40,  [11,31], [1,21])
const unown =     new Pokemon('unown', './assets/unown1.png', './assets/unown2.png',            animZigzagFast,       new Audio('./assets/cries/201.wav'), 61,  [1, 61], [31])
const glalie =    new Pokemon('glalie', './assets/glalie1.png', './assets/glalie2.png',         animZigzagFast,       new Audio('./assets/cries/362.wav'), 75,  [1, 31, 61], [16, 46, 75])

// Temporary
let pokemonToCall = heracross

dropMenu.addEventListener('change', selectSprite)
btnSpriteAnim.addEventListener('click', function() {
    returnDefault()
    pokemonToCall.cry.pause()
    pokemonToCall.cry.currentTime = 0
    timelineFrame = 0
    frameCounter.innerHTML = timelineFrame
    selectedValue = dropMenu.value;
    pokemonSprite.src = `./assets/${selectedValue}_1.png`
    pokemonToCall = pokemonCollection.find(pkmn => pkmn.name == selectedValue)
}

function playPkmnCry(pokemon) {
    pokemon.cry.pause()
    pokemon.cry.currentTime = 0
    pokemon.cry.play()
}

function changeSprites(pokemon) {
    if(pokemon.spriteAnimSt.some((changeFrame) => changeFrame === timelineFrame))
        pokemonSprite.src = pokemon.sprite1
    else if(pokemon.spriteAnimNd.some((changeFrame) => changeFrame === timelineFrame))
        pokemonSprite.src = pokemon.sprite2
}

function addToSpriteOffsets(sprPosOffsetX = 0, sprPosOffsetY = 0, sprRotOffset = 0, sprScale = 1) {
    spritePositionOffsetX += sprPosOffsetX
    spritePositionOffsetY += sprPosOffsetY
    spriteRotateOffset += sprRotOffset
    spriteScale = sprScale
}
function resetSpriteOffsets() {
    spritePositionOffsetX = 0
    spritePositionOffsetY = 0
    spriteRotateOffset = 0
    spriteScale = 1
    changeBoolX = 1
    changeBoolY = 1
    pokemonSprite.style.left = '0px'
    pokemonSprite.style.top = '0px'
    pokemonSprite.style.rotate = '0deg'
    pokemonSprite.style.width = "16rem"
}
function swapImg() {
    if(pokemonSprite.src === `file:///C:/Users/elbec/Desktop/programacion/experimentos/pokemon_emerald_animTest/assets/${pokemonToCall.name}2.png`) {
        pokemonSprite.src = `file:///C:/Users/elbec/Desktop/programacion/experimentos/pokemon_emerald_animTest/assets/${pokemonToCall.name}1.png`
        return
    }
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio
    spritePositionOffsetX = calcSin(animFrame * 60) * 2
    pokemonSprite.style.left = `${Math.floor(spritePositionOffsetX + 0.5) * pixelUnit}px`
}
function animVShake(dly = 0) {
    const animFrame = timelineFrame - dly
    if(animFrame <= 1 || animFrame > 39) {
        spritePositionOffsetY = 0
        pokemonSprite.style.top = `${Math.floor(spritePositionOffsetY + 0.5) * pixelUnit}px`
        return
    }
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio
    spritePositionOffsetY = calcSin(animFrame * 60) * 2
    pokemonSprite.style.top = `${Math.floor(spritePositionOffsetY + 0.5) * pixelUnit}px`
}
function animLungeGrow(dly = 0) {
    if(timelineFrame - dly < 0 || timelineFrame - dly > 66) return
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio

    sineValue = parseFloat(Math.sin( ((timelineFrame % 33)*(60 / 11)) * (Math.PI / 180) ).toFixed(2))
    spritePositionOffsetX = sineValue * (-64/3)
    spritePositionOffsetY = sineValue * (-64/12)
    spriteScale = (sineValue/3) + 1
    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`
    pokemonSprite.style.width = `${spriteScale * 16}rem`
}
function animFrontFlip(dly = 0) {
    const animFrame = timelineFrame - dly
    if(animFrame < 0 || animFrame > 46) return
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio
    if(animFrame === 46) resetSpriteOffsets()
    else if((animFrame > 2 && animFrame < 19) || (animFrame > 35 && animFrame < 51)) addToSpriteOffsets(1, -1)
    else if(animFrame > 18 && animFrame < 35) addToSpriteOffsets(-2, 2, -22.5)
    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`
    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
    pokemonSprite.style.rotate = `${spriteRotateOffset}deg`
}
function animCircularVibrate(dly = 0) {
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio
    const animFrame = timelineFrame - dly
    if(animFrame < 0 || animFrame > 56) return
    changeBoolY = ![16,31,44].some((frame) => frame === animFrame) ? changeBoolY * -1 : changeBoolY
    changeBoolX = ![24, 37].some((frame) => frame === animFrame) ? changeBoolX * -1 : changeBoolX
    spritePositionOffsetY += calcCircularVibrateOffset(animFrame, [31, 16], [36, 22], [39, 25, 12], [44, 32, 14], [44, 6], [50, 13], [50], [58])
    spritePositionOffsetX += calcCircularVibrateOffset(animFrame, [37, 24, 9], [41, 29, 13], [49, 32, 18], [52, 37, 23], [41, 13], [43, 17], [43], [49])
    
    console.log(`AnimFrame: ${animFrame}. updAnimFrame: ${animFrame * 9}. X: ${spritePositionOffsetX}. Y: ${spritePositionOffsetY}. changeBool: ${(changeBoolX == true)}`)

    pokemonSprite.style.left = `${Math.floor(spritePositionOffsetX) * changeBoolX * pixelUnit}px`
    pokemonSprite.style.top = `${Math.floor(spritePositionOffsetY) * changeBoolY * pixelUnit}px`
}
function calcCircularVibrateOffset(currentFrame, arrAddGradualMore, arrAddGradualLess, arrSubsGradualMore, arrSubsGradualLess, arrAddHalfMore, arrAddHalfLess, arrSubsHalfMore, arrSubsHalfLess) {
    let offsetResult = 0
    const currentAddGradualMoreFrame = arrAddGradualMore.find((frameComparison) => frameComparison < currentFrame)
    const currentAddGradualLessFrame = arrAddGradualLess.find((frameComparison) => frameComparison < currentFrame)
    const currentSubsGradualMoreFrame = arrSubsGradualMore.find((frameComparison) => frameComparison < currentFrame)
    const currentSubsGradualLessFrame = arrSubsGradualLess.find((frameComparison) => frameComparison < currentFrame)
    const currentAddHalfMoreFrame = arrAddHalfMore.find((frameComparison) => frameComparison < currentFrame)
    const currentAddHalfLessFrame = arrAddHalfLess.find((frameComparison) => frameComparison < currentFrame)
    const currentSubsHalfMoreFrame = arrSubsHalfMore.find((frameComparison) => frameComparison < currentFrame)
    const currentSubsHalfLessFrame = arrSubsHalfLess.find((frameComparison) => frameComparison < currentFrame)
    switch (true) {
        case !(currentAddGradualMoreFrame < currentAddGradualLessFrame) && currentFrame > arrAddGradualMore[arrAddGradualMore.length - 1]:
            offsetResult += 1
            break;
        case !(currentSubsGradualMoreFrame < currentSubsGradualLessFrame) && currentFrame > arrSubsGradualMore[arrSubsGradualMore.length - 1]:
            offsetResult -= 1
            break;
        case !(currentAddHalfMoreFrame < currentAddHalfLessFrame) && currentFrame > arrAddHalfMore[arrAddHalfMore.length - 1]:
            offsetResult += 0.5
            break;
        case !(currentSubsHalfMoreFrame < currentSubsHalfLessFrame) && currentFrame > arrSubsHalfMore[arrSubsHalfMore.length - 1]:
            offsetResult -= 0.5
            break;
    }
    return offsetResult
}
function animCircularVibrate_2(dly = 0) {
    const animFrame = timelineFrame - dly
    if(animFrame < 0 || animFrame > 56) return
    //else if(animFrame == 1) console.clear()
    const updAnimFrame = animFrame * 9
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio
    changeBoolX = updAnimFrame % 2 == 1 ? 1 : -1
    const amplitude = calcSin(Math.floor(updAnimFrame * 0.25)) * 8
    spritePositionOffsetY = Math.round(calcSin(updAnimFrame) * amplitude) * changeBoolX
    spritePositionOffsetX = Math.round(calcCos(updAnimFrame) * amplitude) * changeBoolX
    console.log(`AnimFrame: ${animFrame}. updAnimFrame: ${updAnimFrame}. X: ${spritePositionOffsetX}. Y: ${spritePositionOffsetY}. changeBool: ${(changeBoolX == true)}`)
    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`
}
function animZigzagFast(dly = 0) {
    const animFrame = timelineFrame - dly
    if(animFrame < 1 || animFrame > 75) return
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio
    const framesSection = Math.floor((animFrame - 1) / 6) + 1
    if(framesSection == 1 || framesSection == 9) addToSpriteOffsets(-1, -1)
    else if(framesSection % 2 == 0 && framesSection <= 8) addToSpriteOffsets(2)
    else if(framesSection == 3 || framesSection == 7) addToSpriteOffsets(-2, 2)
    else if(framesSection == 5) addToSpriteOffsets(-2, -2)

    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`
    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
}

function dummyFunc(dly = 0) {
    animHShake(dly)
}