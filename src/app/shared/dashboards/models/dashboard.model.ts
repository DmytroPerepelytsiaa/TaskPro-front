import { FormControl } from '@angular/forms';
import { Moment } from 'moment';

export interface Dashboard {
  id: number;
  name: string;
  icon: DashboardIcons;
  background: DashboardBackgrounds;
  columns: DashboardColumn[];
  createdAt: string;
  updatedAt: string;
}

export type DashboardForm = {
  [FieldName in keyof DashboardFormState]: FormControl<DashboardFormState[FieldName]>;
}

export interface DashboardFormState {
  name: string;
  icon: DashboardIcons;
  background: DashboardBackgrounds;
}

export type DashboardCardForm = {
  [FieldName in keyof DashboardCardFormState]: FormControl<DashboardCardFormState[FieldName]>;
}

export interface DashboardCardFormState {
  name: string;
  description: string;
  priority: CardPriority;
  deadline: Moment;
}

export interface DashboardColumn {
  id: number;
  name: string;
  cards: DashboardColumnCard[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardColumnCard {
  id: number;
  name: string;
  description: string;
  priority: CardPriority;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export enum CardPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Without = 'without',
}

export enum DashboardIcons {
  Project = 'project',
  Star = 'star',
  Loading = 'loading',
  Puzzle = 'puzzle',
  Container = 'container',
  Lightning = 'lightning',
  Colors = 'colors',
  Hexagon = 'hexagon',
}

export enum DashboardBackgrounds {
  NoBg = 'no-bg',
  AquaSakura = 'aqua-sakura',
  Aqua = 'aqua',
  Balloon = 'balloon',
  Green = 'green',
  Moon = 'moon',
  Mountain = 'mountain',
  MountainBalloons = 'mountain-balloons',
  Night = 'night',
  PurpleNight = 'purple-night',
  Sakura = 'sakura',
  Sand = 'sand',
  Ship = 'ship',
  Sky = 'sky',
  Space = 'space',
  Traveling = 'traveling',
}
