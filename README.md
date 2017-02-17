# Live version assignments
https://rvdpas.github.io/minor/web-app-from-scratch/opdracht-5-spa/index.html

https://rvdpas.github.io/minor/web-app-from-scratch/routing-templating/

# Over deze repository
In deze repository komen alle opdrachten te staan die zijn gemaakt voor het vak Web App From Scratch tijdens de Minor Web Development. In dit vak leer ik hoe je een Web App maakt met behulp van Html, Css en Native Javascript. Ik ga hier ook onderzoeken wat libraries en Frameworks zijn en wat het doel hiervan is. Verder weeg ik de keuze af tussen het gebruik van een library die één taak voltooid, ten opzichte van Native Javascript.

# Wat is een Framework/library
Een Framework is een toevoeging op de originele programmeertaal. In een Framework staat code geschreven, die de developer kan gebruiken om op een vereenvoudigere manier iets voor elkaar te krijgen. Bekende frameworks zijn react en Angular. Een voorbeeld van het gebruik van een framework vind je hieronder. 

Class togglen met jQuery 
```
$(el).toggleClass(className);
```

Class togglen met Native Javascript
```javascript
if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  el.className = classes.join(' ');
}
```

### Voordelen frameworks/library
- Frameworks bevatten cross browser compatibiliteit. Dit wil zeggen dat plain Javascript functies heeft die niet in elke browser worden ondersteund. Een framework heeft vaak code, die ervoor zorgt dat de browsers de code goed implementeerd. Hierdoor hoeft de developer zich geen zorgen te maken of het op alle browsers werkt.
- Het selecteren van Dom elementen is eens stuk flexibeler.
- Javascript frameworks zijn zo gebouwd dat de code makkelijk hergebruikt kan worden. 
- Frameworks zijn zeer onderhoudsvriendelijk. Je hoeft alleen de nieuwe versie te includen en niet alle bestanden te doorzoeken.

### Nadelen frameworks
- De frameworks zijn vaak erg groot. Er moet een extra request worden uitgevoerd om de het framework te kunnen gebruiken, hierdoor wordt je de laadtijd van je website weer een stukje trager.
- Door gebruik van Frameworks is er een risico dat we de kern van Javascript vergeten. Alles wordt voor je gedaan en je raakt het begrip van bepaalde functionaliteiten kwijt, omdat het allemaal voor je wordt gedaan. Hier zit ook het gevaar dat mensen frameworks leren in plaats van Native Javascript.

# Wat is een Single Page Application?
Een Single Page Application is een app of website waarbij alle functionaliteit op 1 pagina te vinden is. Hierdoor worden alleen nieuwe stukjes van de site tevoorschijn gehaald, zodat de site niet in zijn geheel ververst hoeft te worden.

### Voordelen
- De site hoeft niet opnieuw geladen te worden als de gebruiker een actie uitvoerd.
- Gebruiksvriendelijk

### Nadelen
- De vindbaarheid in Google is een stuk lastiger. 
- Omdat de pagina constant herlaadt neemt het geheugengebruik snel toe.

#### Bronnen
http://docplayer.nl/5072853-Javascript-frameworks.html  
https://nl.wikipedia.org/wiki/Single_Page_Application  
http://www.westsitemedia.nl/blog/wat-is-een-web-applicatie-framework-en-wat-moet-je-daar-over-weten  
