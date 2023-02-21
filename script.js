const button = document.querySelector('button')
const select = document.getElementById('currency-select')
const dolar = 5.17
const euro = 5.52
const bitcoin = 0.0000078

const convertValues = () => {
    const inputReais = document.getElementById('input-real').value
    const realValue = document.getElementById('real-value')
    const currencyValue = document.getElementById('currency-value')

    realValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inputReais)


    if (select.value === 'US$ Dólar Americano') {
        currencyValue.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(inputReais / dolar)
    }

    if (select.value === '€ Euro') {
        currencyValue.innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(inputReais / euro)
    }

    if (select.value === 'BTC Bitcoin') {
        currencyValue.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'BTC' }).format(inputReais * bitcoin)
    }
}

const currencyChange = () => {
    const currencyName = document.getElementById('currency-name')
    const currencyImg = document.getElementById('currency-img')

    if (select.value === 'US$ Dólar Americano') {
        currencyImg.src = 'assets/usa.png'
        currencyName.innerHTML = 'US$ Dólar Americano'
    }
    if (select.value === '€ Euro') {
        currencyImg.src = "assets/euro.png"
        currencyName.innerHTML = '€ Euro'
    }
    if (select.value === 'BTC Bitcoin') {
        currencyImg.src = "assets/bitcoin.png"
        currencyName.innerHTML = 'BTC Bitcoin'
    }

    convertValues()
}

button.addEventListener('click', convertValues)
select.addEventListener('change', currencyChange)
