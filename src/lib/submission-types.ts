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
  tagline: string;
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
    id: "cgc",
    name: "CGC",
    startingPrice: "$3.00",
    turnaround: "",
    tagline: "Popular for Pokémon, Yu-Gi-Oh! and non-sports cards",
    tiers: [
      { id: "cgc-auth", name: "Authentication only", price: "$3.00", businessDays: "", description: "", maxValue: "Recommended for lower value cards"},
      { id: "cgc-standard", name: "Grading", price: "$10.00", businessDays: "", description: "", maxValue: "Recommended for cards over $50" },
    ],
  },
  {
    id: "beckett",
    name: "Beckett",
    startingPrice: "$25.00",
    turnaround: "",
    tagline: "Detailed subgrades for centering, corners, edges and surface",
    tiers: [
      { id: "bgs-standard", name: "Grading", price: "$25.00", businessDays: "", description: "", group: "For cards valued $50+", maxValue: "Recommended for cards over $50" },
    ],
  },
  {
    id: "psa",
    name: "PSA",
    startingPrice: "$24.99",
    turnaround: "",
    tagline: "The most widely recognized grading service for sports cards",
    tiers: [
      { id: "psa-value-bulk", name: "Value Bulk", price: "$24.99", businessDays: "~95 days", description: "20-card min", maxValue: "Up to $500" },
      { id: "psa-value", name: "Value", price: "$32.99", businessDays: "~75 days", description: "", maxValue: "Up to $500" },
      { id: "psa-value-plus", name: "Value Plus", price: "$49.99", businessDays: "~40 days", description: "", maxValue: "Up to $500" },
      { id: "psa-value-max", name: "Value Max", price: "$64.99", businessDays: "~30 days", description: "", maxValue: "Up to $1,000" },
      { id: "psa-regular", name: "Regular", price: "$79.99", businessDays: "~20 days", description: "", maxValue: "Up to $1,500" },
      { id: "psa-express", name: "Express", price: "$149.00", businessDays: "~15 days", description: "", maxValue: "Up to $2,500" },
      { id: "psa-super-express", name: "Super Express", price: "$299.00", businessDays: "~7 days", description: "", maxValue: "Up to $5,000" },
      { id: "psa-walkthrough", name: "Walk-Through", price: "$599.00", businessDays: "~7 days", description: "", maxValue: "Up to $10,000" },
      { id: "psa-premium-1", name: "Premium 1", price: "$999.00", businessDays: "~7 days", description: "", maxValue: "Up to $25,000" },
      { id: "psa-premium-2", name: "Premium 2", price: "$1,999.00", businessDays: "~7 days", description: "", maxValue: "Up to $50,000" },
      { id: "psa-premium-3", name: "Premium 3", price: "$2,999.00", businessDays: "~7 days", description: "", maxValue: "Up to $100,000" },
      { id: "psa-premium-5", name: "Premium 5", price: "$4,999.00", businessDays: "~7 days", description: "", maxValue: "Up to $250,000" },
      { id: "psa-premium-10", name: "Premium 10", price: "$9,999.00", businessDays: "~7 days", description: "", maxValue: "Over $250,000" },
    ],
    dualTiers: [
      { id: "psa-dual-value-bulk", name: "Value Bulk", price: "$32.99", businessDays: "~105 days", description: "20-card min", maxValue: "Up to $500" },
      { id: "psa-dual-value", name: "Value", price: "$42.99", businessDays: "~85 days", description: "", maxValue: "Up to $500" },
      { id: "psa-dual-value-plus", name: "Value Plus", price: "$64.99", businessDays: "~50 days", description: "", maxValue: "Up to $500" },
      { id: "psa-dual-value-max", name: "Value Max", price: "$84.99", businessDays: "~40 days", description: "", maxValue: "Up to $1,000" },
      { id: "psa-dual-regular", name: "Regular", price: "$104.99", businessDays: "~30 days", description: "", maxValue: "Up to $1,500" },
      { id: "psa-dual-express", name: "Express", price: "$199.00", businessDays: "~25 days", description: "", maxValue: "Up to $2,500" },
      { id: "psa-dual-super-express", name: "Super Express", price: "$399.00", businessDays: "~9 days", description: "", maxValue: "Up to $5,000" },
      { id: "psa-dual-walkthrough", name: "Walk-Through", price: "$799.00", businessDays: "~9 days", description: "", maxValue: "Up to $10,000" },
      { id: "psa-dual-premium-1", name: "Premium 1", price: "$1,299.00", businessDays: "~9 days", description: "", maxValue: "Up to $25,000" },
      { id: "psa-dual-premium-2", name: "Premium 2", price: "$2,599.00", businessDays: "~9 days", description: "", maxValue: "Up to $50,000" },
      { id: "psa-dual-premium-3", name: "Premium 3", price: "$3,999.00", businessDays: "~9 days", description: "", maxValue: "Up to $100,000" },
      { id: "psa-dual-premium-5", name: "Premium 5", price: "$6,499.00", businessDays: "~9 days", description: "", maxValue: "Up to $250,000" },
      { id: "psa-dual-premium-10", name: "Premium 10", price: "$12,999.00", businessDays: "~9 days", description: "", maxValue: "Over $250,000" },
    ],
  },
  {
    id: "sgc",
    name: "SGC",
    startingPrice: "$18.00",
    turnaround: "",
    tagline: "Competitive pricing with fast turnaround times",
    tiers: [
      { id: "sgc-standard", name: "Grading", price: "$18.00", businessDays: "", description: "", group: "For cards valued $50+", maxValue: "Recommended for cards over $50" },
    ],
  },
];

export const ITEM_CATEGORIES: {
  id: ItemCategory;
  label: string;
  description: string;
}[] = [
  { id: "trading-cards", label: "Trading cards", description: "Authenticated or raw " },
  { id: "comics-collectibles", label: "Comics, video games & other collectibles", description: "Authenticated only" },
  { id: "large-items", label: "Large items", description: "Authenticated only" },
  { id: "red-rookie", label: "Red Rookie cards", description: "Authenticated or raw" },
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
