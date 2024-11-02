import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/bg11.css";
import "../index.css";

export default function Home() {
    const navigate = useNavigate();

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
                <p className="home-description d-none d-md-block">
                    Aproveite suas férias maravilhosas com uma experiência de luxo incrível!
                </p>
                <div className="home-button-container d-grid gap-2 d-md-flex justify-content-md-center">
                    <button className="home-button" onClick={() => navigate("/clientes")}>Fazer um Tour</button>
                    <button className="home-button" onClick={() => window.open("https://github.com/ojuansoares", "_blank")}>Saiba Mais</button>
                </div>
            </div>
        </div>
    );
}
