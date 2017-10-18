
var inventoryDictionary = {

	isGameStarted: false,

	isSameKeyPressed: false,

	didWin: false,

	didLoose: false,

	win: 0,

	loose: 0,

	placeholder: "",

	placeholderArray: [],

	selectedWordArray: [],

	alreadyGuessedKey: [],

	howManyCharLeft: 0,

	numberOfGuesses: 15,

	movie_Dic: ['avengers', 'batman', 'ironman', 'superman', 'avatar'],

	hangmanFunc: function() {
		inventoryDictionary.placeholder = ""
		inventoryDictionary.placeholderArray = []
		inventoryDictionary.selectedWordArray = []
		inventoryDictionary.howManyCharLeft = 0
		inventoryDictionary.alreadyGuessedKey = []
		inventoryDictionary.numberOfGuesses = 15

		var randomNumber = Math.floor((Math.random() * inventoryDictionary.movie_Dic.length) + 1)
		var randomPickedWord = inventoryDictionary.movie_Dic[randomNumber-1]


		console.log(randomPickedWord)

		inventoryDictionary.howManyCharLeft = randomPickedWord.length

		for(var i = 0; i < randomPickedWord.length; i++){
			inventoryDictionary.placeholder += '_ '
			if (i == randomPickedWord.length-1){
				inventoryDictionary.placeholderArray.push('_')
			} else {
				inventoryDictionary.placeholderArray.push('_')
				inventoryDictionary.placeholderArray.push(' ')
			}

			inventoryDictionary.selectedWordArray.push(randomPickedWord.charAt(i))
		}
		document.getElementById("guess").innerHTML = inventoryDictionary.numberOfGuesses
		document.getElementById("hangman").innerHTML = inventoryDictionary.placeholder
		document.getElementById("guessedWord").innerHTML = "_"

	}

}


document.onkeyup = function (event) {
	var keyPressed = event.key
	
	//This is for the first time key pressed
	if (inventoryDictionary.isGameStarted === false){
		inventoryDictionary.isGameStarted = true
		
		inventoryDictionary.hangmanFunc()

		document.getElementById("keyToStart").innerHTML = "Enjoy The Game!"
		
	} else {



		if (inventoryDictionary.alreadyGuessedKey.length > 0){

			for(var i = 0; i < inventoryDictionary.alreadyGuessedKey.length; i++){
				if (keyPressed === inventoryDictionary.alreadyGuessedKey[i]){
					inventoryDictionary.isSameKeyPressed = true
					break
				}
			}

			if (inventoryDictionary.isSameKeyPressed) {
				console.log("You pressed same key")
				inventoryDictionary.isSameKeyPressed = false


			} else {

				
				for(var i = 0; i < inventoryDictionary.selectedWordArray.length; i++){
					if(keyPressed === inventoryDictionary.selectedWordArray[i]){
						inventoryDictionary.howManyCharLeft -= 1
						inventoryDictionary.placeholderArray[i*2] = keyPressed
					}
				}
				if (inventoryDictionary.numberOfGuesses > 0){
					inventoryDictionary.numberOfGuesses -= 1
				}
				
				inventoryDictionary.alreadyGuessedKey.push(keyPressed)
				document.getElementById("hangman").innerHTML = inventoryDictionary.placeholderArray.join("")
				document.getElementById("guessedWord").innerHTML = inventoryDictionary.alreadyGuessedKey
				document.getElementById("guess").innerHTML = inventoryDictionary.numberOfGuesses
				

			}
			
			if ((inventoryDictionary.howManyCharLeft === 0)&&(inventoryDictionary.numberOfGuesses >= 0)){
				inventoryDictionary.win += 1
				document.getElementById("wins").innerHTML = inventoryDictionary.win
				//alert("You have succeed!:)")
				inventoryDictionary.didWin = true
			} else if ((inventoryDictionary.howManyCharLeft > 0)&&(inventoryDictionary.numberOfGuesses <= 0)){
				inventoryDictionary.loose += 1
				document.getElementById("looses").innerHTML = inventoryDictionary.loose
				inventoryDictionary.didLoose = true
				//alert("You have failed!:/")
				//inventoryDictionary.hangmanFunc()
			}

			$(document).ready(function(){
				if (inventoryDictionary.didWin === true){
					inventoryDictionary.didWin = false
					alert("You have succeed!:)")
					inventoryDictionary.hangmanFunc()
				} else if (inventoryDictionary.didLoose === true){
					inventoryDictionary.didLoose = false
					alert("You have failed!:/")
					inventoryDictionary.hangmanFunc()
				}

			})
			

		} else {

			//This is for the first time key pressed after game starts
			inventoryDictionary.numberOfGuesses -= 1
			inventoryDictionary.alreadyGuessedKey.push(keyPressed)

			for(var i = 0; i < inventoryDictionary.selectedWordArray.length; i++){
				if(keyPressed === inventoryDictionary.selectedWordArray[i]){
					inventoryDictionary.howManyCharLeft -= 1
					inventoryDictionary.placeholderArray[i*2] = keyPressed
				}
			}

			console.log(inventoryDictionary.placeholderArray)
			document.getElementById("guess").innerHTML = inventoryDictionary.numberOfGuesses
			document.getElementById("hangman").innerHTML = inventoryDictionary.placeholderArray.join("")
			document.getElementById("guessedWord").innerHTML = inventoryDictionary.alreadyGuessedKey

			

		}
	}
}




