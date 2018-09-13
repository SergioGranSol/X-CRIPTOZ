var velocidadAnimacionObtencionPuntosCE= 0.25;
var seguirCalculandoObtencionPuntosCE= true;

function mostrarObtencionPuntosEC()
{	
	$("#panelInteractivo-operacionObtencionPuntosCE").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOperacionObtencionPuntosCE()
{
	$("#panelInteractivo-operacionObtencionPuntosCE").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOperacionObtencionPuntosCE();
}

function limpiaPanelOperacionObtencionPuntosCE()
{	
	$("#seccionOperacionObtencionPuntosCE").show();
		if($('#informacionOperacionObtencionPuntosCE').is(':visible'))
		{
			$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
		}
		
		$("#informacionOperacionObtencionPuntosCE").empty();
		$("#zonaResiduosCuadraticosFOperacionObtencionPuntosCE").empty();
		$("#zonaResiduosCuadraticosAOperacionObtencionPuntosCE").empty();
		$("#zonaIdentificacionVariablesOperacionObtencionPuntosCE").empty();
		$("#zonaCalculoPuntosOperacionObtencionPuntosCE").empty();
		$("#zonaPuntosObtenidosOperacionObtencionPuntosCE").empty();
		
		$("#seccionOperacionObtencionPuntosCE").hide();

	$("#resultadoDobladoPuntosCE").val("");
}

function obtenervelocidadAnimacionObtencionPuntosCE()
{
	if($('#btnCalcularOOPCE').val() == 1)
	{
		velocidadAnimacionObtencionPuntosCE = 0.25;
	}
	else
	{
		velocidadAnimacionObtencionPuntosCE = 0.9;
	}

	$("#btn-velocidadOOPCE").hide();
	$("#btnCalcularOOPCE").hide();
	$("#btnCancelarOOPCE").show();
	seguirCalculandoObtencionPuntosCE= true;
}

function inversoMultiplicativoNumero(num, n)
{
	var u, v, x1, x2, q, r, x;	
	
	if(n<2)
	{
		return -1;
	}
	else
	{		
		u= num;
		v= n;
		x1= 1;
		x2= 0;
		
		while(u!=1&&u!=0)
		{			
			q= Math.floor(v/u);			
			r= v-q*u;			
			x= x2-q*x1;			
			v= u;			
			u= r;			
			x2= x1;			
			x1= x;			
		}
		
		if(u==0)
		{						
			return -1;
		}
		else
		{			
			return Modulo(x1, n);
		}
	}
}

function Modulo(num, m)
{
	if(num%m<0)
	{
		return m-((-1)*num%m);
	}
	else
	{
		return num%m;
	}
}

function exponenciacionModular(exponente, m, num)
{
	var aux, j=1;
	
	aux= num;
		
	while(j<exponente)
	{
		if(j&exponente)
		{
			if(j!=1)
			{
				aux= aux*aux*num;
			}
		}
		else 
		{			
			aux= aux*aux;
		}
		
		j= j<<1;
	}
	
	aux= Modulo(aux, m);
	
	return aux;
}

function exponenciacionModular2(exponente, num)
{
	var aux, j=1;
	
	aux= num;
		
	while(j<exponente)
	{
		if(j&exponente)
		{
			if(j!=1)
			{
				aux= aux*aux*num;
			}
		}
		else 
		{			
			aux= aux*aux;
		}
		
		j= j<<1;
	}
	
	return aux;
}

function obtenerResiduosCuadraticos(p) //Devuelve un par 1^2 mod 7= 1 (1,1) -- 2^2 mod 7= 4 (2, 4)
{
	var residuosCuadraticos=[], i, valor;
			
	residuosCuadraticos.push(1);	
	residuosCuadraticos.push(1);	
	
	for(i=2; i<p; i++)
	{
		valor= exponenciacionModular(2, p, i);			
		
		residuosCuadraticos.push(i);		
		residuosCuadraticos.push(valor);
	}	
		
	residuosCuadraticos.push(-1);
	residuosCuadraticos.push(-1);	
	
	return residuosCuadraticos;
}

function obtenerPuntos(a, b, p)
{
	var puntos= [], residuosCuadraticos= [], i, valor, j;
	
	residuosCuadraticos= obtenerResiduosCuadraticos(p);	
	
	for(i=0; i<p; i++)
	{
		valor= exponenciacionModular(3, p, i) + (a*i) + b;
		valor= Modulo(valor, p);
		
		for(j=1; residuosCuadraticos[j]!=-1; j=j+2)
		{
			if(valor==residuosCuadraticos[j])
			{				
				puntos.push(i);				
				puntos.push(residuosCuadraticos[j-1]);				
			}
		}
	}	
		
	puntos.push(-100);
	puntos.push(-100);	
	
	return puntos;
}

//OJO WEY LOS VALORES DE LOS PUNTOS DEBEN SER MENOR QUE EL ORDEN DE LA CURVA
async function realizarObtencionPuntosCE()
{
	var residuosCuadraticos=[], i, resResiduoCuadratico, auxVelocidadAnimacionObtencionPuntosCE, j, arrayResiduos= [], arrayA= [], p=23, a= 1, b= 4;

	limpiaPanelOperacionObtencionPuntosCE();
	obtenervelocidadAnimacionObtencionPuntosCE();

	var zonaFormulaResiduos= document.getElementById("zonaResiduosCuadraticosFOperacionObtencionPuntosCE");
	var elementoFormulaResiduos= document.createElement("label");
	elementoFormulaResiduos.innerHTML= "a<sup>2</sup> mod p";

	var zonaValoresResiduos= document.getElementById("zonaResiduosCuadraticosAOperacionObtencionPuntosCE");

	$("#seccionOperacionObtencionPuntosCE").show();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("Para obtener los puntos de la curva elíptica, primero hay que obtener los residuos cuadráticos.");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(2600);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("Para obtener los residuos cuadráticos, tomamos los números 1 &#60; a &#60; p-1 de Z<sub>p</sub> osea: 1 &#60; a &#60; 22 de Z<sub>23</sub>.");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(5250);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("Y para cada número del intervalo realizamos lo siguiente: a<sup>2</sup> mod p, el resultado es el residuo cuadrático.");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(3400);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("Ahora obtendremos todos los residuos cuadráticos de Z<sub>23</sub>:");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(2000);

	if(!seguirCalculandoObtencionPuntosCE){ return; }
			
	zonaResiduosCuadraticosFOperacionObtencionPuntosCE.appendChild(elementoFormulaResiduos)
	await sleepObtenerPuntos(1500*velocidadAnimacionObtencionPuntosCE);

	if(!seguirCalculandoObtencionPuntosCE){ return; }
	
	for(i=1; i<p; i++)
	{
		if(!seguirCalculandoObtencionPuntosCE){ return; }

		if(i==3)
		{
			auxVelocidadAnimacionObtencionPuntosCE= velocidadAnimacionObtencionPuntosCE;
			velocidadAnimacionObtencionPuntosCE= 0;
		}

		elementoFormulaResiduos.style.backgroundColor= "#FDFD96";
		elementoFormulaResiduos.innerHTML= ""+i+"<sup>2</sup> mod "+p;
		await sleepObtenerPuntos(1500*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		resResiduoCuadratico= exponenciacionModular(2, p, i);

		elementoFormulaResiduos.innerHTML= ""+i+"<sup>2</sup> mod "+p+"= "+resResiduoCuadratico;
		await sleepObtenerPuntos(1500*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		var elementoValorResiduo= document.createElement("label");
		elementoValorResiduo.id= "elementoValorResiduo"+i;

		elementoValorResiduo.innerHTML= "<p style='text-indent: 1em;'>"+i+"<sup>2</sup></p><p style='text-indent: 1em;'>"+resResiduoCuadratico+"</p>";

		if(i==1)
		{
			var elementoTitulosResiduos= document.createElement("label");
			elementoTitulosResiduos.innerHTML= "<p style='text-indent: 1em;'>a</p><p style='text-indent: 1em;'>Residuo</p>";
			zonaResiduosCuadraticosAOperacionObtencionPuntosCE.appendChild(elementoTitulosResiduos);
		}

		zonaResiduosCuadraticosAOperacionObtencionPuntosCE.appendChild(elementoValorResiduo);

		elementoFormulaResiduos.style.backgroundColor= "transparent";
		elementoValorResiduo.style.backgroundColor= "#FDFD96";
		await sleepObtenerPuntos(2000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		elementoValorResiduo.style.backgroundColor= "transparent";
		
		residuosCuadraticos.push(i);
		residuosCuadraticos.push(resResiduoCuadratico);

		arrayA.push(elementoValorResiduo);
	}

	velocidadAnimacionObtencionPuntosCE= auxVelocidadAnimacionObtencionPuntosCE;

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	zonaFormulaResiduos.innerHTML= "";

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("El siguiente paso es evaluar la curva elíptica en el intervalo 0 &#60; x &#60; p-1 osea 0 &#60; x &#60; 22.");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(2800);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("El valor obtenido por cada x evaluada en la curva, se busca entre los residuos cuadráticos del paso anterior.");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(4100);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("Si el resultado se encuentra entre los residuos, el punto obtenido es el siguiente: (x, a).");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(3250);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").slideToggle(250);
	await sleepObtenerPuntos(250);
	$("#informacionOperacionObtencionPuntosCE").empty();

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	$("#informacionOperacionObtencionPuntosCE").append("Ahora obtendremos los puntos de la curva elíptica en Z<sub>23</sub>:");
	$("#informacionOperacionObtencionPuntosCE").slideToggle(500);
	await sleepObtenerPuntos(2000);

	if(!seguirCalculandoObtencionPuntosCE){ return; }

	var zonaIdentificacionVariablesOperacionObtencionPuntosCE= document.getElementById("zonaIdentificacionVariablesOperacionObtencionPuntosCE");
	var zonaCalculoPuntosOperacionObtencionPuntosCE= document.getElementById("zonaCalculoPuntosOperacionObtencionPuntosCE");
	var zonaPuntosObtenidosOperacionObtencionPuntosCE= document.getElementById("zonaPuntosObtenidosOperacionObtencionPuntosCE");

	var elementoX= document.createElement("label");
	zonaIdentificacionVariablesOperacionObtencionPuntosCE.appendChild(elementoX);

	var elementoCurva= document.createElement("label");
	zonaCalculoPuntosOperacionObtencionPuntosCE.appendChild(elementoCurva);

	var textoPuntosObtenidos= document.createElement("label");
	var brr = document.createElement("br");
	textoPuntosObtenidos.innerHTML= "Puntos obtenidos:";
	zonaPuntosObtenidosOperacionObtencionPuntosCE.appendChild(textoPuntosObtenidos);
	zonaPuntosObtenidosOperacionObtencionPuntosCE.appendChild(brr);

	for(i= 0; i<p; i++)
	{
		if(!seguirCalculandoObtencionPuntosCE){ return; }

		if(i==2)
		{
			auxVelocidadAnimacionObtencionPuntosCE= velocidadAnimacionObtencionPuntosCE;
			velocidadAnimacionObtencionPuntosCE= 0;
		}

		elementoX.innerHTML= "x= "+i;
		elementoX.style.backgroundColor= "#FDFD96";
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		elementoCurva.innerHTML= "y<sup>2</sup>= x<sup>3</sup> + "+a+"x + "+b+" mod "+p;
		elementoCurva.style.backgroundColor= "#FDFD96";
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		elementoCurva.innerHTML= "y<sup>2</sup>= ("+i+")<sup>3</sup> + "+a+"("+i+") + "+b+" mod "+p;
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		var x3= exponenciacionModular2(3, i);

		elementoCurva.innerHTML= "y<sup>2</sup>= "+x3+" + "+a+"("+i+") + "+b+" mod "+p;
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		var ax= a*i;

		elementoCurva.innerHTML= "y<sup>2</sup>= "+ x3 +" + "+ ax +" + "+b+" mod "+p;
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		var sumaElementos= parseInt(x3)+parseInt(ax)+parseInt(b);

		elementoCurva.innerHTML= "y<sup>2</sup>= "+ sumaElementos +" mod "+p;
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		var resultadoY2= Modulo(sumaElementos, p);

		elementoCurva.innerHTML= "y<sup>2</sup>= "+ resultadoY2;
		await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

		if(!seguirCalculandoObtencionPuntosCE){ return; }

		for(j=1; j<p; j++)
		{
			if(!seguirCalculandoObtencionPuntosCE){ return; }

			arrayA[j-1].style.backgroundColor= "#FDFD96";
			await sleepObtenerPuntos(50*velocidadAnimacionObtencionPuntosCE);

			if(!seguirCalculandoObtencionPuntosCE){ return; }

			if(resultadoY2==residuosCuadraticos[(parseInt(j)-1)*2+1])
			{
				arrayA[j-1].style.backgroundColor= "#77DD77";
				await sleepObtenerPuntos(1000*velocidadAnimacionObtencionPuntosCE);

				if(!seguirCalculandoObtencionPuntosCE){ return; }

				var elementoPunto= document.createElement("label");

				elementoPunto.innerHTML= "("+i+","+j+")";

				zonaPuntosObtenidosOperacionObtencionPuntosCE.appendChild(elementoPunto);
				zonaPuntosObtenidosOperacionObtencionPuntosCE.appendChild(document.createTextNode (" "));

				elementoPunto.style.backgroundColor= "#77DD77";
				await sleepObtenerPuntos(2000*velocidadAnimacionObtencionPuntosCE);

				if(!seguirCalculandoObtencionPuntosCE){ return; }

				elementoPunto.style.backgroundColor= "transparent";
				arrayA[j-1].style.backgroundColor= "transparent";
				await sleepObtenerPuntos(50*velocidadAnimacionObtencionPuntosCE);

				if(!seguirCalculandoObtencionPuntosCE){ return; }
			}
			else
			{
				arrayA[j-1].style.backgroundColor= "transparent";
				await sleepObtenerPuntos(50*velocidadAnimacionObtencionPuntosCE);	

				if(!seguirCalculandoObtencionPuntosCE){ return; }
			}
		}

		elementoX.style.backgroundColor= "transparent";
		elementoCurva.style.backgroundColor= "transparent";
	}

	zonaCalculoPuntosOperacionObtencionPuntosCE.innerHTML= "";
	zonaIdentificacionVariablesOperacionObtencionPuntosCE.innerHTML= "";

	$("#btn-velocidadOOPCE").show();
	$("#btnCalcularOOPCE").show();
	$("#btnCancelarOOPCE").hide();
				
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_72);
}

$(document).ready(function()
{
	$("#CalcularRapidoOOPCE").click(function(){
		$("#btnCalcularOOPCE").html('Calcular Rápido');
		$("#btnCalcularOOPCE").val(1);
	});
	$("#CalcularNormalOOPCE").click(function(){
		$("#btnCalcularOOPCE").html('Calcular Normal');
		$("#btnCalcularOOPCE").val(2);
	});

	$("#btnCalcularOOPCE").click(function()
	{
		realizarObtencionPuntosCE();
	});

	$("#btnCancelarOOPCE").click(function()
	{
		seguirCalculandoObtencionPuntosCE= false;
		
		limpiaPanelOperacionObtencionPuntosCE();

		$("#btn-velocidadOOPCE").show();
		$("#btnCalcularOOPCE").show();
		$("#btnCancelarOOPCE").hide();
	});

	//FUNCIONES CALCULADORA

	$("#aOPC").keyup(function()
	{
		var mensaje = validarNumeroAOPC();
		var mensajeB = validarNumeroBOPC();	
		var mensajeP = validarNumeroPOPC();

		if (mensaje.length != 0) 
		{
			$("#aOPC-error").remove();
			$("#aOPC").parent().append('<div id="aOPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOPC").addClass('input-error');
			//$("#btnCalcularOPC").attr("disabled", true);

			if(mensajeP.length!=0)
			{
				$("#pOPC-error").remove();
				$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pOPC").addClass('input-error');
			}
			else
			{
				$("#pOPC-error").remove();
				$("#pOPC").removeClass('input-error');				
			}

			if(mensajeB.length!=0)
			{
				$("#bOPC-error").remove();
				$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
				$("#bOPC").addClass('input-error');
			}
			else
			{
				$("#bOPC-error").remove();
				$("#bOPC").removeClass('input-error');
			}
		}
		else
		{
			$("#aOPC-error").remove();
			$("#aOPC").removeClass('input-error');
			
			if(mensajeP.length!=0)
			{
				$("#pOPC-error").remove();
				$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pOPC").addClass('input-error');
				//$("#btnCalcularOPC").attr("disabled", true);

				if(mensajeB.length!=0)
				{
					$("#bOPC-error").remove();
					$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOPC").addClass('input-error');
				}
				else
				{
					$("#bOPC-error").remove();
					$("#bOPC").removeClass('input-error');
				}
			}
			else
			{
				$("#pOPC-error").remove();
				$("#pOPC").removeClass('input-error');
				
				if(mensajeB.length!=0)
				{
					$("#bOPC-error").remove();
					$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOPC").addClass('input-error');
					//$("#btnCalcularOPC").attr("disabled", true);
				}
				else
				{
					$("#bOPC-error").remove();
					$("#bOPC").removeClass('input-error');
					$("#btnCalcularOPC").attr("disabled", false);
				}
			}
		}
	});

	$("#bOPC").keyup(function()
	{
		var mensaje = validarNumeroBOPC();
		var mensajeA = validarNumeroAOPC();
		var mensajeP = validarNumeroPOPC();

		if (mensaje.length != 0) 
		{
			$("#bOPC-error").remove();
			$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOPC").addClass('input-error');
			//$("#btnCalcularOPC").attr("disabled", true);

			if(mensajeA.length!=0)
			{
				$("#aOPC-error").remove();
				$("#aOPC").parent().append('<div id="aOPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOPC").addClass('input-error');
			}
			else
			{
				$("#aOPC-error").remove();
				$("#aOPC").removeClass('input-error');				
			}

			if(mensajeP.length!=0)
			{
				$("#pOPC-error").remove();
				$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pOPC").addClass('input-error');
			}
			else
			{
				$("#pOPC-error").remove();
				$("#pOPC").removeClass('input-error');
			}
		}
		else
		{
			$("#bOPC-error").remove();
			$("#bOPC").removeClass('input-error');
			
			if(mensajeA.length!=0)
			{
				$("#aOPC-error").remove();
				$("#aOPC").parent().append('<div id="aOPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOPC").addClass('input-error');
				//$("#btnCalcularOPC").attr("disabled", true);

				if(mensajeP.length!=0)
				{
					$("#pOPC-error").remove();
					$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
					$("#pOPC").addClass('input-error');
				}
				else
				{
					$("#pOPC-error").remove();
					$("#pOPC").removeClass('input-error');
				}
			}
			else
			{
				$("#aOPC-error").remove();
				$("#aOPC").removeClass('input-error');
				
				if(mensajeP.length!=0)
				{
					$("#pOPC-error").remove();
					$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
					$("#pOPC").addClass('input-error');
					//$("#btnCalcularOPC").attr("disabled", true);					
				}
				else
				{
					$("#pOPC-error").remove();
					$("#pOPC").removeClass('input-error');
					$("#btnCalcularOPC").attr("disabled", false);
				}
			}
		}
	});

	$("#pOPC").keyup(function()
	{		
		var mensaje = validarNumeroPOPC();	
		var mensajeA= validarNumeroAOPC();
		var mensajeB= validarNumeroBOPC();

		if (mensaje.length != 0) 
		{
			$("#pOPC-error").remove();
			$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#pOPC").addClass('input-error');
			//$("#btnCalcularOPC").attr("disabled", true);

			if(mensajeA.length!=0)
			{
				$("#aOPC-error").remove();
				$("#aOPC").parent().append('<div id="aOPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOPC").addClass('input-error');
			}
			else
			{
				$("#aOPC-error").remove();
				$("#aOPC").removeClass('input-error');				
			}

			if(mensajeB.length!=0)
			{
				$("#bOPC-error").remove();
				$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
				$("#bOPC").addClass('input-error');
			}
			else
			{
				$("#bOPC-error").remove();
				$("#bOPC").removeClass('input-error');
			}
		}
		else
		{
			$("#pOPC-error").remove();
			$("#pOPC").removeClass('input-error');

			if(mensajeA.length!=0)
			{
				$("#aOPC-error").remove();
				$("#aOPC").parent().append('<div id="aOPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOPC").addClass('input-error');
				//$("#btnCalcularOPC").attr("disabled", true);

				if(mensajeB.length!=0)
				{
					$("#bOPC-error").remove();
					$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOPC").addClass('input-error');
				}
				else
				{
					$("#bOPC-error").remove();
					$("#bOPC").removeClass('input-error');
				}
			}
			else
			{
				$("#aOPC-error").remove();
				$("#aOPC").removeClass('input-error');
				
				if(mensajeB.length!=0)
				{
					$("#bOPC-error").remove();
					$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOPC").addClass('input-error');
					//$("#btnCalcularOPC").attr("disabled", true);
				}
				else
				{
					$("#bOPC-error").remove();
					$("#bOPC").removeClass('input-error');
					$("#btnCalcularOPC").attr("disabled", false);
				}
			}			
		}
	});

	$("#btnCalcularOPC").click(function()
	{
		var mensaje= validarNumeroAOPC();
		var mensaje2= validarNumeroPOPC();
		var mensaje3= validarNumeroBOPC();

		if(mensaje.length!=0)
		{
			$("#aOPC-error").remove();
			$("#aOPC").parent().append('<div id="aOPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOPC").addClass('input-error');
		}
		else if(mensaje2.length!=0)
		{
			$("#pOPC-error").remove();
			$("#pOPC").parent().append('<div id="pOPC-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#pOPC").addClass('input-error');
		}
		else if(mensaje3.length!=0)
		{
			$("#bOPC-error").remove();
			$("#bOPC").parent().append('<div id="bOPC-error" class="text-danger">&nbsp;'+mensaje3+'</div>');
			$("#bOPC").addClass('input-error');
		}
		else
		{
			obtenerPuntosOPC();
		}
	});
});

//FUNCIONES CALCULADORA

function validarNumeroAOPC()
{
	var mensaje = "";	
	var valorA= Number($('#aOPC').val());
	var numeroLetras= $('#aOPC').val();
	var valorP= Number($('#pOPC').val());
	var numeroLetrasP= $('#pOPC').val();
	var valorB= Number($('#bOPC').val());
	var numeroLetrasB= $('#bOPC').val();
	var resultadoCondicion;
	var letrasP= validarNumeroPOPC();
	
	if (letrasP.length==0)
	{
		if (valorA<0 || valorA>valorP-1 || numeroLetras.includes("."))
		{
			mensaje = mensaje_129;
		}
		else if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
		{
			mensaje = mensaje_129;
		}
		else
		{
			if (valorB>-1 && valorB<valorP-1 && numeroLetrasB.length!=0)
			{
				resultadoCondicion= 4*Math.pow(valorA, 3)+27*Math.pow(valorB, 2);
				resultadoCondicion= resultadoCondicion%valorP;

				if(resultadoCondicion==0)
				{
					mensaje= mensaje_130;
				}
			}
		}
	}
	else if(!parseInt(valorA)&&valorA!=0 || numeroLetras.length==0)
	{
		mensaje = mensaje_129;
	}

	return mensaje;
}

function validarNumeroBOPC()
{
	var mensaje = "";	
	var valorB= Number($('#bOPC').val());
	var numeroLetras= $('#bOPC').val();	
	var valorP= Number($('#pOPC').val());
	var numeroLetrasP= $('#pOPC').val();
	var valorA= Number($('#aOPC').val());
	var numeroLetrasA= $('#aOPC').val();
	var resultadoCondicion;
	var letrasP= validarNumeroPOPC();
	
	if (letrasP.length==0)
	{
		if (valorB<0 || valorB>valorP-1 || numeroLetras.includes("."))
		{
			mensaje = mensaje_131;
		}
		else if(!parseInt(valorB)&&valorB!=0 || numeroLetras.length==0)
		{
			mensaje = mensaje_131;
		}
		else
		{
			if (valorA>-1 && valorA<valorP-1 && numeroLetrasA.length!=0)
			{
				resultadoCondicion= 4*Math.pow(valorA, 3)+27*Math.pow(valorB, 2);
				resultadoCondicion= resultadoCondicion%valorP;

				if(resultadoCondicion==0)
				{
					mensaje= mensaje_130;
				}
			}
		}		
	}
	else if(!parseInt(valorB)&&valorB!=0 || numeroLetras.length==0)
	{
		mensaje = mensaje_131;
	}

	return mensaje;
}

function validarNumeroPOPC()
{
	var mensaje = "";	
	var valorP= Number($('#pOPC').val());
	var numeroLetras= $('#pOPC').val();
	var i;
	var contador= 0;
	
	if (valorP<4 || valorP>1000 || numeroLetras.length==0 || numeroLetras.includes("."))
	{
		mensaje = mensaje_132;
	}
	else if(!parseInt(valorP))
	{
		mensaje = mensaje_132;
	}
	else
	{
		for(i= 1; i<=valorP; i++)
		{
			if(valorP%i==0)
			{
				contador++;
			}
		}

		if(contador!=2)
		{
			mensaje= mensaje_132;
		}
	}

	return mensaje;
}

function obtenerPuntosOPC()
{
	var valorA= Number($('#aOPC').val());
	var valorB= Number($('#bOPC').val());
	var valorP= Number($('#pOPC').val());
	var puntos= [];
	var zonaDisplayPuntos= document.getElementById("fileDisplayPuntosOPC");
	var i;

	puntos= obtenerPuntos(valorA, valorB, valorP);

	for(i=0; puntos[i]!=-100; i=i+2)
	{
		if(i==0)
		{
			zonaDisplayPuntos.innerHTML= "("+puntos[i]+","+puntos[i+1]+")";
		}
		else
		{
			zonaDisplayPuntos.innerHTML= zonaDisplayPuntos.innerHTML+" - ("+puntos[i]+","+puntos[i+1]+")";
		}
	}

	return puntos;
}

function sleepObtenerPuntos(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}