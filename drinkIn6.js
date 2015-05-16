function DrinkIn6() {
    this.total = 4200;
    this.points = 66;
    this.inputs = [];

    this.input = null;
    this.button = null;
    this.tbody = null;
    this.init = init;
    this.addPointsClick = addPointsClick;
    this.addPoints = addPoints;
    this.draw = draw;
}

function init(document) {
    this.input = document.getElementById("input");
    this.button = document.getElementById("add");
    this.button.addEventListener("click", function (that) {
        return function () {
            that.addPoints(Number(that.input.value));
            that.draw();
        };
    }(this));
    this.totalInput = document.getElementById("total");
    this.totalInput.addEventListener("change", function (that) {
        return function () {
            that.total = Number(that.totalInput.value);
            that.draw();
        };
    }(this));
    this.pointsInput = document.getElementById("points");
    this.pointsInput.addEventListener("change", function (that) {
        return function () {
            that.points = Number(that.pointsInput.value);
            that.draw();
        };
    }(this));
    this.tbody = document.getElementsByTagName("tbody")[0];
}

function addPointsClick() {
}


function addPoints(points) {
    this.inputs.push({
        "difference": points
    });
}

function draw() {
    this.tbody.innerHTML = "";
    var total = 0;
    for(var i in this.inputs){
        var input = this.inputs[i];
        var inputE = document.createElement("tr");
        var inputDifferenceE = document.createElement("td");
        inputDifferenceE.innerHTML = input.difference;
        total+=input.difference;
        var inputQuantityE = document.createElement("td");
        inputQuantityE.innerHTML = input.difference * Math.round(this.total / this.points);
        var inputValorE = document.createElement("td");
        inputValorE.innerHTML = total;
        inputE.appendChild(inputValorE);
        inputE.appendChild(inputDifferenceE);
        inputE.appendChild(inputQuantityE);
        this.tbody.appendChild(inputE);
    }
}