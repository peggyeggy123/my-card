
// Added React import to fix "Cannot find namespace 'React'" error when using React.ReactNode
import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  isPopular?: boolean; // 新增：是否為熱門項目
}

export interface ContactInfo {
  name: string;
  company: string;
  title: string;
  slogan: string;
  phone: string;
  lineId: string;
  instagramId: string;
  email: string;
  customAvatarUrl?: string; // 新增：自定義大頭貼網址
}
