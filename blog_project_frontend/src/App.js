import React from 'react';
import PostList from './components/PostList';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mein Blog</h1>
      </header>
      <main>
        <PostList />
      </main>
    </div>
  );
};

export default App;
