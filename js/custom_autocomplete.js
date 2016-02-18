(function($) {

    $.fn.autocomplete_v1 = function(opt) {
//        $(this).parent().append('<ul class="list-group list-group-ae autocomplete_ul no_display" id="autocomple_ul"></ul>');
//$(this).append('<ul class="list-group list-group-ae autocomplete_ul no_display" id="autocomple_ul"></ul>');
        $('<ul class="list-group list-group-ae autocomplete_ul pre-scrollable no_display" id="autocomple_ul"></ul>').insertAfter($(this));
        var form = $(this).closest("form");

        var in_addtional_data = "";
        if (opt['in_additional_data'] != undefined && opt['in_additional_data'] != null) {
            for (var in_additional_data_key in opt['in_additional_data']) {
                in_additional_data_key += ' data-' + in_additional_data_key + '="' + opt['in_additional_data'][in_additional_data_key] + '" ';
            }
        }
        var input_dis = $(this);

        if (opt['focus'] != undefined && opt['focus'] != null && opt['focus'] == true) {
            $(this).on('focus', function() {
                var options = get_focus_options($(this));
                $('#autocomple_ul').html(options).show();
            });
        }


        $(this).on('input', function() {
            if ($(this).val().length > ((opt['length'] != undefined && opt['length'] != null) ? opt['length'] : 0)) {
                if (opt['ajax'] != undefined && opt['ajax'] != null && opt['ajax'] == true) {
                    var ajax_data = {'search': $(this).val()};
                    if (opt['ajax_data'] != undefined && opt['ajax_data'] != null && opt['ajax_data'] == true) {
                        ajax_data = autocomplete_get_ajax_data($(this), $(this).val());
                    }
                    $.ajax({
                        'url': opt['ajax_url'],
                        'data': ajax_data,
                        'type': 'POST',
                        'success': function(response) {
                            var options = call_auto_complete_ajax(response);
                            $('#autocomple_ul').html(options).show();
                            $(this).focus();
                            return;
                        }
                    });

                } else {
                    if (opt['in'] != undefined && opt['in'] != null && !$.isEmptyObject(opt['in'])) {
                        var options = "";
                        for (var key in opt['in']) {
                            options += "<li class='list-group-item list-group-ae-item value_in cursor_hand autocomplete_li' data-key='" + key + "' data-value='" + opt["in"][key] + "' " + in_additional_data_key + ">" + $(this).val() + " in:" + opt["in"][key] + "</li>";
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

                $('#autocomple_ul').html(options).show();
            } else if (opt['focus'] != undefined && opt['focus'] != null && opt['focus'] == true) {
                var options = get_focus_options($(this));
                $('#autocomple_ul').html(options).show();
            } else {
                $('#autocomple_ul').html("").show();
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
                    $(form).submit();
//                    add_hidden_options($('.list-group-ae').find(".active"), form);
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
            if (!$clicked.hasClass("list-group-ae-item") && $clicked.attr("id") != input_dis.attr('id')) {
                $(".list-group-ae").fadeOut();
            }
        });
        $(form).bind("keypress", function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                return false;
            }
        });

    };
}(jQuery));