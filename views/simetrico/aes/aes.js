var SBox = [];
var invSBox = [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];
var RConC= [];
var velocidadAnimacionCifrarAES= 1;
var velocidadAnimacionDescifrarAES= 1;
var seguirCifrandoAES= true;
var seguirDescifrandoAES= true;
var llavesGeneradasCifrado= [];

//Funciones para cifrar archivos

function expansionLlaves2(llave)
{	
	var i, j, k , l, m;
	var RotBytes= [], SubBytes= [], fila, columna, llaveAux1=[], llaveAux2= [], posSbox, posSubllaves= 0, contRcon= 0, pos;
	var llaveAESCifrar = llave;	
	var llavesGeneradasCifradoArchivo= [];
	
	/** SBOX Y RCON*/
	generarSBox();
	generarRConC();
	
	pos= 0;
	
	for(i=1; i<=4; i++)
	{
		for(j=1; j<=4; j++)
		{				
			valorAscii= parseInt(llaveAESCifrar[pos].charCodeAt());
			pos++;
			llavesGeneradasCifradoArchivo.push(valorAscii);
			llaveAux1.push(valorAscii);
		}			
	}
	
	for(i=0; i<10; i++) //10 Rounds
	{		
		for(j=0; j<4; j++) 
		{
			if(j==0)
			{
				RotBytes.push(llaveAux1[13]);					
				RotBytes.push(llaveAux1[14]);					
				RotBytes.push(llaveAux1[15]);										
				RotBytes.push(llaveAux1[12]);							
				
				/****SUBBYTES****/
				for(k=0; k<4; k++)
				{
					fila= (RotBytes[k]&240);
					fila= fila>>4;
					columna= (RotBytes[k]&15);
					pos= 0;
					
					posSbox= 0;											
					
					for(l=0; l<16; l++)
					{		
						for(m=0; m<16; m++)
						{
							if(l==fila&&m==columna)
							{
								SubBytes.push(SBox[posSbox]);																	
							}
							
							posSbox++;
						}
					}				
				}
				/*******/							
				
				/*******XOR*******/					
					
				for(k=0; k<4; k++)
				{					
					llaveAux2.push( (llaveAux1[posSubllaves]^SubBytes[k])^RConC[contRcon] );
					posSubllaves++;
					contRcon++;
				}								
				
				/*****/
			}
			else
			{					
				for(k=0; k<4; k++)
				{					
					llaveAux2.push( llaveAux1[posSubllaves]^llaveAux2[posSubllaves-4] );
					posSubllaves++;
				}
			}							
		}
			
		for(j= 0; j<16; j++)
		{
			llavesGeneradasCifradoArchivo.push(llaveAux2[j]);
			llaveAux1[j]= llaveAux2[j];			
		}		
		
		posSubllaves= 0;			
		RotBytes= [];
		SubBytes= [];
		
		llaveAux2= [];
	}
	
	return llavesGeneradasCifradoArchivo;
}

function AddRoundKey(bloqueTexto, llaves, ronda)
{
	var i;

	for(i= 0; i<16; i++)
	{			
		bloqueTexto[i]= bloqueTexto[i]^llaves[16*ronda+i];
	}						
}

function subBytes(bloqueTexto)
{
	var j, k, l, columna, fila, pos, posSbox;
	
	for(j=0; j<16; j++)
	{
		fila= (bloqueTexto[j]&240);
		fila= fila>>4;
		columna= (bloqueTexto[j]&15);
		pos= 0;														
										
		posSbox= 0;
		
		for(k=0; k<16; k++)
		{		
			for(l=0; l<16; l++)
			{
				if(k==fila&&l==columna)
				{								
					bloqueTexto[j]= SBox[posSbox];							
				}
				
				posSbox++;
			}
		}							
	}
}

function shiftRows(bloqueTexto)
{
	var j, k, elementoMatrizEstadoC;
	
	for(j=1; j<=3; j++)
	{							
		if(j==1)
		{
			elementoMatrizEstadoC= bloqueTexto[1];
			bloqueTexto[1]= bloqueTexto[5];
			bloqueTexto[5]= bloqueTexto[9];
			bloqueTexto[9]= bloqueTexto[13];
			bloqueTexto[13]= elementoMatrizEstadoC;
		}
		else if(j==2)
		{
			for(k=0; k<2; k++)
			{
				elementoMatrizEstadoC= bloqueTexto[2];
				bloqueTexto[2]= bloqueTexto[6];
				bloqueTexto[6]= bloqueTexto[10];
				bloqueTexto[10]= bloqueTexto[14];
				bloqueTexto[14]= elementoMatrizEstadoC;
			}
		}
		else
		{
			for(k=0; k<3; k++)
			{
				elementoMatrizEstadoC= bloqueTexto[3];
				bloqueTexto[3]= bloqueTexto[7];
				bloqueTexto[7]= bloqueTexto[11];
				bloqueTexto[11]= bloqueTexto[15];
				bloqueTexto[15]= elementoMatrizEstadoC;											
			}
		}
	}
}

function mixColums(bloqueTexto)
{
	var mixColumsC= [], auxMatrizEstadoC= [], k, j, resultadosMixColumsC= [];
				
	mixColumsC.push(2);
	mixColumsC.push(1);
	mixColumsC.push(1);	
	mixColumsC.push(3);	
	mixColumsC.push(3);	
	mixColumsC.push(2);
	mixColumsC.push(1);
	mixColumsC.push(1);	
	mixColumsC.push(1);
	mixColumsC.push(3);	
	mixColumsC.push(2);
	mixColumsC.push(1);	
	mixColumsC.push(1);	
	mixColumsC.push(1);
	mixColumsC.push(3);	
	mixColumsC.push(2);
	
	auxMatrizEstadoC= bloqueTexto.slice();	
	
	for(k= 0; k<4; k++)
	{								
		for(j=0; j<4; j++)
		{				
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));
								
			bloqueTexto[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
			
			resultadosMixColumsC= [];
		}							
	}
}

function InvSubBytes(bloqueTexto)
{
	var j, k, l, fila , columna, posSbox, pos;
	
	for(j=0; j<16; j++)
	{
		fila= (bloqueTexto[j]&240);
		fila= fila>>4;
		columna= (bloqueTexto[j]&15);
		pos= 0;														
										
		posSbox= 0;
		
		for(k=0; k<16; k++)
		{		
			for(l=0; l<16; l++)
			{
				if(k==fila&&l==columna)
				{								
					bloqueTexto[j]= invSBox[posSbox];							
				}
				
				posSbox++;
			}
		}							
	}
}

function InvShiftRows(bloqueTexto)
{
	var j, k, elementoMatrizEstadoC;
	
	for(j=1; j<=3; j++)
	{							
		if(j==1)
		{
			elementoMatrizEstadoC= bloqueTexto[13];
			bloqueTexto[13]= bloqueTexto[9];
			bloqueTexto[9]= bloqueTexto[5];
			bloqueTexto[5]= bloqueTexto[1];
			bloqueTexto[1]= elementoMatrizEstadoC;																		
		}
		else if(j==2)
		{
			for(k=0; k<2; k++)
			{
				elementoMatrizEstadoC= bloqueTexto[14];
				bloqueTexto[14]= bloqueTexto[10];
				bloqueTexto[10]= bloqueTexto[6];
				bloqueTexto[6]= bloqueTexto[2];
				bloqueTexto[2]= elementoMatrizEstadoC;																				
			}
		}
		else
		{
			for(k=0; k<3; k++)
			{
				elementoMatrizEstadoC= bloqueTexto[15];
				bloqueTexto[15]= bloqueTexto[11];
				bloqueTexto[11]= bloqueTexto[7];
				bloqueTexto[7]= bloqueTexto[3];
				bloqueTexto[3]= elementoMatrizEstadoC;											
			}
		}
	}
}

function InvMixColums(bloqueTexto)
{
	var mixColumsC= [], auxMatrizEstadoC= [], k, j, resultadosMixColumsC= [];
				
	mixColumsC.push(0x0e);
	mixColumsC.push(0x09);	
	mixColumsC.push(0x0d);	
	mixColumsC.push(0x0b);	
	mixColumsC.push(0x0b);	
	mixColumsC.push(0x0e);	
	mixColumsC.push(0x09);	
	mixColumsC.push(0x0d);	
	mixColumsC.push(0x0d);	
	mixColumsC.push(0x0b);	
	mixColumsC.push(0x0e);	
	mixColumsC.push(0x09);
	mixColumsC.push(0x09);	
	mixColumsC.push(0x0d);	
	mixColumsC.push(0x0b);	
	mixColumsC.push(0x0e);
		
	auxMatrizEstadoC= bloqueTexto.slice();	
	
	for(k= 0; k<4; k++)
	{								
		for(j=0; j<4; j++)
		{				
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));
			resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));
								
			bloqueTexto[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
			
			resultadosMixColumsC= [];
		}							
	}
}

function InvAddRoundKey(bloqueTexto, llaves, ronda)
{
	var pos= 0, llaveAux1= [], j, k, valorAscii, auxMatrizEstadoC= [], resultadosMixColumsC= [], mixColumsC= [];
	var posLlavesGeneradas= 176-((ronda+1)*16);	
	
	if(ronda==0||ronda==10)
	{
		for(j= 0; j<16; j++)
		{																			
			bloqueTexto[j]= bloqueTexto[j]^llaves[posLlavesGeneradas];
			posLlavesGeneradas++;
		}
	}
	else
	{
		mixColumsC.push(0x0e);
		mixColumsC.push(0x09);	
		mixColumsC.push(0x0d);	
		mixColumsC.push(0x0b);	
		mixColumsC.push(0x0b);	
		mixColumsC.push(0x0e);	
		mixColumsC.push(0x09);	
		mixColumsC.push(0x0d);	
		mixColumsC.push(0x0d);	
		mixColumsC.push(0x0b);	
		mixColumsC.push(0x0e);	
		mixColumsC.push(0x09);
		mixColumsC.push(0x09);	
		mixColumsC.push(0x0d);	
		mixColumsC.push(0x0b);	
		mixColumsC.push(0x0e);
		
		for(j=1; j<=4; j++)
		{
			for(k=1; k<=4; k++)
			{
				valorAscii= llaves[posLlavesGeneradas];										
				posLlavesGeneradas++;
				llaveAux1.push(valorAscii);
			}
		}
		
		auxMatrizEstadoC= llaveAux1.slice();
		
		for(k= 0; k<4; k++)
		{
			for(j=0; j<4; j++)
			{													
				resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));					
									
				resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));					
									
				resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));					
									
				resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));					
									
				llaveAux1[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
				
				resultadosMixColumsC= [];
			}
		}
		
		for(j= 0; j<16; j++)
		{																			
			bloqueTexto[j]= bloqueTexto[j]^llaveAux1[j];				
		}
	}	
}

//document.getElementById('fileInputAESCifrado').addEventListener('change', cifrarArchivoAES, false);

function cifrarArchivoAES(evt) 
{
	var fileInput = document.getElementById('fileInputAESCifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaAESCifrado');
	var inputLlave = document.getElementById('llaveAESCifradoArchivo');
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "";	
	var llave= inputLlave.value;
	var i, moduloTextoPlano, bloqueTexto= [], posBloqueTexto= 0, j;
	var llavesGeneradasCifradoArchivo= [];
	var rondas= 10;
	$("#progressbarAESCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if(llave.length!=16)
	{
		fileDisplayArea.innerText = mensaje_37;
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
								
				llavesGeneradasCifradoArchivo= expansionLlaves2(llave);
				
				moduloTextoPlano= textoPlano.length%16;
				
				if(moduloTextoPlano!=0)//Si no es un bloque de tamaño exacto lo acompletamos
				{
					for(i=moduloTextoPlano; i<16; i++)
					{
						textoPlano= textoPlano+String.fromCharCode(46); //Escribe puntos para acompletar los bloques.
					}
				}
				
				for(i=0; i<textoPlano.length; i++)
				{
					bloqueTexto[posBloqueTexto]= textoPlano[i].charCodeAt();
					
					if((posBloqueTexto+1)%16==0) //Ya se formo el bloque
					{
						AddRoundKey(bloqueTexto, llavesGeneradasCifradoArchivo, 0);						
						
						for(j= 1; j<10; j++)
						{
							subBytes(bloqueTexto);
							shiftRows(bloqueTexto);
							mixColums(bloqueTexto);
							AddRoundKey(bloqueTexto, llavesGeneradasCifradoArchivo, j);
						}
						
						subBytes(bloqueTexto);
						shiftRows(bloqueTexto);						
						AddRoundKey(bloqueTexto, llavesGeneradasCifradoArchivo, 10);
						
						for(j= 0; j<16; j++)
						{
							if(bloqueTexto[j]<16)
							{								
								textoCifrado= textoCifrado+"0"+bloqueTexto[j].toString(16);
							}
							else
							{
								textoCifrado= textoCifrado+bloqueTexto[j].toString(16);
							}
						}
						
						posBloqueTexto= 0;
					}
					else
					{
						posBloqueTexto++;
					}
				}
				
				fileDisplayArea.innerText= textoCifrado;
				textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
				  element.setAttribute('download', "ArchivoCifradoAES.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarAESCifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');		  			 
			}

			reader.readAsText(file, 'ISO-8859-1');
		}
		else
		{
			fileDisplayArea.innerText = mensaje_89;
		}	
	}	
}

function descifrarArchivoAES(evt) 
{
	var fileInput = document.getElementById('fileInputAESDescifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaAESDescifrado');
	var inputLlave = document.getElementById('llaveAESDescifradoArchivo');
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "", textoCifrado= "";	
	var llave= inputLlave.value;
	var i, moduloTextoCifrado, bloqueTexto= [], posBloqueTexto= 0, j, pos= 0;
	var llavesGeneradasCifradoArchivo= [];
	var rondas= 10;
	$("#progressbarAESDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if(llave.length!=16)
	{
		fileDisplayArea.innerText = mensaje_37;
	}
	else
	{			
		if (file.type.match(textType))
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoCifrado= reader.result;			
								
				llavesGeneradasCifradoArchivo= expansionLlaves2(llave);
				
				moduloTextoCifrado= textoCifrado.length%16;
				
				if(moduloTextoCifrado!=0)//Si no es un bloque de tamaño exacto lo acompletamos
				{
					for(i=moduloTextoCifrado; i<16; i++)
					{
						textoCifrado= textoCifrado+String.fromCharCode(46); //Escribe puntos para acompletar los bloques.
					}
				}
				
				for(i=0; i<textoCifrado.length; i= i+2)
				{
					bloqueTexto[posBloqueTexto]= parseInt("0x"+textoCifrado.toString().substring(i, i+2));
					
					if((posBloqueTexto+1)%16==0) //Ya se formo el bloque
					{
						InvAddRoundKey(bloqueTexto, llavesGeneradasCifradoArchivo, 0);						
						
						for(j= 1; j<10; j++)
						{												
							InvSubBytes(bloqueTexto);							
							InvShiftRows(bloqueTexto);
							InvMixColums(bloqueTexto);
							InvAddRoundKey(bloqueTexto, llavesGeneradasCifradoArchivo, j);
						}
						
						InvSubBytes(bloqueTexto);
						InvShiftRows(bloqueTexto);						
						InvAddRoundKey(bloqueTexto, llavesGeneradasCifradoArchivo, 10);
						
						for(j= 0; j<16; j++)
						{
							textoPlano= textoPlano+String.fromCharCode(bloqueTexto[j]);
						}
						
						posBloqueTexto= 0;
					}
					else
					{
						posBloqueTexto++;
					}
				}
				
				fileDisplayArea.innerText= textoPlano;
				textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
				  element.setAttribute('download', "ArchivoDescifradoAES.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);
				  $("#progressbarAESDescifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');			  			 
			}

			reader.readAsText(file, 'ISO-8859-1');
		}
		else
		{
			fileDisplayArea.innerText = mensaje_89;
		}	
	}	
}

function mostrarPanelAES()
{
	//crearPanelAfin();
	$("#panelInteractivo-CifradoAES").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelAES()
{
	$("#panelInteractivo-CifradoAES").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelAESCifrado();
	limpiaPanelAESDescifrado();

	$("#textoMensajePlanoAESCifrado-error").remove();
	$("#textoMensajePlanoAESCifrado").removeClass('input-error');
	$("#LlaveAESCifrado-error").remove();
	$("#LlaveAESCifrado").removeClass('input-error');
	$("#textoCriptogramaAESDescifrado-error").remove();
	$("#textoCriptogramaAESDescifrado").removeClass('input-error');
	$("#LlaveAESDescifrado-error").remove();
	$("#LlaveAESDescifrado").removeClass('input-error');

	seguirCifrandoAES= false;
	seguirDescifrandoAES= false;

	$("#btn-velocidadCAES").show();
	$("#btn-cifrarAES-cifrado").show();
	$("#btn-cancelarCifrarAES-cifrado").hide();
	$("#btn-velocidadDAES").show();
	$("#btn-descifrarAES-descifrado").show();
	$("#btn-cancelarDescifrarAES-descifrado").hide();
}

function limpiaPanelAESCifrado()
{
	$("#SeccionGeneracionLlaves").show();
	$("#SeccionRCon").show();
	$("#SeccionCifradoAES").show();	
	$("#SeccionSBox").show();

	if($('#informacionAES1C').is(':visible'))
	{
		$("#informacionAES1C").slideToggle(500);
	}
	
	if($('#informacionAES3C').is(':visible'))
	{
		$("#informacionAES3C").slideToggle(500);
	}
	
	if($('#informacionAES4C').is(':visible'))
	{
		$("#informacionAES3C").slideToggle(500);
	}
	
	if($('#informacionAES2C').is(':visible'))
	{
		$("#informacionAES2C").slideToggle(500);
	}
	
	llavesGeneradasCifrado= [];
	SBox= [];
	RConC=[];
	
	$("#informacionAES1C").empty();
	$("#informacionAES3C").empty();	
	$("#informacionAES4C").empty();
	$("#informacionAES2C").empty();	
	
	$("#fila1-GLlavesCAES").empty();
	$("#fila2-GLlavesCAES").empty();
	$("#fila3-GLlavesCAES").empty();
	$("#fila4-GLlavesCAES").empty();
	
	$("#columnaLlave2C0").empty();
	$("#columnaLlave2C1").empty();
	$("#columnaLlave2C2").empty();
	$("#columnaLlave2C3").empty();
	$("#columnaLlave2C4").empty();
	$("#columnaLlave2C5").empty();
	$("#columnaLlave2C6").empty();
	$("#columnaLlave2C7").empty();
	$("#columnaLlave2C8").empty();
	$("#columnaLlave2C9").empty();
	$("#columnaLlave2C10").empty();
	$("#columnaLlave2C11").empty();
	$("#columnaLlave2C12").empty();
	$("#columnaLlave2C13").empty();
	$("#columnaLlave2C14").empty();
	$("#columnaLlave2C15").empty();
	
	$("#fila1RConC").empty();
	$("#fila2RConC").empty();
	$("#fila3RConC").empty();
	$("#fila4RConC").empty();
		
	$("#fila1-llaveAESCmix").empty();
	$("#fila2-llaveAESCmix").empty();
	$("#fila3-llaveAESCmix").empty();
	$("#fila4-llaveAESCmix").empty();
	
	$("#fila1-EstadoAESC").empty();
	$("#fila2-EstadoAESC").empty();
	$("#fila3-EstadoAESC").empty();
	$("#fila4-EstadoAESC").empty();
	
	$("#fila1SBox").empty();
	$("#fila2SBox").empty();
	$("#fila3SBox").empty();
	$("#fila4SBox").empty();
	$("#fila5SBox").empty();
	$("#fila6SBox").empty();
	$("#fila7SBox").empty();
	$("#fila8SBox").empty();
	$("#fila9SBox").empty();
	$("#fila10SBox").empty();
	$("#fila11SBox").empty();
	$("#fila12SBox").empty();
	$("#fila13SBox").empty();
	$("#fila14SBox").empty();
	$("#fila15SBox").empty();
	$("#fila16SBox").empty();
	$("#fila17SBox").empty();
	
	$("#SeccionGeneracionLlaves").hide();
	$("#SeccionRCon").hide();
	$("#SeccionCifradoAES").hide();	
	$("#SeccionSBox").hide();
		
	$("#textoMensajePlanoAESCifrado").val("");
	$("#LlaveAESCifrado").val("");
	$("#textoCifradoAESC").val("");
}

function limpiaPanelAESDescifrado()
{
	$("#SeccionDescifradoAES").show();
	$("#SeccionInvSBox").show();

	if($('#informacionAES3D').is(':visible'))
	{
		$("#informacionAES3D").slideToggle(500);
	}
	
	if($('#informacionAES2D').is(':visible'))
	{
		$("#informacionAES2D").slideToggle(500);
	}
	
	if($('#informacionAES4D').is(':visible'))
	{
		$("#informacionAES4D").slideToggle(500);
	}	
	
	llavesGeneradasCifrado= [];	
	RConC=[];
	
	$("#informacionAES3D").empty();
	$("#informacionAES2D").empty();	
	$("#informacionAES4D").empty();
	
	$("#fila1-llaveAESDmix").empty();
	$("#fila2-llaveAESDmix").empty();
	$("#fila3-llaveAESDmix").empty();
	$("#fila4-llaveAESDmix").empty();
		
	$("#fila1-EstadoAESD").empty();
	$("#fila2-EstadoAESD").empty();
	$("#fila3-EstadoAESD").empty();
	$("#fila4-EstadoAESD").empty();	
	
	$("#fila1ISBox").empty();
	$("#fila2ISBox").empty();
	$("#fila3ISBox").empty();
	$("#fila4ISBox").empty();
	$("#fila5ISBox").empty();
	$("#fila6ISBox").empty();
	$("#fila7ISBox").empty();
	$("#fila8ISBox").empty();
	$("#fila9ISBox").empty();
	$("#fila10ISBox").empty();
	$("#fila11ISBox").empty();
	$("#fila12ISBox").empty();
	$("#fila13ISBox").empty();
	$("#fila14ISBox").empty();
	$("#fila15ISBox").empty();
	$("#fila16ISBox").empty();
	$("#fila17ISBox").empty();
	
	$("#SeccionDescifradoAES").hide();
	$("#SeccionInvSBox").hide();
		
	$("#textoCriptogramaAESDescifrado").val("");
	$("#LlaveAESDescifrado").val("");
	$("#textoDescifradoAESD").val("");
}

function obtenerVelocidadAnimacionAESCifrar()
{
	if($('#btn-cifrarAES-cifrado').val() == 1)
	{
		velocidadAnimacionCifrarAES = 0.15;
	}
	else if($('#btn-cifrarAES-cifrado').val() == 2)
	{
		velocidadAnimacionCifrarAES = 1;
	}
	else
	{
		velocidadAnimacionCifrarAES = 2.25;
	}

	$("#btn-velocidadCAES").hide();
	$("#btn-cifrarAES-cifrado").hide();
	$("#btn-cancelarCifrarAES-cifrado").show();
	seguirCifrandoAES= true;
}

function obtenerVelocidadAnimacionAESDescifrar()
{
	if($('#btn-descifrarAES-descifrado').val() == 1)
	{
		velocidadAnimacionDescifrarAES = 0.15;
	}
	else if($('#btn-descifrarAES-descifrado').val() == 2)
	{
		velocidadAnimacionDescifrarAES = 1;
	}
	else
	{
		velocidadAnimacionDescifrarAES = 2.25;
	}

	$("#btn-velocidadDAES").hide();
	$("#btn-descifrarAES-descifrado").hide();
	$("#btn-cancelarDescifrarAES-descifrado").show();
	seguirDescifrandoAES= true;
}

function generarSBox()
{	
	var i, j, resultadoMultiplicacion= 0, resultadoSuma= 0, inverso= 0, pos= 0;
	SBox= [];
	
	for(i=0; i<256; i++)
	{
		if(i==0)
		{
				resultadoMultiplicacion= multiplicarPolinomios(i, 31, 257);
				resultadoSuma= resultadoMultiplicacion^99;				
				SBox.push(resultadoSuma);
		}
		else
		{
			inverso= obtenerInversoMultiplicativo(i, 283);
			resultadoMultiplicacion= multiplicarPolinomios(inverso, 31, 257);
			resultadoSuma= resultadoMultiplicacion^99;
			SBox.push(resultadoSuma);
		}
	}
}

function obtenerInversoMultiplicativo(a, m)
{
	var u= a, v= m, g1= 1, g2= 0, j, aux;
	
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
	
	return g1;
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

function generarRConC()
{
	RConC= [];
	RConC.push(1);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(2);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(4);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(8);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(16);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(32);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(64);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(128);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(27);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
	RConC.push(54);
	RConC.push(0);
	RConC.push(0);
	RConC.push(0);
}

function expansionLlaves()
{	
	var i, j, k , l, m;
	var RotBytes= [], SubBytes= [], fila, columna, llaveAux1=[], llaveAux2= [], posSbox, posSubllaves= 0, contRcon= 0, pos;
	var llaveAESC = ($("#LlaveAESDescifrado").val()).split("");	
	var llaveAESCifrar= llaveAESC.join("");
	llavesGeneradasCifrado= [];
	
	/** SBOX Y RCON*/
	generarSBox();
	generarRConC();
	
	pos= 0;
	
	for(i=1; i<=4; i++)
	{
		for(j=1; j<=4; j++)
		{				
			valorAscii= parseInt(llaveAESCifrar[pos].charCodeAt());
			pos++;
			llavesGeneradasCifrado.push(valorAscii);
			llaveAux1.push(valorAscii);
		}			
	}
	
	for(i=0; i<10; i++) //10 Rounds
	{		
		for(j=0; j<4; j++) 
		{
			if(j==0)
			{
				RotBytes.push(llaveAux1[13]);					
				RotBytes.push(llaveAux1[14]);					
				RotBytes.push(llaveAux1[15]);										
				RotBytes.push(llaveAux1[12]);							
				
				/****SUBBYTES****/
				for(k=0; k<4; k++)
				{
					fila= (RotBytes[k]&240);
					fila= fila>>4;
					columna= (RotBytes[k]&15);
					pos= 0;
					
					posSbox= 0;											
					
					for(l=0; l<16; l++)
					{		
						for(m=0; m<16; m++)
						{
							if(l==fila&&m==columna)
							{
								SubBytes.push(SBox[posSbox]);																	
							}
							
							posSbox++;
						}
					}				
				}
				/*******/							
				
				/*******XOR*******/					
					
				for(k=0; k<4; k++)
				{					
					llaveAux2.push( (llaveAux1[posSubllaves]^SubBytes[k])^RConC[contRcon] );
					posSubllaves++;
					contRcon++;
				}								
				
				/*****/
			}
			else
			{					
				for(k=0; k<4; k++)
				{					
					llaveAux2.push( llaveAux1[posSubllaves]^llaveAux2[posSubllaves-4] );
					posSubllaves++;
				}
			}							
		}
			
		for(j= 0; j<16; j++)
		{
			llavesGeneradasCifrado.push(llaveAux2[j]);
			llaveAux1[j]= llaveAux2[j];			
		}		
		
		posSubllaves= 0;			
		RotBytes= [];
		SubBytes= [];
		
		llaveAux2= [];			
					
	}
}

async function cifrarAES()
{
	var textoPlano = ($("#textoMensajePlanoAESCifrado").val()).split("");
	var llaveAESCifrar = ($("#LlaveAESCifrado").val()).split("");	
	var i, j, k, l, m, pos= 0, posLlave2= 0;	
	var valorAscii;	
	var llaveInicialCifrado= [];
	var llaveAux1= [], llaveAux2= [];
	var RotBytes= [], SubBytes= [];
	var fila, columna, posSbox= 0, posX, posY;
	var contRcon= 0, posSubllaves= 0;
	var matrizEstadoC= [], elementoMatrizEstadoC;
	var elementoMixColumsC, mixColumsC= [], resultadosMixColumsC= [], auxMatrizEstadoC= [];
	var posLlavesGeneradas= 0;
	var cadenaCifrado= "";
	
	obtenerVelocidadAnimacionAESCifrar();
	
	limpiaPanelAESCifrado();
	$("#textoMensajePlanoAESCifrado").val(textoPlano.join(""));
	$("#LlaveAESCifrado").val(llaveAESCifrar.join(""));
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	
	/** SBOX Y RCON*/
	generarSBox();
	generarRConC();
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	
	for(i=0; i<17; i++)
	{
		if(i==0)
		{
			$("#fila"+(i+1)+"SBox").append("<td>SBox</td>");
		}
		else
		{
			$("#fila"+(i+1)+"SBox").append('<td style="text-align:center;" id="x'+(i-1)+'">'+(i-1).toString(16)+'</td>');
		}
		
		for(j=0; j<17; j++)
		{
			if(i==0)
			{
				if(j>0)
				{
					$("#fila"+(i+1)+"SBox").append('<td style="text-align:center;" id="y'+(j-1)+'">'+(j-1).toString(16)+'</td>');
				}
			}
			else
			{
				if(j>0)
				{
					$("#fila"+(i+1)+"SBox").append('<td style="text-align:center;" id="columnaSbox'+pos+'">'+SBox[pos].toString(16)+'</td>');
					pos++;
				}
			}
		}
		
		if(!seguirCifrandoAES)
		{
			return;
		}
	}
	
	pos= 0;
	
	for(i=0; i<10; i++)
	{
		for(j= 0; j<4; j++)
		{			
			$("#fila"+(j+1)+"RConC").append('<td style="text-align:center;" id="columnaRConC'+pos+'">'+RConC[pos].toString(16)+'</td>');
			pos++;
		}
		
		if(!seguirCifrandoAES)
		{
			return;
		}
	}		
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	/***/
	
	$("#SeccionGeneracionLlaves").show();
	
	$("#informacionAES1C").append("Se mostrará a continuación el proceso para la generación de subllaves, se trabajará con AES-128 por lo que a parte de la llave inicial hay que obtener otras 10 para cada una de las rondas. Todo los valores se trabajarán en hexadecimal.");
	$("#informacionAES1C").slideToggle(500);
	await sleepAES(8750);
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	
	$("#informacionAES1C").slideToggle(500);
	await sleepAES(500);
	$("#informacionAES1C").empty();
	$("#informacionAES1C").append("Como primer paso escribimos la llave inicial de la siguiente forma:");
	$("#informacionAES1C").slideToggle(500);
	await sleepAES(2750);
	
	if(!seguirCifrandoAES)
	{
		return;
	}	
	
	posicion = $("#tablaGeneracionLlavesCAES").offset().top;
	$("html, body").animate({scrollTop: posicion}, 500);
	
	pos= 0;
	
	for(i=1; i<=4; i++)
	{
		for(j=1; j<=4; j++)
		{
			valorAscii= llaveAESCifrar[pos].charCodeAt();			
			$("#fila"+j+"-GLlavesCAES").append('<td style="text-align:center;" id="columnaLlaveC'+pos+'">'+valorAscii.toString(16)+'</td>');
			pos++;
			llavesGeneradasCifrado.push(valorAscii);
			llaveInicialCifrado.push(valorAscii);			
			await sleepAES(100*velocidadAnimacionCifrarAES);
			
			if(!seguirCifrandoAES)
			{
				return;
			}
		}
		
		if(!seguirCifrandoAES)
		{
			return;
		}
	}
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	
	//GENERACION SUBLLAVES
	
	for(i=0; i<16; i++)
	{		
		llaveAux1.push(llaveInicialCifrado[i]);
	}
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	
	pos= 0;
	
	/***************************INICIA EXPANSION LLAVES****************************/
	
	for(i=0; i<10; i++) //10 Rounds
	{
		if(i==0)
		{
			$("#informacionAES1C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES1C").empty();
			$("#informacionAES1C").append("Realizamos la operación Rotword a la última columna de la llave inicial:");
			$("#informacionAES1C").slideToggle(500);
			await sleepAES(3250);		
		
			if(!seguirCifrandoAES)
			{
				return;
			}
		
			for(j=0; j<4; j++) 
			{
				if(j==0)
				{
					$("#columnaLlaveC12").css("backgroundColor", "#AEC6FC");
					$("#columnaLlaveC13").css("backgroundColor", "#AEC6FC");
					$("#columnaLlaveC14").css("backgroundColor", "#AEC6FC");
					$("#columnaLlaveC15").css("backgroundColor", "#AEC6FC");
					$("#columnaLlave2C0").css("backgroundColor", "#AEC6FC");
					$("#columnaLlave2C1").css("backgroundColor", "#AEC6FC");
					$("#columnaLlave2C2").css("backgroundColor", "#AEC6FC");
					$("#columnaLlave2C3").css("backgroundColor", "#AEC6FC");
					await sleepAES(200*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					RotBytes.push(llaveAux1[13]);
					$("#columnaLlave2C0").append(RotBytes[0].toString(16));
					await sleepAES(250*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					RotBytes.push(llaveAux1[14]);
					$("#columnaLlave2C1").append(RotBytes[1].toString(16));
					await sleepAES(250*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					RotBytes.push(llaveAux1[15]);
					$("#columnaLlave2C2").append(RotBytes[2].toString(16));
					await sleepAES(250*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					RotBytes.push(llaveAux1[12]);
					$("#columnaLlave2C3").append(RotBytes[3].toString(16));
					await sleepAES(250*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaLlaveC12").css("backgroundColor", "transparent");
					$("#columnaLlaveC13").css("backgroundColor", "transparent");
					$("#columnaLlaveC14").css("backgroundColor", "transparent");
					$("#columnaLlaveC15").css("backgroundColor", "transparent");
					$("#columnaLlave2C0").css("backgroundColor", "transparent");
					$("#columnaLlave2C1").css("backgroundColor", "transparent");
					$("#columnaLlave2C2").css("backgroundColor", "transparent");
					$("#columnaLlave2C3").css("backgroundColor", "transparent");
					await sleepAES(200*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#informacionAES1C").slideToggle(500);
					await sleepAES(500);
					$("#informacionAES1C").empty();
					$("#informacionAES1C").append("Realizamos la operación SubBytes a cada valor de la primer columna de la nueva subllave:");
					$("#informacionAES1C").slideToggle(500);				
					await sleepAES(3000);
					
					if(!seguirCifrandoAES)
					{
						return;
					}							
					
					/****SUBBYTES****/
					for(k=0; k<4; k++)
					{
						fila= (RotBytes[k]&240);
						fila= fila>>4;
						columna= (RotBytes[k]&15);
						pos= 0;
						
						$("#columnaLlave2C"+k).css("backgroundColor", "#FDFD96");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
						{
							return;
						}
						
						
						$("#SeccionSBox").show();
						
						if(velocidadAnimacionCifrarAES!=0.15)
						{
						posicion = $("#SeccionSBox").offset().top-75;
						$("html, body").animate({scrollTop: posicion}, 1000);
						}
						
						if(!seguirCifrandoAES)
						{
							return;
						}
						
						if(k==0)
						{
							$("#informacionAES2C").append("Buscamos en la Sbox el valor por el cual se reemplazará: "+RotBytes[k].toString(16)+" donde "+fila.toString(16)+" nos indica la fila y "+columna.toString(16)+" la columna:");
							$("#informacionAES2C").slideToggle(500);
							await sleepAES(6000);
							
							if(!seguirCifrandoAES)
							{
								return;
							}
						}
						
						if(!seguirCifrandoAES)
						{
							return;
						}
						
						for(l=0; l<16; l++)
						{
							$("#x"+l).css("backgroundColor", "#FDFD96");
							await sleepAES(100*velocidadAnimacionCifrarAES);
							
							if(!seguirCifrandoAES)
							{
								return;
							}
							
							if($("#x"+l).text()==fila.toString(16))
							{							
								$("#x"+l).css("backgroundColor", "#77DD77");
								await sleepAES(100*velocidadAnimacionCifrarAES);
								
								if(!seguirCifrandoAES)
								{
									return;
								}
								
								posX= l;
								l= 16;
								
								for(m=0; m<16; m++)
								{
									$("#y"+m).css("backgroundColor", "#FDFD96");
									await sleepAES(100*velocidadAnimacionCifrarAES);
									
									if(!seguirCifrandoAES)
									{
										return;
									}
									
									if($("#y"+m).text()==columna.toString(16))
									{
										$("#y"+m).css("backgroundColor", "#77DD77");
										await sleepAES(100*velocidadAnimacionCifrarAES);
										
										if(!seguirCifrandoAES)
										{
											return;
										}
										
										posY= m;
										m= 16;
									}
									
									$("#y"+m).css("backgroundColor", "transparent");
									await sleepAES(100*velocidadAnimacionCifrarAES);
									
									if(!seguirCifrandoAES)
									{
										return;
									}
								}
							}											
							
							$("#x"+l).css("backgroundColor", "transparent");
							await sleepAES(100*velocidadAnimacionCifrarAES);
							
							if(!seguirCifrandoAES)
							{
								return;
							}
						}
						
						posSbox= 0;
						
						if(!seguirCifrandoAES)
						{
							return;
						}
						
						for(l=0; l<16; l++)
						{		
							for(m=0; m<16; m++)
							{
								if(l==posX&&m==posY)
								{								
									$("#columnaSbox"+posSbox).css("backgroundColor", "#77DD77");
									await sleepAES(100*velocidadAnimacionCifrarAES);
									
									if(!seguirCifrandoAES)
									{
										return;
									}
									
									SubBytes.push(SBox[posSbox]);
									await sleepAES(1000*velocidadAnimacionCifrarAES);
									
									if(!seguirCifrandoAES)
									{
										return;
									}
									
									$("#x"+l).css("backgroundColor", "transparent");
									$("#y"+m).css("backgroundColor", "transparent");
									$("#columnaSbox"+posSbox).css("backgroundColor", "transparent");								
									await sleepAES(100*velocidadAnimacionCifrarAES);
									
									if(!seguirCifrandoAES)
									{
										return;
									}
								}
								
								posSbox++;
							}
						}
						
						$("#SeccionSBox").hide();											
											
						$("#columnaLlave2C"+k+"").css("backgroundColor", "#77DD77");
						$("#columnaLlave2C"+k+"").html(SubBytes[k].toString(16));
						await sleepAES(1000*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
						{
							return;
						}
		
						$("#columnaLlave2C"+k+"").css("backgroundColor", "transparent");
						await sleepAES(50*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
						{
							return;
						}
						
						if(k==0)
						{
							$("#informacionAES2C").slideToggle(500);
							await sleepAES(500);
							$("#informacionAES2C").empty();
							
							if(!seguirCifrandoAES)
							{
								return;
							}
						}
						
						if(!seguirCifrandoAES)
						{
							return;
						}
					
					}
					/*******/
					
					/*******XOR*******/
					$("#informacionAES1C").slideToggle(500);
						await sleepAES(500);
						$("#informacionAES1C").empty();
						$("#informacionAES1C").append("Para el siguiente paso realizamos la operación XOR entre la primera columna de la llave inicial, la columna de la nueva subllave y la primera columna de la matriz RCON(para las siguientes rondas se van tomando las siguientes columnas de RCON):");
						$("#informacionAES1C").slideToggle(500);				
						await sleepAES(7500);
						
					if(!seguirCifrandoAES)
					{
						return;
					}
						
					$("#SeccionRCon").show();
						
					for(k=0; k<4; k++)
					{					
						llaveAux2.push( (llaveAux1[posSubllaves]^SubBytes[k])^RConC[contRcon] );
						posSubllaves++;
						contRcon++;
					}
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaLlaveC0").css("backgroundColor", "#FDFD96");				
					$("#columnaLlaveC1").css("backgroundColor", "#FDFD96");
					$("#columnaLlaveC2").css("backgroundColor", "#FDFD96");
					$("#columnaLlaveC3").css("backgroundColor", "#FDFD96");
					
					await sleepAES(1000*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaRConC0").css("backgroundColor", "#FDFD96");
					$("#columnaRConC1").css("backgroundColor", "#FDFD96");
					$("#columnaRConC2").css("backgroundColor", "#FDFD96");
					$("#columnaRConC3").css("backgroundColor", "#FDFD96");
					
					await sleepAES(2000*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaLlave2C0").css("backgroundColor", "#77DD77");
					$("#columnaLlave2C1").css("backgroundColor", "#77DD77");
					$("#columnaLlave2C2").css("backgroundColor", "#77DD77");
					$("#columnaLlave2C3").css("backgroundColor", "#77DD77");
					
					$("#columnaLlave2C0").html(llaveAux2[0].toString(16));
					$("#columnaLlave2C1").html(llaveAux2[1].toString(16));
					$("#columnaLlave2C2").html(llaveAux2[2].toString(16));
					$("#columnaLlave2C3").html(llaveAux2[3].toString(16));
					
					await sleepAES(1000*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaLlaveC0").css("backgroundColor", "transparent");				
					$("#columnaLlaveC1").css("backgroundColor", "transparent");
					$("#columnaLlaveC2").css("backgroundColor", "transparent");
					$("#columnaLlaveC3").css("backgroundColor", "transparent");
					
					$("#columnaLlave2C0").css("backgroundColor", "transparent");
					$("#columnaLlave2C1").css("backgroundColor", "transparent");
					$("#columnaLlave2C2").css("backgroundColor", "transparent");
					$("#columnaLlave2C3").css("backgroundColor", "transparent");
					
					$("#columnaRConC0").css("backgroundColor", "transparent");
					$("#columnaRConC1").css("backgroundColor", "transparent");
					$("#columnaRConC2").css("backgroundColor", "transparent");
					$("#columnaRConC3").css("backgroundColor", "transparent");
					
					$("#SeccionRCon").hide();
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					/*****/
				}
				else
				{
					if(j==1)
					{
						$("#informacionAES1C").slideToggle(500);
							await sleepAES(500);
							$("#informacionAES1C").empty();
							$("#informacionAES1C").append("Para obtener las otras 3 columnas de la nueva subllave se realiza la operación XOR entre las columnas de la llave inicial y de la nueva subllave de la siguiente manera:");
							$("#informacionAES1C").slideToggle(500);				
							await sleepAES(6250);
							
							if(!seguirCifrandoAES)
							{
								return;
							}
					}
						
					for(k=0; k<4; k++)
					{					
						llaveAux2.push( llaveAux1[posSubllaves]^llaveAux2[posSubllaves-4] );
						
						$("#columnaLlaveC"+posSubllaves).css("backgroundColor", "#FDFD96");
						await sleepAES(250*velocidadAnimacionCifrarAES);
						if(!seguirCifrandoAES)
					{
						return;
					}
						$("#columnaLlave2C"+(posSubllaves-4)).css("backgroundColor", "#AEC6FC");
						await sleepAES(250*velocidadAnimacionCifrarAES);
						if(!seguirCifrandoAES)
					{
						return;
					}
						$("#columnaLlave2C"+posSubllaves).css("backgroundColor", "#77DD77");
						$("#columnaLlave2C"+posSubllaves).html(llaveAux2[posSubllaves].toString(16));
						await sleepAES(250*velocidadAnimacionCifrarAES);
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaLlaveC"+posSubllaves).css("backgroundColor", "transparent");
						$("#columnaLlave2C"+(posSubllaves-4)).css("backgroundColor", "transparent");
						$("#columnaLlave2C"+posSubllaves).css("backgroundColor", "transparent");
						
						posSubllaves++;					
					}
				}
				
				if(!seguirCifrandoAES)
					{
						return;
					}
			}
		}
		else
		{
			if(i==1)
			{
				$("#informacionAES1C").slideToggle(500);
				await sleepAES(500);
				$("#informacionAES1C").empty();
				$("#informacionAES1C").append("Para obtener las otras 9 subllaves se sigue exactamente el mismo procedimiento sólo que en cada ronda se tomará como llave inicial la subllave generada en la ronda anterior.");
				$("#informacionAES1C").slideToggle(500);
				await sleepAES(7500);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#SeccionGeneracionLlaves").hide();
			}
			
			for(j=0; j<4; j++) 
			{
				if(j==0)
				{
					RotBytes.push(llaveAux1[13]);										
					RotBytes.push(llaveAux1[14]);					
					RotBytes.push(llaveAux1[15]);					
					RotBytes.push(llaveAux1[12]);					
					
					for(k=0; k<4; k++)
					{
						fila= (RotBytes[k]&240);
						fila= fila>>4;
						columna= (RotBytes[k]&15);
						pos= 0;						
						posSbox= 0;
						
						for(l=0; l<16; l++)
						{		
							for(m=0; m<16; m++)
							{
								if(l==fila&&m==columna)
								{									
									SubBytes.push(SBox[posSbox]);
								}
								
								posSbox++;
							}
						}
					}
					
					for(k=0; k<4; k++)
					{					
						llaveAux2.push( (llaveAux1[posSubllaves]^SubBytes[k])^RConC[contRcon] );
						posSubllaves++;
						contRcon++;
					}
				}
				else
				{
					for(k=0; k<4; k++)
					{					
						llaveAux2.push( llaveAux1[posSubllaves]^llaveAux2[posSubllaves-4] );						
						posSubllaves++;					
					}
				}
				
				if(!seguirCifrandoAES)
					{
						return;
					}
			}
		}
		
		if(!seguirCifrandoAES)
					{
						return;
					}
		
		for(j= 0; j<16; j++)
		{
			llavesGeneradasCifrado.push(llaveAux2[j]);
			llaveAux1[j]= llaveAux2[j];				
		}		
		
		posSubllaves= 0;			
		RotBytes= [];
		SubBytes= [];
		
		llaveAux2= [];
		
		if(!seguirCifrandoAES)
		{
			return;
		}
	}
	
	/*******************************FIN EXPANSION LLAVES*/
	
	/**************************INICIO CIFRADO AES****************************/
	
	$("#SeccionCifradoAES").show();
	
	for(i= 0; i<11; i++)
	{
		if(i==0)
		{			
			$("#informacionAES3C").append("Para comenzar el cifrado, llenamos la matriz estado con el texto claro en hexadecimal, el cual debe tener 16 caracteres, en caso contrario, llenamos con ceros:");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(5600);
			
			if(!seguirCifrandoAES)
			{
				return;
			}
			
			/******************LLENAR MATRIZ ESTADO*************************/			

			pos= 0;
			var pos2= 0;
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					if(pos==textoPlano.length && textoPlano.length!=16)
					{						
						$("#fila"+k+"-EstadoAESC").append('<td style="text-align:center;" id="columnaMatrizEstadoC'+pos2+'">0</td>');
						pos2++;				
						matrizEstadoC.push(0);					
						await sleepAES(100*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
						{
							return;
						}
					}
					else
					{
						valorAscii= textoPlano[pos].charCodeAt();			
						$("#fila"+k+"-EstadoAESC").append('<td style="text-align:center;" id="columnaMatrizEstadoC'+pos+'">'+valorAscii.toString(16)+'</td>');
						pos++;
						pos2= pos;
						matrizEstadoC.push(valorAscii);					
						await sleepAES(100*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
						{
							return;
						}
					}
					
				}
				
				if(!seguirCifrandoAES)
				{
					return;
				}
			}
			/****************FIN LLENAR MATRIZ ESTADO*/
			
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("El cifrado se compone de 11 rondas, en cada ronda se usa cada una de las subllaves generadas en el proceso anterior, comenzando con la llave inicial:");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(4500);
			$("#informacionAES4C").append("Llave inicial:");
			$("#informacionAES4C").show();
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************LLENAR LLAVE INICIAL*************************/
			pos= 0;
			llaveAux1= [];
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];
					$("#fila"+k+"-llaveAESCmix").append('<td style="text-align:center;" id="columnaSubLlaveMixC'+pos+'">'+valorAscii.toString(16)+'</td>');
					pos++;
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);
					await sleepAES(100*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirCifrandoAES)
				{
					return;
				}
			}
			/****************FIN LLENAR LLAVE INICIAL*/
			
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("Para la primera ronda solamente aplicamos la operación AddRoundKey que consiste en realizar un XOR entre cada elemento de la matriz estado con la llave inicial, se hace de la siguiente forma: (Los resultados se van actualizando en la matriz estado)");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(9000);
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/**************************INICIA ADDROUNDKEY************************/					
			
			for(j= 0; j<16; j++)
			{
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#columnaSubLlaveMixC"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "#77DD77");
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];
				$("#columnaMatrizEstadoC"+j).html(matrizEstadoC[j].toString(16));
				await sleepAES(250*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "transparent");
				$("#columnaSubLlaveMixC"+j).css("backgroundColor", "transparent");
			}					
			
			/************FIN ADDROUNDKEY*/										
		}
		else if(i==1)
		{
			/******************************INICIO SUBYTES**************************/
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("Para la segunda ronda primero se realiza la operación SubBytes con todos los elementos de la matriz estado:");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(3600);
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			for(j=0; j<16; j++)
			{
				fila= (matrizEstadoC[j]&240);
				fila= fila>>4;
				columna= (matrizEstadoC[j]&15);
				pos= 0;
				
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(100*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				
				$("#SeccionSBox").show();
				if(velocidadAnimacionCifrarAES!=0.15)
				{
				posicion = $("#SeccionSBox").offset().top-75;
				$("html, body").animate({scrollTop: posicion}, 1000);
				}
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				for(k=0; k<16; k++)
				{
					$("#x"+k).css("backgroundColor", "#AEC6FC");
					await sleepAES(100*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					if($("#x"+k).text()==fila.toString(16))
					{							
						$("#x"+k).css("backgroundColor", "#77DD77");
						await sleepAES(100*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						posX= k;
						k= 16;
						
						for(l=0; l<16; l++)
						{
							$("#y"+l).css("backgroundColor", "#AEC6FC");
							await sleepAES(100*velocidadAnimacionCifrarAES);
							
							if(!seguirCifrandoAES)
					{
						return;
					}
							
							if($("#y"+l).text()==columna.toString(16))
							{
								$("#y"+l).css("backgroundColor", "#77DD77");
								await sleepAES(100*velocidadAnimacionCifrarAES);
								
								if(!seguirCifrandoAES)
					{
						return;
					}
								
								posY= l;
								l= 16;
							}
							
							$("#y"+l).css("backgroundColor", "transparent");
							await sleepAES(100*velocidadAnimacionCifrarAES);
							
							if(!seguirCifrandoAES)
					{
						return;
					}
						}
					}											
					
					$("#x"+k).css("backgroundColor", "transparent");
					await sleepAES(100*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
				}
				
				posSbox= 0;							
				
				for(k=0; k<16; k++)
				{		
					for(l=0; l<16; l++)
					{
						if(k==posX&&l==posY)
						{								
							$("#columnaSbox"+posSbox).css("backgroundColor", "#77DD77");
							await sleepAES(100*velocidadAnimacionCifrarAES);
							
							if(!seguirCifrandoAES)
					{
						return;
					}
							
							await sleepAES(1000*velocidadAnimacionCifrarAES);
							matrizEstadoC[j]= SBox[posSbox];
							$("#columnaMatrizEstadoC"+j+"").html(matrizEstadoC[j].toString(16));
							
							if(!seguirCifrandoAES)
					{
						return;
					}
							
							$("#x"+k).css("backgroundColor", "transparent");
							$("#y"+l).css("backgroundColor", "transparent");
							$("#columnaSbox"+posSbox).css("backgroundColor", "transparent");
							await sleepAES(100*velocidadAnimacionCifrarAES);
							
							if(!seguirCifrandoAES)
					{
						return;
					}
						}
						
						posSbox++;
					}
				}
				
				$("#SeccionSBox").hide();							
									
				$("#columnaMatrizEstadoC"+j+"").css("backgroundColor", "#77DD77");				
				await sleepAES(1000*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
									
				$("#columnaMatrizEstadoC"+j+"").css("backgroundColor", "transparent");
				await sleepAES(100*velocidadAnimacionCifrarAES);			
				
				if(!seguirCifrandoAES)
					{
						return;
					}
			}
			
			if(!seguirCifrandoAES)
					{
						return;
					}
					
			/******************FIN SUBBYTES*/
			
			/******************************INICIO SHIFTROWS**************************/
			
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("En el siguiente paso se aplica la operación ShiftRows, cada fila de la matriz estado, a excepción de la primera, se rotan circularmente hacia la izquierda los elementos, en la segunda fila se rotan una posición, en la tercera dos posiciones y en la cuarta tres posiciones:");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(11000);
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=3; j++)
			{							
				if(j==1)
				{
					elementoMatrizEstadoC= matrizEstadoC[1];
					matrizEstadoC[1]= matrizEstadoC[5];
					matrizEstadoC[5]= matrizEstadoC[9];
					matrizEstadoC[9]= matrizEstadoC[13];
					matrizEstadoC[13]= elementoMatrizEstadoC;									
					
					$("#columnaMatrizEstadoC1").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC1").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoC1").html("");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoC5").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC5").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoC5").html("");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC1").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoC1").html(matrizEstadoC[1].toString(16));
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC1").css("backgroundColor", "transparent");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoC9").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC9").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoC9").html("");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC5").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoC5").html(matrizEstadoC[5].toString(16));
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC5").css("backgroundColor", "transparent");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoC13").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC13").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoC13").html("");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC9").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoC9").html(matrizEstadoC[9].toString(16));
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC9").css("backgroundColor", "transparent");
					await sleepAES(25*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoC13").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoC13").html(matrizEstadoC[13].toString(16));
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC13").css("backgroundColor", "transparent");					
					await sleepAES(25*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
				}
				else if(j==2)
				{
					for(k=0; k<2; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[2];
						matrizEstadoC[2]= matrizEstadoC[6];
						matrizEstadoC[6]= matrizEstadoC[10];
						matrizEstadoC[10]= matrizEstadoC[14];
						matrizEstadoC[14]= elementoMatrizEstadoC;									
						
						$("#columnaMatrizEstadoC2").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC2").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC2").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC6").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC6").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC6").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC2").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC2").html(matrizEstadoC[2].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC2").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC10").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC10").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC10").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC6").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC6").html(matrizEstadoC[6].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC6").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC14").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC14").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC14").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC10").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC10").html(matrizEstadoC[10].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC10").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC14").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC14").html(matrizEstadoC[14].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC14").css("backgroundColor", "transparent");					
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
					}
				}
				else
				{
					for(k=0; k<3; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[3];
						matrizEstadoC[3]= matrizEstadoC[7];
						matrizEstadoC[7]= matrizEstadoC[11];
						matrizEstadoC[11]= matrizEstadoC[15];
						matrizEstadoC[15]= elementoMatrizEstadoC;									
						
						$("#columnaMatrizEstadoC3").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC3").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC3").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC7").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC7").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC7").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC3").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC3").html(matrizEstadoC[3].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC3").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC11").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC11").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC11").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC7").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC7").html(matrizEstadoC[7].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC7").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC15").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC15").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoC15").html("");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC11").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC11").html(matrizEstadoC[11].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC11").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoC15").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoC15").html(matrizEstadoC[15].toString(16));
						await sleepAES(500*velocidadAnimacionCifrarAES);
						$("#columnaMatrizEstadoC15").css("backgroundColor", "transparent");					
						await sleepAES(25*velocidadAnimacionCifrarAES);
						
						if(!seguirCifrandoAES)
					{
						return;
					}
					}
				}
			}
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************FIN SHIFTROWS*/
			
			/******************************INICIO MIXCOLUMS**************************/
			
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("El siguiente paso se llama MixColums y consiste en multiplicar cada columna de la matriz Estado por una matriz ya definida:");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(5250);
			$("#informacionAES4C").hide();
			$("#informacionAES4C").empty();
			$("#informacionAES4C").append("MixColums:");
			$("#informacionAES4C").show();
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			mixColumsC= [];
			
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC0").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC1").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC2").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC3").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC4").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC5").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC6").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC7").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC8").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC9").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC10").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC11").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC12").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC13").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC14").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixC15").html(elementoMixColumsC.toString(16));
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			auxMatrizEstadoC= matrizEstadoC.slice();
			
			for(k= 0; k<4; k++)
			{
				$("#columnaMatrizEstadoC"+(4*k)).css("backgroundColor", "#AEC6FC");
				$("#columnaMatrizEstadoC"+(1+(4*k))).css("backgroundColor", "#AEC6FC");
				$("#columnaMatrizEstadoC"+(2+(4*k))).css("backgroundColor", "#AEC6FC");
				$("#columnaMatrizEstadoC"+(3+(4*k))).css("backgroundColor", "#AEC6FC");
				await sleepAES(500*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
					
				for(j=0; j<4; j++)
				{
					$("#columnaSubLlaveMixC"+j).css("backgroundColor", "#AEC6FC");
					$("#columnaSubLlaveMixC"+(j+4)).css("backgroundColor", "#AEC6FC");
					$("#columnaSubLlaveMixC"+(j+8)).css("backgroundColor", "#AEC6FC");
					$("#columnaSubLlaveMixC"+(j+12)).css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionCifrarAES);						
					
					if(!seguirCifrandoAES)
					{
						return;
					}
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));					
										
					matrizEstadoC[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
					
					$("#columnaMatrizEstadoC"+(4*k+j)).html(matrizEstadoC[4*k+j].toString(16));
					$("#columnaMatrizEstadoC"+(4*k+j)).css("backgroundColor", "#77DD77");
					await sleepAES(500*velocidadAnimacionCifrarAES);
					$("#columnaMatrizEstadoC"+(4*k+j)).css("backgroundColor", "#AEC6FC");
					
					if(!seguirCifrandoAES)
					{
						return;
					}
					
					$("#columnaSubLlaveMixC"+j).css("backgroundColor", "transparent");
					$("#columnaSubLlaveMixC"+(j+4)).css("backgroundColor", "transparent");
					$("#columnaSubLlaveMixC"+(j+8)).css("backgroundColor", "transparent");
					$("#columnaSubLlaveMixC"+(j+12)).css("backgroundColor", "transparent");
					
					resultadosMixColumsC= [];
				}
				
				$("#columnaMatrizEstadoC"+(4*k)).css("backgroundColor", "transparent");
				$("#columnaMatrizEstadoC"+(1+(4*k))).css("backgroundColor", "transparent");
				$("#columnaMatrizEstadoC"+(2+(4*k))).css("backgroundColor", "transparent");
				$("#columnaMatrizEstadoC"+(3+(4*k))).css("backgroundColor", "transparent");
				
				if(!seguirCifrandoAES)
					{
						return;
					}
			}
						
			/******************FIN MIXCOLUMS*/
			
			/******************************INICIO ADDROUNDKEY**************************/
			
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("El último paso es la operación AddRoundKey, por lo que usamos la siguiente subllave y realizamos el proceso:");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(3200);
			$("#informacionAES4C").hide();
			$("#informacionAES4C").empty();
			$("#informacionAES4C").append("Subllave:");
			$("#informacionAES4C").show();
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			pos= 0;
			llaveAux1= [];
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];
					$("#columnaSubLlaveMixC"+pos).html(valorAscii.toString(16));
					pos++;
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);
					await sleepAES(100*velocidadAnimacionCifrarAES);
					
					if(!seguirCifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirCifrandoAES)
				{
					return;
				}
			}
			
			for(j= 0; j<16; j++)
			{
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#columnaSubLlaveMixC"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "#77DD77");
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];
				$("#columnaMatrizEstadoC"+j).html(matrizEstadoC[j].toString(16));
				await sleepAES(250*velocidadAnimacionCifrarAES);
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoC"+j).css("backgroundColor", "transparent");
				$("#columnaSubLlaveMixC"+j).css("backgroundColor", "transparent");
			}				
			
			/******************FIN ADDROUNDKEY*/
		}
		else if(i==10)
		{
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3C").empty();
			$("#informacionAES3C").append("Para la última ronda se realizan las mismas operaciones excepto MixColums.");
			$("#informacionAES3C").slideToggle(500);
			await sleepAES(2200);
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************************INICIO SUBYTES**************************/
			for(j=0; j<16; j++)
			{
				fila= (matrizEstadoC[j]&240);
				fila= fila>>4;
				columna= (matrizEstadoC[j]&15);
				pos= 0;														
												
				posSbox= 0;
				
				for(k=0; k<16; k++)
				{		
					for(l=0; l<16; l++)
					{
						if(k==fila&&l==columna)
						{								
							matrizEstadoC[j]= SBox[posSbox];							
						}
						
						posSbox++;
					}
				}							
			}
			
			if(!seguirCifrandoAES)
					{
						return;
					}
					
			/******************FIN SUBBYTES*/
			
			/******************************INICIO SHIFTROWS**************************/	

if(!seguirCifrandoAES)
					{
						return;
					}			
			
			for(j=1; j<=3; j++)
			{							
				if(j==1)
				{
					elementoMatrizEstadoC= matrizEstadoC[1];
					matrizEstadoC[1]= matrizEstadoC[5];
					matrizEstadoC[5]= matrizEstadoC[9];
					matrizEstadoC[9]= matrizEstadoC[13];
					matrizEstadoC[13]= elementoMatrizEstadoC;																		
				}
				else if(j==2)
				{
					for(k=0; k<2; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[2];
						matrizEstadoC[2]= matrizEstadoC[6];
						matrizEstadoC[6]= matrizEstadoC[10];
						matrizEstadoC[10]= matrizEstadoC[14];
						matrizEstadoC[14]= elementoMatrizEstadoC;																				
					}
				}
				else
				{
					for(k=0; k<3; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[3];
						matrizEstadoC[3]= matrizEstadoC[7];
						matrizEstadoC[7]= matrizEstadoC[11];
						matrizEstadoC[11]= matrizEstadoC[15];
						matrizEstadoC[15]= elementoMatrizEstadoC;											
					}
				}
			}
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************FIN SHIFTROWS*/					
			
			/******************************INICIO ADDROUNDKEY**************************/								
			pos= 0;
			llaveAux1= [];
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);					
					
					if(!seguirCifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirCifrandoAES)
				{
					return;
				}
			}
			
			for(j= 0; j<16; j++)
			{																			
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];				
			}			
			
			if(!seguirCifrandoAES)
					{
						return;
					}
					
			/******************FIN ADDROUNDKEY*/
		}
		else
		{
			if(i==2)
			{
				$("#informacionAES3C").slideToggle(500);
				await sleepAES(500);
				$("#informacionAES3C").empty();
				$("#informacionAES3C").append("El proceso de la ronda 2 se repite para las siguientes rondas, excepto en la última.");
				$("#informacionAES3C").slideToggle(500);
				await sleepAES(3200);
				$("#informacionAES4C").hide();
				$("#informacionAES4C").empty();
				
				if(!seguirCifrandoAES)
					{
						return;
					}
				
				for(j= 0; j<16; j++)
				{
					$("#columnaSubLlaveMixC"+j).html("");
				}
			}

			/******************************INICIO SUBYTES**************************/
			for(j=0; j<16; j++)
			{
				fila= (matrizEstadoC[j]&240);
				fila= fila>>4;
				columna= (matrizEstadoC[j]&15);
				pos= 0;														
												
				posSbox= 0;
				
				for(k=0; k<16; k++)
				{		
					for(l=0; l<16; l++)
					{
						if(k==fila&&l==columna)
						{								
							matrizEstadoC[j]= SBox[posSbox];							
						}
						
						posSbox++;
					}
				}							
			}
			
			if(!seguirCifrandoAES)
					{
						return;
					}
					
			/******************FIN SUBBYTES*/
			
			/******************************INICIO SHIFTROWS**************************/					
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=3; j++)
			{							
				if(j==1)
				{
					elementoMatrizEstadoC= matrizEstadoC[1];
					matrizEstadoC[1]= matrizEstadoC[5];
					matrizEstadoC[5]= matrizEstadoC[9];
					matrizEstadoC[9]= matrizEstadoC[13];
					matrizEstadoC[13]= elementoMatrizEstadoC;																		
				}
				else if(j==2)
				{
					for(k=0; k<2; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[2];
						matrizEstadoC[2]= matrizEstadoC[6];
						matrizEstadoC[6]= matrizEstadoC[10];
						matrizEstadoC[10]= matrizEstadoC[14];
						matrizEstadoC[14]= elementoMatrizEstadoC;																				
					}
				}
				else
				{
					for(k=0; k<3; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[3];
						matrizEstadoC[3]= matrizEstadoC[7];
						matrizEstadoC[7]= matrizEstadoC[11];
						matrizEstadoC[11]= matrizEstadoC[15];
						matrizEstadoC[15]= elementoMatrizEstadoC;											
					}
				}
			}
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************FIN SHIFTROWS*/
			
			/******************************INICIO MIXCOLUMS**************************/
			
			mixColumsC= [];
			
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 1;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 3;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 2;
			mixColumsC.push(elementoMixColumsC);
			
			auxMatrizEstadoC= matrizEstadoC.slice();
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			for(k= 0; k<4; k++)
			{								
				for(j=0; j<4; j++)
				{				
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));
										
					matrizEstadoC[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
					
					resultadosMixColumsC= [];
				}							
			}
			
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************FIN MIXCOLUMS*/
			
			/******************************INICIO ADDROUNDKEY**************************/								
			pos= 0;
			llaveAux1= [];
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];										
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);					
					
					if(!seguirCifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirCifrandoAES)
				{
					return;
				}
			}
			
			for(j= 0; j<16; j++)
			{																			
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];				
			}			
			
			if(!seguirCifrandoAES)
					{
						return;
					}
			
			/******************FIN ADDROUNDKEY*/
		}	
	}
	
	/*****************FIN CIFRADO AES*/
	
	$("#informacionAES3C").slideToggle(500);
	await sleepAES(500);
	$("#informacionAES3C").empty();
	$("#informacionAES3C").append("Después de las 11 rondas, el texto cifrado obtenido es el siguiente:");
	$("#informacionAES3C").slideToggle(500);
	await sleepAES(2200);
	
	if(!seguirCifrandoAES)
	{
		return;
	}
	
	/******************LLENAR MATRIZ ESTADO*************************/
	pos= 0;
	
	for(j=1; j<=4; j++)
	{
		for(k=1; k<=4; k++)
		{
			valorAscii= matrizEstadoC[pos];
			if(valorAscii<16)
			{
				$("#columnaMatrizEstadoC"+pos).html("0"+valorAscii.toString(16));
				cadenaCifrado= cadenaCifrado+"0"+valorAscii.toString(16);
			}
			else
			{
				$("#columnaMatrizEstadoC"+pos).html(valorAscii.toString(16));
				cadenaCifrado= cadenaCifrado+valorAscii.toString(16);
			}			
			
			pos++;			
			await sleepAES(100*velocidadAnimacionCifrarAES);
			
			if(!seguirCifrandoAES)
			{
				return;
			}
		}
		
		if(!seguirCifrandoAES)
		{
			return;
		}
	}
	/****************FIN LLENAR MATRIZ ESTADO*/
	
	posicion = $("#textoCifradoAESC").offset().top;
	$("html, body").animate({scrollTop: posicion}, 500);
	
	$("#btn-velocidadCAES").show();
	$("#btn-cifrarAES-cifrado").show();
	$("#btn-cancelarCifrarAES-cifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_7);
	$("#textoCifradoAESC").val(cadenaCifrado);
}

async function descifrarAES()
{	
	var tP = ($("#textoCriptogramaAESDescifrado").val()).split("");
	var textoPlano= tP.join("");
	var llaveAESCifrar = ($("#LlaveAESDescifrado").val()).split("");		
	var i, j, k, l, m, pos= 0, posLlave2= 0, pos2;
	var valorAscii;		
	var llaveAux1= [], llaveAux2= [];
	var RotBytes= [], SubBytes= [];
	var fila, columna, posSbox= 0, posX, posY;
	var contRcon= 0, posSubllaves= 0;
	var matrizEstadoC= [], elementoMatrizEstadoC;
	var elementoMixColumsC, mixColumsC= [], resultadosMixColumsC= [], auxMatrizEstadoC= [];
	var posLlavesGeneradas= 0;
	var cadenaCifrado= "";
	
	obtenerVelocidadAnimacionAESDescifrar();	
	
	limpiaPanelAESDescifrado();	
	$("#textoCriptogramaAESDescifrado").val(textoPlano);
	$("#LlaveAESDescifrado").val(llaveAESCifrar.join(""));
	
	expansionLlaves();	
	
	for(i=0; i<17; i++)
	{
		if(i==0)
		{
			$("#fila"+(i+1)+"ISBox").append("<td>InvSBox</td>");
		}
		else
		{
			$("#fila"+(i+1)+"ISBox").append('<td style="text-align:center;" id="Invx'+(i-1)+'">'+(i-1).toString(16)+'</td>');
		}
		
		for(j=0; j<17; j++)
		{
			if(i==0)
			{
				if(j>0)
				{
					$("#fila"+(i+1)+"ISBox").append('<td style="text-align:center;" id="Invy'+(j-1)+'">'+(j-1).toString(16)+'</td>');
				}
			}
			else
			{
				if(j>0)
				{
					$("#fila"+(i+1)+"ISBox").append('<td style="text-align:center;" id="columnaInvSbox'+pos+'">'+invSBox[pos].toString(16)+'</td>');
					pos++;
				}
			}
		}
		
		if(!seguirDescifrandoAES)
		{
			return;
		}
	}
		
	
	/**************************INICIO DESCIFRADO AES****************************/
	
	$("#SeccionDescifradoAES").show();
	
	for(i= 0; i<11; i++)
	{
		if(i==0)
		{			
			$("#informacionAES3D").append("Para comenzar el descifrado, llenamos la matriz estado con el texto cifrado de la siguiente forma:");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(3500);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/******************LLENAR MATRIZ ESTADO*************************/
			pos= 0;
			pos2= 0;
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{					
					valorAscii= parseInt("0x"+textoPlano.toString().substring(pos, pos+2));
					$("#fila"+k+"-EstadoAESD").append('<td style="text-align:center;" id="columnaMatrizEstadoD'+pos2+'">'+valorAscii.toString(16)+'</td>');
					pos= pos+2;
					pos2++;
					matrizEstadoC.push(valorAscii);					
					await sleepAES(100*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirDescifrandoAES)
				{
					return;
				}
			}
			/****************FIN LLENAR MATRIZ ESTADO*/
			
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("El descifrado se compone de 11 rondas, en cada ronda se usa cada una de las subllaves generadas en el proceso de cifrado pero ahora comenzando con la última subllave generada hasta llegar a la inicial:");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(7200);
			$("#informacionAES4D").append("Última subllave:");
			$("#informacionAES4D").show();
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/******************LLENAR ULTIMA LLAVE*************************/
			pos= 0;
			llaveAux1= [];
			posLlavesGeneradas= 176-((i+1)*16);
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];
					$("#fila"+k+"-llaveAESDmix").append('<td style="text-align:center;" id="columnaSubLlaveMixD'+pos+'">'+valorAscii.toString(16)+'</td>');
					pos++;
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);
					await sleepAES(100*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirDescifrandoAES)
				{
					return;
				}
			}
			/****************FIN LLENAR LLAVE INICIAL*/
			
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("Para la primera ronda solamente aplicamos la operación AddRoundKey que consiste en realizar un XOR entre cada elemento de la matriz Estado con la última subllave, se hace de la siguiente forma: (Los resultados se van actualizando en la matriz Estado)");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(9000);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/**************************INICIA ADDROUNDKEY************************/								
			for(j= 0; j<16; j++)
			{
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "#FF6961");
				await sleepAES(250*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				$("#columnaSubLlaveMixD"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "#77DD77");
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];
				$("#columnaMatrizEstadoD"+j).html(matrizEstadoC[j].toString(16));
				await sleepAES(250*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "transparent");
				$("#columnaSubLlaveMixD"+j).css("backgroundColor", "transparent");
			}					
			
			/************FIN ADDROUNDKEY*/										
		}
		else if(i==1)
		{
						
			/******************************INICIO SUBYTES**************************/
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("El siguiente paso es aplicar la operación InvSubBytes a todos los elementos de la matriz Estado usando la S-Box inversa:");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(3800);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			for(j=0; j<16; j++)
			{
				fila= (matrizEstadoC[j]&240);
				fila= fila>>4;
				columna= (matrizEstadoC[j]&15);
				pos= 0;
				
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(100*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				
				$("#SeccionInvSBox").show();
				if(velocidadAnimacionDescifrarAES!=0.15)
				{
				posicion = $("#SeccionInvSBox").offset().top-75;
				$("html, body").animate({scrollTop: posicion}, 500);							
				}
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				for(k=0; k<16; k++)
				{
					$("#Invx"+k).css("backgroundColor", "#AEC6FC");
					await sleepAES(100*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
					
					if($("#Invx"+k).text()==fila.toString(16))
					{							
						$("#Invx"+k).css("backgroundColor", "#77DD77");
						await sleepAES(100*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						posX= k;
						k= 16;
						
						for(l=0; l<16; l++)
						{
							$("#Invy"+l).css("backgroundColor", "#AEC6FC");
							await sleepAES(100*velocidadAnimacionDescifrarAES);
							
							if(!seguirDescifrandoAES)
					{
						return;
					}
							
							if($("#Invy"+l).text()==columna.toString(16))
							{
								$("#Invy"+l).css("backgroundColor", "#77DD77");
								await sleepAES(100*velocidadAnimacionDescifrarAES);
								
								if(!seguirDescifrandoAES)
					{
						return;
					}
								
								posY= l;
								l= 16;
							}
							
							$("#Invy"+l).css("backgroundColor", "transparent");
							await sleepAES(100*velocidadAnimacionDescifrarAES);
							
							if(!seguirDescifrandoAES)
					{
						return;
					}
						}
					}											
					
					$("#Invx"+k).css("backgroundColor", "transparent");
					await sleepAES(100*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				
				posSbox= 0;				
				
				for(k=0; k<16; k++)
				{		
					for(l=0; l<16; l++)
					{
						if(k==posX&&l==posY)
						{								
							$("#columnaInvSbox"+posSbox).css("backgroundColor", "#77DD77");							
							
							if(!seguirDescifrandoAES)
					{
						return;
					}
							
							await sleepAES(500*velocidadAnimacionDescifrarAES);
							matrizEstadoC[j]= invSBox[posSbox];
							$("#columnaMatrizEstadoD"+j+"").html(matrizEstadoC[j].toString(16));
							
							if(!seguirDescifrandoAES)
					{
						return;
					}
							
							$("#Invx"+k).css("backgroundColor", "transparent");
							$("#Invy"+l).css("backgroundColor", "transparent");
							$("#columnaInvSbox"+posSbox).css("backgroundColor", "transparent");
							await sleepAES(100*velocidadAnimacionDescifrarAES);
							
							if(!seguirDescifrandoAES)
					{
						return;
					}
						}
						
						posSbox++;
					}
				}
				
				$("#SeccionInvSBox").hide();							
									
				$("#columnaMatrizEstadoD"+j+"").css("backgroundColor", "#77DD77");				
				await sleepAES(500*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
									
				$("#columnaMatrizEstadoD"+j+"").css("backgroundColor", "transparent");
				await sleepAES(100*velocidadAnimacionDescifrarAES);			
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
			}
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
								
			/******************FIN SUBBYTES*/					
			
			/******************************INICIO SHIFTROWS**************************/
			
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("Para la segunda ronda se aplica la operación InvShiftRows, cada fila de la matriz estado, a excepción de la primera, se rotan circularmente hacia la derecha los elementos, en la segunda fila se rotan una posición, en la tercera dos posiciones y en la cuarta tres posiciones:");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(11000);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=3; j++)
			{							
				if(j==1)
				{
					elementoMatrizEstadoC= matrizEstadoC[13];
					matrizEstadoC[13]= matrizEstadoC[9];
					matrizEstadoC[9]= matrizEstadoC[5];
					matrizEstadoC[5]= matrizEstadoC[1];
					matrizEstadoC[1]= elementoMatrizEstadoC;
					
					$("#columnaMatrizEstadoD13").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD13").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoD13").html("");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoD9").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD9").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoD9").html("");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD13").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoD13").html(matrizEstadoC[13].toString(16));
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD13").css("backgroundColor", "transparent");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoD5").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD5").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoD5").html("");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD9").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoD9").html(matrizEstadoC[9].toString(16));
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD9").css("backgroundColor", "transparent");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoD1").css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD1").css("backgroundColor", "transparent");
					$("#columnaMatrizEstadoD1").html("");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD5").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoD5").html(matrizEstadoC[5].toString(16));
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD5").css("backgroundColor", "transparent");
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
					
					$("#columnaMatrizEstadoD1").css("backgroundColor", "#AEC6FC");
					$("#columnaMatrizEstadoD1").html(matrizEstadoC[1].toString(16));
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD1").css("backgroundColor", "transparent");					
					await sleepAES(25*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				else if(j==2)
				{
					for(k=0; k<2; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[14];
						matrizEstadoC[14]= matrizEstadoC[10];
						matrizEstadoC[10]= matrizEstadoC[6];
						matrizEstadoC[6]= matrizEstadoC[2];
						matrizEstadoC[2]= elementoMatrizEstadoC;									
						
						$("#columnaMatrizEstadoD14").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD14").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD14").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD10").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD10").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD10").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD14").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD14").html(matrizEstadoC[14].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD14").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD6").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD6").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD6").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD10").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD10").html(matrizEstadoC[10].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD10").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD2").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD2").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD2").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD6").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD6").html(matrizEstadoC[6].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD6").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD2").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD2").html(matrizEstadoC[2].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD2").css("backgroundColor", "transparent");					
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
					}
				}
				else
				{
					for(k=0; k<3; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[15];
						matrizEstadoC[15]= matrizEstadoC[11];
						matrizEstadoC[11]= matrizEstadoC[7];
						matrizEstadoC[7]= matrizEstadoC[3];
						matrizEstadoC[3]= elementoMatrizEstadoC;									
						
						$("#columnaMatrizEstadoD15").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD15").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD15").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD11").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD11").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD11").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD15").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD15").html(matrizEstadoC[15].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD15").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD7").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD7").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD7").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD11").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD11").html(matrizEstadoC[11].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD11").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD3").css("backgroundColor", "#AEC6FC");
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD3").css("backgroundColor", "transparent");
						$("#columnaMatrizEstadoD3").html("");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD7").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD7").html(matrizEstadoC[7].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD7").css("backgroundColor", "transparent");
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
						
						$("#columnaMatrizEstadoD3").css("backgroundColor", "#AEC6FC");
						$("#columnaMatrizEstadoD3").html(matrizEstadoC[3].toString(16));
						await sleepAES(500*velocidadAnimacionDescifrarAES);
						$("#columnaMatrizEstadoD3").css("backgroundColor", "transparent");					
						await sleepAES(25*velocidadAnimacionDescifrarAES);
						
						if(!seguirDescifrandoAES)
					{
						return;
					}
					}
				}
			}
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			
			/******************FIN SHIFTROWS*/

			/******************************INICIO MIXCOLUMS**************************/
			
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("El siguiente paso se llama InvMixColums y consiste en multiplicar cada columna de la matriz Estado por la inversa de la matriz usada en el cifrado:");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(5200);
			$("#informacionAES4D").hide();
			$("#informacionAES4D").empty();
			$("#informacionAES4D").append("InvMixColums:");
			$("#informacionAES4D").show();
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			mixColumsC= [];
			
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD0").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD1").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD2").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD3").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD4").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD5").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD6").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD7").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD8").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD9").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD10").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD11").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD12").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD13").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD14").html(elementoMixColumsC.toString(16));
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			$("#columnaSubLlaveMixD15").html(elementoMixColumsC.toString(16));
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			auxMatrizEstadoC= matrizEstadoC.slice();
			
			for(k= 0; k<4; k++)
			{
				$("#columnaMatrizEstadoD"+(4*k)).css("backgroundColor", "#AEC6FC");
				$("#columnaMatrizEstadoD"+(1+(4*k))).css("backgroundColor", "#AEC6FC");
				$("#columnaMatrizEstadoD"+(2+(4*k))).css("backgroundColor", "#AEC6FC");
				$("#columnaMatrizEstadoD"+(3+(4*k))).css("backgroundColor", "#AEC6FC");
				await sleepAES(500*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
					
				for(j=0; j<4; j++)
				{
					$("#columnaSubLlaveMixD"+j).css("backgroundColor", "#AEC6FC");
					$("#columnaSubLlaveMixD"+(j+4)).css("backgroundColor", "#AEC6FC");
					$("#columnaSubLlaveMixD"+(j+8)).css("backgroundColor", "#AEC6FC");
					$("#columnaSubLlaveMixD"+(j+12)).css("backgroundColor", "#AEC6FC");
					await sleepAES(500*velocidadAnimacionDescifrarAES);						
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));					
										
					matrizEstadoC[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
					
					$("#columnaMatrizEstadoD"+(4*k+j)).html(matrizEstadoC[4*k+j].toString(16));
					$("#columnaMatrizEstadoD"+(4*k+j)).css("backgroundColor", "#77DD77");
					await sleepAES(500*velocidadAnimacionDescifrarAES);
					$("#columnaMatrizEstadoD"+(4*k+j)).css("backgroundColor", "#AEC6FC");
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
					
					$("#columnaSubLlaveMixD"+j).css("backgroundColor", "transparent");
					$("#columnaSubLlaveMixD"+(j+4)).css("backgroundColor", "transparent");
					$("#columnaSubLlaveMixD"+(j+8)).css("backgroundColor", "transparent");
					$("#columnaSubLlaveMixD"+(j+12)).css("backgroundColor", "transparent");
					
					resultadosMixColumsC= [];
				}
				
				$("#columnaMatrizEstadoD"+(4*k)).css("backgroundColor", "transparent");
				$("#columnaMatrizEstadoD"+(1+(4*k))).css("backgroundColor", "transparent");
				$("#columnaMatrizEstadoD"+(2+(4*k))).css("backgroundColor", "transparent");
				$("#columnaMatrizEstadoD"+(3+(4*k))).css("backgroundColor", "transparent");
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
			}
									
			/******************FIN MIXCOLUMS*/
			
			/******************************INICIO ADDROUNDKEY**************************/
			
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("El último paso es la operación InvAddRoundKey, se toma la penúltima subllave generada y se multiplica por la matriz inversa usada en la operación InvMixColums, después sólo queda aplicar la operación XOR con la matriz Estado:");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(8500);
			$("#informacionAES4D").hide();
			$("#informacionAES4D").empty();
			$("#informacionAES4D").append("Subllave:");
			$("#informacionAES4D").show();
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			pos= 0;
			llaveAux1= [];
			posLlavesGeneradas= 176-((i+1)*16);
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];					
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);									
				}
				
				if(!seguirDescifrandoAES)
				{
					return;
				}
			}
			
			auxMatrizEstadoC= llaveAux1.slice();
			
			for(k= 0; k<4; k++)
			{
				for(j=0; j<4; j++)
				{													
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));					
										
					llaveAux1[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
					
					resultadosMixColumsC= [];
				}							
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
			}
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];
					$("#columnaSubLlaveMixD"+pos).html(valorAscii.toString(16));
					pos++;
					posLlavesGeneradas++;					
					await sleepAES(100*velocidadAnimacionDescifrarAES);
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirDescifrandoAES)
				{
					return;
				}
			}
			
			for(j= 0; j<16; j++)
			{
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				$("#columnaSubLlaveMixD"+j).css("backgroundColor", "#AEC6FC");
				await sleepAES(250*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "#77DD77");
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];
				$("#columnaMatrizEstadoD"+j).html(matrizEstadoC[j].toString(16));
				await sleepAES(250*velocidadAnimacionDescifrarAES);
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				$("#columnaMatrizEstadoD"+j).css("backgroundColor", "transparent");
				$("#columnaSubLlaveMixD"+j).css("backgroundColor", "transparent");
			}				
						
			/******************FIN ADDROUNDKEY*/
		}
		else if(i==10)
		{
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(500);
			$("#informacionAES3D").empty();
			$("#informacionAES3D").append("Para la última ronda se realizan las mismas operaciones excepto InvMixColums y la subllave (que sería la llave inicial) ya no se multiplica por la matriz inversa utilizada en InvMixColums.");
			$("#informacionAES3D").slideToggle(500);
			await sleepAES(7000);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
						
			
			/******************************INICIO SUBYTES**************************/
			for(j=0; j<16; j++)
			{
				fila= (matrizEstadoC[j]&240);
				fila= fila>>4;
				columna= (matrizEstadoC[j]&15);
				pos= 0;														
												
				posSbox= 0;
				
				for(k=0; k<16; k++)
				{		
					for(l=0; l<16; l++)
					{
						if(k==fila&&l==columna)
						{								
							matrizEstadoC[j]= invSBox[posSbox];							
						}
						
						posSbox++;
					}
				}							
			}
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
					
			/******************FIN SUBBYTES*/				
			
			/******************************INICIO SHIFTROWS**************************/	

if(!seguirDescifrandoAES)
					{
						return;
					}			
			
			for(j=1; j<=3; j++)
			{							
				if(j==1)
				{
					elementoMatrizEstadoC= matrizEstadoC[13];
					matrizEstadoC[13]= matrizEstadoC[9];
					matrizEstadoC[9]= matrizEstadoC[5];
					matrizEstadoC[5]= matrizEstadoC[1];
					matrizEstadoC[1]= elementoMatrizEstadoC;																		
				}
				else if(j==2)
				{
					for(k=0; k<2; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[14];
						matrizEstadoC[14]= matrizEstadoC[10];
						matrizEstadoC[10]= matrizEstadoC[6];
						matrizEstadoC[6]= matrizEstadoC[2];
						matrizEstadoC[2]= elementoMatrizEstadoC;																				
					}
				}
				else
				{
					for(k=0; k<3; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[15];
						matrizEstadoC[15]= matrizEstadoC[11];
						matrizEstadoC[11]= matrizEstadoC[7];
						matrizEstadoC[7]= matrizEstadoC[3];
						matrizEstadoC[3]= elementoMatrizEstadoC;											
					}
				}
			}
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/******************FIN SHIFTROWS*/
			
			/******************************INICIO ADDROUNDKEY**************************/								
			pos= 0;
			llaveAux1= [];
			posLlavesGeneradas= 176-((i+1)*16);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);					
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirDescifrandoAES)
				{
					return;
				}
			}
			
			for(j= 0; j<16; j++)
			{																			
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];				
			}			
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
					
			/******************FIN ADDROUNDKEY*/
		}
		else
		{
			if(i==2)
			{
				$("#informacionAES3D").slideToggle(500);
				await sleepAES(500);
				$("#informacionAES3D").empty();
				$("#informacionAES3D").append("El procedimiento de la ronda 2 se repite para las siguientes rondas, excepto en la última.");
				$("#informacionAES3D").slideToggle(500);
				await sleepAES(3400);
				$("#informacionAES4D").hide();
				$("#informacionAES4D").empty();
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
				
				for(j= 0; j<16; j++)
				{
					$("#columnaSubLlaveMixD"+j).html("");
				}
			}					

			/******************************INICIO SUBYTES**************************/
			for(j=0; j<16; j++)
			{
				fila= (matrizEstadoC[j]&240);
				fila= fila>>4;
				columna= (matrizEstadoC[j]&15);
				pos= 0;														
												
				posSbox= 0;
				
				for(k=0; k<16; k++)
				{		
					for(l=0; l<16; l++)
					{
						if(k==fila&&l==columna)
						{								
							matrizEstadoC[j]= invSBox[posSbox];							
						}
						
						posSbox++;
					}
				}
			}
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
					
			/******************FIN SUBBYTES*/					
			
			/******************************INICIO SHIFTROWS**************************/					
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=3; j++)
			{							
				if(j==1)
				{
					elementoMatrizEstadoC= matrizEstadoC[13];
					matrizEstadoC[13]= matrizEstadoC[9];
					matrizEstadoC[9]= matrizEstadoC[5];
					matrizEstadoC[5]= matrizEstadoC[1];
					matrizEstadoC[1]= elementoMatrizEstadoC;																		
				}
				else if(j==2)
				{
					for(k=0; k<2; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[14];
						matrizEstadoC[14]= matrizEstadoC[10];
						matrizEstadoC[10]= matrizEstadoC[6];
						matrizEstadoC[6]= matrizEstadoC[2];
						matrizEstadoC[2]= elementoMatrizEstadoC;																				
					}
				}
				else
				{
					for(k=0; k<3; k++)
					{
						elementoMatrizEstadoC= matrizEstadoC[15];
						matrizEstadoC[15]= matrizEstadoC[11];
						matrizEstadoC[11]= matrizEstadoC[7];
						matrizEstadoC[7]= matrizEstadoC[3];
						matrizEstadoC[3]= elementoMatrizEstadoC;											
					}
				}
			}
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/******************FIN SHIFTROWS*/
			
			/******************************INICIO MIXCOLUMS**************************/
			
			mixColumsC= [];
			
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x09;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0d;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0b;
			mixColumsC.push(elementoMixColumsC);
			
			elementoMixColumsC= 0x0e;
			mixColumsC.push(elementoMixColumsC);
			
			
			auxMatrizEstadoC= matrizEstadoC.slice();
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			for(k= 0; k<4; k++)
			{								
				for(j=0; j<4; j++)
				{				
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));
										
					matrizEstadoC[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
					
					resultadosMixColumsC= [];
				}							
			}
			
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/******************FIN MIXCOLUMS*/
			
			/******************************INICIO ADDROUNDKEY**************************/								
			pos= 0;
			llaveAux1= [];
			posLlavesGeneradas= 176-((i+1)*16);
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			for(j=1; j<=4; j++)
			{
				for(k=1; k<=4; k++)
				{
					valorAscii= llavesGeneradasCifrado[posLlavesGeneradas];										
					posLlavesGeneradas++;
					llaveAux1.push(valorAscii);					
					
					if(!seguirDescifrandoAES)
					{
						return;
					}
				}
				
				if(!seguirDescifrandoAES)
				{
					return;
				}
			}
			
			auxMatrizEstadoC= llaveAux1.slice();
			
			for(k= 0; k<4; k++)
			{
				for(j=0; j<4; j++)
				{													
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k], mixColumsC[j], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+1], mixColumsC[j+4], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+2], mixColumsC[j+8], 283));					
										
					resultadosMixColumsC.push(multiplicarPolinomios(auxMatrizEstadoC[4*k+3], mixColumsC[j+12], 283));					
										
					llaveAux1[4*k+j]= resultadosMixColumsC[0]^resultadosMixColumsC[1]^resultadosMixColumsC[2]^resultadosMixColumsC[3];
					
					resultadosMixColumsC= [];
				}							
				
				if(!seguirDescifrandoAES)
					{
						return;
					}
			}
			
			for(j= 0; j<16; j++)
			{																			
				matrizEstadoC[j]= matrizEstadoC[j]^llaveAux1[j];				
			}			
								
			
			if(!seguirDescifrandoAES)
					{
						return;
					}
			
			/******************FIN ADDROUNDKEY*/
		}	
	}
	
	/*****************FIN DESCIFRADO AES*/
	
	$("#informacionAES3D").slideToggle(500);
	await sleepAES(500);
	$("#informacionAES3D").empty();
	$("#informacionAES3D").append("Después de las 11 rondas, el texto claro obtenido es el siguiente:");
	$("#informacionAES3D").slideToggle(500);
	await sleepAES(2300);
	
	if(!seguirDescifrandoAES)
	{
		return;
	}
	
	/******************LLENAR MATRIZ ESTADO*************************/
	pos= 0;
	
	for(j=1; j<=4; j++)
	{
		for(k=1; k<=4; k++)
		{
			valorAscii= matrizEstadoC[pos];
			$("#columnaMatrizEstadoD"+pos).html(valorAscii.toString(16));
			cadenaCifrado= cadenaCifrado+String.fromCharCode(valorAscii);
			pos++;			
			await sleepAES(100*velocidadAnimacionDescifrarAES);
			
			if(!seguirDescifrandoAES)
			{
				return;
			}
		}
		
		if(!seguirDescifrandoAES)
		{
			return;
		}
	}
	/****************FIN LLENAR MATRIZ ESTADO*/
	
	posicion = $("#textoDescifradoAESD").offset().top;
	$("html, body").animate({scrollTop: posicion}, 500);
	
	$("#btn-velocidadDAES").show();
	$("#btn-descifrarAES-descifrado").show();
	$("#btn-cancelarDescifrarAES-descifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_8);
	$("#textoDescifradoAESD").val(cadenaCifrado);
}

function validarEntradaCifradoAES()
{
	var mensaje = "";
	var texto = $('#textoMensajePlanoAESCifrado').val();

	if (texto.length > 0 && texto.length <= 16) {
		var caracteres = texto.split('');

		for(var i = 0 ; i < caracteres.length ; i++){
			if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
				mensaje = mensaje_29;
			}
		}
	}
	else{
		mensaje = mensaje_34;
	}

	return mensaje;
}

function validarLlaveCifradoAES()
{
	var mensaje = "";
	var texto = $('#LlaveAESCifrado').val();
	var caracteres = texto.split('');

	for(var i = 0 ; i < caracteres.length ; i++){
		if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
			mensaje = mensaje_33;
		}
	}

	if (texto.length != 16 && mensaje.length == 0){
		mensaje = mensaje_37;
	}

	return mensaje;
}

function validarEntradaDescifradoAES()
{
	var mensaje = "";
	var texto = $('#textoCriptogramaAESDescifrado').val();
	
	if(!texto.match(/^[a-fA-F0-9]+$/)){
		mensaje = mensaje_36;
	}
	else if (texto.length != 32)
	{
		mensaje = mensaje_35;
	}

	return mensaje;
}

function validarLlaveDescifradoAES()
{
	var mensaje = "";
	var texto = $('#LlaveAESDescifrado').val();
	var caracteres = texto.split('');

	for(var i = 0 ; i < caracteres.length ; i++){
		if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
			mensaje = mensaje_33;
		}
	}
	
	if (texto.length != 16 && mensaje.length == 0){
		mensaje = mensaje_37;
	}

	return mensaje;
}

$(document).ready(function()
{
	$("#CifradoRapidoAES").click(function(){
		$("#btn-cifrarAES-cifrado").html('Cifrado Rápido');
		$("#btn-cifrarAES-cifrado").val(1);
	});
	$("#CifradoNormalAES").click(function(){
		$("#btn-cifrarAES-cifrado").html('Cifrado Normal');
		$("#btn-cifrarAES-cifrado").val(2);
	});
	
	$("#DescifradoRapidoAES").click(function(){
		$("#btn-descifrarAES-descifrado").html('Descifrado Rápido');
		$("#btn-descifrarAES-descifrado").val(1);
	});
	$("#DescifradoNormalAES").click(function(){
		$("#btn-descifrarAES-descifrado").html('Descifrado Normal');
		$("#btn-descifrarAES-descifrado").val(2);
	});
	
	$("#textoMensajePlanoAESCifrado").keyup(function()
	{
		var mensaje = validarEntradaCifradoAES();
		var mensaje2= validarLlaveCifradoAES();

		if($("#textoMensajePlanoAESCifrado").val().length == 0){
			$("#textoMensajePlanoAESCifrado-error").remove();
			$("#textoMensajePlanoAESCifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoMensajePlanoAESCifrado-error").remove();
				$("#textoMensajePlanoAESCifrado").parent().parent().append('<div id="textoMensajePlanoAESCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoMensajePlanoAESCifrado").addClass('input-error');
				//$("#btn-cifrarAES-cifrado").attr("disabled", true);
			} else{
				$("#textoMensajePlanoAESCifrado-error").remove();
				$("#textoMensajePlanoAESCifrado").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-cifrarAES-cifrado").attr("disabled", false);
				}
			}
		}
	});
	
	$("#LlaveAESCifrado").keyup(function()
	{
		var mensaje = validarLlaveCifradoAES();
		var mensaje2= validarEntradaCifradoAES();

		if($("#LlaveAESCifrado").val().length == 0){
			$("#LlaveAESCifrado-error").remove();
			$("#LlaveAESCifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#LlaveAESCifrado-error").remove();
				$("#LlaveAESCifrado").parent().parent().append('<div id="LlaveAESCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#LlaveAESCifrado").addClass('input-error');
				//$("#btn-cifrarAES-cifrado").attr("disabled", true);
			} else{
				$("#LlaveAESCifrado-error").remove();
				$("#LlaveAESCifrado").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-cifrarAES-cifrado").attr("disabled", false);
				}
			}
		}
	});	
	
	$("#textoCriptogramaAESDescifrado").keyup(function()
	{
		var res = validarEntradaDescifradoAES();	
		var mensaje2= validarLlaveDescifradoAES();
		
		if($("#textoCriptogramaAESDescifrado").val().length == 0){
			$("#textoCriptogramaAESDescifrado-error").remove();
			$("#textoCriptogramaAESDescifrado").removeClass('input-error');
		}
		else{
			if (res.length != 0)
			{
				$("#textoCriptogramaAESDescifrado-error").remove();
				$("#textoCriptogramaAESDescifrado").parent().parent().append('<div id="textoCriptogramaAESDescifrado-error" class="text-danger">&nbsp;'+res+'</div>');
				$("#textoCriptogramaAESDescifrado").addClass('input-error');
				//$("#btn-descifrarRejilla-descifrado").attr("disabled", true);
			} else
			{
				$("#textoCriptogramaAESDescifrado-error").remove();
				$("#textoCriptogramaAESDescifrado").removeClass('input-error');
				
				if(mensaje2.length!=0)
				{
					$("#btn-descifrarAES-descifrado").attr("disabled", false);
				}
			}
		}
	});
	
	$("#LlaveAESDescifrado").keyup(function()
	{
		var mensaje = validarLlaveDescifradoAES();
		var mensaje2= validarEntradaDescifradoAES();

		if($("#LlaveAESDescifrado").val().length == 0){
			$("#LlaveAESDescifrado-error").remove();
			$("#LlaveAESDescifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0)
			{
				$("#LlaveAESDescifrado-error").remove();
				$("#LlaveAESDescifrado").parent().parent().append('<div id="LlaveAESDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#LlaveAESDescifrado").addClass('input-error');
				//$("#btn-cifrarAES-cifrado").attr("disabled", true);
			} else{
				$("#LlaveAESDescifrado-error").remove();
				$("#LlaveAESDescifrado").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-descifrarAES-descifrado").attr("disabled", false);
				}
			}
		}
	});	

	$("#btn-cifrarAES-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoAES();
		var mensaje2= validarLlaveCifradoAES();
		
		if(mensaje.length!=0)
		{
			$("#textoMensajePlanoAESCifrado-error").remove();
			$("#textoMensajePlanoAESCifrado").parent().parent().append('<div id="textoMensajePlanoAESCifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoMensajePlanoAESCifrado").addClass('input-error');
			//$("#btn-cifrarAES-cifrado").attr("disabled", true);
		}
		if(mensaje2.length!=0)
		{
			$("#LlaveAESCifrado-error").remove();
			$("#LlaveAESCifrado").parent().parent().append('<div id="LlaveAESCifrado-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#LlaveAESCifrado").addClass('input-error');
			//$("#btn-cifrarAES-cifrado").attr("disabled", true);
		}
		else
		{
			cifrarAES();		
		}		
	});
	
	$("#btn-descifrarAES-descifrado").click(function()
	{
		var mensaje= validarEntradaDescifradoAES();		
		var mensaje2= validarLlaveDescifradoAES();
		
		if(mensaje.length!=0)
		{
			$("#textoCriptogramaAESDescifrado-error").remove();
			$("#textoCriptogramaAESDescifrado").parent().parent().append('<div id="textoCriptogramaAESDescifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoCriptogramaAESDescifrado").addClass('input-error');
			//$("#btn-descifrarAES-descifrado").attr("disabled", true);
		}
		if(mensaje2.length!=0)
		{
			$("#LlaveAESDescifrado-error").remove();
			$("#LlaveAESDescifrado").parent().parent().append('<div id="LlaveAESDescifrado-error" class="text-danger">&nbsp;'+mensaje2+'</div>');
			$("#LlaveAESDescifrado").addClass('input-error');
			//$("#btn-cifrarAES-cifrado").attr("disabled", true);
		}
		else
		{			
			descifrarAES();					
		}		
	});
	
	$("#btn-cancelarCifrarAES-cifrado").click(function()
	{
		seguirCifrandoAES= false;
		
		limpiaPanelAESCifrado();

		$("#btn-velocidadCAES").show();
		$("#btn-cifrarAES-cifrado").show();
		$("#btn-cancelarCifrarAES-cifrado").hide();
	});
	
	$("#btn-cancelarDescifrarAES-descifrado").click(function()
	{
		seguirDescifrandoAES= false;
		
		limpiaPanelAESDescifrado();

		$("#btn-velocidadDAES").show();
		$("#btn-descifrarAES-descifrado").show();
		$("#btn-cancelarDescifrarAES-descifrado").hide();
	});
	
	$("#btn-copiarTextoAES").click(function()
	{
		if ($("#textoCifradoAESC").val()=='')
		{
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		}
		else
		{
			$("#textoCriptogramaAESDescifrado").val($("#textoCifradoAESC").val());					
			$("#LlaveAESDescifrado").val($("#LlaveAESCifrado").val());	
		}
	});

	//Archivos

	$("#fileInputAESCifrado").change(function()
    {
        var mensaje = validarEntradaCArchivoAES();
        var mensaje2 = validarKEYArchivoAESC();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaAESCifrado').html(mensaje);
        } else{
            $('#fileDisplayAreaAESCifrado').html();
        }

        if(mensaje.length==0&&mensaje2.length==0)
        {
        	$("#btn-cifrarArchivoAES").attr("disabled", false);
        }        
    });

	$("#llaveAESCifradoArchivo").keyup(function()
	{
		var mensaje = validarKEYArchivoAESC();
		var mensaje2= validarEntradaCArchivoAES();

		if($("#llaveAESCifradoArchivo").val().length == 0){
			$("#llaveAESCifradoArchivo-error").remove();
			$("#llaveAESCifradoArchivo").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#llaveAESCifradoArchivo-error").remove();
				$("#llaveAESCifradoArchivo").parent().parent().append('<div id="llaveAESCifradoArchivo-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#llaveAESCifradoArchivo").addClass('input-error');
				//$("#btn-cifrarArchivoAES").attr("disabled", true);
			} else{
				$("#llaveAESCifradoArchivo-error").remove();
				$("#llaveAESCifradoArchivo").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-cifrarArchivoAES").attr("disabled", false);
				}
			}
		}
	});

	$("#btn-cifrarArchivoAES").click(function()
    {		
		var mensajellave = validarKEYArchivoAESC();
		var mensajearchivo = validarEntradaCArchivoAES();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llaveAESCifradoArchivo-error").remove();
            $("#llaveAESCifradoArchivo").removeClass('input-error');
            $("#btn-cifrarArchivoAES").attr("disabled", false);

            cifrarArchivoAES();
		}
		else{
			if(mensajellave.length > 0){
				$("#llaveAESCifradoArchivo-error").remove();
				$("#llaveAESCifradoArchivo").parent().parent().append('<div id="llaveAESCifradoArchivo-error" class="text-danger">&nbsp;'+mensajellave+'</div>');
				$("#llaveAESCifradoArchivo").addClass('input-error');
				//$("#btn-cifrarArchivoAES").attr("disabled", true);
			}

			else if(mensajearchivo.length > 0){
				$('#fileDisplayAreaAESCifrado').html(mensajearchivo);
			}
		}
	});

	$("#fileInputAESDescifrado").change(function()
    {
        var mensaje = validarEntradaDArchivoAES();
        var mensaje2 = validarKEYArchivoAESD();

        if (mensaje.length != 0) {
            $('#fileDisplayAreaAESDescifrado').html(mensaje);
        } else{
            $('#fileDisplayAreaAESDescifrado').html();
        }

        if(mensaje.length==0&&mensaje2.length==0)
        {
        	$("#btn-descifrarArchivoAES").attr("disabled", false);
        }        
    });

	$("#llaveAESDescifradoArchivo").keyup(function()
	{
		var mensaje = validarKEYArchivoAESD();
		var mensaje2= validarEntradaDArchivoAES();

		if($("#llaveAESDescifradoArchivo").val().length == 0){
			$("#llaveAESDescifradoArchivo-error").remove();
			$("#llaveAESDescifradoArchivo").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#llaveAESDescifradoArchivo-error").remove();
				$("#llaveAESDescifradoArchivo").parent().parent().append('<div id="llaveAESDescifradoArchivo-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#llaveAESDescifradoArchivo").addClass('input-error');
				//$("#btn-descifrarArchivoAES").attr("disabled", true);
			} else{
				$("#llaveAESDescifradoArchivo-error").remove();
				$("#llaveAESDescifradoArchivo").removeClass('input-error');
				
				if(mensaje2.length==0)
				{
					$("#btn-descifrarArchivoAES").attr("disabled", false);
				}
			}
		}
	});

	$("#btn-descifrarArchivoAES").click(function()
    {		
		var mensajellave = validarKEYArchivoAESD();
		var mensajearchivo = validarEntradaDArchivoAES();

		if(mensajellave.length == 0 && mensajearchivo.length == 0){
			$("#llaveAESDescifradoArchivo-error").remove();
            $("#llaveAESDescifradoArchivo").removeClass('input-error');
            $("#btn-descifrarArchivoAES").attr("disabled", false);

            descifrarArchivoAES();
		}
		else{
			if(mensajellave.length > 0){
				$("#llaveAESDescifradoArchivo-error").remove();
				$("#llaveAESDescifradoArchivo").parent().parent().append('<div id="llaveAESDescifradoArchivo-error" class="text-danger">&nbsp;'+mensajellave+'</div>');
				$("#llaveAESDescifradoArchivo").addClass('input-error');
				//$("#btn-descifrarArchivoAES").attr("disabled", true);
			}

			else if(mensajearchivo.length > 0){
				$('#fileDisplayAreaAESDescifrado').html(mensajearchivo);
			}
		}
	});

});

function validarEntradaCArchivoAES(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputAESCifrado');
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

function validarKEYArchivoAESC()
{
	var mensaje = "";
	var texto = $('#llaveAESCifradoArchivo').val();
	var i;

	if (texto.length != 16)
	{
		mensaje = mensaje_37;
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

function validarEntradaDArchivoAES(){
	var mensaje = "";
	var fileInput = document.getElementById('fileInputAESDescifrado');
	var file;
	
	if(fileInput.files.length > 0){
		file = fileInput.files[0];

		if(!file.type.match(/^text.*$/)){
			mensaje = mensaje_89;
		}
		else if(file.size > 1024*100*2){
			mensaje = mensaje_91;
		}
	}
	else
	{
		mensaje= mensaje_93;
	}

	return mensaje;
}

function validarKEYArchivoAESD()
{
	var mensaje = "";
	var texto = $('#llaveAESDescifradoArchivo').val();
	var i;

	if (texto.length != 16)
	{
		mensaje = mensaje_37;
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

function sleepAES(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}