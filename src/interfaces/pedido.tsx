export interface Cafe {
    tipo_cafe: string;
    quantity: number;
}

export interface Empleado {
    nombre: string;
    identificacion: string;
    mail: string;
    departamente: string;
    positiposiciónon: string;
    cafe: Cafe[];
}
