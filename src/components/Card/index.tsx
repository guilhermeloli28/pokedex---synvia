import styles from './styles.module.scss';
import { usePokemon } from '../../context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTriangleExclamation,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

export function Card() {
  const { pokemonList, setFavoritePokemon, isFavorite, favoriteList } =
    usePokemon();

  if ((isFavorite && favoriteList.length === 0) || pokemonList.length === 0) {
    return (
      <div className={styles.dontHaveFavorite}>
        <FontAwesomeIcon
          className={styles.iconHeartSelected}
          icon={faTriangleExclamation}
          cursor='pointer'
          size='2x'
          color='#F8CF32'
        />
        <h3>Nenhum pokemon encontrado</h3>
      </div>
    );
  }

  return (
    <div className={styles.columnContainer}>
      <div className={styles.mainContainer}>
        {isFavorite
          ? favoriteList.map((pokemon, index) => (
              <div className={styles.cardContainer} key={index}>
                <div className={styles.card}>
                  <img src={pokemon.sprites.large} alt={pokemon.name} />
                  <FontAwesomeIcon
                    className={styles.iconHeartSelected}
                    icon={faHeart}
                    cursor='pointer'
                    onClick={() => setFavoritePokemon(pokemon)}
                  />
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
            ))
          : pokemonList.map((pokemon, index) => (
              <div className={styles.cardContainer} key={index}>
                <div className={styles.card}>
                  <img src={pokemon.sprites.large} alt={pokemon.name} />
                  <FontAwesomeIcon
                    className={
                      pokemon.isFavorite
                        ? styles.iconHeartSelected
                        : styles.iconHeart
                    }
                    icon={faHeart}
                    cursor='pointer'
                    onClick={() => setFavoritePokemon(pokemon)}
                  />
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
    </div>
  );
}
