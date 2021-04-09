import { useReducer } from 'react';
import Navigation from '../components/layout/navigation';

const initialState = { username: '', isAuth: false, test: 'yes' };

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        isAuth: true,
      };
    case 'SIGNOUT':
      // could also spread in initialState here
      return {
        ...state,
        username: '',
        isAuth: false,
      };
    default:
      return state;
  }
}

export default function ReducerPage() {
  // useReducer requires a reducer function to use and an initialState
  const [state, dispatch] = useReducer(reducer, initialState);
  // we get the current result of the reducer on 'state'

  // we use dispatch to 'dispatch' actions, to run our reducer
  // with the data it needs (the action object)
  function handleLogin() {
    dispatch({ type: 'LOGIN', payload: { username: 'Ted' } });
  }

  function handleSignout() {
    dispatch({ type: 'SIGNOUT' });
  }

  return (
    <>
      <Navigation />
      <p>Current user: {state.username}</p>
      <p>isAuthenticated: {`${state.isAuth}`}</p>
      <p> Test: {state.test}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignout}>Signout</button>
    </>
  );
}
