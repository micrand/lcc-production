import { methodologieSurLeTerrain, strategieEtGouvernance } from '@/constants';
import { ReactNode } from 'react'

const pagesData = {
  'strategie-et-gouvernance': {
    title: 'Stratégie et Gouvernance',
    content: strategieEtGouvernance
  },
  'methodologie-sur-le-terrain': {
    title: 'Méthodologie sur le terrain',
    content: methodologieSurLeTerrain
  }
};

export async function generateMetadata({ params }: { params: Promise<{ params: 'strategie-et-gouvernance' | 'methodologie-sur-le-terrain' }> }) {
    const param = await params;
    const page = pagesData[param.params];
    if (!page) return {};
    return {
      title: page.title,
      description: `${page.title} de LCC.`,
      openGraph: {
        title: page.title,
        description: `${page.title} de LCC.`,
      }
    };
  }

const layout = ({children}: {children: ReactNode}) => {
  return children;
}

export default layout