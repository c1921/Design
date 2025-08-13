import type { GalleryTabItem } from '../types/global';

// 默认图片库配置
export const defaultGalleryConfig: GalleryTabItem[] = [
  { 
    id: '3c', 
    icon: 'device-laptop', 
    title: '3C数码', 
    path: '/3c-images.json' 
  },
  { 
    id: 'indoor', 
    icon: 'home', 
    title: '室内设计', 
    path: '/indoor-images.json' 
  },
  { 
    id: 'others', 
    icon: 'dots', 
    title: '其他作品', 
    path: '/other-images.json' 
  }
];

// 自定义配置示例
export const customGalleryConfig: GalleryTabItem[] = [
  { 
    id: 'portfolio', 
    icon: 'briefcase', 
    title: '作品集', 
    path: '/portfolio-images.json' 
  },
  { 
    id: 'nature', 
    icon: 'tree', 
    title: '自然风光', 
    path: '/nature-images.json' 
  },
  { 
    id: 'architecture', 
    icon: 'building', 
    title: '建筑摄影', 
    path: '/architecture-images.json' 
  },
  { 
    id: 'street', 
    icon: 'road', 
    title: '街头摄影', 
    path: '/street-images.json' 
  }
];

// 工厂函数 - 根据类型返回不同配置
export function createGalleryConfig(type: 'default' | 'custom' = 'default'): GalleryTabItem[] {
  switch (type) {
    case 'custom':
      return customGalleryConfig;
    case 'default':
    default:
      return defaultGalleryConfig;
  }
}