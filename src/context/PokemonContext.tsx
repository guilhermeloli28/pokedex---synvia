import axios from 'axios';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

interface PokemonProps {
  children: ReactNode;
}

interface PokemonList {
  national_number: string;
  name: string;
  type: string[];
  sprites: {
    normal: string;
    large: string;
    animated: string;
  };
}

interface PokemonContextProps {
  pokemonList: PokemonList[];
  pokemonTypes: string[];
  getPokemons: () => void;
  handleSetPokemonList: (newPokemonList: PokemonList[]) => void;
  removeDuplicate: (pokemons: PokemonList[]) => PokemonList[];
  handleSetSelectedType: (type: string) => void;
  selectedType: string;
  filterByType: (value: string) => void;
}

export const PokemonContext = createContext({} as PokemonContextProps);

export const PokemonProvider = ({ children }: PokemonProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');

  const handleSetPokemonList = useCallback((newPokemonList: PokemonList[]) => {
    setPokemonList(newPokemonList);
  }, []);

  const handleSetSelectedType = useCallback((type: string) => {
    setSelectedType(type);
  }, []);

  const getPokemons = async () => {
    let types: string[] = [];
    try {
      const response = await axios.get(
        'https://unpkg.com/pokemons@1.1.0/pokemons.json'
      );

      const pokemonsFiltered = removeDuplicate(response.data.results);

      response.data.results.forEach((poke: any) => {
        types.push(...poke.type);
      });

      setPokemonTypes(Array.from(new Set(types)));

      setPokemonList(pokemonsFiltered);
    } catch (error) {
      console.log('não foi possivel buscar os pokemons');
    }
  };

  function removeDuplicate(pokemons: PokemonList[]) {
    const newArray = pokemons.filter(
      (pokemon, index, self) =>
        index ===
        self.findIndex(
          (poke) =>
            poke.national_number === pokemon.national_number &&
            poke.name === pokemon.name
        )
    );

    return newArray;
  }

  const filterByType = useCallback(async (value: string) => {
    const response = await axios.get(
      'https://unpkg.com/pokemons@1.1.0/pokemons.json'
    );

    const pokemonsFiltered = removeDuplicate(response.data.results);
    const pokemonsFilteredByType = pokemonsFiltered.filter(({ type }) =>
      type.includes(value)
    );
    setPokemonList(pokemonsFilteredByType);
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        pokemonTypes,
        getPokemons,
        handleSetPokemonList,
        handleSetSelectedType,
        removeDuplicate,
        selectedType,
        filterByType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
};
