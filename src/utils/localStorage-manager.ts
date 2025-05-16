// localStorage-manager.ts
// Utility for managing user data persistence in localStorage

// Storage keys
const KEYS = {
  RESUME_DATA: 'resumeCreator_resumeData',
  ACTIVE_SECTIONS: 'resumeCreator_activeSections',
  ACTIVE_TEMPLATE: 'resumeCreator_activeTemplate',
  PROFILE_PHOTO: 'resumeCreator_profilePhoto',
  FONT_STYLE: 'resumeCreator_fontStyle',
  COLOR_THEME: 'resumeCreator_colorTheme',
  LAST_SAVED: 'resumeCreator_lastSaved',
  CUSTOM_SECTIONS: 'resumeCreator_customSections',
  FONT_SIZE: 'resumeCreator_fontSize',
  CONTENT_DENSITY: 'resumeCreator_contentDensity',
  SECTION_SPACING: 'resumeCreator_sectionSpacing',
  STYLE_PRESETS: 'resumeCreator_stylePresets'
};

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('localStorage is not available. Data persistence will not work.');
    return false;
  }
};

// Save data to localStorage
export const saveToLocalStorage = <T>(key: string, data: T): boolean => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
    localStorage.setItem(KEYS.LAST_SAVED, new Date().toISOString());
    return true;
  } catch (e) {
    console.error('Error saving to localStorage:', e);
    return false;
  }
};

// Load data from localStorage
export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) return defaultValue;
  
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) return defaultValue;
    return JSON.parse(serializedData) as T;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return defaultValue;
  }
};

// Clear all resume creator data
export const clearAllResumeData = (): boolean => {
  if (!isLocalStorageAvailable()) return false;
  
  try {
    Object.values(KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (e) {
    console.error('Error clearing localStorage:', e);
    return false;
  }
};

// Get last saved timestamp
export const getLastSavedTime = (): string | null => {
  const lastSavedStr = localStorage.getItem(KEYS.LAST_SAVED);
  if (!lastSavedStr) return null;
  
  try {
    const date = new Date(lastSavedStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return null;
  }
};

// Save resume data
export const saveResumeData = <T>(data: T): boolean => {
  return saveToLocalStorage(KEYS.RESUME_DATA, data);
};

// Load resume data
export const loadResumeData = <T>(defaultValue: T): T => {
  return loadFromLocalStorage(KEYS.RESUME_DATA, defaultValue);
};

// Save active sections
export const saveActiveSections = (sections: string[]): boolean => {
  return saveToLocalStorage(KEYS.ACTIVE_SECTIONS, sections);
};

// Load active sections
export const loadActiveSections = (defaultSections: string[]): string[] => {
  return loadFromLocalStorage(KEYS.ACTIVE_SECTIONS, defaultSections);
};

// Save active template
export const saveActiveTemplate = (template: string): boolean => {
  return saveToLocalStorage(KEYS.ACTIVE_TEMPLATE, template);
};

// Load active template
export const loadActiveTemplate = (defaultTemplate: string): string => {
  return loadFromLocalStorage(KEYS.ACTIVE_TEMPLATE, defaultTemplate);
};

// Save profile photo (as base64 string)
export const saveProfilePhoto = (photoData: string | null): boolean => {
  return saveToLocalStorage(KEYS.PROFILE_PHOTO, photoData);
};

// Load profile photo
export const loadProfilePhoto = (): string | null => {
  return loadFromLocalStorage(KEYS.PROFILE_PHOTO, null);
};

// Save font style
export const saveFontStyle = (font: string): boolean => {
  return saveToLocalStorage(KEYS.FONT_STYLE, font);
};

// Load font style
export const loadFontStyle = (defaultFont: string): string => {
  return loadFromLocalStorage(KEYS.FONT_STYLE, defaultFont);
};

// Save color theme
export const saveColorTheme = (color: string): boolean => {
  return saveToLocalStorage(KEYS.COLOR_THEME, color);
};

// Load color theme
export const loadColorTheme = (defaultColor: string): string => {
  return loadFromLocalStorage(KEYS.COLOR_THEME, defaultColor);
};

// Save custom sections
export const saveCustomSections = (sections: Record<string, any>): boolean => {
  return saveToLocalStorage(KEYS.CUSTOM_SECTIONS, sections);
};

// Load custom sections
export const loadCustomSections = (defaultSections: Record<string, any>): Record<string, any> => {
  return loadFromLocalStorage(KEYS.CUSTOM_SECTIONS, defaultSections);
};

// Save font size
export const saveFontSize = (fontSize: string): boolean => {
  return saveToLocalStorage(KEYS.FONT_SIZE, fontSize);
};

// Load font size
export const loadFontSize = (defaultFontSize: string): string => {
  return loadFromLocalStorage(KEYS.FONT_SIZE, defaultFontSize);
};

// Save content density
export const saveContentDensity = (density: string): boolean => {
  return saveToLocalStorage(KEYS.CONTENT_DENSITY, density);
};

// Load content density
export const loadContentDensity = (defaultDensity: string): string => {
  return loadFromLocalStorage(KEYS.CONTENT_DENSITY, defaultDensity);
};

// Save section spacing
export const saveSectionSpacing = (spacing: string): boolean => {
  return saveToLocalStorage(KEYS.SECTION_SPACING, spacing);
};

// Load section spacing
export const loadSectionSpacing = (defaultSpacing: string): string => {
  return loadFromLocalStorage(KEYS.SECTION_SPACING, defaultSpacing);
};

// Save style presets
export const saveStylePresets = (presets: Array<any>): boolean => {
  return saveToLocalStorage(KEYS.STYLE_PRESETS, presets);
};

// Load style presets
export const loadStylePresets = (defaultPresets: Array<any> = []): Array<any> => {
  return loadFromLocalStorage(KEYS.STYLE_PRESETS, defaultPresets);
};

// Export all keys for direct access
export { KEYS };
