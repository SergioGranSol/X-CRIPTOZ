function sleepVigenere(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var matrizVigenere = new Array(26);
var cancelado = false;
var velocidad = 1;
var azul = 0, negro = 1, amarillo = 2 ; verde = 3;
var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

$.fn.scrollViewVigenere = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelVigenere(){
	$("#pnl-Interactivo2").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelVigenere(){
	cancelado = true;

	$("#pnl-Interactivo2").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCifradoVigenere();
	limpiaPanelDescifradoVigenere();

	$("#btn-cifrarVigenere").show();
	$("#btn-velocidadCVigenere").show();
	$("#btn-cancelarCifrarVigenere").hide();

	$("#btn-descifrarVigenere").show();
	$("#btn-velocidadDVigenere").show();
	$("#btn-cancelarDescifrarVigenere").hide();

	deleteErrorVigenere("textoPlanoVigenere");
	deleteErrorVigenere("llaveCifradoVigenere");
	deleteErrorVigenere("textoPlanoCifradoVigenere");
	deleteErrorVigenere("llaveDescifradoVigenere");
}

function crearTablaTritemioC(){
	var criptograma_length = $('#in-textoPlanoVigenere').val().length;
	$("#table-Vigenere1-2").append('<tr id="VIrow2T"><td>&shy;</td></tr>');

	for(var i = 0 ; i < alfabeto.length ; i++){
		$("#VIrow2T").append('<td id="VIcell2T-' + i +'">' + alfabeto[i] + '</td>');
		$("#VIcell2T-"+i).addClass('title-table');
	}

	for (var i = 0 ; i < alfabeto.length ; i++) {
		matrizVigenere[i] = new Array(alfabeto.length);
		$("#table-Vigenere1-2").append('<tr id="VIrow2-'+i+'"></tr>');
		$("#VIrow2-"+i).append('<td id="VIcell2C-'+i+'">'+alfabeto[i]+'</td>');
		$("#VIcell2C-"+i).addClass('title-table');

		for(var j = i ; j < i + alfabeto.length ; j++){
			$("#VIrow2-"+i).append('<td id="VIcell2-'+i+'-'+ (j-i) +'">'+alfabeto[j%alfabeto.length].toUpperCase()+'</td>');
			matrizVigenere[i][j-i] = alfabeto[j%alfabeto.length].toUpperCase();
		}
	}

	for(var i = 0 ; i < criptograma_length ; i++){
		$('#textoCifradoVigenere').append('<label class="circulo" id="VI-Ccell1'+i+'"></label>');
	}

	$("#table-Vigenere1-2").css("text-align","center");
}

function crearTablaTritemioD(){
	var mensaje_claro_length = $('#in-textoPlanoCifradoVigenere').val().length;
	$("#table-Vigenere2-2").append('<tr id="VIrow22T"><td>&shy;</td></tr>');

	for(var i = 0 ; i < alfabeto.length ; i++){
		$("#VIrow22T").append('<td id="VIcell22T-' + i +'">' + alfabeto[i] + '</td>');
		$("#VIcell22T-"+i).addClass('title-table');
	}

	for (var i = 0 ; i < alfabeto.length ; i++) {
		matrizVigenere[i] = new Array(alfabeto.length);
		$("#table-Vigenere2-2").append('<tr id="VIrow22-'+i+'"></tr>');
		$("#VIrow22-"+i).append('<td id="VIcell22C-'+i+'">'+alfabeto[i]+'</td>');
		$("#VIcell22C-"+i).addClass('title-table');

		for(var j = i; j < i + alfabeto.length ; j++){
			$("#VIrow22-"+i).append('<td id="VIcell22-'+i+'-'+ (j-i) +'">'+alfabeto[j%alfabeto.length].toUpperCase()+'</td>');
			matrizVigenere[i][j-i] = alfabeto[j%alfabeto.length].toUpperCase();
		}
	}

	for(var i = 0 ; i < mensaje_claro_length ; i++){
		$('#textoDescifradoVigenere').append('<label class="circulo" id="VI-MCcell1'+i+'"></label>');
	}

	$("#table-Vigenere2-2").css("text-align","center");
}

function limpiaPanelCifradoVigenere(){
	$("#table-Vigenere1-2").empty();
	$("#VIrow1-0").empty();
	$("#VIrow1-1").empty();
	$("#VIrowblank").empty();
	$("#in-textoPlanoVigenere").val("");
	$("#in-llaveCifradoVigenere").val("");
	$("#out-textoCifradoVigenere").val("");
	$("#textoCifradoVigenere").html("");

	if($('#VIdiv1').is(':visible')) {
		$("#VIdiv1").slideToggle(500);
	}
}

function limpiaPanelDescifradoVigenere(){
	$("#table-Vigenere2-2").empty();
	$("#VIrow21-0").empty();
	$("#VIrow21-1").empty();
	$("#VIrowblank2").empty();
	$("#in-textoPlanoCifradoVigenere").val("");
	$("#in-llaveDescifradoVigenere").val("");
	$("#out-textoDescifradoVigenere").val("");
	$("#textoDescifradoVigenere").html("");

	if($('#VIdiv2').is(':visible')) {
		$("#VIdiv2").slideToggle(500);
	}
}

async function cifrarVigenere(){
	var plano = ($("#in-textoPlanoVigenere").val().toLowerCase().replace(/ /g, "")).split("");
    var llave = ($("#in-llaveCifradoVigenere").val().toLowerCase()).split("");
    var texto_length = plano.length;
    var cadenaCifrado = "";
    
    limpiaPanelCifradoVigenere();
    $("#in-textoPlanoVigenere").val(plano.join(""));
    $("#in-llaveCifradoVigenere").val(llave.join(""));

	$('#VIdiv1').html('A cada carácter del texto plano se le hace coincidir con un carácter de la llave, si ésta es más corta que el mensaje en claro se repite las veces que sea necesario.');
	$('#VIdiv1').slideToggle(500);

	$('#btn-cancelarCifrarVigenere').scrollViewVigenere();

	if(cancelado){
		return;
	}

	await sleepVigenere(7000);

	if(cancelado){
		return;
	}

	$("#table-Vigenere1-1").css("text-align","center");
	$("#VIrow1-0").append('<td>Texto Plano</td>');
	$("#VIrow1-1").append('<td>Llave</td>');
	$("#VIrowblank").append('<td></td>');

	for (var i = 0 ; i < texto_length && !cancelado; i++) {
		$("#VIrow1-0").append('<td id="VIcell1-0-'+i+'"></td>');
		$("#VIrow1-1").append('<td id="VIcell1-1-'+i+'"></td>');
		$("#VIrowblank").append('<td></td>');
	}

	if(cancelado){
		return;
	}

	await sleepVigenere(1000);

	if(cancelado){
		return;
	}

	$('#btn-cancelarCifrarVigenere').scrollViewVigenere();

    for(var i = 0 ; i < plano.length && !cancelado ; i++){
    	$('#VIcell1-0-'+i).html(plano[i]);

    	putparpadeo("#VIcell1-0-"+i, 0.5, azul);
		await sleepVigenere(500);
		removeputparpadeo("#VIcell1-0-"+i, 0.5, azul);
    }

    for(var i = 0 ; i < plano.length && !cancelado ; i++){
    	$('#VIcell1-1-'+i).html(llave[i%llave.length]);

    	putparpadeo('#VIcell1-1-'+i, 0.5, azul);
    	await sleepVigenere(500);
		removeputparpadeo('#VIcell1-1-'+i, 0.5, azul);
    }

    if(cancelado){
		return;
	}

    await sleepVigenere(1000);

    if(cancelado){
		return;
	}

    //Cifrar
    $('#VIdiv1').slideToggle(500);
    
    await sleepVigenere(1000);

    if(cancelado){
		return;
	}
    
    $('#VIdiv1').html('Se hace uso del cuadrado de Vigenère. La primer fila de la matriz corresponde a los caracteres del mensaje claro y la primera columna a los caracteres de la llave.');
	$('#VIdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVigenere(8000);

	if(cancelado){
		return;
	}
	
	crearTablaTritemioC();

	if(cancelado){
		return;
	}

	$('#VIdiv1').slideToggle(500);
	
	await sleepVigenere(1000);

    $('#VIdiv1').html('El texto cifrado es aquel carácter que resulte de la intersección de la fila y la columna de donde se encuentren los caracteres de la llave y el texto plano respectivamente.');
	$('#VIdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVigenere(7000);

	if(cancelado){
		return;
	}

	$('#VIdiv1').scrollViewVigenere();

    for(var i = 0 ; i < plano.length && !cancelado ; i++){
    	putparpadeo('#VIcell1-1-'+i, 3*velocidad, azul); //Llave
    	putparpadeo('#VIcell2C-'+alfabeto.indexOf(llave[i%llave.length]), 3*velocidad, azul);

    	for(var j = 0 ; j < alfabeto.length && !cancelado ; j++){
    		putparpadeo('#VIcell2-'+(alfabeto.indexOf(llave[i%llave.length]))+'-'+j, 3*velocidad, azul);
    	}

    	await sleepVigenere(1000*velocidad);

    	putparpadeo('#VIcell1-0-'+i, 2*velocidad, amarillo); //Texto
    	putparpadeo('#VIcell2T-'+alfabeto.indexOf(plano[i]), 2*velocidad, amarillo);

    	for(var j = 0 ; j < alfabeto.length && !cancelado ; j++){
    		putparpadeo('#VIcell2-'+j+"-"+alfabeto.indexOf(plano[i]), 2*velocidad, amarillo);
    	}

    	await sleepVigenere(1000*velocidad);

    	removeputparpadeo('#VIcell2-'+alfabeto.indexOf(llave[i%llave.length])+"-"+alfabeto.indexOf(plano[i]), 2*velocidad, amarillo);
    	removeputparpadeo('#VIcell2-'+alfabeto.indexOf(llave[i%llave.length])+"-"+alfabeto.indexOf(plano[i]), 3*velocidad, azul);
    	
    	putparpadeo('#VIcell2-'+alfabeto.indexOf(llave[i%llave.length])+"-"+alfabeto.indexOf(plano[i]), 1*velocidad, verde);
    	putparpadeo("#VI-Ccell1"+i, 1*velocidad, negro);
	    $("#VI-Ccell1"+i).html(matrizVigenere[alfabeto.indexOf(llave[i%llave.length])][alfabeto.indexOf(plano[i])]);
    	
    	cadenaCifrado = cadenaCifrado + matrizVigenere[alfabeto.indexOf(llave[i%llave.length])][alfabeto.indexOf(plano[i])];
	   
	    await sleepVigenere(1000*velocidad);

	    for(var j = 0 ; j < alfabeto.length && !cancelado ; j++){
    		removeputparpadeo('#VIcell2-'+(alfabeto.indexOf(llave[i%llave.length]))+'-'+j, 3*velocidad, azul);
    	}
    	
    	for(var j = 0 ; j < alfabeto.length && !cancelado ; j++){
    		removeputparpadeo('#VIcell2-'+j+"-"+alfabeto.indexOf(plano[i]), 2*velocidad, amarillo);
    	}

    	removeputparpadeo('#VIcell2-'+alfabeto.indexOf(llave[i%llave.length])+"-"+alfabeto.indexOf(plano[i]), 1*velocidad, verde);
    	removeputparpadeo('#VIcell1-1-'+i, 3*velocidad, azul); //Llave
    	removeputparpadeo('#VIcell2C-'+alfabeto.indexOf(llave[i%llave.length]), 3*velocidad, azul);
    	removeputparpadeo('#VIcell1-0-'+i, 2*velocidad, amarillo); //Texto
    	removeputparpadeo('#VIcell2T-'+alfabeto.indexOf(plano[i]), 2*velocidad, amarillo);
    	removeputparpadeo("#VI-Ccell1"+i, 1*velocidad, negro);

    	await sleepVigenere(100);
    }

    if(cancelado){
		return;
	}

	$("#out-textoCifradoVigenere").val(cadenaCifrado);
	$("#btn-velocidadCVigenere").show();
    $("#btn-cifrarVigenere").show();
	$("#btn-cancelarCifrarVigenere").hide();

	if(!cancelado){
		$('#VIdiv1').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_7);
    }
}

async function descifrarVigenere(){
	var cifrado = ($("#in-textoPlanoCifradoVigenere").val().toUpperCase()).split("");
    var llave = ($("#in-llaveDescifradoVigenere").val().toUpperCase()).split("");
    var texto_length = cifrado.length;
    var cadenaDescifrado = "";
    var pintar = true;
    
    limpiaPanelDescifradoVigenere();
    $("#in-textoPlanoCifradoVigenere").val(cifrado.join(""));
    $("#in-llaveDescifradoVigenere").val(llave.join(""));

    $('#VIdiv2').html('A cada carácter del texto cifrado se le hace coincidir con un carácter de la llave, si ésta es más corta que el texto cifrado se repite las veces que sea necesario.');
	$('#VIdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	$('#btn-cancelarDescifrarVigenere').scrollViewVigenere();

	await sleepVigenere(7000);
	
	if(cancelado){
		return;
	}

	$("#table-Vigenere2-1").css("text-align","center");
	$("#VIrow21-0").append('<td>Texto cifrado</td>');
	$("#VIrow21-1").append('<td>Llave</td>');
	$("#VIrowblank2").append('<td></td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VIrow21-0").append('<td id="VIcell21-0-'+i+'"></td>');
		$("#VIrow21-1").append('<td id="VIcell21-1-'+i+'"></td>');
		$("#VIrowblank2").append('<td></td>');
	}
    
    if(cancelado){
		return;
	}

	$('#btn-cancelarDescifrarVigenere').scrollViewVigenere();

    for(var i = 0 ; i < cifrado.length ; i++){
    	$('#VIcell21-0-'+i).html(cifrado[i]);

    	putparpadeo("#VIcell21-0-"+i, 0.5, azul);
		await sleepVigenere(500);
		removeputparpadeo("#VIcell21-0-"+i, 0.5, azul);
    }

    for(var i = 0 ; i < cifrado.length ; i++){
    	$('#VIcell21-1-'+i).html(llave[i%llave.length]);

    	putparpadeo('#VIcell21-1-'+i, 0.5, azul);
		await sleepVigenere(500);
		removeputparpadeo('#VIcell21-1-'+i, 0.5, azul);
    }

    if(cancelado){
		return;
	}

    await sleepVigenere(1000);

    if(cancelado){
		return;
	}

    //Descifrado
     $('#VIdiv2').slideToggle(500);
    
    await sleepVigenere(1000);

    $('#VIdiv2').html('Se hace uso del cuadrado de Vigenère. La primer fila de la matriz corresponde a los caracteres del mensaje claro y la primera columna a los caracteres de la llave.');
	$('#VIdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVigenere(8000);
	
	if(cancelado){
		return;
	}

	crearTablaTritemioD();

	if(cancelado){
		return;
	}

	$('#VIdiv2').slideToggle(500);
	
	await sleepVigenere(1000);

    $('#VIdiv2').html('Se busca en la primer columna la letra de la llave y se recorre la fila hasta encontrar el caracter del texto cifrado. La letra que esté al inicio de esa columna es la letra del mensaje claro.');
	$('#VIdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVigenere(8000);
	
	if(cancelado){
		return;
	}

	$('#VIdiv2').scrollViewVigenere();

    for(var i = 0 ; i < cifrado.length && !cancelado ; i++){
    	pintar = true;

    	putparpadeo('#VIcell21-1-'+i, 3*velocidad, azul);
    	putparpadeo('#VIcell22C-'+alfabeto.indexOf(llave[i%llave.length].toLowerCase()), 3*velocidad, azul);

    	for(j = 0 ; j < alfabeto.length && pintar == true ; j++){
    		putparpadeo('#VIcell22-'+alfabeto.indexOf(llave[i%llave.length].toLowerCase())+"-"+j, 3*velocidad, azul);
    		
	    	if(cifrado[i] == matrizVigenere[alfabeto.indexOf(llave[i%llave.length].toLowerCase())][j]){
	    		pintar = false;
	    	}
	    }
    	
    	await sleepVigenere(1000*velocidad);
    	j--;
		
		putparpadeo('#VIcell21-0-'+i, 2*velocidad, amarillo);
		putparpadeo('#VIcell22T-'+j, 2*velocidad, amarillo);
    	
    	for(var k = alfabeto.indexOf(llave[i%llave.length].toLowerCase()) ; k >= 0 ; k--){
	    	putparpadeo('#VIcell22-'+k+'-'+j, 2*velocidad, amarillo);
	    }
		
		await sleepVigenere(1000*velocidad);

		removeputparpadeo('#VIcell22T-'+j, 2*velocidad, amarillo);
		
		putparpadeo('#VIcell22T-'+j, 1*velocidad, verde);
		putparpadeo("#VI-MCcell1"+i, 1*velocidad, negro);
    	
    	$("#VI-MCcell1"+i).html(matrizVigenere[0][j].toLowerCase());
    	
    	cadenaDescifrado = cadenaDescifrado + matrizVigenere[0][j].toLowerCase();

	    await sleepVigenere(1000*velocidad);
		pintar = true;
	    
	    removeputparpadeo('#VIcell22T-'+j, 1*velocidad, verde);
	    
    	for(j = 0 ; j < alfabeto.length && pintar == true ; j++){
	    	removeputparpadeo('#VIcell22-'+alfabeto.indexOf(llave[i%llave.length].toLowerCase())+"-"+j, 3*velocidad, azul);

	    	if(cifrado[i] == matrizVigenere[j][alfabeto.indexOf(llave[i%llave.length].toLowerCase())]){
	    		pintar = false;
	    	}
	    }

	    j--;

    	for(var k = alfabeto.indexOf(llave[i%llave.length].toLowerCase()) ; k >= 0 ; k--){
	    	removeputparpadeo('#VIcell22-'+k+'-'+j, 2*velocidad, amarillo);
	    }

	    removeputparpadeo('#VIcell21-1-'+i, 3*velocidad, azul);
    	removeputparpadeo('#VIcell22C-'+alfabeto.indexOf(llave[i%llave.length].toLowerCase()), 3*velocidad, azul);
	    removeputparpadeo('#VIcell21-0-'+i, 2*velocidad, amarillo);
	    removeputparpadeo("#VI-MCcell1"+i, 1*velocidad, negro);

		await sleepVigenere(100);
    }

    if(cancelado){
		return;
	}

	$("#out-textoDescifradoVigenere").val(cadenaDescifrado);
	$("#btn-velocidadDVigenere").show();
    $("#btn-descifrarVigenere").show();
	$("#btn-cancelarDescifrarVigenere").hide();

	if(!cancelado){
		$('#VIdiv2').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_8);
    }
}

function validarEntradaTextoCVigenere(){
	var mensaje = "";
	var texto = $('#in-textoPlanoVigenere').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarEntradaLlaveCVigenere(){
	var mensaje = "";
	var llave = $('#in-llaveCifradoVigenere').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if (llave.length < 1 || llave.length > 10) {
		mensaje = mensaje_19;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaTextoDVigenere(){
	var mensaje = "";
	var texto = $('#in-textoPlanoCifradoVigenere').val();

	if(texto.indexOf(' ') >= 0){
		mensaje = mensaje_4;
	}
	else if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_3;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_5;
	}

	return mensaje;
}

function validarEntradaLlaveDVigenere(){
	var mensaje = "";
	var llave = $('#in-llaveDescifradoVigenere').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if (llave.length < 1 || llave.length > 10) {
		mensaje = mensaje_19;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaLlaveCArchivoVigenere(){
	var mensaje = "";
	var llave = $('#in-llaveCifradoArchivoVigenere').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if(llave.length < 1 || llave.length > 1000){
		mensaje = mensaje_95;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaCArchivoVigenere(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputCVigenere');
	var file;
	
	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = mensaje_89;
		}
		else if(file.size > 1024*100){
			mensaje = mensaje_90;
		}
	}

	return mensaje;
}

function validarEntradaLlaveDArchivoVigenere(){
	var mensaje = "";
	var llave = $('#in-llaveDescifradoArchivoVigenere').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if(llave.length < 1 || llave.length > 1000){
		mensaje = mensaje_95;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaDArchivoVigenere(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputDVigenere');
	var file;

	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = mensaje_89;
		}
		if(file.size > 1024*100){
			mensaje = mensaje_90;
		}
	}

	return mensaje;
}

function addErrorVigenere(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorVigenere(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoVigenereC1").click(function(){
        $("#btn-cifrarVigenere").html('Cifrado Rápido');
        $("#btn-cifrarVigenere").val(1);
    });
    $("#tipoVigenereC2").click(function(){
        $("#btn-cifrarVigenere").html('Cifrado Normal');
        $("#btn-cifrarVigenere").val(2);
    });
    $("#tipoVigenereC3").click(function(){
        $("#btn-cifrarVigenere").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarVigenere").val(3);
    });

    $("#tipoVigenereD1").click(function(){
        $("#btn-descifrarVigenere").html('Descifrado Rápido');
        $("#btn-descifrarVigenere").val(1);
    });
    $("#tipoVigenereD2").click(function(){
        $("#btn-descifrarVigenere").html('Descifrado Normal');
        $("#btn-descifrarVigenere").val(2);
    });
    $("#tipoVigenereD3").click(function(){
        $("#btn-descifrarVigenere").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarVigenere").val(3);
    });

    $("#in-textoPlanoVigenere").keyup(function(){
        var mensaje = validarEntradaTextoCVigenere();

        if($("#in-textoPlanoVigenere").val().length == 0){
        	deleteErrorVigenere("textoPlanoVigenere");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorVigenere("textoPlanoVigenere", mensaje);
	        } else{
	            deleteErrorVigenere("textoPlanoVigenere");
	        }
	    }
    });

    $("#in-llaveCifradoVigenere").keyup(function(){
        var mensaje = validarEntradaLlaveCVigenere();

        if($("#in-llaveCifradoVigenere").val().length == 0){
        	deleteErrorVigenere("llaveCifradoVigenere");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorVigenere("llaveCifradoVigenere", mensaje);
	        } else{
	            deleteErrorVigenere("llaveCifradoVigenere");
	        }
	    }
    });

    $("#in-textoPlanoCifradoVigenere").keyup(function(){
        var mensaje = validarEntradaTextoDVigenere();

        if($("#in-textoPlanoCifradoVigenere").val().length == 0){
        	deleteErrorVigenere("textoPlanoCifradoVigenere");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorVigenere("textoPlanoCifradoVigenere", mensaje);
	        } else{
	            deleteErrorVigenere("textoPlanoCifradoVigenere");
	        }
	    }
    });

    $("#in-llaveDescifradoVigenere").keyup(function(){
        var mensaje = validarEntradaLlaveDVigenere();

        if($("#in-llaveDescifradoVigenere").val().length == 0){
        	deleteErrorVigenere("llaveDescifradoVigenere");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorVigenere("llaveDescifradoVigenere", mensaje);
	        } else{
	            deleteErrorVigenere("llaveDescifradoVigenere");
	        }
	    }
    });

    $("#in-llaveCifradoArchivoVigenere").keyup(function(){
        var mensaje = validarEntradaLlaveCArchivoVigenere();

        if($("#in-llaveCifradoArchivoVigenere").val().length == 0){
        	deleteErrorVigenere("llaveCifradoArchivoVigenere");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorVigenere("llaveCifradoArchivoVigenere", mensaje);
	        } else{
	            deleteErrorVigenere("llaveCifradoArchivoVigenere");
	        }
	    }
    });

    $("#fileInputCVigenere").change(function(){
        var mensaje = validarEntradaCArchivoVigenere();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaCVigenere').html(mensaje);
        } else{
            $('#fileDisplayAreaCVigenere').html();
        }
    });

    $("#in-llaveDescifradoArchivoVigenere").keyup(function(){
        var mensaje = validarEntradaLlaveDArchivoVigenere();

        if($("#in-llaveDescifradoArchivoVigenere").val().length == 0){
        	deleteErrorVigenere("llaveDescifradoArchivoVigenere");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorVigenere("llaveDescifradoArchivoVigenere", mensaje);
	        } else{
	            deleteErrorVigenere("llaveDescifradoArchivoVigenere");
	        }
	    }
    });

    $("#fileInputDVigenere").keyup(function(){
        var mensaje = validarEntradaDArchivoVigenere();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaDVigenere').html(mensaje);
        } else{
            $('#fileDisplayAreaDVigenere').html();
        }
    });

	$("#btn-cifrarVigenere").click(function(){
		var mensajetexto = validarEntradaTextoCVigenere();
		var mensajellave = validarEntradaLlaveCVigenere();

		if(mensajetexto.length == 0 && mensajellave.length == 0){
			$("#textoPlanoVigenere-error").remove();
            $("#llaveCifradoVigenere-error").remove();
            $("#in-textoPlanoVigenere").removeClass('input-error');
            $("#in-llaveCifradoVigenere").removeClass('input-error');

            if($('#btn-cifrarVigenere').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarVigenere').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCVigenere").hide();
            $("#btn-cifrarVigenere").hide();
            $("#btn-cancelarCifrarVigenere").show();
            cancelado = false;
            
            cifrarVigenere();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorVigenere("textoPlanoVigenere", mensajetexto);
			}
			if(mensajellave.length > 0){
				addErrorVigenere("llaveCifradoVigenere", mensajellave);
			}
		}
	});

	$("#btn-cancelarCifrarVigenere").click(function(){
        cancelado = true;

        limpiaPanelCifradoVigenere();

        $("#btn-cifrarVigenere").show();
        $("#btn-velocidadCVigenere").show();
        $("#btn-cancelarCifrarVigenere").hide();
    });

    $("#btn-cancelarDescifrarVigenere").click(function(){
        cancelado = true;

        limpiaPanelDescifradoVigenere();

        $("#btn-descifrarVigenere").show();
        $("#btn-velocidadDTransposisionVigenere").show();
        $("#btn-cancelarDescifrarVigenere").hide();
    });

    $("#btn-copiarTextoVigenere").click(function(){
        if ($("#out-textoCifradoVigenere").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-textoPlanoCifradoVigenere").val($("#out-textoCifradoVigenere").val());
			$("#in-llaveDescifradoVigenere").val($("#in-llaveCifradoVigenere").val());

			if(validarEntradaTextoDVigenere().length == 0){
				$("#textoPlanoCifradoVigenere-error").remove();
	            $("#in-textoPlanoCifradoVigenere").removeClass('input-error');
	        }

	        if (validarEntradaLlaveDVigenere().length == 0){
	        	$("#llaveDescifradoVigenere-error").remove();
	            $("#in-llaveDescifradoVigenere").removeClass('input-error');
	        }
		}
    });

    $("#btn-descifrarVigenere").click(function(){
        var mensajetexto = validarEntradaTextoDVigenere();
		var mensajellave = validarEntradaLlaveDVigenere();

		if(mensajetexto.length == 0 && mensajellave.length == 0){
			$("#textoPlanoCifradoVigenere-error").remove();
            $("#llaveDescifradoVigenere-error").remove();
            $("#in-textoPlanoCifradoVigenere").removeClass('input-error');
            $("#in-llaveDescifradoVigenere").removeClass('input-error');

            if($('#btn-descifrarVigenere').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarVigenere').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDVigenere").hide();
            $("#btn-descifrarVigenere").hide();
            $("#btn-cancelarDescifrarVigenere").show();
            cancelado = false;
            
            descifrarVigenere();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorVigenere("textoPlanoCifradoVigenere", mensajetexto);
			}
			if(mensajellave.length > 0){
				addErrorVigenere("llaveDescifradoVigenere", mensajellave);
			}
		}
    });

    $("#btn-cifrarArchivoVigenere").click(function(){
		var mensajellave = validarEntradaLlaveCArchivoVigenere();
		var mensajearchivo = validarEntradaCArchivoVigenere();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llaveCifradoArchivoVigenere-error").remove();
            $("#in-llaveCifradoArchivoVigenere").removeClass('input-error');

            cifrarArchivoVigenere();
		}
		else{
			if(mensajellave.length > 0){
				addErrorVigenere("llaveCifradoArchivoVigenere", mensajellave);
			}

			if(mensajearchivo.length > 0){
				$('#fileDisplayAreaCVigenere').html(mensajearchivo);
			}
		}
	});

	$("#btn-descifrarArchivoVigenere").click(function(){
		var mensajellave = validarEntradaLlaveDArchivoVigenere();
		var mensajearchivo = validarEntradaDArchivoVigenere();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llaveDescifradoArchivoVigenere-error").remove();
            $("#in-llaveDescifradoArchivoVigenere").removeClass('input-error');

            descifrarArchivoVigenere();
		}
		else{
			if(mensajellave.length > 0){
				addErrorVigenere("llaveDescifradoArchivoVigenere", mensajellave);
			}

			if(mensajearchivo.length > 0){
				$('#fileDisplayAreaDVigenere').html(mensajearchivo);
			}
		}
	});
});

function cifrarArchivoVigenere() {
	var fileInput = document.getElementById('fileInputCVigenere');
	var fileDisplayArea = $('#fileDisplayAreaCVigenere');
	var llave = $("#in-llaveCifradoArchivoVigenere").val().toLowerCase().split("");
	
	var textoPlano = "", textoCifrado = "";
	$("#progressbarVigenereCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if(fileInput.files.length == 0){
		$('#fileDisplayAreaCVigenere').html(mensaje_92);
		return;
	}

	var file = fileInput.files[0];
	var reader = new FileReader();

	reader.onload = function(e) {
		var l = 0;
		
		textoPlano = reader.result;
		textoPlano = textoPlano.toLowerCase();

		for(var i = 0 ; i < textoPlano.length ; i++) {
			if(alfabeto.includes(textoPlano.charAt(i))){
				textoCifrado = textoCifrado + alfabeto[(alfabeto.indexOf(textoPlano.charAt(i)) + alfabeto.indexOf(llave[l%llave.length])) % 27];

				l++;
			}
			//$("#progressbarVigenereCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
		}

		textoCifrado = textoCifrado.toUpperCase();
		
		fileDisplayArea.html(textoCifrado);
		textoCifrado= "\ufeff"+textoCifrado;
		
		//PARA DESCARGAR
		var file = new File([textoCifrado], "ArchivoCifradoVIGENERE.txt", {type: "text/plain;charset=ISO-8859-1"});
		saveAs(file);
		$("#progressbarVigenereCifrado").css('width','100%').attr('aria-valuenow', '100');
	}

	reader.readAsText(file, 'ISO-8859-1');
}

function descifrarArchivoVigenere(){
	var fileInput = document.getElementById('fileInputDVigenere');
	var fileDisplayArea = $('#fileDisplayAreaDVigenere');
	var llave = $("#in-llaveDescifradoArchivoVigenere").val().toLowerCase().split("");
	
	var textoCifrado = "", textoDescifrado = "";
	$("#progressbarVigenereDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaDVigenere').html(mensaje_93);
		return;
	}

	var file = fileInput.files[0];
	var reader = new FileReader();

	reader.onload = function(e) {
		var l = 0;
		
		textoCifrado = reader.result;
		textoCifrado = textoCifrado.toLowerCase();

		for(var i = 0 ; i < textoCifrado.length ; i++) {
			if(alfabeto.includes(textoCifrado.charAt(i))){
				textoDescifrado = textoDescifrado + alfabeto[(alfabeto.indexOf(textoCifrado.charAt(i)) + (27 - alfabeto.indexOf(llave[l%llave.length]))) % 27];

				l++;
			}
			//$("#progressbarVigenereDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
		}
		
		fileDisplayArea.html(textoDescifrado);
		textoDescifrado= "\ufeff"+textoDescifrado;
		
		//PARA DESCARGAR
		var file = new File([textoDescifrado], "ArchivoDescifradoVIGENERE.txt", {type: "text/plain;charset=ISO-8859-1"});
		saveAs(file);
		$("#progressbarVigenereDescifrado").css('width','100%').attr('aria-valuenow', '100');
	}

	reader.readAsText(file, 'ISO-8859-1');
}