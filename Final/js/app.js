(function() {
  'use strict';

  // Local variables object
  var config = {
    apiUrl: 'https://api.spotify.com/v1/',
    templateAlbums: Handlebars.compile(document.getElementById('results-template').innerHTML),
    templateDetail: Handlebars.compile(document.getElementById('detail-template').innerHTML),
    resultsPlaceholder: document.getElementById('results'),
    resultsDetail: document.getElementById('results-detail'),
    albums: [],
  }

  // initialize all needed objects
  var app = {
    init : function() {
      routes.init();
      search.init();
    }
  };

  // Making a request object
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
  
  // Retrieves the users input and makes a api request to retrieve the albums from the users input artist.
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

          config.resultsPlaceholder.innerHTML = config.templateAlbums(data);
          config.resultsPlaceholder.classList.remove('hide');
          config.resultsDetail.classList.add('hide');
          window.location.href="#";
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
          console.log('niet uitgebreid')
          console.log(album.extend);
          request.make(album.href, function(data) {
            album.extend = true;
            album.detail = {};
            album.detail.copyrights = data.copyrights;
            album.detail.tracks = data.tracks;
            console.log(album);
            console.log(data);
            console.log('request finished');
            config.resultsDetail.innerHTML = config.templateDetail(album);
            config.resultsPlaceholder.classList.add('hide');
            config.resultsDetail.classList.remove('hide');
            return;
          })
        }
      });
    }
  };

  app.init();

})();