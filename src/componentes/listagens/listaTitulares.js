import React, { useState } from "react";
import "../styles/bg14.css"
import "../index.css"

export default function MaisConsumidos() {
    const [tipo, setTipo] = useState("produto"); // default é produto

    const renderItem = (item, quantidade) => {
        return (
            <div className="list-group-item list-group-item-action d-flex justify-content-between">
                <div>
                    <p><strong>Produto/Serviço:</strong> <span className="item-text">{item}</span></p>
                    <p><strong>Quantidade Consumida:</strong> <span className="quantidade-text">{quantidade}</span></p>
                </div>
            </div>
        )
    }

    const renderProdutos = () => {
        return (
            <>
                {renderItem("Ossinho", 3)}
                {renderItem("Ração para Cães", 2)}
                {renderItem("Brinquedo para Gatos", 2)}
                {renderItem("Shampoo para Cães", 2)}
                {renderItem("Coleira", 2)}
                {renderItem("Cama para Gatos", 2)}
                {renderItem("Arranhador para Gatos", 2)}
                {renderItem("Ração para Gatos", 1)}
                {renderItem("Caixa de Areia", 1)}
                {renderItem("Bolinha", 1)}
                {renderItem("Comedouro", 1)}
                {renderItem("Bebedouro", 1)}
                {renderItem("Produtinhooo", 1)}
            </>
        );
    }

    const renderServicos = () => {
        return (
            <>
                {renderItem("Limpeza de Dentes", 3)}
                {renderItem("Corte de Unhas", 2)}
                {renderItem("Adestramento", 2)}
                {renderItem("Tosa", 1)}
                {renderItem("Banho", 1)}
                {renderItem("Escovação de Pelo", 1)}
                {renderItem("Limpeza de Orelhas", 1)}
                {renderItem("Vacinação", 1)}
                {renderItem("Passeio", 1)}
                {renderItem("Hospedagem", 1)}
                {renderItem("Transporte", 1)}
                {renderItem("Consulta Veterinária", 1)}
            </>
        );
    }

    return (
        <div>
            <div className="bg14"></div>
            <div className="container-fluid fundo-escuro">
                <div className="list-group">
                    <h2>{tipo === "produto" ? "Produtos mais consumidos:" : "Serviços mais consumidos:"}</h2>
                    <hr></hr>
                    <div>
                        <label htmlFor="listarPor">Listar por:</label>
                        <select id="listarPor" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                            <option value="produto">Produto</option>
                            <option value="servico">Serviço</option>
                        </select>
                    </div>
                    <br></br>
                    {tipo === "produto" ? renderProdutos() : renderServicos()}
                </div>
            </div>
        </div>
    )
}