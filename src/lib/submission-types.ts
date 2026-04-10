export type ItemCategory =
  | "trading-cards"
  | "comics-collectibles"
  | "large-items"
  | "red-rookie";

export type CardCondition = "raw" | "graded";

export type ListingIntent = "weekly-auction" | "premier-auction" | "vault";

export type GradingType = "card" | "dual";

export interface GraderInfo {
  id: string;
  name: string;
  startingPrice: string;
  turnaround: string;
  tiers: ServiceTier[];
  dualTiers?: ServiceTier[];
}

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  businessDays: string;
  description: string;
  group?: string;
  maxValue?: string;
}

export const GRADERS: GraderInfo[] = [
  {
    id: "beckett",
    name: "Beckett",
    startingPrice: "$25",
    turnaround: "",
    tiers: [
      { id: "bgs-standard", name: "Standard", price: "$25", businessDays: "", description: "Subgrades included", group: "For cards valued $50+" },
    ],
  },
  {
    id: "cgc",
    name: "CGC",
    startingPrice: "$3",
    turnaround: "",
    tiers: [
      { id: "cgc-auth", name: "Authentication only", price: "$3", businessDays: "", description: "No numerical grading", group: "For cards valued $1\u2013$50" },
      { id: "cgc-standard", name: "Standard", price: "$10", businessDays: "", description: "", group: "For cards valued $50+" },
    ],
  },
  {
    id: "psa",
    name: "PSA",
    startingPrice: "$24.99/card",
    turnaround: "",
    tiers: [
      { id: "psa-value-bulk", name: "Value Bulk", price: "$24.99", businessDays: "~95 days", description: "20-card min, pre-1980 or post-1980", group: "For cards valued up to $500", maxValue: "Up to $500" },
      { id: "psa-value", name: "Value", price: "$32.99", businessDays: "~75 days", description: "", group: "For cards valued up to $500", maxValue: "Up to $500" },
      { id: "psa-value-plus", name: "Value Plus", price: "$49.99", businessDays: "~40 days", description: "", group: "For cards valued up to $500", maxValue: "Up to $500" },
      { id: "psa-value-max", name: "Value Max", price: "$64.99", businessDays: "~30 days", description: "", group: "For cards valued $500\u2013$2,500", maxValue: "Up to $1,000" },
      { id: "psa-regular", name: "Regular", price: "$79.99", businessDays: "~20 days", description: "", group: "For cards valued $500\u2013$2,500", maxValue: "Up to $1,500" },
      { id: "psa-express", name: "Express", price: "$149", businessDays: "~15 days", description: "", group: "For cards valued $500\u2013$2,500", maxValue: "Up to $2,500" },
      { id: "psa-super-express", name: "Super Express", price: "$299", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $5,000" },
      { id: "psa-walkthrough", name: "Walk-Through", price: "$599", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $10,000" },
      { id: "psa-premium-1", name: "Premium 1", price: "$999", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $25,000" },
      { id: "psa-premium-2", name: "Premium 2", price: "$1,999", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $50,000" },
      { id: "psa-premium-3", name: "Premium 3", price: "$2,999", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $100,000" },
      { id: "psa-premium-5", name: "Premium 5", price: "$4,999", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $250,000" },
      { id: "psa-premium-10", name: "Premium 10", price: "$9,999", businessDays: "~7 days", description: "", group: "For cards valued $5,000+", maxValue: "Over $250,000" },
    ],
    dualTiers: [
      { id: "psa-dual-value-bulk", name: "Value Bulk", price: "$32.99", businessDays: "~105 days", description: "20-card min, pre-1980 or post-1980", group: "For cards valued up to $500", maxValue: "Up to $500" },
      { id: "psa-dual-value", name: "Value", price: "$42.99", businessDays: "~85 days", description: "", group: "For cards valued up to $500", maxValue: "Up to $500" },
      { id: "psa-dual-value-plus", name: "Value Plus", price: "$64.99", businessDays: "~50 days", description: "", group: "For cards valued up to $500", maxValue: "Up to $500" },
      { id: "psa-dual-value-max", name: "Value Max", price: "$84.99", businessDays: "~40 days", description: "", group: "For cards valued $500\u2013$2,500", maxValue: "Up to $1,000" },
      { id: "psa-dual-regular", name: "Regular", price: "$104.99", businessDays: "~30 days", description: "", group: "For cards valued $500\u2013$2,500", maxValue: "Up to $1,500" },
      { id: "psa-dual-express", name: "Express", price: "$199", businessDays: "~25 days", description: "", group: "For cards valued $500\u2013$2,500", maxValue: "Up to $2,500" },
      { id: "psa-dual-super-express", name: "Super Express", price: "$399", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $5,000" },
      { id: "psa-dual-walkthrough", name: "Walk-Through", price: "$799", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $10,000" },
      { id: "psa-dual-premium-1", name: "Premium 1", price: "$1,299", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $25,000" },
      { id: "psa-dual-premium-2", name: "Premium 2", price: "$2,599", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $50,000" },
      { id: "psa-dual-premium-3", name: "Premium 3", price: "$3,999", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $100,000" },
      { id: "psa-dual-premium-5", name: "Premium 5", price: "$6,499", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Up to $250,000" },
      { id: "psa-dual-premium-10", name: "Premium 10", price: "$12,999", businessDays: "~9 days", description: "", group: "For cards valued $5,000+", maxValue: "Over $250,000" },
    ],
  },
  {
    id: "sgc",
    name: "SGC",
    startingPrice: "$18",
    turnaround: "",
    tiers: [
      { id: "sgc-standard", name: "Standard", price: "$18", businessDays: "", description: "", group: "For cards valued $50+" },
    ],
  },
];

export const ITEM_CATEGORIES: {
  id: ItemCategory;
  label: string;
  description: string;
}[] = [
  { id: "trading-cards", label: "Trading cards", description: "Raw or authenticated" },
  { id: "comics-collectibles", label: "Comics, video games & other collectibles", description: "Authenticated only" },
  { id: "large-items", label: "Large items", description: "Authenticated only" },
  { id: "red-rookie", label: "Red Rookie cards", description: "Raw or authenticated" },
];

export const LISTING_OPTIONS: {
  id: ListingIntent;
  label: string;
  description: string;
}[] = [
  { id: "weekly-auction", label: "Weekly Auction", description: "For items under $15,000. $5 starting bid." },
  { id: "premier-auction", label: "Premier Auction", description: "For items over $15,000. $1,000 starting bid." },
];

export interface PsaCardItem {
  id: string;
  year: string;
  product: string;
  player: string;
  cardNumber: string;
  type: string;
  estimatedValue: number;
  quantity: number;
}

export interface SubmissionState {
  itemCategory: ItemCategory | null;
  cardCondition: CardCondition | null;
  selectedGrader: string | null;
  selectedTier: string | null;
  gradingType: GradingType;
  listingIntent: ListingIntent | null;
  itemCount: number;
  estimatedValue: number;
  psaCards: PsaCardItem[];
}

export const initialSubmissionState: SubmissionState = {
  itemCategory: null,
  cardCondition: null,
  selectedGrader: null,
  selectedTier: null,
  gradingType: "card",
  listingIntent: null,
  itemCount: 0,
  estimatedValue: 0,
  psaCards: [],
};
