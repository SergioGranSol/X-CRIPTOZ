var cancelado = false;
var velocidad = 1;

$.fn.scrollViewIA = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepIA(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelInversoAditivo() {
	$("#pnl-InteractivoInversoAditivo").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelInversoAditivo(){
	cancelado = true;

	$("#pnl-InteractivoInversoAditivo").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelInversoAditivo();

	$("#in-valorAInversoAditivo").val("15");
	$("#in-valorAnilloInversoAditivo").val("20");

	$("#btn-comenzarInversoAditivo").show();
	$("#btn-velocidadInversoAditivo").show();
	$("#btn-cancelarInversoAditivo").hide();

	deleteErrorInversoAditivo("valorAnilloInversoAditivo");
	deleteErrorInversoAditivo("valorAInversoAditivo");
}

function limpiaPanelInversoAditivo(){
	$('#IAdivOperacion').empty();
	$('#valorInversoAditivo').empty();
	$('#out-inversoAditivo').val('');

	$("#in-valorAInversoAditivo").val("");
	$("#in-valorAnilloInversoAditivo").val("");

	if($('#IAdiv1').is(':visible')) {
		$("#IAdiv1").slideToggle(500);
	}
}

async function comenzarInversoAditivo(){
	var a = parseInt($("#in-valorAInversoAditivo").val());
	var z = parseInt($("#in-valorAnilloInversoAditivo").val());
	var inverso;
	
	limpiaPanelInversoAditivo();

	$("#in-valorAInversoAditivo").val(a);
	$("#in-valorAnilloInversoAditivo").val(z);

	$('#IAdiv1').html('Se realiza la resta algebraica Z - A = B.');
	$('#IAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIA(3000);
	
	if(cancelado){
		return;
	}

	$('#IAdiv1').scrollViewIA();

	inverso = z - a;
	
	$('#IAdivOperacion').append('<label class="text-center" id="resta"></label>')
	$('#resta').html(z + " - " + a + " = " + inverso);
	putparpadeo('#resta', 1*velocidad, azul);

	await sleepIA(1000*velocidad);

	removeputparpadeo('#resta', 1*velocidad, azul);
	
	if(cancelado){
        return;
    }

    $('#IAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIA(1000);
	
	if(cancelado){
		return;
	}

	$('#IAdiv1').html("El resultado es el inverso aditivo ya que A + B = Z.");
	$('#IAdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIA(5000);

	if(cancelado){
		return;
	}

	$('#IAdiv1').scrollViewIA

	$('#IAdivOperacion').append('<br><label class="text-center" id="comprobacion"></label>')
	$('#comprobacion').html(a + " + " + inverso + " = " + z);
	putparpadeo('#comprobacion', 1*velocidad, azul);

	await sleepIA(1000*velocidad);

	removeputparpadeo('#comprobacion', 1*velocidad, azul);

	$('#valorInversoAditivo').append('<label class="circulo" id="IA-cell-0">-A = B = ' + inverso + '</label>');

	putparpadeo('#IA-cell-0', 1*velocidad, negro);

	await sleepIA(1000*velocidad);

	removeputparpadeo('#IA-cell-0', 1*velocidad, negro);

	//FIN
    $("#out-inversoAditivo").val(inverso);
    $("#btn-velocidadInversoAditivo").show();
    $("#btn-comenzarInversoAditivo").show();
    $("#btn-cancelarInversoAditivo").hide();

    if(!cancelado){
        $('#IAdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaValorAInversoAditivo(){
	var mensaje = "";
	var a = $('#in-valorAInversoAditivo').val();
	var z = bigInt($('#in-valorAnilloInversoAditivo').val());

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(0) == -1 || bigInt(a).compare(z) != -1 || a.length == 0){
		mensaje = mensaje_73;
	}

	return mensaje;
}

function validarEntradaValorAnilloInversoAditivo(){
	var mensaje = "";
	var z = $('#in-valorAnilloInversoAditivo').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(1000) == 1 || z.length == 0){
		mensaje = mensaje_78;
	}

	return mensaje;
}

function validarEntradaC_AInversoAditivo(){
	var mensaje = "";
	var a = $('#C-A-IA').val();
	var z = $('#C-Z-IA').val();

	if(!a.match(/^[0-9]+$/) || !a.match(/^[0-9]+$/) || bigInt(a).compare(0) == -1 || bigInt(a).compare(bigInt(z).minus(1)) == 1){
		mensaje = mensaje_73;
	}

	return mensaje;
}

function validarEntradaC_ZInversoAditivo(){
	var mensaje = "";
	var z = $('#C-Z-IA').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1 || z.length == 0){
		mensaje = mensaje_123;
	}

	return mensaje;
}

function addErrorInversoAditivo(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorInversoAditivo(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorIA(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorIA(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoInversoAditivo1").click(function(){
        $("#btn-comenzarInversoAditivo").html('Calcular Rápido');
        $("#btn-comenzarInversoAditivo").val(1);
    });
    $("#tipoInversoAditivo2").click(function(){
        $("#btn-comenzarInversoAditivo").html('Calcular Normal');
        $("#btn-comenzarInversoAditivo").val(2);
    });

    $("#in-valorAInversoAditivo").on('click change keyup', function() {
        var mensaje = validarEntradaValorAInversoAditivo();

        if (mensaje.length != 0) {
            addErrorInversoAditivo("valorAInversoAditivo", mensaje);
        } else{
            deleteErrorInversoAditivo("valorAInversoAditivo");
        }
    });

    $("#in-valorAnilloInversoAditivo").on('click change keyup', function() {
        var mensaje = validarEntradaValorAnilloInversoAditivo();

        if (mensaje.length != 0) {
            addErrorInversoAditivo("valorAnilloInversoAditivo", mensaje);
        } else{
            deleteErrorInversoAditivo("valorAnilloInversoAditivo");

            if(validarEntradaValorAInversoAditivo().length == 0)
            	deleteErrorInversoAditivo("valorAInversoAditivo");
            else
            	addErrorInversoAditivo("valorAInversoAditivo", validarEntradaValorAInversoAditivo());
        }
    });

    $("#C-A-IA").keyup(function(){
        var mensaje = validarEntradaC_AInversoAditivo();

        if (mensaje.length != 0) {
            addErrorIA("C-A-IA", mensaje);
        } else{
            deleteErrorIA("C-A-IA");
        }
    });

    $("#C-Z-IA").keyup(function(){
        var mensaje = validarEntradaC_ZInversoAditivo();

        if (mensaje.length != 0) {
            addErrorIA("C-Z-IA", mensaje);
        } else{
            deleteErrorIA("C-Z-IA");

            if(validarEntradaC_AInversoAditivo().length == 0)
            	deleteErrorIA("C-A-IA");
            else
            	addErrorIA("C-A-IA", validarEntradaC_AInversoAditivo());
        }
    });

    $("#btn-comenzarInversoAditivo").click(function(){
		var mensajevalorA = validarEntradaValorAInversoAditivo();
		var mensajevaloranillo = validarEntradaValorAnilloInversoAditivo();

		if(mensajevalorA.length == 0 && mensajevaloranillo.length == 0){
			$("#valorAInversoAditivo-error").remove();
            $("#valorAnilloInversoAditivo-error").remove();
            $("#in-valorAInversoAditivo").removeClass('input-error');
            $("#in-valorAnilloInversoAditivo").removeClass('input-error');

            if($('#btn-comenzarInversoAditivo').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarInversoAditivo').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadInversoAditivo").hide();
            $("#btn-comenzarInversoAditivo").hide();
            $("#btn-cancelarInversoAditivo").show();
            cancelado = false;
            
            comenzarInversoAditivo();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorInversoAditivo("valorAInversoAditivo", mensajevalorA);
			}
			if(mensajevaloranillo.length > 0){
				addErrorInversoAditivo("valorAnilloInversoAditivo", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarInversoAditivo").click(function(){
        cancelado = true;

        limpiaPanelInversoAditivo();

        $("#btn-comenzarInversoAditivo").show();
        $("#btn-velocidadInversoAditivo").show();
        $("#btn-cancelarInversoAditivo").hide();
    });

    $("#btn-calcularInversoAditivo").click(function(){
		var mensajevalorA = validarEntradaC_AInversoAditivo();
		var mensajevaloranillo = validarEntradaC_ZInversoAditivo();

		if(mensajevalorA.length == 0 && mensajevaloranillo.length == 0){
			$("#C-A-IA-error").remove();
            $("#C-Z-IA-error").remove();
            $("#C-A-IA").removeClass('input-error');
            $("#C-Z-IA").removeClass('input-error');

           	calcularInversoAditivo();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorIA("C-A-IA", mensajevalorA);
			}
			if(mensajevaloranillo.length > 0){
				addErrorIA("C-Z-IA", mensajevaloranillo);
			}
		}
	});
});

function calcularInversoAditivo(){
	var a = bigInt($("#C-A-IA").val());
	var z = bigInt($("#C-Z-IA").val());

	$('#fileDisplayAreaCalculadoraInversoAditivo').val(z.minus(a).toString());
}