import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "./layout/home-layout";

const Loadable = (Component: React.LazyExoticComponent<any>, props: any = {}) =>
(
    <React.Suspense fallback={<div>Cargando</div>}>
        <Component {...props} />
    </React.Suspense>
);


export const routesData = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/tic-tac-toe-React/home" />
    },
    {
        path: "/tic-tac-toe-React",
        element: <Navigate to="/tic-tac-toe-React/home" />
    },
    {
        element: <HomeLayout />,
        children: [
            {
                path: "tic-tac-toe-React/home",
                element: Loadable(
                    React.lazy(() => import("./views/home/home"))
                )
            },
            {
                path: "tic-tac-toe-React/game",
                element: Loadable(
                    React.lazy(() => import("./views/game/game"))
                )
            },
        ]
    },
])