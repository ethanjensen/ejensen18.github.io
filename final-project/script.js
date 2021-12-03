getRequest(0);
document.querySelector("#jorr-picasso").onclick = (event) =>
{
    parse(event);
};

async function getRequest(n)
{
  console.log();
  $.ajax({
  type: "GET",
  url: "https://php-noise.com/noise.php?r="+ (130*n % 256).toString() + "&g=204&b=" + (30*n % 256) + "&tileSize=" + 2*n + "&json",
  dataType: "text",
  success: function(response)
  {
    displayResults(response);
  }
  });
}

function displayResults(results)
{
  document.body.style.backgroundImage = "url(" +JSON.parse(results).uri +")";
}

numTokens = 0;
buildings = [0,0,0,0,0,0];
buildingPrices = [10,100,1000,10000,100000,1000000]
buildingNames = ["parseInt", "Regular expressions", "JSON.parse()", "xml parser", "compiler", "natural language processing"];
for (let i = 0; i < buildings.length; i++)
{
  displayCost(i);
  document.getElementById(buildingNames[i]).addEventListener("click", function(){buyBuilding(i);});
}

function parse(event)
{
  numTokens = numTokens + 1;
  sprayToken(event);
  if (Number.isInteger(Math.log2(numTokens)))
  {
    getRequest(Math.log2(numTokens));
  }
}

updateNumber = setInterval(frame, 5);
let framesElapsed = 0;

function frame()
{
  document.getElementById("number-display").innerText = "Parsed Tokens:" + numTokens.toString();
  if (framesElapsed % 200 == 0)
  {
    numTokens += buildings[0];
  }
  if (framesElapsed % 100 == 0)
  {
    numTokens += buildings[1];
  }
  if (framesElapsed % 50 == 0)
  {
    numTokens += buildings[2];
  }
  if (framesElapsed % 25 == 0)
  {
    numTokens += buildings[3];
  }
  if (framesElapsed % 12 == 0)
  {
    numTokens += buildings[4];
  }
  if (framesElapsed % 6 == 0)
  {
    numTokens += buildings[5];
  }
  framesElapsed += 1;
}

function buyBuilding(n)
{
  console.log(n);
  let price =  buildingPrices[n]
  if (numTokens >= Math.ceil(buildingPrices[n]))
  {
    numTokens -= Math.ceil(buildingPrices[n]);
    buildingPrices[n] = price*1.05
    buildings[n] += 1;
  }
  displayCost(n);
}

function displayCost(n)
{
  document.getElementById(buildingNames[n]).innerText = "Buy " + buildingNames[n] + "    Price: " + Math.ceil(buildingPrices[n]);
}

function sprayToken(event)
{
  let div = document.createElement("div");
  document.body.appendChild(div);
  var clientX = event.clientX;
  var clientY = event.clientY;
  //position div on mouseX, mouseY
  div.style.position = "absolute";
  div.style.left = clientX.toString() + "px";
  div.style.top = clientY.toString() + "px";
  div.innerHTML = "<img src = \"parsedToken.png\">";
  div.style.zIndex = 1;
  //animate with sprayFrame() and then this.remove()
  let id = setInterval(sprayFrame, 10);
  let n = 50
  let angle = Math.random()*360;
  function sprayFrame()
  {
    let dx = Math.cos(angle);
    let dy = Math.sin(angle);
    div.style.left = (parseInt(div.style.left) + dx).toString() + "px";
    div.style.top = (parseInt(div.style.top) + dy).toString() + "px";
    if (n < 1)
    {
      clearInterval(id);
      document.body.removeChild(div);
    }
    n -= 1;
  }
}
