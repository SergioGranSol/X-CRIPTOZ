function sleepFirmaRSA(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

function mostrarPanelfRSA(){
	$("#pnl-InteractivofRSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelfRSA(){
	$("#pnl-InteractivofRSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelfRSA();

	$("#in-txtLlaveEfRSA").val("");
	$("#in-txtLlaveNfRSA").val("");
	$("#in-txtCifradoMfRSA").val("");
	$("#in-txtCifradoFfRSA").val("");
}

function limpiaPanelfRSA(){
	tCAdd=600;
	tCRemove=200;
	tDcAdd=600;
	tDcRemove=200;
	parpadeo='parpadeo2N';
	parpadeoNext='parpadeoNext2N';
	$("#btn-cifrarfRSA").html('Firma Normal');
	$("#btn-descifrarfRSA").html('Verificación Normal');
	$("#textoPlanofRSAC").empty();
	$("#textoCifradofRSAC").empty();
	$("#textoPlanofRSAD").empty();
	$("#textoCifradofRSAD").empty();
	$("#palabrafRSAC").empty();
	$("#palabrafRSAD").empty();
	$("#palabraCifradafRSAC").empty();
	$("#palabraDescifradafRSAD").empty();
	$("#in-txtPlanofRSA").val("");
	$("#out-txtCifradofRSA").val("");
	$("#in-txtCifradofRSA").val("");
	$("#out-txtPlanofRSA").val("");
	$("#infoAnimacionCifRSA").hide().empty();
	$("#infoAnimacionDefRSA").hide().empty();
	$("#txtPlanofRSA-error").remove();
	$("#in-txtPlanofRSA").removeClass('input-error');
	$("#in-txtCifradoFfRSA").removeClass('input-error');
	$("#txtCifradoFfRSA-error").remove();
	$("#in-txtCifradoMfRSA").removeClass('input-error');
	$("#txtCifradoMfRSA-error").remove();
	$("#in-txtLlaveEfRSA").removeClass('input-error');
	$("#txtLlaveEfRSA-error").remove();
	$("#in-txtLlaveNfRSA").removeClass('input-error');
	$("#txtLlaveNfRSA-error").remove();
	$("#btn-cifrarfRSA").show();
	$("#btn-tipoCifRSA").show();
	$("#btn-cancelarCifrarfRSA").hide();
	$("#btn-descifrarfRSA").show();
	$("#btn-tipoDefRSA").show();
	$("#btn-cancelarDescifrarfRSA").hide();
}

function pararAnimacionfRSA(){
	ic=999;
	idc=999;
	$("#in-txtPlanofRSA").val("");
	$("#in-txtCifradofRSA").val("");
	$("#in-txtLlaveEfRSA").val("");
	$("#in-txtLlaveNfRSA").val("");
	$("#in-txtCifradoMfRSA").val("");
	$("#in-txtCifradoFfRSA").val("");
    $("#btn-copiarTextofRSA").removeAttr("disabled");
    $("#textoPlanofRSAC").empty();
	$("#textoCifradofRSAC").empty();
	$("#textoPlanofRSAD").empty();
	$("#textoCifradofRSAD").empty();
    $("#palabrafRSAC").empty();
	$("#palabrafRSAD").empty();
	$("#palabraCifradafRSAC").empty();
	$("#palabraDescifradafRSAD").empty();
	$("#infoAnimacionCifRSA").hide().empty();
	$("#infoAnimacionDefRSA").hide().empty();
	$("#txtPlanofRSA-error").remove();
	$("#in-txtPlanofRSA").removeClass('input-error');
	$("#in-txtCifradoFfRSA").removeClass('input-error');
	$("#txtCifradoFfRSA-error").remove();
	$("#in-txtCifradoMfRSA").removeClass('input-error');
	$("#txtCifradoMfRSA-error").remove();
	$("#in-txtLlaveEfRSA").removeClass('input-error');
	$("#txtLlaveEfRSA-error").remove();
	$("#in-txtLlaveNfRSA").removeClass('input-error');
	$("#txtLlaveNfRSA-error").remove();
	$("#btn-cifrarfRSA").show();
	$("#btn-tipoCifRSA").show();
	$("#btn-cancelarCifrarfRSA").hide();
	$("#btn-descifrarfRSA").show();
	$("#btn-tipoDefRSA").show();
	$("#btn-cancelarDescifrarfRSA").hide();
}

function validarEntradaCifradofRSA(){
	var mensaje = "";
	var texto = $('#in-txtPlanofRSA').val();
	if (texto.length < 1 || texto.length > 12) {
		mensaje = mensaje_58;
	}
	return mensaje;
}

function validarEntradaDescifradoYfRSA(){
	var mensaje = "";
	var texto = $('#in-txtCifradoFfRSA').val().toLowerCase();
	if(!texto.match(/^[a-fA-F0-9]+$/)){
		mensaje = mensaje_59;
	}
	else if (texto.length != 32)
	{
		mensaje = mensaje_60;
	}
	return mensaje;
}
function validarEntradaDescifradoMfRSA(){
	var mensaje = "";
	var texto = $('#in-txtCifradoMfRSA').val();
	if (texto.length < 1 || texto.length > 12) {
		mensaje = mensaje_58;
	}
	return mensaje;
}
function validarEntradaDescifradoEfRSA(){
	var mensaje = "";
	var texto = $('#in-txtLlaveEfRSA').val();
	if (!isPrime(texto) || !texto.match(/^[0-9]+$/) || texto == 0 || texto == 1) {
		mensaje = mensaje_61;
	} else if (Number(texto)>100){
		mensaje = mensaje_153;
	}
	return mensaje;
}
function isPrime(num) {
	for(var i = 2; i < num; i++)
		if(num % i === 0) return false;
	return num !== 1;
}
function validarEntradaDescifradoNfRSA(){
	var mensaje = "";
	var texto = $('#in-txtLlaveNfRSA').val().toLowerCase();
	if(!texto.match(/^[a-fA-F0-9]+$/)){
		mensaje = mensaje_62;
	}
	else if (texto.length != 32)
	{
		mensaje = mensaje_63;
	}
	return mensaje;
}

function validarEntradaVerificarArchivoRSALlaveN(){
	var mensaje = "";
	var texto = $('#llavePublicaNFirmaRSA').val().toLowerCase();

	if(!texto.match(/^[a-fA-F0-9]+$/)){
		mensaje = mensaje_62;
	}
	else if (texto.length != 256)
	{
		mensaje = mensaje_120;
	}
	return mensaje;
}

function validarEntradaVerificarArchivoRSALlaveE(){
    var mensaje = "";
	var texto = $('#llavePublicaEFirmaRSA').val();
	if (!isPrime(texto) || !texto.match(/^[0-9]+$/) || texto == 0 || texto == 1) {
		mensaje = mensaje_61;
	} else if (Number(texto)>100){
		mensaje = mensaje_153;
	}
	return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelfRSA").click(function(){
		mostrarPanelfRSA();
	});
	$("#btn-cerrarPanelfRSA").click(function(){
		pararAnimacionfRSA();
		cerrarPanelfRSA();
	});
	$("#btn-teoriafRSA").click(function(){
		pararAnimacionfRSA();
	});
	$("#btn-fundamentosfRSA").click(function(){
		pararAnimacionfRSA();
	});
	$("#btn-animacionCifradofRSA").click(function(){
		//pararAnimacionfRSA();
	});
	$("#btn-animacionDesifradofRSA").click(function(){
		//pararAnimacionfRSA();
	});
	$("#btn-cancelarCifrarfRSA").click(function(){
		pararAnimacionfRSA();
	});
	$("#btn-cancelarDescifrarfRSA").click(function(){
		pararAnimacionfRSA();
	});
	$("#tipoCifRSA1").click(function(){
		$("#btn-cifrarfRSA").html('Firma Rápida');
		tCAdd=200;
		tCRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoCifRSA2").click(function(){
		$("#btn-cifrarfRSA").html('Firma Normal');
		tCAdd=600;
		tCRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoCifRSA3").click(function(){
		$("#btn-cifrarfRSA").html('Firma Lenta');
		tCAdd=1600;
		tCRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});
	$("#tipoDefRSA1").click(function(){
		$("#btn-descifrarfRSA").html('Verificación Rápida');
		tDcAdd=200;
		tDcRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoDefRSA2").click(function(){
		$("#btn-descifrarfRSA").html('Verificación Normal');
		tDcAdd=600;
		tDcRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoDefRSA3").click(function(){
		$("#btn-descifrarfRSA").html('Verificación Lenta');
		tDcAdd=1600;
		tDcRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});

	$("#in-txtPlanofRSA").keyup(function(){
		$("#in-txtPlanofRSA").removeClass('input-error');
		$("#txtPlanofRSA-error").remove();
		if ($("#in-txtPlanofRSA").val()=='') {
			$("#in-txtPlanofRSA").removeClass('input-error');
			$("#txtPlanofRSA-error").remove();
		} else{
			var mensaje = validarEntradaCifradofRSA();
			if (mensaje.length == 0){
				$("#in-txtPlanofRSA").removeClass('input-error');
				$("#txtPlanofRSA-error").remove();
			} else {
				$("#in-txtPlanofRSA").addClass('input-error');
				$("#in-txtPlanofRSA").parent().parent().append('<div id="txtPlanofRSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtCifradoFfRSA").keyup(function(){
		$("#in-txtCifradoFfRSA").removeClass('input-error');
		$("#txtCifradoFfRSA-error").remove();
		if ($("#in-txtCifradoFfRSA").val()=='') {
			$("#in-txtCifradoFfRSA").removeClass('input-error');
			$("#txtCifradoFfRSA-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoYfRSA();
			if (mensaje.length == 0){
				$("#in-txtCifradoFfRSA").removeClass('input-error');
				$("#txtCifradoFfRSA-error").remove();
			} else {
				$("#in-txtCifradoFfRSA").addClass('input-error');
				$("#in-txtCifradoFfRSA").parent().parent().append('<div id="txtCifradoFfRSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtCifradoMfRSA").keyup(function(){
		$("#in-txtCifradoMfRSA").removeClass('input-error');
		$("#txtCifradoMfRSA-error").remove();
		if ($("#in-txtCifradoMfRSA").val()=='') {
			$("#in-txtCifradoMfRSA").removeClass('input-error');
			$("#txtCifradoMfRSA-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoMfRSA();
			if (mensaje.length == 0){
				$("#in-txtCifradoMfRSA").removeClass('input-error');
				$("#txtCifradoMfRSA-error").remove();
			} else {
				$("#in-txtCifradoMfRSA").addClass('input-error');
				$("#in-txtCifradoMfRSA").parent().append('<div id="txtCifradoMfRSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtLlaveEfRSA").on('click change keyup', function() {
		$("#in-txtLlaveEfRSA").removeClass('input-error');
		$("#txtLlaveEfRSA-error").remove();
		if ($("#in-txtLlaveEfRSA").val()=='') {
			$("#in-txtLlaveEfRSA").removeClass('input-error');
			$("#txtLlaveEfRSA-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoEfRSA();
			if (mensaje.length == 0){
				$("#in-txtLlaveEfRSA").removeClass('input-error');
				$("#txtLlaveEfRSA-error").remove();
			} else {
				$("#in-txtLlaveEfRSA").addClass('input-error');
				$("#in-txtLlaveEfRSA").parent().parent().append('<div id="txtLlaveEfRSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtLlaveNfRSA").keyup(function(){
		$("#in-txtLlaveNfRSA").removeClass('input-error');
		$("#txtLlaveNfRSA-error").remove();
		if ($("#in-txtLlaveNfRSA").val()=='') {
			$("#in-txtLlaveNfRSA").removeClass('input-error');
			$("#txtLlaveNfRSA-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoNfRSA();
			if (mensaje.length == 0){
				$("#in-txtLlaveNfRSA").removeClass('input-error');
				$("#txtLlaveNfRSA-error").remove();
			} else {
				$("#in-txtLlaveNfRSA").addClass('input-error');
				$("#in-txtLlaveNfRSA").parent().append('<div id="txtLlaveNfRSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#btn-cifrarfRSA").click(function(){
		$("#in-txtPlanofRSA").removeClass('input-error');
		$("#txtPlanofRSA-error").remove();
		$("#out-txtCifradofRSA").val("");
		var mensaje = validarEntradaCifradofRSA();
		if ($("#in-txtPlanofRSA").val()!='' && mensaje.length == 0){
			$("#palabrafRSAC").empty();
			$("#palabraCifradafRSAC").empty();
			$("#infoAnimacionCifRSA").hide().empty();
			$("#infoCifRSA").html('');
			$("#btn-cifrarfRSA").hide();
			$("#btn-tipoCifRSA").hide();
			$("#btn-cancelarCifrarfRSA").show();
			$("#textoPlanofRSAC").empty();
			$("#textoCifradofRSAC").empty();
			$("#out-txtLlaveEfRSA").val('');
			$("#out-txtLlaveNfRSA").val('');
			$("#out-txtCifradoMfRSA").val('');
			$("#out-txtCifradoFfRSA").val('');
			cifrarfRSA();
		} else{
			$("#in-txtPlanofRSA").addClass('input-error');
			$("#in-txtPlanofRSA").parent().parent().append('<div id="txtPlanofRSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});

	$("#btn-copiarTextofRSA").click(function(){
		if ($("#out-txtCifradoFfRSA").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_64);
		} else {
			$("#in-txtCifradoFfRSA").val($("#out-txtCifradoFfRSA").val());
			$("#in-txtCifradoMfRSA").val($("#out-txtCifradoMfRSA").val());
			$("#in-txtLlaveNfRSA").val($("#out-txtLlaveNfRSA").val());
			$("#in-txtLlaveEfRSA").val($("#out-txtLlaveEfRSA").val());
		}
	});

	$("#btn-descifrarfRSA").click(function(){
		$("#in-txtCifradoFfRSA").removeClass('input-error');
		$("#txtCifradoFfRSA-error").remove();
		$("#in-txtCifradoMfRSA").removeClass('input-error');
		$("#txtCifradoMfRSA-error").remove();
		$("#in-txtLlaveEfRSA").removeClass('input-error');
		$("#txtLlaveEfRSA-error").remove();
		$("#in-txtLlaveNfRSA").removeClass('input-error');
		$("#txtLlaveNfRSA-error").remove();
		$("#out-txtPlanofRSA").val("");
		var mensajeY = validarEntradaDescifradoYfRSA();
		var mensajeM = validarEntradaDescifradoMfRSA();
		var mensajeE = validarEntradaDescifradoEfRSA();
		var mensajeN = validarEntradaDescifradoNfRSA();
		if ($("#in-txtCifradoFfRSA").val()!='' && $("#in-txtCifradoMfRSA").val()!='' && $("#in-txtLlaveNfRSA").val()!='' && $("#in-txtLlaveEfRSA").val()!='' && mensajeY.length == 0 && mensajeM.length == 0 && mensajeE.length == 0 && mensajeN.length == 0){
			$("#btn-copiarTextofRSA").attr("disabled","disabled");
			$("#palabrafRSAD").empty();
			$("#palabraDescifradafRSAD").empty();
			$("#infoAnimacionDefRSA").hide().empty();
			$("#infoDefRSA").html('');
			$("#btn-descifrarfRSA").hide();
			$("#btn-tipoDefRSA").hide();
			$("#btn-cancelarDescifrarfRSA").show();
			$("#textoPlanofRSAD").empty();
			$("#textoCifradofRSAD").empty();
			$("#out-txtPlanofRSA").val('');
			descifrarfRSA();
		} else {
			if (mensajeY.length != 0){
				$("#in-txtCifradoFfRSA").addClass('input-error');
				$("#in-txtCifradoFfRSA").parent().parent().append('<div id="txtCifradoFfRSA-error" class="text-danger">&nbsp;'+mensajeY+'</div>');
			}
			if (mensajeM.length != 0){
				$("#in-txtCifradoMfRSA").addClass('input-error');
				$("#in-txtCifradoMfRSA").parent().append('<div id="txtCifradoMfRSA-error" class="text-danger">&nbsp;'+mensajeM+'</div>');
			}
			if (mensajeE.length != 0){
				$("#in-txtLlaveEfRSA").addClass('input-error');
				$("#in-txtLlaveEfRSA").parent().parent().append('<div id="txtLlaveEfRSA-error" class="text-danger">&nbsp;'+mensajeE+'</div>');
			}
			if (mensajeN.length != 0){
				$("#in-txtLlaveNfRSA").addClass('input-error');
				$("#in-txtLlaveNfRSA").parent().append('<div id="txtLlaveNfRSA-error" class="text-danger">&nbsp;'+mensajeN+'</div>');
			}
		}
	});

	$("#llavePublicaNFirmaRSA").keyup(function(){
        $("#llavePublicaNFirmaRSA").removeClass('input-error');
		$("#llavePublicaNFirmaRSA-error").remove();
		if ($("#llavePublicaNFirmaRSA").val()=='') {
			$("#llavePublicaNFirmaRSA").removeClass('input-error');
			$("#llavePublicaNFirmaRSA-error").remove();
		} else{
			var error = validarEntradaVerificarArchivoRSALlaveN();
	        $('#llavePublicaNFirmaRSA').removeClass('input-error').next().remove();
	        if (error!=""){
	            $('#llavePublicaNFirmaRSA').addClass('input-error').after('<div id="llavePublicaNFirmaRSA-error" class="text-danger">'+error+'</div>');
	        }
	    }
    });

    $("#llavePublicaEFirmaRSA").keyup(function(){
       	$("#llavePublicaEFirmaRSA").removeClass('input-error');
		$("#llavePublicaEFirmaRSA-error").remove();
		if ($("#llavePublicaEFirmaRSA").val()=='') {
			$("#llavePublicaEFirmaRSA").removeClass('input-error');
			$("#llavePublicaEFirmaRSA-error").remove();
		} else{
			var error = validarEntradaVerificarArchivoRSALlaveE();
	        $('#llavePublicaEFirmaRSA').removeClass('input-error').next().remove();
	        if (error!=""){
	            $('#llavePublicaEFirmaRSA').addClass('input-error').after('<div id="llavePublicaEFirmaRSA-error" class="text-danger">'+error+'</div>');
	        }
	    }
    });
	    
});

async function cifrarfRSA(){
	ic = 0;

	// Llaves******
	// console.log("// Laves******");
	rsaKeys(64);
	// console.log("p = "+rsa_p);
	// console.log("q = "+rsa_q);
	// console.log("d = "+rsa_d);
	// console.log("e = "+rsa_e);
	// console.log("n = pq = "+rsa_pq);
	if (ic==0) {
  		$("#infoAnimacionCifRSA").show().append('<div class="alert alert-info text-center" role="alert"><strong>Para crear la llave se generan dos numero primos largos </strong><i> p </i><strong>, </strong><i> q </i><strong> y calcular </strong><i> n = p * q </i></div>');
  		await sleepFirmaRSA(tCAdd);
  	}
  	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> p </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_p))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<br><label class="circulo"> q </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_q))+' </label> ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<br><label class="circulo"> n </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> p * q </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_p))+' * 0x'+s2hex(b2s(rsa_q))+' </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_pq))+' </label> ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<div class="row">'+
  			'<div id="col1fRSA" class="col-md-6"></div>'+
	  		'<div id="col2fRSA" class="col-md-6"></div></div>');
  		$(window).scrollTop($("#infoAnimacionCifRSA").children().last().offset().top);
  		$("#col1fRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>Se escoge un entero positivo </strong><i> e </i><strong> mayor a 1 y menor que </strong><i> n </i><strong>, que sea coprimo con</strong> <i>n</i></div>');
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").append('<label class="circulo"> e </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col1fRSA").append('<label class="circulo"> '+rsa_e+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#col1fRSA").append('<br><label class="circulo"> 1 </label> < ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col1fRSA").append('<label class="circulo"> '+rsa_e+' </label> < ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col1fRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_pq))+' </label> ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#col1fRSA").append('<br><label class="circulo"> mcd( </label> ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col1fRSA").append('<label class="circulo"> '+rsa_e+' </label> , ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col1fRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_pq))+' </label> ) = 1').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col1fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#col2fRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>Se determina </strong><i> d </i><strong> mediante aritmética modular que satisfaga la congruencia </strong><br><i> e * d &#8801; 1 mod(n) </i><strong>, expresado de otra manera,</strong> <i>d * e - 1</i><strong> es dividido exactamente por </strong><i> n </i></div>');
  		await sleepFirmaRSA(tCAdd);
  		$("#col2fRSA").append('<label class="circulo"> d </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col2fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col2fRSA").append('<label class="circulo"> 0x'+s2hex(b2s(rsa_d))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col2fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#col2fRSA").append('<br><label class="circulo"> e * d </label> = ').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col2fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col2fRSA").append('<label class="circulo"> '+rsa_e+' * 0x'+s2hex(b2s(rsa_d))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col2fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#col2fRSA").append('<br><label class="circulo"> e * d = 0x'+s2hex(b2s(bmul(rsa_e,rsa_d)))+' </label> &#8801; 1 mod(n)').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#col2fRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>La llave publica es </strong><i> (e, n) </i><strong> y la llave privada es </strong><i>(d, p, q)</i></div>');
  		$(window).scrollTop($("#infoAnimacionCifRSA").children().last().offset().top);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> Llave publica: ( '+rsa_e+', 0x'+s2hex(b2s(rsa_pq))+' ) </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<br><label class="circulo"> Llave privada: ( 0x'+s2hex(b2s(rsa_d))+', 0x'+s2hex(b2s(rsa_p))+', 0x'+s2hex(b2s(rsa_q))+' ) </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}

	// Firmar******
	// console.log("// Firmar******");
 	var m = $("#in-txtPlanofRSA").val();
	var mb = s2b(m);
	var firma = RSAencrypt(mb,rsa_d,rsa_pq);
	var y = s2hex(b2s(firma));
	// console.log("m = "+m);
	// console.log("mBits = "+mb);
	// console.log("(mBits,d,n) = yBits = "+firma);
	// console.log("y = "+y);

	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>Para obtener la firma se sustituyen los valores obtenidos previamente en la formula </strong> <i> y &#8801; m <sup>d</sup> mod (n)  </i></div>');
  		$(window).scrollTop($("#infoAnimacionCifRSA").children().last().offset().top);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> m = '+m+' = 0x'+s2hex(b2s((mb)))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<br><label class="circulo"> y = 0x'+s2hex(b2s((mb)))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<sup><label class="circulo"> 0x'+s2hex(b2s(rsa_d))+' </label></sup>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> mod ( 0x'+s2hex(b2s(rsa_pq))+' ) </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<br><label class="circulo"> y = 0x'+y+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
  		$("#infoAnimacionCifRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>El mensaje y la firma </strong><i> (m, y) </i><strong> se hacen públicos así como el conjunto de llave pública </strong><i>(e, n)</i></div>');
  		$(window).scrollTop($("#infoAnimacionCifRSA").children().last().offset().top);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").append('<label class="circulo"> (e, n) = ( '+rsa_e+', 0x'+s2hex(b2s(rsa_pq))+' ) </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  		$("#infoAnimacionCifRSA").append('<br><label class="circulo"> (m, y) = ( 0x'+s2hex(b2s((mb)))+', 0x'+y+' ) </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tCAdd);
  		$("#infoAnimacionCifRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tCRemove);
  	}
  	if (ic==0) {
		$("#out-txtLlaveEfRSA").val(rsa_e);
		$("#out-txtLlaveNfRSA").val(s2hex(b2s(rsa_pq)));
		$("#out-txtCifradoMfRSA").val(m);
		$("#out-txtCifradoFfRSA").val(y);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_65);
        $("#btn-cifrarfRSA").show();
        $("#btn-tipoCifRSA").show();
        $("#btn-cancelarCifrarfRSA").hide();
   }
}

async function descifrarfRSA(){
	idc = 0;
	// Verificar******
	// console.log("// Verificar******");
	var y = $("#in-txtCifradoFfRSA").val().toLowerCase();
	var yb = s2b(hex2s(y));
	var m = $("#in-txtCifradoMfRSA").val();
	var mb = s2b(m);
	rsa_e = [$("#in-txtLlaveEfRSA").val()];
	rsa_pq = s2b(hex2s($("#in-txtLlaveNfRSA").val().toLowerCase()));
	var z = RSAencrypt(yb,rsa_e,rsa_pq);
	// console.log("y = "+y);
	// console.log("yBits = "+yb);
	// console.log("m = "+m);
	// console.log("mBits = "+mb);
	// console.log("(yBits,e,n) = zBits = "+z);
	// console.log("z = "+b2s(z));

	if (idc==0) {
  		$("#infoAnimacionDefRSA").show().append('<div class="alert alert-info text-center" role="alert"><strong>Para verificar la firma se sustituyen los valores de la llave publica, la firma y el mensaje en la formula </strong> <i> z &#8801; y <sup>e</sup> mod (n)  </i></div>');
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").append('<label class="circulo"> z = 0x'+s2hex(b2s((yb)))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tDcRemove);
  		$("#infoAnimacionDefRSA").append('<sup><label class="circulo"> '+rsa_e+' </label></sup>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tDcRemove);
  		$("#infoAnimacionDefRSA").append('<label class="circulo"> mod ( 0x'+s2hex(b2s(rsa_pq))+' ) </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tDcRemove);
  		$("#infoAnimacionDefRSA").append('<br><label class="circulo"> z = 0x'+s2hex(b2s(z))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tDcRemove);
  	}
  	if (idc==0) {
  		$("#infoAnimacionDefRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>Para decir que la firma es valida </strong><i> z &nbsp;</i><strong> y </strong><i> m </i><strong> deben ser el mismo mensaje </strong></div>');
  		$(window).scrollTop($("#infoAnimacionDefRSA").children().last().offset().top);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").append('<label class="circulo"> m = '+m+' = 0x'+s2hex(b2s((mb)))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tDcRemove);
  		$("#infoAnimacionDefRSA").append('<br><label class="circulo"> z = '+b2s(z)+' = 0x'+s2hex(b2s((z)))+' </label>').children().last().addClass(parpadeo);
  		await sleepFirmaRSA(tDcAdd);
  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
  		await sleepFirmaRSA(tDcRemove);
  		if (s2hex(b2s((z))) == s2hex(b2s((mb)))){
  			$("#infoAnimacionDefRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>La firma es valida </strong></div>');
  			$(window).scrollTop($("#infoAnimacionDefRSA").children().last().offset().top);
  			$("#infoAnimacionDefRSA").append('<label class="circulo"> m = '+m+' = 0x'+s2hex(b2s((mb)))+'&nbsp;&nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;&nbsp;0x'+s2hex(b2s((z)))+' = '+b2s(z)+' = z </label>').children().last().addClass(parpadeo);
	  		await sleepFirmaRSA(tDcAdd);
	  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
	  		await sleepFirmaRSA(tDcRemove);
  		} else {
  			$("#infoAnimacionDefRSA").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>La firma NO es valida </strong></div>');
  			$(window).scrollTop($("#infoAnimacionDefRSA").children().last().offset().top);
  			$("#infoAnimacionDefRSA").append('<br><label class="circulo"> m = '+m+' = 0x'+s2hex(b2s((mb)))+'&nbsp;&nbsp;&nbsp;&nbsp;!=&nbsp;&nbsp;&nbsp;&nbsp;0x'+s2hex(b2s((z)))+' = '+b2s(z)+' = z </label>').children().last().addClass(parpadeo);
	  		await sleepFirmaRSA(tDcAdd);
	  		$("#infoAnimacionDefRSA").children().last().removeClass(parpadeo);
	  		await sleepFirmaRSA(tDcRemove);
  		}
  		
  	}
  	if (idc==0) {
  		$("#out-txtPlanofRSA").val(b2s(z));
		toastr.options.timeOut = "1000";
        toastr['success'](mensaje_66);
        $("#btn-descifrarfRSA").show();
        $("#btn-tipoDefRSA").show();
        $("#btn-cancelarDescifrarfRSA").hide();
        $("#btn-copiarTextofRSA").removeAttr("disabled");
   }
}

function firmarArchivoRSA(evt) {
	var fileInput = document.getElementById('fileInputFirmaRSA');
	var fileDisplayArea = document.getElementById('fileDisplayAreaFirmaRSAFirma');
	var fileDisplayAreaLlaveE = document.getElementById('fileDisplayAreaFirmaRSAllaveE');
	var fileDisplayAreaLlaveN = document.getElementById('fileDisplayAreaFirmaRSAllaveN');
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano = "";
	var textoCifrado = "";
	$("#progressbarFirmaRSA").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	
	if(typeof file!=='undefined'){
		if(file.size <= 128) {
			if (file.type.match(textType)){
				var reader = new FileReader();
				reader.onload = function(e){
					textoPlano = reader.result;

					rsaKeys(512);
					var m = textoPlano;
					var mb = s2b(m);
					var firma = RSAencrypt(mb,rsa_d,rsa_pq);
					var y = s2hex(b2s(firma));

					textoLlavesPublicas = "Llave publica e: "+rsa_e+"      Llave publica n: "+s2hex(b2s(rsa_pq));
					textoCifrado = y;

					fileDisplayAreaLlaveE.innerText = "Llave publica e:  "+rsa_e;
					fileDisplayAreaLlaveN.innerText = "Llave publica n:  "+s2hex(b2s(rsa_pq));
					textoLlavesPublicas = "\ufeff"+textoLlavesPublicas; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					fileDisplayArea.innerText = "Firma:  "+textoCifrado;
					textoCifrado = "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					//PARA DESCARGAR
					var elementLlave = document.createElement('a');
					elementLlave.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoLlavesPublicas));
					elementLlave.setAttribute('download', "ArchivoLlavesFirmaRSA.txt");
					elementLlave.style.display = 'none';
					document.body.appendChild(elementLlave);
					elementLlave.click();
					document.body.removeChild(elementLlave);

					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
					element.setAttribute('download', "ArchivoFirmaRSA.txt");
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
					$("#progressbarFirmaRSA").css('width','100%').attr('aria-valuenow', '100');
				}
				reader.readAsText(file, 'ISO-8859-1');
			} else {
				fileDisplayArea.innerText = mensaje_89;
			}
		} else {
            fileDisplayArea.innerText = mensaje_154;
        }
	}
}

function verificarArchivoRSA(evt) {
	var fileInput = document.getElementById('fileInputVerificarRSAMensaje');
	var fileInputFirma = document.getElementById('fileInputVerificarRSAFirma');
	var fileDisplayArea = document.getElementById('fileDisplayAreaVerificarRSA');
	var file = fileInput.files[0];
	var fileFirma = fileInputFirma.files[0];
	var textType = /text.*/;			
	var textoPlano = "";
	var textoCifrado = "";
	$("#progressbarVerificarRSA").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	var errorN = validarEntradaVerificarArchivoRSALlaveN();
    $('#llavePublicaNFirmaRSA').removeClass('input-error').next().remove();
    var errorE = validarEntradaVerificarArchivoRSALlaveE();
    $('#llavePublicaEFirmaRSA').removeClass('input-error').next().remove();

	if (errorN == "" && errorE == ""){
		if(typeof file!=='undefined' && typeof fileFirma!=='undefined'){
			if(file.size <= 128 && fileFirma.size <= 259) {
				if (file.type.match(textType) && fileFirma.type.match(textType)){
					var reader = new FileReader();
					var readerFirma = new FileReader();
					reader.onload = function(e){
						readerFirma.onload = function(e){
							textoCifrado = readerFirma.result;
							textoPlano = reader.result;

							var y = textoCifrado;
							var yb = s2b(hex2s(y));
							var m = textoPlano;
							var mb = s2b(m);
							rsa_e = [$("#llavePublicaEFirmaRSA").val()];
							rsa_pq = s2b(hex2s($("#llavePublicaNFirmaRSA").val().toLowerCase()));
							var z = RSAencrypt(yb,rsa_e,rsa_pq);
							// console.log("y = "+y);
							// console.log("yBits = "+yb);
							// console.log("m = "+m);
							// console.log("mBits = "+mb);
							// console.log("(yBits,e,n) = zBits = "+z);
							// console.log("z = "+b2s(z));

							// console.log(s2hex(b2s((z)))+' '+s2hex(b2s((mb))));

							if(s2hex(b2s((z))) == s2hex(b2s((mb)))){
								fileDisplayArea.innerText = mensaje_118;
								textoPlano = "\ufeff"+"La firma es valida:  "+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
							} else {
								fileDisplayArea.innerText = mensaje_119;
								textoPlano = "\ufeff"+"La firma NO es valida:  "+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
							}					
							
							//PARA DESCARGAR
							var element = document.createElement('a');
							element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
							element.setAttribute('download', "ArchivoVerificarRSA.txt");
							element.style.display = 'none';
							document.body.appendChild(element);
							element.click();
							document.body.removeChild(element);
							$("#progressbarVerificarRSA").css('width','100%').attr('aria-valuenow', '100');
						}
					}
					reader.readAsText(file, 'ISO-8859-1');
					readerFirma.readAsText(fileFirma, 'ISO-8859-1');
				} else {
					fileDisplayArea.innerText = mensaje_89
				}
			} else if (file.size > 128) {
	            fileDisplayArea.innerText = mensaje_154;
	        } else if (fileFirma.size > 259) {
	        	fileDisplayArea.innerText = mensaje_155;
	        }
		}
	} else if (errorN != "" && errorE == "") {
		$('#llavePublicaNFirmaRSA').addClass('input-error').after('<div id="llavePublicaNFirmaRSA-error" class="text-danger">'+errorN+'</div>');
	} else if (errorE != "" && errorN == "") {
		$('#llavePublicaEFirmaRSA').addClass('input-error').after('<div id="llavePublicaEFirmaRSA-error" class="text-danger">'+errorE+'</div>');
	} else if (errorN != "" && errorE != "") {
		$('#llavePublicaNFirmaRSA').addClass('input-error').after('<div id="llavePublicaNFirmaRSA-error" class="text-danger">'+errorN+'</div>');
		$('#llavePublicaEFirmaRSA').addClass('input-error').after('<div id="llavePublicaEFirmaRSA-error" class="text-danger">'+errorE+'</div>');
	}
}


// **************************************************************************************************//


var keybits = [128,256,384,512];

function genkey() {
	var ix = document.t.keylen.selectedIndex;

	var bits=keybits[ix];

	var startTime=new Date();

	rsaKeys(bits);
	document.t.p.value=rsa_p;
	document.t.q.value=rsa_q;
	document.t.d.value=rsa_d;
	document.t.e.value=rsa_e;
	document.t.u.value=rsa_u;
	document.t.pq.value=rsa_pq;

	var mpi=s2r(b2mpi(rsa_pq)+b2mpi(rsa_e));
	mpi=mpi.replace(/\n/,'');
	document.t.pkey.value=mpi;

	var endTime=new Date();
	document.t.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
}

function RSAdoEncryption() {
	var mod=new Array();
	var exp=new Array();

	var s = r2s(document.t.pkey.value);
	var l = Math.floor((s.charCodeAt(0)*256 + s.charCodeAt(1)+7)/8);

	mod = mpi2b(s.substr(0,l+2));
	exp = mpi2b(s.substr(l+2));

	var p = document.rsatest.plaintext.value+String.fromCharCode(1);
	var pl = p.length;

	if(pl > l-3) {
		alert('In this example plain text length must be less than modulus of '+(l-3)+' bytes');
		return;
	}

	var b=s2b(p);

	var t;
	var i;

	var startTime=new Date();
	var enc=RSAencrypt(b,exp,mod);
	var endTime=new Date();

	document.rsatest.ciphertext.value=s2hex(b2s(enc));
	document.rsatest.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
}

function RSAdoDecryption() {
	var p = rsa_p;
	var q = rsa_q;
	var d = rsa_d;
	var u = rsa_u;
	var enc=s2b(hex2s(document.rsatest.ciphertext.value));

	var startTime=new Date();
	var dec=b2s(RSAdecrypt(enc, d, p, q, u));
	var endTime=new Date();

	document.rsatest.plaintext.value=dec.substr(0, dec.length-1);

	document.rsatest.howLong.value=(endTime.getTime()-startTime.getTime())/1000.0;
}