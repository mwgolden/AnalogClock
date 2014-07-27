drawClock();

function drawClock() {
    var a_canvas = document.getElementById("a");
    var a_context = a_canvas.getContext("2d");
    var r = 100;
    midx = a_canvas.width/2;
    midy = a_canvas.height/2;
    
    var time = new Date();
    
    var secondHand = {
        name: "second",
        value: function(){return time.getSeconds();},
        max: 60,
        color: 'red',
        width: 1
    };
    var minuteHand = {    
        name: "minute",
        value: function(){return time.getMinutes();},
        max: 60,
        color: 'blue',
        width: 1
    };
    var hourHand = {
        name: "hour",
        value: function(){return time.getHours() % 12;},
        max: 12,
        color: 'black',
        width: 3
    };
    hands = [hourHand, minuteHand, secondHand];
    updateClock(a_canvas, a_context, r, hands);
    
    setInterval(
        function(){            
            time = new Date();
            updateClock(a_canvas, a_context, r, hands);
        }, 1000);
}

function updateClock(a_canvas, a_context, r, hands) {
    clearClock(a_canvas);
    for (var i = 0; i < hands.length; i++) {
        updateHand(a_canvas, hands[i], r);
    }
    drawCircle(a_context, r);
}

function updateHand(a_canvas, hand, r) {
    var a_context = a_canvas.getContext("2d");
    var value = hand.value();
    halfMax = hand.max / 2;
    xprime = midx + r * Math.sin(value * Math.PI / halfMax);
    yprime = (midy - r) + r * (1 - Math.cos(value * Math.PI / halfMax));
    a_context.beginPath();
    a_context.moveTo(midx, midy);
    a_context.lineTo(xprime, yprime);
    a_context.lineWidth = hand.width;
    a_context.strokeStyle = hand.color;
    a_context.stroke();
    a_context.closePath();
    
    var display = value % hand.max;
    if(display < 10){
        display = "0" + display;
    }
    document.getElementById(hand.name).innerHTML = display;    
}

function drawCircle(a_context, r){
     a_context.beginPath();
     a_context.arc(midx, midy, r + 10, 0, 2 * Math.PI, true);
     a_context.strokeStyle = "black";
     a_context.lineWidth = 1;
     a_context.stroke();
     a_context.closePath();   
}

function clearClock(a_canvas) {
    a_canvas.width = a_canvas.width;
}