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
buildingPrices = [10,60,360,2160,12960,77760]
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
  document.getElementById("number-display").innerText = "Parsed Tokens:" + Math.ceil(numTokens).toString();
  document.getElementById("tps-display").innerText = "Tokens Per Second: " + (buildings[0] + 4*buildings[1] + 16*buildings[2] + 64*buildings[3] + 256*buildings[4] + 1024*buildings[5]).toString();
  numTokens += 0.005*buildings[0];
  numTokens += 0.02*buildings[1];
  numTokens += 0.08*buildings[2];
  numTokens += 0.32*buildings[3];
  numTokens += 1.28*buildings[4];
  numTokens += 4.096*buildings[5];
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
  document.getElementById("num" + buildingNames[n]).innerText = "Number of " + buildingNames[n] + ": " + buildings[n];
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
