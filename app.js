const dropMenu = document.querySelector('select');
const btnSpriteAnim = document.querySelector('#btn-anim')
const pokemonSprite = document.querySelector('#pokemon-sprite');
const frameCounter = document.querySelector('#frame-counter')
let selectedValue = dropMenu.value;
let selectedText = dropMenu.options[dropMenu.selectedIndex].text;

const pokemonCollection = []
const frameUnit = 1000 / 60
const pixelToSpriteRatio = 0.015625; //64
let pixelUnit = pokemonSprite.width * pixelToSpriteRatio
let timelineFrame = 0
let animDuration = null
let animTimeline = null
let spritePositionOffsetX = 0
let spritePositionOffsetY = 0
let spriteRotateOffset = 0
let spriteScale = 1
let changeBoolX = 1
let changeBoolY = 1

function selectSprite() {
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
}

function animFlashYellow(dly = 0) {
    const animFrame = timelineFrame - dly
    if(
        [8,10,26].some((changeFrm) => changeFrm === animFrame) || 
        (animFrame > 30 && animFrame % 3 === 1 && animFrame < 56)
    ) pokemonSprite.classList.toggle('color-yellow')
}
function animJumpsSmall(dly = 0) {
    switch (timelineFrame) {
        case 1 + dly: 
            pokemonSprite.classList.add('anim-jumps-small')
            break;
    }
}
function animHShake(dly = 0) {
    const animFrame = timelineFrame - dly
    if(animFrame <= 1 || animFrame > 39) {
        spritePositionOffsetX = 0
        pokemonSprite.style.left = `${Math.floor(spritePositionOffsetX + 0.5) * pixelUnit}px`
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
    let animFrame = timelineFrame - dly
    if(animFrame < 0 || animFrame > 64) return
    pixelUnit = pokemonSprite.width * pixelToSpriteRatio

    let sineValue = calcSin(Math.floor(animFrame * 4) % 128)
    spritePositionOffsetX = sineValue * -20
    spritePositionOffsetY = sineValue * -6
    spriteScale = 1 + (sineValue * 1/3)

    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`
    pokemonSprite.style.width = `${spriteScale * 16}rem`
}
function animKabukiJumps(dly = 0) {
    let animFrame = timelineFrame - dly
    if(animFrame < 0 || animFrame > 128) return

    let bigSine = 0;
    if(animFrame < 86) bigSine = calcSin(animFrame % 128);
    else if(animFrame < 107) bigSine = calcSin((calcSin(animFrame) * 128) - 64 % 128);
    
    let sineValue = animFrame < 64? calcSin((animFrame * 6) % 128) : 0;
    spriteScale = 1 + (bigSine * 1/3)
    spritePositionOffsetX = bigSine * -32;
    spritePositionOffsetY = bigSine * 8 + sineValue * -32;

    spriteRotateOffset = 0;
    if(animFrame < 16) spriteRotateOffset = animFrame / 16 * -11.25;
    else if(animFrame >= 16 && animFrame < 58) spriteRotateOffset = -11.25;
    else if(animFrame >= 58 && animFrame < 107) spriteRotateOffset = calcSin((animFrame - 52) * 2.32 % 128) * -33.75;
    
    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`
    pokemonSprite.style.width = `${spriteScale * 16}rem`
    pokemonSprite.style.rotate = `${spriteRotateOffset}deg`
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

    const amplitude = calcSin(updAnimFrame * 0.25) * 8

    spritePositionOffsetY = Math.round(calcSin((256 * ((Math.floor(updAnimFrame / 256)) + 1)) - updAnimFrame) * amplitude) * changeBoolX
    spritePositionOffsetX = Math.round(calcCos((256 * ((Math.floor(updAnimFrame / 256)) + 1)) - updAnimFrame) * amplitude) * changeBoolX

    pokemonSprite.style.left = `${spritePositionOffsetX * pixelUnit}px`
    pokemonSprite.style.top = `${spritePositionOffsetY * pixelUnit}px`

    console.log(`AnimFrame: ${animFrame}. updAnimFrame: ${updAnimFrame}. X: ${spritePositionOffsetX}. Y: ${spritePositionOffsetY}. changeBool: ${(changeBoolX == true)}`)
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