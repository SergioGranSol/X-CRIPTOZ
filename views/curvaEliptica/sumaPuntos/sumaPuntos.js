var velocidadAnimacionSumaPuntosCE= 1;
var seguirCalculandoSumaPuntosCE= true;

var puntosOSPC= [];

function mostrarSumaPuntosEC()
{	
	$("#panelInteractivo-operacionSumaPuntosCE").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOperacionSumaPuntosCE()
{
	$("#panelInteractivo-operacionSumaPuntosCE").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOperacionSumaPuntosCE();
}

function limpiaPanelOperacionSumaPuntosCE()
{	
	$("#seccionOperacionSumaPuntosCE").show();
		if($('#informacionOperacionSumaPuntosCE').is(':visible'))
		{
			$("#informacionOperacionSumaPuntosCE").slideToggle(500);
		}
		
		$("#informacionOperacionSumaPuntosCE").empty();
		$("#informacionCE").empty();
		$("#informacionPuntosCE").empty();
		$("#campoX3OperacionSumaPuntosCE").empty();
		$("#campoY3OperacionSumaPuntosCE").empty();
		
		$("#seccionOperacionSumaPuntosCE").hide();

	$("#resultadoSumaPuntosCE").val("");
}

function obtenerVelocidadAnimacionSumaPuntosCE()
{
	if($('#btnCalcularOSPCE').val() == 1)
	{
		velocidadAnimacionSumaPuntosCE = 0.25;
	}
	else
	{
		velocidadAnimacionSumaPuntosCE = 1;
	}

	$("#btn-velocidadOSPCE").hide();
	$("#btnCalcularOSPCE").hide();
	$("#btnCancelarOSPCE").show();
	seguirCalculandoSumaPuntosCE= true;
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

//OJO WEY LOS VALORES DE LOS PUNTOS DEBEN SER MENOR QUE EL ORDEN DE LA CURVA
async function realizarSumaPuntosCE()
{
	var inputP1= document.getElementById("P1OperacionSumaPuntosCE");
	var P1= inputP1.value;
	var inputP2= document.getElementById("P2OperacionSumaPuntosCE");
	var P2= inputP2.value;

	var tempP1= P1.split(",");
	var x1= parseInt(tempP1[0]);
	var y1= parseInt(tempP1[1]);

	var tempP2= P2.split(",");
	var x2= parseInt(tempP2[0]);
	var y2= parseInt(tempP2[1]);

	var x3, y3;

	var zonaCurva= document.getElementById("informacionCE");
	var zonaPuntos= document.getElementById("informacionPuntosCE");
	var zonaX3= document.getElementById("campoX3OperacionSumaPuntosCE");
	var zonaY3= document.getElementById("campoY3OperacionSumaPuntosCE");
	var i;
	var suma;
	var contadorModulo= 1;

	var elementoX1= document.createElement("label");
	var elementoY1= document.createElement("label");
	var elementoX2= document.createElement("label");
	var elementoY2= document.createElement("label");
	var elementoA= document.createElement("label");
	var elementoP= document.createElement("label");
	var curva= document.createElement("label");

	var a= 1, b= 4, p= 23;

	limpiaPanelOperacionSumaPuntosCE();
	obtenerVelocidadAnimacionSumaPuntosCE();

	$("#seccionOperacionSumaPuntosCE").show();

	$("#informacionOperacionSumaPuntosCE").append("La curva elíptica con la que estamos trabajando es:");
	$("#informacionOperacionSumaPuntosCE").slideToggle(500);
	await sleepSumaPuntos(2000);

	curva.innerHTML= "y<sup>2</sup>= x<sup>3</sup> + "+a+"x + "+b+" mod "+p;

	zonaCurva.appendChild(curva);

	if(!seguirCalculandoSumaPuntosCE){ return; }

	await sleepSumaPuntos(2000*velocidadAnimacionSumaPuntosCE);
	$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
	await sleepSumaPuntos(250);
	$("#informacionOperacionSumaPuntosCE").empty();

	elementoX1.innerHTML= "X<sub>1</sub>= "+x1;
	elementoY1.innerHTML= "Y<sub>1</sub>= "+y1;
	elementoX2.innerHTML= "X<sub>2</sub>= "+x2;
	elementoY2.innerHTML= "Y<sub>2</sub>= "+y2;
	elementoA.innerHTML= "a= "+a;
	elementoP.innerHTML= "p= "+p;

	$("#informacionOperacionSumaPuntosCE").append("Ahora identificamos los términos que usaremos en las fórmulas para calcular x<sub>3</sub> y x<sub>3</sub>:");
	$("#informacionOperacionSumaPuntosCE").slideToggle(500);
	await sleepSumaPuntos(4500);

	if(!seguirCalculandoSumaPuntosCE){ return; }

	zonaPuntos.appendChild(elementoX1);
	zonaPuntos.appendChild(document.createTextNode ("; "));
	zonaPuntos.appendChild(elementoY1);
	zonaPuntos.appendChild(document.createTextNode ("; "));
	zonaPuntos.appendChild(elementoX2);
	zonaPuntos.appendChild(document.createTextNode ("; "));
	zonaPuntos.appendChild(elementoY2);
	zonaPuntos.appendChild(document.createTextNode ("; "));
	zonaPuntos.appendChild(elementoA);
	zonaPuntos.appendChild(document.createTextNode ("; "));
	zonaPuntos.appendChild(elementoP);

	await sleepSumaPuntos(3000*velocidadAnimacionSumaPuntosCE);
	$("#informacionOperacionSumaPuntosCE").slideToggle(250);
	await sleepSumaPuntos(250);
	$("#informacionOperacionSumaPuntosCE").empty();

	if(!seguirCalculandoSumaPuntosCE){ return; }

	$("#informacionOperacionSumaPuntosCE").append("Se utilizan fórmulas distintas cuando se quieren sumar puntos iguales y puntos diferentes.");
	$("#informacionOperacionSumaPuntosCE").slideToggle(500);
	await sleepSumaPuntos(2200);
	$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
	await sleepSumaPuntos(250);
	$("#informacionOperacionSumaPuntosCE").empty();

	if(!seguirCalculandoSumaPuntosCE){ return; }

	if(P1==P2)
	{
		$("#informacionOperacionSumaPuntosCE").append("Se realizará la suma de puntos iguales.");
		$("#informacionOperacionSumaPuntosCE").slideToggle(500);
		await sleepSumaPuntos(1400);

		if(!seguirCalculandoSumaPuntosCE){ return; }

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

		$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
		await sleepSumaPuntos(250);
		$("#informacionOperacionSumaPuntosCE").empty();

		$("#informacionOperacionSumaPuntosCE").append("Vamos a calcular x<sub>3</sub>:");
		$("#informacionOperacionSumaPuntosCE").slideToggle(500);
		await sleepSumaPuntos(1200);

		if(!seguirCalculandoSumaPuntosCE){ return; }

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
		await sleepSumaPuntos(2000*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		primerMultiplicacion.style.backgroundColor = "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
		primerMultiplicacion.innerHTML= "3("+ x1 +")<sup>2</sup>";
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		primerMultiplicacion.innerHTML= "3("+ Math.pow(x1, 2) +")";
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		resPrimerMultiplicacion= 3*Math.pow(x1, 2);
		primerMultiplicacion.innerHTML= ""+resPrimerMultiplicacion;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		primerMultiplicacion.style.backgroundColor = "transparent";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		primerMultiplicacion.innerHTML= "";
		primerSuma.innerHTML= ""+resPrimerMultiplicacion+" + a";
		primerSuma.style.backgroundColor= "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
		primerSuma.innerHTML= ""+resPrimerMultiplicacion+" + "+a;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		resPrimerSuma= parseInt(resPrimerMultiplicacion)+parseInt(a);
		primerSuma.innerHTML= ""+resPrimerSuma;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		primerSuma.style.backgroundColor= "transparent";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		segundaMultiplicacion.style.backgroundColor= "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
		segundaMultiplicacion.innerHTML= "2("+y1+")";
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		resSegundaMultiplicacion= 2*parseInt(y1);
		segundaMultiplicacion.innerHTML= ""+resSegundaMultiplicacion;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		segundaMultiplicacion.style.backgroundColor= "transparent";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		auxTexto.innerHTML= "x<sub>3</sub>= ";
		auxTexto2.innerHTML= "";
		primerSuma.innerHTML= "";
		segundaMultiplicacion.innerHTML= "";
		primerDivision.innerHTML= "("+resPrimerSuma+" / "+resSegundaMultiplicacion+")<sup>2</sup>";
		primerDivision.style.backgroundColor= "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		if(resSegundaMultiplicacion!=0)
		{
			if(resPrimerSuma%resSegundaMultiplicacion==0)//Se hace la division
			{
				resPrimerDivision= parseInt(resPrimerSuma)/parseInt(resSegundaMultiplicacion);
			}
			else//Se sube y encontramos el inverso
			{
				$("#informacionOperacionSumaPuntosCE").slideToggle(250);
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("En criptografía sólo nos interesan los números enteros positivos, por lo que en el caso de la división que no sea exacta, subimos el denominador y obtenemos su inverso multiplicativo:");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(6000);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				primerDivision.innerHTML= "(("+resSegundaMultiplicacion+")<sup>-1</sup>"+resPrimerSuma+")<sup>2</sup>";
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				resInverso= inversoMultiplicativoNumero(resSegundaMultiplicacion, p);

				//verificar si el inverso no es -1 osea no existe cuando el orden de la curva no es primo
				if(!seguirCalculandoSumaPuntosCE){ return; }

				primerDivision.innerHTML= "(("+resInverso+")"+resPrimerSuma+")<sup>2</sup>";
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				resPrimerDivision= parseInt(resInverso)*parseInt(resPrimerSuma);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("Continuamos calculando x<sub>3</sub>:");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(1000);
			}

			if(!seguirCalculandoSumaPuntosCE){ return; }

			primerDivision.innerHTML= "("+resPrimerDivision+")<sup>2</sup>";
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resPrimerDivision= Math.pow(resPrimerDivision, 2);
			primerDivision.innerHTML= ""+resPrimerDivision;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			primerDivision.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			tercerMultiplicacion.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			tercerMultiplicacion.innerHTML= "2("+x1+")";
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resTercerMultiplicacion= 2*parseInt(x1);
			tercerMultiplicacion.innerHTML= ""+resTercerMultiplicacion;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			tercerMultiplicacion.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			primerDivision.innerHTML= "";
			tercerMultiplicacion.innerHTML= "";
			primerResta.innerHTML= ""+resPrimerDivision+" - "+resTercerMultiplicacion;
			primerResta.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			resPrimerResta= parseInt(resPrimerDivision)-parseInt(resTercerMultiplicacion);
			primerResta.innerHTML= ""+resPrimerResta;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			primerResta.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			x3= parseInt(Modulo(parseInt(resPrimerResta), parseInt(p)));
			primerResta.innerHTML= "";
			auxTexto3.innerHTML= "";
			auxTexto.innerHTML= "x<sub>3</sub>= "+resPrimerResta+" mod p";
			auxTexto.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			auxTexto.innerHTML= "x<sub>3</sub>= "+resPrimerResta+" mod "+p;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			auxTexto.innerHTML= "x<sub>3</sub>= "+x3;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			auxTexto.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/***********************************************************************************Y3***************************************************************************************/
			$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
			await sleepSumaPuntos(250);
			$("#informacionOperacionSumaPuntosCE").empty();

			$("#informacionOperacionSumaPuntosCE").append("Vamos a calcular y<sub>3</sub>:");
			$("#informacionOperacionSumaPuntosCE").slideToggle(500);
			await sleepSumaPuntos(1200);

			if(!seguirCalculandoSumaPuntosCE){ return; }

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
			await sleepSumaPuntos(2000*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/*3x1^2*/
			operacionY.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionY.innerHTML= "3("+ x1 +")<sup>2</sup>";
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionY.innerHTML= "3("+ Math.pow(x1, 2) +")";
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resPrimerMultiplicacionY= 3*Math.pow(x1, 2);
			operacionY.innerHTML= ""+resPrimerMultiplicacionY;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionY.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA */
			auxTextoY.innerHTML= "y<sub>3</sub>= (";
			operacionY.innerHTML= ""+resPrimerMultiplicacionY+" + a";
			auxTexto2Y.innerHTML= "/2(y<sub>1</sub>))(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

			/*3x1^2 + a*/
			operacionY.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionY.innerHTML= ""+resPrimerMultiplicacionY+" + "+a;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resPrimerSumaY= parseInt(resPrimerMultiplicacionY)+parseInt(a);
			operacionY.innerHTML= ""+resPrimerSumaY;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionY.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA */
			auxTextoY.innerHTML= "y<sub>3</sub>= ("+resPrimerSumaY+"/";
			operacionY.innerHTML= "2(y<sub>1</sub>)";
			auxTexto2Y.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

			/*2y1*/
			operacionY.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionY.innerHTML= "2("+y1+")";
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resSegundaMultiplicacionY= 2*parseInt(y1);
			operacionY.innerHTML= ""+resSegundaMultiplicacionY;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionY.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA */
			auxTextoY.innerHTML= "y<sub>3</sub>= (";
			operacionY.innerHTML= ""+resPrimerSumaY+"/"+resSegundaMultiplicacionY;
			auxTexto2Y.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

			/*3x1^2+a/2y1*/

			operacionY.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(resSegundaMultiplicacionY!=0)
			{
				if(resPrimerSumaY%resSegundaMultiplicacionY==0) //Divison exacta
				{
					resPrimerDivision= parseInt(resPrimerSumaY)/parseInt(resSegundaMultiplicacionY);
				}
				else //Subir denominador y encontrar el inverso
				{
					if(!seguirCalculandoSumaPuntosCE){ return; }

					operacionY.innerHTML= "("+resSegundaMultiplicacionY+")<sup>-1</sup>("+resPrimerSumaY+")";
					await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
					resInversoY= inversoMultiplicativoNumero(resSegundaMultiplicacionY, p);
					operacionY.innerHTML= "("+resInversoY+")("+resPrimerSumaY+")";
					await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
					resPrimerDivisionY= parseInt(resInversoY)*parseInt(resPrimerSumaY);

					if(!seguirCalculandoSumaPuntosCE){ return; }
				}

				if(!seguirCalculandoSumaPuntosCE){ return; }

				operacionY.innerHTML= ""+resPrimerDivisionY;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionY.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA */
				auxTextoY.innerHTML= "y<sub>3</sub>= ("+resPrimerDivisionY+")";
				operacionY.innerHTML= "(x<sub>1</sub> - x<sub>3</sub>)";
				auxTexto2Y.innerHTML= " - y<sub>1</sub> mod p";

				/*x1-x3*/
				operacionY.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				operacionY.innerHTML= "("+ x1 +" - "+ x3 +")";
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				resPrimerRestaY= parseInt(x1)-parseInt(x3);
				operacionY.innerHTML= "("+ resPrimerRestaY +")";
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionY.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA */
				auxTextoY.innerHTML= "y<sub>3</sub>= ";
				operacionY.innerHTML= "("+resPrimerDivisionY+")("+resPrimerRestaY+")";
				auxTexto2Y.innerHTML= " - y<sub>1</sub> mod p";

				/*3x1^2+a/2y1 * x1-x3 */
				operacionY.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				resTercerMultiplicacionY= parseInt(resPrimerDivisionY)*parseInt(resPrimerRestaY);
				operacionY.innerHTML= ""+resTercerMultiplicacionY;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionY.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA */
				auxTextoY.innerHTML= "y<sub>3</sub>= ";
				operacionY.innerHTML= ""+resTercerMultiplicacionY+" - y<sub>1</sub>";
				auxTexto2Y.innerHTML= " mod p";

				/*3x1^2+a/2y1 * x1-x3 - y1*/
				operacionY.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				operacionY.innerHTML= ""+resTercerMultiplicacionY+" - "+y1;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				resSegundaRestaY= parseInt(resTercerMultiplicacionY)-parseInt(y1);
				operacionY.innerHTML= ""+resSegundaRestaY;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionY.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA */
				auxTextoY.innerHTML= "";
				operacionY.innerHTML= "y<sub>3</sub>= "+resSegundaRestaY+" mod p";
				auxTexto2Y.innerHTML= "";

				/*3x1^2+a/2y1 * x1-x3 - y1 mod n*/
				operacionY.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				operacionY.innerHTML= "y<sub>3</sub>= "+resSegundaRestaY+" mod "+p;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				y3= Modulo(resSegundaRestaY, p);
				operacionY.innerHTML= "y<sub>3</sub>= "+y3;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionY.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("El resultado es:");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(500);

				auxTexto.style.backgroundColor= "#77DD77";
				operacionY.style.backgroundColor= "#77DD77";

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#btn-velocidadOSPCE").show();
				$("#btnCalcularOSPCE").show();
				$("#btnCancelarOSPCE").hide();
				
				toastr.options.timeOut = "1000";
				toastr['success'](mensaje_72);
				$("#resultadoSumaPuntosCE").val(""+x3+","+y3);
			}
			else //EN TEORIA NO DEBE ENTRAR AQUI-----------------------------------------
			{
				//Punto al infinito
				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("El resultado de la suma de estos puntos, es el punto al infinito.");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(2250);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				operacionYPD.innerHTML= "(x<sub>3</sub>,y<sub>3</sub>)= O";
				operacionYPD.style.backgroundColor= "#77DD77";

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#btn-velocidadOSPCE").show();
				$("#btnCalcularOSPCE").show();
				$("#btnCancelarOSPCE").hide();
				
				toastr.options.timeOut = "1000";
				toastr['success'](mensaje_72);
				$("#resultadoSumaPuntosCE").val("O");
			}
		}
		else
		{
			//Punto al infinito
			$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
			await sleepSumaPuntos(250);
			$("#informacionOperacionSumaPuntosCE").empty();

			$("#informacionOperacionSumaPuntosCE").append("El resultado de la suma de estos puntos, es el punto al infinito.");
			$("#informacionOperacionSumaPuntosCE").slideToggle(500);
			await sleepSumaPuntos(2250);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			zonaX3.innerHTML="";
			zonaX3.appendChild(auxTexto);
			auxTexto.innerHTML= "(x<sub>3</sub>,y<sub>3</sub>)= O";
			auxTexto.style.backgroundColor= "#77DD77";

			if(!seguirCalculandoSumaPuntosCE){ return; }

			$("#btn-velocidadOSPCE").show();
			$("#btnCalcularOSPCE").show();
			$("#btnCancelarOSPCE").hide();
			
			toastr.options.timeOut = "1000";
			toastr['success'](mensaje_72);
			$("#resultadoSumaPuntosCE").val("O");
		}
		
	}	
	else
	{
		$("#informacionOperacionSumaPuntosCE").append("Se realizará la suma de puntos diferentes.");
		$("#informacionOperacionSumaPuntosCE").slideToggle(500);
		await sleepSumaPuntos(1400);

		if(!seguirCalculandoSumaPuntosCE){ return; }

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

		$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
		await sleepSumaPuntos(250);
		$("#informacionOperacionSumaPuntosCE").empty();

		$("#informacionOperacionSumaPuntosCE").append("Vamos a calcular x<sub>3</sub>:");
		$("#informacionOperacionSumaPuntosCE").slideToggle(500);
		await sleepSumaPuntos(1200);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		/* ESCRIBIENDO FORMULA*/
		auxTextoXPD.innerHTML= "x<sub>3</sub>= (";
		zonaX3.appendChild(auxTextoXPD);
		operacionXPD.innerHTML= "y<sub>2</sub> - y<sub>1</sub>";
		zonaX3.appendChild(operacionXPD);
		auxTexto2XPD.innerHTML= "/ x<sub>2</sub> - x<sub>1</sub>)<sup>2</sup> - x<sub>1</sub> - x<sub>2</sub> mod p";
		zonaX3.appendChild(auxTexto2XPD);
		await sleepSumaPuntos(2000*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		/*y2 - y1*/
		operacionXPD.style.backgroundColor= "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
		operacionXPD.innerHTML= ""+y2+" - "+y1;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		resPrimerRestaXPD= parseInt(y2)-parseInt(y1);
		operacionXPD.innerHTML= ""+resPrimerRestaXPD;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		operacionXPD.style.backgroundColor= "transparent";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		/* REESCRIBIENDO FORMULA*/
		auxTextoXPD.innerHTML= "x<sub>3</sub>= ("+resPrimerRestaXPD+"/";
		operacionXPD.innerHTML= "x<sub>2</sub> - x<sub>1</sub>";
		auxTexto2XPD.innerHTML= ")<sup>2</sup> - x<sub>1</sub> - x<sub>2</sub> mod p";

		/*x2 - x1*/
		operacionXPD.style.backgroundColor= "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
		operacionXPD.innerHTML= ""+x2+" - "+x1;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		resSegundaRestaXPD= parseInt(x2)-parseInt(x1);
		operacionXPD.innerHTML= ""+resSegundaRestaXPD;
		await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
		operacionXPD.style.backgroundColor= "transparent";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(!seguirCalculandoSumaPuntosCE){ return; }

		/* REESCRIBIENDO FORMULA*/
		auxTextoXPD.innerHTML= "x<sub>3</sub>= ";
		operacionXPD.innerHTML= "("+ resPrimerRestaXPD+"/"+resSegundaRestaXPD+")<sup>2</sup>";
		auxTexto2XPD.innerHTML= " - x<sub>1</sub> - x<sub>2</sub> mod p";

		/* (y2-y1/x2-x1)^2 */
		operacionXPD.style.backgroundColor= "yellow";
		await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

		if(resSegundaRestaXPD!=0)
		{
			if(resPrimerRestaXPD%resSegundaRestaXPD==0)//Division exacta
			{
				resPrimerDivisionXPD= parseInt(resPrimerRestaXPD)/parseInt(resSegundaRestaXPD);
			}
			else //Encontrar inverso
			{
				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("En criptografía sólo nos interesan los números enteros positivos, por lo que en el caso de la división que no sea exacta, subimos el denominador y obtenemos su inverso multiplicativo:");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(6000);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				if(resPrimerRestaXPD<0&&resSegundaRestaXPD<0)
				{
					resPrimerRestaXPD= resPrimerRestaXPD*-1;
					resSegundaRestaXPD= resSegundaRestaXPD*-1;
				}

				if(resSegundaRestaXPD>0)
				{
					operacionXPD.innerHTML= "(("+resSegundaRestaXPD+")<sup>-1</sup>("+resPrimerRestaXPD+"))<sup>2</sup>";
					await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
					resInversoXPD= inversoMultiplicativoNumero(resSegundaRestaXPD, p);
					operacionXPD.innerHTML= "(("+resInversoXPD+")("+resPrimerRestaXPD+"))<sup>2</sup>";
					await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
					resPrimerDivisionXPD= parseInt(resInversoXPD)*parseInt(resPrimerRestaXPD);

					if(!seguirCalculandoSumaPuntosCE){ return; }
				}
				else
				{
					resSegundaRestaXPD= resSegundaRestaXPD*-1;
					operacionXPD.innerHTML= "((-"+resSegundaRestaXPD+")<sup>-1</sup>("+resPrimerRestaXPD+"))<sup>2</sup>";
					await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
					resInversoXPD= inversoMultiplicativoNumero(resSegundaRestaXPD, p);
					resInversoXPD= resInversoXPD*-1;
					operacionXPD.innerHTML= "(("+resInversoXPD+")("+resPrimerRestaXPD+"))<sup>2</sup>";
					await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
					resPrimerDivisionXPD= parseInt(resInversoXPD)*parseInt(resPrimerRestaXPD);

					if(!seguirCalculandoSumaPuntosCE){ return; }
				}

				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("Continuamos calculando x<sub>3</sub>:");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(1000);
			}

			if(!seguirCalculandoSumaPuntosCE){ return; }

			operacionXPD.innerHTML= "("+resPrimerDivisionXPD+")<sup>2</sup>";
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resPrimerDivisionXPD= Math.pow(resPrimerDivisionXPD, 2);
			operacionXPD.innerHTML= ""+resPrimerDivisionXPD;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionXPD.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA*/
			auxTextoXPD.innerHTML= "x<sub>3</sub>= ";
			operacionXPD.innerHTML= ""+resPrimerDivisionXPD+" - x<sub>1</sub>";
			auxTexto2XPD.innerHTML= " - x<sub>2</sub> mod p";

			/* ((y2-y1)/(x2-x1))^2 - x1*/
			operacionXPD.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionXPD.innerHTML= ""+resPrimerDivisionXPD+" - "+x1;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resTercerRestaXPD= parseInt(resPrimerDivisionXPD)-parseInt(x1);
			operacionXPD.innerHTML= ""+resTercerRestaXPD;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionXPD.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA*/
			auxTextoXPD.innerHTML= "x<sub>3</sub>= ";
			operacionXPD.innerHTML= ""+resTercerRestaXPD+" - x<sub>2</sub>";
			auxTexto2XPD.innerHTML= "  mod p";

			/* ((y2-y1)/(x2-x1))^2 - x1 -x2*/
			operacionXPD.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionXPD.innerHTML= ""+resTercerRestaXPD+" - "+x2;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resCuartaRestaXPD= parseInt(resTercerRestaXPD)-parseInt(x2);
			operacionXPD.innerHTML= ""+resCuartaRestaXPD;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionXPD.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA */
			auxTextoXPD.innerHTML= "";
			operacionXPD.innerHTML= "x<sub>3</sub>= "+resCuartaRestaXPD+" mod p";
			auxTexto2XPD.innerHTML= "";

			/* ((y2-y1)/(x2-x1))^2 - x1 -x2 mod n*/
			operacionXPD.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionXPD.innerHTML= "x<sub>3</sub>= "+resCuartaRestaXPD+" mod "+p;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			x3= Modulo(resCuartaRestaXPD, p);
			operacionXPD.innerHTML= "x<sub>3</sub>= "+x3;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionXPD.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			//cambiar modulos
			//55 8423 3594
			//validar y1 diferente de cero para el doblado
			//11,9 + 1,12 = 15,6

			/******************************************************************************************Y3*******************************************************************************/
			$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
			await sleepSumaPuntos(250);
			$("#informacionOperacionSumaPuntosCE").empty();

			$("#informacionOperacionSumaPuntosCE").append("Vamos a calcular y<sub>3</sub>:");
			$("#informacionOperacionSumaPuntosCE").slideToggle(500);
			await sleepSumaPuntos(1000);

			if(!seguirCalculandoSumaPuntosCE){ return; }

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
			await sleepSumaPuntos(2000*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/*y2 - y1*/
			operacionYPD.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionYPD.innerHTML= ""+y2+" - "+y1;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resPrimerRestaYPD= parseInt(y2)-parseInt(y1);
			operacionYPD.innerHTML= ""+resPrimerRestaYPD;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionYPD.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA*/
			auxTextoYPD.innerHTML= "y<sub>3</sub>= ("+resPrimerRestaYPD+"/";
			operacionYPD.innerHTML= "x<sub>2</sub> - x<sub>1</sub>";
			auxTexto2YPD.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

			/*x2 - x1*/
			operacionYPD.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
			operacionYPD.innerHTML= ""+x2+" - "+x1;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			resSegundaRestaYPD= parseInt(x2)-parseInt(x1);
			operacionYPD.innerHTML= ""+resSegundaRestaYPD;
			await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
			operacionYPD.style.backgroundColor= "transparent";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			/* REESCRIBIENDO FORMULA*/
			auxTextoYPD.innerHTML= "y<sub>3</sub>= (";
			operacionYPD.innerHTML= ""+ resPrimerRestaYPD+"/"+resSegundaRestaYPD;
			auxTexto2YPD.innerHTML= ")(x<sub>1</sub> - x<sub>3</sub>) - y<sub>1</sub> mod p";

			/* (y2-y1/x2-x1) */
			operacionYPD.style.backgroundColor= "yellow";
			await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

			if(resSegundaRestaYPD!=0)
			{
				if(resPrimerRestaYPD%resSegundaRestaYPD==0)//Division exacta
				{
					resPrimerDivisionYPD= parseInt(resPrimerRestaYPD)/parseInt(resSegundaRestaYPD);
				}
				else //Encontrar inverso
				{
					if(!seguirCalculandoSumaPuntosCE){ return; }

					if(resPrimerRestaYPD<0&&resSegundaRestaYPD<0)
					{
						resPrimerRestaYPD= resPrimerRestaYPD*-1;
						resSegundaRestaYPD= resSegundaRestaYPD*-1;
					}

					if(resSegundaRestaYPD>0)
					{
						operacionYPD.innerHTML= "("+resSegundaRestaYPD+")<sup>-1</sup>("+resPrimerRestaYPD+")";
						await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
						resInversoYPD= inversoMultiplicativoNumero(resSegundaRestaYPD, p);
						operacionYPD.innerHTML= "("+resInversoYPD+")("+resPrimerRestaYPD+")";
						await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
						resPrimerDivisionYPD= parseInt(resInversoYPD)*parseInt(resPrimerRestaYPD);

						if(!seguirCalculandoSumaPuntosCE){ return; }
					}
					else
					{
						resSegundaRestaYPD= resSegundaRestaYPD*-1;
						operacionYPD.innerHTML= "(-"+resSegundaRestaYPD+")<sup>-1</sup>("+resPrimerRestaYPD+")";
						await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
						resInversoYPD= inversoMultiplicativoNumero(resSegundaRestaYPD, p);
						resInversoYPD= resInversoYPD*-1;
						operacionYPD.innerHTML= "("+resInversoYPD+")("+resPrimerRestaYPD+")";
						await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
						resPrimerDivisionYPD= parseInt(resInversoYPD)*parseInt(resPrimerRestaYPD);

						if(!seguirCalculandoSumaPuntosCE){ return; }
					}
				}

				if(!seguirCalculandoSumaPuntosCE){ return; }

				operacionYPD.innerHTML= ""+resPrimerDivisionYPD;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionYPD.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA*/
				auxTextoYPD.innerHTML= "y<sub>3</sub>= ("+ resPrimerDivisionYPD+ ")(";
				operacionYPD.innerHTML= "x<sub>1</sub> - x<sub>3</sub>";
				auxTexto2YPD.innerHTML= ") - y<sub>1</sub> mod p";

				/* x1-x3 */
				operacionYPD.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				operacionYPD.innerHTML= ""+x1+" - "+x3;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				resTercerRestaYPD= parseInt(x1)-parseInt(x3);
				operacionYPD.innerHTML= ""+resTercerRestaYPD;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionYPD.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA*/
				auxTextoYPD.innerHTML= "y<sub>3</sub>= ";
				operacionYPD.innerHTML= "("+resPrimerDivisionYPD+")("+resTercerRestaYPD+")";
				auxTexto2YPD.innerHTML= " - y<sub>1</sub> mod p";

				/* (y2-y1/x2-x1)(x1-x3) */
				operacionYPD.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				resPrimerMultiplicacionYPD= parseInt(resPrimerDivisionYPD)*parseInt(resTercerRestaYPD);
				operacionYPD.innerHTML= ""+resPrimerMultiplicacionYPD;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionYPD.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA*/
				auxTextoYPD.innerHTML= "y<sub>3</sub>= ";
				operacionYPD.innerHTML= ""+resPrimerMultiplicacionYPD+" - y<sub>1</sub>";
				auxTexto2YPD.innerHTML= " mod p";

				/* (y2-y1/x2-x1)(x1-x3)-y1 */
				operacionYPD.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				operacionYPD.innerHTML= ""+resPrimerMultiplicacionYPD+" - "+y1;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				resCuartaRestaYPD= parseInt(resPrimerMultiplicacionYPD)-parseInt(y1);
				operacionYPD.innerHTML= ""+resCuartaRestaYPD;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionYPD.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				/* REESCRIBIENDO FORMULA */
				auxTextoYPD.innerHTML= "";
				operacionYPD.innerHTML= "y<sub>3</sub>= "+resCuartaRestaYPD+" mod p";
				auxTexto2YPD.innerHTML= "";

				/* (y2-y1/x2-x1)(x1-x3)-y1 mod n*/
				operacionYPD.style.backgroundColor= "yellow";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);
				operacionYPD.innerHTML= "y<sub>3</sub>= "+resCuartaRestaYPD+" mod "+p;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				y3= Modulo(resCuartaRestaYPD, p);
				operacionYPD.innerHTML= "y<sub>3</sub>= "+y3;
				await sleepSumaPuntos(1000*velocidadAnimacionSumaPuntosCE);
				operacionYPD.style.backgroundColor= "transparent";
				await sleepSumaPuntos(250*velocidadAnimacionSumaPuntosCE);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("El resultado es:");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(500);

				operacionXPD.style.backgroundColor= "#77DD77";
				operacionYPD.style.backgroundColor= "#77DD77";

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#btn-velocidadOSPCE").show();
				$("#btnCalcularOSPCE").show();
				$("#btnCancelarOSPCE").hide();
				
				toastr.options.timeOut = "1000";
				toastr['success'](mensaje_72);
				$("#resultadoSumaPuntosCE").val(""+x3+","+y3);
			}
			else
			{
				//Punto al infinito
				$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
				await sleepSumaPuntos(250);
				$("#informacionOperacionSumaPuntosCE").empty();

				$("#informacionOperacionSumaPuntosCE").append("El resultado de la suma de estos puntos, es el punto al infinito.");
				$("#informacionOperacionSumaPuntosCE").slideToggle(500);
				await sleepSumaPuntos(2250);

				if(!seguirCalculandoSumaPuntosCE){ return; }

				operacionYPD.innerHTML= "(x<sub>3</sub>,y<sub>3</sub>)= O";
				operacionYPD.style.backgroundColor= "#77DD77";

				if(!seguirCalculandoSumaPuntosCE){ return; }

				$("#btn-velocidadOSPCE").show();
				$("#btnCalcularOSPCE").show();
				$("#btnCancelarOSPCE").hide();
				
				toastr.options.timeOut = "1000";
				toastr['success'](mensaje_72);
				$("#resultadoSumaPuntosCE").val("O");
			}
		}
		else
		{
			//Punto al infinito
			$("#informacionOperacionSumaPuntosCE").slideToggle(250);	
			await sleepSumaPuntos(250);
			$("#informacionOperacionSumaPuntosCE").empty();

			$("#informacionOperacionSumaPuntosCE").append("El resultado de la suma de estos puntos, es el punto al infinito.");
			$("#informacionOperacionSumaPuntosCE").slideToggle(500);
			await sleepSumaPuntos(2250);

			if(!seguirCalculandoSumaPuntosCE){ return; }

			zonaX3.innerHTML= "";
			zonaX3.appendChild(operacionXPD);
			operacionXPD.innerHTML= "(x<sub>3</sub>,y<sub>3</sub>)= O";
			operacionXPD.style.backgroundColor= "#77DD77";

			if(!seguirCalculandoSumaPuntosCE){ return; }

			$("#btn-velocidadOSPCE").show();
			$("#btnCalcularOSPCE").show();
			$("#btnCancelarOSPCE").hide();
			
			toastr.options.timeOut = "1000";
			toastr['success'](mensaje_72);
			$("#resultadoSumaPuntosCE").val("O");
		}
	}
}

$(document).ready(function()
{
	$("#CalcularRapidoOSPCE").click(function(){
		$("#btnCalcularOSPCE").html('Calcular Rápido');
		$("#btnCalcularOSPCE").val(1);
	});
	$("#CalcularNormalOSPCE").click(function(){
		$("#btnCalcularOSPCE").html('Calcular Normal');
		$("#btnCalcularOSPCE").val(2);
	});

	$("#btnCalcularOSPCE").click(function()
	{
		realizarSumaPuntosCE();
	});

	$("#btnCancelarOSPCE").click(function()
	{
		seguirCalculandoSumaPuntosCE= false;
		
		limpiaPanelOperacionSumaPuntosCE();

		$("#btn-velocidadOSPCE").show();
		$("#btnCalcularOSPCE").show();
		$("#btnCancelarOSPCE").hide();
	});

	//FUNCIONES CALCULADORA

	$("#aOSPC").keyup(function()
	{
		puntosOSPC= obtenerPuntosOSPC(0);

		var mensaje = validarNumeroAOSPC();
		var mensajeB = validarNumeroBOSPC();	
		var mensajeP = validarNumeroPOSPC();
		var mensajeP1= validarP1OSPC();
		var mensajeP2= validarP2OSPC();		

		if (mensaje.length != 0) 
		{
			$("#aOSPC-error").remove();
			$("#aOSPC").parent().append('<div id="aOSPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOSPC").addClass('input-error');
			//$("#btnCalcularOSPC").attr("disabled", true);

			if(mensajeP.length!=0)
			{
				$("#pOSPC-error").remove();
				$("#pOSPC").parent().append('<div id="pOSPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pOSPC").addClass('input-error');
			}
			else
			{
				$("#pOSPC-error").remove();
				$("#pOSPC").removeClass('input-error');				
			}

			if(mensajeB.length!=0)
			{
				$("#bOSPC-error").remove();
				$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
				$("#bOSPC").addClass('input-error');
			}
			else
			{
				$("#bOSPC-error").remove();
				$("#bOSPC").removeClass('input-error');
			}

			if(mensajeP1.length!=0)
			{
				$("#P1OSPC-error").remove();
				$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
				$("#P1OSPC").addClass('input-error');
			}
			else
			{
				$("#P1OSPC-error").remove();
				$("#P1OSPC").removeClass('input-error');
			}

			if(mensajeP2.length!=0)
			{
				$("#P2OSPC-error").remove();
				$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
				$("#P2OSPC").addClass('input-error');
			}
			else
			{
				$("#P2OSPC-error").remove();
				$("#P2OSPC").removeClass('input-error');
			}
		}
		else
		{
			$("#aOSPC-error").remove();
			$("#aOSPC").removeClass('input-error');
			
			if(mensajeP.length!=0)
			{
				$("#pOSPC-error").remove();
				$("#pOSPC").parent().append('<div id="pOSPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pOSPC").addClass('input-error');
				//$("#btnCalcularOSPC").attr("disabled", true);

				if(mensajeB.length!=0)
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOSPC").addClass('input-error');
				}
				else
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").removeClass('input-error');
				}

				if(mensajeP1.length!=0)
				{
					$("#P1OSPC-error").remove();
					$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
					$("#P1OSPC").addClass('input-error');
				}
				else
				{
					$("#P1OSPC-error").remove();
					$("#P1OSPC").removeClass('input-error');
				}

				if(mensajeP2.length!=0)
				{
					$("#P2OSPC-error").remove();
					$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
					$("#P2OSPC").addClass('input-error');
				}
				else
				{
					$("#P2OSPC-error").remove();
					$("#P2OSPC").removeClass('input-error');
				}
			}
			else
			{
				$("#pOSPC-error").remove();
				$("#pOSPC").removeClass('input-error');
				
				if(mensajeB.length!=0)
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOSPC").addClass('input-error');
					//$("#btnCalcularOSPC").attr("disabled", true);					

					if(mensajeP1.length!=0)
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1OSPC").addClass('input-error');
					}
					else
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").removeClass('input-error');
					}

					if(mensajeP2.length!=0)
					{
						$("#P2OSPC-error").remove();
						$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
						$("#P2OSPC").addClass('input-error');
					}
					else
					{
						$("#P2OSPC-error").remove();
						$("#P2OSPC").removeClass('input-error');
					}
				}
				else
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").removeClass('input-error');

					if(mensajeP1.length!=0)
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1OSPC").addClass('input-error');

						if(mensajeP2.length!=0)
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
							$("#P2OSPC").addClass('input-error');
						}
						else
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").removeClass('input-error');
						}
					}
					else
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").removeClass('input-error');

						if(mensajeP2.length!=0)
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
							$("#P2OSPC").addClass('input-error');
						}
						else
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").removeClass('input-error');
							$("#btnCalcularOSPC").attr("disabled", false);
						}						
					}
				}
			}
		}
	});

	$("#bOSPC").keyup(function()
	{
		puntosOSPC= obtenerPuntosOSPC(0);

		var mensaje = validarNumeroBOSPC();
		var mensajeA = validarNumeroAOSPC();
		var mensajeP = validarNumeroPOSPC();
		var mensajeP1= validarP1OSPC();
		var mensajeP2= validarP2OSPC();

		if (mensaje.length != 0) 
		{
			$("#bOSPC-error").remove();
			$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOSPC").addClass('input-error');
			//$("#btnCalcularOSPC").attr("disabled", true);

			if(mensajeA.length!=0)
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").parent().append('<div id="aOSPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOSPC").addClass('input-error');
			}
			else
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").removeClass('input-error');				
			}

			if(mensajeP.length!=0)
			{
				$("#pOSPC-error").remove();
				$("#pOSPC").parent().append('<div id="pOSPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
				$("#pOSPC").addClass('input-error');
			}
			else
			{
				$("#pOSPC-error").remove();
				$("#pOSPC").removeClass('input-error');
			}

			if(mensajeP1.length!=0)
			{
				$("#P1OSPC-error").remove();
				$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
				$("#P1OSPC").addClass('input-error');
			}
			else
			{
				$("#P1OSPC-error").remove();
				$("#P1OSPC").removeClass('input-error');
			}

			if(mensajeP2.length!=0)
			{
				$("#P2OSPC-error").remove();
				$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
				$("#P2OSPC").addClass('input-error');
			}
			else
			{
				$("#P2OSPC-error").remove();
				$("#P2OSPC").removeClass('input-error');
			}
		}
		else
		{
			$("#bOSPC-error").remove();
			$("#bOSPC").removeClass('input-error');
			
			if(mensajeA.length!=0)
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").parent().append('<div id="aOSPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOSPC").addClass('input-error');
				//$("#btnCalcularOSPC").attr("disabled", true);

				if(mensajeP.length!=0)
				{
					$("#pOSPC-error").remove();
					$("#pOSPC").parent().append('<div id="POSPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
					$("#pOSPC").addClass('input-error');
				}
				else
				{
					$("#pOSPC-error").remove();
					$("#pOSPC").removeClass('input-error');
				}

				if(mensajeP1.length!=0)
				{
					$("#P1OSPC-error").remove();
					$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
					$("#P1OSPC").addClass('input-error');
				}
				else
				{
					$("#P1OSPC-error").remove();
					$("#P1OSPC").removeClass('input-error');
				}

				if(mensajeP2.length!=0)
				{
					$("#P2OSPC-error").remove();
					$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
					$("#P2OSPC").addClass('input-error');
				}
				else
				{
					$("#P2OSPC-error").remove();
					$("#P2OSPC").removeClass('input-error');
				}
			}
			else
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").removeClass('input-error');
				
				if(mensajeP.length!=0)
				{
					$("#pOSPC-error").remove();
					$("#pOSPC").parent().append('<div id="pOSPC-error" class="text-danger">&nbsp;'+mensajeP+'</div>');
					$("#pOSPC").addClass('input-error');
					//$("#btnCalcularOSPC").attr("disabled", true);					

					if(mensajeP1.length!=0)
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1OSPC").addClass('input-error');
					}
					else
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").removeClass('input-error');
					}

					if(mensajeP2.length!=0)
					{
						$("#P2OSPC-error").remove();
						$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
						$("#P2OSPC").addClass('input-error');
					}
					else
					{
						$("#P2OSPC-error").remove();
						$("#P2OSPC").removeClass('input-error');
					}
				}
				else
				{
					$("#pOSPC-error").remove();
					$("#pOSPC").removeClass('input-error');			

					if(mensajeP1.length!=0)
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1OSPC").addClass('input-error');

						if(mensajeP2.length!=0)
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
							$("#P2OSPC").addClass('input-error');
						}
						else
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").removeClass('input-error');
						}
					}
					else
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").removeClass('input-error');

						if(mensajeP2.length!=0)
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
							$("#P2OSPC").addClass('input-error');
						}
						else
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").removeClass('input-error');
							$("#btnCalcularOSPC").attr("disabled", false);
						}						
					}
				}
			}
		}
	});

	$("#pOSPC").keyup(function()
	{	
		puntosOSPC= obtenerPuntosOSPC(0);	

		var mensaje = validarNumeroPOSPC();	
		var mensajeA= validarNumeroAOSPC();
		var mensajeB= validarNumeroBOSPC();
		var mensajeP1= validarP1OSPC();
		var mensajeP2= validarP2OSPC();

		if (mensaje.length != 0) 
		{
			$("#pOSPC-error").remove();
			$("#pOSPC").parent().append('<div id="pOSPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#pOSPC").addClass('input-error');
			//$("#btnCalcularOSPC").attr("disabled", true);

			if(mensajeA.length!=0)
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").parent().append('<div id="aOSPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOSPC").addClass('input-error');
			}
			else
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").removeClass('input-error');				
			}

			if(mensajeB.length!=0)
			{
				$("#bOSPC-error").remove();
				$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
				$("#bOSPC").addClass('input-error');
			}
			else
			{
				$("#bOSPC-error").remove();
				$("#bOSPC").removeClass('input-error');
			}

			if(mensajeP1.length!=0)
			{
				$("#P1OSPC-error").remove();
				$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
				$("#P1OSPC").addClass('input-error');
			}
			else
			{
				$("#P1OSPC-error").remove();
				$("#P1OSPC").removeClass('input-error');
			}

			if(mensajeP2.length!=0)
			{
				$("#P2OSPC-error").remove();
				$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
				$("#P2OSPC").addClass('input-error');
			}
			else
			{
				$("#P2OSPC-error").remove();
				$("#P2OSPC").removeClass('input-error');
			}
		}
		else
		{
			$("#pOSPC-error").remove();
			$("#pOSPC").removeClass('input-error');

			if(mensajeA.length!=0)
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").parent().append('<div id="aOSPC-error" class="text-danger">&nbsp;'+mensajeA+'</div>');
				$("#aOSPC").addClass('input-error');
				//$("#btnCalcularOSPC").attr("disabled", true);

				if(mensajeB.length!=0)
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOSPC").addClass('input-error');
				}
				else
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").removeClass('input-error');
				}

				if(mensajeP1.length!=0)
				{
					$("#P1OSPC-error").remove();
					$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
					$("#P1OSPC").addClass('input-error');
				}
				else
				{
					$("#P1OSPC-error").remove();
					$("#P1OSPC").removeClass('input-error');
				}

				if(mensajeP2.length!=0)
				{
					$("#P2OSPC-error").remove();
					$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
					$("#P2OSPC").addClass('input-error');
				}
				else
				{
					$("#P2OSPC-error").remove();
					$("#P2OSPC").removeClass('input-error');
				}
			}
			else
			{
				$("#aOSPC-error").remove();
				$("#aOSPC").removeClass('input-error');
				
				if(mensajeB.length!=0)
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensajeB+'</div>');
					$("#bOSPC").addClass('input-error');
					//$("#btnCalcularOSPC").attr("disabled", true);					

					if(mensajeP1.length!=0)
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1OSPC").addClass('input-error');
					}
					else
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").removeClass('input-error');
					}

					if(mensajeP2.length!=0)
					{
						$("#P2OSPC-error").remove();
						$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
						$("#P2OSPC").addClass('input-error');
					}
					else
					{
						$("#P2OSPC-error").remove();
						$("#P2OSPC").removeClass('input-error');
					}
				}
				else
				{
					$("#bOSPC-error").remove();
					$("#bOSPC").removeClass('input-error');

					if(mensajeP1.length!=0)
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensajeP1+'</div>');
						$("#P1OSPC").addClass('input-error');

						if(mensajeP2.length!=0)
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
							$("#P2OSPC").addClass('input-error');
						}
						else
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").removeClass('input-error');
						}
					}
					else
					{
						$("#P1OSPC-error").remove();
						$("#P1OSPC").removeClass('input-error');

						if(mensajeP2.length!=0)
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensajeP2+'</div>');
							$("#P2OSPC").addClass('input-error');
						}
						else
						{
							$("#P2OSPC-error").remove();
							$("#P2OSPC").removeClass('input-error');
							$("#btnCalcularOSPC").attr("disabled", false);
						}						
					}
				}
			}			
		}
	});

	$("#P1OSPC").keyup(function()
	{
		var mensaje = validarP1OSPC();
		var mensaje2= validarP2OSPC();

		if (mensaje.length != 0) 
		{
			$("#P1OSPC-error").remove();
			$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#P1OSPC").addClass('input-error');
			//$("#btnCalcularOSPC").attr("disabled", true);
		} 
		else
		{
			$("#P1OSPC-error").remove();
			$("#P1OSPC").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOSPC").attr("disabled", false);
			}
		}
	});

	$("#P2OSPC").keyup(function()
	{
		var mensaje = validarP2OSPC();
		var mensaje2= validarP1OSPC();

		if (mensaje.length != 0) {
			$("#P2OSPC-error").remove();
			$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#P2OSPC").addClass('input-error');
			//$("#btnCalcularOSPC").attr("disabled", true);			
		} 
		else
		{
			$("#P2OSPC-error").remove();
			$("#P2OSPC").removeClass('input-error');
			
			if(mensaje2.length==0)
			{
				$("#btnCalcularOSPC").attr("disabled", false);
			}
		}
	});

	$("#btnCalcularOSPC").click(function()
	{
		var mensaje= validarNumeroAOSPC();
		var mensaje2= validarNumeroBOSPC();
		var mensaje3= validarNumeroPOSPC();
		var mensaje4= validarP1OSPC();
		var mensaje5= validarP2OSPC();

		if(mensaje.length!=0)
		{
			$("#aOSPC-error").remove();
			$("#aOSPC").parent().append('<div id="aOSPC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOSPC").addClass('input-error');
		}
		else if(mensaje2.length!=0)
		{
			$("#bOSPC-error").remove();
			$("#bOSPC").parent().append('<div id="bOSPC-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#bOSPC").addClass('input-error');
		}
		else if(mensaje3.length!=0)
		{
			$("#pOSPC-error").remove();
			$("#pOSPC").parent().append('<div id="pOSPC-error" class="text-danger">&nbsp;'+mensaje3+'</div>');
			$("#pOSPC").addClass('input-error');
		}
		else if(mensaje4.length!=0)
		{
			$("#P1OSPC-error").remove();
			$("#P1OSPC").parent().append('<div id="P1OSPC-error" class="text-danger">&nbsp;'+mensaje4+'</div>');
			$("#P1OSPC").addClass('input-error');
		}
		else if(mensaje5.length!=0)
		{
			$("#P2OSPC-error").remove();
			$("#P2OSPC").parent().append('<div id="P2OSPC-error" class="text-danger">&nbsp;'+mensaje5+'</div>');
			$("#P2OSPC").addClass('input-error');
		}
		else
		{
			var P1= ($("#P1OSPC").val()).split(",");
			var P2= ($("#P2OSPC").val()).split(",");
			var PR= [];
			var valorB= Number($('#bOSPC').val());
			var valorP= Number($('#pOSPC').val());
			var valorA= Number($('#aOSPC').val());

			PR= sumaPuntos(P1[0], P1[1], P2[0], P2[1], valorA, valorB, valorP);

			if(PR[0]==-1)
			{
				$("#ResultadoOSPC").val("Punto al infinito");
			}
			else
			{
				$("#ResultadoOSPC").val(""+PR[0]+","+PR[1]);
			}
		}
	});

	puntosOSPC= obtenerPuntosOSPC(1);

	var puntos=[], i;
	var select = document.getElementById("P1OperacionSumaPuntosCE");
	var select2 = document.getElementById("P2OperacionSumaPuntosCE");

	if(select!=null)
	{
		puntos= obtenerPuntos(1, 4, 23);

		for(i=0; puntos[i]!=-100; i=i+2)
		{
			var option= document.createElement("option");
			var option2= document.createElement("option");
			option.text= ""+puntos[i]+","+puntos[i+1];
			option.value= ""+puntos[i]+","+puntos[i+1];
			option2.text= ""+puntos[i]+","+puntos[i+1];
			option2.value= ""+puntos[i]+","+puntos[i+1];
			select.appendChild(option);
			select2.appendChild(option2);
		}

		select.selectedIndex= 0;
		select2.selectedIndex= 0;
	}

});

//FUNCIONES CALCULADORA

function validarNumeroAOSPC()
{
	var mensaje = "";	
	var valorA= Number($('#aOSPC').val());
	var numeroLetras= $('#aOSPC').val();
	var valorP= Number($('#pOSPC').val());
	var numeroLetrasP= $('#pOSPC').val();
	var valorB= Number($('#bOSPC').val());
	var numeroLetrasB= $('#bOSPC').val();
	var resultadoCondicion;
	var letrasP= validarNumeroPOSPC();
	
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

function validarNumeroBOSPC()
{
	var mensaje = "";	
	var valorB= Number($('#bOSPC').val());
	var numeroLetras= $('#bOSPC').val();	
	var valorP= Number($('#pOSPC').val());
	var numeroLetrasP= $('#pOSPC').val();
	var valorA= Number($('#aOSPC').val());
	var numeroLetrasA= $('#aOSPC').val();
	var resultadoCondicion;
	var letrasP= validarNumeroPOSPC();
	
	if (letrasP.length==0)
	{
		if (valorB<0 || valorB>valorP-1 || numeroLetras.includes("."))
		{
			mensaje = mensaje_131;
		}
		else if(!parseInt(valorB)&&valorB!=0 || numeroLetras.length==0) //El parseInt es para saber si es un numero o no
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

function validarNumeroPOSPC()
{
	var mensaje = "";	
	var valorP= Number($('#pOSPC').val());
	var numeroLetras= $('#pOSPC').val();
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

function validarP1OSPC()
{
	var mensaje = "";
	var texto = $('#P1OSPC').val();
	var mensajeA= validarNumeroAOSPC();
	var mensajeB= validarNumeroBOSPC();
	var mensajeP= validarNumeroPOSPC();
	var valorP= Number($('#pOSPC').val());
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
			puntosOSPC= obtenerPuntosOSPC(1);

			var coordenadas= ($("#P1OSPC").val()).split(",");
			var bandera= 0;

			for(i=0; puntosOSPC[i]!=-100; i=i+2)
			{
				if(puntosOSPC[i]==coordenadas[0])
				{
					if(puntosOSPC[i+1]==coordenadas[1])
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

function validarP2OSPC()
{
	var mensaje = "";
	var texto = $('#P2OSPC').val();
	var mensajeA= validarNumeroAOSPC();
	var mensajeB= validarNumeroBOSPC();
	var mensajeP= validarNumeroPOSPC();
	var valorP= Number($('#pOSPC').val());

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
			puntosOSPC= obtenerPuntosOSPC(1);

			var coordenadas= ($("#P2OSPC").val()).split(",");
			var bandera= 0;

			for(i=0; puntosOSPC[i]!=-100; i=i+2)
			{
				if(puntosOSPC[i]==coordenadas[0])
				{
					if(puntosOSPC[i+1]==coordenadas[1])
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

function obtenerPuntosOSPC(bandera)
{
	var valorA= Number($('#aOSPC').val());
	var valorB= Number($('#bOSPC').val());
	var valorP= Number($('#pOSPC').val());
	var puntos= [];
	var zonaDisplayPuntos= document.getElementById("fileDisplayPuntosOSPC");
	var i;

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
		}
	}

	return puntos;
}

function sleepSumaPuntos(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}