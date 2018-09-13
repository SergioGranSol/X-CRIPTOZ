var cancelado = false;
var velocidad = 1;

$.fn.scrollViewEU = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepEU(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelEuclides() {
	$("#pnl-InteractivoEuclides").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelEuclides(){
	cancelado = true;

	$("#pnl-InteractivoEuclides").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelEuclides();

	$("#in-valorAEuclides").val("244");
	$("#in-valorBEuclides").val("117");

	$("#btn-comenzarEuclides").show();
	$("#btn-velocidadEuclides").show();
	$("#btn-cancelarEuclides").hide();

	deleteErrorEuclides("valorAEuclides");
	deleteErrorEuclides("valorBEuclides");
}

function limpiaPanelEuclides(){
	$('#EUdivOperacion').empty();
	$('#valorEuclides').html("<br>");
	$('#out-euclides').val('');

	$("#in-valorAEuclides").val("");
	$("#in-valorBEuclides").val("");

	if($('#EUdiv1').is(':visible')) {
		$("#EUdiv1").slideToggle(500);
	}
}

async function comenzarEuclides(){
	var a = parseInt($("#in-valorAEuclides").val());
	var b = parseInt($("#in-valorBEuclides").val());
	var a_2 = 0, b_2 = 0, r = 0, x = 0;
	var i = 1;
	
	limpiaPanelEuclides();

	$("#in-valorAEuclides").val(a);
	$("#in-valorBEuclides").val(b);

	$('#EUdiv1').html('Se toma el número mayor y se expresa en terminos del número menor.');
	$('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(3000);
	
	if(cancelado){
		return;
	}

	$('#EUdiv1').scrollViewEU();

	if(a > b){
		a_2 = a;
		b_2 = b;
	}
	else{
		a_2 = b;
		b_2 = a;
	}

	$('#EUdivOperacion').append('<br><center><table class="text-center" width="10%" id="division"><tr><td>&nbsp;</td><td id="x"></td></tr><tr><td id="z"></td><td id="c"></td></tr><tr><td>&nbsp;</td><td id="r"></td></tr></table></center>');
	
	$('#c').html(a_2);

	putparpadeo('#c', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#c', 1*velocidad, azul);

	$('#z').html(b_2);
	
	putparpadeo('#z', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#z', 1*velocidad, azul);

	x = Math.floor(a_2/b_2);

	$('#x').html(x);

	putparpadeo('#x', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#x', 1*velocidad, azul);

	r = a_2%b_2;

	$('#r').html(r);

	putparpadeo('#r', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#r', 1*velocidad, azul);

	$('#EUdivOperacion').append('<br><center><table class="text-center" width="50%" id="pasos"><tr id="p0"><td>' + a_2 + '</td><td>=</td><td>' + x + '</td><td>*</td><td>' + b_2 + '</td><td>+</td><td>' + r + '</td></tr></table></center>');

	putparpadeo('#p0', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#p0', 1*velocidad, azul);
	
	if(cancelado){
        return;
    }

    $('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(1000);
	
	if(cancelado){
		return;
	}

	$('#EUdiv1').html("El número menor y el residuo se convierten en a y b.");
	$('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(3000);

	if(cancelado){
		return;
	}

	$('#EUdiv1').scrollViewEU();

	$('#p0').append('<td>&nbsp;</td><td>&nbsp;</td><td id="MCD">MCD( ' + a + ' , ' + b + ' ) = MCD( ' + b_2 + ' , ' + r + ' )</td>')
	putparpadeo('#MCD', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#MCD', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(1000);
	
	if(cancelado){
		return;
	}

	$('#EUdiv1').html('Se repiten los pasos anteriores hasta que el residuo sea 0.');
	$('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(3000);
	
	if(cancelado){
		return;
	}

	$('#EUdiv1').scrollViewEU();

	while(r != 0){
		a_2 = b_2;
		b_2 = r;
		$('#c').html('&nbsp;');
		$('#z').html('&nbsp;');
		$('#x').html('&nbsp;');
		$('#r').html('&nbsp;');

		$('#c').html(a_2);

		putparpadeo('#c', 1*velocidad, azul);

		await sleepEU(1000*velocidad);

		removeputparpadeo('#c', 1*velocidad, azul);

		$('#z').html(b_2);
		
		putparpadeo('#z', 1*velocidad, azul);

		await sleepEU(1000*velocidad);

		removeputparpadeo('#z', 1*velocidad, azul);

		x = Math.floor(a_2/b_2);

		$('#x').html(x);

		putparpadeo('#x', 1*velocidad, azul);

		await sleepEU(1000*velocidad);

		removeputparpadeo('#x', 1*velocidad, azul);

		r = a_2%b_2;

		$('#r').html(r);

		putparpadeo('#r', 1*velocidad, azul);

		await sleepEU(1000*velocidad);

		removeputparpadeo('#r', 1*velocidad, azul);

		$('#pasos').append('<tr id="p' + i + '"><td>' + a_2 + '</td><td>=</td><td>' + x + '</td><td>*</td><td>' + b_2 + '</td><td>+</td><td>' + r + '</td><td>&nbsp;</td><td>&nbsp;</td><td>MCD( ' + a_2 + ' , ' + b_2 + ' ) = MCD( ' + b_2 + ' , ' + r + ' )</td></tr>');

		putparpadeo('#p'+i, 1*velocidad, azul);

		await sleepEU(1000*velocidad);

		removeputparpadeo('#p'+i, 1*velocidad, azul);

		i++;
	}
	
	if(cancelado){
        return;
    }

    $('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(1000);
	
	if(cancelado){
		return;
	}

	$('#EUdiv1').html("El último divisor es el MCD de " + a + " y " + b + ".");
	$('#EUdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEU(3000);

	if(cancelado){
		return;
	}

	$('#EUdiv1').scrollViewEU

	$('#EUdivOperacion').append('<br><label class="text-center" id="resultado"></label>')
	$('#resultado').html("MCD( " + a + " , " + b + " ) = " + b_2);
	putparpadeo('#resultado', 1*velocidad, azul);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#resultado', 1*velocidad, azul);

	$('#valorEuclides').append('<label class="circulo" id="SM-cell-0">' + b_2 + '</label>');

	putparpadeo('#SM-cell-0', 1*velocidad, negro);

	await sleepEU(1000*velocidad);

	removeputparpadeo('#SM-cell-0', 1*velocidad, negro);

	//FIN
    $("#out-euclides").val(b_2);
    $("#btn-velocidadEuclides").show();
    $("#btn-comenzarEuclides").show();
    $("#btn-cancelarEuclides").hide();

    if(!cancelado){
        $('#EUdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaValorAEuclides(){
	var mensaje = "";
	var a = $('#in-valorAEuclides').val();

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(1) == -1 || bigInt(a).compare(1000) == 1 || a.length == 0){
		mensaje = mensaje_83;
	}

	return mensaje;
}

function validarEntradaValorBEuclides(){
	var mensaje = "";
	var b = $('#in-valorBEuclides').val();

	if(!b.match(/^[0-9]+$/) || bigInt(b).compare(1) == -1 || bigInt(b).compare(1000) == 1 || b.length == 0){
		mensaje = mensaje_84;
	}

	return mensaje;
}

function validarEntradaC_AEuclides(){
	var mensaje = "";
	var a = $('#C-A-EU').val();

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(1) == -1 || bigInt(a).compare(10000000) == 1 || a.length == 0){
		mensaje = mensaje_126;
	}

	return mensaje;
}

function validarEntradaC_BEuclides(){
	var mensaje = "";
	var b = $('#C-B-EU').val();

	if(!b.match(/^[0-9]+$/) || bigInt(b).compare(1) == -1 || bigInt(b).compare(10000000) == 1 || b.length == 0){
		mensaje = mensaje_127;
	}

	return mensaje;
}

function addErrorEuclides(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorEuclides(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorEU(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorEU(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoEuclides1").click(function(){
        $("#btn-comenzarEuclides").html('Calcular Rápido');
        $("#btn-comenzarEuclides").val(1);
    });
    $("#tipoEuclides2").click(function(){
        $("#btn-comenzarEuclides").html('Normal');
        $("#btn-comenzarEuclides").val(2);
    });

    $("#in-valorAEuclides").on('click change keyup', function() {
        var mensaje = validarEntradaValorAEuclides();

        if (mensaje.length != 0) {
            addErrorEuclides("valorAEuclides", mensaje);
        } else{
            deleteErrorEuclides("valorAEuclides");
        }
    });

    $("#in-valorBEuclides").on('click change keyup', function() {
        var mensaje = validarEntradaValorBEuclides();

        if (mensaje.length != 0) {
            addErrorEuclides("valorBEuclides", mensaje);
        } else{
            deleteErrorEuclides("valorBEuclides");
        }
    });

    $("#C-A-EU").keyup(function(){
        var mensaje = validarEntradaC_AEuclides();

        if (mensaje.length != 0) {
            addErrorEU("C-A-EU", mensaje);
        } else{
            deleteErrorEU("C-A-EU");
        }
    });

    $("#C-B-EU").keyup(function(){
        var mensaje = validarEntradaC_BEuclides();

        if (mensaje.length != 0) {
            addErrorEU("C-B-EU", mensaje);
        } else{
            deleteErrorEU("C-B-EU");
        }
    });

    $("#btn-comenzarEuclides").click(function(){
		var mensajevalorA = validarEntradaValorAEuclides();
		var mensajevaloranillo = validarEntradaValorBEuclides();

		if(mensajevalorA.length == 0 && mensajevaloranillo.length == 0){
			$("#valorAEuclides-error").remove();
            $("#valorBEuclides-error").remove();
            $("#in-valorAEuclides").removeClass('input-error');
            $("#in-valorBEuclides").removeClass('input-error');

            if($('#btn-comenzarEuclides').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarEuclides').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadEuclides").hide();
            $("#btn-comenzarEuclides").hide();
            $("#btn-cancelarEuclides").show();
            cancelado = false;
            
            comenzarEuclides();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorEuclides("valorAEuclides", mensajevalorA);
			}
			if(mensajevaloranillo.length > 0){
				addErrorEuclides("valorBEuclides", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarEuclides").click(function(){
        cancelado = true;

        limpiaPanelEuclides();

        $("#btn-comenzarEuclides").show();
        $("#btn-velocidadEuclides").show();
        $("#btn-cancelarEuclides").hide();
    });

    $("#btn-calcularEuclides").click(function(){
		var mensajevalorA = validarEntradaC_AEuclides();
		var mensajevalorB = validarEntradaC_BEuclides();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0){
			$("#C-A-EU-error").remove();
            $("#C-B-EU-error").remove();
            $("#C-A-EU").removeClass('input-error');
            $("#C-B-EU").removeClass('input-error');

           	calcularMCD();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorEU("C-A-EU", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorEU("C-B-EU", mensajevalorB);
			}
		}
	});
});

function calcularMCD(){
	var a = bigInt($("#C-A-EU").val());
	var b = bigInt($("#C-B-EU").val());
	var resultado = 0;

	resultado = bigInt.gcd(a, b);

	$('#fileDisplayAreaCalculadoraEuclides').val(resultado.toString());
}