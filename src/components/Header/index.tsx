import styles from './styles.module.scss';
import pokeball from '../../assets/pokeball.svg';
import logo from '../../assets/logo.svg';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Header() {
  return (
    <header className={styles.headerMain}>
      <div className={styles.headerContainer}>
        <div className={styles.pokedexContainer}>
          <img src={pokeball} alt='Pokeball' />
          <h1>Pokédex</h1>
        </div>

        <div className={styles.logoContainer}>
          <img src={logo} alt='Synvia' />
          <FontAwesomeIcon
            icon={faSignOutAlt}
            size='1x'
            cursor='pointer'
            color='#FFF'
          />
        </div>
      </div>
    </header>
  );
}
