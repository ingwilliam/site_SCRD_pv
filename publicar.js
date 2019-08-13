//WILLIAM SE QUEDO EN MOSTRAR RONDAS EN LAS CATEGORIAS GENERALES
//HABLE CON CESAR SOBRE EL FUNCIONAMIENTO DEL FORMULARIO DE CRAER RONDAS

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
            
            //verifica si la bolsa aplica para convocatorias sin categorias y convocatorias con categorias generales
            var tipo_convocatoria="";            
                        
            //Valido que la convocatorias no tenga categorias            
            if(json.convocatoria.tiene_categorias == false){
                tipo_convocatoria="general";
                $(".sin_categorias").css("display","block");
                $(".categorias_generales").css("display","none");                
                
                //Listados de la convocatoria general
                if(json.listados != null)
                {
                    if(Object.keys(json.listados).length>0)
                    {
                        var html_table='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                        $.each(json.listados, function (key, documento) {
                                html_table = html_table+'<tr><td>'+documento.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'">'+documento.nombre+'</a></td><td>'+documento.descripcion+'</td></tr>';                    
                        });
                        html_table = html_table+'</tbody></table>';  
                        $( ".documentos_listados" ).append(html_table);                    
                    }
                }
                                
            }
            else
            {
                //Valido que la convocatorias tenga categorias generales
                if(json.convocatoria.tiene_categorias == true && json.convocatoria.diferentes_categorias == false){                                 
                    tipo_convocatoria="general";
                    $(".categorias_generales").css("display","block");
                    
                    //categorias de la convocatoria
                    if(Object.keys(json.categorias).length>0)
                    {
                        $(".tablas_categorias_generales").css("display","block");                        
                        //creo tablas de categorias
                        var html_table='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Categoria</th><th>Descripción</th></tr></thead><tbody>';                    
                        $.each(json.categorias, function (key, categoria) {
                            html_table = html_table+'<tr><td>'+categoria.orden+'</td><td>'+categoria.nombre+'</td><td>'+categoria.descripcion+'</td></tr>';                    
                        });
                        html_table = html_table+'</tbody></table>';                    
                        $( ".tablas_categorias_generales" ).append(html_table);                    
                    }                                        
                    
                    if(json.rondas_evaluacion != null)
                    {
                        if(Object.keys(json.rondas_evaluacion).length>0)
                        {                      
                            var html_table = "";
                            $.each(json.rondas_evaluacion, function (key, ronda) {
                                html_table = html_table+'<table class="table table-hover table-bordered"><caption>'+ronda.nombre+'</caption><thead><tr><th>N°</th><th>Criterio</th><th>Puntaje</th></tr></thead><tbody>';                    
                                html_table = html_table+'<tr><td>xxx</td><td>yyy</td><td>zzz</td></tr>';                    
                                html_table = html_table+'<tfoot><tr><td colspan="3">'+ronda.descripcion+'</td></tfoot>';
                                html_table = html_table+'</tbody></table>';                        
                            });                    
                            $( ".tablas_criterios_evaluacion" ).append(html_table);                    
                        }
                    }
                    
                    //Listados de la convocatoria general con categorias
                    if(json.listados != null)
                    {
                        if(Object.keys(json.listados).length>0)
                        {
                            var html_table = "";
                            $.each(json.listados, function (key, documento) {
                                html_table = html_table+'<table class="table table-hover table-bordered"><caption>'+documento.nombre+'</caption><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                                $.each(documento.listados, function (key, listado) {
                                        html_table = html_table+'<tr><td>'+listado.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+listado.id_alfresco+'">'+listado.nombre+'</a></td><td>'+listado.descripcion+'</td></tr>';                    
                                });                                
                                html_table = html_table+'</tbody></table>';                        
                            });                             
                            $( ".documentos_listados" ).append(html_table);                    
                        }
                    }
                    
                }
                else
                {
                    //Valido que la convocatorias tenga categorias especiales            
                    if(json.convocatoria.tiene_categorias == true && json.convocatoria.diferentes_categorias == true){
                        tipo_convocatoria="especial";
                        $(".sin_categorias").css("display","none");
                        $(".categorias_generales").css("display","none");
                        
                        $(".categorias_especificas").css("display","block");
                        
                        //categorias de la convocatoria
                        if(json.categorias != null)
                        {
                            if(Object.keys(json.categorias).length>0)
                            {
                                $(".tablas_categorias_generales").css("display","block");                        
                                //creo tablas de categorias
                                var html_table='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Categoria</th><th>Descripción</th></tr></thead><tbody>';                    
                                $.each(json.categorias, function (key, categoria) {
                                    html_table = html_table+'<tr><td>'+categoria.orden+'</td><td>'+categoria.nombre+'</td><td>'+categoria.descripcion+'</td></tr>';                    
                                });
                                html_table = html_table+'</tbody></table>';                    
                                $( ".tablas_categorias_generales" ).append(html_table);                    
                            }
                        }
                        
                        //cronograma por categorias
                        if(json.cronogramas != null)
                        {
                            if(Object.keys(json.cronogramas).length>0)
                            {
                                var html_table='';                    
                                $.each(json.cronogramas, function (key, cat) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption><b>'+cat.categoria+'</b></caption><thead><tr><th>Tipo de evento</th><th>Fecha(s)</th><th>Descripción</th></tr></thead><tbody>';                    
                                    $.each(cat.eventos, function (key2, evento) {                                    
                                        html_table = html_table+'<tr><td>'+evento.tipo_evento+'</td><td>'+evento.fecha+'</td><td>'+evento.descripcion+'</td></tr>';                                                    
                                    });
                                    html_table = html_table+'</tbody></table>';                        
                                });
                                $( ".tablas_cronogramas" ).append(html_table);                    
                            }
                        }
                        
                        //estimulo por categorias   
                        if(json.categorias_estimulos != null)
                        {
                            if(Object.keys(json.categorias_estimulos).length>0)
                            {
                                var html_table='';                    
                                $.each(json.categorias_estimulos, function (key, cat) {
                                    html_table = html_table+'<div class="col-lg-12"><label>Estímulos categoría: '+cat.categoria+'</label></div>';
                                    $.each(cat.estimulos, function (key2, estimulo) {                                    
                                        html_table = html_table+'<div class="col-lg-12"><label>Número de estímulos:</label><span>'+estimulo.numero_estimulos+'</span></div>';                                                    
                                        html_table = html_table+'<div class="col-lg-12"><label>Total de recursos:</label><span>'+estimulo.valor_total_estimulos+'</span></div>';                                                                                                                                                                
                                    });                                
                                    html_table = html_table+'<div class="col-lg-12">&nbsp;</div>';
                                });
                                $( "#recursos_categorias" ).append(html_table);                                       
                            }
                        }
                        
                        //participantes por categorias
                        if(json.participantes != null)
                        {
                            if(Object.keys(json.participantes).length>0)
                            {
                                var html_table='';                    
                                $.each(json.participantes, function (key, cat) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption><b>'+cat.categoria+'</b></caption><thead><tr><th>Participante</th><th>Perfil específico del participante</th></tr></thead><tbody>';                    
                                    $.each(cat.participantes, function (key2, evento) {                                    
                                        html_table = html_table+'<tr><td>'+evento.participante+'</td><td>'+evento.descripcion+'</td></tr>';                                                    
                                    });
                                    html_table = html_table+'</tbody></table>';                        
                                });
                                $( ".tablas_participantes_especiales" ).append(html_table);                    
                            }
                        }
                        
                        //documentos administrativos por categorias
                        if(json.documentos_administrativos != null)
                        {
                            if(Object.keys(json.documentos_administrativos).length>0)
                            {
                                var html_table='';                                                                                    
                                $.each(json.documentos_administrativos, function (key, cat) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption><b>'+cat.categoria+'</b></caption><thead><tr><th>N°</th><th>Requisito</th><th>Descripción</th><th>Tipos de archivos permitidos</th><th>Tamaño máximo permitido</th></tr></thead><tbody>';                    
                                    $.each(cat.administrativos, function (key2, documento) {     
                                        html_table = html_table+'<tr><td>'+documento.orden+'</td><td>'+documento.requisito+'</td><td>'+documento.descripcion+'</td><td>'+documento.archivos_permitidos+'</td><td>'+documento.tamano_permitido+' MB</td></tr>';                       
                                    });
                                    html_table = html_table+'</tbody></table>';                        
                                });
                                $( ".tablas_documentos_administrativos" ).append(html_table);                    
                            }
                        }
                        
                        //documentos tecnicos por categorias
                        if(json.documentos_tecnicos != null)
                        {
                            if(Object.keys(json.documentos_tecnicos).length>0)
                            {
                                var html_table='';                                                                                    
                                $.each(json.documentos_tecnicos, function (key, cat) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption><b>'+cat.categoria+'</b></caption><thead><tr><th>N°</th><th>Requisito</th><th>Descripción</th><th>Tipos de archivos permitidos</th><th>Tamaño máximo permitido</th></tr></thead><tbody>';                    
                                    $.each(cat.administrativos, function (key2, documento) {     
                                        html_table = html_table+'<tr><td>'+documento.orden+'</td><td>'+documento.requisito+'</td><td>'+documento.descripcion+'</td><td>'+documento.archivos_permitidos+'</td><td>'+documento.tamano_permitido+' MB</td></tr>';                       
                                    });
                                    html_table = html_table+'</tbody></table>';                        
                                });
                                $( ".tablas_documentos_tecnicos" ).append(html_table);                    
                            }
                        }
                        
                        //Rondas de evaluacion por categoria
                        if(json.rondas_evaluacion != null)
                        {
                            if(Object.keys(json.rondas_evaluacion).length>0)
                            {                      
                                var html_table = "";
                                $.each(json.rondas_evaluacion, function (key, ronda) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption>'+ronda.nombre+'</caption><thead><tr><th>N°</th><th>Criterio</th><th>Puntaje</th></tr></thead><tbody>';                    
                                    html_table = html_table+'<tr><td>xxx</td><td>yyy</td><td>zzz</td></tr>';                    
                                    html_table = html_table+'<tfoot><tr><td colspan="3">'+ronda.descripcion+'</td></tfoot>';
                                    html_table = html_table+'</tbody></table>';                        
                                });                    
                                $( ".tablas_criterios_evaluacion" ).append(html_table);                    
                            }
                        }
                        
                        //Listados de la convocatoria general con categorias
                        if(json.listados != null)
                        {
                            if(Object.keys(json.listados).length>0)
                            {
                                var html_table = "";
                                $.each(json.listados, function (key, documento) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption>'+documento.nombre+'</caption><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                                    $.each(documento.listados, function (key, listado) {
                                            html_table = html_table+'<tr><td>'+listado.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+listado.id_alfresco+'">'+listado.nombre+'</a></td><td>'+listado.descripcion+'</td></tr>';                    
                                    });                                
                                    html_table = html_table+'</tbody></table>';                        
                                });                             
                                $( ".documentos_listados" ).append(html_table);                    
                            }
                        }
                        
                        //Avisos por categorias
                        if(json.avisos != null)
                        {
                            if(Object.keys(json.avisos).length>0)
                            {
                                var html_table = "";                                
                                var item_carousel="";                    
                                var active="active";
                                $.each(json.avisos, function (key, documento) {
                                    html_table = html_table+'<table class="table table-hover table-bordered"><caption>'+documento.nombre+'</caption><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                                                                            
                                    $.each(documento.avisos, function (key, listado) {
                                            html_table = html_table+'<tr><td>'+listado.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+listado.id_alfresco+'">'+listado.nombre+'</a></td><td>'+listado.descripcion+'</td></tr>';                    
                                            if(active=="active")
                                            {
                                                item_carousel = item_carousel+'<div class="item active"><h1>'+documento.nombre+' '+listado.nombre+'</h1><div>'+listado.descripcion+'</div><p class="text-center"><a href="javascript:void(0)" class="download_file" title="'+listado.id_alfresco+'"><i class="fa fa-file"></i>Descargar</a></p></div>';                                
                                                active="";
                                            }
                                            else
                                            {
                                                item_carousel = item_carousel+'<div class="item"><h1>'+documento.nombre+' '+'</h1><div>'+listado.descripcion+'</div><p class="text-center"><a href="javascript:void(0)" class="download_file" title="'+listado.id_alfresco+'"><i class="fa fa-file"></i>Descargar</a></p></div>';                                
                                            }
                                    });                                
                                    html_table = html_table+'</tbody></table>';                        
                                });  
                                
                                $( ".documentos_avisos" ).append(html_table);                    
                                $( ".carousel-inner" ).append(item_carousel);                    
                            }
                        }
                        
                        
                    }                                        
                }
            }
            
            if(tipo_convocatoria=="general")
            {
                $(".sin_categorias").css("display","block");
                
                //cronograma por la convocatoria
                if(Object.keys(json.cronogramas).length>0)
                {
                    var html_table='<table class="table table-hover table-bordered"><thead><tr><th>Tipo de evento</th><th>Fecha(s)</th><th>Descripción</th></tr></thead><tbody>';                    
                    $.each(json.cronogramas, function (key, evento) {
                        html_table = html_table+'<tr><td>'+evento.tipo_evento+'</td><td>'+evento.fecha+'</td><td>'+evento.descripcion+'</td></tr>';                    
                    });
                    html_table = html_table+'</tbody></table>';                    
                    $( ".tablas_cronogramas" ).append(html_table);                    
                }
                
                if(Object.keys(json.participantes).length>0)
                {
                    var html_table='<table class="table table-hover table-bordered"><thead><tr><th>Participante</th><th>Perfil específico del participante</th></tr></thead><tbody>';                    
                    $.each(json.participantes, function (key, participante) {
                        html_table = html_table+'<tr><td>'+participante.participante+'</td><td>'+participante.descripcion+'</td></tr>';                    
                    });
                    html_table = html_table+'</tbody></table>';                    
                    $( ".tablas_participantes" ).append(html_table);                    
                }
                
                if(json.documentos_administrativos != null)
                {
                    if(Object.keys(json.documentos_administrativos).length>0)
                    {
                        var html_table='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Requisito</th><th>Descripción</th><th>Tipos de archivos permitidos</th><th>Tamaño máximo permitido</th></tr></thead><tbody>';                    
                        $.each(json.documentos_administrativos, function (key, documento) {
                            html_table = html_table+'<tr><td>'+documento.orden+'</td><td>'+documento.requisito+'</td><td>'+documento.descripcion+'</td><td>'+documento.archivos_permitidos+'</td><td>'+documento.tamano_permitido+' MB</td></tr>';                    
                        });
                        html_table = html_table+'</tbody></table>';                    
                        $( ".tablas_documentos_administrativos" ).append(html_table);                    
                    }
                }                                    
                
                if(json.documentos_tecnicos != null)
                {
                    if(Object.keys(json.documentos_tecnicos).length>0)
                    {
                        var html_table='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Requisito</th><th>Descripción</th><th>Tipos de archivos permitidos</th><th>Tamaño máximo permitido</th></tr></thead><tbody>';                    
                        $.each(json.documentos_tecnicos, function (key, documento) {
                            html_table = html_table+'<tr><td>'+documento.orden+'</td><td>'+documento.requisito+'</td><td>'+documento.descripcion+'</td><td>'+documento.archivos_permitidos+'</td><td>'+documento.tamano_permitido+' MB</td></tr>';                    
                        });
                        html_table = html_table+'</tbody></table>';                    
                        $( ".tablas_documentos_tecnicos" ).append(html_table);                    
                    }
                }
                
                if(json.rondas_evaluacion != null)
                {
                    if(Object.keys(json.rondas_evaluacion).length>0)
                    {                      
                        var html_table = "";
                        $.each(json.rondas_evaluacion, function (key, ronda) {
                            html_table = html_table+'<table class="table table-hover table-bordered"><caption>'+ronda.nombre+'</caption><thead><tr><th>N°</th><th>Criterio</th><th>Puntaje</th></tr></thead><tbody>';                    
                            html_table = html_table+'<tr><td>xxx</td><td>yyy</td><td>zzz</td></tr>';                    
                            html_table = html_table+'<tfoot><tr><td colspan="3">'+ronda.descripcion+'</td></tfoot>';
                            html_table = html_table+'</tbody></table>';                        
                        });                    
                        $( ".tablas_criterios_evaluacion" ).append(html_table);                    
                    }
                }
                
                if(json.avisos != null)
                {
                    if(Object.keys(json.avisos).length>0)
                    {
                        var html_table='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                        var item_carousel='';                    
                        var active="active";
                        $.each(json.avisos, function (key, documento) {
                                html_table = html_table+'<tr><td>'+documento.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'">'+documento.nombre+'</a></td><td>'+documento.descripcion+'</td></tr>';                    
                                if(active=="active")
                                {
                                    item_carousel = item_carousel+'<div class="item active"><h1>'+documento.nombre+'</h1><div>'+documento.descripcion+'</div><p class="text-center"><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'"><i class="fa fa-file"></i>Descargar</a></p></div>';                                
                                    active="";
                                }
                                else
                                {
                                    item_carousel = item_carousel+'<div class="item"><h1>'+documento.nombre+'</h1><div>'+documento.descripcion+'</div><p class="text-center"><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'"><i class="fa fa-file"></i>Descargar</a></p></div>';                                
                                }
                        });
                        html_table = html_table+'</tbody></table>';

                        $( ".documentos_avisos" ).append(html_table);                    
                        $( ".carousel-inner" ).append(item_carousel);                    
                    }
                }
                                
                //Valido que la convocatorias es bolsa
                if(json.convocatoria.bolsa_concursable == true){
                    $(".es_bolsa_concursable").css("display","block");
                }
                else
                {
                    $(".es_bolsa_concursable").css("display","none");
                }
            }
            
            //Aplica para las convocatorias simples, categorias generales y categorias especiales
            if(json.documentacion != null)
            {
                if(Object.keys(json.documentacion).length>0)
                {                      
                    var html_table_anexo='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                    var html_table_formato='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                    var html_table_resolucion='<table class="table table-hover table-bordered"><thead><tr><th>N°</th><th>Documento</th><th>Descripción</th></tr></thead><tbody>';                    
                    $.each(json.documentacion, function (key, documento) {
                        if(documento.tipo_documento == "Anexo")
                        {
                            html_table_anexo = html_table_anexo+'<tr><td>'+documento.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'">'+documento.nombre+'</a></td><td>'+documento.descripcion+'</td></tr>';                    
                        }                        
                        if(documento.tipo_documento == "Formato")
                        {
                            html_table_formato = html_table_formato+'<tr><td>'+documento.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'">'+documento.nombre+'</a></td><td>'+documento.descripcion+'</td></tr>';                    
                        }                        
                        if(documento.tipo_documento == "Resolución")
                        {
                            html_table_resolucion = html_table_resolucion+'<tr><td>'+documento.orden+'</td><td><a href="javascript:void(0)" class="download_file" title="'+documento.id_alfresco+'">'+documento.nombre+'</a></td><td>'+documento.descripcion+'</td></tr>';                    
                        }                        
                    });
                    html_table_anexo = html_table_anexo+'</tbody></table>';                    
                    html_table_formato = html_table_formato+'</tbody></table>';                    
                    html_table_resolucion = html_table_resolucion+'</tbody></table>';                    
                    $( ".documentos_anexos" ).append(html_table_anexo);                                                            
                    $( ".documentos_formatos" ).append(html_table_formato);                                                            
                    $( ".documentos_resoluciones" ).append(html_table_resolucion);    

                }
            }
            
                                                
            download_file();
                
            $('#view_convocatoria').loadJSON(json.convocatoria);
        }
    });

}); 

//Funcion para descargar archivo
function download_file()
{
    $(".download_file").click(function () {       
    //Cargo el id file
    var cod = $(this).attr('title');                

    $.AjaxDownloader({
        url: url_pv + 'ConvocatoriasWS/download_file/',
        data : {
            cod   : cod
        }
    });

});                                           
}