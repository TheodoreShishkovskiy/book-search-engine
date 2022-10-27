const { AuthenticationError } = require('apollo-server-express');
const { User } = require("../models");
const { signToken } = require("../utils/auth");

// Resolver set for login authentication and mutating userInput
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userInput = await User
        .findOne({_id: context.user._id})
        .select('-__v -password');
        return userInput;
      }
      throw new AuthenticationError('Log in to access further!');
    },
  },

  Mutation: {
    // mutation requiring login crendentials
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AuthenticationError ('This user could not be found');
    }
    const correctPassword = await user.isCorrectPassword(password);
    if (!correctPassword) {
      throw new AuthenticationError('Email or Password is incorrect');
    }
    const token = signToken(user);
    return { token, user };
  },
    // mutation to add new users
  addUser: async (parent, args) => {
    const user = await User.create(args);
    const token = signToken(user);
    return { token, user };
  },
  // Mutation to save a book
  saveBook: async (parent, {newBook}, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        {_id: context.user._id}, {$push: {savedBooks: newBook}}, {new: true}
      );
      return updatedUser;
    }
    throw new AuthenticationError('Must be logged in to do this!');
  },
  // Mutation to remove a saved book
  removeBook: async (parent, {bookId}, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        {_id: context.user._id}, {$pull: {savedBooks: {bookId}}}, {new: true}
      );
      return updatedUser;
    }
    throw new AuthenticationError('Must be logged in to do this!')
  }
}
};

module.exports = resolvers;