# myFlix - Movie Database App

**myFlix** is a movie database app that provides users with a collection of movies, directors and genres. The app provides a seamless user experience with features such as user authentication, favorites list management, and user account management.

The app is connected to a MongoDB database through an [API built for this purpose](https://github.com/KatGaertner/movie_api).

The app is currently [deployed on Netlify](https://myflix-27.netlify.app/).  
**Demo Credentials:** As there is no verification, you can sign up using fake data, or use "testuser" with "testpassword".

## Features

- **User Authentication:** Users can create accounts and securely log in to gain access to the movie database.
- **Movie Details:** Users can view details about a movie, a director or a genre.
- **Recommendations:** Upon viewing a movie, users receive suggestions for similar movies based on the selected movie's genre.
- **Favorites List:** Users can curate their own favorites list by adding and removing movies at their convenience.
- **User Account Management:** Users have the flexibility to update their account information or choose to delete their account if desired.

## Technologies

This project utilizes:

- React: Used for building a seamless single-page application with efficient routing.
- Bootstrap: Employed for enhancing the app's aesthetics and user interface with responsive styling.
- Redux: Implemented for robust state management.
- Parcel: Utilized as the build tool.

<a name="webpage-cut"></a>
## Installation and Setup

To run the app locally, follow these steps:

1. Clone this repository to your local machine.
2. Install the project dependencies using `npm install`
3. Start the development server with `parcel src/index.html`
4. Visit `http://localhost:1234` in your web browser to access the app.

## Project Status

This project was made within the scope of a web development course as a portfolio project. As such, it is finished for now.
