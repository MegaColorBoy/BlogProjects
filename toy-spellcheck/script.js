/*
	Author: Abdush Shakoor
	Toy spellchecker implemented in Javascript
*/

const letters = "abcdefghijklmnopqrstuvwxyz";

//Inserts
function inserts(word)
{
	word = word.toLowerCase().split('');
	var results = [];

	for(var i=0; i<word.length+1; i++)
	{
		for(var j=0; j<letters.length; j++)
		{
			var newWord = word.slice();
			newWord.splice(i, 0, letters[j]);
			results.push(newWord.join(''));
		}
	}

	return results;
}

//Transposes
function transposes(word)
{
	word = word.toLowerCase().split('');
	var results = [];

	for(var i=0; i<word.length-1; i++)
	{
		var newWord = word.slice();
		var r = newWord.splice(i,1);
		newWord.splice(i+1, 0, r[0]);
		results.push(newWord.join(''));
	}

	return results;
}

//Replaces
function replaces(word)
{
	word = word.toLowerCase().split('');
	var results = [];

	for(var i=0; i<word.length; i++)
	{
		for(var j=0; j<letters.length; j++)
		{
			var newWord = word.slice();
			newWord[i] = letters[j];
			results.push(newWord.join(''));
		}
	}

	return results;
}

Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}

//Deletes
function deletes(word)
{
	word = word.toLowerCase().split('');
	var results = [];

	for(var i=0; i<word.length; i++)
	{
		var newWord = word.slice();
		newWord.splice(i,1);
		results.push(newWord.join(''));
	}

	return results;
}

//Edit 1
function edits1(word){
	var results = [];
	var a = inserts(word);
	var b = deletes(word);
	var c = transposes(word);
	var d = replaces(word);
	results = (a + b + c + d).split(',');
	return results.unique();
}

function known_words(words)
{
	var results = [];
	for(var i=0; i<words.length; i++)
	{

	}
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
                // return allText;
            }
        }
    }
    rawFile.send(null);
}

function getWordCounts(text) {
	// console.log(text);
	var wordsArray = text.split(' ').toLowerCase().match(/[a-z]+/g);
	var resultObj = {};
	for(var i = 0; i < wordsArray.length; i++)
	{
		if(resultObj.hasOwnProperty(wordsArray[i]))
		{
		  resultObj[wordsArray[i]]++;
		} 
		else 
		{
		  resultObj[wordsArray[i]] = 1;
		}
	}
	return resultObj;
}

function test(){
	var readFile = readTextFile("/static/projects/toy-spellcheck/big.txt");
	getWordCounts(readFile);
}