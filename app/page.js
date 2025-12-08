import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.margenes}>
        <div className={styles.titulo}>
          <h1 className={styles.texto}>Bienvenido colega</h1>
        </div>

        <div className={styles.textos}>En esta plataforma encontrarás</div>

        <Link href={"/panel"} className={styles.enlace}>
          <h2>Ir a </h2>
          <h2 className={styles.castemones}>Kalli Colectivo</h2>
        </Link>

        <div className={styles.textos}>a</div>
      </div>
    </main>
  );
}
