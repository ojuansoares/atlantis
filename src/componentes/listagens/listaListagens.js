import React from "react";
import "../../styles/bg14.css"
import "../../index.css"

export default function ListaListagens() {
    return (
        <div>
            <div className="bg14"></div>
            <div className="container-fluid fundo-escuro">
                <h4>Listagem Clientes:</h4>
                <hr></hr>
                <div className="list-group">
                    <a href="/dependendentestitular" className="list-group-item list-group-item-action">
                        Todos os dependentes de um titular específico
                    </a>
                    <a href="/titulardependentes" className="list-group-item list-group-item-action">
                        O Títular de um dependente específico
                    </a>
                </div>
                <br></br>
                <h4>Listagem Gerência</h4>
                <hr></hr>
                <div className="list-group">
                    <a href="/acomodacoes" className="list-group-item list-group-item-action">
                        Listar Acomodações
                    </a>
                    <a href="/hospedesacomodacao" className="list-group-item list-group-item-action">
                        Listar Hospedes por Acomodação
                    </a>
                </div>
            </div>
        </div>
    )
}