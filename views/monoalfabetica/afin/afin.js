var velocidadAnimacionCifraraAfin= 1;
var velocidadAnimacionDescifrarAfin= 1;
var seguirCifrandoAfin= true;
var seguirDescifrandoAfin= true;

function cifrarArchivoAfin()
{
	var selectA = document.getElementById('valorAafinCarchivo');
	var selectB = document.getElementById('valorBafinCarchivo');
	var fileInput = document.getElementById('fileInputAfinCifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaAfinCifrado');	 

	var valorA= selectA.value;
	var valorB= selectB.value;

	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "";
	$("#progressbarAfinCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

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
				
				var i, j, valorLetraCifrada;
				var abecedario= "abcdefghijklmnñopqrstuvwxyz";
				var abecedarioCifrado= "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
				
				for(i=0; i<textoPlano.length; i++)
				{										
					for(j=0; j<abecedario.length; j++)
					{
						if(textoPlano.charAt(i)==abecedario.charAt(j))
						{
							valorLetraCifrada= (((parseInt(valorA)*parseInt(j))+parseInt(valorB))%27);
							
							textoCifrado= textoCifrado+abecedarioCifrado[valorLetraCifrada];
							
							j= abecedario.length;
						}								
					}
				}
				
				fileDisplayArea.innerText= textoCifrado;
				
				textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
				  element.setAttribute('download', "ArchivoCifradoAFIN.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarAfinCifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
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

function descifrarArchivoAfin()
{
	var selectA = document.getElementById('valorAafinDarchivo');
	var selectB = document.getElementById('valorBafinDarchivo');
	var fileInput = document.getElementById('fileInputAfinDescifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaAfinDescifrado');	 
	 
	var valorA= selectA.value;
	var valorB= selectB.value;
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "";
	$("#progressbarAfinDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

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
				
				var i, j, valorLetraDescifrada;
				var abecedario= "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
				var abecedarioDescifrado= "abcdefghijklmnñopqrstuvwxyz";
				var inversoA= tieneInversoMultiplicativo(valorA);
				
				for(i=0; i<textoCifrado.length; i++)
				{										
					for(j=0; j<abecedario.length; j++)
					{
						if(textoCifrado.charAt(i)==abecedario.charAt(j))
						{
							valorLetraDescifrada= ((parseInt(inversoA)*(parseInt(j)-parseInt(valorB)))%27);							
				
							if(valorLetraDescifrada<0)
							{									
								valorLetraDescifrada= valorLetraDescifrada+27;									
							}
							
							textoPlano= textoPlano+abecedarioDescifrado[valorLetraDescifrada];
							
							j= abecedario.length;
						}
					}
				}
				
				fileDisplayArea.innerText= textoPlano;					
				
				textoPlano= "\ufeff"+textoPlano;//<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textoPlano));
				  element.setAttribute('download', "ArchivoDescifradoAFIN.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarAfinDescifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');
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

function mostrarPanelAfin()
{
	//crearPanelAfin();
	$("#panelInteractivo-CifradoAfin").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelAfin()
{
	$("#panelInteractivo-CifradoAfin").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelAfinCifrado();
	limpiaPanelAfinDescifrado();

	$("#textoPlanoAfin-error").remove();
	$("#textoMensajePlanoAfinCifrado").removeClass('input-error');
	$("#valorAafinCAfin-error").remove();
	$("#valorAafinC").removeClass('input-error');
	$("#valorBafinCAfin-error").remove();
	$("#valorBafinC").removeClass('input-error');

	$("#criptogramaAfin-error").remove();
	$("#textoCriptogramaAfinDescifrado").removeClass('input-error');
	$("#valorAafinDAfin-error").remove();
	$("#valorAafinD").removeClass('input-error');
	$("#valorBafinDAfin-error").remove();
	$("#valorBafinD").removeClass('input-error');

	seguirCifrandoAfin= false;
	seguirDescifrandoAfin= false;

	$("#btn-velocidadCAfin").show();
	$("#btn-cifrarAfin-cifrado").show();
	$("#btn-cancelarCifrarAfin-cifrado").hide();

	$("#btn-velocidadDAfin").show();
	$("#btn-descifrarAfin-descifrado").show();
	$("#btn-cancelarDescifrarAfin-descifrado").hide();
}

function limpiaPanelAfinCifrado()
{
	if($('#informacionAfin1C').is(':visible'))
	{
		$("#informacionAfin1C").slideToggle(500);
	}
	
	if($('#tablaOperacionesAfinC').is(':visible'))
	{
		$("#tablaOperacionesAfinC").slideToggle(500);
	}	
	
	$("#informacionAfin1C").empty();
	$("#filaMensajeClaroCifrado").empty();
	$("#filaAlfabetoAfinCifrado").empty();	
	$("#filaNumeroAlfabetoAfinCifrado").empty();
	$("#filaElementosTextoPlanoC").empty();
	$("#filaNumerosTextoPlanoC").empty();
	$("#filaFormulaAfinC").empty();
	$("#filaMultiplicacionC").empty();
	$("#filaSumaC").empty();
	$("#filaNumeroLetraCifradaC").empty();
	$("#filaLetraCifradaC").empty();
	$("#textoMensajePlanoAfinCifrado").val("");
	$("#textoMensajeCifradoAfinCifrado").val("");
	$("#valorAafinC").val("4");
	$("#valorBafinC").val("1");
	$("#valorAafinD").val("4");
	$("#valorBafinD").val("1");
}

function limpiaPanelAfinDescifrado()
{
	if($('#informacionAfin1D').is(':visible'))
	{
		$("#informacionAfin1D").slideToggle(500);
	}
	
	if($('#tablaOperacionesAfinD').is(':visible'))
	{
		$("#tablaOperacionesAfinD").slideToggle(500);
	}	
	
	$("#informacionAfin1D").empty();
	$("#filaCriptogramaAfinDescifrado").empty();
	$("#filaAlfabetoAfinDescifrado").empty();	
	$("#filaNumeroAlfabetoAfinDescifrado").empty();
	$("#filaElementosTextoCifradoD").empty();
	$("#filaNumerosTextoCifradoD").empty();
	$("#filaFormulaAfinD").empty();
	$("#filaInversoAD").empty();
	$("#filaRestaD").empty();
	$("#filaMultiplicacionD").empty();
	$("#filaNumeroLetraDescifradaD").empty();
	$("#filaLetraDescifradaD").empty();
	$("#textoCriptogramaAfinDescifrado").val("");
	$("#textoMensajeClaroAfinDescifrado").val("");
}

function obtenerVelocidadAnimacionAfinCifrar()
{
	if($('#btn-cifrarAfin-cifrado').val() == 1)
	{
		velocidadAnimacionCifraraAfin = 0.5;
	}
	else if($('#btn-cifrarAfin-cifrado').val() == 2)
	{
		velocidadAnimacionCifraraAfin = 1;
	}
	else
	{
		velocidadAnimacionCifraraAfin = 2;
	}

	$("#btn-velocidadCAfin").hide();
	$("#btn-cifrarAfin-cifrado").hide();
	$("#btn-cancelarCifrarAfin-cifrado").show();
	seguirCifrandoAfin= true;
}

function obtenerVelocidadAnimacionAfinDescifrar()
{	
	if($('#btn-descifrarAfin-descifrado').val() == 1)
	{
		velocidadAnimacionDescifrarAfin = 0.5;
	}
	else if($('#btn-descifrarAfin-descifrado').val() == 2)
	{
		velocidadAnimacionDescifrarAfin = 1;
	}
	else
	{
		velocidadAnimacionDescifrarAfin = 2;
	}

	$("#btn-velocidadDAfin").hide();
	$("#btn-descifrarAfin-descifrado").hide();
	$("#btn-cancelarDescifrarAfin-descifrado").show();
	seguirDescifrandoAfin= true;
}

function tieneInversoMultiplicativo(valorA)
{	
	var a= valorA;
	var n= 27;	
	var u, v, x1, x2, q, r, x;
	var inversoA;
	
	if(n<2)
	{
		//NO TIENE INVERSO
		inversoA= "No tiene inverso";
	}
	else
	{		
		u= a;
		v= n;
		x1= 1;
		x2= 0;
		
		while(u!=1&&u!=0)
		{			
			q= v/u;
			q= parseInt(q);			
			r= v-q*u;
			x= x2-q*x1;
			v= u;
			u= r;
			x2= x1;
			x1= x;
		}
		
		if(u==0)
		{
			//NO TIENE INVERSO
			inversoA= "No tiene inverso";
		}
		else
		{
			if(x1>0||x1==0)
			{
				inversoA= x1%n;
			}
			else
			{
				inversoA= n-((-1)*x1%n);
			}
		}
	}
	
	return inversoA;
}

async function cifrarAfin()
{
	var textoPlano = ($("#textoMensajePlanoAfinCifrado").val().toLowerCase().replace(/ /g,"")).split("");
	var valorA= ($("#valorAafinC")).val();
	var valorB= ($("#valorBafinC")).val();
	var valorLetraCifrada;
	var cifrado = [];
    var cadenaCifrado="";
	var numeroLetra= 0, numeroElementoPlano;
	var numeroLetra2= 0;
	var i, abecedario= ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	var valorLetraPlana;
	
	obtenerVelocidadAnimacionAfinCifrar();
	
	limpiaPanelAfinCifrado();
    $("#textoMensajePlanoAfinCifrado").val(textoPlano.join(""));
    $("#valorAafinC").val(valorA);
    $("#valorBafinC").val(valorB);
	
	if(!seguirCifrandoAfin)
	{
		return;
	}
	
	$("#informacionAfin1C").append("Para este cifrado trabajaremos con el alfabeto latino internacional moderno:");
	$("#informacionAfin1C").slideToggle(500);
	await sleepAfin(1750);
	
	if(!seguirCifrandoAfin)
	{
		return;
	}
	
	for(var j= 97; j<=122; j++)
	{
		$("#filaAlfabetoAfinCifrado").append('<td style="text-align:center;" id="columnaAlfabetoAfinCifrado'+j+'">'+String.fromCharCode(j)+'</td>');
		$("#filaNumeroAlfabetoAfinCifrado").append('<td style="text-align:center;" id="columnaNumeroAlfabetoAfinCifrado'+numeroLetra+'">'+numeroLetra+'</td>');
		numeroLetra++;
		await sleepAfin(20*velocidadAnimacionCifraraAfin);
		
		if(!seguirCifrandoAfin)
		{
			return;
		}		
		
		if(j==110)
		{			
			$("#filaAlfabetoAfinCifrado").append('<td style="text-align:center;" id="columnaAlfabetoAfinCifrado241">'+String.fromCharCode(241)+'</td>');
			$("#filaNumeroAlfabetoAfinCifrado").append('<td style="text-align:center;" id="columnaNumeroAlfabetoAfinCifrado'+numeroLetra+'">'+numeroLetra+'</td>');
			numeroLetra++;
			await sleepAfin(20*velocidadAnimacionCifraraAfin);
			
			if(!seguirCifrandoAfin)
			{
				return;
			}
		}
	}
	
	$("#informacionAfin1C").slideToggle(250);
	await sleepAfin(250);
	$("#informacionAfin1C").empty();

	$("#informacionAfin1C").append("Con ayuda de la segunda tabla obtendremos el texto cifrado:");
	$("#informacionAfin1C").slideToggle(500);
	await sleepAfin(2000);

	if(!seguirCifrandoAfin)
	{
		return;
	}	

	posicion = $("#textoMensajeCifradoAfinCifrado").offset().top;
	$("html, body").animate({
		scrollTop: posicion
	}, 1000);

	$("#tablaOperacionesAfinC").slideToggle(500);

	$("#filaElementosTextoPlanoC").append('<td style="text-align:center;" id="columnaTextoPlanoC">Texto Plano</td>');
	$("#filaNumerosTextoPlanoC").append('<td style="text-align:center;" id="columnaValoresTextoPlanoC">Valor</td>');
	$("#filaFormulaAfinC").append('<td style="text-align:center;" id="columnaFormulaC">Fórmula</td>');
	$("#filaFormulaAfinC").append('<th colspan="'+ textoPlano.length +'" style="text-align:center;">C<sub>i</sub> = a * P<sub>i</sub> + b mod 27</th>');
	$("#filaMultiplicacionC").append('<td style="text-align:center;" id="columnaMultiplicacionC">a * P<sub>i</sub></td>');
	$("#filaSumaC").append('<td style="text-align:center;" id="columnaSumaC">a * P<sub>i</sub> + b</td>');
	$("#filaNumeroLetraCifradaC").append('<td style="text-align:center;" id="columnaValoresTextoCifradoC">C<sub>i</sub> = a * P<sub>i</sub> + b mod 27</td>');
	$("#filaLetraCifradaC").append('<td style="text-align:center;" id="columnaTextoCifradoC">Texto Cifrado</td>');

	if(!seguirCifrandoAfin)
	{
		return;
	}

	for(i=0; i<textoPlano.length; i++)
	{
		if(i==2)
		{
			velocidadAnimacionCifraraAfin= 0;
		}
		/*FILA 1*/
		$("#columnaTextoPlanoC").css("backgroundColor", "#FDFD96");
		$("#filaElementosTextoPlanoC").append('<td style="text-align:center;" id="columnaTextoPlanoC'+ i +'">'+ textoPlano[i] +'</td>');
		$("#columnaTextoPlanoC"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaTextoPlanoC").css("backgroundColor", "transparent");
		$("#columnaTextoPlanoC"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		/*FILA 2*/

		valorLetraPlana= abecedario.indexOf(textoPlano[i]);

		$("#columnaValoresTextoPlanoC").css("backgroundColor", "#FDFD96");
		$("#filaNumerosTextoPlanoC").append('<td style="text-align:center;" id="columnaValoresTextoPlanoC'+ i +'">'+ valorLetraPlana +'</td>');
		$("#columnaValoresTextoPlanoC"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaValoresTextoPlanoC").css("backgroundColor", "transparent");
		$("#columnaValoresTextoPlanoC"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		/*FILA 3*/
		$("#columnaMultiplicacionC").css("backgroundColor", "#FDFD96");
		$("#filaMultiplicacionC").append('<td style="text-align:center;" id="columnaMultiplicacionC'+ i +'">a * P<sub>'+ i +'</sub></td>');
		$("#columnaMultiplicacionC"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaMultiplicacionC"+i).html("");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		$("#columnaMultiplicacionC"+i).html(""+ valorA +" * "+ valorLetraPlana);
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaMultiplicacionC"+i).html("");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		$("#columnaMultiplicacionC"+i).html(""+ valorA*valorLetraPlana);
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}

		$("#columnaMultiplicacionC").css("backgroundColor", "transparent");
		$("#columnaMultiplicacionC"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		/*FILA 4*/
		$("#columnaSumaC").css("backgroundColor", "#FDFD96");
		$("#filaSumaC").append('<td style="text-align:center;" id="columnaSumaC'+ i +'">a * P<sub>'+ i +'</sub> + b</sub></td>');
		$("#columnaSumaC"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaSumaC"+i).html("");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		$("#columnaSumaC"+i).html(""+ valorA*valorLetraPlana +" + "+ valorB);
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaSumaC"+i).html("");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		$("#columnaSumaC"+i).html(""+ ((valorA*valorLetraPlana) + parseInt(valorB)));
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaSumaC").css("backgroundColor", "transparent");	
		$("#columnaSumaC"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		/*FILA 5*/
		$("#columnaValoresTextoCifradoC").css("backgroundColor", "#FDFD96");
		$("#filaNumeroLetraCifradaC").append('<td style="text-align:center;" id="columnaValoresTextoCifradoC'+ i +'">C<sub>'+ i +'</sub> = a * P<sub>'+ i +'</sub> + b mod 27</td>');
		$("#columnaValoresTextoCifradoC"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaValoresTextoCifradoC"+i).html("");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		$("#columnaValoresTextoCifradoC"+i).html("C<sub>"+ i +"</sub> ="+(valorA*valorLetraPlana + parseInt(valorB))+" mod 27");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaValoresTextoCifradoC"+i).html("");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		valorLetraCifrada= (valorA*valorLetraPlana + parseInt(valorB))%27;

		$("#columnaValoresTextoCifradoC"+i).html("C<sub>"+ i +"</sub> = "+valorLetraCifrada);
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}

		$("#columnaValoresTextoCifradoC").css("backgroundColor", "transparent");	
		$("#columnaValoresTextoCifradoC"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		/*FILA 6*/
		$("#columnaTextoCifradoC").css("backgroundColor", "#77DD77");
		$("#filaLetraCifradaC").append('<td style="text-align:center;" id="columnaTextoCifradoC'+ i +'">'+ abecedario[valorLetraCifrada].toUpperCase() +'</td>');
		$("#columnaTextoCifradoC"+i).css("backgroundColor", "#77DD77");
		await sleepAfin(1500*velocidadAnimacionCifraraAfin);

		if(!seguirCifrandoAfin)
		{
			return;
		}	

		$("#columnaTextoCifradoC").css("backgroundColor", "transparent");
		$("#columnaTextoCifradoC"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionCifraraAfin);

		cadenaCifrado= cadenaCifrado+abecedario[valorLetraCifrada].toUpperCase();
	}
	
	if(!seguirCifrandoAfin)
	{
		return;
	}
	
	$("#btn-velocidadCAfin").show();
	$("#btn-cifrarAfin-cifrado").show();
	$("#btn-cancelarCifrarAfin-cifrado").hide();	
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_7);
	$("#textoMensajeCifradoAfinCifrado").val(cadenaCifrado.toUpperCase());	
}

async function descifrarAfin()
{
	console.log("entra");
	var textoCifrado = ($("#textoCriptogramaAfinDescifrado").val().toUpperCase().replace(/ /g,"")).split("");
	var valorA= ($("#valorAafinD")).val();	
	var valorB= ($("#valorBafinD")).val()
	var valorLetraDescifrada;
	var textoDescifrado= [];
	var cadenaDescifrada= "";	
	var inversoA= tieneInversoMultiplicativo(valorA);	
	var numeroLetra= 0, numeroElementoCifrado;
	var numeroLetra2;
	var i, abecedario= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	var valorLetraPlana;
	
	obtenerVelocidadAnimacionAfinDescifrar();	
	
	limpiaPanelAfinDescifrado();
    $("#textoCriptogramaAfinDescifrado").val(textoCifrado.join(""));
    $("#valorAafinD").val(valorA);
    $("#valorBafinD").val(valorB);
	
	if(!seguirDescifrandoAfin)
	{
		return;
	}
	
	$("#informacionAfin1D").append("Para descifrar tomamos en cuenta el alfabeto latino internacional moderno:");
	$("#informacionAfin1D").slideToggle(500);
	await sleepAfin(1750);
	
	if(!seguirDescifrandoAfin)
	{
		return;
	}	
	
	for(var j= 65; j<=90; j++)
	{
		$("#filaAlfabetoAfinDescifrado").append('<td style="text-align:center;" id="columnaAlfabetoAfinDescifrado'+j+'">'+String.fromCharCode(j)+'</td>');
		$("#filaNumeroAlfabetoAfinDescifrado").append('<td style="text-align:center;" id="columnaNumeroAlfabetoAfinDescifrado'+numeroLetra+'">'+numeroLetra+'</td>');
		numeroLetra++;
		await sleepAfin(20*velocidadAnimacionDescifrarAfin);
		
		if(!seguirDescifrandoAfin)
		{
			return;
		}
		
		if(j==78)
		{
			$("#filaAlfabetoAfinDescifrado").append('<td style="text-align:center;" id="columnaAlfabetoAfinDescifrado209">'+String.fromCharCode(209)+'</td>');
			$("#filaNumeroAlfabetoAfinDescifrado").append('<td style="text-align:center;" id="columnaNumeroAlfabetoAfinDescifrado'+numeroLetra+'">'+numeroLetra+'</td>');
			numeroLetra++;
			await sleepAfin(20*velocidadAnimacionDescifrarAfin);
			
			if(!seguirDescifrandoAfin)
			{
				return;
			}
		}
	}

	$("#informacionAfin1D").slideToggle(250);
	await sleepAfin(250);
	$("#informacionAfin1D").empty();

	$("#informacionAfin1D").append("Con ayuda de la segunda tabla obtendremos el texto descifrado:");
	$("#informacionAfin1D").slideToggle(500);
	await sleepAfin(2000);

	if(!seguirDescifrandoAfin)
	{
		return;
	}	

	posicion = $("#textoMensajeClaroAfinDescifrado").offset().top;
	$("html, body").animate({
		scrollTop: posicion
	}, 1000);	
	
	$("#tablaOperacionesAfinD").slideToggle(500);

	$("#filaElementosTextoCifradoD").append('<td style="text-align:center;" id="columnaElementosTextoCifradoD">Texto Cifrado</td>');
	$("#filaNumerosTextoCifradoD").append('<td style="text-align:center;" id="columnaNumerosTextoCifradoD">Valor</td>');
	$("#filaFormulaAfinD").append('<td style="text-align:center;" id="columnaFormulaAfinD">Fórmula</td>');
	$("#filaFormulaAfinD").append('<th colspan="'+ textoCifrado.length +'" style="text-align:center;">P<sub>i</sub> = a<sup>-1</sup> * (C<sub>i</sub> - b) mod 27</th>');
	$("#filaInversoAD").append('<td style="text-align:center;" id="columnaInversoAD">a<sup>-1</sup></td>');
	$("#filaRestaD").append('<td style="text-align:center;" id="columnaRestaD">C<sub>i</sub> - b</td>');
	$("#filaMultiplicacionD").append('<td style="text-align:center;" id="columnaMultiplicacionD">a<sup>-1</sup> * (C<sub>i</sub> - b)</td>');
	$("#filaNumeroLetraDescifradaD").append('<td style="text-align:center;" id="columnaNumeroLetraDescifradaD">P<sub>i</sub> = a<sup>-1</sup> * (C<sub>i</sub> - b) mod 27</td>');
	$("#filaLetraDescifradaD").append('<td style="text-align:center;" id="columnaLetraDescifradaD">Texto Descifrado</td>');

	for(i=0; i<textoCifrado.length; i++)
	{
		if(i==2)
		{
			velocidadAnimacionDescifrarAfin= 0;
		}

		/*FILA 1*/
		$("#columnaElementosTextoCifradoD").css("backgroundColor", "#FDFD96");
		$("#filaElementosTextoCifradoD").append('<td style="text-align:center;" id="columnaElementosTextoCifradoD'+ i +'">'+ textoCifrado[i] +'</td>');
		$("#columnaElementosTextoCifradoD"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaElementosTextoCifradoD").css("backgroundColor", "transparent");
		$("#columnaElementosTextoCifradoD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		/*FILA 2*/

		valorLetraCifrada= abecedario.indexOf(textoCifrado[i]);

		$("#columnaNumerosTextoCifradoD").css("backgroundColor", "#FDFD96");
		$("#filaNumerosTextoCifradoD").append('<td style="text-align:center;" id="columnaNumerosTextoCifradoD'+ i +'">'+ valorLetraCifrada +'</td>');
		$("#columnaNumerosTextoCifradoD"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaNumerosTextoCifradoD").css("backgroundColor", "transparent");
		$("#columnaNumerosTextoCifradoD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		/*FILA 3*/
		$("#columnaInversoAD").css("backgroundColor", "#FDFD96");
		$("#filaInversoAD").append('<td style="text-align:center;" id="columnaInversoAD'+ i +'">a<sup>-1</sup></td>');
		$("#columnaInversoAD"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaInversoAD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		$("#columnaInversoAD"+i).html(""+valorA+"<sup>-1</sup>");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaInversoAD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		$("#columnaInversoAD"+i).html(""+ inversoA);
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}

		$("#columnaInversoAD").css("backgroundColor", "transparent");
		$("#columnaInversoAD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		/*FILA 4*/
		$("#columnaRestaD").css("backgroundColor", "#FDFD96");
		$("#filaRestaD").append('<td style="text-align:center;" id="columnaRestaD'+ i +'">C<sub>i</sub> - b</td>');
		$("#columnaRestaD"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaRestaD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		valorLetraCifrada= abecedario.indexOf(textoCifrado[i]);

		$("#columnaRestaD"+i).html(""+ valorLetraCifrada +" - "+ valorB);
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaRestaD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		$("#columnaRestaD"+i).html(""+ (parseInt(valorLetraCifrada) - parseInt(valorB)));
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaRestaD").css("backgroundColor", "transparent");	
		$("#columnaRestaD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		/*FILA 5*/
		$("#columnaMultiplicacionD").css("backgroundColor", "#FDFD96");
		$("#filaMultiplicacionD").append('<td style="text-align:center;" id="columnaMultiplicacionD'+ i +'">a<sup>-1</sup> * (C<sub>'+i+'</sub> - b)</td>');
		$("#columnaMultiplicacionD"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaMultiplicacionD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		$("#columnaMultiplicacionD"+i).html(""+inversoA+" * "+(parseInt(valorLetraCifrada) - parseInt(valorB)));
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaMultiplicacionD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		$("#columnaMultiplicacionD"+i).html(""+(inversoA*(parseInt(valorLetraCifrada) - parseInt(valorB))));
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}

		$("#columnaMultiplicacionD").css("backgroundColor", "transparent");	
		$("#columnaMultiplicacionD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		/*FILA 6*/
		$("#columnaNumeroLetraDescifradaD").css("backgroundColor", "#FDFD96");
		$("#filaNumeroLetraDescifradaD").append('<td style="text-align:center;" id="columnaNumeroLetraDescifradaD'+ i +'">P<sub>'+i+'</sub> = a<sup>-1</sup> * (C<sub>'+i+'</sub> - b) mod 27</td>');
		$("#columnaNumeroLetraDescifradaD"+i).css("backgroundColor", "#FDFD96");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaNumeroLetraDescifradaD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		$("#columnaNumeroLetraDescifradaD"+i).html("P<sub>"+i+"</sub> = "+(inversoA*(parseInt(valorLetraCifrada) - parseInt(valorB)))+" mod 27");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaNumeroLetraDescifradaD"+i).html("");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		valorLetraDescifrada= (inversoA*(parseInt(valorLetraCifrada) - parseInt(valorB)))%27;
		if(valorLetraDescifrada<0)
		{
			valorLetraDescifrada= valorLetraDescifrada+27;
		}

		$("#columnaNumeroLetraDescifradaD"+i).html("P<sub>"+i+"</sub> = "+valorLetraDescifrada);
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}

		$("#columnaNumeroLetraDescifradaD").css("backgroundColor", "transparent");	
		$("#columnaNumeroLetraDescifradaD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		/*FILA 7*/
		$("#columnaLetraDescifradaD").css("backgroundColor", "#77DD77");
		$("#filaLetraDescifradaD").append('<td style="text-align:center;" id="columnaLetraDescifradaD'+ i +'">'+ abecedario[valorLetraDescifrada].toLowerCase() +'</td>');
		$("#columnaLetraDescifradaD"+i).css("backgroundColor", "#77DD77");
		await sleepAfin(1500*velocidadAnimacionDescifrarAfin);

		if(!seguirDescifrandoAfin)
		{
			return;
		}	

		$("#columnaLetraDescifradaD").css("backgroundColor", "transparent");
		$("#columnaLetraDescifradaD"+i).css("backgroundColor", "transparent");
		await sleepAfin(500*velocidadAnimacionDescifrarAfin);

		cadenaDescifrada= cadenaDescifrada+abecedario[valorLetraDescifrada].toLowerCase();
	}
	
	if(!seguirDescifrandoAfin)
	{
		return;
	}
	
	$("#btn-velocidadDAfin").show();
	$("#btn-descifrarAfin-descifrado").show();
	$("#btn-cancelarDescifrarAfin-descifrado").hide();	
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_8);
	$("#textoMensajeClaroAfinDescifrado").val(cadenaDescifrada.toLowerCase());
}

function validarEntradaCifradoAfin()
{
	var mensaje = "";
	var texto = $('#textoMensajePlanoAfinCifrado').val().replace(/ /g,"");	

	if (texto.length < 1 || texto.length > 10)
	{
		mensaje = mensaje_1;
	}
	else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
		mensaje = mensaje_2;
	}	

	return mensaje;
}

function validarACifradoAfin()
{
	var mensaje = "";	
	var valorA= $('#valorAafinC').val();
	var inversoA;

	if (Number(valorA)<1 || Number(valorA)>26 || (valorA.toString()).indexOf(".") >= 0)
	{
		mensaje = mensaje_15;
	}
	else
	{
		inversoA= tieneInversoMultiplicativo(valorA);
		
		if(inversoA=="No tiene inverso")
		{
			mensaje = mensaje_16;
		}
	}

	return mensaje;
}

function validarBCifradoAfin()
{
	var mensaje = "";	
	var valorB= $('#valorBafinC').val();
	
	if (Number(valorB)<0 || Number(valorB)>26 || valorB.length==0 || valorB.includes("."))
	{
		mensaje = mensaje_17;
	}

	return mensaje;
}

function validarEntradaDescifradoAfin()
{
	var mensaje = "";
	var texto = $('#textoCriptogramaAfinDescifrado').val();	

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

function validarADescifradoAfin()
{
	var mensaje = "";	
	var valorA= $('#valorAafinD').val();
	var inversoA;
	
	if (Number(valorA)<1 || Number(valorA)>26 || valorA.includes("."))
	{
		mensaje = mensaje_15;
	}
	else
	{
		inversoA= tieneInversoMultiplicativo(valorA);
		
		if(inversoA=="No tiene inverso")
		{
			mensaje = mensaje_16;
		}
	}

	return mensaje;
}

function validarBDescifradoAfin()
{
	var mensaje = "";	
	var valorB= $('#valorBafinD').val();
	
	if (Number(valorB)<0 || Number(valorB)>26 || valorB.length==0 || valorB.includes("."))
	{
		mensaje = mensaje_17;
	}

	return mensaje;
}

$(document).ready(function()
{
	$("#CifradoRapidoAfin").click(function(){
	$("#btn-cifrarAfin-cifrado").html('Cifrado Rápido');
	$("#btn-cifrarAfin-cifrado").val(1);
	});
	$("#CifradoNormalAfin").click(function(){
		$("#btn-cifrarAfin-cifrado").html('Cifrado Normal');
		$("#btn-cifrarAfin-cifrado").val(2);
	});
	$("#CifradoLentoAfin").click(function(){
		$("#btn-cifrarAfin-cifrado").html('Cifrado Lento');
		$("#btn-cifrarAfin-cifrado").val(3);
	});
	
	$("#DescifradoRapidoAfin").click(function(){
		$("#btn-descifrarAfin-descifrado").html('Descifrado Rápido');
		$("#btn-descifrarAfin-descifrado").val(1);
	});
	$("#DescifradoNormalAfin").click(function(){
		$("#btn-descifrarAfin-descifrado").html('Descifrado Normal');
		$("#btn-descifrarAfin-descifrado").val(2);
	});
	$("#DescifradoLentoAfin").click(function(){
		$("#btn-descifrarAfin-descifrado").html('Descifrado Lento');
		$("#btn-descifrarAfin-descifrado").val(3);
	});
	
	$("#textoMensajePlanoAfinCifrado").keyup(function()
	{
		var mensaje = validarEntradaCifradoAfin();
		
		var mensaje2 = validarACifradoAfin();
		var mensaje3 = validarBCifradoAfin();

		if($("#textoMensajePlanoAfinCifrado").val().length == 0){
			$("#textoPlanoAfin-error").remove();
			$("#textoMensajePlanoAfinCifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0)
			{
				$("#textoPlanoAfin-error").remove();
				$("#textoMensajePlanoAfinCifrado").parent().parent().append('<div id="textoPlanoAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoMensajePlanoAfinCifrado").addClass('input-error');
				//$("#btn-cifrarAfin-cifrado").attr("disabled", true);
			} else
			{
				$("#textoPlanoAfin-error").remove();
				$("#textoMensajePlanoAfinCifrado").removeClass('input-error');
				
				if(mensaje2.length==0&&mensaje3.length==0)
				{
					$("#btn-cifrarAfin-cifrado").attr("disabled", false);
				}
			}
		}
	});
	
	$("#valorAafinC").on('click change keyup', function() {
		var mensaje = validarACifradoAfin();
		
		var mensaje2 = validarEntradaCifradoAfin();
		var mensaje3 = validarBCifradoAfin();

		if (mensaje.length != 0) {
			$("#valorAafinCAfin-error").remove();
			$("#valorAafinC").parent().parent().append('<div id="valorAafinCAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#valorAafinC").addClass('input-error');
			//$("#btn-cifrarAfin-cifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorAafinCAfin-error"]);
		} else{
			$("#valorAafinCAfin-error").remove();
			$("#valorAafinC").removeClass('input-error');
			
			if(mensaje2.length==0&&mensaje3.length==0)
			{
				$("#btn-cifrarAfin-cifrado").attr("disabled", false);
			}			
		}
	});
	
	$("#valorBafinC").on('click change keyup', function() {
		var mensaje = validarBCifradoAfin();
		
		var mensaje2 = validarEntradaCifradoAfin();
		var mensaje3 = validarACifradoAfin();

		if (mensaje.length != 0)
		{
			$("#valorBafinCAfin-error").remove();
			$("#valorBafinC").parent().parent().append('<div id="valorBafinCAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#valorBafinC").addClass('input-error');
			//$("#btn-cifrarAfin-cifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinCAfin-error"]);
		} else
		{
			$("#valorBafinCAfin-error").remove();
			$("#valorBafinC").removeClass('input-error');
			if(mensaje2.length==0&&mensaje3.length==0)
			{
				$("#btn-cifrarAfin-cifrado").attr("disabled", false);
			}			
		}
	});
	
	$("#textoCriptogramaAfinDescifrado").keyup(function()
	{
		var mensaje = validarEntradaDescifradoAfin();
		
		var mensaje2 = validarADescifradoAfin();
		var mensaje3 = validarBDescifradoAfin();

		if($("#textoCriptogramaAfinDescifrado").val().length == 0){
			$("#criptogramaAfin-error").remove();
			$("#textoCriptogramaAfinDescifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0)
			{
				$("#criptogramaAfin-error").remove();
				$("#textoCriptogramaAfinDescifrado").parent().parent().append('<div id="criptogramaAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoCriptogramaAfinDescifrado").addClass('input-error');
				//$("#btn-descifrarAfin-descifrado").attr("disabled", true);
			} else
			{
				$("#criptogramaAfin-error").remove();
				$("#textoCriptogramaAfinDescifrado").removeClass('input-error');
				
				if(mensaje2.length==0&&mensaje3.length==0)
				{
					$("#btn-descifrarAfin-descifrado").attr("disabled", false);
				}
			}
		}
	});
	
	$("#valorAafinD").on('click change keyup', function() {
		var mensaje = validarADescifradoAfin();
		
		var mensaje2 = validarEntradaDescifradoAfin();
		var mensaje3 = validarBDescifradoAfin();

		if (mensaje.length != 0) {
			$("#valorAafinDAfin-error").remove();
			$("#valorAafinD").parent().parent().append('<div id="valorAafinDAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#valorAafinD").addClass('input-error');
			//$("#btn-descifrarAfin-descifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorAafinDAfin-error"]);
		} else{
			$("#valorAafinDAfin-error").remove();
			$("#valorAafinD").removeClass('input-error');
			
			if(mensaje2.length==0&&mensaje3.length==0)
			{
				$("#btn-descifrarAfin-descifrado").attr("disabled", false);
			}			
		}
	});
	
	$("#valorBafinD").on('click change keyup', function() {
		var mensaje = validarBDescifradoAfin();		
		var mensaje2 = validarEntradaDescifradoAfin();
		var mensaje3 = validarADescifradoAfin();

		if (mensaje.length != 0) {
			$("#valorBafinDAfin-error").remove();
			$("#valorBafinD").parent().parent().append('<div id="valorBafinDAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#valorBafinD").addClass('input-error');
			//$("#btn-descifrarAfin-descifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
		} else{
			$("#valorBafinDAfin-error").remove();
			$("#valorBafinD").removeClass('input-error');
			
			if(mensaje2.length==0&&mensaje3.length==0)
			{
				$("#btn-descifrarAfin-descifrado").attr("disabled", false);
			}			
		}
	});
	
	$("#btn-cifrarAfin-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoAfin();
		var mensaje2= validarACifradoAfin();
		var mensaje3= validarBCifradoAfin();
		
		if(mensaje.length!=0)
		{
			$("#textoPlanoAfin-error").remove();
			$("#textoMensajePlanoAfinCifrado").parent().parent().append('<div id="textoPlanoAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoMensajePlanoAfinCifrado").addClass('input-error');
			//$("#btn-cifrarAfin-cifrado").attr("disabled", true);
		}
		else if(mensaje2.length!=0)
		{
			$("#valorAafinCAfin-error").remove();
			$("#valorAafinC").parent().parent().append('<div id="valorAafinCAfin-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#valorAafinC").addClass('input-error');
			//$("#btn-cifrarAfin-cifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorAafinCAfin-error"]);
		}
		else if(mensaje3.length!=0)
		{
			$("#valorBafinCAfin-error").remove();
			$("#valorBafinC").parent().parent().append('<div id="valorBafinCAfin-error" class="text-danger">&nbsp;'+mensaje3+'</div>');
			$("#valorBafinC").addClass('input-error');
			//$("#btn-cifrarAfin-cifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinCAfin-error"]);
		}
		else
		{
			cifrarAfin();
		}
	});
	
	$("#btn-descifrarAfin-descifrado").click(function()
	{		
		var mensaje= validarEntradaDescifradoAfin();
		var mensaje2= validarADescifradoAfin();
		var mensaje3= validarBDescifradoAfin();		
		
		if(mensaje.length!=0)
		{
			$("#criptogramaAfin-error").remove();
			$("#textoCriptogramaAfinDescifrado").parent().parent().append('<div id="criptogramaAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoCriptogramaAfinDescifrado").addClass('input-error');
			//$("#btn-descifrarAfin-descifrado").attr("disabled", true);
		}
		else if(mensaje2.length!=0)
		{
			$("#valorAafinDAfin-error").remove();
			$("#valorAafinD").parent().parent().append('<div id="valorAafinDAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#valorAafinD").parent().addClass('input-error');
			//$("#btn-descifrarAfin-descifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorAafinDAfin-error"]);
		}
		else if(mensaje3.length!=0)
		{
			$("#valorBafinDAfin-error").remove();
			$("#valorBafinD").parent().parent().append('<div id="valorBafinDAfin-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#valorBafinD").parent().addClass('input-error');
			//$("#btn-descifrarAfin-descifrado").attr("disabled", true);
			//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
		}
		else
		{
			descifrarAfin();
		}
	});
		
	
	$("#btn-cancelarCifrarAfin-cifrado").click(function()
	{
		seguirCifrandoAfin= false;
		
		limpiaPanelAfinCifrado();

		$("#btn-velocidadCAfin").show();
		$("#btn-cifrarAfin-cifrado").show();
		$("#btn-cancelarCifrarAfin-cifrado").hide();
	});
	
	$("#btn-cancelarDescifrarAfin-descifrado").click(function()
	{		
		seguirDescifrandoAfin= false;
		
		limpiaPanelAfinDescifrado();

		$("#btn-velocidadDAfin").show();
		$("#btn-descifrarAfin-descifrado").show();
		$("#btn-cancelarDescifrarAfin-descifrado").hide();
	});
	
	$("#btn-copiarTextoAfin").click(function()
	{
		if ($("#textoMensajeCifradoAfinCifrado").val()=='')
		{
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		}
		else
		{
			$("#textoCriptogramaAfinDescifrado").val($("#textoMensajeCifradoAfinCifrado").val());
			$("#valorAafinD").val($("#valorAafinC").val());
			$("#valorBafinD").val($("#valorBafinC").val());
		}
	});
		

	var i;
	
	for(i=0; i<27; i++)
	{
		var option = document.createElement("option");
		option.text = i;
		option.value = i;
		var select = document.getElementById("valorBafinCarchivo");
		if(select!=null)
		{
			select.appendChild(option);
		}
	}
	
	for(i=0; i<27; i++)
	{
		var option = document.createElement("option");
		option.text = i;
		option.value = i;
		var select = document.getElementById("valorBafinDarchivo");
		if(select!=null)
		{
			select.appendChild(option);
		}
	}
});

function sleepAfin(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}