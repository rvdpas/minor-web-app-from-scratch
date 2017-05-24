(function() {
  'use strict';

  var config = {
    minimum: document.getElementById('minimum').value,
    maximum: document.getElementById('maximum').value,
    aantalKamers: document.getElementById('aantalKamers').value,
    houses: [],
  };

  var resultsPlaceholder = document.getElementById('results');
  var detailsPlaceholder = document.getElementById('results-detail');

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

  // initialize all needed objects
  var app = {
    init : function() {
      search.init();
      routes.create();
    }
  };

  var routes = {
    create: function() {
      routie({
        'residences/:GroupByObjectType': function(GroupByObjectType) {
          search.getResidence(GroupByObjectType);
        },
      });
    },
  };

  // Retrieves the users input and makes a api request to retrieve the houses from funda.
  var search = {
    init: function () {
      var form = document.getElementById('search');
      form.addEventListener('submit', this.onSearch);

      this.onFilterChange();

      // CLick on search suggestion
      document.addEventListener('click', function(e) {
        if (e.target.classList.contains('search-item')) {
          document.getElementById('input').value = e.target.innerHTML;
          this.onSearch(e);
        }
      }.bind(this));
    },

    // Checks if there is anything in the form and gives feedback to the user.
    onSearch: function (e) {
      e.preventDefault();
      var input = document.getElementById('input').value;
      document.querySelector('.loader').classList.remove('hide');

      if (input.length > 0) {
        document.getElementById("search-input").innerHTML = "U heeft gezocht op " + input + ".";
        document.getElementById("search-minimum").innerHTML = "U heeft een minimum prijs geselecteerd van: &euro; " + config.minimum + ".";
        document.getElementById("search-maximum").innerHTML = "U heeft een maximum prijs geselecteerd van: &euro; " + config.maximum + ".";
        document.getElementById("search-rooms").innerHTML = "U heeft  " + config.aantalKamers + " kamers geselecteerd.";
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

      request.make(key.apiUrl + input + '/&page=' + page + '&pagesize=25', function(data) {
        results = results.concat(data.Objects);

        if (data.Paging.VolgendeUrl && page <= 10) {
          this.fetch(page + 1, results);
        } else {
          config.houses = results;

          this.render();
        }
      }.bind(this));
    },

    // make request for detail page
    getResidence: function (GroupByObjectType) {
      var url = "http://funda.kyrandia.nl/feeds/Aanbod.svc/json/detail/" + key.secret + "/koop/" + GroupByObjectType + "/";

      request.make(url, function(GroupByObjectType) {
        search.detail(GroupByObjectType);
      });
    },

    // Filters to get min and max price + multiple rooms
    render: function() {
      var templateHouses = Handlebars.compile(document.getElementById('results-template').innerHTML);

      var filteredHouses = config.houses.filter(function(house) {
        console.log(filteredHouses)
        if (config.aantalKamers && house.AantalKamers != config.aantalKamers) {
          return false;
        }

        if (house.Koopprijs <= config.minimum || (config.maximum !== 'onbeperkt' && house.Koopprijs >= config.maximum)) {
          return false;
        }

        return true;
      });

      // clean up data and make new object
      var cleanedData = Object.keys(filteredHouses).map(function (key) {
        return {
          rooms: filteredHouses[key].AantalKamers,
          image: filteredHouses[key].FotoLarge,
          address: filteredHouses[key].Adres,
          postalCode: filteredHouses[key].Postcode,
          city: filteredHouses[key].Woonplaats,
          price: filteredHouses[key].PrijsGeformatteerdHtml,
          id: filteredHouses[key].GroupByObjectType,
        };
      });

      resultsPlaceholder.innerHTML = templateHouses({data: cleanedData});
      resultsPlaceholder.classList.remove('hide');
      document.querySelector('.loader').classList.add('hide');
    },
    // print detail page
    detail: function(data) {
      var rawTemplating = document.getElementById("detail-template").innerHTML;
      var compiledTemplate = Handlebars.compile(rawTemplating);
      var ourGeneratedHTML = compiledTemplate(data);

      var resultsPage = document.getElementById("results-detail");
      resultsPlaceholder.classList.add('hide');
      resultsPage.classList.remove('hide');
      resultsPage.innerHTML = ourGeneratedHTML;
    },
  };

  app.init();
})();
