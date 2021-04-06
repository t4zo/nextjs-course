import Image from 'next/image';
import styles from './hero.module.scss';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageContainer}>
        <Image src='/images/site/max.png' alt='Imagem de Tácio' width='300' height='300' layout='responsive' />
      </div>
      <h1>Olá, sou o Tácio!</h1>
      <p>Produzo conteúdo voltado para desenvolvedores.</p>
    </section>
  );
};

export default Hero;
