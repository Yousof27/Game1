document.title = 'Guess The Word Game';
document.querySelector('footer').innerText = `Guess The Word Game, Copy; `;
document.querySelector('footer').innerText = `COPYRIGHT © ${new Date().getFullYear()} . ALL RIGHT RESERVED BY Abo Kamal`;


let answer, answers = [
    [`Taha`, `One of the names of the Prophet Muhammad, may God bless him and grant him peace`],
    [`Fatima`, `Prophet's daughter`],
    [`Ibrahim`, `A prophet has a story with fire`],
    [`Ismael`, `A prophet whose father was also a prophet and whose mother was Egyptian`],
    [`Yousof`, `A prophet who interpreted dreams`],
    ['Younes', `A prophet has a story in the sea`],
    [`Solaiman`, `A prophet has a story with a type of bird`],
    [`Yahia`, `One of the prophets of the sons of Israel was born by a miracle and his father was also a prophet`],
    [`Idres`, `A prophet who was the first to write with a pen`],
    [`Ishaq`, `A prophet whose father was informed of his birth by angels who were on their way to bring down God’s punishment on the people of another prophet`],
    [`Khidr`, `A righteous man who built a wall with a prophet`],
    [`AboBkr`, `The name of the first man who converted to Islam`],
    [`Othman`, `Married two daughters of a prophet`],
    [`Zaid`, `The only companion whose name was mentioned in the Quran`],
    [`Luqman`, `A man given wisdom by Allah in the Quran`],
    [`Hamza`, `The bravest man in history, the lion of God and the master of martyrs`],
    [`Khaled`, `One of the bravest Muslim leaders who was never defeated in battle, and was called the Sword of God`],
    [`Bilal`, `The first person to enter the Kaaba with our Master Muhammad, may God bless him and grant him peace, after the opening of Mecca`],
    [`Somaia`, `The first martyr in Islam`],
    [`Mostafa`, `my little bro 😁`]];

let tryNumber = 5;
let lettersNumber;
let currentTry;
let popupLock = true;
let multiPlayers;

// Start The Game From The Home Page Button Function
function start() {
    let gameContainer = document.querySelector('.game-con');
    let homecontainer = document.querySelector('.home-container');
    let wordField = document.querySelector('.word-field');
    let hintField = document.querySelector('.hint-field');
    if (multiPlayers) {
        if (wordField.value.trim() === '') {
            wordField.classList.add('invalid');
        }
        if (hintField.value.trim() === '') {
            hintField.classList.add('invalid');
        }

        else {
            answer = [wordField.value, hintField.value];
            gameContainer.classList.add('active');
            homecontainer.classList.remove('active');
            loadGame();
        }
    } else if (multiPlayers === false) {
        answer = answers[Math.floor(Math.random() * answers.length)];
        gameContainer.classList.add('active');
        homecontainer.classList.remove('active');
        loadGame();
    }
}

// Single Player Button Function
function playerOneBtn() {
    let homePage = document.querySelector('.home-page');
    let wordField = document.querySelector('.word-field');
    let hintField = document.querySelector('.hint-field');
    homePage.classList.remove('two-players');
    homePage.classList.add('one-player');
    wordField.classList.remove('invalid');
    hintField.classList.remove('invalid');
    wordField.value = '';
    hintField.value = '';
    multiPlayers = false;
}

// Multi players Butotn Function
function playerTwoBtn() {
    let homePage = document.querySelector('.home-page');
    homePage.classList.remove('one-player');
    homePage.classList.add('two-players');
    multiPlayers = true;
}

// Start The Game Function
function loadGame() {
    // Create The Fields
    lettersNumber = answer[0].length;
    generateGame();


    // Add Input And Delete Events
    let inputs = document.querySelectorAll('.game input');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => letterDelete(e, inputs, index));
        input.addEventListener('input', (e) => letterAdd(e, inputs, index));
    })

    // Add Focus To The First Input
    inputs[0].focus();

    // The Game Logic
    let checkBtn = document.querySelector('.check');
    checkBtn.addEventListener('click', checkAnswer);

    let hint = document.querySelector('.hint');
    hint.addEventListener('click', (e) => {
        hint.blur()
        if (popupLock) InfoAndHintShow(e);
    });

    let info = document.querySelector('.info');
    info.addEventListener('click', (e) => {
        info.blur();
        if (popupLock) InfoAndHintShow(e);
    });
}

// Check The Answer Function
function checkAnswer() {
    let score = 0;
    for (let i = 1; i <= lettersNumber; i++) {
        let input = document.querySelector(`#try-${currentTry}-letter-${i}`);
        letterInput = input.value.toLowerCase();

        let letterAnswer = answer[0][i - 1].toLowerCase();

        // Check The Answer Is Yes Or No Or May
        if (letterInput === letterAnswer) {
            input.classList.add('yes');
            score++;
        } else if (answer[0].includes(letterInput) && letterInput !== '') {
            input.classList.add('may');
        } else {
            input.classList.add('no');
        }
    }

    // Check For Win Or Lose
    // Check For Win
    if (score === lettersNumber) {
        // Show The Win Message

        if (popupLock) showWinLoseMessage(true);

        // Check For May Try
    } else if (currentTry < tryNumber) {
        for (let i = 1; i <= lettersNumber; i++) {
            let input = document.querySelector(`#try-${currentTry}-letter-${i}`);
            input.disabled = true;
            input.parentElement.parentElement.classList.add('not-active');
        }
        currentTry++;
        for (let i = 1; i <= lettersNumber; i++) {
            let input = document.querySelector(`#try-${currentTry}-letter-${i}`);
            input.disabled = false;
            input.parentElement.parentElement.classList.remove('not-active');
        }
        document.querySelector(`#try-${currentTry}-letter-1`).focus();

        // Check For Lose
    } else {
        if (popupLock) showWinLoseMessage(false);
    }
}

// Helping Functions
// Remove Characters Function
function letterDelete(e, inputs, index) {
    if (e.key === 'Backspace' && index > (currentTry - 1) * 6 && inputs[currentTry * lettersNumber - 1].value === '') {
        inputs[--index].focus()
    } else if (e.key === 'Enter') {
        checkAnswer();
    }
}

// Add Characters Function
function letterAdd(e, inputs, index) {
    e.target.value = e.target.value.toUpperCase()
    if (e.data !== null && index < currentTry * lettersNumber - 1) {
        inputs[++index].focus();
    }
}

// Remove Overlay Function
function removeOverlay() {
    let popup = document.querySelector('.popup');
    popup.remove();
    popupLock = true;
}

// Generate The Game Function
function generateGame() {
    let gameArea = document.createElement('div');
    gameArea.classList.add('game');
    currentTry = 1;
    for (let i = 1; i <= tryNumber; i++) {
        let tryElement = document.createElement('div');
        let inputsContainer = document.createElement('div');
        inputsContainer.classList.add(`inputs-con`, `inputs-con-${i}`);
        tryElement.classList.add(`try-${i}`);
        tryElement.id = `try-${i}`;
        tryElement.innerHTML = `<span class="title">Try ${i}</span>`;

        for (let j = 1; j <= lettersNumber; j++) {
            let input = document.createElement('input');
            input.id = `try-${i}-letter-${j}`;
            input.type = 'text';
            input.maxLength = 1;

            if (currentTry === 1 && i !== 1) {
                tryElement.classList.add('not-active');
                input.disabled = true;
            }

            inputsContainer.appendChild(input);
        }

        tryElement.appendChild(inputsContainer);
        gameArea.appendChild(tryElement);
    }
    document.querySelector('.container .controls').before(gameArea)
}

// Show Hints And Game Information Function
function InfoAndHintShow(e) {
    let gameInfoElementContent;
    if (e.target.classList.contains('info')) {
        gameInfoElementContent = `
        <div class="overlay"></div>
        <div boxTitle="Game Info" class="gameRules box">
            <h3>Letter Is Correct And In Right Place.</h3>
            <h3>Letter Is Correct But Not In Right Place.</h3>
            <h3>Letter Is Not Correct.</h3>
            <span class="close"><i class="fa-solid fa-xmark"></i></span>
        </div>`;
    } else if (e.target.classList.contains('hint')) {
        gameInfoElementContent = `
        <div class="overlay"></div>
        <div boxTitle="Hint" class="gameHint box">
            <p>${answer[1]}</p>
            <span class="close"><i class="fa-solid fa-xmark"></i></span>
        </div>`;
    }
    let gameInfoElement = document.createElement('div');
    gameInfoElement.classList.add('popup');
    gameInfoElement.innerHTML = gameInfoElementContent;
    document.querySelector('footer').before(gameInfoElement);
    document.querySelector('span.close').addEventListener('click', removeOverlay);
    document.querySelector('.overlay').addEventListener('click', removeOverlay);

    popupLock = false;
}

// Show Win Message Function
function showWinLoseMessage(win) {
    // Create The Win Element
    let winElement = document.createElement('div');
    winElement.classList.add('popup');
    let content;

    if (win) {
        // Collect The Data For The Win Message
        let winMessage, winDetails, starsNumber;
        if (currentTry < 4) {
            winMessage = '🥳 Amazing 🥳';
            starsNumber = 3;
            if (currentTry === 1) winDetails = `From The 1st Try`;
            if (currentTry === 2) winDetails = `From The 2nd Try`;
            if (currentTry === 3) winDetails = `From The 3rd Try`;
        } else if (currentTry === 4) {
            winMessage = '🎉 Very Good 🎉';
            winDetails = `From The 4th Try`;
            starsNumber = 2;
        } else {
            winMessage = 'Good';
            winDetails = `From The ${currentTry}th Try`;
            starsNumber = 1;
        }

        // Create The Win Element Content
        let star = '';
        for (let i = 1; i <= starsNumber; i++) {
            star += `<span class="star-${i}">⭐</span> `
        }
        content = `
        <div class="overlay"></div>
        <div class="end-message win">
            <span><span>Win</span><span>ner</span></span>
            <p class="stars">
                ${star}
            </p>
            <p class="grad textAnimation">${winMessage}</p>
            <h2 class="textAnimation">${winDetails}</h2>
            <p class="textAnimation">${answer[1] || 'The Answer Is'}: <span>${answer[0]}</span></p>
            <div class="controls">
                <button class="again"><i class="fa-solid fa-rotate-right fa-spin"></i></button>
                <a href="index.html"><button class="home"><i class="fa-solid fa-house fa-bounce"></i></button></a>
            </div>
        </div>`;
    } else {
        content = `
        <div class="overlay"></div>
        <div class="end-message lose">
            <span><span>Lo</span><span>ss</span></span>
            <p></p>
            <p class="grad textAnimation">Couldn't guess the word</p>
            <h2 class="textAnimation">🥲😔😭😒😢</h2>
            <p class="textAnimation">${answer[1] || 'The Answer Is'}: <span>${answer[0]}</span></p>
            <div class="controls">
                <button class="again"><i class="fa-solid fa-rotate-right fa-spin"></i></button>
                <a href="index.html"><button class="home"><i class="fa-solid fa-house fa-bounce"></i></button></a>
            </div>
        </div>`;
    }

    winElement.innerHTML = content;
    document.querySelector('footer').before(winElement);

    let againBtn = document.querySelector('button.again');
    againBtn.addEventListener('click', again);

    popupLock = false;
}

// Play Again Function
function again() {
    removeOverlay();
    let gameElement = document.querySelector('.container .game');
    gameElement.remove();
    answer = answers[Math.floor(Math.random() * answers.length)];
    loadGame()
}
