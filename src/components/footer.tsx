"use client";
import React from "react";

const Footer = () => {
    return (
        <footer
            className="flex flex-col md:flex-row py-4 justify-center items-center"
            style={{
                color: "#131F56",
                fontSize: "10px",
                position: "fixed",
                bottom: 0,
                width: "100%",
                backgroundColor: "white",
                zIndex: 1000,
                textAlign: "center",
            }}
        >
            <div className="justify-center items-center">
                <span className="text-gray dark:text-defaulttextcolor/50">
                    © <span id="year">2024</span>{" "}
                </span>
                <span className="text-gray dark:text-defaulttextcolor/50 md:ml-2">
                    <a
                        href="https://www.unemi.edu.ec/"
                        target="_blank"
                        className="text-defaulttextcolor font-semibold dark:text-defaulttextcolor"
                    >
                        Universidad Estatal de Milagro.
                    </a>{" "}
                    Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
};

export default Footer