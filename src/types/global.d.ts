declare global {
  interface Window {
    HSStaticMethods: {
      autoInit(): void;
    };
  }
}

export {}; // 确保文件被视为模块