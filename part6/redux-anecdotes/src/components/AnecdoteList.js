import { useSelector, useDispatch } from "react-redux";

import { voteForAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") return state.anecdotes;

    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id));

    dispatch(setNotification(`You voted for "${anecdote.content}"`));
  };

  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
