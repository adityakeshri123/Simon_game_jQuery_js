var button_color = ["red","blue","green","yellow"];
var game_pattern = [ ];
var user_clicked_pattern =[ ];

var level = 0;
var game_status = 0;

var highest_level=0;

function play_sound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animated_press(current_color){
    $("#" + current_color).addClass("pressed");
    setTimeout(function(){
        $("#" + current_color).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    game_pattern = [ ];
    game_status=0;
}

function next_sequence(){
    user_clicked_pattern = [ ];
    var random_number = Math.floor(Math.random()*4);
    var random_color = button_color[random_number];
    game_pattern.push(random_color);

    level++;
    $("h1").text("Level  "+level);
    $("#"+random_color).fadeOut(100).fadeIn(100);
    play_sound(random_color);    
}

function checkAnswer(current_level){
    var l1 = game_pattern.length;
    var l2 = user_clicked_pattern.length;
    
    if(game_pattern[current_level]===user_clicked_pattern[current_level]){
        if(l1===l2){
            
            highest_level = Math.max(level,highest_level);
            $(".score").text("HIGHEST LEVEL : "+ highest_level);

            setTimeout(function(){
                next_sequence();
            },1000);
        }
    }
    else{
        play_sound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

$(".btn").click(function(){
    var name = $(this).attr("id");
    user_clicked_pattern.push(name);
    play_sound(name);
    animated_press(name);
    checkAnswer(user_clicked_pattern.length-1);
});


$(document).keypress(function(){
    if(!game_status){
        next_sequence();
        game_status = 1;
    }
});



