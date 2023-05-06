function randomInt(n) {
    return Math.floor(Math.random() * n);
}

function randomChar() {
    return PARAMETERS.legalChars[randomInt(PARAMETERS.legalChars.length)];
}

var PARAMETERS = {
    targetName: "CHRISTOPHER PAUL MARRIOTT",
    initialName: "",
    legalChars: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' '],
    // evolutionary parameters
    populationSize: 100,
    mutationRate: 0.05,
    elitism: 50
}