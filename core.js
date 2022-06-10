let LANG

render("eng")
copyContact()

document.querySelectorAll(".lang").forEach(button => {
    button.addEventListener("click", () => {
        render(button.id)
    })
})

async function getLang(lang) {
    LANG = lang
    const fetchedData = await fetch(`./data/${lang}.json`)
    const data = await fetchedData.json()
    return data
}

async function render(lang) {
    langData = await getLang(lang)
    changeLocalization(langData)
    document.querySelector(".menu-list").innerHTML = ""
    langData.cards.forEach(card => {
        renderCard(card, langData)
    })
}

function renderCard(card, langData) {
    const cardBox = document.createElement("div")
    cardBox.className = "menu-card"
    cardBox.innerHTML = `
    <div class="card-image">
        <img src="./img/${card.image}" alt="${card.name}">
    </div>
    <div class="card-content">
        <div class="food-name">
            <p>${card.name}</p>
        </div>
        <div class="description">
            <p>${card.description}</p>
        </div>
        <div class="pricing">
            <div class="pricing-title">${langData.text.pricing}</div>
            <div class="pricing-list">
                ${createPrices(card)}
            </div>
        </div>
    </div>
    `

    document.querySelector(".menu-list").appendChild(cardBox)
}

function createPrices(card) {
    return card.prices.reduce((acc, item) => {
        return acc + `
        <div class="option">
            <div class="option-name">${item.item}</div>
            <div class="option-price">${item.price}</div>
        </div>
        `
    }, "")
}

function changeLocalization(langData) {
    document.querySelector(".contact-title").innerText = langData.text.contact
    document.querySelector(".menu h2").innerText = langData.text.menu
    document.querySelector(".additional-info p").innerText = langData.text.additional[0]
    document.querySelector(".additional-info p:nth-child(2)").innerText = langData.text.additional[1]
}

function copyContact() {
    document.querySelector(".contact-info").addEventListener("click", () => {
        const phone = document.querySelector(".phone").innerHTML
        navigator.clipboard.writeText(phone)
        copiedPhone(phone)
    })
}

function copiedPhone(phone) {
    let copied
    if(LANG === "eng") copied = "Copied!"
    if(LANG === "pl") copied = "Skopiowane!"
    if(LANG === "ua") copied = "Скопійовано!"
    document.querySelector(".phone").innerText = copied
    setTimeout(() => {
        document.querySelector(".phone").innerText = phone
    }, 1000)
}