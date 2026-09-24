export interface PalimpsestEntry {
  text: string;
}

export interface PalimpsestSection {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  entries: PalimpsestEntry[];
}

import p1 from "@/assets/palimpsest/palimpsest-final-1.jpg.asset.json";
import p2 from "@/assets/palimpsest/palimpsest-final-2.jpg.asset.json";
import p3 from "@/assets/palimpsest/palimpsest-final-3.jpg.asset.json";
import p4 from "@/assets/palimpsest/palimpsest-final-4.jpg.asset.json";
import p5 from "@/assets/palimpsest/palimpsest-final-5.jpg.asset.json";
import p6 from "@/assets/palimpsest/palimpsest-final-6.jpg.asset.json";
import gPrelude from "@/assets/palimpsest/gen-prelude.jpg";
import gGordon from "@/assets/palimpsest/gen-gordon.jpg";
import gUcwi from "@/assets/palimpsest/gen-ucwi.jpg";
import gLewis from "@/assets/palimpsest/gen-lewis.jpg";
import { assetUrl } from "@/lib/asset-url";

export const palimpsest: PalimpsestSection[] = [
  {
    id: "prelude",
    title: "Prelude, The Old World",
    image: gPrelude,
    imageAlt: "A gothic stone university quadrangle beside a modern white ribbed walkway",
    entries: [
      { text: "The University of Oxford. No clear date of foundation, but teaching commenced in some form in 1096 and developed rapidly from 1167 onwards when Henry II banned English students from attending the University of Paris." },
      { text: "The University of Cambridge was established in 1209 and given royal charter status by King Henry III in 1231." },
      { text: "Marco Polo, 1234–1324." },
      { text: "Harrow School, an independent boarding school in England for pupils 13–18, established in 1243." },
      { text: "Dante, 1265–1321. Chaucer, 1328–1400." },
      { text: "1343, University of Pisa established." },
      { text: "Winchester College established in 1382. 1386, University of Heidelberg established." },
      { text: "1428, Vitterino establishes school at Mantua, Italy. 1431, Joan of Arc burned in Rouen." },
      { text: "King Henry VI of England established Eaton College in 1440 for boys who would then go on to King's College Cambridge." },
      { text: "1447, University of Prague established. 1455, First book printed." },
    ],
  },
  {
    id: "los-reyes",
    title: "Los Reyes Católicos",
    image: assetUrl(p2),
    imageAlt: "A brown-slatted globe building beside a white solar-roofed structure at a campus",
    entries: [
      { text: "1498, First Peoples in Trinidad encounter the Italian Navigator Christopher Columbus on a voyage sponsored by Isabel I de Castilla and Ferdinand II of Aragon of Spain." },
      { text: "Leonardo da Vinci completes 'The Last Supper' in 1498. 1502, University of Wittemberg established. 1504, Raphael completes 'Marriage of the Virgin'. 1520, Magellan circumnavigates the globe." },
      { text: "1506–1526, Diego Colon, First Spanish Governor. Putting coins into circulation did not succeed. An initial step to introduce schooling for the young was unsuccessful." },
      { text: "Encomiendas located at Arouca, Tacarigua, San Juan and Caura. Encomienda System of Indoctrination." },
      { text: "1543, Copernicus models the universe with the sun, not the earth, at the centre." },
      { text: "Captain John Hawkins makes the first English slaving voyage to Africa in 1562 under Elizabeth I." },
      { text: "1567, Rugby School established. Sir Francis Drake makes one of the first English slaving voyages as part of a fleet led by his cousin John Hawkins." },
      { text: "1588, Spanish Armada defeated by Sir Francis Drake. Kepler defends the Copernican model in his 1596 Mysterium Cosmographicum." },
      { text: "1597, Romeo and Juliet published by Shakespeare. 1599, Final form of the Jesuit Ratio Studiorum. 1611, Charterhouse established." },
      { text: "1699, The Arena Amerindian Ambush in Trinidad. Industrial Revolution, 1760–1840, financed by the Transatlantic Slave Trade." },
      { text: "1783, Article 5 of the Cedula of Population allows Republicans from French colonies and free blacks and coloureds citizenship in Trinidad after five years and the right to hold public office and own lands." },
      { text: "Migration from Grenada, Martinique, Guadeloupe and Dominica to Trinidad during the French Revolution (1789–1799), establishing communities in Blanchisseuse, Champs Fleurs, Cascade, Carenage and Laventille." },
      { text: "The Haitian Revolution, 1791–1804. 1797, Sir Ralph Abercromby invades and takes Trinidad; Don José María Chacón surrenders at Valsayn Estate." },
    ],
  },
  {
    id: "george-victoria",
    title: "1797–1834, George III & Queen Victoria",
    image: assetUrl(p4),
    imageAlt: "Reflective blue glass towers above a brick-paved plaza",
    entries: [
      { text: "Governor Abercromby, 1797–1802." },
      { text: "Governor Picton, 1802–1813. The Spanish Cabildo form of Government remains intact. Population speaking French patois, Spanish and other languages. Pre-Dawn Slave Schools introduced." },
      { text: "1808 Census: 1,635 Amerindians; 21,895 enslaved Africans; 22 Chinese; 2,476 Europeans, 1,147 British, 781 French, 459 Spanish, 36 Corsican, 29 German, and 24 from elsewhere." },
      { text: "Governor Woodford, 1813–1828. Education of free coloured by private teachers disallowed. 1817, Registration and licensing of all schools introduced. 1820, Compulsory Education Ordinance. 1820, Establishment of two Cabildo Elementary Schools for free coloureds." },
      { text: "No endowed or charity schools founded in Trinidad by rich planters for poor white boys like Wolmer's in Jamaica. 1830, Finishing School for Ladies of Class established." },
      { text: "Governor Harris, 1846–1853. Board of Education established, becoming the Department of Education and then the MoE. Inspector of Schools appointed. Teacher Training School established. Education to be free. No books to be used without permission of the Board. Religion expressly removed from the curriculum." },
      { text: "After 1834 abolition: 1836, St Joseph's Convent. 1837, St George's College." },
    ],
  },
  {
    id: "morton",
    title: "1845–1868, Rev John Morton",
    image: assetUrl(p3),
    imageAlt: "A ribbed cylindrical structure beside a dark slatted dome on a walkway",
    entries: [
      { text: "Rev John Morton intervenes to educate the newly arrived indentured labouring class from India." },
      { text: "1853, Church of England Grammar School. 1859, Queen's Collegiate School, founded on an Eton/Harrow/Winchester model, instruction described as 'classical education' with early, vigorous training in Latin and Greek. Religion forbidden from the curriculum." },
      { text: "The French Catholics respond by establishing St Mary's College in 1863." },
    ],
  },
  {
    id: "gordon-gladstone",
    title: "1870, Gordon–Gladstone Dual System of Control",
    image: gGordon,
    imageAlt: "Ruins of a Caribbean sugar estate with a stone chimney beside cane fields",
    entries: [
      { text: "Governor Gordon, following William Gladstone and the findings of the Keenan Inquiry of 1869, introduced a system by which government-controlled and denominational schools would receive aid and compete on specific terms for government grants." },
      { text: "1875, System adjusted to make it easier for denominational schools to get grants. 1890, Government to establish schools only where the church could not or would not. 1901–1902, Fees abolished, increasing government funding burden; building and apparatus grants to existing denominational schools discontinued." },
      { text: "1875, Schools in Tobago come under the control of the Board of Education." },
    ],
  },
  {
    id: "icta",
    title: "1921, Sir Francis Watts and the ICTA",
    image: assetUrl(p1),
    imageAlt: "A long ribbed cylindrical walkway through a green park",
    entries: [
      { text: "After cacao production declined in 1921, the Old Yaws Hospital was selected as the first site for the Imperial College of Tropical Agriculture (ICTA) in Trinidad, the first tertiary site of learning on the island." },
      { text: "ICTA was a school for the British Empire, not Trinidad and Tobago. It granted no degrees. It guarded its imperial character. It failed to be a university, a bastion of English civilisation in a colony tightly controlled from England, unlikely to be reformed into a University for the West Indies." },
      { text: "1925, Bishop's High School begins in Tobago, providing opportunity for non-whites. A variant that could not happen in Trinidad in the 1920s. Even stranger was the non-white Barbadian principal, Rawle Jordan." },
    ],
  },
  {
    id: "ucwi",
    title: "1943, University College of the West Indies",
    image: gUcwi,
    imageAlt: "Students walking past an arcaded Caribbean university college among palms",
    entries: [
      { text: "The Asquith Commission of Vice Chancellors was appointed to 'consider the principles which should guide the promotion of higher education, learning and research… in the colonies.'" },
      { text: "In 1943 there were about 20 East Indian students at McGill University in Canada. In 1945 eight Chinese boys departed to study in England. In 1948 it was reported that 77 graduates of Naparima College were at universities abroad." },
      { text: "Following the Asquith Commission, the Gibraltar World War II Camp in Kingston, Jamaica became the University College of the West Indies, a college created by royal charter in 1948 as part of the University of London." },
    ],
  },
  {
    id: "uwi-staug",
    title: "1960, UWI, St. Augustine",
    image: assetUrl(p5),
    imageAlt: "A modern tram passing through an urban transit hub framed by white ribbed tubes",
    entries: [
      { text: "St Augustine campus of the University of the West Indies was born out of a merger between the University College and the Imperial College of Tropical Agriculture (ICTA). Affiliated with the University of London until 1962, when it became the University of the West Indies." },
    ],
  },
  {
    id: "lewis-williams",
    title: "1962, Lewis–Williams: Education for Industrialisation",
    image: gLewis,
    imageAlt: "A glass-fronted engineering research institute with industrial pipework",
    entries: [
      { text: "Trinidad and Tobago becomes Independent. The West Indian Federation collapses. Drafting of the Gurr 1967–1983 Education Plan commences." },
      { text: "Under Williams, a multi-faculty university campus emerged in Trinidad between 1960 and 1963: agriculture, engineering, arts and sciences." },
      { text: "Graduates would staff the new secondary schools as proposed in the Gurr Education Plan 1968–1983. Since government paid all the fees of nationals at the St Augustine campus, the campus was the culmination of a framework of free education from primary to tertiary." },
    ],
  },
  {
    id: "jfk-mthope",
    title: "1969 / 1979, Eric Williams, JFK Library and Mt Hope",
    image: assetUrl(p6),
    imageAlt: "A figure before a curved metallic monument engraved with scientific formulas and names",
    entries: [
      { text: "1969, The JFK quadrangle, along with the JFK Library, was completed with funds from the government of the United States of America through the efforts of Prime Minister Eric Williams." },
      { text: "1979, Sir Arthur Lewis receives the Nobel Prize in Economics. Dr Eric Williams devised the medical sciences complex at Mt Hope, medical, dental, veterinary, pharmacy and advanced nursing education on a single site." },
    ],
  },
];
