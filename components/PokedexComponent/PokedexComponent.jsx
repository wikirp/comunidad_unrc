import React from "react";
import styles from "./PokedexComponent.module.scss";

export default function PokedexComponent({ leftScreen, rightScreen }) {
  return (
    <div className={styles.chassisWrapper}>
      <div className={styles.pokedexDevice}>
        {/* ================= PANEL IZQUIERDO ================= */}
        <section className={styles.leftPanel}>
          {/* Cabecera superior con lente y luces LED */}
          <header className={styles.topHeader}>
            <div className={styles.mainLensRing}>
              <div className={styles.mainLens} />
            </div>
            <div className={styles.statusLeds}>
              <span className={`${styles.led} ${styles.ledRed}`} />
              <span className={`${styles.led} ${styles.ledYellow}`} />
              <span className={`${styles.led} ${styles.ledGreen}`} />
            </div>
          </header>

          <div className={styles.panelDivider} />

          {/* Ranura para la pantalla izquierda */}
          <div className={styles.screenAreaLeft}>{leftScreen}</div>

          {/* Controles inferiores: D-Pad, bocina y píldoras */}
          {/* <footer className={styles.leftControls}>
            {/* <div className={styles.dpad}>
              <button type="button" aria-label="Arriba" className={`${styles.dpadBtn} ${styles.dpadUp}`} />
              <button type="button" aria-label="Derecha" className={`${styles.dpadBtn} ${styles.dpadRight}`} />
              <button type="button" aria-label="Abajo" className={`${styles.dpadBtn} ${styles.dpadDown}`} />
              <button type="button" aria-label="Izquierda" className={`${styles.dpadBtn} ${styles.dpadLeft}`} />
              <div className={styles.dpadCenter} />
            </div>

            <div className={styles.centerDecor}>
              <div className={styles.pillButtons}>
                <span className={`${styles.pill} ${styles.pillBlue}`} />
                <span className={`${styles.pill} ${styles.pillOrange}`} />
              </div>
              <div className={styles.speakerGrill}>
                <span className={styles.speakerSlit} />
                <span className={styles.speakerSlit} />
                <span className={styles.speakerSlit} />
              </div>
            </div> 
          </footer> */}
        </section>

        {/* ================= BISAGRA CENTRAL ================= */}
        <div className={styles.hinge}>
          <span className={styles.hingeRidge} />
          <span className={styles.hingeRidge} />
        </div>

        {/* ================= PANEL DERECHO ================= */}
        <section className={styles.rightPanel}>
          {/* Ranura para la pantalla derecha */}
          <div className={styles.screenAreaRight}>{rightScreen}</div>

          {/* Teclado numérico / celdas azules */}
          {/* <div className={styles.rightKeypad}>
            <div className={styles.keyGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <button key={i} type="button" className={styles.keyButton} />
              ))}
            </div>

            {/* Botones SELECT y START alargados 
            <div className={styles.metaButtons}>
              <button type="button" className={styles.startSelectBtn}>
                SELECT
              </button>
              <button type="button" className={styles.startSelectBtn}>
                START
              </button>
            </div>

            {/* Botones de acción circulares A / B 
            <div className={styles.actionButtons}>
              <button type="button" className={styles.btnAction}>
                B
              </button>
              <button type="button" className={styles.btnAction}>
                A
              </button>
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
}
