let words = [];

const newWordButton = document.getElementById('new-word-button');
const newWordFormContainer = document.getElementById('new-word-form-container');
const newWordForm = document.getElementById('new-word-form');
const wordsList = document.getElementById('words-list');
const searchForm = document.getElementById('search-form');

newWordButton.addEventListener('click', function() {
    newWordFormContainer.style.display = 'block';
});

newWordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const word = document.getElementById('new-word').value.trim();
    const definition = document.getElementById('new-definition').value.trim();
    if (word && definition) {
        words.push({ word, definition });
        newWordFormContainer.style.display = 'none';
        newWordForm.reset();
        displayWords();
    }
});

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchWord = document.getElementById('search-input').value.trim();
    if (searchWord) {
        const wordInDictionary = words.some(entry => entry.word === searchWord);
        alert(wordInDictionary 
            ? `The word "${searchWord}" can be found in the dictionary.` 
            : `The word "${searchWord}" is missing from the dictionary.`
        );
        document.getElementById('search-input').value = "";
    }
});

function displayWords() {
    wordsList.innerHTML = "";
    words.forEach((entry, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';

        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `<strong>${entry.word}</strong>: <span class="definition">${entry.definition}</span>`;

        const buttonDiv = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm';
        editButton.textContent = 'Edit';
        editButton.onclick = () => editWord(index);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteWord(index);

        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);

        wordItem.appendChild(wordDiv);
        wordItem.appendChild(buttonDiv);

        wordsList.appendChild(wordItem);
    });
}

function editWord(index) {
    const newWord = prompt("Edit word:", words[index].word);
    const newDefinition = prompt("Edit definition:", words[index].definition);
    if (newWord && newDefinition) {
        words[index] = { word: newWord.trim(), definition: newDefinition.trim() };
        displayWords();
    }
}

function deleteWord(index) {
    words.splice(index, 1);
    displayWords();
}
