var cancelado = false;
var velocidad = 1;

$.fn.scrollViewIM = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepIM(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelInversoMultiplicativo() {
	$("#pnl-InteractivoInversoMultiplicativo").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelInversoMultiplicativo(){
	cancelado = true;

	$("#pnl-InteractivoInversoMultiplicativo").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelInversoMultiplicativo();

	$("#in-valorAInversoMultiplicativo").val("117");
	$("#in-valorModuloInversoMultiplicativo").val("244");

	$("#btn-comenzarInversoMultiplicativo").show();
	$("#btn-velocidadInversoMultiplicativo").show();
	$("#btn-cancelarInversoMultiplicativo").hide();

	deleteErrorInversoMultiplicativo("valorModuloInversoMultiplicativo");
	deleteErrorInversoMultiplicativo("valorAInversoMultiplicativo");
}

function limpiaPanelInversoMultiplicativo(){
	$('#IMizquierda').empty();
	$('#IMcentro').empty();
	$('#IMderecha').empty();
	$('#valorInversoMultiplicativo').html("<br>");
	$('#out-inversoMultiplicativo').val('');

	$("#in-valorAInversoMultiplicativo").val("");
	$("#in-valorModuloInversoMultiplicativo").val("");

	if($('#IMdiv1').is(':visible')) {
		$("#IMdiv1").slideToggle(500);
	}
}

async function comenzarInversoMultiplicativo(){
	var a = parseInt($("#in-valorAInversoMultiplicativo").val());
	var modulo = parseInt($("#in-valorModuloInversoMultiplicativo").val());
	var a_2 = 0, b_2 = 0, r = 0, x = 0;
	var i = 0, pasos_length = 0, contador_reversa = 0, ecuaciones_length = 0;
	var pasos = [];
	var ecuaciones = [];
	var despeje = [];

	for (var j = 0 ; j < 20 ; j++) {
	   pasos[j] = [];
	   ecuaciones[j] = [];
	}
	
	limpiaPanelInversoMultiplicativo();

	$("#in-valorAInversoMultiplicativo").val(a);
	$("#in-valorModuloInversoMultiplicativo").val(modulo);

	$('#IMdiv1').html('Se utiliza el Algoritmo de Euclides para verificar que MCD(' + a + ' , ' + modulo + ' ) = 1.');
	$('#IMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIM(3000);
	
	if(cancelado){
		return;
	}

	$('#IMdiv1').scrollViewIM();

	b_2 = modulo;
	r = a;

	$('#IMizquierda').append('<center><table class="table tableVI4 tabla text-center" id="pasos"><tr><td>&nbsp;</td><td>&nbsp;</td><td><b>b</b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td><b>a</b></td><td>&nbsp;</td><td>&nbsp;</td></tr></table></center>');

	while(r != 0){
		pasos_length++;

		a_2 = b_2;
		b_2 = r;
		
		x = Math.floor(a_2/b_2);
		r = a_2%b_2;

		$('#pasos').append('<tr id="p' + pasos_length + '"><td><b>(' + pasos_length + ')</b></td><td>&nbsp;</td><td>' + a_2 + '</td><td>=</td><td>' + x + '</td><td>*</td><td>' + b_2 + '</td><td>+</td><td>' + r + '</td></tr>');
		
		pasos[pasos_length][0] = a_2;
		pasos[pasos_length][1] = x;
		pasos[pasos_length][2] = b_2;
		pasos[pasos_length][3] = r;

		putparpadeo('#p'+pasos_length, 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo('#p'+pasos_length, 1*velocidad, azul);
	}
	
	if(cancelado){
        return;
    }

    $('#IMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIM(1000);
	
	if(cancelado){
		return;
	}

	contador_reversa = pasos_length-1;

	$('#IMdiv1').html("Se toma la penúltima ecuación (" + contador_reversa + ") y se despeja el residuo.");
	$('#IMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIM(3000);

	if(cancelado){
		return;
	}

	$('#IMdiv1').scrollViewIM();

	putparpadeo('#p'+contador_reversa, 1*velocidad, azul);

	await sleepIM(1000*velocidad);

	removeputparpadeo('#p'+contador_reversa, 1*velocidad, azul);

	$('#IMcentro').append('<center><table class="table tableVI4 tabla text-center" id="despeje"><tr><td colspan="819">Despejes</td></tr><tr id="despeje1"><td id="a_2" colspan="117">' + pasos[contador_reversa][3] + '</td><td colspan="117">=</td><td id="x" colspan="117">' + pasos[contador_reversa][0] + '</td><td colspan="117">-</td><td id="b_2" colspan="117">' + pasos[contador_reversa][1] + '</td><td colspan="117">*</td><td id="r" colspan="117">' + pasos[contador_reversa][2] + '</td></tr></table></center>');

	putparpadeo('#despeje1', 1*velocidad, azul);

	await sleepIM(1000*velocidad);

	removeputparpadeo('#despeje1', 1*velocidad, azul);

	ecuaciones_length++;

	ecuaciones[ecuaciones_length][0] = pasos[contador_reversa][3];
	ecuaciones[ecuaciones_length][1] = 1;
	ecuaciones[ecuaciones_length][2] = pasos[contador_reversa][0];
	ecuaciones[ecuaciones_length][3] = -pasos[contador_reversa][1];
	ecuaciones[ecuaciones_length][4] = pasos[contador_reversa][2];

	$('#IMderecha').append('<center><table class="table tableVI4 tabla text-center" id="operaciones"><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td><b>b</b></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td><b>a</b></td></tr><tr id="e' + ecuaciones_length + '"><td><b>(' + (pasos_length+ecuaciones_length) + ')</b></td><td>&nbsp;</td><td id="b_2">' + ecuaciones[ecuaciones_length][0] + '</td><td>=</td><td>' + ecuaciones[ecuaciones_length][1] + '</td><td>*</td><td id="x">' + ecuaciones[ecuaciones_length][2] + '</td><td id="final_s-' + ecuaciones_length + '">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="final-' + ecuaciones_length + '">' + Math.abs(ecuaciones[ecuaciones_length][3]) + '</td><td>*</td><td id="r">' + ecuaciones[ecuaciones_length][4] + '</td></tr></table></center>');

	putparpadeo('#e'+ecuaciones_length, 1*velocidad, azul);

	await sleepIM(1000*velocidad);

	removeputparpadeo('#e'+ecuaciones_length, 1*velocidad, azul);

	if(contador_reversa > 1){
		if(cancelado){
	        return;
	    }

	    $('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(1000);
		
		if(cancelado){
			return;
		}
	
		$('#IMdiv1').html("Se toma la ecuación anterior (" + --contador_reversa + "), se despeja el residuo y se sustituye en la última ecuación.");
		$('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(4000);

		if(cancelado){
			return;
		}

		$('#IMdiv1').scrollViewIM();

		putparpadeo('#p'+contador_reversa, 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo('#p'+contador_reversa, 1*velocidad, azul);

		$('#despeje').html('<tr><td colspan="819">Despejes</td></tr><tr id="despeje1"><td id="a_2" colspan="117">' + pasos[contador_reversa][3] + '</td><td colspan="117">=</td><td id="x" colspan="117">' + pasos[contador_reversa][0] + '</td><td colspan="117">-</td><td id="b_2" colspan="117">' + Math.abs(pasos[contador_reversa][1]) + '</td><td colspan="117">*</td><td id="r" colspan="117">' + pasos[contador_reversa][2] + '</td></tr>');

		despeje[0] = pasos[contador_reversa][3];console.log(despeje[0]);
		despeje[1] = pasos[contador_reversa][0];console.log(despeje[1]);
		despeje[2] = -pasos[contador_reversa][1];console.log(despeje[2]);
		despeje[3] = pasos[contador_reversa][2];console.log(despeje[3]);

		putparpadeo('#despeje1', 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo('#despeje1', 1*velocidad, azul);

		putparpadeo('#e'+ecuaciones_length, 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo('#e'+ecuaciones_length, 1*velocidad, azul);

		$('#despeje').append('<tr id="despeje2"><td id="a_2" colspan="63">' + ecuaciones[ecuaciones_length][0] + '</td><td colspan="63">=</td><td id="x" colspan="63">' + ecuaciones[ecuaciones_length][2] + '</td><td colspan="63">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="b_2" colspan="63">' + Math.abs(ecuaciones[ecuaciones_length][3]) + '</td><td colspan="63">*</td><td id="r" colspan="63">(</td><td id="despeje2-a" colspan="63">' + despeje[1] + '</td><td colspan="63">-</td><td colspan="63">' + Math.abs(despeje[2]) + '</td><td colspan="63">*</td><td id="despeje2-b" colspan="63">' + despeje[3] + '</td><td colspan="63">)</td></tr>');

		putparpadeo('#despeje2', 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo('#despeje2', 1*velocidad, azul);

		if(cancelado){
	        return;
	    }

	    $('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(1000);
		
		if(cancelado){
			return;
		}

		$('#IMdiv1').html("Una vez hecha la sustitución, la ecuación se deja expresada en terminos de b y a de (" + contador_reversa + ").");
		$('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(3000);

		if(cancelado){
			return;
		}

		$('#IMdiv1').scrollViewIM();

		putparpadeo("#despeje2-a", 2*velocidad, azul);
		putparpadeo("#despeje2-b", 2*velocidad, azul);

		await sleepIM(1000*velocidad);
		ecuaciones_length++;
		ecuaciones[ecuaciones_length][0] = ecuaciones[ecuaciones_length-1][0];console.log(ecuaciones[ecuaciones_length-1][0]);
		ecuaciones[ecuaciones_length][1] = ecuaciones[ecuaciones_length-1][3];console.log(ecuaciones[ecuaciones_length-1][3]);
		ecuaciones[ecuaciones_length][2] = despeje[1];console.log(despeje[1]);
		ecuaciones[ecuaciones_length][3] = ecuaciones[ecuaciones_length-1][3]*despeje[2] + ecuaciones[ecuaciones_length-1][1];console.log(ecuaciones[ecuaciones_length-1][3] + " * " + despeje[2] + ecuaciones[ecuaciones_length-1][1]);
		ecuaciones[ecuaciones_length][4] = despeje[3];console.log(despeje[3]);

		$('#despeje').append('<tr id="despeje3"><td id="a_2" colspan="91">' + ecuaciones[ecuaciones_length][0] + '</td><td colspan="91">=</td><td id="x" colspan="91">' + ecuaciones[ecuaciones_length][1] + '</td><td colspan="91">*</td><td id="b_2" colspan="91">' + ecuaciones[ecuaciones_length][2] + '</td><td colspan="91">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="b_2" colspan="91">' + ecuaciones[ecuaciones_length][3] + '</td><td colspan="91">*</td><td id="r" colspan="91">' + ecuaciones[ecuaciones_length][4] + '</td></tr>');

		putparpadeo("#despeje3", 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo("#despeje3", 1*velocidad, azul);
		removeputparpadeo("#despeje2-a", 2*velocidad, azul);
		removeputparpadeo("#despeje2-b", 2*velocidad, azul);

		$('#operaciones').append('<tr id="e' + ecuaciones_length + '"><td><b>(' + (pasos_length+ecuaciones_length) + ')</b></td><td>&nbsp;</td><td>' + ecuaciones[ecuaciones_length][0] + '</td><td>=</td><td>' + ecuaciones[ecuaciones_length][1] + '</td><td>*</td><td>' + ecuaciones[ecuaciones_length][2] + '</td><td id="final_s-' + ecuaciones_length + '">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="final-' + ecuaciones_length + '">' + Math.abs(ecuaciones[ecuaciones_length][3]) + '</td><td>*</td><td>' + ecuaciones[ecuaciones_length][4] + '</td></tr></table></center>');

		putparpadeo("#e"+ecuaciones_length, 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo("#e"+ecuaciones_length, 1*velocidad, azul);

		if(cancelado){
	        return;
	    }

	    $('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(1000);
		
		if(cancelado){
			return;
		}

		$('#IMdiv1').html("Se repiten los despejes y sustituciones hasta terminar con la ecuación 1.");
		$('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(3000);

		if(cancelado){
			return;
		}

		$('#IMdiv1').scrollViewIM();

		while(contador_reversa > 1){
			contador_reversa--;

			putparpadeo('#p'+contador_reversa, 0.5*velocidad, azul);

			await sleepIM(500*velocidad);

			removeputparpadeo('#p'+contador_reversa, 0.5*velocidad, azul);

			$('#despeje').html('<tr><td colspan="819">Despejes</td></tr><tr id="despeje1"><td id="a_2" colspan="117">' + pasos[contador_reversa][3] + '</td><td colspan="117">=</td><td id="x" colspan="117">' + pasos[contador_reversa][0] + '</td><td colspan="117">-</td><td id="b_2" colspan="117">' + Math.abs(pasos[contador_reversa][1]) + '</td><td colspan="117">*</td><td id="r" colspan="117">' + pasos[contador_reversa][2] + '</td></tr>');
			
			despeje[0] = pasos[contador_reversa][3];
			despeje[1] = pasos[contador_reversa][0];
			despeje[2] = -pasos[contador_reversa][1];
			despeje[3] = pasos[contador_reversa][2];

			putparpadeo('#despeje1', 0.5*velocidad, azul);

			await sleepIM(500*velocidad);

			removeputparpadeo('#despeje1', 0.5*velocidad, azul);

			putparpadeo('#e'+ecuaciones_length, 0.5*velocidad, azul);

			await sleepIM(500*velocidad);

			removeputparpadeo('#e'+ecuaciones_length, 0.5*velocidad, azul);

			$('#despeje').append('<tr id="despeje2"><td id="b_2" colspan="63">' + ecuaciones[ecuaciones_length][0] + '</td><td colspan="63">=</td><td id="x" colspan="63">' + ecuaciones[ecuaciones_length][2] + '</td><td colspan="63">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="a_2" colspan="63">' + Math.abs(ecuaciones[ecuaciones_length][3]) + '</td><td colspan="63">*</td><td id="r" colspan="63">(</td><td id="despeje2-a" colspan="63">' + despeje[1] + '</td><td colspan="63">-</td><td colspan="63">' + Math.abs(despeje[2]) + '</td><td colspan="63">*</td><td id="despeje2-b" colspan="63">' + despeje[3] + '</td><td colspan="63">)</td></tr>');

			putparpadeo('#despeje2', 0.5*velocidad, azul);

			await sleepIM(500*velocidad);

			removeputparpadeo('#despeje2', 0.5*velocidad, azul);

			putparpadeo("#despeje2-a", 1*velocidad, azul);
			putparpadeo("#despeje2-b", 1*velocidad, azul);

			await sleepIM(500*velocidad);
			
			ecuaciones_length++;
			ecuaciones[ecuaciones_length][0] = ecuaciones[ecuaciones_length-1][0];
			ecuaciones[ecuaciones_length][1] = ecuaciones[ecuaciones_length-1][3];
			ecuaciones[ecuaciones_length][2] = despeje[1];
			ecuaciones[ecuaciones_length][3] = ecuaciones[ecuaciones_length-1][3]*despeje[2] + ecuaciones[ecuaciones_length-1][1];
			ecuaciones[ecuaciones_length][4] = despeje[3];

			$('#despeje').append('<tr id="despeje3"><td id="a_2" colspan="91">' + ecuaciones[ecuaciones_length][0] + '</td><td colspan="91">=</td><td id="x" colspan="91">' + ecuaciones[ecuaciones_length][1] + '</td><td colspan="91">*</td><td id="b_2" colspan="91">' + ecuaciones[ecuaciones_length][2] + '</td><td colspan="91">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="b_2" colspan="91">' + ecuaciones[ecuaciones_length][3] + '</td><td colspan="91">*</td><td id="r" colspan="91">' + ecuaciones[ecuaciones_length][4] + '</td></tr>');

			putparpadeo("#despeje3", 0.5*velocidad, azul);

			await sleepIM(500*velocidad);

			removeputparpadeo("#despeje3", 0.5*velocidad, azul);
			removeputparpadeo("#despeje2-a", 1*velocidad, azul);
			removeputparpadeo("#despeje2-b", 1*velocidad, azul);

			$('#operaciones').append('<tr id="e' + ecuaciones_length + '"><td><b>(' + (pasos_length+ecuaciones_length) + ')</b></td><td>&nbsp;</td><td>' + ecuaciones[ecuaciones_length][0] + '</td><td>=</td><td>' + ecuaciones[ecuaciones_length][1] + '</td><td>*</td><td>' + ecuaciones[ecuaciones_length][2] + '</td><td id="final_s-' + ecuaciones_length + '">' + ((ecuaciones[ecuaciones_length][3]<0)?'-':'+') + '</td><td id="final-' + ecuaciones_length + '">' + Math.abs(ecuaciones[ecuaciones_length][3]) + '</td><td>*</td><td>' + ecuaciones[ecuaciones_length][4] + '</td></tr></table></center>');

			putparpadeo("#e"+ecuaciones_length, 0.5*velocidad, azul);

			await sleepIM(1500*velocidad);

			removeputparpadeo("#e"+ecuaciones_length, 0.5*velocidad, azul);
		}
	}

	if(cancelado){
        return;
    }

    $('#IMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIM(1000);
	
	if(cancelado){
		return;
	}

	$('#IMdiv1').html("El número al que multiplica A es el inverso multiplicativo.");
	$('#IMdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepIM(3000);

	if(cancelado){
		return;
	}

	$('#IMdiv1').scrollViewIM();

	putparpadeo('#final-'+ecuaciones_length, 1*velocidad, azul);
	if(ecuaciones[ecuaciones_length][3] < 0)
		putparpadeo('#final_s-'+ecuaciones_length, 1*velocidad, azul);

	await sleepIM(1000*velocidad);

	removeputparpadeo('#final-'+ecuaciones_length, 1*velocidad, azul);
	if(ecuaciones[ecuaciones_length][3] < 0)
		removeputparpadeo('#final_s-'+ecuaciones_length, 1*velocidad, azul);

	if(ecuaciones[ecuaciones_length][3] < 0){
		if(cancelado){
	        return;
	    }

	    $('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(1000);
		
		if(cancelado){
			return;
		}

		$('#IMdiv1').html("Como es un número negativo se calcula su Inverso Aditivo.");
		$('#IMdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepIM(3000);

		if(cancelado){
			return;
		}

		$('#IMdiv1').scrollViewIM();

		$('#IMcentro').html("<table class='table tableVI4 tabla text-center'><tr><td colspan='819'>Despejes</td></tr><tr id='IM'><td>" + modulo + "</td><td>-</td><td>" + Math.abs(ecuaciones[ecuaciones_length][3]) + "</td><td>=</td><td>" + (modulo+ecuaciones[ecuaciones_length][3]) + "</td></tr></table>");

		ecuaciones[ecuaciones_length][3] = modulo+ecuaciones[ecuaciones_length][3];

		putparpadeo('#IM', 1*velocidad, azul);

		await sleepIM(1000*velocidad);

		removeputparpadeo('#IM', 1*velocidad, azul);
	}

	$('#valorInversoMultiplicativo').append('<label class="circulo" id="IM-cell-0">' + ecuaciones[ecuaciones_length][3] + '</label>');

	putparpadeo('#IM-cell-0', 1*velocidad, negro);

	await sleepIM(1000*velocidad);

	removeputparpadeo('#IM-cell-0', 1*velocidad, negro);

	//FIN
    $("#out-inversoMultiplicativo").val(ecuaciones[ecuaciones_length][3]);
    $("#btn-velocidadInversoMultiplicativo").show();
    $("#btn-comenzarInversoMultiplicativo").show();
    $("#btn-cancelarInversoMultiplicativo").hide();

    if(!cancelado){
        $('#IMdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function validarEntradaValorAInversoMultiplicativo(){
	var mensaje = "";
	var a = $('#in-valorAInversoMultiplicativo').val();
	var z = $('#in-valorModuloInversoMultiplicativo').val();

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(2) == -1 || bigInt(a).compare(z) != -1 || a.length == 0){
		mensaje = mensaje_76;
	}
	else if(bigInt.gcd(bigInt(a), bigInt(z)).compare(1) != 0){
		mensaje = mensaje_77;
	}

	return mensaje;
}

function validarEntradaValorModuloInversoMultiplicativo(){
	var mensaje = "";
	var m = $('#in-valorModuloInversoMultiplicativo').val();
	var a = $('#in-valorAInversoMultiplicativo').val();

	if(!m.match(/^[0-9]+$/) || bigInt(m).compare(2) == -1 || bigInt(m).compare(1000) == 1 || m.length == 0){
		mensaje = mensaje_78;
	}
	else if(bigInt.gcd(bigInt(a), bigInt(m)).compare(1) != 0){
		mensaje = mensaje_77;
	}

	return mensaje;
}

function validarEntradaC_AInversoMultiplicativo(){
	var mensaje = "";
	var a = $('#C-A-IM').val();
	var z = $('#C-M-IM').val();

	if(!a.match(/^[0-9]+$/) || bigInt(a).compare(2) == -1 || bigInt(a).compare(z) != -1 || a.length == 0){
		mensaje = mensaje_76;
	}
	else if(bigInt.gcd(bigInt(a), bigInt(z)).compare(1) != 0){
		mensaje = mensaje_77;
	}

	return mensaje;
}

function validarEntradaC_MInversoMultiplicativo(){
	var mensaje = "";
	var z = $('#C-M-IM').val();
	var a = $('#C-A-IM').val();

	if(!z.match(/^[0-9]+$/) || bigInt(z).compare(2) == -1 || bigInt(z).compare(10000000) == 1 || z.length == 0){
		mensaje = mensaje_123;
	}
	else{
		if(a.match(/^[0-9]+$/)){
			if(bigInt.gcd(bigInt(a), bigInt(z)).compare(1) != 0){
				mensaje = mensaje_77;
			}
		}
	}

	return mensaje;
}

function addErrorInversoMultiplicativo(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorInversoMultiplicativo(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorIM(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorIM(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoInversoMultiplicativo1").click(function(){
        $("#btn-comenzarInversoMultiplicativo").html('Calcular Rápido');
        $("#btn-comenzarInversoMultiplicativo").val(1);
    });
    $("#tipoInversoMultiplicativo2").click(function(){
        $("#btn-comenzarInversoMultiplicativo").html('Calcular Normal');
        $("#btn-comenzarInversoMultiplicativo").val(2);
    });

    $("#in-valorAInversoMultiplicativo").on('click change keyup', function() {
        var mensaje = validarEntradaValorAInversoMultiplicativo();

        if (mensaje.length != 0) {
            addErrorInversoMultiplicativo("valorAInversoMultiplicativo", mensaje);
        } else{
            deleteErrorInversoMultiplicativo("valorAInversoMultiplicativo");

            if(validarEntradaValorModuloInversoMultiplicativo().length == 0){console.log("shi");
            	deleteErrorInversoMultiplicativo("valorModuloInversoMultiplicativo");
            }
            else{console.log("ño");
            	addErrorInversoMultiplicativo("valorModuloInversoMultiplicativo", validarEntradaValorModuloInversoMultiplicativo());
            }
        }
    });

    $("#in-valorModuloInversoMultiplicativo").on('click change keyup', function() {
        var mensaje = validarEntradaValorModuloInversoMultiplicativo();

        if (mensaje.length != 0) {
            addErrorInversoMultiplicativo("valorModuloInversoMultiplicativo", mensaje);
        } else{
            deleteErrorInversoMultiplicativo("valorModuloInversoMultiplicativo");

            if(validarEntradaValorAInversoMultiplicativo().length == 0)
            	deleteErrorInversoMultiplicativo("valorAInversoMultiplicativo");
            else
            	addErrorInversoMultiplicativo("valorAInversoMultiplicativo", validarEntradaValorAInversoMultiplicativo());
        }
    });

    $("#C-A-IM").keyup(function(){
        var mensaje = validarEntradaC_AInversoMultiplicativo();

        if (mensaje.length != 0) {
            addErrorIM("C-A-IM", mensaje);
        } else{
            deleteErrorIM("C-A-IM");

            if(validarEntradaC_MInversoMultiplicativo().length == 0)
            	deleteErrorIM("C-M-IM");
            else
            	addErrorIM("C-M-IM", validarEntradaC_MInversoMultiplicativo());
        }
    });

    $("#C-M-IM").keyup(function(){
        var mensaje = validarEntradaC_MInversoMultiplicativo();

        if (mensaje.length != 0) {
            addErrorIM("C-M-IM", mensaje);
        } else{
            deleteErrorIM("C-M-IM");

            if(validarEntradaC_AInversoMultiplicativo().length == 0)
            	deleteErrorIM("C-A-IM");
            else
            	addErrorIM("C-A-IM", validarEntradaC_AInversoMultiplicativo());
        }
    });

    $("#btn-comenzarInversoMultiplicativo").click(function(){
		var mensajevalorA = validarEntradaValorAInversoMultiplicativo();
		var mensajevaloranillo = validarEntradaValorModuloInversoMultiplicativo();

		if(mensajevalorA.length == 0 && mensajevaloranillo.length == 0){
			$("#valorAInversoMultiplicativo-error").remove();
            $("#valorModuloInversoMultiplicativo-error").remove();
            $("#in-valorAInversoMultiplicativo").removeClass('input-error');
            $("#in-valorModuloInversoMultiplicativo").removeClass('input-error');

            if($('#btn-comenzarInversoMultiplicativo').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarInversoMultiplicativo').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadInversoMultiplicativo").hide();
            $("#btn-comenzarInversoMultiplicativo").hide();
            $("#btn-cancelarInversoMultiplicativo").show();
            cancelado = false;
            
            comenzarInversoMultiplicativo();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorInversoMultiplicativo("valorAInversoMultiplicativo", mensajevalorA);
			}
			if(mensajevaloranillo.length > 0){
				addErrorInversoMultiplicativo("valorModuloInversoMultiplicativo", mensajevaloranillo);
			}
		}
	});

	$("#btn-cancelarInversoMultiplicativo").click(function(){
        cancelado = true;

        limpiaPanelInversoMultiplicativo();

        $("#btn-comenzarInversoMultiplicativo").show();
        $("#btn-velocidadInversoMultiplicativo").show();
        $("#btn-cancelarInversoMultiplicativo").hide();
    });

    $("#btn-calcularInversoMultiplicativo").click(function(){
		var mensajevalorA = validarEntradaC_AInversoMultiplicativo();
		var mensajevaloranillo = validarEntradaC_MInversoMultiplicativo();

		if(mensajevalorA.length == 0 && mensajevaloranillo.length == 0){
			$("#C-A-IM-error").remove();
            $("#C-M-IM-error").remove();
            $("#C-A-IM").removeClass('input-error');
            $("#C-M-IM").removeClass('input-error');

           	calcularInversoMultiplicativo();
		}
		else{
			if(mensajevalorA.length > 0){
				addErrorIM("C-A-IM", mensajevalorA);
			}
			if(mensajevaloranillo.length > 0){
				addErrorIM("C-M-IM", mensajevaloranillo);
			}
		}
	});
});

function calcularInversoMultiplicativo(){
	var a = bigInt($("#C-A-IM").val());
	var m = bigInt($("#C-M-IM").val());
	var resultado = 0;

	resultado = a.modInv(m);

	$('#fileDisplayAreaCalculadoraInversoMultiplicativo').val(resultado.toString());
}