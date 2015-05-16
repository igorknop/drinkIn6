function DrinkIn6() {
    this.total = 4200;
    this.points = 66;
    this.inputs = [];

    this.input = null;
    this.button = null;
    this.tbody = null;
    this.init = init;
    this.addPoints = addPoints;
    this.delPoints = delPoints;
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
    this.button2 = document.getElementById("del");
    this.button2.addEventListener("click", function (that) {
        return function () {
            that.delPoints();
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
    this.typeInput = document.getElementById("type");
    this.typeInput.addEventListener("change", function (that) {
        return function () {
            that.type = that.typeInput.value;
            if(that.type === "points-dec"){
                that.input.value = that.points;
            }else{
                that.input.value = 0;
            }
            that.draw();
        };
    }(this));
}



function addPoints(points) {
    this.inputs.unshift(points);
}

function delPoints() {
    this.inputs.pop();
}

function draw() {
    this.tbody.innerHTML = "";
    var total = 0;
    for (var i in this.inputs) {
        var input = this.inputs[i];
        var inputE = document.createElement("tr");
        var inputDifferenceE = document.createElement("td");
        var inputQuantityE = document.createElement("td");
        var inputValorE = document.createElement("td");
        if (this.type === "difference") {
            inputDifferenceE.innerHTML = input;
            inputQuantityE.innerHTML = Math.round(input * this.total / this.points)+" ml";
            inputValorE.innerHTML = total;
            total += input;
        } else if (this.type === "points"){
            var diff = input - total;
            total = input;
            inputDifferenceE.innerHTML = diff;
            inputQuantityE.innerHTML = Math.round(diff*this.total / this.points)+" ml";
            inputValorE.innerHTML = total;
        } else {
            var diff = this.points - input;
            total = input;
            inputDifferenceE.innerHTML = diff;
            inputQuantityE.innerHTML = Math.round(diff*this.total / this.points)+" ml";
            inputValorE.innerHTML = total;
        }
        inputE.appendChild(inputValorE);
        inputE.appendChild(inputDifferenceE);
        inputE.appendChild(inputQuantityE);
        this.tbody.appendChild(inputE);
    }
}