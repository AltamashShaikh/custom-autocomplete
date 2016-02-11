(function($) {

    $.fn.autocomplete_v1 = function(opt) {
//        $(this).parent().append('<ul class="list-group list-group-ae autocomplete_ul no_display" id="autocomple_ul"></ul>');
//$(this).append('<ul class="list-group list-group-ae autocomplete_ul no_display" id="autocomple_ul"></ul>');
        $('<ul class="list-group list-group-ae autocomplete_ul no_display" id="autocomple_ul"></ul>').insertAfter($(this));
        var form = $(this).closest("form");
        $(this).on('input', function() {
            if ($(this).val().length > ((opt['length'] != undefined && opt['length'] != null) ? opt['length'] : 0)) {
                if (opt['ajax'] != undefined && opt['ajax'] != null && opt['ajax'] == true) {
                    var options = call_auto_complete_ajax($(this).val());
                } else {
                    if (opt['in'] != undefined && opt['in'] != null && !$.isEmptyObject(opt['in'])) {
                        var options = "";
                        for (var key in opt['in']) {
                            options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li' data-key='" + key + "' data-value='" + opt["in"][key] + "'>" + $(this).val() + " in:" + opt["in"][key] + "</li>";
                        }
                    } else {
                        var options = '<li class="list-group-item list-group-ae-item value_in cursor_hand autocomplete_li">No Data found</li>';
                    }
//                        var options = "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'>" + $(this).val() + " in:Customer ID</li>";
//                        options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'>" + $(this).val() + " in:Customer Name</li>";
//                        options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'>" + $(this).val() + " in:Ad Tag ID</li>";
//                        options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'>" + $(this).val() + " in:Ad Tag Name</li>";
//                        options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'>" + $(this).val() + " in:AE ID</li>";
//                        options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li'>" + $(this).val() + " in:AE Name</li>";
                }
                
                $(this).next().html(options).show();
            } else {
                $(this).next().html("").show();
            }
        });
        var liSelected;
        $(this).keydown(function(e) {
            if ($(this).is(":focus") && $('.list-group-ae-item').is(':visible')) {
                var li = $('.list-group-ae-item');
                var menu = $('.list-group-ae');
                var active = menu.find('.active');
                var height = active.outerHeight(); //Height of <li>
                var top = menu.scrollTop(); //Current top of scroll window
                var menuHeight = menu[0].scrollHeight; //Full height of <ul>
                if (e.which === 40) {
                    if (liSelected) {
                        liSelected.removeClass('active');
                        next = liSelected.next();
                        if (next.length > 0) {
                            liSelected = next.addClass('active');
                            menu.scrollTop(top + height - 1);
                        } else {
                            liSelected = li.eq(0).addClass('active');
                            menu.scrollTop(0);
                        }
                    } else {
                        liSelected = li.eq(0).addClass('active');
                    }

                } else if (e.which === 38) {
                    if (liSelected) {
                        liSelected.removeClass('active');
                        next = liSelected.prev();
                        if (next.length > 0) {
                            liSelected = next.addClass('active');
                            menu.scrollTop(top - height + 1);
                        } else {
                            liSelected = li.last().addClass('active');
                            menu.scrollTop(menuHeight + height + 1);
                        }
                    } else {
                        liSelected = li.last().addClass('active');
                    }
                } else if (e.which === 13) {
                    var $name = ($('.list-group-ae').find(".active").html());
                    if ($name == "" || $name == null) {
                        $(".list-group-ae").fadeOut();
//                        $('#form_search').submit();
add_hidden_options($('.list-group-ae').find(".active"), form);
                    } else {
                        $(".list-group-ae").fadeOut();
                        add_hidden_options($('.list-group-ae').find(".active"), form);
                    }
                } else if (e.which === 27) {
                    $(".list-group-ae").fadeOut();
                }
            } else if ($(this).is(":focus")) {
                if (e.which === 13 && $(this).val().length > 0) {
//                    $('#form_search').submit();
    add_hidden_options($('.list-group-ae').find(".active"), form);
                }
            }

        });
        $(".list-group-ae").on("click", function(e) {
            var $clicked = $(e.target);
            var $name = $clicked.html();
            if ($name == "" || $name == null) {
                $(".list-group-ae").fadeOut();
            } else {
                $(".list-group-ae").fadeOut();
                add_hidden_options($clicked, form);
            }
        });
        $(document).on("click", function(e) {
            var $clicked = $(e.target);
            if (!$clicked.hasClass("list-group-ae-item") && $clicked.attr("id") != "input_box") {
                $(".list-group-ae").fadeOut();
            }
        });
        $('#form_search').bind("keypress", function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });

    };
}(jQuery));