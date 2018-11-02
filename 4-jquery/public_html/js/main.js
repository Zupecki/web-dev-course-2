window.onload = function () {
    //click .shape class
    $(".shape").click(function () {
        //printAttributes($(this));
        //hideShape($(this));
        toggleText($('#text-1'), ["CHANGED TEXT!", "OTHER TEXT!"]);
        //changeSrc($('.iframe'));
        //fade($(".shape"), "out");
        move($(this), 1000);
    });

    //click button-1 id
    $("#button-1").click(function () {
        //check if shapes are displayed or not
        if($(".shape").css("display") == "none") {
            fade($(".shape"), "in", 2500); //if not displayed, fade in
        }
        else {
            fade($(".shape"), "out", 2500); //else fade out
        }
    });

    //hover .shape class
    $(".shape").hover(function () {
        changeColor($('#text-1'));
        changeColor($(this), true);
    });
};

//FUNCS
function fade(element, direction, duration) {
    if(direction == "out") {
        element.fadeOut(duration, function() {
            toggleText($("#button-1"), ["SEND SHAPES AWAY", "BRING SHAPES BACK"]);
        });
    }
    else if(direction == "in") {
        element.fadeIn(duration, function() {
            toggleText($("#button-1"), ["SEND SHAPES AWAY", "BRING SHAPES BACK"]);
        });
    }
};

function move(element, duration) {
    let grow = 0;
    let movePos = "0px";

    var animProps = {
        top:"1000px",
        left:"500px",
        width:element.css("width"),
        height:element.css("height")
    };

    element.css("position","absolute");
    console.log("WIDTHx2: "+parseInt(element.css("width"))*2);

    if(element.css("top") == "1000px") {
        movePos = "0px";
        grow = String(parseInt(element.css("width"))/2)+"px";
    }
    if(element.css("top") == "0px"){
        movePos = "1000px";
        grow = String(parseInt(element.css("width"))*2)+"px";
    }

    console.log("GROW: "+grow);

    //update values
    animProps["top"] = movePos;
    animProps["left"] = movePos;
    animProps["width"] = grow;
    animProps["height"] = grow;

    element.animate(animProps, duration, function (){
        //if shape has returned to start pos, set back to relative
        if(element.css("top") == "0px") {
            element.css("position","relative");
        } 
    });
};

function fadeIn(element) {
    element.fadeIn(5000, function() {
        $(".shape").fadeOut(5000);
    });
};

function changeSrc(element) {
    element.attr("src", "http://www.gumroad.com");
    element.width("50%");
};

function hideShape(shape) {
    console.log("CLICKED!" + shape.attr("class"));
    shape.css("display", "none");
};

function toggleText(element, text) {
    currentText = element.html();

    console.log(element.html());

    if(currentText == text[0]) {
        element.html(text[1]);
    }
    else if(currentText != text[0]) {
        element.html(text[0]);
    }
};

function printAttributes(element) {
    console.log(element.css("background-color"));
    console.log(element.attr("class"));
};

function changeColor(element, background=false) {
    color = getRandomColour();

    if(background == true) {
        element.css("background-color", color);
    }

    element.css("color", color);
};

function getRandomColour() {
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
};
