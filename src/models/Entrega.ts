import type { Motoboy } from "./Motoboy"
import type Produto from "./Produto"
import type { Usuario } from "./Usuario"
import type { Empresa } from "./Empresa"

export interface Entrega{

    id: number
    data: Date
    cliente: Usuario
    produto: Produto
    motoboy: Motoboy
    empresa: Empresa
}