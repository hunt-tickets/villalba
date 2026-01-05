export interface MediaItem {
  tipo: 'image' | 'video' | 'external';
  archivo: string | null;
  videoUrl?: string;
  alt?: string;
}

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
  media?: MediaItem[];
  category: 'film' | 'photo' | 'video';
  videoUrl?: string;
  order?: number;
  visible?: boolean;
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
