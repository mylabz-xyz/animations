import { Color } from 'three';

export interface MusicPlayerOptions {
  musicPlayed?: Music;
  musicList?: Music[];
  themeSelected?: Theme;
  themeList?: Theme[];
}

export interface SceneMainOptions {
  speed?: number;
  backgroundColor?: Color;
}

export interface Music {
  name?: string;
  duration?: number;
}

export type Theme = 'default' | 'basic';
