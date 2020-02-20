//Definimos las variables del sitio
var url_pv = "http://sis.scrd.gov.co/crud_SCRD_pv/api/";
var url_pv_admin = "http://sis.scrd.gov.co/admin_SCRD_pv/";
var url_pv_site = "http://sis.scrd.gov.co/site_SCRD_pv/";
var url_pv_report = "http://sis.scrd.gov.co/report_SCRD_pv/";
var name_local_storage = "token_pv";

//funcion para extaer un parametro de la url
function getURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function form_edit(id)
{
    location.href = "form.html?id=" + id;
}

function form_edit_page(page,id)
{
    var url="";
    var name="";
    if(page==1)
    {
        url="update";
        name="_self";
        
    }
    if(page==2)
    {
        url=url_pv_site+"publicar";
        name="_blank";
    }
    location.href=url+".html?id=" + id;
}

/* Función para cargar alertas */
function notify(xclass, xicon, xtitle, xmessage) {
    $.notify({
        icon: 'glyphicon glyphicon-' + xicon,
        title: '<strong>' + xtitle + '</strong>',
        message: xmessage,
        /*url: 'http://www.movilmente.com',
         target: '_blank'*/
    }, {
        // settings
        type: xclass,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 2000,
        delay: 5000,
        timer: 1000,
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
    });
}

//Funcion para validar si el navegador soporta localStorage
function issetLocalStorage() {
    if (typeof (Storage) !== "undefined")
    {
        return true
    } else
    {
        location.href = 'publicar.html?msg=Debe actualizar su navegador.&msg_tipo=danger';
        return false;
    }
}

//Funcion para retornar el valor de la variable
function getLocalStorage(nombre)
{
    return JSON.parse(localStorage.getItem(nombre));
}

//Funcion para agregar el valor a una variable
function setLocalStorage(nombre, valor)
{
    localStorage.setItem(nombre, valor);
    return localStorage.getItem(nombre);
}

//Funcion para eliminar la variable
function removeLocalStorage(nombre)
{
    localStorage.removeItem(nombre);
}

//Iniciamos el documento
$(document).ready(function () {
    //Verifico que no tenga ningun mensaje y el tipo
    var msg = getURLParameter('msg');
    var msg_tipo = getURLParameter('msg_tipo');
    if (typeof msg !== 'undefined' && typeof msg_tipo !== 'undefined')
    {
        notify(msg_tipo, "ok", "Mensaje:", decodeURI(msg));
    }

    //Asignamos el valor a input id
    $("#id").attr('value', getURLParameter('id'));

    
});

//Al crear cualquier peticion de ajax muestra el modal
$(document).ajaxStart(function () {
    //Cuando se utiliza modal
    $('#my_loader').modal();
    //Cuando se utiliza divs
    $('.loading').show();          
});
//Al completar cualquier peticion de ajax oculta el modal
$(document).ajaxComplete(function () {
    //Cuando se utiliza modal
    $("#my_loader").modal('hide');
    //Cuando se utiliza divs    
    $('.loading').hide(); 
});
