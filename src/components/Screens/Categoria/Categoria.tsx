import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  MenuItem,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import ICategoria from "../../../types/ICategoria";
import { setCategoria } from "../../../redux/slices/CategoriaReducer";
import { CategoriaPost } from "../../../types/post/CategoriaPost";
import { toggleModal } from "../../../redux/slices/ModalReducer";
import EmptyState from "../../ui/Cards/EmptyState/EmptyState";
import SearchBar from "../../ui/common/SearchBar/SearchBar";
import ModalCategoria from "../../ui/Modals/ModalCategoria";
import { useParams } from "react-router-dom";
import SucursalService from "../../../services/SucursalService";
import SimpleCategoriaAccordion from "../../ui/accordion/CategoriaAccordion";

const Categoria: React.FC = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const globalCategorias = useAppSelector((state) => state.categoria.data);
  const { sucursalId } = useParams<{ sucursalId: string }>();
  const sucursalService = new SucursalService();
  const [selectedCategory, setSelectedCategory] = useState<
    ICategoria | CategoriaPost
  >();
  const [filteredData, setFilteredData] = useState<ICategoria[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  const fetchCategoria = async () => {
    try {
      setIsLoading(true);
      if (sucursalId !== undefined) {
        const categorias = (await sucursalService.get(
          `${url}/sucursal/getCategorias`,
          parseInt(sucursalId)
        )) as any;
        dispatch(setCategoria(categorias));
        filterParentCategories(categorias);
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoria();
  }, [dispatch, url, sucursalId]);

  const initialValue: CategoriaPost = {
    denominacion: "",
    esInsumo: false,
    idSucursales: [0],
    subCategorias: [],
  };

  const onSearch = (query: string) => {
    setSearchQuery(query);
    filterParentCategories(globalCategorias, query, filter);
  };

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    filterParentCategories(globalCategorias, searchQuery, newFilter);
  };

  const filterParentCategories = (
    categorias: ICategoria[],
    query: string = "",
    filter: string = "all"
  ) => {
    // Extraer los IDs de todas las subcategorías
    const subCategoryIds = new Set(
      categorias.flatMap((categoria) =>
        categoria.subCategorias.map((subCategoria) => subCategoria.id)
      )
    );

    // Filtrar solo las categorías que no son subcategorías de ninguna otra categoría
    const filtered = categorias.filter((categoria) => {
      const matchesSearch = categoria.denominacion
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "insumo" && categoria.esInsumo) ||
        (filter === "noInsumo" && !categoria.esInsumo);
      const isParentCategory = !subCategoryIds.has(categoria.id);
      return matchesSearch && matchesFilter && isParentCategory;
    });

    setFilteredData(filtered);
  };

  const handleEdit = (categoria: ICategoria) => {
    if (categoria) {
      setIsEditing(true);
      setSelectedCategory(categoria);
      dispatch(toggleModal({ modalName: "modalCategoria" }));
    }
  };

  const handleAddCategoria = () => {
    setIsEditing(false);
    setSelectedCategory(initialValue);
    dispatch(toggleModal({ modalName: "modalCategoria" }));
  };

  const renderCategorias = (categorias: ICategoria[], order: number) => {
    return categorias.map((categoria, index) => {
      if (categoria.eliminado) {
        return null;
      }
      return (
        <SimpleCategoriaAccordion
          key={index}
          categoria={categoria}
          order={order}
          onEdit={handleEdit}
        />
      );
    });
  };

  return (
    <Box sx={{ maxWidth: 1150, margin: "0 auto", padding: 2, my: 10 }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4">Categorías</Typography>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" sx={{ width: "100%" }}>
            <Box sx={{ flex: 1, minWidth: "25%" }}>
              <SearchBar onSearch={onSearch} />
            </Box>
            <Box sx={{ mx: 2 }} /> {/* Espacio horizontal */}
            <TextField
              select
              value={filter}
              onChange={onFilterChange}
              label="Filtrar por"
              variant="outlined"
              sx={{ flex: 1, maxWidth: "20%" }}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="insumo">Insumos</MenuItem>
              <MenuItem value="noInsumo">No Insumos</MenuItem>
            </TextField>
            <Box sx={{ mx: 2 }} /> {/* Espacio horizontal */}
            <Button
              variant="contained"
              color="secondary"
              sx={{
                flex: 1,
                minWidth: "25%",
                maxWidth: "25%",
                backgroundColor: "#E66200",
                "&:hover": {
                  bgcolor: "#BB6201",
                },
                fontSize: "1.0rem",
              }}
              onClick={handleAddCategoria}
            >
              Agregar Categoría
            </Button>
          </Box>
        </Box>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <CircularProgress sx={{ color: "#E66200" }} />
          </Box>
        ) : filteredData.length === 0 ? (
          <EmptyState
            title="¡No tienes categorias!"
            description="Genera categorias con el formulario."
          />
        ) : (
          <Stack direction="column" spacing={1} mt={2}>
            {renderCategorias(filteredData, 0)}
          </Stack>
        )}
      </Container>
      {sucursalId && (
        <ModalCategoria
          modalName="modalCategoria"
          initialValues={selectedCategory || initialValue}
          isEditMode={isEditing}
          getCategoria={fetchCategoria}
          categoriaAEditar={isEditing ? selectedCategory : undefined}
          idSucursal={parseInt(sucursalId)}
        />
      )}
    </Box>
  );
};

export default Categoria;
