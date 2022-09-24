import React from "react";
import { Link } from "react-router-dom";

export default function LoadingPage() {
    return(
        <div>
            <h1>Bienvenido</h1>
            <Link to="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}