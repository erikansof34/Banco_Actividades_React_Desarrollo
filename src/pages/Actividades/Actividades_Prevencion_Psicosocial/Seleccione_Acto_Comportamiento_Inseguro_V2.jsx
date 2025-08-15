import { useState } from "react"
import imgVerdadero from "../../../assets/img/checkAct.png"
import imgFalso from "../../../assets/img/xmarkAct.png"
import { faRepeat } from "@fortawesome/free-solid-svg-icons"
import Button from "../../components/Button"
import "../../Actividades/Actividades_Prevencion_Psicosocial/styles/Seleccione_Acto_Comportamiento_Inseguro_V2.css"
// Importar imágenes
import imgAislado from "../../../assets/img/almacen_desordenado.webp"
import imgCompartirColegas from "../../../assets/img/cuadrilla_epp_sld21.webp"
import imgExpresarInquietudes from "../../../assets/img/maquina_dobladora_sld21.webp"
import imgEquipoTrabajo from "../../../assets/img/personal_postura_inadeuada_sld21.webp"
import imgAyudaEstres from "../../../assets/img/puente_defectuoso_sld21.webp"
import imgRenunciar from "../../../assets/img/soldador_sin_guantes_sld21.webp"
import imgQuejarseJefe from "../../../assets/img/vehiculo_transitando_sld21.webp"

function Seleccione_Acto_Comportamiento_Inseguro_V2() {
    const opciones = [
        {
            imagen: imgAislado,
            texto: "Área de almacén en desorden.",
            titulo: "Condición Insegura",
            subtitulo: "Limpieza, orden y aseo",
            correcta: true
        },
        {
            imagen: imgCompartirColegas,
            texto: "Cuadrilla en labores de alturas con todos los epp, señalización y permiso de trabajo",
            titulo: "Acto Seguro",
            subtitulo: "Reconocimiento",
            correcta: false
        },
        {
            imagen: imgExpresarInquietudes,
            texto: "Máquina dobladora con botones dañados",
            titulo: "Condición Insegura",
            subtitulo: "Equipos y herramientas",
            correcta: true
        },
        {
            imagen: imgEquipoTrabajo,
            texto: "Personal de servicios generales con postura inadecuada al levantar recipientes",
            titulo: "Acto Inseguro",
            subtitulo: "Ergonomía",
            correcta: true
        },
        {
            imagen: imgAyudaEstres,
            texto: "Puente grúa defectuoso",
            titulo: "Condición Insegura",
            subtitulo: "Equipos y herramientas",
            correcta: true
        },
        {
            imagen: imgRenunciar,
            texto: "Compañero realizando labores de soldadura sin los guantes",
            titulo: "Acto Inseguro",
            subtitulo: "EPP",
            correcta: true
        },
        {
            imagen: imgQuejarseJefe,
            texto: "Vehículo transitando a mas de 10 Km por las áreas de la empresa",
            titulo: "Acto Inseguro",
            subtitulo: "Seguridad vial",
            correcta: true
        },
    ]

    const [selecciones, setSelecciones] = useState([])
    const [resultados, setResultados] = useState({})
    const [feedback, setFeedback] = useState(null)
    const [mensajeValidacion, setMensajeValidacion] = useState("")

    const explicaciones = {
        "Área de almacén en desorden.": "Correcto! Esto es una condición insegura relacionada con limpieza, orden y aseo.",
        "Cuadrilla en labores de alturas con todos los epp, señalización y permiso de trabajo": "Incorrecto. Esta es una situación segura que merece reconocimiento.",
        "Máquina dobladora con botones dañados": "Correcto! Esta es una condición insegura relacionada con equipos y herramientas.",
        "Personal de servicios generales con postura inadecuada al levantar recipientes": "Correcto! Este es un acto inseguro relacionado con ergonomía.",
        "Puente grúa defectuoso": "Correcto! Esta es una condición insegura relacionada con equipos y herramientas.",
        "Compañero realizando labores de soldadura sin los guantes": "Correcto! Este es un acto inseguro relacionado con EPP.",
        "Vehículo transitando a mas de 10 Km por las áreas de la empresa": "Correcto! Este es un acto inseguro relacionado con seguridad vial.",
    }

    const seleccionarOpcion = (opcion) => {
        const yaSeleccionada = selecciones.includes(opcion)
        let nuevasSelecciones = [...selecciones]

        if (yaSeleccionada) {
            nuevasSelecciones = nuevasSelecciones.filter((item) => item !== opcion)
        } else {
            nuevasSelecciones.push(opcion)
        }

        setSelecciones(nuevasSelecciones)

        const esCorrecta = opciones.find((o) => o.texto === opcion)?.correcta || false
        setResultados((prev) => ({
            ...prev,
            [opcion]: yaSeleccionada ? undefined : esCorrecta,
        }))

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

        const porcentaje = Math.round((totalCorrectas / 6) * 100)

        setMensajeValidacion(`Respuestas correctas: ${totalCorrectas} de 6 (${porcentaje}%)`)
    }

    const reiniciarActividad = () => {
        setResultados({})
        setSelecciones([])
        setFeedback(null)
        setMensajeValidacion("")
    }

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
                            <img src={opcion.imagen} alt={opcion.texto} className="opcion-imagen" />
                            <div className="opcion-info">
                                <h3 className="opcion-titulo">{opcion.titulo}</h3>
                            </div>
                            {selecciones.includes(opcion.texto) && (
                                <img
                                    className="resultado-icono"
                                    src={resultados[opcion.texto] === true ? imgVerdadero : imgFalso}
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
                            <img src={opcion.imagen} alt={opcion.texto} className="opcion-imagen" />
                            <div className="opcion-info">
                                <h3 className="opcion-titulo">{opcion.titulo}</h3>
                            </div>
                            {selecciones.includes(opcion.texto) && (
                                <img
                                    className="resultado-icono"
                                    src={resultados[opcion.texto] === true ? imgVerdadero : imgFalso}
                                    alt={resultados[opcion.texto] ? "Correcto" : "Incorrecto"}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {selecciones.filter((op) => opciones.find((o) => o.texto === op)?.correcta).length === 6 ? (
                    <div className="feedback-general mt-4 font-bold text-green-600">
                        ¡Excelente! Has identificado correctamente todos los actos y condiciones inseguras.
                    </div>
                ) : feedback ? (
                    <div className={`feedback-especifico mt-4 font-bold ${feedback.correcta ? "text-green-600" : "text-red-600"}`}>
                        {explicaciones[feedback.texto]}
                    </div>
                ) : null}

                {mensajeValidacion && <div className="validacion mt-3 font-bold text-gray-700">{mensajeValidacion}</div>}

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

export default Seleccione_Acto_Comportamiento_Inseguro_V2