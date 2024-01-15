// global states
const state = {
    score: 0,
    currentQuestionIndex: 0,
    timerInterval: null,
};

// dom elements
const domRefs = {
    startButton: document.getElementById('start-quiz'),
    highscoresLink: document.getElementById('view-highscores'),
    timerElement: document.getElementById('timer'),
    quizIntro: document.getElementById('quiz-intro'),
    questionContainer: document.getElementById('question-container'),
    questionElement: document.getElementById('question'),
    answerButtons: document.getElementById('answer-buttons'),
    feedbackElement: document.getElementById('feedback'),
    endScreen: document.getElementById('end-screen'),
    highScoreForm: document.getElementById('highscore-form'),
    initialsInput: document.getElementById('initials'),
    submitButton: document.getElementById('submit'),
    finalScoreElement: document.getElementById('final-score'),
    initialsInput: document.getElementById('initials'),
    highScoresElement: document.getElementById('high-scores'),
    highScoresList: document.getElementById('high-scores-list'),
    goBackButton: document.getElementById('go-back'),
    clearHighScoresButton: document.getElementById('clear-highscores'),
};

// question array
const questions = [
    {
        question:
            'Commonly used data types DO NOT include:',
        answers: [
            { text: '1. strings', correct: false },
            { text: '2. booleans', correct: false },
            { text: '3. alerts', correct: true },
            { text: '4. numbers', correct: false },
        ],
    },
    {
        question:
            'The condition in an if / else statement is enclosed within ____.',
        answers: [
            { text: '1. quotes', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. parentheses', correct: true },
            { text: '4. square brackets', correct: false },
        ],
    },
    {
        question:
            'Arrays in JavaScript can be used to store ____.',
        answers: [
            { text: '1. numbers and strings', correct: false },
            { text: '2. other arrays', correct: false },
            { text: '3. booleans', correct: false },
            { text: '4. all of the above', correct: true },
        ],
    },
    {
        question:
            'String values must be enclosed within ____ when being assigned to variables.',
        answers: [
            { text: '1. commas', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. quotes', correct: true },
            { text: '4. parentheses', correct: false },
        ],
    },
    {
        question:
            'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: '1. JavaScript', correct: false },
            { text: '2. terminal / bash', correct: false },
            { text: '3. for loops', correct: false },
            { text: '4. console.log', correct: true },
        ],
    },
];

// helper functions
function toggleVisibility(element, show) {
    element.style.display = show ? 'block' : 'none';
}

function startTimer() {
    state.timeLeft = 60;
    domRefs.timerElement.textContent = state.timeLeft;
    toggleVisibility(domRefs.timerElement, true);
    state.timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    state.timeLeft--;
    domRefs.timerElement.textContent = state.timeLeft;
    if (state.timeLeft <= 0) {
        clearInterval(state.timerInterval);
        endGame();
    }
}

function bindClick() {
    domRefs.highscoresLink.addEventListener('click', displayHighScores);
    domRefs.startButton.addEventListener('click', startGame);
    domRefs.answerButtons.addEventListener('click', selectAnswer);
    domRefs.submitButton.addEventListener('click', saveHighScore);
    domRefs.clearHighScoresButton.addEventListener('click', clearHighScores);
    domRefs.goBackButton.addEventListener('click', goBack);
}

function createButton(text, correct) {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add('button');
if (correct) {
button.dataset.correct = true;
}
return button;
}

function createQuestionListItem(answer) {
const li = document.createElement('li');
const button = createButton(answer.text, answer.correct);
button.addEventListener('click', selectAnswer);
li.appendChild(button);
return li;
}

function clearElement(element) {
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }
}

function resetState() {
    let children = Array.from(domRefs.answerButtons.children);
    for (let i = 0; i < children.length; i++) {
        domRefs.answerButtons.removeChild(children[i]);
    }
}

function shuffleQuestions(questionsArray) {
    const array = questionsArray.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function updateScore(correct) {
    if (correct) {
        score += 20;
    } else {
        timeLeft = Math.max(0, timeLeft - 10);
        timerElement.textContent = timeLeft;
        score = Math.max(0, score - 10);
    }
}

function resetQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    shuffledQuestions = shuffleQuestions(questions);
    clearElement(domRefs.answerButtons);
}

function showFeedback(correct) {
    feedbackElement.textContent = correct ? 'Correct!' : 'Wrong!';
    setTimeout(() => feedbackElement.textContent = '', 1000);
}

// initializing
function initializeElementVisibility() {
    Object.values(domRefs).forEach(element => {
        if (element) {
            element.style.display = 'none';
        }
    });
}

// todo: fix visual bug where h2 from high score is appending and not appending the quiz-intro container

function initializeQuiz() {
    initializeElementVisibility();
    toggleVisibility(domRefs.quizIntro, true);
    toggleVisibility(domRefs.highscoresLink, true);
    bindClick();
    shuffledQuestions = shuffleQuestions(questions);
    displayHighScores();
}

// start & end functions
function startGame() {
    toggleVisibility(domRefs.startButton, false);
    toggleVisibility(domRefs.quizIntro, false);
    toggleVisibility(domRefs.questionContainer, true);

    score = 0;
    currentQuestionIndex = 0;
    shuffledQuestions = shuffleQuestions(questions); 

    startTimer();

    setNextQuestion();
}

function endGame() {
    clearInterval(timerInterval);
    toggleVisibility(domRefs.timerElement, false);
    domRefs.finalScoreElement.textContent = score;
    toggleVisibility(document.getElementById('end-screen'), true);
}

// question functions
function showQuestion(question) {
    resetState();
    domRefs.questionElement.textContent = question.question; 
    question.answers.map(createQuestionListItem).forEach(li => domRefs.answerButtons.appendChild(li));
}

function setNextQuestion() {
    console.log("Setting next question"); 
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function queueNextQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    updateScore(correct);
    showFeedback(correct);
    queueNextQuestion();
}

// high score functions
function displayHighScores() {
    toggleVisibility(domRefs.quizIntro, false);
    toggleVisibility(domRefs.endScreen, false);
    toggleVisibility(domRefs.highScoresElement, true);

    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.sort((a, b) => b.score - a.score);

    const highScoresList = document.getElementById('high-scores-list');
    clearElement(highScoresList); 
    highscores.forEach(highscore => {
        const li = document.createElement('li');
        li.textContent = `${highscore.initials} - ${highscore.score}`;
        highScoresList.appendChild(li);
    });
}

function saveHighScore(event) {
    event.preventDefault();
    const initials = domRefs.initialsInput.value;
    const finalScore = domRefs.finalScoreElement.textContent;
    const highscore = {
        score: finalScore,
        initials: initials
    };

    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push(highscore);
    localStorage.setItem('highscores', JSON.stringify(highscores));

    displayHighScores();
}

function goBack() {
    toggleVisibility(domRefs.highScoresElement, false);
    toggleVisibility(domRefs.quizIntro, true);
    toggleVisibility(domRefs.highscoresLink, true);
    toggleVisibility(domRefs.timerElement, false);
    resetQuiz();
}

function clearHighScores() {
    localStorage.removeItem('highscores');
    displayHighScores();
}

initializeQuiz();