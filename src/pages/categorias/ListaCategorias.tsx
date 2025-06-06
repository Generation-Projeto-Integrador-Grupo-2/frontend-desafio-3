import { useState } from "react";
import type Categoria from "../../models/Categoria";

function ListaCategorias() {
    const [categorias] = useState<Categoria[]>([])

    return (
        <div className="min-h-screen bg-[#f3f4f6] py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[#374151] mb-8">
                    Categorias
                </h1>
                {categorias.length === 0 ? (
                    <p className="text-[#6b7280] text-sm">Nenhuma categoria cadastrada.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categorias.map((categoria) => (
                            <div key={categoria.id} className="bg-white p-6 rounded-lg shadow">
                                <p className="text-[#6b7280] text-sm font-semibold">
                                    Nome: {categoria.nome}
                                </p>
                                <p className="text-[#6b7280] text-sm">
                                    Descrição: {categoria.descricao}
                                </p>
                                <p className="text-[#6b7280] text-sm">
                                    Saudável: {categoria.saudavel ? "Sim" : "Não"}
                                </p>
                                {categoria.imagemUrl && (
                                    <img
                                        src={categoria.imagemUrl}
                                        alt={categoria.nome}
                                        className="w-32 h-32 object-cover rounded-lg mt-4"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListaCategorias;