//echo "WMX2 13 ABRIL 2020";
$(document).ready(function () {

    //Validar si el navegador soporta localStorage, si no lo soporta lo envia directamente a la pagina de error
    issetLocalStorage();

    var p_area = getURLParameter("a");
    var p_entidad = getURLParameter("ent");
    var p_linea = getURLParameter("l");
    var p_enfoque = getURLParameter("e");
    
    var imagen_principal="convocatorias_files/cabezote-convocatorias-principal.jpg";
    var silueta_principal="convocatorias_files/silueta-convocarorias-general.jpg";
    
    $("#iniciar_sesion").attr("href",url_pv_admin);

    if (typeof p_area !== 'undefined') {
        $(".panel_areas").addClass("in");
        imagen_principal="convocatorias_files/cabezote-area-"+p_area+".jpg";
        silueta_principal="convocatorias_files/silueta-convocarorias-"+p_area+".jpg";
    }

    if (typeof p_entidad !== 'undefined') {
        $(".panel_entidades").addClass("in");
        imagen_principal="convocatorias_files/cabezote-entidad-"+p_entidad+".jpg";
    }

    if (typeof p_linea !== 'undefined') {
        $(".panel_lineas").addClass("in");
        imagen_principal="convocatorias_files/cabezote-linea-"+p_linea+".jpg";        
    }

    if (typeof p_enfoque !== 'undefined') {
        $(".panel_enfoques").addClass("in");
        imagen_principal="convocatorias_files/cabezote-enfoque-"+p_enfoque+".jpg";
    }

    $("#imagen_principal").attr("src",imagen_principal);
    
    $(".contenedor-derecho").css("background-image","url("+silueta_principal+")");

    //Realizo la peticion para cargar el formulario
    $.ajax({
        type: 'GET',
        url: url_pv + 'ConvocatoriasWS/search_convocatorias'
    }).done(function (data) {
        if (data == 'error_metodo')
        {
            notify("danger", "ok", "Convocatorias:", "Se registro un error en el método, comuníquese con la mesa de ayuda soporte.convocatorias@scrd.gov.co");
        } else
        {
            if (data == 'error')
            {
                location.href = url_pv_admin + 'index.html?msg=Su sesión ha expirado, por favor vuelva a ingresar.&msg_tipo=danger';
            } else
            {
                var json = JSON.parse(data);

                $("#anio").append('<option value="">:: Seleccionar ::</option>');
                if (json.anios.length > 0) {
                    $.each(json.anios, function (key, anio) {
                        $("#anio").append('<option value="' + anio + '"  >' + anio + '</option>');
                    });
                }

                $("#entidad").append('<option value="">:: Seleccionar ::</option>');
                if (json.entidades.length > 0) {
                    $.each(json.entidades, function (key, entidad) {
                        var selected = '';
                        var active = '';
                        if (entidad.id == p_entidad)
                        {
                            selected = 'selected="selected"';
                            active='active';
                        }

                        $("#entidad").append('<option value="' + entidad.id + '" ' + selected + ' >' + entidad.nombre + '</option>');
                        $("#ul_entidades").append('<li class="'+active+'"><a href="' + url_pv_site + 'convocatorias.html?ent=' + entidad.id + '">' + entidad.descripcion + '</a></li>');
                    });
                }

                $("#area").append('<option value="">:: Seleccionar ::</option>');
                if (json.areas.length > 0) {
                    $.each(json.areas, function (key, area) {
                        var selected = '';
                        var active = '';
                        if (area.id == p_area)
                        {
                            selected = 'selected="selected"';
                            active='active';
                        }
                        $("#area").append('<option value="' + area.id + '" ' + selected + ' >' + area.nombre + '</option>');
                        $("#ul_areas").append('<li class="'+active+'"><a href="' + url_pv_site + 'convocatorias.html?a=' + area.id + '">' + area.nombre + '</a></li>');
                    });
                }

                $("#linea_estrategica").append('<option value="">:: Seleccionar ::</option>');
                if (json.lineas_estrategicas.length > 0) {
                    $.each(json.lineas_estrategicas, function (key, linea_estrategica) {
                        var selected = '';
                        var active = '';
                        if (linea_estrategica.id == p_linea)
                        {
                            selected = 'selected="selected"';
                            active='active';
                        }
                        $("#linea_estrategica").append('<option value="' + linea_estrategica.id + '" ' + selected + ' >' + linea_estrategica.nombre + '</option>');
                        $("#ul_lineas").append('<li class="'+active+'"><a href="' + url_pv_site + 'convocatorias.html?l=' + linea_estrategica.id + '">' + linea_estrategica.nombre + '</a></li>');
                    });
                }

                $("#enfoque").append('<option value="">:: Seleccionar ::</option>');
                if (json.enfoques.length > 0) {
                    $.each(json.enfoques, function (key, enfoque) {
                        var selected = '';
                        var active = '';
                        if(enfoque.id!=6)
                        {
                            if (enfoque.id == p_enfoque)
                            {
                                selected = 'selected="selected"';
                                active='active';
                            }
                            $("#enfoque").append('<option value="' + enfoque.id + '" ' + selected + ' >' + enfoque.nombre + '</option>');
                            $("#ul_enfoques").append('<li class="'+active+'"><a href="' + url_pv_site + 'convocatorias.html?e=' + enfoque.id + '">' + enfoque.nombre + '</a></li>');
                        }
                    });
                }

                $("#programa").append('<option value="">:: Seleccionar ::</option>');
                if (json.programas.length > 0) {
                    $.each(json.programas, function (key, programa) {
                        $("#programa").append('<option value="' + programa.id + '" >' + programa.nombre + '</option>');
                    });
                }

                $("#estado").append('<option value="">:: Seleccionar ::</option>');
                $("#estado").append('<option value="5">Publicada</option>');
                $("#estado").append('<option value="32">Cancelada</option>');
                $("#estado").append('<option value="6">Adjudicada</option>');


                //Cargar datos en la tabla actual
                var dataTable = $('#table_list').DataTable({
                    "language": {
                        "url": "dist/libraries/datatables/js/spanish.json"
                    },
                    "searching": false,
                    "processing": true,
                    "serverSide": true,
                    "lengthMenu": [30, 40, 50],
                    "ajax": {
                        url: url_pv + "ConvocatoriasWS/all_view",
                        data: function (d) {
                            var params = new Object();
                            params.anio = $('#anio').val();
                            params.entidad = $('#entidad').val();
                            params.area = $('#area').val();
                            params.linea_estrategica = $('#linea_estrategica').val();
                            params.enfoque = $('#enfoque').val();
                            params.programa = $('#programa').val();
                            params.nombre = $('#nombre').val();
                            params.estado = $('#estado').val();
                            d.params = JSON.stringify(params);
                        },
                    },
                    "drawCallback": function (settings) {
                        cargar_cronograma();
                    },
                    "columns": [
                        {"data": "estado_convocatoria"},
                        {"data": "anio"},
                        {"data": "programa"},
                        {"data": "entidad"},
                        {"data": "area"},
                        {"data": "linea_estrategica"},
                        {"data": "enfoque"},
                        {"data": "convocatoria"},
                        {"data": "categoria"},
                        {"data": "ver_cronograma"},
                        {"data": "ver_convocatoria"},
                    ]
                });

                $('#anio').change(function () {
                    dataTable.draw();
                });

                $('#entidad').change(function () {
                    dataTable.draw();
                });

                $('#area').change(function () {
                    dataTable.draw();
                });

                $('#linea_estrategica').change(function () {
                    dataTable.draw();
                });

                $('#enfoque').change(function () {
                    dataTable.draw();
                });

                $('#programa').change(function () {
                    dataTable.draw();
                });

                $('#estado').change(function () {
                    dataTable.draw();
                });

                $('#nombre').on('keyup', function () {
                    if (this.value.length > 3)
                    {
                        dataTable.draw();
                    } else
                    {
                        if ($('#nombre').val() == "")
                        {
                            dataTable.draw();
                        }
                    }
                });

            }
        }
    });

});

function cargar_cronograma()
{
    $(".cargar_cronograma").click(function () {
        var title = $(this).attr("title");

        //Realizo la peticion para cargar el formulario
        $.ajax({
            type: 'POST',
            url: url_pv + 'ConvocatoriasWS/cargar_cronograma/' + title
        }).done(function (data) {
            if (data == 'error_metodo')
            {
                notify("danger", "ok", "Convocatorias:", "Se registro un error en el método, comuníquese con la mesa de ayuda soporte.convocatorias@scrd.gov.co");
            } else
            {
                var json = JSON.parse(data);
                var html_table = '';
                $("#table_cronogramas").html(html_table);
                html_table = html_table + '<table class="table table-hover table-bordered"><thead><tr><th>Tipo de evento</th><th>Fecha(s)</th><th>Descripción</th></tr></thead><tbody>';
                $.each(json, function (key2, evento) {
                    html_table = html_table + '<tr><td>' + evento.tipo_evento + '</td><td>' + evento.fecha + '</td><td>' + evento.descripcion + '</td></tr>';
                });
                html_table = html_table + '</tbody></table>';

                $("#table_cronogramas").html(html_table);

            }
        });
    });
}