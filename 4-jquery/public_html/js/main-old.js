// create global canvas and cxt
    var canvas, cxt, shape;
    var timeText = "";
    var timeClick = 0.0;
    var timeTaken = 0.0;
    var timeStart = new Date().getTime();
    var shapeList = [];
    var timeRecords = {"easy" : [], "medium" : [], "hard" : []};
    var gameDifficulty = "medium";
    var respawnTime = 3.0;



    class Shape {
        constructor(colour, dimension, position, shapeType) {
            this.colour = colour;
            this.dimension = dimension;
            this.position = {x : position[0], y : position[1]};
            this.shapeType = shapeType;
            this.identifier = "clickable-shape"
        }

        drawShape () {
            if(this.shapeType == "circle"){
                cxt.fillStyle = this.colour;
                cxt.beginPath();
                cxt.arc(this.position.x, this.position.y, this.dimension/2, 0, Math.PI*2, true);
                cxt.fill();
            }
            else{
                cxt.fillStyle = this.colour;
                cxt.fillRect(this.position.x, this.position.y, this.dimension, this.dimension);
            }
        }
    };

    window.onload = function() {
        let gameWrapper = document.getElementById("game-wrapper");
        let timeText = ""//document.getElementById("your-time");
        let buttons = document.getElementsByClassName("difficulty-button");

        canvas = document.getElementById("canvas");
        canvas.width = 700;
        canvas.height = 700;

        cxt = canvas.getContext('2d');
        cxt.fillStyle = "black";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        addShape(create_shape("#00ff00", "circle"));
        addShape(create_shape("#ff0000", "square"));
        addShape(create_shape("#ff0000", "square"));

        addCanvasClickListener(canvas);
        //addButtonClickListener(buttons);

        var fps = 30;
        setInterval(function() { updateTime(timeText); }, 1000/fps);

        if(typeof jQuery != "undefined") {
                console.log("JQUERY PRESENT!");
            }
            else {
                console.log("JQUERY NOT PRESENT!");
            }
    };

    function addCanvasClickListener(element){
        element.addEventListener('click', (e) => {
            const clickPos = {
                x : e.clientX - canvas.offsetLeft,
                y : e.clientY - canvas.offsetTop
            };
            shapeHit(clickPos, timeStart);
        });
    };

    function addButtonClickListener(buttons) {
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', function() {
                var current = document.getElementsByClassName("selected-button");
                current[0].className = current[0].className.replace(" selected-button", "");
                this.className += " selected-button";
                setDifficulty(this.innerHTML);
            });
        }
    }

    function addShape(shape){
        shapeList.push(shape);
    };

    function shapeHit(clickPos){
        hit = false;
        console.log("X: " + clickPos['x'] + "\nY: " + clickPos['y']);

        for (var i = 0; i < shapeList.length; i++) {
            var shape = shapeList[i];

            if(shape.shapeType == "circle") {
                hit = Math.sqrt((clickPos['x'] - shape.position['x'])**2 + (clickPos['y'] - shape.position['y']) **2) < shape.dimension/2;
            }
            else {
                hit = (shape.position['x'] <= clickPos['x'] && clickPos['x'] <= shape.position['x'] + shape.dimension) &&
                (shape.position['y'] <= clickPos['y'] && clickPos['y'] <= shape.position['y'] + shape.dimension);
            }
            if(hit == true){
                updateGame(true);
                refreshShape(i);
                console.log(shape.shapeType + " hit!");
            };
        }
        
        
        return hit  
    };

    function updateTime(element) {
        var currentTime = new Date().getTime();

        for(var i = 0; i < shapeList.length; i++) {
            shapeList[i].drawShape()
        }

        timer = calculate_time(timeStart, currentTime);
        append_to_innerHTML(element, timer); 
    };

    function setDifficulty(difficulty){
        var difficultyText = document.getElementById("difficulty-text");

        if(difficulty.toLowerCase() == "easy") {
            gameDifficulty = "easy";
            difficultyText.innerHTML = "EASY";
        }
        else if(difficulty.toLowerCase() == "medium") {
            gameDifficulty = "medium";
            difficultyText.innerHTML = "MEDIUM";
        }
        else if(difficulty.toLowerCase() == "hard") {
            gameDifficulty = "hard";
            difficultyText.innerHTML = "HARD";
        }

        refreshShape();
        updateGame(false);
    }

    function refreshShape(shape = undefined) {
        cxt = canvas.getContext('2d');
        cxt.fillStyle = 'black';
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        console.log("NUMBER OF SHAPES: " + shapeList.length);
        //remove shape
        shapeList.splice([shape],[shape+1]);
        
        //create and add new shape
        shapeList.push(create_shape());

        console.log("NUMBER OF SHAPES: " + shapeList.length);
    };

    function updateScores() {
        var table = 0;
        var scoreElements = [];
        scoreElements.push(document.getElementById("score-1st"));
        scoreElements.push(document.getElementById("score-2nd"));
        scoreElements.push(document.getElementById("score-3rd"));

        for(var i = 0; i < scoreElements.length; i++ ) {
            scoreElements[i].innerHTML = timeRecords[gameDifficulty][i];
        }

        console.log("LENGTH OF RECORD TIMES: " + timeRecords.length)
    };

    // reset time, update scores
    function updateGame(saveTime) {
        if(saveTime == true) {
            timeTaken = calculate_time(timeStart, new Date().getTime());
            timeRecords[gameDifficulty].push(timeTaken);

            console.log("TIME TAKEN: " + timeTaken);
            console.log("LOG OF TIMES:")
            console.log("EASY: " + timeRecords["easy"]);
            console.log("MEDIUM: " + timeRecords["medium"]);
            console.log("HARD: " + timeRecords["hard"]);
        }

        timeRecords[gameDifficulty].sort();
        timeRecords[gameDifficulty].splice(3, 3);

        //updateScores();
        
        timeStart = new Date().getTime();
    };

    function flip_color(element, color){
        if(element.style.backgroundColor == color){
            element.style.backgroundColor = 'black';
        }
        else {
            element.style.backgroundColor = color;
        }
    };

    function alert_box(message){
        alert(message);
    };

    function append_to_innerHTML(element, append){
        element.innerHTML = "Timer: " + append + "s";
    };

    function random_number(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function create_shape(colour=undefined, shape=undefined) {
        var colour = colour;
        if(colour == undefined){
            colour = getRandomColour();
        }
        
        var dimension = 0.0;
        let shapeType = ""
        // 2 is for px, ensuring at least a margin of 2px on canvas for shapes
        let posMin = 2;
        let posMax = canvas.width - 2;

        // Set min-max dimensions based on difficulty
        if(gameDifficulty == "easy") {
            dimension = random_number(120, 240);
        }
        else if(gameDifficulty == "medium") {
            dimension = random_number(60, 120);
        }
        else if(gameDifficulty == "hard") {
            dimension = random_number(10, 40);
        }

        // randomize circle or square based on even or odd number 
        if(shape == undefined) {
            shapeType = (random_number(1, 10) % 2 == 0 ? "circle" : "square");
        }
        else {
            shapeType = shape;
        }

        // edit posMin/posMax to ensure circle is pushed/pulled into canvas by its radius
        if(shapeType == "circle") {
            posMin += dimension/2;
            posMax -= dimension/2;
        }
        else if (shapeType == "square") {
            // edit max pos to pull shape back in by width/height
            posMax -= dimension;
        }
        
        // get random position values for shape
        x = random_number(posMin, posMax);
        y = random_number(posMin, posMax);

        shape = new Shape(colour, dimension, [x, y], shapeType);

        return shape
    };

    function calculate_time(startTime, timeClick){
        let ms = 1000;
        //console.log((timeClick - startTime)/ms);
        return ((timeClick - startTime)/ms);
    };

    function getRandomColour() 
    {
        var color = "";
        for(var i = 0; i < 3; i++) {
            var sub = Math.floor(Math.random() * 256).toString(16);
            color += (sub.length == 1 ? "0" + sub : sub);
        }
        return "#" + color;
    };
