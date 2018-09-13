var cancelado = false;
var velocidad = 1;

$.fn.scrollViewMM = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepMM(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelMultiplicacionModular() {
	$("#pnl-InteractivoMultiplicacionModular").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelMultiplicacionModular(){
	cancelado = true;

	$("#pnl-InteractivoMultiplicacionModular").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelMultiplicacionModular();

	$("#in-valorAMultiplicacionModular").val("15");
	$("#in-valorBMultiplicacionModular").val("15");
	$("#in-valorAnilloMultiplicacionModular").val("20");

	$("#btn-comenzarMultiplicacionModular").show();
    $("#btn-velocidadMultiplicacionModular").show();
    $("#btn-cancelarMultiplicacionModular").hide();
    
    deleteErrorMultiplicacionModular("valorAMultiplicacionModular");
	deleteErrorMultiplicacionModular("valorBMultiplicacionModular");
	deleteErrorMultiplicacionModular("valorAnilloMultiplicacionModular");
}

function limpiaPanelMultiplicacionModular(){
	$('#MMdivOperacion').empty();
	$('#valorMultiplicacionModular').empty();
	$('#out-multiplicacionModular').val('');

	$("#in-valorAMultiplicacionModular").val("");
	$("#in-valorBMultiplicacionModular").val("");
	$("#in-valorAnilloMultiplicacionModular").val("");

	if($('#MMdiv1').is(':visible')) {
		$("#MMdiv1").slideToggle(500);
	}
}

async function comenzarMultiplicacionModular(){
	var a = parseInt($("#in-valorAMultiplicacionModular").val());
	var b = parseInt($("#in-valorBMultiplicacionModular").val());
	var z = parseInt($("#in-valorAnilloMultiplicacionModular").val());
	var c = 0, r = 0;
	
	limpiaPanelMultiplicacionModular();

	$("#in-valorAMultiplicacionModular").val(a);
	$("#in-valorBMultiplicacionModular").val(b);
	$("#in-valorAnilloMultiplicacionModular").val(z);

	$('#MMdiv1').html('Se realiza la multiplicación algebraica A * B = C.');
	$('#MMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepMM(3000);
	
	if(cancelado){
		return;
	}

	$('#MMdiv1').scrollViewMM();

	c = a * b;
	
	$('#MMdivOperacion').append('<label class="text-center" id="multiplicacion"></label>')
	$('#multiplicacion').html(a + " * " + b + " = " + c);
	putparpadeo('#multiplicacion', 1*velocidad, azul);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#multiplicacion', 1*velocidad, azul);
	
	if(cancelado){
        return;
    }

    $('#MMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepMM(1000);
	
	if(cancelado){
		return;
	}

	$('#MMdiv1').html("Se realiza la división entre Z y C.");
	$('#MMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepMM(5000);

	if(cancelado){
		return;
	}

	$('#MMdiv1').scrollViewMM();

	$('#MMdivOperacion').append('<br><center><table class="text-center" width="10%" id="division"><tr><td>&nbsp;</td><td id="x"></td></tr><tr><td id="z"></td><td id="c"></td></tr><tr><td>&nbsp;</td><td id="r"></td></tr></table></center>')
	
	$('#c').html(c);

	putparpadeo('#c', 1*velocidad, azul);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#c', 1*velocidad, azul);

	$('#z').html(z);
	
	putparpadeo('#z', 1*velocidad, azul);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#z', 1*velocidad, azul);

	$('#x').html(Math.floor(c/z));

	putparpadeo('#x', 1*velocidad, azul);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#x', 1*velocidad, azul);

	r = c%z;

	$('#r').html(r);

	putparpadeo('#r', 1*velocidad, azul);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#r', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#MMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepMM(1000);
	
	if(cancelado){
		return;
	}

	$('#MMdiv1').html("El residuo es el resultado de la multiplicación modular.");
	$('#MMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepMM(3000);

	if(cancelado){
		return;
	}

	$('#MMdiv1').scrollViewMM

	$('#MMdivOperacion').append('<br><label class="text-center" id="resultado"></label>')
	$('#resultado').html(a + " * " + b + " ≡ " + r + " mod " + z);
	putparpadeo('#resultado', 1*velocidad, azul);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#resultado', 1*velocidad, azul);

	$('#valorMultiplicacionModular').append('<label class="circulo" id="MM-cell-0">' + r + '</label>');

	putparpadeo('#MM-cell-0', 1*velocidad, negro);

	await sleepMM(1000*velocidad);

	removeputparpadeo('#MM-cell-0', 1*velocidad, negro);

	//FIN
    $("#out-multiplicacionModular").val(r);
    $("#btn-velocidadMultiplicacionModular").show();
    $("#btn-comenzarMultiplicacionModular").show();
    $("#btn-cancelarMultiplicacionModular").hide();

    if(!cancelado){
        $('#MMdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaValorAMultiplicacionModular(){
	var mensaje = "";
	var a = $('#in-valorAMultiplicacionModular').val();
	var z = bigInt($('#in-valorAnilloMultiplicacionModular').val());

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(0) == -1 || bigInt(a).compare(z) != -1 || a.length == 0){
		mensaje = mensaje_73;
	}

	return mensaje;
}

function validarEntradaValorBMultiplicacionModular(){
	var mensaje = "";
	var b = $('#in-valorBMultiplicacionModular').val();
	var z = bigInt($('#in-valorAnilloMultiplicacionModular').val());

	if(!b.match(/^[0-9]+$/) || bigInt(b).compare(0) == -1 || bigInt(b).compare(z) != -1 || b.length == 0){
		mensaje = mensaje_74;
	}

	return mensaje;
}

function validarEntradaValorAnilloMultiplicacionModular(){
	var mensaje = "";
	var z = $('#in-valorAnilloMultiplicacionModular').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(50) == 1){
		mensaje = mensaje_75;
	}
	return mensaje;
}

function validarEntradaC_AMultiplicacionModular(){
	var mensaje = "";
	var a = $('#C-A-MM').val();
	var z = $('#C-Z-MM').val();

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(0) == -1 || bigInt(a).compare(bigInt(z).minus(1)) == 1 || a.length == 0){
		mensaje = mensaje_73;
	}

	return mensaje;
}

function validarEntradaC_BMultiplicacionModular(){
	var mensaje = "";
	var b = $('#C-B-MM').val();
	var z = $('#C-Z-MM').val();

	if(!b.match(/^[0-9]+$/) || bigInt(b).compare(0) == -1 || bigInt(b).compare(bigInt(z).minus(1)) == 1 || b.length == 0){
		mensaje = mensaje_74;
	}

	return mensaje;
}

function validarEntradaC_ZMultiplicacionModular(){
	var mensaje = "";
	var z = $('#C-Z-MM').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1 || z.length == 0){
		mensaje = mensaje_123;
	}

	return mensaje;
}

function addErrorMultiplicacionModular(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorMultiplicacionModular(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorMM(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorMM(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoMultiplicacionModular1").click(function(){
        $("#btn-comenzarMultiplicacionModular").html('Calcular Rápido');
        $("#btn-comenzarMultiplicacionModular").val(1);
    });
    $("#tipoMultiplicacionModular2").click(function(){
        $("#btn-comenzarMultiplicacionModular").html('Calcular Normal');
        $("#btn-comenzarMultiplicacionModular").val(2);
    });

    $("#in-valorAMultiplicacionModular").on('click change keyup', function() {
        var mensaje = validarEntradaValorAMultiplicacionModular();

        if (mensaje.length != 0) {
            addErrorMultiplicacionModular("valorAMultiplicacionModular", mensaje);
        } else{
            deleteErrorMultiplicacionModular("valorAMultiplicacionModular");
        }
    });

    $("#in-valorAnilloMultiplicacionModular").on('click change keyup', function() {
        var mensaje = validarEntradaValorAnilloMultiplicacionModular();

        if (mensaje.length != 0) {
            addErrorMultiplicacionModular("valorAnilloMultiplicacionModular", mensaje);
        } else{
            deleteErrorMultiplicacionModular("valorAnilloMultiplicacionModular");

            if(validarEntradaValorAMultiplicacionModular().length == 0)
            	deleteErrorMultiplicacionModular("valorAMultiplicacionModular");
            else
            	addErrorMultiplicacionModular("valorAMultiplicacionModular", validarEntradaValorAMultiplicacionModular());

            if(validarEntradaValorBMultiplicacionModular().length == 0)
            	deleteErrorMultiplicacionModular("valorBMultiplicacionModular");
            else
            	addErrorMultiplicacionModular("valorBMultiplicacionModular", validarEntradaValorBMultiplicacionModular());
        }
    });

    $("#in-valorBMultiplicacionModular").on('click change keyup', function() {
        var mensaje = validarEntradaValorBMultiplicacionModular();

        if (mensaje.length != 0) {
            addErrorMultiplicacionModular("valorBMultiplicacionModular", mensaje);
        } else{
            deleteErrorMultiplicacionModular("valorBMultiplicacionModular");
        }
    });

    $("#C-A-MM").keyup(function(){
        var mensaje = validarEntradaC_AMultiplicacionModular();

        if (mensaje.length != 0) {
            addErrorMM("C-A-MM", mensaje);
        } else{
            deleteErrorMM("C-A-MM");
        }
    });

    $("#C-Z-MM").keyup(function(){
        var mensaje = validarEntradaC_ZMultiplicacionModular();

        if (mensaje.length != 0) {
            addErrorMM("C-Z-MM", mensaje);
        } else{
            deleteErrorMM("C-Z-MM");

            if(validarEntradaC_AMultiplicacionModular().length == 0)
            	deleteErrorMM("C-A-MM");
            else
            	addErrorMM("C-A-MM", validarEntradaC_AMultiplicacionModular());

            if(validarEntradaC_BMultiplicacionModular().length == 0)
            	deleteErrorMM("C-B-MM");
            else
            	addErrorMM("C-B-MM", validarEntradaC_BMultiplicacionModular());
        }
    });

    $("#C-B-MM").keyup(function(){
        var mensaje = validarEntradaC_BMultiplicacionModular();

        if (mensaje.length != 0) {
            addErrorMM("C-B-MM", mensaje);
        } else{
            deleteErrorMM("C-B-MM");
        }
    });

	$("#btn-comenzarMultiplicacionModular").click(function(){
		var mensajevalorA = validarEntradaValorAMultiplicacionModular();
		var mensajevaloranillo = validarEntradaValorAnilloMultiplicacionModular();
		var mensajevalorB = validarEntradaValorBMultiplicacionModular();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#valorAMultiplicacionModular-error").remove();
            $("#valorAnilloMultiplicacionModular-error").remove();
            $("#valorBMultiplicacionModular-error").remove();
            $("#in-valorAMultiplicacionModular").removeClass('input-error');
            $("#in-valorAnilloMultiplicacionModular").removeClass('input-error');
            $("#in-valorBMultiplicacionModular").removeClass('input-error');

            if($('#btn-comenzarMultiplicacionModular').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarMultiplicacionModular').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadMultiplicacionModular").hide();
            $("#btn-comenzarMultiplicacionModular").hide();
            $("#btn-cancelarMultiplicacionModular").show();
            cancelado = false;
            
            comenzarMultiplicacionModular();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorMultiplicacionModular("valorAMultiplicacionModular", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorMultiplicacionModular("valorBMultiplicacionModular", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorMultiplicacionModular("valorAnilloMultiplicacionModular", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarMultiplicacionModular").click(function(){
        cancelado = true;

        limpiaPanelMultiplicacionModular();

        $("#btn-comenzarMultiplicacionModular").show();
        $("#btn-velocidadMultiplicacionModular").show();
        $("#btn-cancelarMultiplicacionModular").hide();
    });

    $("#btn-calcularMultiplicacionModular").click(function(){
		var mensajevalorA = validarEntradaC_AMultiplicacionModular();
		var mensajevaloranillo = validarEntradaC_ZMultiplicacionModular();
		var mensajevalorB = validarEntradaC_BMultiplicacionModular();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#C-A-MM-error").remove();
            $("#C-B-MM-error").remove();
            $("#C-Z-MM-error").remove();
            $("#C-A-MM").removeClass('input-error');
            $("#C-B-MM").removeClass('input-error');
            $("#C-Z-MM").removeClass('input-error');

           	calcularMultiplicacionModular();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorMM("C-A-MM", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorMM("C-B-MM", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorMM("C-Z-MM", mensajevaloranillo);
			}
		}
	});
});

function calcularMultiplicacionModular(){
	var a = bigInt($("#C-A-MM").val());
	var b = bigInt($("#C-B-MM").val());
	var z = bigInt($("#C-Z-MM").val());
	var resultado = (a.multiply(b)).mod(z);

	$('#fileDisplayAreaCalculadoraMultiplicacionModular').val(resultado.toString());
}