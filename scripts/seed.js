import { Movie, Rating, User, db } from '../src/model.js';
import movieData from './data/movies.json' assert { type: 'json' };

console.log('Syncing database...');
await db.sync({ force: true });

console.log('Seeding database...');

const moviesInDB = await Promise.all(movieData.map(async (movie) => {
    const releaseDate = new Date(Date.parse(movie.releaseDate));
    const { title, overview, posterPath } = movie;
  
    const newMovie = Movie.create({
      title,
      overview,
      posterPath,
      releaseDate,
    });
  
    return newMovie;
  }),
);

console.log(moviesInDB);

db.close