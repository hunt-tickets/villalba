'use client';

import { useState, useRef } from 'react';
import projectsData from '../../../content/projects.json';

interface MediaItem {
  type: 'image' | 'video' | 'external';
  src: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: string;
  role: string;
  category: 'film' | 'photo' | 'video';
  thumbnail: string;
  media: MediaItem[];
  order: number;
  visible: boolean;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData.projects as Project[]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const emptyProject: Project = {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    year: new Date().getFullYear().toString(),
    role: '',
    category: 'film',
    thumbnail: '',
    media: [],
    order: projects.length + 1,
    visible: true,
  };

  const generateId = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = (project: Project) => {
    if (isCreating) {
      const newProject = { ...project, id: generateId(project.title) };
      setProjects([...projects, newProject]);
    } else {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    }
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás segura de eliminar este proyecto?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newProjects = [...projects];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= projects.length) return;

    [newProjects[index], newProjects[newIndex]] = [newProjects[newIndex], newProjects[index]];

    // Update order values
    newProjects.forEach((p, i) => p.order = i + 1);
    setProjects(newProjects);
  };

  const handleExport = () => {
    const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
    const data = JSON.stringify({ projects: sortedProjects }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
          alert('Proyectos importados correctamente');
        }
      } catch {
        alert('Error al leer el archivo JSON');
      }
    };
    reader.readAsText(file);
  };

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-light tracking-wide">Admin</h1>
            <p className="text-white/50 text-sm">Gestiona los proyectos del portafolio</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="px-4 py-2 text-sm border border-white/20 hover:border-white/40 transition-colors"
            >
              Ver sitio
            </a>
            <button
              onClick={handleImportClick}
              className="px-4 py-2 text-sm border border-white/20 hover:border-white/40 transition-colors"
            >
              Importar
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm bg-white text-black hover:bg-white/90 transition-colors"
            >
              Descargar JSON
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 p-4 border border-white/10 bg-white/5">
          <p className="text-sm text-white/60">
            <strong className="text-white">Instrucciones:</strong> Edita tus proyectos aquí, luego haz clic en
            "Descargar JSON" y reemplaza el archivo <code className="bg-white/10 px-1">content/projects.json</code> en tu repositorio.
          </p>
        </div>

        {/* Project List */}
        {!editingProject && !isCreating && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-light">Proyectos ({projects.length})</h2>
              <button
                onClick={() => { setIsCreating(true); setEditingProject(emptyProject); }}
                className="px-4 py-2 text-sm border border-white/20 hover:border-white/40 transition-colors"
              >
                + Nuevo proyecto
              </button>
            </div>

            <div className="space-y-2">
              {sortedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`flex items-center gap-4 p-4 border transition-colors ${
                    project.visible ? 'border-white/10 bg-white/5' : 'border-white/5 bg-white/[0.02] opacity-50'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 bg-neutral-800 flex-shrink-0 overflow-hidden">
                    {project.thumbnail && (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{project.title || 'Sin título'}</h3>
                    <p className="text-sm text-white/50">{project.subtitle} • {project.year}</p>
                    <p className="text-xs text-white/30">{project.media.length} archivos</p>
                  </div>

                  {/* Order controls */}
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === sortedProjects.length - 1}
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20"
                    >
                      ▼
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="px-3 py-1 text-sm border border-white/20 hover:border-white/40 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-1 text-sm border border-red-500/30 text-red-400 hover:border-red-500/60 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Edit/Create Form */}
        {(editingProject || isCreating) && (
          <ProjectForm
            project={editingProject!}
            onSave={handleSave}
            onCancel={() => { setEditingProject(null); setIsCreating(false); }}
            isCreating={isCreating}
          />
        )}
      </div>
    </div>
  );
}

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
  isCreating: boolean;
}

function ProjectForm({ project, onSave, onCancel, isCreating }: ProjectFormProps) {
  const [form, setForm] = useState<Project>(project);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video' | 'external'>('image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  const addMedia = () => {
    if (!newMediaUrl) return;
    setForm({
      ...form,
      media: [...form.media, { type: newMediaType, src: newMediaUrl }],
    });
    setNewMediaUrl('');
  };

  const removeMedia = (index: number) => {
    setForm({
      ...form,
      media: form.media.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-light">
          {isCreating ? 'Nuevo proyecto' : 'Editar proyecto'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-white/50 hover:text-white"
        >
          ✕ Cancelar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/50 mb-1">Título</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-1">Subtítulo</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Documental, Cortometraje, etc."
            className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-1">Año</label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-1">Rol</label>
          <input
            type="text"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="Directora / Editora"
            className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-1">Categoría</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as 'film' | 'photo' | 'video' })}
            className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none"
          >
            <option value="film">Film</option>
            <option value="photo">Foto</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-1">Thumbnail URL</label>
          <input
            type="text"
            value={form.thumbnail}
            onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
            placeholder="/uploads/proyecto/thumb.jpg"
            className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/50 mb-1">Descripción</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full bg-white/5 border border-white/10 px-3 py-2 focus:border-white/30 outline-none resize-none"
        />
      </div>

      {/* Visibility */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="visible"
          checked={form.visible}
          onChange={(e) => setForm({ ...form, visible: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="visible" className="text-sm">Visible en la galería</label>
      </div>

      {/* Media */}
      <div>
        <label className="block text-sm text-white/50 mb-2">Media ({form.media.length})</label>

        {/* Media list */}
        <div className="space-y-2 mb-4">
          {form.media.map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white/5 border border-white/10">
              <span className="text-xs px-2 py-1 bg-white/10 rounded">
                {item.type === 'image' ? '🖼️' : item.type === 'video' ? '🎬' : '🔗'}
              </span>
              <span className="flex-1 text-sm truncate">{item.src}</span>
              <button
                type="button"
                onClick={() => removeMedia(index)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add media */}
        <div className="flex gap-2">
          <select
            value={newMediaType}
            onChange={(e) => setNewMediaType(e.target.value as 'image' | 'video' | 'external')}
            className="bg-white/5 border border-white/10 px-3 py-2 text-sm"
          >
            <option value="image">Imagen</option>
            <option value="video">Video</option>
            <option value="external">YouTube/Vimeo</option>
          </select>
          <input
            type="text"
            value={newMediaUrl}
            onChange={(e) => setNewMediaUrl(e.target.value)}
            placeholder="URL del archivo..."
            className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm focus:border-white/30 outline-none"
          />
          <button
            type="button"
            onClick={addMedia}
            className="px-4 py-2 text-sm border border-white/20 hover:border-white/40"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-2 pt-4 border-t border-white/10">
        <button
          type="submit"
          className="px-6 py-2 bg-white text-black hover:bg-white/90 transition-colors"
        >
          Guardar proyecto
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-white/20 hover:border-white/40 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
