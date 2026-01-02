import { Project, NavItem } from '@/types';

export const projects: Project[] = [
  {
    id: 'historias-urbanas',
    title: 'HISTORIAS URBANAS',
    imageCount: 12,
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=500&fit=crop',
    category: 'film',
  },
  {
    id: 'cuadros-silentes',
    title: 'CUADROS SILENTES',
    imageCount: 9,
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=500&fit=crop',
    category: 'video',
  },
  {
    id: 'momentos',
    title: 'MOMENTOS',
    imageCount: 20,
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=500&fit=crop',
    category: 'photo',
  },
  {
    id: 'perspectivas',
    title: 'PERSPECTIVAS',
    imageCount: 15,
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=500&fit=crop',
    category: 'film',
  },
  {
    id: 'suenos',
    title: 'SUEÑOS',
    imageCount: 8,
    thumbnail: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=500&fit=crop',
    category: 'video',
  },
];

export const navItems: NavItem[] = [
  { label: 'INSTAGRAM', href: 'https://instagram.com', external: true },
  { label: 'GALERÍA', href: '#gallery' },
  { label: 'CONTACTO', href: '#contact' },
];

export const heroImages = [
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=400&fit=crop',
  'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=400&fit=crop',
];
