const button = document.querySelector("button");
const select = document.getElementById("currency-select");

const convertValues = async () => {
	const inputReais = document.getElementById("input-real").value;
	const realValue = document.getElementById("real-value");
	const currencyValue = document.getElementById("currency-value");

	const data = await fetch(
		"https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL,MXN-BRL"
	).then((response) => response.json());

	const dolar = data.USDBRL.high;
	const euro = data.EURBRL.high;
	const bitcoin = data.BTCBRL.high;
	const dolarCanada = data.CADBRL.high;
	const peso = data.MNXBRL.high;

	realValue.innerHTML = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(inputReais);

	if (select.value === "US$ Dólar Americano") {
		currencyValue.innerHTML = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(inputReais / dolar);
	}

	if (select.value === "€ Euro") {
		currencyValue.innerHTML = new Intl.NumberFormat("de-DE", {
			style: "currency",
			currency: "EUR",
		}).format(inputReais / euro);
	}

	if (select.value === "BTC Bitcoin") {
		currencyValue.innerHTML = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "BTC",
		}).format(inputReais / bitcoin);
	}
};

const currencyChange = () => {
	const currencyName = document.getElementById("currency-name");
	const currencyImg = document.getElementById("currency-img");

	if (select.value === "US$ Dólar Americano") {
		currencyImg.src = "assets/usa.png";
		currencyName.innerHTML = "US$ Dólar Americano";
	}
	if (select.value === "€ Euro") {
		currencyImg.src = "assets/euro.png";
		currencyName.innerHTML = "€ Euro";
	}
	if (select.value === "BTC Bitcoin") {
		currencyImg.src = "assets/bitcoin.png";
		currencyName.innerHTML = "BTC Bitcoin";
	}

	convertValues();
};

button.addEventListener("click", convertValues);
select.addEventListener("change", currencyChange);
