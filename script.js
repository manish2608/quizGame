const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const queContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestion, currectQuestionIndex;
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currectQuestionIndex++;
    setNextQuestion();
})



function startGame() {
    console.log('Started');

    startButton.classList.add('hide');
    shuffledQuestion = questions.sort(() => Math.random() - .5);
    currectQuestionIndex = 0;
    queContainer.classList.remove('hide');
    setNextQuestion();


}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currectQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerText = answers.text;
        button.classList.add('btn');
        if (answers.correct) {
            button.dataset.correct = answers.correct;

        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestion.length > currectQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restert';
        startButton.classList.remove('hide');
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }

}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
const questions = [{
        question: 'An HTML document can contain______',
        answers: [{ text: 'Attributes', correct: false }, { text: 'Tags', correct: false },
            { text: 'Row text', correct: false }, { text: 'All the answera are true', correct: true }
        ]
    },
    {
        question: 'A page designed in HTML is called____',
        answers: [{ text: 'Application', correct: false },
            { text: 'Cover Page', correct: false }, { text: 'Front-end', correct: false }, { text: 'Web page', correct: true }
        ]
    },
    {
        question: 'If we want to place text around an image, which CSS property should we use ?',
        answers: [{ text: 'push', correct: false }, { text: 'float', correct: true },
            { text: 'align', correct: false }, { text: 'wrap', correct: false }
        ]
    }, {
        question: 'Can we align an element by setting margin-left and margin-right ?',
        answers: [{ text: 'Yes, it is possible', correct: false }, { text: 'No, it is not possible', correct: true }]
    },
    {
        question: 'Can we difine the direction of text via a CSS property ?',
        answers: [{ text: 'yes, it is possible', correct: true }, { text: 'No, it is not possible', correct: false }]
    }
];