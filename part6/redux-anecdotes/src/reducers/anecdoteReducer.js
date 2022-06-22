import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    setAnecdote: (state, action) => {
      const changedAnecdote = action.payload;

      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);

    dispatch(appendAnecdote(newAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.vote(id);

    dispatch(setAnecdote(changedAnecdote));
  };
};

export default anecdoteSlice.reducer;
