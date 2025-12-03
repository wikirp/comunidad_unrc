import Image from "next/image";
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
          En esta plataforma encontrarás las herramientas y recursos esenciales
          para fortalecer tu trayectoria académica en la Universidad Nacional
          Rosario Castellanos. Aquí podrás conectar con tu comunidad, acceder a
          guías de estudio clave y mantenerte al día con los avisos importantes
          de tu unidad.
        </div>

        <Link href={"/panel"} className={styles.enlace}>
          <h2>Ir a </h2>
          <h2 className={styles.castemones}>CASTEMONES</h2>
        </Link>

        <div className={styles.textos}>
          Esta plataforma está diseñada para ser tu aliada durante tu formación
          en la UNRC. Al utilizarla, obtienes acceso a: * Recursos Verificados y
          Curados: Explora una biblioteca de materiales de apoyo, resúmenes y
          tutoriales compartidos por la comunidad, validados para ayudarte a
          comprender mejor los temas. ¡Estamos comprometidos con tu aprendizaje
          y desarrollo!
        </div>
      </div>
    </main>
  );
}
