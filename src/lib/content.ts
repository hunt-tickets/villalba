import { createReader } from '@keystatic/core/reader';
import config from '../../keystatic.config';

export const reader = createReader(process.cwd(), config);

export interface ProjectContent {
  slug: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  año: string;
  rol: string;
  categoria: 'film' | 'photo' | 'video';
  thumbnail: string | null;
  media: Array<{
    tipo: 'image' | 'video' | 'external';
    archivo: string | null;
    videoUrl: string;
    alt: string;
  }>;
  orden: number;
  visible: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractTextFromDocument(doc: any[]): string {
  if (!Array.isArray(doc)) return '';

  return doc.map((node) => {
    if (node?.children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return node.children.map((child: any) => child?.text || '').join('');
    }
    return '';
  }).join('\n');
}

export async function getProjects(): Promise<ProjectContent[]> {
  const projectSlugs = await reader.collections.projects.list();

  const projects = await Promise.all(
    projectSlugs.map(async (slug) => {
      const project = await reader.collections.projects.read(slug);
      if (!project) return null;

      const descripcionDoc = await project.descripcion();
      const descripcion = extractTextFromDocument(descripcionDoc);

      return {
        slug,
        titulo: project.titulo,
        subtitulo: project.subtitulo || '',
        descripcion,
        año: project.año || '',
        rol: project.rol || '',
        categoria: project.categoria as 'film' | 'photo' | 'video',
        thumbnail: project.thumbnail || null,
        media: [...(project.media || [])],
        orden: project.orden || 0,
        visible: project.visible ?? true,
      };
    })
  );

  return projects
    .filter((p): p is ProjectContent => p !== null && p.visible)
    .sort((a, b) => a.orden - b.orden);
}

export async function getProjectBySlug(slug: string): Promise<ProjectContent | null> {
  const project = await reader.collections.projects.read(slug);
  if (!project) return null;

  const descripcionDoc = await project.descripcion();
  const descripcion = extractTextFromDocument(descripcionDoc);

  return {
    slug,
    titulo: project.titulo,
    subtitulo: project.subtitulo || '',
    descripcion,
    año: project.año || '',
    rol: project.rol || '',
    categoria: project.categoria as 'film' | 'photo' | 'video',
    thumbnail: project.thumbnail || null,
    media: [...(project.media || [])],
    orden: project.orden || 0,
    visible: project.visible ?? true,
  };
}
