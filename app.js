/* Portugal Through Time — content, filters, navigation, and detail dialogs. */
(() => {
  "use strict";


  const periods = [
    {
      id: "prehistory", number: "01", title: "Prehistoric Era", dates: "c. 400,000 – c. 1000 BCE", era: "ancient",
      short: "Long before Portugal existed as a kingdom, communities lived, gathered, farmed, and built monuments across this region.",
      description: "The story of the land that is now Portugal reaches deep into prehistory. Different hominin communities inhabited the region, while later societies developed farming, metalworking, exchange networks, and distinctive burial and ritual monuments. The evidence is archaeological rather than written, so dates and interpretations can change as discoveries are made.",
      points: ["Palaeolithic communities used stone tools and adapted to changing climates.", "Neolithic communities adopted agriculture and animal husbandry at different times and places.", "Megalithic monuments, including dolmens, reflect complex beliefs and community practices.", "Bronze and Iron Age societies participated in regional trade networks and developed varied local cultures."],
      events: [["c. 400,000 years ago", "Evidence of early human occupation in the region."], ["5th–3rd millennia BCE", "Farming and settled communities spread across parts of the region."], ["1st millennium BCE", "Iron Age communities and Mediterranean trade contacts became increasingly visible in the archaeological record."]]
    },
    {
      id: "pre-roman", number: "02", title: "Pre-Roman Societies & Mediterranean Contacts", dates: "c. 1000 – 218 BCE", era: "ancient",
      short: "Local communities interacted with Celtic, Phoenician, Greek, and Carthaginian networks before Roman conquest.",
      description: "The western Iberian Peninsula was home to many peoples rather than a single unified society. Coastal trading posts connected some communities with Mediterranean commerce, while inland and northern groups maintained their own languages, practices, and political structures. The Lusitanians later became especially prominent in resistance to Rome.",
      points: ["Communities varied widely between coast, river valleys, and uplands.", "Trade brought metal goods, pottery, and other objects between the region and Mediterranean networks.", "Lusitanian identity and resistance developed in a complex landscape of local groups and alliances."],
      events: [["c. 1st millennium BCE", "Iron Age settlements and regional trade expanded."], ["8th–6th centuries BCE", "Phoenician trading networks became active in parts of the wider Iberian Peninsula."], ["218 BCE", "Roman forces arrived in Iberia during the Second Punic War."]]
    },
    {
      id: "roman", number: "03", title: "Roman Conquest & Rule", dates: "218 BCE – 409 CE", era: "ancient",
      short: "Roman rule reshaped administration, trade, infrastructure, language, and religion across much of the region.",
      description: "Roman involvement began in Iberia in 218 BCE. Conquest was gradual: southern areas came under Roman control earlier, while resistance in the west and northwest continued for generations. The lands of modern Portugal were divided among Roman administrative territories, including Lusitania and parts of Gallaecia. Latin became foundational to Portuguese, and Roman roads, towns, mines, and institutions left enduring traces.",
      points: ["Lusitanian resistance is closely associated with Viriathus, who fought Roman forces in the 2nd century BCE.", "Augustus's campaigns in the northwest ended a major phase of conquest by 19 BCE.", "Urban centres, road networks, mining, and agricultural production were integrated into the Roman world.", "Christianity spread in late antiquity, while local life remained diverse."],
      events: [["218 BCE", "Roman forces arrived in Iberia during the Second Punic War."], ["2nd century BCE", "Viriathus became a prominent leader of Lusitanian resistance."], ["19 BCE", "Augustus's campaigns brought a key phase of conquest in northwest Iberia to a close."], ["212 CE", "The Constitutio Antoniniana extended Roman citizenship to most free inhabitants of the empire."], ["409 CE", "Germanic groups entered the Iberian Peninsula amid the changing western Roman world."]]
    },
    {
      id: "suebi-visigoths", number: "04", title: "The Suebi & Visigoths", dates: "409 – 711", era: "ancient",
      short: "Post-Roman kingdoms governed the region as political authority and religious institutions changed.",
      description: "After imperial power weakened, the Suebi established a kingdom centred in the northwest, while Visigothic power expanded across much of Iberia. Political alliances and conflict shifted over time. Christianity became a major institutional force, though the region's communities did not change uniformly or all at once.",
      points: ["The Suebi kingdom developed around Braga and nearby areas.", "Visigothic authority expanded and eventually incorporated the Suebic kingdom.", "Church institutions, rural communities, and inherited Roman systems continued to shape daily life."],
      events: [["409", "Groups including the Suebi entered and settled in parts of Iberia."], ["5th–6th centuries", "The Suebic and Visigothic kingdoms competed and interacted across the peninsula."], ["585", "The Visigothic kingdom absorbed the Suebi kingdom."], ["711", "An Umayyad-led invasion crossed into Iberia, beginning a major political transformation."]]
    },
    {
      id: "andalus", number: "05", title: "Al-Andalus & the Christian North", dates: "711 – c. 868 and beyond", era: "ancient",
      short: "Islamic-ruled territories and northern Christian polities shaped a changing, interconnected Iberia.",
      description: "Beginning in 711, Muslim forces conquered most of the Visigothic kingdom. The region that is now Portugal became part of Al-Andalus in varying political forms, while Christian polities developed and expanded in the north. These centuries involved coexistence, trade, scholarship, migration, warfare, and shifting political boundaries — not a simple or uninterrupted divide between two communities.",
      points: ["Cities, agriculture, irrigation, crafts, and trade developed under different Muslim-ruled states.", "Arabic and Islamic cultural influence interacted with existing local and Christian traditions.", "The northern frontier shifted over time as Christian rulers expanded and Muslim states changed."],
      events: [["711", "The conquest of the Visigothic kingdom began."], ["8th–10th centuries", "Political authority shifted among emirates, caliphates, and Christian northern polities."], ["c. 868", "Vímara Peres established a county centred on Portucale within the Christian north."]]
    },
    {
      id: "county", number: "06", title: "The County of Portugal", dates: "c. 868 – 1139", era: "medieval",
      short: "A frontier county gradually developed into a more autonomous political community.",
      description: "The County of Portugal emerged within the shifting political world of the Christian northwest. Its rulers were initially connected to the Kingdom of León, but local power and autonomy grew. Henry of Burgundy became count in the late 11th century, and his son Afonso Henriques pursued greater independence through warfare, diplomacy, and changing alliances.",
      points: ["Portucale became an important political and territorial centre.", "The county's boundaries and authority changed through warfare, settlement, and negotiations.", "Afonso Henriques became the central figure in the transition from county to kingdom."],
      events: [["c. 868", "Vímara Peres established control around Portucale in the Christian north."], ["1096", "Henry of Burgundy received the County of Portugal as a fief."], ["1128", "Afonso Henriques defeated forces aligned with his mother at the Battle of São Mamede."], ["1139", "Afonso Henriques adopted the royal title after victory traditionally associated with Ourique."]]
    },
    {
      id: "kingdom", number: "07", title: "The Medieval Kingdom of Portugal", dates: "1139 – 1415", era: "medieval",
      short: "Portugal consolidated its monarchy and borders while navigating dynastic crisis, alliances, and conflict.",
      description: "The kingdom took shape through a long process rather than one single founding moment. Recognition of Portuguese royal authority developed through military campaigns, diplomacy, and papal support. The conquest of the Algarve in 1249 brought the mainland reconquest to a close, while later monarchs strengthened institutions and borders. The crisis of 1383–1385 helped secure the Avis dynasty and a close alliance with England.",
      points: ["Different milestones — including 1139, 1143, and 1179 — mark stages in the development of Portuguese independence and royal recognition.", "The conquest of the Algarve was completed in 1249; borders were clarified in later agreements.", "The crisis of 1383–1385 culminated in the victory at Aljubarrota and a new dynasty.", "The Treaty of Windsor in 1386 formalised a lasting Anglo-Portuguese alliance."],
      events: [["1143", "The Treaty of Zamora helped formalise recognition of Afonso Henriques's kingship."], ["1179", "The papal bull Manifestis Probatum recognised Afonso Henriques as king."], ["1249", "The conquest of the Algarve brought the mainland reconquest to a close."], ["1297", "The Treaty of Alcañices helped define Portugal's eastern border."], ["1385", "The Battle of Aljubarrota secured the position of João I."], ["1386", "Portugal and England concluded the Treaty of Windsor."]]
    },
    {
      id: "expansion", number: "08", title: "Maritime Expansion & Empire", dates: "1415 – 1580", era: "early-modern",
      short: "Oceanic voyages connected Portugal to Africa, Asia, and the Americas — with profound and unequal consequences.",
      description: "Portugal's maritime expansion began with the conquest of Ceuta in 1415 and developed into networks of trading posts, settlements, military outposts, and colonial territories. Voyages helped connect the Atlantic and Indian Ocean worlds, but expansion also relied on coercion, warfare, dispossession, and the transatlantic slave trade. The gains and harms of empire were experienced very differently by different communities.",
      points: ["Portuguese voyages expanded European maritime knowledge and linked several oceanic trade systems.", "The crown, merchants, missionaries, sailors, and local intermediaries shaped overseas networks.", "Colonial power created exchange and cultural change alongside exploitation and violence.", "Portugal's imperial ambitions faced severe strain after the defeat at Alcácer Quibir in 1578."],
      events: [["1415", "Portuguese forces captured Ceuta in North Africa."], ["1488", "Bartolomeu Dias rounded the Cape of Good Hope."], ["1498", "Vasco da Gama reached India by sea from Europe."], ["1500", "Pedro Álvares Cabral's fleet reached the coast of what became Brazil."], ["1578", "King Sebastião died after the Portuguese defeat at Alcácer Quibir."], ["1580", "A succession crisis led to dynastic union with the Spanish monarchy."]]
    },
    {
      id: "iberian-union", number: "09", title: "Iberian Union & Restoration", dates: "1580 – 1668", era: "early-modern",
      short: "A dynastic union with Spain ended after a revolt and a long war to restore Portuguese independence.",
      description: "After the succession crisis of 1580, the Portuguese crown was held by the Spanish Habsburg monarchs. Portugal retained distinct institutions, but its overseas empire became entangled in the conflicts of the wider Spanish monarchy. On 1 December 1640, a revolt restored a Portuguese monarchy under João IV; the ensuing war ended with Spanish recognition of Portugal's independence in 1668.",
      points: ["The union did not erase every Portuguese institution, but it changed the kingdom's strategic position.", "Overseas territories faced attacks from Spain's European rivals.", "The Restoration War combined military conflict, diplomacy, and internal political consolidation."],
      events: [["1580", "A succession crisis brought Portugal under the same monarch as Spain."], ["1 December 1640", "A revolt in Lisbon restored an independent Portuguese monarchy."], ["1668", "The Treaty of Lisbon secured Spain's recognition of Portuguese independence."]]
    },
    {
      id: "reform", number: "10", title: "Monarchy, Reform & Atlantic Change", dates: "1668 – 1807", era: "early-modern",
      short: "Economic pressures, imperial wealth, Enlightenment ideas, and major reforms reshaped the monarchy.",
      description: "After independence was secured, Portuguese monarchs worked to stabilise the state and manage its overseas connections. Gold and diamonds from Brazil affected the economy and court, while the 1755 Lisbon earthquake led to a major rebuilding effort and became a defining event in European intellectual history. Under Sebastião José de Carvalho e Melo, later Marquis of Pombal, the government pursued centralising reforms that remain contested in their effects.",
      points: ["The Portuguese empire remained closely tied to Brazil and Atlantic commerce.", "The 1755 earthquake, tsunami, and fires devastated Lisbon and prompted major rebuilding.", "Pombaline reforms expanded state control and altered education, commerce, and religious institutions.", "Enslavement and colonial exploitation continued to support parts of the imperial economy."],
      events: [["1750", "The reign of José I began; Pombal became the dominant minister."], ["1 November 1755", "An earthquake, tsunami, and fires devastated Lisbon and nearby areas."], ["1755 onward", "Lisbon underwent a major reconstruction programme."], ["1807", "The Portuguese royal court left for Brazil in response to the Napoleonic invasion."]]
    },
    {
      id: "napoleonic", number: "11", title: "Napoleonic Crisis & Liberal Conflict", dates: "1807 – 1834", era: "modern",
      short: "Invasion, the court's move to Brazil, revolution, and civil war challenged the old political order.",
      description: "French invasions disrupted Portugal, while the transfer of the royal court to Brazil shifted political power across the Atlantic. The Liberal Revolution of 1820 demanded constitutional government. Brazil declared independence in 1822, and Portugal endured fierce conflict between liberal constitutionalists and absolutists. The civil war ended in 1834 with a liberal victory, though political stability remained elusive.",
      points: ["The Peninsular War caused extensive disruption and exposed the limits of royal authority.", "The court's stay in Rio de Janeiro changed the relationship between Portugal and Brazil.", "Liberalism and absolutism clashed over sovereignty, constitutions, and the role of the monarchy.", "The abolition of religious orders in 1834 was among the changes introduced by the victorious liberals."],
      events: [["1807–1811", "French invasions and the Peninsular War reshaped Portugal."], ["1820", "The Liberal Revolution began in Porto and spread to Lisbon."], ["1822", "Portugal adopted a constitution; Brazil declared independence."], ["1834", "Liberal forces won the civil war and dismantled male religious orders."]]
    },
    {
      id: "constitutional-monarchy", number: "12", title: "Constitutional Monarchy", dates: "1834 – 1910", era: "modern",
      short: "Liberal institutions developed amid political instability, economic change, and growing republican sentiment.",
      description: "Portugal spent the late 19th century balancing constitutional politics, economic modernisation, social inequality, and a changing empire. Governments came and went amid disputes over reform and public finances. The British Ultimatum of 1890 damaged the monarchy's prestige, while the assassinations of King Carlos I and the crown prince in 1908 intensified the crisis that ended with the proclamation of a republic in 1910.",
      points: ["Constitutional institutions expanded but political power remained contested and unequal.", "Railways, urbanisation, and industrial activity grew unevenly across the country.", "Colonial ambitions in Africa contributed to diplomatic tensions and public debate.", "Republican movements gained strength in the context of financial and political crisis."],
      events: [["1851", "The Regeneration movement initiated a period of infrastructure and administrative reform."], ["1890", "The British Ultimatum triggered a major national political crisis."], ["1 February 1908", "King Carlos I and Crown Prince Luís Filipe were assassinated in Lisbon."], ["5 October 1910", "The monarchy fell and the Portuguese Republic was proclaimed."]]
    },
    {
      id: "first-republic", number: "13", title: "The First Republic", dates: "1910 – 1926", era: "modern",
      short: "Republican leaders redefined national symbols, but frequent government changes and unrest weakened the regime.",
      description: "The First Republic sought to replace monarchy with a parliamentary system and reshape the relationship between the state and the Catholic Church. It introduced a new flag and national anthem, expanded secular reforms, and entered the First World War. Yet governments changed frequently and Portugal experienced social conflict, military intervention, and economic strain. A coup in 1926 brought the republic's parliamentary period to an end.",
      points: ["The 1911 Constitution established the new republican framework.", "Secular reforms affected education, religious institutions, and public life.", "Portugal entered the First World War on the Allied side in 1916.", "Political instability and economic pressure contributed to the military coup of 1926."],
      events: [["1910", "The republic replaced the monarchy."], ["1911", "A republican constitution was approved and new national symbols adopted."], ["1916–1918", "Portugal participated in the First World War."], ["28 May 1926", "A military coup ended the First Republic's parliamentary system."]]
    },
    {
      id: "estado-novo", number: "14", title: "Dictatorship & the Estado Novo", dates: "1926 – 1974", era: "modern",
      short: "Authoritarian rule brought censorship and political repression, while colonial wars reshaped society and the armed forces.",
      description: "The military dictatorship that began in 1926 developed into the Estado Novo under António de Oliveira Salazar. The regime promoted order and nationalism while restricting political opposition, labour organisation, and freedom of expression. Censorship and the political police were central to its control. From 1961, wars in Angola, Guinea-Bissau, and Mozambique became a growing burden. On 25 April 1974, the Armed Forces Movement overthrew the regime in the Carnation Revolution.",
      points: ["The 1933 Constitution formalised the Estado Novo authoritarian system.", "Censorship, political imprisonment, and surveillance restricted civil liberties.", "Colonial wars began in 1961 and continued into the final years of the dictatorship.", "The 1974 revolution opened a rapid and contested transition to democracy and decolonisation."],
      events: [["1926", "A military coup initiated a dictatorship."], ["1933", "The Estado Novo constitutional framework took effect."], ["1961", "Armed conflict began in Angola and spread within the wider colonial wars."], ["1968", "Salazar was replaced by Marcelo Caetano after becoming incapacitated."], ["25 April 1974", "The Carnation Revolution overthrew the Estado Novo."]]
    },
    {
      id: "democracy", number: "15", title: "Revolution & the Democratic Transition", dates: "1974 – 1986", era: "contemporary",
      short: "The revolution ended dictatorship and opened a turbulent transition to elections, a new constitution, and decolonisation.",
      description: "The Carnation Revolution restored political freedoms and initiated a period of intense political debate. Provisional governments, mass mobilisation, nationalisations, and struggles over the future political system shaped 1974–1976. Portugal recognised the independence of its African colonies in 1974–1975, and the 1976 Constitution established the framework for democratic government. Civilian institutions consolidated, and the country joined the European Communities in 1986.",
      points: ["Censorship and restrictions on political organisation were dismantled.", "The transition included sharp political conflict and large changes in property and industry.", "Decolonisation reshaped Portugal and the newly independent states across Africa.", "Democratic institutions stabilised over time, leading to European Community membership."],
      events: [["25 April 1974", "The Carnation Revolution ended the Estado Novo."], ["1975", "Constituent Assembly elections were held as decolonisation advanced."], ["2 April 1976", "The new democratic Constitution was approved."], ["1982", "Constitutional reform strengthened civilian control over the armed forces."], ["1 January 1986", "Portugal joined the European Communities."]]
    },
    {
      id: "europe", number: "16", title: "European Integration", dates: "1986 – 2002", era: "contemporary",
      short: "Membership in European institutions supported new investment, infrastructure, and deeper international integration.",
      description: "Portugal's entry into the European Communities marked a new phase in its relationship with Europe. Structural funds contributed to infrastructure and regional development, while the economy and society continued to change. Political leaders also faced questions about regional inequality, modernisation, and the place of Portugal in a more integrated Europe. The euro became an accounting currency in 1999 and entered everyday circulation in 2002.",
      points: ["European membership expanded access to markets, investment, and development funds.", "Transport infrastructure and public services changed substantially over the period.", "Macau was transferred to Chinese sovereignty in 1999, ending the last Portuguese-administered territory in Asia.", "The euro replaced the escudo for everyday payments in 2002."],
      events: [["1986", "Portugal joined the European Communities."], ["1998", "Expo '98 was held in Lisbon, focused on oceans and the future."], ["20 December 1999", "Macau was transferred to Chinese sovereignty."], ["1 January 1999", "The euro was introduced for accounting and electronic transactions."], ["1 January 2002", "Euro banknotes and coins entered circulation."]]
    },
    {
      id: "contemporary", number: "17", title: "Contemporary Portugal", dates: "2002 – Present", era: "contemporary",
      short: "Portugal continues to navigate economic change, migration, demographic shifts, climate risks, and a changing Europe.",
      description: "Contemporary Portugal is shaped by democratic institutions, European membership, cultural life, tourism, migration, and connections with Portuguese-speaking communities worldwide. The country was hit hard by the global financial crisis and sovereign-debt crisis, followed by recovery and renewed debates about jobs, housing, public services, and regional inequality. Ageing, climate-related risks, and the legacy of dictatorship and empire remain important public questions.",
      points: ["Economic growth and living standards have changed unevenly between regions and generations.", "Migration, tourism, and international ties are prominent in public life.", "The memory of dictatorship, the revolution, and colonial history continues to inform debate.", "Environmental pressures and climate adaptation are increasingly important issues."],
      events: [["2002", "Euro notes and coins replaced the escudo in daily use."], ["2011–2014", "Portugal implemented an EU/IMF financial assistance programme during the sovereign-debt crisis."], ["Mid-2010s onward", "Economic recovery brought renewed growth alongside continuing social and regional challenges."], ["Today", "Portugal's future is shaped by European integration, migration, demographic change, and climate adaptation."]]
    }
  ];

  const people = [
    { id: "viriathus", name: "Viriathus", years: "Died c. 139 BCE", category: "ruler", categoryLabel: "Lusitanian leader", initials: "V", tone: "rose", image: "", role: "Leader associated with Lusitanian resistance", period: "Roman Conquest & Rule", born: "Unknown", died: "c. 139 BCE", contribution: "Viriathus became a symbol of resistance to Roman expansion in western Iberia. Ancient accounts were written from outside his community, so details of his life and leadership must be read critically.", details: ["Led a long campaign against Roman forces in the 2nd century BCE.", "Used mobility and knowledge of local terrain to challenge Roman military power.", "Later historical memory turned him into a symbol of independence and resistance."] },
    { id: "afonso-henriques", name: "Afonso Henriques", years: "c. 1109–1185", category: "ruler", categoryLabel: "First King of Portugal", initials: "AH", tone: "green", image: "", role: "Central figure in the formation of the Portuguese kingdom", period: "County of Portugal / Medieval Kingdom", born: "c. 1109", died: "1185", contribution: "Afonso Henriques expanded the autonomy of the County of Portugal and became its first king. Portuguese independence emerged through a process of war, diplomacy, recognition, and institutional development rather than a single event.", details: ["Defeated forces aligned with his mother at São Mamede in 1128.", "Adopted the royal title in the 12th century, traditionally linked to the victory at Ourique in 1139.", "Received papal recognition in 1179 through the bull Manifestis Probatum."] },
    { id: "d-dinis", name: "Dinis I", years: "1261–1325", category: "ruler", categoryLabel: "King & patron", initials: "D", tone: "blue", image: "", role: "King associated with administration, agriculture, and culture", period: "Medieval Kingdom", born: "1261", died: "1325", contribution: "Dinis I strengthened royal administration, supported agriculture and settlement, and is associated with the development of Portuguese as a language of administration and culture. His reign formed part of the long consolidation of the medieval kingdom.", details: ["Supported agricultural development and settlement policies.", "Helped strengthen royal institutions and the kingdom's territorial administration.", "His cultural legacy is associated with poetry and the early development of Portuguese literary life."] },
    { id: "joao-i", name: "João I", years: "1357–1433", category: "ruler", categoryLabel: "King of Portugal", initials: "J I", tone: "rose", image: "", role: "Founder of the Avis dynasty", period: "Medieval Kingdom / Maritime Expansion", born: "1357", died: "1433", contribution: "João I came to power during the crisis of 1383–1385. His victory at Aljubarrota helped secure Portugal's independence from Castilian claims and established the Avis dynasty, which later supported the first phase of overseas expansion.", details: ["Became king after the crisis of 1383–1385.", "The Portuguese victory at Aljubarrota in 1385 helped secure his position.", "The Treaty of Windsor with England followed in 1386."] },
    { id: "henry", name: "Prince Henry the Navigator", years: "1394–1460", category: "explorer", categoryLabel: "Royal patron of voyages", initials: "H", tone: "green", image: "", role: "Infante connected with early Portuguese maritime expansion", period: "Maritime Expansion & Empire", born: "1394", died: "1460", contribution: "Prince Henry was a royal patron and organiser associated with early Portuguese voyages along the African coast. The popular image of him as the single founder of an organised school of navigation is debated; expansion involved sailors, merchants, financiers, rulers, and African societies.", details: ["Participated in the 1415 conquest of Ceuta.", "Supported voyages that helped extend Portuguese knowledge of the Atlantic and West African coast.", "His legacy is inseparable from the colonial expansion and slave-trading systems that developed in this period."] },
    { id: "dias", name: "Bartolomeu Dias", years: "c. 1450–1500", category: "explorer", categoryLabel: "Navigator", initials: "BD", tone: "blue", image: "", role: "Navigator who rounded the Cape of Good Hope", period: "Maritime Expansion & Empire", born: "c. 1450", died: "1500", contribution: "Bartolomeu Dias led the expedition that rounded the southern tip of Africa in 1488, demonstrating a sea route from the Atlantic into the Indian Ocean. He later died during Pedro Álvares Cabral's 1500 expedition.", details: ["Rounded the Cape of Good Hope in 1488.", "His voyage was an important step toward the Portuguese sea route to India.", "Died at sea during the 1500 expedition led by Cabral."] },
    { id: "gama", name: "Vasco da Gama", years: "c. 1460–1524", category: "explorer", categoryLabel: "Navigator", initials: "VG", tone: "rose", image: "", role: "Led the first Portuguese voyage to India by sea from Europe", period: "Maritime Expansion & Empire", born: "c. 1460", died: "1524", contribution: "Vasco da Gama commanded the expedition that reached India by sea in 1498. His voyages helped establish Portuguese imperial trade routes, which relied on armed power and brought major consequences for communities across the Indian Ocean.", details: ["Reached the Malabar Coast of India in 1498.", "His voyages helped establish a Portuguese oceanic empire.", "His legacy includes navigation achievements and the violence of imperial expansion."] },
    { id: "camões", name: "Luís de Camões", years: "c. 1524–1580", category: "writer", categoryLabel: "Poet", initials: "LC", tone: "green", image: "", role: "Author of the epic poem The Lusiads", period: "Maritime Expansion & Empire", born: "c. 1524", died: "1580", contribution: "Camões is widely regarded as one of the major writers in Portuguese literature. His epic The Lusiads (Os Lusíadas) celebrates Portuguese voyages and national history, while also reflecting the values, ambitions, and limits of its imperial age.", details: ["Published The Lusiads in 1572.", "His work helped establish a lasting literary language of Portuguese national identity.", "Modern readers also examine how the poem frames empire, heroism, and encounters with other societies."] },
    { id: "pombal", name: "Marquis of Pombal", years: "1699–1782", category: "politics", categoryLabel: "Statesman & reformer", initials: "MP", tone: "blue", image: "", role: "Powerful minister during the reign of José I", period: "Monarchy, Reform & Atlantic Change", born: "1699", died: "1782", contribution: "Sebastião José de Carvalho e Melo, later Marquis of Pombal, led the reconstruction of Lisbon after the 1755 earthquake and pursued wide-ranging reforms. His centralising policies expanded state authority and remain subjects of historical debate.", details: ["Directed the reconstruction of Lisbon following the 1755 disaster.", "Pursued reforms in trade, education, and administration.", "Used coercive state power, including against political opponents and religious institutions."] },
    { id: "pessoa", name: "Fernando Pessoa", years: "1888–1935", category: "writer", categoryLabel: "Poet & modernist writer", initials: "FP", tone: "rose", image: "", role: "One of the most influential writers in Portuguese literature", period: "First Republic / Modern Portugal", born: "1888", died: "1935", contribution: "Pessoa transformed Portuguese modernist writing through poetry, essays, and the creation of distinct literary personae known as heteronyms. Much of his writing was published after his death, and his work remains internationally influential.", details: ["Created literary personae including Alberto Caeiro, Ricardo Reis, and Álvaro de Campos.", "Published the prose-poem collection The Book of Disquiet in fragments during his life; it appeared in book form later.", "His writing explores identity, uncertainty, city life, and the experience of modernity."] },
    { id: "amalia", name: "Amália Rodrigues", years: "1920–1999", category: "artist", categoryLabel: "Fado singer", initials: "AR", tone: "green", image: "", role: "Internationally recognised voice of fado", period: "20th-century cultural history", born: "1920", died: "1999", contribution: "Amália Rodrigues helped bring fado to international audiences and became one of the best-known Portuguese performers of the 20th century. Fado itself has a broader history shaped by urban communities, musicians, poets, and changing performance traditions.", details: ["Became a central figure in the international reception of fado.", "Recorded Portuguese poetry by major writers and composers.", "Her legacy influenced generations of Portuguese singers and musicians."] },
    { id: "salazar", name: "António de Oliveira Salazar", years: "1889–1970", category: "politics", categoryLabel: "Authoritarian ruler", initials: "OS", tone: "blue", image: "", role: "Dominant leader of the Estado Novo dictatorship", period: "Dictatorship & the Estado Novo", born: "1889", died: "1970", contribution: "Salazar led Portugal's authoritarian Estado Novo regime from the 1930s until 1968. His government restricted political opposition, used censorship and secret-police repression, and defended continued rule over overseas colonies. His legacy is central to understanding the dictatorship that ended in 1974.", details: ["Became prime minister in 1932 and built an authoritarian state.", "The 1933 Constitution formalised the Estado Novo system.", "Was replaced by Marcelo Caetano in 1968 after becoming incapacitated."] },
    { id: "soares", name: "Mário Soares", years: "1924–2017", category: "politics", categoryLabel: "Democratic leader", initials: "MS", tone: "rose", image: "", role: "Socialist leader and president of Portugal", period: "Revolution & Democratic Transition", born: "1924", died: "2017", contribution: "Mário Soares was a leading opposition figure under the dictatorship and became a central politician during Portugal's democratic transition. He served as prime minister and later president, helping consolidate the country's democratic and European orientation.", details: ["Opposed the Estado Novo and experienced imprisonment and exile.", "Played a major role in post-1974 party politics and the democratic transition.", "Served as president from 1986 to 1996, overlapping with Portugal's entry into the European Communities."] },
    { id: "saramago", name: "José Saramago", years: "1922–2010", category: "writer", categoryLabel: "Novelist & Nobel laureate", initials: "JS", tone: "green", image: "", role: "Portuguese novelist awarded the 1998 Nobel Prize in Literature", period: "Contemporary Portugal", born: "1922", died: "2010", contribution: "José Saramago became internationally known for novels that blend historical imagination, social criticism, and distinctive narrative style. He was awarded the Nobel Prize in Literature in 1998, the first Portuguese-language writer to receive the prize in literature.", details: ["Wrote novels including Baltasar and Blimunda and Blindness.", "Received the Nobel Prize in Literature in 1998.", "His work frequently revisits authority, belief, memory, and social responsibility."] },
    { id: "shawn-mendes", name: "Shawn Mendes", years: "Born 1998", category: "contemporary", categoryLabel: "Singer-songwriter", initials: "SM", tone: "blue", image: "", role: "Canadian singer-songwriter with Portuguese family heritage", period: "Contemporary cultural connections", born: "1998", died: "—", contribution: "Shawn Mendes is a Canadian singer-songwriter whose father is of Portuguese descent. He represents one of the many contemporary links between Portugal and diaspora communities, rather than a historical figure in Portugal's political timeline.", details: ["Rose to international recognition as a singer-songwriter in the 2010s.", "His family background connects him to Portuguese-Canadian communities.", "Included here as a contemporary cultural connection, not as a political or historical actor."] },
    { id: "steve-perry", name: "Steve Perry", years: "Born 1949", category: "artist", categoryLabel: "Singer", initials: "SP", tone: "rose", image: "", role: "Portuguese-American vocalist best known for Journey", period: "Contemporary cultural connections", born: "1949", died: "—", contribution: "Steve Perry is an American singer of Portuguese descent, best known as the lead vocalist of Journey. His career illustrates the influence of Portuguese diaspora communities on music and culture beyond Portugal's borders.", details: ["Served as the lead singer of Journey during major periods of the band's success.", "Has Portuguese family roots through his parents.", "Included as a diaspora connection to broaden the idea of Portuguese cultural history."] }
  ];


  const resources = [
    { name: "Museu da Presidência da República", type: "Official museum", description: "Explore the history of Portugal’s presidency, republican institutions, national symbols, and political leaders.", url: "https://www.museu.presidencia.pt/en/" },
    { name: "National Museum of Archaeology", type: "Museum & collections", description: "Discover archaeological objects, exhibitions, and research on the ancient peoples and material culture of Portugal.", url: "https://museunacionalarqueologia.gov.pt/" },
    { name: "National Archives of Torre do Tombo", type: "Archives", description: "Find archival collections and historical records relating to Portugal and its former empire.", url: "https://antt.dglab.gov.pt/en/" },
    { name: "Europeana", type: "Digital collections", description: "Search digitised cultural heritage from museums, libraries, archives, and collections across Europe.", url: "https://www.europeana.eu/en" },
    { name: "Wikidata Query Service", type: "Open data", description: "Explore structured data about people, places, dates, and historical events; useful for building a people or events API.", url: "https://query.wikidata.org/" },
    { name: "UNESCO World Heritage — Portugal", type: "Cultural heritage", description: "Explore places in Portugal recognised for their cultural or natural significance, with historical background and references.", url: "https://whc.unesco.org/en/statesparties/pt" },
    { name: "Encyclopaedia Britannica — Portugal", type: "Reference work", description: "A concise reference overview of Portuguese history, geography, society, and political development.", url: "https://www.britannica.com/place/Portugal/History" },
    { name: "Timeline of Portuguese history", type: "Chronology", description: "A broad date-by-date chronology to use as a starting point for further research and cross-checking.", url: "https://en.wikipedia.org/wiki/Timeline_of_Portuguese_history" },
    { name: "Library of Congress — Portugal", type: "Research guide", description: "Use the Library of Congress catalog and research resources to locate books, maps, manuscripts, and historical publications.", url: "https://www.loc.gov/" }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const timelineGrid = $("#period-grid");
  const timelineSearch = $("#timeline-search");
  const eraFilter = $("#era-filter");
  const timelineResults = $("#timeline-results");
  const peopleGrid = $("#people-grid");
  const featuredPeople = $("#featured-people");
  const peopleSearch = $("#people-search");
  const peopleFilter = $("#people-filter");
  const peopleResults = $("#people-results");
  const dialog = $("#detail-dialog");
  const dialogContent = $("#dialog-content");
  const toast = $("#toast");
  const menuToggle = $("#menu-toggle");
  const navigation = $("#main-navigation");
  let toastTimer;

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const initialsFromName = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
  const eraLabels = { ancient: "Ancient & early medieval", medieval: "Medieval", "early-modern": "Early modern", modern: "Modern", contemporary: "Contemporary" };

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  function periodCard(period) {
    return `<button class="period-card" type="button" data-period-id="${escapeHTML(period.id)}" aria-label="Read more about ${escapeHTML(period.title)}">
      <span class="period-card__top"><span class="period-card__number">${escapeHTML(period.number)}</span><span class="period-card__era">${escapeHTML(eraLabels[period.era] || "History")}</span></span>
      <span class="period-card__date">${escapeHTML(period.dates)}</span>
      <span class="period-card__title">${escapeHTML(period.title)}</span>
      <span class="period-card__description">${escapeHTML(period.short)}</span>
      <span class="period-card__bottom"><span>Explore this period</span><span aria-hidden="true">→</span></span>
    </button>`;
  }

  function renderTimeline() {
    const query = (timelineSearch.value || "").trim().toLowerCase();
    const era = eraFilter.value;
    const filtered = periods.filter((period) => {
      const matchesEra = era === "all" || period.era === era;
      const haystack = [period.title, period.dates, period.short, period.description, ...(period.events || []).flat()].join(" ").toLowerCase();
      return matchesEra && (!query || haystack.includes(query));
    });
    timelineGrid.innerHTML = filtered.length ? filtered.map(periodCard).join("") : `<div class="empty-state"><strong>No periods found.</strong><br>Try another date, event, or keyword.</div>`;
    timelineResults.textContent = `${filtered.length} of ${periods.length} historical periods`;
  }

  const milestoneIds = ["roman", "kingdom", "expansion", "democracy"];
  function renderMilestones() {
    const keyDates = [
      { id: "roman", date: "218 BCE", title: "Rome arrives in Iberia", text: "A long period of conquest and cultural change begins." },
      { id: "kingdom", date: "1139–1179", title: "A kingdom takes shape", text: "Kingship gains ground through war, diplomacy, and recognition." },
      { id: "expansion", date: "1415 onward", title: "Portugal looks to the sea", text: "Voyages connect oceanic regions, with profound human consequences." },
      { id: "democracy", date: "25 April 1974", title: "The Carnation Revolution", text: "A military-led uprising ends the Estado Novo dictatorship." }
    ];
    const host = $("#milestone-strip");
    host.innerHTML = keyDates.map((item, index) => `<button class="milestone" type="button" data-period-id="${item.id}"><span class="milestone__date">${escapeHTML(item.date)}</span><span class="milestone__title">${escapeHTML(item.title)}</span><span class="milestone__text">${escapeHTML(item.text)}</span></button>`).join("");
  }

  function personCard(person) {
    const initials = person.initials || initialsFromName(person.name);
    const portrait = person.image
      ? `<img src="${escapeHTML(person.image)}" alt="Portrait of ${escapeHTML(person.name)}" loading="lazy" onerror="this.remove()">`
      : `<span class="person-card__initials" aria-hidden="true">${escapeHTML(initials)}</span>`;
    return `<article class="person-card"><button class="person-card__button" type="button" data-person-id="${escapeHTML(person.id)}" aria-label="Read biography of ${escapeHTML(person.name)}">
      <span class="person-card__portrait person-card__portrait--${escapeHTML(person.tone || "rose")}">${portrait}</span>
      <span class="person-card__body"><span class="person-card__years">${escapeHTML(person.years)}</span><span class="person-card__name">${escapeHTML(person.name)}</span><span class="person-card__role">${escapeHTML(person.role)}</span><span class="person-card__more">Read biography <span aria-hidden="true">→</span></span></span>
    </button></article>`;
  }

  function renderPeople() {
    const query = (peopleSearch.value || "").trim().toLowerCase();
    const category = peopleFilter.value;
    const filtered = people.filter((person) => {
      const categoryMatch = category === "all" || person.category === category;
      const haystack = [person.name, person.years, person.categoryLabel, person.role, person.period, person.contribution, ...(person.details || [])].join(" ").toLowerCase();
      return categoryMatch && (!query || haystack.includes(query));
    });
    peopleGrid.innerHTML = filtered.length ? filtered.map(personCard).join("") : `<div class="empty-state"><strong>No people found.</strong><br>Try another name or contribution.</div>`;
    peopleResults.textContent = `${filtered.length} of ${people.length} profiles`;
  }

  function renderFeaturedPeople() {
    const ids = ["afonso-henriques", "gama", "pessoa", "amalia"];
    featuredPeople.innerHTML = ids.map((id) => people.find((person) => person.id === id)).filter(Boolean).map(personCard).join("");
  }

  function renderResources() {
    $("#resource-grid").innerHTML = resources.map((resource) => `<a class="resource-card" href="${escapeHTML(resource.url)}" target="_blank" rel="noopener noreferrer">
      <span class="resource-card__type">${escapeHTML(resource.type)}</span><h3>${escapeHTML(resource.name)}</h3><p>${escapeHTML(resource.description)}</p><span class="resource-card__link"><span>Visit resource</span><span aria-hidden="true">↗</span></span>
    </a>`).join("");
  }

  function openPeriod(periodId) {
    const period = periods.find((item) => item.id === periodId);
    if (!period) return;
    dialogContent.innerHTML = `<p class="detail-eyebrow">Chapter ${escapeHTML(period.number)} · ${escapeHTML(eraLabels[period.era] || "History")}</p>
      <h2 class="detail-title" id="dialog-title">${escapeHTML(period.title)}</h2><p class="detail-date">${escapeHTML(period.dates)}</p>
      <p class="detail-lead">${escapeHTML(period.description)}</p>
      <h3 class="detail-subtitle">What changed in this period?</h3><ul class="detail-points">${period.points.map((point) => `<li>${escapeHTML(point)}</li>`).join("")}</ul>
      <h3 class="detail-subtitle">Dates & events</h3><table class="detail-events"><thead><tr><th scope="col">Date</th><th scope="col">Event / significance</th></tr></thead><tbody>${period.events.map((event) => `<tr><td>${escapeHTML(event[0])}</td><td>${escapeHTML(event[1])}</td></tr>`).join("")}</tbody></table>
      <p class="detail-source-note">This overview is an introduction, not a complete account. Follow the Resources links to compare sources and explore further.</p>`;
    dialogContent.insertAdjacentHTML("beforeend", `<style>.detail-source-note{margin:24px 0 0;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font-size:.72rem;line-height:1.6}</style>`);
    openDialog();
  }

  function openPerson(personId) {
    const person = people.find((item) => item.id === personId);
    if (!person) return;
    const initials = person.initials || initialsFromName(person.name);
    const portrait = person.image
      ? `<img src="${escapeHTML(person.image)}" alt="Portrait of ${escapeHTML(person.name)}" onerror="this.remove()">`
      : `<span class="person-card__initials" aria-hidden="true">${escapeHTML(initials)}</span>`;
    dialogContent.innerHTML = `<div class="detail-dialog__profile"><div class="detail-dialog__portrait person-card__portrait--${escapeHTML(person.tone || "rose")}">${portrait}</div><div><p class="detail-eyebrow">${escapeHTML(person.categoryLabel)}</p><h2 class="detail-title" id="dialog-title">${escapeHTML(person.name)}</h2><p class="detail-date">${escapeHTML(person.years)}</p><p class="detail-lead">${escapeHTML(person.contribution)}</p></div></div>
      <h3 class="detail-subtitle">Why they matter</h3><ul class="detail-points">${person.details.map((detail) => `<li>${escapeHTML(detail)}</li>`).join("")}</ul>
      <div class="detail-facts"><div class="detail-fact"><span>Period / connection</span><strong>${escapeHTML(person.period)}</strong></div><div class="detail-fact"><span>Role</span><strong>${escapeHTML(person.categoryLabel)}</strong></div><div class="detail-fact"><span>Born</span><strong>${escapeHTML(person.born)}</strong></div><div class="detail-fact"><span>Died</span><strong>${escapeHTML(person.died)}</strong></div></div>
      <p class="detail-source-note">Biography summaries are concise starting points. Some public figures have complex or contested legacies; consult multiple sources for a fuller picture.</p>`;
    dialogContent.insertAdjacentHTML("beforeend", `<style>.detail-source-note{margin:24px 0 0;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font-size:.72rem;line-height:1.6}</style>`);
    openDialog();
  }


  // Connect the chat assistant to the existing website navigation.
window.addEventListener("portugal:assistant-action", (event) => {
    const action = event.detail;

    if (!action || !action.args) return;

    if (action.name === "go_to_period") {
      const exists = periods.some(
        (period) => period.id === action.args.id
      );

      if (exists) {
        openPeriod(action.args.id);
      } else {
        showToast("I couldn't find that historical period.");
      }

      return;
    }

    if (action.name === "go_to_person") {
      const normalize = (value) =>
        String(value || "")
          .replace(/_/g, " ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ")
          .trim();

      const requestedTitle = normalize(
        action.args.wikipedia_title
      );

      const person = people.find((item) => {
        return [
          item.name,
          item.id,
          item.title,
          item.wikipedia_title
        ].some((value) => normalize(value) === requestedTitle);
      });

      if (person && person.id) {
        openPerson(person.id);
      } else {
        showToast(
          "That person isn't currently available in the directory."
        );
      }

      return;
    }

    if (action.name === "go_to_page") {
      const page = action.args.page;

      if (
        !["home", "timeline", "people", "resources"].includes(page)
      ) {
        return;
      }

      const target = document.getElementById(page);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        history.replaceState(null, "", "#" + page);
      } else {
        showToast("I couldn't find that website section.");
      }
    }
  });


  function openDialog() {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDialog() {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }



  function closeMobileMenu() {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  timelineSearch.addEventListener("input", renderTimeline);
  eraFilter.addEventListener("change", renderTimeline);
  peopleSearch.addEventListener("input", renderPeople);
  peopleFilter.addEventListener("change", renderPeople);
  document.addEventListener("click", (event) => {
    const periodButton = event.target.closest("[data-period-id]");
    const personButton = event.target.closest("[data-person-id]");
    if (periodButton) openPeriod(periodButton.dataset.periodId);
    else if (personButton) openPerson(personButton.dataset.personId);
  });
  $("#dialog-close").addEventListener("click", closeDialog);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.hasAttribute("open")) closeDialog();
  });
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  $$(".main-navigation a").forEach((link) => link.addEventListener("click", closeMobileMenu));
  $$("a[href^='#']").forEach((link) => link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#" || !$(id)) return;
    event.preventDefault();
    history.replaceState(null, "", id);
    $(id).scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    if (link.closest(".main-navigation")) closeMobileMenu();
  }));


  $("#current-year").textContent = String(new Date().getFullYear());
  renderMilestones();
  renderTimeline();
  renderFeaturedPeople();
  renderPeople();
  renderResources();
})();
