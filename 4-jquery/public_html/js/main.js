$(".shape").click(function () {
    //printAttributes($(this));
    //hideShape($(this));
    changeText($('#text-1'));
    //changeSrc($('.iframe'));
    changeColor($(this), true);
});

$(".shape").hover(function () {
    changeColor($('#text-1'));
});

function changeSrc(element) {
    element.attr("src", "http://www.gumroad.com");
    element.width("50%");
}

function hideShape(shape) {
    console.log("CLICKED!" + shape.attr("class"));
    shape.css("display", "none");
}

function changeText(text) {
    replacement = ""

    console.log(text.html());

    if(text.html() == "CHANGED TEXT!") {
        replacement = "OTHER TEXT!";
    }
    else if(text.html() != "CHANGED TEXT!") {
        replacement = "CHANGED TEXT!";
    }

    text.html(replacement);
}

function printAttributes(element) {
    console.log(element.css("background-color"));
    console.log(element.attr("class"));
}

function changeColor(element, background=false) {
    color = getRandomColour();

    if(background == true) {
        element.css("background-color", color);
    }

    element.css("color", color);
}

function getRandomColour() {
    var color = "";
    for(var i = 0; i < 3; i++) {
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
};