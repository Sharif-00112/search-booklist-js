// loading message/spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
} 
// clearing history while loading message/spinner is on
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

//searching book from link based on input data
const searchBook = () => {
    //reading search text from input field
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //display spinner and hide previous result and previous error while loading
    toggleSpinner('block');
    toggleSearchResult('none');
    document.getElementById('error-message').style.display = 'none';

    //clearing previous search word
    searchField.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    // fetch `https://openlibrary.org/search.json?q=javascript`
    .then (res => res.json())
    .then(data => displaySearchResult(data.docs))
    //here, docs is an array of objects
    .catch(error => displayError(error));
}

//display error message
const displayError = error =>{
    document.getElementById('error-message').style.display = 'block';
    toggleSpinner('none');
}

//display search result
const displaySearchResult = (docs) =>{
    console.log(docs);
    const searchResult = document.getElementById('search-result');
    //clear previous search
    searchResult.textContent = '';
    document.getElementById('error-message').style.display = 'none';

    docs.forEach(doc => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick =" " class="card h-100">

            <div class="card-body">
                <h5 class="card-title">Title: ${doc.title}</h5>
                <p class="card-text">Author: ${doc.author_name}</p>
                <p class="card-text">First Published: ${doc.first_publish_year}</p>
            </div>
        </div>
        `
        searchResult.appendChild(div);
    });
    //hide spinner and view result while loaded
    toggleSpinner('none');
    toggleSearchResult('block');
}


