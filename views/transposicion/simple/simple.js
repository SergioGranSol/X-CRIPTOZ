function sleepSimple(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var cancelado = false;
var velocidad = 1;
var azul = 0, negro = 1;
var alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

$.fn.scrollViewSimple = function () {
  return this.each(function () {
    $('html, body').animate({
      scrollTop: $(this).offset().top
    }, 1000);
  });
}

function mostrarPanelTransposicionSimple(){
    $("#pnl-Interactivo4").slideToggle(1000);
    $("#panel-fundamentos").css('top','112px');
    $("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelTransposicionSimple(){
    cancelado = true;

    
    $("#pnl-Interactivo4").slideToggle(1000);
    $("#panel-fundamentos").css('top','80px');
    $("#contenidoPagina").slideToggle(1000);
    
    limpiaPanelCifradoTransposicionSimple();
    limpiaPanelDescifradoTransposicionSimple();

    $("#btn-cifrarTransposicionSimple").show();
    $("#btn-velocidadCTransposicionSimple").show();
    $("#btn-cancelarCifrarSimple").hide();

    $("#btn-descifrarSimple").show();
    $("#btn-velocidadDTransposicionSimple").show();
    $("#btn-cancelarDescifrarSimple").hide();

    deleteErrorTransposicionSimple("textoPlanoTransposicionSimple");
    deleteErrorTransposicionSimple("textoPlanoCifradoTransposicionSimple");
}

function crearPanelCifradoTransposicionSimple(){
    var criptograma_length = $('#in-textoPlanoTransposicionSimple').val().length;

    for(var i = 0 ; i < criptograma_length ; i++){
        $('#textoCifradoSimple').append('<label class="circulo" id="TS-Ccell1'+i+'"></label>');
    }

    $("#table-transposicionSimple").css("text-align","center");
}

function crearPanelDescifradoTransposicionSimple(){
    var mensaje_claro_length = $('#in-textoPlanoCifradoTransposicionSimple').val().length;

    for(var i = 0 ; i < mensaje_claro_length ; i++){
        $('#textoDescifradoSimple').append('<label class="circulo" id="TS-MCcell1'+i+'"></label>');
    }

    $("#table-transposicionSimple2").css("text-align","center");
}

function limpiaPanelCifradoTransposicionSimple(){
    $("#TSrow1").empty();
    $("#TSrow2").empty();
    $('#textoCifradoSimple').empty();
    $("#in-textoPlanoTransposicionSimple").val("");
    $("#out-textoCifradoTransposicionSimple").val("");

    if($('#TSdiv1').is(':visible')) {
        $("#TSdiv1").slideToggle(500);
    }
}

function limpiaPanelDescifradoTransposicionSimple(){
    $("#TSrow12").empty();
    $("#TSrow22").empty();
    $('#textoDescifradoSimple').empty();
    $("#in-textoPlanoCifradoTransposicionSimple").val("");
    $("#out-textoDescifradoTransposicionSimple").val("");

    if($('#TSdiv2').is(':visible')) {
        $("#TSdiv2").slideToggle(500);
    }
}

async function cifrarTransposicionSimple(){
    var plano = ($("#in-textoPlanoTransposicionSimple").val().toLowerCase().replace(/ /g,"")).split("");
    var cadenaCifrado = "";
    var j = 1, k = 1, l = 0;
    
    limpiaPanelCifradoTransposicionSimple();
    $("#in-textoPlanoTransposicionSimple").val(plano.join(""));

    crearPanelCifradoTransposicionSimple();

    $('#TSdiv1').html('El mensaje claro se reescribe en dos renglones: la primera letra en el primer renglón, la segunda en el segundo renglón, la tercera en el primer renglón, la cuarta en el segundo renglón y así uno y uno hasta acabar con todos los caracteres del mensaje claro.');
    $('#TSdiv1').slideToggle(500);

    if(cancelado){
        return;
    }

    await sleepSimple(8000);
    
    if(cancelado){
        return;
    }

    $('#TSdiv1').scrollViewSimple();

    $("#TSrow1").append('<td id="TSR1-0" class="title-table">R1</td>');
    $("#TSrow2").append('<td id="TSR2-0" class="title-table">R2</td>');

    for (var i = 1; i < 6 && !cancelado ; i++) {
        $("#TSrow1").append('<td id="TSR1-'+i+'"> </td>');
        $("#TSrow2").append('<td id="TSR2-'+i+'"> </td>');
    }

    if(cancelado){
        return;
    }

    for (var i = 0 ; i < plano.length && !cancelado ; i++) {
        if(i%2 == 0){
            $("#TSR1-" + j).html(plano[i]);
            putparpadeo("#TSR1-" + j, 1*velocidad, azul);
            await sleepSimple(1000*velocidad);
            
            removeputparpadeo("#TSR1-" + j, 1*velocidad, azul);

            j++;
        }
        else if(i%2 == 1){
            $("#TSR2-"+ k).html(plano[i]);
            putparpadeo("#TSR2-" + k, 1*velocidad, azul);
            await sleepSimple(1000*velocidad);
            
            removeputparpadeo("#TSR2-" + k, 1*velocidad, azul);

            k++;
        }
    }

    if(cancelado){
        return;
    }

    $('#TSdiv1').slideToggle(500);
    
    if(cancelado){
        return;
    }

    await sleepSimple(1000);

    if(cancelado){
        return;
    }

    $('#TSdiv1').html('Se reescribe el mensaje por renglones: primero R1 seguido de R2.');
    $('#TSdiv1').slideToggle(500);

    if(cancelado){
        return;
    }

    await sleepSimple(4000);
    
    if(cancelado){
        return;
    }

    $('#TSdiv1').scrollViewSimple();

    for (var i = 1 ; i < j && !cancelado ; i++, l++){
        cadenaCifrado = cadenaCifrado + plano[(i-1)*2].toUpperCase();
        
        putparpadeo("#TSR1-" + i, 1*velocidad, azul);
        putparpadeo("#TS-Ccell1"+l, 1*velocidad, negro);
        $("#TS-Ccell1"+l).html(plano[(i-1)*2].toUpperCase());
        await sleepSimple(1000*velocidad);
        
        removeputparpadeo("#TSR1-" + i, 1*velocidad, azul);
        removeputparpadeo("#TS-Ccell1"+l, 1*velocidad, negro);
    }

    for (var i = 1 ; i < k && !cancelado ; i++, l++){
        cadenaCifrado = cadenaCifrado + plano[i*2 - 1].toUpperCase();

        putparpadeo("#TSR2-" + i, 1*velocidad, azul);
        putparpadeo("#TS-Ccell1"+l, 1*velocidad, negro);
        $("#TS-Ccell1"+l).html(plano[i*2 - 1].toUpperCase());
        await sleepSimple(1000*velocidad);
        
        removeputparpadeo("#TSR2-" + i, 1*velocidad, azul);
        removeputparpadeo("#TS-Ccell1"+l, 1*velocidad, negro);
    }

    if(cancelado){
        return;
    }

    $("#out-textoCifradoTransposicionSimple").val(cadenaCifrado);
    $("#btn-velocidadCTransposicionSimple").show();
    $("#btn-cifrarSimple").show();
    $("#btn-cancelarCifrarSimple").hide();

    if(!cancelado){
        $('#TSdiv1').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_7);
        cancelado = true;
    }
}

async function descifrarTransposicionSimple(){
    var cifrado = ($("#in-textoPlanoCifradoTransposicionSimple").val().toUpperCase().replace(/ /g,"")).split("");
    var cadenaDescifrado = "";
    var j = 1, k = 1, l = 0, m = 0;

    limpiaPanelDescifradoTransposicionSimple();
    $("#in-textoPlanoCifradoTransposicionSimple").val(cifrado.join(""));

    crearPanelDescifradoTransposicionSimple();
    
    $('#TSdiv2').html('Se toma la primera mitad del texto cifrado y se coloca en R1, la última mitad se coloca en R2.');
    $('#TSdiv2').slideToggle(500);

    if(cancelado){
        return;
    }

    await sleepSimple(5000);
    
    if(cancelado){
        return;
    }

    $('#TSdiv2').scrollViewSimple();

    $("#TSrow12").append('<td id="TSR1-20" class="title-table">R1</td>');
    $("#TSrow22").append('<td id="TSR2-20" class="title-table">R2</td>');

    for (var i = 1; i < 6 && !cancelado ; i++) {
        $("#TSrow12").append('<td id="TSR1-2'+i+'"> </td>');
        $("#TSrow22").append('<td id="TSR2-2'+i+'"> </td>');
    }

    if(cancelado){
        return;
    }

    for (var i = 0 ; i < cifrado.length && !cancelado ; i++) {
        if(i < Math.round(cifrado.length / 2)){
            $("#TSR1-2"+j).html(cifrado[i]);

            putparpadeo("#TSR1-2"+j, 1*velocidad, azul);
            await sleepSimple(1000*velocidad);

            removeputparpadeo("#TSR1-2"+(j++), 1*velocidad, azul);
        }
        else{
            $("#TSR2-2"+k).html(cifrado[i]);

            putparpadeo("#TSR2-2"+k, 1*velocidad, azul);
            await sleepSimple(1000*velocidad);

            removeputparpadeo("#TSR2-2"+(k++), 1*velocidad, azul);
        }
    }

    if(cancelado){
        return;
    }

    j = 1;
    k = 1;
    
    $('#TSdiv2').slideToggle(500);
    
    if(cancelado){
        return;
    }

    await sleepSimple(1000);

    if(cancelado){
        return;
    }

    $('#TSdiv2').html('El mensaje en claro se conforma tomando uno y uno de los caracteres de cada renglón: la primera letra de R1, luego la primera letra de R2, luego la segunda de R1, luego la segunda de R2 y así sucesivamente.');
    $('#TSdiv2').slideToggle(500);

    if(cancelado){
        return;
    }

    await sleepSimple(8000);
    
    if(cancelado){
        return;
    }

    $('#TSdiv2').scrollViewSimple();

    for (var i = 0 ; i < cifrado.length && !cancelado; i++) {
        if(i%2 == 0){
            cadenaDescifrado = cadenaDescifrado + cifrado[l].toLowerCase();

            putparpadeo("#TSR1-2" + j, 1*velocidad, azul);
            putparpadeo("#TS-MCcell1"+i, 1*velocidad, negro);
            $("#TS-MCcell1"+i).html(cifrado[l].toLowerCase());
            await sleepSimple(1000*velocidad);
            
            removeputparpadeo("#TSR1-2" + j++, 1*velocidad, azul);
            removeputparpadeo("#TS-MCcell1"+i, 1*velocidad, negro);

            l = l + Math.round(cifrado.length/2);
        }
        else if(i%2 == 1){
            cadenaDescifrado = cadenaDescifrado + cifrado[l].toLowerCase();

            putparpadeo("#TSR2-2" + k, 1*velocidad, azul);
            putparpadeo("#TS-MCcell1"+i, 1*velocidad, negro);
            $("#TS-MCcell1"+i).html(cifrado[l].toLowerCase());
            await sleepSimple(1000*velocidad);
            
            removeputparpadeo("#TSR2-2" + k++, 1*velocidad, azul);
            removeputparpadeo("#TS-MCcell1"+i, 1*velocidad, negro);

            l = l - Math.round(cifrado.length/2) + 1;
        }
    }

    if(cancelado){
        return;
    }

    $("#out-textoDescifradoTransposicionSimple").val(cadenaDescifrado);
    $("#btn-velocidadDTransposicionSimple").show();
    $("#btn-descifrarSimple").show();
    $("#btn-cancelarDescifrarSimple").hide();

    if(!cancelado){
        $('#TSdiv2').slideToggle(500);
        toastr.options.timeOut = "1000";
        toastr['success'](mensaje_8);
        cancelado = true;
    }
}

function validarEntradaCifradoTransposicionSimple(){
    var mensaje = "";
    var texto = $('#in-textoPlanoTransposicionSimple').val().replace(/ /g,"");

    if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_1;
    }
    else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_2;
    }

    return mensaje;
}

function validarEntradaDescifradoTransposicionSimple(){
    var mensaje = "";
    var texto = $('#in-textoPlanoCifradoTransposicionSimple').val();

    if(texto.indexOf(' ') >= 0){
        mensaje = mensaje_4;
    }
    else if (texto.length < 1 || texto.length > 10) {
        mensaje = mensaje_3
    }
    else if(!texto.match(/^[a-zA-ZñÑ]+$/)){
        mensaje = mensaje_5;
    }

    return mensaje;
}

function addErrorTransposicionSimple(id, mensaje){
    $("#" + id + "-error").remove();
    $("#in-" + id).parent().parent().append('<div id="' + id + '-error" class="text-danger">&nbsp;'+mensaje+'</div>');
    $("#in-" + id).addClass('input-error');
}

function deleteErrorTransposicionSimple(id){
    $("#" + id + "-error").remove();
    $("#in-" + id).removeClass('input-error');
}

$(document).ready(function(){
    $("#tipoTransposicionSimpleC1").click(function(){
        $("#btn-cifrarSimple").html('Cifrado Rápido');
        $("#btn-cifrarSimple").val(1);
    });
    $("#tipoTransposicionSimpleC2").click(function(){
        $("#btn-cifrarSimple").html('Cifrado Normal');
        $("#btn-cifrarSimple").val(2);
    });
    $("#tipoTransposicionSimpleC3").click(function(){
        $("#btn-cifrarSimple").html('Cifrado Lento&nbsp;');
        $("#btn-cifrarSimple").val(3);
    });

    $("#tipoTransposicionSimpleD1").click(function(){
        $("#btn-descifrarSimple").html('Descifrado Rápido');
        $("#btn-descifrarSimple").val(1);
    });
    $("#tipoTransposicionSimpleD2").click(function(){
        $("#btn-descifrarSimple").html('Descifrado Normal');
        $("#btn-descifrarSimple").val(2);
    });
    $("#tipoTransposicionSimpleD3").click(function(){
        $("#btn-descifrarSimple").html('Descifrado Lento&nbsp;');
        $("#btn-descifrarSimple").val(3);
    });

    $("#in-textoPlanoTransposicionSimple").keyup(function(){
        var mensaje = validarEntradaCifradoTransposicionSimple();

        if($("#in-textoPlanoTransposicionSimple").val().length == 0){
            deleteErrorTransposicionSimple("textoPlanoTransposicionSimple");
        }
        else{
            if (mensaje.length != 0) {
                addErrorTransposicionSimple("textoPlanoTransposicionSimple", mensaje);
            } else{
                deleteErrorTransposicionSimple("textoPlanoTransposicionSimple");
            }
        }
    });

    $("#in-textoPlanoCifradoTransposicionSimple").keyup(function(){
        var mensaje = validarEntradaDescifradoTransposicionSimple();

        if($("#in-textoPlanoCifradoTransposicionSimple").val().length == 0){
            deleteErrorTransposicionSimple("textoPlanoCifradoTransposicionSimple");
        }
        else{
            if (mensaje.length != 0) {
                addErrorTransposicionSimple("textoPlanoCifradoTransposicionSimple", mensaje);
            } else{
                deleteErrorTransposicionSimple("textoPlanoCifradoTransposicionSimple");
            }
        }
    });

    $("#btn-cifrarSimple").click(function(){
        var mensaje = validarEntradaCifradoTransposicionSimple();

        if(mensaje.length == 0){
            $("#textoPlanoTransposicionSimple-error").remove();
            $("#in-textoPlanoTransposicionSimple").removeClass('input-error');

            if($('#btn-cifrarSimple').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-cifrarSimple').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadCTransposicionSimple").hide();
            $("#btn-cifrarSimple").hide();
            $("#btn-cancelarCifrarSimple").show();
            cancelado = false;
            
            cifrarTransposicionSimple();
        }
        else{
            if(mensaje.length > 0){
                addErrorTransposicionSimple("textoPlanoTransposicionSimple", mensaje);
            }
        }
    });

    $("#btn-cancelarCifrarSimple").click(function(){
        cancelado = true;

        limpiaPanelCifradoTransposicionSimple();

        $("#btn-cifrarSimple").show();
        $("#btn-velocidadCTransposicionSimple").show();
        $("#btn-cancelarCifrarSimple").hide();
    });

    $("#btn-cancelarDescifrarSimple").click(function(){
        cancelado = true;

        limpiaPanelDescifradoTransposicionSimple();

        $("#btn-descifrarSimple").show();
        $("#btn-velocidadDTransposicionSimple").show();
        $("#btn-cancelarDescifrarSimple").hide();
    });

    $("#btn-copiarTextoSimple").click(function(){
        if ($("#out-textoCifradoTransposicionSimple").val()==''){
            toastr.options.timeOut = "1500";
            toastr.options.closeButton = true;
            toastr['info'](mensaje_6);
        } else {
            $("#in-textoPlanoCifradoTransposicionSimple").val($("#out-textoCifradoTransposicionSimple").val());

            if(validarEntradaDescifradoTransposicionSimple().length == 0){
                $("#textoPlanoCifradoTransposicionSimple-error").remove();
                $("#in-textoPlanoCifradoTransposicionSimple").removeClass('input-error');
            }
        }
    });

    $("#btn-descifrarSimple").click(function(){
        var mensaje = validarEntradaDescifradoTransposicionSimple();

        if(mensaje.length == 0){
            $("#textoPlanoCifradoTransposicionSimple-error").remove();
            $("#in-textoPlanoCifradoTransposicionSimple").removeClass('input-error');

            if($('#btn-descifrarSimple').val() == 1) {
                velocidad = 0.5;
            }
            else if($('#btn-descifrarSimple').val() == 2) {
                velocidad = 1;
            }
            else{
                velocidad = 2;
            }

            $("#btn-velocidadDTransposicionSimple").hide();
            $("#btn-descifrarSimple").hide();
            $("#btn-cancelarDescifrarSimple").show();
            cancelado = false;
            
            descifrarTransposicionSimple();
        }
        else{
            if(mensaje.length > 0){
                addErrorTransposicionSimple("textoPlanoCifradoTransposicionSimple", mensaje);
            }
        }
    });

});

function cifrarArchivoSimple(evt) {
    var fileInput = document.getElementById('fileInputCSimple');
    var fileDisplayArea = $('#fileDisplayAreaCSimple');
    
    var file = fileInput.files[0];
    var textType = /^text.*$/;
    var textoPlano = "", textoCifrado = "", aux = "";
    $("#progressbarSimpleCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');
    
    if (file.type.match(textType)) {
        if(file.size <= 1024*100){
            var reader = new FileReader();

            reader.onload = function(e) {
                var texto1 = "", texto2 = "";
                textoPlano = reader.result.toLowerCase();

                for(var i = 0 ; i < textoPlano.length ; i++) {
                    if(i%2 == 0){
                        texto1 = texto1 + textoPlano.charAt(i);
                    }
                    else{
                        texto2 = texto2 + textoPlano.charAt(i);
                    }
                    //$("#progressbarSimpleCifrado").removeClass("notransition").css('width',((i*100)/textoPlano.length)+'%').attr('aria-valuenow', (i*100)/textoPlano.length);
                }

                textoCifrado = texto1 + texto2;
                textoCifrado = textoCifrado.toUpperCase();
                
                fileDisplayArea.html(textoCifrado);
                textoCifrado= "\ufeff"+textoCifrado;
                
                //PARA DESCARGAR
                var file = new File([textoCifrado], "ArchivoCifradoSIMPLE.txt", {type: "text/plain;charset=ISO-8859-1"});
                saveAs(file);
                $("#progressbarSimpleCifrado").css('width','100%').attr('aria-valuenow', '100');
            }

            reader.readAsText(file, 'ISO-8859-1');
        }
        else{
            fileDisplayArea.html(mensaje_90);
        }
    }
    else {
        fileDisplayArea.html(mensaje_89);
    }   
}

function descifrarArchivoSimple(evt) {
    var fileInput = document.getElementById('fileInputDSimple');
    var fileDisplayArea = $('#fileDisplayAreaDSimple');               
    
    var file = fileInput.files[0];
    var textType = /^text.*$/;
    var textoCifrado = "", textoDescifrado = "";
    $("#progressbarSimpleDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '100');

    if (file.type.match(textType)) {
        if(file.size <= 1024*100){
            var reader = new FileReader();

            reader.onload = function(e) {
                var texto1 = "", texto2 = "";
                var i;
                textoCifrado = reader.result;
                textoCifrado = textoCifrado.toLowerCase();

                for(i = 0 ; i < textoCifrado.length ; i++) {
                    if(i < Math.round(textoCifrado.length / 2)){
                        texto1 = texto1 + textoCifrado.charAt(i);
                    }
                    else{
                        texto2 = texto2 + textoCifrado.charAt(i);
                    }
                    //$("#progressbarSimpleDescifrado").removeClass("notransition").css('width',((i*100)/textoCifrado.length)+'%').attr('aria-valuenow', (i*100)/textoCifrado.length);
                }

                for(i = 0 ; i < textoCifrado.length/2 -1; i++) {
                    textoDescifrado = textoDescifrado + texto1.charAt(i) + texto2.charAt(i);
                }

                if(textoCifrado%2 != 0){
                    textoDescifrado = textoDescifrado + texto1.charAt(i);
                }
                
                fileDisplayArea.html(textoDescifrado);
                textoDescifrado= "\ufeff"+textoDescifrado;
                
                //PARA DESCARGAR
                var file = new File([textoDescifrado], "ArchivoDescifradoSIMPLE.txt", {type: "text/plain;charset=ISO-8859-1"});
                saveAs(file);
                $("#progressbarSimpleDescifrado").css('width','100%').attr('aria-valuenow', '100');
            }

            reader.readAsText(file, 'ISO-8859-1');
        }
        else{
            fileDisplayArea.html(mensaje_90);
        }
    }
    else{
        fileDisplayArea.html(mensaje_89);
    }
}