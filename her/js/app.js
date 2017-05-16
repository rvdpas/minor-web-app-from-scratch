(function() {
  'use strict';

  var houses = [];

  // initialize all needed objects
  var app = {
    init : function() {
      search.init();
    }
  };

  var configs = {
    autoSuggestTemplate: document.getElementById('auto-suggest'),
    minimum: document.getElementById('minimum').value,
    maximum: document.getElementById('maximum').value,
    aantalKamers: document.getElementById('aantalKamers').value,
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

  // Retrieves the users input and makes a api request to retrieve the houses from funda.
  var search = {
    init: function () {
      var form = document.getElementById('search');
      form.addEventListener('submit', this.onSearch);

      this.onInput();
      this.onFilterChange();

      // CLick on search suggestion
      document.addEventListener('click', function(e) {
        if (e.target.classList.contains('search-item')) {
          document.getElementById('input').value = e.target.innerHTML;
          this.onSearch(e);
        }
      }.bind(this));

      // Close search suggestion if user clicks out of the dropdown
      document.addEventListener('click', function(e) {
        if (e.target.closest('#auto-suggest') === null) {
          configs.autoSuggestTemplate.classList.add('hide');
        }
      });
    },

    // Gets the users input when he starts typing and makes a request to the autosuggest api.
    onInput: function () {
      var templateAutoSuggest = Handlebars.compile(document.getElementById('auto-suggest-template').innerHTML);
      var autoSuggests = [];
      document.getElementById("input").addEventListener("input", function () {
        request.make(config.autoSuggest + input.value + '&max=5&type=koop', function(data) {
          autoSuggests = data;
          var input = document.getElementById('input').value;

          config.autoSuggestTemplate.innerHTML = templateAutoSuggest(data);

          if (input.length > 0) {
            config.autoSuggestTemplate.classList.remove('hide');
          } else {
            config.autoSuggestTemplate.classList.add('hide');
          }
        });
      });
    },
    // Checks if something there is anything in the form and gives feedback to the user.
    onSearch: function (e) {
      e.preventDefault();
      var input = document.getElementById('input').value;
      configs.autoSuggestTemplate.classList.add('hide');

      document.querySelector('.loader').classList.remove('hide');

      if (input.length > 0) {
        document.getElementById("search-input").innerHTML = "U heeft gezocht op " + input + ".";
        document.getElementById("search-minimum").innerHTML = "U heeft een minimum prijs geselecteerd van: &euro; " + configs.minimum + ".";
        document.getElementById("search-maximum").innerHTML = "U heeft een maximum prijs geselecteerd van: &euro; " + configs.maximum + ".";
        document.getElementById("search-rooms").innerHTML = "U heeft  " + configs.aantalKamers + " kamers geselecteerd.";
        var results = [];
        search.fetch(1, []);
      }
    },

    // When the value of a filter changes the results will update to the new search value.
    onFilterChange: function() {
      document.getElementById('aantalKamers').addEventListener('change', function() {
        this.render();
      }.bind(this));

      document.getElementById('minimum').addEventListener('change', function() {
        this.render();
      }.bind(this));

      document.getElementById('maximum').addEventListener('change', function() {
        this.render();
      }.bind(this));
    },

    // Makes a request to get all the available pages.
    fetch: function(page, results) {
      var input = document.getElementById('input').value;

      request.make(config.apiUrl + input + '/&page=' + page + '&pagesize=25', function(data) {
        results = results.concat(data.Objects);

        if (data.Paging.VolgendeUrl && page <= 10) {
          this.fetch(page + 1, results);
        } else {
          houses = results;
          console.log(houses);

          this.render();
        }
      }.bind(this));
    },

    // Filters to get min and max price + multiple rooms
    render: function() {
      var resultsPlaceholder = document.getElementById('results');
      var templateHouses = Handlebars.compile(document.getElementById('results-template').innerHTML);

      var filteredHouses = houses.filter(function(house) {
        if (configs.aantalKamers && house.AantalKamers != configs.aantalKamers) {
          return false;
        }

        if (house.Koopprijs <= configs.minimum || (configs.maximum !== 'onbeperkt' && house.Koopprijs >= configs.maximum)) {
          return false;
        }

        return true;
      });

      resultsPlaceholder.innerHTML = templateHouses({data: filteredHouses});
      resultsPlaceholder.classList.remove('hide');
      document.querySelector('.loader').classList.add('hide');
    },
  };

  app.init();
})();
