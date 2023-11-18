//src/types/legis.ts
export type legisItem = {
    dataInsercao: string | number | Date;
    length: number;
    sort(arg0: (a: any, b: any) => number): unknown;
    _id: string;
    ano: string;
    descricao: string;
    titulo: string;
    __v: number;
}