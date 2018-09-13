var velocidadAnimacionOIMEF= 1;
var seguirCalculandoOIMEF= true;

function mostrarOIMEF()
{	
	$("#panelInteractivo-OIMEF").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOIMEF(){
	seguirCalculandoOIMEF= false;
	
	$("#panelInteractivo-OIMEF").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOIMEF();

	$("#btn-velocidadOIMEF").show();
	$("#btnCalcularOIMEF").show();
	$("#btnCancelarOIMEF").hide();

	$("#aOIMEF-error").remove();
	$("#aOIMEF").removeClass('input-error');

	$("#aOIMEF").val("1");
}

function limpiaPanelOIMEF()
{	
	$("#seccionOIMEF").show();
		if($('#informacionOIMEF').is(':visible'))
		{
			$("#informacionOIMEF").slideToggle(500);
		}
		
		$("#informacionOIMEF").empty();
		$("#tablaOIMEF").empty();
		$("#representacionPolinomialAOIMEF").empty();
		$("#operadorOIMEF").empty();
		$("#representacionPolinomialBOIMEF").empty();
		$("#representacionPolinomialROIMEF").empty();
		$("#representacionBinariaROIMEF").empty();
		
		$("#seccionOIMEF").hide();

	$("#seccionComprobacionOIMEF").show();
	$("#seccionComprobacionOIMEF").hide();

	$("#resultadoOIMEF").val("");
	$("#aOIMEF").val("");
}

function obtenervelocidadAnimacionOIMEF()
{
	if($('#btnCalcularOIMEF').val() == 1)
	{
		velocidadAnimacionOIMEF = 0.5;
	}
	else
	{
		velocidadAnimacionOIMEF = 1.1;
	}

	$("#btn-velocidadOIMEF").hide();
	$("#btnCalcularOIMEF").hide();
	$("#btnCancelarOIMEF").show();
	seguirCalculandoOIMEF= true;
}

function obtenerGrado(a)
{
	var x= 1, grade= 0;
	
	if(a!=0)
	{
		while(x<a)
		{
			x= x<<1;
			grade++;
		}
		
		if(x!=a)
		{
			grade--;
		}		
	}	
	
	return grade;
}

function multiplicarPolinomios(p, q, m)
{
	var x= 1, suma= 0, aux=0, bandera= 0, n;
	
	while(x<m)
	{
		x= x<<1;
	}
	
	if(x==m)
	{
		n= x;
	}
	else
	{
		n= x>>1;		
	}		
	
	x= 1;
	
	while(x!=n)
	{
		if(bandera==0)
		{
			bandera= 1;
			
			suma= q;				
			
			if((p&x)==x)
			{
				aux= aux^suma;
			}
		}
		else
		{
			suma=suma<<1;
			
			if((n&suma)==n)
			{				
				suma= suma^m;
			}
			
			if((p&x)==x)
			{
				aux= aux^suma;
			}
		}		
				
		x= x<<1;
	}
	
	return aux;
}

async function realizarOIMEF()
{
	var inputA= document.getElementById("aOIMEF");
	var numeroA= parseInt(inputA.value);

	var PolinomioU= "", PolinomioV= "", PolinomioG1= "", PolinomioG2= "", i, bandera= 1, contadorFilas= 1, PolinomioAux= "", repBinariaR= "";

	var PolinomioA= [], PolinomioB= [];

	var u, v, g1, g2, j, aux, banderaVelocidad= 0, mostrarTexto= 1, numeroR, corrimiento, tempVelocidad;

	limpiaPanelOIMEF();
	obtenervelocidadAnimacionOIMEF();

	$("#aOIMEF").val(numeroA);

	var tablaOIMEF= document.getElementById("tablaOIMEF");
	var filaInicial= document.createElement("tr");
	filaInicial.id= "filaOIMEF0";
	tablaOIMEF.appendChild(filaInicial);

	var columnaU= document.createElement("td");
	columnaU.id= "columnaOIMEFu0";
	columnaU.className= "text-center";
	columnaU.style="width:20%";
	columnaU.innerHTML= "u";
	filaInicial.appendChild(columnaU);

	var columnaV= document.createElement("td");
	columnaV.id= "columnaOIMEFv0";
	columnaV.className= "text-center";
	columnaV.style="width:20%"
	columnaV.innerHTML= "v";
	filaInicial.appendChild(columnaV);

	var columnaG1= document.createElement("td");
	columnaG1.id= "columnaOIMEF1g0";
	columnaG1.className= "text-center";
	columnaG1.style="width:20%";
	columnaG1.innerHTML= "g<sub>1</sub>";
	filaInicial.appendChild(columnaG1);

	var columnaG2= document.createElement("td");
	columnaG2.id= "columnaOIMEF2g0";
	columnaG2.className= "text-center";
	columnaG2.style="width:20%";
	columnaG2.innerHTML= "g<sub>2</sub>";
	filaInicial.appendChild(columnaG2);

	var columnaPJ= document.createElement("td");
	columnaPJ.id= "columnaOIMEFpj0";
	columnaPJ.className= "text-center";
	columnaPJ.style="width:10%";
	columnaPJ.innerHTML= "j";
	filaInicial.appendChild(columnaPJ);

	var columnaNJ= document.createElement("td");
	columnaNJ.id= "columnaOIMEFnj0";
	columnaNJ.className= "text-center";
	columnaNJ.style="width:10%";
	columnaNJ.innerHTML= "-j";
	filaInicial.appendChild(columnaNJ);

	$("#seccionOIMEF").show();

	$("#informacionOIMEF").append("A continuación se explicará el algoritmo para obtener el inverso multiplicativo en el campo GF(2<sup>8</sup>). Es importante recordar que los números se trabajan como polinomios.");
	$("#informacionOIMEF").slideToggle(500);
	await sleepInversoGF(5250);

	if(!seguirCalculandoOIMEF){ return; }

	if(numeroA!=0)
	{
		u= numeroA;
		v= 283;
		g1= 1;
		g2= 0;

		while(u!=1)
		{
			if(banderaVelocidad==2)
			{
				tempVelocidad= velocidadAnimacionOIMEF;
				velocidadAnimacionOIMEF= 0;
				mostrarTexto= 0;
			}

			var filaSiguiente= document.createElement("tr");
			filaSiguiente.id= "filaOIMEF"+contadorFilas;
			tablaOIMEF.appendChild(filaSiguiente);

			var columnaU= document.createElement("td");
			columnaU.id= "columnaOIMEFu"+contadorFilas;
			columnaU.className= "text-center";
			columnaU.style="width:20%";		
			filaSiguiente.appendChild(columnaU);

			var columnaV= document.createElement("td");
			columnaV.id= "columnaOIMEFv"+contadorFilas;
			columnaV.className= "text-center";
			columnaV.style="width:20%";
			filaSiguiente.appendChild(columnaV);

			var columnaG1= document.createElement("td");
			columnaG1.id= "columnaOIMEF1g"+contadorFilas;
			columnaG1.className= "text-center";
			columnaG1.style="width:20%";
			filaSiguiente.appendChild(columnaG1);

			var columnaG2= document.createElement("td");
			columnaG2.id= "columnaOIMEF2g"+contadorFilas;
			columnaG2.className= "text-center";
			columnaG2.style="width:20%";
			filaSiguiente.appendChild(columnaG2);

			var columnaPJ= document.createElement("td");
			columnaPJ.id= "columnaOIMEFpj"+contadorFilas;
			columnaPJ.className= "text-center";
			columnaPJ.style="width:10%";
			filaSiguiente.appendChild(columnaPJ);

			var columnaNJ= document.createElement("td");
			columnaNJ.id= "columnaOIMEFnj"+contadorFilas;
			columnaNJ.className= "text-center";
			columnaNJ.style="width:10%";
			filaSiguiente.appendChild(columnaNJ);

			if(bandera==1)
			{
				if(mostrarTexto==1)
				{
					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("1. El primer paso es inicializar las siguientes variables: 'u'= La representación polinomial del número dado; 'v'= Polinomio irreducible para GF(2<sup>8</sup>); 'g<sub>1</sub>'= 1; 'g<sub>2</sub>'= 0.");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(7100);
				}

				if(!seguirCalculandoOIMEF){ return; }

				PolinomioU= convertirNumeroAPolinomio(u);
				PolinomioV= convertirNumeroAPolinomio(v);
				PolinomioG1= convertirNumeroAPolinomio(g1);
				PolinomioG2= "0";

				columnaU.innerHTML= PolinomioU;
				columnaU.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1250*velocidadAnimacionOIMEF);
				columnaU.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				columnaV.innerHTML= PolinomioV;
				columnaV.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1250*velocidadAnimacionOIMEF);
				columnaV.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				columnaG1.innerHTML= PolinomioG1;
				columnaG1.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1250*velocidadAnimacionOIMEF);
				columnaG1.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				columnaG2.innerHTML= PolinomioG2;
				columnaG2.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1250*velocidadAnimacionOIMEF);
				columnaG2.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				bandera= 0;
			}
			else
			{
				if(mostrarTexto==1)
				{
					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("2. Los siguientes pasos los vamos a realizar mientras la variable 'u' sea diferente a 1.");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(3400);

					if(!seguirCalculandoOIMEF){ return; }

					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("2.1. Restamos el grado del polinomio 'u' con el grado del polinomio 'v' y lo asignamos a 'j' y a '-j':");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(4250);
				}

				if(!seguirCalculandoOIMEF){ return; }

				j= obtenerGrado(u)-obtenerGrado(v);

				columnaPJ.innerHTML= j;
				columnaPJ.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1250*velocidadAnimacionOIMEF);
				columnaPJ.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				columnaNJ.innerHTML= j*(-1);
				columnaNJ.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1250*velocidadAnimacionOIMEF);
				columnaNJ.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				if(mostrarTexto==1)
				{
					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("2.2. Si 'j'<0 intercambiamos entre sí los valores de 'u' y 'v', 'g<sub>1</sub>'' y 'g<sub>2</sub>' y finalmente asignamos '-j' a 'j'.");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(5750);
				}

				if(!seguirCalculandoOIMEF){ return; }
			
				if(j<0)
				{
					columnaPJ.style.backgroundColor= "#FDFD96";
					await sleepInversoGF(25*velocidadAnimacionOIMEF);

					if(mostrarTexto==1)
					{
						$("#informacionOIMEF").slideToggle(250);
						await sleepInversoGF(250);
						$("#informacionOIMEF").empty();

						$("#informacionOIMEF").append("2.2.1. Como 'j'<0 realizamos lo anterior.");
						$("#informacionOIMEF").slideToggle(500);
						await sleepInversoGF(2500);
					}				

					columnaPJ.style.backgroundColor= "transparent";
					await sleepInversoGF(25*velocidadAnimacionOIMEF);

					if(!seguirCalculandoOIMEF){ return; }

					aux= u;
					PolinomioAux= PolinomioU;

					columnaU.style.backgroundColor= "#FDFD96";
					columnaV.style.backgroundColor= "#FDFD96";
					await sleepInversoGF(1000*velocidadAnimacionOIMEF);

					u= v;
					PolinomioU= PolinomioV;
					columnaU.innerHTML= PolinomioU;

					v= aux;
					PolinomioV= PolinomioAux;
					columnaV.innerHTML= PolinomioV;

					columnaU.style.backgroundColor= "transparent";
					columnaV.style.backgroundColor= "transparent";
					await sleepInversoGF(500*velocidadAnimacionOIMEF);

					aux= g1;
					PolinomioAux= PolinomioG1;

					columnaG1.style.backgroundColor= "#FDFD96";
					columnaG2.style.backgroundColor= "#FDFD96";
					await sleepInversoGF(1000*velocidadAnimacionOIMEF);
					g1= g2;
					PolinomioG1= PolinomioG2;
					columnaG1.innerHTML= PolinomioG2;

					g2= aux;
					PolinomioG2= PolinomioAux;
					columnaG2.innerHTML= PolinomioG2;

					columnaG1.style.backgroundColor= "transparent";
					columnaG2.style.backgroundColor= "transparent";
					await sleepInversoGF(500*velocidadAnimacionOIMEF);

					j= j*(-1);
					columnaPJ.innerHTML= j;
					columnaPJ.style.backgroundColor= "#FDFD96";
					await sleepInversoGF(1000*velocidadAnimacionOIMEF);
					columnaPJ.style.backgroundColor= "transparent";
					await sleepInversoGF(25*velocidadAnimacionOIMEF);
				}

				if(mostrarTexto==1)
				{
					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("2.3. Obtenemos 'u'= 'u' + x<sup>j</sup>'v'. Recordar como sumar y multiplicar en el campo GF(2<sup>8</sup>).");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(4600);
				}

				if(!seguirCalculandoOIMEF){ return; }
				
				u= u^(v<<j);
				PolinomioU= convertirNumeroAPolinomio(u);
				columnaU.innerHTML= PolinomioU;
				columnaU.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1000*velocidadAnimacionOIMEF);
				columnaU.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				if(mostrarTexto==1)
				{
					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("2.4. Obtenemos 'g<sub>1</sub>'= 'g<sub>1</sub>' + x<sup>j</sup>'g<sub>2</sub>'.");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(3300);
				}

				if(!seguirCalculandoOIMEF){ return; }

				g1= g1^(g2<<j);
				PolinomioG1= convertirNumeroAPolinomio(g1);
				columnaG1.innerHTML= PolinomioG1;
				columnaG1.style.backgroundColor= "#FDFD96";
				await sleepInversoGF(1000*velocidadAnimacionOIMEF);
				columnaG1.style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);

				if(mostrarTexto==1)
				{
					$("#informacionOIMEF").slideToggle(250);
					await sleepInversoGF(250);
					$("#informacionOIMEF").empty();

					$("#informacionOIMEF").append("Y repetimos mientras 'u' sea diferente de 1.");
					$("#informacionOIMEF").slideToggle(500);
					await sleepInversoGF(2250);
				}

				if(!seguirCalculandoOIMEF){ return; }
			}

			contadorFilas++;
			banderaVelocidad++;
		}

		velocidadAnimacionOIMEF= tempVelocidad;

		$("#informacionOIMEF").slideToggle(250);
		await sleepInversoGF(250);
		$("#informacionOIMEF").empty();

		$("#informacionOIMEF").append("Como 'u' es igual a 1, eso quiere decir que el algoritmo terminó y g<sub>1</sub> es el resultado.");
		$("#informacionOIMEF").slideToggle(500);
		await sleepInversoGF(4000);

		if(!seguirCalculandoOIMEF){ return; }

		columnaG1.innerHTML= PolinomioG1;
		columnaG1.style.backgroundColor= "#77DD77";
		await sleepInversoGF(1000*velocidadAnimacionOIMEF);

		if(!seguirCalculandoOIMEF){ return; }

		$("#informacionOIMEF").slideToggle(250);
		await sleepInversoGF(250);
		$("#informacionOIMEF").empty();

		$("#informacionOIMEF").append("Para terminar sólo nos queda comprobar que g<sub>1</sub> es el inverso multiplicativo para el número dado. Para esto los multiplicamos y el resultado debe ser 1.");
		$("#informacionOIMEF").slideToggle(500);
		await sleepInversoGF(6500);

		if(!seguirCalculandoOIMEF){ return; }

		$("#seccionComprobacionOIMEF").show();

		var representacionPolinomialAOIMEF= document.getElementById("representacionPolinomialAOIMEF");
		var operadorOIMEF= document.getElementById("operadorOIMEF");
		var representacionPolinomialBOIMEF= document.getElementById("representacionPolinomialBOIMEF");
		var representacionPolinomialROIMEF= document.getElementById("representacionPolinomialROIMEF");

		PolinomioA= convertirPolinomioALabels(convertirNumeroAPolinomio(numeroA));
		PolinomioB= convertirPolinomioALabels(PolinomioG1);

		for(i= PolinomioA.length-1; i>-1; i--)
		{
			if(i==PolinomioA.length-1)
			{
				representacionPolinomialAOIMEF.appendChild(PolinomioA[i]);
				representacionPolinomialAOIMEF.appendChild(document.createTextNode(" "));
			}
			else
			{
				var operadorS= document.createElement("label");
				operadorS.innerHTML= " +";
				representacionPolinomialAOIMEF.appendChild(operadorS);
				representacionPolinomialAOIMEF.appendChild(PolinomioA[i]);
				representacionPolinomialAOIMEF.appendChild(document.createTextNode(" "));
			}
		}

		for(i= PolinomioB.length-1; i>-1; i--)
		{
			if(i==PolinomioB.length-1)
			{
				representacionPolinomialBOIMEF.appendChild(PolinomioB[i]);
				representacionPolinomialBOIMEF.appendChild(document.createTextNode(" "));
			}
			else
			{
				var operadorS= document.createElement("label");
				operadorS.innerHTML= " +";
				representacionPolinomialBOIMEF.appendChild(operadorS);
				representacionPolinomialBOIMEF.appendChild(PolinomioB[i]);
				representacionPolinomialBOIMEF.appendChild(document.createTextNode(" "));
			}
		}

		var labelOperador= document.createElement("label");
		labelOperador.innerHTML= "* ";
		operadorOIMEF.appendChild(labelOperador);

		if(!seguirCalculandoOIMEF){ return; }

		for(i= PolinomioA.length-1; i>-1; i--)
		{
			if(!seguirCalculandoOIMEF){ return; }
			var exponteA, temp= [];
			
			if(PolinomioA[i].id.length!=0)
			{
				exponteA= PolinomioA[i].id;

				PolinomioA[i].style.backgroundColor= "#FDFD96";
				await sleepInversoGF(250*velocidadAnimacionOIMEF);

				if(!seguirCalculandoOIMEF){ return; }

				for(j= PolinomioB.length-1; j>-1; j--)
				{
					var exponteB, temp2= [];

					if(PolinomioB[j].id.length!=0)
					{
						var exponteB= PolinomioB[j].id;					
						var exponteR= parseInt(exponteA)+parseInt(exponteB);

						var elementoPolinomial= document.createElement("label");

						PolinomioB[j].style.backgroundColor= "#FDFD96";
						await sleepInversoGF(250*velocidadAnimacionOIMEF);

						if(!seguirCalculandoOIMEF){ return; }

						if(representacionPolinomialROIMEF.childNodes.length>0)
						{
							var operadorPolinomial= document.createElement("label");
							operadorPolinomial.innerHTML= " + ";

							representacionPolinomialROIMEF.appendChild(operadorPolinomial);						
						}

						if(exponteR==0)
						{
							elementoPolinomial.innerHTML= "1";
						}
						else if(exponteR==1)
						{
							elementoPolinomial.innerHTML= "x";
						}
						else
						{
							elementoPolinomial.innerHTML= "x<sup>"+(exponteR)+"</sup>";
						}
						
						elementoPolinomial.id= exponteR;

						representacionPolinomialROIMEF.appendChild(elementoPolinomial);

						elementoPolinomial.style.backgroundColor= "#77DD77";
						await sleepInversoGF(750*velocidadAnimacionOIMEF);

						if(!seguirCalculandoOIMEF){ return; }

						for(k= 0; k<representacionPolinomialROIMEF.childNodes.length; k++)
						{
							var elementoResultado= representacionPolinomialROIMEF.childNodes[k];

							if(elementoResultado.id.length!=0 && parseInt(elementoResultado.id)>7)
							{
								elementoResultado.style.backgroundColor= "#ADD8E6";
								await sleepInversoGF(250*velocidadAnimacionOIMEF);

								if(!seguirCalculandoOIMEF){ return; }
								
								var exponenteAsimplificar= parseInt(elementoResultado.id)-8;							
								elementoResultado.id= exponenteAsimplificar;

								var elementoParentesisAbertura= document.createElement("label");
								elementoParentesisAbertura.innerHTML= "(";

								var elementoParentesisCierre= document.createElement("label");
								elementoParentesisCierre.innerHTML= ")";

								var elementoPrimerModulo= document.createElement("label");
								elementoPrimerModulo.id= 4;
								elementoPrimerModulo.innerHTML= "x<sup>4</sup>";

								var elementoSegundoModulo= document.createElement("label");
								elementoSegundoModulo.id= 3;
								elementoSegundoModulo.innerHTML= "x<sup>3</sup>";

								var elementoTercerModulo= document.createElement("label");
								elementoTercerModulo.id= 1;
								elementoTercerModulo.innerHTML= "x";

								var elementoCuartoModulo= document.createElement("label");
								elementoCuartoModulo.id= 0;
								elementoCuartoModulo.innerHTML= "1";

								var operadorPolinomial2= document.createElement("label");
								var operadorPolinomial3= document.createElement("label");
								var operadorPolinomial4= document.createElement("label");
								operadorPolinomial2.innerHTML= " + ";
								operadorPolinomial3.innerHTML= " + ";
								operadorPolinomial4.innerHTML= " + ";

								elementoParentesisAbertura.style.backgroundColor= "#ADD8E6";
								elementoPrimerModulo.style.backgroundColor= "#ADD8E6";
								elementoParentesisAbertura.style.backgroundColor= "#ADD8E6";
								operadorPolinomial2.style.backgroundColor= "#ADD8E6";
								elementoSegundoModulo.style.backgroundColor= "#ADD8E6";
								operadorPolinomial3.style.backgroundColor= "#ADD8E6";
								elementoTercerModulo.style.backgroundColor= "#ADD8E6";
								operadorPolinomial4.style.backgroundColor= "#ADD8E6";
								elementoCuartoModulo.style.backgroundColor= "#ADD8E6";
								elementoParentesisCierre.style.backgroundColor= "#ADD8E6";

								if(exponenteAsimplificar==0)
								{
									representacionPolinomialROIMEF.insertBefore(elementoPrimerModulo, elementoResultado.nextSibling);
									representacionPolinomialROIMEF.insertBefore(operadorPolinomial2, elementoPrimerModulo.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoSegundoModulo, operadorPolinomial2.nextSibling);
									representacionPolinomialROIMEF.insertBefore(operadorPolinomial3, elementoSegundoModulo.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoTercerModulo, operadorPolinomial3.nextSibling);
									representacionPolinomialROIMEF.insertBefore(operadorPolinomial4, elementoTercerModulo.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoCuartoModulo, operadorPolinomial4.nextSibling);

									elementoResultado.remove();

									await sleepInversoGF(1000*velocidadAnimacionOIMEF);

									if(!seguirCalculandoOIMEF){ return; }
								}
								else
								{
									if(exponenteAsimplificar==1)
									{
										elementoResultado.innerHTML= "x";
									}
									else
									{
										elementoResultado.innerHTML= "x<sup>"+exponenteAsimplificar+"</sup>";
									}

									representacionPolinomialROIMEF.insertBefore(elementoParentesisAbertura, elementoResultado.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoPrimerModulo, elementoParentesisAbertura.nextSibling);
									representacionPolinomialROIMEF.insertBefore(operadorPolinomial2, elementoPrimerModulo.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoSegundoModulo, operadorPolinomial2.nextSibling);
									representacionPolinomialROIMEF.insertBefore(operadorPolinomial3, elementoSegundoModulo.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoTercerModulo, operadorPolinomial3.nextSibling);
									representacionPolinomialROIMEF.insertBefore(operadorPolinomial4, elementoTercerModulo.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoCuartoModulo, operadorPolinomial4.nextSibling);
									representacionPolinomialROIMEF.insertBefore(elementoParentesisCierre, elementoCuartoModulo.nextSibling);

									await sleepInversoGF(1000*velocidadAnimacionOIMEF);

									if(!seguirCalculandoOIMEF){ return; }

									elementoResultado.style.backgroundColor= "#E0FFFF";
									await sleepInversoGF(250*velocidadAnimacionOIMEF);

									if(!seguirCalculandoOIMEF){ return; }

									for(l= k+2; l<k+9; l++)
									{
										var elementoModuloActual= representacionPolinomialROIMEF.childNodes[l];

										if(elementoModuloActual.id.length!=0)
										{
											var exponenteActual= parseInt(elementoModuloActual.id);

											elementoModuloActual.style.backgroundColor= "#E0FFFF";
											await sleepInversoGF(250*velocidadAnimacionOIMEF);

											if(!seguirCalculandoOIMEF){ return; }

											if((parseInt(exponenteAsimplificar)+parseInt(exponenteActual))==0)
											{
												elementoModuloActual.innerHTML= "1";
											}
											else if((parseInt(exponenteAsimplificar)+parseInt(exponenteActual))==1)
											{
												elementoModuloActual.innerHTML= "x";
											}
											else
											{
												elementoModuloActual.innerHTML= "x<sup>"+ (parseInt(exponenteAsimplificar)+parseInt(exponenteActual)) +"</sup>";
											}
										
											elementoModuloActual.id= (parseInt(exponenteAsimplificar)+parseInt(exponenteActual));

											await sleepInversoGF(750*velocidadAnimacionOIMEF);

											if(!seguirCalculandoOIMEF){ return; }

											elementoModuloActual.style.backgroundColor= "#ADD8E6";
											await sleepInversoGF(25*velocidadAnimacionOIMEF);
										}
									}

									elementoResultado.remove();
								}

								elementoParentesisAbertura.remove();
								elementoParentesisCierre.remove();
								elementoPrimerModulo.style.backgroundColor= "transparent";
								elementoParentesisAbertura.style.backgroundColor= "transparent";
								operadorPolinomial2.style.backgroundColor= "transparent";
								elementoSegundoModulo.style.backgroundColor= "transparent";
								operadorPolinomial3.style.backgroundColor= "transparent";
								elementoTercerModulo.style.backgroundColor= "transparent";
								operadorPolinomial4.style.backgroundColor= "transparent";
								elementoCuartoModulo.style.backgroundColor= "transparent";

								await sleepInversoGF(500*velocidadAnimacionOIMEF);

								if(!seguirCalculandoOIMEF){ return; }						

								k= -1;
							}
						}

						elementoPolinomial.style.backgroundColor= "transparent";
						await sleepInversoGF(500*velocidadAnimacionOIMEF);

						if(!seguirCalculandoOIMEF){ return; }

						//ELIMINAR REPETIDOS

						for(k= 0; k<representacionPolinomialROIMEF.childNodes.length; k++)
						{
							var elementoA= representacionPolinomialROIMEF.childNodes[k];

							if(elementoA.id.length!=0)
							{
								for(l= k+1; l<representacionPolinomialROIMEF.childNodes.length; l++)
								{
									var elementoB= representacionPolinomialROIMEF.childNodes[l];

									if(elementoB.id.length!=0)
									{
										if(elementoA.id==elementoB.id)
										{
											elementoA.style.backgroundColor= "#FF6961";
											elementoB.style.backgroundColor= "#FF6961";

											await sleepInversoGF(750*velocidadAnimacionOIMEF);

											if(!seguirCalculandoOIMEF){ return; }

											if(k+1==l-1)
											{
												if(l==representacionPolinomialROIMEF.childNodes.length-1&&k==0)
												{
													var op1;
													op1= representacionPolinomialROIMEF.childNodes[k+1];
													
													op1.remove();
												}
												else if(l==representacionPolinomialROIMEF.childNodes.length-1)
												{
													var op1, op2;
													op1= representacionPolinomialROIMEF.childNodes[k+1];
													op2= representacionPolinomialROIMEF.childNodes[k-1];
													
													op1.remove();
													op2.remove();
												}
												else
												{
													var op1, op2;							
													op1= representacionPolinomialROIMEF.childNodes[k+1];
													op2= representacionPolinomialROIMEF.childNodes[l+1];
													
													op1.remove();
													op2.remove();
												}
											}
											else
											{
												if(l==representacionPolinomialROIMEF.childNodes.length-1)
												{
													var op1, op2;							
													op1= representacionPolinomialROIMEF.childNodes[k+1];
													op2= representacionPolinomialROIMEF.childNodes[l-1];
													
													op1.remove();
													op2.remove();
												}
												else
												{
													var op1, op2;							
													op1= representacionPolinomialROIMEF.childNodes[k+1];
													op2= representacionPolinomialROIMEF.childNodes[l+1];
													
													op1.remove();
													op2.remove();
												}					
											}
											
											elementoA.remove();
											elementoB.remove();

											l= representacionPolinomialROIMEF.childNodes.length;
											k= -1;
										}
									}
								}
							}
						}

						PolinomioB[j].style.backgroundColor= "transparent";
						await sleepInversoGF(25*velocidadAnimacionOIMEF);
					}
				}

				PolinomioA[i].style.backgroundColor= "transparent";
				await sleepInversoGF(25*velocidadAnimacionOIMEF);
			}
		}

		$("#informacionOIMEF").slideToggle(250);
		await sleepInversoGF(250);
		$("#informacionOIMEF").empty();

		$("#informacionOIMEF").append("Convertimos el polinomio 'g<sub>1</sub>' obtenido a su notación binaria y por lo tanto el inverso multiplicativo es:");
		$("#informacionOIMEF").slideToggle(500);
		await sleepInversoGF(4500);

		if(!seguirCalculandoOIMEF){ return; }

		numeroR= 0;

		for(i= 0; i<PolinomioB.length; i++)
		{
			var elemento= PolinomioB[i];

			if(elemento.id.length!=0)
			{
				corrimiento= 1;

				for(j= 0; j<parseInt(elemento.id); j++)
				{
					corrimiento= corrimiento<<1;
				}

				numeroR= numeroR|corrimiento;
			}
		}

		repBinariaR= numeroR.toString(2);

		for(i=repBinariaR.length; i<8; i++)
		{
			repBinariaR= "0"+repBinariaR;
		}

		var elementoBinario= document.createElement("label");
		elementoBinario.innerHTML= repBinariaR;

		representacionBinariaROIMEF.appendChild(elementoBinario);
	}
	else
	{
		$("#informacionOIMEF").slideToggle(250);
		await sleepInversoGF(250);
		$("#informacionOIMEF").empty();

		$("#informacionOIMEF").append("En el caso particular del cero, el mismo cero se considera como el inverso multiplicativo.");
		$("#informacionOIMEF").slideToggle(500);
		await sleepInversoGF(2600);	

		numeroR= 0;
	}

	$("#btn-velocidadOIMEF").show();
	$("#btnCalcularOIMEF").show();
	$("#btnCancelarOIMEF").hide();
				
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_72);
	$("#resultadoOIMEF").val(numeroR);
}

function convertirNumeroAPolinomio(num)
{
	var i, bandera= 1, contadorExponente= 0, polinomio= "";

	for(i=1; i<=num; i=i<<1)
	{
		if(i&num)
		{
			if(contadorExponente==0)
			{
				if(bandera==1)
				{
					polinomio= "1";
					bandera= 0;
				}
			}
			else if(contadorExponente==1)
			{
				if(bandera==1)
				{
					polinomio= "x";
					bandera= 0;
				}
				else
				{
					polinomio= "x+"+polinomio;
				}
			}
			else
			{
				if(bandera==1)
				{
					polinomio= "x<sup>"+contadorExponente+"</sup>";
					bandera= 0;
				}
				else
				{
					polinomio= "x<sup>"+contadorExponente+"</sup>+"+polinomio;
				}
			}
		}

		contadorExponente++;
	}

	return polinomio;
}

function convertirPolinomioALabels(polinomio)
{
	var labels= [], i, elementos= [], j, exponenteActual, exponenteAux;

	elementos= polinomio.split("+");

	for(i= 0; i<elementos.length; i++)
	{
		var elementoPolinomial= document.createElement("label");

		switch(elementos[i])
		{
			case "1":
				elementoPolinomial.id= 0;
				elementoPolinomial.innerHTML= "1";
				exponenteActual= 0;
				break;
			case "x":
				elementoPolinomial.id= 1;
				elementoPolinomial.innerHTML= "x";
				exponenteActual= 1;
				break;
			case "x<sup>2</sup>":
				elementoPolinomial.id= 2;
				elementoPolinomial.innerHTML= "x<sup>2</sup>";
				exponenteActual= 2;
				break;
			case "x<sup>3</sup>":
				elementoPolinomial.id= 3;
				elementoPolinomial.innerHTML= "x<sup>3</sup>";
				exponenteActual= 3;
				break;
			case "x<sup>4</sup>":
				elementoPolinomial.id= 4;
				elementoPolinomial.innerHTML= "x<sup>4</sup>";
				exponenteActual= 4;
				break;
			case "x<sup>5</sup>":
				elementoPolinomial.id= 5;
				elementoPolinomial.innerHTML= "x<sup>5</sup>";
				exponenteActual= 5;
				break;
			case "x<sup>6</sup>":
				elementoPolinomial.id= 6;
				elementoPolinomial.innerHTML= "x<sup>6</sup>";
				exponenteActual= 6;
				break;
			case "x<sup>7</sup>":
				elementoPolinomial.id= 7;
				elementoPolinomial.innerHTML= "x<sup>7</sup>";
				exponenteActual= 7;
				break;
		}

		if(labels.length==0)//ORDENA ASI 0,1,2,3....
		{
			labels.push(elementoPolinomial);
		}
		else
		{
			for(j= 0; j<labels.length; j++)
			{
				exponenteAux= parseInt(labels[j].id);

				if(exponenteActual<exponenteAux)
				{
					labels.splice(j, 0, elementoPolinomial);
					j= labels.length;
				}
				else if(j+1==labels.length)
				{
					labels.push(elementoPolinomial);
					j= labels.length;
				}
			}
		}
	}

	return labels;
}

function validarNumeroAOIMEF()
{
	var mensaje = "";	
	var valorA= Number($('#aOIMEF').val());
	var numeroLetras= $('#aOIMEF').val();
	
	if (valorA<0 || valorA>255 || numeroLetras.length == 0 || numeroLetras.includes("."))
	{
		mensaje = mensaje_87;
	}	

	return mensaje;
}

$(document).ready(function()
{
	$("#CalcularRapidoOIMEF").click(function(){
		$("#btnCalcularOIMEF").html('Calcular Rápido');
		$("#btnCalcularOIMEF").val(1);
	});
	$("#CalcularNormalOIMEF").click(function(){
		$("#btnCalcularOIMEF").html('Calcular Normal');
		$("#btnCalcularOIMEF").val(2);
	});

	$("#btnCalcularOIMEF").click(function()
	{
		var mensaje= validarNumeroAOIMEF();

		if(mensaje.length!=0)
		{
			$("#aOIMEF-error").remove();
			$("#aOIMEF").parent().parent().append('<div id="aOIMEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOIMEF").addClass('input-error');
			//$("#btnCalcularOIMEF").attr("disabled", true);
		}
		else
		{
			realizarOIMEF();
		}
	});

	$("#btnCancelarOIMEF").click(function()
	{
		seguirCalculandoOIMEF= false;
		
		limpiaPanelOIMEF();

		$("#btn-velocidadOIMEF").show();
		$("#btnCalcularOIMEF").show();
		$("#btnCancelarOIMEF").hide();
	});

	$("#aOIMEF").on('click change keyup', function() {
		var mensaje = validarNumeroAOIMEF();

		if (mensaje.length != 0) 
		{
			$("#aOIMEF-error").remove();
			$("#aOIMEF").parent().parent().append('<div id="aOIMEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOIMEF").addClass('input-error');
			//$("#btnCalcularOIMEF").attr("disabled", true);
		}
		else
		{
			$("#aOIMEF-error").remove();
			$("#aOIMEF").removeClass('input-error');
			$("#btnCalcularOIMEF").attr("disabled", false);
		}
	});

	//Funciones calculadora
	$("#aOIMGFC").keyup(function()
	{
		var mensaje = validarNumeroAOIMGFC();

		if (mensaje.length != 0) 
		{
			$("#aOIMGFC-error").remove();
			$("#aOIMGFC").parent().append('<div id="aOIMGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOIMGFC").addClass('input-error');
			//$("#btnCalcularOIMGFC").attr("disabled", true);
		}
		else
		{
			$("#aOIMGFC-error").remove();
			$("#aOIMGFC").removeClass('input-error');
			$("#btnCalcularOIMGFC").attr("disabled", false);
		}
	});

	$("#btnCalcularOIMGFC").click(function()
	{
		var mensaje = validarNumeroAOIMGFC();

		if (mensaje.length != 0) 
		{
			$("#aOIMGFC-error").remove();
			$("#aOIMGFC").parent().append('<div id="aOIMGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOIMGFC").addClass('input-error');
			//$("#btnCalcularOIMGFC").attr("disabled", true);
		}
		else
		{
			$("#aOIMGFC-error").remove();
			$("#aOIMGFC").removeClass('input-error');
			$("#btnCalcularOIMGFC").attr("disabled", false);

			var resultado= inversoMultiplicativoOIMGFC();

			$("#ResultadoOIMGFC").val(resultado);
		}
	});

});

//Funciones calculadora
function validarNumeroAOIMGFC()
{
	var mensaje = "";	
	var valorA= $('#aOIMGFC').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_87;
	}

	return mensaje;
}

function inversoMultiplicativoOIMGFC()
{
	var valorA= Number($('#aOIMGFC').val());
	var u= valorA, v= 283, g1= 1, g2= 0, j, aux;
	
	if(u!=0)
	{
		while(u!=1)
		{
			j= obtenerGrado(u)-obtenerGrado(v);
			
			if(j<0)
			{
				aux= u;
				u= v;
				v= aux;
				aux= g1;
				g1= g2;
				g2= aux;
				j= j*(-1);
			}
			
			u= u^(v<<j);
			g1= g1^(g2<<j);
		}
	}
	else
	{
		g1= 0;
	}
	
	return g1;
}

function sleepInversoGF(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}