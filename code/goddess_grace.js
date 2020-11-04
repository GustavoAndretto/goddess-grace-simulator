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

var elementTierS = document.getElementById("tierS");
var elementTierA = document.getElementById("tierA");
var elementTierB = document.getElementById("tierB");
var elementTierC = document.getElementById("tierC");
var elementTryCounter = document.getElementById("tryCounter");
var elementSilverSpent = document.getElementById("silverSpent");

var tryNumber = 0;

function populate()
{
    // TIER S
    for(var i = 0; i < tierItems.S.length; i++)
    {
        var li = document.createElement("li");
        li.innerHTML = tierItems.S[i];

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
    var random = Math.random() * 100.0;
    
    if(random >= 0.0 && random <= tier.S.rate) {
        // Se random > 0.0 && random <= 0.02 : Tier S
        var randomItem = Math.floor(Math.random() * tierItems.S.length);

        var elementCounter = document.getElementById("tierS_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }
    else if(random > tier.S.rate && random <= tier.A.rate) {
        // Se random > 0.02 && random <= 0.2 : Tier A
        var randomItem = Math.floor(Math.random() * tierItems.A.length);

        var elementCounter = document.getElementById("tierA_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }
    else if(random > tier.A.rate && random <= tier.B.rate) {
        // Se random > 0.2 && random <= 2 : Tier B
        var randomItem = Math.floor(Math.random() * tierItems.B.length);

        var elementCounter = document.getElementById("tierB_" + randomItem);
        var counter = elementCounter.innerHTML;
        var number = ++counter;

        elementCounter.innerHTML = number;
    }
    else if(random > tier.B.rate && random <= tier.C.rate) {
        // Se random > 2 && random <= 100 : Tier C
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
    calculate();

    if(value < tryNumber) {
        setTimeout(calculateMultiple.bind(null, ++value), 10);
    } 
}

function initialize()
{
    populate();

    document.getElementById("rateS").innerHTML = tier.S.rate / 100;
    document.getElementById("rateA").innerHTML = tier.A.rate / 100;
    document.getElementById("rateB").innerHTML = tier.B.rate / 100;
    document.getElementById("rateC").innerHTML = tier.C.rate / 100;

    tryNumber = 1;
    document.getElementById("tryNumber").value = tryNumber;

    document.getElementById("tryNumber").addEventListener("change", function() {
        tryNumber = document.getElementById("tryNumber").value;
    });

    document.getElementById("tryButton").addEventListener("click", function() {
        calculateMultiple();
    });
}

initialize();