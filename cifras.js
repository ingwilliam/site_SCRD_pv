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

                $("#entidad").append('<option value="">:: Seleccionar ::</option>');
                if (json.entidades.length > 0) {
                    $.each(json.entidades, function (key, entidad) {
                        var selected = '';
                        var active = '';
                        if (entidad.id == p_entidad)
                        {
                            selected = 'selected="selected"';
                            active = 'active';
                        }

                        $("#entidad").append('<option value="' + entidad.id + '" ' + selected + ' >' + entidad.nombre + '</option>');
                        $("#ul_entidades").append('<li class="' + active + '"><a href="' + url_pv_site + 'convocatorias.html?ent=' + entidad.id + '">' + entidad.descripcion + '</a></li>');
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
                            active = 'active';
                        }
                        $("#area").append('<option value="' + area.id + '" ' + selected + ' >' + area.nombre + '</option>');
                        $("#ul_areas").append('<li class="' + active + '"><a href="' + url_pv_site + 'convocatorias.html?a=' + area.id + '">' + area.nombre + '</a></li>');
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
                            active = 'active';
                        }
                        $("#linea_estrategica").append('<option value="' + linea_estrategica.id + '" ' + selected + ' >' + linea_estrategica.nombre + '</option>');
                        $("#ul_lineas").append('<li class="' + active + '"><a href="' + url_pv_site + 'convocatorias.html?l=' + linea_estrategica.id + '">' + linea_estrategica.nombre + '</a></li>');
                    });
                }

                $("#enfoque").append('<option value="">:: Seleccionar ::</option>');
                if (json.enfoques.length > 0) {
                    $.each(json.enfoques, function (key, enfoque) {
                        var selected = '';
                        var active = '';
                        if (enfoque.id != 6)
                        {
                            if (enfoque.id == p_enfoque)
                            {
                                selected = 'selected="selected"';
                                active = 'active';
                            }
                            $("#enfoque").append('<option value="' + enfoque.id + '" ' + selected + ' >' + enfoque.nombre + '</option>');
                            $("#ul_enfoques").append('<li class="' + active + '"><a href="' + url_pv_site + 'convocatorias.html?e=' + enfoque.id + '">' + enfoque.nombre + '</a></li>');
                        }
                    });
                }

                $("#programa").append('<option value="">:: Seleccionar ::</option>');
                if (json.programas.length > 0) {
                    $.each(json.programas, function (key, programa) {
                        $("#programa").append('<option value="' + programa.id + '" >' + programa.nombre + '</option>');
                    });
                }

                $("#localidad").append('<option value="">:: Seleccionar ::</option>');
                if (json.localidades.length > 0) {
                    $.each(json.localidades, function (key, localidad) {
                        $("#localidad").append('<option value="' + localidad.id + '" >' + localidad.nombre + '</option>');
                    });
                }

                $("#sexo").append('<option value="">:: Seleccionar ::</option>');
                if (json.sexos.length > 0) {
                    $.each(json.sexos, function (key, sexo) {
                        $("#sexo").append('<option value="' + sexo.id + '" >' + sexo.nombre + '</option>');
                    });
                }

                $("#tipoparticipante").append('<option value="">:: Seleccionar ::</option>');
                if (json.tiposparticipantes.length > 0) {
                    $.each(json.tiposparticipantes, function (key, tipoparticipante) {
                        $("#tipoparticipante").append('<option value="' + tipoparticipante.id + '" >' + tipoparticipante.nombre + '</option>');
                    });
                }


                $('#anio').change(function () {
                    crear_reporte();
                });

                $('#programa').change(function () {
                    crear_reporte();
                });

                $('#entidad').change(function () {
                    crear_reporte();
                });

                $('#sexo').change(function () {
                    crear_reporte();
                });

                $('#area').change(function () {
                    crear_reporte();
                });

                $('#linea_estrategica').change(function () {
                    crear_reporte();
                });

                $('#enfoque').change(function () {
                    crear_reporte();
                });

                $('#localidad').change(function () {
                    crear_reporte();
                });

                $('#tipoparticipante').change(function () {
                    crear_reporte();
                });

                $('#convocatoria').change(function () {
                    crear_reporte();
                });

            }
        }
    });

    $('#entidad, #anio').change(function () {

        if ($("#anio").val() != "" && $("#entidad").val() != "")
        {
            $.ajax({
                type: 'GET',
                data: {"anio": $("#anio").val(), "entidad": $("#entidad").val()},
                url: url_pv + 'CifrasWS/select_convocatorias'
            }).done(function (data) {
                if (data == 'error_metodo')
                {
                    notify("danger", "ok", "Usuarios:", "Se registro un error en el método, comuníquese con la mesa de ayuda convocatorias@scrd.gov.co");
                } else
                {

                    var json = JSON.parse(data);

                    $('#convocatoria').find('option').remove();
                    $("#convocatoria").append('<option value="">:: Seleccionar ::</option>');
                    $.each(json, function (key, value) {
                        $("#convocatoria").append('<option value="' + value.id + '">' + value.nombre + '</option>');
                    });                    

                }
            });
        }
    });


    crear_reporte();

});

function crear_reporte() {
    $.ajax({
        type: 'POST',
        url: url_pv + 'CifrasWS/general_propuestas_inscritas',
        data: {"anio": $("#anio").val(), "programa": $("#programa").val(), "entidad": $("#entidad").val(), "sexo": $("#sexo").val(), "area": $("#area").val(), "linea_estrategica": $("#linea_estrategica").val(), "enfoque": $("#enfoque").val(), "localidad": $("#localidad").val(), "tipoparticipante": $("#tipoparticipante").val(), "convocatoria": $("#convocatoria").val()}
    }).done(function (result) {

        if (result == 'error_metodo')
        {
            notify("danger", "ok", "Propuesta:", "Se registro un error, comuníquese con la mesa de ayuda convocatorias@scrd.gov.co");
        } else
        {
            var json = JSON.parse(result);

            //Grafico de propuestas inscritas anio            
            var s1 = json.propuestas_anio.value;
            var ticks = json.propuestas_anio.label;
            if(json.propuestas_anio.value.length>0)
            {
                plot1 = $.jqplot('reporte_propuestas_anio', [s1], {
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


                plot1.replot();
            }           

            //Grafico de propuestas inscritas programa            
            var s1 = json.propuestas_programa.value;
            var ticks = json.propuestas_programa.label;
            if(json.propuestas_programa.value.length>0)
            {
                plot2 = $.jqplot('reporte_propuestas_programa', [s1], {
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
            }
            
            //Grafico de propuestas inscritas entidad            
            var s1 = json.propuestas_entidad.value;
            var ticks = json.propuestas_entidad.label;
            if(json.propuestas_entidad.value.length>0)
            {
                plot3 = $.jqplot('reporte_propuestas_entidad', [s1], {
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
            }

            //Grafico de propuestas inscritas sexo                        
            if(json.propuestas_sexo.length>0)
            {
                var plot4 = $.jqplot('reporte_propuestas_sexo', [json.propuestas_sexo], {
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

                plot4.replot();
            }

            //Grafico de propuestas inscritas area            
            var s1 = json.propuestas_area.value;
            var ticks = json.propuestas_area.label;

            if(json.propuestas_area.value.length>0)
            {
                plot5 = $.jqplot('reporte_propuestas_area', [s1], {
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
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            angle: -30,
                            fontSize: '8pt'
                        }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: ticks
                        }
                    },
                    highlighter: {show: false}
                });

                plot5.replot();
            }
            
            //Grafico de propuestas inscritas linea            
            var s1 = json.propuestas_linea.value;
            var ticks = json.propuestas_linea.label;

            if(json.propuestas_linea.value.length>0)
            {
                plot6 = $.jqplot('reporte_propuestas_linea', [s1], {
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
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            angle: -30,
                            fontSize: '8pt'
                        }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: ticks
                        }
                    },
                    highlighter: {show: false}
                });

                plot6.replot();
            }
            
            //Grafico de propuestas inscritas enfoque            
            var s1 = json.propuestas_enfoque.value;
            var ticks = json.propuestas_enfoque.label;

            if(json.propuestas_enfoque.value.length>0)
            {
                plot7 = $.jqplot('reporte_propuestas_enfoque', [s1], {
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

                plot7.replot();
            }
            
            //Grafico de propuestas inscritas localidad            
            var s1 = json.propuestas_localidad.value;
            var ticks = json.propuestas_localidad.label;

            if(json.propuestas_localidad.value.length>0)
            {
                plot8 = $.jqplot('reporte_propuestas_localidad', [s1], {
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
                    axesDefaults: {
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions: {
                            angle: -30,
                            fontSize: '8pt'
                        }
                    },
                    axes: {
                        xaxis: {
                            renderer: $.jqplot.CategoryAxisRenderer,
                            ticks: ticks
                        }
                    },
                    highlighter: {show: false}
                });

                plot8.replot();
            }

            //Grafico de propuestas inscritas localidad            
            var s1 = json.propuestas_participante.value;
            var ticks = json.propuestas_participante.label;

            if(json.propuestas_participante.value.length>0)
            {
                plot9 = $.jqplot('reporte_propuestas_participante', [s1], {
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

                plot9.replot();
            }

            $(".fecha_actual").html(json.fecha_corte);

        }

    });
}
