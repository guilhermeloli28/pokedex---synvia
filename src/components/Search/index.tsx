import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePokemon } from '../../context/PokemonContext';
import axios from 'axios';

export function Search() {
  const [search, setSearch] = useState('');
  const {
    filterByType,
    getPokemons,
    removeDuplicate,
    handleSetPokemonList,
    selectedType,
  } = usePokemon();

  const filterBySearch = useCallback(async () => {
    const response = await axios.get(
      'https://unpkg.com/pokemons@1.1.0/pokemons.json'
    );

    const pokemonsFiltered = removeDuplicate(response.data.results);

    const pokemonsFilteredBySearch = pokemonsFiltered.filter(
      ({ name, national_number }) =>
        name.toLowerCase().includes(search.toLocaleLowerCase()) ||
        national_number === search
    );
    handleSetPokemonList(pokemonsFilteredBySearch);
  }, [handleSetPokemonList, removeDuplicate, search]);

  useEffect(() => {
    if (search.length >= 2) filterBySearch();
    else if (selectedType === '') {
      getPokemons();
    } else if (selectedType) {
      filterByType(selectedType);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterBySearch, getPokemons]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <div className={styles.searchFilterContainer}>
          <input
            type='text'
            placeholder='Pesquisar por nome ou número'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size='1x'
            cursor='pointer'
            color='red'
          />
        </div>

        <div className={styles.orderContainer}>
          <span>Ordenar por</span>
          <select>
            <option value='1'>Menor número primeiro</option>
            <option value='2'>Maior número primeiro</option>
          </select>
        </div>
      </div>
    </div>
  );
}
