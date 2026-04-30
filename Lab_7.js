'use strict'


const ui = {
    menu: document.getElementById('menu-screen'),
    gameWrapper: document.getElementById('game-wrapper'),
    btnStart: document.getElementById('btn-start'),
    btnRestart: document.getElementById('btn-restart'),
    btnNext: document.getElementById('btn-next'),
    gunman: document.getElementById('gunman'),
    message: document.getElementById('message-box'),
    timePlayer: document.getElementById('time-player'),
    timeGunman: document.getElementById('time-gunman'),
    score: document.getElementById('score-display'),
    level: document.getElementById('level-display'),
}


const sounds = {
    bgm: new Audio('bgm.mp3'),
    fire: new Audio('fire.mp3'),
    shot: new Audio('shot.mp3'),
    win: new Audio('win.m4a'),
    lose: new Audio('lose.m4a'),
}

sounds.bgm.loop = true

const playSound = (audioObj) => {
    audioObj.currentTime = 0
    audioObj.play().catch(() => console.log("Чекаємо взаємодії користувача"))
}

const stopSound = (audioObj) => {
    audioObj.pause()
    audioObj.currentTime = 0
}

const stopAllMusic = () => {
    stopSound(sounds.bgm)
    stopSound(sounds.win)
    stopSound(sounds.lose)
}


let state = {
    level: 1,
    score: 0,
    gunmanTimeMs: 0,
    roundStartTime: 0,
    timerInterval: null,
    isActive: false,
    playerHasShot: false,
}


const formatTime = (ms) => (ms / 1000).toFixed(2)
const isWin = (playerMs, enemyMs) => playerMs < enemyMs
const calculateGunmanTime = (level) => Math.max(1500 - (level * 200), 400)
const calculateScore = (currentScore, level, reactionMs, enemyMs) =>
    currentScore + (level * 100) + Math.max(0, Math.floor(enemyMs - reactionMs))


const updateDisplays = (playerMs, enemyMs) => {
    ui.timePlayer.textContent = formatTime(playerMs)
    ui.timeGunman.textContent = formatTime(enemyMs)
}

const showMessage = (text, isFire = false) => {
    ui.message.textContent = text
    ui.message.className = isFire ? 'message message--fire' : 'message'
}

const setGunmanState = (stateClass) => {
    ui.gunman.className = `state-${stateClass}`
}


const endRound = (playerWon, reactionMs) => {
    state.isActive = false
    clearInterval(state.timerInterval)
    stopSound(sounds.bgm)

    if (playerWon) {
        setGunmanState('dead')
        showMessage('You Win!')
        playSound(sounds.win)
        state.score = calculateScore(state.score, state.level, reactionMs, state.gunmanTimeMs)
        ui.score.textContent = state.score
        ui.btnNext.classList.remove('hidden')
    } else {
        setGunmanState('fire')
        showMessage('You Lose!')
        playSound(sounds.lose)
        ui.btnRestart.classList.remove('hidden')
    }
}

const playerShoots = () => {
    if (!state.isActive || state.playerHasShot) return

    state.playerHasShot = true
    playSound(sounds.shot)
    const reactionMs = Date.now() - state.roundStartTime
    const playerWon = isWin(reactionMs, state.gunmanTimeMs)

    updateDisplays(reactionMs, state.gunmanTimeMs)
    endRound(playerWon, reactionMs)
}

const startDuel = () => {
    state.isActive = true
    state.playerHasShot = false
    state.roundStartTime = Date.now()
    showMessage('FIRE', true)
    playSound(sounds.fire)
    setGunmanState('fire')

    state.timerInterval = setInterval(() => {
        if (!state.isActive) return

        const currentMs = Date.now() - state.roundStartTime
        updateDisplays(currentMs, state.gunmanTimeMs)

        if (currentMs >= state.gunmanTimeMs && !state.playerHasShot) {
            playSound(sounds.shot)
            endRound(false, currentMs)
        }
    }, 30)
}

const startLevel = () => {
    ui.btnNext.classList.add('hidden')
    ui.btnRestart.classList.add('hidden')
    ui.message.classList.add('hidden')

    stopAllMusic()
    playSound(sounds.bgm)

    state.gunmanTimeMs = calculateGunmanTime(state.level)
    updateDisplays(0, state.gunmanTimeMs)
    ui.level.textContent = `Level ${state.level}`

    setGunmanState('walk')

    setTimeout(() => {
        setGunmanState('idle')
        const randomWait = Math.floor(Math.random() * 2000) + 1000
        setTimeout(startDuel, randomWait)
    }, 3000)
}


ui.btnStart.addEventListener('click', () => {
    ui.menu.style.display = 'none'
    ui.gameWrapper.style.display = 'block'

    state.level = 1
    state.score = 0
    ui.score.textContent = state.score
    startLevel()
})

ui.btnNext.addEventListener('click', () => {
    state.level++
    startLevel()
})

ui.btnRestart.addEventListener('click', () => {
    state.level = 1
    state.score = 0
    ui.score.textContent = state.score
    startLevel()
})

ui.gunman.addEventListener('mousedown', playerShoots)
