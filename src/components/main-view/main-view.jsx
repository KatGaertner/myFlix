import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const list = [
    {
      _id: "6467dcfaaf8963a497ac08bb",
      title: "Star Wars: Episode VI - Return of the Jedi",
      summary:
        "After rescuing Han Solo from Jabba the Hutt, the Rebels attempt to destroy the second Death Star, while Luke struggles to help Darth Vader back from the dark side.",
      featured: false,
      imageURL: "starwarsepisodeVI.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff623",
          name: "Sci-Fi",
          description:
            "Science fiction is a genre of speculative fiction that deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff624",
          name: "George Lucas",
          biography: "George Lucas is an American filmmaker.",
          birthyear: 1944,
        },
      ],
    },
    {
      _id: "6467dc08af8963a497ac08b3",
      title: "2001: A Space Odyssey",
      summary:
        "After uncovering a mysterious artifact buried beneath the Lunar surface, a spacecraft is sent to Jupiter to find its origins - a spacecraft manned by two men and the supercomputer H.A.L. 9000.",
      featured: true,
      imageURL: "2001aspaceodyssey.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff625",
          name: "Sci-Fi",
          description:
            "Science fiction is a genre of speculative fiction that deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff626",
          name: "Stanley Kubrick",
          biography:
            "Stanley Kubrick was an American film director, producer and screenwriter.",
          birthyear: 1928,
          deathyear: 1999,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08b9",
      title: "Star Wars: Episode IV - A New Hope",
      summary:
        "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
      featured: false,
      imageURL: "starwarsepisodeIV.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff627",
          name: "Sci-Fi",
          description:
            "Science fiction is a genre of speculative fiction that deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff628",
          name: "George Lucas",
          biography: "George Lucas is an American filmmaker.",
          birthyear: 1944,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08b5",
      title: "The Shining",
      summary:
        "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
      featured: false,
      imageURL: "theshining.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff629",
          name: "Horror",
          description:
            "Horror genre is a type of fiction that aims to create fear, dread, disgust, and terror in the audience.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff62a",
          name: "Stanley Kubrick",
          biography:
            "Stanley Kubrick was an American film director, producer and screenwriter.",
          birthyear: 1928,
          deathyear: 1999,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08b7",
      title: "Taxi Driver",
      summary:
        "A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action.",
      featured: false,
      imageURL: "taxidriver.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff62b",
          name: "Crime",
          description:
            "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff62c",
          name: "Martin Scorsese",
          biography:
            "Martin Charles Scorsese is an American film director, producer, screenwriter and actor.",
          birthyear: 1942,
        },
      ],
    },
    {
      _id: "6467db13af8963a497ac08b2",
      title: "Silence of the Lambs",
      summary:
        "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      featured: false,
      imageURL: "silenceofthelambs.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff62d",
          name: "Thriller",
          description:
            "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff62e",
          name: "Jonathan Demme",
          biography:
            "Robert Jonathan Demme was an American director, producer, and screenwriter.",
          birthyear: 1944,
          deathyear: 2017,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08b4",
      title: "A Clockwork Orange",
      summary:
        "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
      featured: false,
      imageURL: "aclockworkorange.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff62f",
          name: "Crime",
          description:
            "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff630",
          name: "Stanley Kubrick",
          biography:
            "Stanley Kubrick was an American film director, producer and screenwriter.",
          birthyear: 1928,
          deathyear: 1999,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08b6",
      title:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      summary:
        "An insane American general orders a bombing attack on the Soviet Union, triggering a path to nuclear holocaust that a war room full of politicians and generals frantically tries to stop.",
      featured: false,
      imageURL: "drstrangelove.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff631",
          name: "Comedy",
          description:
            "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff632",
          name: "Stanley Kubrick",
          biography:
            "Stanley Kubrick was an American film director, producer and screenwriter.",
          birthyear: 1928,
          deathyear: 1999,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08ba",
      title: "Star Wars: Episode V - The Empire Strikes Back",
      summary:
        "After the Rebels are overpowered by the Empire, Luke Skywalker begins his Jedi training with Yoda, while his friends are pursued across the galaxy by Darth Vader and bounty hunter Boba Fett.",
      featured: false,
      imageURL: "starwarsepisodeV.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff633",
          name: "Sci-Fi",
          description:
            "Science fiction is a genre of speculative fiction that deals with imaginative and futuristic concepts such as advanced science and technology, space exploration, time travel, parallel universes, and extraterrestrial life.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff634",
          name: "George Lucas",
          biography: "George Lucas is an American filmmaker.",
          birthyear: 1944,
        },
      ],
    },
    {
      _id: "6467dcfaaf8963a497ac08b8",
      title: "The Departed",
      summary:
        "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
      featured: false,
      imageURL: "thedeparted.png",
      genres: [
        {
          _id: "6479e42401e17698c2cff635",
          name: "Crime",
          description:
            "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
        },
      ],
      directors: [
        {
          _id: "6479e42401e17698c2cff636",
          name: "Martin Scorsese",
          biography:
            "Martin Charles Scorsese is an American film director, producer, screenwriter and actor.",
          birthyear: 1942,
        },
      ],
    },
  ];

  const [movies, setMovies] = useState(list);

  if (movies.length === 0) {
    return <div>No movies</div>;
  }

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movieData={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  return (
    <div className="main">
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie._id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
