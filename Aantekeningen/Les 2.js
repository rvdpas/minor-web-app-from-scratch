// Web App From Scratch - Les 2

(function () { // Begin iife
	var person = {
		name: 'Jane Doe',
		speak: function () {
			console.log('Hello, my name is ' + this.name);
		}
	}

	console.log(person);
	person.speak();
})(); // eind iife

// function scope, alles binnen de scope is niet te bereiken van buitenaf, dus Variabelen zijn pas beschikbaar als deze geladen is.

var anotherPerson = ( function () {
	console.log(anotherPerson); // Dit is niet handig, want je herhaald jezelf. (DRY) Gebruik alleen voor dingen die je maar 1x nodig hebt.
})();


/* module pattern */

var anotherPerson = (function () {
	var _name = 'John Doe';

	var speak = function () {
		console.log('Hello, my name is ' + this.name);
	};

	return {
		name: _name,
		speak: speak
	}
})();

console.log(anotherPerson);
anotherPerson.speak();

/* Object constructor, with prototype */

(function () {
	var Person = function (name) {
		this.name = name;

		this.speak = function () {
			console.log("hello, my name is " + this.name);
		}
	}

	Person.prototype.speakLoud = function () {
		console.log(('hello, my name is ' + this.name).toUpperCase());
	}

	var jane = new Person('Jane Doe');
	var john = new Person('John Doe');

	console.log(Person);
	console.log(jane);
	console.log(john);

})();