$(document).ready(function () {

    //Validar si el navegador soporta localStorage, si no lo soporta lo envia directamente a la pagina de error
    issetLocalStorage();


    //Realizo la peticion para cargar el formulario
    $.ajax({
        type: 'POST',        
        url: url_pv + 'ConvocatoriasWS/search/'+$("#id").attr('value')
    }).done(function (data) {
        if (data == 'error_metodo')
        {
            notify("danger", "ok", "Convocatorias:", "Se registro un error en el método, comuníquese con la mesa de ayuda soporte.convocatorias@scrd.gov.co");
        } 
        else
        {            
            var json = JSON.parse(data);
            
            //Valido que la convocatorias no tenga categorias            
            if(json.convocatoria.tiene_categorias == true){
                $(".sin_categorias").css("display","none");
            }
            
            //Valido que la convocatorias es bolsa
            if(json.convocatoria.bolsa_concursable == true && json.convocatoria.tiene_categorias == false){
                $(".es_bolsa_concursable").css("display","block");
            }
            else
            {
                $(".es_bolsa_concursable").css("display","none");
            }
            
            $('#view_convocatoria').loadJSON(json.convocatoria);
        }
    });

}); 