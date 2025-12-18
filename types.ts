export enum Platform {
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  GoogleAds = 'Google Ads',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  WebsiteBanner = 'Website Banner',
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter (X)'
}

export enum Tone {
  Professional = 'Professional',
  Emotional = 'Emotional',
  Friendly = 'Friendly',
  Luxury = 'Luxury',
  Funny = 'Funny',
  Urgent = 'Urgent',
  Persuasive = 'Persuasive'
}

export enum Length {
  Short = 'Short (Punchy)',
  Medium = 'Medium (Balanced)',
  Long = 'Long (Detailed)'
}

export interface AdRequestData {
  productName: string;
  description: string;
  targetAudience: string;
  platform: Platform;
  tone: Tone;
  length: Length;
}

export interface AdResponseData {
  headline: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  explanation: string;
}

export interface GeneratedResult {
  data: AdResponseData | null;
  loading: boolean;
  error: string | null;
}