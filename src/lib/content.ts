import { assets } from "./assets";

export const brand = {
  name: "Orijental",
  tagline: "moja cvećara",
  fullName: "Orijental moja cvećara",
  city: "Niš",
};

export const social = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
} as const;

export const navLinks = [
  { href: "/", label: "Početna" },
  {
    href: "/buketi",
    label: "U ponudi",
    children: [
      { href: "/buketi", label: "Buketi i aranžmani" },
      { href: "/saksisko-cvece", label: "Saksijsko cveće" },
      { href: "/rezano-cvece", label: "Rezano cveće" },
      { href: "/program-za-saucesce", label: "Program za saučešće" },
    ],
  },
  { href: "/o-nama", label: "O Nama" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const locations = [
  {
    name: "Crveni Pevac",
    address: "Ulica Vojvode Mišića 89, Crveni Pevac",
    phone: "+381 18516304",
    tel: "+38118516304",
    hours: "08 h - 22 h",
    maps: "https://maps.app.goo.gl/Lfgg5Z34CzKonaAV7" as string | undefined,
    /** Besplatni Google Maps embed (bez API ključa) */
    mapEmbed:
      "https://maps.google.com/maps?q=43.3195727,21.9059237&z=16&hl=sr&output=embed",
    image: assets.shopPevac,
    href: undefined as string | undefined,
    /** Tamna kartica kao na live /kontakt (Novo Groblje) */
    tone: "default" as "default" | "bw",
  },
  {
    name: "Trg",
    address: "Trg Kralja Aleksandra lokal 9c, Trg",
    phone: "+381 18250200",
    tel: "+38118250200",
    hours: "08 h - 22 h",
    maps: "https://maps.app.goo.gl/LeQjvh8GLnexdBML7" as string | undefined,
    mapEmbed:
      "https://maps.google.com/maps?q=43.3180997,21.8920361&z=16&hl=sr&output=embed",
    image: assets.shopTrg,
    href: undefined as string | undefined,
    tone: "default" as "default" | "bw",
  },
  {
    name: "Novo Groblje",
    address: "Novo Groblje BB lokal br 4, Novo Groblje",
    phone: "+381 184560243",
    tel: "+381184560243",
    hours: "07 h - 16 h",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Novo+Groblje+Niš+cvećara+Orijental" as
        | string
        | undefined,
    mapEmbed:
      "https://maps.google.com/maps?q=Novo+Groblje+Niš+Orijental+cvećara&z=16&hl=sr&output=embed",
    image: assets.shopNovoGroblje,
    href: "/novo-groblje" as string | undefined,
    tone: "bw" as "default" | "bw",
  },
];

export const contacts = [
  { name: "Dejan Vasić", phone: "+381 692802700", tel: "+381692802700" },
  { name: "Aleksandra Vasić", phone: "+381 638609050", tel: "+381638609050" },
  { name: "Uroš Vasić", phone: "+381 628705822", tel: "+381628705822" },
] as const;

export const homeOffers = [
  {
    title: "Buketi za sve prilike",
    text: "Od proslava i posebnih događaja do svakodnevnih trenutaka, naši buketi su kreirani sa pažnjom, kako bi svaki cvet preneo posebnu emociju.",
    href: "/buketi",
    image: assets.galleryBuketi[0],
  },
  {
    title: "Ručno rađeni buketi za 10 minuta",
    text: "U našoj cvećari možete dobiti ručno rađene bukete na licu mesta, spremne za samo 10 minuta. Brzo i kvalitetno, za sve vaše potrebe.",
    href: "/buketi",
    image: assets.galleryBuketi[1],
  },
  {
    title: "Saksijsko cveće",
    text: "Pored cvetnih aranžmana, nudimo i širok asortiman opreme za uzgajanje biljaka, kako biste i u svom domu uživali u zdravim i lepim biljkama.",
    href: "/saksisko-cvece",
    image: assets.gallerySaksijsko[0],
  },
  {
    title: "Program za saučešće",
    text: "Naši pažljivo izrađeni venci za groblja pružaju dostojanstvenu i elegantnu počast vašim najmilijima. Izrađeni od svežeg cveća, simbolizuju ljubav i sećanje.",
    href: "/program-za-saucesce",
    image: assets.homeSplitLeft,
  },
  {
    title: "Dostava na kućnu adresu",
    text: "Neka svežina naših cvetova stigne direktno na vaša vrata. Nudimo brzu i pouzdanu dostavu na kućnu adresu, kako biste uvek imali savršeno cveće pri ruci",
    href: "/kontakt",
    image: assets.galleryBuketi[2],
  },
  {
    title: "Rezano cveće",
    text: "Ulepšajte svaki događaj našim kreativnim cvetnim dekoracijama. Bilo da je reč o venčanju, rođendanu ili poslovnom događaju, naše cvetne kreacije pretvoriće vaš prostor u oazu prirodne lepote.",
    href: "/rezano-cvece",
    image: assets.galleryRezano[0],
  },
] as const;

export type HowStep = {
  title: string;
  text: string;
  cta?: { href: string; label: string };
};

export const howSteps: HowStep[] = [
  {
    title: "Poručite cveće",
    text: "Možete poručiti putem telefona ili Instagrama. Kreirajte specijalnu ponudu ili izaberite iz naše kolekcije.",
    cta: { href: "/kontakt", label: "Odaberite broj telefona" },
  },
  {
    title: "Brza izrada",
    text: "Minimalno vreme izrade aranžmana je 15 minuta. Savršeno za svaku priliku, dostupno brzo i efikasno.",
  },
  {
    title: "Dostava cveća",
    text: "Vaše cveće možete preuzeti na lokaciji ili zakazati dostavu na željenu adresu.",
    cta: { href: "/kontakt", label: "Vidi lokacije" },
  },
];

/** Koraci sa live stranice /program-za-saucesce */
export const howStepsSaucesce: HowStep[] = [
  {
    title: "Poručite cveće",
    text: "Možete poručiti putem telefona ili Instagrama. Kreirajte specijalnu ponudu ili izaberite iz naše kolekcije.",
    cta: { href: "/kontakt", label: "Odaberite broj telefona" },
  },
  {
    title: "Brza izrada",
    text: "Minimalno vreme izrade je 15 minuta. Savršeno za ovu priliku, dostupno brzo i efikasno. Ili odaberite iz ponude.",
  },
  {
    title: "Pokupite u našoj cvećari",
    text: "Preuzmite aranžman u našoj cvećari na odabranoj lokaciji.",
    cta: { href: "/kontakt", label: "Vidi lokaciju" },
  },
];

export type OfferBlock = {
  title: string;
  intro: string;
  points: string[];
  image: string;
};

export const buketiOffers: OfferBlock[] = [
  {
    title: "Klasični buketi",
    intro:
      "Klasični buketi predstavljaju bezvremensku eleganciju i prirodnu lepotu cveća. Savršeni su za sve prilike – od poklona voljenoj osobi do jednostavnog načina da unesete radost u nečiji dan.",
    image: assets.product.klasicniBuketi,
    points: [
      "Buketi sa poljskim cvećem za svežu, prirodnu notu",
      "Buketi sa ružama za romantične prilike",
      "Buketi sa egzotičnim cvetovima za posebne događaje",
      "Dostupni u raznim veličinama, bojama i stilovima, uz mogućnost personalizacije",
    ],
  },
  {
    title: "Flower Box aranžmani",
    intro:
      "Flower box aranžmani nude moderan i luksuzan izgled, smešteni u elegantne kutije koje čuvaju svežinu cveća duže i pružaju savršen poklon za svakoga.",
    image: assets.product.flowerBox,
    points: [
      "Dostupni u raznim oblicima – kvadratnim, okruglim i flower box u obliku srca",
      "Idealni za poklone kao što su godišnjice, rođendani i venčanja",
      "Kutije mogu biti bele, crne, pastelnih tonova ili ukrašene zlatnim detaljima za poseban vizuelni efekat",
      "Kupci mogu birati boje cveća, stil aranžiranja",
    ],
  },
  {
    title: "Aranžmani sa 101 ružom",
    intro:
      "Simbol raskoši i grandioznosti, aranžmani sa 101 ružom predstavljaju najlepši način da izrazite posebnu poruku i pošaljete snažan znak ljubavi, poštovanja ili zahvalnosti.",
    image: assets.product.ruze101,
    points: [
      "Klasične crvene ruže, bele, roze, kao i mogućnosti kombinacije više boja za jedinstven izgled",
      "Idealni za posebne događaje, kao što su jubileji, važne godišnjice, ili kao luksuzni poklon voljenoj osobi",
      "Uz svaki aranžman možete dodati karticu sa personalizovanom porukom, što dodatno pojačava emotivnu vrednost poklona",
      "Aranžmani sa 101 ružom su pažljivo pripremljeni kako bi cveće ostalo sveže što duže, čineći da poklon traje i nastavi da impresionira i danima nakon što je uručen",
    ],
  },
  {
    title: "Aranžmani sa pićem",
    intro:
      "Dodajte sofisticiranu notu svakom cvetnom poklonu uz aranžman sa pićem. Kombinacija luksuznog pića i prelepih cvetova stvara savršen poklon za proslave i posebne prilike.",
    image: assets.product.aranzmanPice,
    points: [
      "Dostupni različiti izbori pića – šampanjac, vino, viski",
      "Ovi aranžmani često traženi za proslave, poslovne događaje, ili kao ekskluzivni pokloni za rođendane i jubileje",
      "Klasične crvene ruže, bele, roze, kao i mogućnosti kombinacije više boja za jedinstven izgled",
    ],
  },
];

export const saksijskoOffers: OfferBlock[] = [
  {
    title: "Sobne Biljke",
    intro:
      "Sobne biljke su idealne za oplemenjivanje unutrašnjih prostora, poboljšavajući kvalitet vazduha i unoseći smirenost prirode. Sa stilovima koji variraju od jednostavnog zelenila do cvetnih aranžmana, sobne biljke su savršen dodatak svakom domu.",
    image: assets.product.saksijskoSobne,
    points: [
      "Monstera, Fikus, Zamija i Spatifilum, koje su prilagođene različitim nivoima svetlosti i brige.",
      "Mogućnost personalizacije saksija u različitim bojama i stilovima, kako bi se biljke savršeno uklopile u bilo koji enterijer",
      "Pahira, Dracena, Juka, Orhideja, Dipsis, Šeflera",
      "Kalatea, Ehmeja, Sanseverija, Krasula",
    ],
  },
  {
    title: "Biljke za Eksterijer",
    intro:
      "Ove biljke su savršene za terase, balkone i bašte, donoseći živopisne boje i mirise spoljašnjem prostoru. Saksijsko cveće za eksterijer idealno je za one koji žele da unesu šarm prirode na otvorenom.",
    image: assets.product.saksijskoEksterijer,
    points: [
      "Lavanda, Geranijum i Begonija koje donose prirodnu živost spoljašnjim prostorima",
      "Savete o sezonskoj brizi i izboru biljaka prema klimatskim uslovima, kako bi kupci mogli da pronađu savršeno rešenje za svoje eksterijere",
      "Cikas i Kupresus",
    ],
  },
  {
    title: "Zelenilo za Poslovni Prostor",
    intro:
      "Biljke za kancelarijski prostor unose prirodnu energiju i poboljšavaju koncentraciju. Ove biljke su jednostavne za održavanje, a prilagođene su poslovnom okruženju gde doprinosi estetici i smirenosti.",
    image: assets.product.saksijskoPoslovni,
    points: [
      "Kaktusa, Sukulenata i Zamija, koje su pogodne za kancelarije sa manje svetlosti",
      "Opcije za personalizaciju saksija, poput minimalističkih ili modernih dizajna, koji će se savršeno uklopiti u poslovno okruženje",
      "Dracena, Šaflera, Sansverija",
      "Dipsis, Pahira, Krasula",
    ],
  },
  {
    title: "Sezonske Saksije",
    intro:
      "Ove biljke prilagođene su godišnjim dobima, donoseći sezonski duh u svaki dom. Bilo da su praznični aranžmani ili prolećni cvetovi, sezonske biljke su savršene za stvaranje topline i radosti tokom cele godine.",
    image: assets.product.saksijskoSezonske,
    points: [
      "Napomeni da je svaka sezonska biljka pažljivo birana i aranžirana kako bi donela prazničnu atmosferu u dom, sa posebnim dekorativnim elementima koji naglašavaju sezonu",
      "Sezonsko začinsko bilje",
      "Sezonska rasada cveća",
    ],
  },
];

export const rezanoOffers: OfferBlock[] = [
  {
    title: "Klasične ruže",
    intro:
      "Ruže su simbol ljubavi i strasti, i kao takve su večni favorit kada su u pitanju pokloni za posebne prilike.",
    image: assets.product.ruze,
    points: [
      "Naša kolekcija rezanih ruža dolazi u raznim bojama i veličinama",
    ],
  },
  {
    title: "Lale i sezonski prolećni cvetovi",
    intro:
      "Lale simbolizuju novi početak i savršen su izbor za prolećne praznike i događaje. Njihova nežna lepota i bogatstvo boja donose svežinu proleća u svaki dom.",
    image: assets.product.lale,
    points: [
      "Različite vrste lale, poput ranih, kasnih i papagaj lale, sa širokim spektrom boja, od bele do tamnocrvene",
      "Sezonske prolećne cvetove kao što su narcisi, zumbuli i frezije",
    ],
  },
  {
    title: "Luksuzni ljiljani",
    intro:
      "Krizanteme su cvetovi koji nose toplinu jeseni, sa bogatstvom oblika i boja koje odlično pristaju sezonskim aranžmanima.",
    image: assets.product.ljiljani,
    points: [
      "Dugotrajne i postojane, čineći ih idealnim za jesenje dekoracije i poklone",
    ],
  },
  {
    title: "Egzotično rezano cveće",
    intro:
      "Egzotično rezano cveće unosi dašak dalekih zemalja i avanture. Idealan je izbor za jedinstvene poklone i moderne dekoracije, dajući prostoru jedinstven izgled i dozu elegancije.",
    image: assets.product.egzoticno,
    points: [
      "Egzotični cvetovi poput orhideja, anthuriuma, protea i strelitzia za sofisticirane i moderne aranžmane",
    ],
  },
];

export const saucesceOffers: OfferBlock[] = [
  {
    title: "Suze",
    intro:
      '"Suza" je specifičan cvetni aranžman namenjen odavanju počasti preminulima tokom sahrana i komemoracija. Ovi aranžmani, često u obliku suze, simbolizuju tugu i sećanje na voljene osobe.',
    image: assets.product.saucesce,
    points: [
      "Aranžmani su obično izduženog oblika koji podseća na suzu, što dodatno naglašava simboliku tuge. Mogu biti postavljeni na kovčeg ili pored grobnog mesta.",
      "U izradi suza koriste se različite vrste cveća, uključujući ljiljane, ruže, gerbere, hrizanteme i kale. Izbor cveća često zavisi od ličnih preferencija ili simbolike koju određeni cvet nosi.",
      "Nudimo mogućnost prilagođavanja suza dodavanjem traka sa porukama, specifičnih cvetnih kombinacija ili boja koje su bile značajne preminuloj osobi.",
    ],
  },
  {
    title: "Tradicionalni Venci",
    intro:
      "Tradicionalni venci predstavljaju simbol večnosti i poštovanja, pažljivo aranžirani sa cvećem koje simbolizuje mir i saosećanje.",
    image: assets.product.saucesce,
    points: [
      "Najčešće korišćeni cvetovi poput belih ljiljana, krizantema i ruža",
      "Opcije u raznim veličinama, sa mogućnostima personalizacije sa dodacima kao što su trake sa porukom ili ime pokojnika",
    ],
  },
  {
    title: "Urne i Korpice sa cvećem",
    intro:
      "Urne i korpice sa cvećem su tiha i skromna opcija koja simbolizuje utehu i prisustvo. Prilagođene su za privatne trenutke sa porodicom i prijateljima, izrađene sa pažljivo odabranim cvetovima koji odražavaju saosećanje.",
    image: assets.product.saucesce,
    points: [
      "Opcija sa belim ružama, irisima i kalama",
      "Jednostavnost i elegancija korpica, koje su prilagođene za postavljanje u crkvama, kapelama ili u kućnom okruženju",
    ],
  },
  {
    title: "Aranžmani u staklu od veštačkog cveća",
    intro:
      "Ovi aranžmani kombinuju estetsku privlačnost sa minimalnim zahtevima za održavanje, što ih čini idealnim za različite prilike i enterijere.",
    image: assets.product.saucesce,
    points: [
      "Dugotrajnost: Veštačko cveće ne vene i zadržava svoj izgled tokom vremena, pružajući trajnu lepotu bez potrebe za redovnim održavanjem.",
      "Jednostavno održavanje: Za razliku od prirodnog cveća, veštački aranžmani ne zahtevaju zalivanje niti specifične uslove osvetljenja. Povremeno brisanje prašine je dovoljno da bi izgledali sveže.",
      "Fleksibilnost dizajna: Dostupni su u različitim stilovima, bojama i veličinama, omogućavajući prilagođavanje svakom enterijeru i ukusu.",
    ],
  },
  {
    title: "Buketi od veštačkog i prirodnog cveća",
    intro:
      "Odavanje počasti preminulima često uključuje polaganje cveća na grobna mesta. Buketi od veštačkog i prirodnog cveća za groblje imaju svoje specifičnosti, prednosti i simboliku.",
    image: assets.saucesceHero,
    points: [
      "Prirodno cveće simbolizuje prolaznost života i pruža autentičnu lepotu i miris. Tradicionalni izbori uključuju ljiljane, ruže i hrizanteme, koji nose posebnu simboliku u kontekstu sećanja i poštovanja.",
      "Veštačko cveće pruža dugotrajnu dekoraciju. Moderne verzije verno oponašaju izgled prirodnog cveća, a otporno je na vremenske uslove, što ga čini pogodnim za dugoročno postavljanje na grobnim mestima.",
    ],
  },
];

export const saucesceIntro = {
  title: "Venac, Suze i Aranžmani za Saučešće – Orijental Moja Cvećara Niš",
  text: "Orijental Moja Cvećara u Nišu nudi elegantne vence, suze i cvetne aranžmane kao cveće za saučešće. Izrađujemo cveće koje izražava vaše najdublje emocije i saosećanje, idealno za odavanje počasti preminulima. Posetite nas na lokacijama Pevac, Novo Groblje i Trg ili naručite dostavu direktno na groblje. Pružite podršku i poštovanje uz našu pažljivo osmišljenu ponudu.",
} as const;

export const aboutHighlights = [
  {
    title: "Dostava cveća",
    text: "Brza i pouzdana dostava cveća na kućnu adresu širom Niša.",
    href: "/kontakt",
  },
  {
    title: "Buketi",
    text: "Širok izbor cvetnih buketa za sve prilike – od venčanja do posebnih događaja.",
    href: "/buketi",
  },
  {
    title: "Saksijsko cveće",
    text: "Raznovrsno saksijsko cveće savršeno za vaš dom ili kancelariju.",
    href: "/saksisko-cvece",
  },
  {
    title: "Rezano cveće",
    text: "Uvek sveže rezano cveće koje se koristi u našim unikatnim aranžmanima.",
    href: "/rezano-cvece",
  },
  {
    title: "Zadovoljne mušterije",
    text: "Naša cvećara je prepoznata po kvalitetu i brojnim zadovoljnim mušterijama u Nišu.",
    href: undefined as string | undefined,
  },
  {
    title: "Lokalna zajednica",
    text: "Kao cvećara sa tradicijom, ključni smo deo cvetne ponude u Nišu.",
    href: undefined as string | undefined,
  },
  {
    title: "Cveće za groblje",
    text: "Ponuda cvetnih aranžmana za dostojanstven poslednji oproštaj.",
    href: "/program-za-saucesce",
  },
  {
    title: "Društvene mreže",
    text: "Pratite nas na Instagramu i Facebooku za inspiraciju i novitete.",
    href: social.instagram,
  },
] as const;
