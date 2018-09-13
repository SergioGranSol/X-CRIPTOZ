function sleepPlayfair(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

function mostrarPanelPlayfair(){
	$("#pnl-InteractivoPlayfair").slideToggle(1000);
    $("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelPlayfair(){
	$("#pnl-InteractivoPlayfair").slideToggle(1000);
    $("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelPlayfair();
}

function crearPanelPlayfairCifrado(){
	for (var i = 1; i <= 5; i++) {
		$("#m"+i+"c").append('<td><label class="circulo">|</label></td>');
		for (var j = 1; j <= 5; j++) {
			$("#m"+i+"c").append('<td><label id="m'+i+j+'c" class="circulo" fila="'+i+'" columna="'+j+'">[]</label></td>');
		}
		$("#m"+i+"c").append('<td><label class="circulo">|</label></td>');
	}
}

function crearPanelPlayfairDescifrado(){
    for (var i = 1; i <= 5; i++) {
        $("#m"+i+"d").append('<td><label class="circulo">|</label></td>');
        for (var j = 1; j <= 5; j++) {
            $("#m"+i+"d").append('<td><label id="m'+i+j+'d" class="circulo" fila="'+i+'" columna="'+j+'">[]</label></td>');
        }
        $("#m"+i+"d").append('<td><label class="circulo">|</label></td>');
    }
}

function limpiaPanelPlayfair(){
    tCAdd=800;
    tCRemove=300;
    tDcAdd=800;
    tDcRemove=300;
    parpadeo='parpadeo2N';
    parpadeoNext='parpadeoNext2N';
    $("#btn-cifrarPlayfair").html('Cifrado Normal');
    $("#btn-descifrarPlayfair").html('Descifrado Normal');
	$("#textoPlanoPlayfairC").empty();
	$("#textoCifradoPlayfairC").empty();
	$("#textoPlanoPlayfairD").empty();
	$("#textoCifradoPlayfairD").empty();
	$("#in-txtPlanoPlayfair").val("");
	$("#out-txtCifradoPlayfair").val("");
	$("#in-txtCifradoPlayfair").val("");
	$("#out-txtPlanoPlayfair").val("");
	$("#in-keyPlayfairC").val("");
	$("#in-keyPlayfairD").val("");
    $("#infoAnimacionCiPlayfair").hide();
    $("#infoAnimacionCiPlayfairExtra").hide();
    $("#infoAnimacionCiPlayfairExtra2").hide();
    $("#infoAnimacionDePlayfair").hide();
    $("#infoAnimacionDePlayfairExtra").hide();
    $("#in-txtPlanoPlayfair").removeClass('input-error');
    $("#txtPlanoPlayfair-error").remove();
    $("#in-keyPlayfairC").removeClass('input-error');
    $("#keyPlayfairC-error").remove();
    $("#in-txtCifradoPlayfair").removeClass('input-error');
    $("#txtCifradoPlayfair-error").remove();
    $("#in-keyPlayfairD").removeClass('input-error');
    $("#keyPlayfairD-error").remove();
    $("#btn-cifrarPlayfair").show();
    $("#btn-tipoCiPlayfair").show();
    $("#btn-cancelarCifrarPlayfair").hide();
    $("#btn-descifrarPlayfair").show();
    $("#btn-tipoDePlayfair").show();
    $("#btn-cancelarDescifrarPlayfair").hide();
	for (var i = 1; i <= 5; i++) {
		$("#m"+i+"c").empty();
		$("#m"+i+"d").empty();
	}
}

function pararAnimacionPlayfair(){
    ic=999;
    idc=999;
    $("#btn-copiarTextoPlayfair").removeAttr("disabled");
    $("#textoPlanoPlayfairC").empty();
    $("#textoCifradoPlayfairC").empty();
    $("#textoPlanoPlayfairD").empty();
    $("#textoCifradoPlayfairD").empty();
    $("#infoAnimacionCiPlayfair").hide();
    $("#infoAnimacionCiPlayfairExtra").hide();
    $("#infoAnimacionCiPlayfairExtra2").hide();
    $("#infoAnimacionDePlayfair").hide();
    $("#infoAnimacionDePlayfairExtra").hide();
    $("#in-txtPlanoPlayfair").removeClass('input-error');
    $("#txtPlanoPlayfair-error").remove();
    $("#in-keyPlayfairC").removeClass('input-error');
    $("#in-txtCifradoPlayfair").val("");
    $("#in-txtPlanoPlayfair").val("");
    $("#in-keyPlayfairC").val("");
    $("#in-keyPlayfairD").val("");
    $("#keyPlayfairC-error").remove();
    $("#in-txtCifradoPlayfair").removeClass('input-error');
    $("#txtCifradoPlayfair-error").remove();
    $("#in-keyPlayfairD").removeClass('input-error');
    $("#keyPlayfairD-error").remove();
    $("#btn-cifrarPlayfair").show();
    $("#btn-tipoCiPlayfair").show();
    $("#btn-cancelarCifrarPlayfair").hide();
    $("#btn-descifrarPlayfair").show();
    $("#btn-tipoDePlayfair").show();
    $("#btn-cancelarDescifrarPlayfair").hide();
    for (var i = 1; i <= 5; i++) {
        $("#m"+i+"c").empty();
        $("#m"+i+"d").empty();
    }
}

function validarEntradaCifradoPlayfair(){
    var mensaje = "";
    var texto = $('#in-txtPlanoPlayfair').val().replace(/ /g,"");
    if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_1;
    } else if (!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_2;
    }
    return mensaje;
}

function validarEntradaCifradoPlayfairLlave(){
    var mensaje = "";
    var clave = $('#in-keyPlayfairC').val();
    if (clave.length < 1 || clave.length > 25) {
        mensaje = mensaje_12;
    }else if(clave.indexOf(' ') >= 0){
        mensaje = mensaje_14;
    } else if(!clave.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_13;
    }
    return mensaje;
}

function validarEntradaDescifradoPlayfair(){
    var mensaje = "";
    var texto = $('#in-txtCifradoPlayfair').val();
    if (texto.length < 2 || texto.length > 20) {
        mensaje = mensaje_9;
    }else if(texto.indexOf(' ') >= 0){
        mensaje = mensaje_4;
    }else if (!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_5;
    }
    return mensaje;
}

function validarEntradaDescifradoPlayfairLlave(){
    var mensaje = "";
    var clave = $('#in-keyPlayfairD').val();
    if (clave.length < 1 || clave.length > 25) {
        mensaje = mensaje_12;
    }else if(clave.indexOf(' ') >= 0){
        mensaje = mensaje_14;
    }else if (!clave.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_13;
    }
    return mensaje;
}

function validarEntradaCifradoArchivoPlayfairLlave(){
    var mensaje = "";
    var clave = $('#llavePlayfairCifrado').val();
    if (clave.length < 1 || clave.length > 25) {
        mensaje = mensaje_12
    } else if(clave.indexOf(' ') >= 0){
        mensaje = mensaje_14;
    } else if(!clave.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_13;
    }
    return mensaje;
}

function validarEntradaDescifradoArchivoPlayfairLlave(){
    var mensaje = "";
    var clave = $('#llavePlayfairDescifrado').val();
    if (clave.length < 1 || clave.length > 25) {
        mensaje = mensaje_12;
    } else if(clave.indexOf(' ') >= 0){
        mensaje = mensaje_14;
    } else if(!clave.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_13;
    }
    return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelPlayfair").click(function(){
		mostrarPanelPlayfair();
	});
	$("#btn-cerrarPanelPlayfair").click(function(){
        pararAnimacionPlayfair();
		cerrarPanelPlayfair();
	});
    $("#btn-teoriaPlayfair").click(function(){
        pararAnimacionPlayfair();
    });
    $("#btn-fundamentosPlayfair").click(function(){
        pararAnimacionPlayfair();
    });
    $("#btn-animacionCifradoPlayfair").click(function(){
        //pararAnimacionPlayfair();
    });
    $("#btn-animacionDesifradoPlayfair").click(function(){
        //pararAnimacionPlayfair();
    });
    $("#btn-cancelarCifrarPlayfair").click(function(){
        pararAnimacionPlayfair();
    });
    $("#btn-cancelarDescifrarPlayfair").click(function(){
        pararAnimacionPlayfair();
    });
    $("#tipoCiPlayfair1").click(function(){
        $("#btn-cifrarPlayfair").html('Cifrado Rápido');
        tCAdd=200;
        tCRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoCiPlayfair2").click(function(){
        $("#btn-cifrarPlayfair").html('Cifrado Normal');
        tCAdd=800;
        tCRemove=300;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoCiPlayfair3").click(function(){
        $("#btn-cifrarPlayfair").html('Cifrado Lento');
        tCAdd=1600;
        tCRemove=300;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });
    $("#tipoDePlayfair1").click(function(){
        $("#btn-descifrarPlayfair").html('Descifrado Rápido');
        tDcAdd=200;
        tDcRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoDePlayfair2").click(function(){
        $("#btn-descifrarPlayfair").html('Descifrado Normal');
        tDcAdd=800;
        tDcRemove=300;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoDePlayfair3").click(function(){
        $("#btn-descifrarPlayfair").html('Descifrado Lento');
        tDcAdd=1600;
        tDcRemove=300;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });

    $("#in-txtPlanoPlayfair").keyup(function(){
        $("#in-txtPlanoPlayfair").removeClass('input-error');
        $("#txtPlanoPlayfair-error").remove();
        if ($("#in-txtPlanoPlayfair").val()=='') {
            $("#in-txtPlanoPlayfair").removeClass('input-error');
            $("#txtPlanoPlayfair-error").remove();
        } else{
            var mensaje = validarEntradaCifradoPlayfair();
            if (mensaje.length == 0){
                $("#in-txtPlanoPlayfair").removeClass('input-error');
                $("#txtPlanoPlayfair-error").remove();
            } else {
                $("#in-txtPlanoPlayfair").addClass('input-error');
                $("#in-txtPlanoPlayfair").parent().parent().append('<div id="txtPlanoPlayfair-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-keyPlayfairC").keyup(function(){
        $("#in-keyPlayfairC").removeClass('input-error');
        $("#keyPlayfairC-error").remove();
        if ($("#in-keyPlayfairC").val()=='') {
            $("#in-keyPlayfairC").removeClass('input-error');
            $("#keyPlayfairC-error").remove();
        } else{
            var mensaje = validarEntradaCifradoPlayfairLlave();
            if (mensaje.length == 0){
                $("#in-keyPlayfairC").removeClass('input-error');
                $("#keyPlayfairC-error").remove();
            } else {
                $("#in-keyPlayfairC").addClass('input-error');
                $("#in-keyPlayfairC").parent().parent().append('<div id="keyPlayfairC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-txtCifradoPlayfair").keyup(function(){
        $("#in-txtCifradoPlayfair").removeClass('input-error');
        $("#txtCifradoPlayfair-error").remove();
        if ($("#in-txtCifradoPlayfair").val()=='') {
            $("#in-txtCifradoPlayfair").removeClass('input-error');
            $("#txtCifradoPlayfair-error").remove();
        } else{
            var mensaje = validarEntradaDescifradoPlayfair();
            if (mensaje.length == 0){
                $("#in-txtCifradoPlayfair").removeClass('input-error');
                $("#txtCifradoPlayfair-error").remove();
            } else {
                $("#in-txtCifradoPlayfair").addClass('input-error');
                $("#in-txtCifradoPlayfair").parent().parent().append('<div id="txtCifradoPlayfair-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-keyPlayfairD").keyup(function(){
        $("#in-keyPlayfairD").removeClass('input-error');
        $("#keyPlayfairD-error").remove();
        if ($("#in-keyPlayfairD").val()=='') {
            $("#in-keyPlayfairD").removeClass('input-error');
            $("#keyPlayfairD-error").remove();
        } else{
            var mensaje = validarEntradaDescifradoPlayfairLlave();
            if (mensaje.length == 0){
                $("#in-keyPlayfairD").removeClass('input-error');
                $("#keyPlayfairD-error").remove();
            } else {
                $("#in-keyPlayfairD").addClass('input-error');
                $("#in-keyPlayfairD").parent().parent().append('<div id="keyPlayfairD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

	$("#btn-cifrarPlayfair").click(function(){
        $("#in-txtPlanoPlayfair").removeClass('input-error');
        $("#txtPlanoPlayfair-error").remove();
        $("#in-keyPlayfairC").removeClass('input-error');
        $("#keyPlayfairC-error").remove();
        $("#out-txtCifradoPlayfair").val("");
        var mensaje = validarEntradaCifradoPlayfair();
        var llave = validarEntradaCifradoPlayfairLlave();
		if ($("#in-txtPlanoPlayfair").val()!='' && $("#in-keyPlayfairC").val()!='' && mensaje.length == 0 && llave.length == 0){
			$("#textoPlanoPlayfairC").empty();
			$("#textoCifradoPlayfairC").empty();
            $("#infoAnimacionCiPlayfair").hide();
            $("#infoCiPlayfair").html('');
            $("#infoAnimacionCiPlayfairExtra").hide();
            $("#infoAnimacionCiPlayfairExtra2").hide();
            $("#btn-cifrarPlayfair").hide();
            $("#btn-tipoCiPlayfair").hide();
            $("#btn-cancelarCifrarPlayfair").show();
            for (var i = 1; i <= 5; i++) {
                $("#m"+i+"c").empty();
            }
			cifrarPlayfair();
		} else{
            if (mensaje.length != 0) {
                $("#in-txtPlanoPlayfair").addClass('input-error');
                $("#in-txtPlanoPlayfair").parent().parent().append('<div id="txtPlanoPlayfair-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
            if (llave.length != 0) {
                $("#in-keyPlayfairC").parent().parent().append('<div id="keyPlayfairC-error" class="text-danger">&nbsp;'+llave+'</div>');
                $("#in-keyPlayfairC").addClass('input-error');
            }
        }
	});

	$("#btn-copiarTextoPlayfair").click(function(){
		if ($("#out-txtCifradoPlayfair").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-txtCifradoPlayfair").val($("#out-txtCifradoPlayfair").val());
			$("#in-keyPlayfairD").val($("#in-keyPlayfairC").val());
		}
	});

	$("#btn-descifrarPlayfair").click(function(){
        $("#in-txtCifradoPlayfair").removeClass('input-error');
        $("#txtCifradoPlayfair-error").remove();
        $("#in-keyPlayfairD").removeClass('input-error');
        $("#keyPlayfairD-error").remove();
        $("#out-txtPlanoPlayfair").val("");
        var mensaje = validarEntradaDescifradoPlayfair();
        var llave = validarEntradaDescifradoPlayfairLlave();
		if ($("#in-txtCifradoPlayfair").val()!='' && $("#in-keyPlayfairD").val()!='' && mensaje.length == 0 && llave.length == 0){
			$("#btn-copiarTextoPlayfair").attr("disabled","disabled");
			$("#textoCifradoPlayfairD").empty();
			$("#textoPlanoPlayfairD").empty();
            $("#infoAnimacionDePlayfair").hide();
            $("#infoDePlayfair").html('');
            $("#infoAnimacionDePlayfairExtra").hide();
            $("#btn-descifrarPlayfair").hide();
            $("#btn-tipoDePlayfair").hide();
            $("#btn-cancelarDescifrarPlayfair").show();
            for (var i = 1; i <= 5; i++) {
                $("#m"+i+"d").empty();
            }
			descifrarPlayfair();
		} else{
            if (mensaje.length != 0) {
                $("#in-txtCifradoPlayfair").addClass('input-error');
                $("#in-txtCifradoPlayfair").parent().parent().append('<div id="txtCifradoPlayfair-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
            if (llave.length != 0) {
                $("#in-keyPlayfairD").addClass('input-error');
                $("#in-keyPlayfairD").parent().parent().append('<div id="keyPlayfairD-error" class="text-danger">&nbsp;'+llave+'</div>');
            }
        }
	});

    $("#llavePlayfairCifrado").keyup(function(){
        $("#llavePlayfairCifrado").removeClass('input-error');
        $("#llavePlayfairCifrado-error").remove();
        
        if ($("#llavePlayfairCifrado").val()=='') {
            $("#llavePlayfairCifrado").removeClass('input-error');
            $("#llavePlayfairCifrado-error").remove();
        } else{    
            var error = validarEntradaCifradoArchivoPlayfairLlave();
            $('#llavePlayfairCifrado').removeClass('input-error').next().remove();
            if (error!=""){
                $('#llavePlayfairCifrado').addClass('input-error').after('<div id="llavePlayfairCifrado-error" class="text-danger">'+error+'</div>');
            }
        }
    });

    $("#llavePlayfairDescifrado").keyup(function(){
        $("#llavePlayfairDescifrado").removeClass('input-error');
        $("#llavePlayfairDescifrado-error").remove();
        
        if ($("#llavePlayfairDescifrado").val()=='') {
            $("#llavePlayfairDescifrado").removeClass('input-error');
            $("#llavePlayfairDescifrado-error").remove();
        } else{    
            var error = validarEntradaDescifradoArchivoPlayfairLlave();
            $('#llavePlayfairDescifrado').removeClass('input-error').next().remove();
            if (error!=""){
                $('#llavePlayfairDescifrado').addClass('input-error').after('<div id="llavePlayfairDescifrado-error" class="text-danger">'+error+'</div>');
            }
        }
    });
});

async function cifrarPlayfair(){
    crearPanelPlayfairCifrado();
    var planoC = ($("#in-txtPlanoPlayfair").val().toUpperCase()).split("");
    var key = ($("#in-keyPlayfairC").val().toUpperCase()).split("");
    var cifrado = [];
    var matriz = [];
    var cadenaCifrado;
    var filaL1, filaL2, filaL1Cifrada, filaL2Cifrada;
    var columnaL1, columnaL2, columnaL1Cifrada, columnaL2Cifrada;
    var inmC = 1;
    var aux = 0;
    ic = 0;
    for (var i = 0; i <= planoC.length-1; i++) {
        if(planoC[i] == ' ') {
           planoC.splice(i, 1);
        }
    }
    for (var i = 0; i <= key.length-1; i++) {
        if(key[i] == ' ') {
           key.splice(i, 1);
        }
    }
    $("#infoAnimacionCiPlayfair").fadeIn();
    for (var i = 0; i <= planoC.length-1; i++) {
        if (typeof planoC[i+1] != 'undefined') {
            if (planoC[i]==planoC[i+1]) {
                planoC.splice(i+1, 0, 'X');
                $("#infoAnimacionCiPlayfairExtra").fadeIn();
                aux=1;
            }
        }
    }
    if (planoC.length%2==1) {
        planoC[planoC.length]='X';
        $("#infoAnimacionCiPlayfairExtra2").fadeIn();
        aux=2;
    }
    if (aux==1 || aux==2) {
        await sleepPlayfair(tCAdd);
    }
    for (var m = 0; m <= planoC.length-1; m++) {
        $("#textoPlanoPlayfairC").append('<label id="abcPlano'+m+'C" class="circulo">'+planoC[m].toLowerCase()+'</label>');
    }
    for (var n = 0; n <= planoC.length-1; n++) {
        $("#textoCifradoPlayfairC").append('<label id="abcCifrado'+n+'C" class="circulo">&nbsp;</label>');
    }
    // ANIMATION
    $("#textoPlanoPlayfairC").addClass(parpadeo);
    await sleepPlayfair(tCAdd);
    $("#textoPlanoPlayfairC").removeClass(parpadeo);
    await sleepPlayfair(tCRemove);
    // END ANIMATION
    for (var k = 0; k <= key.length-1; k++) {
        if (jQuery.inArray(key[k],matriz)==-1) {
            if (key[k]=='J'){key[k]='I';}
            if (key[k]=='Ñ'){key[k]='N';}
            matriz[inmC] = key[k];
            inmC++;
        }
    }
    for (var l = 65; l <= 90; l++) {
        if (jQuery.inArray(String.fromCharCode(l),matriz)==-1 && String.fromCharCode(l)!='J' && String.fromCharCode(l)!='Ñ') {
            matriz[inmC] = String.fromCharCode(l);
            inmC++;
        }
    }
    inmC = 1;
    for (var i = 1; i <=5; i++) {
        for (var j = 1; j <= 5; j++) {
            $("#m"+i+j+"c").html(matriz[inmC]);
            inmC++;
        }
    }
    while (ic <= planoC.length-1) {
        if (planoC[ic] == 'J'){
            planoC[ic]='I';
        }
        if (planoC[ic+1] == 'J'){
            planoC[ic+1]='I';
        }
        if (planoC[ic] == 'Ñ'){
            planoC[ic]='N';
        }
        if (planoC[ic+1] == 'Ñ'){
            planoC[ic+1]='N';
        }
        filaL1 = $("#matrizPlano label:contains("+planoC[ic]+")").attr("fila");
        columnaL1 = $("#matrizPlano label:contains("+planoC[ic]+")").attr("columna");
        filaL2 = $("#matrizPlano label:contains("+planoC[ic+1]+")").attr("fila")
        columnaL2 = $("#matrizPlano label:contains("+planoC[ic+1]+")").attr("columna");
        if (filaL1 == filaL2 && columnaL1 != columnaL2) {
            columnaL1Cifrada=Number(columnaL1)+1;
            filaL1Cifrada=filaL1;
            columnaL2Cifrada=Number(columnaL2)+1;
            filaL2Cifrada=filaL2;
            if (columnaL1Cifrada>5) {columnaL1Cifrada=columnaL1Cifrada-5;}
            if (columnaL2Cifrada>5) {columnaL2Cifrada=columnaL2Cifrada-5;}
        } else if (filaL1 != filaL2 && columnaL1 == columnaL2) {
            filaL1Cifrada=Number(filaL1)+1;
            columnaL1Cifrada=columnaL1;
            filaL2Cifrada=Number(filaL2)+1;
            columnaL2Cifrada=columnaL2;
            if (filaL1Cifrada>5) {filaL1Cifrada=filaL1Cifrada-5;}
            if (filaL2Cifrada>5) {filaL2Cifrada=filaL2Cifrada-5;}
        } else if (filaL1 != filaL2 && columnaL1 != columnaL2) {
            filaL1Cifrada=filaL1;
            columnaL1Cifrada=columnaL2;
            filaL2Cifrada=filaL2;
            columnaL2Cifrada=columnaL1;
        }
        cifrado[ic]=$("#m"+filaL1Cifrada+columnaL1Cifrada+"c").text();
        cifrado[ic+1]=$("#m"+filaL2Cifrada+columnaL2Cifrada+"c").text();
        if (filaL1 == filaL2 && columnaL1 != columnaL2) {
            $("#infoCiPlayfair").html('<br><strong>Por la </strong><i>Regla No.1 '+planoC[ic].toLowerCase()+'</i><strong> y </strong><i>'+planoC[ic+1].toLowerCase()+'</i><strong> se encuentran en la misma fila, por lo tanto se escogen </strong><i>'+cifrado[ic]+'</i><strong> y </strong><i>'+cifrado[ic+1]+'</i><strong> que estan situados a su derecha</strong>');
        } else if (filaL1 != filaL2 && columnaL1 == columnaL2) {
            $("#infoCiPlayfair").html('<br><strong>Por la </strong><i>Regla No.2 '+planoC[ic].toLowerCase()+'</i><strong> y </strong><i>'+planoC[ic+1].toLowerCase()+'</i><strong> se encuentran en la misma columna, por lo tanto se escogen </strong><i>'+cifrado[ic]+'</i><strong> y </strong><i>'+cifrado[ic+1]+'</i><strong> que estan situados debajo</strong>');
        } else if (filaL1 != filaL2 && columnaL1 != columnaL2) {
            $("#infoCiPlayfair").html('<br><strong>Por la </strong><i>Regla No.3 '+planoC[ic].toLowerCase()+'</i><strong> y </strong><i>'+planoC[ic+1].toLowerCase()+'</i><strong> se encuentran en distintas filas y columnas, por lo tanto se escogen </strong><i>'+cifrado[ic]+'</i><strong> y </strong><i>'+cifrado[ic+1]+'</i><strong> que estan situados en la diagonal opuesta</strong>');
        }
        $("#abcCifrado"+ic+"C").html(cifrado[ic]).show();
        $("#abcCifrado"+(ic+1)+"C").html(cifrado[ic+1]).show();
        
        // ANIMATION
        $("#abcPlano"+ic+"C").addClass(parpadeo);
        $("#abcPlano"+(ic+1)+"C").addClass(parpadeo);
        $("#matrizPlano label:contains("+planoC[ic]+")").addClass(parpadeo);
        $("#matrizPlano label:contains("+planoC[ic+1]+")").addClass(parpadeo);
        $("#m"+filaL1Cifrada+columnaL1Cifrada+"c").addClass(parpadeoNext);
        $("#m"+filaL2Cifrada+columnaL2Cifrada+"c").addClass(parpadeoNext);
        $("#abcCifrado"+ic+"C").addClass(parpadeoNext);
        $("#abcCifrado"+(ic+1)+"C").addClass(parpadeoNext);
        await sleepPlayfair(tCAdd);
        $("#abcPlano"+ic+"C").removeClass(parpadeo);
        $("#abcPlano"+(ic+1)+"C").removeClass(parpadeo);
        $("#matrizPlano label:contains("+planoC[ic]+")").removeClass(parpadeo);
        $("#matrizPlano label:contains("+planoC[ic+1]+")").removeClass(parpadeo);
        $("#m"+filaL1Cifrada+columnaL1Cifrada+"c").removeClass(parpadeoNext);
        $("#m"+filaL2Cifrada+columnaL2Cifrada+"c").removeClass(parpadeoNext);
        $("#abcCifrado"+ic+"C").removeClass(parpadeoNext);
        $("#abcCifrado"+(ic+1)+"C").removeClass(parpadeoNext);
        await sleepPlayfair(tCRemove);
        // END ANIMATION
        ic=ic+2;
    }
    if (ic <= planoC.length && ic!=999) {
        cadenaCifrado = cifrado.join("");
        $("#out-txtCifradoPlayfair").val(cadenaCifrado);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        $("#btn-cifrarPlayfair").show();
        $("#btn-tipoCiPlayfair").show();
        $("#btn-cancelarCifrarPlayfair").hide();
    }
}

async function descifrarPlayfair(){
    crearPanelPlayfairDescifrado();
    var cifradoD = ($("#in-txtCifradoPlayfair").val().toUpperCase()).split("");
    var key = ($("#in-keyPlayfairD").val().toUpperCase()).split("");
    var plano = [];
    var matriz = [];
    var cadenaDecifrado;
    var filaL1, filaL2, filaL1Decifrada, filaL2Decifrada;
    var columnaL1, columnaL2, columnaL1Decifrada, columnaL2Decifrada;
    var inmD = 1;
    idc = 0;
    for (var i = 0; i <= cifradoD.length-1; i++) {
        if(cifradoD[i] == ' ') {
           cifradoD.splice(i, 1);
        }
    }
    for (var i = 0; i <= key.length-1; i++) {
        if(key[i] == ' ') {
           key.splice(i, 1);
        }
    }
    $("#infoAnimacionDePlayfair").fadeIn();
    for (var m = 0; m <= cifradoD.length-1; m++) {
        $("#textoCifradoPlayfairD").append('<label id="abcCifrado'+m+'D" class="circulo">'+cifradoD[m]+'</label>');
    }
    for (var n = 0; n <= cifradoD.length-1; n++) {
        $("#textoPlanoPlayfairD").append('<label id="abcPlano'+n+'D" class="circulo">&nbsp;</label>');
    }
    // ANIMATION
    $("#textoCifradoPlayfairD").addClass(parpadeo);
    await sleepPlayfair(tDcAdd);
    $("#textoCifradoPlayfairD").removeClass(parpadeo);
    await sleepPlayfair(tDcRemove);
    // END ANIMATION
    for (var k = 0; k <= key.length-1; k++) {
        if (jQuery.inArray(key[k],matriz)==-1) {
            if (key[k]=='J'){key[k]='I';}
            if (key[k]=='Ñ'){key[k]='N';}
            matriz[inmD] = key[k];
            inmD++;
        }
    }
    for (var l = 65; l <= 90; l++) {
        if (jQuery.inArray(String.fromCharCode(l),matriz)==-1 && String.fromCharCode(l)!='J' && String.fromCharCode(l)!='Ñ') {
            matriz[inmD] = String.fromCharCode(l);
            inmD++;
        }
    }
    inmD = 1;
    for (var i = 1; i <=5; i++) {
        for (var j = 1; j <= 5; j++) {
            $("#m"+i+j+"d").html(matriz[inmD]);
            inmD++;
        }
    }
    while (idc <= cifradoD.length-1) {
        if (cifradoD[idc] == 'J'){
            cifradoD[idc]='I';
        }
        if (cifradoD[idc+1] == 'J'){
            cifradoD[idc+1]='I';
        }
        if (cifradoD[idc] == 'Ñ'){
            cifradoD[idc]='N';
        }
        if (cifradoD[idc+1] == 'Ñ'){
            cifradoD[idc+1]='N';
        }
        filaL1 = $("#matrizCifrado label:contains("+cifradoD[idc]+")").attr("fila");
        columnaL1 = $("#matrizCifrado label:contains("+cifradoD[idc]+")").attr("columna");
        filaL2 = $("#matrizCifrado label:contains("+cifradoD[idc+1]+")").attr("fila")
        columnaL2 = $("#matrizCifrado label:contains("+cifradoD[idc+1]+")").attr("columna");
        if (filaL1 == filaL2 && columnaL1 != columnaL2) {
            columnaL1Decifrada=Number(columnaL1)-1;
            filaL1Decifrada=filaL1;
            columnaL2Decifrada=Number(columnaL2)-1;
            filaL2Decifrada=filaL2;
            if (columnaL1Decifrada<1) {columnaL1Decifrada=columnaL1Decifrada+5;}
            if (columnaL2Decifrada<1) {columnaL2Decifrada=columnaL2Decifrada+5;}
        } else if (filaL1 != filaL2 && columnaL1 == columnaL2) {
            filaL1Decifrada=Number(filaL1)-1;
            columnaL1Decifrada=columnaL1;
            filaL2Decifrada=Number(filaL2)-1;
            columnaL2Decifrada=columnaL2;
            if (filaL1Decifrada<1) {filaL1Decifrada=filaL1Decifrada+5;}
            if (filaL2Decifrada<1) {filaL2Decifrada=filaL2Decifrada+5;}
        } else if (filaL1 != filaL2 && columnaL1 != columnaL2) {
            filaL1Decifrada=filaL1;
            columnaL1Decifrada=columnaL2;
            filaL2Decifrada=filaL2;
            columnaL2Decifrada=columnaL1;
        }
        plano[idc]=$("#m"+filaL1Decifrada+columnaL1Decifrada+"d").text().toLowerCase();
        plano[idc+1]=$("#m"+filaL2Decifrada+columnaL2Decifrada+"d").text().toLowerCase();
        if (filaL1 == filaL2 && columnaL1 != columnaL2) {
            $("#infoDePlayfair").html('<br><strong>Por la </strong><i>Regla No.1 '+cifradoD[idc]+'</i><strong> y </strong><i>'+cifradoD[idc+1]+'</i><strong> se encuentran en la misma fila, por lo tanto se escogen </strong><i>'+plano[idc]+'</i><strong> y </strong><i>'+plano[idc+1]+'</i><strong> que estan situados a su derecha</strong>');
        } else if (filaL1 != filaL2 && columnaL1 == columnaL2) {
            $("#infoDePlayfair").html('<br><strong>Por la </strong><i>Regla No.2 '+cifradoD[idc]+'</i><strong> y </strong><i>'+cifradoD[idc+1]+'</i><strong> se encuentran en la misma columna, por lo tanto se escogen </strong><i>'+plano[idc]+'</i><strong> y </strong><i>'+plano[idc+1]+'</i><strong> que estan situados debajo</strong>');
        } else if (filaL1 != filaL2 && columnaL1 != columnaL2) {
            $("#infoDePlayfair").html('<br><strong>Por la </strong><i>Regla No.3 '+cifradoD[idc]+'</i><strong> y </strong><i>'+cifradoD[idc+1]+'</i><strong> se encuentran en distintas filas y columnas, por lo tanto se escogen </strong><i>'+plano[idc]+'</i><strong> y </strong><i>'+plano[idc+1]+'</i><strong> que estan situados en la diagonal opuesta</strong>');
        }
        $("#abcPlano"+idc+"D").html(plano[idc]).show();
        $("#abcPlano"+(idc+1)+"D").html(plano[idc+1]).show();
        
        // ANIMATION
        $("#abcCifrado"+idc+"D").addClass(parpadeo);
        $("#abcCifrado"+(idc+1)+"D").addClass(parpadeo);
        $("#matrizCifrado label:contains("+cifradoD[idc]+")").addClass(parpadeo);
        $("#matrizCifrado label:contains("+cifradoD[idc+1]+")").addClass(parpadeo);
        $("#m"+filaL1Decifrada+columnaL1Decifrada+"d").addClass(parpadeoNext);
        $("#m"+filaL2Decifrada+columnaL2Decifrada+"d").addClass(parpadeoNext);
        $("#abcPlano"+idc+"D").addClass(parpadeoNext);
        $("#abcPlano"+(idc+1)+"D").addClass(parpadeoNext);
        await sleepPlayfair(tDcAdd);
        $("#abcCifrado"+idc+"D").removeClass(parpadeo);
        $("#abcCifrado"+(idc+1)+"D").removeClass(parpadeo);
        $("#matrizCifrado label:contains("+cifradoD[idc]+")").removeClass(parpadeo);
        $("#matrizCifrado label:contains("+cifradoD[idc+1]+")").removeClass(parpadeo);
        $("#m"+filaL1Decifrada+columnaL1Decifrada+"d").removeClass(parpadeoNext);
        $("#m"+filaL2Decifrada+columnaL2Decifrada+"d").removeClass(parpadeoNext);
        $("#abcPlano"+idc+"D").removeClass(parpadeoNext);
        $("#abcPlano"+(idc+1)+"D").removeClass(parpadeoNext);
        await sleepPlayfair(tDcRemove);
        // END ANIMATION
        idc=idc+2;
    }
    if (idc <= cifradoD.length && idc!=999) {
        for (var i = 1; i <= plano.length-2; i++) {
            if(plano[i-1] == plano[i+1] && plano[i]=='x' || plano[i]=='X') {
               plano.splice(i, 1);
               $("#infoAnimacionDePlayfairExtra").show();
            }
        }
        if(plano[plano.length-1] == 'x') {
            plano.splice(i, 1);
        }
        cadenaDecifrado = plano.join("");
        $("#out-txtPlanoPlayfair").val(cadenaDecifrado);
        $("#btn-copiarTextoPlayfair").removeAttr("disabled");
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        $("#btn-descifrarPlayfair").show();
        $("#btn-tipoDePlayfair").show();
        $("#btn-cancelarDescifrarPlayfair").hide();
    }
}

function cifrarArchivoPlayfair(evt) {
    var fileInput = document.getElementById('fileInputPlayfairCifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaPlayfairCifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarPlayfairCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    var abc = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    var key = $("#llavePlayfairCifrado").val().toUpperCase().split("").join("").replace(/[^a-zA-ZñÑ]/g, '');
    var matrizKey = [['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0']];

    var error = validarEntradaCifradoArchivoPlayfairLlave();
    $('#llavePlayfairCifrado').removeClass('input-error').next().remove();
    if (error==""){
        if(fileInput.files.length == 0){
            $('#fileDisplayAreaPlayfairCifrado').html(mensaje_92);
            return;
        }
        if(typeof file!=='undefined'){
            if(file.size <= 1024*100) {
                if (file.type.match(textType)){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        textoPlano = reader.result;                                     
                        textoPlano = textoPlano.toUpperCase().split("").join("").replace(/\s/g, '');

                        for(i = 0; i < textoPlano.length; i++){
                            if (textoPlano.charAt(i)==textoPlano.charAt(i+1)){
                                textoPlano = textoPlano.slice(0, i+1) + "X" + textoPlano.slice(i+1);
                            }
                        }
                        if (textoPlano.length%2==1) {
                            textoPlano = textoPlano + "X";
                        }
                        key = key.replace("Ñ", "N");
                        key = key.replace("J", "I");

                        i=0; j=0;
                        for (index = 0; index < key.length; index++) {
                            if (jQuery.inArray(key.charAt(index), matrizKey[0])==-1 && jQuery.inArray(key.charAt(index), matrizKey[1])==-1 && jQuery.inArray(key.charAt(index), matrizKey[2])==-1 && jQuery.inArray(key.charAt(index), matrizKey[3])==-1 && jQuery.inArray(key.charAt(index), matrizKey[4])==-1) {
                                matrizKey[i][j] = key.charAt(index);
                                j++;
                                if (j==5) {j=0; i++;}
                                if (i==5) {break;}
                            }
                        }
                        for (k = 0; k < abc.length; k++) {
                            if (jQuery.inArray(abc[k], matrizKey[0])==-1 && jQuery.inArray(abc[k], matrizKey[1])==-1 && jQuery.inArray(abc[k], matrizKey[2])==-1 && jQuery.inArray(abc[k], matrizKey[3])==-1 && jQuery.inArray(abc[k], matrizKey[4])==-1){
                                matrizKey[i][j] = abc[k];
                                j++;
                                if(j==5){j=0;i++;}
                                if (i==5) {break;}
                            }
                        }
                        for(i = 0; i < textoPlano.length; i=i+2){
                            for (k = 0; k < 5; k++){
                                if(jQuery.inArray(textoPlano.charAt(i), matrizKey[k])!=-1){
                                    filaL1 = k;
                                    columnaL1 = jQuery.inArray(textoPlano.charAt(i), matrizKey[k]);
                                }
                            }
                            for (k = 0; k < 5; k++){
                                if(jQuery.inArray(textoPlano.charAt(i+1), matrizKey[k])!=-1){
                                    filaL2 = k;
                                    columnaL2 = jQuery.inArray(textoPlano.charAt(i+1), matrizKey[k]);
                                }
                            }
                            if (filaL1 == filaL2 && columnaL1 != columnaL2) {
                                columnaL1Cifrada=Number(columnaL1)+1;
                                filaL1Cifrada=filaL1;
                                columnaL2Cifrada=Number(columnaL2)+1;
                                filaL2Cifrada=filaL2;
                                if (columnaL1Cifrada>=5) {columnaL1Cifrada=columnaL1Cifrada-5;}
                                if (columnaL2Cifrada>=5) {columnaL2Cifrada=columnaL2Cifrada-5;}
                            } else if (filaL1 != filaL2 && columnaL1 == columnaL2) {
                                filaL1Cifrada=Number(filaL1)+1;
                                columnaL1Cifrada=columnaL1;
                                filaL2Cifrada=Number(filaL2)+1;
                                columnaL2Cifrada=columnaL2;
                                if (filaL1Cifrada>=5) {filaL1Cifrada=filaL1Cifrada-5;}
                                if (filaL2Cifrada>=5) {filaL2Cifrada=filaL2Cifrada-5;}
                            } else if (filaL1 != filaL2 && columnaL1 != columnaL2) {
                                filaL1Cifrada=filaL1;
                                columnaL1Cifrada=columnaL2;
                                filaL2Cifrada=filaL2;
                                columnaL2Cifrada=columnaL1;
                            }
                            textoCifrado = textoCifrado + matrizKey[filaL1Cifrada][columnaL1Cifrada] + matrizKey[filaL2Cifrada][columnaL2Cifrada];
                            //$("#progressbarPlayfairCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
                        }       

                        fileDisplayArea.innerText= textoCifrado;
                        textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
                        
                        //PARA DESCARGAR
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
                        element.setAttribute('download', "ArchivoCifradoPLAYFAIR.txt");
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        $("#progressbarPlayfairCifrado").css('width','100%').attr('aria-valuenow', '100');
                    }
                    reader.readAsText(file, 'ISO-8859-1');
                } else {
                    fileDisplayArea.innerText = mensaje_89;
                }
            } else {
                fileDisplayArea.innerText = mensaje_90;
            }
        }
    } else {
        $('#llavePlayfairCifrado').addClass('input-error').after('<div id="llavePlayfairCifrado-error" class="text-danger">'+error+'</div>');
    }
}

function descifrarArchivoPlayfair(evt) {
    var fileInput = document.getElementById('fileInputPlayfairDescifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaPlayfairDescifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarPlayfairDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    var abc = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    var key = $("#llavePlayfairDescifrado").val().toUpperCase().split("").join("").replace(/[^a-zA-ZñÑ]/g, '');
    var matrizKey = [['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0'],
                    ['0', '0', '0', '0', '0']];

    var error = validarEntradaDescifradoArchivoPlayfairLlave();
    $('#llavePlayfairDescifrado').removeClass('input-error').next().remove();
    
    if (error==""){
        if(fileInput.files.length == 0){
            $('#fileDisplayAreaPlayfairDescifrado').html(mensaje_93);
            return;
        }
        if(typeof file!=='undefined'){
            if(file.size <= 1024*100) {
                if (file.type.match(textType)){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        textoCifrado = reader.result;                                       
                        textoCifrado = textoCifrado.toUpperCase().split("").join("").replace(/\s/g, '');

                        if (textoCifrado.length%2==1) {
                            textoCifrado = textoCifrado + "X";
                        }
                        key = key.replace("Ñ", "N");
                        key = key.replace("J", "I");

                        i=0; j=0;
                        for (index = 0; index < key.length; index++) {
                            if (jQuery.inArray(key.charAt(index), matrizKey[0])==-1 && jQuery.inArray(key.charAt(index), matrizKey[1])==-1 && jQuery.inArray(key.charAt(index), matrizKey[2])==-1 && jQuery.inArray(key.charAt(index), matrizKey[3])==-1 && jQuery.inArray(key.charAt(index), matrizKey[4])==-1) {
                                matrizKey[i][j] = key.charAt(index);
                                j++;
                                if (j==5) {j=0; i++;}
                                if (i==5) {break;}
                            }
                        }
                        for (k = 0; k < abc.length; k++) {
                            if (jQuery.inArray(abc[k], matrizKey[0])==-1 && jQuery.inArray(abc[k], matrizKey[1])==-1 && jQuery.inArray(abc[k], matrizKey[2])==-1 && jQuery.inArray(abc[k], matrizKey[3])==-1 && jQuery.inArray(abc[k], matrizKey[4])==-1){
                                matrizKey[i][j] = abc[k];
                                j++;
                                if(j==5){j=0;i++;}
                                if (i==5) {break;}
                            }
                        }
                        for(i = 0; i < textoCifrado.length; i=i+2){
                            for (k = 0; k < 5; k++){
                                if(jQuery.inArray(textoCifrado.charAt(i), matrizKey[k])!=-1){
                                    filaL1 = k;
                                    columnaL1 = jQuery.inArray(textoCifrado.charAt(i), matrizKey[k]);
                                }
                            }
                            for (k = 0; k < 5; k++){
                                if(jQuery.inArray(textoCifrado.charAt(i+1), matrizKey[k])!=-1){
                                    filaL2 = k;
                                    columnaL2 = jQuery.inArray(textoCifrado.charAt(i+1), matrizKey[k]);
                                }
                            }
                            if (filaL1 == filaL2 && columnaL1 != columnaL2) {
                                columnaL1Decifrada=Number(columnaL1)-1;
                                filaL1Decifrada=filaL1;
                                columnaL2Decifrada=Number(columnaL2)-1;
                                filaL2Decifrada=filaL2;
                                if (columnaL1Decifrada<0) {columnaL1Decifrada=columnaL1Decifrada+5;}
                                if (columnaL2Decifrada<0) {columnaL2Decifrada=columnaL2Decifrada+5;}
                            } else if (filaL1 != filaL2 && columnaL1 == columnaL2) {
                                filaL1Decifrada=Number(filaL1)-1;
                                columnaL1Decifrada=columnaL1;
                                filaL2Decifrada=Number(filaL2)-1;
                                columnaL2Decifrada=columnaL2;
                                if (filaL1Decifrada<0) {filaL1Decifrada=filaL1Decifrada+5;}
                                if (filaL2Decifrada<0) {filaL2Decifrada=filaL2Decifrada+5;}
                            } else if (filaL1 != filaL2 && columnaL1 != columnaL2) {
                                filaL1Decifrada=filaL1;
                                columnaL1Decifrada=columnaL2;
                                filaL2Decifrada=filaL2;
                                columnaL2Decifrada=columnaL1;
                            }
                            textoPlano = textoPlano + matrizKey[filaL1Decifrada][columnaL1Decifrada].toLowerCase() + matrizKey[filaL2Decifrada][columnaL2Decifrada].toLowerCase();
                            //$("#progressbarPlayfairDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
                        }
                        for(i = 1; i < textoPlano.length-1; i++){
                            if (textoPlano.charAt(i-1)==textoPlano.charAt(i+1) && textoPlano.charAt(i)=='x'){
                                textoPlano = textoPlano.slice(0, i) + textoPlano.slice(i+1);
                            }
                        }
                        if (textoPlano.charAt(textoPlano.length-1)=='x'){
                            textoPlano = textoPlano.slice(0, textoPlano.length-1);
                        }       

                        fileDisplayArea.innerText= textoPlano;
                        textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
                        
                        //PARA DESCARGAR
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
                        element.setAttribute('download', "ArchivoDescifradoPLAYFAIR.txt");
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        $("#progressbarPlayfairDescifrado").css('width','100%').attr('aria-valuenow', '100');
                    }
                    reader.readAsText(file, 'ISO-8859-1');
                } else {
                    fileDisplayArea.innerText = mensaje_89;
                }
            } else {
                fileDisplayArea.innerText = mensaje_90;
            }
        }
    } else {
        $('#llavePlayfairDescifrado').addClass('input-error').after('<div id="llavePlayfairDescifrado-error" class="text-danger">'+error+'</div>');
    }
}