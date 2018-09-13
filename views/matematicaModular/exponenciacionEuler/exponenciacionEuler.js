var cancelado = false;
var velocidad = 1;

$.fn.scrollViewEE = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepEE(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelExponenciacionEuler() {
	$("#pnl-InteractivoExponenciacionEuler").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelExponenciacionEuler(){
	cancelado = true;

	$("#pnl-InteractivoExponenciacionEuler").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelExponenciacionEuler();

	$("#in-baseExponenciacionEuler").val("3");
	$("#in-exponenteExponenciacionEuler").val("49");
	$("#in-valorAnilloExponenciacionEuler").val("19");

	$("#btn-comenzarExponenciacionEuler").show();
	$("#btn-velocidadExponenciacionEuler").show();
	$("#btn-cancelarExponenciacionEuler").hide();

	deleteErrorExponenciacionEuler("baseExponenciacionEuler");
	deleteErrorExponenciacionEuler("exponenteExponenciacionEuler");
	deleteErrorExponenciacionEuler("valorAnilloExponenciacionEuler");
}

function limpiaPanelExponenciacionEuler(){
	$('#EEdiv1').empty();
	$('#EEdiv2').empty();
	$('#valorExponenciacionEuler').html("<br>");
	$('#out-exponenciacionEuler').val('');

	$("#in-baseExponenciacionEuler").val("");
	$("#in-exponenteExponenciacionEuler").val("");
	$("#in-valorAnilloExponenciacionEuler").val("");

	if($('#EEdiv').is(':visible')) {
		$("#EEdiv").slideToggle(500);
	}
}

async function comenzarExponenciacionEuler(){
	var base = parseInt($("#in-baseExponenciacionEuler").val());
	var e = parseInt($("#in-exponenteExponenciacionEuler").val());
	var m = parseInt($("#in-valorAnilloExponenciacionEuler").val());
	var phi = calcularPhi(m);
	var r = 0, r2 = 0;
	var resultado = 0;
	
	limpiaPanelExponenciacionEuler();

	$("#in-baseExponenciacionEuler").val(base);
	$("#in-exponenteExponenciacionEuler").val(e);
	$("#in-valorAnilloExponenciacionEuler").val(m);

	$('#EEdiv').html('Se calcula φ(m).');
	$('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(3000);
	
	if(cancelado){
		return;
	}

	$('#EEdiv').scrollViewEE();

	$('#EEdiv1').append('<table class="table tabla tableVI3" id="tabla1"><tr id="phi"><td>φ(' + m + ') = ' + phi + '</td></tr></table>');

	putparpadeo('#phi', 1*velocidad, azul);

	await sleepEE(1000*velocidad);

	removeputparpadeo('#phi', 1*velocidad, azul);
	
	if(cancelado){
        return;
    }

    $('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(1000);
	
	if(cancelado){
		return;
	}

	$('#EEdiv').html("Se expresa el exponente en terminos de φ(" + m + ").");
	$('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(3000);

	if(cancelado){
		return;
	}

	$('#EEdiv').scrollViewEE();

	r = Math.floor(e/phi);
	r2 = e%phi;

	$('#tabla1').append('<tr id="exponente"><td>' + e + ' = ' + r + ' * ' + phi + ' + ' + r2 + '</td></tr>');

	putparpadeo("#exponente", 1*velocidad, azul);

	await sleepEE(2000*velocidad);

	removeputparpadeo("#exponente", 1*velocidad, azul);

	$('#EEdiv2').append('<table class="table tabla tableVI3" id="tabla2"><tr id="sustitucion1"><td>' + base + '<sup>' + e + '</sup> = ' + base + '<sup>' + r + '*' + phi + ' + ' + r2 + '</sup> mod ' + m + '</td></tr></table>');

	putparpadeo('#sustitucion1', 2*velocidad, azul);

	await sleepEE(1000*velocidad);

	$('#tabla2').append('<tr id="sustitucion2"><td>' + base + '<sup>' + e + '</sup> = ' + base + '<sup>' + r + '*' + phi + '</sup> * ' + base + '<sup>' + r2 + '</sup> mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion2', 2*velocidad, azul);

	await sleepEE(1000*velocidad);

	$('#tabla2').append('<tr id="sustitucion3"><td>' + base + '<sup>' + e + '</sup> = (' + base + '<sup>' + phi + '</sup>)<sup>' + r + '</sup> * ' + base + '<sup>' + r2 + '</sup> mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion3', 1*velocidad, azul);

	await sleepEE(1000*velocidad);

	removeputparpadeo('#sustitucion1', 2*velocidad, azul);
	removeputparpadeo('#sustitucion2', 2*velocidad, azul);
	removeputparpadeo('#sustitucion3', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(1000);
	
	if(cancelado){
		return;
	}

	$('#EEdiv').html("Por el Teorema de Euler.");
	$('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(3000);

	if(cancelado){
		return;
	}

	$('#EEdiv').scrollViewEE();

	$('#tabla1').html('<tr id="teorema"><td>base<sup>φ(m)</sup> ≡ 1 mod m</td></tr>');

	putparpadeo('#teorema', 2*velocidad, azul);

	await sleepEE(1000*velocidad);

	$('#tabla1').append('<tr id="teorema2"><td>' + base + '<sup>' + phi + '</sup> ≡ 1 mod ' + m + '</td></tr>');

	putparpadeo('#teorema2', 1*velocidad, azul);

	await sleepEE(1000*velocidad);

	removeputparpadeo('#teorema', 2*velocidad, azul);
	removeputparpadeo('#teorem2', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(1000);
	
	if(cancelado){
		return;
	}

	$('#EEdiv').html("Se hace la sustitución.");
	$('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(3000);

	if(cancelado){
		return;
	}

	$('#EEdiv').scrollViewEE();

	$('#tabla2').html('<tr id="sustitucion1"><td>' + base + '<sup>' + e + '</sup> = (' + base + '<sup>' + phi + '</sup>)<sup>' + r + '</sup> * ' + base + '<sup>' + r2 + '</sup> mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion1', 2*velocidad, azul);

	await sleepEE(1000*velocidad);

	$('#tabla2').append('<tr id="sustitucion2"><td>' + base + '<sup>' + e + '</sup> ≡ 1<sup>' + r + '</sup> * ' + base + '<sup>' + r2 + '</sup> mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion2', 2*velocidad, azul);

	await sleepEE(1000*velocidad);

	$('#tabla2').append('<tr id="sustitucion3"><td>' + base + '<sup>' + e + '</sup> ≡ ' + base + '<sup>' + r2 + '</sup> mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion3', 1*velocidad, azul);

	await sleepEE(1000*velocidad);

	removeputparpadeo('#sustitucion1', 2*velocidad, azul);
	removeputparpadeo('#sustitucion2', 2*velocidad, azul);
	removeputparpadeo('#sustitucion3', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(1000);
	
	if(cancelado){
		return;
	}

	$('#EEdiv').html("Se aplica cualquier otro metodo de exponenciación modular y se obtiene el resultado.");
	$('#EEdiv').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEE(5000);

	if(cancelado){
		return;
	}

	$('#EEdiv').scrollViewEE();

	$('#EEdiv2').html('');
	$('#tabla1').html('<tr id="sustitucion1"><td>' + base + '<sup>' + e + '</sup> ≡ ' + base + '<sup>' + r2 + '</sup> mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion1', 2*velocidad, azul);

	await sleepEE(1000*velocidad);

	resultado = bigInt(base).modPow(r2, m);

	$('#tabla1').append('<tr id="sustitucion2"><td>' + base + '<sup>' + r2 + '</sup> ≡ ' + resultado + ' mod ' + m + '</td></tr>');

	putparpadeo('#sustitucion2', 1*velocidad, azul);

	await sleepEE(1000*velocidad);

	removeputparpadeo('#sustitucion1', 2*velocidad, azul);
	removeputparpadeo('#sustitucion2', 1*velocidad, azul);

	$('#valorExponenciacionEuler').append('<label class="circulo" id="EE-cell-0">' + resultado + '</label>');

	putparpadeo('#EE-cell-0', 1*velocidad, negro);

	await sleepEE(1000*velocidad);

	removeputparpadeo('#EE-cell-0', 1*velocidad, negro);
	removeputparpadeo("#operacion1", 2*velocidad, azul);

	//FIN
    $("#out-exponenciacionEuler").val(resultado);
    $("#btn-velocidadExponenciacionEuler").show();
    $("#btn-comenzarExponenciacionEuler").show();
    $("#btn-cancelarExponenciacionEuler").hide();

    if(!cancelado){
        $('#EEdiv').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function obtenerFactores(n) {
	var factorPrimo = 2;
	var contador = 0;
	var factores = [];
	var i = 0;

	while (n > 1){
		contador = 0;

		while ( (n % factorPrimo) == 0) {
			//encotrado factor
			++contador;
			n /= factorPrimo;
		}
		
		if (contador > 0) {
			factores[i] = [];

			factores[i][0] = factorPrimo;
			factores[i][1] = contador;
			i++;
		}
		
		factorPrimo++;
  	}
console.log(factores);
  	return factores;
}

function identificarTipo(factores){
	if(factores.length == 1){
		if(factores[0][1] == 1){
			return 1;
		}
		else{
			return 2;
		}
	}
	else if(factores.length == 2 && factores[0][1] == 1 && factores[1][1] == 1){
		return 3;
	}
	else{
		return 4;
	}
}

function calcularPhi(n){
	var phi = 0;
	var aux2 = 1, aux3 = 1;
	var factores = obtenerFactores(n);
	var tipo = identificarTipo(factores);console.log(tipo);

	if(tipo == 1){
		phi = n - 1;
	}
	else if(tipo == 2){
		phi = n*(factores[0][0]-1)/factores[0][0];
	}
	else if(tipo == 3){
		phi = (factores[0][0]-1)*(factores[1][0]-1);
	}
	else if(tipo == 4){
		for(var i = 0 ; i < factores.length ; i++){
			aux2 = aux2 * (factores[i][0] - 1);
			aux3 = aux3 * factores[i][0];
		}

		phi = n*aux2/aux3;
	}

	return phi;
}

function validarEntradaBaseExponenciacionEuler(){
	var mensaje = "";
	var base = $('#in-baseExponenciacionEuler').val();
	var z = bigInt($('#in-valorAnilloExponenciacionEuler').val());

	if(!base.match(/^[0-9]+$/) || bigInt(base).compare(2) == -1 || bigInt(base).compare(z) != -1 || base.length == 0){
		mensaje = mensaje_79;
	}
	else if(bigInt.gcd(bigInt(base), bigInt(z)).compare(1) != 0){
		mensaje = mensaje_159;
	}

	return mensaje;
}

function validarEntradaExponenteExponenciacionEuler(){
	var mensaje = "";
	var e = $('#in-exponenteExponenciacionEuler').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(2) == -1 || bigInt(e).compare(1000) == 1 || e.length == 0){
		mensaje = mensaje_82;
	}

	return mensaje;
}

function validarEntradaValorAnilloExponenciacionEuler(){
	var mensaje = "";
	var z = $('#in-valorAnilloExponenciacionEuler').val();
	var base = $('#in-baseExponenciacionEuler').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(3) == -1 || bigInt(z).compare(1000) == 1 || z.length == 0){
		mensaje = mensaje_81;
	}
	else if(bigInt.gcd(bigInt(base), bigInt(z)).compare(1) != 0){
		mensaje = mensaje_159;
	}

	return mensaje;
}

function validarEntradaC_BaseExponenciacionEuler(){
	var mensaje = "";
	var base = $('#C-Base-EE').val();
	var z = $('#C-Modulo-EE').val();

	if(!base.match(/^[0-9]+$/) || bigInt(base).compare(2) == -1 || bigInt(base).compare(bigInt(z).minus(1)) == 1 || base.length == 0){
		mensaje = mensaje_79;
	}
	else if(bigInt.gcd(bigInt(base), bigInt(z)).compare(1) != 0){
		mensaje = mensaje_159;
	}

	return mensaje;
}

function validarEntradaC_ExponenteExponenciacionEuler(){
	var mensaje = "";
	var e = $('#C-Exponente-EE').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(1) == -1 || bigInt(e).compare(10000000) == 1 || e.length == 0){
		mensaje = mensaje_124;
	}

	return mensaje;
}

function validarEntradaC_ModuloExponenciacionEuler(){
	var mensaje = "";
	var z = $('#C-Modulo-EE').val();
	var base = $('#C-Base-EE').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1 || z.length == 0){
		mensaje = mensaje_128;
	}
	else if(bigInt.gcd(bigInt(base), bigInt(z)).compare(1) != 0){
		mensaje = mensaje_159;
	}

	return mensaje;
}

function addErrorExponenciacionEuler(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorExponenciacionEuler(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorEE(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorEE(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoExponenciacionEuler1").click(function(){
        $("#btn-comenzarExponenciacionEuler").html('Calcular Rápido');
        $("#btn-comenzarExponenciacionEuler").val(1);
    });
    $("#tipoExponenciacionEuler2").click(function(){
        $("#btn-comenzarExponenciacionEuler").html('Calcular Normal');
        $("#btn-comenzarExponenciacionEuler").val(2);
    });

    $("#in-baseExponenciacionEuler").on('click change keyup', function() {
        var mensaje = validarEntradaBaseExponenciacionEuler();

        if (mensaje.length != 0) {
            addErrorExponenciacionEuler("baseExponenciacionEuler", mensaje);
        } else{
            deleteErrorExponenciacionEuler("baseExponenciacionEuler");
        }
    });

    $("#in-valorAnilloExponenciacionEuler").on('click change keyup', function() {
        var mensaje = validarEntradaValorAnilloExponenciacionEuler();

        if (mensaje.length != 0) {
            addErrorExponenciacionEuler("valorAnilloExponenciacionEuler", mensaje);
        } else{
            deleteErrorExponenciacionEuler("valorAnilloExponenciacionEuler");

            if(validarEntradaBaseExponenciacionEuler().length == 0)
            	deleteErrorExponenciacionEuler("baseExponenciacionEuler");
            else
            	addErrorExponenciacionEuler("baseExponenciacionEuler", validarEntradaBaseExponenciacionEuler());
        }
    });

    $("#in-exponenteExponenciacionEuler").on('click change keyup', function() {
        var mensaje = validarEntradaExponenteExponenciacionEuler();

        if (mensaje.length != 0) {
            addErrorExponenciacionEuler("exponenteExponenciacionEuler", mensaje);
        } else{
            deleteErrorExponenciacionEuler("exponenteExponenciacionEuler");
        }
    });

    $("#C-Base-EE").keyup(function(){
        var mensaje = validarEntradaC_BaseExponenciacionEuler();

        if (mensaje.length != 0) {
            addErrorEE("C-Base-EE", mensaje);
        } else{
            deleteErrorEE("C-Base-EE");
        }
    });

    $("#C-Modulo-EE").keyup(function(){
        var mensaje = validarEntradaC_ModuloExponenciacionEuler();

        if (mensaje.length != 0) {
            addErrorEE("C-Modulo-EE", mensaje);
        } else{
            deleteErrorEE("C-Modulo-EE");

            if(validarEntradaC_BaseExponenciacionEuler().length == 0)
            	deleteErrorEE("C-Base-EE");
            else
            	addErrorEE("C-Base-EE", validarEntradaC_BaseExponenciacionEuler());
        }
    });

    $("#C-Exponente-EE").keyup(function(){
        var mensaje = validarEntradaC_ExponenteExponenciacionEuler();

        if (mensaje.length != 0) {
            addErrorEE("C-Exponente-EE", mensaje);
        } else{
            deleteErrorEE("C-Exponente-EE");
        }
    });

	$("#btn-comenzarExponenciacionEuler").click(function(){
		var mensajebase = validarEntradaBaseExponenciacionEuler();
		var mensajevaloranillo = validarEntradaValorAnilloExponenciacionEuler();
		var mensajeexponente = validarEntradaExponenteExponenciacionEuler();

		if(mensajebase.length == 0 && mensajeexponente.length == 0 && mensajevaloranillo.length == 0){
			$("#baseExponenciacionEuler-error").remove();
            $("#valorAnilloExponenciacionEuler-error").remove();
            $("#exponenteExponenciacionEuler-error").remove();
            $("#in-baseExponenciacionEuler").removeClass('input-error');
            $("#in-valorAnilloExponenciacionEuler").removeClass('input-error');
            $("#in-exponenteExponenciacionEuler").removeClass('input-error');

            if($('#btn-comenzarExponenciacionEuler').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarExponenciacionEuler').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadExponenciacionEuler").hide();
            $("#btn-comenzarExponenciacionEuler").hide();
            $("#btn-cancelarExponenciacionEuler").show();
            cancelado = false;
            
            comenzarExponenciacionEuler();
		}
		else{
			if(mensajebase.length > 0){
				addErrorExponenciacionEuler("baseExponenciacionEuler", mensajebase);
			}
			if(mensajeexponente.length > 0){
				addErrorExponenciacionEuler("exponenteExponenciacionEuler", mensajeexponente);
			}
			if(mensajevaloranillo.length > 0){
				addErrorExponenciacionEuler("valorAnilloExponenciacionEuler", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarExponenciacionEuler").click(function(){
        cancelado = true;

        limpiaPanelExponenciacionEuler();

        $("#btn-comenzarExponenciacionEuler").show();
        $("#btn-velocidadExponenciacionEuler").show();
        $("#btn-cancelarExponenciacionEuler").hide();
    });

    $("#btn-calcularExponenciacionEuler").click(function(){
		var mensajevalorA = validarEntradaC_BaseExponenciacionEuler();
		var mensajevaloranillo = validarEntradaC_ModuloExponenciacionEuler();
		var mensajevalorB = validarEntradaC_ExponenteExponenciacionEuler();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#C-Base-EE-error").remove();
            $("#C-Exponente-EE-error").remove();
            $("#C-Modulo-EE-error").remove();
            $("#C-Base-EE").removeClass('input-error');
            $("#C-Exponente-EE").removeClass('input-error');
            $("#C-Modulo-EE").removeClass('input-error');

           	calcularExponenciacionEuler();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorEE("C-Base-EE", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorEE("C-Exponente-EE", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorEE("C-Modulo-EE", mensajevaloranillo);
			}
		}
	});
});

function calcularExponenciacionEuler(){
	var b = bigInt($("#C-Base-EE").val());
	var e = bigInt($("#C-Exponente-EE").val());
	var m = bigInt($("#C-Modulo-EE").val());
	var resultado = 0;
	var phi = calcularPhi2(m);

	resultado = exponenciacionEuler(b, e.mod(phi), m);

	$('#fileDisplayAreaCalculadoraExponenciacionEuler').val(resultado.toString());
}

function calcularPhi2(m){
	var n = m;
	var phi = bigInt(0);
	var aux2 = bigInt(1), aux3 = bigInt(1);
	var factores = obtenerFactores2(n);
	var tipo = identificarTipo(factores);

	if(tipo == 1){
		phi = n.subtract(1);
	}
	else if(tipo == 2){
		phi = n.multiply(bigInt(factores[0][0]).subtract(1)).divide(factores[0][0]);
	}
	else if(tipo == 3){
		phi = (factores[0][0].subtract(1)).multiply(factores[1][0].subtract(1));
	}
	else if(tipo == 4){
		for(var i = bigInt(0) ; i.compare(factores.length) == -1 ; i = i.add(1)){
			aux2 = aux2.multiply(factores[i][0].subtract(1));
			aux3 = aux3.multiply(factores[i][0]);
		}

		phi = n.multiply(aux2).divide(aux3);
	}
	
	return phi;
}

function obtenerFactores2(n) {
	var factorPrimo = bigInt(2);
	var contador = bigInt(0);
	var factores = [];
	var i = bigInt(0);

	while (n.compare(1) == 1){
		contador = bigInt(0);

		while ( (n.mod(factorPrimo)).compare(0) == 0) {
			//encotrado factor
			contador = contador.add(1);
			n = n.divide(factorPrimo);
		}
		
		if (contador.compare(0) == 1) {
			factores[i] = [];

			factores[i][0] = factorPrimo;
			factores[i][1] = contador;
			i = i.add(1);
		}
		
		factorPrimo = factorPrimo.add(1);
  	}

  	return factores;
}

function exponenciacionEuler(base, exponente, modulo){
	var n = exponente.toString(2);
	var result = base;

	for(var i = 1 ; i < n.length ; i++){
		result = (result.multiply(result)).mod(modulo);

		if(n[i] == "1"){
			result = (result.multiply(base)).mod(modulo);
		}
	}

	return result;
}