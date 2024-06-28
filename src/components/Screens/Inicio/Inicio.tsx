import { Box, Grid, Container, Typography } from "@mui/material";
import ChartCard from "../../ui/Cards/ChartCard/ChartCard";
import BaseBar from "../../ui/Charts/BaseBar";
import BasePie from "../../ui/Charts/BasePie";
import InicioCard from "../../ui/Cards/InicioCard/InicioCard";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import ReportesCard from "../../ui/Cards/Reportes/ReportesCard";

// Contenido para las tarjetas de inicio
const promocionesContent = {
  url: "https://www.grandespymes.com.ar/wp-content/uploads/2020/07/promociones.jpg",
  title: "Promociones",
  content:
    "Personaliza tus ofertas y haz que destaquen para que tus clientes no puedan resistirse.",
};

const insumosContent = {
  url: "https://thefoodtech.com/wp-content/uploads/2020/12/ingredientes-saludables.jpg",
  title: "Insumos",
  content: "Agrega, actualiza o elimina los insumos de tu sucursal",
};

const productosContent = {
  url: "https://resizer.glanacion.com/resizer/v2/pizza-con-masa-de-semolin-y-cobertura-de-5PEHFU6OI5CKRKR3RFH5EZMSSM.jpg?auth=4209d6353967859e858249fe164de9c3732f96f95fda2ee735a6768a2641eff2&width=768&height=512&quality=70&smart=true",
  title: "Productos",
  content:
    "Añade nuevos platos o actualiza los precios para mejorar la experiencia de tus clientes.",
};

// Estilo para las tarjetas
const cardStyle = {
  width: "100%",
  height: "100%",
};

//Renderización del componente
const Inicio: React.FC = () => {
  const { sucursalId } = useParams<{ sucursalId: string }>();
  const id = sucursalId || "";
  return (
    <Box component="main" sx={{ flexGrow: 1, pt: 10 }}>
      <Container>
        <Typography component="h1" variant="h5" color="initial">
          ¡Bienvenido!
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ alignContent: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={cardStyle}>
              <InicioCard content={promocionesContent} sucursalId={id} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={cardStyle}>
              <InicioCard content={insumosContent} sucursalId={id} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={cardStyle}>
              <InicioCard content={productosContent} sucursalId={id} />
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          sx={{ py: 2, alignContent: "center", justifyContent: "center" }}
        >
          <Grid item xs={12} md={6}>
            <ChartCard title="Ranking">
              <BasePie />
            </ChartCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <ChartCard title="Ingresos Mensuales">
              <BaseBar />
            </ChartCard>
          </Grid>
        </Grid>

        <Grid sx={{ marginBottom: "20px" }}>
          <ReportesCard />
        </Grid>
      </Container>
    </Box>
  );
};

export default Inicio;
