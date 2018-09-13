var tamHashSHA1= 20;
var shaSuccess = 0;
var shaNull= 1;     /* Null pointer parameter */
var shaInputTooLong= 2;    /* input data too long */
var shaStateError= 3;       /* called Input after Result */

var velocidadAnimacionCifrarECDSA= 0.1;
var seguirCifrandoECDSA= true;

var seguirVerificandoECDSA= true;
var velocidadAnimacionVerificarECDSA= 0.1;

var a= 1;
var b= 4;
var p= 23;

function generarFirmaArchivo(evt) 
{
	var fileInput = document.getElementById('fileInputECDSAGenerar');
	var fileDisplayArea = document.getElementById('fileDisplayAreaECDSAGenerar');
	var inputPK = document.getElementById('llavePrivadaArchivoECDSA');
	var inputLlavePublica= document.getElementById('llavePublicaGeneradaECDSA');
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "";
	var textoCifrado= "";
	var llavePrivada= inputPK.value;
	var puntos= [], numP, puntoGenerador= [];
	var llavePublica= [];
	var hash= [];
	var firma=[], valorHash, k, kP= [], inversoK;
	$("#progressbarECDSAGenerar").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if (llavePrivada<1 || llavePrivada>28 || llavePrivada==null)
	{
		fileDisplayArea.innerText = mensaje_68;		
	}
	else
	{
		if (file.type.match(textType))
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoPlano= reader.result;
				
				puntos= obtenerPuntosAAECDSA();	
				numP= numeroPuntosAAECDSA(puntos);
				puntoGenerador= obtenerPuntoGeneradorAAECDSA(puntos, numP);
				
				llavePublica= obtenerkPuntoAAECDSA(llavePrivada, puntoGenerador[0], puntoGenerador[1]);	
				
				/**GENERAR FIRMA***/
				
				firma.push(0);
				firma.push(0);
				
				hash= cifrarSHA1(textoPlano);	
				valorHash= obtenerValorSHA1(hash);	
				
				while(firma[1]==0)
				{
					while(firma[0]==0)
					{
						k= Math.floor((Math.random() * numP));
						k++;
						
						kP= obtenerkPuntoAAECDSA(k, puntoGenerador[0], puntoGenerador[1]);
						
						firma[0]= kP[0];
					}
					
					inversoK= inversoMultiplicativoNumeroAAECDSA(k, numP);
					
					firma[1]= ModuloAAECDSA((inversoK*(valorHash+(firma[0]*llavePrivada))), numP);
				}
				/***************/

				textoCifrado= textoPlano+"FIRMAECDSA="+firma[0]+","+firma[1];
				$('#llavePublicaGeneradaECDSA').html(llavePublica[0]+","+llavePublica[1]);
				
				fileDisplayArea.innerText= textoCifrado;
				textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
				  element.setAttribute('download', "ArchivoFirmadoECDSA.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);	
				  $("#progressbarECDSAGenerar").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');		  			 
			}

			reader.readAsText(file, 'ISO-8859-1');
		}
		else
		{
			fileDisplayArea.innerText = mensaje_89;
		}
	}	
}

function verificarFirmaArchivo(evt) 
{
	var fileInput = document.getElementById('fileInputECDSAVerificar');
	var fileDisplayArea = document.getElementById('fileDisplayAreaECDSAVerificar');
	var inputLlavePublica= document.getElementById('llavePublicaArchivoECDSA');
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "";
	var textoCifrado= "";
	var textoFirmado="";
	var textoDividido= [];
	var hash= [];
	var valorHash, w, u1, u2, u1P= [], u2PU= [], sumaP= [];
	var firma= [];
	var valorLLP= inputLlavePublica.value;
	var llavePublica= [];
	var r;
	var s;		
	var resultadoVerificacion= "";
	var puntos= [], numP, puntoGenerador= [];
	$("#progressbarECDSAVerificar").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

	if (valorLLP.length < 3 || valorLLP.length > 5)
	{
		fileDisplayArea.innerText = mensaje_70;
	}
	else if(!valorLLP.match(/^[0-9]{1,2}([,.][0-9]{1,2})?$/))
	{
		fileDisplayArea.innerText = mensaje_71;
	}
	else
	{
		if (file.type.match(textType))
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoFirmado= reader.result;						

				textoDividido= textoFirmado.split("FIRMAECDSA=");

				if(textoDividido.length==2)
				{
					textoCifrado= textoDividido[0];
					firma= textoDividido[1].split(",");

					r= parseInt(firma[0]);
					s= parseInt(firma[1]);
					console.log(firma);
					
					puntos= obtenerPuntosAAECDSA();	
					numP= numeroPuntosAAECDSA(puntos);
					puntoGenerador= obtenerPuntoGeneradorAAECDSA(puntos, numP);

					llavePublica= valorLLP.split(",");
					
					llavePublica[0]= parseInt(llavePublica[0]);
					llavePublica[1]= parseInt(llavePublica[1]);	

					if(r<1||r>(numP-1))
					{
						resultadoVerificacion= mensaje_119;
					}
					else if(s<1||s>(numP-1))
					{
						resultadoVerificacion= mensaje_119;
					}
					else
					{
						hash= cifrarSHA1(textoCifrado);	
						valorHash= obtenerValorSHA1(hash);			
						
						w= inversoMultiplicativoNumeroAAECDSA(s, numP);		
						
						u1= ModuloAAECDSA((valorHash*w), numP);
						if(u1!=0)
						{
							u2= ModuloAAECDSA((r*w), numP);

							u1P= obtenerkPuntoAAECDSA(u1, puntoGenerador[0], puntoGenerador[1]);
							u2PU= obtenerkPuntoAAECDSA(u2, llavePublica[0], llavePublica[1]);
							sumaP= sumaPuntosAAECDSA(u1P[0], u1P[1], u2PU[0], u2PU[1]);							
							
							if(sumaP[0]!=r)
							{
								resultadoVerificacion= mensaje_119;
							}
							else
							{
								resultadoVerificacion= mensaje_118;
							}
						}
						else
						{
							resultadoVerificacion= mensaje_121;
						}
					}
				}
				else
				{
					resultadoVerificacion= mensaje_122;
				}
				
				
				fileDisplayArea.innerText= resultadoVerificacion;
				textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
				element.setAttribute('download', "ArchivoVerificadoECDSA.txt");

				element.style.display = 'none';
				document.body.appendChild(element);

				element.click();

				document.body.removeChild(element);	
				$("#progressbarECDSAVerificar").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');		  			 
			}

			reader.readAsText(file, 'ISO-8859-1');
		}
		else
		{
			fileDisplayArea.innerText = mensaje_89;
		}
	}
}

/****************************************************************FUNCIONES ECDSA*************************************************************/

function obtenerInversoMultiplicativoPolinomiosAAECDSA(a, m)
{
	var u= a, v= m, g1= 1, g2= 0, j, aux;
	
	while(u!=1)
	{
		j= obtenerGradoAAECDSAAAECDSA(u)-obtenerGradoAAECDSAAAECDSA(v);
		
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
	
	return g1;
}

function obtenerGradoAAECDSAAAECDSA(a)
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

function multiplicarPolinomiosAAECDSA(p, q, m)
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

function inversoMultiplicativoNumeroAAECDSA(num, n)
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
			return ModuloAAECDSA(x1, n);
		}
	}
}

function ModuloAAECDSA(num, m)
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

function exponenciacionModularAAECDSA(exponente, m, num)
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
	
	aux= ModuloAAECDSA(aux, m);
	
	return aux;
}

function obtenerResiduosCuadraticosAAECDSA() //Devuelve un par 1^2 mod 7= 1 (1,1) -- 2^2 mod 7= 4 (2, 4)
{
	var residuosCuadraticos=[], i, valor;
			
	residuosCuadraticos.push(1);	
	residuosCuadraticos.push(1);	
	
	for(i=2; i<p; i++)
	{
		valor= exponenciacionModularAAECDSA(2, p, i);			
		
		residuosCuadraticos.push(i);		
		residuosCuadraticos.push(valor);
	}	
		
	residuosCuadraticos.push(-1);
	residuosCuadraticos.push(-1);	
	
	return residuosCuadraticos;
}

function obtenerPuntosAAECDSA()
{
	var puntos= [], residuosCuadraticos= [], i, valor, j;
	
	residuosCuadraticos= obtenerResiduosCuadraticosAAECDSA();
	
	for(i=0; i<p; i++)
	{
		valor= exponenciacionModularAAECDSA(3, p, i) + (a*i) + b;
		valor= ModuloAAECDSA(valor, p);
		
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

function sumaPuntosAAECDSA(x1, y1, x2, y2)
{
	var puntoCalculado= [], x1Cuadrada, multiplicativoInverso, aux, aux2;
		
	puntoCalculado.push(-1);
	puntoCalculado.push(-1);	
	
	if(x1==x2&&y1==y2) //Fórmula para puntos Iguales
	{
		x1Cuadrada= ModuloAAECDSA(exponenciacionModularAAECDSA(2, p, x1), p);		
		aux= ModuloAAECDSA((2*y1), p);		
		multiplicativoInverso= inversoMultiplicativoNumeroAAECDSA(aux, p);
		
		if(multiplicativoInverso!=-1)
		{
			aux2= ModuloAAECDSA(((3*x1Cuadrada+a)*multiplicativoInverso), p);
			puntoCalculado[0]= ModuloAAECDSA(exponenciacionModularAAECDSA(2, p, aux2), p);
			puntoCalculado[0]= puntoCalculado[0]-ModuloAAECDSA((2*x1), p);
			puntoCalculado[0]= ModuloAAECDSA(puntoCalculado[0], p);
			
			puntoCalculado[1]= aux2*ModuloAAECDSA((x1-puntoCalculado[0]), p)-y1;
			puntoCalculado[1]= ModuloAAECDSA(puntoCalculado[1], p);
		}
	}
	else //Fórmula para puntos Diferentes
	{
		aux= ModuloAAECDSA((x2-x1), p);
		multiplicativoInverso= inversoMultiplicativoNumeroAAECDSA(aux, p);		
		
		if(multiplicativoInverso!=-1)
		{
			aux2= ModuloAAECDSA((y2-y1), p)*multiplicativoInverso;
			aux2= ModuloAAECDSA(aux2, p);
			puntoCalculado[0]= ModuloAAECDSA(exponenciacionModularAAECDSA(2, p, aux2), p);
			puntoCalculado[0]= puntoCalculado[0]-x1-x2;
			puntoCalculado[0]= ModuloAAECDSA(puntoCalculado[0], p);
			
			puntoCalculado[1]= aux2*ModuloAAECDSA((x1-puntoCalculado[0]), p)- y1;
			puntoCalculado[1]= ModuloAAECDSA(puntoCalculado[1], p);
		}
	}
	
	return puntoCalculado;
}

function numeroPuntosAAECDSA(puntos)
{
	var numeroP= 0, i;
	
	for(i=0; puntos[i]!=-100; i=i+2)
	{
		numeroP++;
	}
	
	return numeroP+1;
}

function obtenerPuntoGeneradorAAECDSA(puntos, numeroPuntosAAECDSA)
{
	var i, puntoGenerador= [], j, aux= [], k;
		
	puntoGenerador.push(-1);
	puntoGenerador.push(-1);
	
	for(i=0; i<numeroPuntosAAECDSA-1; i++)
	{		
		puntoGenerador[0]= puntos[i*2];
		puntoGenerador[1]= puntos[(i*2)+1];			
		
		for(j=0; j<numeroPuntosAAECDSA-2; j++)
		{
			if(j==0)
			{
				aux= sumaPuntosAAECDSA(puntoGenerador[0], puntoGenerador[1], puntoGenerador[0], puntoGenerador[1]);				
				
				for(k=0; k<numeroPuntosAAECDSA-1; k++)
				{
					if(aux[0]==puntos[k*2]&&aux[1]==puntos[(k*2)+1])
					{						
						k= numeroPuntosAAECDSA;						
					}
					else if(k+1==numeroPuntosAAECDSA-1)
					{
						puntoGenerador[0]= -1;
						puntoGenerador[1]= -1;
						j= numeroPuntosAAECDSA;
					}
				}
			}
			else
			{				
				aux= sumaPuntosAAECDSA(puntoGenerador[0], puntoGenerador[1], aux[0], aux[1]);				
				
				for(k=0; k<numeroPuntosAAECDSA-1; k++)
				{
					if(aux[0]==puntos[k*2]&&aux[1]==puntos[(k*2)+1])
					{
						k= numeroPuntosAAECDSA;
						if(j+1==numeroPuntosAAECDSA-2)
						{
							i= numeroPuntosAAECDSA;
						}
					}
					else if(k+1==numeroPuntosAAECDSA-1)
					{
						puntoGenerador[0]= -1;
						puntoGenerador[1]= -1;
						j= numeroPuntosAAECDSA;
					}
				}
			}
		}
	}	
	
	return puntoGenerador;
}

function obtenerkPuntoAAECDSA(k, x, y)
{
	var i, kPunto= [], aux= [];
	
	kPunto.push(x);
	kPunto.push(y);
	
	for(i=1; i<k; i++)
	{		
		if(i==1)
		{
			aux= sumaPuntosAAECDSA(x,y,x,y);			
		}
		else
		{
			aux= sumaPuntosAAECDSA(x,y,aux[0],aux[1]);			
		}		
	}
	
	if(k!=1) //Si no pidieron multiplicar el punto por 1
	{
		kPunto[0]= aux[0];
		kPunto[1]= aux[1];		
	}
	
	return kPunto;
}

function generarLlavesAAECDSA(numP, x1, y1, llavePrivada, llavePublica)
{	
	var LLP= [];
		
	llavePrivada.valor= Math.floor((Math.random() * numP));	
	
	llavePrivada.valor= llavePrivada.valor+1;	
	
	LLP= obtenerkPuntoAAECDSA(llavePrivada.valor, x1, y1);	
	
	llavePublica[0]= LLP[0];
	llavePublica[1]= LLP[1];
	
	return;
}

function generarFirma(llavePrivada, x1, y1, texto, numP)
{
	var hash= [];
	var firma=[], valorHash, k, kP= [], inversoK;	
	
	firma.push(0);
	firma.push(0);
	
	hash= cifrarSHA1(texto);	
	valorHash= obtenerValorSHA1(hash);	
	
	while(firma[1]==0)
	{
		while(firma[0]==0)
		{
			k= Math.floor((Math.random() * numP));
			k++;
			
			kP= obtenerkPuntoAAECDSA(k, x1, y1);
			
			firma[0]= kP[0];
		}
		
		inversoK= inversoMultiplicativoNumeroAAECDSA(k, numP);
		
		firma[1]= ModuloAAECDSA((inversoK*(valorHash+(firma[0]*llavePrivada))), numP);
	}	
	
	return firma;
}

async function firmarECDSA()
{
	var puntos= [], numP, puntoGenerador= [];
	var llavePublica= [];
	
	var mensaje = ($("#textoMensajePlanoECDSACifrado").val()).split("");
	var llavePrivada= ($("#ECDSApK")).val();
	
	var hash= [];
	var firma=[], valorHash, k, kP= [], inversoK;
	
	/***/
	obtenerVelocidadAnimacionECDSACifrar();
	limpiaPanelECDSACifrado();
	/***/
	
	puntos= obtenerPuntosAAECDSA();
	console.log(puntos);
	numP= numeroPuntosAAECDSA(puntos);
	console.log(numP);
	puntoGenerador= obtenerPuntoGeneradorAAECDSA(puntos, numP);
	
	llavePublica= obtenerkPuntoAAECDSA(llavePrivada, puntoGenerador[0], puntoGenerador[1]);	
	
	if(!seguirCifrandoECDSA){ return; }
	
	/**GENERAR FIRMA***/
	
	firma.push(0);
	firma.push(0);
	
	hash= cifrarSHA1(mensaje);	
	valorHash= obtenerValorSHA1(hash);	
	
	while(firma[1]==0)
	{
		while(firma[0]==0)
		{
			k= Math.floor((Math.random() * numP));
			k++;
			
			kP= obtenerkPuntoAAECDSA(k, puntoGenerador[0], puntoGenerador[1]);
			
			firma[0]= kP[0];
		}
		
		inversoK= inversoMultiplicativoNumeroAAECDSA(k, numP);
		
		firma[1]= ModuloAAECDSA((inversoK*(valorHash+(firma[0]*llavePrivada))), numP);
	}
	/***************/
	
	if(!seguirCifrandoECDSA){ return; }	
	
	/*******************************************************GENERACION LLAVES************************************************************/
	$("#seccionGeneracionLlaves").show();
	
	$("#informacionECDSAC1").append("Es importante mencionar que la curva elíptica con la que se trabajará así como otros datos relacionados al algoritmo son explicados en la teoría.");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(4750);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC1").empty();
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").append("La primer parte para generar la firma del mensaje es la generación de la llave pública y la privada.");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(3750);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC1").empty();
	
	$("#informacionECDSAC1").append("La curva elíptica con la que se trabajará es la siguiente:");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(1750);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGeneracionLlaves").append('<label class="circulo">E: y<sup>2</sup>= x<sup>3</sup> + x + 4 mod 23</label>');
	await sleepFirmaECDSA(4000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").slideToggle(250);
	$("#textoSeccionGeneracionLlaves").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC1").empty();
	$("#textoSeccionGeneracionLlaves").empty();
	
	$("#informacionECDSAC1").append("El siguiente paso es elegir un punto generador que pertenezca a la curva. Dado que el orden de la curva es 29, el cual es primo, la curva es cíclica y cualquier punto genera a los demás del grupo, el punto elegido es:");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(10000);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGeneracionLlaves").append('<label class="circulo">PG= (0,2)</label>');
	$("#textoSeccionGeneracionLlaves").slideToggle(500);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").slideToggle(250);
	$("#textoSeccionGeneracionLlaves").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC1").empty();
	$("#textoSeccionGeneracionLlaves").empty();
	
	$("#informacionECDSAC1").append("Ahora se elige un número entre [1, n-1] = [1, 28], donde 'n' es el orden de la curva, el cual ya fue proporcionado y se usará como la llave privada:");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(6250);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGeneracionLlaves").append('<label class="circulo">Llave Privada= '+ llavePrivada +'</label>');
	$("#textoSeccionGeneracionLlaves").slideToggle(500);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").slideToggle(250);
	$("#textoSeccionGeneracionLlaves").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC1").empty();
	$("#textoSeccionGeneracionLlaves").empty();
	
	$("#informacionECDSAC1").append("Se realiza lo operación doblado de punto con la llave privada y el punto generador para obtener la llave pública:");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(3750);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGeneracionLlaves").append('<label id="obtenerQ" class="circulo">Llave Pública= Llave Privada*PG</label>');
	$("#textoSeccionGeneracionLlaves").slideToggle(500);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerQ").html("Llave Pública= "+ llavePrivada +"*("+puntoGenerador[0]+","+puntoGenerador[1]+")");
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerQ").html("Llave Pública= ");
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerQ").html("Llave Pública= ("+ llavePublica[0] +","+ llavePublica[1] +")");
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC1").slideToggle(250);
	$("#textoSeccionGeneracionLlaves").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC1").empty();
	$("#textoSeccionGeneracionLlaves").empty();
	
	$("#informacionECDSAC1").append("Las llaves obtenidas son las siguientes:");
	$("#informacionECDSAC1").slideToggle(500);
	await sleepFirmaECDSA(1250);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGeneracionLlaves").append('<label class="circulo">Llave Privada= '+ llavePrivada +' Llave Pública= ('+ llavePublica[0] +','+ llavePublica[1] +')</label>');
	$("#textoSeccionGeneracionLlaves").slideToggle(500);
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#seccionGeneracionLlaves").hide();
	/************************************************************************************************************************************/
	
	/***********************************************************GENERAR FIRMA***************************************************************/
	$("#seccionGenerarFirma").show();	
	
	$("#informacionECDSAC2").append("Ahora se explicarán los pasos para generar la firma del mensaje.");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(1750);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC2").slideToggle(250);	
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC2").empty();	
	
	$("#informacionECDSAC2").append("1. Se selecciona un número aleatorio entre [1, n-1] = [1, 28], donde 'n' es el orden de la curva:");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(2900);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGenerarFirma").append('<label class="circulo">k= '+ k +'</label>');
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC2").slideToggle(250);
	$("#textoSeccionGenerarFirma").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC2").empty();
	$("#textoSeccionGenerarFirma").empty();
	
	$("#informacionECDSAC2").append("2. Ahora se realiza la operación doblado de punto entre 'k' y el punto generador:");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(2750);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGenerarFirma").append('<label id="obtenerkPG" class="circulo">kPG= k*PG</label>');
	$("#textoSeccionGenerarFirma").slideToggle(500);
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerkPG").html("kPG= "+ k +"*("+puntoGenerador[0] +","+ puntoGenerador[1] +")");
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerkPG").html("kPG= ");
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerkPG").html("kPG= ("+ kP[0] +","+ kP[1] +")");
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC2").slideToggle(250);
	$("#textoSeccionGenerarFirma").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC2").empty();
	$("#textoSeccionGenerarFirma").empty();
	
	$("#informacionECDSAC2").append("3. El punto obtenido en el paso anterior kPG= ("+ kP[0] +","+ kP[1] +") se puede ver como kPG= (x<sub>1</sub>, y<sub>1</sub>), por lo que ahora realizamos lo siguiente: (si 'r' es 0 se vuelve al paso 1)");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(6400);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGenerarFirma").append('<label id="obtenerR" class="circulo">r= x<sub>1</sub> mod n</label>');
	$("#textoSeccionGenerarFirma").slideToggle(500);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerR").html("r= "+kP[0]+" mod "+numP);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerR").html("r= ");
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerR").html("r= "+ModuloAAECDSA(kP[0], numP));
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC2").slideToggle(250);
	$("#textoSeccionGenerarFirma").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC2").empty();
	$("#textoSeccionGenerarFirma").empty();
	
	$("#informacionECDSAC2").append("4. Calcular (k<sup>-1</sup>) mod n, es decir el inverso multiplicativo de k:");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(3000);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGenerarFirma").append('<label id="obtenerInversoK" class="circulo">(k<sup>-1</sup>) mod n</label>');
	$("#textoSeccionGenerarFirma").slideToggle(500);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerInversoK").html(""+ k + "<sup>-1</sup> mod "+ numP);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerInversoK").html(" mod "+ numP);
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerInversoK").html(""+ inversoK + " mod "+ numP);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerInversoK").html(inversoK);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC2").slideToggle(250);
	$("#textoSeccionGenerarFirma").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC2").empty();
	$("#textoSeccionGenerarFirma").empty();
	
	$("#informacionECDSAC2").append("5. Calcular s= (k<sup>-1</sup>)(H(m) + Llave Privada*r) mod n, si s= 0 hay que regresar al primer paso, H(m) es el hash del mensaje obtenido usando SHA1 convirtiéndolo a un número:");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(9200);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGenerarFirma").append('<label id="obtenerS" class="circulo">s= (k<sup>-1</sup>)(H(m) + Llave Privada*r) mod n</label>');
	$("#textoSeccionGenerarFirma").slideToggle(500);
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerS").html("s= "+ inversoK + "("+ valorHash +" + "+ llavePrivada +"*"+ firma[0] +") mod "+ numP);
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerS").html("s= "+ inversoK + "("+ valorHash +" + ) mod "+ numP);
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerS").html("s= "+ inversoK + "("+ valorHash +" + "+  (firma[0]*llavePrivada) +") mod "+ numP);
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerS").html("s= "+ inversoK + "(  ) mod "+ numP);
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerS").html("s= "+ inversoK + "("+ (valorHash+(firma[0]*llavePrivada)) +") mod "+ numP);
	await sleepFirmaECDSA(3000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerS").html("s=  mod "+ numP);
	await sleepFirmaECDSA(500*velocidadAnimacionCifrarECDSA);
	
	$("#obtenerS").html("s= "+ (inversoK*(valorHash+(firma[0]*llavePrivada))) +" mod "+ numP);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#obtenerS").html("s= "+ firma[1]);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#informacionECDSAC2").slideToggle(250);
	$("#textoSeccionGenerarFirma").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAC2").empty();
	$("#textoSeccionGenerarFirma").empty();
	
	$("#informacionECDSAC2").append("Los valores de r y s son la firma obtenida.");
	$("#informacionECDSAC2").slideToggle(500);
	await sleepFirmaECDSA(2000);
	
	if(!seguirCifrandoECDSA){ return; }
	
	$("#textoSeccionGenerarFirma").append('<label class="circulo">Firma= ('+ firma[0] +','+ firma[1] +')</label>');
	$("#textoSeccionGenerarFirma").slideToggle(500);
	await sleepFirmaECDSA(2000*velocidadAnimacionCifrarECDSA);
	
	if(!seguirCifrandoECDSA){ return; }
	
	/************************************************************************************************************************************/
	
	$("#btn-velocidadCECDSA").show();
	$("#btn-cifrarECDSA-cifrado").show();
	$("#btn-cancelarCifrarECDSA-cifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_65);
	$("#firmaMensajeECDSAC").val(""+ firma[0] +","+ firma[1] +"");
	$("#llavePublicaECDSAC").val(""+ llavePublica[0] +","+ llavePublica[1] +"");
}

async function verificarECDSA()
{
	var hash= [];
	var valorHash, w, u1, u2, u1P= [], u2PU= [], sumaP= [];
	var mensaje = ($("#textoMensajePlanoECDSAV").val()).split("");
	var firma= ($("#firmaECDSAD").val()).split(",");
	var llavePublica= ($("#llavePublicaECDSAD").val()).split(",");
	var r= parseInt(firma[0]);
	var s= parseInt(firma[1]);		
	var resultadoVerificacion= "";
	var puntos= [], numP, puntoGenerador= [];
	
	/***/
	obtenerVelocidadAnimacionECDSAVerificar();
	limpiaPanelECDSAVerificar();
	/***/
	
	puntos= obtenerPuntosAAECDSA();	
	numP= numeroPuntosAAECDSA(puntos);
	puntoGenerador= obtenerPuntoGeneradorAAECDSA(puntos, numP);	
	
	llavePublica[0]= parseInt(llavePublica[0]);
	llavePublica[1]= parseInt(llavePublica[1]);		
	
	/***********************************************************VERIFICAR FIRMA***************************************************************/
	$("#seccionVerificarFirma").show();	
	
	$("#informacionECDSAD1").append("Ahora se explicarán los pasos para verificar la firma del mensaje.");
	$("#informacionECDSAD1").slideToggle(500);
	await sleepFirmaECDSA(1750);
	
	if(!seguirVerificandoECDSA){ return; }
	
	$("#informacionECDSAD1").slideToggle(250);	
	await sleepFirmaECDSA(250);
	$("#informacionECDSAD1").empty();	
	
	$("#informacionECDSAD1").append("1. Verificar que r y s (firma), estén dentro del rango [1, n-1] = [1, 28], donde 'n' es el orden de la curva:");
	$("#informacionECDSAD1").slideToggle(500);
	await sleepFirmaECDSA(3750);
	
	if(!seguirVerificandoECDSA){ return; }
	
	$("#textoSeccionVerificarFirma").append('<label id="validarR" class="circulo">[1 < r < n-1]</label><br>');
	$("#textoSeccionVerificarFirma").append('<label id="validarS" class="circulo">[1 < s < n-1]</label>');
	await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
	$("#validarR").html("[1 <  < ]");
	$("#validarS").html("[1 <  < ]");
	await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
	$("#validarR").html("[1 < "+ r +" < "+ (numP-1)+"]");
	$("#validarS").html("[1 < "+ s +" < "+ (numP-1)+"]");
	await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
	
	if(!seguirVerificandoECDSA){ return; }
	
	$("#informacionECDSAD1").slideToggle(250);
	$("#textoSeccionVerificarFirma").slideToggle(250);
	await sleepFirmaECDSA(250);
	$("#informacionECDSAD1").empty();
	$("#textoSeccionVerificarFirma").empty();
	
	if(r<1||r>(numP-1))
	{
		resultadoVerificacion= "No válida";
	}
	else if(s<1||s>(numP-1))
	{
		resultadoVerificacion= "No válida";
	}
	else
	{
		hash= cifrarSHA1(mensaje);	
		valorHash= obtenerValorSHA1(hash);
		
		w= inversoMultiplicativoNumeroAAECDSA(s, numP);
		
		u1= ModuloAAECDSA((valorHash*w), numP);	
		u2= ModuloAAECDSA((r*w), numP);
		
		u1P= obtenerkPuntoAAECDSA(u1, puntoGenerador[0], puntoGenerador[1]);		
		u2PU= obtenerkPuntoAAECDSA(u2, llavePublica[0], llavePublica[1]);
		sumaP= sumaPuntosAAECDSA(u1P[0], u1P[1], u2PU[0], u2PU[1]);		
		
		$("#informacionECDSAD1").append("2. Se calcula w= s<sup>-1</sup> mod n, donde s<sup>-1</sup> es el inverso multiplicativo de 's' y 'n' es el orden de la curva:");
		$("#informacionECDSAD1").slideToggle(500);
		await sleepFirmaECDSA(3750);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#textoSeccionVerificarFirma").append('<label id="obtenerW" class="circulo">w= s<sup>-1</sup> mod n</label><br>');		
		$("#textoSeccionVerificarFirma").slideToggle(500);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerW").html("w=  mod ");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerW").html("w= "+ s +"<sup>-1</sup> mod "+ numP);		
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerW").html("w=  mod "+ numP);		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerW").html("w= "+ w +"<sup>-1</sup> mod "+ numP);		
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerW").html("w= ");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerW").html("w= "+ w);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#informacionECDSAD1").slideToggle(250);
		$("#textoSeccionVerificarFirma").slideToggle(250);
		await sleepFirmaECDSA(250);
		$("#informacionECDSAD1").empty();
		$("#textoSeccionVerificarFirma").empty();
		
		$("#informacionECDSAD1").append("3. Ahora se obtiene u1= H(m)*w mod n, donde 'H(m)' es el hash del mensaje convertido en un número, 'w' el valor obtenido del paso anterior y 'n' es el orden de la curva:");
		$("#informacionECDSAD1").slideToggle(500);
		await sleepFirmaECDSA(7500);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#textoSeccionVerificarFirma").append('<label id="obtenerU1" class="circulo">u<sub>1</sub>= H(m)*w mod n</label><br>');		
		$("#textoSeccionVerificarFirma").slideToggle(500);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU1").html("u<sub>1</sub>= * mod ");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU1").html("u<sub>1</sub>= "+ valorHash +"*"+ w +" mod "+ numP);		
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU1").html("u<sub>1</sub>=  mod "+ numP);
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU1").html("u<sub>1</sub>= "+ (valorHash*w) +" mod "+ numP);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU1").html("u<sub>1</sub>= ");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU1").html("u<sub>1</sub>= "+ u1);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#informacionECDSAD1").slideToggle(250);
		$("#textoSeccionVerificarFirma").slideToggle(250);
		await sleepFirmaECDSA(250);
		$("#informacionECDSAD1").empty();
		$("#textoSeccionVerificarFirma").empty();
		
		$("#informacionECDSAD1").append("4. Calcular u<sub>2</sub>= r*w mod n, donde 'r' es el primer número de la firma, 'w' el valor obtenido del paso 2 y 'n' es el orden de la curva:");
		$("#informacionECDSAD1").slideToggle(500);
		await sleepFirmaECDSA(7500);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#textoSeccionVerificarFirma").append('<label id="obtenerU2" class="circulo">u<sub>2</sub>= r*w mod n</label><br>');		
		$("#textoSeccionVerificarFirma").slideToggle(500);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU2").html("u<sub>2</sub>= * mod ");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU2").html("u2<sub>2</sub>= "+ r +"*"+ w +" mod "+ numP);		
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU2").html("u2<sub>2</sub>=  mod "+ numP);
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU2").html("u2<sub>2</sub>= "+ (r*w) +" mod "+ numP);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU2").html("u<sub>2</sub>= ");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerU2").html("u<sub>2</sub>= "+ u2);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#informacionECDSAD1").slideToggle(250);
		$("#textoSeccionVerificarFirma").slideToggle(250);
		await sleepFirmaECDSA(250);
		$("#informacionECDSAD1").empty();
		$("#textoSeccionVerificarFirma").empty();
		
		$("#informacionECDSAD1").append("5. Ahora hay que obtener u<sub>1</sub>*PG + u<sub>2</sub>*Llave Pública= (x<sub>0</sub>, y<sub>0</sub>), donde 'u<sub>1</sub>' y 'u<sub>2</sub>' son los valores obtenidos en pasos anteriores y 'PG' es el punto generador de la curva elíptica, para esto utilizamos las operaciones suma de puntos y doblado de puntos:");
		$("#informacionECDSAD1").slideToggle(500);
		await sleepFirmaECDSA(11000);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#textoSeccionVerificarFirma").append('<label id="obtenerXY" class="circulo">u<sub>1</sub>*PG + u<sub>2</sub>*Llave Pública= (x<sub>0</sub>, y<sub>0</sub>)</label><br>');		
		$("#textoSeccionVerificarFirma").slideToggle(500);
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerXY").html("* + *= (x<sub>0</sub>, y<sub>0</sub>)");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerXY").html(""+ u1 +"*("+ puntoGenerador[0] +","+ puntoGenerador[1] +") + "+ u2 +"*("+ llavePublica[0] +","+ llavePublica[1] +")= (x<sub>0</sub>, y<sub>0</sub>)");
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerXY").html(" + = (x<sub>0</sub>, y<sub>0</sub>)");
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerXY").html("("+ u1P[0] +","+ u1P[1] +") + ("+ u2PU[0] +","+ u2PU[1] +")= (x<sub>0</sub>, y<sub>0</sub>)");
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerXY").html(" = (x<sub>0</sub>, y<sub>0</sub>)");		
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerXY").html("("+ sumaP[0] + ","+ sumaP[1] +")= (x<sub>0</sub>, y<sub>0</sub>)");
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#informacionECDSAD1").slideToggle(250);
		$("#textoSeccionVerificarFirma").slideToggle(250);
		await sleepFirmaECDSA(250);
		$("#informacionECDSAD1").empty();
		$("#textoSeccionVerificarFirma").empty();
		
		$("#informacionECDSAD1").append("6. Ahora tenemos que v= x<sub>0</sub> mod n, donde 'x<sub>0</sub>' es el valor obtenido del paso anterior y 'n' el orden de la curva:");
		$("#informacionECDSAD1").slideToggle(500);
		await sleepFirmaECDSA(5250);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#textoSeccionVerificarFirma").append('<label id="obtenerV" class="circulo">v= x<sub>0</sub> mod n</label><br>');		
		$("#textoSeccionVerificarFirma").slideToggle(500);
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerV").html("v=  mod ");
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerV").html("v= "+ sumaP[0] +" mod "+ numP);
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerV").html("v= ");
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#obtenerV").html("v= "+ ModuloAAECDSA(sumaP[0], numP));
		await sleepFirmaECDSA(3000*velocidadAnimacionVerificarECDSA);			
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#informacionECDSAD1").slideToggle(250);
		$("#textoSeccionVerificarFirma").slideToggle(250);
		await sleepFirmaECDSA(250);
		$("#informacionECDSAD1").empty();
		$("#textoSeccionVerificarFirma").empty();
		
		$("#informacionECDSAD1").append("7. La firma es válida sí y sólo sí v= r, por lo tanto:");
		$("#informacionECDSAD1").slideToggle(500);
		await sleepFirmaECDSA(5250);
		
		if(!seguirVerificandoECDSA){ return; }
		
		$("#textoSeccionVerificarFirma").append('<label id="comprobacionF" class="circulo">Comprobación firma: v=r</label><br>');		
		$("#textoSeccionVerificarFirma").slideToggle(500);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);
		
		$("#comprobacionF").html("Comprobación firma: ");
		await sleepFirmaECDSA(500*velocidadAnimacionVerificarECDSA);
		
		$("#comprobacionF").html("Comprobación firma: "+ sumaP[0] +"="+r);
		await sleepFirmaECDSA(2000*velocidadAnimacionVerificarECDSA);			
		
		if(!seguirVerificandoECDSA){ return; }
		
		if(sumaP[0]!=r)
		{
			resultadoVerificacion= "No Válida";
		}
		else
		{
			resultadoVerificacion= "Válida";
		}
	}
	
	/************************************************************************************************************************************/
	
	$("#btn-velocidadDECDSA").show();
	$("#btn-verificarECDSA-verificar").show();
	$("#btn-cancelarVerificarECDSA-verificar").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_66);
	$("#resultadoVerificacionECDSA").val(resultadoVerificacion);
}

/****************************************************************************************************************************************/

/*********************************************************FUNCIONES HASH******************************************************************/
function cuerpoSHA1()
{	
	this.HashTemporal= new Uint32Array(5);
	this.Length_Low= new Uint32Array(1);
	this.Length_High= new Uint32Array(1);
	this.indiceBloqueMensaje= new Uint32Array(1);
	this.bloqueMensaje= new Uint8Array(64);
	this.Computed= new Uint32Array(1);
	this.Corrupted= new Uint32Array(1);
}

function SHA1Inicializar(hash)
{
	if(!hash)
	{
		return shaNull;
	}
	
	hash.Length_Low[0]= 0;
	hash.Length_High[0]= 0;
	hash.indiceBloqueMensaje[0]= 0;
	hash.HashTemporal[0]= (0x67452301);
	hash.HashTemporal[1]= (0xEFCDAB89);
	hash.HashTemporal[2]= (0x98BADCFE);
	hash.HashTemporal[3]= (0x10325476);
	hash.HashTemporal[4]= (0xC3D2E1F0);
	hash.Computed[0]= 0;
	hash.Corrupted[0]= 0;
	
	return shaSuccess;
}

function SHA1Resultado(hash, auxHashMensaje)
{
	var i;
	
	if(!hash || !auxHashMensaje)
	{
		return shaNull;
	}
	
	if(hash.Corrupted[0])
	{
		return hash.Corrupted[0];
	}
	
	if(!hash.Computed[0])
	{
		paddingMensajeSHA1(hash);
		
		for(i=0; i<64; i++)
		{
			hash.bloqueMensaje[i]= 0;
		}
		
		hash.Length_Low[0]= 0;
		hash.Length_High[0]= 0;
		hash.Computed[0]= 1;
	}	
	
	for(i= 0; i<tamHashSHA1; i++)
	{
		auxHashMensaje[i]= hash.HashTemporal[i>>2] >> 8 * (3-(i & 0x03));
	}	
	
	return shaSuccess;
}

function entradaSHA1(hash, mensaje, longitud)
{
	if (!longitud)
    {
        return shaSuccess;
    }

    if (!hash || !mensaje)
    {
        return shaNull;
    }

    if (hash.Computed[0])
    {        
		hash.Corrupted[0]= shaStateError;

        return shaStateError;
    }

    if (hash.Corrupted[0])
    {
         return hash.Corrupted[0];
    }
	
	var temp= 0;
	
	while(longitud-- && !hash.Corrupted[0]) //EN ESTA PARTE HACE LOS BLOQUES DE 64 BITS DE LA PALABRA COMPLETA
	{		
		hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= (mensaje[temp].charCodeAt() & 0xFF);
		temp++;		

		hash.Length_Low[0] += 8;
		
		if (hash.Length_Low[0] == 0)
		{
			hash.Length_High[0]++;			
			
			if (hash.Length_High[0] == 0)
			{
				/* Message is too long */
				hash.Corrupted[0] = 1;
			}
		}

		if (hash.indiceBloqueMensaje[0] == 64)
		{			
			procesarBloqueMensajeSHA1(hash);
		}
	
	}
	
	return shaSuccess;
}
				
function corrimientoCircularSHA1(bits, palabra)
{
	return ( ((palabra) << (bits)) | ((palabra) >>> (32-(bits))) );
}

function procesarBloqueMensajeSHA1(hash)
{							 
	var K= new Int32Array(4), t, temp= new Int32Array(1), W= new Array(80), A= new Int32Array(1), B= new Int32Array(1), C= new Int32Array(1), D= new Int32Array(1), E= new Int32Array(1), i, auxResultado= 0, auxRbinario= "";	//W[80]
	
	K[0]= 0x5A827999;
	K[1]= 0x6ED9EBA1;
	K[2]= 0x8F1BBCDC;
	K[3]= 0xCA62C1D6;			

    /*
     *  Initialize the first 16 words in the array W
     */	 
    for(t = 0; t < 16; t++)
    {		
		W[t] = hash.bloqueMensaje[t * 4] << 24;		
		W[t] |= hash.bloqueMensaje[t * 4 + 1] << 16;
		W[t] |= hash.bloqueMensaje[t * 4 + 2] << 8;
		W[t] |= hash.bloqueMensaje[t * 4 + 3];		
    }
		
    for(t = 16; t < 80; t++)
    {
		W[t]= (corrimientoCircularSHA1(1, W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16] ));			
    }
		
    A[0] = hash.HashTemporal[0];
    B[0] = hash.HashTemporal[1];
    C[0] = hash.HashTemporal[2];
    D[0] = hash.HashTemporal[3];
    E[0] = hash.HashTemporal[4];

    for(t = 0; t < 20; t++)
    {        			
		temp[0] =  corrimientoCircularSHA1(5,A[0]) + ((B[0] & C[0]) | ((~B[0]) & D[0])) + E[0] + W[t] + K[0];
        E[0] = D[0];
        D[0] = C[0];
        C[0] = corrimientoCircularSHA1(30,B[0]);
        B[0] = A[0];
        A[0] = temp[0];			
    }

    for(t = 20; t < 40; t++)
    {
        temp[0] = corrimientoCircularSHA1(5,A[0]) + (B[0] ^ C[0] ^ D[0]) + E[0] + W[t] + K[1];
        E[0] = D[0];
        D[0] = C[0];
        C[0] = corrimientoCircularSHA1(30,B[0]);
        B[0] = A[0];
        A[0] = temp[0];
    }

    for(t = 40; t < 60; t++)
    {
        temp[0] = corrimientoCircularSHA1(5,A[0]) + ((B[0] & C[0]) | (B[0] & D[0]) | (C[0] & D[0])) + E[0] + W[t] + K[2];
        E[0] = D[0];
        D[0] = C[0];
        C[0] = corrimientoCircularSHA1(30,B[0]);
        B[0] = A[0];
        A[0] = temp[0];
    }

    for(t = 60; t < 80; t++)
    {
        temp[0] = corrimientoCircularSHA1(5,A[0]) + (B[0] ^ C[0] ^ D[0]) + E[0] + W[t] + K[3];
        E[0] = D[0];
        D[0] = C[0];
        C[0] = corrimientoCircularSHA1(30,B[0]);
        B[0] = A[0];
        A[0] = temp[0];
    }

    hash.HashTemporal[0] += A[0];
    hash.HashTemporal[1] += B[0];
    hash.HashTemporal[2] += C[0];
    hash.HashTemporal[3] += D[0];
    hash.HashTemporal[4] += E[0];

    hash.indiceBloqueMensaje[0] = 0;
}

function paddingMensajeSHA1(hash)
{
    /*
     *  Check to see if the current message block is too small to hold
     *  the initial padding bits and length.  If so, we will pad the
     *  block, process it, and then continue padding into a second
     *  block.
     */
    if (hash.indiceBloqueMensaje[0] > 55) //SI ES MAYOR DE 55 bytes entonces no caben los otros 8 bytes que significan la longitud del mensaje total
    {
		hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0x80;
		
        while(hash.indiceBloqueMensaje[0] < 64)
        {            
			hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0;
        }
        
		procesarBloqueMensajeSHA1(hash);

        while(hash.indiceBloqueMensaje[0] < 56) //LE DEJA EL ESPACIO PARA LOS 8 BYTES DEL TAMAÑO DEL MENSAJE
        {
            hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0;
        }
    }
    else
    {
        hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0x80;
		
        while(hash.indiceBloqueMensaje[0] < 56) //LE DEJA EL ESPACIO PARA LOS 8 BYTES DEL TAMAÑO DEL MENSAJE
        {
            hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0;
        }
    }

    /*
     *  Store the message length as the last 8 octets
     */
    hash.bloqueMensaje[56]= (hash.Length_High[0] >> 24);
    hash.bloqueMensaje[57]= (hash.Length_High[0] >> 16);
    hash.bloqueMensaje[58]= (hash.Length_High[0] >> 8);
    hash.bloqueMensaje[59]= (hash.Length_High[0]);
    hash.bloqueMensaje[60]= (hash.Length_Low[0] >> 24);
    hash.bloqueMensaje[61]= (hash.Length_Low[0] >> 16);
    hash.bloqueMensaje[62]= (hash.Length_Low[0] >> 8);
    hash.bloqueMensaje[63]= (hash.Length_Low[0]);

    procesarBloqueMensajeSHA1(hash);
}

function cifrarSHA1(mensaje)
{	
	var hash= new cuerpoSHA1();
	var err;
	var resultadoHASH= new Uint8Array(20);
	var i;
	
	SHA1Inicializar(hash);	
	
	err= entradaSHA1(hash, mensaje, mensaje.length);	
		
	err = SHA1Resultado(hash, resultadoHASH);	
	
	if (err)
	{
		//fprintf(stderr,
		//"SHA1Result Error %d, could not compute message digest.\n",
		//err );
	}
	
	return resultadoHASH;
}

function obtenerValorSHA1(resultadoHASH)
{
	var valorHash= 0, i;
	
	for(i=0; i<20; i++)
	{		
		valorHash= valorHash+resultadoHASH[i];
	}
	
	return valorHash;
}

function mostrarPanelECDSA()
{
	//crearPanelAfin();
	$("#panelInteractivo-CifradoECDSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelECDSA()
{
	$("#panelInteractivo-CifradoECDSA").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelECDSACifrado();
	limpiaPanelECDSAVerificar();
}

function limpiaPanelECDSACifrado()
{	
	$("#seccionGeneracionLlaves").show();
		if($('#informacionECDSAC1').is(':visible'))
		{
			$("#informacionECDSAC1").slideToggle(500);
		}
		
		$("#informacionECDSAC1").empty();
		$("#textoSeccionGeneracionLlaves").empty();
		
		$("#seccionGeneracionLlaves").hide();
	
	$("#seccionGenerarFirma").show();
		if($('#informacionECDSAC2').is(':visible'))
		{
			$("#informacionECDSAC2").slideToggle(500);			
		}
		
		$("#informacionECDSAC2").empty();
		$("#textoSeccionGenerarFirma").empty();
		
		$("#seccionGenerarFirma").hide();
		
	$("#firmaMensajeECDSAC").empty();
	$("#llavePublicaECDSAC").empty();	
}

function limpiaPanelECDSAVerificar()
{	
	$("#seccionVerificarFirma").show();
		if($('#informacionECDSAD1').is(':visible'))
		{
			$("#informacionECDSAD1").slideToggle(500);
		}
		
		$("#informacionECDSAD1").empty();
		$("#textoSeccionVerificarFirma").empty();
		
		$("#seccionVerificarFirma").hide();
		
	$("#resultadoVerificacionECDSA").empty();	
}

function obtenerVelocidadAnimacionECDSACifrar()
{
	if($('#btn-cifrarECDSA-cifrado').val() == 1)
	{
		velocidadAnimacionCifrarECDSA = 0.25;
	}
	else if($('#btn-cifrarECDSA-cifrado').val() == 2)
	{
		velocidadAnimacionCifrarECDSA = 1;
	}
	else
	{
		velocidadAnimacionCifrarECDSA = 1.75;
	}

	$("#btn-velocidadCECDSA").hide();
	$("#btn-cifrarECDSA-cifrado").hide();
	$("#btn-cancelarCifrarECDSA-cifrado").show();
	seguirCifrandoECDSA= true;
}

function obtenerVelocidadAnimacionECDSAVerificar()
{
	if($('#btn-verificarECDSA-verificar').val() == 1)
	{
		velocidadAnimacionVerificarECDSA = 0.25;
	}
	else if($('#btn-verificarECDSA-verificar').val() == 2)
	{
		velocidadAnimacionVerificarECDSA = 1;
	}
	else
	{
		velocidadAnimacionVerificarECDSA = 1.75;
	}

	$("#btn-velocidadDECDSA").hide();
	$("#btn-verificarECDSA-verificar").hide();
	$("#btn-cancelarVerificarECDSA-verificar").show();
	seguirVerificandoECDSA= true;
}

function validarEntradaCifradoECDSA()
{
	var mensaje = "";
	var texto = $('#textoMensajePlanoECDSACifrado').val();
	var i;

	if (texto.length < 1 || texto.length > 10)
	{
		mensaje = mensaje_67
	}
	else
	{
		for(i= 0; i<texto.length; i++)
		{
			if(texto.charCodeAt(i)<0||texto.charCodeAt(i)>255)
			{
				mensaje= mensaje_29;
				i= texto.length;
			}
		}
	}

	return mensaje;
}

function validarEntradaLlavePrivadaECDSA()
{
	var mensaje = "";	
	var valorLLP= $('#ECDSApK').val();
	
	if (Number(valorLLP)<1 || Number(valorLLP)>28 || valorLLP.indexOf(".") >= 0)
	{
		mensaje = mensaje_68;
	}	

	return mensaje;
}

function validarEntradaVerificarECDSA()
{
	var mensaje = "";
	var texto = $('#textoMensajePlanoECDSAV').val();
	var i;

	if (texto.length < 1 || texto.length > 10)
	{
		mensaje = mensaje_67;
	}
	else
	{
		for(i= 0; i<texto.length; i++)
		{
			if(texto.charCodeAt(i)<0||texto.charCodeAt(i)>255)
			{
				mensaje= mensaje_29;
				i= texto.length;
			}
		}
	}

	return mensaje;
}

function validarEntradaFirmaECDSA()
{
	var mensaje = "";
	var texto = $('#firmaECDSAD').val();
	var numeros= [];

	if(!texto.match(/^[0-9]{1,2}([,][0-9]{1,2})?$/))
	{
		mensaje = mensaje_69;
	}
	else if (texto.length < 3 || texto.length > 5)
	{
		mensaje = mensaje_156;
	}
	else
	{
		numeros= texto.split(",");

		if(numeros[0]>28||numeros[0]<0||numeros[1]>28||numeros[1]<0)
		{
			mensaje = mensaje_69;
		}
	}

	return mensaje;
}

function validarEntradaLlavePublicaECDSA()
{
	var mensaje = "";
	var texto = $('#llavePublicaECDSAD').val();
	var numeros= [];

	if(!texto.match(/^[0-9]{1,2}([,][0-9]{1,2})?$/))
	{
		mensaje = mensaje_71;
	}
	else if (texto.length < 3 || texto.length > 5)
	{
		mensaje = mensaje_70;
	}
	else
	{
		numeros= texto.split(",");

		if(numeros[0]>28||numeros[0]<0||numeros[1]>28||numeros[1]<0)
		{
			mensaje = mensaje_71;
		}
	}

	return mensaje;
}

$(document).ready(function()
{
	$("#CifradoRapidoECDSA").click(function(){
		$("#btn-cifrarECDSA-cifrado").html('Firmar Rápido');
		$("#btn-cifrarECDSA-cifrado").val(1);
	});
	$("#CifradoNormalECDSA").click(function(){
		$("#btn-cifrarECDSA-cifrado").html('Firmar Normal');
		$("#btn-cifrarECDSA-cifrado").val(2);
	});
	$("#CifradoLentoECDSA").click(function(){
		$("#btn-cifrarECDSA-cifrado").html('Firmar Lento');
		$("#btn-cifrarECDSA-cifrado").val(3);
	});
	
	$("#DescifradoRapidoECDSA").click(function(){
		$("#btn-verificarECDSA-verificar").html('Verificar Rápido');
		$("#btn-verificarECDSA-verificar").val(1);
	});
	$("#DescifradoNormalECDSA").click(function(){
		$("#btn-verificarECDSA-verificar").html('Verificar Normal');
		$("#btn-verificarECDSA-verificar").val(2);
	});
	$("#DescifradoLentoECDSA").click(function(){
		$("#btn-verificarECDSA-verificar").html('Verificar Lento');
		$("#btn-verificarECDSA-verificar").val(3);
	});
	
	$("#textoMensajePlanoECDSACifrado").keyup(function()
	{
		var mensaje = validarEntradaCifradoECDSA();
		var mensaje2= validarEntradaLlavePrivadaECDSA();

		if($("#textoMensajePlanoECDSACifrado").val().length == 0){
			$("#textoMensajePlanoECDSACifrado-error").remove();
			$("#textoMensajePlanoECDSACifrado").removeClass('input-error');	
		}
		else{
			if (mensaje.length != 0) {
				$("#textoMensajePlanoECDSACifrado-error").remove();
				$("#textoMensajePlanoECDSACifrado").parent().append('<div id="textoMensajePlanoECDSACifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoMensajePlanoECDSACifrado").addClass('input-error');
				//$("#btn-cifrarECDSA-cifrado").attr("disabled", true);
				//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
			} else
			{
				$("#textoMensajePlanoECDSACifrado-error").remove();
				$("#textoMensajePlanoECDSACifrado").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-cifrarECDSA-cifrado").attr("disabled", false);
				}			
			}
		}
	});
	
	$("#ECDSApK").keyup(function()
	{
		var mensaje= validarEntradaLlavePrivadaECDSA();
		var mensaje2 = validarEntradaCifradoECDSA();		

		if($("#ECDSApK").val().length == 0){
			$("#ECDSApK-error").remove();
			$("#ECDSApK").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#ECDSApK-error").remove();
				$("#ECDSApK").parent().parent().append('<div id="ECDSApK-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#ECDSApK").addClass('input-error');
				//$("#btn-cifrarECDSA-cifrado").attr("disabled", true);
				//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
			} else
			{
				$("#ECDSApK-error").remove();
				$("#ECDSApK").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-cifrarECDSA-cifrado").attr("disabled", false);
				}			
			}
		}
	});
	
	$("#textoMensajePlanoECDSAV").keyup(function()
	{
		var mensaje = validarEntradaVerificarECDSA();
		var mensaje2 = validarEntradaFirmaECDSA();				
		var mensaje3 = validarEntradaLlavePublicaECDSA();

		if($("#textoMensajePlanoECDSAV").val().length == 0){
			$("#textoMensajePlanoECDSAV-error").remove();
			$("#textoMensajePlanoECDSAV").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoMensajePlanoECDSAV-error").remove();
				$("#textoMensajePlanoECDSAV").parent().parent().append('<div id="textoMensajePlanoECDSAV-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoMensajePlanoECDSAV").addClass('input-error');
				//$("#btn-verificarECDSA-verificar").attr("disabled", true);
				//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
			} else{
				$("#textoMensajePlanoECDSAV-error").remove();
				$("#textoMensajePlanoECDSAV").removeClass('input-error');
				
				if(mensaje2.length==0&&mensaje3.length==0)
				{
					$("#btn-verificarECDSA-verificar").attr("disabled", false);
				}			
			}
		}
	});
	
	$("#firmaECDSAD").keyup(function()
	{
		var mensaje = validarEntradaFirmaECDSA();
		var mensaje2 = validarEntradaVerificarECDSA();
		var mensaje3 = validarEntradaLlavePublicaECDSA();

		if($("#firmaECDSAD").val().length == 0){
			$("#firmaECDSAD-error").remove();
			$("#firmaECDSAD").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#firmaECDSAD-error").remove();
				$("#firmaECDSAD").parent().parent().append('<div id="firmaECDSAD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#firmaECDSAD").addClass('input-error');
				//$("#btn-verificarECDSA-verificar").attr("disabled", true);
				//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
			} else{
				$("#firmaECDSAD-error").remove();
				$("#firmaECDSAD").removeClass('input-error');
				
				if(mensaje2.length==0&&mensaje3.length==0)
				{
					$("#btn-verificarECDSA-verificar").attr("disabled", false);
				}			
			}
		}
	});
	
	$("#llavePublicaECDSAD").keyup(function()
	{
		var mensaje = validarEntradaLlavePublicaECDSA();
		var mensaje3 = validarEntradaFirmaECDSA();		
		var mensaje2 = validarEntradaVerificarECDSA();		

		if($("#llavePublicaECDSAD").val().length == 0){
			$("#llavePublicaECDSAD-error").remove();
			$("#llavePublicaECDSAD").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#llavePublicaECDSAD-error").remove();
				$("#llavePublicaECDSAD").parent().append('<div id="llavePublicaECDSAD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#llavePublicaECDSAD").addClass('input-error');
				//$("#btn-verificarECDSA-verificar").attr("disabled", true);
				//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
			} else{
				$("#llavePublicaECDSAD-error").remove();
				$("#llavePublicaECDSAD").removeClass('input-error');
				
				if(mensaje2.length==0&&mensaje3.length==0)
				{
					$("#btn-verificarECDSA-verificar").attr("disabled", false);
				}			
			}
		}
	});
	
	$("#btn-cifrarECDSA-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoECDSA();
		var mensaje2= validarEntradaLlavePrivadaECDSA();
		
		if(mensaje.length!=0)
		{
			$("#textoMensajePlanoECDSACifrado-error").remove();
			$("#textoMensajePlanoECDSACifrado").parent().parent().append('<div id="textoMensajePlanoECDSACifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoMensajePlanoECDSACifrado").addClass('input-error');
			//$("#btn-cifrarECDSA-cifrado").attr("disabled", true);
		}		
		else if(mensaje2.length!=0)
		{
			$("#ECDSApK-error").remove();
			$("#ECDSApK").parent().append('<div id="ECDSApK-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#ECDSApK").addClass('input-error');
			//$("#btn-cifrarECDSA-cifrado").attr("disabled", true);
		}
		else
		{
			firmarECDSA();
		}		
	});
	
	$("#btn-cancelarCifrarECDSA-cifrado").click(function()
	{
		seguirCifrandoECDSA= false;
		
		limpiaPanelECDSACifrado();

		$("#btn-velocidadCECDSA").show();
		$("#btn-cifrarECDSA-cifrado").show();
		$("#btn-cancelarCifrarECDSA-cifrado").hide();
	});
	
	$("#btn-verificarECDSA-verificar").click(function()
	{
		var mensaje = validarEntradaVerificarECDSA();
		var mensaje2 = validarEntradaFirmaECDSA();		
		var mensaje3 = validarEntradaLlavePublicaECDSA();
		
		if(mensaje.length!=0)
		{
			$("#textoMensajePlanoECDSAV-error").remove();
			$("#textoMensajePlanoECDSAV").parent().parent().append('<div id="textoMensajePlanoECDSAV-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoMensajePlanoECDSAV").addClass('input-error');
			//$("#btn-verificarECDSA-verificar").attr("disabled", true);
		}
		if(mensaje2.length!=0)
		{
			$("#firmaECDSAD-error").remove();
			$("#firmaECDSAD").parent().parent().append('<div id="firmaECDSAD-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#firmaECDSAD").addClass('input-error');
			//$("#btn-verificarECDSA-verificar").attr("disabled", true);
		}
		if(mensaje3.length!=0)
		{
			$("#llavePublicaECDSAD-error").remove();
			$("#llavePublicaECDSAD").parent().append('<div id="llavePublicaECDSAD-error" class="text-danger">&nbsp;'+mensaje3+'</div>');
			$("#llavePublicaECDSAD").addClass('input-error');
			//$("#btn-verificarECDSA-verificar").attr("disabled", true);
		}
		if(mensaje.length==0&&mensaje2.length==0&&mensaje3.length==0)
		{
			verificarECDSA();
		}		
	});
	
	$("#btn-cancelarVerificarECDSA-verificar").click(function()
	{
		seguirVerificandoECDSA= false;
		
		limpiaPanelECDSAVerificar();

		$("#btn-velocidadDECDSA").show();
		$("#btn-verificarECDSA-verificar").show();
		$("#btn-cancelarVerificarECDSA-verificar").hide();
	});

	$("#btn-copiarTextoECDSAD").click(function()
	{
		if ($("#textoMensajePlanoECDSACifrado").val()=='')
		{
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_64);
		}
		else
		{
			$("#textoMensajePlanoECDSAV").val($("#textoMensajePlanoECDSACifrado").val());
			$("#llavePublicaECDSAD").val($("#llavePublicaECDSAC").val());
			$("#firmaECDSAD").val($("#firmaMensajeECDSAC").val());
		}
	});

	//Archivos

	$("#fileInputECDSAGenerar").change(function()
    {
        var mensaje2 = validarEntradaArchivoLlavePrivadaECDSA();
        var mensaje = validarEntradaCArchivoECDSA();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaECDSAGenerar').html(mensaje);
        } else{
            $('#fileDisplayAreaECDSAGenerar').html();
        }

        if(mensaje.length==0&&mensaje2.length==0)
        {
        	$("#btn-firmarArchivoECDSA").attr("disabled", false);
        }        
    });

	$("#llavePrivadaArchivoECDSA").on('click change keyup', function() {
		var mensaje = validarEntradaArchivoLlavePrivadaECDSA();
		var mensaje2= validarEntradaCArchivoECDSA();

		if($("#llavePrivadaArchivoECDSA").val().length == 0){
			$("#llavePrivadaArchivoECDSA-error").remove();
			$("#llavePrivadaArchivoECDSA").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#llavePrivadaArchivoECDSA-error").remove();
				$("#llavePrivadaArchivoECDSA").parent().append('<div id="llavePrivadaArchivoECDSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#llavePrivadaArchivoECDSA").addClass('input-error');
				//$("#btn-firmarArchivoECDSA").attr("disabled", true);
			} else{
				$("#llavePrivadaArchivoECDSA-error").remove();
				$("#llavePrivadaArchivoECDSA").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-firmarArchivoECDSA").attr("disabled", false);
				}
			}
		}
	});

	$("#btn-firmarArchivoECDSA").click(function()
    {		
		var mensajellave = validarEntradaArchivoLlavePrivadaECDSA();
		var mensajearchivo = validarEntradaCArchivoECDSA();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llavePrivadaArchivoECDSA-error").remove();
            $("#llavePrivadaArchivoECDSA").removeClass('input-error');
            $("#btn-firmarArchivoECDSA").attr("disabled", false);

            generarFirmaArchivo();
		}
		else{
			if(mensajellave.length > 0){
				$("#llavePrivadaArchivoECDSA-error").remove();
				$("#llavePrivadaArchivoECDSA").parent().append('<div id="llavePrivadaArchivoECDSA-error" class="text-danger">&nbsp;'+mensajellave+'</div>');
				$("#llavePrivadaArchivoECDSA").addClass('input-error');
				//$("#btn-firmarArchivoECDSA").attr("disabled", true);
			}

			if(mensajearchivo.length > 0){
				$('#fileDisplayAreaECDSAGenerar').html(mensajearchivo);
			}
		}
	}); 

	$("#fileInputECDSAVerificar").change(function()
    {
        var mensaje2 = validarEntradaArchivoLlavePublicaECDSA();
        var mensaje = validarEntradaDArchivoECDSA();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaECDSAVerificar').html(mensaje);
        } else{
            $('#fileDisplayAreaECDSAVerificar').html();
        }

        if(mensaje.length==0&&mensaje2.length==0)
        {
        	$("#btn-verificarArchivoECDSA").attr("disabled", false);
        }        
    });

	$("#llavePublicaArchivoECDSA").keyup(function()
	{
		var mensaje = validarEntradaArchivoLlavePublicaECDSA();
		var mensaje2= validarEntradaDArchivoECDSA();

		if($("#llavePublicaArchivoECDSA").val().length == 0){
			$("#llavePublicaArchivoECDSA-error").remove();
			$("#llavePublicaArchivoECDSA").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#llavePublicaArchivoECDSA-error").remove();
				$("#llavePublicaArchivoECDSA").parent().append('<div id="llavePublicaArchivoECDSA-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#llavePublicaArchivoECDSA").addClass('input-error');
				//$("#btn-verificarArchivoECDSA").attr("disabled", true);
			} else{
				$("#llavePublicaArchivoECDSA-error").remove();
				$("#llavePublicaArchivoECDSA").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-verificarArchivoECDSA").attr("disabled", false);
				}
			}
		}
	});

	$("#btn-verificarArchivoECDSA").click(function()
    {		
		var mensajellave = validarEntradaArchivoLlavePublicaECDSA();
		var mensajearchivo = validarEntradaDArchivoECDSA();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llavePublicaArchivoECDSA-error").remove();
            $("#llavePublicaArchivoECDSA").removeClass('input-error');
            $("#btn-verificarArchivoECDSA").attr("disabled", false);

            verificarFirmaArchivo();
		}
		else{
			if(mensajellave.length > 0){
				$("#llavePublicaArchivoECDSA-error").remove();
				$("#llavePublicaArchivoECDSA").parent().append('<div id="llavePublicaArchivoECDSA-error" class="text-danger">&nbsp;'+mensajellave+'</div>');
				$("#llavePublicaArchivoECDSA").addClass('input-error');
				//$("#btn-verificarArchivoECDSA").attr("disabled", true);
			}

			if(mensajearchivo.length > 0){
				$('#fileDisplayAreaECDSAVerificar').html(mensajearchivo);
			}
		}
	}); 
	
});

function validarEntradaCArchivoECDSA(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputECDSAGenerar');
	var file;
	
	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = "Archivo no compatible, sólo archivos de texto(.txt)!";
		}
		else if(file.size > 1024*100){
			mensaje = "El tamaño máximo del archivo debe ser 100 Kb.";
		}
	}
	else
	{
		mensaje= "Se debe ingresar un archivo a firmar.";
	}

	return mensaje;
}

function validarEntradaArchivoLlavePrivadaECDSA()
{
	var mensaje = "";	
	var valorLLP= $('#llavePrivadaArchivoECDSA').val();
	
	if (Number(valorLLP)<1 || Number(valorLLP)>28 || valorLLP.includes(".") )
	{
		mensaje = mensaje_68;
	}	

	return mensaje;
}

function validarEntradaDArchivoECDSA(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputECDSAVerificar');
	var file;
	
	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = "Archivo no compatible, sólo archivos de texto(.txt)!";
		}
		else if(file.size > 1024*100+50){
			mensaje = "El tamaño máximo del archivo debe ser 100 Kb.";
		}
	}
	else
	{
		mensaje= "Se debe ingresar un archivo a verificar.";
	}

	return mensaje;
}

function validarEntradaArchivoLlavePublicaECDSA()
{
	var mensaje = "";
	var texto = $('#llavePublicaArchivoECDSA').val();
	var numeros= [];

	if(!texto.match(/^[0-9]{1,2}([,][0-9]{1,2})?$/))
	{
		mensaje = mensaje_71;
	}
	else if (texto.length < 3 || texto.length > 5)
	{
		mensaje = mensaje_70;
	}
	else
	{
		numeros= texto.split(",");

		if(numeros[0]>28||numeros[0]<0||numeros[1]>28||numeros[1]<0)
		{
			mensaje = mensaje_71;
		}
	}


	return mensaje;
}

function sleepFirmaECDSA(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}