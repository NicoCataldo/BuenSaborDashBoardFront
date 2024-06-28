// CategoriaPost.ts
export interface CategoriaPost {
    denominacion: string;
    esInsumo: boolean;
    idSucursales: number[];
    subCategorias: CategoriaPost[];
}
