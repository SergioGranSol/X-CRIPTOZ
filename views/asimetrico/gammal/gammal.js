var cancelado = false;
var velocidad = 1;
var msg_lenght = 0;
var bloque_length_elgamal = 0;

function sleepElGamal(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$.fn.scrollViewElGamal = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelElGamal(){
	$("#pnl-InteractivoElGamal").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function crearPanelCifradoElGamal(){
	$("#table-ElGamal1").append('<tr id="EG1row-0"><td id="EGcell1-0-0" colspan="' + (msg_lenght*4) + '"><b>Alice</b></td></tr>');
	$("#table-ElGamal3").append('<tr id="EG3row-0"><td id="EGcell2-0-0" colspan="' + (msg_lenght*3) + '"><b>Bob</b></td></tr>');

	for(var i = 0 ; i < 5 ; i++){
        $('#textoCElGamal').append('<label class="circulo" id="EGC-cell-'+i+'"></label>');
    }

	$("#table-ElGamal1").css("text-align","center");
	$("#table-ElGamal2").css("text-align","center");
	$("#table-ElGamal3").css("text-align","center");
}

function crearPanelDescifradoElGamal(){
	for(var i = 0 ; i < msg_lenght*2 ; i++){
        $('#textoDElGamal').append('<label class="circulo" id="EGD-cell-'+i+'"></label>');
    }

	$("#table-ElGamal4").css("text-align","center");
}

function cerrarPanelElGamal(){
	cancelado = true;

	$("#pnl-InteractivoElGamal").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCElGamal();
	limpiaPanelDElGamal();

	$("#btn-cifrarElGamal").show();
	$("#btn-velocidadCElGamal").show();
	$("#btn-cancelarCElGamal").hide();

	$("#btn-descifrarElGamal").show();
	$("#btn-velocidadDElGamal").show();
	$("#btn-cancelarDElGamal").hide();

	deleteErrorElGamal("textoPlanoElGamal");
	deleteErrorElGamal("llaveAElGamal");
	deleteErrorElGamal("llaveBElGamal");
	deleteErrorElGamal("generadoElGamal");
	deleteErrorElGamal("moduloCElGamal");
	deleteErrorElGamal("rDElGamal");
	deleteErrorElGamal("tDElGamal");
	deleteErrorElGamal("llaveBDElGamal");
	deleteErrorElGamal("moduloDElGamal");

	$("#in-llaveAElGamal").val("5");
	$("#in-llaveBElGamal").val("7");
	$("#in-generadoElGamal").val("3");
	$("#in-moduloCElGamal").val("66067");
	$("#in-moduloDElGamal").val("66067");
	$("#in-llaveBDElGamal").val("7");
}

function limpiaPanelCElGamal(){
	$("#table-ElGamal1").empty();
	$("#table-ElGamal2").empty();
	$("#table-ElGamal3").empty();

	$("#in-llaveAElGamal").val("");
	$("#in-llaveBElGamal").val("");
	$("#in-generadoElGamal").val("");
	$("#in-moduloCElGamal").val("");
	$("#in-textoPlanoElGamal").val("");
	$("#out-rCElGamal").val("");
	$("#out-tCElGamal").val("");

	$("#textoCElGamal").empty();

	if($('#EGdiv1').is(':visible')) {
		$("#EGdiv1").slideToggle(500);
	}
}

function limpiaPanelDElGamal(){
	$("#table-ElGamal4").empty();

	$("#in-rDElGamal").val("");
	$("#in-tDElGamal").val("");
	$("#in-moduloDElGamal").val("");
	$("#in-llaveBDElGamal").val("");
	$("#out-txtDescifradoElGamal").val("");

	$("#textoDElGamal").empty();

	if($('#EGdiv2').is(':visible')) {
		$("#EGdiv2").slideToggle(500);
	}
}

async function cifrarElGamal(){
	var llaveA = bigInt($("#in-llaveAElGamal").val());
	var llaveB = bigInt($("#in-llaveBElGamal").val());
	var generador = bigInt($("#in-generadoElGamal").val());
	var modulo = bigInt($("#in-moduloCElGamal").val());
	var mensaje = $("#in-textoPlanoElGamal").val().split("");
	var r = bigInt(0), beta = bigInt(0);
	var t = [], m = [];
	var criptograma = "";
	var mensaje2;

	limpiaPanelCElGamal();

	$("#in-llaveAElGamal").val(llaveA);
	$("#in-llaveBElGamal").val(llaveB);
	$("#in-generadoElGamal").val(generador);
	$("#in-moduloCElGamal").val(modulo);
	$("#in-textoPlanoElGamal").val(mensaje.join(""));

	if(mensaje.length%2 == 1){
		mensaje[mensaje.length] = "x";
	}
	
	msg_lenght = mensaje.length/2;

	bloque_length_elgamal = 2;

	//Texto Plano
	$('#EGdiv1').html('Bob escoge un numero primo <i>p</i>, un generador <i>g</i> y un numero secreto <i>b</i>.');
	$('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(4000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();
	
	crearPanelCifradoElGamal();

	if(cancelado){
		return;
	}

	$("#table-ElGamal3").append('<tr id="EG3row-1"></tr>');

	for(var i = 0 ; i < 3 && !cancelado ; i++){
		if(i == 0){
			$("#EG3row-1").append('<td id="EGcell3-1-'+i+'" colspan="' + msg_lenght + '">p = ' + modulo + '</td>');
		}
		else if(i == 1){
			$("#EG3row-1").append('<td id="EGcell3-1-'+i+'" colspan="' + msg_lenght + '">g = ' + generador + '</td>');
		}
		else{
			$("#EG3row-1").append('<td id="EGcell3-1-'+i+'" colspan="' + msg_lenght + '">b = ' + llaveB + '</td>');
		}

		putparpadeo("#EGcell3-1-"+i, 1*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		removeputparpadeo("#EGcell3-1-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("Bob calcula <i>β = g<sup>b</sup> mod p</i>.");
	$('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	$("#table-ElGamal3").append('<tr id="EG3row-2"><td id="EGcell3-2-0" colspan="' + (msg_lenght*3) + '">β = ' + generador + '<sup>' + llaveB + '</sup> mod ' + modulo + '</td></tr>');

	putparpadeo("#EGcell3-2-0", 2*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepElGamal(1000*velocidad);

	if(cancelado){
		return;
	}

	beta = bigInt(generador).modPow(llaveB, modulo);

	$("#table-ElGamal3").append('<tr id="EG3row-3"><td id="EGcell3-3-0" colspan="' + (msg_lenght*3) + '">β = ' + beta + '</td></tr>');

	putparpadeo("#EGcell3-3-0", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepElGamal(1000*velocidad);

	if(cancelado){
		return;
	}

	removeputparpadeo("#EGcell3-2-0", 2*velocidad, azul);
	removeputparpadeo("#EGcell3-3-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("Bob publica su llave pública (<i>p</i>, <i>g</i>, <i>β</i>)");
	$('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	$("#table-ElGamal2").append('<tr id="EG2row-0"><td id="EGcell2-0-0">(' + modulo + ', ' + generador + ', ' + beta + ')</td></tr>');

	putparpadeo("#EGcell2-0-0", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepElGamal(1000*velocidad);
	
	if(cancelado){
		return;
	}

	removeputparpadeo("#EGcell2-0-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("Alice descarga la llave publica de Bob y escoge un numero secreto <i>a</i>");
	$('#EGdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	$("#table-ElGamal1").append('<tr id="EG1row-1"></tr>');

	putparpadeo("#EGcell2-0-0", 3*velocidad, azul);

	for(var i = 0 ; i < 3 && !cancelado ; i++){
		if(i == 0){
			$("#EG1row-1").append('<td id="EGcell1-1-'+i+'" colspan="' + msg_lenght + '">p = ' + modulo + '</td>');
		}
		else if(i == 1){
			$("#EG1row-1").append('<td id="EGcell1-1-'+i+'" colspan="' + msg_lenght + '">g = ' + generador + '</td>');
		}
		else{
			$("#EG1row-1").append('<td id="EGcell1-1-'+i+'" colspan="' + msg_lenght + '">β = ' + beta + '</td>');
		}

		putparpadeo("#EGcell1-1-"+i, 1*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		removeputparpadeo("#EGcell1-1-"+i, 1*velocidad, azul);
	}

	removeputparpadeo("#EGcell2-0-0", 3*velocidad, azul);

	if(cancelado){
        return;
    }

	$("#EG1row-1").append('<td id="EGcell1-1-3" colspan="' + msg_lenght + '">a = ' + llaveA + '</td>');

	putparpadeo("#EGcell1-1-3", 1*velocidad, azul);

	await sleepElGamal(1000*velocidad);

	removeputparpadeo("#EGcell1-1-3", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("Alice convierte el mensaje claro en un numero <i>m</i> tal que 0 ≤ <i>m</i> < <i>n</i>. Para este ejemplo <i>m</i> será el valor de dos caracteres concatenados en hexadecimal en Z27 (a = 00 b = 01, ... , z = 1A). Para este ejemplo se cifrarán bloques de 2 caracteres, 'x' será el relleno.");
	$('#EGdiv1').slideToggle(500);

	await sleepElGamal(8000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	mensaje2 = obtenerBytesZ26ElGamal(mensaje);
	mensaje2 = obtenerBloquesElGamal(mensaje2, 2);

	$("#table-ElGamal1").append('<tr id="EG1row-2"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		$("#EG1row-2").append('<td id="EGcell1-2-'+i+'" style="padding-right: 10px; padding-left: 10px !important;" colspan="4">' + mensaje[i*2] + mensaje[i*2 +1] + ' = 0x' + mensaje2[i] + ' = ' + bigInt(mensaje2[i], 16) + '</td>');

		putparpadeo("#EGcell1-2-"+i, 1*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		removeputparpadeo("#EGcell1-2-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("Alice calcula <i>r = g<sup>a</sup> mod p</i>");
	$('#EGdiv1').slideToggle(500);

	await sleepElGamal(7000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	$("#table-ElGamal1").append('<tr id="EG1row-3"><td id="EGcell1-3-0" colspan="' + (msg_lenght*4) + '">r = ' + generador + '<sup>' + llaveA + '</sup> mod ' + modulo + '</td></tr>');

	putparpadeo("#EGcell1-3-0", 2*velocidad, azul);

	await sleepElGamal(1000*velocidad);

	if(cancelado){
		return;
	}

	r = bigInt(generador).modPow(llaveA, modulo);

	$("#table-ElGamal1").append('<tr id="EG1row-4"><td id="EGcell1-4-0" colspan="' + (msg_lenght*4) + '">r = ' + r + '</td></tr>');

	putparpadeo("#EGcell1-4-0", 1*velocidad, azul);

	await sleepElGamal(1000*velocidad);

	removeputparpadeo("#EGcell1-4-0", 1*velocidad, azul);
	removeputparpadeo("#EGcell1-3-0", 2*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("Alice calcula <i>t = β<sup>a</sup>*m mod p</i>");
	$('#EGdiv1').slideToggle(500);

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	$("#table-ElGamal1").append('<tr id="EG1row-5"><td id="EGcell1-5-0" colspan="' + (msg_lenght*4) + '"></td></tr>');
	$("#table-ElGamal1").append('<tr id="EG1row-6"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#EGcell1-2-"+i, 3*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		$("#EGcell1-5-0").html("t = " + beta + "<sup>" + llaveA + "</sup> * " + bigInt(mensaje2[i], 16) + " mod " + modulo);

		putparpadeo("#EGcell1-5-0", 2*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		t[i] = bigInt(bigInt(bigInt(beta).pow(llaveA)).multiply(bigInt(mensaje2[i], 16))).mod(modulo);
		criptograma = criptograma + t[i] + " ";

		$("#EG1row-6").append('<td id="EGcell1-6-'+i+'" colspan="4">' + t[i] + '</td>');

		putparpadeo("#EGcell1-6-"+i, 1*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		removeputparpadeo("#EGcell1-2-"+i, 3*velocidad, azul);
		removeputparpadeo("#EGcell1-5-0", 2*velocidad, azul);
		removeputparpadeo("#EGcell1-6-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#EGdiv1').slideToggle(500);

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv1').html("El texto cifrado es (r, t)");
	$('#EGdiv1').slideToggle(500);

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv1').scrollViewElGamal();

	putparpadeo("#EGcell1-4-0", 2*velocidad, azul);

	await sleepElGamal(1000*velocidad);

	$("#EGC-cell-0").html("<br>( ");
	$("#EGC-cell-1").html("<br>" + r);

	putparpadeo("#EGC-cell-1", 1*velocidad, negro);

	await sleepElGamal(1000*velocidad);

	removeputparpadeo("#EGcell1-4-0", 2*velocidad, azul);
	removeputparpadeo("#EGC-cell-1", 1*velocidad, negro);


	if(cancelado){
		return;
	}

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#EGcell1-6-"+i, 2*velocidad, azul);
	}

	await sleepElGamal(1000*velocidad);

	$("#EGC-cell-2").html("<br> , ");
	$("#EGC-cell-3").html("<br>" + criptograma);
	$("#EGC-cell-4").html("<br> )");

	putparpadeo("#EGC-cell-3", 1*velocidad, negro);

	await sleepElGamal(1000*velocidad);

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		removeputparpadeo("#EGcell1-6-"+i, 2*velocidad, azul);
	}

	removeputparpadeo("#EGC-cell-3", 1*velocidad, negro);

	if(cancelado){
		return;
	}

	//FIN
    $("#out-tCElGamal").val(criptograma);
    $("#out-rCElGamal").val(r);
    $("#btn-velocidadCElGamal").show();
    $("#btn-cifrarElGamal").show();
    $("#btn-cancelarCElGamal").hide();

    if(!cancelado){
        $('#EGdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        cancelado = true;
    }
}

async function descifrarElGamal(){
	var r = bigInt($("#in-rDElGamal").val());
	var criptograma = $("#in-tDElGamal").val().trim().split(/[ ]+/);
	var modulo = bigInt($("#in-moduloDElGamal").val());
	var llaveB = bigInt($("#in-llaveBDElGamal").val());
	var t = [], m = [];
	var mensaje = "", aux;
	var textoPlano;
	var r_inversa;
	
	msg_lenght = criptograma.length;
	bloque_length_elgamal = 2;
	
	limpiaPanelDElGamal();

	r_inversa = binariPowMod(r, modulo.subtract(llaveB).subtract(1), modulo);

	for(var i = 0 ; i < msg_lenght ; i++){
		t[i] = bigInt(criptograma[i]);
	}

	$("#in-rDElGamal").val(r);
	$("#in-tDElGamal").val(criptograma.join(" "));
	$("#in-moduloDElGamal").val(modulo);
	$("#in-llaveBDElGamal").val(llaveB);

	crearPanelDescifradoElGamal();

	$('#EGdiv2').html("Bob calcula el valor de <i>m = t*r <sup>-b</sup> mod p</i>");
	$('#EGdiv2').slideToggle(500);

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv2').scrollViewElGamal();

	$("#table-ElGamal4").append('<tr id="EG4row-0"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		$("#EG4row-0").append('<td id="EGcell4-0-'+i+'" colspan="2">' + t[i] + '</td>');

		putparpadeo("#EGcell4-0-"+i, 0.5*velocidad, azul);

		await sleepElGamal(500*velocidad);

		removeputparpadeo("#EGcell4-0-"+i, 0.5*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $("#table-ElGamal4").append('<tr id="EG4row-1"><td id="EGcell4-1-0" colspan="' + msg_lenght*2 + '"></td></tr>');
	$("#table-ElGamal4").append('<tr id="EG4row-2"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#EGcell4-0-"+i, 3*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		$("#EGcell4-1-0").html("m = " + t[i] + " * " + r + " <sup>-" + llaveB + "</sup> mod " + modulo);

		putparpadeo("#EGcell4-1-0", 2*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		//m[i] = bigInt(bigInt(r.pow(modulo.subtract(llaveB).subtract(1))).multiply(t[i])).mod(modulo); //m = r^(p-b-1)*t mod p
		m[i] = bigInt(r_inversa.multiply(t[i])).mod(modulo); //m = r^(p-b-1)*t mod p

		aux = m[i].toString(16);

		for(var j = aux.length ; j < 4 ; j++){
			aux = "0" + aux;
		}

		$("#EG4row-2").append('<td id="EGcell4-2-'+i+'" colspan="2">' + m[i] + ' = 0x' + aux + '</td>');

		putparpadeo("#EGcell4-2-"+i, 1*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		removeputparpadeo("#EGcell4-0-"+i, 3*velocidad, azul);
		removeputparpadeo("#EGcell4-1-0", 2*velocidad, azul);
		removeputparpadeo("#EGcell4-2-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#EGdiv2').slideToggle(500);

	await sleepElGamal(1000);
	
	if(cancelado){
		return;
	}

	$('#EGdiv2').html("Bob convierte <i>m</i> a texto usando la misma tecnica que Alice.");
	$('#EGdiv2').slideToggle(500);

	await sleepElGamal(4000);

	if(cancelado){
		return;
	}

	$('#EGdiv2').scrollViewElGamal();

	textoPlano = obtenerCaracteresElGamal(m, 2);

	$("#table-ElGamal4").append('<tr id="EG4row-3"></tr>');
	$("#table-ElGamal4").append('<tr id="EG4row-4"></tr>');

	for(var i = 0 ; i < msg_lenght && !cancelado ; i++){
		putparpadeo("#EGcell4-2-"+i, 5*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		$("#EG4row-3").append('<td id="EGcell4-3-'+(i*2)+'">0x' + ((textoPlano[i*2].toString(16).length==2)?textoPlano[i*2].toString(16):("0"+textoPlano[i*2].toString(16))) + ' = ' + textoPlano[i*2] + '</td>');
		putparpadeo("#EGcell4-3-"+(i*2), 2*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		$("#EG4row-4").append('<td id="EGcell4-4-'+(i*2)+'">' + String.fromCharCode(textoPlano[i*2]) + '</td>');
		$("#EGD-cell-"+(i*2)).html("<br>" + String.fromCharCode(textoPlano[i*2]));
		putparpadeo("#EGcell4-4-"+(i*2), 1*velocidad, azul);
		putparpadeo("#EGD-cell-"+(i*2), 1*velocidad, negro);

		mensaje = mensaje + String.fromCharCode(textoPlano[i*2]);

		await sleepElGamal(1000);

		removeputparpadeo("#EGcell4-3-"+(i*2), 2*velocidad, azul);
		removeputparpadeo("#EGcell4-4-"+(i*2), 1*velocidad, azul);
		removeputparpadeo("#EGD-cell-"+(i*2), 1*velocidad, negro);

		$("#EG4row-3").append('<td id="EGcell4-3-'+(i*2 + 1)+'">0x' + ((textoPlano[i*2 + 1].toString(16).length==2)?textoPlano[i*2 + 1].toString(16):("0"+textoPlano[i*2 + 1].toString(16))) + ' = ' + textoPlano[i*2 + 1] + '</td>');
		putparpadeo("#EGcell4-3-"+(i*2 + 1), 2*velocidad, azul);

		await sleepElGamal(1000*velocidad);

		$("#EG4row-4").append('<td id="EGcell4-4-'+(i*2 + 1)+'">' + String.fromCharCode(textoPlano[i*2 + 1]) + '</td>');
		$("#EGD-cell-"+(i*2 + 1)).html("<br>" + String.fromCharCode(textoPlano[i*2 + 1]));
		putparpadeo("#EGcell4-4-"+(i*2 + 1), 1*velocidad, azul);
		putparpadeo("#EGD-cell-"+(i*2 + 1), 1*velocidad, negro);

		mensaje = mensaje + String.fromCharCode(textoPlano[i*2 + 1]);

		await sleepElGamal(1000);

		removeputparpadeo("#EGcell4-3-"+(i*2 + 1), 2*velocidad, azul);
		removeputparpadeo("#EGcell4-4-"+(i*2 + 1), 1*velocidad, azul);
		removeputparpadeo("#EGD-cell-"+(i*2 + 1), 1*velocidad, negro);

		removeputparpadeo("#EGcell4-2-"+i, 5*velocidad, azul);
	}

	if(cancelado){
		return;
	}

	//FIN
    $("#out-txtDescifradoElGamal").val(mensaje);
    $("#btn-velocidadDElGamal").show();
    $("#btn-descifrarElGamal").show();
    $("#btn-cancelarDElGamal").hide();

    if(!cancelado){
        $('#EGdiv2').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        cancelado = true;
    }
}

function validarEntradaTextoCElGamal(){
	var mensaje = "";
	var texto = $('#in-textoPlanoElGamal').val();

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

function validarEntradaLlaveAElGamal(){
	var mensaje = "";
	var llave = $('#in-llaveAElGamal').val();
	var p = bigInt($('#in-moduloCElGamal').val());

	if (!llave.match(/^[0-9]+$/) || bigInt(llave).compare(1) == -1 || bigInt(llave).compare(p.minus(1)) != -1) {
		mensaje = mensaje_147;
	}

	return mensaje;
}

function validarEntradaLlaveBCElGamal(){
	var mensaje = "";
	var llave = $('#in-llaveBElGamal').val();
	var p = bigInt($('#in-moduloCElGamal').val());

	if (!llave.match(/^[0-9]+$/) || bigInt(llave).compare(1) == -1 || bigInt(llave).compare(p.minus(1)) != -1) {
		mensaje = mensaje_149;
	}

	return mensaje;
}

function validarEntradaRaizElGamal(){
	var mensaje = "";
	var generador = $('#in-generadoElGamal').val();
	var p = bigInt($('#in-moduloCElGamal').val());

	if (!generador.match(/^[0-9]+$/) || bigInt(generador).compare(1) == -1 || bigInt(generador).compare(p) != -1) {
		mensaje = mensaje_40;
	}

	return mensaje;
}

function validarEntradaModuloCElGamal(){
	var mensaje = "";
	var modulo = $('#in-moduloCElGamal').val();

	if(!modulo.match(/^[0-9]+$/) || bigInt(modulo).isPrime() == false || bigInt(modulo).compare(100000) == 1 || bigInt(modulo).compare(65536) == -1){
		mensaje = mensaje_51;
	}

	return mensaje;
}

function validarEntradaRElGamal(){
	var mensaje = "";
	var r = $('#in-rDElGamal').val();
	var p = bigInt($('#in-moduloDElGamal').val());

	if (!r.match(/^[0-9]+$/) || bigInt(r).compare(0) == -1 || bigInt(r).compare(p) != -1) {
		mensaje = mensaje_52;
	}

	return mensaje;
}

function validarEntradaTElGamal(){
	var mensaje = "";
	var t = $('#in-tDElGamal').val();
	var p = bigInt($('#in-moduloDElGamal').val());

	if(!t.match(/^(-?[0-9]+ *)+$/)){
    	mensaje = mensaje_53;
	}
	else if(t.trim().split(/[ ]+/).length < 1 || t.trim().split(/[ ]+/).length > 5){
		mensaje = mensaje_54;
	}
    else{
    	t = t.trim().split(" ")
		
        for(var i = 0 ; i < t.length ; i++){
			if(bigInt(t[i]).compare(0) == -1 || bigInt(t[i]).compare(p) != -1){
				mensaje = mensaje_55;
			}
		}
    }

	return mensaje;
}

function validarEntradaLlaveBDElGamal(){
	var mensaje = "";
	var llave = $('#in-llaveBDElGamal').val();
	var p = bigInt($('#in-moduloDElGamal').val());

	if (!llave.match(/^[0-9]+$/) || bigInt(llave).compare(1) == -1 || bigInt(llave).compare(p.minus(1)) != -1) {
		mensaje = mensaje_149;
	}

	return mensaje;
}

function validarEntradaModuloDElGamal(){
	var mensaje = "";
	var modulo = $('#in-moduloDElGamal').val();

	if(!modulo.match(/^[0-9]+$/) || modulo.length < 1 || bigInt(modulo).isPrime() == false || bigInt(modulo).compare(100000) == 1 || bigInt(modulo).compare(65536) == -1){
		mensaje = mensaje_51;
	}

	return mensaje;
}

function addErrorElGamal(id, mensaje){
	$("#" + id + "-error").remove();
	if(id == "rDElGamal")
    	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    else
    	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorElGamal(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoElGamalC1").click(function(){
        $("#btn-cifrarElGamal").html('Cifrado Rápido');
        $("#btn-cifrarElGamal").val(1);
    });
    $("#tipoElGamalC2").click(function(){
        $("#btn-cifrarElGamal").html('Cifrado Normal');
        $("#btn-cifrarElGamal").val(2);
    });
    $("#tipoElGamalC3").click(function(){
        $("#btn-cifrarElGamal").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarElGamal").val(3);
    });
    $("#tipoElGamalD1").click(function(){
        $("#btn-descifrarElGamal").html('Descifrado Rápido');
        $("#btn-descifrarElGamal").val(1);
    });
    $("#tipoElGamalD2").click(function(){
        $("#btn-descifrarElGamal").html('Descifrado Normal');
        $("#btn-descifrarElGamal").val(2);
    });
    $("#tipoElGamalD3").click(function(){
        $("#btn-descifrarElGamal").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarElGamal").val(3);
    });

    $("#in-textoPlanoElGamal").keyup(function(){
        var mensaje = validarEntradaTextoCElGamal();

        if($("#in-textoPlanoElGamal").val().length == 0){
        	deleteErrorElGamal("textoPlanoElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("textoPlanoElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("textoPlanoElGamal");
	        }
	    }
    });

    $("#in-llaveAElGamal").on('click change keyup', function() {
        var mensaje = validarEntradaLlaveAElGamal();

        if($("#in-llaveAElGamal").val().length == 0){
        	deleteErrorElGamal("llaveAElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("llaveAElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("llaveAElGamal");
	        }
	    }
    });

    $("#in-llaveBElGamal").on('click change keyup', function() {
        var mensaje = validarEntradaLlaveBCElGamal();

        if($("#in-llaveBElGamal").val().length == 0){
        	deleteErrorElGamal("llaveBElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("llaveBElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("llaveBElGamal");
	        }
	    }
    });

    $("#in-generadoElGamal").on('click change keyup', function() {
        var mensaje = validarEntradaRaizElGamal();

        if($("#in-generadoElGamal").val().length == 0){
        	deleteErrorElGamal("generadoElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("generadoElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("generadoElGamal");
	        }
	    }
    });

    $("#in-moduloCElGamal").on('click change keyup', function() {
        var mensaje = validarEntradaModuloCElGamal();

        if($("#in-moduloCElGamal").val().length == 0){
        	deleteErrorElGamal("moduloCElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("moduloCElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("moduloCElGamal");

	            if(validarEntradaRaizElGamal().length == 0)
	            	deleteErrorElGamal("generadoElGamal");

	            if(validarEntradaLlaveAElGamal().length == 0)
	            	deleteErrorElGamal("llaveAElGamal");

	            if(validarEntradaLlaveBCElGamal().length == 0)
	            	deleteErrorElGamal("llaveBElGamal");
	        }
	    }
    });

    $("#in-rDElGamal").keyup(function(){
        var mensaje = validarEntradaRElGamal();

        if($("#in-rDElGamal").val().length == 0){
        	deleteErrorElGamal("rDElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("rDElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("rDElGamal");
	        }
	    }
    });

    $("#in-tDElGamal").keyup(function(){
        var mensaje = validarEntradaTElGamal();

        if($("#in-tDElGamal").val().length == 0){
        	deleteErrorElGamal("tDElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("tDElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("tDElGamal");
	        }
	    }
    });

    $("#in-llaveBDElGamal").on('click change keyup', function() {
        var mensaje = validarEntradaLlaveBDElGamal();

        if($("#in-llaveBDElGamal").val().length == 0){
        	deleteErrorElGamal("llaveBDElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("llaveBDElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("llaveBDElGamal");
	        }
	    }
    });

    $("#in-moduloDElGamal").on('click change keyup', function() {
        var mensaje = validarEntradaModuloDElGamal();

        if($("#in-moduloDElGamal").val().length == 0){
        	deleteErrorElGamal("moduloDElGamal");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorElGamal("moduloDElGamal", mensaje);
	        } else{
	            deleteErrorElGamal("moduloDElGamal");

	            if(validarEntradaRElGamal().length == 0)
	            	deleteErrorElGamal("rDElGamal");

	            if(validarEntradaTElGamal().length == 0)
	            	deleteErrorElGamal("tDElGamal");

	            if(validarEntradaLlaveBDElGamal().length == 0)
	            	deleteErrorElGamal("llaveBDElGamal");
	        }
	    }
    });

	$("#btn-cifrarElGamal").click(function(){
		var mensajetexto = validarEntradaTextoCElGamal();
		var mensajellaveA = validarEntradaLlaveAElGamal();
		var mensajemodulo = validarEntradaModuloCElGamal();
		var mensajeraiz = validarEntradaRaizElGamal();
		var mensajellaveB = validarEntradaLlaveBCElGamal();

		if(mensajetexto.length == 0 && mensajellaveA.length == 0 && mensajemodulo.length == 0 && mensajeraiz.length == 0 && mensajellaveB.length == 0){
			$("#textoPlanoElGamal-error").remove();
			$("#llaveAElGamal-error").remove() ;
			$("#moduloCElGamal-error").remove();
            $("#generadoElGamal-error").remove();
            $("#llaveBElGamal-error").remove();
            $("#in-textoPlanoElGamal").removeClass('input-error');
            $("#in-llaveAElGamal").removeClass('input-error');
            $("#in-moduloCElGamal").removeClass('input-error');
            $("#in-generadoElGamal").removeClass('input-error');
            $("#in-llaveBElGamal").removeClass('input-error');

            if($('#btn-cifrarElGamal').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarElGamal').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCElGamal").hide();
            $("#btn-cifrarElGamal").hide();
            $("#btn-cancelarCElGamal").show();
            cancelado = false;
            
            cifrarElGamal();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorElGamal("textoPlanoElGamal", mensajetexto);
			}
			if(mensajellaveA.length > 0){
				addErrorElGamal("llaveAElGamal", mensajellaveA);
			}
			if(mensajemodulo.length > 0){
				addErrorElGamal("moduloCElGamal", mensajemodulo);
			}
			if(mensajeraiz.length > 0){
				addErrorElGamal("generadoElGamal", mensajeraiz);
			}
			if(mensajellaveB.length > 0){
				addErrorElGamal("llaveBElGamal", mensajellaveB);
			}
		}
	});

	$("#btn-cancelarCElGamal").click(function(){
        cancelado = true;

        limpiaPanelCElGamal();

        $("#btn-cifrarElGamal").show();
        $("#btn-velocidadCElGamal").show();
        $("#btn-cancelarCElGamal").hide();
    });

    $("#btn-cancelarDElGamal").click(function(){
        cancelado = true;

        limpiaPanelDElGamal();

        $("#btn-descifrarElGamal").show();
        $("#btn-velocidadDElGamal").show();
        $("#btn-cancelarDElGamal").hide();
    });

    $("#btn-copiarTextoElGamal").click(function(){
        if ($("#out-tCElGamal").val() == ''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-tDElGamal").val($("#out-tCElGamal").val());
			$("#in-rDElGamal").val($("#out-rCElGamal").val());
			$("#in-moduloDElGamal").val($("#in-moduloCElGamal").val());
			$("#in-llaveBDElGamal").val($("#in-llaveBElGamal").val());

			if (validarEntradaRElGamal().length == 0){
	        	$("#rDElGamal-error").remove();
	            $("#in-rDElGamal").removeClass('input-error');
	        }

	        if (validarEntradaTElGamal().length == 0){
	        	$("#tDElGamal-error").remove();
	            $("#in-tDElGamal").removeClass('input-error');
	        }

	        if (validarEntradaModuloDElGamal().length == 0){
	        	$("#moduloDElGamal-error").remove();
	            $("#in-moduloDElGamal").removeClass('input-error');
	        }

	        if (validarEntradaLlaveBDElGamal().length == 0){
	        	$("#llaveBDElGamal-error").remove();
	            $("#in-llaveBDElGamal").removeClass('input-error');
	        }
		}
    });

    $("#btn-descifrarElGamal").click(function(){
    	var mensajer = validarEntradaRElGamal();
		var mensajet = validarEntradaTElGamal();
		var mensajemodulo = validarEntradaModuloDElGamal();
		var mensajellaveB = validarEntradaLlaveBDElGamal();

		if(mensajer.length == 0 && mensajet.length == 0 && mensajemodulo.length == 0 && mensajellaveB.length == 0){
			$("#rDElGamal-error").remove();
			$("#tDElGamal-error").remove();
			$("#moduloDElGamal-error").remove();
            $("#llaveBDElGamal-error").remove();
            $("#in-rDElGamal").removeClass('input-error');
            $("#in-tDElGamal").removeClass('input-error');
            $("#in-moduloDElGamal").removeClass('input-error');
            $("#in-llaveBDElGamal").removeClass('input-error');

            if($('#btn-descifrarElGamal').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarElGamal').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDElGamal").hide();
            $("#btn-descifrarElGamal").hide();
            $("#btn-cancelarDElGamal").show();
            cancelado = false;
            
            descifrarElGamal();
		}
		else{
			if(mensajer.length > 0){
				addErrorElGamal("rDElGamal", mensajer);
			}
			if(mensajet.length > 0){
				addErrorElGamal("tDElGamal", mensajet);
			}
			if(mensajemodulo.length > 0){
				addErrorElGamal("moduloDElGamal", mensajemodulo);
			}
			if(mensajellaveB.length > 0){
				addErrorElGamal("llaveBDElGamal", mensajellaveB);
			}
		}
	});

	$("#generarLlaveElGamal").click(function(){
		generarLlaveElGamal();
	});

	$("#cifrarArchivoElGamal").click(function(){
		cifrarArchivoElGamal();
	});

	$("#descifrarArchivoElGamal").click(function(){
		descifrarArchivoElGamal();
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

function obtenerBytesElGamal(flujo){
	var bytes = [];
	var i = 0;

	for( ; i < flujo.length ; i++){
		bytes[i] = flujo.charCodeAt(i);
	}

	return bytes;
}

function obtenerBytesZ26ElGamal(flujo){
	var bytes = [];
	var i = 0;

	for( ; i < flujo.length ; i++){
		bytes[i] = flujo[i].charCodeAt();
	}

	return bytes;
}

function obtenerBytesHexElGamal(flujo){
	var bytes = [];
	var i = 0, j = 0;
	var aux = "";

	for( ; i < flujo.length/bloque_length_elgamal ; i++, j = j+bloque_length_elgamal){
		aux = flujo.substring(j, j+bloque_length_elgamal);
		bytes[i] = bigInt(aux, 16);
	}

	return bytes;
}

function obtenerBloquesElGamal(bytes, size){
	var n = Math.ceil(bytes.length/bloque_length_elgamal);// console.log(n);
	var bloques = [n];
	var bloque = "";
	var index = 0;

	for(var i = 0 ; i < n ; i++){
		bloque = "";
		//console.log("awado " + index + " + " + bloque_length_elgamal + " = " + (index+bloque_length_elgamal) + " <= " + bytes.length);
		if(index + bloque_length_elgamal <= bytes.length){
			for (var j = 0 ; j < bloque_length_elgamal ; j++, index++) {
				for(var k = 0 ; k < size-bytes[index].toString(16).length ; k++){
					bloque = bloque + "0";
				}

				bloque = bloque + bytes[index].toString(16);
			}
			
			bloques[i] = bloque;//console.log(i + " - " + bloques[i].toString(16));
		}
		else{
			for( ; index < bytes.length ; index++){
				for(var k = 0 ; k < size-bytes[index].toString(16).length ; k++){
					bloque = bloque + "0";
				}

				bloque = bloque + bytes[index].toString(16);
			}

			for( ; index < n*bloque_length_elgamal ; index++){
				bloque = bloque + ((size==2)?"00":"0000");
			}

			bloques[i] = bloque;//console.log(i + " - " + bloques[i].toString(16));
		}
	}

	return bloques;
}

function obtenerCaracteresElGamalHex(textoCifrado, tamanio){
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

function obtenerCaracteresElGamal(textoPlano, size){
	var mensaje = [];
	var cadena = "", aux = "";
	var index = 0, j = 0, k = 0;

	for(var i = 0 ; i < textoPlano.length ; i++){
		cadena = textoPlano[i].toString(16);

		for(j = cadena.length ; j < bloque_length_elgamal*size ; j++){
			cadena = "0" + cadena;
		}

		for( k = 0, j = 0 ; k < cadena.length/size ; k++, j = j+size, index++){
			aux = cadena.substring(j, j+size);
			mensaje[index] = bigInt(aux, 16);
		}
	}

	return mensaje;
}

function calcularBloqueLengthElGamal(p){
	var m = "";

	do{
		m = m + "FFFF";
	} while(bigInt(m, 16).compare(p) == -1);

	m = m.substring(4);

	bloque_length_elgamal = m.length/4;

	return;
}

function generarLlaveElGamal(){
	var e_fileInput = document.getElementById('eElGamal');
	var alfa_fileInput = document.getElementById('raizElGamal');
	var p_fileInput = document.getElementById('pElGamal');
	var textType = /text.*/;
	var llave = "";
	var p, alfa, e;

	if(p_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalVerificar').html(mensaje_101);
		return;
	}
	else if(alfa_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalVerificar').html(mensaje_115);
		return;
	}
	else if(e_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalVerificar').html(mensaje_103);
		return;
	}

	var e_file = e_fileInput.files[0];
	var p_file = p_fileInput.files[0];
	var alfa_file = alfa_fileInput.files[0];
	
	if(e_file.type.match(textType) && p_file.type.match(textType) && alfa_file.type.match(textType)) {
		var p_reader = new FileReader();
		var alfa_reader = new FileReader();
		var e_reader = new FileReader();

		p_reader.readAsText(p_file, 'ISO-8859-1');
		alfa_reader.readAsText(alfa_file, 'ISO-8859-1');
		e_reader.readAsText(e_file, 'ISO-8859-1');
		
		p_reader.onload = function(e) {console.log(bigInt(p_reader.result,16).toString());console.log(bigInt(p_reader.result,16).isPrime());
			if(!p_reader.result.match(/^[0-9a-fA-F]+$/)){
				$('#fileDisplayAreaGamalVerificar').html(mensaje_108);
				return;
			}
			else if(bigInt(p_reader.result, 16).toString(2).length < 17 || bigInt(p_reader.result, 16).toString(2).length > 1024 || !bigInt(p_reader.result, 16).isPrime()){
				$('#fileDisplayAreaGamalVerificar').html(mensaje_145);
				return;
			}

			p = bigInt(p_reader.result, 16);

			alfa_reader.onload = function(e){
				if(!alfa_reader.result.match(/^[0-9a-fA-F]+$/)){
					$('#fileDisplayAreaGamalVerificar').html(mensaje_116);
					return;
				}
				else if(bigInt(alfa_reader.result,16).compare(p) != -1 || bigInt(alfa_reader.result, 16).compare(0) != 1){
					$('#fileDisplayAreaGamalVerificar').html(mensaje_146);
					return;
				}

				alfa = bigInt(alfa_reader.result, 16);

				e_reader.onload = function(e){
					if(!e_reader.result.match(/^[0-9a-fA-F]+$/)){
						$('#fileDisplayAreaGamalVerificar').html(mensaje_112);
						return;
					}
					else if(bigInt(e_reader.result, 16).compare(0) != 1 || bigInt(e_reader.result, 16).compare(p.minus(1)) != -1){
						$('#fileDisplayAreaGamalVerificar').html(mensaje_148);
						return;
					}

					e = bigInt(e_reader.result, 16);
					var beta;
					var tamanio;

					beta = binariPowMod(alfa, e, p);

					tamanio = p.toString(16).length;

					for(var i = 0 ; i < tamanio-p.toString(16).length ; i++){
						llave = llave + "0";
					}

					llave = llave + p.toString(16);

					for(var i = 0 ; i < tamanio-alfa.toString(16).length ; i++){
						llave = llave + "0";
					}

					llave = llave + alfa.toString(16);

					for(var i = 0 ; i < tamanio-beta.toString(16).length ; i++){
						llave = llave + "0";
					}

					llave = llave + beta.toString(16);
					llave = llave.toUpperCase();
					
					var llave_file = new File([llave], "Llave.txt", {type: "text/plain;charset=ISO-8859-1"});
					saveAs(llave_file);

					$('#fileDisplayAreaGamalVerificar').html(mensaje_117);
				}
			}
		}
	}
	else {
		$('#fileDisplayAreaGamalVerificar').html(mensaje_89);
	}
}

function cifrarArchivoElGamal() {
	var fileDisplayArea = $('#fileDisplayAreaGamalCifrado');
	var e_fileInput = document.getElementById('eCElGamal');
	var llave_fileInput = document.getElementById('llaveElGamal');
	var file_fileInput = document.getElementById('fileInputCElGamal');
    var textType = /text.*/;
	var textoPlano, textoCifrado = [], criptograma, cadenaTextoCifrado = "";
	$("#progressbarGamalCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if(llave_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalCifrado').html(mensaje_104);
		return;
	}
	else if(e_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalCifrado').html(mensaje_103);
		return;
	}
	else if(file_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalCifrado').html(mensaje_92);
		return;
	}
	
	var llave_file = llave_fileInput.files[0];
	var e_file = e_fileInput.files[0];
	var file = file_fileInput.files[0];
	
	if (file.type.match(textType) && llave_file.type.match(textType) && e_file.type.match(textType)) {
		if(file.size > 1024){
			$('#fileDisplayAreaGamalCifrado').html(mensaje_106);
			return;
		}

		var file_reader = new FileReader();
		var llave_reader = new FileReader();
		var e_reader = new FileReader();

		llave_reader.readAsText(llave_file, 'ISO-8859-1');
		e_reader.readAsText(e_file, 'ISO-8859-1');
		file_reader.readAsText(file, 'ISO-8859-1');
		
		llave_reader.onload = function(e){console.log(bigInt(llave_reader.result,16).toString(16).length);
			if(!llave_reader.result.match(/^[0-9a-fA-F]+$/)){
				$('#fileDisplayAreaGamalCifrado').html(mensaje_107);
				return;
			}
			else if(llave_reader.result.length%3 != 0 || bigInt(llave_reader.result,16).toString(16).length > 768 || bigInt(llave_reader.result,16).toString(16).length < 15){
				$('#fileDisplayAreaGamalCifrado').html(mensaje_142);
				return;
			}

			e_reader.onload = function(e){
				if(!e_reader.result.match(/^[0-9a-fA-F]+$/)){
					$('#fileDisplayAreaGamalCifrado').html(mensaje_112);
					return;
				}
				else if(bigInt(e_reader.result, 16).compare(0) != 1 || bigInt(e_reader.result, 16).toString(16).length > 256){
					$('#fileDisplayAreaGamalCifrado').html(mensaje_151);
					return;
				}

				file_reader.onload = function(e){
					var p = bigInt(llave_reader.result.substring(0,llave_reader.result.length/3), 16);
					var alfa = bigInt(llave_reader.result.substring(llave_reader.result.length/3, llave_reader.result.length*2/3), 16);
					var beta = bigInt(llave_reader.result.substring(llave_reader.result.length*2/3), 16);
					var e = bigInt(e_reader.result, 16);
					var r;
					var beta_i;
					
					var bloque_criptograma_length = 0;

					r = binariPowMod(alfa, e, p);

					calcularBloqueLengthElGamal(p);

					textoPlano = file_reader.result;
					
					textoPlano = obtenerBytesElGamal(textoPlano);
					textoPlano = obtenerBloquesElGamal(textoPlano, 4);//console.log(textoPlano);

					beta_i = binariPowMod(beta, e, p);

					for(var i = 0 ; i < textoPlano.length ; i++){
						textoCifrado[i] = (beta_i.multiply(bigInt(textoPlano[i], 16))).mod(p);
						//$("#progressbarGamalCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
					}
					//console.log(textoCifrado);
					bloque_criptograma_length = p.toString(16).length;
					criptograma = obtenerCaracteresElGamalHex(textoCifrado, bloque_criptograma_length);//console.log(criptograma);

					for(var i = 0 ; i < bloque_criptograma_length-r.toString(16).length ; i++){
						cadenaTextoCifrado = cadenaTextoCifrado + "0";
					}

					cadenaTextoCifrado = cadenaTextoCifrado + r.toString(16);

					for(var i  = 0 ; i < criptograma.length ; i++){
						cadenaTextoCifrado = cadenaTextoCifrado + criptograma[i];
					}

					fileDisplayArea.html(cadenaTextoCifrado.toUpperCase());
					cadenaTextoCifrado =  "\ufeff"+cadenaTextoCifrado.toUpperCase();
					
					var file = new File([cadenaTextoCifrado], "ArchivoCifradoElGamal.txt", {type: "text/plain;charset=ISO-8859-1"});
					saveAs(file);
					$("#progressbarGamalCifrado").css('width','100%').attr('aria-valuenow', '100');
				}
			}
		}
	}
	else {
		$('#fileDisplayAreaGamalCifrado').html(mensaje_89);
	}
}
	
function descifrarArchivoElGamal() {
	var fileDisplayArea = $('#fileDisplayAreaGamalDescifrado');
	var p_fileInput = document.getElementById('pDElGamal');
	var e_fileInput = document.getElementById('eDElGamal');
	var file_fileInput = document.getElementById('fileInputDElGamal');
    var textType = /text.*/;
	var textoCifrado, bloquesTextoPlano = [], textoPlano, cadenaTextoPlano = "";
	var p, e, r, t;
	$("#progressbarGamalDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if(p_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalDescifrado').html(mensaje_101);
		return;
	}
	else if(e_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalDescifrado').html(mensaje_103);
		return;
	}
	else if(file_fileInput.files.length == 0){
		$('#fileDisplayAreaGamalDescifrado').html(mensaje_93);
		return;
	}
	
	var p_file = p_fileInput.files[0];
	var e_file = e_fileInput.files[0];
	var file = file_fileInput.files[0];
	
	if (file.type.match(textType)) {
		if(file.size > 1024*5){
			$('#fileDisplayAreaGamalDescifrado').html(mensaje_143);
			return;
		}
		var file_reader = new FileReader();
		var p_reader = new FileReader();
		var e_reader = new FileReader();

		p_reader.readAsText(p_file, 'ISO-8859-1');
		e_reader.readAsText(e_file, 'ISO-8859-1');
		file_reader.readAsText(file, 'ISO-8859-1');

		p_reader.onload = function(e) {
			if(!p_reader.result.match(/^[0-9a-fA-F]+$/)){
				$('#fileDisplayAreaGamalDescifrado').html(mensaje_108);
				return;
			}
			else if(bigInt(p_reader.result, 16).toString(2).length < 17 || bigInt(p_reader.result, 16).toString(2).length > 1024 || !bigInt(p_reader.result, 16).isPrime()){
				$('#fileDisplayAreaGamalDescifrado').html(mensaje_145);
				return;
			}

			p = bigInt(p_reader.result, 16);
			
			e_reader.onload = function(e) {
				if(!e_reader.result.match(/^[0-9a-fA-F]+$/)){
						$('#fileDisplayAreaGamalDescifrado').html(mensaje_112);
						return;
					}
					else if(bigInt(e_reader.result, 16).compare(0) != 1 || bigInt(e_reader.result, 16).compare(p.minus(1)) != -1){
						$('#fileDisplayAreaGamalDescifrado').html(mensaje_148);
						return;
					}

				file_reader.onload = function(e) {
					if(!file_reader.result.match(/^[0-9a-fA-F]+$/)){
						$('#fileDisplayAreaGamalDescifrado').html(mensaje_144);
						return;
					}
					
					e = bigInt(e_reader.result, 16);
					r = bigInt(file_reader.result.substring(0, p.toString(16).length), 16);
					t = bigInt(file_reader.result.substring(p.toString(16).length), 16);

					bloque_length_elgamal = p.toString(16).length;

					textoCifrado = file_reader.result.substring(p.toString(16).length);
					
					textoCifrado = obtenerBytesHexElGamal(textoCifrado);console.log(textoCifrado);

					r = binariPowMod(r, e, p);
					r = r.modInv(p);

					for(var i = 0 ; i < textoCifrado.length ; i++){
						bloquesTextoPlano[i] = (r.multiply(textoCifrado[i])).mod(p);
						//$("#progressbarGamalDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
					}

					calcularBloqueLengthElGamal(p);
					
					textoPlano = obtenerCaracteresElGamal(bloquesTextoPlano, 4);

					for(var i  = 0 ; i < textoPlano.length ; i++){
						cadenaTextoPlano = cadenaTextoPlano + String.fromCharCode(textoPlano[i]);
					}

					fileDisplayArea.html(cadenaTextoPlano);
					cadenaTextoPlano = cadenaTextoPlano;
					
					var file = new File([cadenaTextoPlano], "ArchivoDescifradoElGamal.txt", {type: "text/plain;charset=ISO-8859-1"});
					saveAs(file);
					$("#progressbarGamalDescifrado").css('width','100%').attr('aria-valuenow', '100');
				}
			}
		}
	}
	else{
		$('#fileDisplayAreaGamalDescifrado').html(mensaje_89);
	}
}