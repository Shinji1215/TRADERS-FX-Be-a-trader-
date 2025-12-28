
export interface SectionContent {
  id: string;
  title: string;
  subtitle?: string;
  content: string | string[];
  icon?: string;
}

export interface MarketTime {
  name: string;
  summer: string;
  winter: string;
  color: string;
}
