"use strict";

const initMenu = function () {
    /*
      * Open the drawer when the menu icon is clicked.
      */
    var menu = document.querySelector('#menu');
    var main = document.querySelector('main');
    var drawer = document.querySelector('#drawer');

    menu.addEventListener('click', function(e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
    });
    main.addEventListener('click', function() {
        drawer.classList.remove('open');
    });
};

document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    initMenu();
});