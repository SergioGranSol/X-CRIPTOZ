var cancelado = false;
var velocidad = 1;

$.fn.scrollViewEC = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 000);
  });
}

function sleepEC(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelExponenciacionClasica() {
	$("#pnl-InteractivoExponenciacionClasica").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelExponenciacionClasica(){
	cancelado = true;

	$("#pnl-InteractivoExponenciacionClasica").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelExponenciacionClasica();

	$("#in-baseExponenciacionClasica").val("3");
	$("#in-exponenteExponenciacionClasica").val("5");
	$("#in-valorAnilloExponenciacionClasica").val("19");

	$("#btn-comenzarExponenciacionClasica").show();
	$("#btn-velocidadExponenciacionClasica").show();
	$("#btn-cancelarExponenciacionClasica").hide();

	deleteErrorExponenciacionClasica("baseExponenciacionClasica");
	deleteErrorExponenciacionClasica("exponenteExponenciacionClasica");
	deleteErrorExponenciacionClasica("valorAnilloExponenciacionClasica");
}

function limpiaPanelExponenciacionClasica(){
	$('#ECdivOperacion').empty();
	$('#ECdivAnillo').empty();
	$('#valorExponenciacionClasica').html("<br>");
	$('#out-exponenciacionClasica').val('');

	$("#in-baseExponenciacionClasica").val("");
	$("#in-exponenteExponenciacionClasica").val("");
	$("#in-valorAnilloExponenciacionClasica").val("");

	if($('#ECdiv1').is(':visible')) {
		$("#ECdiv1").slideToggle(500);
	}
}

async function comenzarExponenciacionClasica(){
	var base = parseInt($("#in-baseExponenciacionClasica").val());
	var e = parseInt($("#in-exponenteExponenciacionClasica").val());
	var z = parseInt($("#in-valorAnilloExponenciacionClasica").val());
	var resultado = 0, aux = 0;
	
	limpiaPanelExponenciacionClasica();

	$("#in-baseExponenciacionClasica").val(base);
	$("#in-exponenteExponenciacionClasica").val(e);
	$("#in-valorAnilloExponenciacionClasica").val(z);

	$('#ECdiv1').html('Se escribe la base ' + e + ' veces.');
	$('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(3000);
	
	if(cancelado){
		return;
	}

	$('#ECdiv1').scrollViewEC();
	
	$('#ECdivAnillo').append('<table class="table tabla tableVI3"><tr id="base"></tr></table>');

	for(var i = 0 ; i < e ; i++){
		$('#base').append('<td id="e' + i + '">' + base + '</td>');
	}
	
	if(cancelado){
        return;
    }

    $('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(1000);
	
	if(cancelado){
		return;
	}

	$('#ECdiv1').html("Se toma el primer número y se multiplica por el segundo. Si el resultado es mayor o igual a Z se calcula el modulo.");
	$('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(5000);

	if(cancelado){
		return;
	}

	$('#ECdiv1').scrollViewEC();

	$('#ECdivOperacion').append('<label class="text-center" id="multiplicacion"></label>')

	putparpadeo('#e0', 2*velocidad, azul);
	
	await sleepEC(1000*velocidad);

	putparpadeo('#e1', 1*velocidad, azul);

	await sleepEC(1000*velocidad);

	removeputparpadeo('#e0', 2*velocidad, azul);
	removeputparpadeo('#e1', 1*velocidad, azul);

	resultado = base*base;

	if (resultado >= z){
		resultado = resultado%z;
		$('#multiplicacion').html(base + " * " + base + " ≡ " + resultado + " mod " + z);
	}
	else{
		$('#multiplicacion').html(base + " * " + base + " = " + resultado);
	}

	putparpadeo('#multiplicacion', 1*velocidad, azul);

	await sleepEC(1000*velocidad);

	removeputparpadeo('#multiplicacion', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(1000);
	
	if(cancelado){
		return;
	}

	$('#ECdiv1').html("Los dos números se sustituyen por el resultado.");
	$('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(5000);

	if(cancelado){
		return;
	}

	$('#ECdiv1').scrollViewEC();

	putparpadeo('#multiplicacion', 2*velocidad, azul);

	await sleepEC(1000*velocidad);

	$('#e0').html('');
	$('#e1').html(resultado);

	putparpadeo('#e1', 1*velocidad, azul);

	await sleepEC(1000*velocidad);

	removeputparpadeo('#multiplicacion', 2*velocidad, azul);
	removeputparpadeo('#e1', 1*velocidad, azul);

	//si a+b > z
	if(e > 2){
		if(cancelado){
	        return;
	    }

	    $('#ECdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepEC(1000);
		
		if(cancelado){
			return;
		}

		$('#ECdiv1').html("Se repiten los pasos hasta que solo quede un número.");
		$('#ECdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepEC(5000);

		if(cancelado){
			return;
		}

		$('#ECdiv1').scrollViewEC();

		for(var i = 1 ; i < e-1 ; i++){
			putparpadeo('#e'+i, 1*velocidad, azul);
		
			await sleepEC(500*velocidad);

			putparpadeo('#e'+(i+1), 0.5*velocidad, azul);

			await sleepEC(500*velocidad);

			removeputparpadeo('#e'+i, 1*velocidad, azul);
			removeputparpadeo('#e'+(i+1), 0.5*velocidad, azul);

			aux = resultado;
			resultado = resultado*base;

			if (resultado*base >= z){
				resultado = resultado%z;

				$('#multiplicacion').html(aux + " * " + base + " ≡ " + resultado + " mod " + z);
			}
			else{
				$('#multiplicacion').html(aux + " * " + base + " = " + resultado);
			}

			putparpadeo('#multiplicacion', 1*velocidad, azul);

			await sleepEC(500*velocidad);

			$('#e'+i).html('');
			$('#e'+(i+1)).html(resultado);

			putparpadeo('#e'+(i+1), 0.5*velocidad, azul);

			await sleepEC(500*velocidad);

			removeputparpadeo('#multiplicacion', 1*velocidad, azul);
			removeputparpadeo('#e'+(i+1), 0.5*velocidad, azul);

			await sleepEC(100);
		}
	}

	if(cancelado){
        return;
    }

    $('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(1000);
	
	if(cancelado){
		return;
	}

	$('#ECdiv1').html("El último número es el resultado de la exponenciación modular.");
	$('#ECdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEC(3000);

	if(cancelado){
		return;
	}

	$('#ECdiv1').scrollViewEC();

	$('#valorExponenciacionClasica').append('<label class="circulo" id="EC-cell-0">' + resultado + '</label>');

	putparpadeo('#EC-cell-0', 1*velocidad, negro);

	await sleepEC(1000*velocidad);

	removeputparpadeo('#EC-cell-0', 1*velocidad, negro);

	//FIN
    $("#out-exponenciacionClasica").val(resultado);
    $("#btn-velocidadExponenciacionClasica").show();
    $("#btn-comenzarExponenciacionClasica").show();
    $("#btn-cancelarExponenciacionClasica").hide();

    if(!cancelado){
        $('#ECdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaBaseExponenciacionClasica(){
	var mensaje = "";
	var base = $('#in-baseExponenciacionClasica').val();
	var z = bigInt($('#in-valorAnilloExponenciacionClasica').val());

	if(!base.match(/^[0-9]+$/) || bigInt(base).compare(2) == -1 || bigInt(base).compare(z) != -1 || base.length == 0){
		mensaje = mensaje_79;
	}

	return mensaje;
}

function validarEntradaExponenteExponenciacionClasica(){
	var mensaje = "";
	var e = $('#in-exponenteExponenciacionClasica').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(2) == -1 || bigInt(e).compare(20) == 1 || e.length == 0){
		mensaje = mensaje_80;
	}

	return mensaje;
}

function validarEntradaValorAnilloExponenciacionClasica(){
	var mensaje = "";
	var z = $('#in-valorAnilloExponenciacionClasica').val();
	
	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(3) == -1 || bigInt(z).compare(1000) == 1 || z.length == 0){
		mensaje = mensaje_81;
	}

	return mensaje;
}

function validarEntradaC_BaseExponenciacionClasica(){
	var mensaje = "";
	var base = $('#C-Base-EC').val();
	var z = $('#C-Modulo-EC').val();

	if(!base.match(/^[0-9]+$/) || bigInt(base).compare(2) == -1 || bigInt(base).compare(bigInt(z).minus(1)) == 1 || base.length == 0){
		mensaje = mensaje_79;
	}

	return mensaje;
}

function validarEntradaC_ExponenteExponenciacionClasica(){
	var mensaje = "";
	var e = $('#C-Exponente-EC').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(1) == -1 || bigInt(e).compare(10000000) == 1 || e.length == 0){
		mensaje = mensaje_124;
	}

	return mensaje;
}

function validarEntradaC_ModuloExponenciacionClasica(){
	var mensaje = "";
	var z = $('#C-Modulo-EC').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1){
		mensaje = mensaje_128;
	}

	return mensaje;
}

function addErrorExponenciacionClasica(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorExponenciacionClasica(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorEC(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorEC(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoExponenciacionClasica1").click(function(){
        $("#btn-comenzarExponenciacionClasica").html('Calcular Rápido');
        $("#btn-comenzarExponenciacionClasica").val(1);
    });
    $("#tipoExponenciacionClasica2").click(function(){
        $("#btn-comenzarExponenciacionClasica").html('Calcular Normal');
        $("#btn-comenzarExponenciacionClasica").val(2);
    });

    $("#in-baseExponenciacionClasica").on('click change keyup', function() {
        var mensaje = validarEntradaBaseExponenciacionClasica();

        if (mensaje.length != 0) {
            addErrorExponenciacionClasica("baseExponenciacionClasica", mensaje);
        } else{
            deleteErrorExponenciacionClasica("baseExponenciacionClasica");
        }
    });

    $("#in-valorAnilloExponenciacionClasica").on('click change keyup', function() {
        var mensaje = validarEntradaValorAnilloExponenciacionClasica();

        if (mensaje.length != 0) {
            addErrorExponenciacionClasica("valorAnilloExponenciacionClasica", mensaje);
        } else{
            deleteErrorExponenciacionClasica("valorAnilloExponenciacionClasica");

            if(validarEntradaBaseExponenciacionClasica().length == 0)
            	deleteErrorExponenciacionClasica("baseExponenciacionClasica");
            else
            	addErrorExponenciacionClasica("baseExponenciacionClasica", validarEntradaBaseExponenciacionClasica());
        }
    });

    $("#in-exponenteExponenciacionClasica").on('click change keyup', function() {
        var mensaje = validarEntradaExponenteExponenciacionClasica();

        if (mensaje.length != 0) {
            addErrorExponenciacionClasica("exponenteExponenciacionClasica", mensaje);
        } else{
            deleteErrorExponenciacionClasica("exponenteExponenciacionClasica");
        }
    });

    $("#C-Base-EC").keyup(function(){
        var mensaje = validarEntradaC_BaseExponenciacionClasica();

        if (mensaje.length != 0) {
            addErrorEC("C-Base-EC", mensaje);
        } else{
            deleteErrorEC("C-Base-EC");
        }
    });

    $("#C-Modulo-EC").keyup(function(){
        var mensaje = validarEntradaC_ModuloExponenciacionClasica();

        if (mensaje.length != 0) {
            addErrorEC("C-Modulo-EC", mensaje);
        } else{
            deleteErrorEC("C-Modulo-EC");

            if(validarEntradaC_BaseExponenciacionClasica().length == 0)
            	deleteErrorEC("C-Base-EC");
            else
            	addErrorEC("C-Base-EC", validarEntradaC_BaseExponenciacionClasica());
        }
    });

    $("#C-Exponente-EC").keyup(function(){
        var mensaje = validarEntradaC_ExponenteExponenciacionClasica();

        if (mensaje.length != 0) {
            addErrorEC("C-Exponente-EC", mensaje);
        } else{
            deleteErrorEC("C-Exponente-EC");
        }
    });

	$("#btn-comenzarExponenciacionClasica").click(function(){
		var mensajebase = validarEntradaBaseExponenciacionClasica();
		var mensajevaloranillo = validarEntradaValorAnilloExponenciacionClasica();
		var mensajeexponente = validarEntradaExponenteExponenciacionClasica();

		if(mensajebase.length == 0 && mensajeexponente.length == 0 && mensajevaloranillo.length == 0){
			$("#baseExponenciacionClasica-error").remove();
            $("#valorAnilloExponenciacionClasica-error").remove();
            $("#exponenteExponenciacionClasica-error").remove();
            $("#in-baseExponenciacionClasica").removeClass('input-error');
            $("#in-valorAnilloExponenciacionClasica").removeClass('input-error');
            $("#in-exponenteExponenciacionClasica").removeClass('input-error');

            if($('#btn-comenzarExponenciacionClasica').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarExponenciacionClasica').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadExponenciacionClasica").hide();
            $("#btn-comenzarExponenciacionClasica").hide();
            $("#btn-cancelarExponenciacionClasica").show();
            cancelado = false;
            
            comenzarExponenciacionClasica();
		}
		else{
			if(mensajebase.length > 0){
				addErrorExponenciacionClasica("baseExponenciacionClasica", mensajebase);
			}
			if(mensajeexponente.length > 0){
				addErrorExponenciacionClasica("exponenteExponenciacionClasica", mensajeexponente);
			}
			if(mensajevaloranillo.length > 0){
				addErrorExponenciacionClasica("valorAnilloExponenciacionClasica", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarExponenciacionClasica").click(function(){
        cancelado = true;

        limpiaPanelExponenciacionClasica();

        $("#btn-comenzarExponenciacionClasica").show();
        $("#btn-velocidadExponenciacionClasica").show();
        $("#btn-cancelarExponenciacionClasica").hide();
    });

    $("#btn-calcularExponenciacionClasica").click(function(){
		var mensajevalorA = validarEntradaC_BaseExponenciacionClasica();
		var mensajevaloranillo = validarEntradaC_ModuloExponenciacionClasica();
		var mensajevalorB = validarEntradaC_ExponenteExponenciacionClasica();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#C-Base-EC-error").remove();
            $("#C-Exponente-EC-error").remove();
            $("#C-Modulo-EC-error").remove();
            $("#C-Base-EC").removeClass('input-error');
            $("#C-Exponente-EC").removeClass('input-error');
            $("#C-Modulo-EC").removeClass('input-error');

           	calcularExponenciacionClasica();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorEC("C-Base-EC", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorEC("C-Exponente-EC", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorEC("C-Modulo-EC", mensajevaloranillo);
			}
		}
	});
});

function calcularExponenciacionClasica(){
	var b = bigInt($("#C-Base-EC").val());
	var e = bigInt($("#C-Exponente-EC").val());
	var m = bigInt($("#C-Modulo-EC").val());
	var resultado = b;

	for(var i = 1 ; i < e ; i++){
		resultado = resultado.multiply(b);

		if(resultado.compare(m) != -1){
			resultado = resultado.mod(m);
		}
	}

	$('#fileDisplayAreaCalculadoraExponenciacionClasica').val(resultado.toString());
}