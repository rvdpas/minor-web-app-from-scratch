(function() {
  'use strict';

  var templateAlbums = Handlebars.compile(document.getElementById('results-template').innerHTML);
  var templateDetail = Handlebars.compile(document.getElementById('detail-template').innerHTML);
  var resultsPlaceholder = document.getElementById('results');
  var resultsDetail = document.getElementById('results-detail');

  var config = {
    apiUrl: 'https://api.spotify.com/v1/'
  }

  var albums = [];

  var app = {
    init : function() {
      routes.init();
      search.init();
    }
  };

  var request = {
    make: function (url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
          var data = JSON.parse(xhr.responseText);
          callback(data);
        }
        else {
          alert('Request failed.  Returned status of ' + xhr.status);
        }
      };
      xhr.send();
    }
  };

  var search = {
    init: function () {
      var form = document.getElementById('search');
      form.addEventListener('submit', this.onSearch);
    },
    onSearch: function (e) {
      e.preventDefault();
      var input = document.getElementById('input').value;

      if (input.length > 0) {
        request.make(config.apiUrl + 'search?q=' + input + '&type=album', function(data) {
          albums = data.albums.items;

          resultsPlaceholder.innerHTML = templateAlbums(data);
          resultsPlaceholder.classList.remove('hide');
          resultsDetail.classList.add('hide');
        });
      }
    }
  };

  var routes = {
    init: function () {

      routie({
        '': function() {
          console.log('home')
        },
        'albums/:id': function(id) {
         
          var album = albums.find(function (album) {
            return album.id === id;
          });

          console.log(album);
          
          resultsDetail.innerHTML = templateDetail(album);
          resultsPlaceholder.classList.add('hide');
          resultsDetail.classList.remove('hide');
        }
      });
    }
  };

  app.init();

})();