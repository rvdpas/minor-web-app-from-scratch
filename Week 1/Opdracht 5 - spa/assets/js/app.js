'use strict';

(function () {
  var app = {
    init : function() {
      routes.init();
      sections.toggle('#home');
    }
  };

  var routes = {
    init: function () {
      window.addEventListener("hashchange", function () {
        sections.toggle(location.hash);
      });
    }
  };

  var sections = {
    toggle: function (route) {
      var activeSection = document.querySelector(route);
      var viewElement = document.getElementsByClassName('view');

      for (var i = 0; i < viewElement.length; i++) {
        if (viewElement[i].id == activeSection.id) {
          viewElement[i].classList.remove('hide');
        } else {
          viewElement[i].classList.add('hide');
        }
      }
    }
  };

  app.init();
})();
