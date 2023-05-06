let names = new Names();

window.addEventListener('load', function() {
    const titleDiv = this.document.querySelector('#title');
    const populationDiv = this.document.querySelector('#population');
    const nextGenButton = this.document.querySelector('#nextgen');
    const runButton = this.document.querySelector('#run');
    const restartButton = this.document.querySelector('#restart');
    const speedSlider = this.document.querySelector('#speed');
    const stepButton = this.document.querySelector('#step');
    const populationSizeInput = this.document.querySelector('#populationSize');
    const mutationRateInput = this.document.querySelector('#mutationRate');
    const elitismInput = this.document.querySelector('#elitism');
    const targetInput = this.document.querySelector('#target');
    const initialInput = this.document.querySelector('#initial');

    function updatePopulation() {
        titleDiv.innerHTML = `Generation ${names.generation} - ${names.currentStep}`;
        for(var i = 0; i < PARAMETERS.populationSize; i++) {
            let name = names.population[i];
            populationDiv.children[i].innerHTML = name ? names.population[i].name + ":" + names.population[i].fitness : "";
            populationDiv.children[i].className =  i < PARAMETERS.elitism ? "elite" : ""; 
            populationDiv.children[i].className +=  name?.mother ? " mother" : ""; 
            populationDiv.children[i].className +=  name?.father ? " father" : ""; 
            populationDiv.children[i].className +=  name?.offspring ? " offspring" : ""; 
        }
    }

    function step() {
        names.step();
        updatePopulation();
    }

    function loop() {
        step();
        if(names.population[0].fitness !== 0) setTimeout(loop,1000 - speedSlider.value);
    }

    stepButton.addEventListener('click', step);

    nextGenButton.addEventListener('click', () => {
        names.nextGeneration();
        updatePopulation();
    });

    runButton.addEventListener('click', () => {
        loop();      
    });

    restartButton.addEventListener('click', () => {
        PARAMETERS.mutationRate = parseFloat(mutationRateInput.value);
        PARAMETERS.populationSize = parseInt(populationSizeInput.value);
        PARAMETERS.elitism = parseInt(elitismInput.value);
        PARAMETERS.targetName = targetInput.value;
        PARAMETERS.initialName = initialInput.value;
        names = new Names();
        updatePopulation();    
    });

    populationDiv.innerHTML = "";
    for(var i = 0; i < PARAMETERS.populationSize; i++) {
        populationDiv.appendChild(this.document.createElement('div'));
    }

    updatePopulation();
});
  
