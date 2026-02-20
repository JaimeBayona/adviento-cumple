import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const title =
  "(Orden de Merlin. Primera Clase, Gran Hechicero, Jefe de Magos del Wizengamot, Jefe Supremo)";

interface Props {
  onClose: () => void;
}

export default function FinalContent({ onClose }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎼 Música íntima con fade in
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    audioRef.current.play().catch(() => {});

    let volume = 0;
    const fade = setInterval(() => {
      if (volume < 0.5) {
        volume += 0.05;
        audioRef.current!.volume = volume;
      } else {
        clearInterval(fade);
      }
    }, 200);

    return () => {
      clearInterval(fade);
    };
  }, []);

  // 🎬 Cierre cinematográfico
  const handleClose = () => {
    if (!audioRef.current) {
      onClose();
      return;
    }

    let volume = audioRef.current.volume;

    const fade = setInterval(() => {
      if (volume > 0.05) {
        volume -= 0.05;
        audioRef.current!.volume = volume;
      } else {
        clearInterval(fade);
        audioRef.current!.pause();
        onClose();
      }
    }, 120);
  };

  return (
    <motion.div
      className="final-letter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <audio ref={audioRef} src="/audio/letter-theme.mp3" loop />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="letter-wrapper"
      >
        {/* HEADER */}
        <div className="letter-header">
          <img src="./img/brave.png" alt="hogwarts" />
          <h2>DÍA XX</h2>
          <div className="divider" />
          <p>VEINTE DE FEBRERO</p>
        </div>

        {/* CONTENIDO */}
        <article className="letter-article">
          <div className="address">
            <p>Srta. Marilyn Espejo Leiva</p>
            <p>A lo alto del cerro</p>
            <p>Quebrada alta</p>
            <p>Villa María del Triunfo</p>
          </div>

          <p className="saludo">Estimada Srta. Leiva</p>

          <p className="first-paragraph">
            <span className="dropcap">H</span>
            oy cumples 26 años y, aunque el calendario solo marque una fecha,
            para mí este día pesa de una forma distinta...
          </p>

          {/* 👇 AQUÍ PEGAS TODO TU TEXTO COMPLETO SIN CAMBIAR NADA */}
          <p className="mb-8">
            Porque celebra tu vida, tu historia y todo lo que has llegado a ser.
            Te escribo esto porque quiero que tengas algo que no se borre, algo
            que puedas volver a leer cuando estés cansada, cuando dudes de ti
            misma o cuando simplemente necesites recordar cuánto vales. En estos
            26 años no solo has crecido, has resistido y te has reinventado más
            veces de las que muchos hacen en toda una vida.
          </p>

          <p className="mb-8">
            A veces me pongo a recordar cuando éramos más jóvenes, esas fiestas
            en tu casa o cuando iba a verte y nos pasábamos horas hablando y
            riéndonos de cualquier tontería. No necesitábamos gran cosa para ser
            felices, solo nuestras conversaciones eternas. Quién iba a pensar en
            ese entonces que la vida te iba a poner la misión más grande de
            todas. Siempre me ha sorprendido cómo puedes ser tan pequeñita
            —porque sí, Marilyn, sigues siendo mi enana favorita— y aun así
            tener tanta fuerza. Eres una mujer con carácter, de las que no se
            dejan pisar y defienden lo suyo sin miedo, pero al mismo tiempo
            tienes una sensibilidad que desarma a cualquiera. Y esa mezcla de
            fuerza y ternura es lo que te hace diferente.
          </p>

          <p className="mb-8">
            Este último año tu vida cambió para siempre. Llegó tu hija y con
            ella nació una versión de ti más fuerte y valiente. No pude estar
            contigo físicamente como quizá hubiera querido en ese momento tan
            importante, y es algo que siempre llevaré conmigo, pero quiero que
            sepas con absoluta claridad que me alegra de verdad que tengas a tu
            hija. Ella llegó a un corazón grande y a unos brazos capaces de amar
            sin medida. Tienes a alguien que va a enseñarle a ser fuerte, pero
            también a ser buena y firme. Verte convertirte en mamá, incluso
            desde la distancia, me hizo respetarte aún más, porque no cualquiera
            da ese paso con la entereza con la que tú lo has hecho.
          </p>

          <p className="mb-8">
            Nuestra amistad no siempre fue perfecta ni constante, pero siempre
            fue real, y eso es lo que la hace valiosa. Gracias por seguir siendo
            tú, por tu confianza y por ser mi mejor amiga incluso cuando la vida
            nos puso en lugares distintos. Ojalá este nuevo año te regale paz
            mental y paz en el corazón para esas noches largas donde el
            cansancio pesa más. Que nunca te falten sonrisas sinceras ni
            personas que te cuiden como tú cuidas a los demás.
          </p>

          <p className="mb-8">
            Si algún día dudas de ti como madre, como mujer o como persona,
            vuelve a leer esto: eres suficiente, mucho más de lo que crees. Tu
            hija va a crecer viendo a una mujer fuerte, imperfecta y amorosa, y
            eso es un regalo inmenso que nadie le podrá quitar. Feliz
            cumpleaños, mujer valiente. Feliz cumpleaños, mamá increíble.
            Disfruta de tus 26 años y de todo lo que representan, porque tu
            presencia deja huella y tu amor transforma todo lo que toca.
          </p>

          <p>Sinceramente</p>

          <p>Jaime Bayona</p>
        </article>

        <div className="letter-footer">
          <p>Mejor Amigo: Jaime Bayona</p>
          <p>{title}</p>
        </div>

        <button className="close-button" onClick={handleClose}>
          Cerrar
        </button>
      </motion.div>
    </motion.div>
  );
}
