import { Project, NavItem } from '@/types';
import projectsData from '../../content/projects.json';

// Transform JSON data to Project format
function transformProject(data: typeof projectsData.projects[0]): Project {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    description: data.description,
    year: data.year,
    role: data.role,
    category: data.category as 'film' | 'photo' | 'video',
    thumbnail: data.thumbnail,
    imageCount: data.media.filter(m => m.type === 'image').length,
    images: data.media.filter(m => m.type === 'image').map(m => m.src),
    media: data.media.map(m => ({
      tipo: m.type as 'image' | 'video' | 'external',
      archivo: m.type !== 'external' ? m.src : null,
      videoUrl: m.type === 'external' ? m.src : undefined,
      alt: '',
    })),
    order: data.order,
    visible: data.visible,
  };
}

// Load projects from JSON
export const projects: Project[] = projectsData.projects
  .map(transformProject)
  .filter(p => p.visible)
  .sort((a, b) => (a.order || 0) - (b.order || 0));

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

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getVisibleProjects(): Project[] {
  return projects;
}
