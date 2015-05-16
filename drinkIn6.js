function DrinkIn6() {
    this.total = 475*3;
    this.points = 66;
    this.type = "points-dec";
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
    this.totalInput.value = this.total;
    this.totalInput.addEventListener("change", function (that) {
        return function () {
            that.total = Number(that.totalInput.value);
            that.draw();
        };
    }(this));
    this.pointsInput = document.getElementById("points");
    this.pointsInput.value = this.points;
    this.pointsInput.addEventListener("change", function (that) {
        return function () {
            that.points = Number(that.pointsInput.value);
            that.draw();
        };
    }(this));
    this.input = document.getElementById("input");
    this.input.value = this.points;
    this.input.addEventListener("keypress", function (that) {
        return function (e) {
            if(e.keyCode === 13 ){
                that.addPoints(that.input.value);
                that.draw();
            }
        };
    }(this));
    this.tbody = document.getElementsByTagName("tbody")[0];
    this.typeInput = document.getElementById("type");
    this.typeInput.addEventListener("change", function (that) {
        return function () {
            that.type = that.typeInput.value;
            if (that.type === "points-dec") {
                that.input.value = that.points;
            } else {
                that.input.value = 0;
            }
            //that.inputs= [];
            that.draw();
        };
    }(this));
}



function addPoints(points) {
    var input = {};
    if (this.type === "difference") {
        input.difference = points;
        input.quantity = Math.round(input.difference * this.total / this.points) + " ml";
        this.inputs.unshift(input);
        this.inputs[this.inputs.length - 1].value = this.inputs[this.inputs.length - 1].difference;
        for (i = this.inputs.length - 2; i >= 0; i--) {
            this.inputs[i].value = this.inputs[i + 1].value + this.inputs[i].difference;
        }
    }
    else if (this.type === "points-asc") {
        input.value = points;
        this.inputs.unshift(input);
        for (i = this.inputs.length - 1; i >= 0; i--) {
            if (i === (this.inputs.length - 1)) {
                this.inputs[i].difference = 0;//this.inputs[i].value - 0;
            } else {
                this.inputs[i].difference = this.inputs[i].value - this.inputs[i + 1].value;
            }
            this.inputs[i].quantity = Math.round(this.inputs[i].difference * this.total / this.points) + " ml";
        }
    } else if (this.type === "points-dec"){
        input.value = points;
        this.inputs.unshift(input);
        for (i = this.inputs.length - 1; i >= 0; i--) {
            if (i === (this.inputs.length - 1)) {
                this.inputs[i].difference = this.points - this.inputs[i].value;
            } else {
                this.inputs[i].difference = this.inputs[i + 1].value - this.inputs[i].value;
            }
            this.inputs[i].quantity = Math.round(this.inputs[i].difference * this.total / this.points) + " ml";
        }
    }
}

function delPoints() {
    this.inputs.pop();
}

function draw() {
    this.tbody.innerHTML = "";
    for (var i in this.inputs) {
        var input = this.inputs[i];
        var inputE = document.createElement("tr");
        var inputDifferenceE = document.createElement("td");
        var inputQuantityE = document.createElement("td");
        var inputValorE = document.createElement("td");
        inputDifferenceE.innerHTML = input.difference;
        inputQuantityE.innerHTML = input.quantity;
        inputValorE.innerHTML = input.value;
        inputE.appendChild(inputValorE);
        inputE.appendChild(inputDifferenceE);
        inputE.appendChild(inputQuantityE);
        this.tbody.appendChild(inputE);
    }
}