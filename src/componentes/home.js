import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bg11.css";
import "../index.css";

export default function Home() {
    const navigate = useNavigate();

    const handlePaginaClientes = () => {
        navigate("/clientes");
    };

    const handlePaginaGitHub = () => {
        window.open("https://github.com/ojuansoares", "_blank");
    };

    return (
        <div className="bg11">
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "white"
                }}
            >
                <h1 className="home-title">Bem-vindo a Atlantis!</h1>
                <p className="home-description">
                    Aproveite suas férias maravilhosas com uma experiência de luxo incrível!
                </p>
                <div className="home-button-container">
                    <button className="home-button" onClick={handlePaginaClientes}>Fazer um Tour</button>
                    <button className="home-button" onClick={handlePaginaGitHub}>Saiba Mais</button>
                </div>
            </div>
        </div>
    );
}
