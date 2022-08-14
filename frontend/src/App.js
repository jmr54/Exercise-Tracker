// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import Components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';

// Define the function that renders the content in routes using State.
function App() {

  const [exerciseEdit, setExerciseEdit] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Exercise Tracker</h1>
            <p>Welcome to my exercise tracker. You can keep track of your exercise as you want!</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setExerciseEdit={setExerciseEdit} />
            </Route>

            <Route path="/add-exercise">
              <AddExercisePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditExercisePage exerciseEdit ={exerciseEdit} />
            </Route>
          </main>

          <footer>
          <p>&copy; John Ro 2022</p>
          </footer>

      </Router>
    </>
  );
}

export default App;