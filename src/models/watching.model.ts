import { Schema, model } from "mongoose"
import { Watching, WatchingModel } from "../types/Watching.type"

export const WATCHING_REFERENCE = 'Watching'

const Watches = new Schema<Watching, WatchingModel>({
    serie: {
        type: String,
        required: true,
        unique: false,
        index: true,
        trim: true
    },
    temporada: {
        type: String,
        required: true
    },
    capitulo: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: false,
    },
    checkpoint: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: false
    }
})

export default model(WATCHING_REFERENCE, Watches)