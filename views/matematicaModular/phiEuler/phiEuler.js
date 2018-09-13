var cancelado = false;
var velocidad = 1;

$.fn.scrollViewPHI = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function sleepPHI(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function mostrarPanelPhi() {
	$("#pnl-InteractivoPhi").slideToggle(1000);
	$("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);	
}

function cerrarPanelPhi(){
	cancelado = true;

	$("#pnl-InteractivoPhi").slideToggle(1000);
	$("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	
	limpiaPanelPhi();

	$("#in-valorPhi").val("540");

	$("#btn-comenzarPhi").show();
	$("#btn-velocidadPhi").show();
	$("#btn-cancelarPhi").hide();

	deleteErrorPhi("valorPhi");
}

function limpiaPanelPhi(){
	$('#PHIcentro').empty();
	$('#PHIizquierda').empty();
	$('#PHIderecha').empty();
	$('#valorPhi').html("<br>");
	$('#out-phi').val('');

	$("#in-valorPhi").val("");

	if($('#PHIdiv1').is(':visible')) {
		$("#PHIdiv1").slideToggle(500);
	}
}

async function comenzarPhi(){
	var n = parseInt($("#in-valorPhi").val());
	var factores = obtenerFactores(n);
	var tipo = 0;
	var phi = 0;
	var aux = "";
	var aux2 = 1, aux3 = 1;
	
	limpiaPanelPhi();

	$("#in-valorPhi").val(n);

	$('#PHIdiv1').html('Se descompone n en sus factores primos.');
	$('#PHIdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPHI(3000);
	
	if(cancelado){
		return;
	}

	$('#PHIdiv1').scrollViewPHI();

	$('#PHIcentro').append('<table class="table tableVI4 tabla text-center"><tr id="factorizacion"><td>' + n + '</td><td>=</td></tr></table>');

	for(var i = 0 ; i < factores.length ; i++){
		$('#factorizacion').append('<td id="p' + i + '">' + factores[i][0] + '<sup>' + ((factores[i][1] > 1)?factores[i][1]:'') + '</sup></td>');

		if(i != factores.length-1){
			$('#factorizacion').append('<td>*</td>');
		}
	}

	$('#PHIcentro').append('<br><br>');
	
	putparpadeo('#factorizacion', 1*velocidad, azul);

	await sleepPHI(1000*velocidad);

	removeputparpadeo('#factorizacion', 1*velocidad, azul);

	if(cancelado){
        return;
    }
 
    $('#PHIdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPHI(1000);
	
	if(cancelado){
		return;
	}

	$('#PHIdiv1').html("Se identifica el caso que corresponde de acuerdo a las siguientes propiedades.");
	$('#PHIdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPHI(3000);

	if(cancelado){
		return;
	}

	$('#PHIdiv1').scrollViewPHI();

	$('#PHIizquierda').append('<table class="table tableVI4 tabla" id="PHIpropiedades"><tr class="text-center"><td><b>Propiedades</b></td></table>');
	$('#PHIpropiedades').append('<tr id="propiedad1"><td><b>1)</b> Si <label class="formula2">p</label>&nbsp; es primo ⇒ <label class="formula2">φ(p) = p - 1</label>.</td></tr>');
	$('#PHIpropiedades').append('<tr id="propiedad2"><td><b>2)</b> Si <label class="formula2">p</label>&nbsp; es primo ⇒ <label class="formula2">φ(p <sup>e</sup>) = p <sup>e</sup> * (1 - 1/p)</label>.</td></tr>');
	$('#PHIpropiedades').append('<tr id="propiedad3"><td><b>3)</b> Sea <label class="formula2">n = a * b</label>&nbsp;. Si <label class="formula2">MCD(a , b) = 1</label>&nbsp; ⇒ <label class="formula2">φ(a * b) = φ(a) * φ(b)</label>.</td></tr>');
	$('#PHIpropiedades').append('<tr id="propiedad4"><td><b>4)</b> Sea <label class="formula2">n = p<sub>1</sub><sup>e<sub>1</sub></sup> * p<sub>2</sub><sup>e<sub>2</sub></sup> ... p<sub>k</sub><sup>e<sub>k</sub></sup></label>&nbsp; ⇒ <label class="formula2">φ(n) = n * (1 - 1/p<sub>1</sub> ) * (1 - 1/p<sub>2</sub> ) ... (1 - 1/p<sub>k</sub> )</label>.</td></tr>');
	
	tipo = identificarTipo(factores);

	await sleepPHI(1000);

	$('#propiedad'+tipo).css("background-color", "#b3d9ff");

	await sleepPHI(1000*velocidad);

	if(cancelado){
        return;
    }

    $('#PHIdiv1').slideToggle(500);

	if(cancelado){
		return;
	}

	await sleepPHI(1000);
	
	if(cancelado){
		return;
	}

	if(tipo == 1){
		$('#PHIdiv1').html('Propiedad 1: n es un número primo.');
		$('#PHIdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepPHI(3000);
		
		if(cancelado){
			return;
		}

		$('#PHIdiv1').scrollViewPHI();

		phi = n - 1;

		$('#PHIderecha').append('<table class="table tableVI4 text-center tabla" id="PHIoperacion"><tr><td><b>Operaciones</b></td></tr><tr id="operacion1"><td>φ(' + n + ') = ' + n + ' - 1</td></tr></table>');

		putparpadeo('#operacion1', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion2"><td>φ(' + n + ') = ' + phi + '</td></tr>');

		putparpadeo('#operacion2', 1*velocidad, azul);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#operacion2', 1*velocidad, azul);
		removeputparpadeo('#operacion1', 2*velocidad, azul);

		$('#valorPhi').append('<label class="circulo" id="PHI-cell-0">' + phi + '</label>');

		putparpadeo('#PHI-cell-0', 1*velocidad, negro);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#PHI-cell-0', 1*velocidad, negro);
	}
	else if(tipo == 2){
		$('#PHIdiv1').html('Propiedad 2: n es un número primo elevado a una potencia.');
		$('#PHIdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepPHI(3000);
		
		if(cancelado){
			return;
		}

		$('#PHIdiv1').scrollViewPHI();

		phi = n*(factores[0][0]-1)/factores[0][0];
		
		$('#PHIderecha').append('<table class="table tableVI4 text-center tabla" id="PHIoperacion"><tr><td><b>Operaciones</b></td></tr><tr id="operacion1"><td>φ(' + n + ') = φ(' + factores[0][0] + ' <sup>' + factores[0][1] + '</sup>)</td></tr></table>');

		putparpadeo('#operacion1', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion2"><td>φ(' + n + ') = ' + factores[0][0] + ' <sup>' + factores[0][1] + '</sup> * (1 - 1 / ' + factores[0][0] + ')</td></tr>');

		putparpadeo('#operacion2', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion3"><td>φ(' + n + ') = ' + factores[0][0] + ' <sup>' + factores[0][1] + '</sup> * (' + (factores[0][0]-1) + ' / ' + factores[0][0] + ')</td></tr>');

		putparpadeo('#operacion3', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion4"><td>φ(' + n + ') = ' + factores[0][0] + ' * ' + (factores[0][0]-1) + '</td></tr>');

		putparpadeo('#operacion4', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion5"><td>φ(' + n + ') = ' + phi + '</td></tr>');

		putparpadeo('#operacion5', 1*velocidad, azul);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#operacion5', 1*velocidad, azul);
		removeputparpadeo('#operacion4', 2*velocidad, azul);
		removeputparpadeo('#operacion3', 2*velocidad, azul);
		removeputparpadeo('#operacion2', 2*velocidad, azul);
		removeputparpadeo('#operacion1', 2*velocidad, azul);

		$('#valorPhi').append('<label class="circulo" id="PHI-cell-0">' + phi + '</label>');

		putparpadeo('#PHI-cell-0', 1*velocidad, negro);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#PHI-cell-0', 1*velocidad, negro);
	}
	else if(tipo == 3){
		$('#PHIdiv1').html('Propiedad 3: n es el producto de 2 números coprimos.');
		$('#PHIdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepPHI(4000);
		
		if(cancelado){
			return;
		}

		$('#PHIdiv1').scrollViewPHI();
		
		$('#PHIderecha').append('<table class="table tableVI4 text-center tabla" id="PHIoperacion"><tr><td><b>Operaciones</b></td></tr><tr id="operacion1"><td>φ(' + n + ') = φ(' + factores[0][0] + ' * ' + factores[1][0] + ')</sup></td></tr></table>');

		putparpadeo('#operacion1', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion2"><td>φ(' + n + ') = φ(' + factores[0][0] + ') * φ(' + factores[1][0] + ')</td></tr>');

		putparpadeo('#operacion2', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		$('#PHIoperacion').append('<tr id="operacion3"><td>φ(' + n + ') = (' + factores[0][0] + ' - 1) * (' + factores[1][0] + ' - 1)</td></tr>');

		putparpadeo('#operacion3', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		aux = n*aux2 + " / " + aux3;

		$('#PHIoperacion').append('<tr id="operacion4"><td>φ(' + n + ') = ' + (factores[0][0]-1) + ' * ' + (factores[1][0]-1) + '</td></tr>');

		putparpadeo('#operacion4', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		phi = (factores[0][0]-1)*(factores[1][0]-1);

		$('#PHIoperacion').append('<tr id="operacion5"><td>φ(' + n + ') = ' + phi + '</td></tr>');

		putparpadeo('#operacion5', 1*velocidad, azul);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#operacion5', 1*velocidad, azul);
		removeputparpadeo('#operacion4', 2*velocidad, azul);
		removeputparpadeo('#operacion3', 2*velocidad, azul);
		removeputparpadeo('#operacion2', 2*velocidad, azul);
		removeputparpadeo('#operacion1', 2*velocidad, azul);

		$('#valorPhi').append('<label class="circulo" id="PHI-cell-0">' + phi + '</label>');

		putparpadeo('#PHI-cell-0', 1*velocidad, negro);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#PHI-cell-0', 1*velocidad, negro);
	}
	else if(tipo == 4){
		$('#PHIdiv1').html('Propiedad 4: n es el producto de varios números primos elevados a alguna potencia.');
		$('#PHIdiv1').slideToggle(500);

		if(cancelado){
			return;
		}

		await sleepPHI(4000);
		
		if(cancelado){
			return;
		}

		$('#PHIdiv1').scrollViewPHI();
		
		aux = n + " * ";

		for(var i = 0 ; i < factores.length ; i++){
			aux = aux + "(1 - 1/" + factores[i][0] + ")";
		}

		$('#PHIderecha').append('<table class="table tableVI4 text-center tabla" id="PHIoperacion"><tr><td><b>Operaciones</b></td></tr><tr id="operacion1"><td>φ(' + n + ') = ' + aux + '</sup></td></tr></table>');

		putparpadeo('#operacion1', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		aux = n + " * ";

		for(var i = 0 ; i < factores.length ; i++){
			aux = aux + "(" + (factores[i][0]-1) + "/" + factores[i][0] + ")";
		}

		$('#PHIoperacion').append('<tr id="operacion2"><td>φ(' + n + ') = ' + aux + '</td></tr>');

		putparpadeo('#operacion2', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		aux = n + " * (";

		for(var i = 0 ; i < factores.length ; i++){
			aux2 = aux2 * (factores[i][0] - 1);
			aux3 = aux3 * factores[i][0];
		}

		aux = aux + aux2 + "/" + aux3 + ")";

		$('#PHIoperacion').append('<tr id="operacion3"><td>φ(' + n + ') = ' + aux + '</td></tr>');

		putparpadeo('#operacion3', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		aux = n*aux2 + " / " + aux3;

		$('#PHIoperacion').append('<tr id="operacion4"><td>φ(' + n + ') = ' + aux + '</td></tr>');

		putparpadeo('#operacion4', 2*velocidad, azul);

		await sleepPHI(1000*velocidad);

		phi = n*aux2/aux3;

		$('#PHIoperacion').append('<tr id="operacion5"><td>φ(' + n + ') = ' + phi + '</td></tr>');

		putparpadeo('#operacion5', 1*velocidad, azul);

		await sleepPHI(1000*velocidad);

		removeputparpadeo('#operacion5', 1*velocidad, azul);
		removeputparpadeo('#operacion4', 2*velocidad, azul);
		removeputparpadeo('#operacion3', 2*velocidad, azul);
		removeputparpadeo('#operacion2', 2*velocidad, azul);
		removeputparpadeo('#operacion1', 2*velocidad, azul);
	}

	$('#propiedad'+tipo).css("background-color", "#ffffff");

	//FIN
    $("#out-phi").val(phi);
    $("#btn-velocidadPhi").show();
    $("#btn-comenzarPhi").show();
    $("#btn-cancelarPhi").hide();

    if(!cancelado){
        $('#PHIdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_72);
        cancelado = true;
    }
}

function obtenerFactores(n) {
	var factorPrimo = 2;
	var contador = 0;
	var factores = [];
	var i = 0;

	while (n > 1){
		contador = 0;

		while ( (n % factorPrimo) == 0) {
			//encotrado factor
			++contador;
			n /= factorPrimo;
		}
		
		if (contador > 0) {
			factores[i] = [];

			factores[i][0] = factorPrimo;
			factores[i][1] = contador;
			i++;
		}
		
		factorPrimo++;
  	} //while

  	return factores;
}

function identificarTipo(factores){
	if(factores.length == 1){
		if(factores[0][1] == 1){
			return 1;
		}
		else{
			return 2;
		}
	}
	else if(factores.length == 2 && factores[0][1] == 1 && factores[1][1] == 1){
		return 3;
	}
	else{
		return 4;
	}
}

function validarEntradaValorPhi(){
	var mensaje = "";
	var n = $('#in-valorPhi').val();

	if(!n.match(/^[0-9]+$/) || bigInt(n).compare(2) == -1 || bigInt(n).compare(1000) == 1 || n.length == 0){
		mensaje = mensaje_85;
	}

	return mensaje;
}

function validarEntradaC_NPhi(){
	var mensaje = "";
	var n = $('#C-N-PHI').val();

	if(!n.match(/^[0-9]+$/) || bigInt(n).compare(2) == -1 || bigInt(n).compare(10000000) == 1 || n.length == 0){
		mensaje = mensaje_128;
	}

	return mensaje;
}

function addErrorPhi(id, mensaje){
	$("#" + id + "-error").remove();
	$("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorPhi(id){
	$("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

function addErrorPHI(id, mensaje){
	$("#" + id + "-error").remove();
	$("#" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger text-center">&nbsp;'+mensaje+'</div>');
    $("#" + id).addClass('input-error');
}

function deleteErrorPHI(id){
	$("#" + id + "-error").remove();
    $("#" + id).removeClass('input-error');
}

$(document).ready(function(){
	$("#tipoPhi1").click(function(){
        $("#btn-comenzarPhi").html('Calcular Rápido');
        $("#btn-comenzarPhi").val(1);
    });
    $("#tipoPhi2").click(function(){
        $("#btn-comenzarPhi").html('Calcular Normal');
        $("#btn-comenzarPhi").val(2);
    });

    $("#in-valorPhi").on('click change keyup', function() {
        var mensaje = validarEntradaValorPhi();

        if (mensaje.length != 0) {
            addErrorPhi("valorPhi", mensaje);
        } else{
            deleteErrorPhi("valorPhi");
        }
    });

    $("#C-N-PHI").keyup(function(){
        var mensaje = validarEntradaC_NPhi();

        if (mensaje.length != 0) {
            addErrorPHI("C-N-PHI", mensaje);
        } else{
            deleteErrorEU("C-N-PHI");
        }
    });

    $("#btn-comenzarPhi").click(function(){
		var mensajevalor = validarEntradaValorPhi();

		if(mensajevalor.length == 0){
			$("#valorPhi-error").remove();
            $("#in-valorPhi").removeClass('input-error');

            if($('#btn-comenzarPhi').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-comenzarPhi').val() == 2) {
                velocidad = 1;
            }

            $("#btn-velocidadPhi").hide();
            $("#btn-comenzarPhi").hide();
            $("#btn-cancelarPhi").show();
            cancelado = false;
            
            comenzarPhi();
		}
		else{
			if(mensajevalor.length > 0){
				addErrorPhi("valorPhi", mensajevalor);
			}
		}
	});

	$("#btn-cancelarPhi").click(function(){
        cancelado = true;

        limpiaPanelPhi();

        $("#btn-comenzarPhi").show();
        $("#btn-velocidadPhi").show();
        $("#btn-cancelarPhi").hide();
    });

    $("#btn-calcularPhi").click(function(){
		var mensajevalorN = validarEntradaC_NPhi();

		if(mensajevalorN.length == 0){
			$("#C-N-PHI-error").remove();
            $("#C-N-PHI").removeClass('input-error');

           	calcularPhiC();
		}
		else{
			if(mensajevalorN.length > 0){
				addErrorPHI("C-N-PHI", mensajevalorN);
			}
		}
	});
});

function calcularPhiC(){
	var n = bigInt($("#C-N-PHI").val());
	var phi = bigInt(0);
	var aux2 = bigInt(1), aux3 = bigInt(1);
	var factores = obtenerFactoresC(n);
	var tipo = identificarTipoC(factores);

	if(tipo == 1){
		phi = n.subtract(1);
	}
	else if(tipo == 2){
		phi = n.multiply(bigInt(factores[0][0]).subtract(1)).divide(factores[0][0]);
	}
	else if(tipo == 3){
		phi = (factores[0][0].subtract(1)).multiply(factores[1][0].subtract(1));
	}
	else if(tipo == 4){
		for(var i = bigInt(0) ; i.compare(factores.length) == -1 ; i = i.add(1)){
			aux2 = aux2.multiply(factores[i][0].subtract(1));
			aux3 = aux3.multiply(factores[i][0]);
		}

		phi = n.multiply(aux2).divide(aux3);
	}
	
	$('#fileDisplayAreaCalculadoraPhi').val(phi.toString());
}

function obtenerFactoresC(n) {
	var factorPrimo = bigInt(2);
	var contador = bigInt(0);
	var factores = [];
	var i = bigInt(0);

	while (n.compare(1) == 1){
		contador = bigInt(0);

		while ( (n.mod(factorPrimo)).compare(0) == 0) {
			//encotrado factor
			contador = contador.add(1);
			n = n.divide(factorPrimo);
		}
		
		if (contador.compare(0) == 1) {
			factores[i] = [];

			factores[i][0] = factorPrimo;
			factores[i][1] = contador;
			i = i.add(1);
		}
		
		factorPrimo = factorPrimo.add(1);
  	} //while

  	return factores;
}

function identificarTipoC(factores){
	if(factores.length == 1){
		if(factores[0][1] == 1){
			return 1;
		}
		else{
			return 2;
		}
	}
	else if(factores.length == 2 && factores[0][1] == 1 && factores[1][1] == 1){
		return 3;
	}
	else{
		return 4;
	}
}