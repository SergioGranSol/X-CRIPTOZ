function sleepColumnas(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var cols = 0, rows = 0;
var matriz = [];
var cancelado = false;
var velocidad = 1;
var azul = 0, negro = 1;
var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

$.fn.scrollViewColumnas = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelTransposicionColumnas(){
	$("#pnl-Interactivo5").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function crearPanelCifradoTransposicionColumas(){
	for(var i = 0 ; i < rows ; i++){
		$("#table-transposicionColumnas").append('<tr id="TCrow'+i+'"></tr>');
	}
	
	for(var i = 0 ; i < rows*cols/2 ; i++){
        $('#textoCifradoColumnas').append('<label class="circulo" id="TC-Ccell1'+i+'"></label>');
    }

	$("#table-transposicionColumnas").css("text-align","center");
}

function crearPanelDescifradoTransposicionColumas(){
	for(var i = 0 ; i < rows ; i++){
		$("#table-transposicionColumnas2").append('<tr id="TCrow2'+i+'"></tr>');
	}

	for(var i = 0 ; i < rows*cols/2 ; i++){
        $('#textoDescifradoColumnas').append('<label class="circulo" id="TC-MCcell1'+i+'"></label>');
    }

	$("#table-transposicionColumnas2").css("text-align","center");
}

function cerrarPanelTransposicionColumnas(){
	cancelado = true;

	$("#pnl-Interactivo5").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);

	limpiaPanelCifradoTransposicionColumnas();
	limpiaPanelDescifradoTransposicionColumnas();

	$("#btn-cifrarColumnas").show();
	$("#btn-velocidadCColumnas").show();
	$("#btn-cancelarCifrarColumnas").hide();

	$("#btn-descifrarColumnas").show();
	$("#btn-velocidadDColumnas").show();
	$("#btn-cancelarDescifrarColumnas").hide();

	deleteErrorTransposicionColumnas("textoPlanoTransposicionColumnas");
	deleteErrorTransposicionColumnas("llaveCifradoTransposicionColumnas");
	deleteErrorTransposicionColumnas("textoPlanoCifradoTransposicionColumnas");
	deleteErrorTransposicionColumnas("llaveDescifradoTransposicionColumnas");
}

function limpiaPanelCifradoTransposicionColumnas(){
	$("#table-transposicionColumnas").empty();
	$('#textoCifradoColumnas').empty();
	$("#in-textoPlanoTransposicionColumnas").val("");
	$('#in-llaveCifradoTransposicionColumnas').val("");
	$("#out-textoCifradoTransposicionColumnas").val("");

	if($('#TCdiv1').is(':visible')) {
        $("#TCdiv1").slideToggle(500);
    }
}

function limpiaPanelDescifradoTransposicionColumnas(){
	$("#table-transposicionColumnas2").empty();
	$('#textoDescifradoColumnas').empty();
	$("#in-textoPlanoCifradoTransposicionColumnas").val("");
	$('#in-llaveDescifradoTransposicionColumnas').val("");
	$("#out-textoDescifradoTransposicionColumnas").val("");

	if($('#TCdiv2').is(':visible')) {
        $("#TCdiv2").slideToggle(500);
    }
}

function burbuja(llave){
	var aux;
	var ordenados = new Array(llave.length);

	for(var i = 0 ; i < llave.length ; i++){
		ordenados[i] = i;
	}

	for(var i = 0 ; i < (llave.length-1) ; i++){
	    for(j = 0 ; j < (llave.length-i) ; j++){
	        if(llave[j] > llave[j+1]){
				aux = llave[j];
				llave[j] = llave[j+1];
				llave[j+1] = aux;

				aux = ordenados[j];
				ordenados[j] = ordenados[j+1];
				ordenados[j+1] = aux;
	        }
 		}
    }

    return ordenados;
}

async function cifrarTransposicionColumnas(){
	var plano = ($("#in-textoPlanoTransposicionColumnas").val().toLowerCase().replace(/ /g,"")).split("");
    var llave = ($("#in-llaveCifradoTransposicionColumnas").val().toLowerCase().replace(/ /g,"")).split("");
    var texto_length = plano.length;

    var cadenaCifrado = "";
    var k = 0, l = 0;
    var matriz = new Array(12);
    var orden;
    
    limpiaPanelCifradoTransposicionColumnas();
    $("#in-textoPlanoTransposicionColumnas").val(plano.join(""));
    $("#in-llaveCifradoTransposicionColumnas").val(llave.join(""));

	cols = llave.length;
	rows = (((texto_length/cols - Math.round(texto_length/cols)) < 0.5 && (texto_length/cols - Math.round(texto_length/cols)) > 0)?Math.round(texto_length/cols)+1:Math.round(texto_length/cols)) + 2;

	crearPanelCifradoTransposicionColumas();

	$('#TCdiv1').html('Se toman los caracteres que conforman la llave y se enumeran por orden alfabético: a=0 , b=1, ... , z=26.');
	$('#TCdiv1').slideToggle(500);

	if(cancelado){
        return;
    }

    await sleepColumnas(4000);
	
	if(cancelado){
        return;
    }

    $('#TCdiv1').scrollViewColumnas();

	for (var i = 0 ; i < rows && !cancelado ; i++) {
		for(var j = 0 ; j < cols && !cancelado ; j++){
			$("#TCrow"+i).append('<td id="TCcell' + i + '-' + j + '"></td>');
		}
	}

	if(cancelado){
        return;
    }

	for(var i = 0 ; i < cols && !cancelado ; i++){
		$("#TCcell0-"+i).addClass('title-table');
		$("#TCcell1-"+i).addClass('title-table2');
	}

	if(cancelado){
        return;
    }

	orden = new Array(cols);

	for (var i = 0 ; i < 12 && !cancelado ; i++) {
	   matriz[i] = new Array(cols);
	}

	if(cancelado){
        return;
    }

	//Colocar Llave
	for(var i = 0 ; i < cols && !cancelado ; i++){
		$("#TCcell0-"+i).html(llave[i]);
		putparpadeo("#TCcell0-"+i, 1*velocidad, azul);

		await sleepColumnas(1000*velocidad);

		removeputparpadeo("#TCcell0-"+i, 1*velocidad, azul);
	}

	for(var i = 0 ; i < cols && !cancelado ; i++){
		$("#TCcell1-"+i).html(alfabeto.indexOf(llave[i]));

		putparpadeo("#TCcell1-"+i, 1*velocidad, azul);

		await sleepColumnas(1000*velocidad);

		removeputparpadeo("#TCcell1-"+i, 1*velocidad, azul);

		matriz[1][i] = alfabeto.indexOf(llave[i]);
	}

	if(cancelado){
        return;
    }

	orden = burbuja(matriz[1]);

	$('#TCdiv1').slideToggle(500);
    
    if(cancelado){
        return;
    }

    await sleepColumnas(1000);

    if(cancelado){
        return;
    }

    $('#TCdiv1').html('El mensaje en claro se reescribe debajo de la llave enumerada formando varios renglones. Se usa la letra X para completar un renglón.');
	$('#TCdiv1').slideToggle(500);

	if(cancelado){
        return;
    }

    await sleepColumnas(5000);
	
	if(cancelado){
        return;
    }

    $('#TCdiv1').scrollViewColumnas();

	for(var i = 2 ; i < rows && !cancelado ; i++){
		for(var j = 0 ; j < cols && !cancelado ; j++){
			if(plano[k] != undefined){
				$("#TCcell"+i+"-"+j).html(plano[k]);

				putparpadeo("#TCcell"+i+"-"+j, 1*velocidad, azul);

				await sleepColumnas(1000*velocidad);

				removeputparpadeo("#TCcell"+i+"-"+j, 1*velocidad, azul);

				matriz[i][j] = plano[k++];
			}
			else{
				$("#TCcell"+i+"-"+j).html("X");

				putparpadeo("#TCcell"+i+"-"+j, 1*velocidad, azul);

				await sleepColumnas(1000*velocidad);

				removeputparpadeo("#TCcell"+i+"-"+j, 1*velocidad, azul);

				matriz[i][j] = "x";	
			}
		}
	}

	$('#TCdiv1').slideToggle(500);
    
    if(cancelado){
        return;
    }

    await sleepColumnas(1000);

    if(cancelado){
        return;
    }

    $('#TCdiv1').html('El texto cifrado se obtiene escribiendo columna por columna en orden numérico.');
	$('#TCdiv1').slideToggle(500);

	if(cancelado){
        return;
    }

    await sleepColumnas(4000);
	
	if(cancelado){
        return;
    }
    $('#TCdiv1').scrollViewColumnas();

	for(var i = 0 ; i < cols && !cancelado ; i++){
		//$("#TCcell0-"+orden[i]).addClass('seleccionado');
		$("#TCcell1-"+orden[i]).addClass('seleccionado');

		for(var j = 2 ; j < rows && !cancelado ; j++){
			cadenaCifrado = cadenaCifrado + matriz[j][orden[i]].toUpperCase();

			putparpadeo("#TCcell"+j+"-"+orden[i], 1*velocidad, azul);
			putparpadeo("#TC-Ccell1"+l, 1*velocidad,negro);
        	$("#TC-Ccell1"+l).html(matriz[j][orden[i]].toUpperCase());

			await sleepColumnas(1000*velocidad);

			removeputparpadeo("#TCcell"+j+"-"+orden[i], 1*velocidad, azul);
			removeputparpadeo("#TC-Ccell1"+l, 1*velocidad,negro);
			l++;
		}

		//$("#TCcell0-"+orden[i]).removeClass('seleccionado');
		$("#TCcell1-"+orden[i]).removeClass('seleccionado');
	}

	if(cancelado){
        return;
    }

    $("#out-textoCifradoTransposicionColumnas").val(cadenaCifrado);
    $("#btn-velocidadCTransposicionColumnas").show();
    $("#btn-cifrarColumnas").show();
    $("#btn-cancelarCifrarColumnas").hide();

    if(!cancelado){
        $('#TCdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        cancelado = true;
    }
}

async function descifrarTransposicionColumnas(){
	var cifrado = ($("#in-textoPlanoCifradoTransposicionColumnas").val().toUpperCase()).split("");
    var llave = ($("#in-llaveDescifradoTransposicionColumnas").val().toUpperCase()).split("");
    var texto_length = cifrado.length;

    var cadenaDescifrado = "";
    var k = 0, l = 0;
    var matriz = new Array(12);
    var orden;
    
	limpiaPanelDescifradoTransposicionColumnas();
	$("#in-textoPlanoCifradoTransposicionColumnas").val(cifrado.join(""));
	$("#in-llaveDescifradoTransposicionColumnas").val(llave.join(""));

	cols = $('#in-llaveDescifradoTransposicionColumnas').val().split("").length;
	rows = (((texto_length/cols - Math.round(texto_length/cols)) < 0.5 && (texto_length/cols - Math.round(texto_length/cols)) > 0)?Math.round(texto_length/cols)+1:Math.round(texto_length/cols)) + 2;
	
	crearPanelDescifradoTransposicionColumas();

	if(cancelado){
        return;
    }

    $('#TCdiv2').html('Se toman los caracteres que conforman la llave y se enumeran por orden alfabético: a=0 , b=1, ..., z=26.');
	$('#TCdiv2').slideToggle(500);

	if(cancelado){
        return;
    }

    await sleepColumnas(6000);
	
	if(cancelado){
        return;
    }

    $('#TCdiv2').scrollViewColumnas();

	if(cancelado){
        return;
    }

    for (var i = 0 ; i < rows && !cancelado ; i++) {
		for(var j = 0 ; j < cols && !cancelado ; j++){
			$("#TCrow2"+i).append('<td id="TCcell2' + i + '-' + j + '"></td>');
		}
	}

	if(cancelado){
        return;
    }

	for(var i = 0 ; i < cols && !cancelado ; i++){
		$("#TCcell20-"+i).addClass('title-table');
		$("#TCcell21-"+i).addClass('title-table2');
	}

	if(cancelado){
        return;
    }

	orden = new Array(cols);

	if(cancelado){
        return;
    }

    for (var i = 0 ; i < 12 && !cancelado ; i++) {
	   matriz[i] = new Array(cols);
	}

	if(cancelado){
        return;
    }

	//Colocar Llave
	for(var i = 0 ; i < cols && !cancelado; i++){
		$("#TCcell20-"+i).html(llave[i]);
		putparpadeo("#TCcell20-"+i, 1*velocidad, azul);

		await sleepColumnas(1000*velocidad);

		removeputparpadeo("#TCcell20-"+i, 1*velocidad, azul);
	}

	if(cancelado){
        return;
    }

	for(var i = 0 ; i < cols && !cancelado ; i++){
		$("#TCcell21-"+i).html(alfabeto.indexOf(llave[i].toLowerCase()));
		putparpadeo("#TCcell21-"+i, 1*velocidad, azul);

		await sleepColumnas(1000*velocidad);

		removeputparpadeo("#TCcell21-"+i, 1*velocidad, azul);

		matriz[1][i] = alfabeto.indexOf(llave[i].toLowerCase());
	}

	if(cancelado){
        return;
    }

	orden = burbuja(matriz[1]);

	$('#TCdiv2').slideToggle(500);
    
    if(cancelado){
        return;
    }

    await sleepColumnas(1000);

    if(cancelado){
        return;
    }

    $('#TCdiv2').html('Debajo de la llave se escribe el texto cifrado por columnas en orden númerico. Se escriben "n" caracteres en cada columna (n = texto cifrado/llave = '+cifrado.length+'/'+llave.length+'= '+(cifrado.length/llave.length)+').');
	$('#TCdiv2').slideToggle(500);

	if(cancelado){
        return;
    }

    await sleepColumnas(7000);
	
	if(cancelado){
        return;
    }

    $('#TCdiv2').scrollViewColumnas();

	if(cancelado){
        return;
    }

    for(var i = 0 ; i < cols && !cancelado ; i++){
    	$("#TCcell21-"+orden[i]).addClass('seleccionado');

		for(var j = 2 ; j < rows && !cancelado ; j++){
			$("#TCcell2"+j+"-"+orden[i]).html(cifrado[k]);

			putparpadeo("#TCcell2"+j+"-"+orden[i], 1*velocidad, azul);

			await sleepColumnas(1000*velocidad);

			removeputparpadeo("#TCcell2"+j+"-"+orden[i], 1*velocidad, azul);

			matriz[j][orden[i]] = cifrado[k++];
		}

		$("#TCcell21-"+orden[i]).removeClass('seleccionado');
	}

	if(cancelado){
        return;
    }

	$('#TCdiv2').slideToggle(500);
    
    if(cancelado){
        return;
    }

    await sleepColumnas(1000);

    if(cancelado){
        return;
    }

    $('#TCdiv2').html('El mensaje en claro se obtiene leyendo fila por fila.');
	$('#TCdiv2').slideToggle(500);

	if(cancelado){
        return;
    }

    await sleepColumnas(4000);
	
	if(cancelado){
        return;
    }

    $('#TCdiv2').scrollViewColumnas();

	for(var i = 2 ; i < rows && !cancelado ; i++){
		for(var j = 0 ; j < cols && !cancelado; j++){
			cadenaDescifrado = cadenaDescifrado + matriz[i][j].toLowerCase();

			putparpadeo("#TCcell2"+i+"-"+j, 1*velocidad, azul);
			putparpadeo("#TC-MCcell1"+l, 1*velocidad, negro);
            $("#TC-MCcell1"+l).html(matriz[i][j].toLowerCase());

			await sleepColumnas(1000*velocidad);

			removeputparpadeo("#TCcell2"+i+"-"+j, 1*velocidad, azul);
			removeputparpadeo("#TC-MCcell1"+l, 1*velocidad, negro);
			l++;
		}
	}

	if(cancelado){
        return;
    }

    $("#out-textoDescifradoTransposicionColumnas").val(cadenaDescifrado);
    $("#btn-velocidadDTransposicionColumnas").show();
    $("#btn-descifrarColumnas").show();
    $("#btn-cancelarDescifrarColumnas").hide();

    if(!cancelado){
        $('#TCdiv2').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
    }
}

function validarEntradaTextoCTransposicionColumnas(){
	var mensaje = "";
	var texto = $('#in-textoPlanoTransposicionColumnas').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarEntradaLlaveCTransposicionColumnas(){
	var mensaje = "";
	var llave = $('#in-llaveCifradoTransposicionColumnas').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if (llave.length < 1 || llave.length > 10) {
		mensaje = mensaje_19;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaTextoDTransposicionColumnas(){
	var mensaje = "";
	var texto = $('#in-textoPlanoCifradoTransposicionColumnas').val();
	var llave = $('#in-llaveDescifradoTransposicionColumnas').val();

	if(texto.indexOf(' ') >= 0){
		mensaje = mensaje_4;
	}
	else if (texto.length < 1 || texto.length > 18) {
		mensaje = mensaje_150;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_5;
	}
	else if(texto.length%llave.length != 0){
		mensaje = mensaje_27;
	}

	return mensaje;
}

function validarEntradaLlaveDTransposicionColumnas(){
	var mensaje = "";
	var llave = $('#in-llaveDescifradoTransposicionColumnas').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if (llave.length < 1 || llave.length > 10) {
		mensaje = mensaje_19;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaLlaveCArchivoColumnas(){
	var mensaje = "";
	var llave = $('#in-llaveCifradoArchivoColumnas').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if(llave.length < 1 || llave.length > 1000){
		mensaje = mensaje_95;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaCArchivoColumnas(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputCColumnas');
	var file;
	
	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = mensaje_89;
		}
		else if(file.size > 1024*100){
			mensaje = mensaje_90;
		}
	}

	return mensaje;
}

function validarEntradaLlaveDArchivoColumnas(){
	var mensaje = "";
	var llave = $('#in-llaveDescifradoArchivoColumnas').val();

	if(llave.indexOf(' ') >= 0){
		mensaje = mensaje_14;
	}
	else if(llave.length < 1 || llave.length > 1000){
		mensaje = mensaje_95;
	}
	else if(!llave.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_13;
	}

	return mensaje;
}

function validarEntradaDArchivoColumnas(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputDColumnas');
	var file;

	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = mensaje_89;
		}
		if(file.size > 1024*200){
			mensaje = mensaje_91;
		}
	}

	return mensaje;
}

function addErrorTransposicionColumnas(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorTransposicionColumnas(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoTransposicionColumnasC1").click(function(){
        $("#btn-cifrarColumnas").html('Cifrado Rápido');
        $("#btn-cifrarColumnas").val(1);
    });
    $("#tipoTransposicionColumnasC2").click(function(){
        $("#btn-cifrarColumnas").html('Cifrado Normal');
        $("#btn-cifrarColumnas").val(2);
    });
    $("#tipoTransposicionColumnasC3").click(function(){
        $("#btn-cifrarColumnas").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarColumnas").val(3);
    });

    $("#tipoTransposicionColumnasD1").click(function(){
        $("#btn-descifrarColumnas").html('Descifrado Rápido');
        $("#btn-descifrarColumnas").val(1);
    });
    $("#tipoTransposicionColumnasD2").click(function(){
        $("#btn-descifrarColumnas").html('Descifrado Normal');
        $("#btn-descifrarColumnas").val(2);
    });
    $("#tipoTransposicionColumnasD3").click(function(){
        $("#btn-descifrarColumnas").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarColumnas").val(3);
    });

    $("#in-textoPlanoTransposicionColumnas").keyup(function(){
        var mensaje = validarEntradaTextoCTransposicionColumnas();

        if($("#in-textoPlanoTransposicionColumnas").val().length == 0){
        	deleteErrorTransposicionColumnas("textoPlanoTransposicionColumnas");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorTransposicionColumnas("textoPlanoTransposicionColumnas", mensaje);
	        } else{
	            deleteErrorTransposicionColumnas("textoPlanoTransposicionColumnas");
	        }
	    }
    });

    $("#in-llaveCifradoTransposicionColumnas").keyup(function(){
        var mensaje = validarEntradaLlaveCTransposicionColumnas();

        if($("#in-llaveCifradoTransposicionColumnas").val().length == 0){
        	deleteErrorTransposicionColumnas("llaveCifradoTransposicionColumnas");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorTransposicionColumnas("llaveCifradoTransposicionColumnas", mensaje);
	        } else{
	            deleteErrorTransposicionColumnas("llaveCifradoTransposicionColumnas");
	        }
	    }
    });

    $("#in-textoPlanoCifradoTransposicionColumnas").keyup(function(){
        var mensaje = validarEntradaTextoDTransposicionColumnas();

        if($("#in-textoPlanoCifradoTransposicionColumnas").val().length == 0){
        	deleteErrorTransposicionColumnas("textoPlanoCifradoTransposicionColumnas");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorTransposicionColumnas("textoPlanoCifradoTransposicionColumnas", mensaje);
	        } else{
	            deleteErrorTransposicionColumnas("textoPlanoCifradoTransposicionColumnas");
	        }
	    }
    });

    $("#in-llaveDescifradoTransposicionColumnas").keyup(function(){
        var mensaje = validarEntradaLlaveDTransposicionColumnas();

        if($("#in-llaveDescifradoTransposicionColumnas").val().length == 0){
        	deleteErrorTransposicionColumnas("llaveDescifradoTransposicionColumnas");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorTransposicionColumnas("llaveDescifradoTransposicionColumnas", mensaje);
	        } else{
	            deleteErrorTransposicionColumnas("llaveDescifradoTransposicionColumnas");

	            if(validarEntradaTextoDTransposicionColumnas().length == 0)
	            	deleteErrorTransposicionColumnas("textoPlanoCifradoTransposicionColumnas");
	        }
	    }
    });

    $("#in-llaveCifradoArchivoColumnas").keyup(function(){
        var mensaje = validarEntradaLlaveCArchivoColumnas();

        if($("#in-llaveCifradoArchivoColumnas").val().length == 0){
        	deleteErrorTransposicionColumnas("llaveCifradoArchivoColumnas");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorTransposicionColumnas("llaveCifradoArchivoColumnas", mensaje);
	        } else{
	            deleteErrorTransposicionColumnas("llaveCifradoArchivoColumnas");
	        }
	    }
    });

    $("#fileInputCColumnas").change(function(){
        var mensaje = validarEntradaCArchivoColumnas();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaCColumnas').html(mensaje);
        } else{
            $('#fileDisplayAreaCColumnas').html();
        }
    });

    $("#in-llaveDescifradoArchivoColumnas").keyup(function(){
        var mensaje = validarEntradaLlaveDArchivoColumnas();

        if($("#in-llaveDescifradoArchivoColumnas").val().length == 0){
        	deleteErrorTransposicionColumnas("llaveDescifradoArchivoColumnas");
        }
        else{
	        if (mensaje.length != 0) {
	            addErrorTransposicionColumnas("llaveDescifradoArchivoColumnas", mensaje);
	        } else{
	            deleteErrorTransposicionColumnas("llaveDescifradoArchivoColumnas");
	        }
	    }
    });

    $("#fileInputDColumnas").keyup(function(){
        var mensaje = validarEntradaDArchivoColumnas();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaDColumnas').html(mensaje);
        } else{
            $('#fileDisplayAreaDColumnas').html();
        }
    });

	$("#btn-cifrarColumnas").click(function(){
		var mensajetexto = validarEntradaTextoCTransposicionColumnas();
		var mensajellave = validarEntradaLlaveCTransposicionColumnas();

		if(mensajetexto.length == 0 && mensajellave.length == 0){
			$("#textoPlanoTransposicionColumnas-error").remove();
            $("#llaveCifradoTransposicionColumnas-error").remove();
            $("#in-textoPlanoTransposicionColumnas").removeClass('input-error');
            $("#in-llaveCifradoTransposicionColumnas").removeClass('input-error');

            if($('#btn-cifrarColumnas').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarColumnas').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCTransposicionColumnas").hide();
            $("#btn-cifrarColumnas").hide();
            $("#btn-cancelarCifrarColumnas").show();
            cancelado = false;
            
            cifrarTransposicionColumnas();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorTransposicionColumnas("textoPlanoTransposicionColumnas", mensajetexto);
			}
			if(mensajellave.length > 0){
				addErrorTransposicionColumnas("llaveCifradoTransposicionColumnas", mensajellave);
			}
		}
	});

	$("#btn-cancelarCifrarColumnas").click(function(){
        cancelado = true;

        limpiaPanelCifradoTransposicionColumnas();

        $("#btn-cifrarColumnas").show();
        $("#btn-velocidadCTransposicionColumnas").show();
        $("#btn-cancelarCifrarColumnas").hide();
    });

    $("#btn-cancelarDescifrarColumnas").click(function(){
        cancelado = true;

        limpiaPanelDescifradoTransposicionColumnas();

        $("#btn-descifrarColumnas").show();
        $("#btn-velocidadDTransposisionColumnas").show();
        $("#btn-cancelarDescifrarColumnas").hide();
    });

    $("#btn-copiarTextoColumnas").click(function(){
        if ($("#out-textoCifradoTransposicionColumnas").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-textoPlanoCifradoTransposicionColumnas").val($("#out-textoCifradoTransposicionColumnas").val());
			$("#in-llaveDescifradoTransposicionColumnas").val($("#in-llaveCifradoTransposicionColumnas").val());

			if(validarEntradaTextoDTransposicionColumnas().length == 0){
				$("#textoPlanoCifradoTransposicionColumnas-error").remove();
	            $("#in-textoPlanoCifradoTransposicionColumnas").removeClass('input-error');
	        }

	        if (validarEntradaLlaveDTransposicionColumnas().length == 0){
	        	$("#llaveDescifradoTransposicionColumnas-error").remove();
	            $("#in-llaveDescifradoTransposicionColumnas").removeClass('input-error');
	        }
		}
    });

    $("#btn-descifrarColumnas").click(function(){
        var mensajetexto = validarEntradaTextoDTransposicionColumnas();
		var mensajellave = validarEntradaLlaveDTransposicionColumnas();

		if(mensajetexto.length == 0 && mensajellave.length == 0){
			$("#textoPlanoCifradoTransposicionColumnas-error").remove();
            $("#llaveDescifradoTransposicionColumnas-error").remove();
            $("#in-textoPlanoCifradoTransposicionColumnas").removeClass('input-error');
            $("#in-llaveDescifradoTransposicionColumnas").removeClass('input-error');

            if($('#btn-descifrarColumnas').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarColumnas').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDTransposicionColumnas").hide();
            $("#btn-descifrarColumnas").hide();
            $("#btn-cancelarDescifrarColumnas").show();
            cancelado = false;
            
            descifrarTransposicionColumnas();
		}
		else{
			if(mensajetexto.length > 0){
				addErrorTransposicionColumnas("textoPlanoCifradoTransposicionColumnas", mensajetexto);
			}
			if(mensajellave.length > 0){
				addErrorTransposicionColumnas("llaveDescifradoTransposicionColumnas", mensajellave);
			}
		}
    });

    $("#btn-cifrarArchivoColumnas").click(function(){
		var mensajellave = validarEntradaLlaveCArchivoColumnas();
		var mensajearchivo = validarEntradaCArchivoColumnas();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llaveCifradoArchivoColumnas-error").remove();
            $("#in-llaveCifradoArchivoColumnas").removeClass('input-error');

            cifrarArchivoColumnas();
		}
		else{
			if(mensajellave.length > 0){
				addErrorTransposicionColumnas("llaveCifradoArchivoColumnas", mensajellave);
			}

			if(mensajearchivo.length > 0){
				$('#fileDisplayAreaCColumnas').html(mensajearchivo);
			}
		}
	});

	$("#btn-descifrarArchivoColumnas").click(function(){
		var mensajellave = validarEntradaLlaveDArchivoColumnas();
		var mensajearchivo = validarEntradaDArchivoColumnas();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llaveDescifradoArchivoColumnas-error").remove();
            $("#in-llaveDescifradoArchivoColumnas").removeClass('input-error');

            descifrarArchivoColumnas();
		}
		else{
			if(mensajellave.length > 0){
				addErrorTransposicionColumnas("llaveDescifradoArchivoColumnas", mensajellave);
			}

			if(mensajearchivo.length > 0){
				$('#fileDisplayAreaDColumnas').html(mensajearchivo);
			}
		}
	});
});

function cifrarArchivoColumnas(evt) {
	var fileInput = document.getElementById('fileInputCColumnas');
	var fileDisplayArea = $('#fileDisplayAreaCColumnas');
	var llave = $("#in-llaveCifradoArchivoColumnas").val().toLowerCase().split("");
	
	var textoPlano = "", textoCifrado = "", aux = "";
	$("#progressbarColumnasCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaCColumnas').html(mensaje_92);
		return;
	}
	
	var file = fileInput.files[0];
    var reader = new FileReader();

	reader.onload = function(e) {
		var cols = 0, rows = 0;

		textoPlano = reader.result.toLowerCase();
		
		cols = llave.length;

		while(textoPlano.length%cols != 0){
			textoPlano = textoPlano + "X";
		}

		rows = textoPlano.length / cols;

		for(var i = 0 ; i < llave.length ; i++){
			llave[i] = alfabeto.indexOf(llave[i]);
		}

		llave = burbuja(llave);

		for(var i = 0 ; i < cols ; i++) {
			for(var j = 0 ; j < rows ; j++){
				textoCifrado = textoCifrado + textoPlano.charAt(llave[i] + cols*j);
			}
			//$("#progressbarColumnasCifrado").removeClass("notransition").css('width',((i*100)/cols)+'%').attr('aria-valuenow', (i*100)/cols);
		}
		
		textoCifrado = textoCifrado.toUpperCase();
		
		fileDisplayArea.html(textoCifrado);
		textoCifrado= "\ufeff"+textoCifrado;
		
		//PARA DESCARGAR
		var file = new File([textoCifrado], "ArchivoCifradoCOLUMNAS.txt", {type: "text/plain;charset=ISO-8859-1"});
		saveAs(file);
		$("#progressbarColumnasCifrado").css('width','100%').attr('aria-valuenow', '100');
	}

	reader.readAsText(file, 'ISO-8859-1');
}

function descifrarArchivoColumnas(evt) {
	var fileInput = document.getElementById('fileInputDColumnas');
	var fileDisplayArea = $('#fileDisplayAreaDColumnas');
	var llave = $("#in-llaveDescifradoArchivoColumnas").val().toLowerCase().split("");
	
	var textoCifrado = "", textoDescifrado = "";
	$("#progressbarColumnasDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaDColumnas').html(mensaje_93);
		return;
	}

	var file = fileInput.files[0];
	var reader = new FileReader();

	reader.onload = function(e) {
		if(reader.result.length%llave.length != 0){
			$('#fileDisplayAreaDColumnas').html(mensaje_152);
		}

		var l = 0, cols = 0, rows = 0;
		var matriz;

		textoCifrado = reader.result;
		textoCifrado = textoCifrado.toLowerCase();
		
		cols = llave.length;				
		rows = textoCifrado.length / cols;

		matriz = new Array(rows)

		for(var i = 0 ; i < rows ; i++){
			matriz[i] = new Array(cols);
		}

		for(var i = 0 ; i < llave.length ; i++){
			llave[i] = alfabeto.indexOf(llave[i]);
		}

		llave = burbuja(llave);

		for(var i = 0 ; i < cols ; i++){
	    	for(var j = 0 ; j < rows ; j++){
				matriz[j][llave[i]] = textoCifrado[l++];
			}
		}

		for(var i = 0 ; i < rows ; i++){
			for(var j = 0 ; j < cols ; j++){
				textoDescifrado = textoDescifrado + matriz[i][j].toLowerCase();
			}
			//$("#progressbarColumnasDescifrado").removeClass("notransition").css('width',((i*100)/rows)+'%').attr('aria-valuenow', (i*100)/rows);
		}
		
		fileDisplayArea.html(textoDescifrado);
		textoDescifrado= "\ufeff"+textoDescifrado;
		
		//PARA DESCARGAR
		var file = new File([textoDescifrado], "ArchivoDescifradoCOLUMNAS.txt", {type: "text/plain;charset=ISO-8859-1"});
		saveAs(file);
		$("#progressbarColumnasDescifrado").css('width','100%').attr('aria-valuenow', '100');
	}

	reader.readAsText(file, 'ISO-8859-1');
}