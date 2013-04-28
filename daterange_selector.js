DaterangeSelector = function (attr) {
    
    this.init = function () {
        this.selector = attr.selector;
        this.nr_months = typeof attr.nr_months !== 'undefined' ? attr.nr_months : 1;
        dp_dragging = false;
        
        this.defineDatepicker();
        this.initSelected();
        this.defineListeners();
    }
    
    
    this.defineDatepicker = function () {
        var dp = $(this.selector).datepicker({
            numberOfMonths: this.nr_months,
            firstDay: 1,
            onSelect: function() {
                $(".ui-state-active").removeClass("ui-state-active");
                $(".within_selected_range").removeClass("within_selected_range");
            }
        });
        
        $(this.selector).datepicker("setDate", attr.start_date());
        
        dp.mousedown(function(e){
            dp_dragging = true;
            begin_date = dateUnderCursor();
            $(".ui-state-hover").parent().addClass("within_selected_range");
        });
        
        dp.selectable({
            stop: function(event, ui) {
                dp_dragging = false;
                end_date = dateUnderCursor();
                
                if (typeof attr.start_date_selected !== 'undefined') {
                    var start = new Date(Math.min(begin_date, end_date));
                    attr.start_date_selected(start);
                }
                
                if (typeof attr.end_date_selected !== 'undefined') {
                    var end = new Date(Math.max(begin_date, end_date));
                    attr.end_date_selected(end);
                }
                $(".ui-state-active").removeClass("ui-state-active");
            }
        });
    }
    
    this.initSelected = function () {
        // On page load, this is set on the first calendar, causing a bug
        // because dateUnderCursor() gets day numbers from both months
        $(".ui-state-hover").removeClass("ui-state-hover");
        $(".ui-state-active").removeClass("ui-state-active");
        
        highlightBetween(attr.start_date(), attr.end_date());
    }
    
    this.defineListeners = function () {
        // live because after datepicker.onSelect, the fucker stops working
        $("table.ui-datepicker-calendar td a").live("hover", function() {
            if (dp_dragging == true) {
                var hover_a = $(this);
                var hover_date = getDate(hover_a);
                highlightBetween(begin_date, hover_date);
            }
        });
    }
    
    // Helpers
    
    
    function dateUnderCursor() {
        var a = $(".ui-state-hover");
        var td = a.parent();
        var is_day = (td.attr("data-handler") == "selectDay");
        if (is_day == true) {
            var day = parseInt(a.text());
            var month = td.attr("data-month");
            var year = td.attr("data-year");
            return(new Date(year, month, day));
        }
    };
    
    function getDate(a) {
        var td = a.parent()
        var day = a.text();
        var month = td.attr("data-month");
        var year = td.attr("data-year");
        var date = new Date(year, month, day);
        return(date);
    }
    
    function highlightBetween(start, end) {
        var all_anchors = $("td[data-handler=selectDay] a");
        all_anchors.each(function(i,e){
            var a = $(this);
            var current_date = getDate(a);
            
            if (end < start) {
                var start_old = start;
                start = end;
                end = start_old;
            }
            
            if ((start <= current_date) && (current_date <= end)) {
                a.parent().addClass("within_selected_range");
            } else {
                a.parent().removeClass("within_selected_range");
            }
        });
    }
    
    init();
    return(this);
}
