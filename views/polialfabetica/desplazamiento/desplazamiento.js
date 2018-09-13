function sleepDesplazamiento(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

var abc = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function mostrarPanelDespla(){
	$("#pnl-InteractivoDespla").slideToggle(1000);
    $("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelDespla(){
	$("#pnl-InteractivoDespla").slideToggle(1000);
    $("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelDespla();
}

function crearPanelDesplaCifrado(){
	for (var i = 1; i <= 27; i++) {
		$("#textoPlanoDesplaC").append('<td id="abcPlano'+i+'C" class="circulo">'+abc[i].toLowerCase()+'&nbsp;</td>');
		$("#textoCifradoDesplaC").append('<td id="abcCifrado'+i+'C" class="circulo">'+abc[i]+'</td>');
	}
}

function crearPanelDesplaDescifrado(){
    for (var i = 1; i <= 27; i++) {
        $("#textoPlanoDesplaD").append('<td id="abcPlano'+i+'D" class="circulo">'+abc[i].toLowerCase()+'&nbsp;</td>');
        $("#textoCifradoDesplaD").append('<td id="abcCifrado'+i+'D" class="circulo">'+abc[i]+'</td>');
    }
}

function limpiaPanelDespla(){
    tCAdd=600;
    tCRemove=200;
    tDcAdd=600;
    tDcRemove=200;
    parpadeo='parpadeo2N';
    parpadeoNext='parpadeoNext2N';
    $("#btn-cifrarDespla").html('Cifrado Normal');
    $("#btn-descifrarDespla").html('Descifrado Normal');
	$("#textoPlanoDesplaC").empty();
	$("#textoCifradoDesplaC").empty();
	$("#textoPlanoDesplaD").empty();
	$("#textoCifradoDesplaD").empty();
	$("#in-txtPlanoDespla").val("");
	$("#out-txtCifradoDespla").val("");
	$("#in-txtCifradoDespla").val("");
	$("#out-txtPlanoDespla").val("");
	$("#in-keyDesplaC").val("");
	$("#in-keyDesplaD").val("");
	$("#in-txtPlanoDespla").removeClass('input-error');
    $("#txtPlanoDespla-error").remove();
    $("#in-keyDesplaC").removeClass('input-error');
    $("#keyDesplaC-error").remove();
    $("#in-txtCifradoDespla").removeClass('input-error');
    $("#txtCifradoDespla-error").remove();
    $("#in-keyDesplaD").removeClass('input-error');
    $("#keyDesplaD-error").remove();
    $("#btn-cifrarDespla").show();
    $("#btn-tipoCiDespla").show();
    $("#btn-cancelarCifrarDespla").hide();
    $("#btn-descifrarDespla").show();
    $("#btn-tipoDeDespla").show();
    $("#btn-cancelarDescifrarDespla").hide();
}

function pararAnimacionDespla(){
	ic=999;
	idc=999;
    $("#in-txtPlanoDespla").val("");
    $("#in-txtCifradoDespla").val("");
    $("#in-keyDesplaC").val("");
    $("#in-keyDesplaD").val("");
    $("#btn-copiarTextoDespla").removeAttr("disabled");
    $("#textoPlanoDesplaC").empty();
    $("#textoCifradoDesplaC").empty();
    $("#textoPlanoDesplaD").empty();
    $("#textoCifradoDesplaD").empty();
    $("#palabraDesplaC").empty();
	$("#palabraDesplaD").empty();
	$("#palabraCifradaDesplaC").empty();
	$("#palabraDescifradaDesplaD").empty();
	$("#infoAnimacionCiDespla").hide();
	$("#infoAnimacionDeDespla").hide();
	$("#in-txtPlanoDespla").removeClass('input-error');
    $("#txtPlanoDespla-error").remove();
    $("#in-keyDesplaC").removeClass('input-error');
    $("#keyDesplaC-error").remove();
    $("#in-txtCifradoDespla").removeClass('input-error');
    $("#txtCifradoDespla-error").remove();
    $("#in-keyDesplaD").parent().parent().removeClass('input-error');
    $("#keyDesplaD-error").remove();
    $("#btn-cifrarDespla").show();
    $("#btn-tipoCiDespla").show();
    $("#btn-cancelarCifrarDespla").hide();
    $("#btn-descifrarDespla").show();
    $("#btn-tipoDeDespla").show();
    $("#btn-cancelarDescifrarDespla").hide();
}

function validarEntradaCifradoDespla(){
    var mensaje = "";
    var texto = $('#in-txtPlanoDespla').val().replace(/ /g,"");
	if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_1;
    } else if (!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_2;
    }
    return mensaje;
}

function validarEntradaCifradoDesplaLlave(){
    var mensaje = "";
    var clave = $('#in-keyDesplaC').val();
    if (Number(clave)<0 || Number(clave)>26 || clave.length == 0 || clave.indexOf(".") >= 0){
        mensaje = mensaje_18;
    }
    return mensaje;
}

function validarEntradaDescifradoDespla(){
    var mensaje = "";
    var texto = $('#in-txtCifradoDespla').val();
    if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_3;
    }
    else if(texto.indexOf(' ') >= 0){
        mensaje = mensaje_4;
    }
    else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_5;
    }
    return mensaje;
}

function validarEntradaDescifradoDesplaLlave(){
    var mensaje = "";
    var clave = $('#in-keyDesplaD').val();
    if (Number(clave)<0 || Number(clave)>26 || clave.length == 0 || clave.indexOf(".") >= 0){
        mensaje = mensaje_18;
    }
    return mensaje;
}

function validarEntradaCifradoArchivoDesplaLlave(){
    var mensaje = "";
    var clave = $('#llaveDesplaCifrado').val();
    if(Number(clave<0) || clave>26 || clave.length == 0 || clave.indexOf(".") >= 0){
        mensaje = mensaje_94;
    }
    return mensaje;
}

function validarEntradaDescifradoArchivoDesplaLlave(){
    var mensaje = "";
    var clave = $('#llaveDesplaDescifrado').val();
    if(Number(clave<0 || clave>26 || clave.length == 0 || clave.indexOf(".") >= 0)){
        mensaje = mensaje_94;
    }
    return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelDespla").click(function(){
		mostrarPanelDespla();
	});
	$("#btn-cerrarPanelDespla").click(function(){
		pararAnimacionDespla();
		cerrarPanelDespla();
	});
	$("#btn-teoriaDespla").click(function(){
		pararAnimacionDespla();
	});
	$("#btn-fundamentosDespla").click(function(){
		pararAnimacionDespla();
	});
	$("#btn-animacionCifradoDespla").click(function(){
		//pararAnimacionDespla();
	});
	$("#btn-animacionDesifradoDespla").click(function(){
		//pararAnimacionDespla();
	});
	$("#btn-cancelarCifrarDespla").click(function(){
        pararAnimacionDespla();
    });
    $("#btn-cancelarDescifrarDespla").click(function(){
        pararAnimacionDespla();
    });
    $("#tipoCiDespla1").click(function(){
        $("#btn-cifrarDespla").html('Cifrado Rápido');
        tCAdd=200;
        tCRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoCiDespla2").click(function(){
        $("#btn-cifrarDespla").html('Cifrado Normal');
        tCAdd=600;
        tCRemove=200;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoCiDespla3").click(function(){
        $("#btn-cifrarDespla").html('Cifrado Lento');
        tCAdd=1600;
        tCRemove=200;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });
    $("#tipoDeDespla1").click(function(){
        $("#btn-descifrarDespla").html('Descifrado Rápido');
        tDcAdd=200;
        tDcRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoDeDespla2").click(function(){
        $("#btn-descifrarDespla").html('Descifrado Normal');
        tDcAdd=600;
        tDcRemove=200;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoDeDespla3").click(function(){
        $("#btn-descifrarDespla").html('Descifrado Lento');
        tDcAdd=1600;
        tDcRemove=200;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });

    $("#in-txtPlanoDespla").keyup(function(){
        $("#in-txtPlanoDespla").removeClass('input-error');
        $("#txtPlanoDespla-error").remove();
        if ($("#in-txtPlanoDespla").val()=='') {
            $("#in-txtPlanoDespla").removeClass('input-error');
            $("#txtPlanoDespla-error").remove();
        } else{
            var mensaje = validarEntradaCifradoDespla();
            if (mensaje.length == 0){
                $("#in-txtPlanoDespla").removeClass('input-error');
                $("#txtPlanoDespla-error").remove();
            } else {
                $("#in-txtPlanoDespla").addClass('input-error');
                $("#in-txtPlanoDespla").parent().parent().append('<div id="txtPlanoDespla-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-keyDesplaC").on('click change keyup', function() {
        $("#in-keyDesplaC").removeClass('input-error');
        $("#keyDesplaC-error").remove();
        if ($("#in-keyDesplaC").val()=='') {
            $("#in-keyDesplaC").removeClass('input-error');
            $("#keyDesplaC-error").remove();
        } else{
            var mensaje = validarEntradaCifradoDesplaLlave();
            if (mensaje.length == 0){
                $("#in-keyDesplaC").removeClass('input-error');
                $("#keyDesplaC-error").remove();
            } else {
                $("#in-keyDesplaC").addClass('input-error');
                $("#in-keyDesplaC").parent().parent().append('<div id="keyDesplaC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-txtCifradoDespla").keyup(function(){
        $("#in-txtCifradoDespla").removeClass('input-error');
        $("#txtCifradoDespla-error").remove();
        if ($("#in-txtCifradoDespla").val()=='') {
            $("#in-txtCifradoDespla").removeClass('input-error');
            $("#txtCifradoDespla-error").remove();
        } else{
            var mensaje = validarEntradaDescifradoDespla();
            if (mensaje.length == 0){
                $("#in-txtCifradoDespla").removeClass('input-error');
                $("#txtCifradoDespla-error").remove();
            } else {
                $("#in-txtCifradoDespla").addClass('input-error');
                $("#in-txtCifradoDespla").parent().parent().append('<div id="txtCifradoDespla-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-keyDesplaD").on('click change keyup', function() {
        $("#in-keyDesplaD").removeClass('input-error');
        $("#keyDesplaD-error").remove();
        if ($("#in-keyDesplaD").val()=='') {
            $("#in-keyDesplaD").removeClass('input-error');
            $("#keyDesplaD-error").remove();
        } else{
            var mensaje = validarEntradaDescifradoDesplaLlave();
            if (mensaje.length == 0){
                $("#in-keyDesplaD").removeClass('input-error');
                $("#keyDesplaD-error").remove();
            } else {
                $("#in-keyDesplaD").addClass('input-error');
                $("#in-keyDesplaD").parent().parent().append('<div id="keyDesplaD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

	$("#btn-cifrarDespla").click(function(){
		$("#in-txtPlanoDespla").removeClass('input-error');
        $("#txtPlanoDespla-error").remove();
        $("#in-keyDesplaC").removeClass('input-error');
        $("#keyDesplaC-error").remove();
		$("#out-txtCifradoDespla").val("");
		var mensaje = validarEntradaCifradoDespla();
		var llave = validarEntradaCifradoDesplaLlave();
		if ($("#in-txtPlanoDespla").val()!='' && $("#in-keyDesplaC").val()!='' && mensaje.length == 0 && llave.length == 0){
			$("#palabraDesplaC").empty();
			$("#palabraCifradaDesplaC").empty();
			$("#infoAnimacionCiDespla").hide();
			$("#infoCiDespla").html('');
			$("#btn-cifrarDespla").hide();
            $("#btn-tipoCiDespla").hide();
            $("#btn-cancelarCifrarDespla").show();
            $("#textoPlanoDesplaC").empty();
            $("#textoCifradoDesplaC").empty();
			cifrarDespla();
		} else{
			if (mensaje.length != 0) {
                $("#in-txtPlanoDespla").addClass('input-error');
                $("#in-txtPlanoDespla").parent().parent().append('<div id="txtPlanoDespla-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
            if (llave.length != 0) {
                $("#in-keyDesplaC").parent().parent().append('<div id="keyDesplaC-error" class="text-danger">&nbsp;'+llave+'</div>');
                $("#in-keyDesplaC").addClass('input-error');
            }
		}
	});

	$("#btn-copiarTextoDespla").click(function(){
		if ($("#out-txtCifradoDespla").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-txtCifradoDespla").val($("#out-txtCifradoDespla").val());
			$("#in-keyDesplaD").val($("#in-keyDesplaC").val());
		}
	});

	$("#btn-descifrarDespla").click(function(){
		$("#in-txtCifradoDespla").removeClass('input-error');
        $("#txtCifradoDespla-error").remove();
        $("#in-keyDesplaD").removeClass('input-error');
        $("#keyDesplaD-error").remove();
		$("#out-txtPlanoDespla").val("");
		var mensaje = validarEntradaDescifradoDespla();
		var llave = validarEntradaDescifradoDesplaLlave();
		if ($("#in-txtCifradoDespla").val()!='' && $("#in-keyDesplaD").val()!='' && mensaje.length == 0 && llave.length == 0){
			$("#palabraDesplaD").empty();
			$("#palabraDescifradaDesplaD").empty();
			$("#btn-copiarTextoDespla").attr("disabled","disabled");
			$("#infoAnimacionDeDespla").hide();
			$("#infoDeDespla").html('');
			$("#btn-descifrarDespla").hide();
            $("#btn-tipoDeDespla").hide();
            $("#btn-cancelarDescifrarDespla").show();
            $("#textoPlanoDesplaD").empty();
            $("#textoCifradoDesplaD").empty();
			descifrarDespla();
		} else{
			if (mensaje.length != 0) {
                $("#in-txtCifradoDespla").addClass('input-error');
                $("#in-txtCifradoDespla").parent().parent().append('<div id="txtCifradoDespla-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
            if (llave.length != 0) {
                $("#in-keyDesplaD").addClass('input-error');
                $("#in-keyDesplaD").parent().parent().append('<div id="keyDesplaD-error" class="text-danger">&nbsp;'+llave+'</div>');
            }
		}
	});

    $("#llaveDesplaCifrado").on('click change keyup', function() {
        $("#llaveDesplaCifrado").removeClass('input-error');
        $("#llaveDesplaCifrado-error").remove();
        if ($("#llaveDesplaCifrado").val()=='') {
            $("#llaveDesplaCifrado").removeClass('input-error');
            $("#llaveDesplaCifrado-error").remove();
        } else{
            var error = validarEntradaCifradoArchivoDesplaLlave();
            $('#llaveDesplaCifrado').removeClass('input-error').next().remove();
            if (error!=""){
                $('#llaveDesplaCifrado').addClass('input-error').after('<div id="llaveDesplaCifrado-error" class="text-danger">'+error+'</div>');
            }
        }
    });

    $("#llaveDesplaDescifrado").on('click change keyup', function() {
        $("#llaveDesplaDescifrado").removeClass('input-error');
        $("#llaveDesplaDescifrado-error").remove();
        if ($("#llaveDesplaDescifrado").val()=='') {
            $("#llaveDesplaDescifrado").removeClass('input-error');
            $("#llaveDesplaDescifrado-error").remove();
        } else{
            var error = validarEntradaDescifradoArchivoDesplaLlave();
            $('#llaveDesplaDescifrado').removeClass('input-error').next().remove();
            if (error!=""){
                $('#llaveDesplaDescifrado').addClass('input-error').after('<div id="llaveDesplaDescifrado-error" class="text-danger">'+error+'</div>');
            }
        }
    });
	    
});

async function cifrarDespla(){
    crearPanelDesplaCifrado();
    var plano = ($("#in-txtPlanoDespla").val().toUpperCase()).split("");
    var desplazamiento = parseInt($("#in-keyDesplaC").val())%26;
    var cifrado = [];
    var cadenaCifrado;
    ic = 0;
    for (var i = 0; i <= plano.length-1; i++) {
        if(plano[i] == ' ') {
           plano.splice(i, 1);
        }
    }
    $("#infoAnimacionCiDespla").fadeIn();
    await sleepDesplazamiento(tCAdd);
    for (var m = 0; m <= plano.length-1; m++) {
        $("#palabraDesplaC").append('<label id="palabra'+m+'C" class="circulo">'+plano[m].toLowerCase()+'</label>');
    }
    for (var n = 0; n <= plano.length-1; n++) {
        $("#palabraCifradaDesplaC").append('<label id="palabraCifrado'+n+'C" class="circulo">&nbsp;</label>');
    }
    while (ic <= plano.length-1) {
        if (abc.indexOf(plano[ic])+desplazamiento <= 27){
            cifrado[ic] = abc[abc.indexOf(plano[ic])+desplazamiento];
            numeroElementoPlano = abc.indexOf(plano[ic]);
            numeroElementoCifrado = abc.indexOf(plano[ic])+desplazamiento;
        } else {
            cifrado[ic] = abc[(abc.indexOf(plano[ic])+desplazamiento)-27];
            numeroElementoPlano = abc.indexOf(plano[ic]);
            numeroElementoCifrado = (abc.indexOf(plano[ic])+desplazamiento)-27;
        }
        $("#palabraCifrado"+ic+"C").html(cifrado[ic]).show();
        
        // ANIMATION
        $("#infoCiDespla").html('<br><i>'+cifrado[ic]+'</i><strong> es la letra </strong><i>'+plano[ic].toLowerCase()+'</i><strong> recorrida </strong><i>'+desplazamiento+'</i><strong> posiciones</strong>');
        $("#palabra"+ic+"C").addClass(parpadeo);
        $("#abcPlano"+numeroElementoPlano+"C").addClass(parpadeo);
        $("#abcCifrado"+numeroElementoCifrado+"C").addClass(parpadeoNext);
        $("#palabraCifrado"+ic+"C").addClass(parpadeoNext);
        await sleepDesplazamiento(tCAdd);
        $("#palabra"+ic+"C").removeClass(parpadeo);
        $("#abcPlano"+numeroElementoPlano+"C").removeClass(parpadeo);
        $("#abcCifrado"+numeroElementoCifrado+"C").removeClass(parpadeoNext);
        $("#palabraCifrado"+ic+"C").removeClass(parpadeoNext);
        await sleepDesplazamiento(tCRemove);
        // END ANIMATION
        ic++;
    }
    if (ic <= plano.length && ic!=999) {
        cadenaCifrado = cifrado.join("");
        $("#out-txtCifradoDespla").val(cadenaCifrado);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        $("#btn-cifrarDespla").show();
        $("#btn-tipoCiDespla").show();
        $("#btn-cancelarCifrarDespla").hide();
    }
}

async function descifrarDespla(){
    crearPanelDesplaDescifrado();
    var cifrado = ($("#in-txtCifradoDespla").val().toUpperCase()).split("");
    var desplazamiento = parseInt($("#in-keyDesplaD").val())%26;
    var plano = [];
    var cadenaDescifrado;
    for (var i = 0; i <= cifrado.length-1; i++) {
        if(cifrado[i] == ' ') {
           cifrado.splice(i, 1);
        }
    }
    idc = 0;
    $("#infoAnimacionDeDespla").fadeIn();
    await sleepDesplazamiento(tDcAdd);
    for (var m = 0; m <= cifrado.length-1; m++) {
        $("#palabraDesplaD").append('<label id="palabra'+m+'D" class="circulo">'+cifrado[m]+'</label>');
    }
    for (var n = 0; n <= cifrado.length-1; n++) {
        $("#palabraDescifradaDesplaD").append('<label id="palabraDescifrado'+n+'D" class="circulo">&nbsp;</label>');
    }
    while (idc <= cifrado.length-1) {
        if (abc.indexOf(cifrado[idc])-desplazamiento >= 1){
            plano[idc] = abc[abc.indexOf(cifrado[idc])-desplazamiento];
            numeroElementoCifrado = abc.indexOf(cifrado[idc]);
            numeroElementoPlano = abc.indexOf(cifrado[idc])-desplazamiento;
        } else {
            plano[idc] = abc[(abc.indexOf(cifrado[idc])-desplazamiento)+27];
            numeroElementoCifrado = abc.indexOf(cifrado[idc]);
            numeroElementoPlano = (abc.indexOf(cifrado[idc])-desplazamiento)+27;
        }
        $("#palabraDescifrado"+idc+"D").html(plano[idc].toLowerCase()).show();
        
        // ANIMATION
        $("#infoDeDespla").html('<br><i>'+plano[idc].toLowerCase()+'</i><strong> es la letra </strong><i>'+cifrado[idc]+'</i><strong> recorrida </strong><i>'+desplazamiento+'</i><strong> posiciones</strong>');
        $("#palabra"+idc+"D").addClass(parpadeo);
        $("#abcCifrado"+numeroElementoCifrado+"D").addClass(parpadeo);
        $("#abcPlano"+numeroElementoPlano+"D").addClass(parpadeoNext);
        $("#palabraDescifrado"+idc+"D").addClass(parpadeoNext);
        await sleepDesplazamiento(tDcAdd);
        $("#palabra"+idc+"D").removeClass(parpadeo);
        $("#abcCifrado"+numeroElementoCifrado+"D").removeClass(parpadeo);
        $("#abcPlano"+numeroElementoPlano+"D").removeClass(parpadeoNext);
        $("#palabraDescifrado"+idc+"D").removeClass(parpadeoNext);
        await sleepDesplazamiento(tDcRemove);
        // END ANIMATION
        idc++;
    }
    if (idc <= cifrado.length && idc!=999) {
        cadenaDescifrado = plano.join("");
        $("#out-txtPlanoDespla").val(cadenaDescifrado.toLowerCase());
        $("#btn-copiarTextoDespla").removeAttr("disabled");
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        $("#btn-descifrarDespla").show();
        $("#btn-tipoDeDespla").show();
        $("#btn-cancelarDescifrarDespla").hide();
    }
}

function cifrarArchivoDespla(evt) {
    var fileInput = document.getElementById('fileInputDesplaCifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaDesplaCifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarDesplaCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    var abc = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var desplazamiento = parseInt($("#llaveDesplaCifrado").val())%27;

    var error = validarEntradaCifradoArchivoDesplaLlave();
    $('#llaveDesplaCifrado').removeClass('input-error').next().remove();

    if (error==""){
        if(fileInput.files.length == 0){
            $('#fileDisplayAreaDesplaCifrado').html(mensaje_92);
            return;
        }
        if(typeof file!=='undefined'){
            if(file.size <= 1024*100) {
                if (file.type.match(textType)){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        textoPlano= reader.result;                                      
                        textoPlano= textoPlano.toUpperCase();

                        for(i = 0; i < textoPlano.length; i++){
                            if (abc.indexOf(textoPlano.charAt(i))>0){
                                if(abc.indexOf(textoPlano.charAt(i))+desplazamiento <= 27){
                                    textoCifrado = textoCifrado + abc[abc.indexOf(textoPlano.charAt(i))+desplazamiento];
                                } else {
                                    textoCifrado = textoCifrado + abc[(abc.indexOf(textoPlano.charAt(i))+desplazamiento)-27];
                                }
                            }
                            //$("#progressbarDesplaCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
                        }
                        fileDisplayArea.innerText= textoCifrado;
                        textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
                        
                        //PARA DESCARGAR
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
                        element.setAttribute('download', "ArchivoCifradoDESPLAZAMIENTO.txt");
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        $("#progressbarDesplaCifrado").css('width','100%').attr('aria-valuenow', '100');
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
        $('#llaveDesplaCifrado').addClass('input-error').after('<div id="llaveDesplaCifrado-error" class="text-danger">'+error+'</div>');
    }
}

function descifrarArchivoDespla(evt) {
    var fileInput = document.getElementById('fileInputDesplaDescifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaDesplaDescifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoCifrado = "";
    var textoPlano = "";
    $("#progressbarDesplaDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');

    var abc = ["","A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var desplazamiento = parseInt($("#llaveDesplaDescifrado").val())%27;

    var error = validarEntradaDescifradoArchivoDesplaLlave();
    $('#llaveDesplaDescifrado').removeClass('input-error').next().remove();
    
    if (error==""){
        if(fileInput.files.length == 0){
            $('#fileDisplayAreaDesplaDescifrado').html(mensaje_93);
            return;
        }
        if(typeof file!=='undefined'){
            if(file.size <= 1024*100) {
                if (file.type.match(textType)){
                    var reader = new FileReader();
                    reader.onload = function(e){
                        textoCifrado= reader.result;                                        
                        textoCifrado= textoCifrado.toUpperCase();
                        
                        for(i = 0; i < textoCifrado.length; i++){
                            if (abc.indexOf(textoCifrado.charAt(i))>0){
                                if(abc.indexOf(textoCifrado.charAt(i))-desplazamiento >= 1){
                                    textoPlano = textoPlano + abc[abc.indexOf(textoCifrado.charAt(i))-desplazamiento].toLowerCase();
                                } else {
                                    textoPlano = textoPlano + abc[(abc.indexOf(textoCifrado.charAt(i))-desplazamiento)+27].toLowerCase();
                                }
                            }
                            //$("#progressbarDesplaDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
                        }
                        fileDisplayArea.innerText= textoPlano;
                        textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
                        
                        //PARA DESCARGAR
                        var element = document.createElement('a');
                        element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
                        element.setAttribute('download', "ArchivoDescifradoDESPLAZAMIENTO.txt");
                        element.style.display = 'none';
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                        $("#progressbarDesplaDescifrado").css('width','100%').attr('aria-valuenow', '100');                  
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
        $('#llaveDesplaDescifrado').addClass('input-error').after('<div id="llaveDesplaDescifrado-error" class="text-danger">'+error+'</div>');
    }
}