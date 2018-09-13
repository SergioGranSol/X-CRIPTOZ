function sleepVernam(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var matriz_texto = [];
var matriz_clave = [];
var matriz_cifrado = [];
var cancelado = false;
var velocidad = 1;

$.fn.scrollViewVernam = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelVernam(){
	$("#pnl-Interactivo3").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function crearPanelCifradoVernam(criptograma_length){
	for(var i = 0 ; i < criptograma_length ; i++){
		$('#textoCifradoVernam').append('<label class="circulo" id="VE-Ccell1'+i+'"></label>');
	}

	$("#table-Vernam1").css("text-align","center");
	$("#table-Vernam2").css("text-align","center");
	$("#table-Vernam3").css("text-align","center");
	$("#table-Vernam4").css("text-align","center");
	$("#table-Vernam5").css("text-align","center");
}

function crearPanelDescifradoVernam(){
	var mensaje_claro_length = $('#in-textoPlanoCifradoVernam').val().length;

	for(var i = 0 ; i < mensaje_claro_length ; i++){
		$('#textoDescifradoVernam').append('<label class="circulo" id="VE-MCcell1'+i+'"></label>');
	}

	$("#table-Vernam21").css("text-align","center");
	$("#table-Vernam22").css("text-align","center");
	$("#table-Vernam23").css("text-align","center");
	$("#table-Vernam24").css("text-align","center");
	$("#table-Vernam25").css("text-align","center");
}

function cerrarPanelVernam(){
	cancelado = true;

	$("#pnl-Interactivo3").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCifradoVernam();
	limpiaPanelDescifradoVernam();

	$("#btn-cifrarVernam").show();
	$("#btn-velocidadCVernam").show();
	$("#btn-cancelarCifrarVernam").hide();

	$("#btn-descifrarVernam").show();
	$("#btn-velocidadDVernam").show();
	$("#btn-cancelarDescifrarVernam").hide();

	$("#textoPlanoVernam-error").remove();
	$("#in-textoPlanoVernam").removeClass('input-error');
	$("#textoPlanoCifradoVernam-error").remove();
	$("#in-textoPlanoCifradoVernam").removeClass('input-error');
	$("#claveDVernam-error").remove();
	$("#in-claveDescifradoVernam").removeClass('input-error');
}

function limpiaPanelCifradoVernam(){
	$("#VErow0").empty();
	$("#VErow1").empty();
	$("#VErow2").empty();
	$("#VErow3").empty();
	$("#VErow4").empty();
	$("#VErow5").empty();
	$("#VErow6").empty();
	$("#VErow7").empty();
	$("#textoCifradoVernam").html("");
	$("#in-textoPlanoVernam").val("");
	$("#out-textoCifradoVernam").val("");
	$("#out-claveCifradoVernam").val("");

	if($('#VEdiv1').is(':visible')) {
		$("#VEdiv1").slideToggle(500);
	}
}

function limpiaPanelDescifradoVernam(){
	$("#VErow200").empty();
	$("#VErow20").empty();
	$("#VErow21").empty();
	$("#VErow22").empty();
	$("#VErow233").empty();
	$("#VErow23").empty();
	$("#VErow24").empty();
	$("#VErow25").empty();
	$("#VErow26").empty();
	$("#textoDescifradoVernam").html("");
	$("#in-textoPlanoCifradoVernam").val("");
	$('#in-claveDescifradoVernam').val("");
	$("#out-textoDescifradoVernam").val("");

	if($('#VEdiv2').is(':visible')) {
		$("#VEdiv2").slideToggle(500);
	}
}

function binario (numero) {
  	for (var nFlag = 0, nShifted = numero, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  	
  	return sMask.substring(24);
}

function generarClave(tamanio){
	var clave = [];

	for(var i = 0 ; i < tamanio ; i++){
		clave[i] = Math.round(Math.random()*255);
	}

	return clave;
}

async function cifrarVernam(){
	var plano = ($("#in-textoPlanoVernam").val().toLowerCase()).split("");
	var texto_length = plano.length;
	var cadenaCifrado = "";
	var clave = [];
	var aux = "";
	var k = 0;
	var bin = "";
	
	limpiaPanelCifradoVernam();
	$("#in-textoPlanoVernam").val(plano.join(""));

	crearPanelCifradoVernam(plano.length);

	//Texto Plano
	$('#VEdiv1').html('Se convierte el texto plano en una cadena de bits la cual se representa en codigo ASCII');
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(5000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv1').scrollViewVernam();
	
	$("#VErow0").append('<td>Mensaje Claro</td>');
	$("#VErow1").append('<td>Mensaje Claro ASCII</td>');
	$("#VErow2").append('<td>Mensaje Claro Binario</td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VErow0").append('<td id="VEcell-0-' + i + '">&nbsp&nbsp</td>');
		$("#VErow1").append('<td id="VEcell-1-' + i + '">&nbsp&nbsp</td>');
	}

	for(var i = 0 ; i < texto_length*8 ; i++){
		$("#VErow2").append('<td id="VEcell-2-' + i + '">&nbsp&nbsp</td>');
	}

	if(cancelado){
		return;
	}

	await sleepVernam(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < plano.length && !cancelado ; i++){
		$('#VEcell-0-'+i).html(plano[i]);
		putparpadeo('#VEcell-0-'+i, 3*velocidad, azul);
		await sleepVernam(1000*velocidad);

		$('#VEcell-1-'+i).html(plano[i].charCodeAt());
		putparpadeo('#VEcell-1-'+i, 2*velocidad, azul);
		await sleepVernam(1000*velocidad);

		bin = binario(plano[i].charCodeAt());

		for(var j = 0 ; j < 8 && !cancelado ; j++, k++){
			$('#VEcell-2-'+k).html(bin[j]);
			putparpadeo('#VEcell-2-'+k, 1*velocidad, azul);

			matriz_texto[k] = bin[j].charCodeAt()-48;
		}
		await sleepVernam(1000*velocidad);

		removeputparpadeo('#VEcell-0-'+i, 3*velocidad, azul);
		removeputparpadeo('#VEcell-1-'+i, 2*velocidad, azul);

		k = k-8;

		for(var j = 0 ; j < 8 ; j++, k++){
			removeputparpadeo('#VEcell-2-'+k, 1*velocidad, azul);
		}
	}

	if(cancelado){
		return;
	}

	//Clave
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(1000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv1').html("Se genera una secuencia binaria aleatoria del mismo tamaño que el texto plano, la cual será la clave de cifrado.");
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(6000);

	if(cancelado){
		return;
	}

	$("#VErow3").append('<td>Llave Binaria</td>');
	$("#VErow4").append('<td>Llave</td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VErow4").append('<td id="VEcell-4-' + i + '">&nbsp&nbsp</td>');
	}

	for(var i = 0 ; i < texto_length*8 ; i++){
		$("#VErow3").append('<td id="VEcell-3-' + i + '">&nbsp&nbsp</td>');
	}

	if(cancelado){
		return;
	}

	await sleepVernam(1000);

	if(cancelado){
		return;
	}

	clave = generarClave(plano.length);
	k = 0;
	
	for(var i = 0 ; i < clave.length && !cancelado ; i++){
		bin = binario(clave[i]);

		for(var j = 0 ; j < 8 ; j++, k++){
			$('#VEcell-3-'+k).html(bin[j]);
			putparpadeo('#VEcell-3-'+k, 2*velocidad, azul);

			matriz_clave[k] = bin[j].charCodeAt()-48;
		}

		await sleepVernam(1000*velocidad);

		$('#VEcell-4-'+i).html(clave[i]);
		putparpadeo('#VEcell-4-'+i, 1*velocidad, azul);

		await sleepVernam(1000*velocidad);

		k = k-8;
		for(var j = 0 ; j < 8 ; j++, k++){
			removeputparpadeo('#VEcell-3-'+k, 2*velocidad, azul);
		}

		removeputparpadeo('#VEcell-4-'+i, 1*velocidad, azul);
		$('#VEcell-4-'+i).removeClass('parpadeo1s-azul');
	}

	//XOR
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(1000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv1').html("Aplicar una operación OR exclusiva (XOR), bit a bit entre el mensaje claro y la llave de cifrado para obtener el criptográma.");
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(6000);

	if(cancelado){
		return;
	}

	$("#VErow5").append('<td>Criptográma Binario</td>');
	
	for(var i = 0 ; i < texto_length*8 ; i++){
		$("#VErow5").append('<td id="VEcell-5-' + i + '">&nbsp&nbsp</td>');
	}

	if(cancelado){
		return;
	}

	await sleepVernam(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < matriz_texto.length && !cancelado ; i++){
		if(i < 4){
			putparpadeo('#VEcell-2-'+i, 1.5*velocidad, azul);
			await sleepVernam(500*velocidad);

			putparpadeo('#VEcell-3-'+i, 1*velocidad, azul);
			await sleepVernam(500*velocidad);
		}

		matriz_cifrado[i] = (matriz_texto[i] == matriz_clave[i])?0:1;

		$('#VEcell-5-'+i).html((matriz_texto[i] == matriz_clave[i])?0:1);
		
		if(i < 4){
			putparpadeo('#VEcell-5-'+i, 0.5*velocidad, azul);
			await sleepVernam(500*velocidad);
			
			removeputparpadeo('#VEcell-2-'+i, 1.5*velocidad, azul);
			removeputparpadeo('#VEcell-3-'+i, 1*velocidad, azul);
			removeputparpadeo('#VEcell-5-'+i, 0.5*velocidad, azul);
		}
	}

	//Mostrar cifrado
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(1000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv1').html("Finalmente se convierte el criptográma a caracteres ASCII");
	$('#VEdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(4000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv1').scrollViewVernam();

	$("#VErow6").append('<td>Criptográma ASCII</td>');
	$("#VErow7").append('<td>Criptográma</td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VErow6").append('<td id="VEcell-6-' + i + '">&nbsp&nbsp</td>');
		$("#VErow7").append('<td id="VEcell-7-' + i + '">&nbsp&nbsp</td>');
	}

	if(cancelado){
		return;
	}

	await sleepVernam(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < plano.length && !cancelado ; i++){
		aux = "";

		for(var j = i*8 ; j < i*8 + 8 ; j++){
			aux = aux + matriz_cifrado[j];

			putparpadeo('#VEcell-5-'+j, 3*velocidad, azul);
		}

		await sleepVernam(1000*velocidad);

		$('#VEcell-6-'+i).html(parseInt(aux, 2));
		putparpadeo('#VEcell-6-'+i, 2*velocidad, azul);
		await sleepVernam(1000*velocidad);
		
		$('#VEcell-7-'+i).html(String.fromCharCode(parseInt(aux, 2)));
		putparpadeo('#VEcell-7-'+i, 1*velocidad, azul);
		putparpadeo("#VE-Ccell1"+i, 1*velocidad, negro);
	    $("#VE-Ccell1"+i).html(String.fromCharCode(parseInt(aux, 2)));
		await sleepVernam(1000*velocidad);
		
		cadenaCifrado = cadenaCifrado + String.fromCharCode(parseInt(aux, 2));
		
		for(var j = i*8 ; j < i*8 + 8 ; j++){
			removeputparpadeo('#VEcell-5-'+j, 3*velocidad, azul);
		}

		removeputparpadeo('#VEcell-6-'+i, 2*velocidad, azul);
		removeputparpadeo('#VEcell-7-'+i, 1*velocidad, azul);
		removeputparpadeo("#VE-Ccell1"+i, 1*velocidad, negro);
	}

	 if(cancelado){
		return;
	}
	
	var clavetexto = "";

	for(var i = 0; i < clave.length ; i++){
		clavetexto = clavetexto + String.fromCharCode(clave[i]);
	}

	$("#out-textoCifradoVernam").val(cadenaCifrado.trim());
	$("#out-claveCifradoVernam").val(clavetexto);
	$("#btn-velocidadCVernam").show();
    $("#btn-cifrarVernam").show();
	$("#btn-cancelarCifrarVernam").hide();

	if(!cancelado){
		$('#VEdiv1').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_7);
    }
}

async function descifrarVernam(){
	var cifrado = ($("#in-textoPlanoCifradoVernam").val()).split("");
    var clave = ($("#in-claveDescifradoVernam").val()).split("");
    var texto_length = cifrado.length;
	var cadenaDescifrado = "";
	var aux = "";
	var k = 0;
	var bin = "";

	limpiaPanelDescifradoVernam();
    $("#in-textoPlanoCifradoVernam").val(cifrado.join(""));
    $("#in-claveDescifradoVernam").val(clave.join(""));

	crearPanelDescifradoVernam();

	//Texto Cifrado
	$('#VEdiv2').html('Se convierte el texto cifradoen una cadena de bits la cual se representa en codigo ASCII');
	$('#VEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(5000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv2').scrollViewVernam();

	$("#VErow200").append('<td>Criptograma</td>');
	$("#VErow20").append('<td>Criptograma ASCII</td>');
	$("#VErow21").append('<td>Criptograma binario</td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VErow200").append('<td id="VEcell2-00-' + i + '"></td>');
		$("#VErow20").append('<td id="VEcell2-0-' + i + '"></td>');
	}

	for(var i = 0 ; i < texto_length*8 ; i++){
		$("#VErow21").append('<td id="VEcell2-1-' + i + '"></td>');
	}

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < cifrado.length && !cancelado ; i++){
		$('#VEcell2-00-'+i).html(cifrado[i]);
		putparpadeo('#VEcell2-00-'+i, 3*velocidad, azul);
		await sleepVernam(1000*velocidad);

		$('#VEcell2-0-'+i).html(cifrado[i].charCodeAt());
		putparpadeo('#VEcell2-0-'+i, 2*velocidad, azul);
		await sleepVernam(1000*velocidad);

		bin = binario(parseInt(cifrado[i].charCodeAt(), 10));

		for(var j = 0 ; j < 8 ; j++, k++){
			$('#VEcell2-1-'+k).html(bin[j]);
			putparpadeo('#VEcell2-1-'+k, 1*velocidad, azul);

			matriz_cifrado[k] = bin[j].charCodeAt()-48;
		}

		await sleepVernam(1000*velocidad);

		removeputparpadeo('#VEcell2-00-'+i, 3*velocidad, azul);
		removeputparpadeo('#VEcell2-0-'+i, 2*velocidad, azul);

		k = k-8;

		for(var j = 0 ; j < 8 ; j++, k++){
			removeputparpadeo('#VEcell2-1-'+k, 1*velocidad, azul);
		}
	}

	//Clave
	$('#VEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(1000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv2').html("Se convierte la llave en una cadena de bits");
	$('#VEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(3000);

	if(cancelado){
		return;
	}

	$("#VErow22").append('<td>Llave Binaria</td>');
	$("#VErow233").append('<td>Llave ASCII</td>');
	$("#VErow23").append('<td>Llave</td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VErow233").append('<td id="VEcell2-33-' + i + '"></td>');
		$("#VErow23").append('<td id="VEcell2-3-' + i + '"></td>');
	}

	for(var i = 0 ; i < texto_length*8 ; i++){
		$("#VErow22").append('<td id="VEcell2-2-' + i + '"></td>');
	}

	if(cancelado){
		return;
	}

	k = 0;

	for(var i = 0 ; i < clave.length && !cancelado ; i++){
		$('#VEcell2-3-'+i).html(clave[i]);
		putparpadeo('#VEcell2-3-'+i, 3*velocidad, azul);

		await sleepVernam(1000*velocidad);

		$('#VEcell2-33-'+i).html(clave[i].charCodeAt());
		putparpadeo('#VEcell2-33-'+i, 2*velocidad, azul);

		await sleepVernam(1000*velocidad);

		bin = binario(parseInt(clave[i].charCodeAt(), 10));

		for(var j = 0 ; j < 8 && !cancelado ; j++, k++){
			$('#VEcell2-2-'+k).html(bin[j]);
			putparpadeo('#VEcell2-2-'+k, 1, azul);

			matriz_clave[k] = bin[j].charCodeAt()-48;
		}

		await sleepVernam(1000);

		removeputparpadeo('#VEcell2-3-'+i, 3*velocidad, azul);
		removeputparpadeo('#VEcell2-33-'+i, 2*velocidad, azul);

		k = k-8;

		for(var j = 0 ; j < 8 ; j++, k++){
			removeputparpadeo('#VEcell2-2-'+k, 1, azul);
		}
	}

	//XOR
	$('#VEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(1000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv2').html("Aplicar una operación OR exclusiva (XOR), bit a bit entre el texto cifradoy la llave para obtener el texto plano binario.");
	$('#VEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(5000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv2').scrollViewVernam();

	$("#VErow24").append('<td>Mensaje Claro Binario</td>');
	
	for(var i = 0 ; i < texto_length*8 ; i++){
		$("#VErow24").append('<td id="VEcell2-4-' + i + '">&nbsp&nbsp</td>');
	}

	if(cancelado){
		return;
	}

	await sleepVernam(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < matriz_cifrado.length && !cancelado ; i++){
		if(i < 4){
			putparpadeo('#VEcell2-1-'+i, 1.5*velocidad, azul);
			await sleepVernam(500*velocidad);

			putparpadeo('#VEcell2-2-'+i, 1*velocidad, azul);
			await sleepVernam(500*velocidad);
		}

		$('#VEcell2-4-'+i).html((matriz_cifrado[i] == matriz_clave[i])?0:1);
		matriz_texto[i] = (matriz_cifrado[i] == matriz_clave[i])?0:1;

		if(i < 4) {
			putparpadeo('#VEcell2-4-'+i, 0.5*velocidad, azul);
			await sleepVernam(500*velocidad);

			removeputparpadeo('#VEcell2-1-'+i, 1.5*velocidad, azul);
			removeputparpadeo('#VEcell2-2-'+i, 1*velocidad, azul);
			removeputparpadeo('#VEcell2-4-'+i, 0.5*velocidad, azul);
		}
	}

	//Mostrar texto
	$('#VEdiv2').slideToggle(500);

	
	if(cancelado){
		return;
	}

	await sleepVernam(1000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv2').html("Finalmente se convierte el mensaje claro binario a caracteres ASCII");
	$('#VEdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepVernam(4000);
	
	if(cancelado){
		return;
	}

	$('#VEdiv2').scrollViewVernam();

	$("#VErow25").append('<td>Mensaje Claro ASCII</td>');
	$("#VErow26").append('<td>Mensaje Claro</td>');

	for (var i = 0 ; i < texto_length ; i++) {
		$("#VErow25").append('<td id="VEcell2-5-' + i + '">&nbsp&nbsp</td>');
		$("#VErow26").append('<td id="VEcell2-6-' + i + '">&nbsp&nbsp</td>');
	}

	if(cancelado){
		return;
	}

	await sleepVernam(1000);

	if(cancelado){
		return;
	}

	for(var i = 0 ; i < cifrado.length && !cancelado ; i++){
		aux = "";

		for(var j = i*8 ; j < i*8 + 8 && !cancelado ; j++){
			aux = aux + matriz_texto[j];

			putparpadeo('#VEcell2-4-'+j, 3*velocidad, azul);
		}

		await sleepVernam(1000*velocidad);

		$('#VEcell2-5-'+i).html(parseInt(aux, 2));
		putparpadeo('#VEcell2-5-'+i, 2*velocidad, azul);
		await sleepVernam(1000*velocidad);
		
		$('#VEcell2-6-'+i).html(String.fromCharCode(parseInt(aux, 2)));
		putparpadeo('#VEcell2-6-'+i, 1*velocidad, azul);
		putparpadeo("#VE-MCcell1"+i, 1*velocidad, negro);
	    $("#VE-MCcell1"+i).html(String.fromCharCode(parseInt(aux, 2)));
		await sleepVernam(1000*velocidad);
		
		cadenaDescifrado = cadenaDescifrado + String.fromCharCode(parseInt(aux, 2));
		
		for(var j = i*8 ; j < i*8 + 8 ; j++){
			removeputparpadeo('#VEcell2-4-'+j, 3*velocidad, azul);
		}

		removeputparpadeo("#VE-MCcell1"+i, 1*velocidad, negro);
		removeputparpadeo('#VEcell2-5-'+i, 2*velocidad, azul);
		removeputparpadeo('#VEcell2-6-'+i, 1*velocidad, azul);
	}

	if(cancelado){
		return;
	}

	$("#out-textoDescifradoVernam").val(cadenaDescifrado.trim());
	$("#btn-velocidadDVernam").show();
    $("#btn-descifrarVernam").show();
	$("#btn-cancelarDescifrarVernam").hide();

	if(!cancelado){
		$('#VEdiv2').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_8);
    }
}

function validarEntradaTextoCVernam(){
	var mensaje = "";
	var texto = $('#in-textoPlanoVernam').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarEntradaTextoDVernam(){
	var mensaje = "";
	var texto = $('#in-textoPlanoCifradoVernam').val();

	if (texto.length > 0 && texto.length <= 10) {
		var caracteres = texto.split('');

		for(var i = 0 ; i < caracteres.length ; i++){
			if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
				mensaje = mensaje_31;
			}
		}
	}
	else{
		mensaje = mensaje_3;
	}

	return mensaje;
}

function validarEntradaLlaveDVernam(){
	var mensaje = "";
	var clave = $('#in-claveDescifradoVernam').val();
	var texto = $('#in-textoPlanoCifradoVernam').val();

	if(clave.length != texto.length){
		mensaje = mensaje_21;
	}

	if (clave.length > 0 & clave.length <= 10) {
		var caracteres = clave.split('');

		for(var i = 0 ; i < caracteres.length ; i++){
			if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
				mensaje = mensaje_33;
			}
		}
	}
	else{
		mensaje = mensaje_20;
	}
	
	return mensaje;
}

$(document).ready(function(){
	$("#tipoVernamC1").click(function(){
        $("#btn-cifrarVernam").html('Cifrado Rápido');
        $("#btn-cifrarVernam").val(1);
    });
    $("#tipoVernamC2").click(function(){
        $("#btn-cifrarVernam").html('Cifrado Normal');
        $("#btn-cifrarVernam").val(2);
    });
    $("#tipoVernamC3").click(function(){
        $("#btn-cifrarVernam").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarVernam").val(3);
    });

    $("#tipoVernamD1").click(function(){
        $("#btn-descifrarVernam").html('Descifrado Rápido');
        $("#btn-descifrarVernam").val(1);
    });
    $("#tipoVernamD2").click(function(){
        $("#btn-descifrarVernam").html('Descifrado Normal');
        $("#btn-descifrarVernam").val(2);
    });
    $("#tipoVernamD3").click(function(){
        $("#btn-descifrarVernam").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarVernam").val(3);
    });

    $("#in-textoPlanoVernam").keyup(function(){
        var mensaje = validarEntradaTextoCVernam();

        if($("#in-textoPlanoVernam").val().length == 0){
        	$("#textoPlanoVernam-error").remove();
            $("#in-textoPlanoVernam").removeClass('input-error');
        }
        else{
	        if (mensaje.length != 0) {
	            $("#textoPlanoVernam-error").remove();
	            $("#in-textoPlanoVernam").parent().parent().append('<div id="textoPlanoVernam-error" class="text-danger">&nbsp;'+mensaje+'</div>');
	            $("#in-textoPlanoVernam").addClass('input-error');
	        } else{
	            $("#textoPlanoVernam-error").remove();
	            $("#in-textoPlanoVernam").removeClass('input-error');
	        }
	    }
    });

    $("#in-textoPlanoCifradoVernam").keyup(function(){
    	if($("#in-textoPlanoCifradoVernam").val().length == 0){
    		$("#textoPlanoCifradoVernam-error").remove();
            $("#in-textoPlanoCifradoVernam").removeClass('input-error');
    	}
    	else{
	        var mensaje = validarEntradaTextoDVernam();

	        $("#textoPlanoCifradoVernam-info").remove();

	        if (mensaje.length != 0) {
	            $("#textoPlanoCifradoVernam-error").remove();
	            $("#in-textoPlanoCifradoVernam").parent().parent().append('<div id="textoPlanoCifradoVernam-error" class="text-danger">&nbsp;'+mensaje+'</div>');
	            $("#in-textoPlanoCifradoVernam").addClass('input-error');
	        } else{
	            $("#textoPlanoCifradoVernam-error").remove();
	            $("#in-textoPlanoCifradoVernam").removeClass('input-error');
	        }
	    }
    });

    $("#in-claveDescifradoVernam").keyup(function(){
        if($("#in-claveDescifradoVernam").val().length == 0){
        	$("#claveDVernam-error").remove();
            $("#in-claveDescifradoVernam").removeClass('input-error');
        }
        else{
	        var mensaje = validarEntradaLlaveDVernam();

	        $("#textoPlanoCifradoVernam-info").remove();

	        if (mensaje.length != 0) {
	            $("#claveDVernam-error").remove();
	            $("#in-claveDescifradoVernam").parent().parent().append('<div id="claveDVernam-error" class="text-danger">&nbsp;'+mensaje+'</div>');
	            $("#in-claveDescifradoVernam").addClass('input-error');
	        } else{
	            $("#claveDVernam-error").remove();
	            $("#in-claveDescifradoVernam").removeClass('input-error');
	        }
	    }
    });

	$("#btn-cifrarVernam").click(function(){
		var mensajetexto = validarEntradaTextoCVernam();

		if(mensajetexto.length > 0){
			$("#textoPlanoVernam-error").remove();
            $("#in-textoPlanoVernam").parent().parent().append('<div id="textoPlanoVernam-error" class="text-danger">&nbsp;'+mensajetexto+'</div>');
            $("#in-textoPlanoVernam").addClass('input-error');
		}
		else{
			$("#textoPlanoVernam-error").remove();
            $("#claveCVernam-error").remove();
            $("#in-textoPlanoVernam").removeClass('input-error');
            $("#in-claveCifradoVernam").removeClass('input-error');

            if($('#btn-cifrarVernam').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarVernam').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCVernam").hide();
            $("#btn-cifrarVernam").hide();
            $("#btn-cancelarCifrarVernam").show();
            cancelado = false;
            
            cifrarVernam();
		}
	});

	$("#btn-cancelarCifrarVernam").click(function(){
        cancelado = true;

        limpiaPanelCifradoVernam();

        $("#btn-cifrarVernam").show();
        $("#btn-velocidadCVernam").show();
        $("#btn-cancelarCifrarVernam").hide();
    });

    $("#btn-cancelarDescifrarVernam").click(function(){
        cancelado = true;

        limpiaPanelDescifradoVernam();

        $("#btn-descifrarVernam").show();
        $("#btn-velocidadDVernam").show();
        $("#btn-cancelarDescifrarVernam").hide();
    });

    $("#btn-copiarTextoVernam").click(function(){
        if ($("#out-textoCifradoVernam").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-textoPlanoCifradoVernam").val($("#out-textoCifradoVernam").val());
			$("#in-claveDescifradoVernam").val($("#out-claveCifradoVernam").val());
		}
    });

    $("#btn-descifrarVernam").click(function(){
        var mensajetexto = validarEntradaTextoDVernam();
		var mensajeclave = validarEntradaLlaveDVernam();

		if(mensajetexto.length == 0 && mensajeclave.length == 0){
			$("#textoPlanoCifradoVernam-error").remove();
            $("#claveDescifradoVernam-error").remove();
            $("#in-textoPlanoCifradoVernam").removeClass('input-error');
            $("#in-claveDescifradoVernam").removeClass('input-error');

            if($('#btn-descifrarVernam').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarVernam').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDVernam").hide();
            $("#btn-descifrarVernam").hide();
            $("#btn-cancelarDescifrarVernam").show();
            cancelado = false;
            
            descifrarVernam();
		}
		else{
			if(mensajetexto.length > 0){
				$("#textoPlanoCifradoVernam-error").remove();
	            $("#in-textoPlanoCifradoVernam").parent().parent().append('<div id="textoPlanoCifradoVernam-error" class="text-danger">&nbsp;'+mensajetexto+'</div>');
	            $("#in-textoPlanoCifradoVernam").addClass('input-error');
			}
			if(mensajeclave.length > 0){
				$("#claveDVernam-error").remove();
	            $("#in-claveDescifradoVernam").parent().parent().append('<div id="claveDVernam-error" class="text-danger">&nbsp;'+mensajeclave+'</div>');
	            $("#in-claveDescifradoVernam").addClass('input-error');
			}
		}
    });
});