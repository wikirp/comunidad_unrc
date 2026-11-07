import { z } from "zod";

export const Step1Schema = z.object({
  nombre: z.string().min(3, "Ingresa tu nombre completo"),

  edad: z.coerce
    .number({
      required_error: "Ingresa tu edad.",
      invalid_type_error: "Solo números permitidos.",
    })
    .int()
    .gte(18, "Tienen que ser mayor de edad."), // Greater than or equal to the smallest 5 digit int
});

export const Step2Schema = z.object({
  rol: z.enum(["estudiante", "profesor", "profesional", "curioso"], {
    message: "Selecciona una opción",
  }),
});

export const Step3Schema = z.object({
  rol: z.enum(["si", "no"], {
    message: "Selecciona una opción",
  }),
});

export const Step4Schema = z.object({
  institucion: z.string().min(3, "Ingresa el nombre de la institucion"),
});

export const Step5Schema = z.object({
  sede: z.enum(
    [
      "azcapotzalco",
      "coyoacan",
      "gam",
      "justo sierra",
      "magdalena",
      "casco",
      "distancia",
      "euzkadi",
      "copilco",
      "milpan herrerias",
      "mailpa olimpica",
      "comitan",
      "baja california",
    ],
    {
      message: "Selecciona una opción",
    },
  ),

  carrera: z.enum(
    [
      "LCAZU",
      "LCDN",
      "LCF",
      "LDCR",
      "LUDM",
      "LCSC",
      "LHNM",
      "LEDS",
      "LT",
      "LP",
      "LRI",
      "LCC",
      "LICA",
      "LFH",
      "LDCZM",
      "LMV",
    ],
    {
      message: "Selecciona una opción",
    },
  ),

  semestre: z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], {
    message: "Selecciona una opción",
  }),
});

// Seleccion de intereses
export const Step6Schema = z.object({});

// Exportacion de mapas completos
export const FromSchemaUnrc = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .merge(Step5Schema)
  .merge(Step6Schema);

export const FromSchemaExterno = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .merge(Step5Schema)
  .merge(Step6Schema);

export const FromSchemaCurioso =
  Step1Schema.merge(Step2Schema).merge(Step6Schema);
