module.exports = function (text, callback) {
    var words = parser(text);
    var counts = counter(words);
    console.log(words);
    console.log(counts);



}

var parser = function (text) {
    var seprators = [' ', '/', '.', ',', '?', '>', '<', '""', "''", ';', ':', '\\', ']', '[', '}', '{', '+', '=', '-', '_', ')', '(', '*', '&', '^', '%', '$', '#', '@', '!', '~', '`', '\n', '\t'];

    seprators.forEach(function (char) {
        text = text.replace(char, " ");
    })
    if (text.endsWith(" ")) { //so the last char is " " and should be removed
        text = text.slice(0, text.length - 1);
    }
    var words = [];
    while (text.lastIndexOf(" ") != -1) {
        //Handeling multiple " " (spaces)
        while (text.startsWith(" ")) {
            text = text.slice(text.indexOf(" ") + 1);
        }
        if (text.lastIndexOf(" ") != -1) {
            words.push(text.slice(0, text.indexOf(" ")));
            text = text.slice(text.indexOf(" ") + 1);
        }
    }
    words.push(text);
    return words;
}

var counter = function (words) {
    var results = [];
    words.forEach(function (word) {
        var found = false;
        results.every(function (result) {
            if (results.word == word) {
                found = true;
                results.count++;

            }
        })
        if (!found) {
            results.push({
                word: word,
                count: 1
            });
        }
    });
    return results;
}