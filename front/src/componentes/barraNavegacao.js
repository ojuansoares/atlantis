import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from '../public/logo.png';

export default function BarraNavegacao() {
    return (
        <nav className="navbar navbar-expand-lg d-flex bg_navbar fixed-top" data-bs-theme="dark" style={{ zIndex: 5 }}>
            <div className="container-nav">
                <a className="navbar-brand" href="/">
                    <img className="logo" src={logo} alt="PetLovers" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/clientes">Clientes</a>
                            <hr className="d-lg-none hr-no-margin" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/cadastrocliente">Cadastrar Cliente</a>
                            <hr className="d-lg-none hr-no-margin" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/vinculo">Hospedagem</a>
                            <hr className="d-lg-none hr-no-margin" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/listagens">Listagens</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
