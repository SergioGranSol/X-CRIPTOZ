var cancelado = false;
var velocidad = 1;
var msg_lenght = 0;
var bloque_length_rsa = 0;

function sleepRSA(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$.fn.scrollViewRSA = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelRSA(){
	$("#pnl-InteractivoRSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function crearPanelCifradoRSA(){
	$("#table-RSA1").append('<tr id="RSA1row-0"><td id="RSAcell1-0-0" colspan="' + (msg_lenght*2) + '"><b>Alice</b></td></tr>');
	$("#table-RSA2").append('<tr id="RSA2row-0"><td id="RSAcell2-0-0" colspan="2"><b>Bob</b></td></tr>');

	for(var i = 0 ; i < msg_lenght ; i++){
        $('#textoCRSA').append('<label class="circulo" id="RSAC-cell-'+i+'"></label>');
    }

	$("#table-RSA1").css("text-align","center");
	$("#table-RSA2").css("text-align","center");
}

function crearPanelDescifradoRSA(){
	for(var i = 0 ; i < msg_lenght*2 ; i++){
        $('#textoDRSA').append('<label class="circulo" id="RSAD-cell-'+i+'"></label>');
    }

	$("#table-RSA3").css("text-align","center");
}

function cerrarPanelRSA(){
	cancelado = true;

	$("#pnl-InteractivoRSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCRSA();
	limpiaPanelDRSA();

	$("#btn-cifrarRSA").show();
	$("#btn-velocidadCRSA").show();
	$("#btn-cancelarCRSA").hide();

	$("#btn-descifrarRSA").show();
	$("#btn-velocidadDRSA").show();
	$("#btn-cancelarDRSA").hide();

	deleteErrorRSA("textoPlanoRSA");
	deleteErrorRSA("pCRSA");
	deleteErrorRSA("qCRSA");
	deleteErrorRSA("eCRSA");
	deleteErrorRSA("textocifradoRSA");
	deleteErrorRSA("pDRSA");
	deleteErrorRSA("qDRSA");
	deleteErrorRSA("eDRSA");

	$("#in-pCRSA").val("257");
	$("#in-qCRSA").val("257");
	$("#in-eCRSA").val("3");
	$("#in-pDRSA").val("257");
	$("#in-qDRSA").val("257");
	$("#in-eDRSA").val("3");
}

function limpiaPanelCRSA(){
	$("#table-RSA1").empty();
	$("#table-RSA2").empty();

	$("#in-textoPlanoRSA").val("");
	$("#in-pCRSA").val("");
	$("#in-qCRSA").val("");
	$("#in-eCRSA").val("");
	$("#out-criptogramaRSA").val("");

	$("#textoCRSA").empty();

	if($('#RSAdiv1').is(':visible')) {
		$("#RSAdiv1").slideToggle(500);
	}
}

function limpiaPanelDRSA(){
	$("#table-RSA3").empty();

	$("#in-textocifradoRSA").val("");
	$("#in-pDRSA").val("");
	$("#in-qDRSA").val("");
	$("#in-eDRSA").val("");
	$("#out-txtDescifradoRSA").val("");

	$("#textoDRSA").empty();

	if($('#RSAdiv2').is(':visible')) {
		$("#RSAdiv2").slideToggle(500);
	}
}

async function cifrarRSA(){
	var p = bigInt($("#in-pCRSA").val());
	var q = bigInt($("#in-qCRSA").val());
	var e = bigInt($("#in-eCRSA").val());
	var mensaje = $("#in-textoPlanoRSA").val().split("");
	var n = bigInt(0);
	var t = [], m = [];
	var criptograma = "";
	var mensaje2;

	if(mensaje.length%2 == 1){
		mensaje[mensaje.length] = "x";
	}
	
	msg_lenght = mensaje.length/2;
	
	limpiaPanelCRSA();

	$("#in-pCRSA").val(p);
	$("#in-qCRSA").val(q);
	$("#in-eCRSA").val(e);
	$("#in-textoPlanoRSA").val(mensaje.join(""));

	bloque_length_rsa = 2;

	//Texto Plano
	$('#RSAdiv1').html('Bob escoge 2 numeros primos <i>p</i> y <i>q</i> y calcula <i>n = p * q</i>.');
	$('#RSAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepRSA(4000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv1').scrollViewRSA();
	
	crearPanelCifradoRSA();

	if(cancelado){
		return;
	}

	$("#table-RSA2").append('<tr id="RSA2row-1"></tr>');

	for(var i = 0 ; i < 2 && !cancelado ; i++){
		if(i == 0){
			$("#RSA2row-1").append('<td id="RSAcell2-1-'+i+'">p = ' + p + '</td>');
		}
		else if(i == 1){
			$("#RSA2row-1").append('<td id="RSAcell2-1-'+i+'">q = ' + q + '</td>');
		}

		putparpadeo("#RSAcell2-1-"+i, 1*velocidad, azul);

		await sleepRSA(1000*velocidad);

		removeputparpadeo("#RSAcell2-1-"+i, 1*velocidad, azul);
	}

	$("#table-RSA2").append('<tr id="RSA2row-2"></tr>');
	$("#table-RSA2").append('<tr id="RSA2row-3"></tr>');
	$("#RSA2row-2").append('<td id="RSAcell2-2-0" colspan="2">n = ' + p + ' * ' + q + '</td>');

	putparpadeo("#RSAcell2-2-0", 2*velocidad, azul);

	await sleepRSA(1000*velocidad);

	n = bigInt(p).multiply(q);

	$("#RSA2row-3").append('<td id="RSAcell2-3-0" colspan="2">n = ' + n + '</td>');

	putparpadeo("#RSAcell2-3-0", 1*velocidad, azul);

	await sleepRSA(1000*velocidad);

	removeputparpadeo("#RSAcell2-2-0", 2*velocidad, azul);
	removeputparpadeo("#RSAcell2-3-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#RSAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv1').html("Bob también escoge un exponente de cifrado <i>&nbsp;e&nbsp;</i> tal que<br><i>MCD( e , (p-1) , (q-1) ) = 1</i>");
	$('#RSAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepRSA(4000);

	if(cancelado){
		return;
	}

	$("#RSA2row-1").append('<td id="RSAcell2-1-2">e = ' + e + '</td>');
	$("#RSAcell2-0-0").attr('colspan',3);
	$("#RSAcell2-2-0").attr('colspan',3);
	$("#RSAcell2-3-0").attr('colspan',3);

	putparpadeo("#RSAcell2-1-2", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepRSA(1000*velocidad);

	if(cancelado){
		return;
	}

	removeputparpadeo("#RSAcell2-1-2", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#RSAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv1').html("Bob envía su llave pública <i>( n , e )</i> a Alice");
	$('#RSAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepRSA(3000);

	if(cancelado){
		return;
	}

	$('#RSAdiv1').scrollViewRSA();

	$("#table-RSA1").append('<tr id="RSA1row-1"></tr>');

	putparpadeo("#RSAcell2-3-0", 2*velocidad, azul);

	await sleepRSA(1000*velocidad);

	$("#RSA1row-1").append('<td id="RSAcell1-1-0" colspan="' + msg_lenght + '">n = ' + n + '</td>');
	putparpadeo("#RSAcell1-1-0", 1*velocidad, azul);

	await sleepRSA(1000*velocidad);

	removeputparpadeo("#RSAcell2-3-0", 2*velocidad, azul);
	removeputparpadeo("#RSAcell1-1-0", 1*velocidad, azul);

	putparpadeo("#RSAcell2-1-2", 2*velocidad, azul);

	await sleepRSA(1000*velocidad);

	$("#RSA1row-1").append('<td id="RSAcell1-1-1" colspan="' + msg_lenght + '">e = ' + e + '</td>');
	putparpadeo("#RSAcell1-1-1", 1*velocidad, azul);

	await sleepRSA(1000*velocidad);

	removeputparpadeo("#RSAcell2-1-2", 2*velocidad, azul);
	removeputparpadeo("#RSAcell1-1-1", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#RSAdiv1').slideToggle(500);

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv1').html("Alice convierte el mensaje claro en un numero <i>m</i> tal que 0 ≤ <i>m</i> < <i>n</i>. Para este ejemplo <i>m</i> será el valor ASCII en hexadecimal de dos caracteres concatenados. 'x' será el relleno.");
	$('#RSAdiv1').slideToggle(500);

	await sleepRSA(7000);

	if(cancelado){
		return;
	}

	$('#RSAdiv1').scrollViewRSA();

	mensaje2 = obtenerBytesRSA(mensaje.join(""));
	mensaje2 = obtenerBloquesRSA(mensaje2, 2);

	$("#table-RSA1").append('<tr id="RSA1row-2"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		$("#RSA1row-2").append('<td id="RSAcell1-2-'+i+'" style="padding-right: 10px;padding-left: 10px !important;" colspan="2">' + mensaje[i*2] + mensaje[i*2 +1] + ' = 0x' + mensaje2[i] + ' = ' + bigInt(mensaje2[i], 16) + '</td>');

		putparpadeo("#RSAcell1-2-"+i, 1*velocidad, azul);

		await sleepRSA(1000*velocidad);

		removeputparpadeo("#RSAcell1-2-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#RSAdiv1').slideToggle(500);

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv1').html("Alice calcula <i>c = m <sup>e</sup> mod n</i> que es el texto cifrado.");
	$('#RSAdiv1').slideToggle(500);

	await sleepRSA(4000);

	if(cancelado){
		return;
	}

	$('#RSAdiv1').scrollViewRSA();

	$("#table-RSA1").append('<tr id="RSA1row-3"><td id="RSAcell1-3-0" colspan="' + (msg_lenght*2) + '"></td></tr>');
	$("#table-RSA1").append('<tr id="RSA1row-4"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#RSAcell1-2-"+i, 3*velocidad, azul);

		await sleepRSA(1000*velocidad);

		$("#RSAcell1-3-0").html("c = " + bigInt(mensaje2[i], 16) + "<sup>" + e + "</sup> mod " + n);

		putparpadeo("#RSAcell1-3-0", 2*velocidad, azul);

		await sleepRSA(1000*velocidad);

		t[i] = bigInt(mensaje2[i],16).modPow(e, n)
		criptograma = criptograma + t[i] + " ";

		$("#RSA1row-4").append('<td id="RSAcell1-4-'+i+'" colspan="2">' + t[i] + '</td>');
		$("#RSAC-cell-"+i).html('<br>' + t[i]);

		putparpadeo("#RSAcell1-4-"+i, 1*velocidad, azul);
		putparpadeo("#RSAC-cell-"+i, 1*velocidad, negro);

		await sleepRSA(1000*velocidad);

		removeputparpadeo("#RSAcell1-2-"+i, 3*velocidad, azul);
		removeputparpadeo("#RSAcell1-3-0", 2*velocidad, azul);
		removeputparpadeo("#RSAcell1-4-"+i, 1*velocidad, azul);
		removeputparpadeo("#RSAC-cell-"+i, 1*velocidad, negro);
	}

	if(cancelado){
		return;
	}

	//FIN
    $("#out-criptogramaRSA").val(criptograma);
    $("#btn-velocidadCRSA").show();
    $("#btn-cifrarRSA").show();
    $("#btn-cancelarCRSA").hide();

    if(!cancelado){
        $('#RSAdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        cancelado = true;
    }
}

async function descifrarRSA(){
	var criptograma = $("#in-textocifradoRSA").val().trim().split(/[ ]+/);
	var p = bigInt($("#in-pDRSA").val());
	var q = bigInt($("#in-qDRSA").val());
	var e = bigInt($("#in-eDRSA").val());
	var t = [], m = [];
	var d, n;
	var mensaje = "", aux;
	var textoPlano;
	
	msg_lenght = criptograma.length;
	bloque_length_rsa = 2;
	
	limpiaPanelDRSA();

	for(var i = 0 ; i < msg_lenght ; i++){
		t[i] = bigInt(criptograma[i]);
	}

	$("#in-textocifradoRSA").val(criptograma.join(" "));
	$("#in-pDRSA").val(p);
	$("#in-qDRSA").val(q);
	$("#in-eDRSA").val(e);

	crearPanelDescifradoRSA();

	$('#RSAdiv2').html("Bob calcula el exponente de descifrado <i>d</i> tal que &nbsp;&nbsp;&nbsp; <i>d*e ≡ 1 mod (p-1)(q-1)</i>");
	$('#RSAdiv2').slideToggle(500);

	await sleepRSA(4000);

	if(cancelado){
		return;
	}

	$('#RSAdiv2').scrollViewRSA();

	$("#table-RSA3").append('<tr id="RSA3row-0"><td id="RSAcell3-0-0" colspan="' + msg_lenght*2 + '">e = ' + e + '</td></tr>');

	putparpadeo("#RSAcell3-0-0", 3*velocidad, azul);

	await sleepRSA(1000*velocidad);

	$("#table-RSA3").append('<tr id="RSA3row-1"><td id="RSAcell3-1-0" colspan="' + msg_lenght*6 + '">d * ' + e + ' ≡ 1 mod (' + p.subtract(1) + ' * ' + q.subtract(1) + ')</td></tr>');

	putparpadeo("#RSAcell3-1-0", 2*velocidad, azul);

	await sleepRSA(1000*velocidad);

	d = e.modInv((p.subtract(1)).multiply(q.subtract(1)));

	$("#table-RSA3").append('<tr id="RSA3row-2"><td id="RSAcell3-2-0" colspan="' + msg_lenght*6 + '">d = ' + d + '</td></tr>');

	putparpadeo("#RSAcell3-2-0", 1*velocidad, azul);

	await sleepRSA(1000*velocidad);

	removeputparpadeo("#RSAcell3-0-0", 3*velocidad, azul);
	removeputparpadeo("#RSAcell3-1-0", 2*velocidad, azul);
	removeputparpadeo("#RSAcell3-2-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#RSAdiv2').slideToggle(500);

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv2').html("Bob calcula <i>n = p * q</i>");
	$('#RSAdiv2').slideToggle(500);

	await sleepRSA(3000);

	if(cancelado){
		return;
	}

	$('#RSAdiv2').scrollViewRSA();

	for(var i = 1 ; i < 3 && !cancelado ; i++){
		if(i == 1){
			$("#RSA3row-0").append('<td id="RSAcell3-0-'+i+'" colspan="' + msg_lenght*2 + '">p = ' + p + '</td>');
		}
		else if(i == 2){
			$("#RSA3row-0").append('<td id="RSAcell3-0-'+i+'" colspan="' + msg_lenght*2 + '">q = ' + q + '</td>');
		}

		putparpadeo("#RSAcell3-0-"+i, 1*velocidad, azul);

		await sleepRSA(1000*velocidad);

		removeputparpadeo("#RSAcell3-0-"+i, 1*velocidad, azul);
	}

	n = bigInt(p).multiply(q);

	$("#table-RSA3").append('<tr id="RSA3row-3"><td id="RSAcell3-3-0" colspan="' + msg_lenght*6 + '">n = ' + p + ' * ' + q + ' = ' + n + '</td></tr>');

	putparpadeo("#RSAcell3-3-0", 1*velocidad, azul);

	await sleepRSA(1000*velocidad);

	removeputparpadeo("#RSAcell3-3-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#RSAdiv2').slideToggle(500);

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv2').html("Bob calcula el valor de <i>m ≡ c <sup>d</sup> mod n</i>");
	$('#RSAdiv2').slideToggle(500);

	await sleepRSA(4000);

	if(cancelado){
		return;
	}

	$('#RSAdiv2').scrollViewRSA();

	$("#table-RSA3").append('<tr id="RSA3row-4"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		$("#RSA3row-4").append('<td id="RSAcell3-4-'+i+'" colspan="6">' + t[i] + '</td>');

		putparpadeo("#RSAcell3-4-"+i, 0.5*velocidad, azul);

		await sleepRSA(500*velocidad);

		removeputparpadeo("#RSAcell3-4-"+i, 0.5*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $("#table-RSA3").append('<tr id="RSA3row-5"><td id="RSAcell3-5-0" colspan="' + msg_lenght*6 + '"></td></tr>');
	$("#table-RSA3").append('<tr id="RSA3row-6"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#RSAcell3-4-"+i, 3*velocidad, azul);

		await sleepRSA(1000*velocidad);

		$("#RSAcell3-5-0").html("m ≡ " + t[i] + " <sup>" + d + "</sup> mod " + n);

		putparpadeo("#RSAcell3-5-0", 2*velocidad, azul);

		await sleepRSA(1000*velocidad);

		m[i] = bigInt(t[i]).modPow(d, n);
		
		aux = m[i].toString(16);

		for(var j = aux.length ; j < 4 ; j++){
			aux = "0" + aux;
		}

		$("#RSA3row-6").append('<td id="RSAcell3-6-'+i+'" colspan="6">' + m[i] + ' = 0x' + aux + '</td>');

		putparpadeo("#RSAcell3-6-"+i, 1*velocidad, azul);

		await sleepRSA(1000*velocidad);

		removeputparpadeo("#RSAcell3-4-"+i, 3*velocidad, azul);
		removeputparpadeo("#RSAcell3-5-0", 2*velocidad, azul);
		removeputparpadeo("#RSAcell3-6-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#RSAdiv2').slideToggle(500);

	await sleepRSA(1000);
	
	if(cancelado){
		return;
	}

	$('#RSAdiv2').html("Bob convierte <i>m</i> a texto usando la misma tecnica que Alice.");
	$('#RSAdiv2').slideToggle(500);

	await sleepRSA(4000);

	if(cancelado){
		return;
	}

	$('#RSAdiv2').scrollViewRSA();

	textoPlano = obtenerCaracteresRSA(m, 2);

	$("#table-RSA3").append('<tr id="RSA3row-7"></tr>');
	$("#table-RSA3").append('<tr id="RSA3row-8"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#RSAcell3-6-"+i, 5*velocidad, azul);

		await sleepRSA(1000*velocidad);

		$("#RSA3row-7").append('<td id="RSAcell3-7-'+(i*2)+'" colspan="3">0x' + ((textoPlano[i*2].toString(16).length==2)?textoPlano[i*2].toString(16):("0"+textoPlano[i*2].toString(16))) + ' = ' + textoPlano[i*2] + '</td>');
		putparpadeo("#RSAcell3-7-"+(i*2), 2*velocidad, azul);

		await sleepRSA(1000*velocidad);

		$("#RSA3row-8").append('<td id="RSAcell3-8-'+(i*2)+'" colspan="3">' + String.fromCharCode(textoPlano[i*2]) + '</td>');
		$("#RSAD-cell-"+(i*2)).html('<br>' + String.fromCharCode(textoPlano[i*2]));
		putparpadeo("#RSAcell3-8-"+(i*2), 1*velocidad, azul);
		putparpadeo("#RSAD-cell-"+(i*2), 1*velocidad, negro);

		mensaje = mensaje + String.fromCharCode(textoPlano[i*2]);

		await sleepRSA(1000);

		removeputparpadeo("#RSAcell3-7-"+(i*2), 2*velocidad, azul);
		removeputparpadeo("#RSAcell3-8-"+(i*2), 1*velocidad, azul);
		removeputparpadeo("#RSAD-cell-"+(i*2), 1*velocidad, negro);

		$("#RSA3row-7").append('<td id="RSAcell3-7-'+(i*2 + 1)+'" colspan="3">0x' + ((textoPlano[i*2 + 1].toString(16).length==2)?textoPlano[i*2 + 1].toString(16):("0"+textoPlano[i*2 + 1].toString(16))) + ' = ' + textoPlano[i*2 + 1] + '</td>');
		putparpadeo("#RSAcell3-7-"+(i*2 + 1), 2*velocidad, azul);

		await sleepRSA(1000*velocidad);

		$("#RSA3row-8").append('<td id="RSAcell3-8-'+(i*2 + 1)+'" colspan="3">' + String.fromCharCode(textoPlano[i*2 + 1]) + '</td>');
		$("#RSAD-cell-"+(i*2 + 1)).html('<br>' + String.fromCharCode(textoPlano[i*2 + 1]));
		putparpadeo("#RSAcell3-8-"+(i*2 + 1), 1*velocidad, azul);
		putparpadeo("#RSAD-cell-"+(i*2 + 1), 1*velocidad, negro);

		mensaje = mensaje + String.fromCharCode(textoPlano[i*2 + 1]);

		await sleepRSA(1000);

		removeputparpadeo("#RSAcell3-7-"+(i*2 + 1), 2*velocidad, azul);
		removeputparpadeo("#RSAcell3-8-"+(i*2 + 1), 1*velocidad, azul);
		removeputparpadeo("#RSAD-cell-"+(i*2 + 1), 1*velocidad, negro);

		removeputparpadeo("#RSAcell3-6-"+i, 5*velocidad, azul);
	}

	if(cancelado){
		return;
	}

	//FIN
    $("#out-txtDescifradoRSA").val(mensaje);
    $("#btn-velocidadDRSA").show();
    $("#btn-descifrarRSA").show();
    $("#btn-cancelarDRSA").hide();

    if(!cancelado){
        $('#RSAdiv2').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        cancelado = true;
    }
}

function verificarE(p, q , e) {
  	var n = p.multiply(q);
	
	return bigInt.gcd(e, n);
}

function validarEntradaTextoCRSA(){
	var mensaje = "";
	var texto = $('#in-textoPlanoRSA').val();

	if (texto.length > 0 && texto.length <= 10) {
		var caracteres = texto.split('');

		for(var i = 0 ; i < caracteres.length ; i++){
			if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
				mensaje = mensaje_29;
			}
		}
	}
	else{
		mensaje = mensaje_43;
	}

	return mensaje;
}

function validarEntradapCRSA(){
	var mensaje = "";
	var p = $('#in-pCRSA').val();
	var q = $('#in-qCRSA').val();

	if(!p.match(/^[0-9]+$/) ||p.length < 1 || bigInt(p).isPrime() == false || parseInt(p) > 997 || parseInt(p) < 257){
		mensaje = mensaje_44;
	}
	else if(bigInt(p).compare(q) == 0){
		mensaje = mensaje_138;
	}

	return mensaje;
}

function validarEntradaqCRSA(){
	var mensaje = "";
	var q = $('#in-qCRSA').val();
	var p = $('#in-pCRSA').val();

	if(!q.match(/^[0-9]+$/) ||q.length < 1 || bigInt(q).isPrime() == false || parseInt(q) > 997 || parseInt(q) < 257){
		mensaje = mensaje_45;
	}
	else if(bigInt(q).compare(p) == 0){
		mensaje = mensaje_139;
	}

	return mensaje;
}

function validarEntradaeCRSA(){
	var mensaje = "";
	var p = bigInt($('#in-pCRSA').val()).subtract(1);
	var q = bigInt($('#in-qCRSA').val()).subtract(1);
	var e = $('#in-eCRSA').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(1) == -1 || bigInt(e).compare(p.multiply(q)) != -1){
		mensaje = mensaje_46;
	}
	else if(bigInt(verificarE(p,q,e)).compare(1) != 0){
		mensaje = mensaje_47;
	}
	
	return mensaje;
}

function validarEntradaTextoDRSA(){
	var mensaje = "";
	var criptograma = $('#in-textocifradoRSA').val();
	var p = bigInt($('#in-pDRSA').val());
	var q = bigInt($('#in-qDRSA').val());

	if(!criptograma.match(/^(-?[0-9]+ *)+$/)){
    	mensaje = mensaje_48;
	}
	else if(criptograma.trim().split(/[ ]+/).length < 1 || criptograma.trim().split(/[ ]+/).length > 5){
		mensaje = mensaje_49;
	}
    else{
    	criptograma = criptograma.trim().split(" ");
		
        for(var i = 0 ; i < criptograma.length ; i++){
			if(bigInt(criptograma[i]).compare(0) == -1 || bigInt(criptograma[i]).compare(p.multiply(q)) != -1){
				mensaje = mensaje_50;
			}
		}
    }

	return mensaje;
}

function validarEntradapDRSA(){
	var mensaje = "";
	var p = $('#in-pDRSA').val();
	var q = $('#in-qDRSA').val();

	if(!p.match(/^[0-9]+$/) || bigInt(p).isPrime() == false || parseInt(p) > 997 || parseInt(p) < 257){
		mensaje = mensaje_44;
	}
	else if(bigInt(p).compare(q) == 0){
		mensaje = mensaje_138;
	}

	return mensaje;
}

function validarEntradaqDRSA(){
	var mensaje = "";
	var q = $('#in-qDRSA').val();
	var p = $('#in-pDRSA').val();

	if(!q.match(/^[0-9]+$/) || bigInt(q).isPrime() == false || parseInt(q) > 997 || parseInt(q) < 257){
		mensaje = mensaje_45;
	}
	else if(bigInt(q).compare(p) == 0){
		mensaje = mensaje_139;
	}

	return mensaje;
}

function validarEntradaeDRSA(){
	var mensaje = "";
	var p = bigInt($('#in-pDRSA').val()).subtract(1);
	var q = bigInt($('#in-qDRSA').val()).subtract(1);
	var e = $('#in-eDRSA').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(1) == -1 || bigInt(e).compare(p.multiply(q)) != -1){
		mensaje = mensaje_46;
	}
	else if(bigInt(verificarE(p,q,e)).compare(1) != 0){
		mensaje = mensaje_47;
	}
	
	return mensaje;
}

function addErrorRSA(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorRSA(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoRSAC1").click(function(){
        $("#btn-cifrarRSA").html('Cifrado Rápido');
        $("#btn-cifrarRSA").val(1);
    });
    $("#tipoRSAC2").click(function(){
        $("#btn-cifrarRSA").html('Cifrado Normal');
        $("#btn-cifrarRSA").val(2);
    });
    $("#tipoRSAC3").click(function(){
        $("#btn-cifrarRSA").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarRSA").val(3);
    });
    $("#tipoRSAD1").click(function(){
        $("#btn-descifrarRSA").html('Descifrado Rápido');
        $("#btn-descifrarRSA").val(1);
    });
    $("#tipoRSAD2").click(function(){
        $("#btn-descifrarRSA").html('Descifrado Normal');
        $("#btn-descifrarRSA").val(2);
    });
    $("#tipoRSAD3").click(function(){
        $("#btn-descifrarRSA").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarRSA").val(3);
    });

    $("#in-textoPlanoRSA").keyup(function(){
        var mensaje = validarEntradaTextoCRSA();

        if($("#in-textoPlanoRSA").val().length == 0){
        	deleteErrorRSA("textoPlanoRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("textoPlanoRSA", mensaje);
	        } else{
	            deleteErrorRSA("textoPlanoRSA");
	        }
	    }
    });

    $("#in-pCRSA").on('click change keyup', function() {
        var mensaje = validarEntradapCRSA();

        if($("#in-pCRSA").val().length == 0){
        	deleteErrorRSA("pCRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("pCRSA", mensaje);
	        } else{
	            deleteErrorRSA("pCRSA");
	        }
	    }
    });

    $("#in-qCRSA").on('click change keyup', function() {
        var mensaje = validarEntradaqCRSA();

        if($("#in-qCRSA").val().length == 0){
        	deleteErrorRSA("qCRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("qCRSA", mensaje);
	        } else{
	            deleteErrorRSA("qCRSA");
	        }
	    }
    });

    $("#in-eCRSA").on('click change keyup', function() {
        var mensaje = validarEntradaeCRSA();

        if($("#in-eCRSA").val().length == 0){
        	deleteErrorRSA("eCRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("eCRSA", mensaje);
	        } else{
	            deleteErrorRSA("eCRSA");
	        }
	    }
    });

    $("#in-textocifradoRSA").keyup(function(){
        var mensaje = validarEntradaTextoDRSA();

        if($("#in-textocifradoRSA").val().length == 0){
        	deleteErrorRSA("textocifradoRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("textocifradoRSA", mensaje);
	        } else{
	            deleteErrorRSA("textocifradoRSA");
	        }
	    }
    });

    $("#in-pDRSA").on('click change keyup', function() {
        var mensaje = validarEntradapDRSA();

        if($("#in-pDRSA").val().length == 0){
        	deleteErrorRSA("pDRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("pDRSA", mensaje);
	        } else{
	            deleteErrorRSA("pDRSA");
	        }
	    }
    });

    $("#in-qDRSA").on('click change keyup', function() {
        var mensaje = validarEntradaqDRSA();

        if($("#in-qDRSA").val().length == 0){
        	deleteErrorRSA("qDRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("qDRSA", mensaje);
	        } else{
	            deleteErrorRSA("qDRSA");
	        }
	    }
    });

    $("#in-eDRSA").on('click change keyup', function() {
        var mensaje = validarEntradaeDRSA();

        if($("#in-eDRSA").val().length == 0){
        	deleteErrorRSA("eDRSA");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorRSA("eDRSA", mensaje);
	        } else{
	            deleteErrorRSA("eDRSA");
	        }
	    }
    });

	$("#btn-cifrarRSA").click(function(){
		var mensajetexto = validarEntradaTextoCRSA();
		var mensajep = validarEntradapCRSA();
		var mensajeq = validarEntradaqCRSA();
		var mensajee = validarEntradaeCRSA();

		if(mensajetexto.length == 0 && mensajep.length == 0 && mensajeq.length == 0 && mensajee.length == 0){
			$("#textoPlanoRSA-error").remove();
			$("#pCRSA-error").remove();
			$("#qCRSA-error").remove();
            $("#eCRSA-error").remove();
            $("#in-textoPlanoRSA").removeClass('input-error');
            $("#in-pCRSA").removeClass('input-error');
            $("#in-qCRSA").removeClass('input-error');
            $("#in-eCRSA").removeClass('input-error');

            if($('#btn-cifrarRSA').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarRSA').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCRSA").hide();
            $("#btn-cifrarRSA").hide();
            $("#btn-cancelarCRSA").show();
            cancelado = false;
            
            cifrarRSA();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorRSA("textoPlanoRSA", mensajetexto);
			}
			if(mensajep.length > 0){
				addErrorRSA("pCRSA", mensajep);
			}
			if(mensajeq.length > 0){
				addErrorRSA("qCRSA", mensajeq);
			}
			if(mensajee.length > 0){
				addErrorRSA("eCRSA", mensajee);
			}
		}
	});

	$("#btn-cancelarCRSA").click(function(){
        cancelado = true;

        limpiaPanelCRSA();

        $("#btn-cifrarRSA").show();
        $("#btn-velocidadCRSA").show();
        $("#btn-cancelarCRSA").hide();
    });

    $("#btn-cancelarDRSA").click(function(){
        cancelado = true;

        limpiaPanelDRSA();

        $("#btn-descifrarRSA").show();
        $("#btn-velocidadDRSA").show();
        $("#btn-cancelarDRSA").hide();
    });

    $("#btn-copiarTextoRSA").click(function(){
        if ($("#out-criptogramaRSA").val() == ''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-textocifradoRSA").val($("#out-criptogramaRSA").val());
			$("#in-pDRSA").val($("#in-pCRSA").val());
			$("#in-qDRSA").val($("#in-qCRSA").val());
			$("#in-eDRSA").val($("#in-eCRSA").val());

			if(validarEntradaTextoDRSA().length == 0){
				$("#textocifradoRSA-error").remove();
	            $("#in-textocifradoRSA").removeClass('input-error');
	        }

	        if (validarEntradapDRSA().length == 0){
	        	$("#pDRSA-error").remove();
	            $("#in-pDRSA").removeClass('input-error');
	        }

	        if (validarEntradaqDRSA().length == 0){
	        	$("#qDRSA-error").remove();
	            $("#in-qDRSA").removeClass('input-error');
	        }

	        if (validarEntradaeDRSA().length == 0){
	        	$("#eDRSA-error").remove();
	            $("#in-eDRSA").removeClass('input-error');
	        }
		}
    });

    $("#btn-descifrarRSA").click(function(){
    	var mensajetexto = validarEntradaTextoDRSA();
		var mensajep = validarEntradapDRSA();
		var mensajeq = validarEntradaqDRSA();
		var mensajee = validarEntradaeDRSA();

		if(mensajetexto.length == 0 && mensajep.length == 0 && mensajeq.length == 0 && mensajee.length == 0){
			$("#textocifradoRSA-error").remove();
			$("#pDRSA-error").remove();
			$("#qDRSA-error").remove();
            $("#eDRSA-error").remove();
            $("#in-textocifradoRSA").removeClass('input-error');
            $("#in-pDRSA").removeClass('input-error');
            $("#in-qDRSA").removeClass('input-error');
            $("#in-eDRSA").removeClass('input-error');
            $("#btn-descifrarRSA").attr("disabled", false);

            if($('#btn-descifrarRSA').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarRSA').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDRSA").hide();
            $("#btn-descifrarRSA").hide();
            $("#btn-cancelarDRSA").show();
            cancelado = false;
            
            descifrarRSA();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorRSA("textocifradoRSA", mensajetexto);
			}
			if(mensajep.length > 0){
				addErrorRSA("pDRSA", mensajep);
			}
			if(mensajeq.length > 0){
				addErrorRSA("qDRSA", mensajeq);
			}
			if(mensajee.length > 0){
				addErrorRSA("eDRSA", mensajee);
			}
		}
	});

    $("#generarLlavesRSA").click(function(){
		generarLlavesRSA();
	});

	$("#cifrarArchivoRSA").click(function(){
		cifrarArchivoRSA();
	});

	$("#descifrarArchivoRSA").click(function(){
		descifrarArchivoRSA();
	});

	$("#fileInputVRSA").click(function(){
		verificarValoresRSA();
	});
});

function binariPowMod(base, exponente, modulo){
	var n = exponente.toString(2);
	var result = base;

	for(var i = n.length-1 ; i > 0 ; i--){
		result = (result.multiply(result)).mod(modulo);

		if(n[n.length-i] == "1"){
			result = (result.multiply(base)).mod(modulo);
		}
	}

	return result;
}

function obtenerBytesRSA(flujo){
	var bytes = [];
	var i = 0;

	for( ; i < flujo.length ; i++){
		bytes[i] = flujo.charCodeAt(i);
	}

	return bytes;
}

function obtenerBytesHexRSA(flujo){
	var bytes = [];
	var i = 0, j = 0;
	var aux = "";

	for( ; i < flujo.length/bloque_length_rsa ; i++, j = j+bloque_length_rsa){
		aux = flujo.substring(j, j+bloque_length_rsa);
		bytes[i] = bigInt(aux, 16);
	}

	return bytes;
}

function obtenerBloquesRSA(bytes, size){
	var n = Math.ceil(bytes.length/bloque_length_rsa);
	var bloques = [n];
	var bloque = "";
	var index = 0;

	for(var i = 0 ; i < n ; i++){
		bloque = "";
		//console.log("awado " + index + " + " + bloque_length_rsa + " = " + (index+bloque_length_rsa) + " <= " + bytes.length);
		if(index + bloque_length_rsa <= bytes.length){
			for (var j = 0 ; j < bloque_length_rsa ; j++, index++) {
				for(var k = 0 ; k < size-bytes[index].toString(16).length ; k++){
					bloque = bloque + "0";
				}

				bloque = bloque + bytes[index].toString(16);
			}
			
			bloques[i] = bloque;//console.log(i + " - " + bloques[i]);
		}
		else{
			for( ; index < bytes.length ; index++){
				for(var k = 0 ; k < size-bytes[index].toString(16).length ; k++){
					bloque = bloque + "0";
				}

				bloque = bloque + bytes[index].toString(16);
			}

			for( ; index < n*bloque_length_rsa ; index++){
				bloque = bloque + ((size==2)?"00":"0000");
			}

			bloques[i] = bloque;//console.log(i + " - " + bloques[i]);
		}
	}

	return bloques;
}

function obtenerCaracteresRSAHex(textoCifrado, tamanio){
	var criptograma = [];
	var cadena = "";

	for(var i = 0 ; i < textoCifrado.length ; i++){
		cadena = textoCifrado[i].toString(16);

		for(var j = cadena.length ; j < tamanio ; j++){
			cadena = "0" + cadena;
		}

		criptograma[i] = cadena;
	}

	return criptograma;
}

function obtenerCaracteresRSA(textoPlano, size){
	var mensaje = [];
	var cadena = "", aux = "";
	var index = 0, j = 0, k = 0;

	for(var i = 0 ; i < textoPlano.length ; i++){
		cadena = textoPlano[i].toString(16);

		for(j = cadena.length ; j < bloque_length_rsa*size ; j++){
			cadena = "0" + cadena;
		}

		for( k = 0, j = 0 ; k < cadena.length/size ; k++, j = j+size, index++){
			aux = cadena.substring(j, j+size);
			mensaje[index] = bigInt(aux, 16);
		}
	}

	return mensaje;
}

function calcularBloqueLengthRSA(n){
	var m = "";

	do{
		m = m + "FFFF";
	} while(bigInt(m, 16).compare(n) == -1);

	m = m.substring(4);

	bloque_length_rsa = m.length/4;

	return;
}

function generarLlavesRSA(){
	var e_fileInput = document.getElementById('eRSA');
	var q_fileInput = document.getElementById('qRSA');
	var p_fileInput = document.getElementById('pRSA');
	var textType = /text.*/;
	var llave_publica = "", llave_privada = "";
	var p, q, e, n;
	var phi, d, tamanio;

	if(p_fileInput.files.length == 0){
		$('#fileDisplayAreaRSAVerificar').html(mensaje_101);
		return;
	}
	else if(q_fileInput.files.length == 0){
		$('#fileDisplayAreaRSAVerificar').html(mensaje_102);
		return;
	}
	else if(e_fileInput.files.length == 0){
		$('#fileDisplayAreaRSAVerificar').html(mensaje_103);
		return;
	}

	var e_file = e_fileInput.files[0];
	var p_file = p_fileInput.files[0];
	var q_file = q_fileInput.files[0];
	
	if(e_file.type.match(textType) && p_file.type.match(textType) && q_file.type.match(textType)) {
		var p_reader = new FileReader();
		var q_reader = new FileReader();
		var e_reader = new FileReader();

		p_reader.readAsText(p_file, 'ISO-8859-1');
		q_reader.readAsText(q_file, 'ISO-8859-1');
		e_reader.readAsText(e_file, 'ISO-8859-1');
		
		p_reader.onload = function(e) {
			if(!p_reader.result.match(/^[0-9a-fA-F]+$/)){
				$('#fileDisplayAreaRSAVerificar').html(mensaje_108);
				return;
			}
			else if(bigInt(p_reader.result, 16).toString(2).length < 9 || bigInt(p_reader.result, 16).toString(2).length > 512 || !bigInt(p_reader.result, 16).isPrime()){
				$('#fileDisplayAreaRSAVerificar').html(mensaje_109);
				return;
			}

			p = bigInt(p_reader.result, 16);
			
			q_reader.onload = function(e){
				if(!q_reader.result.match(/^[0-9a-fA-F]+$/)){
					$('#fileDisplayAreaRSAVerificar').html(mensaje_110);
					return;
				}
				else if(bigInt(q_reader.result, 16).toString(2).length < 9 || bigInt(q_reader.result, 16).toString(2).length > 512 || !bigInt(q_reader.result, 16).isPrime()){
					$('#fileDisplayAreaRSAVerificar').html(mensaje_111);
					return;
				}
				else if(bigInt(q_reader.result, 16).compare(p) == 0){
					$('#fileDisplayAreaRSAVerificar').html(mensaje_141);
					return;
				}

				q = bigInt(q_reader.result, 16);

				e_reader.onload = function(e){
					phi = (p.minus(1)).multiply(q.minus(1));

					if(!e_reader.result.match(/^[0-9a-fA-F]+$/)){
						$('#fileDisplayAreaRSAVerificar').html(mensaje_112);
						return;
					}
					else if(bigInt(e_reader.result, 16).compare(0) != 1 || bigInt(e_reader.result, 16).compare(phi) != -1 || bigInt.gcd(bigInt(e_reader.result, 16), phi) != 1){
						$('#fileDisplayAreaRSAVerificar').html(mensaje_113);

						return;
					}
					
					e = bigInt(e_reader.result, 16);
					n = p.multiply(q);
					tamanio = n.toString(16).length;
					d = e.modInv(phi);

					llave_publica = n.toString(16);

					for(var i = 0 ; i < tamanio-e.toString(16).length ; i++){
						llave_publica = llave_publica + "0";
					}

					llave_publica = llave_publica + e.toString(16);

					tamanio = (n.toString(16).length > d.toString(16).length)?n.toString(16).length:e.toString(16).length;

					for(var i = 0 ; i < tamanio-d.toString(16).length ; i++){
						llave_privada = llave_privada + "0";
					}

					llave_privada = llave_privada + d.toString(16);

					for(var i = 0 ; i < tamanio-n.toString(16).length ; i++){
						llave_privada = llave_privada + "0";
					}

					llave_privada = llave_privada + n.toString(16);
					
					var llave_publica_file = new File([llave_publica], "LlavePublica.txt", {type: "text/plain;charset=ISO-8859-1"});
					saveAs(llave_publica_file);

					var llave_privada_file = new File([llave_privada], "LlavePrivada.txt", {type: "text/plain;charset=ISO-8859-1"});
					saveAs(llave_privada_file);

					$('#fileDisplayAreaRSAVerificar').html(mensaje_114);
				}
			}
		}
	}
	else {
		$('#fileDisplayAreaRSAVerificar').html(mensaje_89);
	}
}

function cifrarArchivoRSA() {
	var fileDisplayArea = $('#fileDisplayAreaRSACifrado');
	var llave_fileInput = document.getElementById('llavePublicaRSA');
	var file_fileInput = document.getElementById('fileInputCRSA');
    var textType = /text.*/;
	var textoPlano, textoCifrado = [], criptograma, cadenaTextoCifrado = "";
	var n, e;
	$("#progressbarRSACifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if(llave_fileInput.files.length == 0){
		$('#fileDisplayAreaRSACifrado').html(mensaje_104);
		return;
	}
	else if(file_fileInput.files.length == 0){
		$('#fileDisplayAreaRSACifrado').html(mensaje_92);
		return;
	}

	var llave_file = llave_fileInput.files[0];
	var file = file_fileInput.files[0];
	
	if (file.type.match(textType) && llave_file.type.match(textType)) {
		if(file.size > 1024){
			$('#fileDisplayAreaRSACifrado').html(mensaje_106);
			return;
		}

		var file_reader = new FileReader();
		var llave_reader = new FileReader();

		llave_reader.readAsText(llave_file, 'ISO-8859-1');
		file_reader.readAsText(file, 'ISO-8859-1');
		
		llave_reader.onload = function(e) {
			if(!llave_reader.result.match(/^[0-9a-fA-F]+$/)){
				$('#fileDisplayAreaRSACifrado').html(mensaje_107);
				return;
			}
			else if(llave_reader.result.length%2 != 0 || bigInt(llave_reader.result,16).toString(16).length > 512 || bigInt(llave_reader.result,16).toString(16).length < 10){
				$('#fileDisplayAreaRSACifrado').html(mensaje_142);
				return;
			}
			
			file_reader.onload = function(e){
				n = bigInt(llave_reader.result.substring(0,llave_reader.result.length/2), 16);
				e = bigInt(llave_reader.result.substring(llave_reader.result.length/2), 16);
				
				var bloque_criptograma_length = 0;

				calcularBloqueLengthRSA(n);

				textoPlano = file_reader.result;

				textoPlano = obtenerBytesRSA(textoPlano);
				textoPlano = obtenerBloquesRSA(textoPlano, 4);

				for(var i = 0 ; i < textoPlano.length ; i++){
					textoCifrado[i] = binariPowMod(bigInt(textoPlano[i], 16), e, n);
					//$("#progressbarRSACifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
				}
				
				bloque_criptograma_length = n.toString(16).length;
				criptograma = obtenerCaracteresRSAHex(textoCifrado, bloque_criptograma_length);

				for(var i  = 0 ; i < criptograma.length ; i++){
					cadenaTextoCifrado = cadenaTextoCifrado + criptograma[i];
				}

				fileDisplayArea.html(cadenaTextoCifrado.toUpperCase());
				cadenaTextoCifrado =  "\ufeff"+cadenaTextoCifrado.toUpperCase();
				
				var file = new File([cadenaTextoCifrado], "ArchivoCifradoRSA.txt", {type: "text/plain;charset=ISO-8859-1"});
				saveAs(file);
				$("#progressbarRSACifrado").css('width','100%').attr('aria-valuenow', '100');
			}
		}
	}
	else {
		$('#fileDisplayAreaRSACifrado').html(mensaje_89);
	}
}
	
function descifrarArchivoRSA() {
	var fileDisplayArea = $('#fileDisplayAreaRSADescifrado');
	var llave_fileInput = document.getElementById('llavePrivadaRSA');
	var file_fileInput = document.getElementById('fileInputDRSA');
    var textType = /text.*/;
	var textoCifrado, bloquesTextoPlano = [], textoPlano, cadenaTextoPlano = "";
	$("#progressbarRSADescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if(llave_fileInput.files.length == 0){
		$('#fileDisplayAreaRSADescifrado').html(mensaje_105);
		return;
	}
	else if(file_fileInput.files.length == 0){
		$('#fileDisplayAreaRSADescifrado').html(mensaje_93);
		return;
	}

	var llave_file = llave_fileInput.files[0];
	var file = file_fileInput.files[0];

	if (file.type.match(textType) && llave_file.type.match(textType)) {
		if(file.size > 1024*5+3){
			$('#fileDisplayAreaRSADescifrado').html(mensaje_143);
			return;
		}

		var file_reader = new FileReader();
		var llave_reader = new FileReader();

		llave_reader.readAsText(llave_file, 'ISO-8859-1');
		file_reader.readAsText(file, 'ISO-8859-1');

		llave_reader.onload = function(e) {
			if(!llave_reader.result.match(/^[0-9a-fA-F]+$/)){
				$('#fileDisplayAreaRSADescifrado').html(mensaje_107);
				return;
			}
			else if(llave_reader.result.length%2 != 0 || bigInt(llave_reader.result,16).toString(16).length > 512 || bigInt(llave_reader.result,16).toString(16).length < 9){
				$('#fileDisplayAreaRSADescifrado').html(mensaje_142);
				return;
			}
			
			file_reader.onload = function(e) {
				if(!file_reader.result.match(/^[0-9a-fA-F]+$/)){
					$('#fileDisplayAreaRSADescifrado').html(mensaje_144);
					return;
				}
				
				var n = bigInt(llave_reader.result.substring(llave_reader.result.length/2), 16);
				var d = bigInt(llave_reader.result.substring(0,llave_reader.result.length/2), 16);

				bloque_length_rsa = n.toString(16).length;

				textoCifrado = file_reader.result;
				
				textoCifrado = obtenerBytesHexRSA(textoCifrado);

				for(var i = 0 ; i < textoCifrado.length ; i++){
					bloquesTextoPlano[i] = binariPowMod(textoCifrado[i], d, n);
					//$("#progressbarRSADescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
				}

				calcularBloqueLengthRSA(n);
				
				textoPlano = obtenerCaracteresRSA(bloquesTextoPlano, 4);

				for(var i  = 0 ; i < textoPlano.length ; i++){
					cadenaTextoPlano = cadenaTextoPlano + String.fromCharCode(textoPlano[i]);
				}

				fileDisplayArea.html(cadenaTextoPlano);
				cadenaTextoPlano = cadenaTextoPlano;
				
				var file = new File([cadenaTextoPlano], "ArchivoDescifradoRSA.txt", {type: "text/plain;charset=ISO-8859-1"});
				saveAs(file);
				$("#progressbarRSADescifrado").css('width','100%').attr('aria-valuenow', '100');
			}
		}
	}
	else{
		$('#fileDisplayAreaRSADescifrado').html(mensaje_89);
	}
}