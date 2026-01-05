import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    projects: collection({
      label: 'Proyectos',
      slugField: 'titulo',
      path: 'content/projects/*',
      format: { contentField: 'descripcion' },
      schema: {
        titulo: fields.slug({
          name: {
            label: 'Título',
            validation: { isRequired: true },
          },
        }),
        subtitulo: fields.text({
          label: 'Subtítulo',
          description: 'Ej: Documental, Cortometraje, Serie Fotográfica',
        }),
        descripcion: fields.document({
          label: 'Descripción',
          formatting: true,
        }),
        año: fields.text({
          label: 'Año',
          defaultValue: new Date().getFullYear().toString(),
        }),
        rol: fields.text({
          label: 'Rol',
          description: 'Ej: Directora / Editora',
        }),
        categoria: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Film', value: 'film' },
            { label: 'Foto', value: 'photo' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'film',
        }),
        thumbnail: fields.image({
          label: 'Imagen de portada',
          description: 'Imagen que aparece en la galería',
          directory: 'public/uploads/thumbnails',
          publicPath: '/uploads/thumbnails',
        }),
        media: fields.array(
          fields.object({
            tipo: fields.select({
              label: 'Tipo',
              options: [
                { label: 'Imagen', value: 'image' },
                { label: 'Video (subir)', value: 'video' },
                { label: 'Video externo (YouTube/Vimeo)', value: 'external' },
              ],
              defaultValue: 'image',
            }),
            archivo: fields.image({
              label: 'Archivo (imagen o video)',
              directory: 'public/uploads/media',
              publicPath: '/uploads/media',
            }),
            videoUrl: fields.text({
              label: 'URL del video externo',
              description: 'Link de YouTube o Vimeo',
            }),
            alt: fields.text({
              label: 'Descripción (alt)',
            }),
          }),
          {
            label: 'Media',
            description: 'Imágenes y videos del proyecto',
            itemLabel: (props) => props.fields.alt.value || 'Media sin título',
          }
        ),
        orden: fields.integer({
          label: 'Orden',
          description: 'Posición en la galería (menor = primero)',
          defaultValue: 0,
        }),
        visible: fields.checkbox({
          label: 'Visible',
          description: 'Mostrar en la galería',
          defaultValue: true,
        }),
      },
    }),
  },
});
