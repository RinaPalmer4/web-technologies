const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

const calculatePairsCount = (rows, cols) => (rows * cols) / 2

const generateDeck = (symbols, pairsCount) => {
    const shuffledSourceSymbols = shuffleArray(symbols)
    const selectedSymbols = []

    for (let i = 0; i < pairsCount; i++) {
        selectedSymbols.push(shuffledSourceSymbols[i % shuffledSourceSymbols.length])
    }

    const pairedSymbols = [...selectedSymbols, ...selectedSymbols]
    const finalShuffledDeck = shuffleArray(pairedSymbols)

    return finalShuffledDeck.map((symbol, index) => ({
        id: index,
        value: symbol,
        isFlipped: false,
        isMatched: false,
    }))
}

const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}


const SYMBOLS = [
    'pic_1.jpg', 'pic_2.jpg', 'pic_3.jpg',
    'pic_4.jpg', 'pic_5.jpg', 'pic_6.jpg',
    'pic_7.jpg', 'pic_8.jpg', 'pic_9.jpg',
    'pic_10.jpg', 'pic_11.jpg', 'pic_12.jpg',
    'pic_13.jpg', 'pic_14.jpg', 'pic_15.jpg',
]

const gameState = {
    deck: [],
    flippedCardsIds: [],
    lockBoard: false,
    timerInterval: null,
    timeLeft: 0,
    timeSpent: 0,
    isPlaying: false,


    mode: 1,
    players: [],
    currentPlayerIndex: 0,
    currentRound: 1,
    totalRounds: 1,
    roundHistory: [],
}


const boardElement = document.getElementById('game-board')
const settingsPanel = document.getElementById('settings-panel')
const infoPanel = document.getElementById('info-panel')
const statsModal = document.getElementById('stats-modal')
const finalStatsContent = document.getElementById('final-stats-content')
const playersStatsContainer = document.getElementById('players-stats-container')
const turnNameDisplay = document.getElementById('turn-name')
const roundDisplay = document.getElementById('round-display')
const timerDisplay = document.getElementById('timer-display')

const difficultyMap = {'easy': 180, 'normal': 120, 'hard': 60}


document.querySelectorAll('input[name="player-mode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const player2Group = document.getElementById('player2-group')
        if (e.target.value === '2') {
            player2Group.classList.remove('hidden')
        } else {
            player2Group.classList.add('hidden')
        }
    })
})


const renderBoard = (cols) => {
    boardElement.innerHTML = ''
    boardElement.style.gridTemplateColumns = `repeat(${cols}, 100px)`

    gameState.deck.forEach(card => {
        const cardContainer = document.createElement('div')
        cardContainer.classList.add('card-container')

        const cardElement = document.createElement('div')
        cardElement.classList.add('card')
        if (card.isFlipped || card.isMatched) {
            cardElement.classList.add('flipped')
        }

        const cardCover = document.createElement('div')
        cardCover.classList.add('card-face', 'card-cover')

        const cardValue = document.createElement('div')
        cardValue.classList.add('card-face', 'card-value')

        const imgElement = document.createElement('img')
        imgElement.src = card.value
        imgElement.classList.add('card-image')

        cardValue.appendChild(imgElement)
        cardElement.appendChild(cardCover)
        cardElement.appendChild(cardValue)
        cardContainer.appendChild(cardElement)

        cardContainer.addEventListener('click', () => handleCardClick(card.id))
        boardElement.appendChild(cardContainer)
    })
}

const updateUI = () => {
    roundDisplay.textContent = `Раунд ${gameState.currentRound} з ${gameState.totalRounds}`
    const currentPlayer = gameState.players[gameState.currentPlayerIndex]
    turnNameDisplay.textContent = currentPlayer.name


    playersStatsContainer.innerHTML = ''
    gameState.players.forEach((player, index) => {
        const badge = document.createElement('span')
        badge.classList.add('stat-badge')
        if (index === gameState.currentPlayerIndex) badge.classList.add('active-player')

        badge.innerHTML = `<strong>${player.name}</strong><br>Ходів: ${player.moves} | Пар: ${player.score}`
        playersStatsContainer.appendChild(badge)
    })
}

const handleCardClick = (id) => {
    if (gameState.lockBoard || !gameState.isPlaying) return

    const clickedCard = gameState.deck.find(c => c.id === id)
    if (clickedCard.isFlipped || clickedCard.isMatched) return

    clickedCard.isFlipped = true
    gameState.flippedCardsIds.push(id)

    const cols = parseInt(document.getElementById('grid-size').value.split('x')[1])
    renderBoard(cols)

    if (gameState.flippedCardsIds.length === 2) {
        gameState.lockBoard = true

        gameState.players[gameState.currentPlayerIndex].moves += 1
        updateUI()
        checkForMatch()
    }
}

const checkForMatch = () => {
    const [id1, id2] = gameState.flippedCardsIds
    const card1 = gameState.deck.find(c => c.id === id1)
    const card2 = gameState.deck.find(c => c.id === id2)

    if (card1.value === card2.value) {

        card1.isMatched = true
        card2.isMatched = true
        gameState.players[gameState.currentPlayerIndex].score += 1

        resetTurn()
        updateUI()
        checkRoundEnd()
    } else {

        setTimeout(() => {
            card1.isFlipped = false
            card2.isFlipped = false


            if (gameState.mode === 2) {
                gameState.currentPlayerIndex = gameState.currentPlayerIndex === 0 ? 1 : 0
            }

            resetTurn()
            updateUI()
            const cols = parseInt(document.getElementById('grid-size').value.split('x')[1])
            renderBoard(cols)
        }, 400)
    }
}

const resetTurn = () => {
    gameState.flippedCardsIds = []
    gameState.lockBoard = false
}

const startTimer = () => {
    clearInterval(gameState.timerInterval)
    timerDisplay.textContent = formatTime(gameState.timeLeft)

    gameState.timerInterval = setInterval(() => {
        gameState.timeLeft -= 1
        gameState.timeSpent += 1
        timerDisplay.textContent = formatTime(gameState.timeLeft)

        if (gameState.timeLeft <= 0) {
            endRound(false)
        }
    }, 1000)
}

const checkRoundEnd = () => {
    const allMatched = gameState.deck.every(card => card.isMatched)
    if (allMatched) endRound(true)
}

const endRound = (completed) => {
    clearInterval(gameState.timerInterval)
    gameState.isPlaying = false


    const roundData = {
        roundNum: gameState.currentRound,
        timeSpent: gameState.timeSpent,
        completed: completed,
        playersInfo: gameState.players.map(p => ({...p})),
    }
    gameState.roundHistory.push(roundData)

    setTimeout(() => {
        if (gameState.currentRound < gameState.totalRounds) {
            alert(`Раунд ${gameState.currentRound} завершено!\nЧас: ${formatTime(gameState.timeSpent)}`)
            gameState.currentRound++
            startNewRound()
        } else {
            showFinalStats()
        }
    }, 500)
}

const startNewRound = () => {
    const [rows, cols] = document.getElementById('grid-size').value.split('x').map(Number)
    const difficulty = document.getElementById('difficulty').value

    gameState.deck = generateDeck(SYMBOLS, calculatePairsCount(rows, cols))
    gameState.timeLeft = difficultyMap[difficulty]
    gameState.timeSpent = 0
    gameState.isPlaying = true


    gameState.players.forEach(p => {
        p.score = 0
        p.moves = 0
    })
    gameState.currentPlayerIndex = 0

    resetTurn()
    updateUI()
    startTimer()
    renderBoard(cols)
}

const showFinalStats = () => {
    finalStatsContent.innerHTML = ''

    gameState.roundHistory.forEach(round => {
        const block = document.createElement('div')
        block.classList.add('round-stat-block')

        let html = `<h3>Раунд ${round.roundNum}</h3>`
        html += `<p>⏱ Витрачено часу: ${formatTime(round.timeSpent)} ${round.completed ? '' : '(Час вийшов)'}</p>`

        round.playersInfo.forEach(p => {
            html += `<p><strong>${p.name}</strong> - Знайдено пар: ${p.score}, Ходів: ${p.moves}</p>`
        })


        if (gameState.mode === 2) {
            const p1 = round.playersInfo[0]
            const p2 = round.playersInfo[1]
            if (p1.score > p2.score) html += `<p>🏆 <em>Переможець раунду: ${p1.name}</em></p>`
            else if (p2.score > p1.score) html += `<p>🏆 <em>Переможець раунду: ${p2.name}</em></p>`
            else html += `<p>🤝 <em>Нічия у раунді!</em></p>`
        }

        block.innerHTML = html
        finalStatsContent.appendChild(block)
    })

    statsModal.classList.remove('hidden')
    infoPanel.classList.add('hidden')
}


document.getElementById('start-btn').addEventListener('click', () => {
    gameState.mode = parseInt(document.querySelector('input[name="player-mode"]:checked').value)
    gameState.totalRounds = parseInt(document.getElementById('rounds-count').value) || 1
    gameState.currentRound = 1
    gameState.roundHistory = []

    const p1Name = document.getElementById('player1-name').value || 'Гравець 1'
    gameState.players = [{name: p1Name, score: 0, moves: 0}]

    if (gameState.mode === 2) {
        const p2Name = document.getElementById('player2-name').value || 'Гравець 2'
        gameState.players.push({name: p2Name, score: 0, moves: 0})
    }

    settingsPanel.classList.add('hidden')
    infoPanel.classList.remove('hidden')

    startNewRound()
})

document.getElementById('reset-settings-btn').addEventListener('click', () => {
    document.getElementById('grid-size').value = '4x4'
    document.getElementById('difficulty').value = 'easy'
    document.getElementById('rounds-count').value = '1'
    document.querySelector('input[name="player-mode"][value="1"]').checked = true
    document.getElementById('player2-group').classList.add('hidden')
})

document.getElementById('restart-btn').addEventListener('click', () => {
    clearInterval(gameState.timerInterval)
    gameState.isPlaying = false
    boardElement.innerHTML = ''
    infoPanel.classList.add('hidden')
    settingsPanel.classList.remove('hidden')
})

document.getElementById('close-stats-btn').addEventListener('click', () => {
    statsModal.classList.add('hidden')
    settingsPanel.classList.remove('hidden')
    boardElement.innerHTML = ''
})
