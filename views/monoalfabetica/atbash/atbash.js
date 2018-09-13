var velocidadAnimacionCifrarAtbash= 1;
var velocidadAnimacionDescifrarAtbash= 1;
var seguirCifrandoAtbash= true;
var seguirDescifrandoAtbash= true;

function cifrarArchivoAtbash(evt) 
{
	var fileInput = document.getElementById('fileInputAtbashCifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaAtbashCifrado');
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "";	
	$("#progressbarAtbashCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if (file.type.match(textType))
	{
		if(file.size<=1024*100)
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoPlano= reader.result;										
				textoPlano= textoPlano.toLowerCase();			
				
				var i, j;
				var abecedario= "abcdefghijklmnñopqrstuvwxyz";
				var oiradeceba= "ZYXWVUTSRQPOÑNMLKJIHGFEDCBA"; //PARA LEER la ñ DE LOS ARCHIVOS ES NECESARIO QUE SEAN UTF-8 no ANSI.
				
				for(i=0; i<textoPlano.length; i++)
				{
					for(j=0; j<abecedario.length; j++)
					{
						if(textoPlano.charAt(i)==abecedario.charAt(j))
						{
							textoCifrado= textoCifrado+oiradeceba[j];
							j= abecedario.length;
						}								
					}
				}
				
				fileDisplayArea.innerText= textoCifrado;
				textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
				  element.setAttribute('download', "ArchivoCifradoATBASH.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);	
				  $("#progressbarAtbashCifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');		  			 
			}

			reader.readAsText(file, 'ISO-8859-1');
		}
		else
		{
			fileDisplayArea.innerText = mensaje_90;
		}
	}
	else
	{
		fileDisplayArea.innerText = mensaje_89;
	}	
}

function descifrarArchivoAtbash(evt)
{
	var fileInput = document.getElementById('fileInputAtbashDescifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaAtbashDescifrado');				
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "", i, j;
	$("#progressbarAtbashDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if (file.type.match(textType))
	{
		if(file.size<=1024*100)
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoCifrado= reader.result;					
				
				textoCifrado= textoCifrado.toUpperCase();
									
				var abecedario= "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
				var oiradeceba= "zyxwvutsrqpoñnmlkjihgfedcba"; //PARA LEER la ñ DE LOS ARCHIVOS ES NECESARIO QUE SEAN UTF-8 no ANSI.
				
				for(i=0; i<textoCifrado.length; i++)
				{
					for(j=0; j<abecedario.length; j++)
					{
						if(textoCifrado.charAt(i)==abecedario.charAt(j))
						{
							textoPlano= textoPlano+oiradeceba[j];
							j= abecedario.length;
						}								
					}
				}
				
				fileDisplayArea.innerText= textoPlano.toLowerCase();
				
				textoPlano= "\ufeff"+textoPlano.toLowerCase();//<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
				  element.setAttribute('download', "ArchivoDescifradoATBASH.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarAtbashDescifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
			}

			reader.readAsText(file, 'ISO-8859-1');
		}
		else
		{
			fileDisplayArea.innerText = mensaje_90;
		}
	}
	else
	{
		fileDisplayArea.innerText = mensaje_89;
	}
}

function mostrarPanelAtbash()
{	
	$("#panelInteractivo-CifradoAtbash").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelAtbash()
{
	$("#panelInteractivo-CifradoAtbash").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	seguirCifrandoAtbash= false;
	seguirDescifrandoAtbash= false;

	$("#btn-velocidadCAtbash").show();
	$("#btn-cifrarAtbash-cifrado").show();
	$("#btn-cancelarCifrarAtbash-cifrado").hide();

	$("#btn-velocidadDAtbash").show();
	$("#btn-descifrarAtbash-descifrado").show();
	$("#btn-cancelarDescifrarAtbash-descifrado").hide();
	
	limpiaPanelAtbashCifrado();
	limpiaPanelAtbashDescifrado();
}

function limpiaPanelAtbashCifrado()
{	
	if($('#texto1CifradoAtbash').is(':visible'))
	{
		$("#texto1CifradoAtbash").slideToggle(500);
	}
	$("#texto1CifradoAtbash").empty();
	$("#filaMensajeClaro-cifrado").empty();
	$("#filaAlfabetoInverso-cifrado").empty();
	$("#textoCifradoAtbashC").empty();
	$("#text-mensajeClaroAtbash-cifrado").val("");
	$("#text-mensajeCifradoAtbash-cifrado").val("");

	$("#textoPlanoAtbash-error").remove();
	$("#text-mensajeClaroAtbash-cifrado").removeClass('input-error');
}

function limpiaPanelAtbashDescifrado()
{
	if($('#texto1DescifradoAtbash').is(':visible'))
	{
		$("#texto1DescifradoAtbash").slideToggle(500);
	}
	$("#texto1DescifradoAtbash").empty();
	$("#filaCriptogramaAtbashDescifrado").empty();
	$("#filaAlfabetoInvertidoAtbashDescifrado").empty();
	$("#textoDescifradoAtbashD").empty();
	$("#text-criptogramaAtbash-descifrado").val("");
	$("#text-mensajeDescifradoAtbash-descifrado").val("");

	$("#criptogramaAtbash-error").remove();
	$("#text-criptogramaAtbash-descifrado").removeClass('input-error');
}

function obtenerVelocidadAnimacionAtbashCifrar()
{
	if($('#btn-cifrarAtbash-cifrado').val() == 1)
	{
		velocidadAnimacionCifrarAtbash = 0.5;
	}
	else if($('#btn-cifrarAtbash-cifrado').val() == 2)
	{
		velocidadAnimacionCifrarAtbash = 1;
	}
	else
	{
		velocidadAnimacionCifrarAtbash = 2;
	}

	$("#btn-velocidadCAtbash").hide();
	$("#btn-cifrarAtbash-cifrado").hide();
	$("#btn-cancelarCifrarAtbash-cifrado").show();
	seguirCifrandoAtbash= true;
}

function obtenerVelocidadAnimacionAtbashDescifrar()
{
	if($('#btn-descifrarAtbash-descifrado').val() == 1)
	{
		velocidadAnimacionDescifrarAtbash = 0.5;
	}
	else if($('#btn-descifrarAtbash-descifrado').val() == 2)
	{
		velocidadAnimacionDescifrarAtbash = 1;
	}
	else
	{
		velocidadAnimacionDescifrarAtbash = 2;
	}

	$("#btn-velocidadDAtbash").hide();
	$("#btn-descifrarAtbash-descifrado").hide();
	$("#btn-cancelarDescifrarAtbash-descifrado").show();
	seguirDescifrandoAtbash= true;
}

async function cifrarAtbash()
{	
	var plano = ($("#text-mensajeClaroAtbash-cifrado").val().toLowerCase().replace(/ /g,"")).split("");
    var cifrado = [];
    var cadenaCifrado;
	
	obtenerVelocidadAnimacionAtbashCifrar();
	
	limpiaPanelAtbashCifrado();
    $("#text-mensajeClaroAtbash-cifrado").val(plano.join(""));
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
	
	$("#texto1CifradoAtbash").append("Para este cifrado primero tomamos en cuenta el alfabeto latino internacional moderno:");
	$("#texto1CifradoAtbash").slideToggle(500);
	await sleepAtbash(1500);
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
		
	for (var i = 97; i <= 122; i++)
	{		
		$("#filaMensajeClaro-cifrado").append('<td style="text-align:center;" id="columnaMensajeClaro-cifrado'+i+'">'+String.fromCharCode(i)+'</td>');
		await sleepAtbash(20*velocidadAnimacionCifrarAtbash);
		
		if(!seguirCifrandoAtbash)
		{
			return;
		}
		
		if(i==110)
		{
			$("#filaMensajeClaro-cifrado").append('<td style="text-align:center;" id="columnaMensajeClaro-cifrado241">'+String.fromCharCode(241)+'</td>');
			await sleepAtbash(20*velocidadAnimacionCifrarAtbash);
			
			if(!seguirCifrandoAtbash)
			{
				return;
			}
		}
	}
	
	await sleepAtbash(1500);
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
	
	$("#texto1CifradoAtbash").slideToggle(500);
	await sleepAtbash(500);
	$("#texto1CifradoAtbash").empty();
	$("#texto1CifradoAtbash").append("Invertimos el orden de las letras del alfabeto:");
	$("#texto1CifradoAtbash").slideToggle(500);
	await sleepAtbash(1750);
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
	
	for(var j= 90; j>=65; j--)
	{
		$("#filaAlfabetoInverso-cifrado").append('<td style="text-align:center;" id="columnaAlfabetoInverso-cifrado'+(j+32)+'">'+String.fromCharCode(j)+'</td>');
		await sleepAtbash(20*velocidadAnimacionCifrarAtbash);
		
		if(!seguirCifrandoAtbash)
		{
			return;
		}
		
		if(j==79)
		{
			$("#filaAlfabetoInverso-cifrado").append('<td style="text-align:center;" id="columnaAlfabetoInverso-cifrado209">'+String.fromCharCode(209)+'</td>');
			await sleepAtbash(20*velocidadAnimacionCifrarAtbash);
			
			if(!seguirCifrandoAtbash)
			{
				return;
			}
		}
	}
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
	
	$("#texto1CifradoAtbash").slideToggle(500);
	await sleepAtbash(500);
	$("#texto1CifradoAtbash").empty();
	$("#texto1CifradoAtbash").append("Para cifrar tomamos letra por letra del mensaje a cifrar y la sustituimos por la letra que le corresponda en el alfabeto invertido:");
	$("#texto1CifradoAtbash").slideToggle(500);		
	await sleepAtbash(4300);	
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
	
    for (var i = 0; i <= plano.length-1; i++) 
	{
    	if(plano[i] != ' ')
		{
			var j= 122; //Para leer el abecedario al reves
			numeroElemntoPlano= plano[i].charCodeAt();
			
			if(numeroElemntoPlano==241)
			{
				j=109;						
			}
			else if(numeroElemntoPlano==109)
			{
				j= 209; //Ñ mayuscula
			}
			else if(numeroElemntoPlano==110)
			{
				j= 	110;
			}			
			else
			{
				for (var k = 97; k < numeroElemntoPlano; k++) //buscamos la letra ingresada en el abecedario
				{
					j--;									
				}								
			}
			
			numeroElemntoCifrado = j;
				cifrado[i] = String.fromCharCode(j);
						
    		
    		cadenaCifrado = cifrado.join("");	    	
						
			$("#textoCifradoAtbashC").append('<label id="labelsAtbashCifrado'+i+'" class="circulo">'+String.fromCharCode(j).toUpperCase()+'</label>');
			
			if(!seguirCifrandoAtbash)
			{
				return;
			}
	    	
	    	// ANIMATION	    	
			$("#columnaMensajeClaro-cifrado"+numeroElemntoPlano).css("backgroundColor", "#AEC6FC");
	    	$("#columnaAlfabetoInverso-cifrado"+numeroElemntoCifrado).css("backgroundColor", "#AEC6FC");
			$("#labelsAtbashCifrado"+i).css("backgroundColor", "#AEC6FC");						
	    	await sleepAtbash(1000*velocidadAnimacionCifrarAtbash);
			
			if(!seguirCifrandoAtbash)
			{
				return;
			}
			
	    	$("#columnaMensajeClaro-cifrado"+numeroElemntoPlano).css("backgroundColor", "transparent");
	    	$("#columnaAlfabetoInverso-cifrado"+numeroElemntoCifrado).css("backgroundColor", "transparent");
			$("#labelsAtbashCifrado"+i).css("backgroundColor", "transparent");
			
			if(!seguirCifrandoAtbash)
			{
				return;
			}
	    	// END ANIMATION

    	}		
    }	

	posicion = $("#text-mensajeCifradoAtbash-cifrado").offset().top;
	$("html, body").animate({
		scrollTop: posicion
	}, 500);
	
	if(!seguirCifrandoAtbash)
	{
		return;
	}
	
	$("#btn-velocidadCAtbash").show();
	$("#btn-cifrarAtbash-cifrado").show();
	$("#btn-cancelarCifrarAtbash-cifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_7);
	$("#text-mensajeCifradoAtbash-cifrado").val(cadenaCifrado.toUpperCase());
}

async function descifrarAtbash()
{
	var cifrado = ($("#text-criptogramaAtbash-descifrado").val().toUpperCase().replace(/ /g,"")).split("");
    var plano = [];
    var cadenaDescifrada;
	var numeroElementoCifrado;
	var numeroElementoPlano;
		
	obtenerVelocidadAnimacionAtbashDescifrar();
		
	limpiaPanelAtbashDescifrado();
	
    $("#text-criptogramaAtbash-descifrado").val(cifrado.join(""));
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
	
	$("#texto1DescifradoAtbash").append("Para descifrar tomamos en cuenta el alfabeto latino internacional moderno:");
	$("#texto1DescifradoAtbash").slideToggle(500);
	await sleepAtbash(1500);
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
		
	for (var i = 65; i <= 90; i++)
	{		
		$("#filaCriptogramaAtbashDescifrado").append('<td style="text-align:center;" id="columnaCriptogramaAtbashDescifrado'+i+'">'+String.fromCharCode(i)+'</td>');
		await sleepAtbash(20*velocidadAnimacionDescifrarAtbash);
		
		if(!seguirDescifrandoAtbash)
		{
			return;
		}
		
		if(i==78)
		{
			$("#filaCriptogramaAtbashDescifrado").append('<td style="text-align:center;" id="columnaCriptogramaAtbashDescifrado209">'+String.fromCharCode(209)+'</td>');
			await sleepAtbash(20*velocidadAnimacionDescifrarAtbash);
			
			if(!seguirDescifrandoAtbash)
			{
				return;
			}
		}
	}
	
	await sleepAtbash(1500);
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
	
	$("#texto1DescifradoAtbash").slideToggle(500);
	await sleepAtbash(500);
	$("#texto1DescifradoAtbash").empty();
	$("#texto1DescifradoAtbash").append("Invertimos el orden de las letras del alfabeto:");
	$("#texto1DescifradoAtbash").slideToggle(500);
	await sleepAtbash(1750);
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
	
	for(var j= 122; j>=97; j--)
	{
		$("#filaAlfabetoInvertidoAtbashDescifrado").append('<td style="text-align:center;" id="columnaAlfabetoInvertidoAtbashDescifrado'+(j-32)+'">'+String.fromCharCode(j)+'</td>');
		await sleepAtbash(20*velocidadAnimacionDescifrarAtbash);
		
		if(!seguirDescifrandoAtbash)
		{
			return;
		}
		
		if(j==111)
		{
			$("#filaAlfabetoInvertidoAtbashDescifrado").append('<td style="text-align:center;" id="columnaAlfabetoInvertidoAtbashDescifrado241">'+String.fromCharCode(241)+'</td>');
			await sleepAtbash(20*velocidadAnimacionDescifrarAtbash);
			
			if(!seguirDescifrandoAtbash)
			{
				return;
			}
		}
	}
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
	
	$("#texto1DescifradoAtbash").slideToggle(500);
	await sleepAtbash(500);
	$("#texto1DescifradoAtbash").empty();
	$("#texto1DescifradoAtbash").append("Para descifrar tomamos letra por letra del mensaje a descifrar y la sustituimos por la letra que le corresponda en el alfabeto invertido:");
	$("#texto1DescifradoAtbash").slideToggle(500);		
	await sleepAtbash(4300);	
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
	
    for (var i = 0; i <= cifrado.length-1; i++) 
	{
    	if(cifrado[i] != ' ')
		{
			var j= 90; //Para leer el abecedario al reves
			numeroElementoCifrado= cifrado[i].charCodeAt();
			
			if(numeroElementoCifrado==209)
			{
				j= 77;
			}
			else if(numeroElementoCifrado==77)
			{
				j= 241;
			}
			else if(numeroElementoCifrado==78)
			{
				j= 78;
			}
			else
			{			
				for (var k = 65; k < numeroElementoCifrado; k++) //buscamos la letra ingresada en el abecedario
				{
					j--;
				}
			}
				
			numeroElementoPlano = j;
			plano[i] = String.fromCharCode(j);			
    		
    		cadenaDescifrada = plano.join("");	    	
						
			$("#textoDescifradoAtbashD").append('<label id="labelsAtbashDescifrado'+i+' class="circulo">'+String.fromCharCode(j).toLowerCase()+'</label>');
			
			if(!seguirDescifrandoAtbash)
			{
				return;
			}
	    	
	    	// ANIMATION	    	
			$("#columnaCriptogramaAtbashDescifrado"+numeroElementoCifrado).css("backgroundColor", "#AEC6FC");
	    	$("#columnaAlfabetoInvertidoAtbashDescifrado"+numeroElementoPlano).css("backgroundColor", "#AEC6FC");
			$("#labelsAtbashDescifrado"+i).css("backgroundColor", "#AEC6FC");						
	    	await sleepAtbash(1000*velocidadAnimacionDescifrarAtbash);
			
			if(!seguirDescifrandoAtbash)
			{
				return;
			}
			
	    	$("#columnaCriptogramaAtbashDescifrado"+numeroElementoCifrado).css("backgroundColor", "transparent");
	    	$("#columnaAlfabetoInvertidoAtbashDescifrado"+numeroElementoPlano).css("backgroundColor", "transparent");
			$("#labelsAtbashDescifrado"+i).css("backgroundColor", "transparent");				    	
			
			if(!seguirDescifrandoAtbash)
			{
				return;
			}
	    	// END ANIMATION

    	}		
    }	

	posicion = $("#text-mensajeDescifradoAtbash-descifrado").offset().top;
	$("html, body").animate({
		scrollTop: posicion
	}, 500);
	
	if(!seguirDescifrandoAtbash)
	{
		return;
	}
	
	$("#btn-velocidadDAtbash").show();
	$("#btn-descifrarAtbash-descifrado").show();
	$("#btn-cancelarDescifrarAtbash-descifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_8);
	$("#text-mensajeDescifradoAtbash-descifrado").val(cadenaDescifrada.toLowerCase());
}

function validarEntradaCifradoAtbash()
{
	var mensaje = "";
	var texto = $('#text-mensajeClaroAtbash-cifrado').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarEntradaDescifradoAtbash()
{
	var mensaje = "";
	var texto = $('#text-criptogramaAtbash-descifrado').val();
	
	if (texto.length < 1 || texto.length > 10)
	{
		mensaje = mensaje_3;
	}
	else if(texto.indexOf(' ') >= 0){
		mensaje = mensaje_4;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_5;
	}

	return mensaje;
}

$(document).ready(function()
{
	$("#CifradoRapidoAtbash").click(function(){
		$("#btn-cifrarAtbash-cifrado").html('Cifrado Rápido');
		$("#btn-cifrarAtbash-cifrado").val(1);
	});
	$("#CifradoNormalAtbash").click(function(){
		$("#btn-cifrarAtbash-cifrado").html('Cifrado Normal');
		$("#btn-cifrarAtbash-cifrado").val(2);
	});
	$("#CifradoLentoAtbash").click(function(){
		$("#btn-cifrarAtbash-cifrado").html('Cifrado Lento');
		$("#btn-cifrarAtbash-cifrado").val(3);
	});
	
	$("#DescifradoRapidoAtbash").click(function(){
		$("#btn-descifrarAtbash-descifrado").html('Descifrado Rápido');
		$("#btn-descifrarAtbash-descifrado").val(1);
	});
	$("#DescifradoNormalAtbash").click(function(){
		$("#btn-descifrarAtbash-descifrado").html('Descifrado Normal');
		$("#btn-descifrarAtbash-descifrado").val(2);
	});
	$("#DescifradoLentoAtbash").click(function(){
		$("#btn-descifrarAtbash-descifrado").html('Descifrado Lento');
		$("#btn-descifrarAtbash-descifrado").val(3);
	});
	
	$("#text-mensajeClaroAtbash-cifrado").keyup(function(){
		var mensaje = validarEntradaCifradoAtbash();

		if($("#text-mensajeClaroAtbash-cifrado").val().length == 0){
			$("#textoPlanoAtbash-error").remove();
			$("#text-mensajeClaroAtbash-cifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoPlanoAtbash-error").remove();
				$("#text-mensajeClaroAtbash-cifrado").parent().parent().append('<div id="textoPlanoAtbash-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#text-mensajeClaroAtbash-cifrado").addClass('input-error');
				//$("#btn-cifrarAtbash-cifrado").attr("disabled", true);
			} else{
				$("#textoPlanoAtbash-error").remove();
				$("#text-mensajeClaroAtbash-cifrado").removeClass('input-error');
				$("#btn-cifrarAtbash-cifrado").attr("disabled", false);
			}
		}
	});
	
	$("#text-criptogramaAtbash-descifrado").keyup(function(){
		var res = validarEntradaDescifradoAtbash();	
		
		if($("#text-criptogramaAtbash-descifrado").val().length == 0){
			$("#criptogramaAtbash-error").remove();
			$("#text-criptogramaAtbash-descifrado").removeClass('input-error');
		}
		else{
			if (res.length != 0)
			{
				$("#criptogramaAtbash-error").remove();
				$("#text-criptogramaAtbash-descifrado").parent().parent().append('<div id="criptogramaAtbash-error" class="text-danger">&nbsp;'+res+'</div>');
				$("#text-criptogramaAtbash-descifrado").addClass('input-error');
				//$("#btn-descifrarAtbash-descifrado").attr("disabled", true);
			} else
			{
				$("#criptogramaAtbash-error").remove();
				$("#text-criptogramaAtbash-descifrado").removeClass('input-error');
				$("#btn-descifrarAtbash-descifrado").attr("disabled", false);
			}
		}
	});
	
	$("#btn-cifrarAtbash-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoAtbash();
		
		if(mensaje.length!=0)
		{
			$("#textoPlanoAtbash-error").remove();
			$("#text-mensajeClaroAtbash-cifrado").parent().parent().append('<div id="textoPlanoAtbash-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#text-mensajeClaroAtbash-cifrado").addClass('input-error');
			//$("#btn-cifrarAtbash-cifrado").attr("disabled", true);
		}
		else
		{
			cifrarAtbash();
		}		
	});
	
	$("#btn-descifrarAtbash-descifrado").click(function()
	{
		var mensaje= validarEntradaDescifradoAtbash();
		
		if(mensaje.length!=0)
		{
			$("#criptogramaAtbash-error").remove();
			$("#text-criptogramaAtbash-descifrado").parent().parent().append('<div id="criptogramaAtbash-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#text-criptogramaAtbash-descifrado").addClass('input-error');
			//$("#btn-descifrarAtbash-descifrado").attr("disabled", true);
		}
		else
		{
			descifrarAtbash();
		}		
	});
	
	$("#btn-cancelarCifrarAtbash-cifrado").click(function()
	{
		seguirCifrandoAtbash= false;
		
		limpiaPanelAtbashCifrado();

		$("#btn-velocidadCAtbash").show();
		$("#btn-cifrarAtbash-cifrado").show();
		$("#btn-cancelarCifrarAtbash-cifrado").hide();
	});
	
	$("#btn-cancelarDescifrarAtbash-descifrado").click(function()
	{		
		seguirDescifrandoAtbash= false;
		
		limpiaPanelAtbashDescifrado();

		$("#btn-velocidadDAtbash").show();
		$("#btn-descifrarAtbash-descifrado").show();
		$("#btn-cancelarDescifrarAtbash-descifrado").hide();
	});
	
	$("#btn-copiarTextoAtbash").click(function()
	{
		if ($("#text-mensajeCifradoAtbash-cifrado").val()=='')
		{
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		}
		else
		{
			$("#text-criptogramaAtbash-descifrado").val($("#text-mensajeCifradoAtbash-cifrado").val());
		}
	});
});

function sleepAtbash(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}