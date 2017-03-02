(function() {
  'use strict';

//   I would wrap this vars in an object
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
//    I would combine the code below with the code for the detailpage in the router to a new 'render' object
      if (input.length > 0) {
        request.make(config.apiUrl + 'search?q=' + input + '&type=album', function(data) {
          albums = data.albums.items;

          resultsPlaceholder.innerHTML = templateAlbums(data);
          resultsPlaceholder.classList.remove('hide');
          resultsDetail.classList.add('hide');
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
            // data full detail obj of track
            console.log('request finished');
            resultsDetail.innerHTML = templateDetail(album);
            resultsPlaceholder.classList.add('hide');
            resultsDetail.classList.remove('hide');
            return;
          })
        }
      });
    }
  };

  app.init();

})();
