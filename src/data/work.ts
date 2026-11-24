// Real project screenshots, served from the portfolio CMS storage.
const IMG =
  "https://uzdjwpkgldzhnoxjeyrw.supabase.co/storage/v1/object/public/content-images/b237218e-d944-4af0-87b2-09379102e53e/portfolio/";

export type Version = { image: string; url: string };

export type Study = {
  id: string;
  client: string;
  industry: string;
  versionA: Version;
  versionB: Version;
  /** The version the client picked and launched. Omit for concepts still in review. */
  chosen?: "A" | "B";
};

export type LaunchedSite = { client: string; industry: string; image: string; url: string };

/** Featured two-direction case studies (homepage switcher). */
export const studies: Study[] = [
  {
    id: "kchen",
    client: "K. Chen Construction Management",
    industry: "Construction",
    versionA: { image: IMG + "kchenconstruction/a-netlify-desktop.jpg", url: "https://kchenconstruction-a.netlify.app/" },
    versionB: { image: IMG + "kchenconstruction/live-netlify-desktop.jpg", url: "https://kchencm.com/" },
    chosen: "B",
  },
  {
    id: "ttop",
    client: "TTOP Chicken",
    industry: "Restaurant",
    versionA: { image: IMG + "ttop-vancouver/live-cloudflare_worker-desktop.jpg", url: "https://ttopchicken.com/" },
    versionB: { image: IMG + "ttop-vancouver/b-cloudflare_worker-desktop.jpg", url: "https://ttop-vancouver-b.sony-40b.workers.dev/" },
    chosen: "A",
  },
  {
    id: "btn",
    client: "BTN Hospitality Consultancy",
    industry: "Professional services",
    versionA: { image: IMG + "btn/live-netlify-desktop.jpg", url: "https://btnpro.ca/" },
    versionB: { image: IMG + "btn/b-netlify-desktop.jpg", url: "https://btn-b.netlify.app/" },
    chosen: "A",
  },
  {
    id: "nuera",
    client: "NuEra Nutraceuticals",
    industry: "Manufacturing",
    versionA: { image: IMG + "nueranutra/a-netlify-desktop.jpg", url: "https://nueranutra.bluluma.com/" },
    versionB: { image: IMG + "nueranutra-b/b-netlify-desktop.jpg", url: "https://nueranutra.com/" },
    chosen: "B",
  },
  {
    id: "vita",
    client: "Vita Constructions",
    industry: "Construction",
    versionA: { image: IMG + "vitaenv/live-netlify-desktop.jpg", url: "https://vitaenv.com/" },
    versionB: { image: IMG + "vitaenv/b-netlify-desktop.jpg", url: "https://vitaenv-b.netlify.app/" },
    chosen: "A",
  },
  {
    id: "hsinhsin",
    client: "HSIN HSIN",
    industry: "Professional services",
    versionA: { image: IMG + "hsinhsin/live-netlify-desktop.jpg", url: "https://hsinhsin.ca/" },
    versionB: { image: IMG + "hsinhsin/b-netlify-desktop.jpg", url: "https://hsinhsin-b.netlify.app/" },
    chosen: "A",
  },
];

/** More projects delivered as two directions (shown on /work). */
export const moreStudies: Study[] = [
  {
    id: "arts",
    client: "Art's Automotive Service Centre",
    industry: "Automotive",
    versionA: { image: IMG + "artsautomotive/a-netlify-desktop.jpg", url: "https://artsautomotive-a.netlify.app/" },
    versionB: { image: IMG + "artsautomotive/b-netlify-desktop.jpg", url: "https://artsautomotive-b.netlify.app/" },
  },
  {
    id: "presotea",
    client: "Presotea",
    industry: "Bubble tea",
    versionA: { image: IMG + "presotea/a-netlify-desktop.jpg", url: "https://presotea.bluluma.com/" },
    versionB: { image: IMG + "presotea/b-netlify-desktop.jpg", url: "https://presotea-b.netlify.app/" },
  },
  {
    id: "onepark",
    client: "One Park",
    industry: "Real estate presale",
    versionA: { image: IMG + "one-park-home/a-netlify-desktop.jpg", url: "https://one-park-home.bluluma.com/" },
    versionB: { image: IMG + "one-park-home/b-netlify-desktop.jpg", url: "https://oneparkhome-b.netlify.app/" },
  },
  {
    id: "yang",
    client: "Yang's Health Therapeutic Clinic",
    industry: "Health & wellness",
    versionA: { image: IMG + "yanghealththerapeutic/a-netlify-desktop.jpg", url: "https://yang-health-therapeutic.bluluma.com/" },
    versionB: { image: IMG + "yanghealththerapeutic/b-netlify-desktop.jpg", url: "https://yanghealththerapeutic-b.netlify.app/" },
  },
  {
    id: "genes",
    client: "Gene's Sausage Shop",
    industry: "Deli",
    versionA: { image: IMG + "genessausage/a-netlify-desktop.jpg", url: "https://genessausage-a.netlify.app/" },
    versionB: { image: IMG + "genessausage/b-netlify-desktop.jpg", url: "https://genessausage-b.netlify.app/" },
  },
  {
    id: "blackhills",
    client: "Black Hills Craft Beer",
    industry: "Brewery",
    versionA: { image: IMG + "spearfishbrewing/a-netlify-desktop.jpg", url: "https://spearfishbrewing-a.netlify.app/" },
    versionB: { image: IMG + "spearfishbrewing/b-netlify-desktop.jpg", url: "https://spearfishbrewing-b.netlify.app/" },
  },
  {
    id: "phoenix",
    client: "Phoenix Commercial Remodeling",
    industry: "Contractor",
    versionA: { image: IMG + "phoenixremodel/a-netlify-desktop.jpg", url: "https://phoenixremodel-a.netlify.app/" },
    versionB: { image: IMG + "phoenixremodel/b-netlify-desktop.jpg", url: "https://phoenixremodel-b.netlify.app/" },
  },
  {
    id: "firstthird",
    client: "First & Third Designs",
    industry: "Design studio",
    versionA: { image: IMG + "firstthirddesigns/a-netlify-desktop.jpg", url: "https://firstthirddesigns-a.netlify.app/" },
    versionB: { image: IMG + "firstthirddesigns/b-netlify-desktop.jpg", url: "https://firstthirddesigns-b.netlify.app/" },
  },
  {
    id: "hhnexus",
    client: "HH Nexus Capital",
    industry: "Finance",
    versionA: { image: IMG + "hhnexuscapital/a-netlify-desktop.jpg", url: "https://hhnexuscapital-a.netlify.app/" },
    versionB: { image: IMG + "hhnexuscapital/b-netlify-desktop.jpg", url: "https://hhnexuscapital-b.netlify.app/" },
  },
  {
    id: "oviedo",
    client: "Oviedo Properties",
    industry: "Real estate",
    versionA: { image: IMG + "oviedoproperties/a-netlify-desktop.jpg", url: "https://oviedoproperties-a.netlify.app/" },
    versionB: { image: IMG + "oviedoproperties/b-netlify-desktop.jpg", url: "https://oviedoproperties-b.netlify.app/" },
  },
];

const site = (client: string, industry: string, path: string, url: string): LaunchedSite => ({
  client,
  industry,
  image: IMG + path,
  url,
});

/** Every launched single site — the version the client chose. First 6 show on the homepage. */
export const launchedSites: LaunchedSite[] = [
  site("Tsai Orthodontics", "Orthodontist", "tsai-orthodontics/live-cloudflare_worker-desktop.jpg", "https://tsaiorthodontics.ca/"),
  site("Shooting Star Travel", "Travel agency", "shootingstar-travel/live-cloudflare_worker-desktop.jpg", "https://shootingstartravel.ca/"),
  site("Unity Tattoo", "Tattoo studio", "unity-tattoo/live-netlify-desktop.jpg", "https://unity-tattoo.com/"),
  site("Wild West Wags", "Dog training", "wild-west-wags/live-cloudflare_worker-desktop.jpg", "https://wildwestwags.ca/"),
  site("Bisou Hair Salon", "Hair salon", "bisou-hair/live-netlify-desktop.jpg", "https://bisouvancouver.com/"),
  site("Friendly Dental Centre", "Dental clinic", "friendly-dental/live-netlify-desktop.jpg", "https://friendlydental.ca/"),
  site("Eric Kim", "Realtor", "erickimrealty/live-netlify-desktop.jpg", "https://erickimrealty.com/"),
  site("YUI", "Café & bakery", "yui-living/live-cloudflare_worker-desktop.jpg", "https://yuiliving.ca/"),
  site("Elevate International Education", "Education", "elevate-educational/live-cloudflare_worker-desktop.jpg", "https://elevateeducation.ca/"),
  site("Little Mountain Dental Centre", "Dental clinic", "littlemountaindental/live-netlify-desktop.jpg", "https://littlemountaindental.ca/"),
  site("Dr. Patrick Wu", "Dentist", "drpatrickwu/live-netlify-desktop.jpg", "https://drpatrickwu.com/"),
  site("la petite.elli", "Online store", "lapetiteelli/live-netlify-desktop.jpg", "https://lapetiteelli.com/"),
  site("John Han-Chang Lin", "Artist", "johnlinart/live-netlify-desktop.jpg", "https://johnlinart.ca/"),
  site("Initial Salon", "Hair salon", "initial-hair/a-cloudflare_worker-desktop.jpg", "https://www.initialsalon.ca/"),
  site("Oceanicflo Construction", "Construction", "oceanicflo/a-cloudflare_worker-desktop.jpg", "https://oceanicflo-a.sony-40b.workers.dev/"),
  site("Yingting Smart", "Smart home", "yingting-smart/a-cloudflare_worker-desktop.jpg", "https://yingting-smart.sony-40b.workers.dev/"),
  site("Oxford Venture", "Education", "oxford-venture/a-cloudflare_worker-desktop.jpg", "https://oxford-venture.sony-40b.workers.dev/"),
  site("Tony Lin", "Realtor", "tony-lin-realtor/a-cloudflare_worker-desktop.jpg", "https://tony-lin-realtor.sony-40b.workers.dev/"),
  site("Helen Lam", "Realtor", "helenlamrealty/a-netlify-desktop.jpg", "https://helenlamrealty.netlify.app/"),
  site("Sterling Wong", "Realtor", "sterlingwongrealty/a-netlify-desktop.jpg", "https://sterlingwongrealty.netlify.app/"),
  site("Vicky Chai Real Estate", "Realtor", "vickychairealty/a-netlify-desktop.jpg", "https://vickychairealty.netlify.app/"),
  site("Shella & Tony Chan", "Realtors", "shellatonychenrealty/a-netlify-desktop.jpg", "https://shellatonychenrealty.netlify.app/"),
  site("U Dental", "Dental clinic", "u-dental/a-netlify-desktop.jpg", "https://u-dental.netlify.app/"),
  site("Glow Dental", "Pediatric dentist", "glow-dental/a-netlify-desktop.jpg", "https://glow-dental.netlify.app/"),
  site("Westside Medical Associates", "Medical clinic", "westsidemedicalassociates/a-netlify-desktop.jpg", "https://westsidemedicalassociates-a.netlify.app/"),
  site("Studio 21 Salon and Spa", "Salon & spa", "studio21salonspa/a-netlify-desktop.jpg", "https://studio21salonspa-a.netlify.app/"),
  site("Styles Hair Salon and Day Spa", "Salon & spa", "styleshairsalon/a-netlify-desktop.jpg", "https://styleshairsalon-a.netlify.app/"),
  site("Washworld Car Wash", "Car wash", "washworldcarwash/a-netlify-desktop.jpg", "https://washworldcarwash.netlify.app/"),
  site("APF Organic", "Organic farm", "asianpacificfarm/a-netlify-desktop.jpg", "https://asianpacificfarm.netlify.app/"),
];
