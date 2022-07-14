import React from 'react';
import { Search } from './components/Search';
import { Header } from './components/Header';
import { Filter } from './components/Filter';
import styles from './styles/app.module.scss';
import { Card } from './components/Card';
import { PokemonProvider } from './context/PokemonContext';

function App() {
  return (
    <PokemonProvider>
      <div>
        <Header />
        <Search />
        <div className={styles.main}>
          <Filter />

          <Card />
        </div>
      </div>
    </PokemonProvider>
  );
}

export default App;
