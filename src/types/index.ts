export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  year: string;
  role: string;
  imageCount: number;
  thumbnail: string;
  images: string[];
  category: 'film' | 'photo' | 'video';
  videoUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}
