export type BloodStatus = "CRITICAL" | "LOW" | "STABLE" | "OPTIMAL";

export interface BloodRow {
  group: string;
  units: number;
  capacity: number;
  trend: "up" | "down" | "flat";
}

export const BLOOD_BOARD: BloodRow[] = [
  { group: "O−", units: 3, capacity: 40, trend: "down" },
  { group: "O+", units: 26, capacity: 90, trend: "up" },
  { group: "A−", units: 5, capacity: 30, trend: "flat" },
  { group: "A+", units: 34, capacity: 70, trend: "up" },
  { group: "B−", units: 2, capacity: 25, trend: "down" },
  { group: "B+", units: 19, capacity: 55, trend: "flat" },
  { group: "AB−", units: 4, capacity: 15, trend: "flat" },
  { group: "AB+", units: 12, capacity: 20, trend: "up" },
];

export function statusOf(units: number, capacity: number): BloodStatus {
  const pct = units / capacity;
  if (pct < 0.15) return "CRITICAL";
  if (pct < 0.35) return "LOW";
  if (pct < 0.7) return "STABLE";
  return "OPTIMAL";
}

export const TICKER_ITEMS = [
  "URGENT · 4 units O− needed · Muhimbili National Hospital",
  "URGENT · 2 units B− needed · Aga Khan Hospital, Upanga",
  "Platelet apheresis donors wanted Thursday · Mnazi Mmoja, Zanzibar",
  "Kariakoo drive · Sat 08:00 · 26 slots left",
  "O− donors: you are 1 of 100 — the bank needs you this week",
  "New: evening donation hours at Mwajuma House, Mon–Fri till 19:00",
];

export const STATS = [
  { value: 18350, suffix: "", label: "Units collected since 2014", note: "each unit screened & split into three components" },
  { value: 54000, suffix: "+", label: "Lives reached across Tanzania", note: "red cells, plasma and platelets for 38 hospitals" },
  { value: 12480, suffix: "", label: "Registered volunteer donors", note: "63% are repeat donors — the backbone of the bank" },
  { value: 246, suffix: "", label: "Community drives organised", note: "markets, campuses, mosques, churches, workplaces" },
];

export const STEPS = [
  {
    n: "01",
    mins: "5 min",
    title: "Karibu — registration",
    body: "Show your ID or donor card, sip some water and fill a short wellness form. First-timers get a five-minute orientation — no jargon, no needles yet.",
    icon: "clipboard" as const,
  },
  {
    n: "02",
    mins: "10 min",
    title: "Mini health screen",
    body: "A nurse checks your haemoglobin with a finger prick, plus blood pressure, pulse and weight. You'll learn your numbers for free — many donors discover issues early here.",
    icon: "pulse" as const,
  },
  {
    n: "03",
    mins: "8–10 min",
    title: "The donation itself",
    body: "You recline, squeeze a soft ball, and give one unit — about 450 ml, less than a bottle of soda. A brand-new sterile kit is opened in front of you. Every time.",
    icon: "bag" as const,
  },
  {
    n: "04",
    mins: "15 min",
    title: "Chai, mandazi & rest",
    body: "Rest in the recovery corner with juice and snacks while your body gets the message. You leave with a donor badge, your blood group result, and up to three lives on your ledger.",
    icon: "cup" as const,
  },
];

export const ELIGIBILITY = [
  "Aged 18–60 (repeat donors up to 65)",
  "Weighing at least 50 kg",
  "Haemoglobin 12.5 g/dl or higher on the day",
  "Feeling fit — no fever, flu or antibiotics this week",
  "At least 4 months since your last whole-blood donation",
  "Tattoos & piercings are fine after 6 months",
];

export const BLOOD_TYPES = ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"] as const;
export type BloodType = (typeof BLOOD_TYPES)[number];

export const GIVES_TO: Record<BloodType, BloodType[]> = {
  "O−": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
  "O+": ["O+", "A+", "B+", "AB+"],
  "A−": ["A−", "A+", "AB−", "AB+"],
  "A+": ["A+", "AB+"],
  "B−": ["B−", "B+", "AB−", "AB+"],
  "B+": ["B+", "AB+"],
  "AB−": ["AB−", "AB+"],
  "AB+": ["AB+"],
};

export const RECEIVES_FROM: Record<BloodType, BloodType[]> = {
  "O−": ["O−"],
  "O+": ["O−", "O+"],
  "A−": ["O−", "A−"],
  "A+": ["O−", "O+", "A−", "A+"],
  "B−": ["O−", "B−"],
  "B+": ["O−", "O+", "B−", "B+"],
  "AB−": ["O−", "A−", "B−", "AB−"],
  "AB+": ["O−", "O+", "A−", "A+", "B−", "B+", "AB−", "AB+"],
};

export const COMPAT_FACTS: Record<BloodType, string> = {
  "O−": "The universal red-cell donor. Only ~1% of Tanzanians are O− — when you give, it almost always goes to someone in crisis.",
  "O+": "The workhorse of the bank — O+ units are the most transfused group in our hospitals, every single week.",
  "A−": "A rare double gift: you can cover both A and AB patients in emergencies, negative or positive.",
  "A+": "One in three patients on our request list is A+. Your group keeps the busiest wards moving.",
  "B−": "Scarce and versatile — your red cells serve B and AB patients across four hospital partners.",
  "B+": "Steady and needed: B+ is the third most-requested group in Dar es Salaam trauma centres.",
  "AB−": "The rarest group we track. When AB− sits on the shelf, it is the last-resort unit for AB emergencies.",
  "AB+": "The universal recipient — and your plasma is the universal plasma, treasured for burn and ICU patients.",
};

export interface Drive {
  id: string;
  day: string;
  month: string;
  weekday: string;
  title: string;
  venue: string;
  area: string;
  time: string;
  slotsTotal: number;
  slotsLeft: number;
  tag: string;
}

export const DRIVES: Drive[] = [
  {
    id: "d1",
    day: "07",
    month: "MAR",
    weekday: "Saturday",
    title: "Kariakoo Market Mass Drive",
    venue: "Market Hall, 2nd floor",
    area: "Kariakoo, Dar es Salaam",
    time: "08:00 – 15:00",
    slotsTotal: 120,
    slotsLeft: 26,
    tag: "Biggest monthly drive",
  },
  {
    id: "d2",
    day: "18",
    month: "MAR",
    weekday: "Wednesday",
    title: "UDSM Campus Blood Week",
    venue: "Mlimani City Conference Hall",
    area: "University of Dar es Salaam",
    time: "09:00 – 16:00",
    slotsTotal: 90,
    slotsLeft: 41,
    tag: "Students & staff",
  },
  {
    id: "d3",
    day: "28",
    month: "MAR",
    weekday: "Saturday",
    title: "Kanisa & Mtaa Family Drive",
    venue: "Aga Khan Primary School grounds",
    area: "Sinza, Dar es Salaam",
    time: "08:30 – 13:30",
    slotsTotal: 80,
    slotsLeft: 57,
    tag: "Family friendly",
  },
  {
    id: "d4",
    day: "04",
    month: "APR",
    weekday: "Saturday",
    title: "Zanzibar Island Lifeline",
    venue: "Mnazi Mmoja Hospital annexe",
    area: "Vikokotoni, Zanzibar",
    time: "08:00 – 14:00",
    slotsTotal: 70,
    slotsLeft: 12,
    tag: "Ferry transport provided",
  },
];

export const CENTERS = [
  { name: "Mwajuma House — HQ", area: "Kariakoo, Dar es Salaam", hours: "Mon–Sat · 08:00–19:00" },
  { name: "Muhimbili Donor Unit", area: "Upanga, Dar es Salaam", hours: "Daily · 08:00–17:00" },
  { name: "UDSM Clinic Annex", area: "Mlimani, Dar es Salaam", hours: "Mon–Fri · 09:00–16:00" },
  { name: "Mnazi Mmoja Unit", area: "Vikokotoni, Zanzibar", hours: "Mon–Sat · 08:00–15:00" },
  { name: "Arusha Centre", area: "Sokoine Rd, Arusha", hours: "Mon–Fri · 08:30–16:30" },
  { name: "Mwanza Hub", area: "Capri Point, Mwanza", hours: "Tue–Sat · 09:00–16:00" },
];

export interface Story {
  name: string;
  meta: string;
  type: BloodType;
  count: string;
  quote: string;
  img: string;
  tint: string;
}

export const STORIES: Story[] = [
  {
    name: "Amina Said",
    meta: "Teacher · Kigamboni",
    type: "O−",
    count: "27 patients served",
    quote:
      "I found out at 29 that I carry the rarest blood in the country. My arm has become an ambulance — twenty-seven people are walking around with a piece of me, and most of them I will never meet. That is the best maths I know.",
    img: "https://image.qwenlm.ai/generated-images/c994f805-a6ac-4d4f-81ad-dfd99e771c43/_result.png",
    tint: "#c11f2f",
  },
  {
    name: "Joseph Mushi",
    meta: "Bus driver · Ubungo",
    type: "A+",
    count: "41 donations since 2016",
    quote:
      "My sister needed four units after her caesarean and strangers gave them without even asking her name. When I got old enough and heavy enough, I made a promise. Forty-one times so far — I donate on my rest day, between routes.",
    img: "https://image.qwenlm.ai/generated-images/8e1dfddb-6a56-4d3e-a6e5-176871f33269/_result.png",
    tint: "#14705e",
  },
  {
    name: "Neema Kessy",
    meta: "UDSM student · Law",
    type: "B+",
    count: "Organised 3 campus drives",
    quote:
      "I came for the free health screening and stayed for the mandazi — honestly! But then I saw the board: B+ was blinking red. Now our faculty runs a drive every semester and 300 students have cards in their wallets.",
    img: "https://image.qwenlm.ai/generated-images/10741321-ab13-438b-b361-dc7e5455ef21/_result.png",
    tint: "#e9a82e",
  },
];

export const FAQS = [
  {
    q: "Does donating blood hurt?",
    a: "You feel a quick pinch — most donors compare it to a firm pinch or a bee sting that lasts two seconds. After that it is a warm, slightly floaty 8–10 minutes of doing absolutely nothing while a machine does something enormous.",
  },
  {
    q: "How long does the whole visit take?",
    a: "Plan for 40–45 minutes door to door: registration (5), screening (10), donation (8–10) and the mandatory chai-and-mandazi rest (15). The needle itself is in your arm for under ten minutes.",
  },
  {
    q: "How often can I donate?",
    a: "Whole blood every 4 months for women and every 3 months for men. Your body replaces the fluid within 48 hours and the red cells within weeks — but we always err on the side of your iron stores.",
  },
  {
    q: "Is it safe? Can I catch anything?",
    a: "Completely safe. Every donation uses a factory-sealed, single-use sterile kit opened in front of you and incinerated after. Our phlebotomists are licensed nurses, and every bag is tested for HIV, hepatitis B & C, syphilis and malaria before release.",
  },
  {
    q: "I don't know my blood group. Can I still come?",
    a: "Yes — that is one of the best reasons to come. We type every donation free of charge and your result appears on your donor card and in your SMS within three days.",
  },
  {
    q: "Can I donate if I have a tattoo, piercing or take medication?",
    a: "Tattoos and piercings are fine six months after healing. Most everyday medication (blood pressure, thyroid, antihistamines) does not disqualify you — the screening nurse reviews your form privately and gives you an honest answer on the spot.",
  },
  {
    q: "Who receives the blood I give?",
    a: "Mostly mothers in obstetric emergencies, children with severe malaria anaemia, accident victims and cancer patients. One unit is split into red cells, plasma and platelets — so a single 450 ml bag can rescue up to three different patients.",
  },
];

export const IMAGES = {
  drive: "https://image.qwenlm.ai/generated-images/87bc9381-0967-47da-b1a9-cce93654f0de/_result.png",
};

export const NAV_LINKS = [
  { label: "Supply board", href: "#board" },
  { label: "How it works", href: "#process" },
  { label: "Compatibility", href: "#compatibility" },
  { label: "Drives", href: "#drives" },
  { label: "Donor stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];
