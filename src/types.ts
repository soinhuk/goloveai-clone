export type Character = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  avatarNsfw?: string;
  videoAvatar?: string;
  tags: string[];
  bio: string;
  url: string;
  isOnline?: boolean;
  isLive?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  isFavorite?: boolean;
  age?: number;
};

export type NavItem = {
  label: string;
  icon: string;
  href: string;
  badge?: string;
};

export type FilterTag = {
  label: string;
  value: string;
};

export type BannerSlide = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  bgImage: string;
  bgGradient: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: string;
  avatar?: string;
};