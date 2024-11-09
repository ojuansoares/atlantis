import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from '../public/logo.png';

export default function Footer() {
    return (
        <footer className="bg-black text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <img className="logo mb-2" src={logo} alt="Atlantis" />
                        <p>© 2024 Atlantis. Todos os direitos reservados.</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5>Acesso Rápido</h5>
                        <ul className="list-unstyled">
                            <li><a className="text-light" href="/clientes">Clientes</a></li>
                            <li><a className="text-light" href="/cadastrocliente">Cadastrar Cliente</a></li>
                            <li><a className="text-light" href="/vinculo">Hospedagem</a></li>
                            <li><a className="text-light" href="/listagens">Listagens</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h5>Entre em Contato</h5>
                        <p>Email: support@atlantis.com</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Address: 123 Atlantis Street, Water City, ATL 12345</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}