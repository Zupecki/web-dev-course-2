//Start timer on page load - get current time on page load, get time when click happens, subtract
    var timeStart = new Date().getTime();
    var timeClick = 0.0;
    var canvas, cxt;

/*  (function(){
            timeStart = new Date().getTime()
            console.log("TIMER:" + timer)
    })();
*/		

    class Shape {
        constructor(colour, dimension, position, shapeType) {
            this.colour = colour;
            this.dimension = dimension;
            this.position = {x : position[0], y : position[1]};
            this.shapeType = shapeType;
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
    }

    window.onload = function() {
        gameWrapper = document.getElementById("game-wrapper");

        canvas = document.getElementById("canvas");
        canvas.width = 700;
        canvas.height = 700;

        cxt = canvas.getContext('2d');
        shape = create_shape();
        shape2 = create_shape();

        //setInterval(updateShape(shape), 1000/30);

        cxt.fillStyle = "black";
        cxt.fillRect(0, 0, canvas.width, canvas.height);

        //cxt.rect(20,20,150,100);
        //cxt.stroke();

        updateShape(shape, shape2);

        console.log(shape);
        
    }

    function updateShape(shape, shape2) {
        //cxt.fillStyle = "blue";
        //cxt.fillRect(0, 0, canvas.width, canvas.height);
        shape2.drawShape();
        shape.drawShape();   
    }

    document.getElementById("interactive-shape").onclick = function(){
        // Get page elements
        var timeText = document.getElementById("your-time");
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
        var dimension = random_number(60, canvas.width/3);
        let shapeType = ""

        // randomize circle or square based on even or odd number 
        if(random_number(1, 10)%2 == 0){
            shapeType = "circle";
            console.log("DIMENSION: "+dimension/2);
            console.log("1/3rd CANVAS WIDTH: "+canvas.width/3);
            /*
            if(dimension*2 > canvas.width/3){
                dimension = canvas.width/3;
                console.log("EDIT DIMENSION")
            }
            */
            //dimension = dimension/2;
        }
        else {
            shapeType = "square";
        }

        console.log("DIMENSION IS NOW: "+dimension);
        //randomise x and y position
        x = random_number(2, canvas.width - (dimension - 2));
        y = random_number(2, canvas.width - (dimension - 2));

        return new Shape(colour, dimension, [x, y], shapeType);
    };

    function calculate_time(startTime, timeClick){
        let ms = 1000;
        console.log((timeClick - startTime)/ms);
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
    }
