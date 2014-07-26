drawClock();

function drawClock() {
    var a_canvas = document.getElementById("a");
    var a_context = a_canvas.getContext("2d");
    var r = 100;
    midx = a_canvas.width/2;
    midy = a_canvas.height/2;
    
    var now = new Date();
    var secondHand = now.getSeconds();
    var minuteHand = now.getMinutes();
    var hourHand = now.getHours() % 12;
    
    updateSecondHand(a_canvas, secondHand, r);
    updateMinuteHand(a_canvas, minuteHand, r);
    updateHourHand(a_canvas, hourHand, r);
    drawCircle(a_context, r);
    
    setInterval(
        function(){
            if(hourHand == 12){
                hourHand = 0;   
            }
            if(minuteHand == 60){
                hourHand++;
                minuteHand = 0;
            }
            if(secondHand == 60){
                minuteHand++;
                secondHand = 0
            }
            secondHand++
            
            updateSecondHand(a_canvas, secondHand, r);
            drawCircle(a_context, r);
            updateMinuteHand(a_canvas, minuteHand, r);
            updateHourHand(a_canvas, hourHand, r);
        }, 1000);
}
function updateSecondHand(s_canvas, secondHandIncrement, r){
    var s_context = s_canvas.getContext("2d");
    s_canvas.width = s_canvas.width;
    xprime = midx + r * Math.sin(secondHandIncrement * Math.PI/30);
    yprime = (midy - 100) + r * (1 - Math.cos(secondHandIncrement * Math.PI/30));
    s_context.beginPath();
    s_context.moveTo(midx, midy);
    s_context.lineTo(xprime, yprime);
    s_context.strokeStyle = "red";
    s_context.stroke();
    s_context.closePath();
    var displaySecond = secondHandIncrement;
    if(displaySecond < 10){
        displaySecond = "0" + displaySecond;
    }
    document.getElementById("sec").innerHTML = displaySecond;    
}
function updateMinuteHand(m_canvas, minuteHandIncrement, r){
    var m_context = m_canvas.getContext("2d");
    //m_canvas.width = m_canvas.width;
    xprime = midx + r * Math.sin(minuteHandIncrement * Math.PI/30);
    yprime = (midy - 100) + r * (1 - Math.cos(minuteHandIncrement * Math.PI/30));
    m_context.beginPath();
    m_context.moveTo(midx, midy);
    m_context.lineTo(xprime, yprime);
    m_context.strokeStyle = "black";
    m_context.stroke();
    m_context.closePath();
    var displayMinute = minuteHandIncrement;
    if(displayMinute < 10){
        displayMinute = "0" + displayMinute;
    }
    document.getElementById("min").innerHTML = displayMinute;
}
function updateHourHand(h_canvas, hourHandIncrement, r){
    var h_context = h_canvas.getContext("2d");
    xprime = midx - r * Math.sin(hourHandIncrement * Math.PI/15);
    yprime = (midy - 100) + r * (1 + Math.cos(hourHandIncrement * Math.PI/15));
    h_context.beginPath();
    h_context.moveTo(midx, midy);
    h_context.lineTo(xprime, yprime);
    h_context.strokeStyle = "black";
    h_context.lineWidth = 3;
    h_context.stroke();
    h_context.closePath();
    var displayHour = hourHandIncrement % 12;
    if(hourHandIncrement < 10){
        displayHour = "0" + displayHour;
    }
    document.getElementById("hour").innerHTML = displayHour;
}

function drawCircle(a_context, r){
     a_context.beginPath();
     a_context.arc(midx, midy, r + 10, 0, 2 * Math.PI, true);
     a_context.strokeStyle = "black";
     a_context.stroke();
     a_context.closePath();   
}
