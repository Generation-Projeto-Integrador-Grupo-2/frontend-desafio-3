import type { Entrega } from "./Entrega"


export interface Motoboy{

    id?: number
    nome: string
    modelo: string
    placa: string
    CNH: string
    endereco: string
    entregas?: Entrega
}