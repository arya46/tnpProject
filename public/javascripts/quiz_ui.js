const QuizUI = {
    displayNext() {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion() {
        this.populateIdWithHTML('question', quiz.getCurrentQuestion().text);
    },
    displayChoices() {
        const choices = quiz.getCurrentQuestion().choices;

        for (let i = 0; i < choices.length; i++) {
            this.populateIdWithHTML('choice' + i, choices[i]);
            this.guessHandler('guess' + i, choices[i]);
        }
    },
    displayScore() {
        let gameOverHTML = '<h1>Game Over</h1>';
        gameOverHTML += '<h2> Your score is: ' + quiz.score + '</h2>';
        gameOverHTML += '<div class="centered grid__col--8">';
        gameOverHTML += '<form action="/test/score/'+ quiz.score + '" method="post" id="logout">';
        gameOverHTML += '</form>';
        gameOverHTML += '<button id="score" type="submit" form="logout" class="btn--default">Save & Exit</button>';
        gameOverHTML += '<form action="/start-test" method="get" id="retest">';
        gameOverHTML += '</form>';
        gameOverHTML += '<button type="submit" form="retest" class="btn--default">Retest</button>';
        gameOverHTML += "</div>";
        this.populateIdWithHTML('quiz', gameOverHTML);
    },
    
    populateIdWithHTML(id, text) {
        const element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler(id, guess) {
        const button = document.getElementById(id);
        button.onclick = function () {
            quiz.guess(guess);
            QuizUI.displayNext();
        }
    },
    
    displayProgress() {
        const currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateIdWithHTML('progress', 'Question ' + currentQuestionNumber + ' of ' + quiz.questions.length);
    }
};
