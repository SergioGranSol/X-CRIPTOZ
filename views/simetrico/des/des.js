function sleepDES(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ic=0, idc=0;
var tCAdd=150, tDcAdd=150;
var tCRemove=50, tDcRemove=50;
var parpadeo='parpadeo2N';
var parpadeoNext='parpadeoNext2N';

function mostrarPanelDes(){
   $("#pnl-InteractivoDes").slideToggle(1000);
   $("#panel-fundamentos").css('top','112px');
   $("#contenidoPagina").slideToggle(1000);
}

function cerrarPanelDes(){
   $("#pnl-InteractivoDes").slideToggle(1000);
   $("#panel-fundamentos").css('top','80px');
   $("#contenidoPagina").slideToggle(1000);
   limpiaPanelDes();
}

function limpiaPanelDes(){
   tCAdd=150;
   tCRemove=50;
   tDcAdd=150;
   tDcRemove=50;
   parpadeo='parpadeo2N';
   parpadeoNext='parpadeoNext2N';
   $("#btn-cifrarDes").html('Cifrado Normal');
   $("#btn-descifrarDes").html('Descifrado Normal');
   $("#in-txtPlanoDes").val("");
   $("#in-keyDesC").val("");
   $("#out-txtCifradoDes").val("");
   $("#in-txtCifradoDes").val("");
   $("#in-keyDesD").val("");
   $("#out-txtPlanoDes").val("");
   $("#txtPlanoDes-error").remove();
   $("#in-txtPlanoDes").removeClass('input-error');
   $("#keyDesC-error").remove();
   $("#in-keyDesC").removeClass('input-error');
   $("#txtCifradoDes-error").remove();
   $("#in-txtCifradoDes").removeClass('input-error');
   $("#keyDesD-error").remove();
   $("#in-keyDesD").removeClass('input-error');
   $("#btn-cifrarDes").show();
   $("#btn-tipoCiDes").show();
   $("#btn-cancelarCifrarDes").hide();
   $("#btn-descifrarDes").show();
   $("#btn-tipoDeDes").show();
   $("#btn-cancelarDescifrarDes").hide();
   limpiarCifrado('C');
   limpiarCifrado('D');
}

function limpiarCifrado(tipo){
   $("#tabKeyCifrado"+tipo).hide();
   $("#tabHacerCifrado"+tipo).removeClass('active');
   $("#hacerCifrado"+tipo).removeClass('in active');
   $("#tabHacerLlave"+tipo).show();
   $("#tabHacerLlave"+tipo).addClass('active');
   $("#generarLlave"+tipo).addClass('in active');
   for(var i=1; i<=11; i++){
      $("#matrizPc1"+tipo+"0"+i).empty();
      $("#matrizPc2"+tipo+"0"+i).empty();
      $("#matrizIP"+tipo+"0"+i).empty();
      $("#matrizE"+tipo+"0"+i).empty();
      $("#matrizPFin"+tipo+"0"+i).empty();
      $("#matrizPInv"+tipo+"0"+i).empty();
      $("#infoDes0"+i+tipo).hide();
   }
   $("#cadenaKeyDes"+tipo).empty();
   $("#primeraPermutacion"+tipo).empty();
   $("#PC1"+tipo).hide();
   $("#izquierdaDerecha"+tipo).empty();
   $("#permutacionRotada"+tipo).empty();
   $("#PC2"+tipo).hide();
   $("#rotada"+tipo).empty();
   $("#primerKey"+tipo).empty();
   $("#tabHacerCifrado"+tipo).hide();
   $("#keys"+tipo).empty();
   $("#IP"+tipo).hide();
   $("#cadenaTextoDes"+tipo).empty();
   $("#LeftRight"+tipo).empty();
   $("#E"+tipo).hide();
   $("#RightExpan"+tipo).empty();
   $("#expancionR"+tipo).empty();
   $("#resultExp"+tipo).empty();
   $("#primerLlave"+tipo).empty();
   $("#xor"+tipo).empty();
   $("#xorcajaS"+tipo).empty();
   $("#sbox"+tipo).empty();
   $("#PFin"+tipo).hide();
   $("#sboxResult"+tipo).empty();
   $("#permutaSbox"+tipo).empty();
   $("#newLeft"+tipo).empty();
   $("#newRight"+tipo).empty();
   $("#PInv"+tipo).hide();
   $("#lastLeftRight"+tipo).empty();
   $("#PermutaInversa"+tipo).empty();
   $("#textoFinal"+tipo).empty();
   for(var i=1; i<=8; i++){
      $("#nameSbox"+tipo+i).hide();
      for (var j=1; j<=5; j++) {
         $("#matrizSbox"+i+tipo+"0"+j).empty();
         $("#matrizSbox"+i+tipo+"0"+j).hide();
      }
   }
   $("#posicionesCaja"+tipo).hide();
   $("#rowCaja"+tipo).html('Fila: ');
   $("#colCaja"+tipo).html('Columna: ');
}

function pararAnimacionDes(){
   ic=999;
   idc=999;
   $("#in-txtPlanoDes").val("");
   $("#in-keyDesC").val("");
   $("#in-txtCifradoDes").val("");
   $("#in-keyDesD").val("");
   $("#btn-copiarTextoDes").removeAttr("disabled");
   $("#txtPlanoDes-error").remove();
   $("#in-txtPlanoDes").removeClass('input-error');
   $("#keyDesC-error").remove();
   $("#in-keyDesC").removeClass('input-error');
   $("#txtCifradoDes-error").remove();
   $("#in-txtCifradoDes").removeClass('input-error');
   $("#keyDesD-error").remove();
   $("#in-keyDesD").removeClass('input-error');
   $("#btn-cifrarDes").show();
   $("#btn-tipoCiDes").show();
   $("#btn-cancelarCifrarDes").hide();
   $("#btn-descifrarDes").show();
   $("#btn-tipoDeDes").show();
   $("#btn-cancelarDescifrarDes").hide();
   limpiarCifrado('C');
   limpiarCifrado('D');
}

function validarEntradaCifradoDes(){
   var mensaje = "";
   var texto = $('#in-txtPlanoDes').val();
   if (texto.length > 0 && texto.length <= 8) {
      var caracteres = texto.split('');

      for(var i = 0 ; i < caracteres.length ; i++){
         if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
            mensaje = mensaje_29;
         }
      }
   }
   else{
      mensaje = mensaje_28;
   }
   return mensaje;
}

function validarEntradaCifradoDesLlave(){
   var mensaje = "";
   var texto = $('#in-keyDesC').val();
   if (texto.length == 8) {
      var caracteres = texto.split('');

      for(var i = 0 ; i < caracteres.length ; i++){
         if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
            mensaje = mensaje_33;
         }
      }
   }
   else{
      mensaje = mensaje_32;
   }
   return mensaje;
}

function validarEntradaDescifradoDes(){
   var mensaje = "";
   var texto = $('#in-txtCifradoDes').val();
   if (texto.length == 8) {
      var caracteres = texto.split('');

      for(var i = 0 ; i < caracteres.length ; i++){
         if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
            mensaje = mensaje_31;
         }
      }
   }
   else{
      mensaje = mensaje_30;
   }
   return mensaje;
}

function validarEntradaDescifradoDesLlave(){
   var mensaje = "";
   var texto = $('#in-keyDesD').val();
   if (texto.length == 8) {
      var caracteres = texto.split('');

      for(var i = 0 ; i < caracteres.length ; i++){
         if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
            mensaje = mensaje_33;
         }
      }
   }
   else{
      mensaje = mensaje_32;
   }
   return mensaje;
}

function validarEntradaCifradoArchivoDesLlave(){
    var mensaje = "";
    var clave = $('#llaveDesCifrado').val();
    if (clave.length != 8) {
         mensaje = mensaje_32
    } else {
      var caracteres = clave.split('');
      for(var i = 0 ; i < caracteres.length ; i++){
         if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
            mensaje = mensaje_31;
         }
      }
    }
    return mensaje;
}

function validarEntradaDescifradoArchivoDesLlave(){
    var mensaje = "";
    var clave = $('#llaveDesDescifrado').val();
    if (clave.length != 8) {
        mensaje = mensaje_32
    } else {
      var caracteres = clave.split('');
      for(var i = 0 ; i < caracteres.length ; i++){
         if(caracteres[i].charCodeAt(0) < 0 || caracteres[i].charCodeAt(0) > 255){
            mensaje = mensaje_31;
         }
      }
    }
    return mensaje;
}

$(document).ready(function(){
   $('[data-toggle="tooltip"]').tooltip(); 
   
   $("#btn-mostrarPanelDes").click(function(){
      mostrarPanelDes();
   });
   $("#btn-cerrarPanelDes").click(function(){
      pararAnimacionDes();
      cerrarPanelDes();
   });
   $("#btn-teoriaDes").click(function(){
      pararAnimacionDes();
   });
   $("#btn-fundamentosDes").click(function(){
      pararAnimacionDes();
   });
   $("#btn-animacionCifradoDes").click(function(){
      // pararAnimacionDes();
   });
   $("#btn-animacionDesifradoDes").click(function(){
      // pararAnimacionDes();
   });
   $("#btn-cancelarCifrarDes").click(function(){
      pararAnimacionDes();
   });
   $("#btn-cancelarDescifrarDes").click(function(){
      pararAnimacionDes();
   });
   $("#tipoCiDes1").click(function(){
      $("#btn-cifrarDes").html('Cifrado Rápido');
      tCAdd=75;
      tCRemove=25;
      parpadeo='parpadeo1R';
      parpadeoNext='parpadeoNext1R';
   });
   $("#tipoCiDes2").click(function(){
      $("#btn-cifrarDes").html('Cifrado Normal');
      tCAdd=150;
      tCRemove=50;
      parpadeo='parpadeo2N';
      parpadeoNext='parpadeoNext2N';
   });
   $("#tipoCiDes3").click(function(){
      $("#btn-cifrarDes").html('Cifrado Lento');
      tCAdd=1600;
      tCRemove=150;
      parpadeo='parpadeo3L';
      parpadeoNext='parpadeoNext3L';
   });
   $("#tipoDeDes1").click(function(){
      $("#btn-descifrarDes").html('Descifrado Rápido');
      tDcAdd=75;
      tDcRemove=25;
      parpadeo='parpadeo1R';
      parpadeoNext='parpadeoNext1R';
   });
   $("#tipoDeDes2").click(function(){
      $("#btn-descifrarDes").html('Descifrado Normal');
      tDcAdd=150;
      tDcRemove=50;
      parpadeo='parpadeo2N';
      parpadeoNext='parpadeoNext2N';
   });
   $("#tipoDeDes3").click(function(){
      $("#btn-descifrarDes").html('Descifrado Lento');
      tDcAdd=1600;
      tDcRemove=150;
      parpadeo='parpadeo3L';
      parpadeoNext='parpadeoNext3L';
   });

   $("#in-txtPlanoDes").keyup(function(){
      $("#in-txtPlanoDes").removeClass('input-error');
      $("#txtPlanoDes-error").remove();
      if ($("#in-txtPlanoDes").val()=='') {
         $("#in-txtPlanoDes").removeClass('input-error');
         $("#txtPlanoDes-error").remove();
      } else{
         var mensaje = validarEntradaCifradoDes();
         if (mensaje.length == 0){
            $("#in-txtPlanoDes").removeClass('input-error');
            $("#txtPlanoDes-error").remove();
         } else {
            $("#in-txtPlanoDes").addClass('input-error');
            $("#in-txtPlanoDes").parent().parent().append('<div id="txtPlanoDes-error" class="text-danger">&nbsp;'+mensaje+'</div>');
         }
      }
   });

   $("#in-keyDesC").keyup(function(){
      $("#in-keyDesC").removeClass('input-error');
      $("#keyDesC-error").remove();
      if ($("#in-keyDesC").val()=='') {
         $("#in-keyDesC").removeClass('input-error');
         $("#keyDesC-error").remove();
      } else{
         var mensaje = validarEntradaCifradoDesLlave();
         if (mensaje.length == 0){
            $("#in-keyDesC").removeClass('input-error');
            $("#keyDesC-error").remove();
         } else {
            $("#in-keyDesC").addClass('input-error');
            $("#in-keyDesC").parent().parent().append('<div id="keyDesC-error" class="text-danger">&nbsp;'+mensaje+'</div>');
         }
      }
   });

   $("#in-txtCifradoDes").keyup(function(){
      $("#in-txtCifradoDes").removeClass('input-error');
      $("#txtCifradoDes-error").remove();
      if ($("#in-txtCifradoDes").val()=='') {
         $("#in-txtCifradoDes").removeClass('input-error');
         $("#txtCifradoDes-error").remove();
      } else{
         var mensaje = validarEntradaDescifradoDes();
         if (mensaje.length == 0){
            $("#in-txtCifradoDes").removeClass('input-error');
            $("#txtCifradoDes-error").remove();
         } else {
            $("#in-txtCifradoDes").addClass('input-error');
            $("#in-txtCifradoDes").parent().parent().append('<div id="txtCifradoDes-error" class="text-danger">&nbsp;'+mensaje+'</div>');
         }
      }
   });

   $("#in-keyDesD").keyup(function(){
      $("#in-keyDesD").removeClass('input-error');
       $("#keyDesD-error").remove();
      if ($("#in-keyDesD").val()=='') {
         $("#in-keyDesD").removeClass('input-error');
         $("#keyDesD-error").remove();
      } else{
         var mensaje = validarEntradaDescifradoDesLlave();
         if (mensaje.length == 0){
            $("#in-keyDesD").removeClass('input-error');
            $("#keyDesD-error").remove();
         } else {
            $("#in-keyDesD").addClass('input-error');
            $("#in-keyDesD").parent().parent().append('<div id="keyDesD-error" class="text-danger">&nbsp;'+mensaje+'</div>');
         }
      }
   });

   $("#btn-cifrarDes").click(function(){
      $("#txtPlanoDes-error").remove();
      $("#in-txtPlanoDes").removeClass('input-error');
      $("#keyDesC-error").remove();
      $("#in-keyDesC").removeClass('input-error');
      $("#out-txtCifradoDes").val("");
      var mensaje = validarEntradaCifradoDes();
      var llave = validarEntradaCifradoDesLlave();
      if ($("#in-txtPlanoDes").val()!='' && $("#in-keyDesC").val()!='' && mensaje.length == 0 && llave.length == 0){
         limpiarCifrado('C');
         $("#btn-cifrarDes").hide();
         $("#btn-tipoCiDes").hide();
         $("#btn-cancelarCifrarDes").show();
         do_des(true);
         hacerCifradoDes('C');
      } else{
         if (mensaje.length != 0) {
            $("#in-txtPlanoDes").addClass('input-error');
            $("#in-txtPlanoDes").parent().parent().append('<div id="txtPlanoDes-error" class="text-danger">&nbsp;'+mensaje+'</div>');
         }
         if (llave.length != 0) {
            $("#in-keyDesC").parent().parent().append('<div id="keyDesC-error" class="text-danger">&nbsp;'+llave+'</div>');
            $("#in-keyDesC").addClass('input-error');
         }
      }
   });

   $("#btn-copiarTextoDes").click(function(){
      if ($("#out-txtCifradoDes").val()==''){
         toastr.options.timeOut = "1500";
         toastr.options.closeButton = true;
         toastr['info'](mensaje_6);
      } else {
         $("#in-txtCifradoDes").val($("#out-txtCifradoDes").val());
         $("#in-keyDesD").val($("#in-keyDesC").val());
      }
   });

   $("#btn-descifrarDes").click(function(){
      $("#txtCifradoDes-error").remove();
      $("#in-txtCifradoDes").removeClass('input-error');
      $("#keyDesD-error").remove();
      $("#in-keyDesD").removeClass('input-error');
      $("#out-txtPlanoDes").val("");
      var mensaje = validarEntradaDescifradoDes();
      var llave = validarEntradaDescifradoDesLlave();
      if ($("#in-txtCifradoDes").val()!='' && $("#in-keyDesD").val()!='' && mensaje.length == 0 && llave.length == 0){
         limpiarCifrado('D');
         $("#btn-copiarTextoDes").attr("disabled","disabled");
         $("#btn-descifrarDes").hide();
         $("#btn-tipoDeDes").hide();
         $("#btn-cancelarDescifrarDes").show();
         do_des(false);
         hacerCifradoDes('D');
      } else{
         if (mensaje.length != 0) {
            $("#in-txtCifradoDes").addClass('input-error');
            $("#in-txtCifradoDes").parent().parent().append('<div id="txtCifradoDes-error" class="text-danger">&nbsp;'+mensaje+'</div>');
         }
         if (llave.length != 0) {
            $("#in-keyDesD").parent().parent().append('<div id="keyDesD-error" class="text-danger">&nbsp;'+llave+'</div>');
            $("#in-keyDesD").addClass('input-error');
         }
      }
   });
   
   $("#llaveDesCifrado").keyup(function(){
      $("#llaveDesCifrado").removeClass('input-error');
      $("#llaveDesCifrado-error").remove();
      if ($("#llaveDesCifrado").val()=='') {
         $("#llaveDesCifrado").removeClass('input-error');
         $("#llaveDesCifrado-error").remove();
      } else{
         var error = validarEntradaCifradoArchivoDesLlave();
           $('#llaveDesCifrado').removeClass('input-error').next().remove();
           if (error!=""){
               $('#llaveDesCifrado').addClass('input-error').after('<div id="llaveDesCifrado-error" class="text-danger">'+error+'</div>');
           }
        }
    });

   $("#llaveDesDescifrado").keyup(function(){
      $("#llaveDesDescifrado").removeClass('input-error');
      $("#llaveDesDescifrado-error").remove();
      if ($("#llaveDesDescifrado").val()=='') {
         $("#llaveDesDescifrado").removeClass('input-error');
         $("#llaveDesDescifrado-error").remove();
      } else{
         var error = validarEntradaDescifradoArchivoDesLlave();
           $('#llaveDesDescifrado').removeClass('input-error').next().remove();
           if (error!=""){
               $('#llaveDesDescifrado').addClass('input-error').after('<div id="llaveDesDescifrado-error" class="text-danger">'+error+'</div>');
           }
        }
    });
});

var cadena = new Array();
var indexCadena = 1;
var rondas = 1;

function accumulate_bitstring( label, ary, spacing ){
   var i;
   if (label=='E   : ') {
      cadena[indexCadena] = 'Ronda '+rondas;
      rondas++;
      indexCadena++;
   }
   cadena[indexCadena] = ' ';
   for( i=1; i<ary.length; i++ ){
     // if ( (i%spacing) == 1 )
     //     cadena[indexCadena] += " ";
      cadena[indexCadena] += ary[i];
   }
   indexCadena++;
}

var IP_perm = new Array( -1,
   58, 50, 42, 34, 26, 18, 10, 2,
   60, 52, 44, 36, 28, 20, 12, 4,
   62, 54, 46, 38, 30, 22, 14, 6,
   64, 56, 48, 40, 32, 24, 16, 8,
   57, 49, 41, 33, 25, 17, 9, 1,
   59, 51, 43, 35, 27, 19, 11, 3,
   61, 53, 45, 37, 29, 21, 13, 5,
   63, 55, 47, 39, 31, 23, 15, 7 );

var FP_perm = new Array( -1,
   40, 8, 48, 16, 56, 24, 64, 32,
   39, 7, 47, 15, 55, 23, 63, 31,
   38, 6, 46, 14, 54, 22, 62, 30,
   37, 5, 45, 13, 53, 21, 61, 29,
   36, 4, 44, 12, 52, 20, 60, 28,
   35, 3, 43, 11, 51, 19, 59, 27,
   34, 2, 42, 10, 50, 18, 58, 26,
   33, 1, 41, 9, 49, 17, 57, 25 );

var E_perm = new Array( -1,
   32, 1, 2, 3, 4, 5,
   4, 5, 6, 7, 8, 9,
   8, 9, 10, 11, 12, 13,
   12, 13, 14, 15, 16, 17,
   16, 17, 18, 19, 20, 21,
   20, 21, 22, 23, 24, 25,
   24, 25, 26, 27, 28, 29,
   28, 29, 30, 31, 32, 1 );

var P_perm = new Array( -1,
   16, 7, 20, 21, 29, 12, 28, 17,
   1, 15, 23, 26, 5, 18, 31, 10,
   2, 8, 24, 14, 32, 27, 3, 9,
   19, 13, 30, 6, 22, 11, 4, 25 );

var S1 = new Array(
   14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
   0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
   4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
   15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 );
var S2 = new Array(
   15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
   3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
   0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
   13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 );
var S3 = new Array(
   10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
   13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
   13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
   1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 );
var S4 = new Array(
   7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
   13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
   10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
   3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14 );
var S5 = new Array(
   2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
   14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
   4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
   11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 );
var S6 = new Array(
   12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
   10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
   9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
   4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13 );
var S7 = new Array(
   4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
   13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
   1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
   6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12 );
var S8 = new Array(
   13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
   1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
   7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
   2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11 );

var PC_1_perm = new Array( -1, 
   // C subkey bits
   57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,
   10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
   // D subkey bits
   63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
   14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 );

var PC_2_perm = new Array( -1, 
   14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
   23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
   41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
   44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 );

var DES_output = new Array( 65 );

function split_int( ary, start, bitc, val ){
   var i = start;
   var j;
   for( j=bitc-1; j>=0; j-- ){
      ary[i+j] = val & 1;
      val >>= 1;
   }
}

function get_value( bitarray, str, isASCII ){
   var i;
   var val;

   bitarray[0] = -1;

   if ( isASCII ){
      for( i=0; i<8; i++ ){
         split_int( bitarray, i*8+1, 8, str.charCodeAt(i) );
      }
   }
}

var str;
function format_DES_output( do_encrypt ){
   var i;
   var bits;
   str="";

   for( i=1; i<=64; i+= 8 ){
         str += String.fromCharCode(
                     DES_output[i  ]*128 + DES_output[i+1]*64  +
                     DES_output[i+2]*32  + DES_output[i+3]*16  +
                     DES_output[i+4]*8   + DES_output[i+5]*4   +
                     DES_output[i+6]*2   + DES_output[i+7] );
   }
}

function permute( dest, src, perm ){
  var i;
  var fromloc;

  for( i=1; i<perm.length; i++ ){
    fromloc = perm[i];
    dest[i] = src[fromloc];
  }
}

function xor( a1, a2 ){
   var i;

   for( i=1; i<a1.length; i++ ){
      a1[i] = a1[i] ^ a2[i];
   }
}

function do_S( SBox, index, inbits ){
   var S_index = inbits[index  ]*32 + inbits[index+5]*16 +
                 inbits[index+1]*8  + inbits[index+2]*4 +
                 inbits[index+3]*2  + inbits[index+4];

   return SBox[S_index];
}

function des_round( L, R, KeyR ){
   var E_result = new Array( 49 );
   var S_out = new Array( 33 );

   var temp_L = new Array( 33 );
   for( i=0; i<33; i++ ){
      temp_L[i] = L[i];
      L[i] = R[i];
   }

   permute( E_result, R, E_perm );
   accumulate_bitstring( "E   : ", E_result, 6 );
   accumulate_bitstring( "KS  : ", KeyR, 6 );

   xor( E_result, KeyR );
   accumulate_bitstring( "E xor KS: ", E_result, 6 );

   split_int( S_out,  1, 4, do_S( S1,  1, E_result ) );
   split_int( S_out,  5, 4, do_S( S2,  7, E_result ) );
   split_int( S_out,  9, 4, do_S( S3, 13, E_result ) );
   split_int( S_out, 13, 4, do_S( S4, 19, E_result ) );
   split_int( S_out, 17, 4, do_S( S5, 25, E_result ) );
   split_int( S_out, 21, 4, do_S( S6, 31, E_result ) );
   split_int( S_out, 25, 4, do_S( S7, 37, E_result ) );
   split_int( S_out, 29, 4, do_S( S8, 43, E_result ) );
   accumulate_bitstring( "Sbox: ", S_out, 4 );

   permute( R, S_out, P_perm );
   accumulate_bitstring( "P   :", R, 8 );

   xor( R, temp_L );
   accumulate_bitstring( "L[i]:", L, 8 );
   accumulate_bitstring( "R[i]:", R, 8 );
}

function shift_CD_1( CD ){
   var i;

   for( i=0; i<=55; i++ ){
      CD[i] = CD[i+1];
   }

   CD[56] = CD[28];
   CD[28] = CD[0];
}

function shift_CD_2( CD ){
   var i;
   var C1 = CD[1];

   for( i=0; i<=54; i++ ){
      CD[i] = CD[i+2];
   }

   CD[55] = CD[27];
   CD[56] = CD[28];
   CD[27] = C1;
   CD[28] = CD[0];
}

function des_encrypt( inData, Key, do_encrypt ){
   var tempData = new Array( 65 );
   var CD = new Array( 57 );
   var KS = new Array( 16 );
   var L = new Array( 33 );
   var R = new Array( 33 );
   var result = new Array( 65 );
   var i;

   permute( CD, Key, PC_1_perm );
   accumulate_bitstring( "CD[0]: ", CD, 7 );

   for( i=1; i<=16; i++ ){
      KS[i] = new Array( 49 );

      if ( i==1 || i==2 || i==9 || i == 16 ){
         shift_CD_1( CD );
      } else {
         shift_CD_2( CD );
      }
      accumulate_bitstring( "CD["+i+"]: ", CD, 7 );

      permute( KS[i], CD, PC_2_perm );
      accumulate_bitstring( "KS["+i+"]: ", KS[i], 6 );
   }

   permute( tempData, inData, IP_perm );

   for( i=1; i<=32; i++ ){
      L[i] = tempData[i];
      R[i] = tempData[i+32];
   }
   accumulate_bitstring( "L[0]: ", L, 8 );
   accumulate_bitstring( "R[0]: ", R, 8 );

   if ( do_encrypt ){
      for( i=1; i<=16; i++ ){
         des_round( L, R, KS[i] );
      }
   } else {
      for( i=16; i>=1; i-- ){
         des_round( L, R, KS[i] );
      }
   }

   for( i=1; i<=32; i++ ){
      tempData[i] = R[i];
      tempData[i+32] = L[i];
   }
   accumulate_bitstring ("LR[16] ", tempData, 8 );

   permute( result, tempData, FP_perm );
   return result;
}

function do_des( do_encrypt ){
   var inData = new Array( 65 );
   var Key = new Array( 65 );

   cadena = [];
   indexCadena = 1;
   rondas = 1;

   if (do_encrypt==true) {
      get_value( inData, $("#in-txtPlanoDes").val(), true );
   } else {
      get_value( inData, $("#in-txtCifradoDes").val(), true );
   }

   accumulate_bitstring( "Input bits:", inData, 8 );

   if (do_encrypt==true) {
      get_value( Key, $("#in-keyDesC").val(), true );
   } else {
      get_value( Key, $("#in-keyDesD").val(), true );
   }

   accumulate_bitstring( "Key bits:", Key, 8 );

   DES_output = des_encrypt( inData, Key, do_encrypt )

   accumulate_bitstring ("Output ", DES_output, 8 );
   // console.log(cadena);
   
   format_DES_output( do_encrypt );
}

async function hacerCifradoDes(tipo){
   ic=0;
   // Generar llave
   if(ic==0){
      $("#tabKeyCifrado"+tipo).show();
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=4 && ic==0; i++){
      for(var j=1; j<=14 && ic==0; j++){
         $("#matrizPc1"+tipo+"0"+i).append('<td id="celdaPc1'+tipo+PC_1_perm[valMatrizPC1]+'">'+PC_1_perm[valMatrizPC1]+'</td>');
         valMatrizPC1++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=4 && ic==0; i++){
      for(var j=1; j<=12 && ic==0; j++){
         $("#matrizPc2"+tipo+"0"+i).append('<td id="celdaPc2'+tipo+PC_2_perm[valMatrizPC1]+'">'+PC_2_perm[valMatrizPC1]+'</td>');
         valMatrizPC1++;
      }
   }
   if(ic==0){
      $("#infoDes01"+tipo).show();
      $(window).scrollTop($("#primeraPermutacion"+tipo).offset().top);
      await sleepDES(tCAdd);
      if (tipo=='C') {
         $("#cadenaKeyDes"+tipo).append('<label class="circulo">Llave: '+$("#in-keyDesC").val()+'</label><br>'+
         '<label class="circulo">Llave escrita en binario: </label>');
      } else {
         $("#cadenaKeyDes"+tipo).append('<label class="circulo">Llave: '+$("#in-keyDesD").val()+'</label><br>'+
         '<label class="circulo">Llave escrita en binario: </label>');
      }
      $("#primeraPermutacion"+tipo).append('<label class="circulo">Permutacion con PC1: </label>');
      $(window).scrollTop($("#primeraPermutacion"+tipo).offset().top);
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#cadenaKeyDes"+tipo).append('<label id="cadenaKey'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#cadenaKey"+tipo+i).append('<label id="bitNo'+numBit+tipo+'">'+cadena[2].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#primeraPermutacion"+tipo).append('<label id="keyPermuta'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#keyPermuta"+tipo+i).append('<label id="bitNo'+numBit+tipo+'Per" style="display:none;">'+cadena[3].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   if(ic==0){
      $("#PC1"+tipo).show();
   }
   for(var i=1; i<=56 && ic==0; i++){
      $("#bitNo"+PC_1_perm[valMatrizPC1]+tipo).addClass(parpadeo);
      $("#celdaPc1"+tipo+PC_1_perm[valMatrizPC1]).addClass(parpadeo);
      $("#bitNo"+valMatrizPC1+tipo+'Per').show();
      $("#bitNo"+valMatrizPC1+tipo+'Per').addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNo"+PC_1_perm[valMatrizPC1]+tipo).removeClass(parpadeo);
      $("#celdaPc1"+tipo+PC_1_perm[valMatrizPC1]).removeClass(parpadeo);
      $("#bitNo"+valMatrizPC1+tipo+'Per').removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes02"+tipo).show();
      $(window).scrollTop($("#permutacionRotada"+tipo).offset().top);
      await sleepDES(tCAdd);
      $("#izquierdaDerecha"+tipo).append('<label class="circulo" id="Izquierda'+tipo+'">Izquierda: </label>');
      $("#izquierdaDerecha"+tipo).append('<label class="circulo" id="Derecha'+tipo+'">Derecha: </label>');
   }
   numBit = 1;
   for (var i = 1; i <= 4 && ic==0; i++) {
      $("#Izquierda"+tipo).append('<label id="izq'+tipo+i+'"></label><label class="circulo"></label>');
      $("#Derecha"+tipo).append('<label id="der'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#izq"+tipo+i).append('<label id="bitNoIzq'+numBit+tipo+'">'+cadena[3].substr(numBit,1)+'</label>');
         $("#der"+tipo+i).append('<label id="bitNoDer'+numBit+tipo+'">'+cadena[3].substr(numBit+28,1)+'</label>');
         numBit++;
         if (numBit==29) {j=9;}
      }
   }
   if(ic==0){
      $("#izquierdaDerecha"+tipo).addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#izquierdaDerecha"+tipo).removeClass(parpadeo);
      await sleepDES(tCRemove);
      $("#permutacionRotada"+tipo).append('<label class="circulo">Rotación: </label>');
      $(window).scrollTop($("#permutacionRotada"+tipo).offset().top);
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#permutacionRotada"+tipo).append('<label id="perRot'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#perRot"+tipo+i).append('<label id="bitNo'+numBit+tipo+'PerRot" style="display:none;">'+cadena[4].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   for(var i=1; i<=28 && ic==0; i++){
      aux=i;
      if (i==28) {aux=1;}
      $("#bitNoIzq"+(i+1)+tipo).addClass(parpadeo);
      $("#bitNo"+aux+tipo+"PerRot").show();
      $("#bitNo"+aux+tipo+"PerRot").addClass(parpadeo);
      $("#bitNoDer"+(i+1)+tipo).addClass(parpadeo);
      $("#bitNo"+(aux+28)+tipo+"PerRot").show();
      $("#bitNo"+(aux+28)+tipo+"PerRot").addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNoIzq"+(i+1)+tipo).removeClass(parpadeo);
      $("#bitNo"+aux+tipo+"PerRot").removeClass(parpadeo);
      $("#bitNoDer"+(i+1)+tipo).removeClass(parpadeo);
      $("#bitNo"+(aux+28)+tipo+"PerRot").removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes03"+tipo).show();
      $(window).scrollTop($("#primerKey"+tipo).offset().top);
      await sleepDES(tCAdd);
      $("#PC2"+tipo).show();
      $("#rotada"+tipo).append('<label class="circulo">Rotación: </label>');
      $("#primerKey"+tipo).append('<label class="circulo">Llave No. 1: </label>');
      $(window).scrollTop($("#primerKey"+tipo).offset().top);
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#rotada"+tipo).append('<label id="rot'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#rot"+tipo+i).append('<label id="bitNo'+numBit+tipo+'rot">'+cadena[4].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#primerKey"+tipo).append('<label id="primKey'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#primKey"+tipo+i).append('<label id="bitNo'+numBit+tipo+'key" style="display:none;">'+cadena[5].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=48 && ic==0; i++){
      $("#bitNo"+PC_2_perm[valMatrizPC1]+tipo+'rot').addClass(parpadeo);
      $("#celdaPc2"+tipo+PC_2_perm[valMatrizPC1]).addClass(parpadeo);
      $("#bitNo"+valMatrizPC1+tipo+'key').show();
      $("#bitNo"+valMatrizPC1+tipo+'key').addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNo"+PC_2_perm[valMatrizPC1]+tipo+'rot').removeClass(parpadeo);
      $("#celdaPc2"+tipo+PC_2_perm[valMatrizPC1]).removeClass(parpadeo);
      $("#bitNo"+valMatrizPC1+tipo+'key').removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes04"+tipo).show();
      $(window).scrollTop($("#infoDes04"+tipo).offset().top);
      indexLlaves=5;
      for (var k = 1; k <= 16 && ic==0; k++) {
         $("#keys"+tipo).append('<label id="keys'+tipo+k+'" class="circulo">Llave No. '+k+': </label>');
         numBit = 1;
         for (var i = 1; i <= 8 && ic==0; i++) {
            $("#keys"+tipo+k).append('<label id="NumKey'+k+tipo+i+'"></label><label class="circulo"></label>');
            for (var j = 1; j <= 8 && ic==0; j++) {
               $("#NumKey"+k+tipo+i).append('<label>'+cadena[indexLlaves].substr(numBit,1)+'</label>');
               numBit++;
            }
         }
         indexLlaves=indexLlaves+2;
         $("#keys"+tipo+k).addClass(parpadeo);
         await sleepDES(tCAdd);
         $("#keys"+tipo+k).removeClass(parpadeo);
         await sleepDES(tCRemove);
         $(window).scrollTop($("#keys"+tipo+k).offset().top);
      }
   }

   // Hace el cifrado
   if(ic==0){
      $("#tabHacerCifrado"+tipo).show();
      $("#tabHacerCifrado"+tipo).addClass('active');
      $("#hacerCifrado"+tipo).addClass('in active');
      $("#tabHacerLlave"+tipo).hide();
      $("#tabHacerLlave"+tipo).removeClass('active');
      $("#generarLlave"+tipo).removeClass('in active');
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=8 && ic==0; i++){
      for(var j=1; j<=8 && ic==0; j++){
         $("#matrizIP"+tipo+"0"+i).append('<td id="celdaIP1'+tipo+IP_perm[valMatrizPC1]+'">'+IP_perm[valMatrizPC1]+'</td>');
         valMatrizPC1++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=8 && ic==0; i++){
      for(var j=1; j<=6 && ic==0; j++){
         $("#matrizE"+tipo+"0"+i).append('<td id="celdaE1'+tipo+valMatrizPC1+'">'+E_perm[valMatrizPC1]+'</td>');
         valMatrizPC1++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=4 && ic==0; i++){
      for(var j=1; j<=8 && ic==0; j++){
         $("#matrizPFin"+tipo+"0"+i).append('<td id="celdaPFin1'+tipo+P_perm[valMatrizPC1]+'">'+P_perm[valMatrizPC1]+'</td>');
         valMatrizPC1++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=8 && ic==0; i++){
      for(var j=1; j<=8 && ic==0; j++){
         $("#matrizPInv"+tipo+"0"+i).append('<td id="celdaPInv1'+tipo+FP_perm[valMatrizPC1]+'">'+FP_perm[valMatrizPC1]+'</td>');
         valMatrizPC1++;
      }
   }
   for(var k=1; k<=8 && ic==0; k++){
      valMatrizPC1 = 0;
      for(var i=1; i<=5 && ic==0; i++){
         for(var j=1; j<=17 && ic==0; j++){
            if(i==1 && j==1){
               $("#matrizSbox"+k+tipo+"0"+i).append('<td>&nbsp;</td>');
            } else if(i==1 && j>1){
               $("#matrizSbox"+k+tipo+"0"+i).append('<td id="bitRowCeldaSbox'+k+tipo+(j-2)+'"><strong>'+(j-2)+'</strong></td>');
            } else if(i>1 && j==1){
               $("#matrizSbox"+k+tipo+"0"+i).append('<td id="bitColCeldaSbox'+k+tipo+(i-2)+'"><strong>'+(i-2)+'</strong></td>');
            } else {
               if (k==1) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S1[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==2) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S2[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==3) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S3[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==4) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S4[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==5) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S5[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==6) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S6[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==7) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S7[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               } else if (k==8) {
                  $("#matrizSbox"+k+tipo+"0"+i).append('<td id="celdaSbox'+k+tipo+j+i+'">'+S8[valMatrizPC1]+'</td>');
                  valMatrizPC1++;
               }
            }
         }
      }
   }
   if(ic==0){
      $("#infoDes05"+tipo).show();
      $(window).scrollTop($("#LeftRight"+tipo).offset().top);
      $("#IP"+tipo).show();
      if(tipo=='C'){
         $("#cadenaTextoDes"+tipo).append('<label class="circulo">Mensaje claro: '+$("#in-txtPlanoDes").val()+'</label><br>'+
         '<label class="circulo">Mensaje en binario: </label>');
      } else {
         $("#cadenaTextoDes"+tipo).append('<label class="circulo">Criptograma: '+$("#in-txtCifradoDes").val()+'</label><br>'+
         '<label class="circulo">Criptograma en binario: </label>');
      }
      $("#LeftRight"+tipo).append('<label class="circulo" id="Left'+tipo+'">L: </label>');
      $(window).scrollTop($("#LeftRight"+tipo).offset().top);
      $("#LeftRight"+tipo).append('<label class="circulo" id="Right'+tipo+'">R: </label>');
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#cadenaTextoDes"+tipo).append('<label id="cadenaTexto'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#cadenaTexto"+tipo+i).append('<label id="bitNoTexto'+numBit+tipo+'">'+cadena[1].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   numBit = 1;
   for (var i = 1; i <= 4 && ic==0; i++) {
      $("#Left"+tipo).append('<label id="le'+tipo+i+'"></label><label class="circulo"></label>');
      $("#Right"+tipo).append('<label id="ri'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#le"+tipo+i).append('<label id="bitNoLR'+numBit+tipo+'" style="display:none;">'+cadena[36].substr(numBit,1)+'</label>');
         $("#ri"+tipo+i).append('<label id="bitNoLR'+(numBit+32)+tipo+'" style="display:none;">'+cadena[37].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=64 && ic==0; i++){
      $("#bitNoTexto"+IP_perm[valMatrizPC1]+tipo).addClass(parpadeo);
      $("#celdaIP1"+tipo+IP_perm[valMatrizPC1]).addClass(parpadeo);
      $("#bitNoLR"+valMatrizPC1+tipo).show();
      $("#bitNoLR"+valMatrizPC1+tipo).addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNoTexto"+IP_perm[valMatrizPC1]+tipo).removeClass(parpadeo);
      $("#celdaIP1"+tipo+IP_perm[valMatrizPC1]).removeClass(parpadeo);
      $("#bitNoLR"+valMatrizPC1+tipo).removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes06"+tipo).show();
      $(window).scrollTop($("#expancionR"+tipo).offset().top);
      $("#E"+tipo).show();
      $("#RightExpan"+tipo).append('<label class="circulo">R: </label>');
      $("#expancionR"+tipo).append('<label class="circulo">Expanción: </label>');
      $(window).scrollTop($("#expancionR"+tipo).offset().top);
   }
   numBit = 1;
   for (var i = 1; i <= 4 && ic==0; i++) {
      $("#RightExpan"+tipo).append('<label id="riEx'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#riEx"+tipo+i).append('<label id="bitNoRE'+numBit+tipo+'">'+cadena[37].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#expancionR"+tipo).append('<label id="expan'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#expan"+tipo+i).append('<label id="bitNoExpan'+numBit+tipo+'" style="display:none;">'+cadena[39].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=48 && ic==0; i++){
      $("#bitNoRE"+E_perm[valMatrizPC1]+tipo).addClass(parpadeo);
      $("#celdaE1"+tipo+valMatrizPC1).addClass(parpadeo);
      $("#bitNoExpan"+valMatrizPC1+tipo).show();
      $("#bitNoExpan"+valMatrizPC1+tipo).addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNoRE"+E_perm[valMatrizPC1]+tipo).removeClass(parpadeo);
      $("#celdaIP1"+tipo+valMatrizPC1).removeClass(parpadeo);
      $("#bitNoExpan"+valMatrizPC1+tipo).removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes07"+tipo).show();
      $(window).scrollTop($("#xor"+tipo).offset().top);
      if (tipo=='C') {
         $("#resultExp"+tipo).append('<label class="circulo">Expanción: </label>');
         $("#primerLlave"+tipo).append('<label class="circulo">Llave No.1: </label>');
         $("#xor"+tipo).append('<label class="circulo">XOR&nbsp;'+
         '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>');
         $(window).scrollTop($("#xor"+tipo).offset().top);
      } else {
         $("#resultExp"+tipo).append('<label class="circulo">Expanción&nbsp;&nbsp;: </label>');
         $("#primerLlave"+tipo).append('<label class="circulo">Llave No.16: </label>');
         $("#xor"+tipo).append('<label class="circulo">XOR&nbsp;'+
         '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>');
         $(window).scrollTop($("#xor"+tipo).offset().top);
      }
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#resultExp"+tipo).append('<label id="resultExpan'+tipo+i+'"></label><label class="circulo"></label>');
      $("#primerLlave"+tipo).append('<label id="primLlave'+tipo+i+'"></label><label class="circulo"></label>');
      $("#xor"+tipo).append('<label id="xorNum'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#resultExpan"+tipo+i).append('<label id="bitNoRExpan'+numBit+tipo+'">'+cadena[39].substr(numBit,1)+'</label>');
         $("#primLlave"+tipo+i).append('<label id="bitNoPrimLlave'+numBit+tipo+'">'+cadena[40].substr(numBit,1)+'</label>');
         $("#xorNum"+tipo+i).append('<label id="bitNoXor'+numBit+tipo+'" style="display:none;">'+cadena[41].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=48 && ic==0; i++){
      $("#bitNoRExpan"+valMatrizPC1+tipo).addClass(parpadeo);
      $("#bitNoPrimLlave"+valMatrizPC1+tipo).addClass(parpadeo);
      $("#bitNoXor"+valMatrizPC1+tipo).show();
      $("#bitNoXor"+valMatrizPC1+tipo).addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNoRExpan"+valMatrizPC1+tipo).removeClass(parpadeo);
      $("#bitNoPrimLlave"+valMatrizPC1+tipo).removeClass(parpadeo);
      $("#bitNoXor"+valMatrizPC1+tipo).removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes08"+tipo).show();
      $(window).scrollTop($("#sbox"+tipo).offset().top);
      $("#cajaS"+tipo).show();
      $("#sbox"+tipo).append('<label class="circulo">S-Box: </label>');
      $(window).scrollTop($("#sbox"+tipo).offset().top);
      $("#xorcajaS"+tipo).append('<label class="circulo">XOR: </label>');
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#xorcajaS"+tipo).append('<label id="xorCajaNum'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 6 && ic==0; j++) {
         $("#xorCajaNum"+tipo+i).append('<label id="bitNoXorCaja'+numBit+tipo+'">'+cadena[41].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   numBit=1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#sbox"+tipo).append('<label id="sboxNum'+tipo+i+'" style="display:none;"></label><label class="circulo"></label>');
      $(window).scrollTop($("#sbox"+tipo).offset().top);
      for (var j = 1; j <= 4 && ic==0; j++) {
         $("#sboxNum"+tipo+i).append('<label id="bitNoSbox'+numBit+tipo+'">'+cadena[42].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   numBit=1;
   for(var i=1; i<=8 && ic==0; i++){
      $("#xorCajaNum"+tipo+i).addClass(parpadeo);
      $("#sboxNum"+tipo+i).show();
      $("#sboxNum"+tipo+i).addClass(parpadeo);
      $("#posicionesCaja"+tipo).show();
      $("#nameSbox"+tipo+i).show();
      for (var j = 1; j <= 5 && ic==0; j++) {
         $("#matrizSbox"+i+tipo+"0"+j).show();
      }
      $("#rowCaja"+tipo).append(cadena[41].substr(numBit,1)+' '+cadena[41].substr(numBit+5,1));
      $("#colCaja"+tipo).append(cadena[41].substr(numBit+1,1)+' '+
         cadena[41].substr(numBit+2,1)+' '+cadena[41].substr(numBit+3,1)+' '+cadena[41].substr(numBit+4,1));
      await sleepDES(tCAdd+2500);
      $("#xorCajaNum"+tipo+i).removeClass(parpadeo);
      $("#sboxNum"+tipo+i).removeClass(parpadeo);
      await sleepDES(tCRemove);
      if (i!=8) {
         $("#nameSbox"+tipo+i).hide();
         for (var j = 1; j <= 5 && ic==0; j++) {
            $("#matrizSbox"+i+tipo+"0"+j).hide();
         }
         $("#rowCaja"+tipo).html('Fila: ');
         $("#colCaja"+tipo).html('Columna: ');
      }
      numBit=numBit+6;
      valMatrizPC1++;
   }
   if(ic==0){
      await sleepDES(tCAdd);
      $("#infoDes09"+tipo).show();
      $(window).scrollTop($("#permutaSbox"+tipo).offset().top);
      $("#PFin"+tipo).show();
      $("#sboxResult"+tipo).append('<label class="circulo">S-Box: </label>');
      $("#permutaSbox"+tipo).append('<label class="circulo">Permutación: </label>');
      $(window).scrollTop($("#permutaSbox"+tipo).offset().top);
   }
   numBit=1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#sboxResult"+tipo).append('<label id="sboxNumR'+tipo+i+'"></label><label class="circulo"></label>');
      $("#permutaSbox"+tipo).append('<label id="sboxPer'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 4 && ic==0; j++) {
         $("#sboxNumR"+tipo+i).append('<label id="bitNoSboxR'+numBit+tipo+'">'+cadena[42].substr(numBit,1)+'</label>');
         $("#sboxPer"+tipo+i).append('<label id="bitNoSboxPer'+numBit+tipo+'" style="display:none;">'+cadena[43].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=32 && ic==0; i++){
      $("#bitNoSboxR"+P_perm[valMatrizPC1]+tipo).addClass(parpadeo);
      $("#celdaPFin1"+tipo+P_perm[valMatrizPC1]).addClass(parpadeo);
      $("#bitNoSboxPer"+valMatrizPC1+tipo).show();
      $("#bitNoSboxPer"+valMatrizPC1+tipo).addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNoSboxR"+P_perm[valMatrizPC1]+tipo).removeClass(parpadeo);
      $("#celdaPFin1"+tipo+P_perm[valMatrizPC1]).removeClass(parpadeo);
      $("#bitNoSboxPer"+valMatrizPC1+tipo).removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if(ic==0){
      $("#infoDes010"+tipo).show();
      $(window).scrollTop($("#newLeft"+tipo).offset().top);
      $("#newLeft"+tipo).append('<label class="circulo">Nuevo valor de L = R: </label>');
      $(window).scrollTop($("#newLeft"+tipo).offset().top);
      $("#newRight"+tipo).append('<label class="circulo">Nuevo valor de R = L xor S-Box: </label>');
   }
   numBit = 1;
   for (var i = 1; i <= 4 && ic==0; i++) {
      $("#newLeft"+tipo).append('<label id="newle'+tipo+i+'"></label><label class="circulo"></label>');
      $("#newRight"+tipo).append('<label id="newri'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#newle"+tipo+i).append('<label id="bitNoNL'+numBit+tipo+'">'+cadena[44].substr(numBit,1)+'</label>');
         $("#newri"+tipo+i).append('<label id="bitNoNR'+numBit+tipo+'">'+cadena[45].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   if(ic==0){
      await sleepDES(tCAdd);
      await sleepDES(tCAdd+5000);
      $("#infoDes011"+tipo).show();
      $(window).scrollTop($("#PermutaInversa"+tipo).offset().top);
      $("#PInv"+tipo).show();
      $("#lastLeftRight"+tipo).append('<label class="circulo">Union de L y R: </label>');
      if (tipo=='C') {
         $("#PermutaInversa"+tipo).append('<label class="circulo">Mensaje claro cifrado en binario: </label>');
         $(window).scrollTop($("#PermutaInversa"+tipo).offset().top);
      } else{
         $("#PermutaInversa"+tipo).append('<label class="circulo">Criptograma descifrado en binario: </label>');
         $(window).scrollTop($("#PermutaInversa"+tipo).offset().top);
      }
   }
   numBit = 1;
   for (var i = 1; i <= 8 && ic==0; i++) {
      $("#lastLeftRight"+tipo).append('<label id="lastLR'+tipo+i+'"></label><label class="circulo"></label>');
      $("#PermutaInversa"+tipo).append('<label id="perInversa'+tipo+i+'"></label><label class="circulo"></label>');
      for (var j = 1; j <= 8 && ic==0; j++) {
         $("#lastLR"+tipo+i).append('<label id="bitNoLastLR'+numBit+tipo+'">'+cadena[166].substr(numBit,1)+'</label>');
         $("#perInversa"+tipo+i).append('<label id="bitNoPerInv'+numBit+tipo+'" style="display:none;">'+cadena[167].substr(numBit,1)+'</label>');
         numBit++;
      }
   }
   valMatrizPC1 = 1;
   for(var i=1; i<=64 && ic==0; i++){
      $("#bitNoLastLR"+FP_perm[valMatrizPC1]+tipo).addClass(parpadeo);
      $("#celdaPInv1"+tipo+FP_perm[valMatrizPC1]).addClass(parpadeo);
      $("#bitNoPerInv"+valMatrizPC1+tipo).show();
      $("#bitNoPerInv"+valMatrizPC1+tipo).addClass(parpadeo);
      await sleepDES(tCAdd);
      $("#bitNoLastLR"+FP_perm[valMatrizPC1]+tipo).removeClass(parpadeo);
      $("#celdaPInv1"+tipo+FP_perm[valMatrizPC1]).removeClass(parpadeo);
      $("#bitNoPerInv"+valMatrizPC1+tipo).removeClass(parpadeo);
      await sleepDES(tCRemove);
      valMatrizPC1++;
   }
   if (ic==0) {
      $("#tabHacerLlave"+tipo).show();
      if (tipo=='C') {
         $("#textoFinal"+tipo).append('<label class="circulo">Mensaje claro cifrado: '+str+' </label>');
         $("#out-txtCifradoDes").val(str);
         toastr.options.timeOut = "1000";
         toastr['success'](mensaje_7);
         $("#btn-cifrarDes").show();
         $("#btn-tipoCiDes").show();
         $("#btn-cancelarCifrarDes").hide();
      } else{
         $("#out-txtPlanoDes").val(str);
         $("#textoFinal"+tipo).append('<label class="circulo">Criptograma descifrado: '+str+' </label>');
         toastr.options.timeOut = "1000";
         toastr['success'](mensaje_8);
         $("#btn-copiarTextoDes").removeAttr("disabled");
         $("#btn-descifrarDes").show();
         $("#btn-tipoDeDes").show();
         $("#btn-cancelarDescifrarDes").hide();
      }
   }
}

function cifrarArchivoDes(evt) {
    var fileInput = document.getElementById('fileInputDesCifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaDesCifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;      
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarDesCifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

    var error = validarEntradaCifradoArchivoDesLlave();
    $('#llaveDesCifrado').removeClass('input-error').next().remove();

    if (error==""){
        if(fileInput.files.length == 0){
            $('#fileDisplayAreaDesCifrado').html(mensaje_92);
            return;
        }if(typeof file!=='undefined'){
           if(file.size < 1024*1024) {
              if (file.type.match(textType)){
                  var reader = new FileReader();
                  reader.onload = function(e){
                      textoPlano = reader.result;
                      var key = chars_from_hex($("#llaveDesCifrado").val());
                      var vector = null;

                      textoCifrado = hex_from_chars(des(key, textoPlano, 1, vector ? 1 : 0, vector));

                      fileDisplayArea.innerText= textoCifrado;
                      textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
                  
                      //PARA DESCARGAR
                      var element = document.createElement('a');
                      element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
                      element.setAttribute('download', "ArchivoCifradoDES.txt");
                      element.style.display = 'none';
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                      $("#progressbarDesCifrado").css('width','100%').attr('aria-valuenow', '100');
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
        $('#llaveDesCifrado').addClass('input-error').after('<div id="llaveDesCifrado-error" class="text-danger">'+error+'</div>');
    }
}

function descifrarArchivoDes(evt) {
    var fileInput = document.getElementById('fileInputDesDescifrado');
    var fileDisplayArea = document.getElementById('fileDisplayAreaDesDescifrado');
    var file = fileInput.files[0];
    var textType = /text.*/;      
    var textoPlano = "";
    var textoCifrado = "";
    $("#progressbarDesDescifrado").addClass("notransition").css('width','0%').attr('aria-valuenow', '0');

     var error = validarEntradaDescifradoArchivoDesLlave();
    $('#llaveDesDescifrado').removeClass('input-error').next().remove();

    if (error==""){
        if(fileInput.files.length == 0){
            $('#fileDisplayAreaDesDescifrado').html(mensaje_93);
            return;
        }if(typeof file!=='undefined'){
           if(file.size <= 1024*100*2) {
               if (file.type.match(textType)){
                   var reader = new FileReader();
                   reader.onload = function(e){
                       textoPlano = chars_from_hex(reader.result);
                       var key = chars_from_hex($("#llaveDesDescifrado").val());
                       var vector = null;

                       textoCifrado = des(key, textoPlano, 0, vector ? 1 : 0, vector);

                       fileDisplayArea.innerText= textoCifrado;
                       textoCifrado= "\ufeff"+textoCifrado; //<------------------------------------ PARA QUE SEA utf-8 con bom
                   
                       //PARA DESCARGAR
                       var element = document.createElement('a');
                       element.setAttribute('href', 'data:text/plain;charset=ISO-8859-1,' + encodeURIComponent(textoCifrado));
                       element.setAttribute('download', "ArchivoDescifradoDES.txt");
                       element.style.display = 'none';
                       document.body.appendChild(element);
                       element.click();
                       document.body.removeChild(element);
                       $("#progressbarDesDescifrado").css('width','100%').attr('aria-valuenow', '100');
                   }
                   reader.readAsText(file, 'ISO-8859-1');
               } else {
                   fileDisplayArea.innerText = mensaje_89;
               }
           } else {
               fileDisplayArea.innerText = mensaje_91;
           }
       }
   } else {
        $('#llaveDesDescifrado').addClass('input-error').after('<div id="llaveDesDescifrado-error" class="text-danger">'+error+'</div>');
    }
}

function chars_from_hex(inputstr) {
    var outputstr = '';
    inputstr = inputstr.replace(/^(0x)?/g, '');
    inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
    inputstr = inputstr.split('');
    for(var i=0; i<inputstr.length; i+=2) {
        outputstr += String.fromCharCode(parseInt(inputstr[i]+''+inputstr[i+1], 16));
    }
    return outputstr;
}

function hex_from_chars(inputstr) {
    var delimiter = '';
    var outputstr = '';
    var hex = "0123456789abcdef";
    hex = hex.split('');
    var i, n;
    var inputarr = inputstr.split('');
    for(var i=0; i<inputarr.length; i++) {
        if(i > 0) outputstr += delimiter;
        if(!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
        n = inputstr.charCodeAt(i);
        outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
    }
    return outputstr;
}

//des
//this takes the key, the message, and whether to encrypt or decrypt
function des (key, message, encrypt, mode, iv, padding) {
  //declaring this locally speeds things up a bit
  var spfunction1 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1010400,0x1010404,0x400,0x1000404,0x1010004,0x1000000,0x4,0x404,0x1000400,0x1000400,0x10400,0x10400,0x1010000,0x1010000,0x1000404,0x10004,0x1000004,0x1000004,0x10004,0,0x404,0x10404,0x1000000,0x10000,0x1010404,0x4,0x1010000,0x1010400,0x1000000,0x1000000,0x400,0x1010004,0x10000,0x10400,0x1000004,0x400,0x4,0x1000404,0x10404,0x1010404,0x10004,0x1010000,0x1000404,0x1000004,0x404,0x10404,0x1010400,0x404,0x1000400,0x1000400,0,0x10004,0x10400,0,0x1010004);
  var spfunction2 = new Array (-0x7fef7fe0,-0x7fff8000,0x8000,0x108020,0x100000,0x20,-0x7fefffe0,-0x7fff7fe0,-0x7fffffe0,-0x7fef7fe0,-0x7fef8000,-0x80000000,-0x7fff8000,0x100000,0x20,-0x7fefffe0,0x108000,0x100020,-0x7fff7fe0,0,-0x80000000,0x8000,0x108020,-0x7ff00000,0x100020,-0x7fffffe0,0,0x108000,0x8020,-0x7fef8000,-0x7ff00000,0x8020,0,0x108020,-0x7fefffe0,0x100000,-0x7fff7fe0,-0x7ff00000,-0x7fef8000,0x8000,-0x7ff00000,-0x7fff8000,0x20,-0x7fef7fe0,0x108020,0x20,0x8000,-0x80000000,0x8020,-0x7fef8000,0x100000,-0x7fffffe0,0x100020,-0x7fff7fe0,-0x7fffffe0,0x100020,0x108000,0,-0x7fff8000,0x8020,-0x80000000,-0x7fefffe0,-0x7fef7fe0,0x108000);
  var spfunction3 = new Array (0x208,0x8020200,0,0x8020008,0x8000200,0,0x20208,0x8000200,0x20008,0x8000008,0x8000008,0x20000,0x8020208,0x20008,0x8020000,0x208,0x8000000,0x8,0x8020200,0x200,0x20200,0x8020000,0x8020008,0x20208,0x8000208,0x20200,0x20000,0x8000208,0x8,0x8020208,0x200,0x8000000,0x8020200,0x8000000,0x20008,0x208,0x20000,0x8020200,0x8000200,0,0x200,0x20008,0x8020208,0x8000200,0x8000008,0x200,0,0x8020008,0x8000208,0x20000,0x8000000,0x8020208,0x8,0x20208,0x20200,0x8000008,0x8020000,0x8000208,0x208,0x8020000,0x20208,0x8,0x8020008,0x20200);
  var spfunction4 = new Array (0x802001,0x2081,0x2081,0x80,0x802080,0x800081,0x800001,0x2001,0,0x802000,0x802000,0x802081,0x81,0,0x800080,0x800001,0x1,0x2000,0x800000,0x802001,0x80,0x800000,0x2001,0x2080,0x800081,0x1,0x2080,0x800080,0x2000,0x802080,0x802081,0x81,0x800080,0x800001,0x802000,0x802081,0x81,0,0,0x802000,0x2080,0x800080,0x800081,0x1,0x802001,0x2081,0x2081,0x80,0x802081,0x81,0x1,0x2000,0x800001,0x2001,0x802080,0x800081,0x2001,0x2080,0x800000,0x802001,0x80,0x800000,0x2000,0x802080);
  var spfunction5 = new Array (0x100,0x2080100,0x2080000,0x42000100,0x80000,0x100,0x40000000,0x2080000,0x40080100,0x80000,0x2000100,0x40080100,0x42000100,0x42080000,0x80100,0x40000000,0x2000000,0x40080000,0x40080000,0,0x40000100,0x42080100,0x42080100,0x2000100,0x42080000,0x40000100,0,0x42000000,0x2080100,0x2000000,0x42000000,0x80100,0x80000,0x42000100,0x100,0x2000000,0x40000000,0x2080000,0x42000100,0x40080100,0x2000100,0x40000000,0x42080000,0x2080100,0x40080100,0x100,0x2000000,0x42080000,0x42080100,0x80100,0x42000000,0x42080100,0x2080000,0,0x40080000,0x42000000,0x80100,0x2000100,0x40000100,0x80000,0,0x40080000,0x2080100,0x40000100);
  var spfunction6 = new Array (0x20000010,0x20400000,0x4000,0x20404010,0x20400000,0x10,0x20404010,0x400000,0x20004000,0x404010,0x400000,0x20000010,0x400010,0x20004000,0x20000000,0x4010,0,0x400010,0x20004010,0x4000,0x404000,0x20004010,0x10,0x20400010,0x20400010,0,0x404010,0x20404000,0x4010,0x404000,0x20404000,0x20000000,0x20004000,0x10,0x20400010,0x404000,0x20404010,0x400000,0x4010,0x20000010,0x400000,0x20004000,0x20000000,0x4010,0x20000010,0x20404010,0x404000,0x20400000,0x404010,0x20404000,0,0x20400010,0x10,0x4000,0x20400000,0x404010,0x4000,0x400010,0x20004010,0,0x20404000,0x20000000,0x400010,0x20004010);
  var spfunction7 = new Array (0x200000,0x4200002,0x4000802,0,0x800,0x4000802,0x200802,0x4200800,0x4200802,0x200000,0,0x4000002,0x2,0x4000000,0x4200002,0x802,0x4000800,0x200802,0x200002,0x4000800,0x4000002,0x4200000,0x4200800,0x200002,0x4200000,0x800,0x802,0x4200802,0x200800,0x2,0x4000000,0x200800,0x4000000,0x200800,0x200000,0x4000802,0x4000802,0x4200002,0x4200002,0x2,0x200002,0x4000000,0x4000800,0x200000,0x4200800,0x802,0x200802,0x4200800,0x802,0x4000002,0x4200802,0x4200000,0x200800,0,0x2,0x4200802,0,0x200802,0x4200000,0x800,0x4000002,0x4000800,0x800,0x200002);
  var spfunction8 = new Array (0x10001040,0x1000,0x40000,0x10041040,0x10000000,0x10001040,0x40,0x10000000,0x40040,0x10040000,0x10041040,0x41000,0x10041000,0x41040,0x1000,0x40,0x10040000,0x10000040,0x10001000,0x1040,0x41000,0x40040,0x10040040,0x10041000,0x1040,0,0,0x10040040,0x10000040,0x10001000,0x41040,0x40000,0x41040,0x40000,0x10041000,0x1000,0x40,0x10040040,0x1000,0x41040,0x10001000,0x40,0x10000040,0x10040000,0x10040040,0x10000000,0x40000,0x10001040,0,0x10041040,0x40040,0x10000040,0x10040000,0x10001000,0x10001040,0,0x10041040,0x41000,0x41000,0x1040,0x1040,0x40040,0x10000000,0x10041000);

  //create the 16 or 48 subkeys we will need
  var keys = des_createKeys (key);
  var m=0, i, j, temp, temp2, right1, right2, left, right, looping;
  var cbcleft, cbcleft2, cbcright, cbcright2
  var endloop, loopinc;
  var len = message.length;
  var chunk = 0;
  //set up the loops for single and triple des
  var iterations = keys.length == 32 ? 3 : 9; //single or triple des
  if (iterations == 3) {looping = encrypt ? new Array (0, 32, 2) : new Array (30, -2, -2);}
  else {looping = encrypt ? new Array (0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array (94, 62, -2, 32, 64, 2, 30, -2, -2);}

  //pad the message depending on the padding parameter
  if (padding == 2) message += "        "; //pad the message with spaces
  else if (padding == 1) {temp = 8-(len%8); message += String.fromCharCode (temp,temp,temp,temp,temp,temp,temp,temp); if (temp==8) len+=8;} //PKCS7 padding
  else if (!padding) message += "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes

  //store the result here
  result = "";
  tempresult = "";

  if (mode == 1) { //CBC mode
    cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
    cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
    m=0;
  }

  //loop through each 64 bit chunk of the message
  while (m < len) {
    left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
    right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

    //for Cipher Block Chaining mode, xor the message with the previous result
    if (mode == 1) {if (encrypt) {left ^= cbcleft; right ^= cbcright;} else {cbcleft2 = cbcleft; cbcright2 = cbcright; cbcleft = left; cbcright = right;}}

    //first each 64 but chunk of the message must be permuted according to IP
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
    temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
    temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

    left = ((left << 1) | (left >>> 31)); 
    right = ((right << 1) | (right >>> 31)); 

    //do this either 1 or 3 times for each chunk of the message
    for (j=0; j<iterations; j+=3) {
      endloop = looping[j+1];
      loopinc = looping[j+2];
      //now go through and perform the encryption or decryption  
      for (i=looping[j]; i!=endloop; i+=loopinc) { //for efficiency
        right1 = right ^ keys[i]; 
        right2 = ((right >>> 4) | (right << 28)) ^ keys[i+1];
        //the result is attained by passing these bytes through the S selection functions
        temp = left;
        left = right;
        right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]
              | spfunction6[(right1 >>>  8) & 0x3f] | spfunction8[right1 & 0x3f]
              | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f]
              | spfunction5[(right2 >>>  8) & 0x3f] | spfunction7[right2 & 0x3f]);
      }
      temp = left; left = right; right = temp; //unreverse left and right
    } //for either 1 or 3 iterations

    //move then each one bit to the right
    left = ((left >>> 1) | (left << 31)); 
    right = ((right >>> 1) | (right << 31)); 

    //now perform IP-1, which is IP in the opposite direction
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
    temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);

    //for Cipher Block Chaining mode, xor the message with the previous result
    if (mode == 1) {if (encrypt) {cbcleft = left; cbcright = right;} else {left ^= cbcleft2; right ^= cbcright2;}}
    tempresult += String.fromCharCode ((left>>>24), ((left>>>16) & 0xff), ((left>>>8) & 0xff), (left & 0xff), (right>>>24), ((right>>>16) & 0xff), ((right>>>8) & 0xff), (right & 0xff));

    chunk += 8;
    if (chunk == 512) {result += tempresult; tempresult = ""; chunk = 0;}
  } //for every 8 characters, or 64 bits in the message

  //return the result as an array
  result += tempresult;
  result = result.replace(/\0*$/g, "");
  return result;
} //end of des

//des_createKeys
//this takes as input a 64 bit key (even though only 56 bits are used)
//as an array of 2 integers, and returns 16 48 bit keys
function des_createKeys (key) {
  //declaring this locally speeds things up a bit
  pc2bytes0  = new Array (0,0x4,0x20000000,0x20000004,0x10000,0x10004,0x20010000,0x20010004,0x200,0x204,0x20000200,0x20000204,0x10200,0x10204,0x20010200,0x20010204);
  pc2bytes1  = new Array (0,0x1,0x100000,0x100001,0x4000000,0x4000001,0x4100000,0x4100001,0x100,0x101,0x100100,0x100101,0x4000100,0x4000101,0x4100100,0x4100101);
  pc2bytes2  = new Array (0,0x8,0x800,0x808,0x1000000,0x1000008,0x1000800,0x1000808,0,0x8,0x800,0x808,0x1000000,0x1000008,0x1000800,0x1000808);
  pc2bytes3  = new Array (0,0x200000,0x8000000,0x8200000,0x2000,0x202000,0x8002000,0x8202000,0x20000,0x220000,0x8020000,0x8220000,0x22000,0x222000,0x8022000,0x8222000);
  pc2bytes4  = new Array (0,0x40000,0x10,0x40010,0,0x40000,0x10,0x40010,0x1000,0x41000,0x1010,0x41010,0x1000,0x41000,0x1010,0x41010);
  pc2bytes5  = new Array (0,0x400,0x20,0x420,0,0x400,0x20,0x420,0x2000000,0x2000400,0x2000020,0x2000420,0x2000000,0x2000400,0x2000020,0x2000420);
  pc2bytes6  = new Array (0,0x10000000,0x80000,0x10080000,0x2,0x10000002,0x80002,0x10080002,0,0x10000000,0x80000,0x10080000,0x2,0x10000002,0x80002,0x10080002);
  pc2bytes7  = new Array (0,0x10000,0x800,0x10800,0x20000000,0x20010000,0x20000800,0x20010800,0x20000,0x30000,0x20800,0x30800,0x20020000,0x20030000,0x20020800,0x20030800);
  pc2bytes8  = new Array (0,0x40000,0,0x40000,0x2,0x40002,0x2,0x40002,0x2000000,0x2040000,0x2000000,0x2040000,0x2000002,0x2040002,0x2000002,0x2040002);
  pc2bytes9  = new Array (0,0x10000000,0x8,0x10000008,0,0x10000000,0x8,0x10000008,0x400,0x10000400,0x408,0x10000408,0x400,0x10000400,0x408,0x10000408);
  pc2bytes10 = new Array (0,0x20,0,0x20,0x100000,0x100020,0x100000,0x100020,0x2000,0x2020,0x2000,0x2020,0x102000,0x102020,0x102000,0x102020);
  pc2bytes11 = new Array (0,0x1000000,0x200,0x1000200,0x200000,0x1200000,0x200200,0x1200200,0x4000000,0x5000000,0x4000200,0x5000200,0x4200000,0x5200000,0x4200200,0x5200200);
  pc2bytes12 = new Array (0,0x1000,0x8000000,0x8001000,0x80000,0x81000,0x8080000,0x8081000,0x10,0x1010,0x8000010,0x8001010,0x80010,0x81010,0x8080010,0x8081010);
  pc2bytes13 = new Array (0,0x4,0x100,0x104,0,0x4,0x100,0x104,0x1,0x5,0x101,0x105,0x1,0x5,0x101,0x105);

  //how many iterations (1 for des, 3 for triple des)
  var iterations = key.length > 8 ? 3 : 1; //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
  //stores the return keys
  var keys = new Array (32 * iterations);
  //now define the left shifts which need to be done
  var shifts = new Array (0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
  //other variables
  var lefttemp, righttemp, m=0, n=0, temp;

  for (var j=0; j<iterations; j++) { //either 1 or 3 iterations
    left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
    right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
    temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
    temp = ((left >>> 2) ^ right) & 0x33333333; right ^= temp; left ^= (temp << 2);
    temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

    //the right side needs to be shifted and to get the last four bits of the left side
    temp = (left << 8) | ((right >>> 20) & 0x000000f0);
    //left needs to be put upside down
    left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
    right = temp;

    //now go through and perform these shifts on the left and right keys
    for (i=0; i < shifts.length; i++) {
      //shift the keys either one or two bits to the left
      if (shifts[i]) {left = (left << 2) | (left >>> 26); right = (right << 2) | (right >>> 26);}
      else {left = (left << 1) | (left >>> 27); right = (right << 1) | (right >>> 27);}
      left &= -0xf; right &= -0xf;

      //now apply PC-2, in such a way that E is easier when encrypting or decrypting
      //this conversion will look like PC-2 except only the last 6 bits of each byte are used
      //rather than 48 consecutive bits and the order of lines will be according to 
      //how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
      lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
              | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf]
              | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]
              | pc2bytes6[(left >>> 4) & 0xf];
      righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf]
                | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf]
                | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]
                | pc2bytes13[(right >>> 4) & 0xf];
      temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff; 
      keys[n++] = lefttemp ^ temp; keys[n++] = righttemp ^ (temp << 16);
    }
  } //for each iterations
  //return the keys we've created
  return keys;
} //end of des_createKeys

