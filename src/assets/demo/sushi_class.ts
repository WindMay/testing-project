export interface Sushi {
  arroz: string;
  relleno: string;
  envoltorio: string;
}
export class SushiMakerClass {
  relleno: string;
  envoltorio: string;

  constructor(relleno: string, envoltorio: string) {
    this.relleno = relleno;
    this.envoltorio = envoltorio;
  }

  prepararSushi(rellenoCustom?: string, envoltorioCustom?: string): Sushi {
    return ({
      arroz: 'arroz blanco con un toque de vinagre',
      relleno: rellenoCustom ? rellenoCustom : this.relleno,
      envoltorio: envoltorioCustom ? envoltorioCustom : this.envoltorio
    }) as Sushi;
  }
}
