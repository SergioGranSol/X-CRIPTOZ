var tamHashSHA1= 20;
var shaSuccess = 0;
var shaNull= 1;     /* Null pointer parameter */
var shaInputTooLong= 2;    /* input data too long */
var shaStateError= 3;       /* called Input after Result */
var mensajeFINAL= "";
var DiesciseisPalabras= [];

var velocidadAnimacionCifrarSHA1= 0.1;
var seguirCifrandoSHA1= true;

/****************************************************************FUNCIONES HASH*************************************************************/
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
	console.log("entra");

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
		console.log(mensaje[temp]);
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

/****************************************************************************************************************************************/

function cifrarArchivoSHA(evt) 
{
	var fileInput = document.getElementById('fileInputSHACifrado');
	var fileDisplayArea = document.getElementById('fileDisplayAreaSHACifrado');
	
	var file = fileInput.files[0];
	var textType = /text.*/;			
	var textoPlano= "";
	var textoCifrado= new Uint8Array(20);	
	var textoCifrado2= "";
	var hash2= new cuerpoSHA1();
	var err;
	var i;
	$("#progressbarSHA1Cifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
	
	if (file.type.match(textType))
	{
		if(file.size<=1024*100)
		{
			var reader = new FileReader();

			reader.onload = function(e)
			{
				//fileDisplayArea.innerText = reader.result;
				textoPlano= reader.result;

				SHA1Inicializar(hash2);		
				
				entradaSHA1(hash2, textoPlano, textoPlano.length);	
					
				SHA1Resultado(hash2, textoCifrado);

				for(i = 0; i < 20 ; i++)
				{			
					if(i==0)
					{
						if(textoCifrado[i]<16)
						{
							textoCifrado2= "0"+(textoCifrado[i].toString(16)).toUpperCase();
						}
						else
						{
							textoCifrado2= (textoCifrado[i].toString(16)).toUpperCase();
						}				
					}
					else
					{
						if(textoCifrado[i]<16)
						{
							textoCifrado2= textoCifrado2+"0"+(textoCifrado[i].toString(16)).toUpperCase();
						}
						else
						{
							textoCifrado2= textoCifrado2+""+(textoCifrado[i].toString(16)).toUpperCase();
						}				
					}
				}
				
				fileDisplayArea.innerText= textoCifrado2;
				textoCifrado2= "\ufeff"+textoCifrado2; //<------------------------------------ PARA QUE SEA utf-8 con bom
				
				//PARA DESCARGAR
				var element = document.createElement('a');
				  element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado2));
				  element.setAttribute('download', "ArchivoCifradoSHA.txt");

				  element.style.display = 'none';
				  document.body.appendChild(element);

				  element.click();

				  document.body.removeChild(element);	
				  $("#progressbarSHA1Cifrado").addClass("notransition").css('width','100%').attr('aria-valuenow', '100');		  			 
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

function mostrarPanelSHA1()
{
	//crearPanelAfin();
	$("#panelInteractivo-CifradoSHA1").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelSHA1()
{
	$("#panelInteractivo-CifradoSHA1").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelSHA1Cifrado();

	$("#textoMensajePlanoSHA1Cifrado-error").remove();
	$("#textoMensajePlanoSHA1Cifrado").removeClass('input-error');

	seguirCifrandoSHA1= false;

	$("#btn-velocidadCSHA1").show();
	$("#btn-cifrarSHA1-cifrado").show();
	$("#btn-cancelarCifrarSHA1-cifrado").hide();
}

function limpiaPanelSHA1Cifrado()
{	
	$("#SeccionRepresentaciónBinariaMensaje").show();
		if($('#informacionSHA1C').is(':visible'))
		{
			$("#informacionSHA1C").slideToggle(500);
		}
		
		$("#informacionSHA1C").empty();
		$("#textoPlanoBinarioC").empty();
		
		$("#SeccionRepresentaciónBinariaMensaje").hide();
	
	$("#SeccionPaddingC").show();
		if($('#informacionSHA2C').is(':visible'))
		{
			$("#informacionSHA2C").slideToggle(500);
		}
		
		$("#informacionSHA2C").empty();
		$("#SeccionPaddingC").hide();
	
	$("#SeccionDivisionBloquesPalabras").show();
		if($('#informacionSHA3C').is(':visible'))
		{
			$("#informacionSHA3C").slideToggle(500);
		}
		
		$("#informacionSHA3C").empty();
		$("#bloquesSha1C").empty();
		$("#SeccionDivisionBloquesPalabras").hide();
	
	$("#SeccionHashInicial").show();
		if($('#informacionSHA4C').is(':visible'))
		{
			$("#informacionSHA4C").slideToggle(500);
		}
		
		$("#informacionSHA4C").empty();
		$("#abcdeHash").empty();
		$("#SeccionHashInicial").hide();
	
	$("#SeccionProcesoHASH").show();
		if($('#informacionSHA5C').is(':visible'))
		{
			$("#informacionSHA5C").slideToggle(500);
		}
		
		$("#informacionSHA5C").empty();
		$("#calculoPalabras").empty();
		
		if($('#contantesyRondas').is(':visible'))
		{
			$("#contantesyRondas").slideToggle(500);
		}
		
		$("#TitulosR").empty();
		$("#Ronda1").empty();
		$("#Ronda2").empty();
		$("#Ronda3").empty();
		$("#Ronda4").empty();
		
		if($('#resultadosHash').is(':visible'))
		{
			$("#resultadosHash").slideToggle(500);
		}
		
		$("#resultadosHashV").empty();
		$("#resultadosHashN").empty();
		$("#SeccionProcesoHASH").hide();
	
	$("#SeccionFinalHash").show();
		if($('#informacionSHA6C').is(':visible'))
		{
			$("#informacionSHA6C").slideToggle(500);
		}
		
		$("#informacionSHA6C").empty();
		$("#ultimaOperacion").empty();
		$("#SeccionFinalHash").hide();
		
	$("#textoCifradoSHA1C").empty();
	$("#textoMensajePlanoSHA1Cifrado").val("");
}

function obtenerVelocidadAnimacionSHA1Cifrar()
{
	if($('#btn-cifrarSHA1-cifrado').val() == 1)
	{
		velocidadAnimacionCifrarSHA1 = 0.5;
	}
	else if($('#btn-cifrarSHA1-cifrado').val() == 2)
	{
		velocidadAnimacionCifrarSHA1 = 1;
	}

	$("#btn-velocidadCSHA1").hide();
	$("#btn-cifrarSHA1-cifrado").hide();
	$("#btn-cancelarCifrarSHA1-cifrado").show();
	seguirCifrandoSHA1= true;
}

async function cifrarSHA1()
{	
	var hash= new cuerpoSHA1();
	var err;
	var resultadoHASH= new Uint8Array(20);	
	var i;	
	var textoPlano = ($("#textoMensajePlanoSHA1Cifrado").val()).split("");
	var textoCifrado;
	var longitudMensajePlano= 0;
	var valorK= 0;
	var contadorPalabras= textoPlano.length;
	var temp2= 0; ////////////////////////////////////////////////////////////////////////////////OJO CON TEMP declarado tambien en procesar bloque
	var longitudMensajePlanoBinario= "";
	var posTextoPlano= 0;
	var contadorBloques= 0;
	/**************************************************PROCESAR BLOQUE******************************************************/
	var K= new Int32Array(4), t, temp= new Int32Array(1), W= new Array(80), A= new Int32Array(1), B= new Int32Array(1), C= new Int32Array(1), D= new Int32Array(1), E= new Int32Array(1), auxResultado= 0, auxRbinario= "";	//W[80]
	
	obtenerVelocidadAnimacionSHA1Cifrar();
	
	limpiaPanelSHA1Cifrado();
	$("#textoMensajePlanoSHA1Cifrado").val(textoPlano.join(""));
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}

	$("#SeccionRepresentaciónBinariaMensaje").show();
	$("#informacionSHA1C").append("Como primer paso, convertimos el mensaje en una representación binaria de 8 bits para cada carácter ASCII:");
	$("#informacionSHA1C").slideToggle(500);
	await sleepSHA(3600);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	for(i=0; i<textoPlano.length; i++)
	{
		if(textoPlano[i].charCodeAt()<128)
		{
			$("#textoPlanoBinarioC").append('<label id="labelPlanoBinario'+i+'" class="circulo">0'+textoPlano[i].charCodeAt().toString(2)+'</label>');
			mensajeFINAL= mensajeFINAL+"0"+textoPlano[i].charCodeAt().toString(2);
		}
		else
		{
			$("#textoPlanoBinarioC").append('<label id="labelPlanoBinario'+i+'" class="circulo">'+textoPlano[i].charCodeAt().toString(2)+'</label>');
			mensajeFINAL= mensajeFINAL+textoPlano[i].charCodeAt().toString(2);
		}		
	}
	
	await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#informacionSHA1C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA1C").empty();
	
	longitudMensajePlano= i*8;
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#SeccionRepresentaciónBinariaMensaje").hide();
	
	$("#SeccionPaddingC").show();
	
	$("#informacionSHA2C").append("Antes de iniciar con el proceso, el mensaje tiene que ser rellenado con un número de bits, de tal forma que al final, la longitud total del mensaje sea un múltiplo de 512.");
	$("#informacionSHA2C").slideToggle(500);
	await sleepSHA(6750);
	$("#informacionSHA2C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA2C").empty();
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#informacionSHA2C").append("Para obtener el mensaje final, al mensaje original se le agrega un 1, seguido de 'k' bits ceros y la representación binaria en 64 bits de la longitud del mensaje original.");
	$("#informacionSHA2C").slideToggle(500);
	await sleepSHA(6750);
	$("#informacionSHA2C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA2C").empty();
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#informacionSHA2C").append("Los 'k' bits ceros que se necesitan, se calculan de la siguiente forma: k= 512-64-1-l= 448-(l+1) mod 512 donde 'l' es la longitud del mensaje original (en bits).");
	$("#informacionSHA2C").slideToggle(500);
	await sleepSHA(7000);
	$("#informacionSHA2C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA2C").empty();
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	valorK= 448-(longitudMensajePlano+1);
	$("#informacionSHA2C").append("Realizando el cálculo: k= 448-("+ longitudMensajePlano +"+1)= "+ valorK +" mod 512.");
	$("#informacionSHA2C").slideToggle(500);
	await sleepSHA(6500);
	$("#informacionSHA2C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA2C").empty();
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#SeccionPaddingC").hide();
	$("#SeccionRepresentaciónBinariaMensaje").show();
		
	$("#informacionSHA1C").append("Con lo explicado anteriormente, comenzamos agregando un 1 al mensaje original:");
	$("#informacionSHA1C").slideToggle(500);
	await sleepSHA(4000);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#textoPlanoBinarioC").append('<label id="labelPlanoBinarioUNO'+'" class="circulo">1</label>');
	mensajeFINAL= mensajeFINAL+"1";
	await sleepSHA(3000*velocidadAnimacionCifrarSHA1)
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#informacionSHA1C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA1C").empty();
	
	$("#informacionSHA1C").append("Agregamos los "+valorK+" ceros:");
	$("#informacionSHA1C").slideToggle(500);
	await sleepSHA(2000);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	for(i=0; i<valorK; i++)
	{
		if((i+1)%8==0)
		{
			$("#textoPlanoBinarioC").append('<label id="kCEROS'+temp2+'" class="circulo">00000000</label>');
			mensajeFINAL= mensajeFINAL+"00000000";
			temp2++;
		}
	}
	
	$("#textoPlanoBinarioC").append('<label id="kCEROS'+temp2+'" class="circulo"></label>');	
	for(i=(temp2*8); i<valorK; i++)
	{		
		$("#kCEROS"+temp2).append("0");
		mensajeFINAL= mensajeFINAL+"0";
	}
	await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#informacionSHA1C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA1C").empty();
	
	$("#informacionSHA1C").append("Por úlimo agregamos la longitud del mensaje original en una representación binaria de 64 bits:");
	$("#informacionSHA1C").slideToggle(500);
	await sleepSHA(2000);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	longitudMensajePlanoBinario= longitudMensajePlano.toString(2);
	
	if(longitudMensajePlanoBinario.length<64)
	{
		for(i=longitudMensajePlanoBinario.length; i<64; i++)
		{
			longitudMensajePlanoBinario= "0"+longitudMensajePlanoBinario;
		}
	}
	
	temp2= 0;
	var posTemp= 0;
	
	for(i=0; i<longitudMensajePlanoBinario.length; i++)
	{
		if((i+1)%8==0)
		{
			$("#textoPlanoBinarioC").append('<label id="longBin'+temp2+'" class="circulo">'+ longitudMensajePlanoBinario.substring(posTemp, i+1) +'</label>');
			mensajeFINAL= mensajeFINAL+longitudMensajePlanoBinario.substring(posTemp, i+1);
			temp2++;
			posTemp= i+1;
		}
	}
	await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#SeccionRepresentaciónBinariaMensaje").hide();
	
	$("#SeccionDivisionBloquesPalabras").show();
	
	$("#informacionSHA3C").append("El mensaje se divide en bloques de 64 bytes o 512 bits y cada bloque se divide en 16 palabras de 4 bytes o 32 bits:");
	$("#informacionSHA3C").slideToggle(500);
	await sleepSHA(4500);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	temp2= 0
	posTemp= 0;
	var auxPalabra= "";
	
	for(i=0; i<mensajeFINAL.length&&i<512; i++)
	{
		if((i+1)%8==0)
		{					
			$("#bloquesSha1C").append('<label id="bloque64B'+temp2+'" class="circulo">'+ mensajeFINAL.substring(posTemp, i+1) +'</label>');
			auxPalabra= auxPalabra+mensajeFINAL.substring(posTemp, i+1);			
			temp2++;
			posTemp= i+1;
			
			if(temp2%4== 0)
			{
				$("#bloquesSha1C").append('<br>');
				DiesciseisPalabras.push(auxPalabra);
				auxPalabra= "";
			}
		}
	}
	await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#SeccionDivisionBloquesPalabras").hide();
	
	$("#SeccionHashInicial").show();
	
	$("#informacionSHA4C").append("Un buffer de 160 bits o 5 palabras de 32 bits se utilizan para almacenar el valor inicial del hash, estos valores ya están predeterminados y se escriben en hexadecimal:");
	$("#informacionSHA4C").slideToggle(500);
	await sleepSHA(6500);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#abcdeHash").append('<label id="A" class="circulo">A= 67452301</label><br>');
	$("#abcdeHash").append('<label id="B" class="circulo">B= EFCDAB89</label><br>');
	$("#abcdeHash").append('<label id="C" class="circulo">C= 98BADCFE</label><br>');
	$("#abcdeHash").append('<label id="D" class="circulo">D= 10325476</label><br>');
	$("#abcdeHash").append('<label id="E" class="circulo">E= C3D2E1F0</label>');
	await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	$("#SeccionHashInicial").hide();
	
	$("#SeccionProcesoHASH").show();
	
	$("#informacionSHA5C").append("Cada bloque del mensaje pasa por 4 etapas de 20 rondas cada una. A continuación se muestra el proceso para el primer bloque:");
	$("#informacionSHA5C").slideToggle(500);
	await sleepSHA(5000);
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	SHA1Inicializar(hash);	
	
	/***************************************************************FUNCION ENTRADA SHA 1**********************************************/
	//err= entradaSHA1(hash, textoPlano, textoPlano.length);
	var lmp= textoPlano.length;
	while(lmp--) //EN ESTA PARTE HACE LOS BLOQUES DE 64 BITS DE LA PALABRA COMPLETA
	{		
		hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= ( textoPlano[posTextoPlano].charCodeAt() & 0xFF);
		console.log(textoPlano[posTextoPlano]);			
		posTextoPlano++;

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
			//procesarBloqueMensajeSHA1(hash); No va a entrar porque lo máximo son 10 letras= 80 bits, cuando el bloque es de 512 bits <-----------------------
		}	
	}
	
	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
	/**********************************************************************************************************************************/
	
	/***************************************************************FUNCION RESULTADO SHA 1**********************************************/
	//err = SHA1Resultado(hash, resultadoHASH);
	//paddingMensajeSHA1(hash);
	if (hash.indiceBloqueMensaje[0] > 55) //SI ES MAYOR DE 55 bytes entonces no caben los otros 8 bytes que significan la longitud del mensaje total
    {
		hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0x80;
		
        while(hash.indiceBloqueMensaje[0] < 64)
        {            
			hash.bloqueMensaje[hash.indiceBloqueMensaje[0]++]= 0;
        }
        
		//procesarBloqueMensajeSHA1(hash);

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

	if(!seguirCifrandoSHA1)
	{
		return;
	}
	
    //procesarBloqueMensajeSHA1(hash);	
	
	contadorBloques++;
	
	if(contadorBloques==1)
	{			
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
		
		$("#informacionSHA5C").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		
		$("#informacionSHA5C").append("Dado que son 80 rondas en total, se necesitan 80 palabras de 32 bits del mensaje para usarlas en el proceso, las primeras 16 palabras son las que conforman el bloque de 64 bytes:");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(7000);
		
		if(!seguirCifrandoSHA1)
		{
			return;
		}
		
		for(i=0; i<16; i++)
		{		
			$("#calculoPalabras").append('<label id="palabra'+i+'" class="circulo">W['+ i +']= ' +DiesciseisPalabras[i] +'</label><br>');
		}
		await sleepSHA(4000*velocidadAnimacionCifrarSHA1);
		
		if(!seguirCifrandoSHA1)
		{
			return;
		}
		
		$("#informacionSHA5C").slideToggle(250);
		$("#calculoPalabras").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();	
		$("#calculoPalabras").empty();
		
		$("#informacionSHA5C").append("Para obtener las restantes se aplica lo siguiente: W[j]= (W[j-16] XOR W[j-14] XOR W[j-8] XOR W[j-3])<<1. 'j' es el número de la palabra y '<<' indica un corrimiento circular a la izquierda de 1 bit. Se calculará W[16]:");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(11000);
		
		if(!seguirCifrandoSHA1)
		{
			return;
		}

		$("#calculoPalabras").slideToggle(500);
		await sleepSHA(500);
		for(t = 16; t < 80; t++)
		{
			if(!seguirCifrandoSHA1)
			{
				return;
			}
			
			W[t]= (corrimientoCircularSHA1(1, W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16] ));			
			
			if(t==16)
			{			
				$("#calculoPalabras").append('<label id="W16" class="circulo">W[16]=</label>');
				$("#calculoPalabras").append('<label id="W1" class="circulo">W[0]</label>');
				$("#calculoPalabras").append('<label id="OPERADOR" class="circulo"> XOR </label>');
				$("#calculoPalabras").append('<label id="W2" class="circulo">W[2]</label>');			
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				
				if(!seguirCifrandoSHA1){ return; }
				
				$("#W1").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W1").html(DiesciseisPalabras[0]);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W2").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W2").html(DiesciseisPalabras[2]);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W1").html("");
				$("#W2").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				auxResultado= W[t-16] ^ W[t-14];
				auxRbinario= auxResultado.toString(2);
				for(i=auxRbinario.length; i<32; i++)
				{
					auxRbinario= "0"+auxRbinario;
				}
				$("#W1").html(auxRbinario);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#W2").html("W[8]");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W2").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W2").html(DiesciseisPalabras[8]);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W1").html("");
				$("#W2").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				auxResultado= auxResultado ^ W[t-8];
				auxRbinario= auxResultado.toString(2);
				for(i=auxRbinario.length; i<32; i++)
				{
					auxRbinario= "0"+auxRbinario;
				}
				$("#W1").html(auxRbinario);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#W2").html("W[13]");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W2").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W2").html(DiesciseisPalabras[13]);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#W1").html("");
				$("#W2").html("");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				auxResultado= auxResultado ^ W[t-3];
				auxRbinario= auxResultado.toString(2);
				for(i=auxRbinario.length; i<32; i++)
				{
					auxRbinario= "0"+auxRbinario;
				}
				$("#W1").html(auxRbinario);
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#OPERADOR").html("<< 1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				auxResultado= corrimientoCircularSHA1(1, auxResultado);
				auxRbinario= auxResultado.toString(2);
				
				if(auxRbinario.includes("-"))
				{
					auxRbinario= auxRbinario.substring(1, auxRbinario.length);
					
					for(i=auxRbinario.length; i<32; i++)
					{
						auxRbinario= "0"+auxRbinario;
					}
					
					auxRbinario= "-"+auxRbinario;
				}
				else
				{
					for(i=auxRbinario.length; i<32; i++)
					{
						auxRbinario= "0"+auxRbinario;
					}
				}			
				
				$("#W1").html(auxRbinario);
				$("#OPERADOR").remove();
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
			}
		}
		
		$("#informacionSHA5C").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		
		$("#informacionSHA5C").append("De la misma forma de obtienen las restantes palabras.");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(2000);
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#calculoPalabras").slideToggle(250);
		$("#informacionSHA5C").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		$("#calculoPalabras").empty();
		
		$("#informacionSHA5C").append("Recordando que cada bloque pasa por 4 etapas de 20 rondas cada una, en cada etapa se usa una constante y una función diferente:");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(4000);
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#TitulosR").append('<td>Etapa t</td><td>Ronda(j)</td><td>Constante Kt</td><td>Funcion ft</td>');
		$("#Ronda1").append('<td>1</td><td>0.....19</td><td>K1= 5A827999</td><td>f1(B,C,D)= (B AND C) OR (NOT B AND D)</td>');
		$("#Ronda2").append('<td>2</td><td>20....39</td><td>K2= 6ED9EBA1</td><td>f2(B,C,D)= B XOR C XOR D</td>');
		$("#Ronda3").append('<td>3</td><td>40....59</td><td>K3= 8F1BBCDC</td><td>f3(B,C,D)= (B AND C) OR (B AND D) OR (C AND D)</td>');
		$("#Ronda4").append('<td>4</td><td>60....79</td><td>K4= CA62C1D6</td><td>f4(B,C,D)= B XOR C XOR D</td>');
		
		$("#contantesyRondas").slideToggle(500);
		await sleepSHA(8000*velocidadAnimacionCifrarSHA1);
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#informacionSHA5C").slideToggle(250);
		$("#contantesyRondas").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		
		$("#informacionSHA5C").append("Con lo anterior, la operación para obtener el hash del mensaje a través de cada ronda en cada etapa es:");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(3500);
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#calculoPalabras").append('<label class="circulo">A= E + ft(B,C,D) + (A<<5) + W[j] + Kt</label><br>');
		$("#calculoPalabras").append('<label class="circulo">B= A</label><br>');
		$("#calculoPalabras").append('<label class="circulo">C= B<<30</label><br>');
		$("#calculoPalabras").append('<label class="circulo">D= C</label><br>');
		$("#calculoPalabras").append('<label class="circulo">E= D</label>');
		$("#calculoPalabras").slideToggle(500);
		await sleepSHA(5000*velocidadAnimacionCifrarSHA1);
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#informacionSHA5C").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		
		$("#informacionSHA5C").append("Los valores de A,B,C,D y E se van actualizando ya que estos contendrán el hash resultado, pero es importante aclarar que en la operación se deben de usar los valores que tienen antes de cada ronda.");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(8000);
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#informacionSHA5C").slideToggle(250);
		$("#calculoPalabras").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		$("#calculoPalabras").empty();

		A[0] = hash.HashTemporal[0];
		B[0] = hash.HashTemporal[1];
		C[0] = hash.HashTemporal[2];
		D[0] = hash.HashTemporal[3];
		E[0] = hash.HashTemporal[4];
				
		for(t = 0; t < 20; t++)
		{
			if(!seguirCifrandoSHA1){ return; }
			
			if(t==0)
			{
				$("#informacionSHA5C").append("A continuación se realizará la primera ronda de la primera etapa:");
				$("#informacionSHA5C").slideToggle(500);
				await sleepSHA(2000);
				
				if(!seguirCifrandoSHA1){ return; }
				
				$("#resultadosHashV").append('<label id="rVA" class="circulo">A= 67452301</label><br>');
				$("#resultadosHashV").append('<label id="rVB" class="circulo">B= EFCDAB89</label><br>');
				$("#resultadosHashV").append('<label id="rVC" class="circulo">C= 98BADCFE</label><br>');
				$("#resultadosHashV").append('<label id="rVD" class="circulo">D= 10325476</label><br>');
				$("#resultadosHashV").append('<label id="rVE" class="circulo">E= C3D2E1F0</label>');
				
				$("#resultadosHashN").append('<label id="rNA" class="circulo">A= E + f1(B,C,D) + (A<<5) + W[0] + K1</label><br>');
				$("#resultadosHashN").append('<label id="rNB" class="circulo">B= A</label><br>');
				$("#resultadosHashN").append('<label id="rNC" class="circulo">C= B<<30</label><br>');
				$("#resultadosHashN").append('<label id="rND" class="circulo">D= C</label><br>');
				$("#resultadosHashN").append('<label id="rNE" class="circulo">E= D</label>');
				
				$("#resultadosHash").slideToggle(500);
				await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rNA").html("A= E + ¿? + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= E + (B AND C) OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= ¿? + (B AND C) OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + (B AND C) OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + (¿? AND C) OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + ("+ B[0].toString(16) +" AND C) OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + ("+ B[0].toString(16) +" AND ¿?) OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + ("+ B[0].toString(16) +" AND "+ C[0].toString(16) +") OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + ¿? OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR (NOT B AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR (NOT ¿? AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR (NOT "+ B[0].toString(16) +" AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR (¿? AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR ("+ (~B[0]).toString(16) +" AND D) + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR ("+ (~B[0]).toString(16) +" AND ¿?) + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR ("+ (~B[0]).toString(16) +" AND "+ D[0].toString(16) +") + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR + ¿? (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ (B[0]&C[0]).toString(16) +" OR "+ ((~B[0])&D[0]).toString(16) +" + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + ¿? + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ E[0].toString(16) +" + "+ ((B[0] & C[0]) | ((~B[0]) & D[0])).toString(16) +" + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= ¿? + (A<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0]))).toString(16) +" + (A<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0]))).toString(16) +" + (¿?<<5) + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0]))).toString(16) +" + ("+ A[0].toString(16) +"<<5) + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0]))).toString(16) +" + ¿? + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0]))).toString(16) +" + "+ (corrimientoCircularSHA1(5,A[0])).toString(16) +" + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= ¿? + W[0] + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ ((E[0]+((B[0] & C[0]) | ((~B[0]) & D[0]))) + corrimientoCircularSHA1(5,A[0])).toString(16) +" + W[0] + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0])) + corrimientoCircularSHA1(5,A[0])).toString(16) +" + ¿? + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0])) + corrimientoCircularSHA1(5,A[0])).toString(16) +" + "+ W[0].toString(16) +" + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= ¿? + K1");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0])) + corrimientoCircularSHA1(5,A[0]) + W[0]).toString(16) +" + K1");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0])) + corrimientoCircularSHA1(5,A[0]) + W[0]).toString(16) +" + ¿?");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0])) + corrimientoCircularSHA1(5,A[0]) + W[0]).toString(16) +" + "+K[0].toString(16));
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= ¿?");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNA").html("A= "+ (E[0]+((B[0] & C[0]) | ((~B[0]) & D[0])) + corrimientoCircularSHA1(5,A[0]) + W[0] + K[0]).toString(16));
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rNB").html("B= ¿?");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNB").html("B= "+A[0].toString(16));
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rNC").html("C= ¿?<<30");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNC").html("C= " + B[0].toString(16) + "<<30");
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNC").html("C= ¿?");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNC").html("C= "+ (corrimientoCircularSHA1(30,B[0])).toString(16));
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rND").html("D= ¿?");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rND").html("D= "+C[0].toString(16));
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rNE").html("E= ¿?");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rNE").html("E= "+D[0].toString(16));
				await sleepSHA(2000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#informacionSHA5C").slideToggle(250);
				await sleepSHA(250);
				$("#informacionSHA5C").empty();
				
				$("#informacionSHA5C").append("Actualizamos los valores y continuamos con las siguientes 19 rondas:");
				$("#informacionSHA5C").slideToggle(500);
				await sleepSHA(2000);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rVA").html("A= ¿?");
				await sleepSHA(250*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rVA").html("A= " + (corrimientoCircularSHA1(5,A[0]) + ((B[0] & C[0]) | ((~B[0]) & D[0])) + E[0] + W[t] + K[0]).toString(16) );
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rVB").html("B= ¿?");
				await sleepSHA(250*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rVB").html("B= " + A[0].toString(16) );
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rVC").html("C= ¿?");
				await sleepSHA(250*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rVC").html("C= " + (corrimientoCircularSHA1(30,B[0])).toString(16) );
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rVD").html("D= ¿?");
				await sleepSHA(250*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rVD").html("D= " + C[0].toString(16) );
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rVE").html("E= ¿?");
				await sleepSHA(250*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				$("#rVE").html("E= " + D[0].toString(16) );
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rNA").html("A= ");
				$("#rNB").html("B= ");
				$("#rNC").html("C= ");
				$("#rND").html("D= ");
				$("#rNE").html("E= ");
				await sleepSHA(500*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
				
				$("#rNA").html("A= E + f1(B,C,D) + (A<<5) + W[0] + K1");
				$("#rNB").html("B= A");
				$("#rNC").html("C= B<<30");
				$("#rND").html("D= C");
				$("#rNE").html("E= D");
				await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
				if(!seguirCifrandoSHA1){ return; }
			}
			
			temp[0] =  corrimientoCircularSHA1(5,A[0]) + ((B[0] & C[0]) | ((~B[0]) & D[0])) + E[0] + W[t] + K[0];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		$("#informacionSHA5C").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA5C").empty();
		
		$("#informacionSHA5C").append("Después de las 20 rondas de la primera etapa, se continúa con las 20 rondas de la segunda etapa y así hasta acabar con las 4 etapas, recordar que en cada etapa cambia la función para calcular A y el valor constante Kt.");
		$("#informacionSHA5C").slideToggle(500);
		await sleepSHA(8500);
		if(!seguirCifrandoSHA1){ return; }

		for(t = 20; t < 40; t++)
		{
			temp[0] = corrimientoCircularSHA1(5,A[0]) + (B[0] ^ C[0] ^ D[0]) + E[0] + W[t] + K[1];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		if(!seguirCifrandoSHA1){ return; }

		for(t = 40; t < 60; t++)
		{
			temp[0] = corrimientoCircularSHA1(5,A[0]) + ((B[0] & C[0]) | (B[0] & D[0]) | (C[0] & D[0])) + E[0] + W[t] + K[2];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		if(!seguirCifrandoSHA1){ return; }

		for(t = 60; t < 80; t++)
		{
			temp[0] = corrimientoCircularSHA1(5,A[0]) + (B[0] ^ C[0] ^ D[0]) + E[0] + W[t] + K[3];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		if(!seguirCifrandoSHA1){ return; }
		
		$("#SeccionProcesoHASH").hide();

		$("#SeccionFinalHash").show();
		
		$("#informacionSHA6C").append("Para finalizar, a los valores que tengan A, B, C, D y E después de las 4 etapas, se les suma el valor correspondiente que tenían inicialmente, es decir, antes de comenzar con las rondas:");
		$("#informacionSHA6C").slideToggle(500);
		await sleepSHA(8000);
		if(!seguirCifrandoSHA1){ return; }
		
		$("#ultimaOperacion").append('<label id="Afinal" class="circulo">A= '+ A[0].toString(16) +' + '+ hash.HashTemporal[0].toString(16) +'</label><br>');
		$("#ultimaOperacion").append('<label id="Bfinal" class="circulo">B= '+ B[0].toString(16) +' + '+ hash.HashTemporal[1].toString(16) +'</label><br>');
		$("#ultimaOperacion").append('<label id="Cfinal" class="circulo">C= '+ C[0].toString(16) +' + '+ hash.HashTemporal[2].toString(16) +'</label><br>');
		$("#ultimaOperacion").append('<label id="Dfinal" class="circulo">D= '+ D[0].toString(16) +' + '+ hash.HashTemporal[3].toString(16) +'</label><br>');
		$("#ultimaOperacion").append('<label id="Efinal" class="circulo">E= '+ E[0].toString(16) +' + '+ hash.HashTemporal[4].toString(16) +'</label>');
		await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
		if(!seguirCifrandoSHA1){ return; }
		
		$("#Afinal").html("A= ¿?");
		$("#Bfinal").html("B= ¿?");
		$("#Cfinal").html("C= ¿?");
		$("#Dfinal").html("D= ¿?");
		$("#Efinal").html("E= ¿?");
		await sleepSHA(500*velocidadAnimacionCifrarSHA1);
		if(!seguirCifrandoSHA1){ return; }
		
		$("#Afinal").html("A= "+ (A[0] + hash.HashTemporal[0]).toString(16) );
		$("#Bfinal").html("B= "+ (B[0] + hash.HashTemporal[1]).toString(16) );
		$("#Cfinal").html("C= "+ (C[0] + hash.HashTemporal[2]).toString(16) );
		$("#Dfinal").html("D= "+ (D[0] + hash.HashTemporal[3]).toString(16) );
		$("#Efinal").html("E= "+ (E[0] + hash.HashTemporal[4]).toString(16) );				
		await sleepSHA(3000*velocidadAnimacionCifrarSHA1);
		if(!seguirCifrandoSHA1){ return; }
		
		$("#informacionSHA6C").slideToggle(250);
		await sleepSHA(250);
		$("#informacionSHA6C").empty();
		
		$("#informacionSHA6C").append("Lo anterior se repite hasta concluir con todos los bloques del mensaje.");
		$("#informacionSHA6C").slideToggle(500);
		await sleepSHA(2500);
		if(!seguirCifrandoSHA1){ return; }
		
		$("#Afinal").html("");
		$("#Bfinal").html("");
		$("#Cfinal").html("");
		$("#Dfinal").html("");
		$("#Efinal").html("");

		hash.HashTemporal[0] += A[0];
		hash.HashTemporal[1] += B[0];
		hash.HashTemporal[2] += C[0];
		hash.HashTemporal[3] += D[0];
		hash.HashTemporal[4] += E[0];

		hash.indiceBloqueMensaje[0] = 0;
		if(!seguirCifrandoSHA1){ return; }
	}
	else
	{
		if(!seguirCifrandoSHA1){ return; }
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
		
		if(!seguirCifrandoSHA1){ return; }
			
		for(t = 16; t < 80; t++)
		{
			W[t]= (corrimientoCircularSHA1(1, W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16] ));			
		}
		
		if(!seguirCifrandoSHA1){ return; }
			
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
		
		if(!seguirCifrandoSHA1){ return; }

		for(t = 20; t < 40; t++)
		{
			temp[0] = corrimientoCircularSHA1(5,A[0]) + (B[0] ^ C[0] ^ D[0]) + E[0] + W[t] + K[1];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		if(!seguirCifrandoSHA1){ return; }

		for(t = 40; t < 60; t++)
		{
			temp[0] = corrimientoCircularSHA1(5,A[0]) + ((B[0] & C[0]) | (B[0] & D[0]) | (C[0] & D[0])) + E[0] + W[t] + K[2];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		if(!seguirCifrandoSHA1){ return; }

		for(t = 60; t < 80; t++)
		{
			temp[0] = corrimientoCircularSHA1(5,A[0]) + (B[0] ^ C[0] ^ D[0]) + E[0] + W[t] + K[3];
			E[0] = D[0];
			D[0] = C[0];
			C[0] = corrimientoCircularSHA1(30,B[0]);
			B[0] = A[0];
			A[0] = temp[0];
		}
		
		if(!seguirCifrandoSHA1){ return; }

		hash.HashTemporal[0] += A[0];
		hash.HashTemporal[1] += B[0];
		hash.HashTemporal[2] += C[0];
		hash.HashTemporal[3] += D[0];
		hash.HashTemporal[4] += E[0];

		hash.indiceBloqueMensaje[0] = 0;
	}		
	
	for(i=0; i<64; i++)
	{
		hash.bloqueMensaje[i]= 0;
	}
	
	hash.Length_Low[0]= 0;
	hash.Length_High[0]= 0;
	hash.Computed[0]= 1;
		
	for(i= 0; i<tamHashSHA1; i++)
	{
		resultadoHASH[i]= hash.HashTemporal[i>>2] >> 8 * (3-(i & 0x03));
	}
	
	if(!seguirCifrandoSHA1){ return; }
	/**********************************************************************************************************************************/
	
	$("#informacionSHA6C").slideToggle(250);
	await sleepSHA(250);
	$("#informacionSHA6C").empty();
	
	$("#informacionSHA6C").append("Una vez terminados todos los bloques, el hash del mensaje es:");
	$("#informacionSHA6C").slideToggle(500);
	await sleepSHA(2500);
	if(!seguirCifrandoSHA1){ return; }
	
	$("#Afinal").html("A= "+ (hash.HashTemporal[0]).toString(16) );	
	$("#Bfinal").html("B= "+ (hash.HashTemporal[1]).toString(16) );
	$("#Cfinal").html("C= "+ (hash.HashTemporal[2]).toString(16) );
	$("#Dfinal").html("D= "+ (hash.HashTemporal[3]).toString(16) );
	$("#Efinal").html("E= "+ (hash.HashTemporal[4]).toString(16) );
		
	for(i = 0; i < 20 ; i++)
	{			
		if(i==0)
		{
			if(resultadoHASH[i]<16)
			{
				textoCifrado= "0"+(resultadoHASH[i].toString(16)).toUpperCase();
			}
			else
			{
				textoCifrado= (resultadoHASH[i].toString(16)).toUpperCase();
			}				
		}
		else
		{
			if(resultadoHASH[i]<16)
			{
				textoCifrado= textoCifrado+"0"+(resultadoHASH[i].toString(16)).toUpperCase();
			}
			else
			{
				textoCifrado= textoCifrado+""+(resultadoHASH[i].toString(16)).toUpperCase();
			}				
		}
	}
	
	$("#btn-velocidadCSHA1").show();
	$("#btn-cifrarSHA1-cifrado").show();
	$("#btn-cancelarCifrarSHA1-cifrado").hide();
	
	toastr.options.timeOut = "1000";
	toastr['success'](mensaje_57);
	$("#textoCifradoSHA1C").val(textoCifrado);
}

function validarEntradaCifradoSHA1()
{
	var mensaje = "";
	var texto = $('#textoMensajePlanoSHA1Cifrado').val();
	var i;

	if (texto.length < 1 || texto.length > 10)
	{
		mensaje = mensaje_43;
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

$(document).ready(function()
{
	$("#CifradoRapidoSHA1").click(function(){
		$("#btn-cifrarSHA1-cifrado").html('Obtener Hash Rápido');
		$("#btn-cifrarSHA1-cifrado").val(1);
	});
	$("#CifradoNormalSHA1").click(function(){
		$("#btn-cifrarSHA1-cifrado").html('Obtener Hash Normal');
		$("#btn-cifrarSHA1-cifrado").val(2);
	});
	$("#CifradoLentoSHA1").click(function(){
		$("#btn-cifrarSHA1-cifrado").html('Obtener Hash Lento');
		$("#btn-cifrarSHA1-cifrado").val(3);
	});
	
	$("#textoMensajePlanoSHA1Cifrado").keyup(function()
	{
		var mensaje = validarEntradaCifradoSHA1();		

		if($("#textoMensajePlanoSHA1Cifrado").val().length == 0){
			$("#textoMensajePlanoSHA1Cifrado-error").remove();
			$("#textoMensajePlanoSHA1Cifrado").removeClass('input-error');
		}
		else{
			if (mensaje.length != 0) {
				$("#textoMensajePlanoSHA1Cifrado-error").remove();
				$("#textoMensajePlanoSHA1Cifrado").parent().parent().append('<div id="textoMensajePlanoSHA1Cifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
				$("#textoMensajePlanoSHA1Cifrado").addClass('input-error');
				//$("#btn-cifrarSHA1-cifrado").attr("disabled", true);
				//MathJax.Hub.Queue(["Typeset", MathJax.Hub, "valorBafinDAfin-error"]);
			} else
			{
				$("#textoMensajePlanoSHA1Cifrado-error").remove();
				$("#textoMensajePlanoSHA1Cifrado").removeClass('input-error');
				$("#btn-cifrarSHA1-cifrado").attr("disabled", false);			
			}
		}
	});
	
	$("#btn-cifrarSHA1-cifrado").click(function()
	{
		var mensaje= validarEntradaCifradoSHA1();		
		
		if(mensaje.length!=0)
		{
			$("#textoMensajePlanoSHA1Cifrado-error").remove();
			$("#textoMensajePlanoSHA1Cifrado").parent().parent().append('<div id="textoMensajePlanoSHA1Cifrado-error" class="text-danger">&nbsp;'+mensaje+'</div>');
			$("#textoMensajePlanoSHA1Cifrado").addClass('input-error');
			//$("#btn-cifrarSHA1-cifrado").attr("disabled", true);
		}		
		else
		{
			cifrarSHA1();
		}		
	});
	
	$("#btn-cancelarCifrarSHA1-cifrado").click(function()
	{
		seguirCifrandoSHA1= false;
		
		limpiaPanelSHA1Cifrado();

		$("#btn-velocidadCSHA1").show();
		$("#btn-cifrarSHA1-cifrado").show();
		$("#btn-cancelarCifrarSHA1-cifrado").hide();
	});
});

function sleepSHA(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}