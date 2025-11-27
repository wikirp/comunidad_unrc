import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.margenes}>
        <div className={styles.titulo}>
          <h1 className={styles.texto}>Bienvenido a </h1>
          <h1 className={styles.castemones}>CASTEMONES</h1>
        </div>

        <div className={styles.textos}>
          En esta plataforma podras ..., Irure eiusmod laborum voluptate aute
          exercitation quis culpa mollit magna quis occaecat eiusmod sint.
        </div>

        <Link href={"/panel"} className={styles.enlace}>
          Panel
        </Link>

        <div className={styles.textos}>
          Labore officia duis dolore ea Lorem consectetur cupidatat. Magna
          nostrud culpa enim tempor aute consequat nulla. Aliquip cillum
          exercitation consequat velit labore nulla nostrud cupidatat consequat
          ipsum labore id id esse. Proident ad enim excepteur qui ut elit nulla
          proident dolore est. Elit quis voluptate non nostrud nulla fugiat
          laborum quis commodo laboris cillum. Ad minim ipsum veniam duis in
          sint aliquip dolore laboris adipisicing excepteur quis nulla.
        </div>
      </div>
    </main>
  );
}
