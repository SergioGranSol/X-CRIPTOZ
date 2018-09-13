function sleepMD5(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

function mostrarPanelMD5(){
	$("#pnl-InteractivoMD5").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelMD5(){
	$("#pnl-InteractivoMD5").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelMD5();
}

function limpiaPanelMD5(){
	tCAdd=600;
	tCRemove=200;
	tDcAdd=600;
	tDcRemove=200;
	parpadeo='parpadeo2N';
	parpadeoNext='parpadeoNext2N';
	$("#btn-cifrarMD5").html('Cifrado Normal');
	$("#btn-descifrarMD5").html('Descifrado Normal');
	$("#palabraMD5C").empty();
	$("#bufferMD5C").hide();
	$("#R1MD5C").empty();
	$("#funcionR1MD5C").empty();
	$("#funcionR1MD5Cauxiliar").empty();
	$("#in-txtPlanoMD5").val("");
	$("#out-txtCifradoMD5").val("");
	$("#in-txtCifradoMD5").val("");
	$("#out-txtPlanoMD5").val("");
	$("#infoAnimacion1CiMD5").hide();
	$("#infoAnimacion2CiMD5").hide();
	$("#infoAnimacion3CiMD5").hide();
	$("#funcionesR1MD5C").hide();
	$("#txtPlanoMD5-error").remove();
	$("#in-txtPlanoMD5").removeClass('input-error');
	$("#txtCifradoMD5-error").remove();
	$("#in-txtCifradoMD5").removeClass('input-error');
	$("#btn-cifrarMD5").show();
	$("#btn-tipoCiMD5").show();
	$("#btn-cancelarCifrarMD5").hide();
	$("#btn-descifrarMD5").show();
	$("#btn-tipoDeMD5").show();
	$("#btn-cancelarDescifrarMD5").hide();
}

function pararAnimacionMD5(){
	ic=999;
	idc=999;
	$("#in-txtPlanoMD5").val("");
    $("#btn-copiarTextoMD5").removeAttr("disabled");
    $("#palabraMD5C").empty();
    $("#bufferMD5C").hide();
	$("#R1MD5C").empty();
	$("#funcionR1MD5C").empty();
	$("#funcionR1MD5Cauxiliar").empty();
	$("#infoAnimacion1CiMD5").hide();
	$("#infoAnimacion2CiMD5").hide();
	$("#infoAnimacion3CiMD5").hide();
	$("#funcionesR1MD5C").hide();
	$("#txtPlanoMD5-error").remove();
	$("#in-txtPlanoMD5").removeClass('input-error');
	$("#txtCifradoMD5-error").remove();
	$("#in-txtCifradoMD5").removeClass('input-error');
	$("#btn-cifrarMD5").show();
	$("#btn-tipoCiMD5").show();
	$("#btn-cancelarCifrarMD5").hide();
	$("#btn-descifrarMD5").show();
	$("#btn-tipoDeMD5").show();
	$("#btn-cancelarDescifrarMD5").hide();
}

function validarEntradaCifradoMD5(){
	var mensaje = "";
	var texto = $('#in-txtPlanoMD5').val();
	if (texto.length > 32 || texto.length < 0) {
		mensaje = mensaje_56;
	} else {
		for(var i = 0 ; i < texto.length ; i++){
			if(texto[i].charCodeAt(0) < 0 || texto[i].charCodeAt(0) > 255){
				mensaje = mensaje_29;
			}
		}
	}
	return mensaje;
}

function validarEntradaDescifradoMD5(){
	var mensaje = "";
	var texto = $('#in-txtCifradoMD5').val();
	if (texto.length > 32) {
		mensaje = "El criptograma debe contener máximo 32 caracteres.";
	}
	return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelMD5").click(function(){
		mostrarPanelMD5();
	});
	$("#btn-cerrarPanelMD5").click(function(){
		pararAnimacionMD5();
		cerrarPanelMD5();
	});
	$("#btn-teoriaMD5").click(function(){
		pararAnimacionMD5();
	});
	$("#btn-fundamentosMD5").click(function(){
		pararAnimacionMD5();
	});
	$("#btn-animacionCifradoMD5").click(function(){
		// pararAnimacionMD5();
	});
	$("#btn-animacionDesifradoMD5").click(function(){
		pararAnimacionMD5();
	});
	$("#btn-cancelarCifrarMD5").click(function(){
		pararAnimacionMD5();
	});
	$("#btn-cancelarDescifrarMD5").click(function(){
		pararAnimacionMD5();
	});
	$("#tipoCiMD51").click(function(){
		$("#btn-cifrarMD5").html('Obtener Hash Rápido');
		tCAdd=200;
		tCRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoCiMD52").click(function(){
		$("#btn-cifrarMD5").html('Obtener Hash Normal');
		tCAdd=600;
		tCRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoCiMD53").click(function(){
		$("#btn-cifrarMD5").html('Obtener Hash Lento');
		tCAdd=1600;
		tCRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});
	$("#tipoDeMD51").click(function(){
		$("#btn-descifrarMD5").html('Obtener Hash Rápido');
		tDcAdd=200;
		tDcRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoDeMD52").click(function(){
		$("#btn-descifrarMD5").html('Obtener Hash Normal');
		tDcAdd=600;
		tDcRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoDeMD53").click(function(){
		$("#btn-descifrarMD5").html('Obtener Hash Lento');
		tDcAdd=1600;
		tDcRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});

	$("#in-txtPlanoMD5").keyup(function(){
		$("#in-txtPlanoMD5").removeClass('input-error');
		$("#txtPlanoMD5-error").remove();
		if ($("#in-txtPlanoMD5").val().length <= 32) {
			$("#in-txtPlanoMD5").removeClass('input-error');
			$("#txtPlanoMD5-error").remove();
		} else{
			var mensaje = validarEntradaCifradoMD5();
			if (mensaje.length == 0){
				$("#in-txtPlanoMD5").removeClass('input-error');
				$("#txtPlanoMD5-error").remove();
			} else {
				$("#in-txtPlanoMD5").addClass('input-error');
				$("#in-txtPlanoMD5").parent().parent().append('<div id="txtPlanoMD5-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtCifradoMD5").keyup(function(){
		$("#in-txtCifradoMD5").removeClass('input-error');
		$("#txtCifradoMD5-error").remove();
		if ($("#in-txtCifradoMD5").val().length <= 32) {
			$("#in-txtCifradoMD5").removeClass('input-error');
			$("#txtCifradoMD5-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoMD5();
			if (mensaje.length == 0){
				$("#in-txtCifradoMD5").removeClass('input-error');
				$("#txtCifradoMD5-error").remove();
			} else {
				$("#in-txtCifradoMD5").addClass('input-error');
				$("#in-txtCifradoMD5").parent().parent().append('<div id="txtCifradoMD5-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#btn-cifrarMD5").click(function(){
		$("#in-txtPlanoMD5").removeClass('input-error');
		$("#txtPlanoMD5-error").remove();
		$("#out-txtCifradoMD5").val("");
		var mensaje = validarEntradaCifradoMD5();
		if ($("#in-txtPlanoMD5").val().length <= 32 && mensaje.length == 0){
			$("#palabraMD5C").empty();
			$("#bufferMD5C").hide();
			$("#R1MD5C").empty();
			$("#funcionR1MD5C").empty();
			$("#funcionR1MD5Cauxiliar").empty();
			$("#infoAnimacion1CiMD5").hide();
			$("#infoAnimacion2CiMD5").hide();
			$("#infoAnimacion3CiMD5").hide();
			$("#funcionesR1MD5C").hide();
			$("#btn-cifrarMD5").hide();
			$("#btn-tipoCiMD5").hide();
			$("#btn-cancelarCifrarMD5").show();
			cifrarMD5();
		} else{
			$("#in-txtPlanoMD5").addClass('input-error');
			$("#in-txtPlanoMD5").parent().parent().append('<div id="txtPlanoMD5-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});

	$("#btn-copiarTextoMD5").click(function(){
		if ($("#out-txtCifradoMD5").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info']('Primero debes cifrar un mensaje');
		} else {
			$("#in-txtCifradoMD5").val($("#out-txtCifradoMD5").val());
		}
	});

	$("#btn-descifrarMD5").click(function(){
		$("#in-txtCifradoMD5").removeClass('input-error');
		$("#txtCifradoMD5-error").remove();
		$("#out-txtPlanoMD5").val("");
		var mensaje = validarEntradaDescifradoMD5();
		if ($("#in-txtCifradoMD5").val().length <= 32 && mensaje.length == 0){
			$("#btn-copiarTextoMD5").attr("disabled","disabled");
			$("#btn-descifrarMD5").hide();
			$("#btn-tipoDeMD5").hide();
			$("#btn-cancelarDescifrarMD5").show();
			descifrarMD5();
		} else{
			$("#in-txtCifradoMD5").addClass('input-error');
			$("#in-txtCifradoMD5").parent().parent().append('<div id="txtCifradoMD5-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});
	    
});

async function cifrarMD5(){
	ic = 0;
  	str = $("#in-txtPlanoMD5").val();
  	a =  1732584193;
  	b = -271733879;
  	c = -1732584194;
  	d =  271733878;
  	if (ic==0) {
  		$("#infoAnimacion1CiMD5").show();
  	}
  	nblk = ((str.length + 8) >> 6) + 1;
  	blks = new Array(nblk * 16);
  	for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  	for(i = 0; i < str.length; i++)
    	blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  	blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  	blks[nblk * 16 - 2] = str.length * 8;
  	if (ic==0) {
  		$("#palabraMD5C").html('Bloque No. 1= ');
  		$("#palabraMD5C").show();
  		await sleepMD5(tCAdd);
  	}
  	for(i = 0; i < nblk * 16 && ic == 0; i++){
  		$("#palabraMD5C").append('<label class="circulo">&nbsp;'+rhex(blks[i])+'&nbsp;</label>').children().last().addClass(parpadeo);
  		await sleepMD5(tCAdd);
  		$("#palabraMD5C").children().last().removeClass(parpadeo);
  		await sleepMD5(tCRemove);
  	}
  	if (ic==0) {
  		$("#infoAnimacion2CiMD5").show();
  		await sleepMD5(tCAdd);
  		$("#bufferMD5C").show();
  		$(window).scrollTop($("#bufferMD5C").offset().top);
  		await sleepMD5(tCAdd);
  	}
  	x = blks;
  	olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    if (ic==0) {
  		$("#infoAnimacion3CiMD5").show();
  		await sleepMD5(tCAdd);
  	}
  	for(i = 0; i < x.length && ic == 0; i += 16){
  		if (ic == 0) {
	  		$("#funcionesR1MD5C").show();
	  		await sleepMD5(tCAdd);
	  	}
	  	if (ic == 0) {
	  		$(window).scrollTop($("#funcionR1MD5C").offset().top);
	  		$("#R1MD5C").append('[ABCD 0 7 1]: ').addClass(parpadeo);
	  		$("#funcionR1MD5C").append('[ABCD 0 7 1]: ').addClass(parpadeo);
	  		await sleepMD5(tCAdd);
	  		$("#R1MD5C").removeClass(parpadeo);
	  		$("#funcionR1MD5C").removeClass(parpadeo);
	  		await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#R1MD5C").append('<label class="circulo"> A </label> = ').children().last().addClass(parpadeo);
	  		$("#funcionR1MD5C").append('<label class="circulo"> A </label> = ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#R1MD5C").children().last().removeClass(parpadeo);
  			$("#funcionR1MD5C").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  		}
  		if (ic == 0) {
  			$("#R1MD5C").append('<label class="circulo"> B </label> + ( ( ').children().last().addClass(parpadeo);
  			$("#funcionR1MD5C").append('<label class="circulo"> '+rhex(b)+' </label> + ( ( ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#R1MD5C").children().last().removeClass(parpadeo);
  			$("#funcionR1MD5C").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
  			$("#R1MD5C").append('<label class="circulo"> A + F(B,C,D)</label> + ').children().last().addClass(parpadeo);
  			$("#funcionR1MD5C").append('<label class="circulo"> '+rhex(a)+' + F('+rhex(b)+', '+rhex(c)+', '+rhex(d)+')</label> + ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#R1MD5C").children().last().removeClass(parpadeo);
  			$("#funcionR1MD5C").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
  			$("#R1MD5C").append('<label class="circulo"> X[0] </label> + ').children().last().addClass(parpadeo);
  			$("#funcionR1MD5C").append('<label class="circulo"> '+rhex(x[0])+' </label> + ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#R1MD5C").children().last().removeClass(parpadeo);
  			$("#funcionR1MD5C").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
  			$("#R1MD5C").append('<label class="circulo"> T[1] </label> ) <<< ').children().last().addClass(parpadeo);
  			$("#funcionR1MD5C").append('<label class="circulo"> '+rhex(-680876936)+' </label> ) <<< ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#R1MD5C").children().last().removeClass(parpadeo);
  			$("#funcionR1MD5C").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
  			$("#R1MD5C").append('<label class="circulo"> 7 </label>)').children().last().addClass(parpadeo);
  			$("#funcionR1MD5C").append('<label class="circulo"> 7 </label>)').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#R1MD5C").children().last().removeClass(parpadeo);
  			$("#funcionR1MD5C").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#funcionR1MD5C").append('<div id="funcionR1MD5Cauxiliar"></div>');
  			$("#funcionR1MD5Cauxiliar").append('Donde: F(b, c, d) = (b & c) | (~b & d)').addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#funcionR1MD5Cauxiliar").removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#funcionR1MD5Cauxiliar").append(' = ( <label class="circulo"> '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#funcionR1MD5Cauxiliar").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
  			$("#funcionR1MD5Cauxiliar").append('& <label class="circulo"> '+rhex(c)+' </label> ) ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#funcionR1MD5Cauxiliar").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#funcionR1MD5Cauxiliar").append('| ( ~ (<label class="circulo"> '+rhex(b)+' </label>) ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#funcionR1MD5Cauxiliar").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#funcionR1MD5Cauxiliar").append('& <label class="circulo"> '+rhex(d)+' </label> ) ').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#funcionR1MD5Cauxiliar").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#funcionR1MD5C").append('<div id="infoFuncionMD5"></div>'+
	  			'<div class="row"><div id="col1MD5" class="col-md-3"></div>'+
	  			'<div id="col2MD5" class="col-md-3"></div>'+
	  			'<div id="col3MD5" class="col-md-3"></div>'+
	  			'<div id="col4MD5" class="col-md-3"></div></div>');
	  		$("#infoFuncionMD5").append('<br><br><div class="alert alert-info text-center" role="alert"><strong>Para completar las 4 Rondas se debe realizar las siguientes operaciones</strong></div>');
	  		$(window).scrollTop($("#infoFuncionMD5").offset().top);
	  		$("#col1MD5").append('<div class="alert alert-info text-center" role="alert" style="padding: 15px 3px 15px 3px;"><strong>Ronda 1<br>[abcd k s i] denotará la operación:</strong><br><i>a = b + ((a + F(b, c, d) + X[k] + T[i]) <<< s)</i><br><strong>Donde </strong><i>F(b, c, d) = (b & c) | (~b & d)</i></div>');
  			a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
  			d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
	    	c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
	    	b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
  			$("#col1MD5").append('<label class="circulo"> [ABCD 0 7 1]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [DABC 1 12 2]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [CDAB 2 17 3]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [BCDA 3 22 4]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$(window).scrollTop($("#col1MD5").last().offset().top);
	  	}
	  	if (ic == 0) {
	  		a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
	    	d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
	    	c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
	    	b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
  			$("#col1MD5").append('<br><label class="circulo"> [ABCD 4 7 5]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [DABC 5 12 6]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [CDAB 6 17 7]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [BCDA 7 22 8]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$(window).scrollTop($("#col1MD5").last().offset().top);
	  	}
	  	if (ic == 0) {
	  		a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
	   		d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
	    	c = ff(c, d, a, b, x[i+10], 17, -42063);
	    	b = ff(b, c, d, a, x[i+11], 22, -1990404162);
  			$("#col1MD5").append('<br><label class="circulo"> [ABCD 8 7 9]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [DABC 9 12 10]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [CDAB 10 17 11]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [BCDA 11 22 12]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$(window).scrollTop($("#col1MD5").last().offset().top);
	  	}
	  	if (ic == 0) {
	  		a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
	    	d = ff(d, a, b, c, x[i+13], 12, -40341101);
	    	c = ff(c, d, a, b, x[i+14], 17, -1502002290);
	    	b = ff(b, c, d, a, x[i+15], 22,  1236535329);
  			$("#col1MD5").append('<br><label class="circulo"> [ABCD 12 7 13]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [DABC 13 12 14]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [CDAB 14 17 15]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col1MD5").append('<br><label class="circulo"> [BCDA 15 22 16]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col1MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#col2MD5").append('<div class="alert alert-info text-center" role="alert" style="padding: 15px 3px 15px 3px;"><strong>Ronda 2<br>[abcd k s i] denotará la operación:</strong><br><i>a = b + ((a + G(b, c, d) + X[k] + T[i]) <<< s)</i><br><strong>Donde </strong><i>G(b, c, d) = (b & d) | (c & ~d)</i></div>');
	  		a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
	    	d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
	    	c = gg(c, d, a, b, x[i+11], 14,  643717713);
	    	b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
  			$("#col2MD5").append('<label class="circulo"> [ABCD 1 5 17]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [DABC 6 9 18]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [CDAB 11 14 19]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [BCDA 0 20 20]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
	    	d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
	    	c = gg(c, d, a, b, x[i+15], 14, -660478335);
	    	b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
  			$("#col2MD5").append('<br><label class="circulo"> [ABCD 5 5 21]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [DABC 10 9 22]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [CDAB 15 14 23]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [BCDA 4 20 24]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
	    	d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
	    	c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
	    	b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
  			$("#col2MD5").append('<br><label class="circulo"> [ABCD 9 5 25]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [DABC 14 9 26]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [CDAB 3 14 27]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [BCDA 8 20 28]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
	    	d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
	    	c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
	    	b = gg(b, c, d, a, x[i+12], 20, -1926607734);
  			$("#col2MD5").append('<br><label class="circulo"> [ABCD 13 5 29]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [DABC 2 9 30]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [CDAB 7 14 31]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col2MD5").append('<br><label class="circulo"> [BCDA 12 20 32]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col2MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	   	if (ic == 0) {
	  		$("#col3MD5").append('<div class="alert alert-info text-center" role="alert" style="padding: 15px 3px 15px 3px;"><strong>Ronda 3<br>[abcd k s i] denotará la operación:</strong><br><i>a = b + ((a + H(b, c, d) + X[k] + T[i]) <<< s)</i><br><strong>Donde </strong><i>H(b, c, d) = b ^ c ^ d</i></div>');
	  		a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
		    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
		    b = hh(b, c, d, a, x[i+14], 23, -35309556);
  			$("#col3MD5").append('<label class="circulo"> [ABCD 5 4 33]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [DABC 8 11 34]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [CDAB 11 16 35]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [BCDA 14 23 36]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
	    	c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
	    	b = hh(b, c, d, a, x[i+10], 23, -1094730640);
  			$("#col3MD5").append('<br><label class="circulo"> [ABCD 1 4 37]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [DABC 4 11 38]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [CDAB 7 16 39]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [BCDA 10 23 40]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
	    	d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
	    	c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
	    	b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
  			$("#col3MD5").append('<br><label class="circulo"> [ABCD 13 4 41]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [DABC 0 11 42]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [CDAB 3 16 43]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [BCDA 6 23 44]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
	    	d = hh(d, a, b, c, x[i+12], 11, -421815835);
	    	c = hh(c, d, a, b, x[i+15], 16,  530742520);
	    	b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
  			$("#col3MD5").append('<br><label class="circulo"> [ABCD 9 4 45]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [DABC 12 11 46]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [CDAB 15 16 47]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col3MD5").append('<br><label class="circulo"> [BCDA 2 23 48]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col3MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#col4MD5").append('<div class="alert alert-info text-center" role="alert" style="padding: 15px 3px 15px 3px;"><strong>Ronda 4<br>[abcd k s i] denotará la operación:</strong><br><i>a = b + ((a + I(b, c, d) + X[k] + T[i]) <<< s)</i><br><strong>Donde </strong><i>I(b, c, d) = c ^ (b | ~d)</i></div>');
	  		a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
	    	d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
	    	c = ii(c, d, a, b, x[i+14], 15, -1416354905);
	    	b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
  			$("#col4MD5").append('<label class="circulo"> [ABCD 0 6 49]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [DABC 7 10 50]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [CDAB 14 15 51]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [BCDA 5 21 52]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		    c = ii(c, d, a, b, x[i+10], 15, -1051523);
		    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
  			$("#col4MD5").append('<br><label class="circulo"> [ABCD 12 6 53]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [DABC 3 10 54]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [CDAB 10 15 55]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [BCDA 1 21 56]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		    d = ii(d, a, b, c, x[i+15], 10, -30611744);
		    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
  			$("#col4MD5").append('<br><label class="circulo"> [ABCD 8 6 57]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [DABC 15 10 58]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [CDAB 6 15 59]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [BCDA 13 21 60]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
		    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
		    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
  			$("#col4MD5").append('<br><label class="circulo"> [ABCD 4 6 61]:  A = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [DABC 11 10 62]:  D = '+rhex(d)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [CDAB 2 15 63]:  C = '+rhex(c)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
  			$("#col4MD5").append('<br><label class="circulo"> [BCDA 9 21 64]:  B = '+rhex(b)+' </label>').children().last().addClass(parpadeo);
	  		await sleepMD5(tCAdd);
  			$("#col4MD5").children().last().removeClass(parpadeo);
  			await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#funcionR1MD5C").append('<div id="infoFinalMD5"><br><br><div class="alert alert-info text-center" role="alert"><strong>Al terminar las 4 rondas se realizan las siguientes sumas'+
	  			'<br>Donde A, B, C, D son los ultimos registros obtenidos en las rondas y AA, BB, CC, DD son los registros iniciales del buffer'+'</strong></div></div>');
		    $("#funcionR1MD5C").append('<label class="circulo"> A = A + AA </label>').children().last().addClass(parpadeo);
		    $(window).scrollTop($("#infoFinalMD5").last().offset().top);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(a)+' + '+rhex(olda)+' </label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    a = add(a, olda);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(a)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		}
		if (ic == 0) {
		    $("#funcionR1MD5C").append('<br><label class="circulo"> B = B + BB </label>').children().last().addClass(parpadeo);
		    $(window).scrollTop($("#infoFinalMD5").last().offset().top);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(b)+' + '+rhex(oldb)+' </label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    b = add(b, oldb);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(b)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
		    $("#funcionR1MD5C").append('<br><label class="circulo"> C = C + CC </label>').children().last().addClass(parpadeo);
		    $(window).scrollTop($("#infoFinalMD5").last().offset().top);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(c)+' + '+rhex(oldc)+' </label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    c = add(c, oldc);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(c)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
		    $("#funcionR1MD5C").append('<br><label class="circulo"> D = D + DD </label>').children().last().addClass(parpadeo);
		    $(window).scrollTop($("#infoFinalMD5").last().offset().top);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(d)+' + '+rhex(oldd)+' </label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    d = add(d, oldd);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(d)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
	  	}
	  	if (ic == 0) {
	  		$("#funcionR1MD5C").append('<div id="infoResultadoMD5"><br><br><div class="alert alert-info text-center" role="alert"><strong>Para obtener el resumen del mensaje se debe concatenar los 4 registros resultantes</strong></div></div>');
	  		$("#funcionR1MD5C").append('<label class="circulo"> Resumen del mensaje = A + B + C + D </label>').children().last().addClass(parpadeo);
		    $(window).scrollTop($("#infoFinalMD5").last().offset().top);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+rhex(a)+' </label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> + '+rhex(b)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> + '+rhex(c)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#funcionR1MD5C").append('<label class="circulo"> + '+rhex(d)+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    resultado = rhex(a) + rhex(b) + rhex(c) + rhex(d);
		    $("#funcionR1MD5C").append('<label class="circulo"> = '+resultado+'</label>').children().last().addClass(parpadeo);
			await sleepMD5(tCAdd);
		    $("#funcionR1MD5C").children().last().removeClass(parpadeo);
		    await sleepMD5(tCRemove);
		    $("#out-txtCifradoMD5").val(resultado);
	  	}
	  	if (ic==0) {
			$("#out-txtCifradoMD5").val(resultado);
	        toastr.options.timeOut = "1000";
	        toastr['success'](mensaje_57);
	        $("#btn-cifrarMD5").show();
	        $("#btn-tipoCiMD5").show();
	        $("#btn-cancelarCifrarMD5").hide();
	   }
	}
}

async function descifrarMD5(){
	console.log('nada');
}

function cifrarArchivoMD5(evt) {
	var fileInput = document.getElementById('fileInputMD5Cifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaMD5Cifrado');
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano = "";
	var textoCifrado = "";
	$("#progressbarMD5Cifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	a =  1732584193;
  	b = -271733879;
  	c = -1732584194;
  	d =  271733878;
	
	if(typeof file!=='undefined'){
		if(file.size <= 1024*100) {
			if (file.type.match(textType)){
				var reader = new FileReader();
				reader.onload = function(e){
					textoPlano= reader.result;
					nblk = ((textoPlano.length + 8) >> 6) + 1;
				  	blks = new Array(nblk * 16);
				  	for(i = 0; i < nblk * 16; i++) blks[i] = 0;
				  	for(i = 0; i < textoPlano.length; i++)
				    	blks[i >> 2] |= textoPlano.charCodeAt(i) << ((i % 4) * 8);
				  	blks[i >> 2] |= 0x80 << ((i % 4) * 8);
				  	blks[nblk * 16 - 2] = textoPlano.length * 8;
				  	x = blks;

				    for(i = 0; i < x.length; i += 16){
					    olda = a;
					    oldb = b;
					    oldc = c;
					    oldd = d;

					    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
					    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
					    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
					    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
					    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
					    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
					    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
					    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
					    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
					    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
					    c = ff(c, d, a, b, x[i+10], 17, -42063);
					    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
					    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
					    d = ff(d, a, b, c, x[i+13], 12, -40341101);
					    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
					    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

					    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
					    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
					    c = gg(c, d, a, b, x[i+11], 14,  643717713);
					    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
					    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
					    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
					    c = gg(c, d, a, b, x[i+15], 14, -660478335);
					    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
					    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
					    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
					    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
					    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
					    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
					    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
					    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
					    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
					    
					    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
					    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
					    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
					    b = hh(b, c, d, a, x[i+14], 23, -35309556);
					    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
					    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
					    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
					    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
					    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
					    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
					    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
					    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
					    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
					    d = hh(d, a, b, c, x[i+12], 11, -421815835);
					    c = hh(c, d, a, b, x[i+15], 16,  530742520);
					    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

					    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
					    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
					    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
					    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
					    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
					    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
					    c = ii(c, d, a, b, x[i+10], 15, -1051523);
					    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
					    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
					    d = ii(d, a, b, c, x[i+15], 10, -30611744);
					    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
					    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
					    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
					    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
					    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
					    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

					    a = add(a, olda);
					    b = add(b, oldb);
					    c = add(c, oldc);
					    d = add(d, oldd);
					    //$("#progressbarMD5Cifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
	  				}

	  				textoCifrado = rhex(a) + rhex(b) + rhex(c) + rhex(d);
	  				
					fileDisplayArea.innerText= textoCifrado;
					textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					//PARA DESCARGAR
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
					element.setAttribute('download', "ArchivoCifradoMD5.txt");
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
					$("#progressbarMD5Cifrado").css('width','100%').attr('aria-valuenow', '100');
				}
				reader.readAsText(file, 'ISO-8859-1');
			} else {
				fileDisplayArea.innerText = mensaje_89;
			}
		} else {
            fileDisplayArea.innerText = mensaje_90;
        }
	}
}

var hex_chr = "0123456789abcdef";
function rhex(num){
	str = "";
	for(j = 0; j <= 3; j++)
		str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);
	return str;
}

function add(x, y){
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

function rol(num, cnt){
	return (num << cnt) | (num >>> (32 - cnt));
}

function cmn(q, a, b, x, s, t){
	return add(rol(add(add(a, q), add(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t){
	return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t){
	return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t){
	return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t){
	return cmn(c ^ (b | (~d)), a, b, x, s, t);
}