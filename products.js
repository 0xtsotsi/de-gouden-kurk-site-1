const productRecords = Object.freeze([
  {
    id: "bacardi-carta-blanca",
    name: "Bacardi Carta Blanca",
    style: "Witte rum",
    category: "rum",
    categoryLabel: "Rum",
    volume: "70 cl",
    abv: "37,5%",
    price: 15.99,
    image: "assets/products/bacardi-carta-blanca.jpg",
    imageAlt: "Fles Bacardi Carta Blanca op een witte achtergrond",
    imageWidth: 635,
    imageHeight: 1276,
    credit: {
      title: "Bacardi (on white)",
      creator: "Miika Silfverberg",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bacardi_(on_white).jpg"
    }
  },
  {
    id: "beefeater-london-dry",
    name: "Beefeater London Dry Gin",
    style: "Classic London Dry",
    category: "gin",
    categoryLabel: "Gin",
    volume: "70 cl",
    abv: "40%",
    price: 24.99,
    image: "assets/products/beefeater-london-dry.jpg",
    imageAlt: "Fles Beefeater London Dry Gin",
    imageWidth: 116,
    imageHeight: 400,
    credit: {
      title: "Beefeater London Dry Gin",
      creator: "Open Food Facts / product photo contributors",
      license: "CC BY-SA",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://world.openfoodfacts.org/product/5000299605042"
    }
  },
  {
    id: "gordons-london-dry",
    name: "Gordon's London Dry Gin",
    style: "Distilled London Dry",
    category: "gin",
    categoryLabel: "Gin",
    volume: "70 cl",
    abv: "37,5%",
    price: 19.99,
    image: "assets/products/gordons-london-dry.jpg",
    imageAlt: "Fles Gordon's London Dry Gin",
    imageWidth: 654,
    imageHeight: 917,
    credit: {
      title: "Gordons London Dry Gin im Regal",
      creator: "AxelHH",
      license: "CC BY 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Gordons_London_Dry_Gin_im_Regal.jpg"
    }
  },
  {
    id: "johnnie-walker-black-label",
    name: "Johnnie Walker Black Label",
    style: "Blended Scotch whisky",
    category: "whisky",
    categoryLabel: "Whisky",
    volume: "70 cl",
    abv: "40%",
    price: 29.99,
    image: "assets/products/johnnie-walker-black-label.jpg",
    imageAlt: "Fles Johnnie Walker Black Label tussen andere whiskyflessen",
    imageWidth: 960,
    imageHeight: 1275,
    credit: {
      title: "Botella Black Label",
      creator: "Eduardo Milla",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Botella_Black_Label.jpg"
    }
  },
  {
    id: "ballantines-finest",
    name: "Ballantine's Finest",
    style: "Blended Scotch whisky",
    category: "whisky",
    categoryLabel: "Whisky",
    volume: "70 cl",
    abv: "40%",
    price: 19.49,
    image: "assets/products/ballantines-finest.jpg",
    imageAlt: "Fles Ballantine's Finest naast een glas whisky",
    imageWidth: 960,
    imageHeight: 1061,
    credit: {
      title: "2017 Ballantine's Finest",
      creator: "Jacek Halicki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2017_Ballantine's_Finest.jpg"
    }
  },
  {
    id: "jb-rare",
    name: "J&B Rare",
    style: "Blended Scotch whisky",
    category: "whisky",
    categoryLabel: "Whisky",
    volume: "70 cl",
    abv: "40%",
    price: 21.99,
    image: "assets/products/jb-rare.jpg",
    imageAlt: "Fles J&B Rare",
    imageWidth: 300,
    imageHeight: 400,
    credit: {
      title: "J&B Rare",
      creator: "Open Food Facts / product photo contributors",
      license: "CC BY-SA",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://world.openfoodfacts.org/product/5010103804073"
    }
  },
  {
    id: "smirnoff-vodka",
    name: "Smirnoff Vodka",
    style: "Classic triple distilled vodka",
    category: "wodka",
    categoryLabel: "Wodka",
    volume: "70 cl",
    abv: "37,5%",
    price: 17.99,
    image: "assets/products/smirnoff-vodka.jpg",
    imageAlt: "Fles Smirnoff Vodka met rode dop en label",
    imageWidth: 960,
    imageHeight: 1440,
    credit: {
      title: "Smirnoff Red Label 8213",
      creator: "Ashley Pomeroy",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Smirnoff_Red_Label_8213.jpg"
    }
  },
  {
    id: "havana-club-3",
    name: "Havana Club 3 Years",
    style: "Cubaanse rum",
    category: "rum",
    categoryLabel: "Rum",
    volume: "70 cl",
    abv: "40%",
    price: 22.99,
    image: "assets/products/havana-club-3.jpg",
    imageAlt: "Fles Havana Club Añejo 3 Años",
    imageWidth: 136,
    imageHeight: 400,
    credit: {
      title: "Havana Club Añejo 3 Años",
      creator: "Open Food Facts / product photo contributors",
      license: "CC BY-SA",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://world.openfoodfacts.org/product/8501110081641"
    }
  },
  {
    id: "campari",
    name: "Campari",
    style: "Italiaanse bitter",
    category: "likeuren",
    categoryLabel: "Likeuren",
    volume: "70 cl",
    abv: "25%",
    price: 17.49,
    image: "assets/products/campari.jpg",
    imageAlt: "Fles Campari op een tafel",
    imageWidth: 960,
    imageHeight: 1440,
    credit: {
      title: "Bottle of Campari",
      creator: "Kenneth C. Zirkel",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Bottle_of_Campari_(United_States).jpg"
    }
  },
  {
    id: "jose-cuervo-especial",
    name: "José Cuervo Especial Silver",
    style: "Mexicaanse tequila",
    category: "tequila",
    categoryLabel: "Tequila",
    volume: "70 cl",
    abv: "38%",
    price: 19.99,
    image: "assets/products/jose-cuervo-especial.jpg",
    imageAlt: "Fles José Cuervo Especial Silver",
    imageWidth: 300,
    imageHeight: 400,
    credit: {
      title: "José Cuervo Especial Silver",
      creator: "Open Food Facts / product photo contributors",
      license: "CC BY-SA",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://world.openfoodfacts.org/product/7501035042131"
    }
  },
  {
    id: "hennessy-vs",
    name: "Hennessy VS",
    style: "Cognac",
    category: "cognac",
    categoryLabel: "Cognac",
    volume: "70 cl",
    abv: "40%",
    price: 24.99,
    image: "assets/products/hennessy-vs.jpg",
    imageAlt: "Fles Hennessy Very Special Cognac naast een glas",
    imageWidth: 960,
    imageHeight: 1241,
    credit: {
      title: "2023 Hennessy V.S. Cognac",
      creator: "Jacek Halicki",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2023_Hennessy_V.S._Cognac.jpg"
    }
  },
  {
    id: "martini-bianco",
    name: "Martini Bianco",
    style: "Zoete vermouth",
    category: "vermouth",
    categoryLabel: "Vermouth",
    volume: "75 cl",
    abv: "15%",
    price: 10.99,
    image: "assets/products/martini-bianco.jpg",
    imageAlt: "Fles Martini Bianco",
    imageWidth: 960,
    imageHeight: 1280,
    credit: {
      title: "Martini Bianco",
      creator: "ChickenFalls",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Martini_Bianco.JPG"
    }
  }
].map((record) => Object.freeze({ ...record, credit: Object.freeze(record.credit) })));

export const products = Object.freeze(
  [...productRecords]
    .sort((left, right) => left.name.localeCompare(right.name, "nl-NL"))
    .map((product) => Object.freeze(product))
);

export const categories = Object.freeze([
  { id: "all", label: "Alles" },
  { id: "whisky", label: "Whisky" },
  { id: "gin", label: "Gin" },
  { id: "wodka", label: "Wodka" },
  { id: "rum", label: "Rum" },
  { id: "tequila", label: "Tequila" },
  { id: "cognac", label: "Cognac" },
  { id: "likeuren", label: "Likeuren" },
  { id: "vermouth", label: "Vermouth" }
].map((category) => Object.freeze(category)));
