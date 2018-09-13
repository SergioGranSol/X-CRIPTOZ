var cancelado = false;
var velocidad = 1;

function sleepDiffieHellman(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$.fn.scrollViewDiffieHellman = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelDiffieHellman(){
	$("#pnl-InteractivoDiffieHellman").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function crearPanelCifradoDiffieHellman(){
	for (var i = 0 ; i < 8 ; i++) {
		$("#table-DiffieHellman1").append('<tr id="DH1row-' + i + '"></tr>');
		$("#table-DiffieHellman2").append('<tr id="DH2row-' + i + '"></tr>');
	}

	$("#DH1row-0").append('<td id="DHcell1-0-0" colspan="3">Alice</td>');
	$("#DH2row-0").append('<td id="DHcell2-0-0" colspan="3">Bob</td>');

	for(var i = 0 ; i < 3 ; i++){
		$("#DH1row-1").append('<td id="DHcell1-1-' + i + '">&nbsp;</td>');
		$("#DH2row-1").append('<td id="DHcell2-1-' + i + '">&nbsp;</td>');
	}

	for(var i = 2 ; i < 7 ; i++){
		$("#DH1row-"+i).append('<td id="DHcell1-' + i + '-0" colspan="3"></td>');
		$("#DH2row-"+i).append('<td id="DHcell2-' + i + '-0" colspan="3"></td>');
	}

	$("#table-DiffieHellman1").css("text-align","center");
	$("#table-DiffieHellman2").css("text-align","center");
}


function cerrarPanelDiffieHellman(){
	cancelado = true;

	$("#pnl-InteractivoDiffieHellman").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelDiffieHellman();

	$("#btn-comenzarDiffieHellman").show();
	$("#btn-velocidadDiffieHellman").show();
	$("#btn-cancelarDiffieHellman").hide();

	deleteErrorDiffieHellman("llaveADiffieHellman");
	deleteErrorDiffieHellman("generadoDiffieHellman");
	deleteErrorDiffieHellman("llaveBDiffieHellman");
	deleteErrorDiffieHellman("moduloDiffieHellman");

	$("#in-llaveADiffieHellman").val("5");
	$("#in-llaveBDiffieHellman").val("7");
	$("#in-generadoDiffieHellman").val("3");
	$("#in-moduloDiffieHellman").val("29");
}

function limpiaPanelDiffieHellman(){
	$("#table-DiffieHellman1").empty();
	$("#table-DiffieHellman2").empty();

	$("#in-llaveADiffieHellman").val("");
	$("#in-llaveBDiffieHellman").val("");
	$("#in-generadoDiffieHellman").val("");
	$("#in-moduloDiffieHellman").val("");
	$("#out-llaveDiffieHellman").val("");

	$("#llaveDiffieHellman").empty();

	if($('#DHdiv1').is(':visible')) {
		$("#DHdiv1").slideToggle(500);
	}
}

function limpiarTablas(){
	$("#table-DiffieHellman1").empty();
	$("#table-DiffieHellman2").empty();
}

async function comenzarDiffieHellman(){
	var llaveA = bigInt($("#in-llaveADiffieHellman").val());
	var llaveB = bigInt($("#in-llaveBDiffieHellman").val());
	var generador = bigInt($("#in-generadoDiffieHellman").val());
	var modulo = bigInt($("#in-moduloDiffieHellman").val());
	var kA = bigInt(0), kB = bigInt(0), kfA = bigInt(0), kfB = bigInt(0);
	
	limpiaPanelDiffieHellman();

	$("#in-llaveADiffieHellman").val(llaveA);
	$("#in-llaveBDiffieHellman").val(llaveB);
	$("#in-generadoDiffieHellman").val(generador);
	$("#in-moduloDiffieHellman").val(modulo);

	//Texto Plano
	$('#DHdiv1').html('Generador (<i>g</i>) y Número primo (<i>p</i>) son números públicos previamente acordados por Alice y Bob. Llave Alice (<i>a</i>) y llave Bob (<i>b</i>) solo las conocen Alice y Bob respectivamente');
	$('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(8000);
	
	if(cancelado){
		return;
	}

	$('#DHdiv1').scrollViewDiffieHellman();
	
	crearPanelCifradoDiffieHellman();

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);
	
	if(cancelado){
		return;
	}

	for(var i = 0 ; i < 3 && !cancelado ; i++){
		if(i == 0){
			$("#DHcell1-1-"+i).html("g = " + generador);
			$("#DHcell2-1-"+i).html("g = " + generador);
		}
		else if(i == 1){
			$("#DHcell1-1-"+i).html("p = " + modulo);
			$("#DHcell2-1-"+i).html("p = " + modulo);
		}
		else{
			$("#DHcell1-1-"+i).html("a = " + llaveA);
			$("#DHcell2-1-"+i).html("b = " + llaveB);
		}

		putparpadeo("#DHcell1-1-"+i, 1*velocidad, azul);
		putparpadeo("#DHcell2-1-"+i, 1*velocidad, azul);

		await sleepDiffieHellman(1000*velocidad);

		removeputparpadeo("DHcell1-1-"+i, 1*velocidad, azul);
		removeputparpadeo("DHcell2-1-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

    $('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000);
	
	if(cancelado){
		return;
	}

	$('#DHdiv1').html("Alice y Bob realizan las siguientes operaciones para obtener <i>k<sub>A</sub></i> y <i>k<sub>B</sub></i> respectivamente:<br><i>k<sub>A</sub> = g<sup>a</sup> mod p<br>k<sub>B</sub> = g<sup>b</sup> mod p</i>");
	$('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(6000);

	if(cancelado){
		return;
	}

	$('#DHdiv1').scrollViewDiffieHellman();

	$("#DHcell1-2-0").html("k<sub>A</sub> = " + generador + "<sup>" + llaveA + "</sup> mod " + modulo);
	$("#DHcell2-2-0").html("k<sub>B</sub> = " + generador + "<sup>" + llaveB + "</sup> mod " + modulo);

	putparpadeo("#DHcell1-2-0", 2*velocidad, azul);
	putparpadeo("#DHcell2-2-0", 2*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);

	if(cancelado){
		return;
	}

	kA = bigInt(generador).modPow(llaveA, modulo);
	kB = bigInt(generador).modPow(llaveB, modulo);

	$("#DHcell1-3-0").html("k<sub>A</sub> = " + kA);
	$("#DHcell2-3-0").html("k<sub>B</sub> = " + kB);

	putparpadeo("#DHcell1-3-0", 1*velocidad, azul);
	putparpadeo("#DHcell2-3-0", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);

	if(cancelado){
		return;
	}

	removeputparpadeo("#DHcell1-2-0", 2*velocidad, azul);
	removeputparpadeo("#DHcell2-2-0", 2*velocidad, azul);
	removeputparpadeo("#DHcell1-3-0", 1*velocidad, azul);
	removeputparpadeo("#DHcell2-3-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000);
	
	if(cancelado){
		return;
	}

	$('#DHdiv1').html("Alice envía K<sub>A</sub> a Bob y Bob envía k<sub>B</sub> a Alice.");
	$('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(3000);

	if(cancelado){
		return;
	}

	$('#DHdiv1').scrollViewDiffieHellman();

	putparpadeo("#DHcell1-3-0", 2*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);
	
	if(cancelado){
		return;
	}

	$("#DHcell2-4-0").html("k<sub>A</sub> = " + kA);

	putparpadeo("#DHcell2-4-0", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);
	
	if(cancelado){
		return;
	}

	removeputparpadeo("#DHcell1-3-0", 2*velocidad, azul);
	removeputparpadeo("#DHcell2-4-0", 1*velocidad, azul);

	putparpadeo("#DHcell2-3-0", 2*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);
	
	if(cancelado){
		return;
	}

	$("#DHcell1-4-0").html("k<sub>B</sub> = " + kB);

	putparpadeo("#DHcell1-4-0", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);
	
	if(cancelado){
		return;
	}

	removeputparpadeo("#DHcell2-3-0", 2*velocidad, azul);
	removeputparpadeo("#DHcell1-4-0", 1*velocidad, azul);

	if(cancelado){
        return;
    }

    $('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000);
	
	if(cancelado){
		return;
	}

	$('#DHdiv1').html("Para obtener <i>k</i>, Alice y Bob realizan las siguientes operaciones respectivamente:<br><i>k = (k<sub>B</sub>)<sup>a</sup> mod p<br>k = (k<sub>A</sub>)<sup>b</sup> mod p</i><br>Obteniendo la misma llave final.");
	$('#DHdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(7000);

	if(cancelado){
		return;
	}

	$('#DHdiv1').scrollViewDiffieHellman();

	$("#DHcell1-5-0").html("k = (" + kB + ")<sup>" + llaveA + "</sup> mod " + modulo);
	$("#DHcell2-5-0").html("k = (" + kA + ")<sup>" + llaveB + "</sup> mod " + modulo);

	putparpadeo("#DHcell1-5-0", 2*velocidad, azul);
	putparpadeo("#DHcell2-5-0", 2*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);

	if(cancelado){
		return;
	}

	kfA = bigInt(kB).modPow(llaveA, modulo);
	kfB = bigInt(kA).modPow(llaveB, modulo);

	$("#DHcell1-6-0").html("k = " + kfA);
	$("#DHcell2-6-0").html("k = " + kfB);

	putparpadeo("#DHcell1-6-0", 1*velocidad, azul);
	putparpadeo("#DHcell2-6-0", 1*velocidad, azul);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);

	if(cancelado){
		return;
	}

	removeputparpadeo("#DHcell1-5-0", 2*velocidad, azul);
	removeputparpadeo("#DHcell2-5-0", 2*velocidad, azul);
	removeputparpadeo("#DHcell1-6-0", 1*velocidad, azul);
	removeputparpadeo("#DHcell2-6-0", 1*velocidad, azul);

	$('#llaveDiffieHellman').append('<br><label class="circulo" id="DH-cell">' + kfA + '</label>');

	putparpadeo("#DHcell1-6-0", 1*velocidad, verde);
	putparpadeo("#DHcell2-6-0", 1*velocidad, verde);
	putparpadeo("#DH-cell", 1*velocidad, negro);

	if(cancelado){
		return;
	}

	await sleepDiffieHellman(1000*velocidad);

	if(cancelado){
		return;
	}

	removeputparpadeo("#DHcell1-6-0", 1*velocidad, verde);
	removeputparpadeo("#DHcell2-6-0", 1*velocidad, verde);
	removeputparpadeo("#DH-cell", 1*velocidad, negro);

	//FIN
    $("#out-llaveDiffieHellman").val(kfA);
    $("#btn-velocidadDiffieHellman").show();
    $("#btn-comenzarDiffieHellman").show();
    $("#btn-cancelarDiffieHellman").hide();

    if(!cancelado){
        $('#DHdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_38);
        cancelado = true;
    }
}

function validarEntradaLlaveADiffieHellman(){
	var mensaje = "";
	var llave = $('#in-llaveADiffieHellman').val();
	var p = $('#in-moduloDiffieHellman').val();

	if(p.match(/^[0-9]+$/)){
		if(!llave.match(/^[0-9]+$/) || bigInt(llave).compare(1) == -1 || bigInt(llave).compare(bigInt(p).minus(1))  == 1){
			mensaje = mensaje_41;
		}
	}

	return mensaje;
}

function validarEntradaLlaveBDiffieHellman(){
	var mensaje = "";
	var llave = $('#in-llaveBDiffieHellman').val();
	var p = $('#in-moduloDiffieHellman').val();

	if(p.match(/^[0-9]+$/)){
		if(!llave.match(/^[0-9]+$/) || bigInt(llave).compare(1) == -1 || bigInt(llave).compare(bigInt(p).minus(1))  == 1){
			mensaje = mensaje_42;
		}
	}

	return mensaje;
}

function validarEntradaRaizDiffieHellman(){
	var mensaje = "";
	var generador = $('#in-generadoDiffieHellman').val();
	var p = $('#in-moduloDiffieHellman').val();

	if(p.match(/^[0-9]+$/)){
		if(!generador.match(/^[0-9]+$/) || bigInt(generador).compare(1) == -1 || bigInt(generador).compare(bigInt(p).minus(1))  == 1){
			mensaje = mensaje_40;
		}
	}

	return mensaje;
}

function validarEntradaModuloDiffieHellman(){
	var mensaje = "";
	var modulo = $('#in-moduloDiffieHellman').val();

	if(!modulo.match(/^[0-9]+$/) || bigInt(modulo).isPrime() == false || bigInt(modulo).compare(29) == -1 || bigInt(modulo).compare(997) == 1){
		mensaje = mensaje_39;
	}

	return mensaje;
}

function addErrorDiffieHellman(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorDiffieHellman(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoDiffieHellman1").click(function(){
        $("#btn-comenzarDiffieHellman").html('Rápido');
        $("#btn-comenzarDiffieHellman").val(1);
    });
    $("#tipoDiffieHellman2").click(function(){
        $("#btn-comenzarDiffieHellman").html('Normal');
        $("#btn-comenzarDiffieHellman").val(2);
    });
    $("#tipoDiffieHellman3").click(function(){
        $("#btn-comenzarDiffieHellman").html('Lento&nbsp;');
        $("#btn-comenzarDiffieHellman").val(3);
    });

    $("#in-llaveADiffieHellman").on('click change keyup', function() {
        var mensaje = validarEntradaLlaveADiffieHellman();

        if($("#in-llaveADiffieHellman").val().length == 0){
        	deleteErrorDiffieHellman("llaveADiffieHellman");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorDiffieHellman("llaveADiffieHellman", mensaje);
	        } else{
	            deleteErrorDiffieHellman("llaveADiffieHellman");
	        }
	    }
    });

    $("#in-moduloDiffieHellman").on('click change keyup', function() {
        var mensaje = validarEntradaModuloDiffieHellman();

        if($("#in-moduloDiffieHellman").val().length == 0){
        	deleteErrorDiffieHellman("moduloDiffieHellman");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorDiffieHellman("moduloDiffieHellman", mensaje);
	        } else{
	            deleteErrorDiffieHellman("moduloDiffieHellman");

	            if(validarEntradaLlaveADiffieHellman().length == 0)
	            	deleteErrorDiffieHellman("llaveADiffieHellman");
	            else
	            	addErrorDiffieHellman("llaveADiffieHellman", validarEntradaLlaveADiffieHellman());

	            if(validarEntradaRaizDiffieHellman().length == 0)
	            	deleteErrorDiffieHellman("generadoDiffieHellman");
	            else
	            	addErrorDiffieHellman("generadoDiffieHellman", validarEntradaRaizDiffieHellman());

	            if(validarEntradaLlaveBDiffieHellman().length == 0)
	            	deleteErrorDiffieHellman("llaveBDiffieHellman");
	            else
	            	addErrorDiffieHellman("llaveBDiffieHellman", validarEntradaLlaveBDiffieHellman());
	        }
	    }
    });

    $("#in-generadoDiffieHellman").on('click change keyup', function() {
        var mensaje = validarEntradaRaizDiffieHellman();

        if($("#in-generadoDiffieHellman").val().length == 0){
        	deleteErrorDiffieHellman("generadoDiffieHellman");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorDiffieHellman("generadoDiffieHellman", mensaje);
	        } else{
	            deleteErrorDiffieHellman("generadoDiffieHellman");
	        }
	    }
    });

    $("#in-llaveBDiffieHellman").on('click change keyup', function() {
        var mensaje = validarEntradaLlaveBDiffieHellman();

        if($("#in-llaveBDiffieHellman").val().length == 0){
        	deleteErrorDiffieHellman("llaveBDiffieHellman");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorDiffieHellman("llaveBDiffieHellman", mensaje);
	        } else{
	            deleteErrorDiffieHellman("llaveBDiffieHellman");
	        }
	    }
    });

	$("#btn-comenzarDiffieHellman").click(function(){
		var mensajellaveA = validarEntradaLlaveADiffieHellman();
		var mensajemodulo = validarEntradaModuloDiffieHellman();
		var mensajeraiz = validarEntradaRaizDiffieHellman();
		var mensajellaveB = validarEntradaLlaveBDiffieHellman();

		if(mensajellaveA.length == 0 && mensajemodulo.length == 0 && mensajeraiz.length == 0 && mensajellaveB.length == 0){console.log("shi");
			$("#llaveADiffieHellman-error").remove();
            $("#moduloDiffieHellman-error").remove();
            $("#generadoDiffieHellman-error").remove();
            $("#llaveBDiffieHellman-error").remove();
            $("#in-llaveADiffieHellman").removeClass('input-error');
            $("#in-moduloDiffieHellman").removeClass('input-error');
            $("#in-generadoDiffieHellman").removeClass('input-error');
            $("#in-llaveBDiffieHellman").removeClass('input-error');

            if($('#btn-comenzarDiffieHellman').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarDiffieHellman').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDiffieHellman").hide();
            $("#btn-comenzarDiffieHellman").hide();
            $("#btn-cancelarDiffieHellman").show();
            cancelado = false;
            
            comenzarDiffieHellman();
		}
		else{
			if(mensajellaveA.length > 0){
				addErrorDiffieHellman("llaveADiffieHellman", mensajellaveA);
			}
			if(mensajemodulo.length > 0){
				addErrorDiffieHellman("moduloDiffieHellman", mensajemodulo);
			}
			if(mensajeraiz.length > 0){
				addErrorDiffieHellman("generadoDiffieHellman", mensajeraiz);
			}
			if(mensajellaveB.length > 0){
				addErrorDiffieHellman("llaveBDiffieHellman", mensajellaveB);
			}
		}
	});

	$("#btn-cancelarDiffieHellman").click(function(){
        cancelado = true;

        limpiaPanelDiffieHellman();

        $("#btn-comenzarDiffieHellman").show();
        $("#btn-velocidadDiffieHellman").show();
        $("#btn-cancelarDiffieHellman").hide();
    });

    $("#generarKADiffieHellman").click(function(){
		generarKADiffieHellman();
	});

	$("#generarKDiffieHellman").click(function(){
		generarKDiffieHellman();
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

function generarKADiffieHellman(evt) {
	var fileDisplayArea = $('#fileDisplayAreaDiffieHellmanKA');
	var exponente = bigInt($("#eDiffieHellmanKA").val());
	var generador = bigInt($("#gDiffieHellmanKA").val());
	var modulo = bigInt($("#pDiffieHellmanKA").val());
	var kA = bigInt(0);
	$("#progressbarDiffieHellmanKA").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	kA = binaripowMod(generador, exponente, modulo);

	fileDisplayArea.html(kA);
	$("#progressbarDiffieHellmanKA").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
}

function generarKDiffieHellman(evt) {
	var fileDisplayArea = $('#fileDisplayAreaDiffieHellmanK');
	var exponente = bigInt($("#eDiffieHellmanK").val());
	var kB = bigInt($("#kBDiffieHellmanK").val());
	var modulo = bigInt($("#pDiffieHellmanK").val());
	var k = bigInt(0);
	$("#progressbarDiffieHellmanK").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	k = binaripowMod(kB, exponente, modulo);

	fileDisplayArea.html(k);
	$("#progressbarDiffieHellmanK").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
}