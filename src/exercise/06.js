// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react';
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon';

import { ErrorBoundary } from 'react-error-boundary';

function PokemonInfo({ pokemonName }) {
  const [{ status, pokemon, error }, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  });

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    setState({ status: 'pending' });
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({ status: 'resolved', pokemon });
      })
      .catch(error => {
        setState({ status: 'rejected', error });
      });
  }, [pokemonName]);

  switch (status) {
    case 'idle':
      return 'Submit a pokemon!';
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />;
    case 'rejected':
      throw error;
    default:
      throw new Error('Error: status not supported');
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('');

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={() => <div>My custom fallback component..</div>}
          resetKeys={[pokemonName]}
          onReset={() => setPokemonName('')}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
