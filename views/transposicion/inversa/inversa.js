function sleepInversa(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=600, tDcAdd=600;
var tCRemove=200, tDcRemove=200;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

function mostrarPanelInversa(){
	$("#pnl-InteractivoInversa").slideToggle(1000);
    $("#panel-fundamentos").css('top','112px');
	$("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelInversa(){
	$("#pnl-InteractivoInversa").slideToggle(1000);
    $("#panel-fundamentos").css('top','80px');
	$("#contenidoPagina").slideToggle(1000);
	limpiaPanelInversa();
    pararAnimacionInversa();
}

function limpiaPanelInversa(){
    tCAdd=600;
    tCRemove=200;
    tDcAdd=600;
    tDcRemove=200;
    parpadeo='parpadeo2N';
    parpadeoNext='parpadeoNext2N';
    $("#btn-cifrarInversa").html('Cifrado Normal');
    $("#btn-descifrarInversa").html('Descifrado Normal');
	$("#textoPlanoInversaC").empty();
	$("#textoCifradoInversaC").empty();
	$("#textoPlanoInversaD").empty();
	$("#textoCifradoInversaD").empty();
	$("#in-txtPlanoInversa").val("");
	$("#out-txtCifradoInversa").val("");
	$("#in-txtCifradoInversa").val("");
	$("#out-txtPlanoInversa").val("");
	$("#txtPlanoInversa-error").remove();
    $("#in-txtPlanoInversa").removeClass('input-error');
    $("#in-txtCifradoInversa").removeClass('input-error');
    $("#txtCifradoInversa-error").remove();
    $("#btn-cifrarInversa").show();
    $("#btn-tipoCiInversa").show();
    $("#btn-cancelarCifrarInversa").hide();
    $("#btn-descifrarInversa").show();
    $("#btn-tipoDeInversa").show();
    $("#btn-cancelarDescifrarInversa").hide();
}

function pararAnimacionInversa(){
	ic=999;
	idc=999;
    $("#in-txtPlanoInversa").val("");
    $("#in-txtCifradoInversa").val("");
    $("#btn-copiarTextoInversa").removeAttr("disabled");
    $("#textoPlanoInversaD").empty();
	$("#textoCifradoInversaD").empty();
	$("#textoPlanoInversaC").empty();
	$("#textoCifradoInversaC").empty();
	$("#infoAnimacionCiInversa").hide();
	$("#infoAnimacionDeInversa").hide();
	$("#txtPlanoInversa-error").remove();
    $("#in-txtPlanoInversa").removeClass('input-error');
    $("#in-txtCifradoInversa").removeClass('input-error');
    $("#txtCifradoInversa-error").remove();
    $("#btn-cifrarInversa").show();
    $("#btn-tipoCiInversa").show();
    $("#btn-cancelarCifrarInversa").hide();
    $("#btn-descifrarInversa").show();
    $("#btn-tipoDeInversa").show();
    $("#btn-cancelarDescifrarInversa").hide();
}

function validarEntradaCifradoInversa(){
    var mensaje = "";
    var texto = $('#in-txtPlanoInversa').val().replace(/ /g,"");
    if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_1;
    } else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_2;
    }
    return mensaje;
}

function validarEntradaDescifradoInversa(){
    var mensaje = "";
    var texto = $('#in-txtCifradoInversa').val();
   if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_3;
    }
    else if(texto.indexOf(' ') >= 0){
        mensaje = mensaje_4;
    }
    else if (!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_5;
    }
    return mensaje;
}

$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip(); 
	
	$("#btn-mostrarPanelInversa").click(function(){
		mostrarPanelInversa();
	});
	$("#btn-cerrarPanelInversa").click(function(){
		pararAnimacionInversa();
		cerrarPanelInversa();
	});
	$("#btn-teoriaInversa").click(function(){
		pararAnimacionInversa();
	});
	$("#btn-fundamentosMatematicosInversa").click(function(){
		pararAnimacionInversa();
	});
	$("#btn-cifrarAnimacionInversa").click(function(){
		//pararAnimacionInversa();
	});
	$("#btn-descifrarAnimacionInversa").click(function(){
		//pararAnimacionInversa();
	});
	$("#btn-cancelarCifrarInversa").click(function(){
        pararAnimacionInversa();
    });
    $("#btn-cancelarDescifrarInversa").click(function(){
        pararAnimacionInversa();
    });
    $("#tipoCiInversa1").click(function(){
        $("#btn-cifrarInversa").html('Cifrado Rápido');
        tCAdd=200;
        tCRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoCiInversa2").click(function(){
        $("#btn-cifrarInversa").html('Cifrado Normal');
        tCAdd=600;
        tCRemove=200;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoCiInversa3").click(function(){
        $("#btn-cifrarInversa").html('Cifrado Lento');
        tCAdd=1600;
        tCRemove=200;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });
    $("#tipoDeInversa1").click(function(){
        $("#btn-descifrarInversa").html('Descifrado Rápido');
        tDcAdd=200;
        tDcRemove=75;
        parpadeo='parpadeo1R';
        parpadeoNext='parpadeoNext1R';
    });
    $("#tipoDeInversa2").click(function(){
        $("#btn-descifrarInversa").html('Descifrado Normal');
        tDcAdd=600;
        tDcRemove=200;
        parpadeo='parpadeo2N';
        parpadeoNext='parpadeoNext2N';
    });
    $("#tipoDeInversa3").click(function(){
        $("#btn-descifrarInversa").html('Descifrado Lento');
        tDcAdd=1600;
        tDcRemove=200;
        parpadeo='parpadeo3L';
        parpadeoNext='parpadeoNext3L';
    });

    $("#in-txtPlanoInversa").keyup(function(){
        $("#in-txtPlanoInversa").removeClass('input-error');
        $("#txtPlanoInversa-error").remove();
        if ($("#in-txtPlanoInversa").val()=='') {
            $("#in-txtPlanoInversa").removeClass('input-error');
            $("#txtPlanoInversa-error").remove();
        } else{
            var mensaje = validarEntradaCifradoInversa();
            if (mensaje.length == 0){
                $("#in-txtPlanoInversa").removeClass('input-error');
                $("#txtPlanoInversa-error").remove();
            } else {
                $("#in-txtPlanoInversa").addClass('input-error');
                $("#in-txtPlanoInversa").parent().parent().append('<div id="txtPlanoInversa-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

    $("#in-txtCifradoInversa").keyup(function(){
        $("#in-txtCifradoInversa").removeClass('input-error');
        $("#txtCifradoInversa-error").remove();
        if ($("#in-txtCifradoInversa").val()=='') {
            $("#in-txtCifradoInversa").removeClass('input-error');
            $("#txtCifradoInversa-error").remove();
        } else{
            var mensaje = validarEntradaDescifradoInversa();
            if (mensaje.length == 0){
                $("#in-txtCifradoInversa").removeClass('input-error');
                $("#txtCifradoInversa-error").remove();
            } else {
                $("#in-txtCifradoInversa").addClass('input-error');
                $("#in-txtCifradoInversa").parent().parent().append('<div id="txtCifradoInversa-error" class="text-danger">&nbsp;'+mensaje+'</div>');
            }
        }
    });

	$("#btn-cifrarInversa").click(function(){
		$("#in-txtPlanoInversa").removeClass('input-error');
        $("#txtPlanoInversa-error").remove();
		$("#out-txtCifradoInversa").val("");
		var mensaje = validarEntradaCifradoInversa();
		if ($("#in-txtPlanoInversa").val()!='' && mensaje.length == 0){
			$("#textoPlanoInversaC").empty();
			$("#textoCifradoInversaC").empty();
			$("#infoAnimacionCiInversa").hide();
			$("#btn-cifrarInversa").hide();
            $("#btn-tipoCiInversa").hide();
            $("#btn-cancelarCifrarInversa").show();
			cifrarInversa();
		} else{
            $("#in-txtPlanoInversa").addClass('input-error');
            $("#in-txtPlanoInversa").parent().parent().append('<div id="txtPlanoInversa-error" class="text-danger">&nbsp;'+mensaje+'</div>');
        }
	});

	$("#btn-copiarTextoInversa").click(function(){
		if ($("#out-txtCifradoInversa").val()==''){
			toastr.options.timeOut = "1500";
			toastr.options.closeButton = true;
			toastr['info'](mensaje_6);
		} else {
			$("#in-txtCifradoInversa").val($("#out-txtCifradoInversa").val());
		}
	});

	$("#btn-descifrarInversa").click(function(){
		$("#in-txtCifradoInversa").removeClass('input-error');
        $("#txtCifradoInversa-error").remove();
		$("#out-txtPlanoInversa").val("");
		var mensaje = validarEntradaDescifradoInversa();
		if ($("#in-txtCifradoInversa").val()!='' && mensaje.length == 0){
			$("#btn-copiarTextoInversa").attr("disabled","disabled");
			$("#textoPlanoInversaD").empty();
			$("#textoCifradoInversaD").empty();
			$("#infoAnimacionDeInversa").hide();
			$("#btn-descifrarInversa").hide();
            $("#btn-tipoDeInversa").hide();
            $("#btn-cancelarDescifrarInversa").show();
			descifrarInversa();
		} else{
            $("#in-txtCifradoInversa").addClass('input-error');
            $("#in-txtCifradoInversa").parent().parent().append('<div id="txtCifradoInversa-error" class="text-danger">&nbsp;'+mensaje+'</div>');
        }
	});
	    
});

async function cifrarInversa(){
    var plano = ($("#in-txtPlanoInversa").val().toUpperCase()).split("");
    var cifrado = [];
    var cadenaCifrado;
    var numeroInverso;
    ic = 0;
    for (var i = 0; i <= plano.length-1; i++) {
        if(plano[i] == ' ') {
           plano.splice(i, 1);
        }
    }
    numeroInverso = plano.length-1;
    $("#infoAnimacionCiInversa").fadeIn();
    await sleepInversa(tCAdd);
    for (ic = 0; ic <= plano.length-1; ic++) {
        $("#textoPlanoInversaC").append('<label id="abcPlano'+numeroInverso+'C" class="circulo">'+plano[ic].toLowerCase()+'</label>');
        numeroInverso = numeroInverso - 1;
    }
    // ANIMATION
    $("#textoPlanoInversaC").addClass(parpadeo);
    await sleepInversa(tCAdd);
    $("#textoPlanoInversaC").removeClass(parpadeo);
    await sleepInversa(tCRemove);
    // END ANIMATION
    ic = 0;
    cifrado = plano.reverse();
    for (ic = 0; ic <= cifrado.length-1; ic++) {
        $("#textoCifradoInversaC").append('<label id="abcCifrado'+ic+'C" class="circulo" style="display:none">'+cifrado[ic]+'</label>');
    }
    ic = 0;
    while (ic <= plano.length-1) {
        $("#abcCifrado"+ic+"C").show();
        
        // ANIMATION
        $("#abcPlano"+ic+"C").addClass(parpadeo);
        $("#abcCifrado"+ic+"C").addClass(parpadeo);
        await sleepInversa(tCAdd);
        $("#abcPlano"+ic+"C").removeClass(parpadeo);
        $("#abcCifrado"+ic+"C").removeClass(parpadeo);
        await sleepInversa(tCRemove);
        // END ANIMATION
        ic++;
    }
    if (ic <= plano.length && ic!=999) {
        cadenaCifrado = cifrado.join("");
        $("#out-txtCifradoInversa").val(cadenaCifrado);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        $("#btn-cifrarInversa").show();
        $("#btn-tipoCiInversa").show();
        $("#btn-cancelarCifrarInversa").hide();
    }
}

async function descifrarInversa(){
    var cifrado = ($("#in-txtCifradoInversa").val().toUpperCase()).split("");
    var plano = [];
    var cadenaDescifrado;
    var numeroInverso;
    idc = 0;
    for (var i = 0; i <= cifrado.length-1; i++) {
        if(cifrado[i] == ' ') {
           cifrado.splice(i, 1);
        }
    }
    numeroInverso = cifrado.length-1;
    $("#infoAnimacionDeInversa").fadeIn();
    await sleepInversa(tDcAdd);
    for (idc = 0; idc <= cifrado.length-1; idc++) {
        $("#textoCifradoInversaD").append('<label id="abcCifrado'+numeroInverso+'D" class="circulo">'+cifrado[idc]+'</label>');
        numeroInverso = numeroInverso - 1;
    }
    // ANIMATION
    $("#textoCifradoInversaD").addClass(parpadeo);
    await sleepInversa(tDcAdd);
    $("#textoCifradoInversaD").removeClass(parpadeo);
    await sleepInversa(tDcRemove);
    // END ANIMATION
    idc = 0;
    plano = cifrado.reverse();
    for (idc = 0; idc <= plano.length-1; idc++) {
        $("#textoPlanoInversaD").append('<label id="abcPlano'+idc+'D" class="circulo" style="display:none">'+plano[idc].toLowerCase()+'</label>');
    }
    idc = 0;
    while (idc <= cifrado.length-1) {
        $("#abcPlano"+idc+"D").show();
        
        // ANIMATION
        $("#abcCifrado"+idc+"D").addClass(parpadeo);
        $("#abcPlano"+idc+"D").addClass(parpadeo);
        await sleepInversa(tDcAdd);
        $("#abcCifrado"+idc+"D").removeClass(parpadeo);
        $("#abcPlano"+idc+"D").removeClass(parpadeo);
        await sleepInversa(tDcRemove);
        // END ANIMATION
        idc++;
    }
    if (idc <= cifrado.length && idc!=999) {
        cadenaDecifrado = plano.join("");
        $("#out-txtPlanoInversa").val(cadenaDecifrado.toLowerCase());
        $("#btn-copiarTextoInversa").removeAttr("disabled");
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        $("#btn-descifrarInversa").show();
        $("#btn-tipoDeInversa").show();
        $("#btn-cancelarDescifrarInversa").hide();
    }
}

function cifrarArchivoInversa(evt) {
    var fileInput = document.getElementById('fileInputInversaCifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaInversaCifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarInversaCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    if(typeof file!=='undefined'){
        if(file.size <= 1024*100) {
            if (file.type.match(textType)){
                var reader = new FileReader();
                reader.onload = function(e){
                    textoPlano= reader.result;                                      
                    textoPlano= textoPlano.toUpperCase();

                    textoCifrado = textoPlano.split("").reverse().join("")/*.replace(/[^a-zA-ZñÑ]/g, '')*/;

                    fileDisplayArea.innerText= textoCifrado;
                    textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
                    
                    //PARA DESCARGAR
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
                    element.setAttribute('download', "ArchivoCifradoINVERSA.txt");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    $("#progressbarInversaCifrado").css('width','100%').attr('aria-valuenow', '100');
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

function descifrarArchivoInversa(evt) {
    var fileInput = document.getElementById('fileInputInversaDescifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaInversaDescifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;            
    var textoCifrado = "";
    var textoPlano = "";
    $("#progressbarInversaDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');

    if(typeof file!=='undefined'){
        if(file.size <= 1024*100) {
            if (file.type.match(textType)){
                var reader = new FileReader();
                reader.onload = function(e){
                    textoCifrado= reader.result;                                        
                    textoCifrado= textoCifrado.toUpperCase();

                    textoPlano = textoCifrado.split("").reverse().join("")./*replace(/[^a-zA-ZñÑ]/g, '')*/toLowerCase();
                    
                    fileDisplayArea.innerText= textoPlano;
                    textoPlano= "\ufeff"+textoPlano; //<------------------------------------ PARA QUE SEA utf-8 con bom
                    
                    //PARA DESCARGAR
                    var element = document.createElement('a');
                    element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoPlano));
                    element.setAttribute('download', "ArchivoDescifradoINVERSA.txt");
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                    $("#progressbarInversaDescifrado").css('width','100%').attr('aria-valuenow', '100');                     
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