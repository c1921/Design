declare global {
  interface Window {
    HSStaticMethods: {
      autoInit(): void;
    };
  }
}

// Tab相关类型定义
export interface TabItem {
  id: string;
  icon: string;
  title: string;
}

// 图片项目类型定义
export interface ImageItem {
  url: string;
  alt: string;
}

// 图片库标签项类型定义
export interface GalleryTabItem extends TabItem {
  path: string;
}

export {}; // 确保文件被视为模块