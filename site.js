var appForm = document.querySelector("#app form");
var btnLimpar = document.getElementById("btn-limpar");

appForm.onsubmit = json2csv;
btnLimpar.onclick = limparTexto;

function json2csv(e){
	e.preventDefault();

	var input_json = document.getElementById("input-json");
	var input_csv = document.getElementById("input-csv");
	input_csv.innerHTML = '';

	if(!validarJson(input_json.value)) return;

	var dados = JSON.parse(input_json.value);

	console.log(dados);
	console.log(JSON.stringify(dados[0]));

	var propriedades = [];
	var primeiraLinha = JSON.stringify(dados[0]).split(",");
	for(item of primeiraLinha){
		let nomes = item.split('"');
		propriedades.push(nomes[1]);
	}

	var prototipo_csv = [];
	prototipo_csv[0] = '';
	for(prop of propriedades){
		prototipo_csv[0] += '"' + prop + '",';
	}

	for(var i=0; i < dados.length; i++){
		prototipo_csv[i+1] = '';
		for(prop of propriedades){
			prototipo_csv[i+1] += '"' + dados[i][prop] + '",';
		}
	}

	var csv_result = '';
	for(item of prototipo_csv){
		csv_result += item + "\n";
	}
	input_csv.innerHTML = csv_result;
}

function validarJson(txt_json){
	if(txt_json.length === 0){
		alert("Por favor, insira um JSON.");
		return false;
	}

	try{
		var json_val = JSON.parse(txt_json);
	}
	catch(e){
		alert("O JSON inserido é inválido!");
		return false;
	}
	return true;
}

function limparTexto(){
	document.getElementById("input-json").value = '';
	document.getElementById("input-csv").value = '';
	alert("Tudo limpo");
}
