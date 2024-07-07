export enum Decades{
    Sixties = "1960-1969",
    Seveties = "1970-1979",
    Eighties = "1980-1989",
    Ninties = "1990-1999",
    Twothousands = "2000-2009",
    TwentyTens = "2010-2019",
}

export function getDecades(): string[] {
    return Object.keys(Decades).map(key => Decades[key as keyof typeof Decades]);
  }