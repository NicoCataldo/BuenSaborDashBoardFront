import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { CheckCircleOutline, HighlightOff, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Sucursal from "../../../../types/ISucursal";

interface CardSucursalProps {
  sucursal: any;
  onEdit: (sucursal: Sucursal) => void;
  onDelete: (sucursal: Sucursal) => void;
}

const CardSucursal: React.FC<CardSucursalProps> = ({ sucursal, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 400, margin: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: "#E66200", fontWeight: "bold" }}
        >
          {sucursal.nombre}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2" color="text.secondary">
          <strong>Casa Matriz:</strong>{" "}
          {sucursal.esCasaMatriz ? (
            <CheckCircleOutline sx={{ color: "#4caf50" }} />
          ) : (
            <HighlightOff sx={{ color: "#f44336" }} />
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Dirección:</strong> {sucursal.domicilio.calle}{" "}
          {sucursal.domicilio.numero},{" "}
          {sucursal.domicilio.localidad.provincia.nombre},{" "}
          {sucursal.domicilio.localidad.provincia.pais.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <strong>Horario:</strong> {sucursal.horarioApertura} -{" "}
          {sucursal.horarioCierre}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Button
          onClick={() => onEdit(sucursal)}
          variant="contained"
          sx={{ bgcolor: "#E66200", "&:hover": { color:'#E66200', bgcolor: "grey", border: '2px solid #E66200' }, mr: 1 }}
          startIcon={<Edit />}
        >
          Editar
        </Button>
        {/* <Button
          onClick={() => onDelete(sucursal)}
          variant="contained"
          sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#d32f2f' }, mr: 1}}
          startIcon={<Delete />}
        >
          Eliminar
        </Button> */}
        <Button
          component={Link}
          to={`/dashboard/${sucursal.id}`} // Asegúrate de que esta ruta sea correcta
          variant="contained"
          sx={{ color:'#E66200',bgcolor: "white", border:'2px solid #E66200', "&:hover": { color:'#E66200', bgcolor: "grey", border: '2px solid #E66200' } }}
        >
          Ingresar
        </Button>
      </Box>
    </Card>
  );
};

export default CardSucursal;
