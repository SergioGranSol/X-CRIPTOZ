var azul = 0, negro = 1, amarillo = 2 ; verde = 3;

function putparpadeo(id, segundos, color){
    if(color == azul){
        if(segundos == 0.25)
            $(id).addClass('parpadeo0_25s-azul');
        else if(segundos == 0.5)
            $(id).addClass('parpadeo0_5s-azul');
        else if(segundos == 0.75)
            $(id).addClass('parpadeo0_75s-azul');
        else if(segundos == 1)
            $(id).addClass('parpadeo1s-azul');
        else if(segundos == 1.5)
            $(id).addClass('parpadeo1_5s-azul');
        else if(segundos == 2)
            $(id).addClass('parpadeo2s-azul');
        else if(segundos == 2.5)
            $(id).addClass('parpadeo2_5s-azul');
        else if(segundos == 3)
            $(id).addClass('parpadeo3s-azul');
        else if(segundos == 4)
            $(id).addClass('parpadeo4s-azul');
        else if(segundos == 5)
            $(id).addClass('parpadeo5s-azul');
        else if(segundos == 6)
            $(id).addClass('parpadeo6s-azul');
        else if(segundos == 8)
            $(id).addClass('parpadeo8s-azul');
    }
    else if(color == negro){
        if(segundos == 0.5)
            $(id).addClass('parpadeo0_5s-negro');
        else if(segundos == 1)
            $(id).addClass('parpadeo1s-negro');
        else if(segundos == 2)
            $(id).addClass('parpadeo2s-negro');
    }
    else if(color == amarillo){
        if(segundos == 0.5)
            $(id).addClass('parpadeo0_5s-amarillo');
        else if(segundos == 1)
            $(id).addClass('parpadeo1s-amarillo');
        else if(segundos == 2)
            $(id).addClass('parpadeo2s-amarillo');
        else if(segundos == 4)
            $(id).addClass('parpadeo4s-amarillo');
        else if(segundos == 8)
            $(id).addClass('parpadeo8s-amarillo');
    }
    else if(color == verde){
        if(segundos == 0.5)
            $(id).addClass('parpadeo0_5s-verde');
        else if(segundos == 1)
            $(id).addClass('parpadeo1s-verde');
        else if(segundos == 2)
            $(id).addClass('parpadeo2s-verde');
    }
}

function removeputparpadeo(id, segundos, color){
    if(color == azul){
        if(segundos == 0.25)
            $(id).removeClass('parpadeo0_25s-azul');
        else if(segundos == 0.5)
            $(id).removeClass('parpadeo0_5s-azul');
        else if(segundos == 0.75)
            $(id).removeClass('parpadeo0_75s-azul');
        else if(segundos == 1)
            $(id).removeClass('parpadeo1s-azul');
        else if(segundos == 1.5)
            $(id).removeClass('parpadeo1_5s-azul');
        else if(segundos == 2)
            $(id).removeClass('parpadeo2s-azul');
        else if(segundos == 2.5)
            $(id).removeClass('parpadeo2_5s-azul');
        else if(segundos == 3)
            $(id).removeClass('parpadeo3s-azul');
        else if(segundos == 4)
            $(id).removeClass('parpadeo4s-azul');
        else if(segundos == 5)
            $(id).removeClass('parpadeo5s-azul');
        else if(segundos == 6)
            $(id).removeClass('parpadeo6s-azul');
    }
    else if(color == negro){
        if(segundos == 0.5)
            $(id).removeClass('parpadeo0_5s-negro');
        else if(segundos == 1)
            $(id).removeClass('parpadeo1s-negro');
        else if(segundos == 2)
            $(id).removeClass('parpadeo2s-negro');
    }
    else if(color == amarillo){
        if(segundos == 1)
            $(id).removeClass('parpadeo1s-amarillo');
        else if(segundos == 2)
            $(id).removeClass('parpadeo2s-amarillo');
        else if(segundos == 4)
            $(id).removeClass('parpadeo4s-amarillo');
    }
    else if(color == verde){
        if(segundos == 0.5)
            $(id).removeClass('parpadeo0_5s-verde');
        else if(segundos == 1)
            $(id).removeClass('parpadeo1s-verde');
        else if(segundos == 2)
            $(id).removeClass('parpadeo2s-verde');
    }
}