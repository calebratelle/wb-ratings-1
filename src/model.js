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




