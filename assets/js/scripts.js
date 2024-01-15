const startButton = document.getElementById('start-quiz');
const timerElement = document.getElementById('time');
const quizIntro = document.getElementById('quiz-intro');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

function startGame() {
    startButton.classList.add('hide');
    quizIntro.classList.add('hide');

    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    timeLeft = 60; // initialize the time left for the quiz
    timerElement.textContent = timeLeft; // display the time left in the timer element

    // start the timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(); 
        }
    }, 1000);

    questionContainer.classList.remove('hide');
    setNextQuestion(); 
}

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

function resetState() {
    let children = Array.from(answerButtonsElement.children);
    for (let i = 0; i < children.length; i++) {
        answerButtonsElement.removeChild(children[i]);
    }
}

function showQuestion(question) {
    resetState(); 
    questionElement.innerText = question.question; 
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button); 
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';

    if (!correct) {
        timeLeft -= 10; 
        if (timeLeft < 0) {
            timeLeft = 0;
        }
        timerElement.textContent = timeLeft;
    }

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}

startButton.addEventListener('click', startGame);