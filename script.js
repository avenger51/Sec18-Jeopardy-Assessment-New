$(document).ready(function() {
    var questions; 
    function fetchTriviaQuestions() {
        $.ajax({
            url: "https://opentdb.com/api.php?amount=50",
            method: "GET",
            success: function(data) {
                questions = data.results;
                populateGameBoard(questions);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching trivia questions:", error);
            }
        });
    }


    function populateGameBoard(questions) {
        
        questions = shuffle(questions);

     
        $("#categories-row").append("<th>Trivia</th>");

      
        var questionsBody = $("#questions-body");
        for (var i = 0; i < 5; i++) {
            var row = $("<tr>");
            for (var j = 0; j < 6; j++) {
                var index = i * 6 + j;
                var cell = $("<td>").addClass("question").text("?");
                row.append(cell);
            }
            questionsBody.append(row);
        }
    }


    $(document).on("click", ".question", function() {
        var cell = $(this);
        var index = cell.closest("tr").index() * 6 + cell.closest("td").index();
        if (cell.text() === "?") {
            showQuestion(index, questions); 
        } else {
            showAnswer(index, questions); 
        }
    });

 
    function showQuestion(index, questions) {
        var question = questions[index];
        $(".question").eq(index).text(question.question);
    }


    function showAnswer(index, questions) {
        var answer = questions[index];
        $(".question").eq(index).text(answer.correct_answer);
    }


    $("#restart-btn").on("click", function() {
        $("#categories-row").empty(); 
        $("#questions-body").empty(); 
        fetchTriviaQuestions(); 
    });


    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


    fetchTriviaQuestions();
});
