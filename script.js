//Total value of top 10: 1344.4B
//Data gathered from https://www.forbes.com/real-time-billionaires/#7886ee5e3d78 on September 13, 2022 (8:40AM).

$("#subPage").hide()

let averageNet = 748800 //This is the average American net worth based on the Federal Reserve's 2019 Survey of Consumer Finances.

let currentBillionaire = null
let billionaireMax = 0
let currentCountBillionaire = 0
let currentCountAverage = 0
let speed = 10000
let counting = false

let billionaires = [{
    "_id": "0",
    "name": "Elon Musk",
    "rank": 1,
    "net": 273900000000,
    "plainText": "273.9B",
    "percentOfTotal": 0.2037,
    "age": 51,
    "image": "https://static.wixstatic.com/media/8b565e_631750d9e2c24ea4989ed903529892b3~mv2.jpg",
    "country": "United States",
    "source": ["Tesla", "SpaceX"]
},
{
    "_id": "1",
    "name": "Bernard Arnault",
    "rank": 2,
    "net": 162200000000,
    "plainText": "162.2B",
    "percentOfTotal": 0.1206,
    "age": 73,
    "image": "https://static.wixstatic.com/media/8b565e_cd0f9d433f504be08c6312fbcd1d08be~mv2.jpg",
    "country": "France",
    "source": ["LVMH"]
},
{
    "_id": "2",
    "name": "Jeff Bezos",
    "rank": 3,
    "net": 159800000000,
    "plainText": "159.8B",
    "percentOfTotal": 0.1189,
    "age": 58,
    "image": "https://static.wixstatic.com/media/8b565e_53edfd268b8941b3a1e6d4f5f07d2308~mv2.jpg",
    "country": "United States",
    "source": ["Amazon"]
},
{
    "_id": "3",
    "name": "Gautam Adani",
    "rank": 4,
    "net": 151400000000,
    "plainText": "151.4B",
    "percentOfTotal": 0.1126,
    "age": 60,
    "image": "https://static.wixstatic.com/media/8b565e_a94a2444266e46079522b0ade06cbc03~mv2.jpg",
    "country": "India",
    "source": ["Infrastructure", "Commodities"]
},
{
    "_id": "4",
    "name": "Bill Gates",
    "rank": 5,
    "net": 109100000000,
    "plainText": "109.1B",
    "percentOfTotal": 0.0812,
    "age": 66,
    "image": "https://static.wixstatic.com/media/8b565e_d00c99e8dc2c40fe8b537c94572da715~mv2.jpg",
    "country": "United States",
    "source": ["Microsoft"]
},
{
    "_id": "5",
    "name": "Larry Ellison",
    "rank": 6,
    "net": 105700000000,
    "plainText": "105.7B",
    "percentOfTotal": 0.0786,
    "age": 78,
    "image": "https://static.wixstatic.com/media/8b565e_bd329d2acd914ddba995e72dc7958019~mv2.jpg",
    "country": "United States",
    "source": ["Software"]
},
{
    "_id": "6",
    "name": "Warren Buffett",
    "rank": 7,
    "net": 100100000000,
    "plainText": "100.1B",
    "percentOfTotal": 0.0745,
    "age": 92,
    "image": "https://static.wixstatic.com/media/8b565e_8977d5db59124314a5eb0da954fb4b55~mv2.jpg",
    "country": "United States",
    "source": ["Berkshire Hathaway"]
},
{
    "_id": "7",
    "name": "Mukesh Ambani",
    "rank": 8,
    "net": 95800000000,
    "plainText": "95.8B",
    "percentOfTotal": 0.0713,
    "age": 65,
    "image": "https://static.wixstatic.com/media/8b565e_f97562cd31e547538e7c0340e046f9f6~mv2.jpg",
    "country": "India",
    "source": ["Diversified"]
},
{
    "_id": "8",
    "name": "Larry Page",
    "rank": 9,
    "net": 95200000000,
    "plainText": "95.2B",
    "percentOfTotal": 0.0708,
    "age": 49,
    "image": "https://static.wixstatic.com/media/8b565e_11efba28b5d442fa803685215e217cf6~mv2.jpg",
    "country": "United States",
    "source": ["Google"]
},
{
    "_id": "9",
    "name": "Sergey Brin",
    "rank": 10,
    "net": 91200000000,
    "plainText": "91.2B",
    "percentOfTotal": 0.0678,
    "age": 49,
    "image": "https://static.wixstatic.com/media/8b565e_701420195b3d474291444ce9ecb99c2e~mv2.jpg",
    "country": "United States",
    "source": ["Google"]
}
]

function setUp() {
    $("#titleContainer").append("<h1 id='title' class = 'header1'>The Billionaire Loader</h1>");
}

function loadBillionaire(index) {
    populateBillionaire(billionaires[index])
        .then((response) => {
            $("#initialPage").hide()
            $("#subPage").show()
            counting = true
            startBillionaireBar()
            startAverageBar()
        })
}

function populateBillionaire(data) {
    return new Promise((resolve, reject) => {
        currentBillionaire = data.name
        billionaireMax = data.net
        $('#goBack').text("Select a different billionaire")
        $("#mainImage").attr("src", data.image)
        $('#nameText').text(data.name + " ($" + data.plainText + ")")
        $('#averageText').text("vs the Average American ($748.8K)")
        $('#billionaireLoadingText').text("Loading " + currentBillionaire + " (~" + calculateTimeRemaining(0, billionaireMax) + ")")
        $('#averageLoadingText').text("Loading the Average American (~" + calculateTimeRemaining(0, averageNet) + ")")
        resolve(true)
    })
}

function startBillionaireBar() {
    currentCountBillionaire += speed
    let percent = currentCountBillionaire / billionaireMax * 100
    if (percent >= 100) {
        percent = 100
        $('#billionaireLoadingText').text(currentBillionaire + " Loaded!")
    } else {
        $('#billionaireLoadingText').text("Loading " + currentBillionaire + " (~" + calculateTimeRemaining(currentCountBillionaire, billionaireMax) + ")")
    }
    $("#billionaireBar").width(percent + "%")
    setTimeout(() => {
        if (percent < 100 && counting) {
            startBillionaireBar()
        }
    }, 1000)
}

function startAverageBar() {
    currentCountAverage += speed

    let percent = currentCountAverage / averageNet * 100
    if (percent >= 100) {
        percent = 100
        $('#averageLoadingText').text("Average American Loaded!")
        let numberOfAmericans = billionaireMax / averageNet
        $('#loadingFact').text("Fact: You can load " + Math.ceil(numberOfAmericans).toLocaleString("en-US") + " Average Americans in the time it takes to load one " + currentBillionaire + "!")
    } else {
        $('#averageLoadingText').text("Loading the Average American (~" + calculateTimeRemaining(currentCountAverage, averageNet) + ")")
    }

    $("#averageBar").width(percent + "%")
    setTimeout(() => {
        if (percent < 100 && counting) {
            startAverageBar()
        }
    }, 1000)
}

function calculateTimeRemaining(current, max) {
    let remaining = (max - current) / speed
    let unit
    let ending
    if (remaining >= 31556952) {
        remaining = Math.round(remaining / (3600 * 24 * 365))
        unit = "year"
    } else if (remaining >= 86400 && remaining < 86400 * 365) {
        remaining = Math.round(remaining / (3600 * 24))
        unit = "day"
    } else if (remaining >= 3600 && remaining < 86400) {
        remaining = Math.round(remaining / 3600)
        unit = "hour"
    } else if (remaining >= 60 && remaining < 3600) {
        remaining = Math.round(remaining / 60)
        unit = "minute"
    } else {
        unit = "second"
    }

    if (remaining === 1) {
        ending = ""
    } else {
        ending = "s"
    }

    return remaining + " " + unit + ending + " remaining"
}

$("img").click(function () {
    loadBillionaire($(this).attr("id"))
});

$("#goBack").click(function () {
    counting = false
    currentCountBillionaire = 0
    currentCountAverage = 0
    $("#subPage").hide()
    $("#initialPage").show()
})

window.onload = function () {
    setUp()
};

