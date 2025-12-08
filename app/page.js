import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.margenes}>
        <div className={styles.titulo}>
          <h1 className={styles.texto}>Bienvenido colega</h1>
        </div>

        <div className={styles.textos}>
          En esta plataforma encontrarás una comunidad con la que puedes
          compartir tus intereses para poder crecer personal y profesionalmente.
        </div>

        <Link href={"/panel"} className={styles.enlace}>
          <h2>Ir a Kalli Colectivo </h2>
        </Link>
      </div>
    </main>
  );
}
