
import { useState } from "react"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"
import "../../Actividades/Actividades_Prevencion_Psicosocial/styles/Seleccione_Acto_Comportamiento_Inseguro.css"
// Importar imágenes
import imgAislado from "../../../assets/img/estar_aislado.webp"
import imgCompartirColegas from "../../../assets/img/compartir_colegas.webp"
import imgExpresarInquietudes from "../../../assets/img/expresar_inquietudes.webp"
import imgEquipoTrabajo from "../../../assets/img/hacer_equipo.webp"
import imgAyudaEstres from "../../../assets/img/buscar_ayuda_manejo_estres.webp"
import imgRenunciar from "../../../assets/img/renunciar_sin_decirle_nadie.webp"
import imgQuejarseJefe from "../../../assets/img/quejar_hablar_mal_jefe.webp"

function Seleccione_Acto_Comportamiento_Inseguro() {
    const opciones = [
        { imagen: imgAislado, texto: "Estar aislado", correcta: false },
        { imagen: imgCompartirColegas, texto: "Compartir con colegas​", correcta: true },
        { imagen: imgExpresarInquietudes, texto: "Expresar inquietudes a superiores", correcta: true },
        { imagen: imgEquipoTrabajo, texto: "Hacer equipo de trabajo, delegar​", correcta: true },
        { imagen: imgAyudaEstres, texto: "Buscar ayuda para manejo estrés​", correcta: true },
        { imagen: imgRenunciar, texto: "Renunciar sin decirle a nadie", correcta: false },
        { imagen: imgQuejarseJefe, texto: "Quejarse y hablar mal del jefe", correcta: false },
    ]

    const [selecciones, setSelecciones] = useState([])
    const [resultados, setResultados] = useState({})
    const [feedback, setFeedback] = useState(null)
    const [mensajeValidacion, setMensajeValidacion] = useState("")

    const explicaciones = {
        "Estar aislado": "Incorrecto. El aislamiento es un acto inseguro que puede impedir la identificación y solución de riesgos.",
        "Compartir con colegas​": "Correcto! Compartir información con colegas ayuda a identificar y prevenir actos y condiciones inseguras.",
        "Expresar inquietudes a superiores": "Correcto! Reportar preocupaciones es clave para corregir condiciones inseguras a tiempo.",
        "Hacer equipo de trabajo, delegar​": "Correcto! El trabajo colaborativo reduce actos inseguros al distribuir responsabilidades.",
        "Buscar ayuda para manejo estrés​": "Correcto! El estrés puede llevar a actos inseguros, manejarlo es preventivo.",
        "Renunciar sin decirle a nadie": "Incorrecto. Abandonar el puesto sin comunicación puede crear condiciones inseguras para otros.",
        "Quejarse y hablar mal del jefe": "Incorrecto. Las quejas no constructivas son actos inseguros que generan mal ambiente laboral.",
    }

    const seleccionarOpcion = (opcion) => {
        const yaSeleccionada = selecciones.includes(opcion)
        let nuevasSelecciones = [...selecciones]

        if (yaSeleccionada) {
            nuevasSelecciones = nuevasSelecciones.filter((item) => item !== opcion)
        } else {
            // Eliminamos el límite de 4 selecciones
            nuevasSelecciones.push(opcion)
        }

        setSelecciones(nuevasSelecciones)

        const esCorrecta = opciones.find((o) => o.texto === opcion)?.correcta || false
        setResultados((prev) => ({
            ...prev,
            [opcion]: yaSeleccionada ? undefined : esCorrecta,
        }))

        // Mostrar feedback específico para la opción seleccionada
        if (!yaSeleccionada) {
            setFeedback({
                texto: opcion,
                correcta: esCorrecta,
            })
        } else {
            setFeedback(null)
        }

        actualizarMensajeValidacion(nuevasSelecciones)
    }

    const actualizarMensajeValidacion = (seleccionadas) => {
        if (seleccionadas.length === 0) {
            setMensajeValidacion("")
            return
        }

        const opcionesCorrectas = opciones.filter((o) => o.correcta).map((o) => o.texto)
        const totalCorrectas = seleccionadas.filter((op) => opcionesCorrectas.includes(op)).length

        const porcentaje = Math.round((totalCorrectas / 4) * 100)

        setMensajeValidacion(`Respuestas correctas: ${totalCorrectas} de 4 (${porcentaje}%)`)
    }

    const reiniciarActividad = () => {
        setResultados({})
        setSelecciones([])
        setFeedback(null)
        setMensajeValidacion("")
    }

    const todasSeleccionadas = selecciones.length === opciones.length

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="actividad-opciones text-center w-full max-w-4xl">
                <div className="grid-opciones">
                    {opciones.slice(0, 4).map((opcion, index) => (
                        <div
                            key={index}
                            className={`opcion-item ${selecciones.includes(opcion.texto) ? "seleccionada" : ""}`}
                            onClick={() => seleccionarOpcion(opcion.texto)}
                        >
                            <img src={opcion.imagen || "/placeholder.svg"} alt={opcion.texto} className="opcion-imagen" />
                            {selecciones.includes(opcion.texto) && (
                                <img
                                    className="resultado-icono"
                                    src={
                                        resultados[opcion.texto] === true
                                            ? imgVerdadero
                                            : resultados[opcion.texto] === false
                                                ? imgFalso
                                                : ""
                                    }
                                    alt={resultados[opcion.texto] ? "Correcto" : "Incorrecto"}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="grid-opciones-inferiores">
                    {opciones.slice(4).map((opcion, index) => (
                        <div
                            key={index + 4}
                            className={`opcion-item ${selecciones.includes(opcion.texto) ? "seleccionada" : ""}`}
                            onClick={() => seleccionarOpcion(opcion.texto)}
                        >
                            <img src={opcion.imagen || "/placeholder.svg"} alt={opcion.texto} className="opcion-imagen" />
                            {selecciones.includes(opcion.texto) && (
                                <img
                                    className="resultado-icono"
                                    src={
                                        resultados[opcion.texto] === true
                                            ? imgVerdadero
                                            : resultados[opcion.texto] === false
                                                ? imgFalso
                                                : ""
                                    }
                                    alt={resultados[opcion.texto] ? "Correcto" : "Incorrecto"}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Mostrar solo un feedback a la vez */}
                {selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 4 ? (
                    <div
                        className={`feedback-general mt-4 font-bold ${selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 4
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >
                        {selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 4
                            ? "Muy bien! Has identificado correctamente los comportamientos seguros que previenen actos y condiciones inseguras."
                            : "Piénsalo bien! Algunas de tus selecciones podrían ser actos inseguros o contribuir a condiciones inseguras."}
                    </div>
                ) : feedback ? (
                    <div
                        className={`feedback-especifico mt-4 font-bold ${feedback.correcta ? "text-green-600" : "text-red-600"}`}
                    >
                        {explicaciones[feedback.texto]}
                    </div>
                ) : null}

                {/* Mensaje de validación */}
                {mensajeValidacion && <div className="validacion mt-3 font-bold text-gray-700">{mensajeValidacion}</div>}

                {/* Botón de reinicio */}
                <div className="flex justify-center mt-6">
                    <Button
                        onClick={reiniciarActividad}
                        roundedFull={true}
                        icon={faRepeat}
                        className="flex justify-center items-center group bg-main-color rounded-full px-4 py-2 shadow-main-color text-white"
                    >
                        Reiniciar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Seleccione_Acto_Comportamiento_Inseguro
