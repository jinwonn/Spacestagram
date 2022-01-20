# Spacestagram
## Project Description

Spacestagram is a single page application that utilizes NASA’s Atronomy Picture of the Day API and displays the resulting images and allows users to browse them in a reverse chronological order and favourite images they like. The App utilizes React built-in and custom hooks. Data is persisted in local storage for when page is refreshed. The client application communicates with an API server over HTTP, using the JSON format.

## Project Features
- Scroll endlessly with automatic fetching and rendering of new data when reaching the end of currently loaded items
- Like an image with the heart button or by double tapping the image
- Unlike an image by pressing the heart button
- Image explaination is automatically collapsed when it is too long to minimize screen realestate usage especially on smaller screens such as mobile screens.


## Installation
```
npm install
```

## Running Webpack Development Server
```
npm start
```

## Project Stack

__Front-End:__ React, Axios, JSX, HTML, CSS, JavaScript