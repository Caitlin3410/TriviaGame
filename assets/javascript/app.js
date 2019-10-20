$(document).ready(function() {


    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'Where was the first indoor hockey rink made?',
        q2: 'How many players can one team have on the ice at one time?',
        q3: 'Which team has won the Stanley Cup the most times?',
        q4: 'Which player holds the most records?',
        q5: 'How many minutes is the penalty for fighting?'
        q6: 'Which Team currently playing in the 2019/2020 season is the most recently founded?',
        q7: 'Which team is the best?'
    },
    options: {
        q1: ['Toronto, Canada', 'New York, United States', 'London, England', 'Montreal, Canada'],
        q2: ['4', '5', '6', '8'],
        q3: ['New York Rangers', 'Toronto Maple Leafs', 'Boston Bruins', 'Montreal Canadians'],
        q4: ['Mario Lemieux', 'Sidney Crosby', 'Wayne Gretzky', 'Bobby Hall'],
        q5: ['2', '10', '15', '5'],
        q6: ['Nashville Predators', 'San Jose Sharks', 'Vegas Golden Knights', 'Arizona Coyotes'],
        q7: ['Edmonton Oilers', 'Colorado Avalanche', 'San Jose Sharks', 'Winnipeg Jets']
    },
    answers: {
        q1: 'Montreal, Canada',
        q2: '6',
        q3: 'Montreal Canadians',
        q4: 'Wayne Gretzky',
        q5: '5',
        q6: 'Vegas Golden Knights',
        q7: 'San Jose Sharks'
    },

    startGame: function() {

        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);


        $('#game').show();


        $('#results').html('');


        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();


        trivia.nextQuestion();

    },

    nextQuestion: function() {


        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);


        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }


        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];


        $.each(questionOptions, function(index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function() {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        } else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        } else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results')
                .html('<h3>Thanks for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Try again!</p>');


            $('#game').hide();


            $('#start').show();
        }

    },

    guessChecker: function() {


        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];


        if ($(this).text() === currentAnswer) {

            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        } else {

            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function() {


        trivia.currentSet++;


        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }

}