var velocidadAnimacionDobladoPuntosCE= 0.25;
var seguirCalculandoDobladoPuntosCE= true;

var ordenCurva;
var puntosODPC= [];

function mostrarDobladoPuntosEC()
{	
	$("#panelInteractivo-operacionDobladoPuntosCE").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOperacionDobladoPuntosCE()
{
	$("#panelInteractivo-operacionDobladoPuntosCE").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOperacionDobladoPuntosCE();
}

function limpiaPanelOperacionDobladoPuntosCE()
{	
	$("#seccionOperacionDobladoPuntosCE").show();
		if($('#informacionOperacionDobladoPuntosCE').is(':visible'))
		{
			$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
		}
		
		$("#informacionOperacionDobladoPuntosCE").empty();
		$("#informacionODPCE").empty();
		$("#informacionPuntosDobladoCE").empty();
		$("#informacionVariablesCE").empty();
		$("#campoX3OperacionDobladoPuntosCE").empty();
		$("#campoY3OperacionDobladoPuntosCE").empty();
		
		$("#seccionOperacionDobladoPuntosCE").hide();

	$("#resultadoDobladoPuntosCE").val("");
}

function obtenervelocidadAnimacionDobladoPuntosCE()
{
	if($('#btnCalcularODPCE').val() == 1)
	{
		velocidadAnimacionDobladoPuntosCE = 0.25;
	}
	else
	{
		velocidadAnimacionDobladoPuntosCE = 0.9;
	}

	$("#btn-velocidadODPCE").hide();
	$("#btnCalcularODPCE").hide();
	$("#btnCancelarODPCE").show();
	seguirCalculandoDobladoPuntosCE= true;
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

function sumaPuntos(x1, y1, x2, y2, a, b, p)
{
	var puntoCalculado= [], x1Cuadrada, multiplicativoInverso, aux, aux2;
		
	puntoCalculado.push(-1);
	puntoCalculado.push(-1);	
	
	if(x1==x2&&y1==y2) //Fórmula para puntos Iguales
	{
		x1Cuadrada= Modulo(exponenciacionModular(2, p, x1), p);		
		aux= Modulo((2*y1), p);		
		multiplicativoInverso= inversoMultiplicativoNumero(aux, p);
		
		if(multiplicativoInverso!=-1)
		{
			aux2= Modulo(((3*x1Cuadrada+a)*multiplicativoInverso), p);
			puntoCalculado[0]= Modulo(exponenciacionModular(2, p, aux2), p);
			puntoCalculado[0]= puntoCalculado[0]-Modulo((2*x1), p);
			puntoCalculado[0]= Modulo(puntoCalculado[0], p);
			
			puntoCalculado[1]= aux2*Modulo((x1-puntoCalculado[0]), p)-y1;
			puntoCalculado[1]= Modulo(puntoCalculado[1], p);
		}
	}
	else //Fórmula para puntos Diferentes
	{
		aux= Modulo((x2-x1), p);
		multiplicativoInverso= inversoMultiplicativoNumero(aux, p);		
		
		if(multiplicativoInverso!=-1)
		{
			aux2= Modulo((y2-y1), p)*multiplicativoInverso;
			aux2= Modulo(aux2, p);
			puntoCalculado[0]= Modulo(exponenciacionModular(2, p, aux2), p);
			puntoCalculado[0]= puntoCalculado[0]-x1-x2;
			puntoCalculado[0]= Modulo(puntoCalculado[0], p);
			
			puntoCalculado[1]= aux2*Modulo((x1-puntoCalculado[0]), p)- y1;
			puntoCalculado[1]= Modulo(puntoCalculado[1], p);
		}
	}
	
	return puntoCalculado;
}

function obtenerkPunto(k, x, y, a, b, p)
{
	var i, kPunto= [], aux= [];
	
	kPunto.push(x);
	kPunto.push(y);
	
	for(i=1; i<k; i++)
	{		
		if(i==1)
		{
			aux= sumaPuntos(x,y,x,y,a,b,p);			
		}
		else
		{
			aux= sumaPuntos(x,y,aux[0],aux[1],a,b,p);			
		}		
	}
	
	if(k!=1) //Si no pidieron multiplicar el punto por 1
	{
		kPunto[0]= aux[0];
		kPunto[1]= aux[1];		
	}
	
	return kPunto;
}

//OJO WEY LOS VALORES DE LOS PUNTOS DEBEN SER MENOR QUE EL ORDEN DE LA CURVA
async function realizarDobladoPuntosCE()
{
	var inputP1= document.getElementById("POperacionDobladoPuntosCE");
	var P1= inputP1.value;

	var tempP1= P1.split(",");
	var x1= parseInt(tempP1[0]);
	var y1= parseInt(tempP1[1]);

	var x2= parseInt(tempP1[0]);
	var y2= parseInt(tempP1[1]);

	var x3, y3;

	var inputk= document.getElementById("kOperacionDobladoPuntosCE");
	var k= inputk.value;

	var zonaCurva= document.getElementById("informacionODPCE");
	var zonaVariables= document.getElementById("informacionVariablesCE");
	var zonaVariablesAsumar= document.getElementById("informacionPuntosDobladoCE");
	var zonaX3= document.getElementById("campoX3OperacionDobladoPuntosCE");
	var zonaY3= document.getElementById("campoY3OperacionDobladoPuntosCE");
	var i;

	var elementoX1= document.createElement("label");
	var elementoY1= document.createElement("label");
	var elementoX2= document.createElement("label");
	var elementoY2= document.createElement("label");
	var elementoA= document.createElement("label");
	var elementoP= document.createElement("label");
	var elementok= document.createElement("label");
	var sumasArealizar= document.createElement("label");
	var curva= document.createElement("label");

	var a= 1, b= 4, p= 23;

	limpiaPanelOperacionDobladoPuntosCE();
	obtenervelocidadAnimacionDobladoPuntosCE();

	$("#seccionOperacionDobladoPuntosCE").show();

	$("#informacionOperacionDobladoPuntosCE").append("La curva elíptica con la que estamos trabajando es:");
	$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
	await sleepDobladoPuntos(2000);

	curva.innerHTML= "y<sup>2</sup>= x<sup>3</sup> + "+a+"x + "+b+" mod "+p;

	zonaCurva.appendChild(curva);

	if(!seguirCalculandoDobladoPuntosCE){ return; }

	await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);
	$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
	await sleepDobladoPuntos(250);
	$("#informacionOperacionDobladoPuntosCE").empty();

	zonaVariablesAsumar.appendChild(sumasArealizar);
	zonaVariables.appendChild(elementoX1);
	zonaVariables.appendChild(document.createTextNode (" "));
	zonaVariables.appendChild(elementoY1);
	zonaVariables.appendChild(document.createTextNode (" "));
	zonaVariables.appendChild(elementoX2);
	zonaVariables.appendChild(document.createTextNode (" "));
	zonaVariables.appendChild(elementoY2);
	zonaVariables.appendChild(document.createTextNode (" "));
	zonaVariables.appendChild(elementoA);
	zonaVariables.appendChild(document.createTextNode (" "));
	zonaVariables.appendChild(elementoP);
	zonaVariables.appendChild(document.createTextNode (" "));
	zonaVariables.appendChild(elementok);

	if(k>=29)
	{
		$("#informacionOperacionDobladoPuntosCE").append("El doblado de puntos no es más que 'k' veces la suma del punto dado, así que obtendremos suma por suma hasta llegar al valor de 'k' dado.");
		$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
		await sleepDobladoPuntos(5250);

		if(!seguirCalculandoDobladoPuntosCE){ return; }

		$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
		await sleepDobladoPuntos(250);
		$("#informacionOperacionDobladoPuntosCE").empty();

		$("#informacionOperacionDobladoPuntosCE").append("La curva elíptica tiene un número finito de puntos(orden de la curva), esta curva cuenta con 29, cuando tomamos un punto y realizamos la operación de doblado, estamos obteniendo en realidad otro punto de la curva.");
		$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
		await sleepDobladoPuntos(7750);

		if(!seguirCalculandoDobladoPuntosCE){ return; }

		$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
		await sleepDobladoPuntos(250);
		$("#informacionOperacionDobladoPuntosCE").empty();

		$("#informacionOperacionDobladoPuntosCE").append("Ahora cuando k es igual al orden de la curva, el punto obtenido es el punto en el infinito. (Para mas información ver la teoría). Por eso en el algoritmo ECDSA se elige k entre 1 y 28.");
		$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
		await sleepDobladoPuntos(7000);

		if(!seguirCalculandoDobladoPuntosCE){ return; }

		$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
		await sleepDobladoPuntos(250);
		$("#informacionOperacionDobladoPuntosCE").empty();

		$("#informacionOperacionDobladoPuntosCE").append("Por lo tanto el resultado es:");
		$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
		await sleepDobladoPuntos(1500);

		sumasArealizar.innerHTML= "29P= O";			
		sumasArealizar.style.backgroundColor = "#77DD77";

		if(!seguirCalculandoDobladoPuntosCE){ return; }

		$("#btn-velocidadODPCE").show();
		$("#btnCalcularODPCE").show();
		$("#btnCancelarODPCE").hide();
		
		toastr.options.timeOut = "1000";
		toastr['success'](mensaje_72);
		$("#resultadoDobladoPuntosCE").val("O");
	}
	else
	{
		for(i=0; i<k; i++)
		{
			zonaX3.innerHTML= "";
			zonaY3.innerHTML= "";
			elementoX1.innerHTML= "";
			elementoY1.innerHTML= "";
			elementoX2.innerHTML= "";
			elementoY2.innerHTML= "";

			if(i==0)//K=1
			{
				$("#informacionOperacionDobladoPuntosCE").append("El doblado de puntos no es más que 'k' veces la suma del punto dado, así que obtendremos suma por suma hasta llegar al valor de 'k' dado.");
				$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
				await sleepDobladoPuntos(5250);

				$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
				await sleepDobladoPuntos(250);
				$("#informacionOperacionDobladoPuntosCE").empty();

				var auxTexto= document.createElement("label");
				var auxTexto2= document.createElement("label");

				x3= x1;
				y3= y1;

				x2= x1;
				y2= y1;

				$("#informacionOperacionDobladoPuntosCE").append("Cuando k es igual a 1, el resultado es el mismo punto.");
				$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
				await sleepDobladoPuntos(2000);

				sumasArealizar.innerHTML= ""+(parseInt(i)+1)+"P= ("+x1+","+y1+")";			
				sumasArealizar.style.backgroundColor = "yellow";
				await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);
				sumasArealizar.style.backgroundColor = "transparent";
				await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

				auxTexto.innerHTML= "x<sub>3</sub>= "+x3;
				zonaX3.appendChild(auxTexto);
				auxTexto2.innerHTML= "y<sub>3</sub>= "+y3;
				zonaY3.appendChild(auxTexto2);
				auxTexto.style.backgroundColor= "yellow";
				auxTexto2.style.backgroundColor= "yellow";
				await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
				auxTexto.style.backgroundColor= "transparent";
				auxTexto2.style.backgroundColor= "transparent";
				await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

				if(i+1==k)
				{
					sumasArealizar.innerHTML= ""+k+"P= ("+x3+","+y3+")";

					sumasArealizar.style.backgroundColor = "#77DD77";
					auxTexto.style.backgroundColor= "#77DD77";
					auxTexto2.style.backgroundColor= "#77DD77";

					if(!seguirCalculandoDobladoPuntosCE){ return; }

					$("#btn-velocidadODPCE").show();
					$("#btnCalcularODPCE").show();
					$("#btnCancelarODPCE").hide();
					
					toastr.options.timeOut = "1000";
					toastr['success'](mensaje_72);
					$("#resultadoDobladoPuntosCE").val(""+x3+","+y3);
				}
				else
				{
					$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
					await sleepDobladoPuntos(250);
					$("#informacionOperacionDobladoPuntosCE").empty();

					await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
				}
			}
			else
			{
				if(i<3)//Solamento muestro las primeras hasta k=3
				{
					x1= x3;
					y1= y3;

					$("#informacionOperacionDobladoPuntosCE").append("La siguiente operación a realizar es:");
					$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
					await sleepDobladoPuntos(900);

					sumasArealizar.style.backgroundColor = "yellow";
					sumasArealizar.innerHTML= ""+(parseInt(i)+1)+"P= ("+x1+","+y1+") + ("+x2+","+y2+")";
					await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);
					sumasArealizar.style.backgroundColor = "transparent";
					await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

					$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
					await sleepDobladoPuntos(250);
					$("#informacionOperacionDobladoPuntosCE").empty();

					$("#informacionOperacionDobladoPuntosCE").append("Ahora identificamos los términos de las fórmulas para realizar la suma:");
					$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
					await sleepDobladoPuntos(2250);

					//Variables
					elementoX1.style.backgroundColor= "yellow";
					elementoX1.innerHTML= "x<sub>1</sub>= "+x1;
					await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
					elementoX1.style.backgroundColor = "transparent";
					await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

					elementoY1.style.backgroundColor= "yellow";
					elementoY1.innerHTML= "y<sub>1</sub>= "+y1;
					await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
					elementoY1.style.backgroundColor = "transparent";
					await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

					elementoX2.style.backgroundColor= "yellow";
					elementoX2.innerHTML= "x<sub>2</sub>= "+x2;
					await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
					elementoX2.style.backgroundColor = "transparent";
					await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

					elementoY2.style.backgroundColor= "yellow";
					elementoY2.innerHTML= "y<sub>2</sub>= "+y2;
					await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
					elementoY2.style.backgroundColor = "transparent";
					await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

					if(i==1)
					{
						elementoA.style.backgroundColor= "yellow";
						elementoA.innerHTML= "a= "+a;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						elementoA.style.backgroundColor = "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						elementoP.style.backgroundColor= "yellow";
						elementoP.innerHTML= "p= "+p;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						elementoP.style.backgroundColor = "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						elementok.style.backgroundColor= "yellow";
						elementok.innerHTML= "k= "+k;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						elementok.style.backgroundColor = "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
					}

					$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
					await sleepDobladoPuntos(250);
					$("#informacionOperacionDobladoPuntosCE").empty();

					if(x2==x3&&y2==y3)//Puntos iguales
					{
						$("#informacionOperacionDobladoPuntosCE").append("Se realizará la suma de puntos iguales.");
						$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
						await sleepDobladoPuntos(1750);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						/************************************************************************************X3**************************************************************************************/
						var primerMultiplicacion= document.createElement("label");
						var resPrimerMultiplicacion;
						var primerSuma= document.createElement("label");
						var resPrimerSuma;
						var segundaMultiplicacion= document.createElement("label");
						var resSegundaMultiplicacion;
						var primerDivision= document.createElement("label");
						var resPrimerDivision;
						var resInverso;
						var tercerMultiplicacion= document.createElement("label");
						var resTercerMultiplicacion;
						var primerResta= document.createElement("label");
						var resPrimerResta;
						var auxTexto= document.createElement("label");
						var auxTexto2= document.createElement("label");
						var auxTexto3= document.createElement("label");

						auxTexto.innerHTML= "x<sub>3</sub>= (";
						primerMultiplicacion.innerHTML= "3(x<sub>1</sub>)<sup>2</sup>";
						primerSuma.innerHTML= " + a";
						segundaMultiplicacion.innerHTML= "2(y<sub>1</sub>)";
						primerDivision.innerHTML= " / "
						auxTexto2.innerHTML= ")<sup>2</sup>";
						tercerMultiplicacion.innerHTML= "2(x<sub>1</sub>)";
						primerResta.innerHTML= " - ";
						auxTexto3.innerHTML= "mod p";

						$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
						await sleepDobladoPuntos(250);
						$("#informacionOperacionDobladoPuntosCE").empty();

						$("#informacionOperacionDobladoPuntosCE").append("Vamos a calcular x<sub>3</sub>:");
						$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
						await sleepDobladoPuntos(1000);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						zonaX3.appendChild(auxTexto);
						zonaX3.appendChild(primerMultiplicacion);
						zonaX3.appendChild(primerSuma);
						zonaX3.appendChild(primerDivision);
						zonaX3.appendChild(segundaMultiplicacion);
						zonaX3.appendChild(auxTexto2);
						zonaX3.appendChild(primerResta);
						zonaX3.appendChild(tercerMultiplicacion);
						zonaX3.appendChild(document.createTextNode (" "));
						zonaX3.appendChild(auxTexto3);
						await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						primerMultiplicacion.style.backgroundColor = "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
						primerMultiplicacion.innerHTML= "3("+ x1 +")<sup>2</sup>";
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						primerMultiplicacion.innerHTML= "3("+ Math.pow(x1, 2) +")";
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						resPrimerMultiplicacion= 3*Math.pow(x1, 2);
						primerMultiplicacion.innerHTML= ""+resPrimerMultiplicacion;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						primerMultiplicacion.style.backgroundColor = "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						primerMultiplicacion.innerHTML= "";
						primerSuma.innerHTML= ""+resPrimerMultiplicacion+" + a";
						primerSuma.style.backgroundColor= "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
						primerSuma.innerHTML= ""+resPrimerMultiplicacion+" + "+a;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						resPrimerSuma= parseInt(resPrimerMultiplicacion)+parseInt(a);
						primerSuma.innerHTML= ""+resPrimerSuma;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						primerSuma.style.backgroundColor= "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						segundaMultiplicacion.style.backgroundColor= "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
						segundaMultiplicacion.innerHTML= "2("+y1+")";
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						resSegundaMultiplicacion= 2*parseInt(y1);
						segundaMultiplicacion.innerHTML= ""+resSegundaMultiplicacion;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						segundaMultiplicacion.style.backgroundColor= "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						auxTexto.innerHTML= "x<sub>3</sub>= ";
						auxTexto2.innerHTML= "";
						primerSuma.innerHTML= "";
						segundaMultiplicacion.innerHTML= "";
						primerDivision.innerHTML= "("+resPrimerSuma+" / "+resSegundaMultiplicacion+")<sup>2</sup>";
						primerDivision.style.backgroundColor= "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						if(resSegundaMultiplicacion!=0)
						{
							if(resPrimerSuma%resSegundaMultiplicacion==0)//Se hace la division
							{
								resPrimerDivision= parseInt(resPrimerSuma)/parseInt(resSegundaMultiplicacion);
							}
							else//Se sube y encontramos el inverso
							{
								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								$("#informacionOperacionDobladoPuntosCE").append("En criptografía sólo nos interesan los números enteros positivos, por lo que en el caso de la división que no sea exacta, subimos el denominador y obtenemos su inverso multiplicativo:");
								$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
								await sleepDobladoPuntos(6000);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								primerDivision.innerHTML= "(("+resSegundaMultiplicacion+")<sup>-1</sup>"+resPrimerSuma+")<sup>2</sup>";
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								resInverso= inversoMultiplicativoNumero(resSegundaMultiplicacion, p);

								//verificar si el inverso no es -1 osea no existe cuando el orden de la curva no es primo
								if(!seguirCalculandoDobladoPuntosCE){ return; }

								primerDivision.innerHTML= "(("+resInverso+")"+resPrimerSuma+")<sup>2</sup>";
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								resPrimerDivision= parseInt(resInverso)*parseInt(resPrimerSuma);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								$("#informacionOperacionDobladoPuntosCE").append("Continuamos calculando x<sub>3</sub>:");
								$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
								await sleepDobladoPuntos(1000);
							}

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							primerDivision.innerHTML= "("+resPrimerDivision+")<sup>2</sup>";
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resPrimerDivision= Math.pow(resPrimerDivision, 2);
							primerDivision.innerHTML= ""+resPrimerDivision;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							primerDivision.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							tercerMultiplicacion.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							tercerMultiplicacion.innerHTML= "2("+x1+")";
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resTercerMultiplicacion= 2*parseInt(x1);
							tercerMultiplicacion.innerHTML= ""+resTercerMultiplicacion;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							tercerMultiplicacion.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							primerDivision.innerHTML= "";
							tercerMultiplicacion.innerHTML= "";
							primerResta.innerHTML= ""+resPrimerDivision+" - "+resTercerMultiplicacion;
							primerResta.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							resPrimerResta= parseInt(resPrimerDivision)-parseInt(resTercerMultiplicacion);
							primerResta.innerHTML= ""+resPrimerResta;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							primerResta.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							x3= parseInt(Modulo(parseInt(resPrimerResta), parseInt(p)));
							primerResta.innerHTML= "";
							auxTexto3.innerHTML= "";
							auxTexto.innerHTML= "x<sub>3</sub>= "+resPrimerResta+" mod p";
							auxTexto.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							auxTexto.innerHTML= "x<sub>3</sub>= "+resPrimerResta+" mod "+p;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							auxTexto.innerHTML= "x<sub>3</sub>= "+x3;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							auxTexto.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/***********************************************************************************Y3***************************************************************************************/
							$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
							await sleepDobladoPuntos(250);
							$("#informacionOperacionDobladoPuntosCE").empty();

							$("#informacionOperacionDobladoPuntosCE").append("Vamos a calcular y<sub>3</sub>:");
							$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
							await sleepDobladoPuntos(1000);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							var operacionY= document.createElement("label");
							var resPrimerMultiplicacionY;
							var resPrimerSumaY;
							var resSegundaMultiplicacionY;
							var resPrimerDivisionY;
							var resInversoY;
							var resPrimerRestaY;
							var resTercerMultiplicacionY;
							var resSegundaRestaY;
							var auxTextoY= document.createElement("label");
							var auxTexto2Y= document.createElement("label");

							/* ESCRIBIENDO FORMULA*/
							auxTextoY.innerHTML= "y<sub>3</sub>= (";
							zonaY3.appendChild(auxTextoY);
							operacionY.innerHTML= "3(x<sub>1</sub>)<sup>2</sup>";
							zonaY3.appendChild(operacionY);
							zonaY3.appendChild(document.createTextNode (" "));
							auxTexto2Y.innerHTML= "+ a/2(y<sub>1</sub>))(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";
							zonaY3.appendChild(auxTexto2Y);
							await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/*3x1^2*/
							operacionY.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionY.innerHTML= "3("+ x1 +")<sup>2</sup>";
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionY.innerHTML= "3("+ Math.pow(x1, 2) +")";
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resPrimerMultiplicacionY= 3*Math.pow(x1, 2);
							operacionY.innerHTML= ""+resPrimerMultiplicacionY;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionY.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA */
							auxTextoY.innerHTML= "y<sub>3</sub>= (";
							operacionY.innerHTML= ""+resPrimerMultiplicacionY+" + a";
							auxTexto2Y.innerHTML= "/2(y<sub>1</sub>))(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

							/*3x1^2 + a*/
							operacionY.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionY.innerHTML= ""+resPrimerMultiplicacionY+" + "+a;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resPrimerSumaY= parseInt(resPrimerMultiplicacionY)+parseInt(a);
							operacionY.innerHTML= ""+resPrimerSumaY;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionY.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA */
							auxTextoY.innerHTML= "y<sub>3</sub>= ("+resPrimerSumaY+"/";
							operacionY.innerHTML= "2(y<sub>1</sub>)";
							auxTexto2Y.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

							/*2y1*/
							operacionY.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionY.innerHTML= "2("+y1+")";
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resSegundaMultiplicacionY= 2*parseInt(y1);
							operacionY.innerHTML= ""+resSegundaMultiplicacionY;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionY.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA */
							auxTextoY.innerHTML= "y<sub>3</sub>= (";
							operacionY.innerHTML= ""+resPrimerSumaY+"/"+resSegundaMultiplicacionY;
							auxTexto2Y.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

							/*3x1^2+a/2y1*/

							operacionY.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(resSegundaMultiplicacionY!=0)
							{
								if(resPrimerSumaY%resSegundaMultiplicacionY==0) //Divison exacta
								{
									resPrimerDivision= parseInt(resPrimerSumaY)/parseInt(resSegundaMultiplicacionY);
								}
								else //Subir denominador y encontrar el inverso
								{
									if(!seguirCalculandoDobladoPuntosCE){ return; }

									operacionY.innerHTML= "("+resSegundaMultiplicacionY+")<sup>-1</sup>("+resPrimerSumaY+")";
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
									resInversoY= inversoMultiplicativoNumero(resSegundaMultiplicacionY, p);
									operacionY.innerHTML= "("+resInversoY+")("+resPrimerSumaY+")";
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
									resPrimerDivisionY= parseInt(resInversoY)*parseInt(resPrimerSumaY);

									if(!seguirCalculandoDobladoPuntosCE){ return; }
								}

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								operacionY.innerHTML= ""+resPrimerDivisionY;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionY.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA */
								auxTextoY.innerHTML= "y<sub>3</sub>= ("+resPrimerDivisionY+")";
								operacionY.innerHTML= "(x<sub>1</sub> - x<sub>3</sub>)";
								auxTexto2Y.innerHTML= " - y<sub>1</sub> mod p";

								/*x1-x3*/
								operacionY.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								operacionY.innerHTML= "("+ x1 +" - "+ x3 +")";
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								resPrimerRestaY= parseInt(x1)-parseInt(x3);
								operacionY.innerHTML= "("+ resPrimerRestaY +")";
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionY.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA */
								auxTextoY.innerHTML= "y<sub>3</sub>= ";
								operacionY.innerHTML= "("+resPrimerDivisionY+")("+resPrimerRestaY+")";
								auxTexto2Y.innerHTML= " - y<sub>1</sub> mod p";

								/*3x1^2+a/2y1 * x1-x3 */
								operacionY.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								resTercerMultiplicacionY= parseInt(resPrimerDivisionY)*parseInt(resPrimerRestaY);
								operacionY.innerHTML= ""+resTercerMultiplicacionY;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionY.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA */
								auxTextoY.innerHTML= "y<sub>3</sub>= ";
								operacionY.innerHTML= ""+resTercerMultiplicacionY+" - y<sub>1</sub>";
								auxTexto2Y.innerHTML= " mod p";

								/*3x1^2+a/2y1 * x1-x3 - y1*/
								operacionY.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								operacionY.innerHTML= ""+resTercerMultiplicacionY+" - "+y1;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								resSegundaRestaY= parseInt(resTercerMultiplicacionY)-parseInt(y1);
								operacionY.innerHTML= ""+resSegundaRestaY;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionY.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA */
								auxTextoY.innerHTML= "";
								operacionY.innerHTML= "y<sub>3</sub>= "+resSegundaRestaY+" mod p";
								auxTexto2Y.innerHTML= "";

								/*3x1^2+a/2y1 * x1-x3 - y1 mod n*/
								operacionY.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								operacionY.innerHTML= "y<sub>3</sub>= "+resSegundaRestaY+" mod "+p;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								y3= Modulo(resSegundaRestaY, p);
								operacionY.innerHTML= "y<sub>3</sub>= "+y3;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionY.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								if(i+1==k)
								{
									$("#informacionOperacionDobladoPuntosCE").append("El resultado es:");
									$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
									await sleepDobladoPuntos(500);

									sumasArealizar.innerHTML= ""+k+"P= ("+x3+","+y3+")";

									sumasArealizar.style.backgroundColor = "#77DD77";
									auxTexto.style.backgroundColor= "#77DD77";
									operacionY.style.backgroundColor= "#77DD77";

									if(!seguirCalculandoDobladoPuntosCE){ return; }

									$("#btn-velocidadODPCE").show();
									$("#btnCalcularODPCE").show();
									$("#btnCancelarODPCE").hide();
									
									toastr.options.timeOut = "1000";
									toastr['success'](mensaje_72);
									$("#resultadoDobladoPuntosCE").val(""+x3+","+y3);
								}
								else
								{
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);//PARA QUE SE VEA EL RESULTADO POR EL MOMENTO
								}
							}
							else
							{
								//Punto al infinito
								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								$("#informacionOperacionDobladoPuntosCE").append("Punto al infinito");
								$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
								await sleepDobladoPuntos(1250);

								i= k;
							}
						}
						else
						{
							//Punto al infinito
							$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
							await sleepDobladoPuntos(250);
							$("#informacionOperacionDobladoPuntosCE").empty();

							$("#informacionOperacionDobladoPuntosCE").append("Punto al infinito");
							$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
							await sleepDobladoPuntos(1250);

							i= k;
						}
					}
					else //PUNTOS DIFERENTES
					{
						$("#informacionOperacionDobladoPuntosCE").append("Se realizará la suma de puntos diferentes.");
						$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
						await sleepDobladoPuntos(1750);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						/***************************************************************************************X3************************************************************************************/
						var operacionXPD= document.createElement("label");
						var resPrimerRestaXPD;
						var resSegundaRestaXPD;
						var resPrimerDivisionXPD;
						var resInversoXPD;
						var resTercerRestaXPD;
						var resCuartaRestaXPD;
						var auxTextoXPD= document.createElement("label");
						var auxTexto2XPD= document.createElement("label");

						$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
						await sleepDobladoPuntos(250);
						$("#informacionOperacionDobladoPuntosCE").empty();

						$("#informacionOperacionDobladoPuntosCE").append("Vamos a calcular x<sub>3</sub>:");
						$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
						await sleepDobladoPuntos(1000);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						/* ESCRIBIENDO FORMULA*/
						auxTextoXPD.innerHTML= "x<sub>3</sub>= (";
						zonaX3.appendChild(auxTextoXPD);
						operacionXPD.innerHTML= "y<sub>2</sub> - y<sub>1</sub>";
						zonaX3.appendChild(operacionXPD);
						auxTexto2XPD.innerHTML= "/ x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> - x<sub>1</sub> - x<sub>2</sub> mod p";
						zonaX3.appendChild(auxTexto2XPD);
						await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						/*y2 - y1*/
						operacionXPD.style.backgroundColor= "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
						operacionXPD.innerHTML= ""+y2+" - "+y1;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						resPrimerRestaXPD= parseInt(y2)-parseInt(y1);
						operacionXPD.innerHTML= ""+resPrimerRestaXPD;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						operacionXPD.style.backgroundColor= "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						/* REESCRIBIENDO FORMULA*/
						auxTextoXPD.innerHTML= "x<sub>3</sub>= ("+resPrimerRestaXPD+"/";
						operacionXPD.innerHTML= "x<sub>2</sub> - x<sub>1</sub>";
						auxTexto2XPD.innerHTML= ")<sup>2</sup> - x<sub>1</sub> - x<sub>2</sub> mod p";

						/*x2 - x1*/
						operacionXPD.style.backgroundColor= "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
						operacionXPD.innerHTML= ""+x2+" - "+x1;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						resSegundaRestaXPD= parseInt(x2)-parseInt(x1);
						operacionXPD.innerHTML= ""+resSegundaRestaXPD;
						await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
						operacionXPD.style.backgroundColor= "transparent";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(!seguirCalculandoDobladoPuntosCE){ return; }

						/* REESCRIBIENDO FORMULA*/
						auxTextoXPD.innerHTML= "x<sub>3</sub>= ";
						operacionXPD.innerHTML= "("+ resPrimerRestaXPD+"/"+resSegundaRestaXPD+")<sup>2</sup>";
						auxTexto2XPD.innerHTML= " - x<sub>1</sub> - x<sub>2</sub> mod p";

						/* (y2-y1/x2-x1)^2 */
						operacionXPD.style.backgroundColor= "yellow";
						await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

						if(resSegundaRestaXPD!=0)
						{
							if(resPrimerRestaXPD%resSegundaRestaXPD==0)//Division exacta
							{
								resPrimerDivisionXPD= parseInt(resPrimerRestaXPD)/parseInt(resSegundaRestaXPD);
							}
							else //Encontrar inverso
							{
								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								$("#informacionOperacionDobladoPuntosCE").append("En criptografía sólo nos interesan los números enteros positivos, por lo que en el caso de la división que no sea exacta, subimos el denominador y obtenemos su inverso multiplicativo:");
								$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
								await sleepDobladoPuntos(6000);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								if(resPrimerRestaXPD<0&&resSegundaRestaXPD<0)
								{
									resPrimerRestaXPD= resPrimerRestaXPD*-1;
									resSegundaRestaXPD= resSegundaRestaXPD*-1;
								}

								if(resSegundaRestaXPD>0)
								{
									operacionXPD.innerHTML= "(("+resSegundaRestaXPD+")<sup>-1</sup>("+resPrimerRestaXPD+"))<sup>2</sup>";
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
									resInversoXPD= inversoMultiplicativoNumero(resSegundaRestaXPD, p);
									operacionXPD.innerHTML= "(("+resInversoXPD+")("+resPrimerRestaXPD+"))<sup>2</sup>";
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
									resPrimerDivisionXPD= parseInt(resInversoXPD)*parseInt(resPrimerRestaXPD);

									if(!seguirCalculandoDobladoPuntosCE){ return; }
								}
								else
								{
									resSegundaRestaXPD= resSegundaRestaXPD*-1;
									operacionXPD.innerHTML= "((-"+resSegundaRestaXPD+")<sup>-1</sup>("+resPrimerRestaXPD+"))<sup>2</sup>";
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
									resInversoXPD= inversoMultiplicativoNumero(resSegundaRestaXPD, p);
									resInversoXPD= resInversoXPD*-1;
									operacionXPD.innerHTML= "(("+resInversoXPD+")("+resPrimerRestaXPD+"))<sup>2</sup>";
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
									resPrimerDivisionXPD= parseInt(resInversoXPD)*parseInt(resPrimerRestaXPD);

									if(!seguirCalculandoDobladoPuntosCE){ return; }
								}

								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								$("#informacionOperacionDobladoPuntosCE").append("Continuamos calculando x<sub>3</sub>:");
								$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
								await sleepDobladoPuntos(1000);
							}

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							operacionXPD.innerHTML= "("+resPrimerDivisionXPD+")<sup>2</sup>";
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resPrimerDivisionXPD= Math.pow(resPrimerDivisionXPD, 2);
							operacionXPD.innerHTML= ""+resPrimerDivisionXPD;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA*/
							auxTextoXPD.innerHTML= "x<sub>3</sub>= ";
							operacionXPD.innerHTML= ""+resPrimerDivisionXPD+" - x<sub>1</sub>";
							auxTexto2XPD.innerHTML= " - x<sub>2</sub> mod p";

							/* ((y2-y1)/(x2-x1))^2 - x1*/
							operacionXPD.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.innerHTML= ""+resPrimerDivisionXPD+" - "+x1;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resTercerRestaXPD= parseInt(resPrimerDivisionXPD)-parseInt(x1);
							operacionXPD.innerHTML= ""+resTercerRestaXPD;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA*/
							auxTextoXPD.innerHTML= "x<sub>3</sub>= ";
							operacionXPD.innerHTML= ""+resTercerRestaXPD+" - x<sub>2</sub>";
							auxTexto2XPD.innerHTML= "  mod p";

							/* ((y2-y1)/(x2-x1))^2 - x1 -x2*/
							operacionXPD.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.innerHTML= ""+resTercerRestaXPD+" - "+x2;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resCuartaRestaXPD= parseInt(resTercerRestaXPD)-parseInt(x2);
							operacionXPD.innerHTML= ""+resCuartaRestaXPD;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA */
							auxTextoXPD.innerHTML= "";
							operacionXPD.innerHTML= "x<sub>3</sub>= "+resCuartaRestaXPD+" mod p";
							auxTexto2XPD.innerHTML= "";

							/* ((y2-y1)/(x2-x1))^2 - x1 -x2 mod n*/
							operacionXPD.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.innerHTML= "x<sub>3</sub>= "+resCuartaRestaXPD+" mod "+p;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							x3= Modulo(resCuartaRestaXPD, p);
							operacionXPD.innerHTML= "x<sub>3</sub>= "+x3;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionXPD.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							//cambiar modulos
							//55 8423 3594
							//validar y1 diferente de cero para el doblado
							//11,9 + 1,12 = 15,6

							/******************************************************************************************Y3*******************************************************************************/
							$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
							await sleepDobladoPuntos(250);
							$("#informacionOperacionDobladoPuntosCE").empty();

							$("#informacionOperacionDobladoPuntosCE").append("Vamos a calcular y<sub>3</sub>:");
							$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
							await sleepDobladoPuntos(1000);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							var operacionYPD= document.createElement("label");
							var resPrimerRestaYPD;
							var resSegundaRestaYPD;
							var resPrimerDivisionYPD;
							var resInversoYPD;
							var resTercerRestaYPD;
							var resPrimerMultiplicacionYPD;
							var resCuartaRestaYPD;
							var auxTextoYPD= document.createElement("label");
							var auxTexto2YPD= document.createElement("label");

							/* ESCRIBIENDO FORMULA*/
							auxTextoYPD.innerHTML= "y<sub>3</sub>= (";
							zonaY3.appendChild(auxTextoYPD);
							operacionYPD.innerHTML= "y<sub>2</sub> - y<sub>1</sub>";
							zonaY3.appendChild(operacionYPD);
							auxTexto2YPD.innerHTML= "/ x<sub>2</sub> - x<sub>1</sub>)(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";
							zonaY3.appendChild(auxTexto2YPD);
							await sleepDobladoPuntos(2000*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/*y2 - y1*/
							operacionYPD.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionYPD.innerHTML= ""+y2+" - "+y1;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resPrimerRestaYPD= parseInt(y2)-parseInt(y1);
							operacionYPD.innerHTML= ""+resPrimerRestaYPD;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionYPD.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA*/
							auxTextoYPD.innerHTML= "y<sub>3</sub>= ("+resPrimerRestaYPD+"/";
							operacionYPD.innerHTML= "x<sub>2</sub> - x<sub>1</sub>";
							auxTexto2YPD.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

							/*x2 - x1*/
							operacionYPD.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
							operacionYPD.innerHTML= ""+x2+" - "+x1;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							resSegundaRestaYPD= parseInt(x2)-parseInt(x1);
							operacionYPD.innerHTML= ""+resSegundaRestaYPD;
							await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
							operacionYPD.style.backgroundColor= "transparent";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(!seguirCalculandoDobladoPuntosCE){ return; }

							/* REESCRIBIENDO FORMULA*/
							auxTextoYPD.innerHTML= "y<sub>3</sub>= (";
							operacionYPD.innerHTML= ""+ resPrimerRestaYPD+"/"+resSegundaRestaYPD;
							auxTexto2YPD.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

							/* (y2-y1/x2-x1) */
							operacionYPD.style.backgroundColor= "yellow";
							await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

							if(resSegundaRestaYPD!=0)
							{
								if(resPrimerRestaYPD%resSegundaRestaYPD==0)//Division exacta
								{
									resPrimerDivisionYPD= parseInt(resPrimerRestaYPD)/parseInt(resSegundaRestaYPD);
								}
								else //Encontrar inverso
								{
									if(!seguirCalculandoDobladoPuntosCE){ return; }

									if(resPrimerRestaYPD<0&&resSegundaRestaYPD<0)
									{
										resPrimerRestaYPD= resPrimerRestaYPD*-1;
										resSegundaRestaYPD= resSegundaRestaYPD*-1;
									}

									if(resSegundaRestaYPD>0)
									{
										operacionYPD.innerHTML= "("+resSegundaRestaYPD+")<sup>-1</sup>("+resPrimerRestaYPD+")";
										await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
										resInversoYPD= inversoMultiplicativoNumero(resSegundaRestaYPD, p);
										operacionYPD.innerHTML= "("+resInversoYPD+")("+resPrimerRestaYPD+")";
										await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
										resPrimerDivisionYPD= parseInt(resInversoYPD)*parseInt(resPrimerRestaYPD);

										if(!seguirCalculandoDobladoPuntosCE){ return; }
									}
									else
									{
										resSegundaRestaYPD= resSegundaRestaYPD*-1;
										operacionYPD.innerHTML= "(-"+resSegundaRestaYPD+")<sup>-1</sup>("+resPrimerRestaYPD+")";
										await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
										resInversoYPD= inversoMultiplicativoNumero(resSegundaRestaYPD, p);
										resInversoYPD= resInversoYPD*-1;
										operacionYPD.innerHTML= "("+resInversoYPD+")("+resPrimerRestaYPD+")";
										await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
										resPrimerDivisionYPD= parseInt(resInversoYPD)*parseInt(resPrimerRestaYPD);

										if(!seguirCalculandoDobladoPuntosCE){ return; }
									}
								}

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								operacionYPD.innerHTML= ""+resPrimerDivisionYPD;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA*/
								auxTextoYPD.innerHTML= "y<sub>3</sub>= ("+ resPrimerDivisionYPD+ ")(";
								operacionYPD.innerHTML= "x<sub>1</sub> - x<sub>3</sub>";
								auxTexto2YPD.innerHTML= ") - y<sub>1</sub> mod p";

								/* x1-x3 */
								operacionYPD.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.innerHTML= ""+x1+" - "+x3;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								resTercerRestaYPD= parseInt(x1)-parseInt(x3);
								operacionYPD.innerHTML= ""+resTercerRestaYPD;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA*/
								auxTextoYPD.innerHTML= "y<sub>3</sub>= ";
								operacionYPD.innerHTML= "("+resPrimerDivisionYPD+")("+resTercerRestaYPD+")";
								auxTexto2YPD.innerHTML= " - y<sub>1</sub> mod p";

								/* (y2-y1/x2-x1)(x1-x3) */
								operacionYPD.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								resPrimerMultiplicacionYPD= parseInt(resPrimerDivisionYPD)*parseInt(resTercerRestaYPD);
								operacionYPD.innerHTML= ""+resPrimerMultiplicacionYPD;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA*/
								auxTextoYPD.innerHTML= "y<sub>3</sub>= ";
								operacionYPD.innerHTML= ""+resPrimerMultiplicacionYPD+" - y<sub>1</sub>";
								auxTexto2YPD.innerHTML= " mod p";

								/* (y2-y1/x2-x1)(x1-x3)-y1 */
								operacionYPD.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.innerHTML= ""+resPrimerMultiplicacionYPD+" - "+y1;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								resCuartaRestaYPD= parseInt(resPrimerMultiplicacionYPD)-parseInt(y1);
								operacionYPD.innerHTML= ""+resCuartaRestaYPD;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								/* REESCRIBIENDO FORMULA */
								auxTextoYPD.innerHTML= "";
								operacionYPD.innerHTML= "y<sub>3</sub>= "+resCuartaRestaYPD+" mod p";
								auxTexto2YPD.innerHTML= "";

								/* (y2-y1/x2-x1)(x1-x3)-y1 mod n*/
								operacionYPD.style.backgroundColor= "yellow";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.innerHTML= "y<sub>3</sub>= "+resCuartaRestaYPD+" mod "+p;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								y3= Modulo(resCuartaRestaYPD, p);
								operacionYPD.innerHTML= "y<sub>3</sub>= "+y3;
								await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								operacionYPD.style.backgroundColor= "transparent";
								await sleepDobladoPuntos(250*velocidadAnimacionDobladoPuntosCE);

								if(!seguirCalculandoDobladoPuntosCE){ return; }

								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								if(i+1==k)
								{
									$("#informacionOperacionDobladoPuntosCE").append("El resultado es:");
									$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
									await sleepDobladoPuntos(500);

									sumasArealizar.innerHTML= ""+k+"P= ("+x3+","+y3+")";

									sumasArealizar.style.backgroundColor = "#77DD77";
									operacionXPD.style.backgroundColor= "#77DD77";
									operacionYPD.style.backgroundColor= "#77DD77";

									if(!seguirCalculandoDobladoPuntosCE){ return; }

									$("#btn-velocidadODPCE").show();
									$("#btnCalcularODPCE").show();
									$("#btnCancelarODPCE").hide();
									
									toastr.options.timeOut = "1000";
									toastr['success'](mensaje_72);
									$("#resultadoDobladoPuntosCE").val(""+x3+","+y3);
								}
								else
								{
									await sleepDobladoPuntos(1000*velocidadAnimacionDobladoPuntosCE);
								}
							}
							else
							{
								//Punto al infinito
								$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
								await sleepDobladoPuntos(250);
								$("#informacionOperacionDobladoPuntosCE").empty();

								$("#informacionOperacionDobladoPuntosCE").append("Punto al infinito");
								$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
								await sleepDobladoPuntos(1250);

								i= k;
							}
						}
						else
						{
							//Punto al infinito
							$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
							await sleepDobladoPuntos(250);
							$("#informacionOperacionDobladoPuntosCE").empty();

							$("#informacionOperacionDobladoPuntosCE").append("Punto al infinito");
							$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
							await sleepDobladoPuntos(1250);

							i= k;
						}
					}
				}
				else
				{
					$("#informacionOperacionDobladoPuntosCE").append("Calculamos las restantes operaciones.");
					$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
					await sleepDobladoPuntos(1250);

					var puntoFinal= obtenerkPunto(k, x2, y2, 1, 4, 23);
					var operacionXPD= document.createElement("label");
					var operacionYPD= document.createElement("label");

					zonaX3.appendChild(operacionXPD);
					zonaY3.appendChild(operacionYPD);

					$("#informacionOperacionDobladoPuntosCE").slideToggle(250);	
					await sleepDobladoPuntos(250);
					$("#informacionOperacionDobladoPuntosCE").empty();

					$("#informacionOperacionDobladoPuntosCE").append("El resultado es:");
					$("#informacionOperacionDobladoPuntosCE").slideToggle(500);
					await sleepDobladoPuntos(500);

					operacionXPD.innerHTML= "x<sub>3</sub>= "+puntoFinal[0];
					operacionYPD.innerHTML= "y<sub>3</sub>= "+puntoFinal[1];

					sumasArealizar.innerHTML= ""+k+"P= ("+puntoFinal[0]+","+puntoFinal[1]+")";

					sumasArealizar.style.backgroundColor = "#77DD77";
					operacionXPD.style.backgroundColor= "#77DD77";
					operacionYPD.style.backgroundColor= "#77DD77";

					if(!seguirCalculandoDobladoPuntosCE){ return; }

					$("#btn-velocidadODPCE").show();
					$("#btnCalcularODPCE").show();
					$("#btnCancelarODPCE").hide();
					
					toastr.options.timeOut = "1000";
					toastr['success'](mensaje_72);
					$("#resultadoDobladoPuntosCE").val(""+puntoFinal[0]+","+puntoFinal[1]);

					i= k;
				}
			}
		}
	}
}

function validarNumeroKADP()
{
	var mensaje = "";	
	var valorA= Number($('#kOperacionDobladoPuntosCE').val());
	var numeroLetras= $('#kOperacionDobladoPuntosCE').val();
	
	if (valorA<1 || valorA>29 || numeroLetras.length == 0 || numeroLetras.includes("."))
	{
		mensaje = mensaje_137;
	}	

	return mensaje;
}

$(document).ready(function()
{
	$("#CalcularRapidoODPCE").click(function(){
		$("#btnCalcularODPCE").html('Calcular Rápido');
		$("#btnCalcularODPCE").val(1);
	});
	$("#CalcularNormalODPCE").click(function(){
		$("#btnCalcularODPCE").html('Calcular Normal');
		$("#btnCalcularODPCE").val(2);
	});

	$("#btnCalcularODPCE").click(function()
	{
		var mensaje= validarNumeroKADP();

		if (mensaje.length != 0) 
		{
			$("#kOperacionDobladoPuntosCE-error").remove();
			$("#kOperacionDobladoPuntosCE").parent().parent().append('<div id="kOperacionDobladoPuntosCE-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#kOperacionDobladoPuntosCE").addClass('input-error');
			//$("#btnCalcularOCNPC").attr("disabled", true);
		}
		else
		{
			$("#kOperacionDobladoPuntosCE-error").remove();
			$("#kOperacionDobladoPuntosCE").removeClass('input-error');
			$("#-btnCalcularODPCE").attr("disabled", false);

			realizarDobladoPuntosCE();
		}		
	});

	$("#btnCancelarODPCE").click(function()
	{
		seguirCalculandoDobladoPuntosCE= false;
		
		limpiaPanelOperacionDobladoPuntosCE();

		$("#btn-velocidadODPCE").show();
		$("#btnCalcularODPCE").show();
		$("#btnCancelarODPCE").hide();
	});

	$("#kOperacionDobladoPuntosCE").on('click change keyup', function()
	{
		var mensaje= validarNumeroKADP();

		if (mensaje.length != 0) 
		{
			$("#kOperacionDobladoPuntosCE-error").remove();
			$("#kOperacionDobladoPuntosCE").parent().parent().append('<div id="kOperacionDobladoPuntosCE-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#kOperacionDobladoPuntosCE").addClass('input-error');
			//$("#btnCalcularOCNPC").attr("disabled", true);
		}
		else
		{
			$("#kOperacionDobladoPuntosCE-error").remove();
			$("#kOperacionDobladoPuntosCE").removeClass('input-error');
			$("#btnCalcularODPCE").attr("disabled", false);
		}
	});

	//FUNCIONES CALCULADORA

	$("#aODPC").on('click change keyup', function() {
		puntosODPC= obtenerPuntosODPC(0);

		var mensaje = validarNumeroAODPC();
		var mensajeB = validarNumeroBODPC();
		var mensajeP = validarNumeroPODPC();
		var mensajeP1= validarP1ODPC();
		var mensajeK= validarKODPC();

		if (mensaje.length != 0) 
		{
			$("#aODPC-error").remove();
			$("#aODPC").parent().append('<div id="aODPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aODPC").addClass('input-error');
			//$("#btnCalcularODPC").attr("disabled", true);

			if(mensajeP.length!=0)
			{
				$("#pODPC-error").remove();
				$("#pODPC").parent().append('<div id="pODPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pODPC").addClass('input-error');
			}
			else
			{
				$("#pODPC-error").remove();
				$("#pODPC").removeClass('input-error');				
			}

			if(mensajeB.length!=0)
			{
				$("#bODPC-error").remove();
				$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
				$("#bODPC").addClass('input-error');
			}
			else
			{
				$("#bODPC-error").remove();
				$("#bODPC").removeClass('input-error');
			}

			if(mensajeP1.length!=0)
			{
				$("#P1ODPC-error").remove();
				$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
				$("#P1ODPC").addClass('input-error');
			}
			else
			{
				$("#P1ODPC-error").remove();
				$("#P1ODPC").removeClass('input-error');
			}

			if(mensajeK.length!=0)
			{
				$("#kODPC-error").remove();
				$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
				$("#kODPC").addClass('input-error');
			}
			else
			{
				$("#kODPC-error").remove();
				$("#kODPC").removeClass('input-error');
			}
		}
		else
		{
			$("#aODPC-error").remove();
			$("#aODPC").removeClass('input-error');
			
			if(mensajeP.length!=0)
			{
				$("#pODPC-error").remove();
				$("#pODPC").parent().append('<div id="pODPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pODPC").addClass('input-error');
				//$("#btnCalcularODPC").attr("disabled", true);

				if(mensajeB.length!=0)
				{
					$("#bODPC-error").remove();
					$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bODPC").addClass('input-error');
				}
				else
				{
					$("#bODPC-error").remove();
					$("#bODPC").removeClass('input-error');
				}

				if(mensajeP1.length!=0)
				{
					$("#P1ODPC-error").remove();
					$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
					$("#P1ODPC").addClass('input-error');
				}
				else
				{
					$("#P1ODPC-error").remove();
					$("#P1ODPC").removeClass('input-error');
				}

				if(mensajeK.length!=0)
				{
					$("#kODPC-error").remove();
					$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
					$("#kODPC").addClass('input-error');
				}
				else
				{
					$("#kODPC-error").remove();
					$("#kODPC").removeClass('input-error');
				}
			}
			else
			{
				$("#pODPC-error").remove();
				$("#pODPC").removeClass('input-error');
				
				if(mensajeB.length!=0)
				{
					$("#bODPC-error").remove();
					$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bODPC").addClass('input-error');
					//$("#btnCalcularODPC").attr("disabled", true);					

					if(mensajeP1.length!=0)
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1ODPC").addClass('input-error');
					}
					else
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").removeClass('input-error');
					}

					if(mensajeK.length!=0)
					{
						$("#kODPC-error").remove();
						$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
						$("#kODPC").addClass('input-error');
					}
					else
					{
						$("#kODPC-error").remove();
						$("#kODPC").removeClass('input-error');
					}
				}
				else
				{
					$("#bODPC-error").remove();
					$("#bODPC").removeClass('input-error');

					if(mensajeP1.length!=0)
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1ODPC").addClass('input-error');

						if(mensajeK.length!=0)
						{
							$("#kODPC-error").remove();
							$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
							$("#kODPC").addClass('input-error');
						}
						else
						{
							$("#kODPC-error").remove();
							$("#kODPC").removeClass('input-error');
						}
					}
					else
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").removeClass('input-error');

						if(mensajeK.length!=0)
						{
							$("#kODPC-error").remove();
							$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
							$("#kODPC").addClass('input-error');
						}
						else
						{
							$("#kODPC-error").remove();
							$("#kODPC").removeClass('input-error');
							$("#btnCalcularODPC").attr("disabled", false);
						}						
					}
				}
			}
		}
	});

	$("#bODPC").on('click change keyup', function() {
		puntosODPC= obtenerPuntosODPC(0);

		var mensaje = validarNumeroBODPC();
		var mensajeA = validarNumeroAODPC();
		var mensajeP = validarNumeroPODPC();
		var mensajeP1= validarP1ODPC();
		var mensajeK= validarKODPC();

		if (mensaje.length != 0) 
		{
			$("#bODPC-error").remove();
			$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bODPC").addClass('input-error');
			//$("#btnCalcularODPC").attr("disabled", true);

			if(mensajeA.length!=0)
			{
				$("#aODPC-error").remove();
				$("#aODPC").parent().append('<div id="aODPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aODPC").addClass('input-error');
			}
			else
			{
				$("#aODPC-error").remove();
				$("#aODPC").removeClass('input-error');				
			}

			if(mensajeP.length!=0)
			{
				$("#pODPC-error").remove();
				$("#pODPC").parent().append('<div id="pODPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pODPC").addClass('input-error');
			}
			else
			{
				$("#pODPC-error").remove();
				$("#pODPC").removeClass('input-error');
			}

			if(mensajeP1.length!=0)
			{
				$("#P1ODPC-error").remove();
				$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
				$("#P1ODPC").addClass('input-error');
			}
			else
			{
				$("#P1ODPC-error").remove();
				$("#P1ODPC").removeClass('input-error');
			}

			if(mensajeK.length!=0)
			{
				$("#kODPC-error").remove();
				$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
				$("#kODPC").addClass('input-error');
			}
			else
			{
				$("#kODPC-error").remove();
				$("#kODPC").removeClass('input-error');
			}
		}
		else
		{
			$("#bODPC-error").remove();
			$("#bODPC").removeClass('input-error');
			
			if(mensajeA.length!=0)
			{
				$("#aODPC-error").remove();
				$("#aODPC").parent().append('<div id="aODPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aODPC").addClass('input-error');
				//$("#btnCalcularODPC").attr("disabled", true);

				if(mensajeP.length!=0)
				{
					$("#pODPC-error").remove();
					$("#pODPC").parent().append('<div id="PODPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
					$("#pODPC").addClass('input-error');
				}
				else
				{
					$("#pODPC-error").remove();
					$("#pODPC").removeClass('input-error');
				}

				if(mensajeP1.length!=0)
				{
					$("#P1ODPC-error").remove();
					$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
					$("#P1ODPC").addClass('input-error');
				}
				else
				{
					$("#P1ODPC-error").remove();
					$("#P1ODPC").removeClass('input-error');
				}

				if(mensajeK.length!=0)
				{
					$("#kODPC-error").remove();
					$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
					$("#kODPC").addClass('input-error');
				}
				else
				{
					$("#kODPC-error").remove();
					$("#kODPC").removeClass('input-error');
				}
			}
			else
			{
				$("#aODPC-error").remove();
				$("#aODPC").removeClass('input-error');
				
				if(mensajeP.length!=0)
				{
					$("#pODPC-error").remove();
					$("#pODPC").parent().append('<div id="pODPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
					$("#pODPC").addClass('input-error');
					//$("#btnCalcularODPC").attr("disabled", true);					

					if(mensajeP1.length!=0)
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1ODPC").addClass('input-error');
					}
					else
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").removeClass('input-error');
					}

					if(mensajeK.length!=0)
					{
						$("#kODPC-error").remove();
						$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
						$("#kODPC").addClass('input-error');
					}
					else
					{
						$("#kODPC-error").remove();
						$("#kODPC").removeClass('input-error');
					}
				}
				else
				{
					$("#pODPC-error").remove();
					$("#pODPC").removeClass('input-error');			

					if(mensajeP1.length!=0)
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1ODPC").addClass('input-error');

						if(mensajeK.length!=0)
						{
							$("#kODPC-error").remove();
							$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
							$("#kODPC").addClass('input-error');
						}
						else
						{
							$("#kODPC-error").remove();
							$("#kODPC").removeClass('input-error');
						}
					}
					else
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").removeClass('input-error');

						if(mensajeK.length!=0)
						{
							$("#kODPC-error").remove();
							$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
							$("#kODPC").addClass('input-error');
						}
						else
						{
							$("#kODPC-error").remove();
							$("#kODPC").removeClass('input-error');
							$("#btnCalcularODPC").attr("disabled", false);
						}						
					}
				}
			}
		}
	});

	$("#pODPC").on('click change keyup', function() {
		puntosODPC= obtenerPuntosODPC(0);

		var mensaje = validarNumeroPODPC();	
		var mensajeA= validarNumeroAODPC();
		var mensajeB= validarNumeroBODPC();
		var mensajeP1= validarP1ODPC();
		var mensajeK= validarKODPC();

		if (mensaje.length != 0) 
		{
			$("#pODPC-error").remove();
			$("#pODPC").parent().append('<div id="pODPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#pODPC").addClass('input-error');
			//$("#btnCalcularODPC").attr("disabled", true);

			if(mensajeA.length!=0)
			{
				$("#aODPC-error").remove();
				$("#aODPC").parent().append('<div id="aODPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aODPC").addClass('input-error');
			}
			else
			{
				$("#aODPC-error").remove();
				$("#aODPC").removeClass('input-error');				
			}

			if(mensajeB.length!=0)
			{
				$("#bODPC-error").remove();
				$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
				$("#bODPC").addClass('input-error');
			}
			else
			{
				$("#bODPC-error").remove();
				$("#bODPC").removeClass('input-error');
			}

			if(mensajeP1.length!=0)
			{
				$("#P1ODPC-error").remove();
				$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
				$("#P1ODPC").addClass('input-error');
			}
			else
			{
				$("#P1ODPC-error").remove();
				$("#P1ODPC").removeClass('input-error');
			}

			if(mensajeK.length!=0)
			{
				$("#kODPC-error").remove();
				$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
				$("#kODPC").addClass('input-error');
			}
			else
			{
				$("#kODPC-error").remove();
				$("#kODPC").removeClass('input-error');
			}
		}
		else
		{
			$("#pODPC-error").remove();
			$("#pODPC").removeClass('input-error');

			if(mensajeA.length!=0)
			{
				$("#aODPC-error").remove();
				$("#aODPC").parent().append('<div id="aODPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aODPC").addClass('input-error');
				//$("#btnCalcularODPC").attr("disabled", true);

				if(mensajeB.length!=0)
				{
					$("#bODPC-error").remove();
					$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bODPC").addClass('input-error');
				}
				else
				{
					$("#bODPC-error").remove();
					$("#bODPC").removeClass('input-error');
				}

				if(mensajeP1.length!=0)
				{
					$("#P1ODPC-error").remove();
					$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
					$("#P1ODPC").addClass('input-error');
				}
				else
				{
					$("#P1ODPC-error").remove();
					$("#P1ODPC").removeClass('input-error');
				}

				if(mensajeK.length!=0)
				{
					$("#kODPC-error").remove();
					$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
					$("#kODPC").addClass('input-error');
				}
				else
				{
					$("#kODPC-error").remove();
					$("#kODPC").removeClass('input-error');
				}
			}
			else
			{
				$("#aODPC-error").remove();
				$("#aODPC").removeClass('input-error');
				
				if(mensajeB.length!=0)
				{
					$("#bODPC-error").remove();
					$("#bODPC").parent().append('<div id="bODPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bODPC").addClass('input-error');
					//$("#btnCalcularODPC").attr("disabled", true);					

					if(mensajeP1.length!=0)
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1ODPC").addClass('input-error');
					}
					else
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").removeClass('input-error');
					}

					if(mensajeK.length!=0)
					{
						$("#kODPC-error").remove();
						$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
						$("#kODPC").addClass('input-error');
					}
					else
					{
						$("#kODPC-error").remove();
						$("#kODPC").removeClass('input-error');
					}
				}
				else
				{
					$("#bODPC-error").remove();
					$("#bODPC").removeClass('input-error');			

					if(mensajeP1.length!=0)
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1ODPC").addClass('input-error');

						if(mensajeK.length!=0)
						{
							$("#kODPC-error").remove();
							$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
							$("#kODPC").addClass('input-error');
						}
						else
						{
							$("#kODPC-error").remove();
							$("#kODPC").removeClass('input-error');
						}
					}
					else
					{
						$("#P1ODPC-error").remove();
						$("#P1ODPC").removeClass('input-error');

						if(mensajeK.length!=0)
						{
							$("#kODPC-error").remove();
							$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensajeK+'</div>');
							$("#kODPC").addClass('input-error');
						}
						else
						{
							$("#kODPC-error").remove();
							$("#kODPC").removeClass('input-error');
							$("#btnCalcularODPC").attr("disabled", false);
						}						
					}
				}
			}			
		}
	});

	$("#P1ODPC").on('click change keyup', function() {
		var mensaje = validarP1ODPC();
		var mensaje2= validarKODPC();

		if (mensaje.length != 0) 
		{
			$("#P1ODPC-error").remove();
			$("#P1ODPC").parent().append('<div id="P1ODPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#P1ODPC").addClass('input-error');
			//$("#btnCalcularODPC").attr("disabled", true);
		} 
		else
		{
			$("#P1ODPC-error").remove();
			$("#P1ODPC").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularODPC").attr("disabled", false);
			}
		}
	});

	$("#kODPC").on('click change keyup', function() {
		var mensaje = validarKODPC();
		var mensaje2= validarP1ODPC();

		if (mensaje.length != 0) {
			$("#kODPC-error").remove();
			$("#kODPC").parent().append('<div id="kODPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#kODPC").addClass('input-error');
			//$("#btnCalcularODPC").attr("disabled", true);			
		} 
		else
		{
			$("#kODPC-error").remove();
			$("#kODPC").removeClass('input-error');
			
			if(mensaje2.length==0)
			{
				$("#btnCalcularODPC").attr("disabled", false);
			}
		}
	});

	$("#btnCalcularODPC").click(function()
	{
		var mensaje = validarNumeroPODPC();	
		var mensajeA= validarNumeroAODPC();
		var mensajeB= validarNumeroBODPC();
		var mensajeP1= validarP1ODPC();
		var mensajeK= validarKODPC();

		if(mensaje.length==0&&mensajeA.length==0&&mensajeB.length==0&&mensajeP1.length==0&&mensajeK.length==0)
		{

			var P1= ($("#P1ODPC").val()).split(",");
			var k= Number($('#kODPC').val());
			var PR= [];
			var valorB= Number($('#bODPC').val());
			var valorP= Number($('#pODPC').val());
			var valorA= Number($('#aODPC').val());

			PR= obtenerkPunto(k, P1[0], P1[1], valorA, valorB, valorP);

			if(PR[0]==-1)
			{
				$("#ResultadoODPC").val("Punto al infinito");
			}
			else
			{
				$("#ResultadoODPC").val(""+PR[0]+","+PR[1]);
			}
		}
	});

	puntosODPC= obtenerPuntosODPC(1);

	var puntos=[], i;
	var select = document.getElementById("POperacionDobladoPuntosCE");

	if(select!=null)
	{
		puntos= obtenerPuntos(1,4,23);

		for(i=0; puntos[i]!=-100; i=i+2)
		{
			var option= document.createElement("option");
			option.text= ""+puntos[i]+","+puntos[i+1];
			option.value= ""+puntos[i]+","+puntos[i+1];
			select.appendChild(option);
		}

		select.selectedIndex= 0;
	}
});

//FUNCIONES CALCULADORA

function validarNumeroAODPC()
{
	var mensaje = "";	
	var valorA= Number($('#aODPC').val());
	var numeroLetras= $('#aODPC').val();
	var valorP= Number($('#pODPC').val());
	var numeroLetrasP= $('#pODPC').val();
	var valorB= Number($('#bODPC').val());
	var numeroLetrasB= $('#bODPC').val();
	var resultadoCondicion;
	var letrasP= validarNumeroPODPC();
	
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

function validarNumeroBODPC()
{
	var mensaje = "";	
	var valorB= Number($('#bODPC').val());
	var numeroLetras= $('#bODPC').val();	
	var valorP= Number($('#pODPC').val());
	var numeroLetrasP= $('#pODPC').val();
	var valorA= Number($('#aODPC').val());
	var numeroLetrasA= $('#aODPC').val();
	var resultadoCondicion;
	var letrasP= validarNumeroPODPC();
	
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

function validarNumeroPODPC()
{
	var mensaje = "";	
	var valorP= Number($('#pODPC').val());
	var numeroLetras= $('#pODPC').val();
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

function validarP1ODPC()
{
	var mensaje = "";
	var texto = $('#P1ODPC').val();
	var mensajeA= validarNumeroAODPC();
	var mensajeB= validarNumeroBODPC();
	var mensajeP= validarNumeroPODPC();
	var valorP= Number($('#pODPC').val());
	var i;

	if(mensajeA.length==0&&mensajeB.length==0&&mensajeP.length==0)
	{		
		if (texto.length < 3 || texto.length > 10)
		{
			mensaje = mensaje_134;
		}
		else if(!texto.match(/^[0-9]{1,2}([,][0-9]{1,2})?$/))
		{
			mensaje = mensaje_135;
		}
		else
		{
			puntosODPC= obtenerPuntosODPC(1);

			var coordenadas= ($("#P1ODPC").val()).split(",");
			var bandera= 0;

			for(i=0; puntosODPC[i]!=-100; i=i+2)
			{
				if(puntosODPC[i]==coordenadas[0])
				{
					if(puntosODPC[i+1]==coordenadas[1])
					{
						bandera= 1;						
					}
				}
			}

			if(bandera==0)
			{
				mensaje = mensaje_136;
			}
		}
	}
	else
	{
		mensaje= mensaje_133;
	}

	return mensaje;
}

function validarKODPC()
{
	var mensaje = "";
	var valorK = Number($('#kODPC').val());
	var mensajeA= validarNumeroAODPC();
	var mensajeB= validarNumeroBODPC();
	var mensajeP= validarNumeroPODPC();
	var valorP= Number($('#pODPC').val());
	var numeroLetras= $('#kODPC').val();

	if(mensajeA.length==0&&mensajeB.length==0&&mensajeP.length==0)
	{	
		if(!parseInt(valorK)&&valorK!=0 || numeroLetras.length==0||numeroLetras.includes("."))	
		{
			mensaje = mensaje_137+"("+ordenCurva+")";
		}
		else if (valorK<1 || valorK>ordenCurva)
		{
			mensaje = mensaje_137+"("+ordenCurva+")";
		}
	}
	else
	{
		mensaje= mensaje_133;
	}

	return mensaje;
}

function obtenerPuntosODPC(bandera)
{
	var valorA= Number($('#aODPC').val());
	var valorB= Number($('#bODPC').val());
	var valorP= Number($('#pODPC').val());
	var puntos= [];
	var zonaDisplayPuntos= document.getElementById("fileDisplayPuntosODPC");
	var i;
	ordenCurva= 0;

	if(bandera==0)
	{
		zonaDisplayPuntos.innerHTML= "";
	}
	else
	{
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

			ordenCurva++;
		}

		ordenCurva++;
	}

	return puntos;
}

function sleepDobladoPuntos(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}