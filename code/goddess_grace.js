var tier = {
    S : { rate: 0.02 },
    A : { rate: 0.2 },
    B : { rate: 10.0 },
    C : { rate: 100.0 }
}

var tierItems = {
    S: ["Archstone 1", "Archstone 2", "Briknyte Large Box (x64)"],
    A: ["Archstone fragment", "Briknyte Mini Box (x5)", "Mystic Tome Bundle Box (x10)", "Ruby Anvil Box (x20)"],
    B: ["Magic Stone", "Sandra's Magnifier", "Sandra's Detailed Magnifier", "Mystic Tome Page"],
    C: ["Hero Potion Selection Box", "Blessed Shard", "Enhancement Coupon: 100,000", "Attribute Point: 100"]
}

// Page elements
var elementTierS = document.getElementById("tierS");
var elementTierA = document.getElementById("tierA");
var elementTierB = document.getElementById("tierB");
var elementTierC = document.getElementById("tierC");
var elementTryCounter = document.getElementById("tryCounter");
var elementSilverSpent = document.getElementById("silverSpent");
var elementMessage = document.getElementById("message");
var elementRateS = document.getElementById("rateS");
var elementRateA = document.getElementById("rateA");
var elementRateB = document.getElementById("rateB");
var elementRateC = document.getElementById("rateC");
var elementTryNumber = document.getElementById("tryNumber");
var elementTryButton = document.getElementById("tryButton")

var tierSAcquired = [false,false,false];
var eventEnded = false;
var tryNumber = 1;

function populate()
{
    // TIER S
    for(var i = 0; i < tierItems.S.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = tierItems.S[i];
        li.id = "tierS_li_" + i;

        var span = document.createElement("span");
        span.id = "tierS_" + i;
        span.innerHTML = "0";
        li.appendChild(span);

        elementTierS.appendChild(li);
    }

    // TIER A
    for(var i = 0; i < tierItems.A.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = tierItems.A[i];

        var span = document.createElement("span");
        span.id = "tierA_" + i;
        span.innerHTML = "0";
        li.appendChild(span);

        elementTierA.appendChild(li);
    }

    // TIER B
    for(var i = 0; i < tierItems.B.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = tierItems.B[i];

        var span = document.createElement("span");
        span.id = "tierB_" + i;
        span.innerHTML = "0";
        li.appendChild(span);

        elementTierB.appendChild(li);
    }

    // TIER C
    for(var i = 0; i < tierItems.C.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = tierItems.C[i];

        var span = document.createElement("span");
        span.id = "tierC_" + i;
        span.innerHTML = "0";
        li.appendChild(span);

        elementTierC.appendChild(li);
    }
}

function calculate()
{
    if(tierSAcquired[0] && tierSAcquired[1] && tierSAcquired[2]) {
        eventEnded = true;
        elementMessage.style.display = "block";
        return;
    }

    var random = Math.random() * 100.0;
    
    if(random >= 0.0 && random <= tier.S.rate) {
        var randomItem = Math.floor(Math.random() * tierItems.S.length);

        while(tierSAcquired[randomItem] == true)
        {
            randomItem = Math.floor(Math.random() * tierItems.S.length);
        }

        tierSAcquired[randomItem] = true;

        document.getElementById("tierS_li_" + randomItem).classList.add("text-gray");

        var elementCounter = document.getElementById("tierS_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }
    else if(random > tier.S.rate && random <= tier.A.rate) {
        var randomItem = Math.floor(Math.random() * tierItems.A.length);

        var elementCounter = document.getElementById("tierA_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }
    else if(random > tier.A.rate && random <= tier.B.rate) {
        var randomItem = Math.floor(Math.random() * tierItems.B.length);

        var elementCounter = document.getElementById("tierB_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }
    else if(random > tier.B.rate && random <= tier.C.rate) {
        var randomItem = Math.floor(Math.random() * tierItems.C.length);

        var elementCounter = document.getElementById("tierC_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }

    var tryCounter = parseInt(elementTryCounter.innerHTML);
    ++tryCounter;
    elementTryCounter.innerHTML = tryCounter;

    var silverSpent = tryCounter * 100000;
    elementSilverSpent.innerHTML = silverSpent;
}

function calculateMultiple(value = 1) {
    if(eventEnded){
        return
    }

    calculate();

    if(value < tryNumber) {
        setTimeout(calculateMultiple.bind(null, ++value), 10);
    } 
}

function initialize()
{
    populate();

    elementMessage.style.display = "none";
    elementRateS.innerHTML = tier.S.rate / 100;
    elementRateA.innerHTML = tier.A.rate / 100;
    elementRateB.innerHTML = tier.B.rate / 100;
    elementRateC.innerHTML = tier.C.rate / 100;

    elementTryNumber.value = tryNumber;

    elementTryNumber.addEventListener("change", function() {
        tryNumber = document.getElementById("tryNumber").value;
    });

    elementTryButton.addEventListener("click", function() {
        calculateMultiple();
    });
}

initialize();