/*************************
JavaScript for Posts page
**************************/

$(function() {
    // Executed when js-menu-icon is clicked
    $('.js-menu-icon').click(function() {
        // $(this): Self element, merely div.js-menu-icon
        // next(): Next to div.js-menu-icon, merely div.menu
        // toggle(): Show/hide pop-up box
        $(this).next().toggle();
    })
})