const addBoxButton = document.getElementById('togglerulebook');
const hiddenBox = document.querySelector('.rulebook.hidden');
const crossbtn = document.getElementById('cross');
const addBoxButton1 = document.getElementById('addBox');
const hiddenBox1 = document.querySelector('.sub-box.hidden');
const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll('.number');
const result = document.getElementById('yourchoice');
const mainElement = document.querySelector(".main");
let savedCompsScore = localStorage.getItem('compsScore');
let savedUsersScore = localStorage.getItem('usersScore');
let comps = document.getElementById('scorecomp');
let users = document.getElementById('scoreuser');
comps.textContent = savedCompsScore !== null ? savedCompsScore : 0;
users.textContent = savedUsersScore !== null ? savedUsersScore : 0;
const hidemumma = document.querySelector('.mumma');
const hideaddbox = document.querySelector('.addBox');
const statusbar = document.getElementById('status');
const hidemainresbox = document.querySelector('.mainresbox');

addBoxButton.addEventListener('click', () => {
    hiddenBox.classList.toggle('hidden');
});

crossbtn.addEventListener('click', function() {
    hiddenBox.classList.add('hidden');
});

buttons.forEach(button => {
    button.addEventListener('click', playGame);
    button.addEventListener('click', function () {
        const backgroundValue = getComputedStyle(button).getPropertyValue("background-image");
        const borderColor = getComputedStyle(button).getPropertyValue("border-color");
        mainElement.style.backgroundImage = backgroundValue;
        mainElement.style.borderColor = borderColor;
        hidemumma.style.display = 'none';
        hideaddbox.style.display = 'flex';
        hidemainresbox.style.display = 'block';
    });
});

function playGame(event) {
    const playerChoice = choices[Math.floor(Math.random() * 3)]; 
    const computerChoice = choices[Math.floor(Math.random() * 3)]; 
    const winner = getWinner(playerChoice, computerChoice);
    const secondPulse = document.querySelector(".twopulse");
    const firstPulse = document.querySelector(".onepulse");
    statusbar.textContent = `${winner}`;
    const mainTwoElement = document.querySelector('.main.two');

    switch (computerChoice) {
        case 'rock':
            mainTwoElement.style.backgroundImage = 'var(--rock)';
            mainTwoElement.style.borderColor = 'var(--bx1)';
            break;
        case 'paper':
            mainTwoElement.style.backgroundImage = 'var(--paper)';
            mainTwoElement.style.borderColor = 'var(--bx3)';
            break;
        case 'scissors':
            mainTwoElement.style.backgroundImage = 'var(--scissors)';
            mainTwoElement.style.borderColor = 'var(--bx2)';
            break;
    }

    if (parseInt(users.textContent) >= 15) {
        statusbar.textContent = "CONGRATULATIONS! YOU ARE THE WINNER!";
        resetGame();
        return;
    } else if (parseInt(comps.textContent) >= 15) {
        statusbar.textContent = "SORRY! COMPUTER WINS!";
        resetGame();
        return;
    }

    addBoxButton1.addEventListener('click', () => {
        toggleAnimation();
        function toggleAnimation() {
            firstPulse.classList.remove("animate");
            secondPulse.classList.remove("animate");
        }
        hidemumma.style.display = 'block';
        hidemainresbox.style.display = 'none';
        if (parseInt(users.textContent) === 15 || parseInt(comps.textContent) === 15) {
            hiddenBox1.classList.remove('hidden');
            users.textContent = 0;
            comps.textContent = 0;
            hiddenBox1.classList.add('hidden');
        }
    });

    if (Math.random() < 0.5) {
        users.textContent = parseInt(users.textContent) + 1;
        localStorage.setItem('usersScore', users.textContent);
        if (parseInt(users.textContent) === 15) {
            hiddenBox1.classList.remove('hidden');
        }
        toggleAnimation();
        function toggleAnimation() {
            firstPulse.classList.toggle("animate");
        }
    } else {
        comps.textContent = parseInt(comps.textContent) + 1;
        localStorage.setItem('compsScore', comps.textContent);
        toggleAnimation();
        function toggleAnimation() {
            secondPulse.classList.toggle("animate");
        }
    }
}

function getWinner(player, computer) {
    if (player === computer) {
        return "TIE UP";
    } else if (Math.random() < 0.5) {
        return "YOU WIN";
    } else {
        return "YOU LOST";
    }
}

function resetGame() {
    users.textContent = 0;
    comps.textContent = 0;
    localStorage.setItem('usersScore', 0);
    localStorage.setItem('compsScore', 0);
    
    buttons.forEach(button => {
        button.disabled = false;
    });
    
    hidemumma.style.display = 'block';
    hidemainresbox.style.display = 'none';
    statusbar.textContent = ""; 
    
    startNewRound();
}

function startNewRound() {
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    randomButton.click();
}
function showHurrayPage() {
    const hurrayPage = document.getElementById('hurrayPage');
    hurrayPage.classList.remove('hidden');
    hurrayPage.style.display = 'block'; 
}