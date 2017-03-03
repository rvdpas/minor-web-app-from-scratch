# Final assignment
https://rvdpas.github.io/minor/web-app-from-scratch/final/

## search for your favorite album with the spotify API
I've built a Single Page Application which takes the users input and searches for the albums that belong to the artist.
When you've found your album you can check it out and play it.

## usage 
1: Search for your favorite artist.
2: Click the album you would like to check out.
3: listen to the album.

## wishlist
- Options to filter and sort.
- Show the whole album and choose your song.

## How does it work (code)
The user fills in the form, which first checks if there's more than 0 characters. 
A get request gets fired and retrieves the users input from the spotify api.
The user will get 20 albums based on the artist.
The user can click on the album to go to the detailpage. Here you can listen to the album. For this to work you need to have spotify on your pc. As an alternative i've put a 30 second fragment of the song, so you can even listen to it if you don't have spotify.

## Object Method Diagram
![Object Method Diagram](https://github.com/rvdpas/minor/blob/master/web-app-from-scratch/final/screenshots/object.jpg)

## Flowchart
![Flowchart](https://github.com/rvdpas/minor/blob/master/web-app-from-scratch/final/screenshots/flowchart.jpg)