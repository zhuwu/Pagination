Pagination
==========

## Overview
This is a simple jQuery pagination plugin. It is very basic, simple to use and modify.

---

## Features
* Page switching by clicking pagination & previous/next buttons.
* Automatic mode with timeout interval option
* Circular mode
* Fire callback function after page switching

---

## Options
* **element** defaults to `.element`
 * The relative selector to elements shown in pages.

* **pagination** defaults to `.pagination`
 * Relative selector to pagination buttons.

* **prev** defaults to `.prev`
 * Relativce selector to previous button.

* **next** defaults to `.next`
 * Relativce selector to next button.

* **elementActiveClass** defaults to `active`
 * CSS class name to highlight currently showing elements

* **prevNextDisabledClass** defaults to `disabled`
 * CSS class name to disable previous/next page button when reached end (when circular mode is off).

* **paginationActiveClass** defaults to `current`
 * CSS class name to highlight current pagination button

* **initialPage** defaults to `0`
 * Initial page index. The number is zero-based.

* **elementPerPage** defaults to `1`
 * Number of elements will appear in one page.

* **circle** defaults to `false`
 * Whether to turn on circular mode.

* **auto** defaults to `false`
 * Whether to turn on auto pagination switching mode.

* **timeout** defaults to `2000`
 * Timeout for auto page switching. Unit is ms.

* **callback** defaults to `null`
 * Callback to trigger after switching a page. 
 * Its this will be set to jQuery dom selector object which is used to initializepagnaton.
 * Three parameters are passed to the callback function, eventType ("auto", "prev", "next" or "pagination"), current (current page index), and currentElements (current displaying elements).

*Relative selector above means it is relative to the selector used to initialize pagination.*

