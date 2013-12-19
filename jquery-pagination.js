(function($) {
  $.fn.initPagination = function(opts) {
    var options = $.extend({}, defaults, opts);
    return this.each(function() {          
      var paginationHolder = $(this),
          elementList = paginationHolder.find(options.element),
          prevButton = paginationHolder.find(options.prev),
          nextButton = paginationHolder.find(options.next),
          paginationList = paginationHolder.find(options.pagination),
          visited = 0,
          current = options.initialPage,
          last = Math.floor((elementList.length - 1) / options.elementPerPage),
          autoPagination = options.auto,
          timeout = options.timeout,
          timeoutHandler;

        function showNext() {
          visited = current;
          if (current < last) {
            current++;
          } else if (options.circle) {
            current = 0;
          }
          if (current >= 0 && current <= last && current !== visited) {
            update(paginationHolder, elementList, paginationList, prevButton, nextButton, visited, current, last, options, 'auto');
          }

          timeoutHandler = setTimeout(showNext, timeout);
        }

      if (autoPagination) {
        timeoutHandler = setTimeout(showNext, timeout);
      }

      prevButton.on('click', function(event) {
        event.preventDefault();
        visited = current;
        
        if (current > 0) {
          current--;
        } else if (options.circle) {
          current = last;
        }
        
        if (current >= 0 && current <= last && current !== visited) {
          update(paginationHolder, elementList, paginationList, prevButton, nextButton, visited, current, last, options, 'prev');
          if (autoPagination) {
            clearTimeout(timeoutHandler);
            timeoutHandler = setTimeout(showNext, timeout);
          }
        }
      });
      
      nextButton.on('click', function(event) {
        event.preventDefault();
        visited = current;

        if (current < last) {
          current++;
        } else if (options.circle){
          current = 0;
        }

        if (current >= 0 && current <= last && current !== visited) {
          update(paginationHolder, elementList, paginationList, prevButton, nextButton, visited, current, last, options, 'next');
          if (autoPagination) {
            clearTimeout(timeoutHandler);
            timeoutHandler = setTimeout(showNext, timeout);
          }
        }
      });
      
      paginationList.on('click', function(event) {
        event.preventDefault();
        visited = current;
        current = paginationList.index($(this));
        
        if (current >= 0 && current <= last && current !== visited) {
          update(paginationHolder, elementList, paginationList, prevButton, nextButton, visited, current, last, options, 'pagination');
          if (autoPagination) {
            clearTimeout(timeoutHandler);
            timeoutHandler = setTimeout(showNext, timeout);
          }
        }
      });
    });
  };

  function update(paginationHolder, elementList, paginationList, prevButton, nextButton, visited, current, last, options, eventType) {
    var elementPerPage = options.elementPerPage,
        elementActiveClass = options.elementActiveClass,
        paginationActiveClass = options.paginationActiveClass,
        circle = options.circle,
        prevNextDisabledClass = options.prevNextDisabledClass,
        callback = options.callback;

    // remove elementActiveClass from last visited page elements, and assign it to current active page elements
    var currentElements =
      elementList
        .slice(visited * elementPerPage, (visited + 1) * elementPerPage)
        .removeClass(elementActiveClass)
        .end()
        .slice(current * elementPerPage, (current + 1) * elementPerPage)
        .addClass(elementActiveClass);

    // Update pagination list style
    paginationList
      .eq(visited)
      .removeClass(paginationActiveClass)
      .end()
      .eq(current)
      .addClass(paginationActiveClass);

    // Update prev & next button style if not circling
    if (!circle) {
      if (current === 0) {
        prevButton.addClass(prevNextDisabledClass);
        nextButton.removeClass(prevNextDisabledClass);
      } else if (current === last) {
        prevButton.removeClass(prevNextDisabledClass);
        nextButton.addClass(prevNextDisabledClass);
      } else {
        prevButton.removeClass(prevNextDisabledClass);
        nextButton.removeClass(prevNextDisabledClass);
      }
    }

    if (callback !== null && typeof callback === 'function') {
      callback.call(paginationHolder, eventType, current, currentElements);
    }
  }
  
  var defaults = {
    element: '.element', // Relative selector to locate element
    prev: '.prev', // Relative selector to locate prev page button
    next: '.next', // Relative selector to locate next button
    pagination: '.pagination', // Relative selector to locate pagination buttons
    elementActiveClass: 'active', // CSS class name to highlight currently showing elements
    prevNextDisabledClass: 'disabled', // CSS class name to disable prev/next page button
    paginationActiveClass: 'current', // CSS class name to highlight current pagination button
    initialPage: 0, // initial page number (starts from 0)
    elementPerPage: 1, // How many elements will appear in one page
    circle: false, // Whether circular mode is enabled.
    auto: false, // Whether auto page switching is turned on.
    timeout: 2000, // Timeout for auto page switching. Unit is ms.
    callback: null // JavaScript callback function after clicked prev/next/pagination buttons
  };
} (jQuery));
