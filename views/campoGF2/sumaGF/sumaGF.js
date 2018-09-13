var velocidadAnimacionOperacionSumaEF= 1;
var seguirCalculandoOSEF= true;

function mostrarOperacionSumaEF()
{	
	$("#panelInteractivo-operacionSumaEF").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOperacionSumaEF(){
	seguirCalculandoOSEF = false;

	$("#panelInteractivo-operacionSumaEF").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOperacionSumaEF();

	$("#btn-velocidadOSEF").show();
	$("#btnCalcularOSEF").show();
	$("#btnCancelarOSEF").hide();

	$("#aOperacionSumaEF-error").remove();
	$("#aOperacionSumaEF").removeClass('input-error');
	$("#bOperacionSumaEF-error").remove();
	$("#bOperacionSumaEF").removeClass('input-error');

	$("#aOperacionSumaEF").val("1");
	$("#bOperacionSumaEF").val("1");
}

function limpiaPanelOperacionSumaEF()
{	
	$("#seccionOSEF").show();
		if($('#informacion1OSEF').is(':visible'))
		{
			$("#informacion1OSEF").slideToggle(500);
		}
		
		$("#informacion1OSEF").empty();
		$("#representacionPolinomialAOSEF").empty();
		$("#operadorOSEF").empty();
		$("#representacionPolinomialBOSEF").empty();
		$("#barraOSEF").empty();
		$("#representacionPolinomialROSEF").empty();
		$("#representacionBinariaROSEF").empty();
		
		$("#seccionOSEF").hide();

	$("#resultadoOSEF").val("");

	$("#aOperacionSumaEF").val("");
	$("#bOperacionSumaEF").val("");
}

function obtenervelocidadAnimacionOperacionSumaEF()
{
	if($('#btnCalcularOSEF').val() == 1)
	{
		velocidadAnimacionOperacionSumaEF = 0.25;
	}
	else
	{
		velocidadAnimacionOperacionSumaEF = 0.8;
	}

	$("#btn-velocidadOSEF").hide();
	$("#btnCalcularOSEF").hide();
	$("#btnCancelarOSEF").show();
	seguirCalculandoOSEF= true;
}

async function realizarOperacionSumaEF()
{
	var inputA= document.getElementById("aOperacionSumaEF");
	var numeroA= parseInt(inputA.value);

	var inputB= document.getElementById("bOperacionSumaEF");
	var numeroB= parseInt(inputB.value);

	var numeroR;

	var i, contadorExponente= 0, repPolinomialA= "", repPolinomialB= "", repPolinomialR= "", bandera= 1, repBinariaR= "", contadorElementos= 0, contadorAux= 0;

	var labelsPolinomioA= [], labelsPolinomioB= [], labelsPolinomioR= [], labelsBinarioR= [];

	limpiaPanelOperacionSumaEF();
	obtenervelocidadAnimacionOperacionSumaEF();

	$("#aOperacionSumaEF").val(numeroA);
	$("#bOperacionSumaEF").val(numeroB);

	var zonaRepresentacionPolinomialA= document.getElementById("representacionPolinomialAOSEF");
	var zonaRepresentacionPolinomialB= document.getElementById("representacionPolinomialBOSEF");
	var zonaRepresentacionPolinomialR= document.getElementById("representacionPolinomialROSEF");
	var zonaRepresentacionBinariaR= document.getElementById("representacionBinariaROSEF");

	$("#seccionOSEF").show();

	$("#informacion1OSEF").append("Obtenemos la representación polinomial de los números dados:");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(1500);

	if(!seguirCalculandoOSEF){ return; }

	for(i=1; i<256; i=i<<1)
	{
		var elementoPolinomial= document.createElement("label");
		if(!seguirCalculandoOSEF){ return; }

		if(numeroA==0)
		{
			elementoPolinomial.innerHTML= "0";
			zonaRepresentacionPolinomialA.appendChild(elementoPolinomial);
			i= 256;
		}
		else
		{
			if(i&numeroA)
			{
				contadorElementos++;
				if(contadorExponente==0)
				{
					elementoPolinomial.innerHTML= "1";

					if(bandera==1)
					{
						zonaRepresentacionPolinomialA.appendChild(elementoPolinomial);
						bandera= 0;
					}
				}
				else if(contadorExponente==1)
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x";
						zonaRepresentacionPolinomialA.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x +";
						zonaRepresentacionPolinomialA.insertAdjacentHTML('afterbegin', " ");
						zonaRepresentacionPolinomialA.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}
				else
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup>";
						zonaRepresentacionPolinomialA.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup> +";
						zonaRepresentacionPolinomialA.insertAdjacentHTML('afterbegin', " ");
						zonaRepresentacionPolinomialA.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}
			}
			else
			{
				elementoPolinomial.innerHTML= "";
			}
		}

		labelsPolinomioA.push(elementoPolinomial);

		contadorExponente++;
	}

	contadorExponente= 0;
	bandera= 1;

	for(i=1; i<256; i=i<<1)
	{
		var elementoPolinomial= document.createElement("label");
		if(!seguirCalculandoOSEF){ return; }

		if(numeroB==0)
		{
			elementoPolinomial.innerHTML= "0";
			zonaRepresentacionPolinomialB.appendChild(elementoPolinomial);
			i= 256;
		}
		else
		{
			if(i&numeroB)
			{
				contadorAux++;

				if(contadorExponente==0)
				{
					elementoPolinomial.innerHTML= "1";

					if(bandera==1)
					{
						zonaRepresentacionPolinomialB.appendChild(elementoPolinomial);
						bandera= 0;
					}
				}
				else if(contadorExponente==1)
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x";
						zonaRepresentacionPolinomialB.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x +";
						zonaRepresentacionPolinomialB.insertAdjacentHTML('afterbegin', " ");
						zonaRepresentacionPolinomialB.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}
				else
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup>";
						zonaRepresentacionPolinomialB.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup> +";
						zonaRepresentacionPolinomialB.insertAdjacentHTML('afterbegin', " ");
						zonaRepresentacionPolinomialB.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}
			}
			else
			{
				elementoPolinomial.innerHTML= "";
			}
		}

		labelsPolinomioB.push(elementoPolinomial);

		contadorExponente++;
	}

	var zonaMas= document.getElementById("operadorOSEF");
	var zonaBarra= document.getElementById("barraOSEF");

	if(contadorElementos>contadorAux)
	{
		var elementoL= document.createElement("label");
		elementoL.innerHTML= "+";
		zonaMas.appendChild(elementoL);

		for(i= 0; i<contadorElementos; i++)
		{
			var elemento= document.createElement("label");
			elemento.innerHTML+= ' ';
			zonaMas.appendChild(document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ));
		}
		
		var elementoB= document.createElement("label");

		for(i= 0; i<contadorElementos; i++)
		{
			elementoB.innerHTML= elementoB.innerHTML+"--------";
		}
		zonaBarra.appendChild(elementoB);
	}
	else
	{
		var elementoL= document.createElement("label");
		elementoL.innerHTML= "+";
		zonaMas.appendChild(elementoL);

		for(i= 0; i<contadorAux; i++)
		{
			var elemento= document.createElement("label");
			elemento.innerHTML+= ' ';
			zonaMas.appendChild(document.createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' ));
		}

		var elementoB= document.createElement("label");

		for(i= 0; i<contadorAux; i++)
		{
			elementoB.innerHTML= elementoB.innerHTML+"--------";
		}
		zonaBarra.appendChild(elementoB);
	}

	await sleepSumaGF(2000*velocidadAnimacionOperacionSumaEF);
	if(!seguirCalculandoOSEF){ return; }

	//Realizamos SUMA

	$("#informacion1OSEF").slideToggle(250);
	await sleepSumaGF(250);
	$("#informacion1OSEF").empty();

	$("#informacion1OSEF").append("Para realizar la suma hay que tener en cuenta lo siguiente: los términos iguales no se suman, estos se eliminan.");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(3500);

	if(!seguirCalculandoOSEF){ return; }

	$("#informacion1OSEF").slideToggle(250);
	await sleepSumaGF(250);
	$("#informacion1OSEF").empty();

	$("#informacion1OSEF").append("Lo anterior es porque hay que recordar que para realizar la representación polinomial nos basamos en la notación binaria de los números.");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(4400);

	if(!seguirCalculandoOSEF){ return; }

	$("#informacion1OSEF").slideToggle(250);
	await sleepSumaGF(250);
	$("#informacion1OSEF").empty();

	$("#informacion1OSEF").append("Por ejemplo: x+x= 2x, no hay forma de representarlo en el campo en el que trabajamos ya que al final sólo son unos o ceros, lo que nos indica la presencia o no de términos en el polinomio.");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(7250);

	if(!seguirCalculandoOSEF){ return; }

	$("#informacion1OSEF").slideToggle(250);
	await sleepSumaGF(250);
	$("#informacion1OSEF").empty();

	$("#informacion1OSEF").append("A continuación se realizará la suma de los números:");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(1500);

	if(!seguirCalculandoOSEF){ return; }

	bandera= 1;
	await sleepSumaGF(500*velocidadAnimacionOperacionSumaEF);
	if(!seguirCalculandoOSEF){ return; }

	if(numeroA!=0&&numeroB!=0)
	{
		for(i= 0; i<8; i++)
		{
			if(!seguirCalculandoOSEF){ return; }

			var textoPA= labelsPolinomioA[i].innerHTML;
			var textoPB= labelsPolinomioB[i].innerHTML;
			var textoPR= "";
			var elementoPolinomial= document.createElement("label");

			textoPA= textoPA.replace(/ /g,"");
			textoPA= textoPA.replace('+','');
			textoPB= textoPB.replace(/ /g,"");
			textoPB= textoPB.replace('+','');

			if(textoPA==textoPB)
			{
				textoPR= "";
				labelsPolinomioA[i].style.backgroundColor= "#FF6961";
				labelsPolinomioB[i].style.backgroundColor= "#FF6961";
				await sleepSumaGF(500*velocidadAnimacionOperacionSumaEF);
			}
			else if(textoPA.length!=0)
			{
				textoPR= textoPA;
				labelsPolinomioA[i].style.backgroundColor= "#FDFD96";
				await sleepSumaGF(500*velocidadAnimacionOperacionSumaEF);
			}
			else if(textoPB.length!=0)
			{
				textoPR= textoPB;
				labelsPolinomioB[i].style.backgroundColor= "#FDFD96";
				await sleepSumaGF(500*velocidadAnimacionOperacionSumaEF);
			}

			if(textoPR!="")
			{
				if(bandera==1)
				{			
					elementoPolinomial.innerHTML= textoPR;

					zonaRepresentacionPolinomialR.appendChild(elementoPolinomial);
					bandera= 0;
				}
				else
				{
					elementoPolinomial.innerHTML= textoPR+" +";
					
					zonaRepresentacionPolinomialR.insertAdjacentHTML('afterbegin', " ");
					zonaRepresentacionPolinomialR.insertAdjacentElement('afterbegin', elementoPolinomial);
				}

				elementoPolinomial.style.backgroundColor= "#77DD77";
				await sleepSumaGF(500*velocidadAnimacionOperacionSumaEF);
			}

			labelsPolinomioA[i].style.backgroundColor= "transparent";
			labelsPolinomioB[i].style.backgroundColor= "transparent";
			elementoPolinomial.style.backgroundColor= "transparent";
			await sleepSumaGF(25*velocidadAnimacionOperacionSumaEF);
		}
	}
	else
	{
		if(numeroA!=0)
		{
			var mas= 1;

			for(i= 0; i<labelsPolinomioA.length; i++)
			{
				var elemento= document.createElement("label");
				elemento.innerHTML= labelsPolinomioA[i].innerHTML;

				if(elemento.innerHTML!= "")
				{
					if(mas==1)
					{
						zonaRepresentacionPolinomialR.appendChild(elemento);
						mas= 0;
					}
					else
					{
						zonaRepresentacionPolinomialR.insertAdjacentHTML('afterbegin', " ");
						zonaRepresentacionPolinomialR.insertAdjacentElement('afterbegin', elemento);
					}		
				}
			}
		}
		else if(numeroB!=0)
		{			
			var mas= 1;

			for(i= 0; i<labelsPolinomioB.length; i++)
			{
				var elemento= document.createElement("label");
				elemento.innerHTML= labelsPolinomioB[i].innerHTML;

				if(elemento.innerHTML!= "")
				{
					if(mas==1)
					{
						zonaRepresentacionPolinomialR.appendChild(elemento);
						mas= 0;
					}
					else
					{
						zonaRepresentacionPolinomialR.insertAdjacentHTML('afterbegin', " ");
						zonaRepresentacionPolinomialR.insertAdjacentElement('afterbegin', elemento);
					}		
				}
			}
		}
		else
		{
			var operador= document.createElement("label");
			operador.innerHTML= "0";
			zonaRepresentacionPolinomialR.appendChild(operador);
		}
	}

	await sleepSumaGF(1000*velocidadAnimacionOperacionSumaEF);

	if(!seguirCalculandoOSEF){ return;}

	$("#informacion1OSEF").slideToggle(250);
	await sleepSumaGF(250);
	$("#informacion1OSEF").empty();

	$("#informacion1OSEF").append("Convertimos el polinomio obtenido a su notación binaria y obtenemos el resultado:");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(2250);

	if(!seguirCalculandoOSEF){ return; }

	numeroR= numeroA ^ numeroB;

	repBinariaR= numeroR.toString(2);

	for(i=repBinariaR.length; i<8; i++)
	{
		repBinariaR= "0"+repBinariaR;
	}

	for(i= 0; i<8; i++)
	{
		var elementoBinario= document.createElement("label");
		elementoBinario.innerHTML= repBinariaR.charAt(i);
		labelsBinarioR.push(elementoBinario);
	}

	for(i= 0; i<8; i++)
	{
		zonaRepresentacionBinariaR.appendChild(labelsBinarioR[i]);
	}

	$("#informacion1OSEF").slideToggle(250);
	await sleepSumaGF(250);
	$("#informacion1OSEF").empty();

	$("#informacion1OSEF").append("Es importante hacer notar que la suma de 2 números en este campo se realiza con el operador lógico XOR. Osea que al momento de programar no es necesaria hacer la representación polinomial.");
	$("#informacion1OSEF").slideToggle(500);
	await sleepSumaGF(6750);

	if(!seguirCalculandoOSEF){ return; }

	$("#btn-velocidadOSEF").show();
	$("#btnCalcularOSEF").show();
	$("#btnCancelarOSEF").hide();
				
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_72);
	$("#resultadoOSEF").val(numeroR);
}

function validarNumeroAOSEF()
{
	var mensaje = "";	
	var valorA= $('#aOperacionSumaEF').val();
	
	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_87;
	}	

	return mensaje;
}

function validarNumeroBOSEF()
{
	var mensaje = "";	
	var valorB= $('#bOperacionSumaEF').val();
	
	if (Number(valorB)<0 || Number(valorB)>255 || valorB.length == 0 || valorB.includes("."))
	{
		mensaje = mensaje_88;
	}	

	return mensaje;
}

$(document).ready(function()
{
	$("#CalcularRapidoOSEF").click(function(){
		$("#btnCalcularOSEF").html('Calcular Rápido');
		$("#btnCalcularOSEF").val(1);
	});
	$("#CalcularNormalOSEF").click(function(){
		$("#btnCalcularOSEF").html('Calcular Normal');
		$("#btnCalcularOSEF").val(2);
	});

	$("#btnCalcularOSEF").click(function()
	{
		var mensaje = validarNumeroAOSEF();
		var mensaje2= validarNumeroBOSEF();

		if(mensaje.length!=0)
		{
			$("#aOperacionSumaEF-error").remove();
			$("#aOperacionSumaEF").parent().append('<div id="aOperacionSumaEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOperacionSumaEF").addClass('input-error');
			//$("#btnCalcularOSEF").attr("disabled", true);
		}
		if(mensaje2.length!=0)
		{
			$("#bOperacionSumaEF-error").remove();
			$("#bOperacionSumaEF").parent().parent().append('<div id="bOperacionSumaEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOperacionSumaEF").addClass('input-error');
			//$("#btnCalcularOSEF").attr("disabled", true);
		}
		if(mensaje.length == 0 && mensaje2.length == 0)
		{
			realizarOperacionSumaEF();
		}
	});

	$("#btnCancelarOSEF").click(function()
	{
		seguirCalculandoOSEF= false;
		
		limpiaPanelOperacionSumaEF();

		$("#btn-velocidadOSEF").show();
		$("#btnCalcularOSEF").show();
		$("#btnCancelarOSEF").hide();
	});

	$("#aOperacionSumaEF").on('click change keyup', function() {
		var mensaje = validarNumeroAOSEF();
		var mensaje2= validarNumeroBOSEF();

		if (mensaje.length != 0) 
		{
			$("#aOperacionSumaEF-error").remove();
			$("#aOperacionSumaEF").parent().parent().append('<div id="aOperacionSumaEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOperacionSumaEF").addClass('input-error');
			//$("#btnCalcularOSEF").attr("disabled", true);
		}
		else
		{
			$("#aOperacionSumaEF-error").remove();
			$("#aOperacionSumaEF").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOSEF").attr("disabled", false);
			}
		}
	});

	$("#bOperacionSumaEF").on('click change keyup', function() {
		var mensaje = validarNumeroBOSEF();
		var mensaje2 = validarNumeroAOSEF();

		if (mensaje.length != 0) 
		{
			$("#bOperacionSumaEF-error").remove();
			$("#bOperacionSumaEF").parent().parent().append('<div id="bOperacionSumaEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOperacionSumaEF").addClass('input-error');
			//$("#btnCalcularOSEF").attr("disabled", true);
		}
		else
		{
			$("#bOperacionSumaEF-error").remove();
			$("#bOperacionSumaEF").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOSEF").attr("disabled", false);
			}
		}
	});

	//Funciones calculadora
	$("#aOSGFC").keyup(function()
	{
		var mensaje = validarNumeroAOSGFC();
		var mensaje2= validarNumeroBOSGFC();

		if (mensaje.length != 0) 
		{
			$("#aOSGFC-error").remove();
			$("#aOSGFC").parent().append('<div id="aOSGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOSGFC").addClass('input-error');
			//$("#btnCalcularOSGFC").attr("disabled", true);
		}
		else
		{
			$("#aOSGFC-error").remove();
			$("#aOSGFC").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOSGFC").attr("disabled", false);
			}
		}
	});

	$("#bOSGFC").keyup(function()
	{
		var mensaje = validarNumeroBOSGFC();
		var mensaje2= validarNumeroAOSGFC();

		if (mensaje.length != 0) 
		{
			$("#bOSGFC-error").remove();
			$("#bOSGFC").parent().append('<div id="bOSGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOSGFC").addClass('input-error');
			//$("#btnCalcularOSGFC").attr("disabled", true);
		}
		else
		{
			$("#bOSGFC-error").remove();
			$("#bOSGFC").removeClass('input-error');
			
			if(mensaje2.length==0)
			{
				$("#btnCalcularOSGFC").attr("disabled", false);
			}
		}
	});

	$("#btnCalcularOSGFC").click(function()
	{
		var mensaje = validarNumeroBOSGFC();
		var mensaje2= validarNumeroAOSGFC();

		if (mensaje2.length != 0) 
		{
			$("#aOSGFC-error").remove();
			$("#aOSGFC").parent().append('<div id="aOSGFC-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#aOSGFC").addClass('input-error');
			//$("#btnCalcularOSGFC").attr("disabled", true);
		}
		else
		{
			$("#aOSGFC-error").remove();
			$("#aOSGFC").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOSGFC").attr("disabled", false);
			}
		}

		if (mensaje.length != 0) 
		{
			$("#bOSGFC-error").remove();
			$("#bOSGFC").parent().append('<div id="bOSGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOSGFC").addClass('input-error');
			//$("#btnCalcularOSGFC").attr("disabled", true);
		}
		else
		{
			$("#bOSGFC-error").remove();
			$("#bOSGFC").removeClass('input-error');
			
			if(mensaje2.length==0)
			{
				$("#btnCalcularOSGFC").attr("disabled", false);
			}
		}

		if(mensaje.length == 0 && mensaje2.length == 0){
			var resultado= sumarOSGFC();

			$("#ResultadoOSGFC").val(resultado);
		}
	});

});

//Funciones calculadora
function validarNumeroAOSGFC()
{
	var mensaje = "";	
	var valorA= $('#aOSGFC').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_87;
	}	

	return mensaje;
}

function validarNumeroBOSGFC()
{
	var mensaje = "";	
	var valorA= $('#bOSGFC').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_88;
	}	

	return mensaje;
}

function sumarOSGFC()
{
	var valorA= Number($('#aOSGFC').val());
	var valorB= Number($('#bOSGFC').val());

	return valorA^valorB;
}

function sleepSumaGF(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}