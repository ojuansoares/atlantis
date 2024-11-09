import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import BarraNavegacao from "./barraNavegacao";
import Footer from "./footer";
import Home from "./home";
import Cliente from "./clientes/cliente";
import ListaClientes from "./clientes/listaClientes";
import ListaListagens from "./listagens/listaListagens";
import CadastroCliente from './clientes/cadastroCliente';
import EditarCliente from "./clientes/editarCliente";
import VinculoClienteAcomodacao from "./hospedagem/VinculoClienteAcomodacao";
import ListaDependentesTitular from "./listagens/listaDependentesTitular";
import ListaTitularDependentes from "./listagens/listaTitularDependentes";
import ListaAcomodacoes from "./listagens/listaAcomodacoes";
import ListaHospedesAcomodacao from "./listagens/listaHospedesAcomodacao";

export default function Roteador() {
    return (
        <Router>
            <div className="app-container">
                <BarraNavegacao />
                <ToastContainer 
                    className="custom-toast-container"
                    position="top-center"
                    theme="dark"
                />
                <div className="content-wrap">
                    <Routes>
                        {/* HOME */}
                        <Route path="/" element={<Home />} />

                        {/* CLIENTES */}
                        <Route path="/clientes" element={<ListaClientes />} />
                        <Route path="/cliente/:id" element={<Cliente />} />
                        <Route path="/editarcliente/:id" element={<EditarCliente />} />

                        {/* CADASTRAR CLIENTE */}
                        <Route path="/cadastrocliente" element={<CadastroCliente />} />

                        {/* HOSPEDAGEM */}
                        <Route path="/vinculo" element={<VinculoClienteAcomodacao />} />

                        {/* LISTAGENS */}
                        <Route path="/listagens" element={<ListaListagens />} />
                        <Route path="/dependendentestitular" element={<ListaDependentesTitular />} />
                        <Route path="/titulardependentes" element={<ListaTitularDependentes />} />
                        <Route path="/acomodacoes" element={<ListaAcomodacoes />} />
                        <Route path="/hospedesacomodacao" element={<ListaHospedesAcomodacao />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    )
}