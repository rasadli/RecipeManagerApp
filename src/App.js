// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import RecipePage from './RecipePage'; // Import the RecipePage component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Recipe Manager App</h1>
        <p>Explore delicious recipes and learn how to cook them!</p>
      </header>

      {/* Render the RecipePage component */}
      <RecipePage />

    </div>
  );
}

export default App;
