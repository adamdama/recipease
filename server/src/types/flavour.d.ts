interface Flavouring<FlavorT> {
    _type?: FlavorT;
}
export type Flavour<T, FlavourT> = T & Flavouring<FlavourT>;
