// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt';

function Tilt({ children }) {
  const tiltRef = React.useRef();

  React.useEffect(() => {
    const tiltNode = tiltRef.current;

    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: false,
      'max-glare': 0.5,
    });

    return () => tiltNode.vanillaTilt.destroy();
    // useEffect return fn works as a cleanup mechanic so that it doesn't
    // kill performance every rerender (here for example by latching listeners onto
    // a node that already exists)

    // behaviour with dependencies:

    // if no array of deps are present: cleanup happens every rerender
    // if an empty array is present: cleanup happens on unmount
    // if the array contains references: cleanup happens every time these references
    // changes, thus running the cleanup before the side effect happens again
  }, []);

  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">tada!</div>
    </Tilt>
  );
}

export default App;
