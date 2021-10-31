var posX = 0;
var posY = 145;
var dx = 1;
var dy = 1;

window.addEventListener('load', function ()
{
  document.getElementsByTagName("main")[0].style.margin = "50px";
  let p5Canvas = document.getElementsByClassName("p5Canvas")[0];
  p5Canvas.style.position = "absolute";

  id = setInterval(frame, 3, p5Canvas);

  let button = document.createElement("button");
})

function frame(canvas)
{
  canvas.style.left = posX.toString() + "px";
  canvas.style.top = posY.toString() + "px";
  posX += dx;
  posY += dy;

  let divHeight = document.getElementById("div0").clientHeight;

  if (Math.abs(posX - window.innerWidth/2 + 150) > window.innerWidth/2 - 150)
  {
    dx = -dx;
  }

  if (posY <= divHeight + 10)
  {
    dy = 1
  }
  else if (posY > 2*window.innerHeight/3)
  {
    dy = -1
  }
}

var spongeLevel = 0;

window.addEventListener("click", clickHandler, true);

function clickHandler(event)
{
  if (spongeLevel > 2)
  {
    event.stopPropagation();
    event.preventDefault();
    window.alert("max iteration limit reached!")
  }
  else
  {
    if (spongeLevel > 1)
    {
      if (!window.confirm("Are you sure you want to do another iteration?"))
      {
        event.stopPropagation();
        event.preventDefault();
      }
      else
      {
        spongeLevel += 1;
      }
    }
    else
    {
      spongeLevel += 1;
    }
  }
}