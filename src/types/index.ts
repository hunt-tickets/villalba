export interface Project {
  id: string;
  title: string;
  imageCount: number;
  thumbnail: string;
  category: 'film' | 'photo' | 'video';
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
