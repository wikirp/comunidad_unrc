import { useFormContext } from "react-hook-form";

import styles from "./step.module.scss";

const Step1 = ({ onNext, loading }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div className={styles.field}>
        <label htmlFor="nombre">¿Como te llamas?</label>
        <input
          {...register("nombre")}
          id="nombre"
          type="text"
          required
          disabled={loading}
        />
        {errors.numero && (
          <p style={{ color: "red" }}>{errors.numero.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="edad">¿Cuantos años tienes?</label>
        <input
          {...register("edad")}
          id="edad"
          type="text"
          required
          disabled={loading}
        />
        {errors.numero && (
          <p style={{ color: "red" }}>{errors.numero.message}</p>
        )}
      </div>

      {loading ? (
        <span className={styles.loader}></span>
      ) : (
        <div className={styles.botones}>
          <button onClick={onNext} className={styles.siguiente}>
            Siguente
          </button>
        </div>
      )}
    </div>
  );
};

export default Step1;
