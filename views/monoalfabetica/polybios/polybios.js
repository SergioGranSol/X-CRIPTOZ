function sleepPolybios(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var matriz = new Array(6); // crea una matriz de longitud 6
var cancelado = false;
var velocidad = 1;
var azul = 0, negro = 1;
var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

$.fn.scrollViewPolybios = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelPolybios(){
	$("#pnl-Interactivo3").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);

	crearMatriz();
}

function crearPanelCifradoPolybios(){
	var criptograma_length = $('#in-textoPlanoPolybios').val().length * 2;
	
	for (var i = 0 ; i < 6 ; i++) {
		$("#PBrow1").append('<td id="PBcell0'+i+'">' + matriz[0][i] + '</td>');
		$("#PBrow2").append('<td id="PBcell1'+i+'">' + matriz[1][i] + '</td>');
		$("#PBrow3").append('<td id="PBcell2'+i+'">' + matriz[2][i] + '</td>');
		$("#PBrow4").append('<td id="PBcell3'+i+'">' + matriz[3][i] + '</td>');
		$("#PBrow5").append('<td id="PBcell4'+i+'">' + matriz[4][i] + '</td>');
		$("#PBrow6").append('<td id="PBcell5'+i+'">' + matriz[5][i] + '</td>');
	}

	for(var i = 0 ; i < criptograma_length ; i++){
		$('#textoCifradoPolybios').append('<label class="circulo" id="PB-Ccell1'+i+'"></label>');
	}

	$("#PBcell01").addClass('title-table');
	$("#PBcell02").addClass('title-table');
	$("#PBcell03").addClass('title-table');
	$("#PBcell04").addClass('title-table');
	$("#PBcell05").addClass('title-table');
	$("#PBcell10").addClass('title-table');
	$("#PBcell20").addClass('title-table');
	$("#PBcell30").addClass('title-table');
	$("#PBcell40").addClass('title-table');
	$("#PBcell50").addClass('title-table');
	$("#table-polybios").css("text-align","center");
}

function crearPanelDescifradoPolybios(){
	var mensaje_claro_length = $('#in-textoPlanoCifradoPolybios').val().length / 2;
	
	for (var i = 0 ; i < 6 ; i++) {
		$("#PBrow12").append('<td id="PBcell20'+i+'">' + matriz[0][i] + '</td>');
		$("#PBrow22").append('<td id="PBcell21'+i+'">' + matriz[1][i] + '</td>');
		$("#PBrow32").append('<td id="PBcell22'+i+'">' + matriz[2][i] + '</td>');
		$("#PBrow42").append('<td id="PBcell23'+i+'">' + matriz[3][i] + '</td>');
		$("#PBrow52").append('<td id="PBcell24'+i+'">' + matriz[4][i] + '</td>');
		$("#PBrow62").append('<td id="PBcell25'+i+'">' + matriz[5][i] + '</td>');
	}

	for(var i = 0 ; i < mensaje_claro_length ; i++){
		$('#textoDescifradoPolybios').append('<label class="circulo" id="PB-MCcell1'+i+'"></label>');
	}

	$("#PBcell201").addClass('title-table');
	$("#PBcell202").addClass('title-table');
	$("#PBcell203").addClass('title-table');
	$("#PBcell204").addClass('title-table');
	$("#PBcell205").addClass('title-table');
	$("#PBcell210").addClass('title-table');
	$("#PBcell220").addClass('title-table');
	$("#PBcell230").addClass('title-table');
	$("#PBcell240").addClass('title-table');
	$("#PBcell250").addClass('title-table');
	$("#table-polybios2").css("text-align","center");
}

function crearMatriz(){
	for (var i = 0 ; i < 6 ; i++) {
	   matriz[i] = new Array(6);
	}

	matriz[0][0] = ""; matriz[0][1] = "A"; matriz[0][2] = "B"; matriz[0][3] = "C"; matriz[0][4] = "D"; matriz[0][5] = "E";
	matriz[1][0] = "A"; matriz[1][1] = "a"; matriz[1][2] = "b"; matriz[1][3] = "c"; matriz[1][4] = "d"; matriz[1][5] = "e";
	matriz[2][0] = "B"; matriz[2][1] = "f"; matriz[2][2] = "g"; matriz[2][3] = "h"; matriz[2][4] = "i,j"; matriz[2][5] = "k";
	matriz[3][0] = "C"; matriz[3][1] = "l"; matriz[3][2] = "m"; matriz[3][3] = "n,ñ"; matriz[3][4] = "o"; matriz[3][5] = "p";
	matriz[4][0] = "D"; matriz[4][1] = "q"; matriz[4][2] = "r"; matriz[4][3] = "s"; matriz[4][4] = "t"; matriz[4][5] = "u";
	matriz[5][0] = "E"; matriz[5][1] = "v"; matriz[5][2] = "w"; matriz[5][3] = "x"; matriz[5][4] = "y"; matriz[5][5] = "z";
}

function cerrarPanelPolybios(){
	cancelado = true;

	$("#pnl-Interactivo3").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCifradoPolybios();
	limpiaPanelDescifradoPolybios();

	$("#btn-cifrarPolybios").show();
	$("#btn-velocidadCPolybios").show();
	$("#btn-cancelarCifrarPolybios").hide();

	$("#btn-descifrarPolybios").show();
	$("#btn-velocidadDPolybios").show();
	$("#btn-cancelarDescifrarPolybios").hide();

	deleteErrorPolybios("textoPlanoPolybios");
	deleteErrorPolybios("textoPlanoCifradoPolybios");
}

function limpiaPanelCifradoPolybios(){
	$("#PBrow1").empty();
	$("#PBrow2").empty();
	$("#PBrow3").empty();
	$("#PBrow4").empty();
	$("#PBrow5").empty();
	$("#PBrow6").empty();
	$("#textoCifradoPolybios").html("");
	$("#in-textoPlanoPolybios").val("");
	$("#out-textoCifradoPolybios").val("");

	if($('#PBdiv1').is(':visible')) {
		$("#PBdiv1").slideToggle(500);
	}
}

function limpiaPanelDescifradoPolybios(){
	$("#PBrow12").empty();
	$("#PBrow22").empty();
	$("#PBrow32").empty();
	$("#PBrow42").empty();
	$("#PBrow52").empty();
	$("#PBrow62").empty();
	$("#textoDescifradoPolybios").html("");
	$("#in-textoPlanoCifradoPolybios").val("");
	$("#out-textoDescifradoPolybios").val("");

	if($('#PBdiv2').is(':visible')) {
		$("#PBdiv2").slideToggle(500);
	}
}

async function cifrarPolybios(){
	var plano = ($("#in-textoPlanoPolybios").val().toLowerCase().replace(/ /g,"")).split("");
    var cadenaCifrado = "";
    var j = 0, k = 0;

    limpiaPanelCifradoPolybios();
    $("#in-textoPlanoPolybios").val(plano.join(""));

    $('#btn-cancelarCifrarPolybios').scrollViewPolybios();

    $('#PBdiv1').html('Se crea la matriz que contiene al alfabeto (Polybios Square). El orden no importa.');
	$('#PBdiv1').slideToggle(500);
	$('#PBdiv1').scrollViewPolybios();

	if(cancelado){
		return;
	}

	await sleepPolybios(4000);

	if(cancelado){
		return;
	}

	crearPanelCifradoPolybios();
	$('#btn-cancelarCifrarPolybios').scrollViewPolybios();

    $('#PBdiv1').slideToggle(500);

	await sleepPolybios(1000);
	
	$('#PBdiv1').html("El cifrado consiste en sustituir cada letra por la pareja de letras correspondientes al renglón y la columna que definen su posición en la matriz.");
	$('#PBdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPolybios(5000);

	if(cancelado){
		return;
	}

	$('#btn-cancelarCifrarPolybios').scrollViewPolybios();

    for (var i = 0 ; i < plano.length && !cancelado; i++) {
    	var encontrado = 0;
		
		for(j = 1 ; j < 6 && encontrado == 0 ; j++){
			for(k = 1; k < 6 ; k++){
				if(matriz[j][k].includes(plano[i])){
					encontrado = 1;
					break;
				}
			}
		}

		j--;

		cadenaCifrado = cadenaCifrado + matriz[j][0];
    	
    	// ANIMATION

    	putparpadeo("#PBcell"+j+k, 2*velocidad, azul);
    	putparpadeo("#PBcell"+j+0, 1*velocidad, azul);
    	putparpadeo("#PB-Ccell1"+(i*2), 1*velocidad, negro);
    	$("#PB-Ccell1"+(i*2)).html(matriz[j][0]);

    	await sleepPolybios(1000*velocidad);
    	cadenaCifrado = cadenaCifrado + matriz[0][k];

    	removeputparpadeo("#PBcell"+j+0, 1*velocidad, azul);
    	putparpadeo("#PBcell"+0+k, 1*velocidad, azul);
    	removeputparpadeo("#PB-Ccell1"+(i*2), 1*velocidad, negro);
    	putparpadeo("#PB-Ccell1"+(i*2 + 1), 1*velocidad, negro);
    	$("#PB-Ccell1"+(i*2 + 1)).html(matriz[0][k]);
    	await sleepPolybios(1000*velocidad);

    	removeputparpadeo("#PBcell"+j+k, 2*velocidad, azul);
    	removeputparpadeo("#PBcell"+0+k, 1*velocidad, azul);
    	removeputparpadeo("#PB-Ccell1"+(i*2 + 1), 1*velocidad, negro);
    	// END ANIMATION

	    await sleepPolybios(500*velocidad);
    }

    if(cancelado){
		return;
	}

    $("#out-textoCifradoPolybios").val(cadenaCifrado);
    $("#btn-velocidadCPolybios").show();
    $("#btn-cifrarPolybios").show();
	$("#btn-cancelarCifrarPolybios").hide();

	if(!cancelado){
		$('#PBdiv1').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_7);
    }
}

async function descifrarPolybios(){
	var cifrado = ($("#in-textoPlanoCifradoPolybios").val().toUpperCase()).split("");
    var cadenaDescifrado = "";
    var j = 0, k = 0;

    limpiaPanelDescifradoPolybios();
    $("#in-textoPlanoCifradoPolybios").val(cifrado.join(""));

    $('#btn-cancelarDescifrarPolybios').scrollViewPolybios();

    $('#PBdiv2').html('Se crea la matriz que contiene al alfabeto (Polybios Square). Debe ser la misma con la que se realizó el cifrado.');
	$('#PBdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPolybios(5000);
	
	if(cancelado){
		return;
	}

	crearPanelDescifradoPolybios();

    $('#PBdiv2').slideToggle(500);

	await sleepPolybios(1000);
	
	$('#PBdiv2').html("El descifrado consiste en dividir el texto cifrado en grupos de 2 letras, la primera letra indica la fila y la segunda la columna. La letra que se encuentre en esa celda corresponde al texto plano.");
	$('#PBdiv2').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPolybios(6000);

	if(cancelado){
		return;
	}

	$('#btn-cancelarDescifrarPolybios').scrollViewPolybios();

    for (var i = 0 ; i < cifrado.length && !cancelado ; i = i+2) {
    	j = cifrado[i].charCodeAt()-64;
    	k = cifrado[i+1].charCodeAt()-64;

    	if(j >= 1 && j <= 5 && k >= 1 && k <= 5){
    		cadenaDescifrado = cadenaDescifrado + String.fromCharCode(matriz[j][k].charCodeAt());
			
	    	// ANIMATION
	    	putparpadeo("#PBcell2"+j+0, 3*velocidad, azul); //Fila
	    	await sleepPolybios(1000*velocidad);

	    	putparpadeo("#PBcell2"+0+k, 2*velocidad, azul); //Columna
	    	await sleepPolybios(1000*velocidad);
	    	
	    	putparpadeo("#PBcell2"+j+k, 1*velocidad, azul);//Letra
	    	putparpadeo("#PB-MCcell1"+(i/2), 1*velocidad, negro);
	    	$("#PB-MCcell1"+(i/2)).html(String.fromCharCode(matriz[j][k].charCodeAt()));
	    	
			await sleepPolybios(1000*velocidad);
	    	
	    	removeputparpadeo("#PBcell2"+j+0, 3*velocidad, azul);
	    	removeputparpadeo("#PBcell2"+0+k, 2*velocidad, azul);
	    	removeputparpadeo("#PBcell2"+j+k, 1*velocidad, azul);
	    	removeputparpadeo("#PB-MCcell1"+(i/2), 1*velocidad, negro);
	    	// END ANIMATION

	    	await sleepPolybios(500*velocidad);
    	}
    }

    if(cancelado){
		return;
	}
	
	$("#out-textoDescifradoPolybios").val(cadenaDescifrado);
	$("#btn-velocidadDPolybios").show();
    $("#btn-descifrarPolybios").show();
	$("#btn-cancelarDescifrarPolybios").hide();

	if(!cancelado){
		$('#PBdiv2').slideToggle(500);
		toastr.options.timeOut = "1000";
    	toastr['success'](mensaje_8);
    }
}

function validarEntradaCifradoPolybios(){
	var mensaje = "";
	var texto = $('#in-textoPlanoPolybios').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarEntradaDescifradoPolybios(){
	var mensaje = "";
	var texto = $('#in-textoPlanoCifradoPolybios').val();

	if(texto.indexOf(' ') >= 0){
		mensaje = mensaje_4;
	}
	else if (texto.length < 2 || texto.length > 20) {
		mensaje = mensaje_9;
	}
	else if(!texto.match(/^[a-eA-E]+$/)){
		mensaje = mensaje_11;
	}
	else if (texto.length%2 != 0) {
		mensaje = mensaje_10;
	}

	return mensaje;
}

function addErrorPolybios(id, mensaje){
    $("#" + id + "-error").remove();
    $("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorPolybios(id){
    $("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoPolybiosC1").click(function(){
		$("#btn-cifrarPolybios").html('Cifrado Rápido');
		$("#btn-cifrarPolybios").val(1);
	});
	$("#tipoPolybiosC2").click(function(){
		$("#btn-cifrarPolybios").html('Cifrado Normal');
		$("#btn-cifrarPolybios").val(2);
	});
	$("#tipoPolybiosC3").click(function(){
		$("#btn-cifrarPolybios").html('Cifrado Lento&nbsp;');
		$("#btn-cifrarPolybios").val(3);
	});

	$("#tipoPolybiosD1").click(function(){
		$("#btn-descifrarPolybios").html('Descifrado Rápido');
		$("#btn-descifrarPolybios").val(1);
	});
	$("#tipoPolybiosD2").click(function(){
		$("#btn-descifrarPolybios").html('Descifrado Normal');
		$("#btn-descifrarPolybios").val(2);
	});
	$("#tipoPolybiosD3").click(function(){
		$("#btn-descifrarPolybios").html('Descifrado Lento&nbsp;');
		$("#btn-descifrarPolybios").val(3);
	});

	$("#in-textoPlanoPolybios").keyup(function(){
        var mensaje = validarEntradaCifradoPolybios();

        if($("#in-textoPlanoPolybios").val().length == 0){
        	deleteErrorPolybios("textoPlanoPolybios");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorPolybios("textoPlanoPolybios", mensaje);
	        } else{
	            deleteErrorPolybios("textoPlanoPolybios");
	        }
	    }
    });

    $("#in-textoPlanoCifradoPolybios").keyup(function(){
        var mensaje = validarEntradaDescifradoPolybios();

        if($("#in-textoPlanoCifradoPolybios").val().length == 0){
        	deleteErrorPolybios("textoPlanoCifradoPolybios");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorPolybios("textoPlanoCifradoPolybios", mensaje);
	        } else{
	            deleteErrorPolybios("textoPlanoCifradoPolybios");
	        }
	    }
    });

	$("#btn-cifrarPolybios").click(function(){
		var mensaje = validarEntradaCifradoPolybios();

        if(mensaje.length == 0){
            $("#textoPlanoPolybios-error").remove();
            $("#in-textoPlanoPolybios").removeClass('input-error');
            $("#btn-cifrarPolybios").attr("disabled", false);

            if($('#btn-cifrarPolybios').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarPolybios').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCPolybios").hide();
            $("#btn-cifrarPolybios").hide();
            $("#btn-cancelarCifrarPolybios").show();
            cancelado = false;
            
            cifrarPolybios();
        }
        else{
            if(mensaje.length > 0){
                addErrorPolybios("textoPlanoPolybios", mensaje);
                //$("#btn-cifrarPolybios").attr("disabled", true);
            }
        }
	});

	$("#btn-cancelarCifrarPolybios").click(function(){
		cancelado = true;

		limpiaPanelCifradoPolybios();

		$("#btn-cifrarPolybios").show();
		$("#btn-velocidadCPolybios").show();
		$("#btn-cancelarCifrarPolybios").hide();
	});

	$("#btn-cancelarDescifrarPolybios").click(function(){
		cancelado = true;

		limpiaPanelDescifradoPolybios();

		$("#btn-descifrarPolybios").show();
		$("#btn-velocidadDPolybios").show();
		$("#btn-cancelarDescifrarPolybios").hide();
	});

	$("#btn-copiarTextoPolybios").click(function(){
		if ($("#out-textoCifradoPolybios").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-textoPlanoCifradoPolybios").val($("#out-textoCifradoPolybios").val());

            if(validarEntradaDescifradoPolybios().length == 0){
                $("#textoPlanoCifradoPolybios-error").remove();
                $("#in-textoPlanoCifradoPolybios").removeClass('input-error');
            }

            if(habilitarDescifradoPolybios()){
                $("#btn-descifrarPolybios").attr("disabled", false);
            }
		}
	});

	$("#btn-descifrarPolybios").click(function(){
		var mensaje = validarEntradaDescifradoPolybios();

        if(mensaje.length == 0){
            $("#textoPlanoCifradoPolybios-error").remove();
            $("#in-textoPlanoCifradoPolybios").removeClass('input-error');
            $("#btn-descifrarPolybios").attr("disabled", false);

            if($('#btn-descifrarPolybios').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarPolybios').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDPolybios").hide();
            $("#btn-descifrarPolybios").hide();
            $("#btn-cancelarDescifrarPolybios").show();
            cancelado = false;
            
            descifrarPolybios();
        }
        else{
            if(mensaje.length > 0){
                addErrorPolybios("textoPlanoCifradoPolybios", mensaje);
                //$("#btn-descifrarPolybios").attr("disabled", true);
            }
        }
	});
/*
	var textoDescifrado= "\ufeff";

	for(var i = 0 ; i < 1024*100+1 ; i++){
		textoDescifrado = textoDescifrado + alfabeto[i%alfabeto.length];
	}

	var file = new File([textoDescifrado], "prueba100kb+1.txt", {type: "text/plain;charset=ISO-8859-1"});
	saveAs(file);*/
});

function cifrarArchivoPolybios(evt) {
	var fileInput = document.getElementById('fileInputCPolybios');
	var fileDisplayArea = $('#fileDisplayAreaCPolybios');
	
	var file = fileInput.files[0];
    var textType = /text.*/;
	var textoPlano = "", textoCifrado = "";	
	$("#progressbarPolybiosCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');
	
	if (file.type.match(textType)) {
		 if(file.size <= 1024*100){
			var reader = new FileReader();

			crearMatriz();

			reader.onload = function(e) {
				var j = 0, k = 0;
				var encontrado = 0;
				
				textoPlano = reader.result;										
				textoPlano = textoPlano.toLowerCase();

				for(var i = 0 ; i < textoPlano.length ; i++) {
					if(alfabeto.includes(textoPlano.charAt(i))){
						encontrado = 0;

						for(j = 1 ; j < 6 && encontrado == 0 ; j++){
							for(k = 1; k < 6 ; k++){
								if(matriz[j][k].includes(textoPlano.charAt(i))) {
									encontrado = 1;
									break;
								}
							}
						}

						j--;

						textoCifrado = textoCifrado + matriz[j][0] + matriz[0][k];
					}
					//$("#progressbarPolybiosCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
				}
				
				fileDisplayArea.html(textoCifrado);
				textoCifrado= "\ufeff"+textoCifrado;

				//PARA DESCARGAR
				var file = new File([textoCifrado], "ArchivoCifradoPOLYBIOS.txt", {type: "text/plain;charset=ISO-8859-1"});
				saveAs(file);
				$("#progressbarPolybiosCifrado").css('width','100%').attr('aria-valuenow', '100');
			}

			reader.readAsText(file, 'ISO-8859-1');
        }
        else{
            fileDisplayArea.html(mensaje_90);
        }
	}
	else {
		fileDisplayArea.html(mensaje_89);
	}
}

function descifrarArchivoPolybios(evt) {
	var fileInput = document.getElementById('fileInputDPolybios');
	var fileDisplayArea = $('#fileDisplayAreaDPolybios');
	
	var file = fileInput.files[0];
    var textType = /text.*/;
	var textoCifrado = "", textoDescifrado = "";
	$("#progressbarPolybiosDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');

	if (file.type.match(textType)) {
		if(file.size <= 1024*100*2){
			var reader = new FileReader();

			crearMatriz();

			reader.onload = function(e) {
				var j = 0, k = 0;
				var encontrado = 0;
				
				textoCifrado = reader.result;										
				textoCifrado = textoCifrado.toUpperCase();

				for(var i = 0 ; i < textoCifrado.length ; i++) {
					if(textoCifrado.charAt(i).match(/[a-eA-E]$/) && textoCifrado.charAt(i+1).match(/[a-eA-E]$/)){
						j = textoCifrado[i].charCodeAt()-64;
				    	k = textoCifrado[i+1].charCodeAt()-64;

				    	if(j >= 1 && j <= 5 && k >= 1 && k <= 5){
				    		textoDescifrado = textoDescifrado + matriz[j][k].charAt();
				    	}

				    	i++;
					}
					//$("#progressbarPolybiosDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
				}
				
				fileDisplayArea.html(textoDescifrado);
				textoDescifrado= "\ufeff"+textoDescifrado;

				var file = new File([textoDescifrado], "ArchivoDescifradoPOLYBIOS.txt", {type: "text/plain;charset=ISO-8859-1"});
				saveAs(file);
				$("#progressbarPolybiosDescifrado").css('width','100%').attr('aria-valuenow', '100');
			}

			reader.readAsText(file, 'ISO-8859-1');
        }
        else{
            fileDisplayArea.html(mensaje_91);
        }
	}
	else{
		fileDisplayArea.html(mensaje_89);
	}
}