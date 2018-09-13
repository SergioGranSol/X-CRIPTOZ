var matriz_texto = [];
var matriz_clave = [];
var matriz_cifrado = [];
var cancelado = false;
var velocidad = 1;

function sleepFeistel(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$.fn.scrollViewFeistel = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelFeistel(){
	$("#pnl-InteractivoFeistel").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function crearPanelCifradoFeistel(){
	for(var i = 0 ; i < 8 ; i++){
		$('#textoCifradoFeistel').append('<label class="circulo" id="FE-Ccell1'+i+'"><br></label>');
	}

	$("#table-Feistel1").css("text-align","center");
	$("#table-Feistel2").css("text-align","center");
	$("#table-Feistel3").css("text-align","center");
	$("#table-Feistel4").css("text-align","center");
}

function crearPanelDescifradoFeistel(){
	for(var i = 0 ; i < 8 ; i++){
		$('#textoDescifradoFeistel').append('<label class="circulo" id="FE-MCcell1'+i+'"></label>');
	}

	$("#table-Feistel21").css("text-align","center");
	$("#table-Feistel22").css("text-align","center");
	$("#table-Feistel23").css("text-align","center");
	$("#table-Feistel24").css("text-align","center");
}

function cerrarPanelFeistel(){
	cancelado = true;

	$("#pnl-InteractivoFeistel").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCifradoFeistel();
	limpiaPanelDescifradoFeistel();

	$("#btn-cifrarFeistel").show();
	$("#btn-velocidadCFeistel").show();
	$("#btn-cancelarCifrarFeistel").hide();

	$("#btn-descifrarFeistel").show();
	$("#btn-velocidadDFeistel").show();
	$("#btn-cancelarDescifrarFeistel").hide();

	$("#textoPlanoFeistel-error").remove();
	$("#in-textoPlanoFeistel").removeClass('input-error');
	$("#textoPlanoCifradoFeistel-error").remove();
	$("#in-textoPlanoCifradoFeistel").removeClass('input-error');
}

function limpiaPanelCifradoFeistel(){
	$("#table-Feistel1").empty();
	$("#table-Feistel2").empty();
	$("#table-Feistel3").empty();
	$("#table-Feistel4").empty();

	$("#textoCifradoFeistel").html("");
	$("#in-textoPlanoFeistel").val("");
	$("#out-textoCifradoFeistel").val("");
	$("#out-claveCifradoFeistel").val("");

	if($('#FEdiv1').is(':visible')) {
		$("#FEdiv1").slideToggle(500);
	}
}

function limpiaPanelDescifradoFeistel(){
	$("#table-Feistel21").empty();
	$("#table-Feistel22").empty();
	$("#table-Feistel23").empty();
	$("#table-Feistel24").empty();

	$("#textoDescifradoFeistel").html("");
	$("#in-textoPlanoCifradoFeistel").val("");
	$('#in-claveDescifradoFeistel').val("");
	$("#out-textoDescifradoFeistel").val("");

	if($('#FEdiv2').is(':visible')) {
		$("#FEdiv2").slideToggle(500);
	}
}

function limpiarTablasC(){
	$("#table-Feistel1").empty();
	$("#table-Feistel2").empty();
	$("#table-Feistel3").empty();
	$("#table-Feistel4").empty();
}

function limpiarTablasD(){
	$("#table-Feistel21").empty();
	$("#table-Feistel22").empty();
	$("#table-Feistel23").empty();
	$("#table-Feistel24").empty();
}

function binario(numero) {
  	for (var nFlag = 0, nShifted = numero, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  	
  	return sMask.substring(24);
}

async function cifrarFeistel(){
	var plano = ($("#in-textoPlanoFeistel").val()).split("");
	var texto_length = plano.length;
	var cadenaCifrado = "";
	var claves = ["abcd","bcde","cdef","defg","efgh","fghi","ghij","hijk","ijkl","jklm","klmn","lmno","mnop","nopq","opqr","pqrs"];
	var aux = new Array(4);
	var ronda = new Array(18);
	var bin = "";

	for(var i = 0 ; i < 18 ; i++){
		ronda[i] = new Array(8);
	}
	
	limpiaPanelCifradoFeistel();
	$("#in-textoPlanoFeistel").val(plano.join(""));

	for(var i = plano.length ; i < 8 ; ){
		plano[i] = "X";

		i = plano.length;
	}

	crearPanelCifradoFeistel();

	//Texto Plano
	$('#FEdiv1').html('Se necesitan <b>n</b> subclaves de 32 bits que pueden surgir de una clave dada (Para este ejemplo n = 16 y serán las siguientes).');
	$('#FEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(5000);
	
	if(cancelado){
		return;
	}

	$('#FEdiv1').scrollViewFeistel();
	
	for (var i = 0 ; i < 16 ; i++) {
		$("#table-Feistel1").append('<tr><td>K' + i + '</td></tr>');
		$("#table-Feistel2").append('<tr id="FE2row-' + i + '"></tr>');
		$("#table-Feistel3").append('<tr id="FE3row-' + i + '"></tr>');
		
		for(var j = 0 ; j < 4 ; j++){
			$("#FE2row-"+i).append('<td>' + claves[i][j] + '&nbsp;</td>');
			bin = binario(claves[i][j].charCodeAt());
			
			for(var k = 0 ; k < 8 ; k++){
				$('#FE3row-'+i).append('<td>' + bin[k] + '</td>');
			}
		}
	}

	if(cancelado){
		return;
	}

	await sleepFeistel(4000);

	if(cancelado){
		return;
	}

	for(var j = 0 ; j < 4 ; j++){
		ronda[0][j] = plano[j];
		ronda[0][j+4] = plano[j+4];
	}

	for(var i = 0 ; i < 1 && !cancelado ; i++){
		$('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		limpiarTablasC();

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		if(i == 0){
			$('#FEdiv1').html("Se divide el mensaje claro en 2 partes de 32 bits cada una (L0 y R0), si es necesario se completan con X.");
		}
		else{
			$('#FEdiv1').html("Repetimos los pasos ahora con L1, R1 y K1.");
		}

		$('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(4000);

		if(cancelado){
			return;
		}

		$('#table-Feistel1').append('<tr id="FErow1-0"><td>L'+i+'</td></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-0"></tr>');

		if(i == 0){
			putparpadeo('#FErow1-0', 4*velocidad, azul);
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			$('#FErow2-0').append('<td id="FEcell2-0-' + j + '" colspan="8">' + ronda[i][j] + '&nbsp;</td>');

			if(i == 0){
				putparpadeo('#FEcell2-0-'+j, 1*velocidad, azul);

				await sleepFeistel(1000*velocidad);

				removeputparpadeo('#FEcell2-0-'+j, 1*velocidad, azul);
			}
		}

		if(i == 0){
			removeputparpadeo('#FErow1-0', 4*velocidad, azul);
		}
		else{
			putparpadeo('#FErow1-0', 1*velocidad, azul);
			putparpadeo('#FErow2-0', 1*velocidad, azul);

			await sleepFeistel(1000*velocidad);

			removeputparpadeo('#FErow1-0', 1*velocidad, azul);
			removeputparpadeo('#FErow2-0', 1*velocidad, azul);
		}

		if(cancelado){
			return;
		}

		$('#table-Feistel4').append('<tr id="FErow4-0"><td>R'+i+'</td></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-0"></tr>');

		if(i == 0){
			putparpadeo('#FErow4-0', 4*velocidad, amarillo);
		}

		for(var j = 4 ; j < 8 && !cancelado ; j++){
			$('#FErow3-0').append('<td id="FEcell3-0-' + j + '" colspan="8">' + ronda[i][j] + '&nbsp;</td>');

			if(i == 0){
				putparpadeo('#FEcell3-0-'+j, 1*velocidad, amarillo);

				await sleepFeistel(1000*velocidad);

				removeputparpadeo('#FEcell3-0-'+j, 1*velocidad, amarillo);
			}
		}

		if(i == 0){
			removeputparpadeo('#FErow4-0', 4*velocidad, amarillo);
		}
		else{
			putparpadeo('#FErow4-0', 1*velocidad, amarillo);
			putparpadeo('#FErow3-0', 1*velocidad, amarillo);

			await sleepFeistel(1000*velocidad);

			removeputparpadeo('#FErow4-0', 1*velocidad, amarillo);
			removeputparpadeo('#FErow3-0', 1*velocidad, amarillo);
		}

		if(cancelado){
	        return;
	    }

	    $('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		$('#FEdiv1').html("Se aplica la función F entre R"+i+" y K"+i+". Para este ejemplo F será la función AND.");
		$('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}

		//Ronda 1
		$('#table-Feistel1').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel2').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel3').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel4').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel1').append('<tr id="FErow1-2"></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-2"></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-2"></tr>');
		$('#table-Feistel4').append('<tr id="FErow4-2"><td>&nbsp;&nbsp;</td></tr>');

		putparpadeo('#FErow3-0', 3*velocidad, azul);
		putparpadeo('#FErow4-0', 3*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow1-2').append('<td>R'+i+'</td>');
		
			for(var j = 0 ; j < 4 ; j++){
			$("#FErow2-2").append('<td id="FEcell2-2-'+j+'" colspan="8">' + ronda[i][j+4] + '&nbsp;</td>');
		}

		putparpadeo('#FErow1-2', 2*velocidad, azul);
		putparpadeo('#FErow2-2', 2*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			bin = binario(ronda[i][j+4].charCodeAt());

			for(var k = 0 ; k < 8 ; k++){
				$('#FErow3-2').append('<td id="FEcell3-2-'+(k+j*8)+'">' + bin[k] + '</td>');
			}
		}

		if(cancelado){
			return;
		}

		putparpadeo('#FErow3-2', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FErow3-0', 3*velocidad, azul);
		removeputparpadeo('#FErow4-0', 3*velocidad, azul);
		removeputparpadeo('#FErow1-2', 2*velocidad, azul);
		removeputparpadeo('#FErow2-2', 2*velocidad, azul);
		removeputparpadeo('#FErow3-2', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		$('#table-Feistel1').append('<tr id="FErow1-3"></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-3"></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-3"></tr>');
		$('#table-Feistel4').append('<tr id="FErow4-3"><td>&nbsp;</td></tr>');

		$('#FErow1-3').append('<td>K'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			$("#FErow2-3").append('<td id="FEcell2-3-'+j+'" colspan="8">' + claves[i][j] + '&nbsp;</td>');
		}

		putparpadeo('#FErow1-3', 2*velocidad, azul);
		putparpadeo('#FErow2-3', 2*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			bin = binario(claves[i][j].charCodeAt());

			for(var k = 0 ; k < 8 ; k++){
				$('#FErow3-3').append('<td id="FEcell3-3-'+(k+j*8)+'">' + bin[k] + '</td>');
			}
		}

		putparpadeo('#FErow3-3', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		removeputparpadeo('#FErow1-3', 2*velocidad, azul);
		removeputparpadeo('#FErow2-3', 2*velocidad, azul);
		removeputparpadeo('#FErow3-3', 1*velocidad, azul);

		$('#table-Feistel1').append('<tr id="FErow1-4"></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-4"><td colspan="32">&nbsp;</td></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-4"></tr>');
		$('#table-Feistel4').append('<tr id="FErow4-4"><td>&nbsp;</td></tr>');

		$('#FErow1-4').append('<td id="FErow1-4">F (AND)</td>');

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			aux[j] = String.fromCharCode(ronda[i][j+4].charCodeAt() & claves[i][j].charCodeAt());
			bin = binario(aux[j].charCodeAt());

			for(var k = 0 ; k < 8 && !cancelado ; k++){
				if(j == 0 && k < 4){
					putparpadeo('#FEcell3-2-'+k, 1.5*velocidad, azul);
					await sleepFeistel(500*velocidad);

					putparpadeo('#FEcell3-3-'+k, 1*velocidad, azul);
					await sleepFeistel(500*velocidad);
				}

				$('#FErow3-4').append('<td id="FEcell3-4-'+(k+j*8)+'">' + bin[k] + '</td>');

				if(j == 0 && k < 4){
					putparpadeo('#FEcell3-4-'+k, 0.5*velocidad, azul);

					await sleepFeistel(500*velocidad);

					removeputparpadeo('#FEcell3-2-'+k, 1.5*velocidad, azul);
					removeputparpadeo('#FEcell3-3-'+k, 1*velocidad, azul);
					removeputparpadeo('#FEcell3-4-'+k, 0.5*velocidad, azul);
				}
			}
		}

		if(cancelado){
	        return;
	    }

	    $('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		$('#FEdiv1').html("Se aplica la operación XOR entre L"+i+" y el resultado de la funcion F.");
		$('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}
		
		$('#table-Feistel1').append('<tr id="FErow1-5"></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-5"></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-5"></tr>');
		$('#table-Feistel4').append('<tr><td>&nbsp;</td></tr>');

		putparpadeo('#FErow1-0', 3*velocidad, azul);
		putparpadeo('#FErow2-0', 3*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow1-5').append('<td>L'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			$("#FErow2-5").append('<td id="FEcell2-5-'+j+'" colspan="8">' + ronda[i][j] + '&nbsp;</td>');
		}

		putparpadeo('#FErow1-5', 2*velocidad, azul);
		putparpadeo('#FErow2-5', 2*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			bin = binario(ronda[i][j].charCodeAt());

			for(var k = 0 ; k < 8 ; k++){
				$('#FErow3-5').append('<td id="FEcell3-5-'+(k+j*8)+'">' + bin[k] + '</td>');
			}
		}

		putparpadeo('#FErow3-5', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		removeputparpadeo('#FErow1-0', 3*velocidad, azul);
		removeputparpadeo('#FErow2-0', 3*velocidad, azul);
		removeputparpadeo('#FErow1-5', 2*velocidad, azul);
		removeputparpadeo('#FErow2-5', 2*velocidad, azul);
		removeputparpadeo('#FErow3-5', 1*velocidad, azul);

		$('#table-Feistel1').append('<tr id="FErow1-6"></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-6"></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-6"></tr>');
		$('#table-Feistel4').append('<tr id="FErow4-6"><td>&nbsp;</td></tr>');

		$('#FErow1-6').append('<text-danger>XOR</td>');

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			aux[j] = String.fromCharCode(aux[j].charCodeAt() ^ ronda[i][j].charCodeAt());
			bin = binario(aux[j].charCodeAt());

			for(var k = 0 ; k < 8 && !cancelado ; k++){
				if(j == 0 && k < 4){
					putparpadeo('#FEcell3-4-'+k, 1.5*velocidad, azul);
					await sleepFeistel(500*velocidad);

					putparpadeo('#FEcell3-5-'+k, 1*velocidad, azul);
					await sleepFeistel(500*velocidad);
				}

				$('#FErow3-6').append('<td id="FEcell3-6-'+(k+j*8)+'">' + bin[k] + '</td>');

				if(j == 0 && k < 4){
					putparpadeo('#FEcell3-6-'+k, 0.5*velocidad, azul);

					await sleepFeistel(500*velocidad);

					removeputparpadeo('#FEcell3-4-'+k, 1.5*velocidad, azul);
					removeputparpadeo('#FEcell3-5-'+k, 1*velocidad, azul);
					removeputparpadeo('#FEcell3-6-'+k, 0.5*velocidad, azul);
				}
			}
		}

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			for(var k = 0 ; k < 8 ; k++){
				putparpadeo('#FEcell3-6-'+(k+8*j), 2*velocidad, azul);
			}

			await sleepFeistel(1000*velocidad);

			$('#FErow2-6').append('<td id="FEcell2-6-'+j+'" colspan="8">'+aux[j]+'&nbsp;</td>');

			putparpadeo('#FEcell2-6-'+j, 1*velocidad, azul);

			await sleepFeistel(1000*velocidad);

			removeputparpadeo('#FEcell2-6-'+j, 1*velocidad, azul);

			for(var k = 0 ; k < 8 ; k++){
				removeputparpadeo('#FEcell3-6-'+(k+8*j), 2*velocidad, azul);
			}
		}

		if(cancelado){
	        return;
	    }

	    $('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		$('#FEdiv1').html("R"+i+" se convierte en L"+(i+1)+" y el resultado de la operación XOR se convierte en R"+(i+1));
		$('#FEdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}

		$('#table-Feistel1').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel2').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel3').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel4').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel1').append('<tr id="FErow1-7"></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-7"></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-7"></tr>');
		$('#table-Feistel4').append('<tr id="FErow4-7"></tr>');
		
		putparpadeo('#FErow3-0', 2*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow1-7').append('<td>L'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			ronda[i+1][j] = ronda[i][j+4];
			$("#FErow2-7").append('<td id="FEcell2-7-'+j+'" colspan="8">' + ronda[i+1][j] + '</td>');
		}

		putparpadeo('#FErow1-7', 1*velocidad, azul);
		putparpadeo('#FErow2-7', 1*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FErow3-0', 2*velocidad, azul);
		removeputparpadeo('#FErow1-7', 1*velocidad, azul);
		removeputparpadeo('#FErow2-7', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		putparpadeo('#FErow2-6', 2*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow4-7').append('<td>R'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			ronda[i+1][j+4] = aux[j];
			$("#FErow3-7").append('<td id="FEcell3-7-'+j+'" colspan="8">' + ronda[i+1][j+4] + '</td>');
		}

		putparpadeo('#FErow4-7', 1*velocidad, azul);
		putparpadeo('#FErow3-7', 1*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FErow2-6', 2*velocidad, azul);
		removeputparpadeo('#FErow4-7', 1*velocidad, azul);
		removeputparpadeo('#FErow3-7', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
	}

	if(cancelado){
        return;
    }

    await sleepFeistel(1000);

    $('#FEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000);
	
	limpiarTablasC();

	if(cancelado){
		return;
	}

	$('#FEdiv1').html("Se repite el proceso anterior hasta llegar a L16 y R16");
	$('#FEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(3000);

	if(cancelado){
		return;
	}

	//Rondas 1-16

	$('#table-Feistel1').append('<tr><td id="FEcell1-0">L0</td></tr>');
	$('#table-Feistel2').append('<tr id="FErow2-0"></tr>');
	$('#table-Feistel3').append('<tr id="FErow3-0"></tr>');
	$('#table-Feistel4').append('<tr><td id="FEcell4-0">R0</td></tr>');

	for(var j = 0 ; j < 4 && !cancelado ; j++){
		$('#FErow2-0').append('<td id="FEcell2-0-'+j+'">'+ronda[0][j]+'</td>');
		$('#FErow3-0').append('<td id="FEcell3-0-'+(j+4)+'">'+ronda[0][j+4]+'</td>');
	}

	for(var i = 1 ; i < 17 && !cancelado ; i++){
		$('#table-Feistel1').append('<tr><td id="FEcell1-'+i+'">L'+i+'</td></tr>');
		$('#table-Feistel2').append('<tr id="FErow2-'+i+'"></tr>');
		$('#table-Feistel3').append('<tr id="FErow3-'+i+'"></tr>');
		$('#table-Feistel4').append('<tr><td id="FEcell4-'+i+'">R'+i+'</td></tr>');

		for(var j = 0 ; j < 4 ; j++){
			aux[j] = String.fromCharCode(ronda[i-1][j+4].charCodeAt() & claves[i-1][j].charCodeAt());
		}

		for(var j = 0 ; j < 4 ; j++){
			aux[j] = String.fromCharCode(aux[j].charCodeAt() ^ ronda[i-1][j].charCodeAt());
		}

		for(var j = 0 ; j < 4 ; j++){
			ronda[i][j] = ronda[i-1][j+4];
		}

		for(var j = 0 ; j < 4 ; j++){
			ronda[i][j+4] = aux[j];
		}

		for(var j = 0 ; j < 4 ; j++){
			$('#FErow2-'+i).append('<td id="FEcell2-'+i+'-'+j+'">'+ronda[i][j]+'&nbsp;</td>');
			$('#FErow3-'+i).append('<td id="FEcell3-'+i+'-'+(j+4)+'">'+ronda[i][j+4]+'&nbsp;</td>');
		}
	}

	if(cancelado){
        return;
    }

    await sleepFeistel(5000);

    $('#FEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000);
	
	limpiarTablasC();

	if(cancelado){
		return;
	}

	$('#FEdiv1').html("Por último R16 se convierte en L17 y L16 en en R17 y juntos conforman el criptograma.");
	$('#FEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(4000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 ; i++){
		ronda[17][i] = ronda[16][i+4];
		ronda[17][i+4] = ronda[16][i];
	}

	$('#table-Feistel1').append('<tr id="FErow1-0"><td>L16</td></tr>');
	$('#table-Feistel2').append('<tr id="FErow2-0"></tr>');
	$('#table-Feistel3').append('<tr id="FErow3-0"></tr>');
	$('#table-Feistel4').append('<tr id="FErow4-0"><td>R16</td></tr>');

	for(var i = 0 ; i < 4 && !cancelado ; i++){
		$('#FErow2-0').append('<td id="FEcell2-0-' + i + '">' + ronda[16][i] + '</td>');
		$('#FErow3-0').append('<td id="FEcell3-0-' + i + '">' + ronda[16][i+4] + '</td>');
	}

	if(cancelado){
		return;
	}

	await sleepFeistel(1000);

	if(cancelado){
		return;
	}

	putparpadeo('#FErow3-0', 2*velocidad, azul);
	putparpadeo('#FErow4-0', 2*velocidad, azul);

	await sleepFeistel(1000*velocidad);

	if(cancelado){
		return;
	}

	$('#table-Feistel1').append('<tr><td>&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel2').append('<tr><td colspan="4">&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel3').append('<tr><td colspan="4">&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel4').append('<tr><td>&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel1').append('<tr id="FErow1-1"><td>L17</td></tr>');
	$('#table-Feistel2').append('<tr id="FErow2-1"></tr>');
	$('#table-Feistel3').append('<tr id="FErow3-1"></tr>');
	$('#table-Feistel4').append('<tr id="FErow4-1"><td>R17</td></tr>');

	for(var i = 0 ; i < 4 ; i++){
		$('#FErow2-1').append('<td id="FEcell2-1-' + i + '">' + ronda[17][i] + '&nbsp;</td>');
	}

	putparpadeo('#FErow1-1', 1*velocidad, azul);
	putparpadeo('#FErow2-1', 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000*velocidad);

	removeputparpadeo('#FErow3-0', 2*velocidad, azul);
	removeputparpadeo('#FErow4-0', 2*velocidad, azul);
	removeputparpadeo('#FErow1-1', 1*velocidad, azul);
	removeputparpadeo('#FErow2-1', 1*velocidad, azul);

	if(cancelado){
		return;
	}

	putparpadeo('#FErow1-0', 2*velocidad, azul);
	putparpadeo('#FErow2-0', 2*velocidad, azul);

	await sleepFeistel(1000*velocidad);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 ; i++){
		$('#FErow3-1').append('<td id="FEcell3-1-' + i + '">' + ronda[17][i+4] + '&nbsp;</td>');
	}

	putparpadeo('#FErow3-1', 1*velocidad, azul);
	putparpadeo('#FErow4-1', 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000*velocidad);

	removeputparpadeo('#FErow1-0', 2*velocidad, azul);
	removeputparpadeo('#FErow2-0', 2*velocidad, azul);
	removeputparpadeo('#FErow3-1', 1*velocidad, azul);
	removeputparpadeo('#FErow4-1', 1*velocidad, azul);

	await(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 && !cancelado ; i++){
		$('#FE-Ccell1'+i).html('<br>' + ronda[17][i]);
		
		putparpadeo('#FEcell2-1-'+i, 1*velocidad, azul);
		putparpadeo('#FE-Ccell1'+i, 1*velocidad, negro);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FEcell2-1-'+i, 1*velocidad, azul);
		removeputparpadeo('#FE-Ccell1'+i, 1*velocidad, negro);

		cadenaCifrado = cadenaCifrado + ronda[17][i];
	}

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 && !cancelado ; i++){
		$('#FE-Ccell1'+(i+4)).html('<br>' + ronda[17][i+4]);
		
		putparpadeo('#FEcell3-1-'+i, 1*velocidad, azul);
		putparpadeo('#FE-Ccell1'+(i+4), 1*velocidad, negro);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FEcell3-1-'+i, 1*velocidad, azul);
		removeputparpadeo('#FE-Ccell1'+(i+4), 1*velocidad, negro);

		cadenaCifrado = cadenaCifrado + ronda[17][i+4];
	}

	if(cancelado){
		return;
	}

    $("#out-textoCifradoFeistel").val(cadenaCifrado);
    $("#btn-velocidadCFeistel").show();
    $("#btn-cifrarFeistel").show();
    $("#btn-cancelarCifrarFeistel").hide();

    if(!cancelado){
        $('#FEdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        cancelado = true;
    }
}

async function descifrarFeistel(){
	var criptograma = ($("#in-textoPlanoCifradoFeistel").val()).split("");
	var texto_length = criptograma.length;
	var cadenaDescifrado = "";
	var claves = ["abcd","bcde","cdef","defg","efgh","fghi","ghij","hijk","ijkl","jklm","klmn","lmno","mnop","nopq","opqr","pqrs"];
	var aux = new Array(4);
	var ronda = new Array(18);
	var bin = "";

	for(var i = 0 ; i < 18 ; i++){
		ronda[i] = new Array(8);
	}
	
	limpiaPanelDescifradoFeistel();
	$("#in-textoPlanoCifradoFeistel").val(criptograma.join(""));

	crearPanelDescifradoFeistel();

	//Criptograma
	$('#FEdiv2').html('Se necesitan <b>n</b> subclaves de 32 bits que pueden surgir de una clave dada (Para este ejemplo n = 16 y serán las siguientes).');
	$('#FEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(5000);
	
	if(cancelado){
		return;
	}

	$('#FEdiv2').scrollViewFeistel();
	
	for (var i = 0 ; i < 16 ; i++) {
		$("#table-Feistel21").append('<tr><td>K' + i + '</td></tr>');
		$("#table-Feistel22").append('<tr id="FE2row-' + i + '"></tr>');
		$("#table-Feistel23").append('<tr id="FE3row-' + i + '"></tr>');
		
		for(var j = 0 ; j < 4 ; j++){
			$("#FE2row-"+i).append('<td>' + claves[i][j] + '&nbsp;</td>');
			bin = binario(claves[i][j].charCodeAt());
			
			for(var k = 0 ; k < 8 ; k++){
				$('#FE3row-'+i).append('<td>' + bin[k] + '</td>');
			}
		}
	}

	if(cancelado){
		return;
	}

	await sleepFeistel(4000);

	if(cancelado){
		return;
	}

	for(var j = 0 ; j < 4 ; j++){
		ronda[0][j] = criptograma[j];
		ronda[0][j+4] = criptograma[j+4];
	}

	for(var m = 15, i = 0 ; i < 1 && !cancelado ; i++, m--){
		$('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		limpiarTablasD();

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		if(i == 0){
			$('#FEdiv2').html("Se divide el criptograma en 2 partes de 32 bits cada una (L0 y R0).");
		}
		else{
			$('#FEdiv2').html("Repetimos los pasos ahora con L1, R1 y K14.");
		}

		$('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}

		$('#table-Feistel21').append('<tr id="FErow21-0"><td>L'+i+'</td></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-0"></tr>');

		if(i == 0){
			putparpadeo('#FErow21-0', 4*velocidad, azul);
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			$('#FErow22-0').append('<td id="FEcell22-0-' + j + '" colspan="8">' + ronda[i][j] + '&nbsp;</td>');

			if(i == 0){
				putparpadeo('#FEcell22-0-'+j, 1*velocidad, azul);

				await sleepFeistel(1000*velocidad);

				removeputparpadeo('#FEcell22-0-'+j, 1*velocidad, azul);
			}
		}

		if(i == 0){
			removeputparpadeo('#FErow21-0', 4*velocidad, azul);
		}
		else{
			putparpadeo('#FErow21-0', 1*velocidad, azul);
			putparpadeo('#FErow22-0', 1*velocidad, azul);

			await sleepFeistel(1000*velocidad);

			removeputparpadeo('#FErow21-0', 1*velocidad, azul);
			removeputparpadeo('#FErow22-0', 1*velocidad, azul);
		}

		if(cancelado){
			return;
		}

		$('#table-Feistel24').append('<tr id="FErow24-0"><td>R'+i+'</td></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-0"></tr>');

		if(i == 0){
			putparpadeo('#FErow24-0', 4*velocidad, amarillo);
		}

		for(var j = 4 ; j < 8 && !cancelado ; j++){
			$('#FErow23-0').append('<td id="FEcell23-0-' + j + '" colspan="8">' + ronda[i][j] + '&nbsp;</td>');

			if(i == 0){
				putparpadeo('#FEcell23-0-'+j, 1*velocidad, amarillo);

				await sleepFeistel(1000*velocidad);

				removeputparpadeo('#FEcell23-0-'+j, 1*velocidad, amarillo);
			}
		}

		if(i == 0){
			removeputparpadeo('#FErow24-0', 4*velocidad, amarillo);
		}
		else{
			putparpadeo('#FErow24-0', 1*velocidad, amarillo);
			putparpadeo('#FErow23-0', 1*velocidad, amarillo);

			await sleepFeistel(1000*velocidad);

			removeputparpadeo('#FErow24-0', 1*velocidad, amarillo);
			removeputparpadeo('#FErow23-0', 1*velocidad, amarillo);
		}

		if(cancelado){
	        return;
	    }

	    $('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		$('#FEdiv2').html("Se aplica la función F entre R"+i+" y K"+i+". Para este ejemplo F será la función AND.");
		$('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}

		//Ronda 1
		$('#table-Feistel21').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel22').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel23').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel24').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel21').append('<tr id="FErow21-2"></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-2"></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-2"></tr>');
		$('#table-Feistel24').append('<tr id="FErow24-2"><td>&nbsp;&nbsp;</td></tr>');

		putparpadeo('#FErow23-0', 3*velocidad, azul);
		putparpadeo('#FErow24-0', 3*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow21-2').append('<td>R'+i+'</td>');
		
			for(var j = 0 ; j < 4 ; j++){
			$("#FErow22-2").append('<td id="FEcell22-2-'+j+'" colspan="8">' + ronda[i][j+4] + '&nbsp;</td>');
		}

		putparpadeo('#FErow21-2', 2*velocidad, azul);
		putparpadeo('#FErow22-2', 2*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			bin = binario(ronda[i][j+4].charCodeAt());

			for(var k = 0 ; k < 8 ; k++){
				$('#FErow23-2').append('<td id="FEcell23-2-'+(k+j*8)+'">' + bin[k] + '</td>');
			}
		}

		if(cancelado){
			return;
		}

		putparpadeo('#FErow23-2', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FErow23-0', 3*velocidad, azul);
		removeputparpadeo('#FErow24-0', 3*velocidad, azul);
		removeputparpadeo('#FErow21-2', 2*velocidad, azul);
		removeputparpadeo('#FErow22-2', 2*velocidad, azul);
		removeputparpadeo('#FErow23-2', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		$('#table-Feistel21').append('<tr id="FErow21-3"></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-3"></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-3"></tr>');
		$('#table-Feistel24').append('<tr id="FErow24-3"><td>&nbsp;</td></tr>');

		$('#FErow21-3').append('<td>K'+m+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			$("#FErow22-3").append('<td id="FEcell22-3-'+j+'" colspan="8">' + claves[m][j] + '&nbsp;</td>');
		}

		putparpadeo('#FErow21-3', 2*velocidad, azul);
		putparpadeo('#FErow22-3', 2*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			bin = binario(claves[m][j].charCodeAt());

			for(var k = 0 ; k < 8 ; k++){
				$('#FErow23-3').append('<td id="FEcell23-3-'+(k+j*8)+'">' + bin[k] + '</td>');
			}
		}

		putparpadeo('#FErow23-3', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		removeputparpadeo('#FErow21-3', 2*velocidad, azul);
		removeputparpadeo('#FErow22-3', 2*velocidad, azul);
		removeputparpadeo('#FErow23-3', 1*velocidad, azul);

		$('#table-Feistel21').append('<tr id="FErow21-4"></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-4"><td colspan="32">&nbsp;</td></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-4"></tr>');
		$('#table-Feistel24').append('<tr id="FErow24-4"><td>&nbsp;</td></tr>');

		$('#FErow21-4').append('<td id="FErow21-4">F (AND)</td>');

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			aux[j] = String.fromCharCode(ronda[i][j+4].charCodeAt() & claves[m][j].charCodeAt());
			bin = binario(aux[j].charCodeAt());

			for(var k = 0 ; k < 8 && !cancelado ; k++){
				if(j == 0 && k < 4){
					putparpadeo('#FEcell23-2-'+k, 1.5*velocidad, azul);
					await sleepFeistel(500*velocidad);

					putparpadeo('#FEcell23-3-'+k, 1*velocidad, azul);
					await sleepFeistel(500*velocidad);
				}

				$('#FErow23-4').append('<td id="FEcell23-4-'+(k+j*8)+'">' + bin[k] + '</td>');

				if(j == 0 && k < 4){
					putparpadeo('#FEcell23-4-'+k, 0.5*velocidad, azul);

					await sleepFeistel(500*velocidad);

					removeputparpadeo('#FEcell23-2-'+k, 1.5*velocidad, azul);
					removeputparpadeo('#FEcell23-3-'+k, 1*velocidad, azul);
					removeputparpadeo('#FEcell23-4-'+k, 0.5*velocidad, azul);
				}
			}
		}

		if(cancelado){
	        return;
	    }

	    $('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		$('#FEdiv2').html("Se aplica la operación XOR entre L"+i+" y el resultado de la funcion F.");
		$('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}
		
		$('#table-Feistel21').append('<tr id="FErow21-5"></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-5"></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-5"></tr>');
		$('#table-Feistel24').append('<tr><td>&nbsp;</td></tr>');

		putparpadeo('#FErow21-0', 3*velocidad, azul);
		putparpadeo('#FErow22-0', 3*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow21-5').append('<td>L'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			$("#FErow22-5").append('<td id="FEcell22-5-'+j+'" colspan="8">' + ronda[i][j] + '&nbsp;</td>');
		}

		putparpadeo('#FErow21-5', 2*velocidad, azul);
		putparpadeo('#FErow22-5', 2*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			bin = binario(ronda[i][j].charCodeAt());

			for(var k = 0 ; k < 8 ; k++){
				$('#FErow23-5').append('<td id="FEcell23-5-'+(k+j*8)+'">' + bin[k] + '</td>');
			}
		}

		putparpadeo('#FErow23-5', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		removeputparpadeo('#FErow21-0', 3*velocidad, azul);
		removeputparpadeo('#FErow22-0', 3*velocidad, azul);
		removeputparpadeo('#FErow21-5', 2*velocidad, azul);
		removeputparpadeo('#FErow22-5', 2*velocidad, azul);
		removeputparpadeo('#FErow23-5', 1*velocidad, azul);

		$('#table-Feistel21').append('<tr id="FErow21-6"></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-6"></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-6"></tr>');
		$('#table-Feistel24').append('<tr id="FErow24-6"><td>&nbsp;</td></tr>');

		$('#FErow21-6').append('<text-danger>XOR</td>');

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			aux[j] = String.fromCharCode(aux[j].charCodeAt() ^ ronda[i][j].charCodeAt());
			bin = binario(aux[j].charCodeAt());

			for(var k = 0 ; k < 8 && !cancelado ; k++){
				if(j == 0 && k < 4){
					putparpadeo('#FEcell23-4-'+k, 1.5*velocidad, azul);
					await sleepFeistel(500*velocidad);

					putparpadeo('#FEcell23-5-'+k, 1*velocidad, azul);
					await sleepFeistel(500*velocidad);
				}

				$('#FErow23-6').append('<td id="FEcell23-6-'+(k+j*8)+'">' + bin[k] + '</td>');

				if(j == 0 && k < 4){
					putparpadeo('#FEcell23-6-'+k, 0.5*velocidad, azul);

					await sleepFeistel(500*velocidad);

					removeputparpadeo('#FEcell23-4-'+k, 1.5*velocidad, azul);
					removeputparpadeo('#FEcell23-5-'+k, 1*velocidad, azul);
					removeputparpadeo('#FEcell23-6-'+k, 0.5*velocidad, azul);
				}
			}
		}

		if(cancelado){
			return;
		}

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		for(var j = 0 ; j < 4 && !cancelado ; j++){
			for(var k = 0 ; k < 8 ; k++){
				putparpadeo('#FEcell23-6-'+(k+8*j), 2*velocidad, azul);
			}

			await sleepFeistel(1000*velocidad);

			$('#FErow22-6').append('<td id="FEcell22-6-'+j+'" colspan="8">'+aux[j]+'&nbsp;</td>');

			putparpadeo('#FEcell22-6-'+j, 1*velocidad, azul);

			await sleepFeistel(1000*velocidad);

			removeputparpadeo('#FEcell22-6-'+j, 1*velocidad, azul);

			for(var k = 0 ; k < 8 ; k++){
				removeputparpadeo('#FEcell23-6-'+(k+8*j), 2*velocidad, azul);
			}
		}

		if(cancelado){
	        return;
	    }

	    $('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
		
		if(cancelado){
			return;
		}

		$('#FEdiv2').html("R"+i+" se convierte en L"+(i+1)+" y el resultado de la operación XOR se convierte en R"+(i+1));
		$('#FEdiv2').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepFeistel(3000);

		if(cancelado){
			return;
		}

		$('#table-Feistel21').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel22').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel23').append('<tr><td colspan="32">&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel24').append('<tr><td>&nbsp;&nbsp;</td></tr>');
		$('#table-Feistel21').append('<tr id="FErow21-7"></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-7"></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-7"></tr>');
		$('#table-Feistel24').append('<tr id="FErow24-7"></tr>');
		
		putparpadeo('#FErow23-0', 2*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow21-7').append('<td>L'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			ronda[i+1][j] = ronda[i][j+4];
			$("#FErow22-7").append('<td id="FEcell22-7-'+j+'" colspan="8">' + ronda[i+1][j] + '</td>');
		}

		putparpadeo('#FErow21-7', 1*velocidad, azul);
		putparpadeo('#FErow22-7', 1*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FErow23-0', 2*velocidad, azul);
		removeputparpadeo('#FErow21-7', 1*velocidad, azul);
		removeputparpadeo('#FErow22-7', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		putparpadeo('#FErow22-6', 2*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		if(cancelado){
			return;
		}

		$('#FErow24-7').append('<td>R'+i+'</td>');
		
		for(var j = 0 ; j < 4 && !cancelado ; j++){
			ronda[i+1][j+4] = aux[j];
			$("#FErow23-7").append('<td id="FEcell23-7-'+j+'" colspan="8">' + ronda[i+1][j+4] + '</td>');
		}

		putparpadeo('#FErow24-7', 1*velocidad, azul);
		putparpadeo('#FErow23-7', 1*velocidad, azul);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FErow22-6', 2*velocidad, azul);
		removeputparpadeo('#FErow24-7', 1*velocidad, azul);
		removeputparpadeo('#FErow23-7', 1*velocidad, azul);

		if(cancelado){
			return;
		}

		await sleepFeistel(1000);
	}

	if(cancelado){
        return;
    }

    await sleepFeistel(1000);

    $('#FEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000);
	
	limpiarTablasD();

	if(cancelado){
		return;
	}

	$('#FEdiv2').html("Se repite el proceso anterior hasta llegar a L16 y R16");
	$('#FEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(3000);

	if(cancelado){
		return;
	}

	//Rondas 1-16

	$('#table-Feistel21').append('<tr><td id="FEcell21-0">L0</td></tr>');
	$('#table-Feistel22').append('<tr id="FErow22-0"></tr>');
	$('#table-Feistel23').append('<tr id="FErow23-0"></tr>');
	$('#table-Feistel24').append('<tr><td id="FEcell24-0">R0</td></tr>');

	for(var j = 0 ; j < 4 && !cancelado ; j++){
		$('#FErow22-0').append('<td id="FEcell22-0-'+j+'">'+ronda[0][j]+'</td>');
		$('#FErow23-0').append('<td id="FEcell23-0-'+(j+4)+'">'+ronda[0][j+4]+'</td>');
	}

	for(var i = 1, k = 15 ; i < 17 && !cancelado ; i++, k--){
		$('#table-Feistel21').append('<tr><td id="FEcell21-'+i+'">L'+i+'</td></tr>');
		$('#table-Feistel22').append('<tr id="FErow22-'+i+'"></tr>');
		$('#table-Feistel23').append('<tr id="FErow23-'+i+'"></tr>');
		$('#table-Feistel24').append('<tr><td id="FEcell24-'+i+'">R'+i+'</td></tr>');

		for(var j = 0 ; j < 4 ; j++){
			aux[j] = String.fromCharCode(ronda[i-1][j+4].charCodeAt() & claves[k][j].charCodeAt());
		}

		for(var j = 0 ; j < 4 ; j++){
			aux[j] = String.fromCharCode(aux[j].charCodeAt() ^ ronda[i-1][j].charCodeAt());
		}

		for(var j = 0 ; j < 4 ; j++){
			ronda[i][j] = ronda[i-1][j+4];
		}

		for(var j = 0 ; j < 4 ; j++){
			ronda[i][j+4] = aux[j];
		}

		for(var j = 0 ; j < 4 ; j++){
			$('#FErow22-'+i).append('<td id="FEcell22-'+i+'-'+j+'">'+ronda[i][j]+'&nbsp;</td>');
			$('#FErow23-'+i).append('<td id="FEcell23-'+i+'-'+(j+4)+'">'+ronda[i][j+4]+'&nbsp;</td>');
		}
	}

	if(cancelado){
        return;
    }

    await sleepFeistel(5000);

    $('#FEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000);
	
	limpiarTablasD();

	if(cancelado){
		return;
	}

	$('#FEdiv2').html("Por último R16 se convierte en L17 y L16 en en R17 y juntos conforman el criptograma.");
	$('#FEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepFeistel(4000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 ; i++){
		ronda[17][i] = ronda[16][i+4];
		ronda[17][i+4] = ronda[16][i];
	}

	$('#table-Feistel21').append('<tr id="FErow21-0"><td>L16</td></tr>');
	$('#table-Feistel22').append('<tr id="FErow22-0"></tr>');
	$('#table-Feistel23').append('<tr id="FErow23-0"></tr>');
	$('#table-Feistel24').append('<tr id="FErow24-0"><td>R16</td></tr>');

	for(var i = 0 ; i < 4 && !cancelado ; i++){
		$('#FErow22-0').append('<td id="FEcell22-0-' + i + '">' + ronda[16][i] + '</td>');
		$('#FErow23-0').append('<td id="FEcell23-0-' + i + '">' + ronda[16][i+4] + '</td>');
	}

	if(cancelado){
		return;
	}

	await sleepFeistel(1000);

	if(cancelado){
		return;
	}

	putparpadeo('#FErow23-0', 2*velocidad, azul);
	putparpadeo('#FErow24-0', 2*velocidad, azul);

	await sleepFeistel(1000*velocidad);

	if(cancelado){
		return;
	}

	$('#table-Feistel21').append('<tr><td>&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel22').append('<tr><td colspan="4">&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel23').append('<tr><td colspan="4">&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel24').append('<tr><td>&nbsp;&nbsp;</td></tr>');
	$('#table-Feistel21').append('<tr id="FErow21-1"><td>L17</td></tr>');
	$('#table-Feistel22').append('<tr id="FErow22-1"></tr>');
	$('#table-Feistel23').append('<tr id="FErow23-1"></tr>');
	$('#table-Feistel24').append('<tr id="FErow24-1"><td>R17</td></tr>');

	for(var i = 0 ; i < 4 ; i++){
		$('#FErow22-1').append('<td id="FEcell22-1-' + i + '">' + ronda[17][i] + '&nbsp;</td>');
	}

	putparpadeo('#FErow21-1', 1*velocidad, azul);
	putparpadeo('#FErow22-1', 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000*velocidad);

	removeputparpadeo('#FErow23-0', 2*velocidad, azul);
	removeputparpadeo('#FErow24-0', 2*velocidad, azul);
	removeputparpadeo('#FErow21-1', 1*velocidad, azul);
	removeputparpadeo('#FErow22-1', 1*velocidad, azul);

	if(cancelado){
		return;
	}

	putparpadeo('#FErow21-0', 2*velocidad, azul);
	putparpadeo('#FErow22-0', 2*velocidad, azul);

	await sleepFeistel(1000*velocidad);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 ; i++){
		$('#FErow23-1').append('<td id="FEcell23-1-' + i + '">' + ronda[17][i+4] + '&nbsp;</td>');
	}

	putparpadeo('#FErow23-1', 1*velocidad, azul);
	putparpadeo('#FErow24-1', 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepFeistel(1000*velocidad);

	removeputparpadeo('#FErow21-0', 2*velocidad, azul);
	removeputparpadeo('#FErow22-0', 2*velocidad, azul);
	removeputparpadeo('#FErow23-1', 1*velocidad, azul);
	removeputparpadeo('#FErow24-1', 1*velocidad, azul);

	await(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 && !cancelado ; i++){
		$('#FE-MCcell1'+i).html('<br>' + ronda[17][i]);
		
		putparpadeo('#FEcell22-1-'+i, 1*velocidad, azul);
		putparpadeo('#FE-MCcell1'+i, 1*velocidad, negro);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FEcell22-1-'+i, 1*velocidad, azul);
		removeputparpadeo('#FE-MCcell1'+i, 1*velocidad, negro);

		cadenaDescifrado = cadenaDescifrado + ronda[17][i];
	}

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 4 && !cancelado ; i++){
		$('#FE-MCcell1'+(i+4)).html('<br>' + ronda[17][i+4]);
		
		putparpadeo('#FEcell23-1-'+i, 1*velocidad, azul);
		putparpadeo('#FE-MCcell1'+(i+4), 1*velocidad, negro);

		await sleepFeistel(1000*velocidad);

		removeputparpadeo('#FEcell23-1-'+i, 1*velocidad, azul);
		removeputparpadeo('#FE-MCcell1'+(i+4), 1*velocidad, negro);

		cadenaDescifrado = cadenaDescifrado + ronda[17][i+4];
	}

	if(cancelado){
		return;
	}

	$("#out-textoDescifradoFeistel").val(cadenaDescifrado.trim());
	$("#btn-velocidadDFeistel").show();
    $("#btn-descifrarFeistel").show();
	$("#btn-cancelarDescifrarFeistel").hide();

	if(!cancelado){
		$('#FEdiv2').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_8);
    }
}

function validarEntradaTextoCFeistel(){
	var mensaje = "";
	var texto = $('#in-textoPlanoFeistel').val();

	if (texto.length > 0 && texto.length <= 8) {
		var caracteres = texto.split('');

		for(var i = 0 ; i < caracteres.length ; i++){
			if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
				mensaje = mensaje_29;
			}
		}
	}
	else{
		mensaje = mensaje_28;
	}

	return mensaje;
}

function validarEntradaTextoDFeistel(){
	var mensaje = "";
	var texto = $('#in-textoPlanoCifradoFeistel').val();

	var caracteres = texto.split('');

	for(var i = 0 ; i < caracteres.length ; i++){
		if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
			mensaje = mensaje_31;
			return mensaje;
		}
	}

	if (texto.length != 8 ){
		mensaje = mensaje_30;
	}

	return mensaje;
}

$(document).ready(function(){
	$("#tipoFeistelC1").click(function(){
        $("#btn-cifrarFeistel").html('Cifrado Rápido');
        $("#btn-cifrarFeistel").val(1);
    });
    $("#tipoFeistelC2").click(function(){
        $("#btn-cifrarFeistel").html('Cifrado Normal');
        $("#btn-cifrarFeistel").val(2);
    });
    $("#tipoFeistelC3").click(function(){
        $("#btn-cifrarFeistel").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarFeistel").val(3);
    });

    $("#tipoFeistelD1").click(function(){
        $("#btn-descifrarFeistel").html('Descifrado Rápido');
        $("#btn-descifrarFeistel").val(1);
    });
    $("#tipoFeistelD2").click(function(){
        $("#btn-descifrarFeistel").html('Descifrado Normal');
        $("#btn-descifrarFeistel").val(2);
    });
    $("#tipoFeistelD3").click(function(){
        $("#btn-descifrarFeistel").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarFeistel").val(3);
    });

    $("#in-textoPlanoFeistel").keyup(function(){
        var mensaje = validarEntradaTextoCFeistel();

        if($("#in-textoPlanoFeistel").val().length == 0){
        	$("#textoPlanoFeistel-error").remove();
            $("#in-textoPlanoFeistel").removeClass('input-error');
        }
        else{
	        if (mensaje.length != 0) {
	            $("#textoPlanoFeistel-error").remove();
	            $("#in-textoPlanoFeistel").parent().parent().append('<div id="textoPlanoFeistel-error" class="text-danger">&nbsp;'+mensaje+'</div>');
	            $("#in-textoPlanoFeistel").addClass('input-error');
	            //$("#btn-cifrarFeistel").attr("disabled", true);
	        } else{
	            $("#textoPlanoFeistel-error").remove();
	            $("#in-textoPlanoFeistel").removeClass('input-error');
	            $("#btn-cifrarFeistel").attr("disabled", false);
	        }
	    }
    });

    $("#in-textoPlanoCifradoFeistel").keyup(function(){
    	if($("#in-textoPlanoCifradoFeistel").val().length == 0){
    		$("#textoPlanoCifradoFeistel-error").remove();
            $("#in-textoPlanoCifradoFeistel").removeClass('input-error');
    	}
    	else{
	        var mensaje = validarEntradaTextoDFeistel();

	        $("#textoPlanoCifradoFeistel-info").remove();

	        if (mensaje.length != 0) {
	            $("#textoPlanoCifradoFeistel-error").remove();
	            $("#in-textoPlanoCifradoFeistel").parent().parent().append('<div id="textoPlanoCifradoFeistel-error" class="text-danger">&nbsp;'+mensaje+'</div>');
	            $("#in-textoPlanoCifradoFeistel").addClass('input-error');
	            //$("#btn-descifrarFeistel").attr("disabled", true);
	        } else{
	            $("#textoPlanoCifradoFeistel-error").remove();
	            $("#in-textoPlanoCifradoFeistel").removeClass('input-error');
	            $("#btn-descifrarFeistel").attr("disabled", false);
	        }
	    }
    });

	$("#btn-cifrarFeistel").click(function(){
		var mensajetexto = validarEntradaTextoCFeistel();

		if(mensajetexto.length > 0){
			$("#textoPlanoFeistel-error").remove();
            $("#in-textoPlanoFeistel").parent().parent().append('<div id="textoPlanoFeistel-error" class="text-danger">&nbsp;'+mensajetexto+'</div>');
            $("#in-textoPlanoFeistel").addClass('input-error');
		}
		else{
			$("#textoPlanoFeistel-error").remove();
            $("#claveCFeistel-error").remove();
            $("#in-textoPlanoFeistel").removeClass('input-error');
            $("#in-claveCifradoFeistel").removeClass('input-error');

            if($('#btn-cifrarFeistel').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarFeistel').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCFeistel").hide();
            $("#btn-cifrarFeistel").hide();
            $("#btn-cancelarCifrarFeistel").show();
            cancelado = false;
            
            cifrarFeistel();
		}
	});

	$("#btn-cancelarCifrarFeistel").click(function(){
        cancelado = true;

        limpiaPanelCifradoFeistel();

        $("#btn-cifrarFeistel").show();
        $("#btn-velocidadCFeistel").show();
        $("#btn-cancelarCifrarFeistel").hide();
    });

    $("#btn-cancelarDescifrarFeistel").click(function(){
        cancelado = true;

        limpiaPanelDescifradoFeistel();

        $("#btn-descifrarFeistel").show();
        $("#btn-velocidadDFeistel").show();
        $("#btn-cancelarDescifrarFeistel").hide();
    });

    $("#btn-copiarTextoFeistel").click(function(){
        if ($("#out-textoCifradoFeistel").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-textoPlanoCifradoFeistel").val($("#out-textoCifradoFeistel").val());
		}
    });

    $("#btn-descifrarFeistel").click(function(){
        var mensajetexto = validarEntradaTextoDFeistel();

		if(mensajetexto.length > 0){
			$("#textoPlanoCifradoFeistel-error").remove();
            $("#in-textoPlanoCifradoFeistel").parent().parent().append('<div id="textoPlanoCifradoFeistel-error" class="text-danger">&nbsp;'+mensajetexto+'</div>');
            $("#in-textoPlanoCifradoFeistel").addClass('input-error');
		}
		else{
			$("#textoPlanoCifradoFeistel-error").remove();
            $("#claveDFeistel-error").remove();
            $("#in-textoPlanoCifradoFeistel").removeClass('input-error');
            $("#in-claveDescifradoFeistel").removeClass('input-error');
            $("#btn-descifrarFeistel").attr("disabled", false);

            if($('#btn-descifrarFeistel').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarFeistel').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDFeistel").hide();
            $("#btn-descifrarFeistel").hide();
            $("#btn-cancelarDescifrarFeistel").show();
            cancelado = false;
            
            descifrarFeistel();
		}
    });
});