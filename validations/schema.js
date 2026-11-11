import { z } from "zod";

const optionABC = z.enum(["A", "B", "C"], {
  message: "Selecciona una opción",
});

const optionABCD = z.enum(["A", "B", "C", "D"], {
  message: "Selecciona una opción",
});

// PASO 1 — BLOQUE: DATOS BÁSICOS
export const Step1Schema = z.object({
  username: z
    .string({ required_error: "Ingresa tu nombre de usuario" })
    .trim()
    .min(3, "Mínimo 3 caracteres"),
  edad: z.coerce
    .number({
      required_error: "Ingresa tu edad",
      invalid_type_error: "Ingresa un número válido",
    })
    .int("Ingresa un número entero")
    .gte(18, "Edad mínima: 18 años")
    .lte(99, "Ingresa una edad válida"),
  genero: optionABCD,
  lgbt: optionABC,
});

// PASO 2 — BLOQUE: DATOS UNIVERSIDAD
export const Step2Schema = z.object({
  carrera: z
    .string({ required_error: "Ingresa o selecciona tu carrera" })
    .trim()
    .min(2, "Selecciona o escribe tu carrera"),
  sede: z
    .string({ required_error: "Ingresa o selecciona tu sede" })
    .trim()
    .min(2, "Selecciona o escribe tu sede / campus"),
  semestre: z
    .string({ required_error: "Selecciona tu semestre actual" })
    .trim()
    .min(1, "Selecciona tu semestre actual"),
});

// PASO 3 — BLOQUE 1: INTERACCIÓN SOCIAL Y RELACIONES
export const Step3Schema = z.object({
  p1: optionABC,
  p2: optionABC,
  p3: optionABC,
  p4: optionABC,
});

// PASO 4 — BLOQUE 2: ESTABILIDAD Y REGULACIÓN EMOCIONAL
export const Step4Schema = z.object({
  p5: optionABC,
  p6: optionABC,
  p7: optionABC,
  p8: optionABC,
});

// PASO 5 — BLOQUE 3: DOMINANCIA Y LIDERAZGO
export const Step5Schema = z.object({
  p9: optionABC,
  p10: optionABC,
  p11: optionABC,
  p12: optionABC,
});

// PASO 6 — BLOQUE 4: NORMAS, ESTRUCTURA Y RESPONSABILIDAD
export const Step6Schema = z.object({
  p13: optionABC,
  p14: optionABC,
  p15: optionABC,
  p16: optionABC,
});

// PASO 7 — BLOQUE 5: SENSIBILIDAD, TOMA DE DECISIONES Y APERTURA
export const Step7Schema = z.object({
  p17: optionABC,
  p18: optionABC,
  p19: optionABC,
  p20: optionABC,
});

// PASO 8 — BLOQUE 6: CONFIANZA, RESERVA Y VIGILANCIA
export const Step8Schema = z.object({
  p21: optionABC,
  p22: optionABC,
  p23: optionABC,
  p24: optionABC,
});

// PASO 9 — BLOQUE 7: DINÁMICA DE TRABAJO Y AUTONOMÍA
export const Step9Schema = z.object({
  p25: optionABC,
  p26: optionABC,
  p27: optionABC,
  p28: optionABC,
});

// PASO 10 — BLOQUE 8: TENSIÓN, ENERGÍA Y CAPACIDAD DE RIESGO
export const Step10Schema = z.object({
  p29: optionABC,
  p30: optionABC,
  p31: optionABC,
  p32: optionABC,
});

export const FullProfileSchema = Step1Schema.merge(Step2Schema)
  .merge(Step3Schema)
  .merge(Step4Schema)
  .merge(Step5Schema)
  .merge(Step6Schema)
  .merge(Step7Schema)
  .merge(Step8Schema)
  .merge(Step9Schema)
  .merge(Step10Schema);

export const CARRERAS_UNRC = [
  { value: "LCF", label: "Lic. en Ciencias Ambientales (LCAZU / LCF)" },
  { value: "LCDN", label: "Lic. en Ciencia de Datos para Negocios (LCDN)" },
  { value: "LDCR", label: "Lic. en Derecho y Criminología (LDCR)" },
  { value: "LUDM", label: "Lic. en Urbanismo y Desarrollo Metropolitano (LUDM)" },
  { value: "LCSC", label: "Lic. en Ciencias de la Comunicación (LCSC)" },
  { value: "LHNM", label: "Lic. en Humanidades y Narrativas Multimedia (LHNM)" },
  { value: "LEDS", label: "Lic. en Economía y Desarrollo Sostenible (LEDS)" },
  { value: "LT", label: "Lic. en Turismo (LT)" },
  { value: "LP", label: "Lic. en Psicología (LP)" },
  { value: "LRI", label: "Lic. en Relaciones Internacionales (LRI)" },
  { value: "LCC", label: "Lic. en Contaduría y Finanzas (LCC)" },
  { value: "LICA", label: "Lic. en Ingeniería en Control y Automatización (LICA)" },
  { value: "LFH", label: "Lic. en Filosofía e Historia (LFH)" },
  { value: "LDCZM", label: "Lic. en Desarrollo Comunitario (LDCZM)" },
  { value: "LMV", label: "Lic. en Mercadotecnia y Ventas (LMV)" },
  { value: "OTRA", label: "Otra carrera" },
];

export const SEDES_UNRC = [
  { value: "azcapotzalco", label: "Azcapotzalco" },
  { value: "coyoacan", label: "Coyoacán" },
  { value: "gam", label: "Gustavo A. Madero (GAM)" },
  { value: "justo sierra", label: "Justo Sierra" },
  { value: "magdalena", label: "Magdalena Contreras" },
  { value: "casco", label: "Casco de Santo Tomás" },
  { value: "distancia", label: "Modalidad a Distancia" },
  { value: "euzkadi", label: "Euzkadi" },
  { value: "copilco", label: "Copilco" },
  { value: "naucalpan ", label: "Naucalpan" },
  { value: "milpa alta herrerias", label: "Milpa Alta Herrerías" },
  { value: "milpa alta olimpica", label: "Milpa Alta Olímpica" },
  { value: "comitan", label: "Comitán" },
  { value: "baja california", label: "Tijuana / Baja California" },
];

export const PERSONALITY_BLOCKS = [
  {
    step: 3,
    blockNumber: 1,
    title: "BLOQUE 1: INTERACCIÓN SOCIAL Y RELACIONES",
    showInstructions: false,
    questions: [
      {
        name: "p1",
        number: 1,
        text: "En situaciones sociales:",
        options: [
          { value: "A", label: "Fácilmente soy de los que toman iniciativas" },
          { value: "B", label: "Intervengo algunas veces" },
          { value: "C", label: "Prefiero quedarme tranquilamente a distancia" },
        ],
      },
      {
        name: "p2",
        number: 2,
        text: "Me considero una persona muy abierta y sociable:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p3",
        number: 3,
        text: "Cuando estoy en un grupo pequeño, me agrada quedarme en un segundo término y dejar que otros lleven el peso de la conversación:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p4",
        number: 4,
        text: "Me resulta fácil mezclarme con la gente en una reunión social:",
        options: [
          { value: "A", label: "Verdadero" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "Falso" },
        ],
      },
    ],
  },
  {
    step: 4,
    blockNumber: 2,
    title: "BLOQUE 2: ESTABILIDAD Y REGULACIÓN EMOCIONAL",
    questions: [
      {
        name: "p5",
        number: 5,
        text: "Poseo suficiente energía para enfrentarme a todos mis problemas:",
        options: [
          { value: "A", label: "Siempre" },
          { value: "B", label: "Frecuentemente" },
          { value: "C", label: "Raras veces" },
        ],
      },
      {
        name: "p6",
        number: 6,
        text: "Cuando algo realmente me pone furioso, suelo calmarme muy pronto:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p7",
        number: 7,
        text: "De vez en cuando siento un vago temor o un repentino miedo, sin poder comprender las razones:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p8",
        number: 8,
        text: "En ocasiones, contrariedades muy pequeñas me irritan mucho:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
    ],
  },
  {
    step: 5,
    blockNumber: 3,
    title: "BLOQUE 3: DOMINANCIA Y LIDERAZGO",
    questions: [
      {
        name: "p9",
        number: 9,
        text: "Cuando me ponen al frente de algo, insisto en que se sigan mis instrucciones; en caso contrario, renuncio:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Algunas veces" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p10",
        number: 10,
        text: "Cuando yo sé muy bien lo que el grupo tiene que hacer, me gusta ser el único en dar las órdenes:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p11",
        number: 11,
        text: "Siendo adolescente, cuando mi opinión era distinta de la de mis padres, normalmente:",
        options: [
          { value: "A", label: "Mantenía mi opinión" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "Aceptaba su autoridad" },
        ],
      },
      {
        name: "p12",
        number: 12,
        text: "Cuando la gente autoritaria trata de dominarme, hago justamente lo contrario de lo que quiere:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
    ],
  },
  {
    step: 6,
    blockNumber: 4,
    title: "BLOQUE 4: NORMAS, ESTRUCTURA Y RESPONSABILIDAD",
    questions: [
      {
        name: "p13",
        number: 13,
        text: "Creo que es más importante mucha libertad que buena educación y respeto a la ley:",
        options: [
          { value: "A", label: "Verdadero" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "Falso" },
        ],
      },
      {
        name: "p14",
        number: 14,
        text: "Al llevar a cabo una tarea, no estoy satisfecho hasta que se ha considerado con toda atención el menor detalle:",
        options: [
          { value: "A", label: "Verdadero" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "Falso" },
        ],
      },
      {
        name: "p15",
        number: 15,
        text: "Soy una persona bastante estricta, e insisto siempre en hacer las cosas tan correctamente como sea posible:",
        options: [
          { value: "A", label: "Verdadero" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "Falso" },
        ],
      },
      {
        name: "p16",
        number: 16,
        text: "Tengo mi habitación organizada de un modo inteligente y estético, con las cosas colocadas casi siempre en lugares conocidos:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
    ],
  },
  {
    step: 7,
    blockNumber: 5,
    title: "BLOQUE 5: SENSIBILIDAD, TOMA DE DECISIONES Y APERTURA",
    questions: [
      {
        name: "p17",
        number: 17,
        text: "Mis decisiones se apoyan más en:",
        options: [
          { value: "A", label: "El corazón" },
          { value: "B", label: "Los sentimientos y la razón por igual" },
          { value: "C", label: "La cabeza" },
        ],
      },
      {
        name: "p18",
        number: 18,
        text: "Admiro más la belleza de un poema que la de un arma de fuego bien construida:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p19",
        number: 19,
        text: "Una ley anticuada debería cambiarse:",
        options: [
          { value: "A", label: "Sólo después de muchas discusiones" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "Inmediatamente" },
        ],
      },
      {
        name: "p20",
        number: 20,
        text: "Me gusta seguir mis propios caminos, en vez de actuar según normas establecidas:",
        options: [
          { value: "A", label: "Verdadero" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "Falso" },
        ],
      },
    ],
  },
  {
    step: 8,
    blockNumber: 6,
    title: "BLOQUE 6: CONFIANZA, RESERVA Y VIGILANCIA",
    questions: [
      {
        name: "p21",
        number: 21,
        text: "Algunas personas parecen ignorarme o evitarme, aunque no sé por qué:",
        options: [
          { value: "A", label: "Verdadero" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "Falso" },
        ],
      },
      {
        name: "p22",
        number: 22,
        text: "Siempre estoy alerta ante los intentos de propaganda en las cosas que leo:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p23",
        number: 23,
        text: "Cuando me critican duramente por algo que no he hecho:",
        options: [
          { value: "A", label: "No me siento culpable" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "Todavía me siento un poco culpable" },
        ],
      },
      {
        name: "p24",
        number: 24,
        text: "Si mis conocidos me tratan mal o muestran que yo les disgusto:",
        options: [
          { value: "A", label: "No me importa nada" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "Me siento abatido" },
        ],
      },
    ],
  },
  {
    step: 9,
    blockNumber: 7,
    title: "BLOQUE 7: DINÁMICA DE TRABAJO Y AUTONOMÍA",
    questions: [
      {
        name: "p25",
        number: 25,
        text: "Cuando hay que hacer algo, me gustaría más trabajar:",
        options: [
          { value: "A", label: "En equipo" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "Yo solo" },
        ],
      },
      {
        name: "p26",
        number: 26,
        text: "Me gusta planear mis cosas solo, sin interrupciones y sugerencias de otros:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p27",
        number: 27,
        text: "Preferiría tener un negocio propio, no compartido con otra persona:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "No estoy seguro" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p28",
        number: 28,
        text: "En tareas de grupo, preferiría:",
        options: [
          { value: "A", label: "Intentar mejorar los preparativos" },
          { value: "B", label: "Término medio" },
          {
            value: "C",
            label:
              "Llevar las actas o registros y procurar que se cumplan las normas",
          },
        ],
      },
    ],
  },
  {
    step: 10,
    blockNumber: 8,
    title: "BLOQUE 8: TENSIÓN, ENERGÍA Y CAPACIDAD DE RIESGO",
    questions: [
      {
        name: "p29",
        number: 29,
        text: "Me pongo nervioso (tenso) cuando pienso en todas las cosas que tengo que hacer:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Algunas veces" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p30",
        number: 30,
        text: "A veces me pongo en estado de tensión y agitación cuando pienso en los sucesos del día:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p31",
        number: 31,
        text: "Me gusta hacer cosas atrevidas y temerarias sólo por el placer de divertirme:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
      {
        name: "p32",
        number: 32,
        text: "Me cuesta bastante hablar o dirigir la palabra a un grupo numeroso:",
        options: [
          { value: "A", label: "Sí" },
          { value: "B", label: "Término medio" },
          { value: "C", label: "No" },
        ],
      },
    ],
  },
];
