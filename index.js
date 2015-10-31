additionGame = {
	gameNumbers: [0, 1, 2, 3, 4, 5],
	resultNumber: 0,
	newRangeArr: [],
	shownNumbers: [],
	inputNumbers: [],
	resultNumbers: [],
	correctCount: 0,
	errorCount: 0,
	boxIdArr: ["gameBoxOne", "gameBoxTwo", "gameBoxThree", "gameBoxFour"],
	textIdArr: ["errorTextOne", "errorTextTwo", "errorTextThree", "errorTextFour"],
	isOutOfRange: false,

	getRandomNumber: function(array) {
		var array = array;
		var randomNumber = array[Math.floor(Math.random() * array.length)];

		return randomNumber;
	},

	setInitialInputValues: function() {
		$(".gameInput").val(0);
	},

	changeRange: function() {
		this.newRangeArr = this.gameNumbers;
		maxRangeNumber = this.gameNumbers.length - 1;

		for (var i = 0; i < maxRangeNumber - this.resultNumber; i++) {
			this.newRangeArr.pop();
		};
		console.log(this.newRangeArr);
	},

	fillShownNumbers: function() {
		var newRangeArrLength = this.newRangeArr.length;
		var areEqual = false;

		var initialShownNumber = this.getRandomNumber(this.newRangeArr);
		this.shownNumbers.push(initialShownNumber);

		while(this.shownNumbers.length < 4) {

			if (this.newRangeArr.length < 4) {
				var emptySpaces = 3;

				for (var k = 1; k < emptySpaces; k++) {
					shownNumber = this.getRandomNumber(this.newRangeArr);
					this.shownNumbers.push(shownNumber);
				};

			} else {
				shownNumber = this.getRandomNumber(this.newRangeArr);
				for (var j = 0; j < this.shownNumbers.length; j++) {
					if (shownNumber === this.shownNumbers[j]) {
						areEqual = true;
					};
				};

				if (areEqual === false) {
					this.shownNumbers.push(shownNumber);
				};
				areEqual = false;
			};
		}
		console.log("shownNumbers " + this.shownNumbers);
	},

	getInputValues: function() {
		this.inputNumbers.push(parseInt($("#inputNumberOne").val(),10));
		this.inputNumbers.push(parseInt($("#inputNumberTwo").val(),10));
		this.inputNumbers.push(parseInt($("#inputNumberThree").val(),10));
		this.inputNumbers.push(parseInt($("#inputNumberFour").val(),10));
	},

	addValues: function () {
		for (var i = 0; i < this.inputNumbers.length; i++) {
			var result = this.shownNumbers[i] + this.inputNumbers[i];
			this.resultNumbers.push(result);
		};

		console.log(this.resultNumbers);
	},

	checkResults: function() {

		for (var i = 0; i < this.resultNumbers.length; i++) {
			if (this.resultNumber === this.resultNumbers[i]) {
				this.correctCount++;
				$("#" + this.boxIdArr[i]).removeClass("errorBox");
				$("#" + this.boxIdArr[i]).addClass("correctBox");
			} else {
				this.errorCount++;
				$("#" + this.boxIdArr[i]).removeClass("correctBox");
				$("#" + this.boxIdArr[i]).addClass("errorBox");
			};
		};
	},

	checkRange: function() {
		for (var i = 0; i < this.inputNumbers.length; i++) {
			if (this.inputNumbers[i] > 5 || this.inputNumbers[i] < 0) {
				$("#" + this.textIdArr[i]).css("display", "block");
				$("#" + this.textIdArr[i]).addClass("errorBox");
				this.isOutOfRange = true;
			} else {
				$("#" + this.textIdArr[i]).css("display", "none");
				$("#" + this.textIdArr[i]).removeClass("errorBox");
			};
		};
	},


	endGameCodition: function() {
		if (this.errorCount > 2 && this.isOutOfRange === false) {
			$("#inputNumberOne").val(parseInt(this.resultNumber - this.shownNumbers[0], 10));
			$("#inputNumberTwo").val(parseInt(this.resultNumber - this.shownNumbers[1], 10));
			$("#inputNumberThree").val(parseInt(this.resultNumber - this.shownNumbers[2], 10));
			$("#inputNumberFour").val(parseInt(this.resultNumber - this.shownNumbers[3], 10));

			setTimeout(function () { 
      			location.reload();
    		}, 2000);
		} else if (this.correctCount === 4 && this.isOutOfRange === false) {
			location.reload();
		} else {
			this.clearCounters();
			this.isOutOfRange = false;
		};
	},

	clearCounters: function() {
		this.correctCount = 0;
		this.errorCount = 0;
		this.resultNumbers = [];
		this.inputNumbers = [];
	},

	gameStart: function() {
		var that = this;
		this.setInitialInputValues();
		this.resultNumber = this.getRandomNumber(this.gameNumbers);
		console.log(this.resultNumber);
		this.changeRange();
		this.fillShownNumbers();
		var resultNumber = this.resultNumber;
		var shownNumbers = this.shownNumbers;

		$("#gameResult").append(resultNumber);
		$("#shownNumberOne").append(shownNumbers[0] + " +  ");
		$("#shownNumberTwo").append(shownNumbers[1] + " +  ");
		$("#shownNumberThree").append(shownNumbers[2] + " +  ");
		$("#shownNumberFour").append(shownNumbers[3] + " +  ");

		$("#gameButton").on("click", function(){
			that.getInputValues();
			that.addValues();
			that.checkResults();
			that.checkRange();
			that.endGameCodition();
			console.log(that.errorCount);
			console.log(that.correctCount);
		});

		$("div span:first-child").on("click", function() {
			var currentValue = parseInt($(this).next("input").val(), 10);

			$(this).next("input").val(currentValue + 1);
		});

		$("div span:last-child").on("click", function() {
			var currentValue = parseInt($(this).prev("input").val(), 10);

			$(this).prev("input").val(currentValue - 1);
		});
	}
}

$('document').ready(function(){
	additionGame.gameStart();
});