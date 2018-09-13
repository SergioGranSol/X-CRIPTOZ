function sleepHill(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

var abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function mostrarPanelHill(){
	$("#pnl-InteractivoHill").slideToggle(1000);
    $("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelHill(){
	$("#pnl-InteractivoHill").slideToggle(1000);
    $("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelHill();
}

function crearPanelHillCifrado(){
	for (var i = 1; i <= 3; i++) {
		$("#m"+i+"ch").append('<td><label class="circulo">|</label></td>');
		for (var j = 1; j <= 3; j++) {
			$("#m"+i+"ch").append('<td><label id="m'+i+j+'ch" class="circulo" fila="'+i+'" columna="'+j+'">[]</label></td>');
		}
		$("#m"+i+"ch").append('<td><label class="circulo">|</label></td>');
	}
	for (var i = 1; i <= 3; i++) {
		if (i == 2) {
			$("#m"+i+"ch").append('<td><label class="circulo">*</label></td>');
		} else {
			$("#m"+i+"ch").append('<td><label class="circulo">&nbsp;</label></td>');
		}
		$("#m"+i+"ch").append('<td><label class="circulo">|</label></td>');
		$("#m"+i+"ch").append('<td><label id="mtp'+i+'ch" class="circulo" fila="'+i+'">[]</label></td>');
		$("#m"+i+"ch").append('<td><label class="circulo">|</label></td>');
		if (i == 2) {
			$("#m"+i+"ch").append('<td><label class="circulo">=</label></td>');
		} else {
			$("#m"+i+"ch").append('<td><label class="circulo">&nbsp;</label></td>');
		}
		$("#m"+i+"ch").append('<td><label class="circulo">|</label></td>');
		$("#m"+i+"ch").append('<td><label id="mrtp'+i+'ch" class="circulo" fila="'+i+'">[]</label></td>');
		$("#m"+i+"ch").append('<td><label class="circulo">|</label></td>');
	}
}

function crearPanelHillDescifrado(){
    for (var i = 1; i <= 3; i++) {
        $("#m"+i+"dh").append('<td><label class="circulo">|</label></td>');
        for (var j = 1; j <= 3; j++) {
            $("#m"+i+"dh").append('<td><label id="m'+i+j+'dh" class="circulo" fila="'+i+'" columna="'+j+'">[]</label></td>');
        }
        $("#m"+i+"dh").append('<td><label class="circulo">|</label></td>');
    }
    for (var i = 1; i <= 3; i++) {
        if (i == 2) {
            $("#m"+i+"dh").append('<td><label class="circulo">*</label></td>');
        } else {
            $("#m"+i+"dh").append('<td><label class="circulo">&nbsp;</label></td>');
        }
        $("#m"+i+"dh").append('<td><label class="circulo">|</label></td>');
        $("#m"+i+"dh").append('<td><label id="mtc'+i+'dh" class="circulo" fila="'+i+'">[]</label></td>');
        $("#m"+i+"dh").append('<td><label class="circulo">|</label></td>');
        if (i == 2) {
            $("#m"+i+"dh").append('<td><label class="circulo">=</label></td>');
        } else {
            $("#m"+i+"dh").append('<td><label class="circulo">&nbsp;</label></td>');
        }
        $("#m"+i+"dh").append('<td><label class="circulo">|</label></td>');
        $("#m"+i+"dh").append('<td><label id="mrtc'+i+'dh" class="circulo" fila="'+i+'">[]</label></td>');
        $("#m"+i+"dh").append('<td><label class="circulo">|</label></td>');
    }
}

function limpiaPanelHill(){
    tCAdd=600;
    tCRemove=200;
    tDcAdd=600;
    tDcRemove=200;
    parpadeo='parpadeo2N';
    parpadeoNext='parpadeoNext2N';
    $("#btn-cifrarHill").html('Cifrado Normal');
    $("#btn-descifrarHill").html('Descifrado Normal');
	$("#textoPlanoHillC").empty();
	$("#textoCifradoHillC").empty();
	$("#textoPlanoHillD").empty();
	$("#textoCifradoHillD").empty();
	$("#in-txtPlanoHill").val("");
	$("#out-txtCifradoHill").val("");
	$("#in-txtCifradoHill").val("");
	$("#out-txtPlanoHill").val("");
    $("#txtPlanoHill-error").remove();
    $("#in-txtPlanoHill").removeClass('input-error');
    $("#in-txtCifradoHill").removeClass('input-error');
    $("#txtCifradoHill-error").remove();
    $("#btn-cifrarHill").show();
    $("#btn-tipoCiHill").show();
    $("#btn-cancelarCifrarHill").hide();
    $("#btn-descifrarHill").show();
    $("#btn-tipoDeHill").show();
    $("#btn-cancelarDescifrarHill").hide();
	limpiaMatricesHill();
}

function limpiaMatricesHill(){
    for (var i = 1; i <= 3; i++) {
        $("#m"+i+"ch").empty();
        $("#m"+i+"dh").empty();
        $("#mr"+i+"ch").empty();
        $("#mr"+i+"dh").empty();
    }
}

function pararAnimacionHill(){
    ic=999;
    idc=999;
    $("#in-txtPlanoHill").val("");
    $("#in-txtCifradoHill").val("");
    $("#btn-copiarTextoHill").removeAttr("disabled");
    $("#textoPlanoHillD").empty();
    $("#textoCifradoHillD").empty();
    $("#textoPlanoHillC").empty();
    $("#textoCifradoHillC").empty();
    $("#infoAnimacionCiHill").hide();
    $("#infoAnimacionCiHillExtra").hide();
    $("#infoAnimacionDeHill").hide();
    $("#infoAnimacionDeHillExtra").hide();
    $("#infoLlaveAnimacionCiHill").hide();
    $("#infoLlaveAnimacionDeHill").hide();
    $("#in-txtPlanoHill").removeClass('error');
    $("#txtPlanoHill-error").remove();
    $("#in-txtPlanoHill").removeClass('input-error');
    $("#txtCifradoHill-error").remove();
    $("#in-txtCifradoHill").removeClass('input-error');
    $("#btn-cifrarHill").show();
    $("#btn-tipoCiHill").show();
    $("#btn-cancelarCifrarHill").hide();
    $("#btn-descifrarHill").show();
    $("#btn-tipoDeHill").show();
    $("#btn-cancelarDescifrarHill").hide();
    limpiaMatricesHill();
}

function validarEntradaCifradoHill(){
    var mensaje = "";
    var texto = $('#in-txtPlanoHill').val().replace(/ /g,"");
    if (texto.length < 1 || texto.length > 21) {
        mensaje = mensaje_22;
    } else if (!texto.match(/^[a-zA-ZñÑ \s]+$/)){
        mensaje = mensaje_2;
    }
    return mensaje;
}

function validarEntradaDescifradoHill(){
    var mensaje = "";
    var texto = $('#in-txtCifradoHill').val();
    if (texto.length < 1 || texto.length > 21) {
        mensaje = mensaje_23;
    }
    else if(texto.indexOf(' ') >= 0){
        mensaje = mensaje_4;
    }
    else if (!texto.match(/^[a-zA-ZñÑ \s]+$/)){
        mensaje = mensaje_5;
    }
    return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelHill").click(function(){
		mostrarPanelHill();
	});
	$("#btn-cerrarPanelHill").click(function(){
        pararAnimacionHill();
		cerrarPanelHill();
	});
    $("#btn-teoriaHill").click(function(){
        pararAnimacionHill();
    });
    $("#btn-fundamentosHill").click(function(){
        pararAnimacionHill();
    });
    $("#btn-animacionCifradoHill").click(function(){
        //pararAnimacionHill();
    });
    $("#btn-animacionDescifradoHill").click(function(){
        //pararAnimacionHill();
    });
    $("#btn-cancelarCifrarHill").click(function(){
        pararAnimacionHill();
    });
    $("#btn-cancelarDescifrarHill").click(function(){
        pararAnimacionHill();
    });
    $("#tipoCiHill1").click(function(){
        $("#btn-cifrarHill").html('Cifrado Rápido');
        tCAdd=200;
        tCRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoCiHill2").click(function(){
        $("#btn-cifrarHill").html('Cifrado Normal');
        tCAdd=600;
        tCRemove=200;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoCiHill3").click(function(){
        $("#btn-cifrarHill").html('Cifrado Lento');
        tCAdd=1600;
        tCRemove=200;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });
    $("#tipoDeHill1").click(function(){
        $("#btn-descifrarHill").html('Descifrado Rápido');
        tDcAdd=200;
        tDcRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoDeHill2").click(function(){
        $("#btn-descifrarHill").html('Descifrado Normal');
        tDcAdd=600;
        tDcRemove=200;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoDeHill3").click(function(){
        $("#btn-descifrarHill").html('Descifrado Lento');
        tDcAdd=1600;
        tDcRemove=200;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });

    $("#in-txtPlanoHill").keyup(function(){
        $("#in-txtPlanoHill").removeClass('input-error');
        $("#txtPlanoHill-error").remove();
        if ($("#in-txtPlanoHill").val()=='') {
            $("#in-txtPlanoHill").removeClass('input-error');
            $("#txtPlanoHill-error").remove();
        } else{
            var mensaje = validarEntradaCifradoHill();
            if (mensaje.length == 0){
                $("#in-txtPlanoHill").removeClass('input-error');
                $("#txtPlanoHill-error").remove();
            } else {
                $("#in-txtPlanoHill").addClass('input-error');
                $("#in-txtPlanoHill").parent().parent().append('<div id="txtPlanoHill-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-txtCifradoHill").keyup(function(){
        $("#in-txtCifradoHill").removeClass('input-error');
        $("#txtCifradoHill-error").remove();
        if ($("#in-txtCifradoHill").val()=='') {
            $("#in-txtCifradoHill").removeClass('input-error');
            $("#txtCifradoHill-error").remove();
        } else{
            var mensaje = validarEntradaDescifradoHill();
            if (mensaje.length == 0){
                $("#in-txtCifradoHill").removeClass('input-error');
                $("#txtCifradoHill-error").remove();
            } else {
                $("#in-txtCifradoHill").addClass('input-error');
                $("#in-txtCifradoHill").parent().parent().append('<div id="txtCifradoHill-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

	$("#btn-cifrarHill").click(function(){
        $("#in-txtPlanoHill").removeClass('input-error');
        $("#txtPlanoHill-error").remove();
        $("#out-txtCifradoHill").val("");
        var mensaje = validarEntradaCifradoHill();
		if ($("#in-txtPlanoHill").val()!='' && mensaje.length == 0){
			$("#textoPlanoHillC").empty();
			$("#textoCifradoHillC").empty();
			$("#infoAnimacionCiHill").hide();
            $("#infoAnimacionCiHillExtra").hide();
            $("#infoLlaveAnimacionCiHill").hide();
            $("#btn-cifrarHill").hide();
            $("#btn-tipoCiHill").hide();
            $("#btn-cancelarCifrarHill").show();
            limpiaMatricesHill();
			cifrarHill();
		} else{
            $("#in-txtPlanoHill").addClass('input-error');
            $("#in-txtPlanoHill").parent().parent().append('<div id="txtPlanoHill-error" class="text-danger">&nbsp;'+mensaje+'</div>');
        }
	});

	$("#btn-copiarTextoHill").click(function(){
		if ($("#out-txtCifradoHill").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-txtCifradoHill").val($("#out-txtCifradoHill").val());
		}
	});

	$("#btn-descifrarHill").click(function(){
        $("#in-txtCifradoHill").removeClass('input-error');
        $("#txtCifradoHill-error").remove();
        $("#out-txtPlanoHill").val("");
        var mensaje = validarEntradaDescifradoHill();
		if ($("#in-txtCifradoHill").val()!='' && mensaje.length == 0){
			$("#textoPlanoHillD").empty();
			$("#textoCifradoHillD").empty();
			$("#btn-copiarTextoHill").attr("disabled","disabled");
            $("#infoAnimacionDeHill").hide();
            $("#infoAnimacionDeHillExtra").hide();
            $("#btn-descifrarHill").hide();
            $("#btn-tipoDeHill").hide();
            $("#btn-cancelarDescifrarHill").show();
            limpiaMatricesHill();
			descifrarHill();
		} else{
            $("#in-txtCifradoHill").addClass('input-error');
            $("#in-txtCifradoHill").parent().parent().append('<div id="txtCifradoHill-error" class="text-danger">&nbsp;'+mensaje+'</div>');
        }
	});
	    
});

async function cifrarHill(){
    crearPanelHillCifrado();
    var plano = ($("#in-txtPlanoHill").val().toUpperCase()).split("");
    var cifrado = [];
    var cadenaCifrado;
    // var matriz = [5,17,20,9,23,3,2,11,13];  //Invertible mod 26
    var matriz = [2,11,0,22,4,4,9,4,12];    //Invertible mod 27
    var matrizPlano = [];
    var matrizRes = [];
    var k = 0;
    var aux = 0;
    ic = 0;
    for (var i = 0; i <= plano.length-1; i++) {
        if(plano[i] == ' ') {
           plano.splice(i, 1);
        }
    }
    var matrizCifrado = new Array(3);
    if (plano.length % 3 == 1) {
        plano[plano.length] ='X';
        plano[plano.length] ='X';
        aux = 1;
    } else if (plano.length % 3 == 2) {
        plano[plano.length] ='X';
        aux = 1;
    }
    if (aux==1) {
        $("#infoAnimacionCiHillExtra").fadeIn();
        await sleepHill(tCAdd);
    }
    $("#infoLlaveAnimacionCiHill").fadeIn();
    $("#infoAnimacionCiHill").fadeIn();
    await sleepHill(tCAdd);
    for (var i = 1; i <= 3; i++) {
        matrizCifrado[i] = new Array(3);
    }
    for (var i = 1; i <=3; i++) {
        for (var j = 1; j <= 3; j++) {
            matrizCifrado[i][j]=matriz[k];
            k++;
        }
    }
    for (var i = 1; i <=3; i++) {
        for (var j = 1; j <= 3; j++) {
            $("#m"+i+j+"ch").html(matrizCifrado[i][j]);
        }
    }
    for (var m = 0; m <= plano.length-1; m++) {
        $("#textoPlanoHillC").append('<label id="abcPlano'+m+'C" class="circulo">'+plano[m].toLowerCase()+'</label>');
    }
    for (var n = 0; n <= plano.length-1; n++) {
        $("#textoCifradoHillC").append('<label id="abcCifrado'+n+'C" class="circulo">&nbsp;</label>');
    }
    // ANIMATION
    $("#textoPlanoHillC").addClass(parpadeo);
    await sleepHill(tCAdd);
    $("#textoPlanoHillC").removeClass(parpadeo);
    await sleepHill(tCRemove);
    // END ANIMATION
    while (ic <= plano.length-1) {
        for (var i = 1; i <= 3; i++) {
            $("#mtp"+i+"ch").html(plano[ic].toLowerCase());
            matrizPlano[i] = abc.indexOf(plano[ic]);
            ic++;
        }
        ic=ic-3;
        for(var i = 1; i <= 3; i++){
            matrizRes[i] = 0;
            for(var j = 1; j <= 3; j++){
                matrizRes[i] = matrizRes[i] + (matrizCifrado[i][j] * matrizPlano[j]);
                matrizRes[i] = matrizRes[i]%27;
            }
        }
        for (var i = 1; i <= 3; i++) {
            cifrado[ic] = abc[matrizRes[i]];
            // console.log(matrizRes[i]);
            ic++;
        }
        ic=ic-3;
        $("#mrtp1ch").html(cifrado[ic]);
        $("#mrtp2ch").html(cifrado[ic+1]);
        $("#mrtp3ch").html(cifrado[ic+2]);
        $("#abcCifrado"+ic+"C").html(cifrado[ic]);
        $("#abcCifrado"+(ic+1)+"C").html(cifrado[ic+1]);
        $("#abcCifrado"+(ic+2)+"C").html(cifrado[ic+2]);
        // ANIMATION
        $("#abcPlano"+ic+"C").addClass(parpadeo);
        $("#abcPlano"+(ic+1)+"C").addClass(parpadeo);
        $("#abcPlano"+(ic+2)+"C").addClass(parpadeo);
        $("#mtp1ch").addClass(parpadeo);
        $("#mtp2ch").addClass(parpadeo);
        $("#mtp3ch").addClass(parpadeo);
        $("#mrtp1ch").addClass(parpadeoNext);
        $("#mrtp2ch").addClass(parpadeoNext);
        $("#mrtp3ch").addClass(parpadeoNext);
        $("#abcCifrado"+ic+"C").addClass(parpadeoNext);
        $("#abcCifrado"+(ic+1)+"C").addClass(parpadeoNext);
        $("#abcCifrado"+(ic+2)+"C").addClass(parpadeoNext);
        await sleepHill(tCAdd);
        $("#abcPlano"+ic+"C").removeClass(parpadeo);
        $("#abcPlano"+(ic+1)+"C").removeClass(parpadeo);
        $("#abcPlano"+(ic+2)+"C").removeClass(parpadeo);
        $("#mtp1ch").removeClass(parpadeo);
        $("#mtp2ch").removeClass(parpadeo);
        $("#mtp3ch").removeClass(parpadeo);
        $("#mrtp1ch").removeClass(parpadeoNext);
        $("#mrtp2ch").removeClass(parpadeoNext);
        $("#mrtp3ch").removeClass(parpadeoNext);
        $("#abcCifrado"+ic+"C").removeClass(parpadeoNext);
        $("#abcCifrado"+(ic+1)+"C").removeClass(parpadeoNext);
        $("#abcCifrado"+(ic+2)+"C").removeClass(parpadeoNext);
        await sleepHill(tCRemove);
        // END ANIMATION
        ic=ic+3;
    }
    if (ic <= plano.length && ic!=999) {
        cadenaCifrado = cifrado.join("");
        $("#out-txtCifradoHill").val(cadenaCifrado);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        $("#btn-cifrarHill").show();
        $("#btn-tipoCiHill").show();
        $("#btn-cancelarCifrarHill").hide();
    }
}

async function descifrarHill(){
    crearPanelHillDescifrado();
    var cifrado = ($("#in-txtCifradoHill").val().toUpperCase()).split("");
    var plano = [];
    var cadenaDescifrado;
    // var matriz = [18,23,21,5,23,1,3,15,16];     // mod 26
    var matriz = [17,21,20,24,6,16,4,7,9];      // mod 27
    var matrizCifrado = [];
    var matrizRes = [];
    var k = 0;
    idc = 0;
    for (var i = 0; i <= cifrado.length-1; i++) {
        if(cifrado[i] == ' ') {
           cifrado.splice(i, 1);
        }
    }
    var matrizDescifrado = new Array(3);
    if (cifrado.length % 3 == 1) {
        cifrado[cifrado.length]='X';
        cifrado[cifrado.length]='X';
    } else if (cifrado.length % 3 == 2) {
        cifrado[cifrado.length]='X';
    }
    $("#infoAnimacionDeHill").fadeIn();
    await sleepHill(tDcAdd);
    for (var i = 1; i <= 3; i++) {
        matrizDescifrado[i] = new Array(3);
    }
    for (var i = 1; i <=3; i++) {
        for (var j = 1; j <= 3; j++) {
            matrizDescifrado[i][j]=matriz[k];
            k++;
        }
    }
    for (var i = 1; i <=3; i++) {
        for (var j = 1; j <= 3; j++) {
            $("#m"+i+j+"dh").html(matrizDescifrado[i][j]);
        }
    }
    for (var m = 0; m <= cifrado.length-1; m++) {
        $("#textoCifradoHillD").append('<label id="abcCifrado'+m+'D" class="circulo">'+cifrado[m]+'</label>');
    }
    for (var n = 0; n <= cifrado.length-1; n++) {
        $("#textoPlanoHillD").append('<label id="abcPlano'+n+'D" class="circulo">&nbsp;</label>');
    }
    // ANIMATION
    $("#textoCifradoHillD").addClass(parpadeo);
    await sleepHill(tDcAdd);
    $("#textoCifradoHillD").removeClass(parpadeo);
    await sleepHill(tDcRemove);
    // END ANIMATION
    while (idc <= cifrado.length-1) {
        for (var i = 1; i <= 3; i++) {
            $("#mtc"+i+"dh").html(cifrado[idc]);
            matrizCifrado[i] = abc.indexOf(cifrado[idc]);
            idc++;
        }
        idc=idc-3;
        for(var i = 1; i <= 3; i++){
            matrizRes[i] = 0;
            for(var j = 1; j <= 3; j++){
                matrizRes[i] = matrizRes[i] + (matrizDescifrado[i][j] * matrizCifrado[j]);
                matrizRes[i] = matrizRes[i]%27;
            }
        }
        for (var i = 1; i <= 3; i++) {
            plano[idc] = abc[matrizRes[i]].toLowerCase();
            idc++;
        }
        idc=idc-3;
        $("#mrtc1dh").html(plano[idc]);
        $("#mrtc2dh").html(plano[idc+1]);
        $("#mrtc3dh").html(plano[idc+2]);
        $("#abcPlano"+idc+"D").html(plano[idc]);
        $("#abcPlano"+(idc+1)+"D").html(plano[idc+1]);
        $("#abcPlano"+(idc+2)+"D").html(plano[idc+2]);
        // ANIMATION
        $("#abcCifrado"+idc+"D").addClass(parpadeo);
        $("#abcCifrado"+(idc+1)+"D").addClass(parpadeo);
        $("#abcCifrado"+(idc+2)+"D").addClass(parpadeo);
        $("#mtc1dh").addClass(parpadeo);
        $("#mtc2dh").addClass(parpadeo);
        $("#mtc3dh").addClass(parpadeo);
        $("#mrtc1dh").addClass(parpadeoNext);
        $("#mrtc2dh").addClass(parpadeoNext);
        $("#mrtc3dh").addClass(parpadeoNext);
        $("#abcPlano"+idc+"D").addClass(parpadeoNext);
        $("#abcPlano"+(idc+1)+"D").addClass(parpadeoNext);
        $("#abcPlano"+(idc+2)+"D").addClass(parpadeoNext);
        await sleepHill(tDcAdd);
        $("#abcCifrado"+idc+"D").removeClass(parpadeo);
        $("#abcCifrado"+(idc+1)+"D").removeClass(parpadeo);
        $("#abcCifrado"+(idc+2)+"D").removeClass(parpadeo);
        $("#mtc1dh").removeClass(parpadeo);
        $("#mtc2dh").removeClass(parpadeo);
        $("#mtc3dh").removeClass(parpadeo);
        $("#mrtc1dh").removeClass(parpadeoNext);
        $("#mrtc2dh").removeClass(parpadeoNext);
        $("#mrtc3dh").removeClass(parpadeoNext);
        $("#abcPlano"+idc+"D").removeClass(parpadeoNext);
        $("#abcPlano"+(idc+1)+"D").removeClass(parpadeoNext);
        $("#abcPlano"+(idc+2)+"D").removeClass(parpadeoNext);
        await sleepHill(tDcRemove);
        // END ANIMATION
        idc=idc+3;
    }
    if (idc <= cifrado.length && idc!=999) {
        if (plano[plano.length-1]=='x' && plano[plano.length-2]=='x') {
            plano[plano.length-1]='';
            plano[plano.length-2]='';
            $("#infoAnimacionDeHillExtra").show();
        } else if (plano[plano.length-1]=='x') {
            plano[plano.length-1]='';
            $("#infoAnimacionDeHillExtra").show();
        }
        cadenaDescifrado = plano.join("");
        $("#out-txtPlanoHill").val(cadenaDescifrado);
        $("#btn-copiarTextoHill").removeAttr("disabled");
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        $("#btn-descifrarHill").show();
        $("#btn-tipoDeHill").show();
        $("#btn-cancelarDescifrarHill").hide();
    }
}

function cifrarArchivoHill(evt) {
    var fileInput = document.getElementById('fileInputHillCifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaHillCifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarHillCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    var abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var matrizPlano = [];
    var matrizRes = [];
    // var matrizKey = [[5, 17, 20],    //Invertible mod 26
    //              [ 9, 23,  3],
    //              [ 2, 11, 13]];
    var matrizKey = [[ 2, 11,  0],  //Invertible mod 27
                    [ 22,  4,  4],
                    [  9,  4, 12]];
    
    if(typeof file!=='undefined'){
        if(file.size <= 1024*100) {
            if (file.type.match(textType)){
                var reader = new FileReader();
                reader.onload = function(e){
                    textoPlano= reader.result;                                      
                    textoPlano= textoPlano.split("").join("").replace(/[^a-zA-ZñÑ]/g, '').toUpperCase();

                    if (textoPlano.length % 3 == 1) {
                        textoPlano = textoPlano + 'XX';
                    } else if (textoPlano.length % 3 == 2) {
                        textoPlano = textoPlano + 'X';
                    }

                    for(i = 0; i < textoPlano.length; i=i+3){

                        matrizPlano[0] = abc.indexOf(textoPlano.charAt(i));
                        matrizPlano[1] = abc.indexOf(textoPlano.charAt(i+1));
                        matrizPlano[2] = abc.indexOf(textoPlano.charAt(i+2));

                        for(k = 0; k < 3; k++){
                            matrizRes[k] = 0;
                            for(j = 0; j < 3; j++){
                                matrizRes[k] = matrizRes[k] + (matrizKey[k][j] * matrizPlano[j]);
                                matrizRes[k] = matrizRes[k]%27;
                            }
                        }

                        textoCifrado = textoCifrado + abc[matrizRes[0]] + abc[matrizRes[1]] + abc[matrizRes[2]];
                        //$("#progressbarHillCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
                    }

                    fileDisplayArea.innerText= textoCifrado;
                    textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
                    
                    //PARA DESCARGAR
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
                    element.setAttribute('download', "ArchivoCifradoHILL.txt");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    $("#progressbarHillCifrado").css('width','100%').attr('aria-valuenow', '100');
                }
                reader.readAsText(file, 'ISO-8859-1');
            } else {
                fileDisplayArea.innerText = mensaje_89;
            }
        } else {
            fileDisplayArea.innerText = mensaje_90;
        }
    }
}

function descifrarArchivoHill(evt) {
    var fileInput = document.getElementById('fileInputHillDescifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaHillDescifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoCifrado = "";
    var textoPlano = "";
    $("#progressbarHillDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    var abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var matrizPlano = [];
    var matrizRes = [];
    // var matrizKey = [[18, 23, 21],   // mod 26
    //              [  5, 23,  1],
    //              [  3, 15, 16]];
    var matrizKey = [[17, 21, 20],  // mod 27
                    [ 24,  6, 16],
                    [  4,  7,  9]];
    
    if(typeof file!=='undefined'){
        if(file.size <= 1024*100+2) {
            if (file.type.match(textType)){
                var reader = new FileReader();
                reader.onload = function(e){
                    textoCifrado= reader.result.toUpperCase();                                        
                    textoCifrado= textoCifrado.split("").join("").replace(/[^a-zA-ZñÑ]/g, '');

                    if (textoCifrado.length % 3 == 1) {
                        textoCifrado = textoCifrado + 'XX';
                    } else if (textoCifrado.length % 3 == 2) {
                        textoCifrado = textoCifrado + 'X';
                    }

                    for(i = 0; i < textoCifrado.length; i=i+3){

                        matrizPlano[0] = abc.indexOf(textoCifrado.charAt(i));
                        matrizPlano[1] = abc.indexOf(textoCifrado.charAt(i+1));
                        matrizPlano[2] = abc.indexOf(textoCifrado.charAt(i+2));

                        for(k = 0; k < 3; k++){
                            matrizRes[k] = 0;
                            for(j = 0; j < 3; j++){
                                matrizRes[k] = matrizRes[k] + (matrizKey[k][j] * matrizPlano[j]);
                                matrizRes[k] = matrizRes[k]%27;
                            }
                        }

                        textoPlano = textoPlano + abc[matrizRes[0]].toLowerCase() + abc[matrizRes[1]].toLowerCase() + abc[matrizRes[2]].toLowerCase();
                        //$("#progressbarHillDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
                    }
                    if (textoPlano.charAt(textoPlano.length-1)=='x'){
                        textoPlano = textoPlano.slice(0, textoPlano.length-1);
                    }
                    if (textoPlano.charAt(textoPlano.length-1)=='x'){
                        textoPlano = textoPlano.slice(0, textoPlano.length-1);
                    }

                    fileDisplayArea.innerText= textoPlano;
                    textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
                    
                    //PARA DESCARGAR
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
                    element.setAttribute('download', "ArchivoDescifradoHILL.txt");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    $("#progressbarHillDescifrado").css('width','100%').attr('aria-valuenow', '100');
                }
                reader.readAsText(file, 'ISO-8859-1');
            } else {
                fileDisplayArea.innerText = mensaje_89;
            }
        } else {
            fileDisplayArea.innerText = mensaje_90;;
        }
    }
}