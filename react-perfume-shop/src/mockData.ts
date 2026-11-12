import type { Perfume, AdminOrder, User } from "./types";

// Mock perfume data
export const mockPerfumes: Perfume[] = [
  {
    id: 1,
    name: "Imagination",
    slug: "imagination",
    brand: "Louis Vuitton",
    gender: "Homme || رجالي",
    short_description: "Fragrance fraîche et élégante || عطر منعش وأنيق",
    description: "Imagination de Louis Vuitton est un parfum sophistiqué qui allie fraîcheur et élégance. Parfait pour l'homme moderne. || إيماجينيشن من لويس فويتون عطر راقٍ يجمع بين الانتعاش والأناقة. مثالي للرجل العصري.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Boisé Aromatique || خشبي عطري",
    recipe: "Citrus, Bois, Épices || حمضيات، خشب، توابل",
    top_notes: ["Citrus", "Bergamot", "Ginger"],
    heart_notes: ["Black Tea", "Mate", "Nutmeg"],
    base_notes: ["Ambroxan", "Cedar", "Musk"],
    longevity: "6-8 heures || 6-8 ساعات",
    sillage: "Modéré à Fort || معتدل إلى قوي",
    vibe: "Élégant et Raffiné || أنيق ومتطور",
    when_to_wear: "Jour et Soirée || نهار ومساء",
    feeling: "Confiant et Sophistiqué || واثق ومتطور",
    average_rating: 4.7,
    reviews_count: 156,
    reviews: [
      { author: "Ahmed", rating: 5, comment: "Excellent parfum, très élégant!", date: "2026-05-15" },
      { author: "Karim", rating: 4, comment: "Bonne tenue, j'adore!", date: "2026-05-10" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Citrus", "Black Tea", "Ambroxan", "Cedar"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: true,
    similar_slugs: ["y-eau-de-parfum", "bleu-chanel"]
  },
  {
    id: 2,
    name: "Y Eau de Parfum",
    slug: "y-eau-de-parfum",
    brand: "Yves Saint Laurent",
    gender: "Homme || رجالي",
    short_description: "Frais et puissant || منعش وقوي",
    description: "Y d'Yves Saint Laurent est un parfum masculin moderne qui combine fraîcheur et intensité. || واي من إيف سان لوران عطر رجالي عصري يجمع بين الانتعاش والقوة.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Aromatique Fougère || عطري فوجير",
    recipe: "Pomme, Sauge, Bois || تفاح، ميرمية، خشب",
    top_notes: ["Apple", "Ginger", "Bergamot"],
    heart_notes: ["Sage", "Juniper", "Geranium"],
    base_notes: ["Amberwood", "Tonka Bean", "Cedar"],
    longevity: "7-9 heures || 7-9 ساعات",
    sillage: "Fort || قوي",
    vibe: "Moderne et Audacieux || عصري وجريء",
    when_to_wear: "Toute occasion || كل المناسبات",
    feeling: "Énergique et Confiant || نشيط وواثق",
    average_rating: 4.8,
    reviews_count: 203,
    reviews: [
      { author: "Youssef", rating: 5, comment: "Mon préféré! Tenue exceptionnelle", date: "2026-06-01" },
      { author: "Omar", rating: 5, comment: "Parfait pour toute occasion", date: "2026-05-28" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Apple", "Sage", "Amberwood", "Tonka Bean"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: true,
    similar_slugs: ["imagination", "dior-sauvage"]
  },
  {
    id: 3,
    name: "Boss Bottled",
    slug: "boss-bottled",
    brand: "Hugo Boss",
    gender: "Homme || رجالي",
    short_description: "Classique et élégant || كلاسيكي وأنيق",
    description: "Boss Bottled est un parfum masculin intemporel qui incarne l'élégance et la sophistication. || بوس بوتلد عطر رجالي خالد يجسد الأناقة والرقي.",
    price: 79,
    image_url: null,
    country_of_origin: "Allemagne || ألمانيا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Boisé Épicé || خشبي حار",
    recipe: "Pomme, Cannelle, Vanille || تفاح، قرفة، فانيلا",
    top_notes: ["Apple", "Plum", "Lemon", "Oakmoss"],
    heart_notes: ["Geranium", "Cinnamon", "Mahogany"],
    base_notes: ["Vanilla", "Sandalwood", "Cedar", "Vetiver"],
    longevity: "6-8 heures || 6-8 ساعات",
    sillage: "Modéré || معتدل",
    vibe: "Classique et Professionnel || كلاسيكي ومهني",
    when_to_wear: "Bureau et Soirée || مكتب ومساء",
    feeling: "Élégant et Raffiné || أنيق ومتطور",
    average_rating: 4.6,
    reviews_count: 187,
    reviews: [
      { author: "Hassan", rating: 5, comment: "Un classique indémodable!", date: "2026-05-20" },
      { author: "Mehdi", rating: 4, comment: "Parfait pour le travail", date: "2026-05-18" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Apple", "Cinnamon", "Vanilla", "Sandalwood"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: false,
    similar_slugs: ["l-homme-ysl", "acqua-di-gio"]
  },
  {
    id: 4,
    name: "Versace Eros",
    slug: "versace-eros",
    brand: "Versace",
    gender: "Homme || رجالي",
    short_description: "Puissant et séduisant || قوي ومغري",
    description: "Versace Eros est un parfum masculin audacieux qui célèbre la passion et le désir. || فيرساتشي إيروس عطر رجالي جريء يحتفي بالشغف والرغبة.",
    price: 79,
    image_url: null,
    country_of_origin: "Italie || إيطاليا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Aromatique Fougère || عطري فوجير",
    recipe: "Menthe, Vanille, Tonka || نعناع، فانيلا، تونكا",
    top_notes: ["Mint", "Green Apple", "Lemon"],
    heart_notes: ["Tonka Bean", "Geranium", "Ambroxan"],
    base_notes: ["Vanilla", "Vetiver", "Oakmoss", "Cedar"],
    longevity: "8-10 heures || 8-10 ساعات",
    sillage: "Très Fort || قوي جداً",
    vibe: "Séduisant et Puissant || مغري وقوي",
    when_to_wear: "Soirée et Occasions Spéciales || مساء ومناسبات خاصة",
    feeling: "Confiant et Passionné || واثق وعاطفي",
    average_rating: 4.9,
    reviews_count: 245,
    reviews: [
      { author: "Amine", rating: 5, comment: "Incroyable! Très puissant", date: "2026-06-05" },
      { author: "Rachid", rating: 5, comment: "Le meilleur pour les soirées", date: "2026-06-02" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Mint", "Tonka Bean", "Vanilla", "Vetiver"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: true,
    similar_slugs: ["invictus", "stronger-with-you"]
  },
  {
    id: 5,
    name: "Dior Sauvage",
    slug: "dior-sauvage",
    brand: "Dior",
    gender: "Homme || رجالي",
    short_description: "Frais et sauvage || منعش وبري",
    description: "Dior Sauvage est un parfum masculin frais et puissant inspiré par les grands espaces. || ديور سوفاج عطر رجالي منعش وقوي مستوحى من المساحات الواسعة.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Aromatique || عطري",
    recipe: "Bergamote, Poivre, Ambroxan || برغموت، فلفل، أمبروكسان",
    top_notes: ["Calabrian Bergamot", "Pepper"],
    heart_notes: ["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver", "Patchouli"],
    base_notes: ["Ambroxan", "Cedar", "Labdanum"],
    longevity: "7-9 heures || 7-9 ساعات",
    sillage: "Fort || قوي",
    vibe: "Sauvage et Libre || بري وحر",
    when_to_wear: "Toute occasion || كل المناسبات",
    feeling: "Libre et Audacieux || حر وجريء",
    average_rating: 4.8,
    reviews_count: 312,
    reviews: [
      { author: "Samir", rating: 5, comment: "Le meilleur! Tenue incroyable", date: "2026-06-08" },
      { author: "Bilal", rating: 5, comment: "Mon parfum signature", date: "2026-06-04" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Bergamot", "Pepper", "Ambroxan", "Cedar"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: true,
    similar_slugs: ["y-eau-de-parfum", "bleu-chanel"]
  },
  {
    id: 6,
    name: "Bleu de Chanel",
    slug: "bleu-chanel",
    brand: "Chanel",
    gender: "Homme || رجالي",
    short_description: "Élégant et intemporel || أنيق وخالد",
    description: "Bleu de Chanel est un parfum masculin élégant qui incarne la liberté et la détermination. || بلو دو شانيل عطر رجالي أنيق يجسد الحرية والعزيمة.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Boisé Aromatique || خشبي عطري",
    recipe: "Citrus, Bois, Encens || حمضيات، خشب، بخور",
    top_notes: ["Lemon", "Mint", "Pink Pepper", "Grapefruit"],
    heart_notes: ["Ginger", "Nutmeg", "Jasmine"],
    base_notes: ["Incense", "Vetiver", "Cedar", "Sandalwood", "Patchouli"],
    longevity: "7-9 heures || 7-9 ساعات",
    sillage: "Modéré à Fort || معتدل إلى قوي",
    vibe: "Élégant et Déterminé || أنيق وحازم",
    when_to_wear: "Toute occasion || كل المناسبات",
    feeling: "Confiant et Libre || واثق وحر",
    average_rating: 4.9,
    reviews_count: 289,
    reviews: [
      { author: "Khalid", rating: 5, comment: "Parfait! Très élégant", date: "2026-06-07" },
      { author: "Nabil", rating: 5, comment: "Un must-have absolu", date: "2026-06-03" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Lemon", "Ginger", "Incense", "Cedar"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: true,
    similar_slugs: ["dior-sauvage", "acqua-di-gio"]
  },
  {
    id: 7,
    name: "Acqua di Gio",
    slug: "acqua-di-gio",
    brand: "Giorgio Armani",
    gender: "Homme || رجالي",
    short_description: "Frais et aquatique || منعش ومائي",
    description: "Acqua di Gio est un parfum masculin frais inspiré par la mer Méditerranée. || أكوا دي جيو عطر رجالي منعش مستوحى من البحر الأبيض المتوسط.",
    price: 79,
    image_url: null,
    country_of_origin: "Italie || إيطاليا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Aquatique Aromatique || مائي عطري",
    recipe: "Citrus, Marine, Bois || حمضيات، بحري، خشب",
    top_notes: ["Lime", "Lemon", "Bergamot", "Jasmine", "Orange"],
    heart_notes: ["Sea Notes", "Jasmine", "Calone", "Peach", "Freesia"],
    base_notes: ["White Musk", "Cedar", "Oakmoss", "Patchouli", "Amber"],
    longevity: "5-7 heures || 5-7 ساعات",
    sillage: "Modéré || معتدل",
    vibe: "Frais et Méditerranéen || منعش ومتوسطي",
    when_to_wear: "Jour et Été || نهار وصيف",
    feeling: "Rafraîchissant et Léger || منعش وخفيف",
    average_rating: 4.7,
    reviews_count: 267,
    reviews: [
      { author: "Tarik", rating: 5, comment: "Parfait pour l'été!", date: "2026-06-06" },
      { author: "Hamza", rating: 4, comment: "Très frais et agréable", date: "2026-05-30" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Lime", "Sea Notes", "White Musk", "Cedar"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: true,
    is_trending: false,
    similar_slugs: ["dolce-gabbana-light-blue", "l-homme-ysl"]
  },
  {
    id: 8,
    name: "Invictus",
    slug: "invictus",
    brand: "Paco Rabanne",
    gender: "Homme || رجالي",
    short_description: "Sportif et victorieux || رياضي ومنتصر",
    description: "Invictus de Paco Rabanne est un parfum masculin sportif qui célèbre la victoire. || إنفيكتوس من باكو رابان عطر رجالي رياضي يحتفي بالنصر.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Boisé Aquatique || خشبي مائي",
    recipe: "Pamplemousse, Laurier, Ambre || جريب فروت، غار، عنبر",
    top_notes: ["Grapefruit", "Marine Accord", "Mandarin"],
    heart_notes: ["Bay Leaf", "Hedione", "Jasmine"],
    base_notes: ["Guaiac Wood", "Patchouli", "Oakmoss", "Ambergris"],
    longevity: "7-9 heures || 7-9 ساعات",
    sillage: "Fort || قوي",
    vibe: "Sportif et Énergique || رياضي ونشيط",
    when_to_wear: "Sport et Jour || رياضة ونهار",
    feeling: "Victorieux et Puissant || منتصر وقوي",
    average_rating: 4.6,
    reviews_count: 198,
    reviews: [
      { author: "Adil", rating: 5, comment: "Énergisant! Parfait pour le sport", date: "2026-06-01" },
      { author: "Zakaria", rating: 4, comment: "Très bon rapport qualité-prix", date: "2026-05-27" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Grapefruit", "Bay Leaf", "Guaiac Wood", "Ambergris"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: false,
    is_trending: true,
    similar_slugs: ["versace-eros", "azzaro-wanted"]
  },
  {
    id: 9,
    name: "L'Homme YSL",
    slug: "l-homme-ysl",
    brand: "Yves Saint Laurent",
    gender: "Homme || رجالي",
    short_description: "Élégant et moderne || أنيق وعصري",
    description: "L'Homme d'Yves Saint Laurent est un parfum masculin élégant et raffiné. || لوم من إيف سان لوران عطر رجالي أنيق ومتطور.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Boisé Aromatique || خشبي عطري",
    recipe: "Gingembre, Basilic, Cèdre || زنجبيل، ريحان، أرز",
    top_notes: ["Ginger", "Bergamot", "Lemon"],
    heart_notes: ["Spices", "Violet Leaf", "White Pepper", "Basil"],
    base_notes: ["Tonka Bean", "Cedar", "Vetiver"],
    longevity: "6-8 heures || 6-8 ساعات",
    sillage: "Modéré || معتدل",
    vibe: "Élégant et Raffiné || أنيق ومتطور",
    when_to_wear: "Bureau et Soirée || مكتب ومساء",
    feeling: "Sophistiqué et Moderne || متطور وعصري",
    average_rating: 4.7,
    reviews_count: 176,
    reviews: [
      { author: "Ismail", rating: 5, comment: "Très élégant et raffiné", date: "2026-05-25" },
      { author: "Farid", rating: 4, comment: "Parfait pour le bureau", date: "2026-05-22" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Ginger", "Violet Leaf", "Tonka Bean", "Cedar"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: false,
    is_trending: false,
    similar_slugs: ["boss-bottled", "acqua-di-gio"]
  },
  {
    id: 10,
    name: "Dolce & Gabbana Light Blue",
    slug: "dolce-gabbana-light-blue",
    brand: "Dolce & Gabbana",
    gender: "Homme || رجالي",
    short_description: "Frais et méditerranéen || منعش ومتوسطي",
    description: "Light Blue pour Homme est un parfum frais inspiré par l'été méditerranéen. || لايت بلو للرجال عطر منعش مستوحى من الصيف المتوسطي.",
    price: 79,
    image_url: null,
    country_of_origin: "Italie || إيطاليا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Citrus Aromatique || حمضيات عطري",
    recipe: "Citron, Romarin, Bois || ليمون، إكليل الجبل، خشب",
    top_notes: ["Sicilian Mandarin", "Frozen Grapefruit", "Bergamot", "Juniper"],
    heart_notes: ["Rosemary", "Rosewood", "Pepper"],
    base_notes: ["Musk", "Incense", "Oakmoss"],
    longevity: "5-7 heures || 5-7 ساعات",
    sillage: "Modéré || معتدل",
    vibe: "Frais et Estival || منعش وصيفي",
    when_to_wear: "Jour et Été || نهار وصيف",
    feeling: "Léger et Rafraîchissant || خفيف ومنعش",
    average_rating: 4.5,
    reviews_count: 143,
    reviews: [
      { author: "Mourad", rating: 5, comment: "Parfait pour l'été!", date: "2026-05-29" },
      { author: "Anas", rating: 4, comment: "Très frais et agréable", date: "2026-05-24" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Mandarin", "Rosemary", "Musk", "Incense"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: false,
    is_trending: false,
    similar_slugs: ["acqua-di-gio", "azzaro-wanted"]
  },
  {
    id: 11,
    name: "Azzaro Wanted",
    slug: "azzaro-wanted",
    brand: "Azzaro",
    gender: "Homme || رجالي",
    short_description: "Audacieux et séduisant || جريء ومغري",
    description: "Azzaro Wanted est un parfum masculin audacieux pour l'homme qui ose. || أزارو وانتد عطر رجالي جريء للرجل الذي يجرؤ.",
    price: 79,
    image_url: null,
    country_of_origin: "France || فرنسا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Aromatique Épicé || عطري حار",
    recipe: "Citron, Cardamome, Tonka || ليمون، هيل، تونكا",
    top_notes: ["Lemon", "Ginger", "Mint", "Lavender"],
    heart_notes: ["Apple", "Juniper", "Guatemalan Cardamom"],
    base_notes: ["Tonka Bean", "Amberwood", "Haitian Vetiver"],
    longevity: "7-9 heures || 7-9 ساعات",
    sillage: "Fort || قوي",
    vibe: "Audacieux et Rebelle || جريء ومتمرد",
    when_to_wear: "Soirée et Occasions || مساء ومناسبات",
    feeling: "Confiant et Séduisant || واثق ومغري",
    average_rating: 4.6,
    reviews_count: 165,
    reviews: [
      { author: "Yassine", rating: 5, comment: "Très puissant et séduisant!", date: "2026-06-02" },
      { author: "Soufiane", rating: 4, comment: "Excellent pour les soirées", date: "2026-05-26" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Lemon", "Cardamom", "Tonka Bean", "Vetiver"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: false,
    is_trending: true,
    similar_slugs: ["invictus", "versace-eros"]
  },
  {
    id: 12,
    name: "Stronger With You",
    slug: "stronger-with-you",
    brand: "Emporio Armani",
    gender: "Homme || رجالي",
    short_description: "Chaleureux et sensuel || دافئ وحسي",
    description: "Stronger With You est un parfum masculin chaleureux et sensuel. || سترونجر ويذ يو عطر رجالي دافئ وحسي.",
    price: 79,
    image_url: null,
    country_of_origin: "Italie || إيطاليا",
    size_options: ["20ml", "30ml", "50ml"],
    stock_status: "En stock || متوفر",
    fragrance_family: "Aromatique Gourmand || عطري حلو",
    recipe: "Cardamome, Sauge, Vanille || هيل، ميرمية، فانيلا",
    top_notes: ["Cardamom", "Pink Pepper", "Violet Leaves"],
    heart_notes: ["Sage", "Melon", "Pineapple", "Cinnamon"],
    base_notes: ["Vanilla", "Tonka Bean", "Suede", "Chestnut"],
    longevity: "8-10 heures || 8-10 ساعات",
    sillage: "Fort || قوي",
    vibe: "Chaleureux et Sensuel || دافئ وحسي",
    when_to_wear: "Soirée et Hiver || مساء وشتاء",
    feeling: "Passionné et Intense || عاطفي وقوي",
    average_rating: 4.8,
    reviews_count: 221,
    reviews: [
      { author: "Reda", rating: 5, comment: "Incroyable! Très chaleureux", date: "2026-06-04" },
      { author: "Ayoub", rating: 5, comment: "Parfait pour l'hiver", date: "2026-05-31" }
    ],
    bottle_images: [],
    packaging_images: [],
    lifestyle_images: [],
    ingredients: ["Cardamom", "Sage", "Vanilla", "Tonka Bean"],
    delivery_info: "Livraison gratuite partout au Maroc || توصيل مجاني في كل المغرب",
    return_policy: "Retour sous 7 jours || إرجاع خلال 7 أيام",
    authenticity_guarantee: "Qualité Master garantie || جودة ماستر مضمونة",
    is_best_seller: false,
    is_trending: true,
    similar_slugs: ["versace-eros", "y-eau-de-parfum"]
  }
];

// Mock orders storage
let mockOrders: AdminOrder[] = [];
let nextOrderId = 1;

// Mock admin user
export const mockAdminUser: User = {
  id: 1,
  name: "Admin",
  email: "admin@example.com",
  role: "admin"
};

// Mock API functions
export const mockApi = {
  getPerfumes: async (): Promise<Perfume[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPerfumes;
  },

  getPerfumeBySlug: async (slug: string): Promise<Perfume | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockPerfumes.find(p => p.slug === slug) || null;
  },

  createOrder: async (orderData: {
    perfume_id: number;
    customer_name: string;
    customer_address: string;
    customer_phone: string;
    quantity: number;
    purchase_option: string;
  }): Promise<OrderResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const perfume = mockPerfumes.find(p => p.id === orderData.perfume_id);
    const prices: Record<string, number> = {
      pack_30ml_x2: 79,
      pack_30ml_x4: 119,
      single_50ml: 79,
      pack_50ml_x3: 149,
      pack_20ml_x5: 139,
    };
    
    const newOrder: AdminOrder = {
      id: nextOrderId++,
      perfume: perfume?.name || null,
      perfume_slug: perfume?.slug || null,
      customer_name: orderData.customer_name,
      customer_address: orderData.customer_address,
      customer_phone: orderData.customer_phone,
      purchase_option: orderData.purchase_option,
      quantity: orderData.quantity,
      total_price: (prices[orderData.purchase_option] || 69) * orderData.quantity,
      status: "pending",
      created_at: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    
    return {
      message: "Commande créée avec succès",
      order: newOrder
    };
  },

  login: async (email: string, password: string): Promise<{ access_token: string; user: User }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    void email;
    void password;
    throw new Error("Mock login is disabled. Use the backend authentication API.");
  },

  getUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAdminUser;
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
  },

  getOrders: async (): Promise<AdminOrder[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockOrders].reverse();
  },

  validateOrder: async (orderId: number): Promise<{ message: string; order: AdminOrder }> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const order = mockOrders.find(o => o.id === orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    
    order.status = "validated";
    
    return {
      message: "Commande validée avec succès",
      order
    };
  }
};
