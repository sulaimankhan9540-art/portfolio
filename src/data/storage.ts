import { PortfolioData } from '../types';
import { initialPortfolioData } from './initialData';

const STORAGE_KEY = 'portfolio_data_v1';

export const loadData = (): PortfolioData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return initialPortfolioData;
};

export const saveData = (data: PortfolioData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving data:', e);
    alert('Failed to save data. Storage may be full. Try removing some images.');
  }
};

export const resetData = (): PortfolioData => {
  localStorage.removeItem(STORAGE_KEY);
  return initialPortfolioData;
};
