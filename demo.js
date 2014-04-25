Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
      };

function get_random_color(steps, range_min, range_max) {
    numOfSteps = steps;
    step = Math.floor(Math.random()*(range_max-range_min+1)+range_min);

    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
        case 0: r = 1, g = f, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = 0, g = 1, b = f; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = f, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    var brightness = 220;
    var c = "#" + ("00" + (~ ~(r * brightness)).toString(16)).slice(-2) + ("00" + (~ ~(g * brightness)).toString(16)).slice(-2) + ("00" + (~ ~(b * brightness)).toString(16)).slice(-2);
    return (c);
}

function rand(num) {
    return Math.floor(Math.random() * num);
}


function demo(canvas, ctx) {
    var demo = this;

    demo.cursor_x = 0;
    demo.cursor_y = 0;

    $(demo).on('mousemove', function(e){
        demo.cursor_x = e.pageX;
        demo.cursor_y = e.pageY;
    });

    var squares = [];
    
    //ctx.fillStyle   = '#00f';
    this.draw = function(canvas, ctx) {
        var x = canvas.width/2 - 50;
        var y = canvas.height/2 - 50;

        var proximity_x = Math.abs( (canvas.width/2) - demo.cursor_x) / (canvas.width/2);
        var proximity_y = Math.abs( (canvas.height/2) - demo.cursor_y) / (canvas.height/2);

        var proximity = Math.sqrt(Math.pow(proximity_x, 2) + Math.pow(proximity_y, 2));

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(proximity < 0.011) {
            
            var color = get_random_color(30, 5, 8);
            squares.push({
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height,
                color: color,
            });
        }

        for(var i=0; i<squares.length; i++) {
            ctx.fillStyle = squares[i].color;
            ctx.fillRect(squares[i].x, squares[i].y, 10, 10)


        }
        ctx.lineWidth = 5;
        if(squares.length > 0 && Math.random() < 0.5) {
            var index = Math.floor(Math.random()*squares.length);
            var square = squares[index];
            ctx.beginPath();

            var grad= ctx.createLinearGradient(0, canvas.height, square.x+5, square.y+5);
            grad.addColorStop(0, "white");
            grad.addColorStop(1, "red");
            ctx.strokeStyle = grad;

            ctx.strokeStyle = grad;
            ctx.moveTo(0, canvas.height);
            ctx.lineTo(square.x+5, square.y+5);
            ctx.stroke();
            squares.remove(index);
        }

        var red = Math.floor(255 * (1 - proximity));
        var green = 100;
        var blue = Math.floor(255 * (proximity));

        var color = "rgba("+red+", "+green+", "+blue+", 1)";
        ctx.fillStyle = color;
        
        ctx.fillRect(x, y, 100, 100);
    }

    return this;
}
