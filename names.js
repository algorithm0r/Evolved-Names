class Name {
    constructor(other) {
        this.name = other ? other.name : PARAMETERS.initialName;
        this.fitness = 0;
        this.computeFitness();
        this.mother = false;
        this.father = false;
        this.offspring = false;
    }

    resetState() {
        this.mother = false;
        this.father = false;
        this.offspring = false;      
    }

    computeFitness() {
        this.fitness = 0;
        for(var i = 0; i < this.name.length && i < PARAMETERS.targetName.length; i++) {
            if(this.name.charAt(i) !== PARAMETERS.targetName.charAt(i)) this.fitness++
        }
        this.fitness += 2*Math.abs(PARAMETERS.targetName.length - this.name.length);
    }

    // variation operators

    mutate() {
        if(Math.random() < PARAMETERS.mutationRate) {
            // add a new character
            const index = randomInt(this.name.length + 1);
            this.name = this.name.slice(0,index) + randomChar() + this.name.slice(index)
        }
        if(Math.random() < PARAMETERS.mutationRate && this.name.length > 1) {
              // delete a new character
              const index = randomInt(this.name.length); 
              this.name = this.name.slice(0,index) + this.name.slice(index + 1);
        }
        // replace a character at random
        for(var i = 0; i < this.name.length; i++) {
            if(Math.random() < PARAMETERS.mutationRate) {
                this.name = this.name.slice(0,i) + randomChar() + this.name.slice(i + 1)
            }
        }
        this.computeFitness();
    }

    crossover(other) {
        let returner = "";
        for(var i = 0; i < this.name.length || i < other.name.length; i++) {
            returner += randomInt(2) === 0 ? this.name.charAt(i) : other.name.charAt(i);
        }
        this.name = returner;
        
        this.computeFitness();
    }
}

class Names{
    constructor() {
        this.generation = 0;
        this.population = [];
        for(var i = 0; i < PARAMETERS.populationSize; i++) {
            this.population.push(new Name());
        }
        this.currentStep = "Delete Least Fit";
    };    

    step() {
        switch(this.currentStep) {
            case "Delete Least Fit":
                this.deleteLeastFit();
                break;
            case "Add New Offspring":
                this.addNewOffspring();
                break;
            case "Sort Population":
                this.sortPopulation();
                break;
        }
    };

    clearClasses() {
        for(var i = 0; i < this.population.length; i++) {
            this.population[i].resetState();
        }
    }

    sortPopulation() {
        this.clearClasses();
        this.generation++;
        this.population.sort((a,b) => a.fitness - b.fitness);
        this.currentStep = "Delete Least Fit";
    };

    deleteLeastFit() {
        this.population.splice(PARAMETERS.elitism, PARAMETERS.populationSize - PARAMETERS.elitism);
        this.currentStep = "Add New Offspring";
    };

    addNewOffspring() {
        this.clearClasses();
        let mother = this.population[randomInt(PARAMETERS.elitism)];
        mother.mother = true;
        let offspring = new Name(mother);
        if(Math.random() < 0.5) {
            let father = this.population[randomInt(PARAMETERS.elitism)];
            father.father = true;
            offspring.crossover(father);
        }
        offspring.mutate();
        offspring.offspring = true;
        this.population.push(offspring);
        if(this.population.length === PARAMETERS.populationSize) this.currentStep = "Sort Population";
    };

    nextGeneration() {
        switch(this.currentStep) {
            case "Delete Least Fit":
                this.deleteLeastFit();

                while(this.population.length < PARAMETERS.populationSize) {
                    this.addNewOffspring();
                }    
                this.sortPopulation();
                break;
            case "Add New Offspring":
                while(this.population.length < PARAMETERS.populationSize) {
                    this.addNewOffspring();
                }    
                this.sortPopulation();
                break;
            case "Sort Population":
                this.sortPopulation();
                break;
        }
    };
}