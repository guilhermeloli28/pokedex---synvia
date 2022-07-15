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
  isFavorite: boolean;
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
  setFavoritePokemon: (pokemon: PokemonList) => void;
  favoriteList: PokemonList[];
  handleSetFilterByFavorite: () => void;
  isFavorite: boolean;
  filterByNumber: (value: string) => void;
}

export const PokemonContext = createContext({} as PokemonContextProps);

export const PokemonProvider = ({ children }: PokemonProps) => {
  const [pokemonList, setPokemonList] = useState<PokemonList[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [favoriteList, setFavoriteList] = useState<PokemonList[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [optionOrder, setOptionOrder] = useState('1');

  const handleSetPokemonList = useCallback((newPokemonList: PokemonList[]) => {
    setPokemonList(newPokemonList);
  }, []);

  const handleSetSelectedType = useCallback((type: string) => {
    setSelectedType(type);
  }, []);

  const handleSetFilterByFavorite = useCallback(() => {
    setIsFavorite((prevState) => !prevState);
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

  function setFavoritePokemon(pokemon: PokemonList) {
    const changePokemonArray = pokemonList.map((poke) => {
      if (poke.national_number === pokemon.national_number) {
        poke.isFavorite = !poke.isFavorite;
      }
      return poke;
    });
    const favoritePokemons = changePokemonArray.filter(
      (pokemon) => pokemon.isFavorite
    );
    setFavoriteList(favoritePokemons);
    setPokemonList(changePokemonArray);
  }

  function filterByNumber(value: string) {
    if (value === '2') {
      const newPokemonList = pokemonList.sort((a, b) => {
        return Number(a.national_number) < Number(b.national_number)
          ? 1
          : Number(a.national_number) > Number(b.national_number)
          ? -1
          : 0;
      });
      setPokemonList(newPokemonList);
    } else {
      const newPokemonList = pokemonList.sort((a, b) => {
        return Number(a.national_number) > Number(b.national_number)
          ? 1
          : Number(a.national_number) < Number(b.national_number)
          ? -1
          : 0;
      });
      setPokemonList(newPokemonList);
    }
    setOptionOrder(value);
  }

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        pokemonTypes,
        getPokemons,
        handleSetPokemonList,
        handleSetSelectedType,
        handleSetFilterByFavorite,
        removeDuplicate,
        selectedType,
        filterByType,
        setFavoritePokemon,
        favoriteList,
        isFavorite,
        filterByNumber,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  return useContext(PokemonContext);
};
