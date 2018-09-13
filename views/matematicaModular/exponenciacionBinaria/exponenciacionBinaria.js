var cancelado = false;
var velocidad = 1;

$.fn.scrollViewEB = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepEB(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelExponenciacionBinaria() {
	$("#pnl-InteractivoExponenciacionBinaria").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelExponenciacionBinaria(){
	cancelado = true;

	$("#pnl-InteractivoExponenciacionBinaria").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelExponenciacionBinaria();

	$("#in-baseExponenciacionBinaria").val("3");
	$("#in-exponenteExponenciacionBinaria").val("49");
	$("#in-valorAnilloExponenciacionBinaria").val("19");

	$("#btn-comenzarExponenciacionBinaria").show();
	$("#btn-velocidadExponenciacionBinaria").show();
	$("#btn-cancelarExponenciacionBinaria").hide();

	deleteErrorExponenciacionBinaria("baseExponenciacionBinaria");
	deleteErrorExponenciacionBinaria("exponenteExponenciacionBinaria");
	deleteErrorExponenciacionBinaria("valorAnilloExponenciacionBinaria");
}

function limpiaPanelExponenciacionBinaria(){
	$('#EBdivtabla').empty();
	$('#EBdivAnillo').empty();
	$('#valorExponenciacionBinaria').html("<br>");
	$('#out-exponenciacionBinaria').val('');

	$("#in-baseExponenciacionBinaria").val("");
	$("#in-exponenteExponenciacionBinaria").val("");
	$("#in-valorAnilloExponenciacionBinaria").val("");

	if($('#EBdiv1').is(':visible')) {
		$("#EBdiv1").slideToggle(500);
	}
}

async function comenzarExponenciacionBinaria(){
	var base = parseInt($("#in-baseExponenciacionBinaria").val());
	var e = parseInt($("#in-exponenteExponenciacionBinaria").val());
	var z = parseInt($("#in-valorAnilloExponenciacionBinaria").val());
	var resultado = base;
	var e_binario = e.toString(2);
	var aux;
	
	limpiaPanelExponenciacionBinaria();

	$("#in-baseExponenciacionBinaria").val(base);
	$("#in-exponenteExponenciacionBinaria").val(e);
	$("#in-valorAnilloExponenciacionBinaria").val(z);

	$('#EBdiv1').html('Se convierte a bits el exponente ' + e + '.');
	$('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(3000);
	
	if(cancelado){
		return;
	}

	$('#EBdiv1').scrollViewEB();
	
	$('#EBdivAnillo').append('<table class="table tabla tableVI3"><tr id="exponente"><td>' + e + '</td><td>=</td></tr></table><br><br>');

	for(var i = 0 ; i < e_binario.length ; i++){
		$('#exponente').append('<td id="e' + i + '">' + e_binario[i] + '</td>');
	}

	putparpadeo('#exponente', 1*velocidad, azul);

	await sleepEB(1000*velocidad);

	removeputparpadeo('#exponente', 1*velocidad, azul);
	
	if(cancelado){
        return;
    }

    $('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(1000);
	
	if(cancelado){
		return;
	}

	$('#EBdiv1').html("Se inicializa el resultado con la base.");
	$('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(3000);

	if(cancelado){
		return;
	}

	$('#EBdiv1').scrollViewEB();

	$('#EBdivtabla').append('<table class="table tabla tableVI3" id="tablaPasos"><tr><td>Bit</td><td>Operaciones</td></tr></table>');

	$('#tablaPasos').append('<tr id="et0"><td>1</td><td><label class="text-center" id="operacion1-0">resultado = ' + base + '</label></td></tr>');
	
	putparpadeo("#operacion1-0", 1*velocidad, azul);

	await sleepEB(1000*velocidad);

	removeputparpadeo("#operacion1-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(1000);
	
	if(cancelado){
		return;
	}

	$('#EBdiv1').html("Se recorren los bits del exponente empezando por el segundo. Por cada bit, resultado se eleva al cuadrado y se calcula el modulo. Si el bit es 1 resultado también se multiplica por la base.");
	$('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(5000);

	if(cancelado){
		return;
	}

	$('#EBdiv1').scrollViewEB();

	for(var i = 1 ; i < e_binario.length && !cancelado ; i++){
		$('#EBdiv1').scrollViewEB();

		aux = resultado;

		putparpadeo('#e'+i, ((e_binario[i]=='1')?3:2)*velocidad, azul);

		await sleepEB(1000*velocidad);

		resultado = (resultado*resultado)%z;

		$('#tablaPasos').append('<tr id="et' + i + '"><td>' + e_binario[i] + '</td><td id="etd' + i + '"><label class="text-center" id="operacion1-' + i + '">resultado = ' + aux + '<sup>2</sup> ≡ ' + resultado + ' mod ' + z + '</label></td></tr>');

		putparpadeo('#operacion1-'+i, ((e_binario[i]=='1')?2:1)*velocidad, azul);

		await sleepEB(1000*velocidad);

		if(e_binario[i] == '1'){
			aux = resultado;
			resultado = (resultado*base)%z;

			$('#etd'+i).append('<br><label class="text-center" id="operacion2-' + i + '">resultado = ' + aux + ' * ' + base + ' ≡ ' + resultado + ' mod ' + z + '</label>');
			putparpadeo('#operacion2-'+i, 1*velocidad, azul);

			await sleepEB(1000*velocidad);

			removeputparpadeo('#operacion2-'+i, 1*velocidad, azul);
		}

		removeputparpadeo('#e'+i, ((e_binario[i]=='1')?3:2)*velocidad, azul);
		removeputparpadeo('#operacion1-'+i, ((e_binario[i]=='1')?2:1)*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(1000);
	
	if(cancelado){
		return;
	}

	$('#EBdiv1').html("Al final obtenemos el resultado de la exponenciación modular.");
	$('#EBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepEB(3000);

	if(cancelado){
		return;
	}

	$('#EBdiv1').scrollViewEB();

	$('#operacion1').html(base + "<sup>" + e + "</sup> ≡ " + resultado + " mod " + z);
	$('#operacion2').html("&nbsp;");

	putparpadeo("#operacion1", 2*velocidad, azul);

	await sleepEB(1000);

	$('#valorExponenciacionBinaria').append('<br><label class="circulo" id="EB-cell-0">' + resultado + '</label>');

	putparpadeo('#EB-cell-0', 1*velocidad, negro);

	await sleepEB(1000*velocidad);

	removeputparpadeo('#EB-cell-0', 1*velocidad, negro);
	removeputparpadeo("#operacion1", 2*velocidad, azul);

	//FIN
    $("#out-exponenciacionBinaria").val(resultado);
    $("#btn-velocidadExponenciacionBinaria").show();
    $("#btn-comenzarExponenciacionBinaria").show();
    $("#btn-cancelarExponenciacionBinaria").hide();

    if(!cancelado){
        $('#EBdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaBaseExponenciacionBinaria(){
	var mensaje = "";
	var base = $('#in-baseExponenciacionBinaria').val();
	var z = bigInt($('#in-valorAnilloExponenciacionBinaria').val());

	if(!base.match(/^[0-9]+$/) || bigInt(base).compare(2) == -1 || bigInt(base).compare(z) != -1 || base.length == 0){
		mensaje = mensaje_79;
	}

	return mensaje;
}

function validarEntradaExponenteExponenciacionBinaria(){
	var mensaje = "";
	var e = $('#in-exponenteExponenciacionBinaria').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(2) == -1 || bigInt(e).compare(1000) == 1 || e.length == 0){
		mensaje = mensaje_82;
	}

	return mensaje;
}

function validarEntradaValorAnilloExponenciacionBinaria(){
	var mensaje = "";
	var z = $('#in-valorAnilloExponenciacionBinaria').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(3) == -1 || bigInt(z).compare(1000) == 1 || z.length == 0){
		mensaje = mensaje_81;
	}

	return mensaje;
}

function validarEntradaC_BaseExponenciacionBinaria(){
	var mensaje = "";
	var base = $('#C-Base-EB').val();
	var z = $('#C-Modulo-EB').val();

	if(!base.match(/^[0-9]+$/) || bigInt(base).compare(2) == -1 || bigInt(base).compare(bigInt(z).minus(1)) == 1 || base.length == 0){
		mensaje = mensaje_79;
	}

	return mensaje;
}

function validarEntradaC_ExponenteExponenciacionBinaria(){
	var mensaje = "";
	var e = $('#C-Exponente-EB').val();

	if(!e.match(/^[0-9]+$/) || bigInt(e).compare(1) == -1 || bigInt(e).compare(10000000) == 1 || e.length == 0){
		mensaje = mensaje_124;
	}

	return mensaje;
}

function validarEntradaC_ModuloExponenciacionBinaria(){
	var mensaje = "";
	var z = $('#C-Modulo-EB').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1 || z.length == 0){
		mensaje = mensaje_128;
	}

	return mensaje;
}

function addErrorExponenciacionBinaria(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorExponenciacionBinaria(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorEB(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorEB(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoExponenciacionBinaria1").click(function(){
        $("#btn-comenzarExponenciacionBinaria").html('Calcular Rápido');
        $("#btn-comenzarExponenciacionBinaria").val(1);
    });
    $("#tipoExponenciacionBinaria2").click(function(){
        $("#btn-comenzarExponenciacionBinaria").html('Calcular Normal');
        $("#btn-comenzarExponenciacionBinaria").val(2);
    });

    $("#in-baseExponenciacionBinaria").on('click change keyup', function() {
        var mensaje = validarEntradaBaseExponenciacionBinaria();

        if (mensaje.length != 0) {
            addErrorExponenciacionBinaria("baseExponenciacionBinaria", mensaje);
        } else{
            deleteErrorExponenciacionBinaria("baseExponenciacionBinaria");
        }
    });

    $("#in-valorAnilloExponenciacionBinaria").on('click change keyup', function() {
        var mensaje = validarEntradaValorAnilloExponenciacionBinaria();

        if (mensaje.length != 0) {
            addErrorExponenciacionBinaria("valorAnilloExponenciacionBinaria", mensaje);
        } else{
            deleteErrorExponenciacionBinaria("valorAnilloExponenciacionBinaria");

            if(validarEntradaBaseExponenciacionBinaria().length == 0)
            	deleteErrorExponenciacionBinaria("baseExponenciacionBinaria");
            else
            	addErrorExponenciacionBinaria("baseExponenciacionBinaria", validarEntradaBaseExponenciacionBinaria());
        }
    });

    $("#in-exponenteExponenciacionBinaria").on('click change keyup', function() {
        var mensaje = validarEntradaExponenteExponenciacionBinaria();

        if (mensaje.length != 0) {
            addErrorExponenciacionBinaria("exponenteExponenciacionBinaria", mensaje);
        } else{
            deleteErrorExponenciacionBinaria("exponenteExponenciacionBinaria");
        }
    });

    $("#C-Base-EB").keyup(function(){
        var mensaje = validarEntradaC_BaseExponenciacionBinaria();

        if (mensaje.length != 0) {
            addErrorEB("C-Base-EB", mensaje);
        } else{
            deleteErrorEB("C-Base-EB");
        }
    });

    $("#C-Modulo-EB").keyup(function(){
        var mensaje = validarEntradaC_ModuloExponenciacionBinaria();

        if (mensaje.length != 0) {
            addErrorEB("C-Modulo-EB", mensaje);
        } else{
            deleteErrorEB("C-Modulo-EB");

            if(validarEntradaC_BaseExponenciacionBinaria().length == 0)
            	deleteErrorEB("C-Base-EB");
            else
            	addErrorEB("C-Base-EB", validarEntradaC_BaseExponenciacionBinaria());
        }
    });

    $("#C-Exponente-EB").keyup(function(){
        var mensaje = validarEntradaC_ExponenteExponenciacionBinaria();

        if (mensaje.length != 0) {
            addErrorEB("C-Exponente-EB", mensaje);
        } else{
            deleteErrorEB("C-Exponente-EB");
        }
    });

	$("#btn-comenzarExponenciacionBinaria").click(function(){
		var mensajebase = validarEntradaBaseExponenciacionBinaria();
		var mensajevaloranillo = validarEntradaValorAnilloExponenciacionBinaria();
		var mensajeexponente = validarEntradaExponenteExponenciacionBinaria();

		if(mensajebase.length == 0 && mensajeexponente.length == 0 && mensajevaloranillo.length == 0){
			$("#baseExponenciacionBinaria-error").remove();
            $("#valorAnilloExponenciacionBinaria-error").remove();
            $("#exponenteExponenciacionBinaria-error").remove();
            $("#in-baseExponenciacionBinaria").removeClass('input-error');
            $("#in-valorAnilloExponenciacionBinaria").removeClass('input-error');
            $("#in-exponenteExponenciacionBinaria").removeClass('input-error');

            if($('#btn-comenzarExponenciacionBinaria').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarExponenciacionBinaria').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadExponenciacionBinaria").hide();
            $("#btn-comenzarExponenciacionBinaria").hide();
            $("#btn-cancelarExponenciacionBinaria").show();
            cancelado = false;
            
            comenzarExponenciacionBinaria();
		}
		else{
			if(mensajebase.length > 0){
				addErrorExponenciacionBinaria("baseExponenciacionBinaria", mensajebase);
			}
			if(mensajeexponente.length > 0){
				addErrorExponenciacionBinaria("exponenteExponenciacionBinaria", mensajeexponente);
			}
			if(mensajevaloranillo.length > 0){
				addErrorExponenciacionBinaria("valorAnilloExponenciacionBinaria", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarExponenciacionBinaria").click(function(){
        cancelado = true;

        limpiaPanelExponenciacionBinaria();

        $("#btn-comenzarExponenciacionBinaria").show();
        $("#btn-velocidadExponenciacionBinaria").show();
        $("#btn-cancelarExponenciacionBinaria").hide();
    });

    $("#btn-calcularExponenciacionBinaria").click(function(){
		var mensajevalorA = validarEntradaC_BaseExponenciacionBinaria();
		var mensajevaloranillo = validarEntradaC_ModuloExponenciacionBinaria();
		var mensajevalorB = validarEntradaC_ExponenteExponenciacionBinaria();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#C-Base-EB-error").remove();
            $("#C-Exponente-EB-error").remove();
            $("#C-Modulo-EB-error").remove();
            $("#C-Base-EB").removeClass('input-error');
            $("#C-Exponente-EB").removeClass('input-error');
            $("#C-Modulo-EB").removeClass('input-error');

           	calcularExponenciacionBinaria();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorEB("C-Base-EB", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorEB("C-Exponente-EB", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorEB("C-Modulo-EB", mensajevaloranillo);
			}
		}
	});
});

function calcularExponenciacionBinaria(){
	var b = bigInt($("#C-Base-EB").val());
	var e = bigInt($("#C-Exponente-EB").val());
	var m = bigInt($("#C-Modulo-EB").val());
	var resultado = 0;

	resultado = exponenciacionBinaria(b, e, m);

	$('#fileDisplayAreaCalculadoraExponenciacionBinaria').val(resultado.toString());
}

function exponenciacionBinaria(base, exponente, modulo){
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