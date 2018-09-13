var velocidadAnimacionOperacionConvertirNP= 1;
var seguirCalculandoOperacionConvertirNP= true;

function mostraroperacionConvertirNP()
{	
	$("#panelInteractivo-operacionConvertirNP").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOperacionConvertirNP(){
	seguirCalculandoOperacionConvertirNP= false;
	
	$("#panelInteractivo-operacionConvertirNP").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOperacionConvertirNP();

	$("#btn-velocidadOCNP").show();
	$("#btnCalcularOCNP").show();
	$("#btnCancelarOCNP").hide();

	$("#aoperacionConvertirNP").val("1");

	$("#aoperacionConvertirNP-error").remove();
	$("#aoperacionConvertirNP").removeClass('input-error');
}

function limpiaPanelOperacionConvertirNP()
{	
	$("#seccionRepresentacionBinariaPolinomiaOCNP").show();
	if($('#informacion1OCNP').is(':visible'))
	{
		$("#informacion1OCNP").slideToggle(500);
	}
	
	$("#informacion1OCNP").empty();
	$("#representacionBinariaOCNP").empty();
	$("#representacionPolinomialOCNP").empty();
	
	$("#seccionRepresentacionBinariaPolinomiaOCNP").hide();

	$("#resultadoOCNP").val("");
	$("#aoperacionConvertirNP").val("");
}

function obtenervelocidadAnimacionOperacionConvertirNP()
{
	if($('#btnCalcularOCNP').val() == 1)
	{
		velocidadAnimacionOperacionConvertirNP = 0.25;
	}
	else
	{
		velocidadAnimacionOperacionConvertirNP = 0.9;
	}

	$("#btn-velocidadOCNP").hide();
	$("#btnCalcularOCNP").hide();
	$("#btnCancelarOCNP").show();
	seguirCalculandoOperacionConvertirNP= true;
}

async function realizarOperacionConvertirNP()
{
	var inputA= document.getElementById("aoperacionConvertirNP");
	var numeroA= parseInt(inputA.value);

	var i, contadorExponente= 0, repBinaria= "", j= 1, bandera= 1, repPolinomial= "";

	var labelsEjemploBinarios= [], labelsEjemploPolinomios= [];

	limpiaPanelOperacionConvertirNP();
	obtenervelocidadAnimacionOperacionConvertirNP();

	$("#aoperacionConvertirNP").val(numeroA);

	var zonaRepresentacionBinaria= document.getElementById("representacionBinariaOCNP");
	var zonaRepresentacionPolinomial= document.getElementById("representacionPolinomialOCNP");

	$("#seccionRepresentacionBinariaPolinomiaOCNP").show();

	repBinaria= numeroA.toString(2);

	for(i=repBinaria.length; i<8; i++)
	{
		repBinaria= "0"+repBinaria;
	}

	for(i= 0; i<8; i++)
	{
		var elementoBinario= document.createElement("label");
		elementoBinario.innerHTML= repBinaria.charAt(i);
		labelsEjemploBinarios.push(elementoBinario);
	}

	$("#informacion1OCNP").append("El cifrado AES trabaja con el campo GF(2<sup>8</sup>), es decir, con 256 elementos.");
	$("#informacion1OCNP").slideToggle(500);
	await sleepConvertirGF(3250);

	if(!seguirCalculandoOperacionConvertirNP){ return; }

	$("#informacion1OCNP").slideToggle(250);
	await sleepConvertirGF(250);
	$("#informacion1OCNP").empty();

	$("#informacion1OCNP").append("Y esto es porque cada uno de esos elementos puede ser representado por un byte.");
	$("#informacion1OCNP").slideToggle(500);
	await sleepConvertirGF(3250);

	if(!seguirCalculandoOperacionConvertirNP){ return; }

	$("#informacion1OCNP").slideToggle(250);
	await sleepConvertirGF(250);
	$("#informacion1OCNP").empty();

	$("#informacion1OCNP").append("Ahora para trabajar con los elementos en este campo, no los veremos como números sino como polinomios.");
	$("#informacion1OCNP").slideToggle(500);
	await sleepConvertirGF(3250);

	if(!seguirCalculandoOperacionConvertirNP){ return; }

	$("#informacion1OCNP").slideToggle(250);
	await sleepConvertirGF(250);
	$("#informacion1OCNP").empty();

	$("#informacion1OCNP").append("El grado máximo de un polinomio es 7 en este caso. Para representar un número como polinomio nos basaremos en la notación binaria del número.");
	$("#informacion1OCNP").slideToggle(500);
	await sleepConvertirGF(4000);

	if(!seguirCalculandoOperacionConvertirNP){ return; }

	$("#informacion1OCNP").slideToggle(250);
	await sleepConvertirGF(250);
	$("#informacion1OCNP").empty();

	$("#informacion1OCNP").append("Los unos en la notación binaria nos indican los términos del polinomio.");
	$("#informacion1OCNP").slideToggle(500);
	await sleepConvertirGF(3250);

	if(!seguirCalculandoOperacionConvertirNP){ return; }

	$("#informacion1OCNP").slideToggle(250);
	await sleepConvertirGF(250);
	$("#informacion1OCNP").empty();

	$("#informacion1OCNP").append("A continuación convertiremos el número dado en su representación polinomial:");
	$("#informacion1OCNP").slideToggle(500);
	await sleepConvertirGF(3250);

	if(!seguirCalculandoOperacionConvertirNP){ return; }

	for(i= 0; i<8; i++)
	{
		zonaRepresentacionBinaria.appendChild(labelsEjemploBinarios[i]);
	}

	for(i= 0; i<8; i++)
	{
		labelsEjemploBinarios[7-parseInt(i)].style.backgroundColor= "#FDFD96";
		await sleepConvertirGF(500*velocidadAnimacionOperacionConvertirNP);

		if(!seguirCalculandoOperacionConvertirNP){ return; }

		var elementoPolinomial= document.createElement("label");
		if(j&numeroA)
		{
			if(contadorExponente==0)
			{
				elementoPolinomial.innerHTML= "1";
				repPolinomial= repPolinomial+"1";				

				if(bandera==1)
				{
					bandera= 0;
				}
			}
			else if(contadorExponente==1)
			{
				if(bandera==1)
				{
					elementoPolinomial.innerHTML= "x";
					repPolinomial= repPolinomial+"x";
					bandera= 0;
				}
				else
				{
					elementoPolinomial.innerHTML= "x +";
					repPolinomial= "x +"+repPolinomial;
				}
			}
			else
			{
				if(bandera==1)
				{
					elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup>";
					repPolinomial= "x^"+contadorExponente+""+repPolinomial;
					bandera= 0;
				}
				else
				{
					elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup> +";
					repPolinomial= "x^"+contadorExponente+" + "+repPolinomial;
				}
			}

			if(i==0)
			{
				zonaRepresentacionPolinomial.appendChild(elementoPolinomial);
			}
			else
			{
				zonaRepresentacionPolinomial.insertAdjacentHTML('afterbegin', " ");
				zonaRepresentacionPolinomial.insertAdjacentElement('afterbegin', elementoPolinomial);
			}
		}
		else
		{
			elementoPolinomial.innerHTML= " ";
			zonaRepresentacionPolinomial.insertAdjacentElement('afterbegin', elementoPolinomial);
		}

		labelsEjemploPolinomios.push(elementoPolinomial);

		elementoPolinomial.style.backgroundColor= "#FDFD96";
		await sleepConvertirGF(500*velocidadAnimacionOperacionConvertirNP);

		labelsEjemploBinarios[7-parseInt(i)].style.backgroundColor= "transparent";
		elementoPolinomial.style.backgroundColor= "transparent";
		await sleepConvertirGF(25*velocidadAnimacionOperacionConvertirNP);

		if(!seguirCalculandoOperacionConvertirNP){ return; }

		contadorExponente++;
		j= j<<1;
	}

	for(i= 0; i<8; i++)
	{
		labelsEjemploPolinomios[i].style.backgroundColor= "#77DD77";
	}

	if(numeroA==0)
	{
		repPolinomial= "0";
	}

	$("#btn-velocidadOCNP").show();
	$("#btnCalcularOCNP").show();
	$("#btnCancelarOCNP").hide();
				
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_72);
	$("#resultadoOCNP").val(repPolinomial);
}

function validarNumeroOCNP()
{
	var mensaje = "";	
	var valorA= $('#aoperacionConvertirNP').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_86;
	}	

	return mensaje;
}

$(document).ready(function()
{
	$("#CalcularRapidoOCNP").click(function(){
		$("#btnCalcularOCNP").html('Calcular Rápido');
		$("#btnCalcularOCNP").val(1);
	});
	$("#CalcularNormalOCNP").click(function(){
		$("#btnCalcularOCNP").html('Calcular Normal');
		$("#btnCalcularOCNP").val(2);
	});

	$("#btnCalcularOCNP").click(function()
	{
		var mensaje = validarNumeroOCNP();

		if(mensaje.length!=0)
		{
			$("#aoperacionConvertirNP-error").remove();
			$("#aoperacionConvertirNP").parent().parent().append('<div id="aoperacionConvertirNP-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aoperacionConvertirNP").addClass('input-error');
			//$("#btnCalcularOCNP").attr("disabled", true);
		}
		else
		{
			realizarOperacionConvertirNP();
		}
	});

	$("#btnCancelarOCNP").click(function()
	{
		seguirCalculandoOperacionConvertirNP= false;
		
		limpiaPanelOperacionConvertirNP();

		$("#btn-velocidadOCNP").show();
		$("#btnCalcularOCNP").show();
		$("#btnCancelarOCNP").hide();
	});

	$("#aoperacionConvertirNP").on('click change keyup', function() {
		var mensaje = validarNumeroOCNP();

		if (mensaje.length != 0) 
		{
			$("#aoperacionConvertirNP-error").remove();
			$("#aoperacionConvertirNP").parent().parent().append('<div id="aoperacionConvertirNP-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aoperacionConvertirNP").addClass('input-error');
			//$("#btnCalcularOCNP").attr("disabled", true);
		}
		else
		{
			$("#aoperacionConvertirNP-error").remove();
			$("#aoperacionConvertirNP").removeClass('input-error');
			$("#btnCalcularOCNP").attr("disabled", false);
		}
	});

	//Funciones calculadora
	$("#aOCNPC").keyup(function()
	{
		var mensaje = validarNumeroAOCNPC();

		if (mensaje.length != 0) 
		{
			$("#aOCNPC-error").remove();
			$("#aOCNPC").parent().append('<div id="aOCNPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOCNPC").addClass('input-error');
			//$("#btnCalcularOCNPC").attr("disabled", true);
		}
		else
		{
			$("#aOCNPC-error").remove();
			$("#aOCNPC").removeClass('input-error');
			$("#btnCalcularOCNPC").attr("disabled", false);
		}
	});

	$("#btnCalcularOCNPC").click(function()
	{
		var mensaje = validarNumeroAOCNPC();

		if (mensaje.length != 0) 
		{
			$("#aOCNPC-error").remove();
			$("#aOCNPC").parent().append('<div id="aOCNPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOCNPC").addClass('input-error');
			//$("#btnCalcularOCNPC").attr("disabled", true);
		}
		else
		{
			$("#aOCNPC-error").remove();
			$("#aOCNPC").removeClass('input-error');
			$("#btnCalcularOCNPC").attr("disabled", false);

			var repPolinomial= convertirNumeroAPolinomioOCNPC();

			document.getElementById("ResultadoOCNPC").innerHTML= repPolinomial;
		}
	});

	//CONVERTIR POLINOMIO A NUMERO
	$("#x7OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX7OCPNC();
		var mensaje2 = validarNumeroX6OCPNC();
		var mensaje3 = validarNumeroX5OCPNC();
		var mensaje4 = validarNumeroX4OCPNC();
		var mensaje5 = validarNumeroX3OCPNC();
		var mensaje6 = validarNumeroX2OCPNC();
		var mensaje7 = validarNumeroX1OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x7OCPNC-error").remove();
			$("#x7OCPNC").parent().append('<div id="x7OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x7OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x7OCPNC-error").remove();
			$("#x7OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x6OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX6OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX5OCPNC();
		var mensaje4 = validarNumeroX4OCPNC();
		var mensaje5 = validarNumeroX3OCPNC();
		var mensaje6 = validarNumeroX2OCPNC();
		var mensaje7 = validarNumeroX1OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x6OCPNC-error").remove();
			$("#x6OCPNC").parent().append('<div id="x6OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x6OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x6OCPNC-error").remove();
			$("#x6OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x5OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX5OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX6OCPNC();
		var mensaje4 = validarNumeroX4OCPNC();
		var mensaje5 = validarNumeroX3OCPNC();
		var mensaje6 = validarNumeroX2OCPNC();
		var mensaje7 = validarNumeroX1OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x5OCPNC-error").remove();
			$("#x5OCPNC").parent().append('<div id="x5OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x5OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x5OCPNC-error").remove();
			$("#x5OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x4OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX4OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX6OCPNC();
		var mensaje4 = validarNumeroX5OCPNC();
		var mensaje5 = validarNumeroX3OCPNC();
		var mensaje6 = validarNumeroX2OCPNC();
		var mensaje7 = validarNumeroX1OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x4OCPNC-error").remove();
			$("#x4OCPNC").parent().append('<div id="x4OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x4OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x4OCPNC-error").remove();
			$("#x4OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x3OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX3OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX6OCPNC();
		var mensaje4 = validarNumeroX5OCPNC();
		var mensaje5 = validarNumeroX4OCPNC();
		var mensaje6 = validarNumeroX2OCPNC();
		var mensaje7 = validarNumeroX1OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x3OCPNC-error").remove();
			$("#x3OCPNC").parent().append('<div id="x3OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x3OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x3OCPNC-error").remove();
			$("#x3OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x2OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX2OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX6OCPNC();
		var mensaje4 = validarNumeroX5OCPNC();
		var mensaje5 = validarNumeroX4OCPNC();
		var mensaje6 = validarNumeroX3OCPNC();
		var mensaje7 = validarNumeroX1OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x2OCPNC-error").remove();
			$("#x2OCPNC").parent().append('<div id="x2OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x2OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x2OCPNC-error").remove();
			$("#x2OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x1OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX1OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX6OCPNC();
		var mensaje4 = validarNumeroX5OCPNC();
		var mensaje5 = validarNumeroX4OCPNC();
		var mensaje6 = validarNumeroX3OCPNC();
		var mensaje7 = validarNumeroX2OCPNC();
		var mensaje8 = validarNumeroX0OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x1OCPNC-error").remove();
			$("#x1OCPNC").parent().append('<div id="x1OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x1OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x1OCPNC-error").remove();
			$("#x1OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#x0OCPNC").keyup(function()
	{
		var mensaje = validarNumeroX0OCPNC();
		var mensaje2 = validarNumeroX7OCPNC();
		var mensaje3 = validarNumeroX6OCPNC();
		var mensaje4 = validarNumeroX5OCPNC();
		var mensaje5 = validarNumeroX4OCPNC();
		var mensaje6 = validarNumeroX3OCPNC();
		var mensaje7 = validarNumeroX2OCPNC();
		var mensaje8 = validarNumeroX1OCPNC();

		if (mensaje.length != 0) 
		{
			$("#x0OCPNC-error").remove();
			$("#x0OCPNC").parent().append('<div id="x0OCPNC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#x0OCPNC").addClass('input-error');
			//$("#btnCalcularOCPNC").attr("disabled", true);
		}
		else
		{
			$("#x0OCPNC-error").remove();
			$("#x0OCPNC").removeClass('input-error');

			if(mensaje2.length==0&&mensaje3.length==0&&mensaje4.length==0&&mensaje5.length==0&&mensaje6.length==0&&mensaje7.length==0&&mensaje8.length==0)
			{
				$("#btnCalcularOCPNC").attr("disabled", false);
			}
		}
	});

	$("#btnCalcularOCPNC").click(function()
	{
		var numero= convertirPolinomioANumeroOCPNC();

		document.getElementById("ResultadoOCPNC").innerHTML= numero;
	});

});

//Funciones calculadora
function validarNumeroAOCNPC()
{
	var mensaje = "";	
	var valorA= $('#aOCNPC').val();
	var numeroLetras= $('#aOCNPC').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_86;
	}	

	return mensaje;
}

function convertirNumeroAPolinomioOCNPC()
{
	var valorA= Number($('#aOCNPC').val());
	var representacionPolinomial= "";
	var i;
	var corrimiento= 1;
	var bandera= 0;

	if(valorA!=0)
	{
		for(i=0; i<8; i++)
		{
			if(corrimiento&valorA)
			{
				if(i==0)
				{
					if(bandera==0)
					{
						representacionPolinomial= "1";
						bandera= 1;
					}
				}
				else if(i==1)
				{
					if(bandera==0)
					{
						representacionPolinomial= "x";
						bandera= 1;
					}
					else
					{
						representacionPolinomial= "x + "+representacionPolinomial;
					}
				}
				else
				{
					if(bandera==0)
					{
						representacionPolinomial= "x<sup>"+i+"</sup>";
						bandera= 1;
					}
					else
					{
						representacionPolinomial= "x<sup>"+i+"</sup> + "+representacionPolinomial;
					}
				}
			}

			corrimiento= corrimiento<<1;
		}
	}
	else
	{
		representacionPolinomial= "0";
	}

	return representacionPolinomial;
}

function validarNumeroX7OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x7OCPNC').val());
	var numeroLetras= $('#x7OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX6OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x6OCPNC').val());
	var numeroLetras= $('#x6OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX5OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x5OCPNC').val());
	var numeroLetras= $('#x5OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX4OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x4OCPNC').val());
	var numeroLetras= $('#x4OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX3OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x3OCPNC').val());
	var numeroLetras= $('#x3OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX2OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x2OCPNC').val());
	var numeroLetras= $('#x2OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX1OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x1OCPNC').val());
	var numeroLetras= $('#x1OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function validarNumeroX0OCPNC()
{
	var mensaje = "";	
	var valorA= Number($('#x0OCPNC').val());
	var numeroLetras= $('#x0OCPNC').val();

	if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = "Debes ingresar un número.";
	}
	else if (valorA<0||valorA>1)
	{
		mensaje = "El número debe ser 0 ó 1.";		
	}	

	return mensaje;
}

function convertirPolinomioANumeroOCPNC()
{
	var polinomio= [];
	var valorX0= $('#x0OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX0);
	var valorX1= $('#x1OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX1);
	var valorX2= $('#x2OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX2);
	var valorX3= $('#x3OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX3);
	var valorX4= $('#x4OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX4);
	var valorX5= $('#x5OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX5);
	var valorX6= $('#x6OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX6);
	var valorX7= $('#x7OCPNC').is(':checked') ? 1 : 0;
	polinomio.push(valorX7);
	var i;
	var corrimiento= 1;
	var resultado= 0;

	for(i=0; i<polinomio.length; i++)
	{
		if(polinomio[i]==1)
		{
			resultado= resultado|corrimiento;
		}

		corrimiento= corrimiento<<1;
	}

	return resultado;
}

function sleepConvertirGF(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}