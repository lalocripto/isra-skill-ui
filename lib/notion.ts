/**
 * Notion API Client
 * Handles saving scripts to Publicaciones Programadas DB
 */

import { Client } from '@notionhq/client';

export interface NotionScriptData {
  title: string;
  content: string;
  contentType: string;
  technicalLevel: string;
  metadata: {
    wordCount: number;
    estimatedDuration: string;
    complexity: string;
  };
}

export async function saveScriptToNotion(data: NotionScriptData): Promise<string> {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  const databaseId = process.env.NOTION_DATABASE_ID!;

  // Determine platform based on content type
  const platform = getPlatformFromContentType(data.contentType);
  
  // Suggest a date 2-3 days from now
  const suggestedDate = new Date();
  suggestedDate.setDate(suggestedDate.getDate() + 2);

  // Infer complexity values from content type
  const { grabacionComplexity, edicionComplexity } = getComplexityFromType(data.contentType);

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        // Title property (usually "Título" or "Name")
        'Título': {
          title: [
            {
              text: {
                content: data.title,
              },
            },
          ],
        },
        // Suggested date
        'Fecha Sugerida': {
          date: {
            start: suggestedDate.toISOString().split('T')[0],
          },
        },
        // Platform (multi-select or select)
        'Plataforma': {
          multi_select: [
            {
              name: platform,
            },
          ],
        },
        // Status
        'Status': {
          status: {
            name: 'Listo',
          },
        },
        // Grabación complexity
        'Complejidad Grabación': {
          select: {
            name: grabacionComplexity,
          },
        },
        // Edición complexity
        'Complejidad Edición': {
          select: {
            name: edicionComplexity,
          },
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '📊 Metadata',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `Palabras: ${data.metadata.wordCount}`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `Duración estimada: ${data.metadata.estimatedDuration}`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `Complejidad: ${data.metadata.complexity}`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'bulleted_list_item',
          bulleted_list_item: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: `Nivel técnico: ${data.technicalLevel}`,
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'divider',
          divider: {},
        },
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: '📝 Guion',
                },
              },
            ],
          },
        },
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: data.content,
                },
              },
            ],
          },
        },
      ],
    });

    // Return URL of created page
    return `https://notion.so/${response.id.replace(/-/g, '')}`;
  } catch (error) {
    console.error('Error saving to Notion:', error);
    throw new Error('Failed to save to Notion');
  }
}

function getPlatformFromContentType(contentType: string): string {
  if (contentType.includes('TikTok')) return 'TikTok';
  if (contentType.includes('Reel')) return 'Instagram';
  if (contentType.includes('Thread')) return 'Twitter';
  if (contentType.includes('Artículo')) return 'Blog';
  return 'General';
}

function getComplexityFromType(contentType: string): {
  grabacionComplexity: string;
  edicionComplexity: string;
} {
  switch (contentType) {
    case 'TikTok 60s':
    case 'Reel 90s':
      return {
        grabacionComplexity: 'Media',
        edicionComplexity: 'Media',
      };
    case 'Thread':
      return {
        grabacionComplexity: 'Baja',
        edicionComplexity: 'Baja',
      };
    case 'Artículo corto':
      return {
        grabacionComplexity: 'Baja',
        edicionComplexity: 'Alta',
      };
    default:
      return {
        grabacionComplexity: 'Media',
        edicionComplexity: 'Media',
      };
  }
}
