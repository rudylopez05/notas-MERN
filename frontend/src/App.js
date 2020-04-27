import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import NoteList from './components/NotesList';
import CreateUser from './components/CreateUser';
import CreateNote from './components/CreateNote';


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NoteList} />
        <Route path="/edit/:id" exact component={CreateNote} />
        <Route path="/create" exact component={CreateNote} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
