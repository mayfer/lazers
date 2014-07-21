
function clone(obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = clone(obj[key]);
    return temp;
}

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

    cstart = 0;

    var start = Date.now();
    var follow_cursor = true;
    $(demo).on('click', function(e) {
        follow_cursor = !follow_cursor;
        cstart = timediff + start;
        blew_up = !blew_up;
    });
    var last_cursor = {
        x: 0,
        y: 0,
    }

    var img = new Image();
    img.src = "http://placekitten.com/g/200/300";

    var degrees = 0;

    var circle = {
        x: 200,
        y: 200,
    }

    var blew_up = false;

    //ctx.fillStyle   = '#00f';
    this.draw = function(canvas, ctx) {
        var now = Date.now();
        timediff = start - now;

        var x = canvas.width/2 - 50;
        var y = canvas.height/2 - 50;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(follow_cursor) {
            last_cursor = {
                x: demo.cursor_x,
                y: demo.cursor_y,
            }
        }
        ctx.save();
        degrees = timediff/10;
        ctx.translate(last_cursor.x, last_cursor.y);
        ctx.rotate(degrees*Math.PI/180);

        ctx.drawImage(img, 0, 0);
        ctx.restore();

        if(!blew_up) {

            circle.x += (last_cursor.x - circle.x) / 100 + Math.cos(timediff/100)*10;
            circle.y += (last_cursor.y - circle.y) / 100 + Math.cos(timediff/100)*10;

            for(var i=0; i<10; i++) {

                ctx.beginPath();
                ctx.arc(circle.x, circle.y, 30, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#a00';
                ctx.fill();
            }
        } else {
            for(var rad=0; rad<=Math.PI*2; rad+=Math.PI/4) {
                var ctimediff = cstart - Date.now();
                ctx.beginPath();
                var x = circle.x + (ctimediff/100)*Math.sin(rad);
                var y = circle.y + (ctimediff/100)*Math.cos(rad);
                ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
                ctx.fillStyle = '#a00';
                ctx.fill();
            }
            
        }
    }

    return this;
}
