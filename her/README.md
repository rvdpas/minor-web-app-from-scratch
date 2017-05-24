# Web app from scratch

## Funda
In this repository, you will find code to make an Web app with the Funda Web Api. Funda is the largest real estate platform for Consumers and entrepreneurs. The company has a huge database with all the houses that are available for sale in the Netherlands. 

## api
## Funda api
To use this application u need some keys to be able to connect to the api. I'm not showing my keys for security purpose. If you've got your own keys from Funda create a config.js file and add the file to the .gitignore file. The config file looks like this:
```
var apiKey = {
    apiUrl: 'request_url_here',
    secret: 'secret_code_here',
}
```

Now we can use our api key safely in our app.js. 

## Link the keys to the app
In our app.js we can now add the request to ask the funda api for data. 
First we make a request object.

```
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

```

After creating the request object we can use this object to call to the Funda Api

```
request.make(apiKey.apiUrl + options, function(data) {
    // here we will save the returned data from the server
}
```

## Templating
For the templating i've used handlebars.  

[handlebars](http://handlebarsjs.com/)

## routing
For the routing of the application i've used routie.js  

[routie](http://projects.jga.me/routie/)

## usage
The users opens the application and get's a input field to search for a house. When the users enters a location where they want to look for a house, a request is made to the Funda api. The api will return the data that fits the search input. If the users like one of the houses, he can open a detail page of it to receive more information. 

## Using array method's

### Sorting
If we've got an array:
```
var places = ["Rotterdam", "Amsterdam", "Utrecht", "Groningen"];
places.sort();

```
With the result of:
```
Amsterdam, Groningen, Rotterdam, Utrecht
``` 

## clone the repository

```
git clone https://github.com/rvdpas/minor-web-app-from-scratch.git
```
