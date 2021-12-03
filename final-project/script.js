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

function frame()
{
  document.getElementById("number-display").innerText = "Parsed Tokens:" + numTokens.toString();
}

function buyBuilding(n)
{
  let price =  buildingPrices[n]
  if (numTokens >= Math.ceil(buildingPrices[n]))
  {
    buildingPrices[n] = price*1.05
  }
}

function sprayToken(event)
{
  let div = document.createElement("div");
  document.body.appendChild(div);
  var clientX = event.clientX;
  var clientY = event.clientY;
  console.log(clientX, clientY);
  //position div on mouseX, mouseY
  div.style.position = "absolute";
  div.style.left = clientX.toString() + "px";
  div.style.top = clientY.toString() + "px";
  div.innerHTML = "<img src = \"parsedToken.png\">";
  div.style.zIndex = 1;
  console.log(div.style.top);
  //animate with sprayFrame() and then this.remove()
}

function sprayFrame()
{
  
}