window.onload = function () {
    let text = "";

    $("#button-1").click(function() {
        //if succeeds, use callback, otherwise
        $.ajax("./files/info.txt").done(function(data) {

            $("#text-1").html(data);

        }).fail(function(e) {

            alert(e.statusText);

        });
    });  
};

//old code from previous project, might want to reuse some before wrapping up
/*
class Shape {
    constructor(element, shapeId, startPos, currentPos) {
        this.element = element;
        this.shapeId = shapeId;
        this.startPos = startPos;
        this.currentPos = currentPos;
    }

    moveTo(x, y) {
        move(this, [x, y]);
    }

    setCurrentPos(currentPos) {
        this.currentPos = currentPos;
    }
}

//FUNCS
//search through all objects, match to clicked id and return custom object
function getElementObject(element, objectArray) {
    let shape = {};
    
    $.each(objectArray, function (key, value) {
        if(element.attr("id") == value.shapeId) {
            shape = value;
        }
    });

    return shape;
}

//cycle through all shape elements, create new shape object and add to array
function createShapes(elementsArray) {
    let shapeObjects = [];

    $.each(elementsArray, function (key, value) {
        //get current position, based on auto doc placement
        position = getPos($(value));

        //create new object
        shapeObjects.push(new Shape($(value), $(value).attr("id"), position, position));
    });

    return shapeObjects;
}

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

//return current position
function getPos(element) {
    let position = element.offset();

    return position;
};

function getInputCoords() {
    let x = parseInt($("#x-input").val());
    let y = parseInt($("#y-input").val());

    return [x, y]
}

function getDuration() {
    let duration = parseInt($("#time-input").val());

    return duration
}

//set position css to absolute and current position
function setPos(element) {
    //get current position to set so absolute switch won't move
    var setPos = element.offset();

    //set to current position, but absolute (don't move)
    element.css("position", "absolute");
    element.css(setPos);
}

function move(object, moveTo) {
    let grow = 0;
    let animProps = {};
    //fetch coordinates and duration inputs by user from input fields on page
    let destinationCoords = getInputCoords();
    let duration = getDuration();


    //get element from object
    let element = object.element;
    //set position to current position to give illusion it stays where it is on absolute switch
    setPos(element);
  
    //figure out if coming or going - if current location same as start, set to new location
    if(object.currentPos == object.startPos) {
        animProps["left"] = destinationCoords[0];
        animProps["top"] = destinationCoords[1];
        //animProps["left"] = moveTo[0];
        //animProps["top"] = moveTo[1];
    }

    //figure out if coming or going - if current location different to start, set start location
    if(object.currentPos != object.startPos){
        animProps = object.startPos;
    }

    //animate based on decided qualities
    element.animate(animProps, duration, function (){
        //set currentPos to position moved to
        object.setCurrentPos(animProps);
        console.log("ANIMATION CALLBACK");
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
*/
