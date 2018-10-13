window.onload = function () {
    var word = document.getElementById("word");
    var wins = document.getElementById("wins");
    var guessesLeftText = document.getElementById("guessesLeft-text");
    var guessesSoFar = document.getElementById("gueesesSoFar-text");
    var stream = document.getElementById("stream");

    var wordGuessGame = {
        streamers: ["ninja", "sodapoppin", "shroud", "nickmercs", "timthetatman", "asmongold", "lirik", "reckful", "nmplol", "nadeshot"],
        wins: 0,
        guessesLeft: 12,
        lettersGussed: [],
        guessesSoFarText: [],
        randomSteamer: this.getRandomStreamer,
        getRandomStreamer: function () {
            this.randomSteamer = this.streamers[Math.floor(Math.random() * this.streamers.length)];
        },
        setupWord: function () {
            for (var i = 0; i < this.randomSteamer.length; i++) {
                this.lettersGussed.push("_ ");
            }
        },
        checkGuess: function (guess) {
            var isMatch = false;
            for (var i = 0; i < this.randomSteamer.length; i++) {
                if (guess === this.randomSteamer[i]) {
                    this.lettersGussed[i] = this.randomSteamer[i];
                    isMatch = true;
                }
            }
            return isMatch;
        },
        alreadyGuessed: function (guess) {
            if (this.guessesSoFarText.length === "") {
                return false;

            }
            else {
                for (var i = 0; i < this.guessesSoFarText.length; i++) {
                    if (guess === this.guessesSoFarText[i]) {
                        return true;
                    }
                }
            }
            return false;
        },
        isComplete: function (guess) {
            var combined = this.lettersGussed.join("");
            if (combined.replace("_ ", guess) === this.randomSteamer) {
                return true;
            }
            else {
                return false;
            }
        },
        reset: function () {
            word.textContent = wordGuessGame.lettersGussed.join("");
            this.lettersGussed = [];
            this.getRandomStreamer();
            this.guessesLeftText = [];
            this.setupWord();
            this.guessesSoFarText = [];
            guessesSoFar.textContent = wordGuessGame.guessesSoFarText;
            this.guessesLeft = 12;
            guessesLeftText.textContent = wordGuessGame.guessesLeft;
        },
        updateWins: function () {
            this.wins++;
        },
        updateGuessesLeft: function () {
            wordGuessGame.guessesLeft--;
        },
        setStream: function () {
            stream.setAttribute("src", "https://player.twitch.tv/?channel=" + wordGuessGame.randomSteamer + "&muted=true");
        }

    };
    wins.textContent = wordGuessGame.wins;
    guessesLeftText.textContent = wordGuessGame.guessesLeft;
    guessesSoFar.textContent = wordGuessGame.guessesSoFarText;

    wordGuessGame.getRandomStreamer();
    wordGuessGame.setupWord();
    word.textContent = wordGuessGame.lettersGussed.join("");

    document.onkeyup = function (event) {

        var userGuess = event.key.toLowerCase();
        var validGuess = /^[a-zA-Z]$/.test(userGuess);
        var guessedWord = wordGuessGame.lettersGussed.join("");
        var isComplete = wordGuessGame.isComplete(userGuess);
        var alreadyGuessed = wordGuessGame.alreadyGuessed(userGuess);


        if (validGuess) {
            if (!alreadyGuessed) {
                wordGuessGame.guessesSoFarText.push(userGuess);
                guessesSoFar.textContent = wordGuessGame.guessesSoFarText;

                if (isComplete) {
                    wordGuessGame.updateWins();
                    wordGuessGame.checkGuess(userGuess);
                    wins.textContent = wordGuessGame.wins++;
                    wordGuessGame.setStream();
                    wordGuessGame.reset();

                }
                else if (wordGuessGame.guessesLeft > 0 && guessedWord !== wordGuessGame.randomSteamer) {
                    if (!wordGuessGame.checkGuess(userGuess)) {
                        wordGuessGame.updateGuessesLeft();
                        guessesLeftText.textContent = wordGuessGame.guessesLeft;
                    }
                    if (wordGuessGame.guessesLeft === 0) {
                        wordGuessGame.reset();
                    }
                }
                word.textContent = wordGuessGame.lettersGussed.join("");
            }
        }
    }
}

