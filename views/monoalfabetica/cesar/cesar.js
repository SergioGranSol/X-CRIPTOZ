function sleepCesar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

var abc = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function mostrarPanelCesar(){
	$("#pnl-InteractivoCesar").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelCesar(){
	$("#pnl-InteractivoCesar").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelCesar();
}

function crearPanelCesarCifrado(){
	for (var i = 1; i <= 27; i++) {
		$("#textoPlanoCesarC").append('<td id="abcPlano'+i+'C" class="circulo">'+abc[i].toLowerCase()+'&nbsp;</td>');
		$("#textoCifradoCesarC").append('<td id="abcCifrado'+i+'C" class="circulo">'+abc[i]+'</td>');
	}
}

function crearPanelCesarDescifrado(){
	for (var i = 1; i <= 27; i++) {
		$("#textoPlanoCesarD").append('<td id="abcPlano'+i+'D" class="circulo">'+abc[i].toLowerCase()+'&nbsp;</td>');
		$("#textoCifradoCesarD").append('<td id="abcCifrado'+i+'D" class="circulo">'+abc[i]+'</td>');
	}
}

function limpiaPanelCesar(){
	tCAdd=600;
	tCRemove=200;
	tDcAdd=600;
	tDcRemove=200;
	parpadeo='parpadeo2N';
	parpadeoNext='parpadeoNext2N';
	$("#btn-cifrarCesar").html('Cifrado Normal');
	$("#btn-descifrarCesar").html('Descifrado Normal');
	$("#textoPlanoCesarC").empty();
	$("#textoCifradoCesarC").empty();
	$("#textoPlanoCesarD").empty();
	$("#textoCifradoCesarD").empty();
	$("#palabraCesarC").empty();
	$("#palabraCesarD").empty();
	$("#palabraCifradaCesarC").empty();
	$("#palabraDescifradaCesarD").empty();
	$("#in-txtPlanoCesar").val("");
	$("#out-txtCifradoCesar").val("");
	$("#in-txtCifradoCesar").val("");
	$("#out-txtPlanoCesar").val("");
	$("#infoAnimacionCiCesar").hide();
	$("#infoAnimacionDeCesar").hide();
	$("#txtPlanoCesar-error").remove();
	$("#in-txtPlanoCesar").removeClass('input-error');
	$("#txtCifradoCesar-error").remove();
	$("#in-txtCifradoCesar").removeClass('input-error');
	$("#btn-cifrarCesar").show();
	$("#btn-tipoCiCesar").show();
	$("#btn-cancelarCifrarCesar").hide();
	$("#btn-descifrarCesar").show();
	$("#btn-tipoDeCesar").show();
	$("#btn-cancelarDescifrarCesar").hide();
}

function pararAnimacionCesar(){
	ic=999;
	idc=999;
    $("#btn-copiarTextoCesar").removeAttr("disabled");
    $("#textoPlanoCesarC").empty();
	$("#textoCifradoCesarC").empty();
	$("#textoPlanoCesarD").empty();
	$("#textoCifradoCesarD").empty();
    $("#palabraCesarC").empty();
	$("#palabraCesarD").empty();
	$("#palabraCifradaCesarC").empty();
	$("#palabraDescifradaCesarD").empty();
	$("#infoAnimacionCiCesar").hide();
	$("#infoAnimacionDeCesar").hide();
	$("#txtPlanoCesar-error").remove();
	$("#in-txtPlanoCesar").removeClass('input-error');
	$("#in-txtPlanoCesar").val("");
	$("#txtCifradoCesar-error").remove();
	$("#in-txtCifradoCesar").removeClass('input-error');
	$("#in-txtCifradoCesar").val("");
	$("#btn-cifrarCesar").show();
	$("#btn-tipoCiCesar").show();
	$("#btn-cancelarCifrarCesar").hide();
	$("#btn-descifrarCesar").show();
	$("#btn-tipoDeCesar").show();
	$("#btn-cancelarDescifrarCesar").hide();
}

function validarEntradaCifradoCesar(){
	var mensaje = "";
	var texto = $('#in-txtPlanoCesar').val().replace(/ /g,"");
	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	} else if (!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}
	return mensaje;
}

function validarEntradaDescifradoCesar(){
	var mensaje = "";
	var texto = $('#in-txtCifradoCesar').val();
	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_3;
	}
	else if(texto.indexOf(' ') >= 0){
		mensaje = mensaje_4;
	}
	else if (!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_5;
	}
	return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelCesar").click(function(){
		mostrarPanelCesar();
	});
	$("#btn-cerrarPanelCesar").click(function(){
		pararAnimacionCesar();
		cerrarPanelCesar();
	});
	$("#btn-teoriaCesar").click(function(){
		pararAnimacionCesar();
	});
	$("#btn-fundamentosCesar").click(function(){
		pararAnimacionCesar();
	});
	$("#btn-animacionCifradoCesar").click(function(){
		//pararAnimacionCesar();
	});
	$("#btn-animacionDesifradoCesar").click(function(){
		//pararAnimacionCesar();
	});
	$("#btn-cancelarCifrarCesar").click(function(){
		pararAnimacionCesar();
	});
	$("#btn-cancelarDescifrarCesar").click(function(){
		pararAnimacionCesar();
	});
	$("#tipoCiCesar1").click(function(){
		$("#btn-cifrarCesar").html('Cifrado Rápido');
		tCAdd=200;
		tCRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoCiCesar2").click(function(){
		$("#btn-cifrarCesar").html('Cifrado Normal');
		tCAdd=600;
		tCRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoCiCesar3").click(function(){
		$("#btn-cifrarCesar").html('Cifrado Lento');
		tCAdd=1600;
		tCRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});
	$("#tipoDeCesar1").click(function(){
		$("#btn-descifrarCesar").html('Descifrado Rápido');
		tDcAdd=200;
		tDcRemove=75;
		parpadeo='parpadeo1R';
		parpadeoNext='parpadeoNext1R';
	});
	$("#tipoDeCesar2").click(function(){
		$("#btn-descifrarCesar").html('Descifrado Normal');
		tDcAdd=600;
		tDcRemove=200;
		parpadeo='parpadeo2N';
		parpadeoNext='parpadeoNext2N';
	});
	$("#tipoDeCesar3").click(function(){
		$("#btn-descifrarCesar").html('Descifrado Lento');
		tDcAdd=1600;
		tDcRemove=200;
		parpadeo='parpadeo3L';
		parpadeoNext='parpadeoNext3L';
	});

	$("#in-txtPlanoCesar").keyup(function(){
		$("#in-txtPlanoCesar").removeClass('input-error');
		$("#txtPlanoCesar-error").remove();
		if ($("#in-txtPlanoCesar").val()=='') {
			$("#in-txtPlanoCesar").removeClass('input-error');
			$("#txtPlanoCesar-error").remove();
		} else{
			var mensaje = validarEntradaCifradoCesar();
			if (mensaje.length == 0){
				$("#in-txtPlanoCesar").removeClass('input-error');
				$("#txtPlanoCesar-error").remove();
			} else {
				$("#in-txtPlanoCesar").addClass('input-error');
				$("#in-txtPlanoCesar").parent().parent().append('<div id="txtPlanoCesar-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#in-txtCifradoCesar").keyup(function(){
		$("#in-txtCifradoCesar").removeClass('input-error');
		$("#txtCifradoCesar-error").remove();
		if ($("#in-txtCifradoCesar").val()=='') {
			$("#in-txtCifradoCesar").removeClass('input-error');
			$("#txtCifradoCesar-error").remove();
		} else{
			var mensaje = validarEntradaDescifradoCesar();
			if (mensaje.length == 0){
				$("#in-txtCifradoCesar").removeClass('input-error');
				$("#txtCifradoCesar-error").remove();
			} else {
				$("#in-txtCifradoCesar").addClass('input-error');
				$("#in-txtCifradoCesar").parent().parent().append('<div id="txtCifradoCesar-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			}
		}
	});

	$("#btn-cifrarCesar").click(function(){
		$("#in-txtPlanoCesar").removeClass('input-error');
		$("#txtPlanoCesar-error").remove();
		$("#out-txtCifradoCesar").val("");
		var mensaje = validarEntradaCifradoCesar();
		if ($("#in-txtPlanoCesar").val()!='' && mensaje.length == 0){
			$("#palabraCesarC").empty();
			$("#palabraCifradaCesarC").empty();
			$("#infoAnimacionCiCesar").hide();
			$("#infoCiCesar").html('');
			$("#btn-cifrarCesar").hide();
			$("#btn-tipoCiCesar").hide();
			$("#btn-cancelarCifrarCesar").show();
			$("#textoPlanoCesarC").empty();
			$("#textoCifradoCesarC").empty();
			cifrarCesar();
		} else{
			$("#in-txtPlanoCesar").addClass('input-error');
			$("#in-txtPlanoCesar").parent().parent().append('<div id="txtPlanoCesar-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});

	$("#btn-copiarTextoCesar").click(function(){
		if ($("#out-txtCifradoCesar").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-txtCifradoCesar").val($("#out-txtCifradoCesar").val());
		}
	});

	$("#btn-descifrarCesar").click(function(){
		$("#in-txtCifradoCesar").removeClass('input-error');
		$("#txtCifradoCesar-error").remove();
		$("#out-txtPlanoCesar").val("");
		var mensaje = validarEntradaDescifradoCesar();
		if ($("#in-txtCifradoCesar").val()!='' && mensaje.length == 0){
			$("#btn-copiarTextoCesar").attr("disabled","disabled");
			$("#palabraCesarD").empty();
			$("#palabraDescifradaCesarD").empty();
			$("#infoAnimacionDeCesar").hide();
			$("#infoDeCesar").html('');
			$("#btn-descifrarCesar").hide();
			$("#btn-tipoDeCesar").hide();
			$("#btn-cancelarDescifrarCesar").show();
			$("#textoPlanoCesarD").empty();
			$("#textoCifradoCesarD").empty();
			descifrarCesar();
		} else{
			$("#in-txtCifradoCesar").addClass('input-error');
			$("#in-txtCifradoCesar").parent().parent().append('<div id="txtCifradoCesar-error" class="text-danger">&nbsp;'+mensaje+'</div>');
		}
	});
	    
});

async function cifrarCesar(){
	crearPanelCesarCifrado();
    var plano = ($("#in-txtPlanoCesar").val().toUpperCase()).split("");
    var cifrado = [];
    var cadenaCifrado;
    ic = 0;
    for (var i = 0; i <= plano.length-1; i++) {
        if(plano[i] == ' ') {
           plano.splice(i, 1);
        }
    }
    $("#infoAnimacionCiCesar").fadeIn();
    await sleepCesar(tCAdd);
    for (var m = 0; m <= plano.length-1; m++) {
		$("#palabraCesarC").append('<label id="palabra'+m+'C" class="circulo">'+plano[m].toLowerCase()+'</label>');
    }
    for (var n = 0; n <= plano.length-1; n++) {
		$("#palabraCifradaCesarC").append('<label id="palabraCifrado'+n+'C" class="circulo">&nbsp;</label>');
    }
    while (ic <= plano.length-1) {
		if (abc.indexOf(plano[ic])+3 <= 27){
			cifrado[ic] = abc[abc.indexOf(plano[ic])+3];
			numeroElementoPlano = abc.indexOf(plano[ic]);
    		numeroElementoCifrado = abc.indexOf(plano[ic])+3;
		} else {
			cifrado[ic] = abc[(abc.indexOf(plano[ic])+3)-27];
			numeroElementoPlano = abc.indexOf(plano[ic]);
    		numeroElementoCifrado = (abc.indexOf(plano[ic])+3)-27;
		}
		$("#palabraCifrado"+ic+"C").html(cifrado[ic]).show();
    	
    	// ANIMATION
    	$("#infoCiCesar").html('<br><i>'+cifrado[ic]+'</i><strong> es la letra </strong><i>'+plano[ic].toLowerCase()+'</i><strong> recorrida tres posiciones</strong>');
    	$("#palabra"+ic+"C").addClass(parpadeo);
    	$("#abcPlano"+numeroElementoPlano+"C").addClass(parpadeo);
    	$("#abcCifrado"+numeroElementoCifrado+"C").addClass(parpadeoNext);
    	$("#palabraCifrado"+ic+"C").addClass(parpadeoNext);
    	await sleepCesar(tCAdd);
    	$("#palabra"+ic+"C").removeClass(parpadeo);
    	$("#abcPlano"+numeroElementoPlano+"C").removeClass(parpadeo);
    	$("#abcCifrado"+numeroElementoCifrado+"C").removeClass(parpadeoNext);
    	$("#palabraCifrado"+ic+"C").removeClass(parpadeoNext);
    	await sleepCesar(tCRemove);
    	// END ANIMATION
    	ic++;
    }
    if (ic <= plano.length && ic!=999) {
	    cadenaCifrado = cifrado.join("");
	    $("#out-txtCifradoCesar").val(cadenaCifrado);
	    toastr.options.timeOut = "1000";
		toastr['success'](mensaje_7);
		$("#btn-cifrarCesar").show();
		$("#btn-tipoCiCesar").show();
		$("#btn-cancelarCifrarCesar").hide();
	}
}

async function descifrarCesar(){
	crearPanelCesarDescifrado();
    var cifrado = ($("#in-txtCifradoCesar").val().toUpperCase()).split("");
    var plano = [];
    var cadenaDescifrado;
    idc = 0;
    for (var i = 0; i <= cifrado.length-1; i++) {
        if(cifrado[i] == ' ') {
           cifrado.splice(i, 1);
        }
    }
    $("#infoAnimacionDeCesar").fadeIn();
    await sleepCesar(tDcAdd);
    for (var m = 0; m <= cifrado.length-1; m++) {
		$("#palabraCesarD").append('<label id="palabra'+m+'D" class="circulo">'+cifrado[m]+'</label>');
    }
    for (var n = 0; n <= cifrado.length-1; n++) {
		$("#palabraDescifradaCesarD").append('<label id="palabraDescifrado'+n+'D" class="circulo">&nbsp;</label>');
    }
    while (idc <= cifrado.length-1) {
		if (abc.indexOf(cifrado[idc])-3 >= 1){
			plano[idc] = abc[abc.indexOf(cifrado[idc])-3];
			numeroElementoCifrado = abc.indexOf(cifrado[idc]);
    		numeroElementoPlano = abc.indexOf(cifrado[idc])-3;
		} else {
			plano[idc] = abc[(abc.indexOf(cifrado[idc])-3)+27].toLowerCase();
			numeroElementoCifrado = abc.indexOf(cifrado[idc]);
    		numeroElementoPlano = (abc.indexOf(cifrado[idc])-3)+27;
		}
		$("#palabraDescifrado"+idc+"D").html(plano[idc].toLowerCase()).show();
    	
    	// ANIMATION
    	$("#infoDeCesar").html('<br><i>'+plano[idc]+'</i><strong> es la letra </strong><i>'+cifrado[idc]+'</i><strong> recorrida tres posiciones</strong>');
    	$("#palabra"+idc+"D").addClass('parpadeo');
    	$("#abcCifrado"+numeroElementoCifrado+"D").addClass('parpadeo');
    	$("#abcPlano"+numeroElementoPlano+"D").addClass('parpadeoNext');
    	$("#palabraDescifrado"+idc+"D").addClass('parpadeoNext');
    	await sleepCesar(tDcAdd);
    	$("#palabra"+idc+"D").removeClass('parpadeo');
    	$("#abcCifrado"+numeroElementoCifrado+"D").removeClass('parpadeo');
    	$("#abcPlano"+numeroElementoPlano+"D").removeClass('parpadeoNext');
    	$("#palabraDescifrado"+idc+"D").removeClass('parpadeoNext');
    	await sleepCesar(tDcRemove);
    	// END ANIMATION
    	idc++;
    }
    if (idc <= cifrado.length && idc!=999) {
	    cadenaDescifrado = plano.join("");
	    $("#out-txtPlanoCesar").val(cadenaDescifrado.toLowerCase());
	    $("#btn-copiarTextoCesar").removeAttr("disabled");
	    toastr.options.timeOut = "1000";
		toastr['success'](mensaje_8);
		$("#btn-descifrarCesar").show();
		$("#btn-tipoDeCesar").show();
		$("#btn-cancelarDescifrarCesar").hide();
	}
}

function cifrarArchivoCesar(evt) {
	var fileInput = document.getElementById('fileInputCesarCifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaCesarCifrado');
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano = "";
	var textoCifrado = "";
	$("#progressbarCesarCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	var abc = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	if(typeof file!=='undefined'){
		if(file.size <= 1024*100){
			if (file.type.match(textType)){
				var reader = new FileReader();
				reader.onload = function(e){
					textoPlano= reader.result;										
					textoPlano= textoPlano.toUpperCase();

					for(i = 0; i < textoPlano.length; i++){
						if (abc.indexOf(textoPlano.charAt(i))>0){
							if(abc.indexOf(textoPlano.charAt(i))+3 <= 27){
								textoCifrado = textoCifrado + abc[abc.indexOf(textoPlano.charAt(i))+3];
							} else {
								textoCifrado = textoCifrado + abc[(abc.indexOf(textoPlano.charAt(i))+3)-27];
							}
						}
						//$("#progressbarCesarCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
					}
					fileDisplayArea.innerText= textoCifrado;
					textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					//PARA DESCARGAR
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
					element.setAttribute('download', "ArchivoCifradoCESAR.txt");
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
					$("#progressbarCesarCifrado").css('width','100%').attr('aria-valuenow', '100');
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

function descifrarArchivoCesar(evt) {
	var fileInput = document.getElementById('fileInputCesarDescifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaCesarDescifrado');
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoCifrado = "";
	var textoPlano = "";
	$("#progressbarCesarDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');

	var abc = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	
	if(typeof file!=='undefined'){
		if(file.size <= 1024*100){
			if (file.type.match(textType)){
				var reader = new FileReader();
				reader.onload = function(e){
					textoCifrado= reader.result;										
					textoCifrado= textoCifrado.toUpperCase();
					
					for(i = 0; i < textoCifrado.length; i++){
						if (abc.indexOf(textoCifrado.charAt(i))>0){
							if(abc.indexOf(textoCifrado.charAt(i))-3 >= 1){
								textoPlano = textoPlano + abc[abc.indexOf(textoCifrado.charAt(i))-3].toLowerCase();
							} else {
								textoPlano = textoPlano + abc[(abc.indexOf(textoCifrado.charAt(i))-3)+27].toLowerCase();
							}
						}
						//$("#progressbarCesarDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
					}
					fileDisplayArea.innerText= textoPlano;
					textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					//PARA DESCARGAR
					var element = document.createElement('a');
					element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
					element.setAttribute('download', "ArchivoDescifradoCESAR.txt");
					element.style.display = 'none';
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
					$("#progressbarCesarDescifrado").css('width','100%').attr('aria-valuenow', '100');
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