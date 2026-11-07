// ═══════════════════════════════════════════════════════════════
// CODEHOOT — CODEJS JONLI MULTIPLAYER VIKTORINA (KAHOOT USLUBIDA)
// 20 tagacha o'quvchi bir vaqtda jonli o'ynay oladigan multiplayer tizim
// ═══════════════════════════════════════════════════════════════

// ─── 1. SAVOLLAR BAZASI (KATEGORIYALAR) ─────────────────────────
const CODEHOOT_QUESTIONS = {
  "flags": [
    {
      "q": "Bu qaysi davlatning davlat bayrog'i?",
      "flagCode": "uz",
      "flagEmoji": "🇺🇿",
      "options": [
        "O'zbekiston",
        "Qozog'iston",
        "Turkmaniston",
        "Tojikiston"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Moviy, oq, yashil chiziqlar va yarim oy hamda 12 ta yulduz."
    },
    {
      "q": "Ushbu bayroq qaysi qardosh davlatga tegishli?",
      "flagCode": "tr",
      "flagEmoji": "🇹🇷",
      "options": [
        "Ozarbayjon",
        "Turkiya",
        "Tunis",
        "Singapur"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Qizil fonda oq hilol va yulduz."
    },
    {
      "q": "Markaziy Osiyodagi eng yirik hududga ega qardosh davlat bayrog'i:",
      "flagCode": "kz",
      "flagEmoji": "🇰🇿",
      "options": [
        "Qirg'iziston",
        "Mo'g'uliston",
        "Qozog'iston",
        "Ukraina"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Moviy fonda oltin quyosh, burgut va milliy naqsh."
    },
    {
      "q": "Ushbu 'Yulduzlar va chiziqlar' (Stars and Stripes) qaysi davlat bayrog'i?",
      "flagCode": "us",
      "flagEmoji": "🇺🇸",
      "options": [
        "Buyuk Britaniya",
        "Kanada",
        "Avstraliya",
        "AQSH"
      ],
      "correct": 3,
      "difficulty": "easy",
      "hint": "50 ta yulduz va 13 ta oq-qizil chiziqlar."
    },
    {
      "q": "Kunchiqar mamlakat — bu qaysi davlat bayrog'i?",
      "flagCode": "jp",
      "flagEmoji": "🇯🇵",
      "options": [
        "Yaponiya",
        "Janubiy Koreya",
        "Xitoy",
        "Vetnam"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Oq fonda qizil dumaloq quyosh tasviri."
    },
    {
      "q": "Bu qaysi Yevropa davlatining bayrog'i (qora, qizil, sariq)?",
      "flagCode": "de",
      "flagEmoji": "🇩🇪",
      "options": [
        "Belgiya",
        "Germaniya",
        "Avstriya",
        "Niderlandiya"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Avtomobilsozlik vatani va Yevropaning eng yirik iqtisodiyoti."
    },
    {
      "q": "Ushbu 'Union Jack' bayrog'i qaysi davlatga tegishli?",
      "flagCode": "gb",
      "flagEmoji": "🇬🇧",
      "options": [
        "Avstraliya",
        "Yangi Zelandiya",
        "Buyuk Britaniya",
        "Islandiya"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Angliya, Shotlandiya va Shimoliy Irlandiya xochlari birlashmasi."
    },
    {
      "q": "Futbol vatani va 5 karra jahon chempioni bo'lgan davlat bayrog'i:",
      "flagCode": "br",
      "flagEmoji": "🇧🇷",
      "options": [
        "Argentina",
        "Urugvay",
        "Ispaniya",
        "Braziliya"
      ],
      "correct": 3,
      "difficulty": "easy",
      "hint": "Yashil fonda sariq romb va 'Ordem e Progresso' shiori."
    },
    {
      "q": "Qizil chinor (zarang) bargi qaysi davlat bayrog'ida tasvirlangan?",
      "flagCode": "ca",
      "flagEmoji": "🇨🇦",
      "options": [
        "Kanada",
        "Shveysariya",
        "Daniya",
        "Norvegiya"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Shimoliy Amerikadagi ikkinchi eng katta davlat."
    },
    {
      "q": "Bu qaysi Lotin Amerikasi davlati bayrog'i (quyosh tasviri bilan)?",
      "flagCode": "ar",
      "flagEmoji": "🇦🇷",
      "options": [
        "Chili",
        "Argentina",
        "Kolumbiya",
        "Peru"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Lionel Messi va Diego Maradona vatani."
    },
    {
      "q": "Moviy, oq va qizil vertikal chiziqli 'Trikolor' qaysi davlat bayrog'i?",
      "flagCode": "fr",
      "flagEmoji": "🇫🇷",
      "options": [
        "Italiya",
        "Rossiya",
        "Niderlandiya",
        "Fransiya"
      ],
      "correct": 3,
      "difficulty": "easy",
      "hint": "Eyfel minorasi va Parij shahri joylashgan davlat."
    },
    {
      "q": "Yashil, oq va qizil vertikal chiziqli ushbu mashhur davlat bayrog'i:",
      "flagCode": "it",
      "flagEmoji": "🇮🇹",
      "options": [
        "Italiya",
        "Vengriya",
        "Bolgariya",
        "Irlandiya"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Pitsa, Rim Kolizeyi va Ferrari vatani."
    },
    {
      "q": "Qizil fonda katta sariq yulduz va 4 ta kichik yulduzlar qaysi davlatniki?",
      "flagCode": "cn",
      "flagEmoji": "🇨🇳",
      "options": [
        "Vyetnam",
        "Xitoy",
        "Shimoliy Koreya",
        "Singapur"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Buyuk Xitoy devori va Pekin poytaxti."
    },
    {
      "q": "Oq, ko'k va qizil gorizontal chiziqli ushbu bayroq qaysi davlatniki?",
      "flagCode": "ru",
      "flagEmoji": "🇷🇺",
      "options": [
        "Rossiya",
        "Slovakiya",
        "Sloveniya",
        "Serbiya"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Hududi bo'yicha dunyodagi eng katta davlat."
    },
    {
      "q": "Piramidalar va Nil daryosi vatani bo'lgan arab davlati bayrog'i:",
      "flagCode": "eg",
      "flagEmoji": "🇪🇬",
      "options": [
        "Iroq",
        "Suriya",
        "Misr",
        "Yaman"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Oltin Salohiddin burguti tasviri bilan qizil, oq, qora chiziqlar."
    },
    {
      "q": "Yashil fonda oq arab yozuvi va qilich tasvirlangan muqaddas zamin bayrog'i:",
      "flagCode": "sa",
      "flagEmoji": "🇸🇦",
      "options": [
        "BAA",
        "Saudiya Arabistoni",
        "Qatar",
        "Ummon"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Makka va Madina shaharlari joylashgan podshohlik."
    },
    {
      "q": "Markazida ko'k 'Ashoka Chakra' aravasi g'ildiragi bo'lgan bayroq:",
      "flagCode": "in",
      "flagEmoji": "🇮🇳",
      "options": [
        "Pokiston",
        "Hindiston",
        "Bangladesh",
        "Shri-Lanka"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Dunyo aholisi soni bo'yicha eng yuqori o'rindagi davlat."
    },
    {
      "q": "Qizil-sariq chiziqlar va markazida qirollik gerbi tasvirlangan Yevropa davlati:",
      "flagCode": "es",
      "flagEmoji": "🇪🇸",
      "options": [
        "Portugaliya",
        "Italiya",
        "Ispaniya",
        "Gretsiya"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Real Madrid, Barselona va flamenko vatani."
    },
    {
      "q": "Ushbu bayroq qaysi Kavkazorti qardosh davlatiga tegishli?",
      "flagCode": "az",
      "flagEmoji": "🇦🇿",
      "options": [
        "Gruziya",
        "Turkiya",
        "Ozarbayjon",
        "Turkmaniston"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Moviy, qizil, yashil chiziqlar va sakkiz qirrali yulduz."
    },
    {
      "q": "Oq fonda qizil-ko'k Yin-Yang (Teguk) aylanasi va 4 ta trigramma tasvirlangan bayroq:",
      "flagCode": "kr",
      "flagEmoji": "🇰🇷",
      "options": [
        "Yaponiya",
        "Janubiy Koreya",
        "Tailand",
        "Tayvan"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Samsung, K-Pop va Seul shahri vatani."
    },
    {
      "q": "Dunyodagi yagona TO'RTBURCHAK BO'LMAGAN (uchburchakli) davlat bayrog'i qaysi?",
      "flagCode": "np",
      "flagEmoji": "🇳🇵",
      "options": [
        "Butan",
        "Shveysariya",
        "Vatikan",
        "Nepal"
      ],
      "correct": 3,
      "difficulty": "medium",
      "hint": "Everest cho'qqisi joylashgan tog'li mamlakat."
    },
    {
      "q": "Qizil fonda oq simmetrik xoch tasvirlangan ushbu kvadrat bayroq:",
      "flagCode": "ch",
      "flagEmoji": "🇨🇭",
      "options": [
        "Shveysariya",
        "Daniya",
        "Shvetsiya",
        "Avstriya"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "Banklar, alp tog'lari va mashhur soatlar mamlakati."
    },
    {
      "q": "Moviy fonda sariq Skandinaviya xochi qaysi davlatga tegishli?",
      "flagCode": "se",
      "flagEmoji": "🇸🇪",
      "options": [
        "Finlandiya",
        "Shvetsiya",
        "Norvegiya",
        "Daniya"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Volvo, IKEA va Spotify vatani."
    },
    {
      "q": "Markazida qanotli burgut va ilon ushlagan kaktus gerbi bo'lgan bayroq:",
      "flagCode": "mx",
      "flagEmoji": "🇲🇽",
      "options": [
        "Kolumbiya",
        "Peru",
        "Meksika",
        "Venesuela"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Atsteklar madaniyati va takos taomi yurti."
    },
    {
      "q": "Moviy fonda oq-ko'k chiziqlar va oq xoch tasvirlangan antik davlat:",
      "flagCode": "gr",
      "flagEmoji": "🇬🇷",
      "options": [
        "Kipr",
        "Isroil",
        "Malta",
        "Gretsiya"
      ],
      "correct": 3,
      "difficulty": "medium",
      "hint": "Olimpiada o'yinlari va qadimgi falsafa beshigi."
    },
    {
      "q": "Qizil va yashil qismlardan iborat hamda qadimiy astrolyabiya gerbli Yevropa davlati:",
      "flagCode": "pt",
      "flagEmoji": "🇵🇹",
      "options": [
        "Portugaliya",
        "Ispaniya",
        "Italiya",
        "Braziliya"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "Krishtianu Ronaldu vatani va Lissabon poytaxti."
    },
    {
      "q": "Qizil, oq va ko'k gorizontal chiziqli, lola gullari bilan mashhur Yevropa davlati:",
      "flagCode": "nl",
      "flagEmoji": "🇳🇱",
      "options": [
        "Lyuksemburg",
        "Niderlandiya (Gollandiya)",
        "Fransiya",
        "Belgiya"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Tegirmonlar, kanallar va Amsterdam shahri yurti."
    },
    {
      "q": "Qizil fonda moviy Skandinaviya xochi (fyordlar vatani):",
      "flagCode": "no",
      "flagEmoji": "🇳🇴",
      "options": [
        "Islandiya",
        "Daniya",
        "Norvegiya",
        "Shvetsiya"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Vikinglar tarixi, qutb yog'dusi va Osloning vatani."
    },
    {
      "q": "Oq fonda moviy xoch tasvirlangan 'Ming ko'llar mamlakati':",
      "flagCode": "fi",
      "flagEmoji": "🇫🇮",
      "options": [
        "Islandiya",
        "Estoniya",
        "Latviya",
        "Finlandiya"
      ],
      "correct": 3,
      "difficulty": "medium",
      "hint": "Nokia, sauna va eng baxtli davlat deb topilgan yurt."
    },
    {
      "q": "Oq va qizil gorizontal ikkita chiziqli, Varshava poytaxti bo'lgan davlat:",
      "flagCode": "pl",
      "flagEmoji": "🇵🇱",
      "options": [
        "Polsha",
        "Monako",
        "Indoneziya",
        "Singapur"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "Kopernik va Shopen tug'ilgan Markaziy Yevropa davlati."
    },
    {
      "q": "Qizil, yashil, oq va qora chiziqli, Dubay va Abu-Dabi joylashgan boy davlat:",
      "flagCode": "ae",
      "flagEmoji": "🇦🇪",
      "options": [
        "Qatar",
        "BAA (Birlashgan Arab Amirliklari)",
        "Kuvayt",
        "Iordaniya"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Burj Xalifa minorasi qad ko'targan zamonaviy mamlakat."
    },
    {
      "q": "Oq fonda bitta katta qizil xoch va to'rtta kichik xochlar tasvirlangan bayroq:",
      "flagCode": "ge",
      "flagEmoji": "🇬🇪",
      "options": [
        "Armaniston",
        "Gretsiya",
        "Gruziya",
        "Malta"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Tbilisi poytaxti, Kazbek tog'i va mehmondo'st Kavkaz yurti."
    },
    {
      "q": "Moviy fonda Janubiy Xoch yulduzlari va katta 7 qirrali Hamdo'stlik yulduzi:",
      "flagCode": "au",
      "flagEmoji": "🇦🇺",
      "options": [
        "Yangi Zelandiya",
        "Fiji",
        "Tuvalu",
        "Avstraliya"
      ],
      "correct": 3,
      "difficulty": "medium",
      "hint": "Kenguru, koala va Sidney opera teatri yurti."
    },
    {
      "q": "Moviy fonda 4 ta QIZIL yulduzlar (oq hoshiyali) tasvirlangan okean orti davlati:",
      "flagCode": "nz",
      "flagEmoji": "🇳🇿",
      "options": [
        "Yangi Zelandiya",
        "Avstraliya",
        "Samoa",
        "Papua-Yangi Gvineya"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "Kivi qushi vatani va 'Uzuklar hukmdori' filmi suratga olingan yurt."
    },
    {
      "q": "Qizil fonda yashil 5 qirrali Sulaymon muhri (yulduz) tasvirlangan shimoliy Afrika davlati:",
      "flagCode": "ma",
      "flagEmoji": "🇲🇦",
      "options": [
        "Jazoir",
        "Marokash",
        "Tunis",
        "Liviya"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Kasablanka, Marrakesh shaharlari va atlas tog'lari."
    },
    {
      "q": "Moviy fonda oq hoshiyali qizil xoch tasvirlangan geyzerlar va muzliklar oroli:",
      "flagCode": "is",
      "flagEmoji": "🇮🇸",
      "options": [
        "Irlandiya",
        "Grenlandiya",
        "Islandiya",
        "Farer orollari"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Vulqonlar va muzliklar mamlakati, poytaxti Reykyavik."
    },
    {
      "q": "To'q qirmizi (marun) rangda, oq qismida 9 ta tishli arra chizig'i bo'lgan boy davlat:",
      "flagCode": "qa",
      "flagEmoji": "🇶🇦",
      "options": [
        "Bahrayn",
        "Qatar",
        "Ummon",
        "Yaman"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Jahon Chempionati 2022 o'tkazilgan Doha shahrining yurti."
    },
    {
      "q": "Qizil va oq qismli, 5 ta tishli arra chizig'iga ega Fors ko'rfazi orol-davlati:",
      "flagCode": "bh",
      "flagEmoji": "🇧🇭",
      "options": [
        "Qatar",
        "Bahrayn",
        "Quvayt",
        "Kipr"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Poytaxti Manama bo'lgan kichik qirollik (5 ta tish 5 arkonni bildiradi)."
    },
    {
      "q": "Qizil fonda katta sariq 5 qirrali yulduz tasvirlangan Janubi-Sharqiy Osiyo davlati:",
      "flagCode": "vn",
      "flagEmoji": "🇻🇳",
      "options": [
        "Kambodja",
        "Laos",
        "Vyetnam",
        "Birma"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Xanoy poytaxti va mashhur Halong ko'rfazi joylashgan yurt."
    },
    {
      "q": "Qizil, oq, moviy, oq, qizil gorizontal chiziqli 'Trairanga' qaysi davlat bayrog'i?",
      "flagCode": "th",
      "flagEmoji": "🇹🇭",
      "options": [
        "Kosta-Rika",
        "Tailand",
        "Malayziya",
        "Indoneziya"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Hech qachon mustamlaka bo'lmagan Bangkok poytaxtli qirollik."
    },
    {
      "q": "Tepasi qizil, pasti oq bo'lgan ushbu bayroq 17 ming orolli ulkan musulmon davlatiga tegishli:",
      "flagCode": "id",
      "flagEmoji": "🇮🇩",
      "options": [
        "Monako",
        "Polsha",
        "Indoneziya",
        "Singapur"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Monako bayrog'iga juda o'xshash, lekin nisbati 2:3, poytaxti Jakarta."
    },
    {
      "q": "14 ta qizil-oq chiziq va moviy to'rtburchakda sariq hilol hamda 14 qirrali yulduz:",
      "flagCode": "my",
      "flagEmoji": "🇲🇾",
      "options": [
        "AQSH",
        "Liberiya",
        "Malayziya",
        "Filippin"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Petronas egizak minoralari joylashgan Kuala-Lumpur vatani."
    },
    {
      "q": "Qizil va oq qismida oq hilol va 5 ta yulduz doira shaklida tasvirlangan orol-shahar davlati:",
      "flagCode": "sg",
      "flagEmoji": "🇸🇬",
      "options": [
        "Singapur",
        "Bruney",
        "Gonkong",
        "Tayvan"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "Dunyodagi eng toza va xavfsiz texnologik megalopolis."
    },
    {
      "q": "Moviy-oq chiziqlar, qizil uchburchak va ichida oq yulduz bo'lgan 'Ozodlik oroli':",
      "flagCode": "cu",
      "flagEmoji": "🇨🇺",
      "options": [
        "Puerto-Riko",
        "Kuba",
        "Filippin",
        "Dominikana"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Gavana poytaxti, retro avtomobillari va Karib dengizi oroli."
    },
    {
      "q": "Pasti qizil, tepasi oq va moviy kvadratda oq yulduz tasvirlangan Janubiy Amerika davlati:",
      "flagCode": "cl",
      "flagEmoji": "🇨🇱",
      "options": [
        "Texas",
        "Chili",
        "Paragvay",
        "Urugvay"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Dunyodagi eng uzun va ingichka davlat, poytaxti Santyago."
    },
    {
      "q": "Qizil, oq va qizil vertikal chiziqlardan iborat And tog'lari davlati bayrog'i:",
      "flagCode": "pe",
      "flagEmoji": "🇵🇪",
      "options": [
        "Kanada",
        "Avstriya",
        "Peru",
        "Boliviya"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Inklar afsonaviy shahri Machu-Pikchu joylashgan yurt."
    },
    {
      "q": "Sariq (yarmi keng), moviy va qizil gorizontal chiziqli Janubiy Amerika davlati:",
      "flagCode": "co",
      "flagEmoji": "🇨🇴",
      "options": [
        "Ekvador",
        "Venesuela",
        "Kolumbiya",
        "Panama"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Sariq rang oltin va boylikni bildiradi, poytaxti Bogota."
    },
    {
      "q": "Qizil, oq va qizil gorizontal uch chiziqli, dunyodagi eng qadimiy bayroqlardan biri:",
      "flagCode": "at",
      "flagEmoji": "🇦🇹",
      "options": [
        "Latviya",
        "Livan",
        "Avstriya",
        "Polsha"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Motsart vatani va Vena klassik musiqasi yurti."
    },
    {
      "q": "Qora, sariq va qizil vertikal chiziqli, Yevropa Ittifoqi bosh qarorgohi joylashgan davlat:",
      "flagCode": "be",
      "flagEmoji": "🇧🇪",
      "options": [
        "Germaniya",
        "Belgiya",
        "Niderlandiya",
        "Ruminiya"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Shokolad, vafli va Bryussel shahri joylashgan qirollik."
    },
    {
      "q": "Dunyodagi eng qadimgi, 1219-yildan beri uzluksiz qo'llanib kelinayotgan bayroq (Dannebrog):",
      "flagCode": "dk",
      "flagEmoji": "🇩🇰",
      "options": [
        "Shvetsiya",
        "Daniya",
        "Norvegiya",
        "Angliya"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Qizil fonda oq Skandinaviya xochi, Kopengagen poytaxti."
    },
    {
      "q": "Yashil, oq va to'q sariq vertikal chiziqli 'Zumrad orol' davlati:",
      "flagCode": "ie",
      "flagEmoji": "🇮🇪",
      "options": [
        "Kot-d'Ivuar",
        "Italiya",
        "Irlandiya",
        "Hindiston"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Dublin poytaxti, kletka musiqasi va Avliyo Patrik bayrami vatani."
    },
    {
      "q": "Qizil-oq katakli (shaxmat doskasidek) qalqon gerbli chiroyli Adriatika davlati bayrog'i:",
      "flagCode": "hr",
      "flagEmoji": "🇭🇷",
      "options": [
        "Slovakiya",
        "Serbiya",
        "Sloveniya",
        "Xorvatiya"
      ],
      "correct": 3,
      "difficulty": "hard",
      "hint": "Luka Modrich vatani va Dubrovnik qal'asi joylashgan yurt."
    },
{
    "q": "To'q ko'k, sariq va qizil vertikal chiziqli, Ruminiya bayrog'iga 99% o'xshash bo'lgan Markaziy Afrika davlati:",
    "flagCode": "td",
    "flagEmoji": "🇹🇩",
    "options": [
        "Chad",
        "Ruminiya",
        "Moldova",
        "Andorra"
    ],
    "correct": 0,
    "difficulty": "hard",
    "hint": "Poytaxti Njamena bo'lgan, ko'k rangi Ruminiyanikidan bir oz to'qroq bo'lgan davlat."
},
{
    "q": "Moviy, sariq va qizil chiziqlar o'rtasida ko'kragida qalqon tutgan burgut gerbi bor Yevropa davlati:",
    "flagCode": "md",
    "flagEmoji": "🇲🇩",
    "options": [
        "Ruminiya",
        "Moldova",
        "Andorra",
        "Chad"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Kishinyov poytaxti va Dnestr bo'yi o'lkasi."
},
{
    "q": "Moviy, sariq va qizil chiziqlar o'rtasida 'Virtus Unita Fortior' shiorli knyazlik gerbi tasvirlangan Pireney davlati:",
    "flagCode": "ad",
    "flagEmoji": "🇦🇩",
    "options": [
        "Monako",
        "Andorra",
        "Lixtenshteyn",
        "San-Marino"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Fransiya va Ispaniya o'rtasidagi baland tog'li mitti knyazlik."
},
{
    "q": "AQSH bayrog'iga juda o'xshash, lekin faqat 1 dona oq yulduz va 11 ta chiziqdan iborat G'arbiy Afrika davlati:",
    "flagCode": "lr",
    "flagEmoji": "🇱🇷",
    "options": [
        "Liberiya",
        "Malayziya",
        "Togo",
        "AQSH"
    ],
    "correct": 0,
    "difficulty": "hard",
    "hint": "Ozod qilingan sobiq qullar tomonidan tashkil etilgan, poytaxti Monroviya."
},
{
    "q": "To'q sariq, oq va yashil vertikal chiziqli (Irlandiya bayrog'ining teskarisi) Afrika davlati:",
    "flagCode": "ci",
    "flagEmoji": "🇨🇮",
    "options": [
        "Kot-d'Ivuar",
        "Irlandiya",
        "Niger",
        "Italiya"
    ],
    "correct": 0,
    "difficulty": "hard",
    "hint": "Didiye Drogba vatani va dunyodagi eng yirik kakao yetishtiruvchi mamlakat."
},
{
    "q": "Oq, ko'k, qizil gorizontal chiziqlar va chapida oq ikki tasmali xochli qizil qalqon gerbi bor davlat:",
    "flagCode": "sk",
    "flagEmoji": "🇸🇰",
    "options": [
        "Sloveniya",
        "Slovakiya",
        "Rossiya",
        "Chexiya"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Bratislava poytaxti va Tatra tog'lari yurti."
},
{
    "q": "Oq, ko'k, qizil chiziqlar va chap tepasida uch cho'qqili Triglav tog'i gerbi tasvirlangan Yevropa davlati:",
    "flagCode": "si",
    "flagEmoji": "🇸🇮",
    "options": [
        "Slovakiya",
        "Xorvatiya",
        "Sloveniya",
        "Serbiya"
    ],
    "correct": 2,
    "difficulty": "hard",
    "hint": "Lyublyana poytaxti va mashhur Bled ko'li joylashgan yashil o'lka."
},
{
    "q": "Oq va och ko'k gorizontal chiziqlar hamda uchta qasr minorasi tasvirlangan dunyodagi eng qadimiy respublika:",
    "flagCode": "sm",
    "flagEmoji": "🇸🇲",
    "options": [
        "San-Marino",
        "Vatikan",
        "Monako",
        "Malta"
    ],
    "correct": 0,
    "difficulty": "hard",
    "hint": "Italiya hududi bilan o'rab olingan Titano tog'i etagidagi respublika."
},
{
    "q": "Ko'k va qizil gorizontal chiziqlar hamda chap tepasida oltin gersog toji tasvirlangan boy Alp davlati:",
    "flagCode": "li",
    "flagEmoji": "🇱🇮",
    "options": [
        "Lixtenshteyn",
        "Lyuksemburg",
        "Monako",
        "Avstriya"
    ],
    "correct": 0,
    "difficulty": "hard",
    "hint": "Poytaxti Vaduts bo'lgan, Shveysariya va Avstriya o'rtasidagi bankirlar yurti."
},
{
    "q": "Sariq va to'q sariq fonda oq Druk (momaqaldiroq ajdari) tasvirlangan Himoloy qirolligi:",
    "flagCode": "bt",
    "flagEmoji": "🇧🇹",
    "options": [
        "Nepal",
        "Butan",
        "Tibet",
        "Myanma"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Yalpi Milliy Baxt indeksini yurituvchi, poytaxti Thimphu bo'lgan sirli qirollik."
},
{
    "q": "Moviy fonda (Tinch okeani) o'rtadan chaproqda to'lin sariq oy tasvirlangan orol-davlat:",
    "flagCode": "pw",
    "flagEmoji": "🇵🇼",
    "options": [
        "Yaponiya",
        "Bangladesh",
        "Palau",
        "Mikroneziya"
    ],
    "correct": 2,
    "difficulty": "hard",
    "hint": "Jellifish ko'li va go'zal marjon riflari bilan mashhur Mikroneziya oroli."
},
{
    "q": "Moviy, sariq, qizil chiziqlar o'rtasida qora-oq jangovar qalqon va nayzalar tasvirlangan Afrika qirolligi:",
    "flagCode": "sz",
    "flagEmoji": "🇸🇿",
    "options": [
        "Lesoto",
        "Esvatini (Svazilend)",
        "Keniya",
        "Uganda"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Janubiy Afrikadagi mutlaq monarxiya, ilgari Svazilend deb atalgan."
},
{
    "q": "Moviy fonda qora, oq va sariq uchburchakli egizak Piton vulqon cho'qqilari tasvirlangan Karib oroli:",
    "flagCode": "lc",
    "flagEmoji": "🇱🇨",
    "options": [
        "Sent-Lyusiya",
        "Barbados",
        "Grenada",
        "Bagam orollari"
    ],
    "correct": 0,
    "difficulty": "hard",
    "hint": "Ayol kishi nomi bilan atalgan dunyodagi yagona suveren davlat."
},
{
    "q": "Qizil, ko'k, sariq va yashil 4 ta gorizontal yorqin chiziqdan iborat Hind okeanidagi jannatmonand orol:",
    "flagCode": "mu",
    "flagEmoji": "🇲🇺",
    "options": [
        "Seyshel orollari",
        "Mavrikiy",
        "Madagaskar",
        "Maldiv orollari"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Afsonaviy Dodo qushi vatani bo'lgan, poytaxti Port-Lui bo'lgan orol."
},
{
    "q": "Qizil, oq va och havorang chiziqlardan iborat boy Yevropa Buyuk Gertsogligi:",
    "flagCode": "lu",
    "flagEmoji": "🇱🇺",
    "options": [
        "Niderlandiya",
        "Lyuksemburg",
        "Fransiya",
        "Paragvay"
    ],
    "correct": 1,
    "difficulty": "hard",
    "hint": "Niderlandiya bayrog'iga juda o'xshash, lekin pastki chizig'i och ko'k (havorang)."
}
  ],
  "javascript": [
    {
      "q": "JavaScript-da o'zgarmas (qayta qiymat berib bo'lmaydigan) o'zgaruvchi qaysi kalit so'z bilan e'lon qilinadi?",
      "options": [
        "var",
        "let",
        "const",
        "static"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "'const' bilan e'lon qilingan o'zgaruvchining qiymatini to'g'ridan-to'g'ri qayta tenglab bo'lmaydi."
    },
    {
      "q": "JavaScript-da qat'iy tenglik (qiymat va data type-ni bir vaqtda tekshiruvchi) operatori qaysi?",
      "options": [
        "==",
        "===",
        "=",
        "!="
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "'===' operatori tiplarni avtomatik o'girmasdan qat'iy tekshiradi."
    },
    {
      "q": "Brauzer konsoliga xabar yoki ma'lumot chiqarish uchun qaysi buyruq ishlatiladi?",
      "options": [
        "print()",
        "echo()",
        "console.log()",
        "system.out()"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Dasturchilar kodni tekshirish (debug) uchun eng ko'p ishlatadigan buyruq."
    },
    {
      "q": "Massivning (Array) oxiriga yangi element qo'shish uchun qaysi metod ishlatiladi?",
      "options": [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "'push()' massiv oxiriga qo'shadi, 'pop()' esa oxiridan o'chiradi."
    },
    {
      "q": "Massivdagi elementlar sonini aniqlash uchun qaysi xususiyat (property) tekshiriladi?",
      "options": [
        "size",
        "count",
        "length",
        "index"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "arr.length massivdagi umumiy elementlar sonini qaytaradi."
    },
    {
      "q": "JavaScript-da matnlar (String) qanday belgilar ichida yoziladi?",
      "options": [
        "Faqat qo'shtirnoq \"\"",
        "Faqat bittalik tirnoq ''",
        "Faqat backtick ``",
        "Uchala turdagi tirnoqlarda ham"
      ],
      "correct": 3,
      "difficulty": "easy",
      "hint": "JavaScriptda \"\", '', va `` (template literal) belgilaridan foydalanish mumkin."
    },
    {
      "q": "Ushbu ifodaning natijasi nima bo'ladi: 5 + '5'?",
      "options": [
        "10",
        "'55'",
        "NaN",
        "Error"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Son va matn '+' orqali qo'shilganda ular birlashtiriladi (konkatenatsiya)."
    },
    {
      "q": "Massivning birinchi elementining indeksi nechi bilan boshlanadi?",
      "options": [
        "0",
        "1",
        "-1",
        "ixtiyoriy"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Dasturlashda ko'plab tillar kabi indeksatsiya noldan (0) boshlanadi."
    },
    {
      "q": "Quyidagilardan qaysi biri mantiqiy (Boolean) qiymat hisoblanadi?",
      "options": [
        "'true'",
        "1",
        "true",
        "yes"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Boolean tipi faqat ikkita qiymatga ega: true yoki false."
    },
    {
      "q": "Bir qatorli izoh (comment) qoldirish uchun qaysi belgi ishlatiladi?",
      "options": [
        "<!-- -->",
        "//",
        "/* */",
        "#"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "// belgisi qator oxirigacha bo'lgan matnni izohga aylantiradi."
    },
    {
      "q": "Quyidagi kod natijasi nima bo'ladi: Boolean('')?",
      "options": [
        "true",
        "false",
        "undefined",
        "null"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Bo'sh matn '' JavaScript-da falsy qiymat hisoblanadi."
    },
    {
      "q": "Matn ichiga o'zgaruvchilarni qulay joylashtirish (${name}) nima deb ataladi?",
      "options": [
        "String slicing",
        "Template Literals",
        "Regex",
        "Destructuring"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Backtick (``) bilan yoziladigan qulay andoza matnlar."
    },
    {
      "q": "Massivning birinchi elementini olib tashlash (o'chirish) uchun qaysi metod ishlatiladi?",
      "options": [
        "pop()",
        "shift()",
        "slice()",
        "splice()"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "'shift()' boshidan o'chiradi, 'unshift()' boshiga qo'shadi."
    },
    {
      "q": "Funksiyadan qiymat qaytarish uchun qaysi kalit so'z ishlatiladi?",
      "options": [
        "send",
        "output",
        "return",
        "give"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "'return' buyrug'i funksiya natijasini qaytaradi va funksiyani yakunlaydi."
    },
    {
      "q": "Matnni kichik harflarga o'tkazish uchun qaysi metod qo'llaniladi?",
      "options": [
        "toLower()",
        "toLowerCase()",
        "caseLower()",
        "downCase()"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "str.toLowerCase() barcha harflarni kichik registrga o'tkazadi."
    },
    {
      "q": "JavaScript-da 'typeof NaN' nimani qaytaradi?",
      "code": "console.log(typeof NaN);",
      "options": [
        "'undefined'",
        "'number'",
        "'NaN'",
        "'object'"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "NaN 'Not a Number' bo'lsa-da, u texnik jihatdan raqamli data type hisoblanadi."
    },
    {
      "q": "Ushbu kod konsolga nima chiqaradi: 0.1 + 0.2 === 0.3?",
      "code": "console.log(0.1 + 0.2 === 0.3);",
      "options": [
        "true",
        "false",
        "undefined",
        "TypeError"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "IEEE 754 suzuvchi nuqtali sonlar xatoligi tufayli 0.1 + 0.2 = 0.30000000000000004 bo'ladi."
    },
    {
      "q": "Massivning har bir elementini o'zgartirib, yangi massiv hosil qiluvchi metod:",
      "options": [
        "forEach()",
        "map()",
        "filter()",
        "reduce()"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "'map()' har bir element uchun natija yig'ib yangi massiv qaytaradi."
    },
    {
      "q": "Ushbu kod natijasi nima bo'ladi: typeof null?",
      "code": "console.log(typeof null);",
      "options": [
        "'null'",
        "'undefined'",
        "'object'",
        "'boolean'"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Bu JavaScript-ning ilk versiyalaridan qolgan tarixiy xato (bug) hisoblanadi."
    },
    {
      "q": "Massivdan shartga mos keluvchi elementlarni saralab oluvchi metod qaysi?",
      "options": [
        "find()",
        "filter()",
        "some()",
        "every()"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "'filter()' faqat callback funksiyasi true qaytargan elementlarni yangi massivga yig'adi."
    },
    {
      "q": "Quyidagi kod konsolga nima chiqaradi: NaN === NaN?",
      "code": "console.log(NaN === NaN);",
      "options": [
        "true",
        "false",
        "NaN",
        "TypeError"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "JavaScript-da NaN o'ziga ham teng bo'lmagan yagona qiymatdir."
    },
    {
      "q": "Ushbu kod konsolga nima chiqaradi: [] + []?",
      "code": "console.log([] + []);",
      "options": [
        "[]",
        "'' (bo'sh matn)",
        "0",
        "undefined"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Ikkita massiv qo'shilganda ular avval bo'sh string '' ga aylanadi va '' hosil bo'ladi."
    },
    {
      "q": "Massiv elementlarining bitta yakuniy qiymatini (masalan, yig'indisini) hisoblash uchun qaysi metod ishlatiladi?",
      "options": [
        "map()",
        "filter()",
        "reduce()",
        "sort()"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "'reduce()' akkumulyator orqali barcha elementlarni bitta qiymatga keltirib beradi."
    },
    {
      "q": "ES6 Destructuring orqali obyekt xususiyatlarini olish to'g'ri ko'rsatilgan qator:",
      "code": "const user = { name: 'Ali', age: 20 };",
      "options": [
        "const { name, age } = user;",
        "const [ name, age ] = user;",
        "const user = { name, age };",
        "const ( name, age ) = user;"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "Obyektlardan xususiyatlarni ajratib olish uchun jingalak qavslar {} ishlatiladi."
    },
    {
      "q": "Spread operatori qaysi belgi bilan belgilanadi?",
      "options": [
        "...",
        "&&&",
        "===",
        ">>>"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "... belgisi massiv yoki obyekt elementlarini yoyib chiqishga yordam beradi."
    },
    {
      "q": "JSON matnini JavaScript obyektiga aylantirish uchun qaysi metod chaqiriladi?",
      "options": [
        "JSON.stringify()",
        "JSON.parse()",
        "JSON.toObject()",
        "JSON.decode()"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "JSON.parse() matnni obyektga, JSON.stringify() esa obyektni matnga aylantiradi."
    },
    {
      "q": "Quyidagi kod konsolga nima chiqaradi: typeof typeof 1?",
      "code": "console.log(typeof typeof 1);",
      "options": [
        "'number'",
        "'string'",
        "'undefined'",
        "'object'"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "typeof 1 -> 'number'. 'number' esa matn bo'lgani uchun uning tipi 'string'."
    },
    {
      "q": "Funksiyaga berilgan noma'lum miqdordagi argumentlarni massiv ko'rinishida qabul qilish nima deb ataladi?",
      "options": [
        "Spread operator",
        "Rest parameter (...args)",
        "Destructuring",
        "Currying"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Funksiya parametrida yozilgan ...args 'rest' parametri hisoblanadi."
    },
    {
      "q": "Asinxron operatsiyalar bilan qulay ishlash uchun ES8 da qaysi sintaksis kiritilgan?",
      "options": [
        "callback & promise",
        "async / await",
        "yield / next",
        "try / catch"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "async funksiya va await operatori Promise bilan sinxron ko'rinishda ishlash imkonini beradi."
    },
    {
      "q": "Obyektning barcha kalitlarini (keys) massiv sifatida qaytaruvchi buyruq:",
      "options": [
        "Object.values()",
        "Object.entries()",
        "Object.keys()",
        "Object.get()"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "Object.keys(obj) obyektning barcha o'z nomlarini massiv qilib beradi."
    },
    {
      "q": "Ushbu kod konsolga qaysi tartibda sonlarni chiqaradi?",
      "code": "console.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);",
      "options": [
        "1, 2, 3, 4",
        "1, 4, 3, 2",
        "1, 4, 2, 3",
        "1, 3, 4, 2"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Sinxron kod (1, 4) -> Microtask/Promise (3) -> Macrotask/setTimeout (2) bajariladi."
    },
    {
      "q": "JavaScript-da Closure (yopilish) nima?",
      "options": [
        "Funksiyaning o'zini o'zi chaqirishi",
        "Ichki funksiyaning o'zidan tashqaridagi (lexical scope) o'zgaruvchilarni eslab qolishi",
        "Xatolik yuz berganda dastur to'xtashi",
        "Kodni fayl oxirida avtomatik yopilishi"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Funksiya o'zining tashqi o'rab turgan doirasi xotirasini saqlab qoladi."
    },
    {
      "q": "Ushbu kod konsolga nima chiqaradi?",
      "code": "var a = 10;\nfunction test() {\n  console.log(a);\n  var a = 20;\n}\ntest();",
      "options": [
        "10",
        "20",
        "undefined",
        "ReferenceError"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "Ichki funksiya ichida 'var a' hoisted bo'ladi, lekin unga qiymat berilmaguncha u undefined bo'ladi."
    },
    {
      "q": "Arrow function (strelkali funksiya) va oddiy function o'rtasidagi eng asosiy farq qaysi?",
      "options": [
        "Arrow function tezroq ishlaydi",
        "Arrow function o'zining shaxsiy 'this' kontekstiga ega emas (lexical this)",
        "Arrow function ichida return yozib bo'lmaydi",
        "Arrow function faqat bitta parametr qabul qiladi"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Arrow funksiya 'this' ni o'zi joylashgan tashqi doiradan oladi."
    },
    {
      "q": "Quyidagi kod natijasi nima bo'ladi?",
      "code": "const a = [1, 2, 3];\nconst b = a;\nb.push(4);\nconsole.log(a.length);",
      "options": [
        "3",
        "4",
        "undefined",
        "TypeError"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Massivlar va obyektlar havolaviy (by reference) nusxalanadi, shuning uchun 'a' va 'b' bitta xotiraga ishora qiladi."
    },
    {
      "q": "Funksiyaning 'this' kontekstini biriktirib, yangi funksiya qaytaruvchi metod:",
      "options": [
        "call()",
        "apply()",
        "bind()",
        "attach()"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "'bind()' darhol bajarmaydi, 'this' qotirilgan yangi funksiya qaytaradi."
    },
    {
      "q": "Temporal Dead Zone (TDZ) qaysi o'zgaruvchilarga tegishli?",
      "options": [
        "var va function",
        "let va const",
        "faqat global o'zgaruvchilar",
        "faqat massivlar"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "let va const e'lon qilinishidan oldin murojaat qilinsa ReferenceError beradi."
    },
    {
      "q": "Ushbu kod konsolga nima chiqaradi?",
      "code": "console.log(1 < 2 < 3);\nconsole.log(3 > 2 > 1);",
      "options": [
        "true, true",
        "true, false",
        "false, true",
        "false, false"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "1 < 2 -> true (1). 1 < 3 -> true. Lekin 3 > 2 -> true (1). 1 > 1 -> false!"
    },
    {
      "q": "Obyektni 'muzlatib' (xususiyat qo'shib, o'chirib yoki o'zgartirib bo'lmaydigan qilib) qo'yish usuli:",
      "options": [
        "Object.seal()",
        "Object.freeze()",
        "Object.lock()",
        "Object.protect()"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Object.freeze(obj) obyektni o'zgarmas (immutable) holatga keltiradi."
    },
    {
      "q": "Quyidagi kod konsolga nima chiqaradi?",
      "code": "console.log([] == ![]);",
      "options": [
        "true",
        "false",
        "TypeError",
        "undefined"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "![] -> false. [] == false da ikkala tomon ham 0 raqamiga o'giriladi: 0 == 0 -> true!"
    },
    {
      "q": "JavaScript-da takrorlanmas (unique) qiymatlar to'plamini saqlovchi ES6 tuzilmasi:",
      "options": [
        "Map",
        "Set",
        "WeakMap",
        "Object"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Set ichiga bir xil elementni ikki marta qo'shib bo'lmaydi."
    },
    {
      "q": "Quyidagi kod konsolga nima chiqaradi?",
      "code": "let x = 10;\n(() => {\n  x = 20;\n  console.log(x);\n})();\nconsole.log(x);",
      "options": [
        "20, 10",
        "20, 20",
        "undefined, 10",
        "ReferenceError"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Funksiya tashqi 'x' o'zgaruvchisini 20 ga o'zgartiradi, shuning uchun ikkisi ham 20 bo'ladi."
    },
    {
      "q": "Currying (karring) nima?",
      "options": [
        "Kodni minifikatsiya qilish usuli",
        "Ko'p argumentli funksiyani bittadan argument oluvchi zanjirli funksiyalarga aylantirish",
        "Massivlarni tezkor saralash algoritmi",
        "Xatolarni ushlab qoluvchi blok"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "f(a, b, c) o'rniga f(a)(b)(c) tarzida chaqirish imkonini beruvchi funktsional usul."
    },
    {
      "q": "Event Bubbling (hodisaning ko'pirib ko'tarilishi)ni to'xtatish uchun nima chaqiriladi?",
      "options": [
        "e.preventDefault()",
        "e.stopPropagation()",
        "e.stopImmediate()",
        "return false"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "stopPropagation() hodisaning ota elementlarga uzatilishini to'xtatadi."
    },
    {
      "q": "Ushbu kod konsolga nima chiqaradi?",
      "code": "console.log(+true, !'test');",
      "options": [
        "1, false",
        "true, false",
        "NaN, true",
        "1, true"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "Unary plus (+true) 1 ga aylanadi. !'test' esa bo'sh bo'lmagan matnni inkor qilib false beradi."
    }
  ],
  "web": [
    {
      "q": "HTML qisqartmasining to'liq ma'nosi nima?",
      "options": [
        "HyperText Markup Language",
        "HighText Machine Language",
        "Hyperlink Text Mode Language",
        "Home Tool Markup Language"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Veb-sahifalarning tuzilishini belgilovchi gipermatnli belgilar tili."
    },
    {
      "q": "Veb-sahifaga boshqa sahifaga havola (link) qo'yish uchun qaysi teg ishlatiladi?",
      "options": [
        "<link>",
        "<a>",
        "<href>",
        "<url>"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "<a href=\"...\">Havola</a> elementi veb sahifalar orasida o'tishni ta'minlaydi."
    },
    {
      "q": "HTML sahifada rasm joylashtirish uchun qaysi teg ishlatiladi?",
      "options": [
        "<picture>",
        "<image>",
        "<img>",
        "<src>"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "<img src=\"url\" alt=\"matn\" /> tegi yordamida rasm yuklanadi."
    },
    {
      "q": "Sahifadagi eng katta sarlavha qaysi teg orqali yoziladi?",
      "options": [
        "<h6>",
        "<h1>",
        "<header>",
        "<title>"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "<h1> eng yuqori darajadagi asosiy sarlavha, <h6> esa eng kichigi hisoblanadi."
    },
    {
      "q": "CSS-da matn rangini o'zgartirish uchun qaysi xususiyat (property) ishlatiladi?",
      "options": [
        "text-color",
        "color",
        "font-color",
        "text-style"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "color: red; matnning rangini qizil qiladi."
    },
    {
      "q": "CSS-da element orqa fon rangini o'rnatish uchun qaysi xususiyat ishlatiladi?",
      "options": [
        "background-color",
        "bgcolor",
        "color-background",
        "canvas-color"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "background-color: #ffffff; butun element orqasidagi fon rangini belgilaydi."
    },
    {
      "q": "Matnni qalin (bold) qilib ko'rsatish uchun semantik HTML5 tegi qaysi?",
      "options": [
        "<i>",
        "<b>",
        "<strong>",
        "<bold>"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "<strong> muhim urg'u berilgan qalin matnni bildiradi."
    },
    {
      "q": "Tartiblanmagan (markerlangan / nuqtali) ro'yxat qaysi teg bilan boshlanadi?",
      "options": [
        "<ol>",
        "<ul>",
        "<li>",
        "<list>"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "ul (Unordered List) ro'yxati har bir bandi li bilan yoziladi."
    },
    {
      "q": "HTML sahifaning brauzer sarlavhasida (tab-da) ko'rinadigan nom qaysi teg ichida yoziladi?",
      "options": [
        "<head>",
        "<meta>",
        "<title>",
        "<h1>"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "<title>CodeJS Platformasi</title> brauzer tepasidagi vkladka nomini belgilaydi."
    },
    {
      "q": "CSS qisqartmasining to'liq ma'nosi nima?",
      "options": [
        "Cascading Style Sheets",
        "Creative Style System",
        "Computer Styling Source",
        "Colorful Style Sheets"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Kaskadli uslublar jadvali — veb-sahifalarni bezatish tili."
    },
    {
      "q": "Matn shrift o'lchamini belgilash uchun qaysi CSS xususiyati ishlatiladi?",
      "options": [
        "text-size",
        "font-size",
        "font-weight",
        "text-scale"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "font-size: 16px; matn harflari hajmini o'rnatadi."
    },
    {
      "q": "HTML sahifada yangi qatorga tushish uchun qaysi yopilmaydigan teg ishlatiladi?",
      "options": [
        "<hr>",
        "<br>",
        "<p>",
        "<next>"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "<br> (Break line) matnni yangi qatorga o'tkazadi."
    },
    {
      "q": "Elementning ichki bo'shlig'i (chegarasi va tarkibi orasidagi masofa) nima deb ataladi?",
      "options": [
        "margin",
        "padding",
        "border",
        "gap"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "padding — ichki masofa, margin — tashqi masofa hisoblanadi."
    },
    {
      "q": "CSS Flexbox-da elementlarni asosiy o'q (gorizontal) bo'ylab markazga tekislash qaysi xususiyat bilan qilinadi?",
      "options": [
        "align-items: center",
        "justify-content: center",
        "text-align: center",
        "align-content: center"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "justify-content asosiy o'qni, align-items esa perpendikulyar o'qni boshqaradi."
    },
    {
      "q": "CSS Box Model-da element kengligiga chegara va padding-ni qo'shib hisoblaydigan qoida:",
      "options": [
        "box-sizing: content-box",
        "box-sizing: border-box",
        "display: block",
        "overflow: hidden"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "box-sizing: border-box element berilgan width ichida qolishini ta'minlaydi."
    },
    {
      "q": "HTML5 da navigatsiya menyusini yaratish uchun qaysi semantik teg mo'ljallangan?",
      "options": [
        "<menu>",
        "<nav>",
        "<navbar>",
        "<header>"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "<nav> tegi saytning asosiy harakatlanish menyulari uchun ishlatiladi."
    },
    {
      "q": "CSS-da barcha HTML elementlarini tanlash uchun qaysi universal selektor ishlatiladi?",
      "options": [
        ".all",
        "*",
        ":root",
        "#all"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "* { margin: 0; box-sizing: border-box; } sahifadagi har bir elementga ta'sir qiladi."
    },
    {
      "q": "position: absolute; bo'lgan element o'z pozitsiyasini qaysi elementga nisbatan hisoblaydi?",
      "options": [
        "Har doim butun brauzer oynasiga (viewport)",
        "Eng yaqin 'position' berilgan (relative, absolute, fixed) ota elementiga",
        "Har doim <body> elementiga",
        "Oldingi qo'shni elementiga"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Ota elementda position: relative bo'lsa, ichki absolute element aynan unga bog'lanadi."
    },
    {
      "q": "CSS Grid-da teng 3 ta ustun yaratishning eng zamonaviy usuli qaysi?",
      "options": [
        "grid-template-columns: 33% 33% 33%;",
        "grid-template-columns: repeat(3, 1fr);",
        "grid-columns: 3;",
        "display-grid-columns: 3fr;"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "repeat(3, 1fr) moslashuvchan fraksiya (fr) birligidan foydalanadi."
    },
    {
      "q": "Sichqoncha ko'rsatkichi element ustiga kelgandagi holatni bildiruvchi psevdo-klass:",
      "options": [
        ":focus",
        ":hover",
        ":active",
        ":visited"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "button:hover { background: cyan; } kursor ustiga kelganda rangni o'zgartiradi."
    },
    {
      "q": "HTML forma maydonini to'ldirish majburiy ekanligini belgilovchi atribut:",
      "options": [
        "validate",
        "important",
        "required",
        "mandatory"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "<input type=\"text\" required /> bo'sh qoldirilsa forma yuborilmaydi."
    },
    {
      "q": "CSS-da elementni ekrandan yashirish va joyini ham butunlay bo'shatish:",
      "options": [
        "visibility: hidden;",
        "display: none;",
        "opacity: 0;",
        "filter: hide;"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "display: none; elementni DOM o'lchamlaridan butunlay olib tashlaydi."
    },
    {
      "q": "Har xil ekran o'lchamlariga (mobil, planshet, kompyuter) moslashuvchan dizayn nima deb ataladi?",
      "options": [
        "Static Web",
        "Responsive Web Design",
        "Fluid API",
        "Fixed Layout"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Media queries orqali mobil telefon va monitorlarga mos dizayn tuziladi."
    },
    {
      "q": "HTML sahifada tashqi CSS faylini ulash uchun qaysi teg ishlatiladi?",
      "options": [
        "<style src=\"...\">",
        "<script href=\"...\">",
        "<link rel=\"stylesheet\" href=\"...\">",
        "<css link=\"...\">"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "<link rel=\"stylesheet\" href=\"style.css\" /> tegi <head> ichida qo'yiladi."
    },
    {
      "q": "CSS selektorlarining o'ziga xosligi (Specificity) bo'yicha eng kuchli ustuvorlikka ega bo'lgani qaysi?",
      "options": [
        "Teg nomi (h1)",
        "Klass (.btn)",
        "ID (#main-title)",
        "Universal selektor (*)"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "ID selektori (0,1,0,0) klass (0,0,1,0) va teglardan (0,0,0,1) ancha kuchli ustunlikka ega."
    },
    {
      "q": "CSS-da o'zgaruvchi (CSS Variable) e'lon qilish va undan foydalanish to'g'ri ko'rsatilgan qator:",
      "options": [
        "--color: red; color: var(--color);",
        "$color: red; color: $color;",
        "@color: red; color: @color;",
        "var-color: red; color: var-color;"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "Mahalliy CSS o'zgaruvchilari ikki chiziqcha '--' bilan boshlanadi va var() orqali olinadi."
    },
    {
      "q": "CSS z-index xususiyati to'g'ri ishlashi uchun elementda qaysi shart bajarilishi shart?",
      "options": [
        "display: flex bo'lishi kerak",
        "position qiymati static-dan boshqa bo'lishi kerak (relative, absolute, fixed)",
        "width va height aniq belgilangan bo'lishi kerak",
        "opacity: 1 bo'lishi kerak"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Oddiy static elementlarda z-index ishlamaydi, avval pozitsiya berilishi kerak."
    },
    {
      "q": "Elementning oldiga yoki orqasiga qo'shimcha bezakli kontent qo'shuvchi psevdo-elementlar:",
      "options": [
        "::first-letter va ::first-line",
        "::before va ::after",
        ":before va :after",
        "::start va ::end"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "::before va ::after content: '' bilan dekorativ dizaynlarni kodga kiritadi."
    },
    {
      "q": "CSS Flexbox-da elementlarning qatorga sig'may qolganda keyingi qatorga tushishini ta'minlovchi qoida:",
      "options": [
        "flex-direction: column;",
        "flex-wrap: wrap;",
        "overflow: scroll;",
        "flex-flow: row;"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "flex-wrap: wrap elementlarni bitta qatorda siqilmasdan yangi qatorga o'tkazadi."
    },
    {
      "q": "HTML sahifada <script> yuklanishida HTML parsing-ni to'xtatmasdan, fonda yuklab oxirida ketma-ket bajarish atributi:",
      "options": [
        "async",
        "defer",
        "lazy",
        "preload"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "'defer' skriptni DOM tayyor bo'lguncha kechiktirib, HTML render bo'lishiga xalaqit bermaydi."
    },
    {
      "q": "Ekran kengligi 768px dan kichik bo'lganda ishlovchi CSS media qoidasi qaysi?",
      "options": [
        "@media (min-width: 768px)",
        "@media (max-width: 768px)",
        "@media screen and (width: 768px)",
        "@media (device-width < 768px)"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "max-width: 768px — 0 dan 768px gacha bo'lgan mobil qurilmalar uchun."
    },
    {
      "q": "Faqat birinchi avlod (bevosita) bola elementni tanlovchi CSS selektor belgisi:",
      "options": [
        "div p (probel)",
        "div > p",
        "div + p",
        "div ~ p"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "'>' faqat bevosita to'g'ridan-to'g'ri farzand bo'lgan elementni tanlaydi."
    },
    {
      "q": "CSS transform xususiyatida 3D yoki 2D elementni o'z o'qi atrofida aylantirish funksiyasi:",
      "options": [
        "scale()",
        "translate()",
        "rotate()",
        "skew()"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "transform: rotate(45deg); elementni 45 darajaga buradi."
    },
    {
      "q": "Katta-kichik harflaridan qat'i nazar, barcha harflarni bosh harf (Capitalize) qilish CSS qoidasi:",
      "options": [
        "font-weight: bold",
        "text-transform: capitalize",
        "text-transform: uppercase",
        "font-style: italic"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "text-transform: uppercase barcha harflarni KATTA harfga aylantiradi."
    },
    {
      "q": "CSS clamp() funksiyasi qanday parametrlarni qabul qiladi?",
      "options": [
        "clamp(minimum, tavsiya_etilgan, maksimum)",
        "clamp(width, height, radius)",
        "clamp(color, opacity, shadow)",
        "clamp(start, end, step)"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "clamp(1rem, 2.5vw, 2rem) o'lchamni belgilangan chegaralar orasida ushlab turadi."
    },
    {
      "q": "Qaysi meta-teg mobil qurilmalarda veb-sahifaning to'g'ri masshtablanishini (responsive) ta'minlaydi?",
      "options": [
        "<meta charset=\"UTF-8\">",
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        "<meta http-equiv=\"X-UA-Compatible\">",
        "<meta name=\"theme-color\">"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Ushbu viewport tegisiz sahifalar mobil telefonlarda kichraytirib ko'rsatiladi."
    }
  ],
  "it_logic": [
    {
      "q": "1 Bayt (Byte) necha Bitdan (Bit) iborat?",
      "options": [
        "8 bit",
        "16 bit",
        "4 bit",
        "1024 bit"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Kompyuter xotirasidagi standart o'lchov birligi 8 ta bitdan tashkil topadi."
    },
    {
      "q": "Ikkilik sanoq sistemasida (Binary) qaysi raqamlar ishlatiladi?",
      "options": [
        "1 va 2",
        "0 va 1",
        "0 dan 9 gacha",
        "0 dan 7 gacha"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Kompyuter mikrosxemalari faqat elektr signali bor (1) yoki yo'q (0) holatini tushunadi."
    },
    {
      "q": "Kodni versiyalash va jamoa bilan ishlash uchun dunyoda eng mashhur tizim qaysi?",
      "options": [
        "Docker",
        "Linux",
        "Git",
        "Figma"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Linus Torvalds tomonidan yaratilgan versiyalar nazorati tizimi."
    },
    {
      "q": "Kompyuterning asosiy 'miyasi' va hisoblashlarni bajaruvchi apparati nima?",
      "options": [
        "RAM",
        "SSD",
        "CPU (Markaziy protsessor)",
        "GPU"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Central Processing Unit — barcha mantiqiy va arifmetik amallarni bajaradi."
    },
    {
      "q": "URL qisqartmasining to'liq ma'nosi nima?",
      "options": [
        "Uniform Resource Locator",
        "Universal Remote Link",
        "United Resource Language",
        "User Routing Logic"
      ],
      "correct": 0,
      "difficulty": "easy",
      "hint": "Veb-resurslarning internetdagi yagona manzili."
    },
    {
      "q": "Ochiq kodli (Open Source) eng mashhur operatsion tizim yadrosi qaysi?",
      "options": [
        "Windows",
        "macOS",
        "Linux",
        "DOS"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Serverlar, Android va superkompyuterlarning negizida yotadi."
    },
    {
      "q": "Dasturlashda xatoliklarni topish va bartaraf etish jarayoni nima deyiladi?",
      "options": [
        "Compiling",
        "Refactoring",
        "Debugging",
        "Deploying"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "'Bug' (hasharot/xatolik) so'zidan kelib chiqqan debug amali."
    },
    {
      "q": "1 Kilobayt (KB) necha Baytdan (Byte) iborat?",
      "options": [
        "1000",
        "1024",
        "512",
        "2048"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Ikkilik asosida 2^10 = 1024 baytga teng."
    },
    {
      "q": "Internet tarmog'ida har bir qurilmaga beriladigan noyob raqamli manzil:",
      "options": [
        "MAC manzil",
        "IP manzil",
        "DNS manzil",
        "Port raqam"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "Internet Protocol manzili (masalan: 192.168.1.1)."
    },
    {
      "q": "Kompyuter o'chirilganda qaysi xotiradagi ma'lumotlar butunlay o'chib ketadi?",
      "options": [
        "SSD",
        "HDD",
        "RAM (Tezkor xotira)",
        "Fleshka"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Random Access Memory vaqtinchalik operatsion xotira hisoblanadi."
    },
    {
      "q": "Dunyodagi eng birinchi dasturchi ayol kim hisoblanadi?",
      "options": [
        "Mariya Kyuri",
        "Ada Lavleys (Ada Lovelace)",
        "Greys Xopper",
        "Margaret Xemilton"
      ],
      "correct": 1,
      "difficulty": "easy",
      "hint": "1843-yilda Ch. Bebbij mexanik hisoblash mashinasi uchun algoritm yozgan."
    },
    {
      "q": "Veb-brauzerlar orasida Chromium dvijogida ISHLAMAYDIGAN brauzer qaysi?",
      "options": [
        "Google Chrome",
        "Microsoft Edge",
        "Mozilla Firefox",
        "Opera"
      ],
      "correct": 2,
      "difficulty": "easy",
      "hint": "Firefox o'zining shaxsiy 'Gecko' dvijogiga ega mustaqil brauzerdir."
    },
    {
      "q": "SQL qanday ma'lumotlar bilan ishlash uchun mo'ljallangan til?",
      "options": [
        "Fayllar tizimi",
        "Relyatsion ma'lumotlar bazasi",
        "Grafik dizayn",
        "Veb-brauzer"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Structured Query Language jadvallardan (table) iborat bazalarda ishlaydi."
    },
    {
      "q": "Veb-sahifaning brauzerda ko'rinadigan struktura daraxti qanday ataladi?",
      "options": [
        "API",
        "CSSOM",
        "JSON",
        "DOM (Document Object Model)"
      ],
      "correct": 3,
      "difficulty": "medium",
      "hint": "JavaScript aynan shu daraxt orqali HTML elementlarini dinamik o'zgartiradi."
    },
    {
      "q": "HTTP 404 xatolik kodi nimani bildiradi?",
      "options": [
        "Server buzilgan",
        "So'ralgan sahifa yoki resurs topilmadi",
        "Ruxsat berilmagan (Forbidden)",
        "Muvaffaqiyatli so'rov"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Not Found — brauzer qidirgan manzil serverda mavjud emas."
    },
    {
      "q": "Foydalanuvchi domen nomini (masalan: google.com) IP manzilga (142.250.x.x) o'girib beruvchi tizim:",
      "options": [
        "DHCP",
        "DNS (Domain Name System)",
        "FTP",
        "SSH"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Internetning global 'telefon kitobi' vazifasini bajaradi."
    },
    {
      "q": "O'nlik sanoq sistemasidagi 10 raqami ikkilikda (Binary) qanday yoziladi?",
      "options": [
        "1010",
        "1100",
        "1001",
        "1110"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "8 + 2 = 10 -> (1*8 + 0*4 + 1*2 + 0*1) = 1010."
    },
    {
      "q": "Ikkilik qidiruv (Binary Search) algoritmining o'rtacha vaqt murakkabligi (Time Complexity) qanday?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(n^2)",
        "O(1)"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Har bir qadamda qidiruv doirasini teng ikkiga qisqartirib boradi."
    },
    {
      "q": "Git-da joriy o'zgarishlarni yangi versiya sifatida tarixga muhrlash buyrug'i:",
      "options": [
        "git push",
        "git save",
        "git commit -m '...'",
        "git branch"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "git commit lokal repository-ga o'zgarishlarni snapshot sifatida yozadi."
    },
    {
      "q": "Dasturiy ta'minot arxitekturasida 'Frontend' va 'Backend' orasida ma'lumot almashuvchi ko'prik:",
      "options": [
        "CPU",
        "API (Application Programming Interface)",
        "BIOS",
        "RAM"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "REST API yoki GraphQL orqali ma'lumotlar uzatiladi va qabul qilinadi."
    },
    {
      "q": "Quyidagilardan qaysi biri NoSQL (hujjatga asoslangan) ma'lumotlar bazasi hisoblanadi?",
      "options": [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Oracle DB"
      ],
      "correct": 2,
      "difficulty": "medium",
      "hint": "MongoDB ma'lumotlarni JSON/BSON formatida saqlaydi."
    },
    {
      "q": "Xavfsiz va shifrlangan ma'lumot almashish veb-protokoli qaysi?",
      "options": [
        "HTTP",
        "HTTPS",
        "FTP",
        "Telnet"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "SSL/TLS sertifikati orqali ma'lumotlarni shifrlab uzatadi."
    },
    {
      "q": "Stack (Stek) ma'lumotlar tuzilmasi qaysi qoidaga binoan ishlaydi?",
      "options": [
        "FIFO (First In First Out)",
        "LIFO (Last In First Out)",
        "Random Access",
        "Priority Order"
      ],
      "correct": 1,
      "difficulty": "medium",
      "hint": "Oxirgi kirgan element birinchi bo'lib chiqadi (masalan, likopchalar ustma-ust taxlami)."
    },
    {
      "q": "Dasturning xotira yoki resurslarni me'yoridan ortiq ishlatib yopilmay qolishi nima deyiladi?",
      "options": [
        "Memory Leak (Xotira oqishi)",
        "Deadlock",
        "Segmentation Fault",
        "Cache Miss"
      ],
      "correct": 0,
      "difficulty": "medium",
      "hint": "Keraksiz obyektlar xotiradan tozalanmay qolib, tizimni sekinlashtiradi."
    },
    {
      "q": "Mantiqiy XOR (Exclusive OR) amali qaysi holatda TRUE (1) natija beradi?",
      "options": [
        "Ikkala kiruvchi qiymat ham 1 bo'lganda",
        "Ikkala kiruvchi qiymat bir xil bo'lganda",
        "Faqat bitta qiymat 1 va ikkinchisi 0 bo'lganda (qiymatlar har xil)",
        "Ikkala qiymat ham 0 bo'lganda"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "XOR — 'istisno qiluvchi YOKI': 1^0=1, 0^1=1, ammo 1^1=0 va 0^0=0."
    },
    {
      "q": "Eng yomon holatda ham O(n log n) vaqt murakkabligini kafolatlovchi saralash algoritmi:",
      "options": [
        "QuickSort",
        "MergeSort",
        "BubbleSort",
        "InsertionSort"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "MergeSort (bo'lib tashla va hukmronlik qil) har doim O(n log n) tezlikda ishlaydi."
    },
    {
      "q": "Parollarni xavfsiz saqlashda 'Salting' (tuzlash) usulining asosiy maqsadi nima?",
      "options": [
        "Parolni qisqartirish",
        "Rainbow table (oldindan hisoblangan hashlar jadvali) hujumlaridan himoyalanish",
        "Parolni tezroq tekshirish",
        "Parolni foydalanuvchiga eslatib turish"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Har bir parolga tasodifiy satr qo'shilib, bir xil parollarning heshlari har xil bo'lishi ta'minlanadi."
    },
    {
      "q": "Asimmetrik shifrlashda (masalan, RSA) ma'lumotlarni qanday kalitlar boshqaradi?",
      "options": [
        "Bitta umumiy maxfiy kalit",
        "Ochiq kalit (Public key) va Maxfiy kalit (Private key)",
        "Faqat server kaliti",
        "PIN kod va login"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Ochiq kalit hamma uchun ochiq shifrlaydi, faqat maxfiy kalit egasi uni o'qiy oladi."
    },
    {
      "q": "Kutilmagan so'rovlar oqimi bilan serverni ishdan chiqarish kiberhujumi qanday ataladi?",
      "options": [
        "Phishing",
        "DDoS (Distributed Denial of Service)",
        "Man-in-the-Middle",
        "SQL Injection"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Minglab botnet qurilmalari serverga bir vaqtda so'rov yuborib uni qotirib qo'yadi."
    },
    {
      "q": "SQL Injection hujumi qanday yo'l bilan amalga oshiriladi?",
      "options": [
        "Server parolini taxmin qilib topish",
        "Foydalanuvchi kiritish maydoniga zararli SQL buyruqlarini yuborib bazaga noqonuniy kirish",
        "Fayl yuklashda virus qo'shish",
        "Wi-Fi tarmog'ini buzish"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Tekshirilmagan inputlar orqali 'OR 1=1;--' kabi SQL kodlari bajariladi."
    },
    {
      "q": "Dasturlashda Rekursiya (Recursion) nima?",
      "options": [
        "Funksiyaning o'z tanasi ichida o'zini o'zi qayta chaqirishi",
        "Massivlarni teskari o'girish",
        "Dasturning xatolikka uchrashi",
        "Ikkita server o'rtasidagi aloqa"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "To'xtash sharti (base case) bo'lishi shart, aks holda stack overflow bo'ladi."
    },
    {
      "q": "O'n oltilik sanoq sistemasida (Hexadecimal) 'F' harfi qaysi songa to'g'ri keladi?",
      "options": [
        "10",
        "15",
        "16",
        "255"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "A=10, B=11, C=12, D=13, E=14, F=15."
    },
    {
      "q": "Quyidagilardan qaysi biri Graph (Graf) algoritmlarida eng qisqa yo'lni topish uchun ishlatiladi?",
      "options": [
        "Dijkstra algoritmi",
        "Binary Search",
        "Bubble Sort",
        "Fisher-Yates"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "GPS xaritalar va marshrutlarni tuzishda eng optimal yo'lni aniqlaydi."
    },
    {
      "q": "Operatsion tizimlarda bir nechta jarayonlar (threads) bir-birining resurs bo'shatishini cheksiz kutib qolishi nima deyiladi?",
      "options": [
        "Starvation",
        "Race condition",
        "Deadlock",
        "Context switch"
      ],
      "correct": 2,
      "difficulty": "hard",
      "hint": "A jarayon B ni, B jarayon esa A ni kutishi natijasida ikkisi ham to'xtab qoladi."
    },
    {
      "q": "TCP va UDP protokollari o'rtasidagi asosiy farq nimada?",
      "options": [
        "UDP faqat veb-saytlar uchun, TCP video o'yinlar uchun",
        "TCP paketlarning yetib borishini kafolatlaydi va tartiblaydi, UDP esa tezkor ammo kafolatsiz",
        "TCP simsiz tarmoqda ishlaydi, UDP kabelda",
        "Hech qanday farqi yo'q"
      ],
      "correct": 1,
      "difficulty": "hard",
      "hint": "Video striming va onlayn o'yinlar tezlik uchun UDP dan, muhim fayllar TCP dan foydalanadi."
    },
    {
      "q": "SOLID tamoyillarida 'S' harfi qaysi tamoyilni ifodalaydi?",
      "options": [
        "Single Responsibility Principle (Yagona javobgarlik)",
        "System Optimization Logic",
        "Security First Integration",
        "Scalable Object Design"
      ],
      "correct": 0,
      "difficulty": "hard",
      "hint": "Har bir sinf yoki modul faqat bitta aniq vazifa uchun javobgar bo'lishi kerak."
    }
  ]
};

// ─── 2. SOUND EFFECTS (WEB AUDIO API SINTIZATORI) ──────────────
// Hech qanday tashqi audio fayllar kerak emas, barcha ovozlar brauzerda hosil bo'ladi
class CodehootAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }

  // Countdown tick
  playTick() {
    this.playTone(880, 'triangle', 0.08, 0.06);
  }

  // Answer selected click
  playClick() {
    this.playTone(520, 'sine', 0.12, 0.1);
  }

  // Correct answer chime (xushxabar akkordi)
  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      setTimeout(() => this.playTone(523.25, 'triangle', 0.2, 0.12), 0);   // C5
      setTimeout(() => this.playTone(659.25, 'triangle', 0.2, 0.12), 120); // E5
      setTimeout(() => this.playTone(783.99, 'triangle', 0.2, 0.12), 240); // G5
      setTimeout(() => this.playTone(1046.50, 'triangle', 0.4, 0.15), 360); // C6
    } catch(e) {}
  }

  // Wrong answer buzz
  playWrong() {
    if (!this.enabled) return;
    try {
      this.init();
      setTimeout(() => this.playTone(280, 'sawtooth', 0.25, 0.12), 0);
      setTimeout(() => this.playTone(220, 'sawtooth', 0.35, 0.12), 150);
    } catch(e) {}
  }

  // Celebration fanfare (G'oliblik sharafi)
  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      const notes = [523, 659, 784, 1046, 784, 1046];
      const times = [0, 150, 300, 450, 650, 800];
      notes.forEach((n, idx) => {
        setTimeout(() => this.playTone(n, 'triangle', 0.3, 0.15), times[idx]);
      });
    } catch(e) {}
  }

  // Sirli sandiq bo'sh chiqqandagi tovush
  playChestEmpty() {
    if (!this.enabled) return;
    try {
      this.init();
      this.playTone(200, 'sine', 0.18, 0.08);
      setTimeout(() => this.playTone(150, 'sine', 0.22, 0.06), 110);
    } catch(e) {}
  }

  // Sirli sandiqdan super omad chiqqandagi sehrli tovush
  playLucky() {
    if (!this.enabled) return;
    try {
      this.init();
      const notes = [440, 554, 659, 880, 1108, 1318];
      const times = [0, 70, 140, 210, 280, 360];
      notes.forEach((n, idx) => {
        setTimeout(() => this.playTone(n, 'triangle', 0.22, 0.14), times[idx]);
      });
    } catch(e) {}
  }
}

const codehootSound = new CodehootAudio();


// ─── 3. CODEHOOT TIZIM BOSHQARUVI VA HOLAT (STATE) ──────────────
const Codehoot = {
  // Game state
  role: null,            // 'host' | 'player' | 'solo'
  hostMode: 'spectator', // 'spectator' (katta ekran / tomoshabin) | 'player' (admin ham o'ynaydi)
  roomPin: null,         // 6-digit string
  roomId: null,          // 'room_123456'
  roomUnsubscribe: null, // Firestore onSnapshot unsubscription
  
  // Player info
  playerId: null,        // unique player key
  playerName: '',
  playerAvatar: '',
  playerScore: 0,
  playerStreak: 0,
  hasAnsweredCurrent: false,
  hasChosenChestForCurrentQ: false,
  currentLuckyChest: null,

  // Host/Game config
  category: 'flags',
  timePerQuestion: 20,
  matchDurationMinutes: 5,
  matchDurationSeconds: 300,
  matchStartTime: 0,
  matchEndTime: 0,
  matchTimerInterval: null,
  isModalFullscreen: false,
  isFullscreenLeaderboardOpen: false,
  
  // Game session runtime
  questions: [],
  currentIndex: 0,
  timerInterval: null,
  timerSecondsLeft: 0,
  roomData: null,        // Local cache of room state
  
  // Local fallback if Firebase is offline
  isLocalMode: false,
  localPlayers: {},

  // AI Bots for testing / Solo play
  BOT_NAMES: [
    { name: "Jasur Pro", avatar: "assets/memes/meme-1.jpg" },
    { name: "Madina IT", avatar: "assets/memes/meme-15.jpg" },
    { name: "Sardor Dev", avatar: "assets/memes/meme-6.jpg" },
    { name: "Laylo Code", avatar: "assets/memes/meme-16.jpg" },
    { name: "Bobur Senior", avatar: "assets/memes/meme-2.jpg" },
    { name: "Zuhra Tech", avatar: "assets/memes/meme-18.jpg" },
    { name: "Otabek QA", avatar: "assets/memes/meme-10.jpg" },
    { name: "Dilorom UX", avatar: "assets/memes/meme-20.jpg" }
  ],

  // Initsiyatsiya
  init() {
    this.playerId = 'p_' + Math.random().toString(36).substring(2, 9);
    console.log('🎮 Codehoot jonli o\'yin tizimi tayyor!');

    // Esc tugmasi bosilganda butun ekran reytingidan chiqish
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isFullscreenLeaderboardOpen) {
        this.closeFullscreenLeaderboard();
      }
    });
  },

  // Modalni ochish
  open() {
    codehootSound.init();
    const modal = document.getElementById('codehoot-modal');
    if (modal) {
      modal.classList.add('active');
      modal.classList.add('open');
      this.showScreen('welcome');
      
      // Agar tizimga kirgan bo'lsa, ma'lumotlarni to'ldiramiz
      const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
      const nickInput = document.getElementById('codehoot-player-nickname');
      if (user && nickInput && !nickInput.value) {
        nickInput.value = user.username || user.name || '';
      }
    }
  },

  // Modalni yopish
  close() {
    this.cleanup();
    const modal = document.getElementById('codehoot-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.classList.remove('open');
    }
  },

  cleanup() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.matchTimerInterval) clearInterval(this.matchTimerInterval);
    if (this.isFullscreenLeaderboardOpen) this.closeFullscreenLeaderboard();
    if (this.isModalFullscreen) this.toggleFullscreen();
    if (this.roomUnsubscribe) {
      try { this.roomUnsubscribe(); } catch(e) {}
      this.roomUnsubscribe = null;
    }
  },

  // Ekranlarni almashtirish
  showScreen(screenId) {
    const screens = [
      'welcome', 'host-create', 'host-lobby', 'player-join', 'player-lobby',
      'game-question', 'reveal-screen', 'leaderboard-screen', 'podium-screen'
    ];
    screens.forEach(s => {
      const el = document.getElementById(`codehoot-${s}`);
      if (el) el.style.display = (s === screenId) ? 'block' : 'none';
    });
  },

  // Savollar to'plamini shakllantirish
  getQuestionsForCategory(cat, count, difficulty = 'all') {
    let pool = [];
    if (cat === 'all') {
      Object.keys(CODEHOOT_QUESTIONS).forEach(k => {
        pool = pool.concat(CODEHOOT_QUESTIONS[k]);
      });
    } else {
      pool = (CODEHOOT_QUESTIONS[cat] || CODEHOOT_QUESTIONS.flags).slice();
    }

    // 3 xil qiyinlik darajasi bo'yicha saralash (Oson, Normal, Qiyin)
    if (difficulty && difficulty !== 'all') {
      const filtered = pool.filter(q => q.difficulty === difficulty);
      if (filtered.length >= count) {
        pool = filtered;
      } else if (filtered.length > 0) {
        // Agar tanlangan darajadagi savollar yetarli bo'lmasa, qolganini aralashtirib to'ldiramiz
        const others = pool.filter(q => q.difficulty !== difficulty);
        pool = filtered.concat(others);
      }
    }

    // Aralashtirish (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, pool.length));
  },

  // ─── 4. XONA YARATISH (HOST / O'QITUVCHI - FAQAT ADMIN UCHUN) ──
  openHostCreate() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!user || user.role !== 'admin') {
      alert("🔒 Yangi o'yin xonasini faqat Admin (o'qituvchi) yaratishi mumkin!\n\nO'quvchilar xonaga 6 xonali PIN kod orqali qo'shilishi mumkin.");
      if (!user && typeof openAuthModal === 'function') {
        openAuthModal('login');
      }
      return;
    }
    this.role = 'host';
    this.showScreen('host-create');
  },

  createRoom() {
    const catSelect = document.getElementById('codehoot-host-category');
    const diffSelect = document.getElementById('codehoot-host-difficulty');
    const durationSelect = document.getElementById('codehoot-host-duration') || document.getElementById('codehoot-host-count');
    const timeSelect = document.getElementById('codehoot-host-time');
    const modeSelect = document.getElementById('codehoot-host-mode');

    this.category = catSelect ? catSelect.value : 'flags';
    this.difficulty = diffSelect ? diffSelect.value : 'all';
    this.matchDurationMinutes = durationSelect ? parseInt(durationSelect.value, 10) : 5;
    this.matchDurationSeconds = this.matchDurationMinutes * 60;
    this.timePerQuestion = timeSelect ? parseInt(timeSelect.value, 10) : 20;
    this.hostMode = modeSelect ? modeSelect.value : 'spectator';

    // 6 xonali tasodifiy PIN
    this.roomPin = Math.floor(100000 + Math.random() * 900000).toString();
    this.roomId = 'room_' + this.roomPin;
    // Vaqtlik o'yin uchun ko'p savollar to'plamini yuklash (savol tugab qolmasligi uchun)
    this.questions = this.getQuestionsForCategory(this.category, 60, this.difficulty);
    this.currentIndex = 0;

    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const hostName = user ? (user.username || user.name) : "O'qituvchi (Admin)";
    const hostAvatar = (user && (user.equippedAvatar || user.avatar)) ? (user.equippedAvatar || user.avatar) : "assets/memes/meme-9.jpg";

    const initialPlayers = {};
    if (this.hostMode === 'player') {
      initialPlayers[this.playerId] = {
        id: this.playerId,
        name: hostName + " (Admin)",
        avatar: hostAvatar,
        score: 0,
        streak: 0,
        lastAnswer: null,
        lastAnswerCorrect: false
      };
    }

    const initialRoomState = {
      pin: this.roomPin,
      hostId: this.playerId,
      hostName: hostName,
      hostAvatar: hostAvatar,
      hostMode: this.hostMode,
      category: this.category,
      difficulty: this.difficulty || 'all',
      timePerQuestion: this.timePerQuestion,
      matchDurationMinutes: this.matchDurationMinutes,
      matchDurationSeconds: this.matchDurationSeconds,
      matchStartTime: 0,
      matchEndTime: 0,
      questionCount: this.questions.length,
      questions: this.questions,
      status: 'lobby', // 'lobby' | 'question' | 'reveal' | 'leaderboard' | 'finished'
      currentQuestionIndex: 0,
      questionStartTime: 0,
      players: initialPlayers,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.roomData = initialRoomState;

    // PIN kodni ekranda ko'rsatish
    const pinDisplay = document.getElementById('codehoot-lobby-pin');
    if (pinDisplay) pinDisplay.textContent = this.roomPin.slice(0, 3) + ' ' + this.roomPin.slice(3);

    // Firestore ga yozish
    if (typeof db !== 'undefined' && db && isFirebaseConnected) {
      this.isLocalMode = false;
      db.collection('kahoot_rooms').doc(this.roomId).set(initialRoomState)
        .then(() => {
          this.listenToRoom(this.roomId);
        })
        .catch(err => {
          console.warn('Firestore xatolik, lokal rejimda davom etiladi:', err);
          this.isLocalMode = true;
          this.renderHostLobbyPlayers();
        });
    } else {
      this.isLocalMode = true;
      this.localPlayers = Object.assign({}, initialPlayers);
    }

    this.showScreen('host-lobby');
    this.renderHostLobbyPlayers();
  },

  // Test uchun AI botlarni qo'shish
  addTestBots(count = 3) {
    if (!this.roomData) return;
    const currentCount = Object.keys(this.roomData.players || {}).length;
    const toAdd = Math.min(count, 20 - currentCount);

    for (let i = 0; i < toAdd; i++) {
      const bot = this.BOT_NAMES[(currentCount + i) % this.BOT_NAMES.length];
      const botId = 'bot_' + Math.random().toString(36).substring(2, 7);
      
      const newBot = {
        id: botId,
        name: bot.name,
        avatar: bot.avatar,
        score: 0,
        streak: 0,
        isBot: true,
        lastAnswer: null,
        lastAnswerCorrect: false
      };

      if (this.isLocalMode || !isFirebaseConnected) {
        if (!this.roomData.players) this.roomData.players = {};
        this.roomData.players[botId] = newBot;
      } else {
        const update = {};
        update[`players.${botId}`] = newBot;
        db.collection('kahoot_rooms').doc(this.roomId).update(update);
      }
    }

    if (this.isLocalMode || !isFirebaseConnected) {
      this.renderHostLobbyPlayers();
    }
  },

  // ─── 5. XONAGA QO'SHILISH (PLAYER / O'QUVCHI) ──────────────────
  openPlayerJoin() {
    this.role = 'player';
    this.showScreen('player-join');
  },

  joinRoom() {
    const pinInput = document.getElementById('codehoot-join-pin');
    const nickInput = document.getElementById('codehoot-player-nickname');

    const pin = pinInput ? pinInput.value.replace(/\s+/g, '').trim() : '';
    let nickname = nickInput ? nickInput.value.trim() : '';

    if (!pin || pin.length < 6) {
      alert("Iltimos, 6 xonali to'g'ri o'yin PIN kodini kiriting!");
      return;
    }

    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!nickname) {
      nickname = user ? (user.username || user.name) : ("O'quvchi_" + Math.floor(Math.random() * 900 + 100));
    }

    this.roomPin = pin;
    this.roomId = 'room_' + pin;
    this.playerName = nickname;
    this.playerAvatar = (user && (user.equippedAvatar || user.avatar)) ? (user.equippedAvatar || user.avatar) : "assets/memes/meme-1.jpg";
    this.playerScore = 0;
    this.playerStreak = 0;

    // Firestore orqali qidirish
    if (typeof db !== 'undefined' && db && isFirebaseConnected) {
      db.collection('kahoot_rooms').doc(this.roomId).get().then(doc => {
        if (!doc.exists) {
          alert("Bunday PIN kodli xona topilmadi! O'qituvchidan PIN kodni so'rang.");
          return;
        }

        const data = doc.data();
        const playerCount = Object.keys(data.players || {}).length;
        if (playerCount >= 20) {
          alert("Kechirasiz, xona to'ldi (maksimal 20 ta o'quvchi)!");
          return;
        }

        const newPlayer = {
          id: this.playerId,
          name: this.playerName,
          avatar: this.playerAvatar,
          score: 0,
          streak: 0,
          joinedAt: Date.now(),
          lastAnswer: null,
          lastAnswerCorrect: false
        };

        const update = {};
        update[`players.${this.playerId}`] = newPlayer;

        db.collection('kahoot_rooms').doc(this.roomId).update(update).then(() => {
          this.listenToRoom(this.roomId);
          this.showScreen('player-lobby');
          this.updatePlayerLobbyUI();
        });
      }).catch(err => {
        alert("Xonaga ulanishda xatolik: " + err.message);
      });
    } else {
      // Local rejim (agar bir brauzerda sinovdan o'tkazilayotgan bo'lsa)
      if (this.roomData && this.roomData.pin === pin) {
        this.roomData.players[this.playerId] = {
          id: this.playerId,
          name: this.playerName,
          avatar: this.playerAvatar,
          score: 0,
          streak: 0
        };
        this.showScreen('player-lobby');
        this.updatePlayerLobbyUI();
      } else {
        alert("Xona topilmadi yoki internetga ulanish mavjud emas!");
      }
    }
  },

  updatePlayerLobbyUI() {
    const nameEl = document.getElementById('codehoot-player-lobby-name');
    const avEl = document.getElementById('codehoot-player-lobby-avatar');
    if (nameEl) nameEl.textContent = this.playerName;
    if (avEl) {
      if (typeof getAvatarHtml === 'function') {
        avEl.innerHTML = getAvatarHtml(this.playerAvatar);
      } else {
        avEl.textContent = '👤';
      }
    }
  },

  // ─── 6. FIRESTORE REALTIME TINGLASH (ONSNAPSHOT) ───────────────
  listenToRoom(roomId) {
    if (this.roomUnsubscribe) this.roomUnsubscribe();

    this.roomUnsubscribe = db.collection('kahoot_rooms').doc(roomId).onSnapshot(doc => {
      if (!doc.exists) return;
      const data = doc.data();
      this.handleRoomUpdate(data);
    }, err => {
      console.error('Codehoot xona kuzatuvida xatolik:', err);
    });
  },

  // Xona holati yangilanganda barcha o'yinchilarda bajariladigan reaksiya
  handleRoomUpdate(data) {
    const prevStatus = this.roomData ? this.roomData.status : null;
    const prevIndex = this.roomData ? this.roomData.currentQuestionIndex : -1;
    this.roomData = data;
    this.questions = data.questions || [];
    this.currentIndex = data.currentQuestionIndex || 0;

    // Umumiy o'yin vaqtini sinxronlash
    if (data.matchEndTime) {
      this.matchEndTime = data.matchEndTime;
      if (!this.matchTimerInterval && data.status !== 'finished' && data.status !== 'lobby') {
        this.startMatchTimer();
      }
    }

    // 1. Lobby holatida o'yinchilarni yangilash
    if (data.status === 'lobby') {
      if (this.role === 'host') {
        this.renderHostLobbyPlayers();
      }
    }

    // 2. Yangi savol boshlanganda
    if (data.status === 'question') {
      if (prevStatus !== 'question' || prevIndex !== data.currentQuestionIndex) {
        this.startQuestionView(data.currentQuestionIndex, data.questionStartTime, data.timePerQuestion);
      } else {
        // Host uchun javoblar sonini yangilash
        this.updateAnswersCountDisplay();
      }
    }

    // 3. Savol natijasi e'lon qilinganda (Reveal)
    if (data.status === 'reveal' && prevStatus !== 'reveal') {
      this.showRevealView();
    }

    // 4. Reyting / Leaderboard ko'rsatilganda
    if (data.status === 'leaderboard' && prevStatus !== 'leaderboard') {
      this.showLeaderboardView();
    }

    // 5. O'yin tugaganda (Podium)
    if (data.status === 'finished' && prevStatus !== 'finished') {
      this.showPodiumView();
    }
  },

  // ─── 7. HOST: LOBBY O'YINCHILARINI CHIQARISH ───────────────────
  renderHostLobbyPlayers() {
    const container = document.getElementById('codehoot-lobby-players-grid');
    const countBadge = document.getElementById('codehoot-lobby-count');
    const startBtn = document.getElementById('codehoot-host-start-btn');
    if (!container) return;

    const players = Object.values((this.roomData && this.roomData.players) || this.localPlayers || {});
    if (countBadge) countBadge.textContent = `${players.length} / 20 o'quvchi`;

    if (startBtn) {
      // Kamida 1 ta o'yinchi bo'lsa yoki o'qituvchi yolg'iz o'zi sinamoqchi bo'lsa ham ruxsat
      startBtn.disabled = false;
      startBtn.style.opacity = '1';
      startBtn.style.cursor = 'pointer';
    }

    if (players.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 30px; color: var(--text-muted);">
          <div style="font-size:32px; margin-bottom:10px; animation: pulse 1.5s infinite;">⏳</div>
          O'quvchilar qo'shilishini kuting... PIN kod: <b style="color:var(--accent-cyan);">${this.roomPin}</b>
        </div>
      `;
      return;
    }

    container.innerHTML = players.map(p => {
      const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
      return `
        <div class="codehoot-lobby-chip animate-pop">
          <div class="codehoot-chip-av">${avHtml}</div>
          <span class="codehoot-chip-name">${this.escapeHtml(p.name)}</span>
        </div>
      `;
    }).join('');
  },

  // ─── 8. O'YINNI BOSHLASH VA BOSHQARISH (HOST) ──────────────────
  startGame() {
    if (this.questions.length === 0) {
      this.questions = this.getQuestionsForCategory(this.category, 60, this.difficulty);
    }
    const durationMinutes = this.matchDurationMinutes || 5;
    const now = Date.now();
    this.matchStartTime = now;
    this.matchEndTime = now + (durationMinutes * 60 * 1000);

    const update = {
      matchStartTime: this.matchStartTime,
      matchEndTime: this.matchEndTime,
      matchDurationMinutes: durationMinutes,
      updatedAt: now
    };
    if (!this.isLocalMode && isFirebaseConnected && this.roomId) {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
    this.startMatchTimer();
    this.sendQuestion(0);
  },

  // Butun musobaqaning umumiy vaqtini hisoblovchi taymer
  startMatchTimer() {
    if (this.matchTimerInterval) clearInterval(this.matchTimerInterval);

    const updateTimerDisplay = () => {
      if (!this.matchEndTime) return;
      const remainingMs = this.matchEndTime - Date.now();
      const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));

      const min = Math.floor(remainingSec / 60);
      const sec = remainingSec % 60;
      const timeStr = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

      // Barcha ekrandagi umumiy taymer ko'rsatkichlarini yangilash
      document.querySelectorAll('.codehoot-match-timer-val').forEach(el => {
        el.textContent = timeStr;
      });

      if (remainingSec <= 30) {
        document.querySelectorAll('.codehoot-match-timer-badge').forEach(b => {
          b.classList.add('urgent');
        });
      }

      if (remainingSec <= 0) {
        clearInterval(this.matchTimerInterval);
        this.matchTimerInterval = null;
        if (this.role === 'host' || this.isLocalMode) {
          // Vaqt tugadi! G'oliblarni e'lon qilish
          this.finishGame();
        }
      }
    };

    updateTimerDisplay();
    this.matchTimerInterval = setInterval(updateTimerDisplay, 1000);
  },

  sendQuestion(index) {
    this.currentIndex = index;
    const now = Date.now();
    const update = {
      status: 'question',
      currentQuestionIndex: index,
      questionStartTime: now,
      updatedAt: now
    };

    // O'yinchilarning joriy savol javoblarini tozalash
    if (this.roomData && this.roomData.players) {
      Object.keys(this.roomData.players).forEach(pId => {
        update[`players.${pId}.lastAnswer`] = null;
        update[`players.${pId}.lastAnswerCorrect`] = false;
        update[`players.${pId}.lastAnswerTime`] = 0;
      });
    }

    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'question';
      this.roomData.currentQuestionIndex = index;
      this.roomData.questionStartTime = now;
      this.startQuestionView(index, now, this.timePerQuestion);
      this.simulateBotAnswers();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  // Botlarning javob berishini simulyatsiya qilish
  simulateBotAnswers() {
    if (!this.roomData || !this.roomData.players) return;
    const curQ = this.questions[this.currentIndex];
    if (!curQ) return;

    Object.values(this.roomData.players).forEach(p => {
      if (!p.isBot) return;
      // Botlar 2 - 8 soniya ichida javob beradi
      const delay = Math.floor(Math.random() * 6000 + 2000);
      setTimeout(() => {
        if (this.roomData.status !== 'question') return;
        // 75% ehtimol bilan to'g'ri javob beradi
        const isCorrect = Math.random() < 0.75;
        const answerIdx = isCorrect ? curQ.correct : (curQ.correct + 1) % 4;
        const speedPoints = Math.max(300, Math.round(1000 - (delay / 10)));
        const addedScore = isCorrect ? speedPoints : 0;

        if (this.isLocalMode || !isFirebaseConnected) {
          p.lastAnswer = answerIdx;
          p.lastAnswerCorrect = isCorrect;
          if (isCorrect) {
            p.score = (p.score || 0) + addedScore;
            p.streak = (p.streak || 0) + 1;
          } else {
            p.streak = 0;
          }
          this.updateAnswersCountDisplay();
        } else {
          const update = {};
          update[`players.${p.id}.lastAnswer`] = answerIdx;
          update[`players.${p.id}.lastAnswerCorrect`] = isCorrect;
          if (isCorrect) {
            update[`players.${p.id}.score`] = firebase.firestore.FieldValue.increment(addedScore);
            update[`players.${p.id}.streak`] = firebase.firestore.FieldValue.increment(1);
          } else {
            update[`players.${p.id}.streak`] = 0;
          }
          db.collection('kahoot_rooms').doc(this.roomId).update(update);
        }
      }, delay);
    });
  },

  // ─── 9. SAVOL EKRANI (QUESTION VIEW) ──────────────────────────
  startQuestionView(index, startTime, duration) {
    this.hasAnsweredCurrent = false;
    this.hasChosenChestForCurrentQ = false;
    this.currentLuckyChest = Math.floor(Math.random() * 3);
    this.showScreen('game-question');

    const curQ = this.questions[index];
    if (!curQ) return;

    // Savol matni va raqami
    const qNumEl = document.getElementById('codehoot-q-current-num');
    const qTotalEl = document.getElementById('codehoot-q-total-num');
    const qTextEl = document.getElementById('codehoot-q-text');
    const mediaContainer = document.getElementById('codehoot-q-media');

    if (qNumEl) qNumEl.textContent = (index + 1);
    if (qTotalEl) qTotalEl.textContent = this.questions.length;
    if (qTextEl) qTextEl.textContent = curQ.q;

    // Qiyinlik darajasi nishoni (🟢 Oson, 🟡 O'rta, 🔴 Qiyin)
    const diffBadgeEl = document.getElementById('codehoot-q-difficulty-badge');
    if (diffBadgeEl) {
      if (curQ.difficulty === 'easy') {
        diffBadgeEl.textContent = '🟢 Oson';
        diffBadgeEl.style.color = '#4ade80';
        diffBadgeEl.style.borderColor = 'rgba(74, 222, 128, 0.4)';
        diffBadgeEl.style.background = 'rgba(74, 222, 128, 0.15)';
      } else if (curQ.difficulty === 'hard') {
        diffBadgeEl.textContent = '🔴 Qiyin';
        diffBadgeEl.style.color = '#f87171';
        diffBadgeEl.style.borderColor = 'rgba(248, 113, 113, 0.4)';
        diffBadgeEl.style.background = 'rgba(248, 113, 113, 0.15)';
      } else {
        diffBadgeEl.textContent = "🟡 O'rta";
        diffBadgeEl.style.color = '#fbbf24';
        diffBadgeEl.style.borderColor = 'rgba(251, 191, 36, 0.4)';
        diffBadgeEl.style.background = 'rgba(251, 191, 36, 0.15)';
      }
      diffBadgeEl.style.display = 'inline-block';
    }

    // Bayroq yoki kod namoyishi
    if (mediaContainer) {
      if (curQ.flagCode) {
        mediaContainer.style.display = 'flex';
        mediaContainer.innerHTML = `
          <div class="codehoot-flag-box">
            <img src="https://flagcdn.com/w320/${curQ.flagCode}.png" 
                 alt="Bayroq" 
                 class="codehoot-flag-img"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
            <div class="codehoot-flag-fallback" style="display:none; font-size:72px;">${curQ.flagEmoji || '🏳️'}</div>
          </div>
        `;
      } else if (curQ.code) {
        mediaContainer.style.display = 'flex';
        mediaContainer.innerHTML = `
          <div class="codehoot-code-snippet">
            <pre><code>${this.escapeHtml(curQ.code)}</code></pre>
          </div>
        `;
      } else {
        mediaContainer.style.display = 'none';
        mediaContainer.innerHTML = '';
      }
    }

    const isSpectator = (this.role === 'host' && this.hostMode === 'spectator');

    // 4 ta javob tugmalari
    const optionsGrid = document.getElementById('codehoot-answers-grid');
    if (optionsGrid) {
      const shapes = ['🔺', '🔷', '🟡', '🟩'];
      const colors = ['red', 'blue', 'yellow', 'green'];
      
      optionsGrid.innerHTML = curQ.options.map((opt, i) => `
        <button class="codehoot-answer-btn btn-${colors[i]}" 
                ${isSpectator ? 'disabled style="cursor:default; transform:none;"' : `onclick="Codehoot.handlePlayerAnswer(${i})"`} 
                id="codehoot-btn-${i}">
          <span class="codehoot-shape">${shapes[i]}</span>
          <span class="codehoot-opt-text">${this.escapeHtml(opt)}</span>
        </button>
      `).join('');
    }

    // Tomoshabin (Admin Katta Ekran) Jonli Reyting Paneli
    const specPanel = document.getElementById('codehoot-spectator-panel');
    if (specPanel) {
      specPanel.style.display = isSpectator ? 'block' : 'none';
      if (isSpectator) {
        this.renderSpectatorLeaderboard();
      }
    }

    // Holat ko'rsatkichi (kutish matnini yashirish)
    const feedbackBox = document.getElementById('codehoot-player-feedback');
    if (feedbackBox) feedbackBox.style.display = 'none';

    // Javob berganlar hisoblagichi
    this.updateAnswersCountDisplay();

    // Taymerni ishga tushirish
    this.startCountdownTimer(duration || this.timePerQuestion);
  },

  // Qancha o'yinchi javob berganini ko'rsatish
  updateAnswersCountDisplay() {
    const el = document.getElementById('codehoot-answers-count-badge');
    if (!el || !this.roomData) return;
    const players = Object.values(this.roomData.players || {});
    const answered = players.filter(p => p.lastAnswer !== null && p.lastAnswer !== undefined).length;
    el.textContent = `${answered} / ${players.length} javob berdi`;

    // Tomoshabin rejimida jonli reytingni real-vaqtda yangilab turish
    if (this.role === 'host' && this.hostMode === 'spectator') {
      this.renderSpectatorLeaderboard();
    }

    // Agar hamma o'quvchilar javob berib bo'lgan bo'lsa va host bo'lsak, vaqtdan oldin to'xtatish
    if (this.role === 'host' && players.length > 0 && answered === players.length) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerSecondsLeft = 0;
      setTimeout(() => this.revealQuestionResult(), 600);
    }
  },

  // Tomoshabin (Katta ekran) jonli reytingini chiqarish
  renderSpectatorLeaderboard() {
    const container = document.getElementById('codehoot-spectator-leaderboard');
    if (!container || !this.roomData || !this.roomData.players) return;

    const players = Object.values(this.roomData.players).sort((a, b) => (b.score || 0) - (a.score || 0));
    if (players.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:15px; color:var(--text-muted);">Hali o'quvchilar ulanmagan</div>`;
      return;
    }

    container.innerHTML = players.slice(0, 10).map((p, rank) => {
      const hasAnswered = (p.lastAnswer !== null && p.lastAnswer !== undefined);
      const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
      const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `${rank + 1}`;
      const statusHtml = hasAnswered 
        ? '<span style="color:#4ade80; font-size:12px; font-weight:700;">✓ Javob berdi</span>' 
        : '<span style="color:var(--text-muted); font-size:12px;">⏳ O\'ylamoqda...</span>';

      return `
        <div class="codehoot-rank-item" style="padding:8px 14px; margin-bottom:6px; background:rgba(255,255,255,0.06);">
          <div class="codehoot-rank-badge" style="font-size:16px; width:26px;">${medal}</div>
          <div class="codehoot-rank-avatar" style="width:30px; height:30px;">${avHtml}</div>
          <div class="codehoot-rank-name" style="font-size:14px; font-weight:600;">${this.escapeHtml(p.name)}</div>
          <div style="margin-right:12px;">${statusHtml}</div>
          <div class="codehoot-rank-score" style="font-size:15px;">${p.score || 0} ball</div>
        </div>
      `;
    }).join('');

    // Agar Butun ekran reyting doskasi ochiq bo'lsa, uni ham real-vaqtda yangilash
    if (this.isFullscreenLeaderboardOpen) {
      this.updateFullscreenLeaderboardGrid();
    }
  },

  // ─── BUTUN EKRAN REJIMI (FULLSCREEN LEADERBOARD & MODAL) ──────────
  toggleFullscreen() {
    const modalEl = document.getElementById('codehoot-modal');
    if (!modalEl) return;

    this.isModalFullscreen = !this.isModalFullscreen;
    modalEl.classList.toggle('codehoot-is-fullscreen', this.isModalFullscreen);

    const iconEl = document.getElementById('codehoot-fs-icon');
    const textEl = document.getElementById('codehoot-fs-text');
    if (this.isModalFullscreen) {
      if (iconEl) iconEl.textContent = '🗗';
      if (textEl) textEl.textContent = 'Kichraytirish';
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch (e) {}
    } else {
      if (iconEl) iconEl.textContent = '⛶';
      if (textEl) textEl.textContent = 'Butun ekran';
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch (e) {}
    }
  },

  openFullscreenLeaderboard() {
    const overlay = document.getElementById('codehoot-fs-leaderboard-overlay');
    if (!overlay) return;
    overlay.style.display = 'flex';
    this.isFullscreenLeaderboardOpen = true;
    this.updateFullscreenLeaderboardGrid();

    // Brauzerni to'liq ekranga o'tkazish
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } catch (e) {}
  },

  closeFullscreenLeaderboard() {
    const overlay = document.getElementById('codehoot-fs-leaderboard-overlay');
    if (overlay) overlay.style.display = 'none';
    this.isFullscreenLeaderboardOpen = false;

    // Chiqishda faqat modalning o'zi to'liq ekran bo'lmasa brauzer fullscreenidan chiqish
    if (!this.isModalFullscreen) {
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch (e) {}
    }
  },

  updateFullscreenLeaderboardGrid() {
    const grid = document.getElementById('codehoot-fs-lb-grid');
    if (!grid || !this.roomData || !this.roomData.players) return;

    const players = Object.values(this.roomData.players).sort((a, b) => (b.score || 0) - (a.score || 0));
    if (players.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-muted); font-size:18px;">Hozircha o'quvchilar ulanmagan</div>`;
      return;
    }

    grid.innerHTML = players.map((p, rank) => {
      const isMe = (p.id === this.playerId);
      const hasAnswered = (p.lastAnswer !== null && p.lastAnswer !== undefined);
      const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
      const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `${rank + 1}`;
      const statusHtml = hasAnswered 
        ? '<span style="color:#4ade80; font-size:13px; font-weight:700;">✓ Javob berdi</span>' 
        : "<span style=\"color:var(--text-muted); font-size:13px;\">⏳ O'ylamoqda...</span>";

      return `
        <div class="codehoot-fs-lb-card rank-${rank + 1} ${isMe ? 'is-me' : ''}">
          <div class="codehoot-fs-lb-left">
            <div class="codehoot-fs-lb-rank">${medal}</div>
            <div class="codehoot-fs-lb-av">${avHtml}</div>
            <div>
              <div class="codehoot-fs-lb-name">${this.escapeHtml(p.name)} ${isMe ? '<span style="color:#00d4ff; font-size:12px;">(Siz)</span>' : ''}</div>
              <div style="margin-top:2px;">${statusHtml}</div>
            </div>
          </div>
          <div class="codehoot-fs-lb-right">
            <div class="codehoot-fs-lb-score">${p.score || 0} ball</div>
          </div>
        </div>
      `;
    }).join('');
  },

  // Taymerni hisoblash
  startCountdownTimer(duration) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerSecondsLeft = duration;
    
    const timeDisplay = document.getElementById('codehoot-timer-num');
    const barFill = document.getElementById('codehoot-timer-progress');
    
    if (timeDisplay) timeDisplay.textContent = this.timerSecondsLeft;
    if (barFill) barFill.style.width = '100%';

    this.timerInterval = setInterval(() => {
      this.timerSecondsLeft--;
      if (timeDisplay) timeDisplay.textContent = Math.max(0, this.timerSecondsLeft);
      if (barFill) {
        const pct = Math.max(0, (this.timerSecondsLeft / duration) * 100);
        barFill.style.width = pct + '%';
        if (pct < 25) {
          barFill.style.background = '#ef4444';
        } else if (pct < 50) {
          barFill.style.background = '#f59e0b';
        } else {
          barFill.style.background = 'var(--accent-cyan)';
        }
      }

      // Ovozli tick
      if (this.timerSecondsLeft <= 5 && this.timerSecondsLeft > 0) {
        codehootSound.playTick();
      }

      if (this.timerSecondsLeft <= 0) {
        clearInterval(this.timerInterval);
        if (this.role === 'host') {
          this.revealQuestionResult();
        }
      }
    }, 1000);
  },

  // ─── 10. O'QUVCHI JAVOBNI BOSGANDA ────────────────────────────
  handlePlayerAnswer(index) {
    if (this.hasAnsweredCurrent) return;
    this.hasAnsweredCurrent = true;
    codehootSound.playClick();

    // Barcha tugmalarni muzlatish, tanlanganni belgilash
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`codehoot-btn-${i}`);
      if (btn) {
        btn.disabled = true;
        if (i === index) {
          btn.classList.add('selected');
        } else {
          btn.style.opacity = '0.35';
        }
      }
    }

    const curQ = this.questions[this.currentIndex];
    const isCorrect = (index === curQ.correct);
    
    // Ball hisoblash: tezkorlikka qarab 500 dan 1000 gacha ball
    const speedRatio = Math.max(0.1, this.timerSecondsLeft / this.timePerQuestion);
    const addedScore = isCorrect ? Math.round(500 + 500 * speedRatio) : 0;
    
    if (isCorrect) {
      this.playerScore += addedScore;
      this.playerStreak++;
    } else {
      this.playerStreak = 0;
    }

    // Feedback ko'rsatish
    const feedbackBox = document.getElementById('codehoot-player-feedback');
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.innerHTML = `
        <div style="font-size:16px; font-weight:600; color:var(--accent-cyan);">
          ✓ Javob qabul qilindi! Natijani kuting...
        </div>
      `;
    }

    // Ma'lumotlarni yuborish
    if (this.isLocalMode || !isFirebaseConnected) {
      if (this.roomData && this.roomData.players && this.roomData.players[this.playerId]) {
        const p = this.roomData.players[this.playerId];
        p.lastAnswer = index;
        p.lastAnswerCorrect = isCorrect;
        p.score = this.playerScore;
        p.streak = this.playerStreak;
      }
      this.updateAnswersCountDisplay();
    } else {
      const update = {};
      update[`players.${this.playerId}.lastAnswer`] = index;
      update[`players.${this.playerId}.lastAnswerCorrect`] = isCorrect;
      if (isCorrect) {
        update[`players.${this.playerId}.score`] = firebase.firestore.FieldValue.increment(addedScore);
        update[`players.${this.playerId}.streak`] = firebase.firestore.FieldValue.increment(1);
      } else {
        update[`players.${this.playerId}.streak`] = 0;
      }
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  // ─── 11. SAVOL NATIJASINI E'LON QILISH (REVEAL) ───────────────
  revealQuestionResult() {
    const update = {
      status: 'reveal',
      updatedAt: Date.now()
    };
    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'reveal';
      this.showRevealView();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  showRevealView() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.showScreen('reveal-screen');

    const specPanel = document.getElementById('codehoot-spectator-panel');
    if (specPanel) specPanel.style.display = 'none';

    const curQ = this.questions[this.currentIndex];
    if (!curQ) return;

    // To'g'ri javob matni
    const correctAnsText = document.getElementById('codehoot-reveal-correct-text');
    if (correctAnsText) {
      correctAnsText.textContent = curQ.options[curQ.correct];
    }

    // O'yinchining o'z natijasi
    const personalResult = document.getElementById('codehoot-reveal-personal');
    if (personalResult) {
      const isSpectator = (this.role === 'host' && this.hostMode === 'spectator');
      const myPlayerData = (this.roomData && this.roomData.players && this.roomData.players[this.playerId]) || null;
      const isCorrect = myPlayerData ? myPlayerData.lastAnswerCorrect : false;

      if (isSpectator) {
        personalResult.innerHTML = `
          <div style="font-size:15px; color:var(--text-muted); margin-bottom:14px; background:rgba(255,255,255,0.05); padding:8px 16px; border-radius:10px; display:inline-block;">
            📺 Tomoshabin (Katta ekran) rejimi — Natijalar ko'rinishi
          </div>
        `;
      } else if (isCorrect) {
        codehootSound.playCorrect();
        personalResult.innerHTML = `
          <div class="codehoot-banner correct animate-pop">
            <span style="font-size:36px;">🎉</span>
            <div>
              <div style="font-size:20px; font-weight:700;">Barakalla! To'g'ri javob!</div>
              <div style="font-size:14px; opacity:0.9;">Seriya: 🔥 ${this.playerStreak} ta ketma-ket | Ballingiz: <b>${this.playerScore}</b></div>
            </div>
          </div>
          ${this.renderMysteryChestsHtml()}
        `;
      } else {
        codehootSound.playWrong();
        personalResult.innerHTML = `
          <div class="codehoot-banner wrong animate-pop">
            <span style="font-size:36px;">😢</span>
            <div>
              <div style="font-size:20px; font-weight:700;">Noto'g'ri javob!</div>
              <div style="font-size:14px; opacity:0.9;">To'g'ri javob: <b>${this.escapeHtml(curQ.options[curQ.correct])}</b></div>
            </div>
          </div>
        `;
      }
    }

    // Javoblar taqsimoti statistikasi (barcha o'quvchilar qaysi javobni tanladi)
    const statsContainer = document.getElementById('codehoot-reveal-stats');
    if (statsContainer && this.roomData && this.roomData.players) {
      const counts = [0, 0, 0, 0];
      const players = Object.values(this.roomData.players);
      players.forEach(p => {
        if (p.lastAnswer !== null && p.lastAnswer !== undefined && p.lastAnswer >= 0 && p.lastAnswer < 4) {
          counts[p.lastAnswer]++;
        }
      });

      const maxCount = Math.max(1, ...counts);
      const shapes = ['🔺', '🔷', '🟡', '🟩'];
      const colors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];

      statsContainer.innerHTML = counts.map((cnt, i) => {
        const heightPct = Math.round((cnt / maxCount) * 100);
        const isThisCorrect = (i === curQ.correct);
        return `
          <div class="codehoot-bar-col ${isThisCorrect ? 'is-correct' : ''}">
            <div class="codehoot-bar-count">${cnt}</div>
            <div class="codehoot-bar-track">
              <div class="codehoot-bar-fill" style="height:${heightPct}%; background:${colors[i]};"></div>
            </div>
            <div class="codehoot-bar-label">${shapes[i]} ${isThisCorrect ? '✓' : ''}</div>
          </div>
        `;
      }).join('');
    }

    // Host uchun to'g'ridan-to'g'ri "Keyingi savol" tugmasi
    // (Har bir savoldan keyin ortiqcha reyting ekrani ko'rsatilmaydi, o'yin tez va jonli o'tadi!)
    const hostNextBtn = document.getElementById('codehoot-reveal-next-btn');
    if (hostNextBtn) {
      if (this.role === 'host') {
        hostNextBtn.style.display = 'inline-flex';
        const isLast = (this.matchEndTime && Date.now() >= this.matchEndTime);
        hostNextBtn.textContent = isLast ? "🏆 G'oliblarni e'lon qilish" : "Keyingi savol →";
        hostNextBtn.onclick = () => this.advanceToNextQuestion();
      } else {
        hostNextBtn.style.display = 'none';
      }
    }
  },

  // ─── 12. REYTING / LEADERBOARD EKRANI ─────────────────────────
  showLeaderboard() {
    const update = {
      status: 'leaderboard',
      updatedAt: Date.now()
    };
    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'leaderboard';
      this.showLeaderboardView();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  showLeaderboardView() {
    this.showScreen('leaderboard-screen');

    const listEl = document.getElementById('codehoot-leaderboard-list');
    if (!listEl || !this.roomData || !this.roomData.players) return;

    // Ball bo'yicha saralash
    const players = Object.values(this.roomData.players).sort((a, b) => (b.score || 0) - (a.score || 0));

    listEl.innerHTML = players.slice(0, 10).map((p, rank) => {
      const isMe = (p.id === this.playerId);
      const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
      const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `${rank + 1}`;

      return `
        <div class="codehoot-rank-item ${isMe ? 'is-me' : ''}">
          <div class="codehoot-rank-badge">${medal}</div>
          <div class="codehoot-rank-avatar">${avHtml}</div>
          <div class="codehoot-rank-name">${this.escapeHtml(p.name)} ${isMe ? '<b>(Siz)</b>' : ''}</div>
          <div class="codehoot-rank-score">${p.score || 0} ball</div>
        </div>
      `;
    }).join('');

    if (this.isFullscreenLeaderboardOpen) {
      this.updateFullscreenLeaderboardGrid();
    }

    // Host uchun "Keyingi savol" yoki "Natijalar" tugmasi
    const nextBtn = document.getElementById('codehoot-lb-next-btn');
    if (nextBtn) {
      if (this.role === 'host') {
        nextBtn.style.display = 'inline-flex';
        const isLast = (this.matchEndTime && Date.now() >= this.matchEndTime);
        nextBtn.textContent = isLast ? "🏆 G'oliblarni e'lon qilish" : "Keyingi savol →";
      } else {
        nextBtn.style.display = 'none';
      }
    }
  },


  // ─── SIRLI SANDIQCHALAR MINIO'YINI (MYSTERY CHESTS) ────────────
  renderMysteryChestsHtml() {
    if (this.currentLuckyChest === null || this.currentLuckyChest === undefined) {
      this.currentLuckyChest = Math.floor(Math.random() * 3);
    }
    return `
      <div class="codehoot-chests-wrapper animate-pop" id="codehoot-chests-block">
        <div class="codehoot-chests-title">
          🎁 <b>Sirli Sandiqchalar!</b> 3 tadan 1 tasida super-omad yashiringan:
        </div>
        <div class="codehoot-chests-grid">
          <div class="codehoot-chest-card" id="codehoot-chest-0" onclick="Codehoot.chooseMysteryChest(0)">
            <span class="codehoot-chest-icon">🎁</span>
            <div class="codehoot-chest-label">1-sandiq</div>
          </div>
          <div class="codehoot-chest-card" id="codehoot-chest-1" onclick="Codehoot.chooseMysteryChest(1)">
            <span class="codehoot-chest-icon">🎁</span>
            <div class="codehoot-chest-label">2-sandiq</div>
          </div>
          <div class="codehoot-chest-card" id="codehoot-chest-2" onclick="Codehoot.chooseMysteryChest(2)">
            <span class="codehoot-chest-icon">🎁</span>
            <div class="codehoot-chest-label">3-sandiq</div>
          </div>
        </div>
        <div id="codehoot-chest-result-box" style="display:none;"></div>
      </div>
    `;
  },

  chooseMysteryChest(chosenIndex) {
    if (this.hasChosenChestForCurrentQ) return;
    this.hasChosenChestForCurrentQ = true;

    const cards = [
      document.getElementById('codehoot-chest-0'),
      document.getElementById('codehoot-chest-1'),
      document.getElementById('codehoot-chest-2')
    ];
    cards.forEach(c => {
      if (c) c.classList.add('disabled');
    });

    const isLucky = (chosenIndex === this.currentLuckyChest);
    const resultBox = document.getElementById('codehoot-chest-result-box');

    // Sandiqlarni ochish va ko'rsatish
    cards.forEach((c, idx) => {
      if (!c) return;
      const icon = c.querySelector('.codehoot-chest-icon');
      const label = c.querySelector('.codehoot-chest-label');
      if (idx === chosenIndex) {
        if (isLucky) {
          c.classList.add('opened', 'lucky');
          if (icon) icon.textContent = '🌟';
          if (label) label.textContent = 'OMAD!';
        } else {
          c.classList.add('opened', 'empty');
          if (icon) icon.textContent = '💨';
          if (label) label.textContent = "Bo'sh!";
        }
      } else {
        if (idx === this.currentLuckyChest) {
          c.classList.add('unpicked-lucky');
          if (icon) icon.textContent = '🎁';
          if (label) label.textContent = 'Shu yerda edi!';
        } else {
          c.classList.add('opened', 'empty');
          if (icon) icon.textContent = '💨';
          if (label) label.textContent = "Bo'sh";
        }
      }
    });

    if (!isLucky) {
      codehootSound.playChestEmpty();
      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div class="codehoot-chest-event-box empty animate-pop">
            💨 <b>Afsus, bu sandiq bo'sh ekan!</b> 3 tadan 1 tasida super-omad yashiringan edi. Keyingi to'g'ri javobda yana sinab ko'ring!
          </div>
        `;
      }
      return;
    }

    // OMADLI SANDIQ TOPILDI!
    codehootSound.playLucky();

    const playersMap = (this.roomData && this.roomData.players) ? this.roomData.players : {};
    const opponents = Object.values(playersMap).filter(p => p.id !== this.playerId);

    // 3 xil super-hodisa:
    // 0: Joy almashtirish (Swap scores/places)
    // 1: 70% ochko o'g'irlash (Steal 70% score)
    // 2: Haqiqiy Coin + Ball Jackpot
    const eventType = Math.floor(Math.random() * 3);
    let eventHtml = '';
    let targetPlayer = null;
    let targetNewScore = 0;

    if (eventType === 0) {
      // 🔄 1. JOY ALMASHTIRISH (SWAP PLACES / SCORES)
      if (opponents.length > 0) {
        const higherOpponents = opponents.filter(p => (p.score || 0) > this.playerScore);
        targetPlayer = higherOpponents.length > 0
          ? higherOpponents[Math.floor(Math.random() * higherOpponents.length)]
          : opponents[Math.floor(Math.random() * opponents.length)];

        const myOldScore = this.playerScore;
        const oppOldScore = targetPlayer.score || 0;

        this.playerScore = oppOldScore;
        targetNewScore = myOldScore;
        targetPlayer.score = targetNewScore;

        if (this.roomData.players[this.playerId]) {
          this.roomData.players[this.playerId].score = this.playerScore;
        }
        if (this.roomData.players[targetPlayer.id]) {
          this.roomData.players[targetPlayer.id].score = targetNewScore;
        }

        eventHtml = `
          <div style="font-size:18px; margin-bottom:4px;">🔄 <b>SUPER JOY ALMASHTIRISH!</b></div>
          <div style="font-size:14px; opacity:0.95;">
            Siz <b>${this.escapeHtml(targetPlayer.name)}</b> bilan ballaringizni va o'rningizni almashdingiz!
            <br><span style="color:#fbbf24; font-weight:800; font-size:16px;">Yangi ballingiz: ${this.playerScore} ball!</span>
          </div>
        `;
      } else {
        this.playerScore += 800;
        if (this.roomData.players && this.roomData.players[this.playerId]) {
          this.roomData.players[this.playerId].score = this.playerScore;
        }
        eventHtml = `
          <div style="font-size:18px; margin-bottom:4px;">👑 <b>YAKKA HUKMDOR BONUSI!</b></div>
          <div style="font-size:14px; color:#fbbf24; font-weight:800; font-size:16px;">+800 ball taqdim etildi! (Jami: ${this.playerScore} ball)</div>
        `;
      }
    } else if (eventType === 1) {
      // 🦹 2. 70% OCHKO O'G'IRLASH (STEAL 70% POINTS)
      const opponentsWithScore = opponents.filter(p => (p.score || 0) > 0);
      if (opponentsWithScore.length > 0) {
        opponentsWithScore.sort((a, b) => (b.score || 0) - (a.score || 0));
        targetPlayer = opponentsWithScore[0];

        const stolen = Math.max(50, Math.round((targetPlayer.score || 0) * 0.7));
        targetNewScore = Math.max(0, (targetPlayer.score || 0) - stolen);
        targetPlayer.score = targetNewScore;
        this.playerScore = (this.playerScore || 0) + stolen;

        if (this.roomData.players[this.playerId]) {
          this.roomData.players[this.playerId].score = this.playerScore;
        }
        if (this.roomData.players[targetPlayer.id]) {
          this.roomData.players[targetPlayer.id].score = targetNewScore;
        }

        eventHtml = `
          <div style="font-size:18px; margin-bottom:4px;">🦹 <b>70% OCHKO O'G'IRLASH!</b></div>
          <div style="font-size:14px; opacity:0.95;">
            Siz <b>${this.escapeHtml(targetPlayer.name)}</b>dan uning 70% ochkosini (<b>+${stolen} ball</b>) o'g'irlab oldingiz!
            <br><span style="color:#4ade80; font-weight:800; font-size:16px;">Jami ballingiz: ${this.playerScore} ball!</span>
          </div>
        `;
      } else {
        this.playerScore += 700;
        if (this.roomData.players && this.roomData.players[this.playerId]) {
          this.roomData.players[this.playerId].score = this.playerScore;
        }
        eventHtml = `
          <div style="font-size:18px; margin-bottom:4px;">🦹 <b>MEGA O'G'IRLIK BONUSI!</b></div>
          <div style="font-size:14px; color:#4ade80; font-weight:800; font-size:16px;">Raqiblarda hali ball yo'q edi: Sandiqdan +700 ball o'g'irlab oldingiz!</div>
        `;
      }
    } else {
      // 🪙 3. HAQIQIY COIN + BALL JACKPOT
      const coinReward = 50;
      if (typeof addCoins === 'function') {
        addCoins(coinReward, "Codehoot: Sandiqdan yutib olindi!");
      }
      this.playerScore += 500;
      if (this.roomData.players && this.roomData.players[this.playerId]) {
        this.roomData.players[this.playerId].score = this.playerScore;
      }
      eventHtml = `
        <div style="font-size:18px; margin-bottom:4px;">🪙 <b>JACKPOT: HAQIQIY COIN!</b></div>
        <div style="font-size:14px; opacity:0.95;">
          Hisobingizga darhol <b style="color:#fbbf24; font-size:16px;">+${coinReward} Haqiqiy Coin</b> va <b>+500 ball</b> qo'shildi! 💎
          <br><span style="color:#fbbf24; font-weight:800;">Jami ballingiz: ${this.playerScore} ball!</span>
        </div>
      `;
    }

    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div class="codehoot-chest-event-box lucky animate-pop">
          ${eventHtml}
        </div>
      `;
    }

    // Firestore ma'lumotlarini darhol yangilash (Spectator va jonli reyting sinxronlanishi uchun)
    if (!this.isLocalMode && isFirebaseConnected && this.roomId) {
      const updateData = {};
      updateData[`players.${this.playerId}.score`] = this.playerScore;
      if (targetPlayer) {
        updateData[`players.${targetPlayer.id}.score`] = targetNewScore;
      }
      db.collection('kahoot_rooms').doc(this.roomId).update(updateData).catch(e => console.error("Score sync error:", e));
    }
  },

  // Host: Keyingi savolga o'tish yoki yakunlash
  advanceToNextQuestion() {
    const isTimeUp = this.matchEndTime && (Date.now() >= this.matchEndTime);
    if (isTimeUp) {
      this.finishGame();
      return;
    }
    // Agar savollar tugab qolsa lekin vaqt hali bor bo'lsa, yana savollar qo'shish
    if (this.currentIndex >= this.questions.length - 1) {
      const extraQuestions = this.getQuestionsForCategory(this.category, 30, this.difficulty);
      this.questions = this.questions.concat(extraQuestions);
      this.sendQuestion(this.currentIndex + 1);
    } else {
      this.sendQuestion(this.currentIndex + 1);
    }
  },

  // ─── 13. O'YIN YAKUNI VA SHOHSUPA (PODIUM) ─────────────────────
  finishGame() {
    if (this.matchTimerInterval) {
      clearInterval(this.matchTimerInterval);
      this.matchTimerInterval = null;
    }
    const update = {
      status: 'finished',
      updatedAt: Date.now()
    };
    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'finished';
      this.showPodiumView();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  showPodiumView() {
    if (this.matchTimerInterval) {
      clearInterval(this.matchTimerInterval);
      this.matchTimerInterval = null;
    }
    this.showScreen('podium-screen');
    codehootSound.playFanfare();

    if (!this.roomData || !this.roomData.players) return;
    const players = Object.values(this.roomData.players).sort((a, b) => (b.score || 0) - (a.score || 0));

    const p1 = players[0];
    const p2 = players[1];
    const p3 = players[2];

    const podiumContainer = document.getElementById('codehoot-podium-cards');
    if (podiumContainer) {
      const renderPodiumStep = (p, rank, height, medal, coins) => {
        if (!p) return '<div class="codehoot-podium-slot empty"></div>';
        const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
        return `
          <div class="codehoot-podium-step rank-${rank} animate-slide-up" style="--h:${height}px;">
            <div class="codehoot-podium-player">
              <div class="codehoot-podium-medal">${medal}</div>
              <div class="codehoot-podium-av">${avHtml}</div>
              <div class="codehoot-podium-name">${this.escapeHtml(p.name)}</div>
              <div class="codehoot-podium-score">${p.score || 0} ball</div>
              <div class="codehoot-podium-reward">+${coins} 🪙</div>
            </div>
            <div class="codehoot-podium-pillar" style="height:${height}px;">
              <span class="pillar-num">${rank}</span>
            </div>
          </div>
        `;
      };

      podiumContainer.innerHTML = `
        <div class="codehoot-podium-wrapper">
          ${renderPodiumStep(p2, 2, 140, '🥈', 100)}
          ${renderPodiumStep(p1, 1, 190, '🥇', 150)}
          ${renderPodiumStep(p3, 3, 100, '🥉', 50)}
        </div>
      `;
    }

    // Foydalanuvchiga tangalar mukofotini taqdim etish
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (currentUser) {
      const myRank = players.findIndex(p => p.id === this.playerId);
      let earnedCoins = 15; // Ishtirok uchun
      if (myRank === 0) earnedCoins = 150;
      else if (myRank === 1) earnedCoins = 100;
      else if (myRank === 2) earnedCoins = 50;

      if (typeof addCoins === 'function') {
        addCoins(earnedCoins, `Codehoot viktorinasida ${myRank >= 0 ? (myRank + 1) + "-o'rin" : "ishtirok"}`);
      }

      const rewardNotice = document.getElementById('codehoot-my-reward-notice');
      if (rewardNotice) {
        rewardNotice.innerHTML = `
          <div style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 12px; padding: 12px 20px; display:inline-flex; align-items:center; gap:10px; margin-top:20px;">
            <span style="font-size:24px;">🪙</span>
            <div style="text-align:left;">
              <div style="font-size:14px; color:var(--accent-yellow); font-weight:700;">Tabriklaymiz! Hisobingizga +${earnedCoins} Coin qo'shildi!</div>
              <div style="font-size:12px; color:var(--text-muted);">Sizning o'rningiz: ${myRank >= 0 ? (myRank + 1) : '-'} | Ball: ${this.playerScore}</div>
            </div>
          </div>
        `;
      }
    }
  },

  // Yordamchi: HTML belgilarni xavfsiz qilish
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};

// Global doiraga eksport qilish
window.Codehoot = Codehoot;
window.openCodehoot = () => Codehoot.open();
window.closeCodehoot = () => Codehoot.close();

// DOM tayyor bo'lganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  Codehoot.init();
});
