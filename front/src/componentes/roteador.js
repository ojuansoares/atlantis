import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarraNavegacao from "./barraNavegacao";
import Home from "./home";
import ClienteTitular from "./clientes/clienteTitular";
import ClienteDependente from "./clientes/clienteDependente";
import ListaClientes from "./clientes/listaClientes";
import ListaListagens from "./listagens/listaListagens";
import CadastroCliente from './clientes/cadastroCliente';
import EditarClienteTitular from "./clientes/editarClienteTitular";
import EditarClienteDependente from "./clientes/editarClienteDependente";
import VinculoClienteAcomodacao from "./hospedagem/VinculoClienteAcomodacao";
import ListaDependentesTitular from "./listagens/listaDependentesTitular";
import ListaTitularDependentes from "./listagens/listaTitularDependentes";
import ListaAcomodacoes from "./listagens/listaAcomodacoes";
import ListaHospedesAcomodacao from "./listagens/listaHospedesAcomodacao";

export default function Roteador() {
    return (
        <Router>
            <BarraNavegacao />
            <Routes>
                {/* HOME */}
                <Route path="/" element={<Home />} />

                {/* CLIENTES */}
                <Route path="/clientes" element={<ListaClientes />} />
                <Route path="/titular/:id" element={<ClienteTitular />} />
                <Route path="/dependente/:id" element={<ClienteDependente />} />
                <Route path="/editarclientetitular/:id" element={<EditarClienteTitular />} />
                <Route path="/editarclientedependente/:id" element={<EditarClienteDependente />} />

                {/* CADASTRAR CLIENTE */}
                <Route path="/cadastrocliente" element={<CadastroCliente />} />

                {/* HOSPEDAGEM */}
                <Route path="/vinculo" element={<VinculoClienteAcomodacao /> } />

                {/* LISTAGENS */}
                <Route path="/listagens" element={<ListaListagens />} />
                <Route path="/dependendentestitular" element={<ListaDependentesTitular />} />
                <Route path="/titulardependentes" element={<ListaTitularDependentes />} />
                <Route path="/acomodacoes" element={<ListaAcomodacoes />} />
                <Route path="/hospedesacomodacao" element={<ListaHospedesAcomodacao />} />
            </Routes>
        </Router>
    )
}