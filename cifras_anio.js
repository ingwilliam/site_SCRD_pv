//echo "WMX2 13 ABRIL 2020";
$(document).ready(function () {

    //Validar si el navegador soporta localStorage, si no lo soporta lo envia directamente a la pagina de error
    issetLocalStorage();

    var p_area = getURLParameter("a");
    var p_entidad = getURLParameter("ent");
    var p_linea = getURLParameter("l");
    var p_enfoque = getURLParameter("e");

    var imagen_principal = "convocatorias_files/cabezote-convocatorias-principal.jpg";

    $("#iniciar_sesion").attr("href", url_pv_admin);

    if (typeof p_area !== 'undefined') {
        $(".panel_areas").addClass("in");
        imagen_principal = "convocatorias_files/cabezote-area-" + p_area + ".jpg";
    }

    if (typeof p_entidad !== 'undefined') {
        $(".panel_entidades").addClass("in");
        imagen_principal = "convocatorias_files/cabezote-entidad-" + p_entidad + ".jpg";
    }

    if (typeof p_linea !== 'undefined') {
        $(".panel_lineas").addClass("in");
        imagen_principal = "convocatorias_files/cabezote-linea-" + p_linea + ".jpg";
    }

    if (typeof p_enfoque !== 'undefined') {
        $(".panel_enfoques").addClass("in");
        imagen_principal = "convocatorias_files/cabezote-enfoque-" + p_enfoque + ".jpg";
    }

    $("#imagen_principal").attr("src", imagen_principal);

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

                $('#anio').change(function () {
                    crear_reporte();
                });

            }
        }
    });

    crear_reporte();

});

function crear_reporte() {
    $.ajax({
        type: 'POST',
        url: url_pv + 'CifrasWS/general_anio',
        data: {"anio": $("#anio").val(), "programa": $("#programa").val(), "entidad": $("#entidad").val(), "sexo": $("#sexo").val(), "area": $("#area").val(), "linea_estrategica": $("#linea_estrategica").val(), "enfoque": $("#enfoque").val(), "localidad": $("#localidad").val(), "tipoparticipante": $("#tipoparticipante").val(), "convocatoria": $("#convocatoria").val()}
    }).done(function (result) {
        if (result == 'error_metodo')
        {
            notify("danger", "ok", "Propuesta:", "Se registro un error, comuníquese con la mesa de ayuda convocatorias@scrd.gov.co");
        } else
        {
            var json = JSON.parse(result);

            var data = [['Sin información', 1]];

            //Grafico
            if (json.estados_convocatoria_anio.length > 0)
            {
                data = json.estados_convocatoria_anio;
            }

            var plot1 = $.jqplot('estados_convocatoria_anio', [data], {
                animate: true,
                animateReplot: true,
                grid: {
                    drawBorder: false,
                    drawGridlines: false,
                    background: '#ffffff',
                    shadow: false
                },
                seriesDefaults: {
                    renderer: $.jqplot.PieRenderer,
                    rendererOptions: {
                        showDataLabels: true,
                        sliceMargin: 4,
                        // rotate the starting position of the pie around to 12 o'clock.
                        startAngle: -90
                    }
                },
                legend: {show: true}
            });

            plot1.replot();

            //Grafico
            var s1 = [1];
            var ticks = ['Sin información'];
            if (json.estados_convocatoria_propuestas_anio.value.length > 0)
            {
                var s1 = json.estados_convocatoria_propuestas_anio.value;
                var ticks = json.estados_convocatoria_propuestas_anio.label;
            }

            plot2 = $.jqplot('estados_convocatoria_propuestas_anio', [s1], {
                // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
                animate: true,
                animateReplot: true,
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    rendererOptions: {
                        varyBarColor: true
                    },
                    pointLabels: {show: true}
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: ticks
                    }
                },
                highlighter: {show: false}
            });


            plot2.replot();
            
            //Grafico
            var s1 = [1];
            var ticks = ['Sin información'];
            if (json.propuestas_rango_etareo_anio.value.length > 0)
            {
                var s1 = json.propuestas_rango_etareo_anio.value;
                var ticks = json.propuestas_rango_etareo_anio.label;
            }

            plot3 = $.jqplot('propuestas_rango_etareo_anio', [s1], {
                // Only animate if we're not using excanvas (not in IE 7 or IE 8)..
                animate: true,
                animateReplot: true,
                seriesDefaults: {
                    renderer: $.jqplot.BarRenderer,
                    rendererOptions: {
                        varyBarColor: true
                    },
                    pointLabels: {show: true}
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks: ticks
                    }
                },
                highlighter: {show: false}
            });


            plot3.replot();

            $(".fecha_actual").html(json.fecha_corte);

        }

    });
}
