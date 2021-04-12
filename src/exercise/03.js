// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react';

function Name() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('');
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={e => setAnimal(e.target.value)}
      />

      {animal && <Display animal={animal} />}
    </div>
  );
}

function Display({ animal }) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>;
}

function App() {
  return (
    <form>
      <Name />
      <FavoriteAnimal />
    </form>
  );
}

export default App;
