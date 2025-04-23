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
const diglett =   new Pokemon('diglett', './assets/diglett_1.png', './assets/diglett_2.png',      animVShake,           new Audio('./assets/cries/050.wav'), 66,  [1,66], [26], 25)
const dodrio =    new Pokemon('dodrio', './assets/dodrio_1.png', './assets/dodrio_2.png',         animLungeGrow,        new Audio('./assets/cries/085.wav'), 104, [1,25,49,73,96], [13,37,61,85])
const heracross = new Pokemon('heracross', './assets/heracross_1.png', './assets/heracross_2.png',animLungeGrow,        new Audio('./assets/cries/214.wav'), 66,  [1,22,42], [12,32])
const pidgeot =   new Pokemon('pidgeot', './assets/pidgeot_1.png', './assets/pidgeot_2.png',      animFrontFlip,        new Audio('./assets/cries/018.wav'), 46,  [21,46], [1,31])
const pikachu =   new Pokemon('pikachu', './assets/pikachu_1.png', './assets/pikachu_2.png',      animFlashYellow,      new Audio('./assets/cries/025.wav'), 85,  [1,36,71], [16,51])
const tyranitar = new Pokemon('tyranitar', './assets/tyranitar_1.png', './assets/tyranitar_2.png',animHShake,           new Audio('./assets/cries/248.wav'), 50,  [11,41], [1,31], 10)
const salamence = new Pokemon('salamence', './assets/salamence_1.png', './assets/salamence_2.png',animHShake,           new Audio('./assets/cries/373.wav'), 110,  [11,55], [1,41], 60)
const rapidash =  new Pokemon('rapidash', './assets/rapidash_1.png', './assets/rapidash_2.png',   animCircularVibrate,  new Audio('./assets/cries/078.wav'), 60,  [1, 51], [11])
const rapidash2 =  new Pokemon('rapidash2', './assets/rapidash2_1.png', './assets/rapidash2_2.png',   animCircularVibrate_2,  new Audio('./assets/cries/078.wav'), 60,  [1, 51], [11])
const persian =   new Pokemon('persian', './assets/persian_1.png', './assets/persian_2.png',      dummyFunc,            new Audio('./assets/cries/053.wav'), 70,  [51], [1],  20)
const sunkern =   new Pokemon('sunkern', './assets/sunkern_1.png', './assets/sunkern_2.png',      animJumpsSmall,       new Audio('./assets/cries/191.wav'), 40,  [11,31], [1,21])
const unown =     new Pokemon('unown', './assets/unown_1.png', './assets/unown_2.png',            animZigzagFast,       new Audio('./assets/cries/201.wav'), 61,  [1, 61], [31])
const glalie =    new Pokemon('glalie', './assets/glalie_1.png', './assets/glalie_2.png',         animZigzagFast,       new Audio('./assets/cries/362.wav'), 75,  [1, 31, 61], [16, 46, 75])

// Temporary
let pokemonToCall = rapidash2

dropMenu.addEventListener('change', selectSprite)
btnSpriteAnim.addEventListener('click', function() {
    returnDefault()
    pokemonToCall.cry.pause()
    pokemonToCall.cry.currentTime = 0
    timelineFrame = 0
    playPkmnCry(pokemonToCall)
    
    animTimeline = setInterval(() => {
        timelineFrame += 1
        frameCounter.innerHTML = timelineFrame
        /* console.log(timelineFrame, pokemonToCall.framesOfAnim, (timelineFrame === pokemonToCall.framesOfAnim)); */
        if(timelineFrame === pokemonToCall.framesOfAnim) {
            returnDefault()
            timelineFrame = 0
            pokemonSprite.src = `./assets/${selectedValue}_1.png`
            return
        }
        pokemonToCall.animFunc(pokemonToCall.animDelay)
        changeSprites(pokemonToCall)
    }, frameUnit)
})

/* function playAnim(funcOfAnim, duration) {
    timelineFrame = 0
    animTimeline = setInterval(() => {
        timelineFrame += 1
        frameCounter.innerHTML = timelineFrame
        //console.log(timelineFrame, duration, (timelineFrame === duration));
        if(timelineFrame === duration) {
            returnDefault()
            console.log("Animation ended succesfully!")
            pokemonSprite.src = `./assets/${selectedValue}1.png`
            pokemonSprite.classList = ''
            return
        }
        funcOfAnim()
    }, frameUnit)
} */
function returnDefault() {
    clearInterval(animTimeline)
    pokemonSprite.classList = ''
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
    if(pokemonSprite.src === `./assets/${pokemonToCall.name}_2.png`) {
        pokemonSprite.src = `./assets/${pokemonToCall.name}_1.png`
        return
    }
    pokemonSprite.src = `./assets/${pokemonToCall.name}_2.png`
}