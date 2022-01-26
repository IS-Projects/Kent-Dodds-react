// Making HTTP requests
import React, { useEffect, useReducer } from 'react'

// 🦉 There are lots of ways to make HTTP requests in React components. React is
// currently working on a new feature called Suspense which is fantastic and
// will solve lots of problems web applications (not just React) have with
// data fetching on the client. Unfortunately, it's not ready yet.
//
// 🦉 Every company has unique data requirements, so I recommend that you either
// find an open source custom hook that suits your needs or you develop one
// for your company that suits your needs well.
//
// In this exercise, we'll be doing data fetching directly in a useEffect hook
// callback within our component.
//
// Here we have a form where users can enter the name of a pokemon and fetch
// data about that pokemon. Your job will be to create a component which makes
// that fetch request.

// eslint-disable-next-line no-unused-vars
function fetchPokemonReducer(state, action) {
  switch (action.type) {
    case 'FETCHING': {
      // 🐨 return the state that should exist when fetching starts
      return { ...state, loading: true }
    }
    case 'FETCHED': {
      // 🐨 return the state that should exist when the fetch request finishes
      return {
        error: null,
        loading: false,
        pokemon: action.pokemon,
      }
    }
    case 'FETCH_ERROR': {
      // 🐨 return the state that should exist when the fetch request fails
      return { ...state, error: action.error, loading: false }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function FetchPokemon({ pokemonName }) {
  // 🐨 Have state for the pokemon (null), the error state (null), and the
  // loading state (false). I recommend you use a reducer for this. I've given
  // you a starter reducer above because I love you.
  const [state, dispatch] = useReducer(fetchPokemonReducer, { pokemon: null, error: null, loading: false })

  const { pokemon, error, loading } = state

  // 🐨 Use the `fetchPokemon` function below to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemon => { /* call set state with the pokemon and loading: false */},
  //     error => {/* call set state with the error and loading: false */},
  //   )

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 🐨 before calling `fetchPokemon`, make sure to dispatch a FETCHING action
  // 🐨 when the promise resolves, dispatch FETCHED and send the pokemon
  // 🐨 if the promise rejects, dispatch a FETCH_ERROR and send the error

  useEffect(() => {
    dispatch({ type: 'FETCHING' })
    fetchPokemon(pokemonName).then(
      pokemon => dispatch({ type: 'FETCHED' , pokemon}),
      error => dispatch({ type: 'FETCH_ERROR', error }),
    )
  }, [pokemonName])

  // 🐨 Render the appropriate content based on the state:
  //    1. loading: '...'
  //    2. error: 'ERROR!'
  //    3. pokemon: the JSON.stringified pokemon in a <pre></pre>
  return loading ? ('...') :
    error ? ('ERROR!') :
      (<pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>)
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function fetchPokemon(name) {
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
    
  `

  return window
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: { name },
      }),
    })
    .then(r => r.json())
    .then(response => response.data.pokemon)
}

class Usage extends React.Component {
  state = { pokemonName: null }
  inputRef = React.createRef()
  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      pokemonName: this.inputRef.current.value,
    })
  }
  render() {
    const { pokemonName } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="pokemonName-input">Pokemon Name (ie Pikachu)</label>
          <input id="pokemonName-input" ref={this.inputRef} />
          <button type="submit">Submit</button>
        </form>
        <div data-testid="pokemon-display">
          {pokemonName ? <FetchPokemon pokemonName={pokemonName} /> : null}
        </div>
      </div>
    )
  }
}
Usage.title = 'Making HTTP requests'

export default Usage

/* eslint no-unused-vars:0 */
