var infoMonoalfabetica ='<div class="content-heading clearfix" id="infoMonoalfabetica"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía clásica</li> <li class="active"><a href="#">Sustitución monoalfabética</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía clásica</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Sustitución monoalfabética</h3> <p>En el cifrado por sustitución, se realiza un método de cifrado por el cual unidades de texto plano son sustituidas con texto cifrado siguiendo un sistema, las "unidades" pueden ser una sola letra (el caso más común), pares de letras, tríos de letras, mezclas de lo anterior, entre otros. El receptor descifra el texto realizando la sustitución en sentido inversa.</p><br> <p>Se dice que un sistema de cifrado de sustitución es monoalfabético cuando cada carácter se sustituye siempre por un determinado carácter del alfabeto del texto cifrado. En este tipo de cifrados al alfabeto usado para el texto cifrado se le llama alfabeto de sustitución.</p> <br><p>En este tipo de sustitución al texto plano siempre le va a corresponder el mismo texto cifrado. Los métodos del cifrado César, cifrado Atbash, cifrado de Polybios y cifrado Playfair son ejemplos de métodos de cifrado de este tipo, los primeros tres además consisten en sustituciones monográmicas debido a que se cifra letra por letra, el último de ellos (cifrado de Playfair) consiste en sustitución monoalfabética poligrámica debido a que se cifra sobre grupos de caracteres.</p> </p> </div> </div> </div> </div>'

var infoPolialfabetica ='<div class="content-heading clearfix" id="infoPolialfabetica"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía clásica</li> <li class="active"><a href="#">Sustitución polialfabética</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía clásica</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Sustitución polialfabética</h3> <p>Se dice que un sistema de cifrado de sustitución es polialfabético cuando cada carácter <b>NO</b> se sustituye siempre por el mismo carácter. Es decir, en el sistema hay implicados varios alfabetos y dependiendo de la circunstancias se aplicará uno u otro. Los distintos métodos se diferencian entre sí por la forma en que se definen los distintos alfabetos y por el método que se usa para saber en qué momento hay que usar cada uno.</p><br> <p>A diferencia de la sustitución monoalfábetica en donde al texto plano siempre le corresponde el mismo texto cifrado, en la sustitución polialfabética el texto cifrado resultante para cada texto plano puede ser diferente dependiendo de la clave que se utilice para cifrar, por lo que se dice que existen múltiples alfabetos de cifrado, de ahí el nombre de sustitución polialfabética. Los métodos cifrado de Alberti, cifrado por desplazamiento, cifrado de Vigenère y el cifrado de Vernam son ejemplos de sustitución polialfabética.</p> </p> </div> </div> </div> </div> '

var infoTransposicion ='<div class="content-heading clearfix" id="infoTransposicion"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía clásica</li> <li class="active"><a href="#">Transposición</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía clásica</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Transposición </h3> <p>Un cifrado por transposición es un tipo de cifrado en el que unidades de texto plano se cambian de posición siguiendo un esquema definido, las unidades de texto pueden ser de una sola letra (el caso más común), pares de letras, tríos de letras o mezclas de lo anterior.</p><br> <p>A diferencia de los algoritmos de sustitución en donde los caracteres que conforman el mensaje en claro son sustituidos por otros, los algoritmos de transposición cambian los caracteres de posición dentro del mismo mensaje dando lugar al texto cifrado el cual no puede ser comprendido a simple vista.</p> </p> </div> </div> </div> </div> '

var infoCifradoSimetrico ='<div class="content-heading clearfix" id="infoCifradoSimetrico"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía moderna</li> <li class="active"><a href="#">Simétrico</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía moderna</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Cifrado Simétrico</h3> <p>Un sistema de cifrado simétrico es un tipo de cifrado que usa una misma clave para cifrar y para descifrar. Las dos partes que se comunican mediante el cifrado simétrico deben estar de acuerdo en la clave a usar de antemano. Una vez de acuerdo, el remitente cifra un mensaje usando la clave, lo envía al destinatario, y éste lo descifra usando la misma clave.</p><br> <p>Dado que toda la seguridad está en la clave, es importante que sea muy difícil adivinar el tipo de clave que se usa en el cifrado simétrico. Por ello se requiere que el espacio de posibles claves sea amplio.</p> </p> </div> </div> </div> </div>'

var infoCifradoAsimetrico ='<div class="content-heading clearfix" id="infoCifradoAsimetrico"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía moderna</li> <li class="active"><a href="#">Asimétrico</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía moderna</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Cifrado Asimétrico</h3> <p>Un sistema de cifrado asimétrico, también llamado algoritmo de criptografía de clave pública, es el método criptográfico que usa un par de claves para el envío de mensajes. Las dos claves pertenecen a la misma persona que ha enviado el mensaje. Una clave es pública y se puede entregar a cualquier persona, la otra clave es privada y el propietario debe guardarla de modo que nadie tenga acceso a ella.</p><br> <p>Si el remitente usa la clave pública del destinatario para cifrar el mensaje, una vez cifrado, sólo la clave privada del destinatario podrá descifrar este mensaje, ya que es el único que la conoce. Por tanto se logra la confidencialidad del envío del mensaje, nadie salvo el destinatario puede descifrarlo.</p><br> <p>Los sistemas de cifrado asimétricos o sistemas de cifrado de clave pública se inventaron con el fin de evitar por completo el problema del intercambio de claves de los sistemas de cifrado simétricos. Con las claves públicas no es necesario que el remitente y el destinatario se pongan de acuerdo en la clave a emplear.</p> </p> </div> </div> </div> </div>'

var infoFuncionesHash ='<div class="content-heading clearfix" id="infoFuncionesHash"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía moderna</li> <li class="active"><a href="#">Funciones Hash</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía moderna</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Funciones Hash</h3> <p>Los hash o funciones de resumen son algoritmos que consiguen crear a partir de una entrada (ya sea un texto, una contraseña o un archivo, por ejemplo) una salida alfanumérica de longitud normalmente fija que representa un resumen de toda la información que se le ha dado (es decir, a partir de los datos de la entrada crea una cadena que solo puede volverse a crear con esos mismos datos).</p><br> <p>Estas funciones no tienen el mismo propósito que la criptografía simétrica y asimétrica, tiene varios cometidos, entre ellos está asegurar que no se ha modificado un archivo en una transmisión, hacer ilegible una contraseña o firmar digitalmente un documento.</p> </p> </div> </div> </div> </div>'

var infoFirmaDigital ='<div class="content-heading clearfix" id="infoFirmaDigital"> <ul class="breadcrumb"> <li><i class="fa fa-home"></i> Criptografía moderna</li> <li class="active"><a href="#">Firma Digital</a></li> </ul> </div> <div class="container-fluid"> <div class="panel panel-headline"> <div class="panel-body"> <h1>Criptografía moderna</h1><br><br> <div class="well"> <p class="text-center"> <h3 class="text-primary">Firma Digital</h3> <p>La firma digital está basada en el funcionamiento de los sistemas de cifrado asimétrico, si el propietario del par de claves usa su clave privada para cifrar el mensaje, cualquiera puede descifrarlo utilizando su clave pública. En este caso se consigue por tanto la identificación y autentificación del remitente, ya que se sabe que sólo pudo haber sido él quien empleó su clave privada (salvo que alguien se la hubiese podido robar). Así esta idea es el fundamento de la firma electrónica.</p> </p> </div> </div> </div> </div>'

var creditos = '<div id="creditos" class="modal fade" role="dialog"> <div class="modal-dialog" style="width: 368px;"> <div class="modal-content"> <div class="modal-header" style="background-color: #2b333e; color: white;"> <button type="button"  style="color: white;" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Equipo de desarrollo</h4> </div> <div class="modal-body"> <div class="panel-body"> <ul class="list-unstyled list-contacts"> <li> <div class="media"> <div class="picture custom-bg-blue">SG</div> </div> <div class="info"> <span class="name">Granados Solano Sergio</span> <span class="email">Desarrollador</span> </div> </li> <li> <div class="media"> <div class="picture custom-bg-red">IM</div> </div> <div class="info"> <span class="name">Meléndez Enríquez Iván</span> <span class="email">Desarrollador</span> </div> </li> <li> <div class="media"> <div class="picture custom-bg-green">MM</div> </div> <div class="info"> <span class="name">Moreno Méndez Mario Isaac</span> <span class="email">Desarrollador</span> </div> </li> </ul> </div> </div> </div> </div> </div>'

$(document).ready(function(){
	$("body").append(creditos);
});

function sustitucionMonoalfabetica(){
	if ($('#infoMonoalfabetica').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoMonoalfabetica).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Monoalfabetica']").addClass('active');
	}
}

function sustitucionPolialfabetica(){
	if ($('#infoPolialfabetica').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoPolialfabetica).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Polialfabetica']").addClass('active');
	}
}

function transposicion(){
	if ($('#infoTransposicion').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoTransposicion).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Transposicion']").addClass('active');
	}
}

function cifradoSimetrico(){
	if ($('#infoCifradoSimetrico').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoCifradoSimetrico).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Simetrico']").addClass('active');
	}
}

function cifradoAsimetrico(){
	if ($('#infoCifradoAsimetrico').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoCifradoAsimetrico).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Asimetrico']").addClass('active');
	}
}

function funcionesHash(){
	if ($('#infoFuncionesHash').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoFuncionesHash).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Hash']").addClass('active');
	}
}

function firmaDigital(){
	if ($('#infoFirmaDigital').length == 0){
		$(".main-content").fadeOut(150,function(){
			if ($(this).next().hasClass('panel')) {
				$(this).next().remove();
			}
			$(this).html(infoFirmaDigital).fadeIn(150);
		});
		$("nav .active").removeClass('active');
		$("a[href='#Firma']").addClass('active');
	}
}

// <div class="content-heading clearfix" id="infoMonoalfabetica">
// 	<ul class="breadcrumb">
// 		<li><i class="fa fa-home"></i> Criptografía clásica</li>
// 		<li class="active"><a href="#">Sustitución Monoalfabética</a></li>
// 	</ul>
// </div>
// <div class="container-fluid">
// 	<div class="panel panel-headline">
// 		<div class="panel-body">
// 			<h1>Criptografía clásica</h1><br><br>
// 			<div class="well">
// 				<p class="text-center">
// 					
// 				</p>
// 			</div>
// 		</div>
// 	</div>
// </div>