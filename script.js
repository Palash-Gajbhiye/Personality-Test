// By Palash :)
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result-container');

const questions = [
    { question: "What is your favorite color?", answers: ["Red", "Blue", "Green", "Yellow"] },
    { question: "Which animal do you identify with?", answers: ["Lion", "Dolphin", "Owl", "Turtle"] },
    { question: "What's your preferred way to relax?", answers: ["Reading", "Listening to music", "Outdoor activities", "Watching TV"] },
    { question: "Choose a season:", answers: ["Spring", "Summer", "Fall", "Winter"] },
    { question: "Pick a travel destination:", answers: ["Beach", "Mountain", "City", "Countryside"] },
];

const personalityTypes = {
    introvert: 0,
    extrovert: 0,
    analytical: 0,
    creative: 0,
};

let currentQuestionIndex = 0;
let userAnswers = [];

function showQuestion(question) {
    questionContainer.innerHTML = `<p>${question.question}</p>`;
    answerContainer.innerHTML = '';

    for (let i = 0; i < question.answers.length; i++) {
        const answerButton = document.createElement('button');
        answerButton.innerText = question.answers[i];
        answerButton.addEventListener('click', () => selectAnswer(i));
        answerContainer.appendChild(answerButton);
    }
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;

    // Remove the 'selected' class from all answer buttons
    const answerButtons = document.querySelectorAll('#answer-container button');
    answerButtons.forEach(button => button.classList.remove('selected'));

    // Add the 'selected' class to the clicked answer button
    answerButtons[answerIndex].classList.add('selected');

    nextButton.disabled = false;
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.disabled = true;
    } else {
        submitButton.style.display = 'inline-block';
        nextButton.style.display = 'none';
    }
}

function showResults() {
    calculateResults();
    const result = determinePersonalityType();
    resultContainer.innerHTML = `<h2>Your Personality Type:</h2><p>${result}</p>`;
    resultContainer.style.display = 'block';
}

function calculateResults() {
    for (let i = 0; i < userAnswers.length; i++) {
        switch (i) {
            case 0:
                personalityTypes.introvert += userAnswers[i] === 0 ? 1 : 0;
                personalityTypes.extrovert += userAnswers[i] === 1 ? 1 : 0;
                break;
            case 1:
                personalityTypes.analytical += userAnswers[i] === 0 ? 1 : 0;
                personalityTypes.creative += userAnswers[i] === 1 ? 1 : 0;
                break;
            case 2:
                // Example: If the third question is about preferences for indoor or outdoor activities
                // 0 for indoor, 1 for outdoor
                personalityTypes.introvert += userAnswers[i] === 0 ? 1 : 0;
                personalityTypes.extrovert += userAnswers[i] === 1 ? 1 : 0;
                break;
            case 3:
                // Example: If the fourth question is about preferred season
                // 0 for Spring, 1 for Summer, 2 for Fall, 3 for Winter
                personalityTypes.analytical += userAnswers[i] === 0 ? 1 : 0;
                personalityTypes.creative += userAnswers[i] === 1 ? 1 : 0;
                break;
            case 4:
                // Example: If the fifth question is about travel destination preference
                // 0 for Beach, 1 for Mountain, 2 for City, 3 for Countryside
                personalityTypes.introvert += userAnswers[i] === 0 ? 1 : 0;
                personalityTypes.extrovert += userAnswers[i] === 2 ? 1 : 0;
                break;
            // Add more cases for additional questions if needed
        }
    }
}

function determinePersonalityType() {
    const maxScore = Math.max(...Object.values(personalityTypes));
    
    if (maxScore === personalityTypes.introvert) {
        return "Introvert";
    } else if (maxScore === personalityTypes.extrovert) {
        return "Extrovert";
    } else if (maxScore === personalityTypes.analytical) {
        return "Analytical";
    } else if (maxScore === personalityTypes.creative) {
        return "Creative";
    } else {
        return "Undetermined";
    }
}

function submitAnswers() {
    // Add any additional logic you may need for submitting answers
    showResults();
}

// Initial setup
showQuestion(questions[currentQuestionIndex]);
nextButton.addEventListener('click', showNextQuestion);
submitButton.addEventListener('click', () => {
    submitAnswers();
    
});
