const lang = 'fr'
const form = document.querySelector("form")
const input = document.querySelector("input")
const resultsDisplay = document.querySelector('.result-display')
const errorMsg = document.querySelector(".error-msg")
const loader = document.querySelector(".loader")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    if (input.value === "") {
        return errorMsg.textContent = "Veuillez remplir l'input";
    } else {
        errorMsg.textContent = "";
        loader.getElementsByClassName.display = "flex";
        resultsDisplay.textContent = "";

        wikiApiCall(input.value)
    }
};

async function wikiApiCall(searchInput) {
    try {
        const response = await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`)

        if(!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        console.log(data);

        createCards(data.query.search)
    } catch (error) {
        errorMsg.textContent = `${error}`
        loader.getElementsByClassName.display = "none"
    }

}

function createCards(data) {
    if (!data.length) {
        errorMsg.textContent = "Aucun résultat"
    }

    data.forEach(el => {
        const url = `https://${lang}.wikipedia.org/?curid=${el.pageid}`
        const card = document.createElement('div');
        card.className = "result-item"
        card.innerHTML = `<h3 class= "result-title">
                            <a href="${url}" target="_blank">${el.title}</a>
                          </h3>
                          <a href="${url}" class="result-link" target="_blank">${url} </a>
                            <span class="result-snippet">${el.snippet}</span><br>
                          `
        resultsDisplay.appendChild(card)
    })
    loader.getElementsByClassName.display = "none"
}