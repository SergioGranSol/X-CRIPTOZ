function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

function mostrarPanelDSA(){
	$("#pnl-InteractivoDSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelDSA(){
	$("#pnl-InteractivoDSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelDSA();
}

function limpiaPanelDSA(){
	tCAdd=600;
	tCRemove=200;
	tDcAdd=600;
	tDcRemove=200;
	parpadeo='parpadeo2N';
	parpadeoNext='parpadeoNext2N';
	$("#btn-cifrarDSA").html('Cifrado Normal');
	$("#btn-descifrarDSA").html('Descifrado Normal');
	$("#textoPlanoDSAC").empty();
	$("#textoCifradoDSAC").empty();
	$("#textoPlanoDSAD").empty();
	$("#textoCifradoDSAD").empty();
	$("#palabraDSAC").empty();
	$("#palabraDSAD").empty();
	$("#palabraCifradaDSAC").empty();
	$("#palabraDescifradaDSAD").empty();
	$("#in-txtPlanoDSA").val("");
	$("#out-txtCifradoDSA").val("");
	$("#in-txtCifradoDSA").val("");
	$("#out-txtPlanoDSA").val("");
	$("#infoAnimacionCiDSA").hide();
	$("#infoAnimacionDeDSA").hide();
	$("#txtPlanoDSA-error").remove();
	$("#in-txtPlanoDSA").parent().parent().removeClass('has-error has-feedback');
	$("#txtCifradoDSA-error").remove();
	$("#in-txtCifradoDSA").parent().parent().removeClass('has-error has-feedback');
	$("#btn-cifrarDSA").show();
	$("#btn-tipoCiDSA").show();
	$("#btn-cancelarCifrarDSA").hide();
	$("#btn-descifrarDSA").show();
	$("#btn-tipoDeDSA").show();
	$("#btn-cancelarDescifrarDSA").hide();
}

function pararAnimacionDSA(){
	ic=999;
	idc=999;
    $("#btn-copiarTextoDSA").removeAttr("disabled");
    $("#textoPlanoDSAC").empty();
	$("#textoCifradoDSAC").empty();
	$("#textoPlanoDSAD").empty();
	$("#textoCifradoDSAD").empty();
    $("#palabraDSAC").empty();
	$("#palabraDSAD").empty();
	$("#palabraCifradaDSAC").empty();
	$("#palabraDescifradaDSAD").empty();
	$("#infoAnimacionCiDSA").hide();
	$("#infoAnimacionDeDSA").hide();
	$("#txtPlanoDSA-error").remove();
	$("#in-txtPlanoDSA").parent().parent().removeClass('has-error has-feedback');
	$("#txtCifradoDSA-error").remove();
	$("#in-txtCifradoDSA").parent().parent().removeClass('has-error has-feedback');
	$("#btn-cifrarDSA").show();
	$("#btn-tipoCiDSA").show();
	$("#btn-cancelarCifrarDSA").hide();
	$("#btn-descifrarDSA").show();
	$("#btn-tipoDeDSA").show();
	$("#btn-cancelarDescifrarDSA").hide();
}

// test
// p = 37037037033333333333332962962964
// q = 1111111111
// h =
// x = 

function validarEntradaCifradoDSA(){
	var mensaje = "";
	var texto = $('#in-txtPlanoDSA').val();
	if (texto.length < 1 || texto.length > 20) {
		mensaje = "El mensaje claro debe contener entre 1 y 20 caracteres.";
	}
	return mensaje;
}

function validarKeyPCifradoDSA(){
	var mensaje = "";
	var clave = $('#in-keyP-DSAC').val();
	if(!clave.match(/^[0-9]+$/)){
        mensaje = "La llave debe ser un numero entero.";
    } else{
    	if ((clave.length * 2 * 8) < 512 || (clave.length * 2 * 8) > 1024) {
			mensaje = "Elige un número primo p de L bits, donde 512 ≤ L ≤ 1024 (de 32 a 64 caracteres) y L es divisible por 64.<br>La longitud de esta llave es de "+(clave.length * 2 * 8);
		}
		if ((clave.length * 2 * 8) >= 512 && (clave.length * 2 * 8) <= 1024 && (clave.length * 2 * 8) % 64 != 0){
			mensaje = "Elige un número primo p de L bits, donde 512 ≤ L ≤ 1024 (de 32 a 64 caracteres) y L es divisible por 64.<br>La longitud de esta llave es de "+(clave.length * 2 * 8)+" pero no es divisible por 64.";
		}
    }	
	return mensaje;
}

function validarKeyQCifradoDSA(){
	var mensaje = "";
	var clave = $('#in-keyQ-DSAC').val();
	var p = new BigNumber($('#in-keyP-DSAC').val());
	if(!clave.match(/^[0-9]+$/)){
        mensaje = "La llave debe ser un numero entero.";
    } else{
    	if ((clave.length * 2 * 8) != 160) {
			mensaje = "Elige un número primo q de 160 bits (10 caracteres)";
		}
		var z = p.minus(1).dividedBy(clave);
		if ((clave.length * 2 * 8) == 160 && !is_Natural(z)){
			mensaje = "El número q debe cumplir con p−1 = qz, donde z es algún número natural<br>(p-1)/q = "+z+" no es un número natural";
		}		
    }
	return mensaje;
}

function validarKeyHCifradoDSA(){
	var mensaje = "";
	var clave = $('#in-keyH-DSAC').val();
	var p = new BigNumber($('#in-keyP-DSAC').val());
	var q = new BigNumber($('#in-keyQ-DSAC').val());
	if(!clave.match(/^[0-9]+$/)){
        mensaje = "La llave debe ser un numero entero.";
    } else{
    	var h = new BigNumber(clave);
    	if (h.lte(1) || h.gte(p.minus(1))) {
			mensaje = "Elige el número h tal que 1 < h < p − 1";
		}
		if (h.gt(1) && h.lt(p.minus(1))) {
			var z = p.minus(1).dividedBy(q);
			var g = h.pow(z).mod(p);
			if ( g < 1 )
				mensaje = "El número h debe cumplir con g = h<sup>z</sup>(mod p) > 1<br>g = h<sup>z</sup>(mod p) = "+g+" es menor a 1";
		}		
    }
	return mensaje;
}

function is_Natural(n) {
	var number = new BigNumber(n);
	return number.gte(0.0) && number.equals(number.floor()) && number.isFinite();
}

function validarEntradaDescifradoDSA(){
	var mensaje = "";
	var texto = $('#in-txtCifradoDSA').val();
	if (texto.length < 1 || texto.length > 20) {
		mensaje = "El criptograma debe contener entre 1 y 20 caracteres.";
	}
	return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelDSA").click(function(){
		mostrarPanelDSA();
	});
	$("#btn-cerrarPanelDSA").click(function(){
		pararAnimacionDSA();
		cerrarPanelDSA();
	});
	$("#btn-teoriaDSA").click(function(){
		pararAnimacionDSA();
	});
	$("#btn-fundamentosDSA").click(function(){
		pararAnimacionDSA();
	});
	$("#btn-animacionCifradoDSA").click(function(){
		pararAnimacionDSA();
	});
	$("#btn-animacionDesifradoDSA").click(function(){
		pararAnimacionDSA();
	});
	$("#btn-cancelarCifrarDSA").click(function(){
		pararAnimacionDSA();
	});
	$("#btn-cancelarDescifrarDSA").click(function(){
		pararAnimacionDSA();
	});
	$("#tipoCiDSA1").click(function(){
		$("#btn-cifrarDSA").html('Cifrado Rápido');
		tCAdd=200;
		tCRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoCiDSA2").click(function(){
		$("#btn-cifrarDSA").html('Cifrado Normal');
		tCAdd=600;
		tCRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoCiDSA3").click(function(){
		$("#btn-cifrarDSA").html('Cifrado Lento');
		tCAdd=1600;
		tCRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});
	$("#tipoDeDSA1").click(function(){
		$("#btn-descifrarDSA").html('Descifrado Rápido');
		tDcAdd=200;
		tDcRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoDeDSA2").click(function(){
		$("#btn-descifrarDSA").html('Descifrado Normal');
		tDcAdd=600;
		tDcRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoDeDSA3").click(function(){
		$("#btn-descifrarDSA").html('Descifrado Lento');
		tDcAdd=1600;
		tDcRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});

	$("#in-txtPlanoDSA").keyup(function(){
		$("#in-txtPlanoDSA").parent().parent().removeClass('has-error has-feedback');
		$("#txtPlanoDSA-error").remove();
		if ($("#in-txtPlanoDSA").val()=='') {
			$("#in-txtPlanoDSA").parent().parent().removeClass('has-error has-feedback');
			$("#txtPlanoDSA-error").remove();
		} else{
			var mensaje = validarEntradaCifradoDSA();
			if (mensaje.length == 0){
				$("#in-txtPlanoDSA").parent().parent().removeClass('has-error has-feedback');
				$("#txtPlanoDSA-error").remove();
			} else {
				$("#in-txtPlanoDSA").parent().parent().addClass('has-error has-feedback');
				$("#in-txtPlanoDSA").parent().parent().append('<div id="txtPlanoDSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-keyP-DSAC").keyup(function(){
		$("#in-keyP-DSAC").parent().parent().removeClass('has-error has-feedback');
		$("#keyP-DSAC-error").remove();
		if ($("#in-keyP-DSAC").val()=='') {
			$("#in-keyP-DSAC").parent().parent().removeClass('has-error has-feedback');
			$("#keyP-DSAC-error").remove();
		} else{
			var mensaje = validarKeyPCifradoDSA();
			if (mensaje.length == 0){
				$("#in-keyP-DSAC").parent().parent().removeClass('has-error has-feedback');
				$("#keyP-DSAC-error").remove();
			} else {
				$("#in-keyP-DSAC").parent().parent().addClass('has-error has-feedback');
				$("#in-keyP-DSAC").parent().parent().append('<div id="keyP-DSAC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-keyQ-DSAC").keyup(function(){
		$("#in-keyQ-DSAC").parent().parent().removeClass('has-error has-feedback');
		$("#keyQ-DSAC-error").remove();
		if ($("#in-keyQ-DSAC").val()=='') {
			$("#in-keyQ-DSAC").parent().parent().removeClass('has-error has-feedback');
			$("#keyQ-DSAC-error").remove();
		} else{
			var mensaje = validarKeyQCifradoDSA();
			if (mensaje.length == 0){
				$("#in-keyQ-DSAC").parent().parent().removeClass('has-error has-feedback');
				$("#keyQ-DSAC-error").remove();
			} else {
				$("#in-keyQ-DSAC").parent().parent().addClass('has-error has-feedback');
				$("#in-keyQ-DSAC").parent().parent().append('<div id="keyQ-DSAC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-keyH-DSAC").keyup(function(){
		$("#in-keyH-DSAC").parent().parent().removeClass('has-error has-feedback');
		$("#keyH-DSAC-error").remove();
		if ($("#in-keyH-DSAC").val()=='') {
			$("#in-keyH-DSAC").parent().parent().removeClass('has-error has-feedback');
			$("#keyH-DSAC-error").remove();
		} else{
			var mensaje = validarKeyHCifradoDSA();
			if (mensaje.length == 0){
				$("#in-keyH-DSAC").parent().parent().removeClass('has-error has-feedback');
				$("#keyH-DSAC-error").remove();
			} else {
				$("#in-keyH-DSAC").parent().parent().addClass('has-error has-feedback');
				$("#in-keyH-DSAC").parent().parent().append('<div id="keyH-DSAC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtCifradoDSA").keyup(function(){
		$("#in-txtCifradoDSA").parent().parent().removeClass('has-error has-feedback');
		$("#txtCifradoDSA-error").remove();
		if ($("#in-txtCifradoDSA").val()=='') {
			$("#in-txtCifradoDSA").parent().parent().removeClass('has-error has-feedback');
			$("#txtCifradoDSA-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoDSA();
			if (mensaje.length == 0){
				$("#in-txtCifradoDSA").parent().parent().removeClass('has-error has-feedback');
				$("#txtCifradoDSA-error").remove();
			} else {
				$("#in-txtCifradoDSA").parent().parent().addClass('has-error has-feedback');
				$("#in-txtCifradoDSA").parent().parent().append('<div id="txtCifradoDSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#btn-cifrarDSA").click(function(){
		$("#in-txtPlanoDSA").parent().parent().removeClass('has-error has-feedback');
		$("#txtPlanoDSA-error").remove();
		$("#out-txtCifradoDSA").val("");
		var mensaje = validarEntradaCifradoDSA();
		if ($("#in-txtPlanoDSA").val()!='' && mensaje.length == 0){
			$("#palabraDSAC").empty();
			$("#palabraCifradaDSAC").empty();
			$("#infoAnimacionCiDSA").hide();
			$("#infoCiDSA").html('');
			$("#btn-cifrarDSA").hide();
			$("#btn-tipoCiDSA").hide();
			$("#btn-cancelarCifrarDSA").show();
			$("#textoPlanoDSAC").empty();
			$("#textoCifradoDSAC").empty();
			cifrarDSA();
		} else{
			$("#in-txtPlanoDSA").parent().parent().addClass('has-error has-feedback');
			$("#in-txtPlanoDSA").parent().parent().append('<div id="txtPlanoDSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});

	$("#btn-copiarTextoDSA").click(function(){
		if ($("#out-txtCifradoDSA").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info']('Primero debes cifrar un mensaje');
		} else {
			$("#in-txtCifradoDSA").val($("#out-txtCifradoDSA").val());
		}
	});

	$("#btn-descifrarDSA").click(function(){
		$("#in-txtCifradoDSA").parent().parent().removeClass('has-error has-feedback');
		$("#txtCifradoDSA-error").remove();
		$("#out-txtPlanoDSA").val("");
		var mensaje = validarEntradaDescifradoDSA();
		if ($("#in-txtCifradoDSA").val()!='' && mensaje.length == 0){
			$("#btn-copiarTextoDSA").attr("disabled","disabled");
			$("#palabraDSAD").empty();
			$("#palabraDescifradaDSAD").empty();
			$("#infoAnimacionDeDSA").hide();
			$("#infoDeDSA").html('');
			$("#btn-descifrarDSA").hide();
			$("#btn-tipoDeDSA").hide();
			$("#btn-cancelarDescifrarDSA").show();
			$("#textoPlanoDSAD").empty();
			$("#textoCifradoDSAD").empty();
			descifrarDSA();
		} else{
			$("#in-txtCifradoDSA").parent().parent().addClass('has-error has-feedback');
			$("#in-txtCifradoDSA").parent().parent().append('<div id="txtCifradoDSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});
	    
});

async function cifrarDSA(){
    
}

async function descifrarDSA(){
	
}