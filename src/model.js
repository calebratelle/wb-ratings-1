import { Model, DataTypes } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///ratings');

export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);

export class Movie extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    posterPath: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'movie',
    sequelize: db,
  },
);

//Use these four commands in the Node REPL to test the movie model.

// const { Movie, db } = await import('./src/model.js');

// await db.sync();

// const testMovie = await Movie.create({ title: 'Test Movie' });

// console.log(testMovie);

export class Rating extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Rating.init(
  {
    ratingId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  },
  {
    modelName: 'rating',
    sequelize: db,
    timestamps: true,
    updatedAt: false,
  },
);

Movie.hasMany(Rating, { foreignKey: 'movieId' });
Rating.belongsTo(Movie, { foreignKey: 'movieId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

// Run the node command to start the REPL and follow the steps below:

// 1. Import the models and db instance from src/model.js.

// const { User, Movie, Rating, db } = await import('./src/model.js');

// 2. Call db.sync—by setting force: true in the options argument, Sequelize will delete all the tables and recreate them again.

// await db.sync({ force: true });

// 3. Create a User instance and a Movie instance.

// const testUser = await User.create({ email: 'test@email.com', password: 'test' });
// const testMovie = await Movie.create({ title: 'Test Movie' });

// 4. Call testUser.createRating to create a rating for the user.

// await testUser.createRating({
//   score: 5,
//   movieId: testMovie.movieId
// });

// 5. Call testMovie.getRatings—you should get an array with the rating you just created.

// await testMovie.getRatings()

