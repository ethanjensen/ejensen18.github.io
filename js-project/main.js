let x = 0;
let s;
var numExplosions = 0;

function setup()
{
  createCanvas(300,200, WEBGL);
  s = new Sponge(0, 0, 0, 100);
}

//renders the menger sponge and rotates it.
function draw()
{
  drawBackground();
  pointLight(192, 196, 116,-150, 100,100);
  pointLight(231, 145, 61,-150, -100,50);
  rotateX(x);
  rotateY(0.5*x);
  noStroke();
  s.display();
  x+= 0.02;
}

//Adds an iteration to the menger sponge if a mouse click is registered. Maximum of a level 3 Menger Sponge. (lag)
function mouseClicked()
{
  if (numExplosions < 3)
  {
    s.explode();
    numExplosions += 1;
  }
}

//not portable code. Uses global dx, dy variables in index.js
//changes canvas background based on the direction the canvas is moving through the page.
function drawBackground()
{
  if (dx == 1)
  {
    if (dy == 1)
    {
      background(172, 252, 230);
    }
    else
    {
      background(252, 172, 230);
    }
  }
  else
  {
    if (dy == 1)
    {
      background(172, 230, 252);
    }
    else
    {
      background(230, 172, 252);
    }
  }
}


// function setup()
// {
//   createCanvas(400,400);
//   C = new EllipticCurve(0,1,-1);
// }
//
// function draw()
// {
//   background(220);
//   p = [0, 1];
//   q = [-pow(2,1/3), 0];
//   plot(p, 20);
//   plot(q, 20);
//   for (let i = 0; i < 3000; i++)
//   {
//     let r = C.group_law(p, q);
//     p = q;
//     q = r;
//     plot(q,20);
//   }
// }
//
// function plot(p, size)
// {
//   point(width/2 + size*p[0], height/2 + size*p[1]);
// }
