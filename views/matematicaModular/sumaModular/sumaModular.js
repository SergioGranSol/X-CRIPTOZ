var cancelado = false;
var velocidad = 1;

$.fn.scrollViewSM = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepSM(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelSumaModular() {
	$("#pnl-InteractivoSumaModular").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelSumaModular(){
	cancelado = true;

	$("#pnl-InteractivoSumaModular").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelSumaModular();

	$("#btn-comenzarSumaModular").show();
    $("#btn-velocidadSumaModular").show();
    $("#btn-cancelarSumaModular").hide();

    $("#in-valorASumaModular").val("15");
	$("#in-valorBSumaModular").val("15");
	$("#in-valorAnilloSumaModular").val("20");

	deleteErrorSumaModular("valorASumaModular");
	deleteErrorSumaModular("valorBSumaModular");
	deleteErrorSumaModular("valorAnilloSumaModular");
}

function limpiaPanelSumaModular(){
	$('#divOperacion').empty();
	$('#divAnillo').empty();
	$('#valorSumaModular').html("<br>");
	$('#out-sumaModular').val('');
	$("#in-valorASumaModular").val("");
	$("#in-valorBSumaModular").val("");
	$("#in-valorAnilloSumaModular").val("");

	if($('#SMdiv1').is(':visible')) {
		$("#SMdiv1").slideToggle(500);
	}
}

async function comenzarSumaModularTabla(){
	var a = parseInt($("#in-valorASumaModular").val());
	var b = parseInt($("#in-valorBSumaModular").val());
	var z = parseInt($("#in-valorAnilloSumaModular").val());
	var suma = 0;
	
	limpiaPanelSumaModular();

	$("#in-valorASumaModular").val(a);
	$("#in-valorBSumaModular").val(b);
	$("#in-valorAnilloSumaModular").val(z);

	$('#SMdiv1').html('Estos son los elementos del anillo Z<sub>'+z+'</sub>');
	$('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(3000);
	
	if(cancelado){
		return;
	}

	$('#SMdiv1').scrollViewSM();
	
	$('#divAnillo').append('<table class="table tabla tableVI3"><tr id="anillo"></tr></table>');

	for(var i = 0 ; i < z ; i++){
		$('#anillo').append('<td id="z' + i + '">' + i + '</td>');
	}
	
	if(cancelado){
        return;
    }

    $('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(1000);
	
	if(cancelado){
		return;
	}

	$('#SMdiv1').html("Se toma el número A = " + a + " y se avanza B = " + b + " veces dentro del anillo");
	$('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(4000);

	if(cancelado){
		return;
	}

	$('#SMdiv1').scrollViewSM();

	$('#divOperacion').append('<label class="text-center" id="suma"></label>')

	for(var i = a ; i <= ((a+b < z)?(a+b):(z-1)) ; i++, suma++){
		$('#suma').html(a + " + " + suma + " ≡ " + i + " mod " + z);
		putparpadeo('#z'+i, 0.5*velocidad, azul);

		await sleepSM(500*velocidad);

		removeputparpadeo('#z'+i, 0.5*velocidad, azul);
	}

	//si a+b > z
	if(a+b >= z){
		if(cancelado){
	        return;
	    }

	    $('#SMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepSM(1000);
		
		if(cancelado){
			return;
		}

		$('#SMdiv1').html("Si se llega al final del anillo se continua desde el inicio del mismo las veces que sea necesario hasta avanzar B = " + b + " veces.");
		$('#SMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepSM(5000);

		if(cancelado){
			return;
		}

		$('#SMdiv1').scrollViewSM();

		suma = suma + (Math.floor((a+b)/z)-1)*z

		for(var i = 0 ; i <= (a+b)%z ; i++, suma++){
			$('#suma').html(a + " + " + suma + " = " + i + " mod " + z);
			putparpadeo('#z'+i, 0.5*velocidad, azul);

			await sleepSM(500*velocidad);

			removeputparpadeo('#z'+i, 0.5*velocidad, azul);
		}
	}

	suma = (a + b)%z;

	$('#z'+suma).css('backgroundColor','#b3d9ff');

	if(cancelado){
        return;
    }

    $('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(1000);
	
	if(cancelado){
		return;
	}

	$('#SMdiv1').html("La casilla donde nos detuvimos es el resultado de la suma modular.");
	$('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(3000);

	if(cancelado){
		return;
	}

	$('#SMdiv1').scrollViewSM();

	$('#valorSumaModular').append('<br><label class="circulo" id="SM-cell-0">' + suma + '</label>');

	putparpadeo('#SM-cell-0', 1*velocidad, negro);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#SM-cell-0', 1*velocidad, negro);
	$('#z'+suma).css('backgroundColor','#ffffff');	

	//FIN
    $("#out-sumaModular").val(suma);
    $("#btn-velocidadSumaModular").show();
    $("#btn-comenzarSumaModular").show();
    $("#btn-cancelarSumaModular").hide();

    if(!cancelado){
        $('#SMdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

async function comenzarSumaModularDivision(){
	var a = parseInt($("#in-valorASumaModular").val());
	var b = parseInt($("#in-valorBSumaModular").val());
	var z = parseInt($("#in-valorAnilloSumaModular").val());
	var c = 0, r = 0;
	
	limpiaPanelSumaModular();

	$("#in-valorASumaModular").val(a);
	$("#in-valorBSumaModular").val(b);
	$("#in-valorAnilloSumaModular").val(z);

	$('#SMdiv1').html('Se realiza la suma algebraica A + B = C.');
	$('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(3000);
	
	if(cancelado){
		return;
	}

	$('#SMdiv1').scrollViewSM();

	c = a + b;
	
	$('#divOperacion').append('<label class="text-center" id="suma"></label>')
	$('#suma').html(a + " + " + b + " = " + c);
	putparpadeo('#suma', 1*velocidad, azul);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#suma', 1*velocidad, azul);
	
	if(cancelado){
        return;
    }

    $('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(1000);
	
	if(cancelado){
		return;
	}

	$('#SMdiv1').html("Se realiza la división entre Z y C.");
	$('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(3000);

	if(cancelado){
		return;
	}

	$('#SMdiv1').scrollViewSM();

	$('#divOperacion').append('<br><center><table class="text-center" width="10%" id="division"><tr><td>&nbsp;</td><td id="x"></td></tr><tr><td id="z"></td><td id="c"></td></tr><tr><td>&nbsp;</td><td id="r"></td></tr></table></center>')
	
	$('#c').html(c);

	putparpadeo('#c', 1*velocidad, azul);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#c', 1*velocidad, azul);

	$('#z').html(z);
	
	putparpadeo('#z', 1*velocidad, azul);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#z', 1*velocidad, azul);

	$('#x').html(Math.floor(c/z));

	putparpadeo('#x', 1*velocidad, azul);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#x', 1*velocidad, azul);

	r = c%z;

	$('#r').html(r);

	putparpadeo('#r', 1*velocidad, azul);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#r', 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(1000);
	
	if(cancelado){
		return;
	}

	$('#SMdiv1').html("El residuo es el resultado de la suma modular.");
	$('#SMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepSM(3000);

	if(cancelado){
		return;
	}

	$('#SMdiv1').scrollViewSM

	$('#divOperacion').append('<br><label class="text-center" id="resultado"></label>')
	$('#resultado').html(a + " + " + b + " ≡ " + r + " mod " + z);
	putparpadeo('#resultado', 1*velocidad, azul);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#resultado', 1*velocidad, azul);

	$('#valorSumaModular').html('<label class="circulo" id="SM-cell-0">' + r + '</label>');

	putparpadeo('#SM-cell-0', 1*velocidad, negro);

	await sleepSM(1000*velocidad);

	removeputparpadeo('#SM-cell-0', 1*velocidad, negro);

	//FIN
    $("#out-sumaModular").val(r);
    $("#btn-velocidadSumaModular").show();
    $("#btn-comenzarSumaModular").show();
    $("#btn-cancelarSumaModular").hide();

    if(!cancelado){
        $('#SMdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaValorASumaModular(){
	var mensaje = "";
	var a = $('#in-valorASumaModular').val();
	var z = bigInt($('#in-valorAnilloSumaModular').val());

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(0) == -1 || bigInt(a).compare(z) != -1 || a.length == 0){
		mensaje = mensaje_73;
	}

	return mensaje;
}

function validarEntradaValorBSumaModular(){
	var mensaje = "";
	var b = $('#in-valorBSumaModular').val();
	var z = bigInt($('#in-valorAnilloSumaModular').val());

	if(!b.match(/^[0-9]+$/) || bigInt(b).compare(0) == -1 || bigInt(b).compare(z) != -1 || b.length == 0){
		mensaje = mensaje_74;
	}

	return mensaje;
}

function validarEntradaValorAnilloSumaModular(){
	var mensaje = "";
	var z = $('#in-valorAnilloSumaModular').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(50) == 1){
		mensaje = mensaje_75;
	}

	return mensaje;
}

function validarEntradaC_ASumaModular(){
	var mensaje = "";
	var a = $('#C-A-SM').val();
	var z = $('#C-Z-SM').val();

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(0) == -1 || bigInt(a).compare(bigInt(z).minus(1)) == 1 || a.length == 0){
		mensaje = mensaje_73;
	}

	return mensaje;
}

function validarEntradaC_BSumaModular(){
	var mensaje = "";
	var b = $('#C-B-SM').val();
	var z = $('#C-Z-SM').val();

	if(!b.match(/^[0-9]+$/) || bigInt(b).compare(0) == -1 || bigInt(b).compare(bigInt(z).minus(1)) == 1 || b.length == 0){
		mensaje = mensaje_74;
	}

	return mensaje;
}

function validarEntradaC_ZSumaModular(){
	var mensaje = "";
	var z = $('#C-Z-SM').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1 || z.length == 0){
		mensaje = mensaje_123;
	}

	return mensaje;
}

function addErrorSumaModular(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorSumaModular(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorSM(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorSM(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoSumaModular1").click(function(){
        $("#btn-comenzarSumaModular").html('Calcular Rápido');
        $("#btn-comenzarSumaModular").val(1);
    });
    $("#tipoSumaModular2").click(function(){
        $("#btn-comenzarSumaModular").html('Calcular Normal');
        $("#btn-comenzarSumaModular").val(2);
    });

    $("#in-valorASumaModular").on('click change keyup', function() {
        var mensaje = validarEntradaValorASumaModular();

        if (mensaje.length != 0) {
            addErrorSumaModular("valorASumaModular", mensaje);
        } else{
            deleteErrorSumaModular("valorASumaModular");
        }
    });

    $("#in-valorAnilloSumaModular").on('click change keyup', function() {
        var mensaje = validarEntradaValorAnilloSumaModular();

        if (mensaje.length != 0) {
            addErrorSumaModular("valorAnilloSumaModular", mensaje);
        } else{
            deleteErrorSumaModular("valorAnilloSumaModular");

            if(validarEntradaValorASumaModular().length == 0)
            	deleteErrorSumaModular("valorASumaModular");
            else
            	addErrorSumaModular("valorASumaModular", validarEntradaValorASumaModular());

            if(validarEntradaValorBSumaModular().length == 0)
            	deleteErrorSumaModular("valorBSumaModular");
            else
            	addErrorSumaModular("valorBSumaModular", validarEntradaValorBSumaModular());
        }
    });

    $("#in-valorBSumaModular").on('click change keyup', function() {
        var mensaje = validarEntradaValorBSumaModular();

        if (mensaje.length != 0) {
            addErrorSumaModular("valorBSumaModular", mensaje);
        } else{
            deleteErrorSumaModular("valorBSumaModular");
        }
    });

    $("#C-A-SM").on('click change keyup', function() {
        var mensaje = validarEntradaC_ASumaModular();

        if (mensaje.length != 0) {
            addErrorSM("C-A-SM", mensaje);
        } else{
            deleteErrorSM("C-A-SM");
        }
    });

    $("#C-Z-SM").on('click change keyup', function() {
        var mensaje = validarEntradaC_ZSumaModular();

        if (mensaje.length != 0) {
            addErrorSM("C-Z-SM", mensaje);
        } else{
            deleteErrorSM("C-Z-SM");

            if(validarEntradaC_ASumaModular().length == 0)
            	deleteErrorSM("C-A-SM");
            else
            	addErrorSM("C-A-SM", validarEntradaC_ASumaModular());

            if(validarEntradaC_BSumaModular().length == 0)
            	deleteErrorSM("C-B-SM");
            else
            	addErrorSM("C-B-SM", validarEntradaC_BSumaModular());
        }
    });

    $("#C-B-SM").on('click change keyup', function() {
        var mensaje = validarEntradaC_BSumaModular();

        if (mensaje.length != 0) {
            addErrorSM("C-B-SM", mensaje);
        } else{
            deleteErrorSM("C-B-SM");
        }
    });

	$("#btn-comenzarSumaModular").click(function(){
		var mensajevalorA = validarEntradaValorASumaModular();
		var mensajevaloranillo = validarEntradaValorAnilloSumaModular();
		var mensajevalorB = validarEntradaValorBSumaModular();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#valorASumaModular-error").remove();
            $("#valorAnilloSumaModular-error").remove();
            $("#valorBSumaModular-error").remove();
            $("#in-valorASumaModular").removeClass('input-error');
            $("#in-valorAnilloSumaModular").removeClass('input-error');
            $("#in-valorBSumaModular").removeClass('input-error');

            if($('#btn-comenzarSumaModular').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarSumaModular').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadSumaModular").hide();
            $("#btn-comenzarSumaModular").hide();
            $("#btn-cancelarSumaModular").show();
            cancelado = false;
            
            if($("#SMtabla").is(":checked"))
            	comenzarSumaModularTabla();
            else
            	comenzarSumaModularDivision();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorSumaModular("valorASumaModular", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorSumaModular("valorBSumaModular", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorSumaModular("valorAnilloSumaModular", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarSumaModular").click(function(){
        cancelado = true;

        limpiaPanelSumaModular();

        $("#btn-comenzarSumaModular").show();
        $("#btn-velocidadSumaModular").show();
        $("#btn-cancelarSumaModular").hide();
    });

    $("#btn-calcularSumaModular").click(function(){
		var mensajevalorA = validarEntradaC_ASumaModular();
		var mensajevaloranillo = validarEntradaC_ZSumaModular();
		var mensajevalorB = validarEntradaC_BSumaModular();

		if(mensajevalorA.length == 0 && mensajevalorB.length == 0 && mensajevaloranillo.length == 0){
			$("#C-A-SM-error").remove();
            $("#C-B-SM-error").remove();
            $("#C-Z-SM-error").remove();
            $("#C-A-SM").removeClass('input-error');
            $("#C-B-SM").removeClass('input-error');
            $("#C-Z-SM").removeClass('input-error');

           	calcularSumaModular();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorSM("C-A-SM", mensajevalorA);
			}
			if(mensajevalorB.length > 0){
				addErrorSM("C-B-SM", mensajevalorB);
			}
			if(mensajevaloranillo.length > 0){
				addErrorSM("C-Z-SM", mensajevaloranillo);
			}
		}
	});
});

function calcularSumaModular(){
	var a = bigInt($("#C-A-SM").val());
	var b = bigInt($("#C-B-SM").val());
	var z = bigInt($("#C-Z-SM").val());
	var resultado = (a.add(b)).mod(z);

	$('#fileDisplayAreaCalculadoraSumaModular').val(resultado.toString());
}