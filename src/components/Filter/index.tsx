import { useEffect, useState } from 'react';
import { usePokemon } from '../../context/PokemonContext';
import styles from './styles.module.scss';

export function Filter() {
  const { pokemonTypes } = usePokemon();
  const [typeSelected, setTypeSelected] = useState('');
  const { getPokemons, handleSetSelectedType, filterByType } = usePokemon();

  useEffect(() => {
    if (typeSelected !== '') filterByType(typeSelected);
    else getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeSelected]);

  function handleSelectType(type: string) {
    if (typeSelected === type) {
      setTypeSelected('');
      handleSetSelectedType('');
    } else {
      setTypeSelected(type);
      handleSetSelectedType(type);
    }
  }

  return (
    <div className={styles.filterContainer}>
      <h3>Filtrar por tipo</h3>
      <div className={styles.typesContainer}>
        {pokemonTypes.map((poke, index) => (
          <button
            key={index}
            onClick={() => handleSelectType(poke)}
            className={
              poke === typeSelected
                ? styles.buttonSelected
                : styles.buttonNotSelected
            }
          >
            {poke}
          </button>
        ))}
      </div>

      <h3>Filtrar favoritos</h3>

      <div className={styles.switchFavorite}>
        <label className={styles.switch}>
          <input type='checkbox' />
          <span
            className={styles.toggleSwitch}
            // onClick={setFilterByFavorite}
          ></span>
        </label>
      </div>
    </div>
  );
}
