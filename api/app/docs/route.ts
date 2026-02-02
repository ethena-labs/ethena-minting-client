import { ApiReference } from '@scalar/nextjs-api-reference'

const config = {
  spec: {
    url: '/api/openapi',
  },
  metaData: {
    title: 'Ethena Minting API | USDe',
    description: 'API documentation for minting and redeeming USDe tokens',
    ogImage: '/ethena-thumbnail.png',
  },
  theme: 'purple' as const,
  hideModels: false,
  hideDownloadButton: false,
  darkMode: true,
  layout: 'modern' as const,
  showSidebar: true,
  customCss: `
    .dark-mode {
      --scalar-background-1: #0d0d0f;
      --scalar-background-2: #16161a;
      --scalar-background-3: #1e1e24;
      --scalar-color-1: #ffffff;
      --scalar-color-2: #a0a0b0;
      --scalar-color-3: #6b6b7b;
      --scalar-color-accent: #8b5cf6;
      --scalar-button-1: #8b5cf6;
      --scalar-button-1-hover: #7c3aed;
    }
    .light-mode {
      --scalar-color-accent: #7c3aed;
      --scalar-button-1: #7c3aed;
    }
    .sidebar-heading {
      font-weight: 600;
    }
  `,
  favicon: '/favicon.svg',
  searchHotKey: 'k' as const,
  hiddenClients: ['unirest'],
  defaultHttpClient: {
    targetKey: 'js' as const,
    clientKey: 'fetch' as const,
  },
}

export const GET = ApiReference(config)

