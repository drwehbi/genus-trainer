/* script.js */
async function loadWord() {
    const res = await fetch('/random-word');
    const word = await res.json();
    window.currentWord = word;
    document.getElementById('word').textContent = word.word;
    document.getElementById('result').textContent = '';
}

function guess(genus) {
    if (genus === window.currentWord.genus) {
        document.getElementById('result').textContent = 'Richtig!';
    } else {
        document.getElementById('result').textContent = 'Falsch! Richtige Antwort: ' + window.currentWord.genus;
    }
    loadWord();
}

window.onload = loadWord;
