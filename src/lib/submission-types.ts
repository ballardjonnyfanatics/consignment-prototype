export type ItemCategory =
  | "trading-cards"
  | "comics-collectibles"
  | "large-items"
  | "red-rookie";

export type CardCondition = "raw" | "graded";

export type ListingIntent = "weekly-auction" | "premier-auction" | "vault";

export interface GraderInfo {
  id: string;
  name: string;
  startingPrice: string;
  turnaround: string;
  tiers: ServiceTier[];
}

export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  businessDays: string;
  description: string;
}

export const GRADERS: GraderInfo[] = [
  {
    id: "beckett",
    name: "Beckett",
    startingPrice: "$25/card",
    turnaround: "20\u201350 business days",
    tiers: [
      { id: "bgs-economy", name: "Economy", price: "$25/card", businessDays: "40\u201350 bus. days", description: "Standard grading" },
      { id: "bgs-standard", name: "Standard", price: "$50/card", businessDays: "20\u201330 bus. days", description: "Standard grading" },
    ],
  },
  {
    id: "cgc",
    name: "CGC",
    startingPrice: "$3/card",
    turnaround: "25\u201365 business days",
    tiers: [
      { id: "cgc-economy", name: "Economy", price: "$3/card", businessDays: "50\u201365 bus. days", description: "Bulk tier, 50+ cards" },
      { id: "cgc-standard", name: "Standard", price: "$18/card", businessDays: "25\u201335 bus. days", description: "Standard grading" },
    ],
  },
  {
    id: "psa",
    name: "PSA",
    startingPrice: "$24.99/card",
    turnaround: "15\u201365 business days",
    tiers: [
      { id: "psa-value", name: "Value", price: "$24.99/card", businessDays: "50\u201365 bus. days", description: "Standard grading" },
      { id: "psa-regular", name: "Regular", price: "$50/card", businessDays: "25\u201335 bus. days", description: "Standard grading" },
      { id: "psa-express", name: "Express", price: "$100/card", businessDays: "15\u201320 bus. days", description: "Priority handling" },
      { id: "psa-super-express", name: "Super Express", price: "$200/card", businessDays: "5\u201310 bus. days", description: "Priority handling" },
    ],
  },
  {
    id: "sgc",
    name: "SGC",
    startingPrice: "$18/card",
    turnaround: "15\u201340 business days",
    tiers: [
      { id: "sgc-economy", name: "Economy", price: "$18/card", businessDays: "30\u201340 bus. days", description: "Standard grading" },
      { id: "sgc-regular", name: "Regular", price: "$35/card", businessDays: "15\u201320 bus. days", description: "Standard grading" },
    ],
  },
];

export const ITEM_CATEGORIES: {
  id: ItemCategory;
  label: string;
  description: string;
}[] = [
  { id: "trading-cards", label: "Trading cards", description: "Raw or already authenticated" },
  { id: "comics-collectibles", label: "Comics, video games & other collectibles", description: "Already authenticated only" },
  { id: "large-items", label: "Large or oversized items", description: "Already authenticated only \u00B7 Pre-approval required" },
  { id: "red-rookie", label: "Red Rookie Redemption", description: "Redeem eligible rookie cards" },
];

export const LISTING_OPTIONS: {
  id: ListingIntent;
  label: string;
  description: string;
}[] = [
  { id: "weekly-auction", label: "List in Weekly Auction", description: "For items under $15,000. $5 starting bid." },
  { id: "premier-auction", label: "List in Premier Auction", description: "For items over $15,000. $1,000 starting bid." },
  { id: "vault", label: "Store in Vault", description: "Sell or retrieve anytime from your collection." },
];

export interface SubmissionState {
  itemCategory: ItemCategory | null;
  cardCondition: CardCondition | null;
  selectedGrader: string | null;
  selectedTier: string | null;
  listingIntent: ListingIntent | null;
  itemCount: number;
  estimatedValue: number;
}

export const initialSubmissionState: SubmissionState = {
  itemCategory: null,
  cardCondition: null,
  selectedGrader: null,
  selectedTier: null,
  listingIntent: null,
  itemCount: 6,
  estimatedValue: 2940,
};
