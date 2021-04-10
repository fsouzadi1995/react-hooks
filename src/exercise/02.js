// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react';

function useLocalStorageState(
  key,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) {
  const [state, setState] = React.useState(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      return deserialize(value);
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    if (prevKeyRef !== key) {
      window.localStorage.removeItem(prevKeyRef);
    }

    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
}

function Greeting({ initialName = '' }) {
  const [name, setName] = useLocalStorageState('name', initialName);
  // const [name, setName] = React.useState(initialName);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  );
}

function App() {
  return <Greeting initialName="Fabian" />;
}

export default App;
