$(function () {
    $("#btnKeyboardFind").click(function () {
        $(this).css("cursor", "pointer");
        $("#keyboardBox").dialog({ width: '580px' });
    });

    applyStyle('body');

    $("#edtFind").removeClass('field');

    $("#popup-close").click(function () {

        $.history.load("");
    });

    $.history.init(openPage);

    $.extend($.validity.messages, {
        require: "O campo #{field} é obrigatório.",
        email: "O campo #{field} deve ser um email válido.",
        date: "O campo #{field} deve ser uma data válida."
    });



    $.validity.setup({ outputMode: "modal" });

    $(".user-nav-box ul.usuario-nav-ul .usuario-gerenciar").hover(function () {
        $("ul:first", this).slideDown("fast");
    }, function () {
        $("ul:first", this).stop(true, true).slideUp("fast");
    });

    $("#usuario-sair").click(function () {

        executeAction("../../controller/user-controller.aspx", {
            cmd: 'logoff'
        }, $(this));
    });




    $(".resize-txt").live("click", function () {

        var currentFontSize = $("#resizeable-cntt").css('font-size');
        var currentFontSizeNum = parseFloat(currentFontSize, 10);

        var val = 1.2;

        if ($(this).hasClass("dec-txt")) {
            val = 0.8;
        }

        var newFontSize = currentFontSizeNum * val;

        $("#resizeable-cntt").css('font-size', newFontSize);

        return false;
    });


    $("a[rel^='imageGalleryOpen']").live("click", function () {


        el = $(this);

        $("#album-cntt-box").load(el.attr("href"), function () {
            var imgList = new Array();
            var i = 0;

            $(this).children("a").each(function () {
                imgList[i] = $(this).attr("href");
                i++;
            });

            $(this).children("a[rel^=prettyPhoto]").prettyPhoto({
                show_title: false,
                autoplay_slideshow: true,
                markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<a class="pp_close" href="#">Close</a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>'
            });

            $.prettyPhoto.open(imgList, [], []);
        });

        return false;
    });

    $(".exec-action").live('click', function () {

        executeAction($(this).attr("href"), {}, $(this));

        return false;
    });
    $("#edtFind").keypress(function (e) {
        if (e.which == 13) {
            e.click();
            e.preventDefault();
        }
    });

    $("#btnFiltroAvancado").click(function () {
        $.history.load("../../public/pages/filtro-avancado-categoria.aspx");
    });


    $("a[href!='']").css("cursor", "pointer");

    $(".publicidade-cycle").cycle({
        fx: "fade"
    });

    
});

function openPage(page) {
    if ($("#popup").is(":visible")) {
        $(".validity-modal-msg").remove();

        $("#popup").fadeOut('fast', function () {
            $("#popup-inner").html("");
        });

        $("#black-screen").fadeOut('fast', function () {
            openPage(page);
        });

        return;
    }

    if (page == "" || page.indexOf(".aspx") == -1) {
        return;
    }

    $("#black-screen").fadeIn('fast');

    $("#popup-inner").load(page, function () {
        $("html, body").animate({ scrollTop: 0 }, 800);

        applyStyle("#popup-inner");

        $("#popup").css("margin-left", "-" + ($("#popup").width() / 2) - 10 + "px");

        $("#popup").fadeIn('fast');

        if ($("#popup-inner input[type='text']:first").length > 0) {
            $("#popup-inner input[type='text']:first").focus();
        } else if ($("#popup-inner textarea:first").length > 0) {
            $("#popup-inner textarea:first").focus();
        }
    });
}

function applyStyle(e) {
    $(e + " input[type='text'], " + e + " select, " + e + " textarea, " + e + " input[type='password']").addClass("field");
    $(e + " input[type='button'], " + e + " .button").button();

    $(e + " input[type='text'], " + e + " select, " + e + " textarea, " + e + " input[type='password']").keypress(function (e) {
        if (e.which == 13) {
            $(this).parent("fieldset:first").parent().find("input[type='button']:first").click();
        }
    });

    //$(e + " input[type='radio']").radio

    $(e + " .date-field").mask("99/99/9999");


    $(e + " .button-set").buttonset();

    $(e + " .button").button();

    $(e + " .box-decorated")
                .wrapInner("<div class='box-2' />")
                .wrapInner("<div class='box-1' />")
                .wrapInner("<div class='box-3' />");

    $(e + " .acc-box").accordion({
        collapsible: true,
        icons: { "header": "acc-show-icon", "headerSelected": "acc-hide-icon" }
    });

    $(e + " .nav-tab ul li:first, " + e + " .tab-box ul li:first").addClass("first");

    $(e + " .tab-box").tabs();

    $(e + " .tab-box ul:first a, " + e + " .nav-tab ul a").hover(
        function () {
            $(this).parents("ul:first").addClass("a_hover");
        }, function () {
            $(this).parents("ul:first").removeClass("a_hover");
        }
    );

    $(e + " .tab-box ul:first, " + e + " .nav-tab ul").click(function () {
        if ($(this).hasClass("a_hover")) {
            return;
        }

        if ($(this).next().is(":visible")) {
            $(this).next().slideUp(300);
            $(this).children(".ui-icon")
                        .removeClass("acc-hide-icon")
                        .addClass("acc-show-icon");
        } else {
            $(this).next().slideDown(300);
            $(this).children(".ui-icon")
                        .removeClass("acc-show-icon")
                        .addClass("acc-hide-icon");
        }
    });

    $(e + " .open-page").click(function () {
        $.history.load(this.href);
        return false;
    });

    if ($(e + " .busca-cidade").length > 0) {
        $(e + " .busca-cidade").after("<ul class='lista-resultado-busca-edit'></ul>");


        $(e + " .busca-cidade").keyup(function (e) {
            el = $(this);


            if (e.which == 27) {
                el.next().hide();
                return;
            }



            if ($(this).val().length <= 3) {
                el.next().hide();
            }

            if ($(this).val().length > 3) {

                new GClientGeocoder().getLocations($(this).val(), function (response) {
                    el.next().hide();

                    if (response && response.Status.code == 200) {
                        el.next().html("");
                        for (i = 0; i < response.Placemark.length; i++) {
                            el.next().append("<li><a>" + response.Placemark[i].address + "</a></li>");
                        }

                        el.next().find("a").click(function () {
                            el.val($(this).html());
                            el.next().hide();
                        });

                        el.next().show();
                    }
                });
            }
        });
    }

    $("img").error(function () {
        $(this).attr("src", "../../public/resource/image/no-image.png");
    });

    $(".fone-mask").mask("(99) 9999-9999");
    $(".cpf-mask").mask("999.999.999-99");
    $(".cnpj-mask").mask("99.999.999/9999-99");
    $(".cep-mask").mask("99999-99");
    $(".hr-field").mask("99:99");
}

function showMessage(m, error, fc) {
    $("#dialog:ui-dialog").dialog("destroy");
    $("<div>" + m + "</div>").dialog({
        modal: true,
        buttons: [
            {
                text: "Confirma",
                click: function () {
                    $(this).dialog("close");
                    if (fc != null) {
                        fc.call();
                    }
                }
            }
        ],
        open: function () {
            $(this).parent().find('.ui-dialog-buttonpane button:contains("Confirma")').button({
                icons: { primary: 'ui-icon-circle-check' }
            });
        }
    });
}

function progButton(e, c) {
    if (e != null && c == 'hide') {
        e.hide();
        e.parent().append("<img class='loader-button' alt='carregando' src='../../public/resource/image/ajax-loader.gif'/>");
    }

    if (e != null && c == 'show') {
        e.show();
        e.parent().children(".loader-button").remove();
    }
}


function executeAction(u, p, e, f) {
    
    progButton(e, 'hide');

    $.ajax({
        type: "POST",
        url: u,
        data: p,
        success: function (data, textStatus, jqXHR) {

            if (data.indexOf("[msg]") != -1) {
                showMessage(data.replace("[msg]", ""), "", f);
                f = null;
                progButton(e, 'show');
            } else if (data.indexOf("[redir]") != -1) {
                window.location = data.replace("[redir]", "");
            } else if (data.indexOf("[open]") != -1) {
                $.history.load(data.replace("[open]", ""));

                progButton(e, 'show');
            }

            if (f != null) {
                f.call(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            
            showMessage('Erro: ' + XMLHttpRequest.responseText);
        }
    });
}


function loadGallery(u, el, cntt) {
    if (cntt.lenght == 0) {
        return;
    }

    
    $.ajax({
        type: "POST",
        url: u + "&page=" + el.attr("page"),
        success: function (data, textStatus, jqXHR) {
            cntt.html(data);

            cntt.find(".nav-prior, .nav-next").click(function () {
                loadGallery(u, $(this), cntt);
            });

            applyStyle(cntt.selector);

            cntt.find(".open-detail").click(function (e) {
                if (!$(this).next().is(":visible")) {
                    $(this).addClass("opened");
                    $(this).next().load($(this).attr("href"), function () {
                        $(this).slideDown();
                    });
                } else {
                    $(this).removeClass("opened");
                    $(this).next().slideUp();
                }

                e.preventDefault();
                return false;
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            showMessage('Erro: ' + XMLHttpRequest.responseText);
        }
    });
}

var errorPlacementFn = function (error, element) {
    /*$(element).parent().css("display", "block");
    $(element).parent().css("position", "relative");

    error.insertBefore(element);

    error.css('position', 'absolute');
    error.css('left', "0px");
    error.css('top', ($(element).position().top - 50) + "px");*/
}

function showConfirmMsg(msg, fc, fcCancela) {
    $("<div>" + msg + "</div>").dialog({
        modal: true,
        buttons: [
                {
                    text: "Cancela",
                    click: function () {
                        if (fcCancela != null) {
                            fcCancela.call();
                        }

                        $(this).dialog("close");
                    }
                },
                {
                    text: "Confirma",
                    click: function () {
                        fc.call();
                        $(this).dialog("close");
                    }
                }
            ],
        open: function () {
            $(this).parent().find('.ui-dialog-buttonpane button:contains("Cancela")').button({
                icons: { primary: 'ui-icon-circle-close' }
            });
            $(this).parent().find('.ui-dialog-buttonpane button:contains("Confirma")').button({
                icons: { primary: 'ui-icon-circle-check' }
            });
        }

    });
}
function showProg() {
    showProg("");
}

function showProg(msg) {
    if (msg == null || msg == "") {
        msg = "Processando";
    }

    $.blockUI({
        message: '<h1 style="font-size: 18px; margin: 0px;"><img src="../../public/resource/image/ajax-loader.gif" style="margin-right: 20px;"/>' + msg + '</h1>',
        css: {
            top: "-5px",
            padding: '8px',
            left: ($(window).width() / 2) - 80 + 'px',
            width: '160px',
            border: "solid 2px #ccc",
            color: "#666"
        }
    });
}