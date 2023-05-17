const button = document.querySelector("button");
const select = document.getElementById("currency-select");

const convertValues = async () => {
	const inputReais = document.getElementById("input-real").value;
	const realValue = document.getElementById("real-value");
	const currencyValue = document.getElementById("currency-value");
	const formatedInputReais = parseFloat(inputReais.replace(/[^\d,-]/g, '').replace(',', '.'));

	const data = await fetch(
		"https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,CAD-BRL"
	).then((response) => response.json());

	const dolar = data.USDBRL.high;
	const euro = data.EURBRL.high;
	const bitcoin = data.BTCBRL.high;
	const dolarCanada = data.CADBRL.high;

	realValue.innerHTML = new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(formatedInputReais);

	if (select.value === "US$ Dólar Americano") {
		currencyValue.innerHTML = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(formatedInputReais / dolar);
	}

	if (select.value === "€ Euro") {
		currencyValue.innerHTML = new Intl.NumberFormat("de-DE", {
			style: "currency",
			currency: "EUR",
		}).format(formatedInputReais / euro);
	}

	if (select.value === "BTC Bitcoin") {
		currencyValue.innerHTML = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "BTC",
		}).format(formatedInputReais / bitcoin);
	}
	if (select.value === "C$ Dólar Canadense") {
		currencyValue.innerHTML = new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "CAD",
    		}).format(formatedInputReais / dolarCanada);
	}

	console.log(formatedInputReais);

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
	if (select.value === "C$ Dólar Canadense") {
		currencyImg.src = "assets/canada.png";
		currencyName.innerHTML = "C$ Dólar Canadense";
	}
	if (select.value === "MEX$ Peso Mexicano") {
		currencyImg.src = "assets/mexico.png";
		currencyName.innerHTML = "MEX$ Peso Mexicano";
	}

	convertValues();
};

button.addEventListener("click", convertValues);
select.addEventListener("change", currencyChange);

$("input[data-type='currency']").on({
    keyup: function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


function formatCurrency(input, blur) {
  var input_val = input.val();
  
  if (input_val === "") { return; }
  var original_len = input_val.length;

  var caret_pos = input.prop("selectionStart");
   
  if (input_val.indexOf(",") >= 0) {

    var decimal_pos = input_val.indexOf(".");

    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    left_side = formatNumber(left_side);

    right_side = formatNumber(right_side);
    
    if (blur === "blur") {
      right_side += "00";
    }
    
    right_side = right_side.substring(0, 2);

    input_val = "R$" + left_side + "." + right_side;

  } else {
    input_val = formatNumber(input_val);
    input_val = "R$ " + input_val;
    
    if (blur === "blur") {
      input_val += ",00";
    }
  }
  input.val(input_val);

  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}
