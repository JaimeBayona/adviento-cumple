import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

/* ====== TIPOS ====== */

type Voz = "razon" | "corazon"

type ChoiceKey = "estado" | "accion" | "intencion" | "resultado"

type Estado = "calma" | "dudas" | "ilusion" | "nostalgia"
type Accion = "valentia" | "cuidado" | "impulso" | "pasos"
type Intencion = "amor" | "curiosidad" | "esperanza" | "verdad"
type Resultado = "paz" | "respuestas" | "comienzo" | "crecer"

type Answers = {
  estado: Estado
  accion: Accion
  intencion: Intencion
  resultado: Resultado
}

type ChoiceOption = {
  label: string
  value: string
}

/* ====== PASOS ====== */

const STEPS: {
  key: ChoiceKey
  question: string
  options: ChoiceOption[]
}[] = [
  {
    key: "estado",
    question: "¿Cómo te sientes hoy?",
    options: [
      { label: "En calma", value: "calma" },
      { label: "Con dudas", value: "dudas" },
      { label: "Con ilusión", value: "ilusion" },
      { label: "Con nostalgia", value: "nostalgia" },
    ],
  },
  {
    key: "accion",
    question: "¿Cómo decides avanzar?",
    options: [
      { label: "Con valentía", value: "valentia" },
      { label: "Con cuidado", value: "cuidado" },
      { label: "Paso a paso", value: "pasos" },
      { label: "Siguiendo el impulso", value: "impulso" },
    ],
  },
  {
    key: "intencion",
    question: "¿Qué guía tu camino?",
    options: [
      { label: "El amor", value: "amor" },
      { label: "La curiosidad", value: "curiosidad" },
      { label: "La esperanza", value: "esperanza" },
      { label: "La verdad", value: "verdad" },
    ],
  },
  {
    key: "resultado",
    question: "¿Qué deseas encontrar?",
    options: [
      { label: "Paz", value: "paz" },
      { label: "Respuestas", value: "respuestas" },
      { label: "Un nuevo comienzo", value: "comienzo" },
      { label: "Crecer", value: "crecer" },
    ],
  },
]

/* ====== COMPONENTE ====== */

export default function Day6({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(0)
  const [voz, setVoz] = useState<Voz | null>(null)
  const [answers, setAnswers] = useState<Partial<Answers>>({})

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  function handleSelect(key: ChoiceKey, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setStep((prev) => prev + 1)
  }

  /* ====== RESULTADO FINAL ====== */

  if (step > STEPS.length && answersComplete(answers) && voz) {
    return (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f1ec] px-6 py-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#211119]/50 hover:text-[#211119]"
        >
          <X />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl w-full text-center overflow-y-auto max-h-[90vh] px-4"
        >
          <span className="mb-4 block text-sm uppercase tracking-widest text-[#e8308c]">
            Día 6
          </span>

          <h2 className="mb-8 text-3xl font-serif text-[#211119]">
            Una lectura para este momento
          </h2>

          <p className="whitespace-pre-line text-lg text-[#211119]/80">
            {buildTextoFinal(answers, voz)}
          </p>
        </motion.div>
      </section>
    )
  }

  /* ====== PRIMER PASO: VOZ ====== */

  if (step === 0) {
    return (
      <section className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f1ec] px-6 py-10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-[#211119]/50 hover:text-[#211119]"
        >
          <X />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl text-center overflow-y-auto max-h-[90vh] px-4"
        >
          <span className="mb-4 inline-block rounded-full border border-[#e8308c]/40 px-4 py-1 text-xs uppercase tracking-widest text-[#e8308c]">
            Día 6
          </span>

          <h1 className="mb-14 text-4xl font-serif text-[#211119]">
            ¿Qué voz escuchas hoy?
          </h1>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <button
              onClick={() => {
                setVoz("razon")
                setStep(1)
              }}
              className="group rounded-3xl bg-white px-8 py-16 transition hover:bg-[#e8308c]/5"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f9d6e6] text-[#e8308c] transition group-hover:scale-110">
                ○
              </div>
              <h2 className="mb-2 text-xl font-medium">La voz de la razón</h2>
              <p className="text-sm text-[#211119]/50">Reflexión y lógica</p>
            </button>

            <button
              onClick={() => {
                setVoz("corazon")
                setStep(1)
              }}
              className="group rounded-3xl bg-white px-8 py-16 transition hover:bg-[#e8308c]/5"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f9d6e6] text-[#e8308c] transition group-hover:scale-110">
                ♥
              </div>
              <h2 className="mb-2 text-xl font-medium">La voz del corazón</h2>
              <p className="text-sm text-[#211119]/50">Intuición y sentimiento</p>
            </button>
          </div>

          <p className="mt-12 text-xs uppercase tracking-widest text-[#211119]/40">
            Elige un camino para continuar
          </p>
        </motion.div>
      </section>
    )
  }

  /* ====== PASOS NORMALES ====== */

  const current = STEPS[step - 1]

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f1ec] px-6 py-10">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-[#211119]/50 hover:text-[#211119]"
      >
        <X />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center overflow-y-auto max-h-[90vh] px-4"
        >
          <span className="mb-4 block text-sm uppercase tracking-widest text-[#e8308c]">
            Día 6
          </span>

          <h1 className="mb-10 text-3xl font-serif text-[#211119]">
            {current.question}
          </h1>

          <div className="flex flex-col gap-4">
            {current.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(current.key, opt.value)}
                className="rounded-xl border border-[#e8308c]/30 bg-white py-4 transition hover:bg-[#e8308c]/10"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

/* ====== TEXTO FINAL ====== */

function buildTextoFinal(a: Answers, voz: Voz) {
  const inicio =
    voz === "razon"
      ? "Desde la voz de la razón, donde la reflexión y la lógica toman forma,"
      : "Cuando habla la voz del corazón, guiada por la intuición y el sentimiento,"

  const plantillas = [
    () =>
      `${inicio} avanzar desde la ${estadoTexto(
        a.estado
      )} y moverte ${accionTexto(
        a.accion
      )} permite que ${intencionTexto(
        a.intencion
      )} marque el ritmo y te acerque, sin forzar, a ${resultadoTexto(
        a.resultado
      )}.`,

    () =>
      `${inicio} cada paso dado ${accionTexto(
        a.accion
      )}, incluso cuando nace de la ${estadoTexto(
        a.estado
      )}, va trazando un camino donde ${intencionTexto(
        a.intencion
      )} encuentra sentido y abre espacio para ${resultadoTexto(
        a.resultado
      )}.`,
  ]

  return plantillas[Math.floor(Math.random() * plantillas.length)]()
}

function answersComplete(a: Partial<Answers>): a is Answers {
  return !!a.estado && !!a.accion && !!a.intencion && !!a.resultado
}

/* ====== LÓGICA LINGÜÍSTICA ====== */

function estadoTexto(v: Estado) {
  return {
    calma: "calma",
    dudas: "incertidumbre",
    ilusion: "ilusión",
    nostalgia: "nostalgia",
  }[v]
}

function accionTexto(v: Accion) {
  return {
    valentia: "con valentía",
    cuidado: "con cuidado",
    impulso: "siguiendo el impulso",
    pasos: "paso a paso",
  }[v]
}

function intencionTexto(v: Intencion) {
  return {
    amor: "el amor",
    curiosidad: "la curiosidad",
    esperanza: "la esperanza",
    verdad: "la verdad",
  }[v]
}

function resultadoTexto(v: Resultado) {
  return {
    paz: "la paz",
    respuestas: "respuestas",
    comienzo: "un nuevo comienzo",
    crecer: "el crecimiento",
  }[v]
}
