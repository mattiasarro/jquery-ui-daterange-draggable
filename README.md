jquery-ui-daterange-draggable
=============================

Facilitates selecting two dates by dragging through the jQuery UI Datepicker.

Usage
=====

```JavaScript
DaterangeSelector({
      selector: "#datepicker", 
      nr_months: 2, // display 2 Datepicker months
      start_date: function () {
        return(new Date()); // beginning of current selection
      },
      end_date: () -> (
        return(new Date()); // end of current selection
      ),
      start_date_selected: function(time) { // callback when user starts dragging
        console.log("new selection begins at: " + time);
      },
      end_date_selected: function(time) { // callback when user stops dragging
        console.log("new selection ends at: " + time);
      }
    });
```
