// Rutas.tsx
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BaseNavbar from "../components/ui/common/Navbar/BaseNavbar";
import SidebarLayout from "../components/ui/common/SideBarLayout/SideBarLayout";
import CallbackPage from "../components/auth/CallbackPage";
import { useAuth0 } from "@auth0/auth0-react";
import useAuthToken from "../hooks/useAuthToken";
import RutaPrivada from "../components/RutaPrivada/RutaPrivada";
import Login from "../components/Screens/Login/Login";
import EmpresaComponent from "../components/Screens/Empresa/EmpresaComponent";
import SucursalComponent from "../components/Screens/Sucursal/SucursalComponent";
import Inicio from "../components/Screens/Inicio/Inicio";
import Insumo from "../components/Screens/Insumo/Insumo";
import Producto from "../components/Screens/Producto/Producto";
import UnidadMedida from "../components/Screens/UnidadMedida/UnidadMedida";
import Categoria from "../components/Screens/Categoria/Categoria";
import Promocion from "../components/Screens/Promocion/Promocion";
import Empleado from "../components/Screens/Empleado/Empleado";

const Rutas: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const getToken = useAuthToken();
  const [token, setToken] = useState<string | null>(null);
  //const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const authToken = await getToken();
        setToken(authToken);
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
    };

    if (isAuthenticated) {
      fetchToken();
    }
  }, [getToken, isAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  localStorage.setItem("usuario", JSON.stringify(user));
  console.log("User:", user);
  console.log("Token:", token);

  return (
    <>
      {isAuthenticated && (
        <div className="navbar">
          <BaseNavbar />
        </div>
      )}
      <Routes>
        <Route path="/callback" element={<CallbackPage />} />
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/dashboard/1" />} />
            <Route
              path="/empresa"
              element={
                <RutaPrivada
                  component={EmpresaComponent}
                  roles={["ADMIN", "SUPERADMIN"]}
                />
              }
            />
            <Route
              path="/empresa/:empresaId"
              element={
                <RutaPrivada
                  component={SucursalComponent}
                  roles={["ADMIN", "SUPERADMIN"]}
                />
              }
            />
            <Route path="/" element={<SidebarLayout />}>
              <Route
                path="/dashboard/:sucursalId"
                element={
                  <RutaPrivada
                    component={Inicio}
                    roles={["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/insumos/:sucursalId"
                element={
                  <RutaPrivada
                    component={Insumo}
                    roles={["ADMIN", "EMPLEADO", "COCINERO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/productos/:sucursalId"
                element={
                  <RutaPrivada
                    component={Producto}
                    roles={["ADMIN", "COCINERO", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/unidadMedida/:sucursalId"
                element={
                  <RutaPrivada
                    component={UnidadMedida}
                    roles={["ADMIN", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/categorias/:sucursalId"
                element={
                  <RutaPrivada
                    component={Categoria}
                    roles={["ADMIN", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/promociones/:sucursalId"
                element={
                  <RutaPrivada
                    component={Promocion}
                    roles={["ADMIN", "EMPLEADO", "SUPERADMIN"]}
                  />
                }
              />
              <Route
                path="/empleados/:sucursalId"
                element={
                  <RutaPrivada
                    component={Empleado}
                    roles={["ADMIN", "SUPERADMIN"]}
                  />
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard/1" />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Rutas;
