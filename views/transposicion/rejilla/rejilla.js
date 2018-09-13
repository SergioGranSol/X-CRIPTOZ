var celdasSeleccionadasRejillaC = [];
var celdasSeleccionadasRejillaD = [];
var velocidadAnimacionCifrarRejilla= 1;
var velocidadAnimacionDescifrarRejilla= 1;
var seguirCifrandoRejilla= true;
var seguirDescifrandoRejilla= true;

//VARIABLES GLOBALES CIFRAR CON ARCHIVOS
var celdasSeleccionadasRejillaCArchivos= [];
var tamRejillaC= -1;
var celdasSeleccionadasRejillaDArchivos= [];
var tamRejillaD= -1;
var nombreCeldasSeleccionadasArchivos= [];
var rejilla_ok = false;

function cifrarArchivoRejilla()
{
	var fileInput = document.getElementById('fileInputRejillaCifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaRejillaCifrado');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaRejillaCifrado').html(mensaje_92);
		return;
	}
	
	if(tamRejillaC==-1)
	{
		fileDisplayArea.innerText = mensaje_96;
	}
	else if(tamRejillaC==4&&celdasSeleccionadasRejillaCArchivos.length!=4)
	{
		fileDisplayArea.innerText = mensaje_97;
	}
	else if(tamRejillaC==6&&celdasSeleccionadasRejillaCArchivos.length!=9)
	{
		fileDisplayArea.innerText = mensaje_98;
	}
	else if(tamRejillaC==8&&celdasSeleccionadasRejillaCArchivos.length!=16)
	{
		fileDisplayArea.innerText = mensaje_99;
	}
	else
	{
		var file = fileInput.files[0];
		var textType = /text.*/;			
		var textoPlano= "", textoCifrado= "";
		var tamMatriz= tamRejillaC;
		var rejilla= new Array(tamMatriz*tamMatriz);
		var i, j, k;
		$("#progressbarRejillaCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
		
		for(i=0; i<tamMatriz*tamMatriz; i++)
		{
			rejilla[i]= 0;
		}
		
		for(i=0; i<celdasSeleccionadasRejillaCArchivos.length; i++)
		{
			var posicion= celdasSeleccionadasRejillaCArchivos[i].split("-");

			rejilla[posicion[2]]= 1;
		}

		if (file.type.match(textType))
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoPlano= reader.result;										
				textoPlano= textoPlano.toLowerCase();
				
				var fila, columna, pos= 0, posAuxR, posAuxF, posBloqueTexto=0, ronda= 0;
				var auxRejilla= new Array(tamMatriz*tamMatriz);
				var bloqueTexto= new Array(tamMatriz*tamMatriz);
				var moduloTextoPlano= textoPlano.length%(tamMatriz*tamMatriz);
				
				if(moduloTextoPlano!=0)//Si no es un bloque de tamaño exacto lo acompletamos
				{
					for(i=moduloTextoPlano; i<tamMatriz*tamMatriz; i++)
					{
						textoPlano= textoPlano+String.fromCharCode(Math.floor(Math.random() * (123 - 97)) + 97);// Retorna un entero aleatorio entre min (incluido) y max (excluido) // ¡Usando Math.round() te dará una distribución no-uniforme!
					}
				}
				
				for(i=0; i<textoPlano.length; i++)
				{
					bloqueTexto[posBloqueTexto]= textoPlano[i];
					
					if((posBloqueTexto+1)%(tamMatriz*tamMatriz)==0) //Ya se formo el bloque
					{						
						for(j=0; j<bloqueTexto.length; j++)//Hay que buscar si hay un uno para anotar el texto cifrado
						{
							if(rejilla[j]==1)
							{
								textoCifrado= textoCifrado+bloqueTexto[j];
							}
						}
						
						for(ronda= 0; ronda<4; ronda++) //Lo giramos 4 veces para que vuelva a quedar en la posicion original ya que solo se deberia hacer 3 veces porque la primera vez es la de arriba con la rejilla dada originalmente
						{
							pos= 0;
							
							for(columna= 0; columna<tamMatriz; ++columna)
							{
								for(fila= 0; fila<tamMatriz; ++fila)
								{
									posAuxF= (tamMatriz-fila-1);
									
									if(posAuxF<columna)
									{						
										posAuxR= pos-((columna-posAuxF)*tamMatriz)+(columna-fila);
									}
									else if(posAuxF>columna)
									{
										posAuxR= pos+((posAuxF-columna)*tamMatriz)+(columna-fila);
									}
									else
									{
										if(columna<(tamMatriz/2))
										{							
											posAuxR= pos+(columna-fila);
										}
										else
										{
											posAuxR= pos+(columna-fila);							
										}
									}
									
									auxRejilla[pos]= rejilla[posAuxR];
									pos++;
								}
							}

							rejilla= auxRejilla.slice();							

							if(ronda<3)
							{
								for(j=0; j<bloqueTexto.length; j++)//Hay que buscar si hay un uno para anotar el texto cifrado
								{
									if(rejilla[j]==1)
									{
										textoCifrado= textoCifrado+bloqueTexto[j];
									}															
								}
							}							
						}
						
						posBloqueTexto= 0;
					}
					else
					{
						posBloqueTexto++;
					}									
				}

				textoCifrado= textoCifrado.toUpperCase();
				fileDisplayArea.innerText= textoCifrado;
				
				textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
				  element.setAttribute('download', "ArchivoCifradoREJILLA.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarRejillaCifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
			}

			reader.readAsText(file, 'ISO-8859-1');			
		}
		else
		{
			fileDisplayArea.innerText = mensaje_89;
		}
	}
}

function descifrarArchivoRejilla()
{
	var fileInput = document.getElementById('fileInputRejillaDescifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaRejillaDescifrado');

	if(fileInput.files.length == 0){
		$('#fileDisplayAreaRejillaDescifrado').html(mensaje_93);
		return;
	}

	if(tamRejillaD==-1)
	{
		fileDisplayArea.innerText = mensaje_96;
	}
	else if(tamRejillaD==4&&celdasSeleccionadasRejillaDArchivos.length!=4)
	{
		fileDisplayArea.innerText = mensaje_97;
	}
	else if(tamRejillaD==6&&celdasSeleccionadasRejillaDArchivos.length!=9)
	{
		fileDisplayArea.innerText = mensaje_98;
	}
	else if(tamRejillaD==8&&celdasSeleccionadasRejillaDArchivos.length!=16)
	{
		fileDisplayArea.innerText = mensaje_99;
	}
	else
	{
		var file = fileInput.files[0];
		var textType = /text.*/;			
		var textoPlano= "", textoCifrado= "";
		var tamMatriz= tamRejillaD;
		var rejilla= new Array(tamMatriz*tamMatriz);
		var i, j, k;
		$("#progressbarRejillaDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
		
		for(i=0; i<tamMatriz*tamMatriz; i++)
		{
			rejilla[i]= 0;
		}
		
		for(i=0; i<celdasSeleccionadasRejillaDArchivos.length; i++)
		{
			var posicion= celdasSeleccionadasRejillaDArchivos[i].split("-");

			rejilla[posicion[2]]= 1;
		}

		if (file.type.match(textType))
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoCifrado= reader.result;										
				textoCifrado= textoCifrado.toUpperCase();
				
				var fila, columna, pos= 0, posAuxR, posAuxF, posBloqueTexto=0, ronda= 0, posBloqueTextoDescifrado= 0;
				var auxRejilla= new Array(tamMatriz*tamMatriz);
				var bloqueTexto= new Array(tamMatriz*tamMatriz);
				var bloqueTextoDescifrado= new Array(tamMatriz*tamMatriz);
				var moduloTextoCifrado= textoCifrado.length%(tamMatriz*tamMatriz);
				
				if(moduloTextoCifrado!=0)//Si no es un bloque de tamaño exacto lo acompletamos
				{
					for(i=moduloTextoCifrado; i<tamMatriz*tamMatriz; i++)
					{
						textoCifrado= textoCifrado+String.fromCharCode(Math.floor(Math.random() * (91 - 65)) + 65);// Retorna un entero aleatorio entre min (incluido) y max (excluido) // ¡Usando Math.round() te dará una distribución no-uniforme!
					}
				}			
				
				for(i=0; i<textoCifrado.length; i++)
				{
					bloqueTexto[posBloqueTexto]= textoCifrado[i];
					posBloqueTextoDescifrado= 0;
					
					if((posBloqueTexto+1)%(tamMatriz*tamMatriz)==0) //Ya se formo el bloque
					{
						for(j=0; j<bloqueTexto.length; j++)//Hay que buscar si hay un uno para anotar el texto cifrado
						{
							if(rejilla[j]==1)
							{							
								bloqueTextoDescifrado[j]= bloqueTexto[posBloqueTextoDescifrado];
								posBloqueTextoDescifrado++;
							}
						}
						
						for(ronda= 0; ronda<4; ronda++)
						{
							pos= 0;
							
							for(columna= 0; columna<tamMatriz; ++columna)
							{
								for(fila= 0; fila<tamMatriz; ++fila)
								{
									posAuxF= (tamMatriz-fila-1);
									
									if(posAuxF<columna)
									{						
										posAuxR= pos-((columna-posAuxF)*tamMatriz)+(columna-fila);
									}
									else if(posAuxF>columna)
									{
										posAuxR= pos+((posAuxF-columna)*tamMatriz)+(columna-fila);
									}
									else
									{
										if(columna<(tamMatriz/2))
										{							
											posAuxR= pos+(columna-fila);
										}
										else
										{
											posAuxR= pos+(columna-fila);							
										}
									}
									
									auxRejilla[pos]= rejilla[posAuxR];
									pos++;
								}
							}

							rejilla= auxRejilla.slice();

							if(ronda<3)
							{
								for(j=0; j<bloqueTexto.length; j++)//Hay que buscar si hay un uno para anotar el texto cifrado
								{
									if(rejilla[j]==1)
									{
										bloqueTextoDescifrado[j]= bloqueTexto[posBloqueTextoDescifrado];
										posBloqueTextoDescifrado++;
									}															
								}
							}
						}
						
						posBloqueTexto= 0;
						textoPlano= textoPlano+bloqueTextoDescifrado.join("");
					}
					else
					{
						posBloqueTexto++;
					}									
				}

				textoPlano= textoPlano.toLowerCase();
				fileDisplayArea.innerText= textoPlano;
				
				textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
				  element.setAttribute('download', "ArchivoDescifradoREJILLA.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarRejillaDescifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
			}

			reader.readAsText(file, 'ISO-8859-1');			
		}
		else
		{
			fileDisplayArea.innerText = mensaje_89;
		}
	}	
}

function mostrarPanelRejillaC()
{
	//crearPanelAfin();
	$("#panelInteractivo-CifradoRejillaC").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelRejillaC()
{
	$("#panelInteractivo-CifradoRejillaC").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelRejillaCifrado();
	limpiaPanelRejillaDescifrado();

	seguirCifrandoRejilla= false;
	seguirDescifrandoRejilla= false;

	$("#textoPlanoRejillaC-error").remove();
	$("#textoPlanoRejillaC").removeClass('input-error');
	$("#textoCriptogramaRejillaDescifrado-error").remove();
	$("#textoCriptogramaRejillaDescifrado").removeClass('input-error');

	$("#btn-velocidadCRejilla").show();
	$("#btn-cifrarRejilla-cifrado").show();
	$("#btn-cancelarCifrarRejilla-cifrado").hide();
	$("#btn-velocidadDRejilla").show();
	$("#btn-descifrarRejilla-descifrado").show();
	$("#btn-cancelarDescifrarRejilla-descifrado").hide();
}

function limpiaPanelRejillaCifrado()
{	
	if($('#informacionRejilla1C').is(':visible'))
	{
		$("#informacionRejilla1C").slideToggle(500);
	}
	
	if($('#tablaTextoPlanoRejillaC').is(':visible'))
	{
		$("#tablaTextoPlanoRejillaC").slideToggle(500);
	}
	
	celdasSeleccionadasRejillaC= [];

	var i, j, contador= 0;
	var letras= "ABCDEFGHIJKLMNÑO";
	var letrasAbuscar;

	letrasAbuscar= 9;
	
	for(i=0; i<letrasAbuscar; i++)//Controlar las letras
	{
		for(j=1; j<=4; j++)
		{
			for(contador= 0; contador<36; contador++)
			{
				$("#"+letras[i]+""+j+"C-6X6A-"+contador).css("backgroundColor", "transparent");
				$("#"+letras[i]+""+j+"C-6X6A-"+contador).css("color", "default");
			}
		}
	}
	
	$("#informacionRejilla1C").empty();
	$("#f1").empty();	
	$("#f2").empty();	
	$("#f3").empty();	
	$("#f4").empty();	
	$("#f5").empty();	
	$("#f6").empty();	
	$("#textoCifradoRejillaC3").empty();
	$("#textoPlanoRejillaC").val("");
	$("#textoCifradoRejillaC2").val("");
}

function limpiaPanelRejillaDescifrado()
{	
	if($('#informacionRejilla1D').is(':visible'))
	{
		$("#informacionRejilla1D").slideToggle(500);
	}
	
	if($('#tablaTextoCifradoRejillaD').is(':visible'))
	{
		$("#tablaTextoCifradoRejillaD").slideToggle(500);
	}
	
	celdasSeleccionadasRejillaD= [];
	
	var i, j, contador= 0;
	var letras= "ABCDEFGHIJKLMNÑO";
	var letrasAbuscar;

	letrasAbuscar= 9;
	
	for(i=0; i<letrasAbuscar; i++)//Controlar las letras
	{
		for(j=1; j<=4; j++)
		{
			for(contador= 0; contador<36; contador++)
			{
				$("#"+letras[i]+""+j+"D-6X6A-"+contador).css("backgroundColor", "transparent");
				$("#"+letras[i]+""+j+"D-6X6A-"+contador).css("color", "default");
			}
		}
	}
	
	$("#informacionRejilla1D").empty();
	$("#fDR1").empty();		
	$("#fDR2").empty();		
	$("#fDR3").empty();		
	$("#fDR4").empty();		
	$("#fDR5").empty();		
	$("#fDR6").empty();		
	$("#textoCriptogramaRejillaDescifrado").val("");
	$("#textoDescifradoRejillaD2").val("");
}

function obtenerVelocidadAnimacionRejillaCifrar()
{
	if($('#btn-cifrarRejilla-cifrado').val() == 1)
	{
		velocidadAnimacionCifrarRejilla = 0.5;
	}
	else if($('#btn-cifrarRejilla-cifrado').val() == 2)
	{
		velocidadAnimacionCifrarRejilla = 1;
	}
	else
	{
		velocidadAnimacionCifrarRejilla = 2;
	}

	$("#btn-velocidadCRejilla").hide();
	$("#btn-cifrarRejilla-cifrado").hide();
	$("#btn-cancelarCifrarRejilla-cifrado").show();
	seguirCifrandoRejilla= true;
}

function obtenerVelocidadAnimacionRejillaDescifrar()
{
	if($('#btn-descifrarRejilla-descifrado').val() == 1)
	{
		velocidadAnimacionDescifrarRejilla = 0.5;
	}
	else if($('#btn-descifrarRejilla-descifrado').val() == 2)
	{
		velocidadAnimacionDescifrarRejilla = 1;
	}
	else
	{
		velocidadAnimacionDescifrarRejilla = 2;
	}

	$("#btn-velocidadDRejilla").hide();
	$("#btn-descifrarRejilla-descifrado").hide();
	$("#btn-cancelarDescifrarRejilla-descifrado").show();
	seguirDescifrandoRejilla= true;
}

function SCAC(casilla)
{
	var i= 0;

	if(celdasSeleccionadasRejillaC.length==0)
	{
		casilla.style.backgroundColor= "#FDFD96";
		celdasSeleccionadasRejillaC.push(casilla.id);
	}
	else
	{
		for(i= 0; i<celdasSeleccionadasRejillaC.length; i++)
		{
			if(celdasSeleccionadasRejillaC[i]==casilla.id)
			{
				celdasSeleccionadasRejillaC.splice(i,1);
				casilla.style.backgroundColor= "transparent";
				i= celdasSeleccionadasRejillaC.length+1;
			}
			else if(celdasSeleccionadasRejillaC[i].substring(0,1)==casilla.id.substring(0,1))
			{
				i= celdasSeleccionadasRejillaC.length+1;
			}
			else if(i+1==celdasSeleccionadasRejillaC.length)
			{
				casilla.style.backgroundColor= "#FDFD96";
				celdasSeleccionadasRejillaC.push(casilla.id);
				i= celdasSeleccionadasRejillaC.length+1;
			}
		}
	}
}

function SCAD(casilla)
{
	var i= 0;

	if(celdasSeleccionadasRejillaD.length==0)
	{
		casilla.style.backgroundColor= "#FDFD96";
		celdasSeleccionadasRejillaD.push(casilla.id);
	}
	else
	{
		for(i= 0; i<celdasSeleccionadasRejillaD.length; i++)
		{
			if(celdasSeleccionadasRejillaD[i]==casilla.id)
			{
				celdasSeleccionadasRejillaD.splice(i,1);
				casilla.style.backgroundColor= "transparent";
				i= celdasSeleccionadasRejillaD.length+1;
			}
			else if(celdasSeleccionadasRejillaD[i].substring(0,1)==casilla.id.substring(0,1))
			{
				i= celdasSeleccionadasRejillaD.length+1;
			}
			else if(i+1==celdasSeleccionadasRejillaD.length)
			{
				casilla.style.backgroundColor= "#FDFD96";
				celdasSeleccionadasRejillaD.push(casilla.id);
				i= celdasSeleccionadasRejillaD.length+1;
			}
		}
	}
}

async function cifrarRejilla()
{
	var textoPlano = ($("#textoPlanoRejillaC").val().toLowerCase().replace(/ /g,"")).split("");
	var posTextoPlano= 0;
	var numeroCelda= 0;
	var cifrado= [];
	var cadenaCifrado;
	var posArrayTextoCifrado= 0;

	var auxCeldasSeleccionadasRejillaC= celdasSeleccionadasRejillaC.slice();
	
	var pos= 0, columna, tamMatriz= 6, fila, posAuxF, posAuxR, auxRejilla= new Array(36);

	var rejilla= new Array(tamMatriz*tamMatriz);
	var i, j, k;
	
	for(i=0; i<36; i++)
	{
		rejilla[i]= 0;
	}
	
	for(i=0; i<celdasSeleccionadasRejillaC.length; i++)
	{
		var posicion= celdasSeleccionadasRejillaC[i].split("-");

		rejilla[posicion[2]]= 1;
	}
	
	obtenerVelocidadAnimacionRejillaCifrar();
	
	limpiaPanelRejillaCifrado();
    $("#textoPlanoRejillaC").val(textoPlano.join(""));

    celdasSeleccionadasRejillaC= auxCeldasSeleccionadasRejillaC.slice();

    for(i=0; i<celdasSeleccionadasRejillaC.length; i++)
	{		
		$("#"+celdasSeleccionadasRejillaC[i]).css("backgroundColor", "#FDFD96");
	
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}

	$("#informacionRejilla1C").append("Colocamos el mensaje claro de la siguiente forma: (Si no se llena toda la tabla, los cuadros faltantes se escriben letras al azar)");
	$("#informacionRejilla1C").slideToggle(500);
	posicion = $("#informacionRejilla1C").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(3100);
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}
	
	$("#tablaTextoPlanoRejillaC").slideToggle(500);
	posicion = $("#tablaTextoPlanoRejillaC").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(500);
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}
		
	for(i=0; i<6; i++)
	{		
		if(posTextoPlano<textoPlano.length)
		{
			if(textoPlano[posTextoPlano]!=' ')
			{
				$("#f1").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
			else
			{								
				while(textoPlano[posTextoPlano]==' ')
				{
					posTextoPlano++;
				}
				
				$("#f1").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
		}
		else
		{
			var aleatorio = Math.round((Math.random()*25)+97);
			$("#f1").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+String.fromCharCode(aleatorio)+'</td>');
		}		
		
		numeroCelda++;
		await sleepRejilla(100*velocidadAnimacionCifrarRejilla);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	for(i=0; i<6; i++)
	{			
		if(posTextoPlano<textoPlano.length)
		{
			if(textoPlano[posTextoPlano]!=' ')
			{
				$("#f2").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
			else
			{								
				while(textoPlano[posTextoPlano]==' ')
				{
					posTextoPlano++;
				}
				
				$("#f2").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
		}
		else
		{
			var aleatorio = Math.round((Math.random()*25)+97);
			$("#f2").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+String.fromCharCode(aleatorio)+'</td>');
		}
		
		numeroCelda++;
		await sleepRejilla(100*velocidadAnimacionCifrarRejilla);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	for(i=0; i<6; i++)
	{			
		if(posTextoPlano<textoPlano.length)
		{
			if(textoPlano[posTextoPlano]!=' ')
			{
				$("#f3").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
			else
			{								
				while(textoPlano[posTextoPlano]==' ')
				{
					posTextoPlano++;
				}
				
				$("#f3").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
		}
		else
		{
			var aleatorio = Math.round((Math.random()*25)+97);
			$("#f3").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+String.fromCharCode(aleatorio)+'</td>');
		}
		
		numeroCelda++;
		await sleepRejilla(100*velocidadAnimacionCifrarRejilla);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	for(i=0; i<6; i++)
	{			
		if(posTextoPlano<textoPlano.length)
		{
			if(textoPlano[posTextoPlano]!=' ')
			{
				$("#f4").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
			else
			{								
				while(textoPlano[posTextoPlano]==' ')
				{
					posTextoPlano++;
				}
				
				$("#f4").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
		}
		else
		{
			var aleatorio = Math.round((Math.random()*25)+97);
			$("#f4").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+String.fromCharCode(aleatorio)+'</td>');
		}
		
		numeroCelda++;
		await sleepRejilla(100*velocidadAnimacionCifrarRejilla);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	for(i=0; i<6; i++)
	{			
		if(posTextoPlano<textoPlano.length)
		{
			if(textoPlano[posTextoPlano]!=' ')
			{
				$("#f5").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
			else
			{								
				while(textoPlano[posTextoPlano]==' ')
				{
					posTextoPlano++;
				}
				
				$("#f5").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
		}
		else
		{
			var aleatorio = Math.round((Math.random()*25)+97);
			$("#f5").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+String.fromCharCode(aleatorio)+'</td>');
		}
		
		numeroCelda++;
		await sleepRejilla(100*velocidadAnimacionCifrarRejilla);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	for(i=0; i<6; i++)
	{			
		if(posTextoPlano<textoPlano.length)
		{
			if(textoPlano[posTextoPlano]!=' ')
			{
				$("#f6").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
			else
			{								
				while(textoPlano[posTextoPlano]==' ')
				{
					posTextoPlano++;
				}
				
				$("#f6").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+textoPlano[posTextoPlano]+'</td>');
				posTextoPlano++;
			}
		}
		else
		{
			var aleatorio = Math.round((Math.random()*25)+97);
			$("#f6").append('<td style="text-align:center;" id="celdaTextoPlanoRejillaC'+numeroCelda+'">'+String.fromCharCode(aleatorio)+'</td>');
		}
		
		numeroCelda++;
		await sleepRejilla(100*velocidadAnimacionCifrarRejilla);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
			
	if(!seguirCifrandoRejilla)
	{
		return;
	}
			
	$("#informacionRejilla1C").slideToggle(500);
	$("#informacionRejilla1C").empty();
	await sleepRejilla(500);
	$("#informacionRejilla1C").append("Colocamos la rejilla con las celdas(huecos) seleccionadas sobre el mensaje claro:");
	$("#informacionRejilla1C").slideToggle(500);
	posicion = $("#informacionRejilla1C").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(2100);
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}
	
	for(i=0; i<36; i++)
	{
		$("#celdaTextoPlanoRejillaC"+i).css("backgroundColor", "black");
		$("#celdaTextoPlanoRejillaC"+i).css("color", "black");
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}	
	
	for(i=0; i<celdasSeleccionadasRejillaC.length; i++)
	{
		var descomposicion= celdasSeleccionadasRejillaC[i].split("-");

		$("#celdaTextoPlanoRejillaC"+descomposicion[2]).css("backgroundColor", "#FDFD96");
	
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	$("#informacionRejilla1C").slideToggle(500);
	$("#informacionRejilla1C").empty();
	await sleepRejilla(500);
	$("#informacionRejilla1C").append("Simulando la idea de la rejilla, las letras visibles (por los huecos) las anotamos como nuestro criptograma:");
	$("#informacionRejilla1C").slideToggle(800);
	posicion = $("#informacionRejilla1C").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(2500);
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}

	for(i=0; i<36; i++)
	{			
		if($("#celdaTextoPlanoRejillaC"+i).css('backgroundColor')=="rgb(253, 253, 150)")
		{			
			$("#celdaTextoPlanoRejillaC"+i).css("backgroundColor", "#77DD77");			
						
			cifrado[posArrayTextoCifrado] = $("#celdaTextoPlanoRejillaC"+i).text();
			
			cadenaCifrado = cifrado.join("");					
			
			$("#textoCifradoRejillaC3").append('<label id="abcCifradoRejilla'+posArrayTextoCifrado+'C" class="circulo">'+cifrado[posArrayTextoCifrado].toUpperCase()+'</label>');
			$("#abcCifradoRejilla"+posArrayTextoCifrado+"C").css("backgroundColor", "#77DD77");
			await sleepRejilla(250*velocidadAnimacionCifrarRejilla);
			
			$("#celdaTextoPlanoRejillaC"+i).css("backgroundColor", "#FDFD96");	
			$("#abcCifradoRejilla"+posArrayTextoCifrado+"C").css("backgroundColor", "transparent");
			posArrayTextoCifrado++;
		}
		else
		{
			$("#celdaTextoPlanoRejillaC"+i).css("color", "#FF6961");
			$("#celdaTextoPlanoRejillaC"+i).css("backgroundColor", "#FF6961");
			await sleepRejilla(20*velocidadAnimacionCifrarRejilla);
			$("#celdaTextoPlanoRejillaC"+i).css("color", "black");
			$("#celdaTextoPlanoRejillaC"+i).css("backgroundColor", "black");
			await sleepRejilla(20*velocidadAnimacionCifrarRejilla);
		}
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}		
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}
	
	for(ronda= 0; ronda<3; ronda++) //Lo giramos 4 veces para que vuelva a quedar en la posicion original ya que solo se deberia hacer 3 veces porque la primera vez es la de arriba con la rejilla dada originalmente
	{
		$("#informacionRejilla1C").slideToggle(500);
		$("#informacionRejilla1C").empty();
		await sleepRejilla(500);
		$("#informacionRejilla1C").append("Giramos 90 grados nuestra rejilla hacia la derecha...");
		$("#informacionRejilla1C").slideToggle(500);
		await sleepRejilla(2000);
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
		
		for(j=0; j<36; j++)
		{
			$("#celdaTextoPlanoRejillaC"+j).css("backgroundColor", "black");
			$("#celdaTextoPlanoRejillaC"+j).css("color", "black");
			
			if(!seguirCifrandoRejilla)
			{
				return;
			}
		}
		
		pos= 0;
		
		for(columna= 0; columna<tamMatriz; ++columna)
		{
			for(fila= 0; fila<tamMatriz; ++fila)
			{
				posAuxF= (tamMatriz-fila-1);
				
				if(posAuxF<columna)
				{						
					posAuxR= pos-((columna-posAuxF)*tamMatriz)+(columna-fila);
				}
				else if(posAuxF>columna)
				{
					posAuxR= pos+((posAuxF-columna)*tamMatriz)+(columna-fila);
				}
				else
				{
					if(columna<(tamMatriz/2))
					{							
						posAuxR= pos+(columna-fila);
					}
					else
					{
						posAuxR= pos+(columna-fila);							
					}
				}
				
				auxRejilla[pos]= rejilla[posAuxR];
				pos++;
			}
		}

		rejilla= auxRejilla.slice();							

		for(j= 0; j<36; j++)
		{
			if(rejilla[j]==1)
			{
				$("#celdaTextoPlanoRejillaC"+j).css("backgroundColor", "#FDFD96");
			}
		}
		
		for(j=0; j<36; j++)
		{
			if($("#celdaTextoPlanoRejillaC"+j).css('backgroundColor')=="rgb(253, 253, 150)")
			{			
				$("#celdaTextoPlanoRejillaC"+j).css("backgroundColor", "#77DD77");				
							
				cifrado[posArrayTextoCifrado] = $("#celdaTextoPlanoRejillaC"+j).text();
				
				cadenaCifrado = cifrado.join("");				
				
				$("#textoCifradoRejillaC3").append('<label id="abcCifradoRejilla'+posArrayTextoCifrado+'C" class="circulo">'+cifrado[posArrayTextoCifrado].toUpperCase()+'</label>');
				$("#abcCifradoRejilla"+posArrayTextoCifrado+"C").css("backgroundColor", "#77DD77");
				await sleepRejilla(250*velocidadAnimacionCifrarRejilla);							
				
				$("#celdaTextoPlanoRejillaC"+j).css("backgroundColor", "#FDFD96");
				$("#abcCifradoRejilla"+posArrayTextoCifrado+"C").css("backgroundColor", "transparent");
				posArrayTextoCifrado++;
			}
			else
			{
				$("#celdaTextoPlanoRejillaC"+j).css("color", "#FF6961");
				$("#celdaTextoPlanoRejillaC"+j).css("backgroundColor", "#FF6961");
				await sleepRejilla(20*velocidadAnimacionCifrarRejilla);
				$("#celdaTextoPlanoRejillaC"+j).css("color", "black");
				$("#celdaTextoPlanoRejillaC"+j).css("backgroundColor", "black");
				await sleepRejilla(20*velocidadAnimacionCifrarRejilla);
			}
			
			if(!seguirCifrandoRejilla)
			{
				return;
			}
		}
		
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}
	
	$("#informacionRejilla1C").slideToggle(500);
	$("#informacionRejilla1C").empty();
	await sleepRejilla(500);	
	$("#informacionRejilla1C").append("Si volvemos a girar la rejilla 90 grados hacia la derecha llega a la posición inicial por lo que entonces el cifrado ha terminado.");
	$("#informacionRejilla1C").slideToggle(500);
	posicion = $("#informacionRejilla1C").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(4000);
	
	if(!seguirCifrandoRejilla)
	{
		return;
	}
	
	posicion = $("#textoCifradoRejillaC2").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	
	$("#btn-velocidadCRejilla").show();
	$("#btn-cifrarRejilla-cifrado").show();
	$("#btn-cancelarCifrarRejilla-cifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_7);
	$("#textoCifradoRejillaC2").val(cadenaCifrado.toUpperCase());
}

async function descifrarRejilla()
{
	var textoCifradoRejilla = ($("#textoCriptogramaRejillaDescifrado").val().toUpperCase().replace(/ /g,"")).split("");
	var numeroCelda= 0;
	var proxElementos= [];
	var posTextoCifradoRejilla= 0;
	var textoDescifrado= [];
	var cadenaDescifrada;

	var auxCeldasSeleccionadasRejillaD= celdasSeleccionadasRejillaD.slice();
	
	var pos= 0, columna, tamMatriz= 6, fila, posAuxF, posAuxR, auxRejilla= new Array(36);
	
	obtenerVelocidadAnimacionRejillaDescifrar();

	var tamMatriz= 6;
	var rejilla= new Array(tamMatriz*tamMatriz);
	var i, j, k;
	
	for(i=0; i<tamMatriz*tamMatriz; i++)
	{
		rejilla[i]= 0;
	}
	
	for(i=0; i<celdasSeleccionadasRejillaD.length; i++)
	{
		var posicion= celdasSeleccionadasRejillaD[i].split("-");

		rejilla[posicion[2]]= 1;
	}
	
	limpiaPanelRejillaDescifrado();
    $("#textoCriptogramaRejillaDescifrado").val(textoCifradoRejilla.join(""));

    celdasSeleccionadasRejillaD= auxCeldasSeleccionadasRejillaD.slice();

    for(i=0; i<celdasSeleccionadasRejillaD.length; i++)
	{		
		$("#"+celdasSeleccionadasRejillaD[i]).css("backgroundColor", "#FDFD96");
	
		if(!seguirCifrandoRejilla)
		{
			return;
		}
	}
	
	$("#informacionRejilla1D").append("Dibujamos una tabla de 6x6 celdas:");
	$("#informacionRejilla1D").slideToggle(500);
	posicion = $("#informacionRejilla1D").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(1200);
	
	if(!seguirDescifrandoRejilla)
	{
		return;
	}
	
	$("#tablaTextoCifradoRejillaD").slideToggle(500);
	posicion = $("#tablaTextoCifradoRejillaD").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(500);	
	
	if(!seguirDescifrandoRejilla)
	{
		return;
	}
		
	for(var i=0; i<6; i++)
	{		
		
		$("#fDR1").append('<td style="text-align:center;" id="celdaTextoCifradoRejillaD'+numeroCelda+'"></td>');		
		
		numeroCelda++;
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	for(var i=0; i<6; i++)
	{			
		$("#fDR2").append('<td style="text-align:center;" id="celdaTextoCifradoRejillaD'+numeroCelda+'"></td>');		
		
		numeroCelda++;			
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	for(var i=0; i<6; i++)
	{			
		$("#fDR3").append('<td style="text-align:center;" id="celdaTextoCifradoRejillaD'+numeroCelda+'"></td>');		
		
		numeroCelda++;
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	for(var i=0; i<6; i++)
	{			
		$("#fDR4").append('<td style="text-align:center;" id="celdaTextoCifradoRejillaD'+numeroCelda+'"></td>');		
		
		numeroCelda++;
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	for(var i=0; i<6; i++)
	{			
		$("#fDR5").append('<td style="text-align:center;" id="celdaTextoCifradoRejillaD'+numeroCelda+'"></td>');		
		
		numeroCelda++;
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	for(var i=0; i<6; i++)
	{			
		$("#fDR6").append('<td style="text-align:center;" id="celdaTextoCifradoRejillaD'+numeroCelda+'"></td>');		
		
		numeroCelda++;
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	$("#informacionRejilla1D").slideToggle(500);
	$("#informacionRejilla1D").empty();
	await sleepRejilla(500);
	$("#informacionRejilla1D").append("Colocamos la rejilla encima de la nueva tabla:");
	$("#informacionRejilla1D").slideToggle(500);
	posicion = $("#informacionRejilla1D").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(1550);
	
	if(!seguirDescifrandoRejilla)
	{
		return;
	}
	
	for(i=0; i<36; i++)
	{
		$("#celdaTextoCifradoRejillaD"+i).css("backgroundColor", "black");
		$("#celdaTextoCifradoRejillaD"+i).css("color", "black");
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}	
	
	for(i= 0; i<36; i++)
	{
		if(rejilla[i]==1)
		{
			$("#celdaTextoCifradoRejillaD"+i).css("backgroundColor", "#FDFD96");
		}

		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	for(i=0; i<4; i++)
	{
		if(i==0)
		{
			$("#informacionRejilla1D").slideToggle(500);		
			$("#informacionRejilla1D").empty();
			await sleepRejilla(500);
			$("#informacionRejilla1D").append("Por cada hueco de la rejilla, recorriendo fila por fila, vamos escribiendo letra por letra del criptograma:");
			$("#informacionRejilla1D").slideToggle(500);
			posicion = $("#informacionRejilla1D").offset().top;
			$("html, body").animate({scrollTop: posicion}, 1000);		
			await sleepRejilla(2900);
		}
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
		
		for(j=0; j<36; j++)
		{
			if($("#celdaTextoCifradoRejillaD"+j).css('backgroundColor')=="rgb(253, 253, 150)")
			{
				 $("#celdaTextoCifradoRejillaD"+j).html(textoCifradoRejilla[posTextoCifradoRejilla]);
				 posTextoCifradoRejilla++;
				 await sleepRejilla(250*velocidadAnimacionDescifrarRejilla);
			}
			
			if(!seguirDescifrandoRejilla)
			{
				return;
			}
		}			
		
		for(j=0; j<36; j++)
		{
			$("#celdaTextoCifradoRejillaD"+j).css("backgroundColor", "black");
			$("#celdaTextoCifradoRejillaD"+j).css("color", "black");
			
			if(!seguirDescifrandoRejilla)
			{
				return;
			}
		}
		
		if(i<3)
		{
			$("#informacionRejilla1D").slideToggle(500);		
			$("#informacionRejilla1D").empty();
			await sleepRejilla(500);
			$("#informacionRejilla1D").append("Giramos 90 grados hacia la derecha la rejilla...");
			$("#informacionRejilla1D").slideToggle(500);
			posicion = $("#informacionRejilla1D").offset().top;
			$("html, body").animate({scrollTop: posicion}, 1000);
			await sleepRejilla(1750);

			pos= 0;
			
			for(columna= 0; columna<tamMatriz; ++columna)
			{
				for(fila= 0; fila<tamMatriz; ++fila)
				{
					posAuxF= (tamMatriz-fila-1);
					
					if(posAuxF<columna)
					{						
						posAuxR= pos-((columna-posAuxF)*tamMatriz)+(columna-fila);
					}
					else if(posAuxF>columna)
					{
						posAuxR= pos+((posAuxF-columna)*tamMatriz)+(columna-fila);
					}
					else
					{
						if(columna<(tamMatriz/2))
						{							
							posAuxR= pos+(columna-fila);
						}
						else
						{
							posAuxR= pos+(columna-fila);							
						}
					}
					
					auxRejilla[pos]= rejilla[posAuxR];
					pos++;
				}
			}

			rejilla= auxRejilla.slice();

			for(j= 0; j<36; j++)
			{
				if(rejilla[j]==1)
				{
					$("#celdaTextoCifradoRejillaD"+j).css("backgroundColor", "#FDFD96");
				}

				if(!seguirDescifrandoRejilla)
				{
					return;
				}
			}
		}
		else
		{
			$("#informacionRejilla1D").slideToggle(500);		
			$("#informacionRejilla1D").empty();
			await sleepRejilla(500);
			$("#informacionRejilla1D").append("Volvemos a girar la rejilla 90 grados hacia la derecha y llegamos a la posición inicial por lo que entonces el descifrado ha terminado.");
			$("#informacionRejilla1D").slideToggle(500);
			posicion = $("#informacionRejilla1D").offset().top;
			$("html, body").animate({scrollTop: posicion}, 1000);
			await sleepRejilla(4000);
		}
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	if(!seguirDescifrandoRejilla)
	{
		return;
	}
	
	$("#informacionRejilla1D").slideToggle(500);		
	$("#informacionRejilla1D").empty();
	await sleepRejilla(500);
	$("#informacionRejilla1D").append("Quitamos la rejilla y tenemos nuestro mensaje claro:");
	$("#informacionRejilla1D").slideToggle(500);
	posicion = $("#informacionRejilla1D").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	await sleepRejilla(1750);
	
	if(!seguirDescifrandoRejilla)
	{
		return;
	}
	
	for(i=0; i<36; i++)
	{
		$("#celdaTextoCifradoRejillaD"+i).css("backgroundColor", "#FDFD96");
		$("#celdaTextoCifradoRejillaD"+i).css("color", "black");
		textoDescifrado[i] = $("#celdaTextoCifradoRejillaD"+i).text();
		cadenaDescifrada = textoDescifrado.join("");
		
		if(!seguirDescifrandoRejilla)
		{
			return;
		}
	}
	
	posicion = $("#textoDescifradoRejillaD2").offset().top;
	$("html, body").animate({scrollTop: posicion}, 1000);
	
	if(!seguirDescifrandoRejilla)
	{
		return;
	}
	
	$("#btn-velocidadDRejilla").show();
	$("#btn-descifrarRejilla-descifrado").show();
	$("#btn-cancelarDescifrarRejilla-descifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_8);
	$("#textoDescifradoRejillaD2").val(cadenaDescifrada.toLowerCase());
}

function validarEntradaCifradoRejilla()
{
	var mensaje = "";
	var texto = $('#textoPlanoRejillaC').val().replace(/ /g,"");

	if (texto.length < 1 || texto.length > 36) {
		mensaje = mensaje_24;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}

	return mensaje;
}

function validarRejillaCifrado()
{
	var mensaje= "";
	
	if(celdasSeleccionadasRejillaC.length<9)
	{
		mensaje= mensaje_25;
	}
	
	return mensaje;
}

function validarEntradaDescifradoRejilla()
{
	var mensaje = "";
	var texto = $('#textoCriptogramaRejillaDescifrado').val();
	
	if(texto.indexOf(' ') >= 0){
		mensaje = mensaje_4;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_5;
	}
	else if (texto.length!=36){
		mensaje = mensaje_26;
	}

	return mensaje;
}

function validarRejillaDescifrado()
{
	var mensaje= "";
	
	if(celdasSeleccionadasRejillaD.length<9)
	{
		mensaje= mensaje_25;
	}
	
	return mensaje;
}

$(document).ready(function()
{
	$("#CifradoRapidoRejilla").click(function(){
		$("#btn-cifrarRejilla-cifrado").html('Cifrado Rápido');
		$("#btn-cifrarRejilla-cifrado").val(1);
	});
	$("#CifradoNormalRejilla").click(function(){
		$("#btn-cifrarRejilla-cifrado").html('Cifrado Normal');
		$("#btn-cifrarRejilla-cifrado").val(2);
	});
	$("#CifradoLentoRejilla").click(function(){
		$("#btn-cifrarRejilla-cifrado").html('Cifrado Lento');
		$("#btn-cifrarRejilla-cifrado").val(3);
	});
	
	$("#DescifradoRapidoRejilla").click(function(){
		$("#btn-descifrarRejilla-descifrado").html('Descifrado Rápido');
		$("#btn-descifrarRejilla-descifrado").val(1);
	});
	$("#DescifradoNormalRejilla").click(function(){
		$("#btn-descifrarRejilla-descifrado").html('Descifrado Normal');
		$("#btn-descifrarRejilla-descifrado").val(2);
	});
	$("#DescifradoLentoRejilla").click(function(){
		$("#btn-descifrarRejilla-descifrado").html('Descifrado Lento');
		$("#btn-descifrarRejilla-descifrado").val(3);
	});
	
	$("#textoPlanoRejillaC").keyup(function()
	{
		var mensaje = validarEntradaCifradoRejilla();
		if($("#textoPlanoRejillaC").val().length == 0){
			$("#textoPlanoRejillaC-error").remove();
			$("#textoPlanoRejillaC").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoPlanoRejillaC-error").remove();
				$("#textoPlanoRejillaC").parent().parent().append('<div id="textoPlanoRejillaC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoPlanoRejillaC").addClass('input-error');
				//$("#btn-cifrarRejilla-cifrado").attr("disabled", true);
			} else{
				$("#textoPlanoRejillaC-error").remove();
				$("#textoPlanoRejillaC").removeClass('input-error');
				$("#btn-cifrarRejilla-cifrado").attr("disabled", false);
			}
		}
	});
	
	$("#textoCriptogramaRejillaDescifrado").keyup(function(){
		var res = validarEntradaDescifradoRejilla();	
		
		if($("#textoCriptogramaRejillaDescifrado").val().length == 0){
			$("#textoCriptogramaRejillaDescifrado-error").remove();
			$("#textoCriptogramaRejillaDescifrado").removeClass('input-error');
		}
		else{
			if (res.length != 0)
			{
				$("#textoCriptogramaRejillaDescifrado-error").remove();
				$("#textoCriptogramaRejillaDescifrado").parent().parent().append('<div id="textoCriptogramaRejillaDescifrado-error" class="text-danger">&nbsp;'+res+'</div>');
				$("#textoCriptogramaRejillaDescifrado").addClass('input-error');
				//$("#btn-descifrarRejilla-descifrado").attr("disabled", true);
			} else
			{
				$("#textoCriptogramaRejillaDescifrado-error").remove();
				$("#textoCriptogramaRejillaDescifrado").removeClass('input-error');
				$("#btn-descifrarRejilla-descifrado").attr("disabled", false);
			}
		}
	});
	
	$("#btn-cifrarRejilla-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoRejilla();
		var mensaje2= validarRejillaCifrado();
		
		if(mensaje.length!=0)
		{
			$("#textoPlanoRejillaC-error").remove();
			$("#textoPlanoRejillaC").parent().parent().append('<div id="textoPlanoRejillaC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoPlanoRejillaC").addClass('input-error');
			//$("#btn-cifrarRejilla-cifrado").attr("disabled", true);
		}
		else
		{
			if(mensaje2.length!=0)
			{
				$("#textoPlanoRejillaC-error").remove();
				$("#textoPlanoRejillaC").parent().parent().append('<div id="textoPlanoRejillaC-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
				$("#textoPlanoRejillaC").addClass('input-error');			
			}
			else
			{
				$("#textoPlanoRejillaC-error").remove();
				$("#textoPlanoRejillaC").removeClass('input-error');
				cifrarRejilla();
			}					
		}		
	});
	
	$("#btn-descifrarRejilla-descifrado").click(function()
	{
		var mensaje= validarEntradaDescifradoRejilla();
		var mensaje2= validarRejillaDescifrado();
		
		if(mensaje.length!=0)
		{
			$("#textoCriptogramaRejillaDescifrado-error").remove();
			$("#textoCriptogramaRejillaDescifrado").parent().parent().append('<div id="textoCriptogramaRejillaDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoCriptogramaRejillaDescifrado").addClass('input-error');
			//$("#btn-descifrarRejilla-descifrado").attr("disabled", true);
		}
		else
		{
			if(mensaje2.length!=0)
			{
				$("#textoCriptogramaRejillaDescifrado-error").remove();
			$("#textoCriptogramaRejillaDescifrado").parent().parent().append('<div id="textoCriptogramaRejillaDescifrado-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#textoCriptogramaRejillaDescifrado").addClass('input-error');
			}
			else
			{
				$("#textoCriptogramaRejillaDescifrado-error").remove();
				$("#textoCriptogramaRejillaDescifrado").removeClass('input-error');
				descifrarRejilla();
			}					
		}		
	});
	
	$("#btn-cancelarCifrarRejilla-cifrado").click(function()
	{
		seguirCifrandoRejilla= false;
		
		limpiaPanelRejillaCifrado();

		$("#btn-velocidadCRejilla").show();
		$("#btn-cifrarRejilla-cifrado").show();
		$("#btn-cancelarCifrarRejilla-cifrado").hide();
	});
	
	$("#btn-cancelarDescifrarRejilla-descifrado").click(function()
	{
		seguirDescifrandoRejilla= false;
		
		limpiaPanelRejillaDescifrado();

		$("#btn-velocidadDRejilla").show();
		$("#btn-descifrarRejilla-descifrado").show();
		$("#btn-cancelarDescifrarRejilla-descifrado").hide();
	});
	
	$("#btn-copiarTextoRejilla").click(function()
	{
		if ($("#textoCifradoRejillaC2").val()=='')
		{
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		}
		else
		{
			$("#textoCriptogramaRejillaDescifrado").val($("#textoCifradoRejillaC2").val());
			
			var i, j, k;		

			celdasSeleccionadasRejillaD= celdasSeleccionadasRejillaC.slice();

			var contador= 0;
			var letras= "ABCDEFGHIJKLMNÑO";
			var letrasAbuscar;

			letrasAbuscar= 9;
			
			for(i=0; i<letrasAbuscar; i++)//Controlar las letras
			{
				for(j=1; j<=4; j++)
				{
					for(contador= 0; contador<36; contador++)
					{
						$("#"+letras[i]+""+j+"D-6X6A-"+contador).css("backgroundColor", "transparent");
						$("#"+letras[i]+""+j+"D-6X6A-"+contador).css("color", "default");
					}
				}
			}
		
			for(i= 0; i<celdasSeleccionadasRejillaD.length; i++)
			{
				var descomposicion= celdasSeleccionadasRejillaD[i].split("-");
				descomposicion[0]= descomposicion[0].substring(0, descomposicion[0].length-1);

				var nuevoId= descomposicion[0]+"D"+"-"+descomposicion[1]+"-"+descomposicion[2];
				
				celdasSeleccionadasRejillaD[i]= nuevoId;

				document.getElementById(nuevoId).style.backgroundColor= "#FDFD96";
			}
		}
	});

	//ARCHIVOS

    $("#fileInputRejillaCifrado").change(function()
    {
        var mensaje = validarEntradaCArchivoRejilla();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaRejillaCifrado').html(mensaje);
        } else{
            $('#fileDisplayAreaRejillaCifrado').html();
        }

    });

    $("#tamRejillaCifrado").change(function()
    {
    	$("#tamRejillaCifrado-error").remove();
		$("#tamRejillaCifrado").removeClass('input-error');

		$('#fileDisplayAreaRejillaCifrado').html();
    });

    $("#btn-cifrarArchivoRejilla").click(function()
    {		
		var mensajearchivo = validarEntradaCArchivoRejilla();
		var mensaje;

		if(tamRejillaC==-1)
		{
			mensaje= mensaje_96;

			$("#tamRejillaCifrado-error").remove();
			$("#tamRejillaCifrado").parent().parent().append('<div id="tamRejillaCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#tamRejillaCifrado").addClass('input-error');

			//$('#fileDisplayAreaRejillaCifrado').html(mensaje);
		}
		else if(tamRejillaC==4)
		{
			if(celdasSeleccionadasRejillaCArchivos.length!=4){console.log("shi2-1");
				mensaje= mensaje_97;

				$("#tamRejillaCifrado-error").remove();
				$("#tamRejillaCifrado").parent().parent().append('<div id="tamRejillaCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#tamRejillaCifrado").addClass('input-error');
				rejilla_ok = false;
			}
			else{console.log("shi2-2");
				$("#tamRejillaCifrado-error").remove();
				$("#tamRejillaCifrado").removeClass('input-error');
				rejilla_ok = true;
			}
		}
		else if(tamRejillaC==6)
		{
			if(celdasSeleccionadasRejillaCArchivos.length!=9){
				mensaje= mensaje_98;

				$("#tamRejillaCifrado-error").remove();
				$("#tamRejillaCifrado").parent().parent().append('<div id="tamRejillaCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#tamRejillaCifrado").addClass('input-error');
				rejilla_ok = false;
			}
			else{
				$("#tamRejillaCifrado-error").remove();
				$("#tamRejillaCifrado").removeClass('input-error');
				rejilla_ok = true;
			}
		}
		else if(tamRejillaC==8)
		{
			if(celdasSeleccionadasRejillaCArchivos.length!=16){
				mensaje= mensaje_99;

				$("#tamRejillaCifrado-error").remove();
				$("#tamRejillaCifrado").parent().parent().append('<div id="tamRejillaCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#tamRejillaCifrado").addClass('input-error');
				rejilla_ok = false;
			}
			else{
				$("#tamRejillaCifrado-error").remove();
				$("#tamRejillaCifrado").removeClass('input-error');
				rejilla_ok = true;
			}
		}
		else if(mensajearchivo.length!=0)
		{
			$('#fileDisplayAreaRejillaCifrado').html(mensajearchivo);
			rejilla_ok = false;
		}

		if(rejilla_ok)
		{
			cifrarArchivoRejilla();
			rejilla_ok = false;
		}

	});

	$("#fileInputRejillaDescifrado").change(function()
    {
        var mensaje = validarEntradaDArchivoRejilla();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaRejillaDescifrado').html(mensaje);
        } else{
            $('#fileDisplayAreaRejillaDescifrado').html();
        }

    });

    $("#tamRejillaDescifrado").change(function()
    {
    	$("#tamRejillaDescifrado-error").remove();
		$("#tamRejillaDescifrado").removeClass('input-error');

		$('#fileDisplayAreaRejillaDescifrado').html();
    });

    $("#btn-descifrarArchivoRejilla").click(function()
    {		
		var mensajearchivo = validarEntradaDArchivoRejilla();
		var mensaje;

		if(tamRejillaD==-1)
		{
			mensaje= mensaje_96;

			$("#tamRejillaDescifrado-error").remove();
			$("#tamRejillaDescifrado").parent().parent().append('<div id="tamRejillaDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#tamRejillaDescifrado").addClass('input-error');
			rejilla_ok = false;
		}
		else if(tamRejillaD==4)
		{
			if(celdasSeleccionadasRejillaDArchivos.length!=4){
				mensaje= mensaje_97;

				$("#tamRejillaDescifrado-error").remove();
				$("#tamRejillaDescifrado").parent().parent().append('<div id="tamRejillaDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#tamRejillaDescifrado").addClass('input-error');
				rejilla_ok = false;
			}
			else{
				$("#tamRejillaDescifrado-error").remove();
				$("#tamRejillaDescifrado").removeClass('input-error');
				rejilla_ok = true;
			}
		}
		else if(tamRejillaD==6)
		{
			if(celdasSeleccionadasRejillaDArchivos.length!=9){
				mensaje= mensaje_98;

				$("#tamRejillaDescifrado-error").remove();
				$("#tamRejillaDescifrado").parent().parent().append('<div id="tamRejillaDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#tamRejillaDescifrado").addClass('input-error');
				rejilla_ok = false;
			}
			else{
				$("#tamRejillaDescifrado-error").remove();
				$("#tamRejillaDescifrado").removeClass('input-error');
				rejilla_ok = true;
			}
		}
		else if(tamRejillaD==8)
		{
			if(celdasSeleccionadasRejillaDArchivos.length!=16){
				mensaje= mensaje_99;

				$("#tamRejillaDescifrado-error").remove();
				$("#tamRejillaDescifrado").parent().parent().append('<div id="tamRejillaDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#tamRejillaDescifrado").addClass('input-error');
				rejilla_ok = false;
			}
			else{
				$("#tamRejillaDescifrado-error").remove();
				$("#tamRejillaDescifrado").removeClass('input-error');
				rejilla_ok = true;
			}
		}
		else if(mensajearchivo.length!=0)
		{
			$('#fileDisplayAreaRejillaDescifrado').html(mensajearchivo);
			rejilla_ok = false;
		}
		
		if(rejilla_ok)
		{
			descifrarArchivoRejilla();
			rejilla_ok = false;
		}

	});

});

function mostrarRejillaCifradoArchivo()
{
	var selectTamRejilla = document.getElementById('tamRejillaCifrado');
	tamRejillaC= selectTamRejilla.value;

	if(tamRejillaC==4)
	{
		$("#seccionRejillaC4X4").show();
		$("#seccionRejillaC6X6").hide();
		$("#seccionRejillaC8X8").hide();
	}
	else if(tamRejillaC==6)
	{
		$("#seccionRejillaC4X4").hide();
		$("#seccionRejillaC6X6").show();
		$("#seccionRejillaC8X8").hide();
	}
	else if(tamRejillaC==8)
	{
		$("#seccionRejillaC4X4").hide();
		$("#seccionRejillaC6X6").hide();
		$("#seccionRejillaC8X8").show();
	}
	
	limpiarRejillaCifradoArchivos();
	//limpiarRejillaCifradoArchivos(6);
	//limpiarRejillaCifradoArchivos(8);
}

function limpiarRejillaCifradoArchivos()
{	
	var i, j, contador= 0;
	var letras= "ABCDEFGHIJKLMNÑO";
	var letrasAbuscar;
	
	if(tamRejillaC==4)
	{
		letrasAbuscar= 4;
	}
	else if(tamRejillaC==6)
	{
		letrasAbuscar= 9;
	}
	else
	{
		letrasAbuscar= 16;
	}
	
	for(i=0; i<letrasAbuscar; i++)//Controlar las letras
	{
		for(j=1; j<=tamRejillaC; j++)
		{			
			for(contador= 0; contador<tamRejillaC*tamRejillaC; contador++)
			{
				$("#"+letras[i]+""+j+"C-"+tamRejillaC+"X"+tamRejillaC+"-"+contador).css("backgroundColor", "transparent");
				$("#"+letras[i]+""+j+"C-"+tamRejillaC+"X"+tamRejillaC+"-"+contador).css("color", "default");
			}
		}
	}
	
	celdasSeleccionadasRejillaCArchivos= [];
	nombreCeldasSeleccionadasArchivos= [];
}

function mostrarRejillaDescifradoArchivo()
{
	var selectTamRejilla = document.getElementById('tamRejillaDescifrado');
	tamRejillaD= selectTamRejilla.value;

	if(tamRejillaD==4)
	{
		$("#seccionRejillaD4X4").show();
		$("#seccionRejillaD6X6").hide();
		$("#seccionRejillaD8X8").hide();
	}
	else if(tamRejillaD==6)
	{
		$("#seccionRejillaD4X4").hide();
		$("#seccionRejillaD6X6").show();
		$("#seccionRejillaD8X8").hide();
	}
	else if(tamRejillaD==8)
	{
		$("#seccionRejillaD4X4").hide();
		$("#seccionRejillaD6X6").hide();
		$("#seccionRejillaD8X8").show();
	}
	
	limpiarRejillaDescifradoArchivos();
	//limpiarRejillaCifradoArchivos(6);
	//limpiarRejillaCifradoArchivos(8);
}

function limpiarRejillaDescifradoArchivos()
{
	var i, j;
	var letras= "ABCDEFGHIJKLMNÑO";
	var letrasAbuscar;
	var contador;
	
	if(tamRejillaD==4)
	{
		letrasAbuscar= 4;
	}
	else if(tamRejillaD==6)
	{
		letrasAbuscar= 9;
	}
	else
	{
		letrasAbuscar= 16;
	}
	
	for(i=0; i<letrasAbuscar; i++)//Controlar las letras
	{
		for(j=1; j<=tamRejillaD; j++)
		{
			for(contador= 0; contador<tamRejillaD*tamRejillaD; contador++)
			{
				$("#"+letras[i]+""+j+"D-"+tamRejillaD+"X"+tamRejillaD+"-"+contador).css("backgroundColor", "transparent");
				$("#"+letras[i]+""+j+"D-"+tamRejillaD+"X"+tamRejillaD+"-"+contador).css("color", "default");
			}
		}
	}
	
	celdasSeleccionadasRejillaDArchivos= [];
}

function copiarRejillaArchivos()
{
	var fileDisplayArea = document.getElementById('fileDisplayAreaRejillaDescifrado');
	
	if(tamRejillaC==-1)
	{
		fileDisplayArea.innerText = "Primero completa una rejilla para cifrar.";
	}
	else if(tamRejillaC==4&&celdasSeleccionadasRejillaCArchivos.length!=4)
	{
		fileDisplayArea.innerText = "Primero completa una rejilla para cifrar.";
	}
	else if(tamRejillaC==6&&celdasSeleccionadasRejillaCArchivos.length!=9)
	{
		fileDisplayArea.innerText = "Primero completa una rejilla para cifrar.";
	}
	else if(tamRejillaC==8&&celdasSeleccionadasRejillaCArchivos.length!=16)
	{
		fileDisplayArea.innerText = "Primero completa una rejilla para cifrar.";
	}
	else if(tamRejillaC!=tamRejillaD)
	{
		fileDisplayArea.innerText = "El tamaño de la rejilla de cifrado y de descifrado debe ser el mismo.";
	}
	else
	{
		var i, j, k;		
	
		limpiarRejillaDescifradoArchivos();	
		celdasSeleccionadasRejillaDArchivos= celdasSeleccionadasRejillaCArchivos.slice();		
	
		for(i= 0; i<celdasSeleccionadasRejillaDArchivos.length; i++)
		{
			var descomposicion= celdasSeleccionadasRejillaDArchivos[i].split("-");
			descomposicion[0]= descomposicion[0].substring(0, descomposicion[0].length-1);

			var nuevoId= descomposicion[0]+"D"+"-"+descomposicion[1]+"-"+descomposicion[2];
			
			celdasSeleccionadasRejillaDArchivos[i]= nuevoId;

			document.getElementById(nuevoId).style.backgroundColor= "#FDFD96";
		}
	}
}

function SCCA(casilla)
{
	var i= 0;

	if(celdasSeleccionadasRejillaCArchivos.length==0)
	{
		casilla.style.backgroundColor= "#FDFD96";
		celdasSeleccionadasRejillaCArchivos.push(casilla.id);
	}
	else
	{
		for(i= 0; i<celdasSeleccionadasRejillaCArchivos.length; i++)
		{
			if(celdasSeleccionadasRejillaCArchivos[i]==casilla.id)
			{
				celdasSeleccionadasRejillaCArchivos.splice(i,1);
				casilla.style.backgroundColor= "transparent";
				i= celdasSeleccionadasRejillaCArchivos.length+1;
			}
			else if(celdasSeleccionadasRejillaCArchivos[i].substring(0,1)==casilla.id.substring(0,1))
			{
				i= celdasSeleccionadasRejillaCArchivos.length+1;
			}
			else if(i+1==celdasSeleccionadasRejillaCArchivos.length)
			{
				casilla.style.backgroundColor= "#FDFD96";
				celdasSeleccionadasRejillaCArchivos.push(casilla.id);
				i= celdasSeleccionadasRejillaCArchivos.length+1;
			}
		}
	}
}

function SCDA(casilla)
{
	var i= 0;

	if(celdasSeleccionadasRejillaDArchivos.length==0)
	{
		casilla.style.backgroundColor= "#FDFD96";
		celdasSeleccionadasRejillaDArchivos.push(casilla.id);
	}
	else
	{
		for(i= 0; i<celdasSeleccionadasRejillaDArchivos.length; i++)
		{
			if(celdasSeleccionadasRejillaDArchivos[i]==casilla.id)
			{
				celdasSeleccionadasRejillaDArchivos.splice(i,1);
				casilla.style.backgroundColor= "transparent";
				i= celdasSeleccionadasRejillaDArchivos.length+1;
			}
			else if(celdasSeleccionadasRejillaDArchivos[i].substring(0,1)==casilla.id.substring(0,1))
			{
				i= celdasSeleccionadasRejillaDArchivos.length+1;
			}
			else if(i+1==celdasSeleccionadasRejillaDArchivos.length)
			{
				casilla.style.backgroundColor= "#FDFD96";
				celdasSeleccionadasRejillaDArchivos.push(casilla.id);
				i= celdasSeleccionadasRejillaDArchivos.length+1;
			}
		}
	}
}

function validarEntradaCArchivoRejilla(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputRejillaCifrado');
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
	else
	{
		mensaje= mensaje_92;
	}

	return mensaje;
}

function validarEntradaDArchivoRejilla(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputRejillaDescifrado');
	var file;
	
	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = mensaje_89;
		}
		else if(file.size > 1024*200+20){
			mensaje = mensaje_90;;
		}
	}
	else
	{
		mensaje= mensaje_93;
	}

	return mensaje;
}

function sleepRejilla(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}