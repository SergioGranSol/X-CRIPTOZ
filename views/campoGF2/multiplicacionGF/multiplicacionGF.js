var velocidadAnimacionOperacionMultiplicacionEF= 1;
var seguirCalculandoOMEF= true;

function mostrarOperacionMultiplicacionEF()
{	
	$("#panelInteractivo-operacionMultiplicacionEF").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelOperacionMultiplicacionEF(){
	seguirCalculandoOMEF= false;

	$("#panelInteractivo-operacionMultiplicacionEF").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelOperacionMultiplicacionEF();

	$("#btn-velocidadOMEF").show();
	$("#btnCalcularOMEF").show();
	$("#btnCancelarOMEF").hide();

	$("#aOperacionMultiplicacionEF-error").remove();
	$("#aOperacionMultiplicacionEF").removeClass('input-error');
	$("#bOperacionMultiplicacionEF-error").remove();
	$("#bOperacionMultiplicacionEF").removeClass('input-error');

	$("#aOperacionMultiplicacionEF").val("1");
	$("#bOperacionMultiplicacionEF").val("1");
}

function limpiaPanelOperacionMultiplicacionEF()
{	
	$("#seccionOMEF").show();
		if($('#informacion1OMEF').is(':visible'))
		{
			$("#informacion1OMEF").slideToggle(500);
		}
		
		$("#informacion1OMEF").empty();
		$("#representacionPolinomialAOMEF").empty();
		$("#operadorOMEF").empty();
		$("#representacionPolinomialBOMEF").empty();
		$("#representacionPolinomialROMEF").empty();
		$("#representacionBinariaROMEF").empty();
		
		$("#seccionOMEF").hide();

	$("#resultadoOMEF").val("");

	$("#aOperacionMultiplicacionEF").val("");
	$("#bOperacionMultiplicacionEF").val("");
}

function obtenervelocidadAnimacionOperacionMultiplicacionEF()
{
	if($('#btnCalcularOMEF').val() == 1)
	{
		velocidadAnimacionOperacionMultiplicacionEF = 0.5;
	}
	else
	{
		velocidadAnimacionOperacionMultiplicacionEF = 1;
	}

	$("#btn-velocidadOMEF").hide();
	$("#btnCalcularOMEF").hide();
	$("#btnCancelarOMEF").show();
	seguirCalculandoOMEF= true;
}

async function realizarOperacionMultiplicacionEF()
{
	var inputA= document.getElementById("aOperacionMultiplicacionEF");
	var numeroA= parseInt(inputA.value);

	var inputB= document.getElementById("bOperacionMultiplicacionEF");
	var numeroB= parseInt(inputB.value);

	var numeroR;

	var i, contadorExponente= 0, repPolinomialA= "", repPolinomialB= "", repPolinomialR= "", bandera= 1, repBinariaR= "", j, k, l, contadorElementosA= 0, contadorElementosB= 0, contadorElementosCalculados= 0, corrimiento= 1;

	var labelsPolinomioA= [], labelsPolinomioB= [], labelsPolinomioR= [], labelsBinarioR= [];

	limpiaPanelOperacionMultiplicacionEF();
	obtenervelocidadAnimacionOperacionMultiplicacionEF();

	$("#aOperacionMultiplicacionEF").val(numeroA);
	$("#bOperacionMultiplicacionEF").val(numeroB);

	var representacionPolinomialAOMEF= document.getElementById("representacionPolinomialAOMEF");
	var operadorOMEF= document.getElementById("operadorOMEF");
	var representacionPolinomialBOMEF= document.getElementById("representacionPolinomialBOMEF");
	var representacionPolinomialROMEF= document.getElementById("representacionPolinomialROMEF");
	var representacionBinariaROMEF= document.getElementById("representacionBinariaROMEF");

	$("#seccionOMEF").show();

	$("#informacion1OMEF").append("Obtenemos la representación polinomial de los números dados:");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(1500);

	if(!seguirCalculandoOMEF){ return; }

	for(i=1; i<256; i=i<<1)
	{
		var elementoPolinomial= document.createElement("label");
		if(!seguirCalculandoOMEF){ return; }

		if(numeroA==0)
		{
			elementoPolinomial.innerHTML= "0";
			representacionPolinomialAOMEF.appendChild(elementoPolinomial);
			i= 256;
		}
		else
		{
			if(i&numeroA)
			{
				elementoPolinomial.id= "x-"+contadorExponente;

				if(contadorExponente==0)
				{
					elementoPolinomial.innerHTML= "1";

					if(bandera==1)
					{
						representacionPolinomialAOMEF.appendChild(elementoPolinomial);
						bandera= 0;
					}
				}
				else if(contadorExponente==1)
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x";
						representacionPolinomialAOMEF.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x +";
						representacionPolinomialAOMEF.insertAdjacentHTML('afterbegin', " ");
						representacionPolinomialAOMEF.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}
				else
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup>";
						representacionPolinomialAOMEF.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup> +";
						representacionPolinomialAOMEF.insertAdjacentHTML('afterbegin', " ");
						representacionPolinomialAOMEF.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}

				contadorElementosA++;
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

	var labelOperador= document.createElement("label");
	labelOperador.innerHTML= "* ";
	operadorOMEF.appendChild(labelOperador);

	for(i=1; i<256; i=i<<1)
	{
		var elementoPolinomial= document.createElement("label");
		if(!seguirCalculandoOMEF){ return; }

		if(numeroB==0)
		{
			elementoPolinomial.innerHTML= "0";
			representacionPolinomialBOMEF.appendChild(elementoPolinomial);
			i= 256;
		}
		else
		{
			if(i&numeroB)
			{
				elementoPolinomial.id= "x-"+contadorExponente;

				if(contadorExponente==0)
				{
					elementoPolinomial.innerHTML= "1";

					if(bandera==1)
					{
						representacionPolinomialBOMEF.appendChild(elementoPolinomial);
						bandera= 0;
					}
				}
				else if(contadorExponente==1)
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x";
						representacionPolinomialBOMEF.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x +";
						representacionPolinomialBOMEF.insertAdjacentHTML('afterbegin', " ");
						representacionPolinomialBOMEF.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}
				else
				{
					if(bandera==1)
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup>";
						representacionPolinomialBOMEF.appendChild(elementoPolinomial);
						bandera= 0;
					}
					else
					{
						elementoPolinomial.innerHTML= "x<sup>"+contadorExponente+"</sup> +";
						representacionPolinomialBOMEF.insertAdjacentHTML('afterbegin', " ");
						representacionPolinomialBOMEF.insertAdjacentElement('afterbegin', elementoPolinomial);
					}
				}

				contadorElementosB++;
			}
			else
			{
				elementoPolinomial.innerHTML= "";
			}
		}

		labelsPolinomioB.push(elementoPolinomial);

		contadorExponente++;
	}

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("La multiplicación de polinomios se realiza de forma tradicional pero, para este caso, hay que tomar en cuenta 2 cosas.");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(3750);

	if(!seguirCalculandoOMEF){ return; }

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("La primera es que al igual que en la suma, el par de términos que se repitan en el resultado hay que eliminarlos.");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(4000);

	if(!seguirCalculandoOMEF){ return; }

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("La segunda es que el grado más grande del polinomio debe ser 7 por lo que si un término tiene un grado mayor habrá que hacer uso del polinomio irreducible para GF(2<sup>8</sup>).");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(7500);

	if(!seguirCalculandoOMEF){ return; }

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("Cada x<sup>8</sup> que este en el resultado se sustituirá por lo siguiente: x<sup>4</sup>+x<sup>3</sup>+x+1. Los valores anteriores formar parte del polinomio irreducible para GF(2<sup>8</sup>) y ésta es su forma completa: P(x)= x<sup>8</sup>+x<sup>4</sup>+x<sup>3</sup>+x+1");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(12250);

	if(!seguirCalculandoOMEF){ return; }

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("Si el exponente de un término es mayor a 8 hacemos lo siguiente: x<sup>10</sup>= x<sup>2</sup>x<sup>8</sup>= x<sup>2</sup>(x<sup>4</sup>+x<sup>3</sup>+x+1)= x<sup>6</sup>+x<sup>5</sup>+x<sup>3</sup>+x<sup>2</sup>");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(8250);

	if(!seguirCalculandoOMEF){ return; }

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("A continuación se realizará la multiplicación:");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(2000);

	if(!seguirCalculandoOMEF){ return; }

	//SOLAMENTE GUARDAR LOS LABELS QUE SI TENGAN POTENCIA---------------------------------------------------------------------------------------------------------------

	if(numeroA!=0&&numeroB!=0)
	{
		for(i= 0; i<labelsPolinomioA.length; i++)
		{
			if(!seguirCalculandoOMEF){ return; }
			var exponteA, temp= [];
			
			if(labelsPolinomioA[7-i].id.length!=0)
			{
				temp= labelsPolinomioA[7-i].id.split("-");
				exponteA= parseInt(temp[1]);

				if(parseInt(contadorElementosA)+parseInt(contadorElementosB)>6)
				{
					contadorElementosCalculados++;

					if(contadorElementosCalculados==2)
					{
						velocidadAnimacionOperacionMultiplicacionEF= 0;
					}
				}

				labelsPolinomioA[7-i].style.backgroundColor= "#FDFD96";
				await sleepMultiplicacionGF(250*velocidadAnimacionOperacionMultiplicacionEF);

				if(!seguirCalculandoOMEF){ return; }

				for(j= 0; j<labelsPolinomioB.length; j++)
				{
					var exponteB, temp2= [];

					if(labelsPolinomioB[7-j].id.length!=0)
					{
						var temp2= labelsPolinomioB[7-j].id.split("-");
						exponteB= parseInt(temp2[1]);
						var exponteR= parseInt(exponteA)+parseInt(exponteB);

						var elementoPolinomial= document.createElement("label");

						labelsPolinomioB[7-j].style.backgroundColor= "#FDFD96";
						await sleepMultiplicacionGF(250*velocidadAnimacionOperacionMultiplicacionEF);

						if(!seguirCalculandoOMEF){ return; }

						if(representacionPolinomialROMEF.childNodes.length>0)
						{
							var operadorPolinomial= document.createElement("label");
							operadorPolinomial.innerHTML= " + ";

							representacionPolinomialROMEF.appendChild(operadorPolinomial);						
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

						representacionPolinomialROMEF.appendChild(elementoPolinomial);

						elementoPolinomial.style.backgroundColor= "#77DD77";
						await sleepMultiplicacionGF(750*velocidadAnimacionOperacionMultiplicacionEF);

						if(!seguirCalculandoOMEF){ return; }

						for(k= 0; k<representacionPolinomialROMEF.childNodes.length; k++)
						{
							var elementoResultado= representacionPolinomialROMEF.childNodes[k];

							if(elementoResultado.id.length!=0 && parseInt(elementoResultado.id)>7)
							{
								elementoResultado.style.backgroundColor= "#ADD8E6";
								await sleepMultiplicacionGF(250*velocidadAnimacionOperacionMultiplicacionEF);

								if(!seguirCalculandoOMEF){ return; }
								
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
									representacionPolinomialROMEF.insertBefore(elementoPrimerModulo, elementoResultado.nextSibling);
									representacionPolinomialROMEF.insertBefore(operadorPolinomial2, elementoPrimerModulo.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoSegundoModulo, operadorPolinomial2.nextSibling);
									representacionPolinomialROMEF.insertBefore(operadorPolinomial3, elementoSegundoModulo.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoTercerModulo, operadorPolinomial3.nextSibling);
									representacionPolinomialROMEF.insertBefore(operadorPolinomial4, elementoTercerModulo.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoCuartoModulo, operadorPolinomial4.nextSibling);

									elementoResultado.remove();

									await sleepMultiplicacionGF(1000*velocidadAnimacionOperacionMultiplicacionEF);

									if(!seguirCalculandoOMEF){ return; }
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

									representacionPolinomialROMEF.insertBefore(elementoParentesisAbertura, elementoResultado.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoPrimerModulo, elementoParentesisAbertura.nextSibling);
									representacionPolinomialROMEF.insertBefore(operadorPolinomial2, elementoPrimerModulo.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoSegundoModulo, operadorPolinomial2.nextSibling);
									representacionPolinomialROMEF.insertBefore(operadorPolinomial3, elementoSegundoModulo.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoTercerModulo, operadorPolinomial3.nextSibling);
									representacionPolinomialROMEF.insertBefore(operadorPolinomial4, elementoTercerModulo.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoCuartoModulo, operadorPolinomial4.nextSibling);
									representacionPolinomialROMEF.insertBefore(elementoParentesisCierre, elementoCuartoModulo.nextSibling);

									await sleepMultiplicacionGF(1000*velocidadAnimacionOperacionMultiplicacionEF);

									if(!seguirCalculandoOMEF){ return; }

									elementoResultado.style.backgroundColor= "#E0FFFF";
									await sleepMultiplicacionGF(250*velocidadAnimacionOperacionMultiplicacionEF);

									if(!seguirCalculandoOMEF){ return; }

									for(l= k+2; l<k+9; l++)
									{
										var elementoModuloActual= representacionPolinomialROMEF.childNodes[l];

										if(elementoModuloActual.id.length!=0)
										{
											var exponenteActual= parseInt(elementoModuloActual.id);

											elementoModuloActual.style.backgroundColor= "#E0FFFF";
											await sleepMultiplicacionGF(250*velocidadAnimacionOperacionMultiplicacionEF);

											if(!seguirCalculandoOMEF){ return; }

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

											await sleepMultiplicacionGF(750*velocidadAnimacionOperacionMultiplicacionEF);

											if(!seguirCalculandoOMEF){ return; }

											elementoModuloActual.style.backgroundColor= "#ADD8E6";
											await sleepMultiplicacionGF(25*velocidadAnimacionOperacionMultiplicacionEF);
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

								await sleepMultiplicacionGF(500*velocidadAnimacionOperacionMultiplicacionEF);

								if(!seguirCalculandoOMEF){ return; }						

								k= -1;
							}
						}

						elementoPolinomial.style.backgroundColor= "transparent";
						await sleepMultiplicacionGF(500*velocidadAnimacionOperacionMultiplicacionEF);

						if(!seguirCalculandoOMEF){ return; }

						//ELIMINAR REPETIDOS

						for(k= 0; k<representacionPolinomialROMEF.childNodes.length; k++)
						{
							var elementoA= representacionPolinomialROMEF.childNodes[k];

							if(elementoA.id.length!=0)
							{
								for(l= k+1; l<representacionPolinomialROMEF.childNodes.length; l++)
								{
									var elementoB= representacionPolinomialROMEF.childNodes[l];

									if(elementoB.id.length!=0)
									{
										if(elementoA.id==elementoB.id)
										{
											elementoA.style.backgroundColor= "#FF6961";
											elementoB.style.backgroundColor= "#FF6961";

											await sleepMultiplicacionGF(750*velocidadAnimacionOIMEF);

											if(!seguirCalculandoOIMEF){ return; }

											if(k+1==l-1)
											{
												if(l==representacionPolinomialROMEF.childNodes.length-1&&k==0)
												{
													var op1;
													op1= representacionPolinomialROMEF.childNodes[k+1];
													
													op1.remove();
												}
												else if(l==representacionPolinomialROMEF.childNodes.length-1)
												{
													var op1, op2;
													op1= representacionPolinomialROMEF.childNodes[k+1];
													op2= representacionPolinomialROMEF.childNodes[k-1];
													
													op1.remove();
													op2.remove();
												}
												else
												{
													var op1, op2;							
													op1= representacionPolinomialROMEF.childNodes[k+1];
													op2= representacionPolinomialROMEF.childNodes[l+1];
													
													op1.remove();
													op2.remove();
												}
											}
											else
											{
												if(l==representacionPolinomialROMEF.childNodes.length-1)
												{
													var op1, op2;							
													op1= representacionPolinomialROMEF.childNodes[k+1];
													op2= representacionPolinomialROMEF.childNodes[l-1];
													
													op1.remove();
													op2.remove();
												}
												else
												{
													var op1, op2;							
													op1= representacionPolinomialROMEF.childNodes[k+1];
													op2= representacionPolinomialROMEF.childNodes[l+1];
													
													op1.remove();
													op2.remove();
												}					
											}
											
											elementoA.remove();
											elementoB.remove();

											l= representacionPolinomialROMEF.childNodes.length;
											k= -1;
										}
									}
								}
							}
						}

						labelsPolinomioB[7-j].style.backgroundColor= "transparent";
						await sleepMultiplicacionGF(25*velocidadAnimacionOperacionMultiplicacionEF);
					}
				}

				labelsPolinomioA[7-i].style.backgroundColor= "transparent";
				await sleepMultiplicacionGF(25*velocidadAnimacionOperacionMultiplicacionEF);
			}
		}
	}
	else
	{
		var operador= document.createElement("label");
		operador.innerHTML= "0";
		representacionPolinomialROMEF.appendChild(operador);
	}

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("Es importante no confundir la multiplicación en GF(2<sup>8</sup>) con la multiplicación aritmética tradicional ya que no son lo mismo.");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(4000);

	if(!seguirCalculandoOMEF){ return; }

	$("#informacion1OMEF").slideToggle(250);
	await sleepMultiplicacionGF(250);
	$("#informacion1OMEF").empty();

	$("#informacion1OMEF").append("Convertimos el polinomio obtenido a su notación binaria y por lo tanto el resultado es:");
	$("#informacion1OMEF").slideToggle(500);
	await sleepMultiplicacionGF(2750);

	if(!seguirCalculandoOMEF){ return; }

	numeroR= 0;

	for(i= 0; i<representacionPolinomialROMEF.childNodes.length; i++)
	{
		var elemento= representacionPolinomialROMEF.childNodes[i];

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

	representacionBinariaROMEF.appendChild(elementoBinario);

	$("#btn-velocidadOMEF").show();
	$("#btnCalcularOMEF").show();
	$("#btnCancelarOMEF").hide();
				
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_72);
	$("#resultadoOMEF").val(numeroR);
}

function validarNumeroAOMEF()
{
	var mensaje = "";	
	var valorA= $('#aOperacionMultiplicacionEF').val();
	
	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_87;
	}	

	return mensaje;
}

function validarNumeroBOMEF()
{
	var mensaje = "";	
	var valorB= $('#bOperacionMultiplicacionEF').val();
	
	if (Number(valorB)<0 || Number(valorB)>255 || valorB.length == 0 || valorB.includes("."))
	{
		mensaje = mensaje_88;
	}	

	return mensaje;
}

$(document).ready(function()
{
	$("#CalcularRapidoOMEF").click(function(){
		$("#btnCalcularOMEF").html('Calcular Rápido');
		$("#btnCalcularOMEF").val(1);
	});
	$("#CalcularNormalOMEF").click(function(){
		$("#btnCalcularOMEF").html('Calcular Normal');
		$("#btnCalcularOMEF").val(2);
	});

	$("#btnCalcularOMEF").click(function()
	{
		var mensaje= validarNumeroAOMEF();
		var mensaje2= validarNumeroBOMEF();

		if(mensaje.length!=0)
		{
			$("#aOperacionMultiplicacionEF-error").remove();
			$("#aOperacionMultiplicacionEF").parent().append('<div id="aOperacionMultiplicacionEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOperacionMultiplicacionEF").addClass('input-error');
			//$("#btnCalcularOMEF").attr("disabled", true);
		}
		if(mensaje2.length!=0)
		{
			$("#bOperacionMultiplicacionEF-error").remove();
			$("#bOperacionMultiplicacionEF").parent().parent().append('<div id="bOperacionMultiplicacionEF-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#bOperacionMultiplicacionEF").addClass('input-error');
			//$("#btnCalcularOMEF").attr("disabled", true);
		}
		if(mensaje.length == 0 && mensaje2.length == 0)
		{
			realizarOperacionMultiplicacionEF();
		}
	});

	$("#btnCancelarOMEF").click(function()
	{
		seguirCalculandoOMEF= false;
		
		limpiaPanelOperacionMultiplicacionEF();

		$("#btn-velocidadOMEF").show();
		$("#btnCalcularOMEF").show();
		$("#btnCancelarOMEF").hide();
	});

	$("#aOperacionMultiplicacionEF").on('click change keyup', function() {
		var mensaje = validarNumeroAOMEF();
		var mensaje2= validarNumeroBOMEF();

		if (mensaje.length != 0) 
		{
			$("#aOperacionMultiplicacionEF-error").remove();
			$("#aOperacionMultiplicacionEF").parent().append('<div id="aOperacionMultiplicacionEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOperacionMultiplicacionEF").addClass('input-error');
			//$("#btnCalcularOMEF").attr("disabled", true);
		}
		else
		{
			$("#aOperacionMultiplicacionEF-error").remove();
			$("#aOperacionMultiplicacionEF").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOMEF").attr("disabled", false);
			}
		}
	});

	$("#bOperacionMultiplicacionEF").on('click change keyup', function() {
		var mensaje = validarNumeroBOMEF();
		var mensaje2 = validarNumeroAOMEF();

		if (mensaje.length != 0) 
		{
			$("#bOperacionMultiplicacionEF-error").remove();
			$("#bOperacionMultiplicacionEF").parent().parent().append('<div id="bOperacionMultiplicacionEF-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOperacionMultiplicacionEF").addClass('input-error');
			//$("#btnCalcularOMEF").attr("disabled", true);
		}
		else
		{
			$("#bOperacionMultiplicacionEF-error").remove();
			$("#bOperacionMultiplicacionEF").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOMEF").attr("disabled", false);
			}
		}
	});

	//Funciones calculadora
	$("#aOMGFC").keyup(function()
	{
		var mensaje = validarNumeroAOMGFC();
		var mensaje2= validarNumeroBOMGFC();

		if (mensaje.length != 0) 
		{
			$("#aOMGFC-error").remove();
			$("#aOMGFC").parent().append('<div id="aOMGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#aOMGFC").addClass('input-error');
			//$("#btnCalcularOMGFC").attr("disabled", true);
		}
		else
		{
			$("#aOMGFC-error").remove();
			$("#aOMGFC").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOMGFC").attr("disabled", false);
			}
		}
	});

	$("#bOMGFC").keyup(function()
	{
		var mensaje = validarNumeroBOMGFC();
		var mensaje2= validarNumeroAOMGFC();

		if (mensaje.length != 0) 
		{
			$("#bOMGFC-error").remove();
			$("#bOMGFC").parent().append('<div id="bOMGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOMGFC").addClass('input-error');
			//$("#btnCalcularOMGFC").attr("disabled", true);
		}
		else
		{
			$("#bOMGFC-error").remove();
			$("#bOMGFC").removeClass('input-error');
			
			if(mensaje2.length==0)
			{
				$("#btnCalcularOMGFC").attr("disabled", false);
			}
		}
	});

	$("#btnCalcularOMGFC").click(function()
	{
		var mensaje = validarNumeroBOMGFC();
		var mensaje2= validarNumeroAOMGFC();

		if (mensaje2.length != 0) 
		{
			$("#aOMGFC-error").remove();
			$("#aOMGFC").parent().append('<div id="aOMGFC-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#aOMGFC").addClass('input-error');
			//$("#btnCalcularOMGFC").attr("disabled", true);
		}
		else
		{
			$("#aOMGFC-error").remove();
			$("#aOMGFC").removeClass('input-error');

			if(mensaje2.length==0)
			{
				$("#btnCalcularOMGFC").attr("disabled", false);
			}
		}

		if (mensaje.length != 0) 
		{
			$("#bOMGFC-error").remove();
			$("#bOMGFC").parent().append('<div id="bOMGFC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#bOMGFC").addClass('input-error');
			//$("#btnCalcularOMGFC").attr("disabled", true);
		}
		else
		{
			$("#bOMGFC-error").remove();
			$("#bOMGFC").removeClass('input-error');
			
			if(mensaje.length==0)
			{
				$("#btnCalcularOMGFC").attr("disabled", false);
			}
		}

		if (mensaje.length == 0 && mensaje2.length == 0) {
			var resultado= multiplicarOMGFC();

			$("#ResultadoOMGFC").val(resultado);
		}
	});

});

//Funciones calculadora
function validarNumeroAOMGFC()
{
	var mensaje = "";	
	var valorA= $('#aOMGFC').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_87;
	}	

	return mensaje;
}

function validarNumeroBOMGFC()
{
	var mensaje = "";	
	var valorA= $('#bOMGFC').val();

	if (Number(valorA)<0 || Number(valorA)>255 || valorA.length == 0 || valorA.includes("."))
	{
		mensaje = mensaje_88;
	}	

	return mensaje;
}

function multiplicarOMGFC()
{
	var valorA= Number($('#aOMGFC').val());
	var valorB= Number($('#bOMGFC').val());
	var m= 283;
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
			
			suma= valorB;				
			
			if((valorA&x)==x)
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
			
			if((valorA&x)==x)
			{
				aux= aux^suma;
			}
		}		
				
		x= x<<1;
	}
	
	return aux;
}

function sleepMultiplicacionGF(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}