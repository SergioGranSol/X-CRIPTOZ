var velocidadAnimacionCifrarRiel= 1;
var velocidadAnimacionDescifrarRiel= 1;
var seguirCifrandoRiel= true;
var seguirDescifrandoRiel= true;

function cifrarArchivoRiel(evt) 
{
	var fileInput = document.getElementById('fileInputRielCifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaRielCifrado');
	var numberInput = document.getElementById('numeroRielesCifrado');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaRielCifrado').html(mensaje_92);
		return;
	}
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "";	
	var numeroRieles= numberInput.value;
	//var Rieles= new Array(numeroRieles);
	var i;
	var bandera=0, posRieles= 0;
	$("#progressbarRielCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if(numeroRieles<2||numeroRieles>50)
	{
		fileDisplayArea.innerText = mensaje_100;
	}
	else
	{
		var Rieles= [];
		for(i=0; i<numeroRieles; i++)
		{
			Rieles.push("");
		}
		
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
					
					for(i=0; i<textoPlano.length; i++)
					{
						if(bandera==0)//Asciende
						{
							Rieles[posRieles]= Rieles[posRieles]+textoPlano[i];
							posRieles++;
							
							if(posRieles==numeroRieles)
							{
								bandera= 1;
								posRieles=posRieles-2;
							}
						}
						else//Desciende
						{
							Rieles[posRieles]= Rieles[posRieles]+textoPlano[i];
							posRieles--;
							
							if(posRieles==-1)
							{
								bandera= 0;
								posRieles=posRieles+2;
							}
						}
					}
					
					textoCifrado= Rieles.join("");
					textoCifrado = textoCifrado.toUpperCase();
					
					fileDisplayArea.innerText= textoCifrado;
					textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					//PARA DESCARGAR
					var element = document.createElement('a');
					  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
					  element.setAttribute('download', "ArchivoCifradoRiel.txt");

					  element.style.display = 'none';
					  document.body.appendChild(element);

					  element.click();

					  document.body.removeChild(element);	
					  $("#progressbarRielCifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');		  			 
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
}

function descifrarArchivoRiel(evt) 
{
	var fileInput = document.getElementById('fileInputRielDescifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaRielDescifrado');
	var numberInput = document.getElementById('numeroRielesDescifrado');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaRielDescifrado').html(mensaje_93);
		return;
	}
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= [], textoCifrado= "";	
	var numeroRieles= numberInput.value;
	//var Rieles= new Array(numeroRieles);
	var i, j;
	var bandera=0, posRieles= 0, posTextoCifrado= 0, posTextoCifrado2= 0;
	$("#progressbarRielDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if(numeroRieles<2||numeroRieles>50)
	{
		fileDisplayArea.innerText = mensaje_100;
	}
	else
	{
		var Rieles= [];
		for(i=0; i<numeroRieles; i++)
		{
			Rieles.push("");
		}
		
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
					
					for(i= 0; i<numeroRieles; i++)
					{
						posRieles= 0;
						bandera= 0;
						
						for(j= 0; j<textoCifrado.length; j++)
						{
							if(bandera==0)//Asciende
							{
								if(posRieles==i)//Si la posicion que esta cambiando, coincide con el riel en el que estamos, anotamos la letra
								{
									Rieles[posRieles]= Rieles[posRieles]+textoCifrado[posTextoCifrado];
									textoPlano[j]= textoCifrado[posTextoCifrado];							
									posTextoCifrado++;
								}
							
								posRieles++;
								
								if(posRieles==numeroRieles)
								{
									bandera= 1;
									posRieles= posRieles-2;
								}
							}
							else//Desciende
							{
								if(posRieles==i)//Si la posicion que esta cambiando, coincide con el riel en el que estamos, anotamos la letra
								{
									Rieles[posRieles]= Rieles[posRieles]+textoCifrado[posTextoCifrado];
									textoPlano[j]= textoCifrado[posTextoCifrado];							
									posTextoCifrado++;
								}						
								
								posRieles--;
								
								if(posRieles==-1)
								{
									bandera= 0;
									posRieles= posRieles+2;
								}
							}
						}
					}					
					
					textoPlano= textoPlano.join("");
					textoPlano = textoPlano.toLowerCase();
					
					fileDisplayArea.innerText= textoPlano;
					textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
					
					//PARA DESCARGAR
					var element = document.createElement('a');
					  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
					  element.setAttribute('download', "ArchivoDescifradoRiel.txt");

					  element.style.display = 'none';
					  document.body.appendChild(element);

					  element.click();

					  document.body.removeChild(element);
					  $("#progressbarRielDescifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');			  			 
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
}

function mostrarPanelRiel()
{	
	$("#panelInteractivo-CifradoRiel").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelRiel()
{
	$("#panelInteractivo-CifradoRiel").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelRielCifrado();
	limpiaPanelRielDescifrado();

	$("#textoPlanoRiel-error").remove();
	$("#textoPlanoRiel").removeClass('input-error');
	$("#textoCifradoRielD-error").remove();
	$("#textoCifradoRielD").removeClass('input-error');

	$("#textoPlanoRiel").val("");
	$("#textoCifradoRielD").val("");

	seguirCifrandoRiel= false;
	seguirDescifrandoRiel= false;

	$("#btn-velocidadCRiel").show();
	$("#btn-cifrarRiel-cifrado").show();
	$("#btn-cancelarCifrarRiel-cifrado").hide();

	$("#btn-velocidadDRiel").show();
	$("#btn-descifrarRiel-descifrado").show();
	$("#btn-cancelarDescifrarRiel-descifrado").hide();	
}

function limpiaPanelRielCifrado()
{			
	if($('#informacionRiel1').is(':visible'))
	{
		$("#informacionRiel1").slideToggle(500);
	}
	
	if($('#informacionRiel2').is(':visible'))
	{
		$("#informacionRiel2").slideToggle(500);
	}

	$("#textoPlanoRielEscrito").empty();		
	$("#informacionRiel1").empty();
	$("#informacionRiel2").empty();		
	$("#fila1Riel").empty();
	$("#fila2Riel").empty();
	$("#fila3Riel").empty();
	$("#fila4Riel").empty();	
	$("#informacionRiel3").empty();	
	$("#textoCifradoRiel2").empty();
}

function limpiaPanelRielDescifrado()
{
	if($('#informacionRiel1D').is(':visible'))
	{
		$("#informacionRiel1D").slideToggle(500);
	}	
	
	if($('#informacionRiel2D').is(':visible'))
	{
		$("#informacionRiel2D").slideToggle(500);
	}
	
	$("#informacionRiel1D").empty();
	$("#informacionRiel2D").empty();
	$("#textoCifradoRielEscrito").empty();	
	$("#fila1RielD").empty();
	$("#fila2RielD").empty();	
	$("#informacionRiel3D").empty();
}

function obtenerVelocidadAnimacionRielCifrar()
{
	if($('#btn-cifrarRiel-cifrado').val() == 1)
	{
		velocidadAnimacionCifrarRiel = 0.5;
	}
	else if($('#btn-cifrarRiel-cifrado').val() == 2)
	{
		velocidadAnimacionCifrarRiel = 1;
	}
	else
	{
		velocidadAnimacionCifrarRiel = 2;
	}

	$("#btn-velocidadCRiel").hide();
	$("#btn-cifrarRiel-cifrado").hide();
	$("#btn-cancelarCifrarRiel-cifrado").show();
	seguirCifrandoRiel= true;
}

function obtenerVelocidadAnimacionRielDescifrar()
{
	if($('#btn-descifrarRiel-descifrado').val() == 1)
	{
		velocidadAnimacionDescifrarRiel = 0.5;
	}
	else if($('#btn-descifrarRiel-descifrado').val() == 2)
	{
		velocidadAnimacionDescifrarRiel = 1;
	}
	else
	{
		velocidadAnimacionDescifrarRiel = 2;
	}

	$("#btn-velocidadDRiel").hide();
	$("#btn-descifrarRiel-descifrado").hide();
	$("#btn-cancelarDescifrarRiel-descifrado").show();
	seguirDescifrandoRiel= true;
}

async function cifrarRiel()
{	
	var textoPlano = ($("#textoPlanoRiel").val().toLowerCase().replace(/ /g,"")).split("");
	var i, j= 0;
	var cifrado= [];
	var cadenaCifrado;
	var posArrayTextoCifrado= 0;
	var posicion;
	var numLetraTextoPlano= 0;
	
	obtenerVelocidadAnimacionRielCifrar();
	
	limpiaPanelRielCifrado();
    $("#textoPlanoRiel").val(textoPlano.join(""));
	
	if(!seguirCifrandoRiel)
	{
		return;
	}
	
	$("#informacionRiel1").append("Texto claro que se quiere cifrar:");
	$('#informacionRiel1').slideToggle(500);
	await sleepRiel(1500);
	
	if(!seguirCifrandoRiel)
	{
		return;
	}
	
	for (i = 0; i < textoPlano.length; i++)
	{		
		$("#textoPlanoRielEscrito").append('<td style="text-align:center;" id="textoPlanoRielCifrar'+numLetraTextoPlano+'">'+String.fromCharCode(textoPlano[i].charCodeAt())+'</td>');
		numLetraTextoPlano++;
		await sleepRiel(150*velocidadAnimacionCifrarRiel);
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
	}
	
	$("#informacionRiel2").append("Ahora dibujamos unas vias de tren:");	
	$('#informacionRiel2').slideToggle(500);
	await sleepRiel(1500);
	
	if(!seguirCifrandoRiel)
		{
			return;
		}
	
	for (i = 0; i < 25; i++)
	{		
		$("#fila1Riel").append('<td style="text-align:center;" id="fila1Riel'+i+'"></td>');
		$("#fila1Riel"+i).css("backgroundColor", "black");
		
		$("#fila2Riel").append('<td style="text-align:center;" id="fila2Riel'+i+'"></td>');
		$("#fila3Riel").append('<td style="text-align:center;" id="fila3Riel'+i+'"></td>');
		
		if(i%2)
		{
			$("#fila2Riel"+i).css("backgroundColor", "black");
			$("#fila3Riel"+i).css("backgroundColor", "black");
		}
		
		$("#fila4Riel").append('<td style="text-align:center;" id="fila4Riel'+i+'"></td>');
		$("#fila4Riel"+i).css("backgroundColor", "black");
		await sleepRiel(150*velocidadAnimacionCifrarRiel);
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
	}	
	
	$('#informacionRiel2').slideToggle(500);
	await sleepRiel(500);
	$("#informacionRiel2").empty();
	$("#informacionRiel2").append("Ahora vamos a colocar las letras del texto a cifrar de la siguiente forma:");	
	$('#informacionRiel2').slideToggle(500);
	await sleepRiel(2250);
	
	if(!seguirCifrandoRiel)
	{
		return;
	}
	
	numLetraTextoPlano= 0;
	
	for(i= 0; i<textoPlano.length; i++)
	{		
		$("#textoPlanoRielCifrar"+numLetraTextoPlano).css("backgroundColor", "#337ab7");
		$("#textoPlanoRielCifrar"+numLetraTextoPlano).css("color", "white");
		//$("#textoPlanoRielCifrar"+textoPlano[i].charCodeAt()).addClass('parpadeo');
		await sleepRiel(350*velocidadAnimacionCifrarRiel);
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
		
		if(j%2)
		{
			//$("#fila4Riel"+i).addClass('parpadeo');
			//.css("fontSize", 20);
			$("#fila4Riel"+j).css("backgroundColor", "#337ab7");
			$("#fila4Riel"+j).html(textoPlano[i]);
			$("#fila4Riel"+j).css("color", "white");
			await sleepRiel(20*velocidadAnimacionCifrarRiel);
			//$("#fila4Riel"+i).removeClass('parpadeo');
			$("#fila4Riel"+j).css("backgroundColor", "black");
		}
		else
		{
			//$("#fila1Riel"+i).addClass('parpadeo');
			$("#fila1Riel"+j).css("backgroundColor", "#337ab7");
			$("#fila1Riel"+j).html(textoPlano[i]);
			$("#fila1Riel"+j).css("color", "white");
			await sleepRiel(20*velocidadAnimacionCifrarRiel);
			//$("#fila1Riel"+i).removeClass('parpadeo');
			$("#fila1Riel"+j).css("backgroundColor", "black");
		}	
				
		$("#textoPlanoRielCifrar"+numLetraTextoPlano).css("backgroundColor", "transparent");
		$("#textoPlanoRielCifrar"+numLetraTextoPlano).css("color", "black");
		//$("#textoPlanoRielCifrar"+textoPlano[i].charCodeAt()).removeClass('parpadeo');
		j++;
		numLetraTextoPlano++;
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
	}
	
	if(!seguirCifrandoRiel)
	{
		return;
	}
	
	$('#informacionRiel2').slideToggle(500);
	await sleepRiel(500);
	$("#informacionRiel2").empty();
	$("#informacionRiel2").append("El criptograma se escribe de la siguiente forma:");
	$('#informacionRiel2').slideToggle(500);
	await sleepRiel(1250);		
	
	if(!seguirCifrandoRiel)
	{
		return;
	}		
	
	for(i= 0; i<25; i++)
	{
		$("#fila1Riel"+i).css("backgroundColor", "#337ab7");
		await sleepRiel(150*velocidadAnimacionCifrarRiel);
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
		
		if($("#fila1Riel"+i).text()!="")
		{
			$("#fila1Riel"+i).css("backgroundColor", "#66ff33");								
			
			cifrado[posArrayTextoCifrado]= $("#fila1Riel"+i).text();
			cadenaCifrado = cifrado.join("");
			
			$("#informacionRiel3").append('<label id="abcCifrado'+posArrayTextoCifrado+'C" class="circulo">'+cifrado[posArrayTextoCifrado].toUpperCase()+'</label>');
			$("#abcCifrado"+posArrayTextoCifrado+"C").css("backgroundColor", "#66ff33");					
			
			await sleepRiel(750*velocidadAnimacionCifrarRiel);
			
			$("#abcCifrado"+posArrayTextoCifrado+"C").css("backgroundColor", "transparent");
			
			posArrayTextoCifrado++;
		}
		
		$("#fila1Riel"+i).css("backgroundColor", "black");
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
	}
	
	for(i= 0; i<25; i++)
	{
		$("#fila4Riel"+i).css("backgroundColor", "#337ab7");
		await sleepRiel(150*velocidadAnimacionCifrarRiel);
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
		
		if($("#fila4Riel"+i).text()!="")
		{
			$("#fila4Riel"+i).css("backgroundColor", "#66ff33");									
			
			cifrado[posArrayTextoCifrado]= $("#fila4Riel"+i).text();
			cadenaCifrado = cifrado.join("");
			
			$("#informacionRiel3").append('<label id="abcCifrado'+posArrayTextoCifrado+'C" class="circulo">'+cifrado[posArrayTextoCifrado].toUpperCase()+'</label>');
			$("#abcCifrado"+posArrayTextoCifrado+"C").css("backgroundColor", "#66ff33");					
			
			await sleepRiel(750*velocidadAnimacionCifrarRiel);
			
			$("#abcCifrado"+posArrayTextoCifrado+"C").css("backgroundColor", "transparent");
			
			posArrayTextoCifrado++;
		}
		
		$("#fila4Riel"+i).css("backgroundColor", "black");
		
		if(!seguirCifrandoRiel)
		{
			return;
		}
	}	
	
	posicion = $("#textoCifradoRiel2").offset().top;
	$("html, body").animate({
		scrollTop: posicion
	}, 1000);
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_7);
	
	if(!seguirCifrandoRiel)
	{
		return;
	}
	
	$("#btn-velocidadCRiel").show();
	$("#btn-cifrarRiel-cifrado").show();
	$("#btn-cancelarCifrarRiel-cifrado").hide();
	
	$("#textoCifradoRiel2").val(cadenaCifrado.toUpperCase());		
}

async function descifrarRiel()
{	
	var textoCifrado = ($("#textoCifradoRielD").val().toUpperCase().replace(/ /g,"")).split("");
	var i, j= 0;
	var descifrado= [];
	var cadenaDescifrado;
	var posArrayTextoDescifrado= 0;
	var posicion;
	var numLetraTextoCifrado= 0;
	var numeroLetrasPorPalabra= 0;
	var numeroFila= 0;
	
	obtenerVelocidadAnimacionRielDescifrar();
	
	limpiaPanelRielDescifrado();
    $("#textoCifradoRielD").val(textoCifrado.join(""));
	
	if(!seguirDescifrandoRiel)
	{
		return;
	}
	
	$("#informacionRiel1D").append("Texto cifrado que se quiere descifrar:");
	$('#informacionRiel1D').slideToggle(500);
	await sleepRiel(1100);
	
	if(!seguirDescifrandoRiel)
	{
		return;
	}
	
	for (i = 0; i < textoCifrado.length; i++)
	{		
		$("#textoCifradoRielEscrito").append('<td style="text-align:center;" id="textoCifradoRielDescifrar'+numLetraTextoCifrado+'">'+String.fromCharCode(textoCifrado[i].charCodeAt())+'</td>');
		numLetraTextoCifrado++;
		await sleepRiel(150*velocidadAnimacionDescifrarRiel);

		if(!seguirDescifrandoRiel)
		{
			return;
		}
	}
	
	$("#informacionRiel2D").append("Dividimos en 2 palabras el criptograma:");	
	$('#informacionRiel2D').slideToggle(500);
	await sleepRiel(1100);	
	
	if(!seguirDescifrandoRiel)
	{
		return;
	}
	
	numeroLetrasPorPalabra= Math.ceil(textoCifrado.length/2);
	numLetraTextoCifrado= 0;
	
	for (i = 0; i < textoCifrado.length; i++)
	{
		$("#textoCifradoRielDescifrar"+numLetraTextoCifrado).css("backgroundColor", "#337ab7");
		$("#textoCifradoRielDescifrar"+numLetraTextoCifrado).css("color", "white");
		await sleepRiel(20*velocidadAnimacionDescifrarRiel);
		
		if(!seguirDescifrandoRiel)
		{
			return;
		}
		
		if(i%numeroLetrasPorPalabra==0)
		{
			numeroFila++;
		}
		
		if(!seguirDescifrandoRiel)
		{
			return;
		}
		
		$("#fila"+numeroFila+"RielD").append('<td style="text-align:center;" id="fila'+numeroFila+'RielD'+numLetraTextoCifrado+'">'+$("#textoCifradoRielDescifrar"+numLetraTextoCifrado).text()+'</td>');
		$("#fila"+numeroFila+"RielD"+numLetraTextoCifrado).css("backgroundColor", "#337ab7");
		$("#fila"+numeroFila+"RielD"+numLetraTextoCifrado).css("color", "white");

		await sleepRiel(20*velocidadAnimacionDescifrarRiel);
		
		$("#textoCifradoRielDescifrar"+numLetraTextoCifrado).css("backgroundColor", "transparent");
		$("#textoCifradoRielDescifrar"+numLetraTextoCifrado).css("color", "black");
		
		$("#fila"+numeroFila+"RielD"+numLetraTextoCifrado).css("backgroundColor", "#transparent");
		$("#fila"+numeroFila+"RielD"+numLetraTextoCifrado).css("color", "black");
		
		numLetraTextoCifrado++;
		
		if(!seguirDescifrandoRiel)
		{
			return;
		}
	}
	
	if(!seguirDescifrandoRiel)
	{
		return;
	}
	
	$('#informacionRiel2D').slideToggle(500);
	await sleepRiel(500);
	$("#informacionRiel2D").empty();
	$("#informacionRiel2D").append("El mensaje claro se escribe de la siguiente forma:");
	$('#informacionRiel2D').slideToggle(500);
	await sleepRiel(1750);
	
	if(!seguirDescifrandoRiel)
	{
		return;
	}
	
	numLetraTextoCifrado= 0;	
	
	for(i= 0; i<numeroLetrasPorPalabra; i++)
	{
		numLetraTextoCifrado= i;
		
		for(j= 1; j<=2; j++)
		{
			if(numLetraTextoCifrado<textoCifrado.length)
			{
				$("#fila"+j+"RielD"+numLetraTextoCifrado).css("backgroundColor", "#337ab7");
				$("#fila"+j+"RielD"+numLetraTextoCifrado).css("color", "white");
				await sleepRiel(20*velocidadAnimacionDescifrarRiel);
				
				if(!seguirDescifrandoRiel)
				{
					return;
				}
				
				descifrado[posArrayTextoDescifrado]= $("#fila"+j+"RielD"+numLetraTextoCifrado).text();
				cadenaDescifrado = descifrado.join("");
				
				$("#informacionRiel3D").append('<label id="abcDescifrado'+posArrayTextoDescifrado+'C" class="circulo">'+descifrado[posArrayTextoDescifrado].toLowerCase()+'</label>');
				$("#abcDescifrado"+posArrayTextoDescifrado+"C").css("backgroundColor", "#337ab7");													
				
				posicion = $("#textoDescifradoRiel2").offset().top;
				$("html, body").animate({
					scrollTop: posicion
				}, 1000); 
				
				await sleepRiel(750*velocidadAnimacionDescifrarRiel);
				
				if(!seguirDescifrandoRiel)
				{
					return;
				}
				
				$("#fila"+j+"RielD"+numLetraTextoCifrado).css("backgroundColor", "transparent");
				$("#fila"+j+"RielD"+numLetraTextoCifrado).css("color", "black");
								
				$("#abcDescifrado"+posArrayTextoDescifrado+"C").css("backgroundColor", "transparent");
				
				posArrayTextoDescifrado++;
				
				numLetraTextoCifrado= numLetraTextoCifrado+numeroLetrasPorPalabra;
				
				if(!seguirDescifrandoRiel)
				{
					return;
				}
			}
		}	

		if(!seguirDescifrandoRiel)
		{
			return;
		}		
	}		
	
	posicion = $("#textoDescifradoRiel2").offset().top;
	$("html, body").animate({
		scrollTop: posicion
	}, 1000); 
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_8);
	$("#textoDescifradoRiel2").val(cadenaDescifrado.toLowerCase());
	
	if(!seguirDescifrandoRiel)
	{
		return;
	}
	
	$("#btn-velocidadDRiel").show();
	$("#btn-descifrarRiel-descifrado").show();
	$("#btn-cancelarDescifrarRiel-descifrado").hide();
}

function validarEntradaCifradoRiel()
{
	var mensaje = "";
	var texto = $('#textoPlanoRiel').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 10) {
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarEntradaDescifradoRiel()
{
	var mensaje = "";
	var texto = $('#textoCifradoRielD').val();
	
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

$(document).ready(function()
{
	$("#CifradoRapidoRiel").click(function(){
		$("#btn-cifrarRiel-cifrado").html('Cifrado Rápido');
		$("#btn-cifrarRiel-cifrado").val(1);
	});
	$("#CifradoNormalRiel").click(function(){
		$("#btn-cifrarRiel-cifrado").html('Cifrado Normal');
		$("#btn-cifrarRiel-cifrado").val(2);
	});
	$("#CifradoLentoRiel").click(function(){
		$("#btn-cifrarRiel-cifrado").html('Cifrado Lento');
		$("#btn-cifrarRiel-cifrado").val(3);
	});
	
	$("#DescifradoRapidoRiel").click(function(){
		$("#btn-descifrarRiel-descifrado").html('Descifrado Rápido');
		$("#btn-descifrarRiel-descifrado").val(1);
	});
	$("#DescifradoNormalRiel").click(function(){
		$("#btn-descifrarRiel-descifrado").html('Descifrado Normal');
		$("#btn-descifrarRiel-descifrado").val(2);
	});
	$("#DescifradoLentoRiel").click(function(){
		$("#btn-descifrarRiel-descifrado").html('Descifrado Lento');
		$("#btn-descifrarRiel-descifrado").val(3);
	});
	
	$("#textoPlanoRiel").keyup(function(){
		var mensaje = validarEntradaCifradoRiel();

		if($("#textoPlanoRiel").val().length == 0){
			$("#textoPlanoRiel-error").remove();
			$("#textoPlanoRiel").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoPlanoRiel-error").remove();
				$("#textoPlanoRiel").parent().parent().append('<div id="textoPlanoRiel-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoPlanoRiel").addClass('input-error');
				//$("#btn-cifrarRiel-cifrado").attr("disabled", true);
			} else{
				$("#textoPlanoRiel-error").remove();
				$("#textoPlanoRiel").removeClass('input-error');
				$("#btn-cifrarRiel-cifrado").attr("disabled", false);
			}
		}
	});
	
	$("#textoCifradoRielD").keyup(function(){
		var mensaje = validarEntradaDescifradoRiel();

		if($("#textoCifradoRielD").val().length == 0){
			$("#textoCifradoRielD-error").remove();
			$("#textoCifradoRielD").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoCifradoRielD-error").remove();
				$("#textoCifradoRielD").parent().parent().append('<div id="textoCifradoRielD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoCifradoRielD").addClass('input-error');
				//$("#btn-descifrarRiel-descifrado").attr("disabled", true);
			} else{
				$("#textoCifradoRielD-error").remove();
				$("#textoCifradoRielD").removeClass('input-error');
				$("#btn-descifrarRiel-descifrado").attr("disabled", false);
			}
		}
	});
	
	$("#btn-cifrarRiel-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoRiel();
		
		if(mensaje.length!=0)
		{
			$("#textoPlanoRiel-error").remove();
			$("#textoPlanoRiel").parent().parent().append('<div id="textoPlanoRiel-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoPlanoRiel").addClass('input-error');
			//$("#btn-cifrarRiel-cifrado").attr("disabled", true);
		}
		else
		{
			cifrarRiel();
		}		
	});
	
	$("#btn-descifrarRiel-descifrado").click(function()
	{
		var mensaje= validarEntradaDescifradoRiel();
		
		if(mensaje.length!=0)
		{
			$("#textoCifradoRielD-error").remove();
			$("#textoCifradoRielD").parent().parent().append('<div id="textoCifradoRielD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoCifradoRielD").addClass('input-error');
			//$("#btn-descifrarRiel-descifrado").attr("disabled", true);
		}
		else
		{
			descifrarRiel();
		}		
	});
	
	$("#btn-cancelarCifrarRiel-cifrado").click(function()
	{
		seguirCifrandoRiel= false;
		
		limpiaPanelRielCifrado();

		$("#btn-velocidadCRiel").show();
		$("#btn-cifrarRiel-cifrado").show();
		$("#btn-cancelarCifrarRiel-cifrado").hide();
	});
	
	$("#btn-cancelarDescifrarRiel-descifrado").click(function()
	{
		seguirDescifrandoAtbash= false;
		
		limpiaPanelRielDescifrado();

		$("#btn-velocidadDRiel").show();
		$("#btn-descifrarRiel-descifrado").show();
		$("#btn-cancelarDescifrarRiel-descifrado").hide();
	});
	
	$("#btn-copiarTextoRiel").click(function()
	{
		if ($("#textoCifradoRiel2").val()=='')
		{
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		}
		else
		{
			$("#textoCifradoRielD").val($("#textoCifradoRiel2").val());
		}
	});	

	/*FUNCIONES PARA ARCHIVOS*/

	$("#numeroRielesCifrado").on('click change keyup', function() {
		var mensaje = validarNumeroRielesCifradoArchivo();

		if($("#numeroRielesCifrado").val().length == 0){
			$("#numeroRielesCifrado-error").remove();
			$("#numeroRielesCifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#numeroRielesCifrado-error").remove();
				$("#numeroRielesCifrado").parent().parent().append('<div id="numeroRielesCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#numeroRielesCifrado").addClass('input-error');
				//$("#btn-descifrarRiel-descifrado").attr("disabled", true);
			} else{
				$("#numeroRielesCifrado-error").remove();
				$("#numeroRielesCifrado").removeClass('input-error');
				$("#btn-descifrarRiel-descifrado").attr("disabled", false);
			}
		}
    });

    $("#numeroRielesDescifrado").on('click change keyup', function() {
    	var mensaje = validarNumeroRielesDescifradoArchivo();

		if($("#numeroRielesDescifrado").val().length == 0){
			$("#numeroRielesDescifrado-error").remove();
			$("#numeroRielesDescifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#numeroRielesDescifrado-error").remove();
				$("#numeroRielesDescifrado").parent().parent().append('<div id="numeroRielesDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#numeroRielesDescifrado").addClass('input-error');
				//$("#btn-descifrarRiel-descifrado").attr("disabled", true);
			} else{
				$("#numeroRielesDescifrado-error").remove();
				$("#numeroRielesDescifrado").removeClass('input-error');
				$("#btn-descifrarRiel-descifrado").attr("disabled", false);
			}
		}
	});

    $("#btn-cifarArchivoRiel").click(function(){
		$("#numeroRielesCifrado").removeClass('input-error');
        $("#numeroRielesCifrado-error").remove();

		var rieles = validarNumeroRielesCifradoArchivo();
		if ($("#numeroRielesCifrado").val()!='' && $("#numeroRielesCifrado").val()!='' && rieles.length == 0){
			cifrarArchivoRiel();
		} else{
			if (rieles.length != 0) {
                $("#numeroRielesCifrado").parent().parent().append('<div id="numeroRielesCifrado-error" class="text-danger">&nbsp;'+rieles+'</div>');
                $("#numeroRielesCifrado").addClass('input-error');
            }
		}
	});

	$("#btn-descifarArchivoRiel").click(function(){
		$("#numeroRielesDescifrado").removeClass('input-error');
        $("#numeroRielesDescifrado-error").remove();

		var rieles = validarNumeroRielesDescifradoArchivo();
		if ($("#numeroRielesDescifrado").val()!='' && $("#numeroRielesDescifrado").val()!='' && rieles.length == 0){
			descifrarArchivoRiel();
		} else{
			if (rieles.length != 0) {
                $("#numeroRielesDescifrado").parent().parent().append('<div id="numeroRielesDescifrado-error" class="text-danger">&nbsp;'+rieles+'</div>');
                $("#numeroRielesDescifrado").addClass('input-error');
            }
		}
	});

});

function validarNumeroRielesCifradoArchivo()
{
	var mensaje = "";	
	var valorR= $('#numeroRielesCifrado').val();
	
	if (Number(valorR)<2 || Number(valorR)>50 || valorR.includes("."))
	{
		mensaje = mensaje_100;
	}

	return mensaje;
}

function validarNumeroRielesDescifradoArchivo()
{
	var mensaje = "";	
	var valorR= $('#numeroRielesDescifrado').val();
	
	if (Number(valorR)<2 || Number(valorR)>50 || valorR.includes("."))
	{
		mensaje = mensaje_100;
	}

	return mensaje;
}

function sleepRiel(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}