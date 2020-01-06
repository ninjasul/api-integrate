import React from 'react';
import {UsersProvider} from "./UsersContext";
import UsersWithContext from "./UsersWithContext";

function App() {
  return (
    <UsersProvider>
      <UsersWithContext />
    </UsersProvider>
  );
}

export default App;
