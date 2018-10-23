// create global canvas and cxt
    var canvas, cxt;
    var timeText = "";
    var timeClick = 0.0;
    var timeTaken = 0.0;
    var timeStart = new Date().getTime();
    var timeRecords = [];

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
        let timeText = document.getElementById("your-time");

        canvas = document.getElementById("canvas");
        canvas.width = 700;
        canvas.height = 700;

        cxt = canvas.getContext('2d');
        cxt.fillStyle = "black";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        let shape = create_shape();
        shape.drawShape();
        console.log(shape)

        addEventListener(canvas, shape);

        var fps = 30;
        setInterval(function() { updateTime(timeText); }, 1000/fps);
    };

    function addEventListener(canvas, shape){
        canvas.addEventListener('click', (e) => {
            const clickPos = {
                x : e.clientX - canvas.offsetLeft,
                y : e.clientY - canvas.offsetTop
            };
            shapeHit(shape, clickPos, timeStart);
        });
    };

    function shapeHit(shape, clickPos){
        hit = false;
        console.log("X: " + clickPos['x'] + "\nY: " + clickPos['y']);

        if(shape.shapeType == "circle") {
            hit = Math.sqrt((clickPos['x'] - shape.position['x'])**2 + (clickPos['y'] - shape.position['y']) **2) < shape.dimension/2;
        }
        else {
            hit = (shape.position['x'] <= clickPos['x'] && clickPos['x'] <= shape.position['x'] + shape.dimension) &&
            (shape.position['y'] <= clickPos['y'] && clickPos['y'] <= shape.position['y'] + shape.dimension);
        }

        if(hit == true){
            resetAndSaveTime();
            console.log(shape.shapeType + " hit!");
        };
        
        return hit  
    };

    function updateTime(element) {
        var currentTime = new Date().getTime();
        timer = calculate_time(timeStart, currentTime);

        append_to_innerHTML(element, timer);
    };
/*
    document.getElementById("interactive-shape").onclick = function(){
        // Get page elements
        
        var shape = document.getElementById("interactive-shape");
        var currentColor = shape.style.color;

        // Test color change on click
        flip_color(shape, 'blue');

        // Get time at click
        timeClick = new Date().getTime();
        // Calculate the difference in time from page load
        var timer = calculate_time(timeStart, timeClick).toFixed(2);
        console.log("TIMER: "+ timer)

        // Add time taken to timeText element
        append_to_innerHTML(timeText, timer);

        // Reset the start time
        timeStart = new Date().getTime();
    };
*/

    // TODO - Have timeRecords trim to best 3
    function resetAndSaveTime() {
        timeTaken = calculate_time(timeStart, new Date().getTime());
        timeRecords.push(timeTaken);
        console.log("LOG OF TIMES: " + timeRecords);
        timeStart = new Date().getTime();
    }

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
        element.innerHTML = "Your time: " + append + "s";
    };

    function random_number(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function create_shape() {
        let colour = getRandomColour();
        let dimension = random_number(60, canvas.width/3);
        let shapeType = ""
        // 2 is for px, ensuring at least a margin of 2px on canvas for shapes
        let posMin = 2;
        let posMax = canvas.width - 2;

        // randomize circle or square based on even or odd number 
        if(random_number(1, 10)%2 == 0){
            shapeType = "circle";
            // edit posMin/posMax to ensure circle is pushed/pulled into canvas by its radius
            posMin += dimension/2;
            posMax -= dimension/2;
        }
        else {
            shapeType = "square";
            // edit max pos to pull shape back in by width/height
            posMax -= dimension;
        }

        // get random position values for shape
        x = random_number(posMin, posMax);
        y = random_number(posMin, posMax);

        return new Shape(colour, dimension, [x, y], shapeType);
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
