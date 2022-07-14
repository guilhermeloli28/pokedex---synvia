import styles from './styles.module.scss';
import { usePokemon } from '../../context/PokemonContext';

export function Card() {
  const { pokemonList } = usePokemon();

  return (
    <div className={styles.columnContainer}>
      <div className={styles.mainContainer}>
        {pokemonList.map((pokemon, index) => (
          <div className={styles.cardContainer} key={index}>
            <div className={styles.card}>
              <img src={pokemon.sprites.normal} alt={pokemon.name} />
            </div>

            <div className={styles.cardInfo}>
              <span
                className={styles.nationalNumber}
              >{`N° ${pokemon.national_number}`}</span>
              <h3>{pokemon.name}</h3>
              <div className={styles.types}>
                {pokemon.type.map((type, index) => (
                  <span key={index} className={styles[type]}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <span>
        {pokemonList.length === 0
          ? 'Nenhum pokemon encontrado'
          : `${pokemonList.length} pokemons encontrados`}
      </span> */}
    </div>
  );
}
