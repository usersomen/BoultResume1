import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, Mail, Phone, MapPin, ChevronUp, ChevronDown, X, Plus, 
  Copy, Trash2, Save, ArrowLeft, ArrowRight, Download, Share, 
  Printer, Move, Link as LinkIcon, AlertCircle, CheckCircle, 
  PenLine, FileDown, Layout, Info, Languages as LanguagesIcon, 
  Award, Folder as FolderIcon, Heart, ChevronRight, ChevronLeft, 
  Document, Loader, Type, PaintBucket, Settings, Search
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import slugify from 'slugify';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import TemplateSelector from './TemplateSelector';
import ResumePageRenderer from './ResumePageRenderer';
import AIWritingAssistant from './AIWritingAssistant';
import PhotoUploader from './PhotoUploader';
import ImageCropper from '../common/ImageCropper';
import FontColorPicker from './FontColorPicker';
import ReorderableSections from './ReorderableSections';
import ATSOptimizer from './ATSOptimizer';
import TemplateGallery from './TemplateGallery';
import TypographyControls from './TypographyControls';
import StylePresets from './StylePresets';

import { 
  calculatePages, 
  distributeContent, 
  cleanupRenderer, 
  type SectionData 
} from '../../utils/resume-renderer';

import {
  generateMultiPagePDF,
  generateSingleElementPDF,
  generatePuppeteerPDF,
  captureAllResumePages
} from '../../utils/pdf-generator';

import {
  saveResumeData,
  loadResumeData,
  saveActiveSections,
  loadActiveSections,
  saveActiveTemplate,
  loadActiveTemplate,
  saveProfilePhoto,
  loadProfilePhoto,
  saveFontStyle,
  loadFontStyle,
  saveColorTheme,
  loadColorTheme,
  saveCustomSections,
  loadCustomSections,
  getLastSavedTime,
  saveFontSize,
  loadFontSize,
  saveContentDensity,
  loadContentDensity,
  saveSectionSpacing,
  loadSectionSpacing,
  saveStylePresets,
  loadStylePresets
} from '../../utils/localStorage-manager';

interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  employment: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    graduationDate: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    gpa?: string;
    description?: string;
  }>;
  skills: string[];
  links: Array<{
    title: string;
    url: string;
  }>;
  customSections: {
    [key: string]: string[];
  };
}

// Add this component before the ResumeCreator component
const AnimatedAIButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button 
      onClick={onClick}
      className="px-3 py-1 bg-[#4ECCA3] text-white text-xs rounded-full flex items-center hover:bg-[#45B08C] group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <PenLine className="h-3 w-3 mr-1" />
      <span>AI-Assist</span>
    </motion.button>
  );
};

const ResumeCreator: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: 'Curious science teacher with 8+ years of experience and a track record of...',
    employment: [],
    education: [],
    skills: [
      'Critical thinking and problem solving',
      'Ability to Work in a Team',
      'Initiative and Problem-solving Abilities',
      'Analytical Thinking',
      'Communication Skills',
      'Project Management',
      'Time Management Skills',
      'Creative Problem Solving',
      'Analytical Skills',
      'Attention to Detail'
    ],
    links: [],
    customSections: {}
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [cropperVisible, setCropperVisible] = useState<boolean>(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagesContent, setPagesContent] = useState<Array<HTMLElement | null>>([]);
  const resumeRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSections, setActiveSections] = useState<string[]>([
    'personal',
    'summary',
    'employment',
    'education',
    'skills',
    'links'
  ]);
  const [additionalSections, setAdditionalSections] = useState<{[key: string]: any}>({
    courses: [],
    activities: [],
    hobbies: [],
    languages: [],
    references: []
  });

  const [newCustomSectionName, setNewCustomSectionName] = useState<string>('');
  const [showCustomSectionInput, setShowCustomSectionInput] = useState<boolean>(false);

  const [newSkill, setNewSkill] = useState<string>('');

  const [resumeScore, setResumeScore] = useState<number>(0); // Initial resume score is 0%
  const [showTemplateModal, setShowTemplateModal] = useState<boolean>(false);
  const [activeTemplate, setActiveTemplate] = useState<string>("default");
  const [showAIWritingHelp, setShowAIWritingHelp] = useState<boolean>(false);

  const [sectionHeights, setSectionHeights] = useState<Record<string, number>>({});
  const [sectionPageMap, setSectionPageMap] = useState<Record<string, number>>({});
  const [isCalculatingPages, setIsCalculatingPages] = useState<boolean>(false);

  const [pageElements, setPageElements] = useState<HTMLElement[]>([]);
  const [contentOverflow, setContentOverflow] = useState<boolean>(false);

  const [fontStyle, setFontStyle] = useState<string>('Open Sans');
  const [colorTheme, setColorTheme] = useState<string>('#3b82f6'); // Default blue
  const [fontSize, setFontSize] = useState<string>('medium'); // small, medium, large
  const [contentDensity, setContentDensity] = useState<string>('medium'); // compact, medium, spacious
  const [sectionSpacing, setSectionSpacing] = useState<string>('medium'); // small, medium, large
  const [showTemplateGallery, setShowTemplateGallery] = useState<boolean>(false);
  const [showStylePresets, setShowStylePresets] = useState<boolean>(false);
  const [stylePresets, setStylePresets] = useState<Array<{name: string, template: string, font: string, color: string}>>([]);
  const [showATSOptimizer, setShowATSOptimizer] = useState<boolean>(false);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [atsSuggestions, setAtsSuggestions] = useState<Array<{section: string, suggestion: string}>>([]);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isAutoSaving, setIsAutoSaving] = useState<boolean>(false);
  const [showSectionManager, setShowSectionManager] = useState<boolean>(false);
  const [customSections, setCustomSections] = useState<Array<{id: string, title: string, type: string}>>([]);

  const [activeTab, setActiveTab] = useState<string>('styling');

  const location = useLocation();
  const navigate = useNavigate();

  const applyTypographyAndSpacing = useCallback(() => {
    const root = document.documentElement;
    
    // Font size scaling
    switch(fontSize) {
      case 'small':
        root.style.setProperty('--resume-font-scale', 'var(--resume-font-scale-small)');
        break;
      case 'medium':
        root.style.setProperty('--resume-font-scale', 'var(--resume-font-scale-medium)');
        break;
      case 'large':
        root.style.setProperty('--resume-font-scale', 'var(--resume-font-scale-large)');
        break;
    }
    
    // Line spacing (content density)
    switch(contentDensity) {
      case 'compact':
        root.style.setProperty('--resume-line-spacing', 'var(--resume-line-spacing-compact)');
        break;
      case 'medium':
        root.style.setProperty('--resume-line-spacing', 'var(--resume-line-spacing-medium)');
        break;
      case 'spacious':
        root.style.setProperty('--resume-line-spacing', 'var(--resume-line-spacing-spacious)');
        break;
    }
    
    // Section spacing
    switch(sectionSpacing) {
      case 'small':
        root.style.setProperty('--resume-section-spacing', 'var(--resume-section-spacing-small)');
        break;
      case 'medium':
        root.style.setProperty('--resume-section-spacing', 'var(--resume-section-spacing-medium)');
        break;
      case 'large':
        root.style.setProperty('--resume-section-spacing', 'var(--resume-section-spacing-large)');
        break;
    }
    
    // Add content density class to resume content
    const resumeContent = document.querySelector('.resume-content');
    if (resumeContent) {
      // Remove existing content density classes
      resumeContent.classList.remove('resume-content-compact', 'resume-content-medium', 'resume-content-spacious');
      // Add appropriate class
      resumeContent.classList.add(`resume-content-${contentDensity}`);
    }
  }, [fontSize, contentDensity, sectionSpacing]);

  const applyTemplateStyling = useCallback(() => {
    const styling = getTemplateDefaultStyling(activeTemplate);
    const root = document.documentElement;
    
    // Apply font if not already set by user
    if (!fontStyle) {
      setFontStyle(styling.font);
    }
    
    // Apply color if not already set by user
    if (!colorTheme) {
      setColorTheme(styling.color);
    }
    
    // Apply font
    root.style.setProperty('--resume-font', fontStyle);
    
    // Apply color theme
    root.style.setProperty('--resume-accent', colorTheme);
    root.style.setProperty('--primary-color', colorTheme);
    
    // Apply other template-specific styling if available
    if (styling.textColor) {
      root.style.setProperty('--resume-text-color', styling.textColor);
    }
    
    if (styling.backgroundColor) {
      root.style.setProperty('--resume-background', styling.backgroundColor);
    }
    
    if (styling.headerTextColor) {
      root.style.setProperty('--resume-header-text', styling.headerTextColor);
    }
    
    if (styling.sidebarColor) {
      root.style.setProperty('--resume-sidebar-bg', styling.sidebarColor);
    }
    
    // Apply typography and spacing
    applyTypographyAndSpacing();
  }, [activeTemplate, fontStyle, colorTheme, applyTypographyAndSpacing]);

  const autoSave = useCallback(() => {
    setIsAutoSaving(true);
    
    // Save resume data
    saveResumeData(resumeData);
    
    // Save active sections
    saveActiveSections(activeSections);
    
    // Save template
    saveActiveTemplate(activeTemplate);
    
    // Save styling
    saveFontStyle(fontStyle);
    saveColorTheme(colorTheme);
    
    // Save typography and spacing settings
    saveFontSize(fontSize);
    saveContentDensity(contentDensity);
    saveSectionSpacing(sectionSpacing);
    
    // Save custom sections
    saveCustomSections(customSections);
    
    // Save style presets
    saveStylePresets(stylePresets);
    
    // Update last saved time - ensure we're using a string
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSavedTime(timeString);
    
    setTimeout(() => {
      setIsAutoSaving(false);
    }, 1000);
  }, [resumeData, activeSections, activeTemplate, fontStyle, colorTheme, fontSize, contentDensity, sectionSpacing, customSections, stylePresets]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const templateId = queryParams.get('template');
    if (templateId) {
      setActiveTemplate(templateId);
    }
  }, [location.search]);

  useEffect(() => {
    pageRefs.current = Array(pageCount).fill(null);
  }, [pageCount]);

  useEffect(() => {
    // Skip if no resume element or still loading
    if (!resumeRef.current) return;
    
    // Recalculate whenever content changes
    const calculatePageCount = async () => {
      try {
        // First, measure all section heights
        const headerElement = resumeRef.current.querySelector('.mb-6.relative');
        const headerHeight = headerElement ? headerElement.getBoundingClientRect().height : 100;
        
        // Get each section's height with improved accuracy
        const sectionElements = activeSections
          .filter(section => section !== 'personal')
          .map(section => {
            const element = resumeRef.current?.querySelector(`[data-section="${section}"]`);
            // If element exists, get its actual height
            const height = element ? element.getBoundingClientRect().height : 0;
            return {
              key: section,
              element: element as HTMLElement,
              height: height
            };
          })
          .filter(section => section.height > 0);
        
        // A4 height in pixels with better margin calculation
        const pageHeight = 842; // Standard A4 height
        const footerHeight = 40; // Reduced from 60 to prevent content overlap
        const margins = 35; // Slightly reduced margins to give more space to content
        const contentHeight = pageHeight - headerHeight - margins - footerHeight;
        
        // Check if content fits on one page with a buffer for safety
        const totalSectionHeight = sectionElements.reduce((total, section) => total + section.height, 0);
        console.log(`Total content height: ${totalSectionHeight}px, Available height: ${contentHeight}px`);
        
        if (totalSectionHeight <= contentHeight) {
          // All content fits on a single page
          console.log("Content fits on a single page");
          setPageCount(1);
          setSectionPageMap({});
          return;
        }
        
        // Content doesn't fit on a single page - calculate multi-page distribution
        console.log("Multi-page content detected, distributing across pages...");
        let currentPage = 1;
        let currentHeight = 0;
        const newSectionPageMap: Record<string, number> = {};
        
        // First page has full header
        let availableHeight = contentHeight;
        
        // Distribute sections across pages
        for (const section of sectionElements) {
          // If this section doesn't fit on current page, move to next page
          if (currentHeight + section.height > availableHeight) {
            currentPage++;
            currentHeight = 0;
            
            // Other pages have reduced header or no header based on template
            const subsequentPageHeaderHeight = activeTemplate === 'modern' ? headerHeight * 0.5 : 0;
            availableHeight = pageHeight - subsequentPageHeaderHeight - margins - footerHeight;
            console.log(`Moving to page ${currentPage}, available height: ${availableHeight}px`);
          }
          
          // Add section to current page
          currentHeight += section.height;
          newSectionPageMap[section.key] = currentPage;
          console.log(`Placed section "${section.key}" on page ${currentPage}, height: ${section.height}px`);
        }
        
        // Update state with new page count and section distribution
        console.log(`Final page count: ${currentPage}`);
        setPageCount(currentPage);
        setSectionPageMap(newSectionPageMap);
        
        // Ensure we update pageRefs array size
        if (pageRefs.current.length !== currentPage) {
          pageRefs.current = Array(currentPage).fill(null);
        }
      } catch (error) {
        console.error('Error calculating pages:', error);
      }
    };
    
    // Small delay to ensure DOM is updated
    const timer = setTimeout(calculatePageCount, 300);
    return () => clearTimeout(timer);
    
  }, [resumeData, activeSections, activeTemplate]);

  useEffect(() => {
    // Skip initial render or if no resume ref
    if (!resumeRef.current) return;
    
    // Force page calculation with a small delay
    const timer = setTimeout(() => {
      // Trigger a resize event to force recalculation
      const forceUpdate = new Event('resize');
      window.dispatchEvent(forceUpdate);
    }, 250);
    
    return () => clearTimeout(timer);
  }, [
    resumeData.employment, 
    resumeData.education, 
    resumeData.skills, 
    resumeData.summary,
    activeTemplate
  ]);

  useEffect(() => {
    // Debug function for development use
    const debugSectionDistribution = () => {
      console.log('=== Section-Page Distribution ===');
      console.log(`Total Pages: ${pageCount}`);
      console.log('Section Map:', sectionPageMap);
      
      // Group sections by page
      const pageToSectionsMap: Record<number, string[]> = {};
      
      Object.entries(sectionPageMap).forEach(([section, page]) => {
        if (!pageToSectionsMap[page]) {
          pageToSectionsMap[page] = [];
        }
        pageToSectionsMap[page].push(section);
      });
      
      // Log sections by page
      Object.entries(pageToSectionsMap).forEach(([page, sections]) => {
        console.log(`Page ${page}:`, sections.join(', '));
      });
      
      console.log('===============================');
    };
    
    // Uncomment to debug section distribution
    if (Object.keys(sectionPageMap).length > 0) {
      debugSectionDistribution();
    }
  }, [sectionPageMap, pageCount]);

  useEffect(() => {
    // Add a MutationObserver to detect content changes and recalculate pages
    if (!resumeRef.current) return;
    
    // Create a debounced version of the recalculation function
    let recalculationTimeout: NodeJS.Timeout;
    
    const triggerRecalculation = () => {
      clearTimeout(recalculationTimeout);
      recalculationTimeout = setTimeout(() => {
        // Get current dimensions
        const newContentHeight = resumeRef.current?.scrollHeight || 0;
        const pageHeight = 842; // A4 height
        
        // Quick check if we need more pages
        const estimatedPages = Math.max(1, Math.ceil(newContentHeight / pageHeight));
        
        // If our quick estimation shows we need more pages than current, force recalculation
        if (estimatedPages > pageCount) {
          // Trigger resize event to force recalculation
          window.dispatchEvent(new Event('resize'));
        }
      }, 300);
    };
    
    // Create a mutation observer to watch for content changes
    const observer = new MutationObserver((mutations) => {
      // Check if any mutations affect the height
      const heightChanging = mutations.some(mutation => {
        // These are likely to affect height
        return mutation.type === 'childList' || 
               (mutation.type === 'attributes' && 
                (mutation.attributeName === 'style' || 
                 mutation.attributeName === 'class'));
      });
      
      if (heightChanging) {
        triggerRecalculation();
      }
    });
    
    // Start observing
    observer.observe(resumeRef.current, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true
    });
    
    return () => {
      clearTimeout(recalculationTimeout);
      observer.disconnect();
    };
  }, [resumeRef.current, pageCount]);

  useEffect(() => {
    // Helper function to force page recalculation
    const forcePageRecalculation = () => {
      if (!resumeRef.current) return;
      
      // Use requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        // Get current dimensions for a quick overflow check
        const totalHeight = resumeRef.current.scrollHeight;
        const pageHeight = 842; // A4 height
        
        // Quick check if we might need more pages
        const estimatedPages = Math.max(1, Math.ceil(totalHeight / pageHeight));
        
        // If estimation indicates we need more pages than current count
        if (estimatedPages > pageCount) {
          console.log(`Content overflow detected: ${totalHeight}px exceeds page limit. Triggering recalculation.`);
          // Trigger a resize event to force recalculation
          window.dispatchEvent(new Event('resize'));
        }
      });
    };
    
    // Add listeners to input handlers to force recalculation
    forcePageRecalculation();
  }, [resumeData]);

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedResumeData = loadResumeData();
    if (savedResumeData) {
      setResumeData(savedResumeData);
    }
    
    // Load active sections
    const savedActiveSections = loadActiveSections();
    if (savedActiveSections) {
      setActiveSections(savedActiveSections);
    }
    
    // Load active template
    const savedTemplate = loadActiveTemplate();
    if (savedTemplate) {
      setActiveTemplate(savedTemplate);
    }
    
    // Load profile photo
    const savedPhoto = loadProfilePhoto();
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
    
    // Load font style
    const savedFont = loadFontStyle();
    if (savedFont) {
      setFontStyle(savedFont);
    }
    
    // Load color theme
    const savedColor = loadColorTheme();
    if (savedColor) {
      setColorTheme(savedColor);
    }
    
    // Load custom sections
    const savedCustomSections = loadCustomSections();
    if (savedCustomSections) {
      setCustomSections(savedCustomSections);
    }
    
    // Load font size
    const savedFontSize = loadFontSize('medium');
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
    
    // Load content density
    const savedContentDensity = loadContentDensity('medium');
    if (savedContentDensity) {
      setContentDensity(savedContentDensity);
    }
    
    // Load section spacing
    const savedSectionSpacing = loadSectionSpacing('medium');
    if (savedSectionSpacing) {
      setSectionSpacing(savedSectionSpacing);
    }
    
    // Load style presets
    const savedPresets = loadStylePresets([]);
    if (savedPresets && savedPresets.length > 0) {
      setStylePresets(savedPresets);
    }
    
    // Load last saved time
    const savedTime = getLastSavedTime();
    if (savedTime) {
      setLastSavedTime(savedTime);
    }
  }, []);

  useEffect(() => {
    // Apply template styling when template, font, or color changes
    applyTemplateStyling();
  }, [activeTemplate, fontStyle, colorTheme, applyTemplateStyling]);
  
  useEffect(() => {
    // Apply typography and spacing when those settings change
    applyTypographyAndSpacing();
  }, [fontSize, contentDensity, sectionSpacing, applyTypographyAndSpacing]);

  useEffect(() => {
    // Auto-save on changes
    const saveTimer = setTimeout(() => {
      autoSave();
    }, 2000);
    
    return () => clearTimeout(saveTimer);
  }, [resumeData, activeSections, activeTemplate, fontStyle, colorTheme, fontSize, contentDensity, sectionSpacing, customSections]);

  const navigateBack = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    // Support nested fields with dot notation (e.g., 'employment.0.company')
    if (field.includes('.')) {
      const [section, index, subField] = field.split('.');
      const sectionData = [...(resumeData[section as keyof ResumeData] as any[])];
      
      if (sectionData[parseInt(index)]) {
        sectionData[parseInt(index)] = {
          ...sectionData[parseInt(index)],
          [subField]: value
        };
        
        setResumeData({
          ...resumeData,
          [section]: sectionData
        });
      }
    } else {
      setResumeData({
        ...resumeData,
        [field]: value
      });
    }
  };

  // Function to handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Instead of setting the profile photo directly, set the temp image and show cropper
        setTempImageSrc(reader.result as string);
        setCropperVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle crop completion
  const handleCropComplete = (croppedImageUrl: string) => {
    setProfilePhoto(croppedImageUrl);
    setCropperVisible(false);
    setTempImageSrc(null);
  };

  // Handle crop cancellation
  const handleCropCancel = () => {
    setCropperVisible(false);
    setTempImageSrc(null);
  };

  const removePhoto = () => {
    setProfilePhoto(null);
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      await generatePuppeteerPDF(resumeRef.current, `${resumeData.name || 'my'}_resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const addEmployment = () => {
    setResumeData({
      ...resumeData,
      employment: [...resumeData.employment, { 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }]
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { 
        institution: '', 
        degree: '', 
        graduationDate: '' 
      }]
    });
  };

  const addLink = () => {
    setResumeData({
      ...resumeData,
      links: [...resumeData.links, { title: '', url: '' }]
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const removeEmployment = (index: number) => {
    const updatedEmployment = [...resumeData.employment];
    updatedEmployment.splice(index, 1);
    setResumeData({...resumeData, employment: updatedEmployment});
  };

  const removeEducation = (index: number) => {
    const updatedEducation = [...resumeData.education];
    updatedEducation.splice(index, 1);
    setResumeData({...resumeData, education: updatedEducation});
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...resumeData.links];
    updatedLinks.splice(index, 1);
    setResumeData({...resumeData, links: updatedLinks});
  };

  const saveProgress = () => {
    alert('Resume progress saved!');
  };

  const shareResume = () => {
    alert('Share options would open here');
  };

  const printResume = () => {
    // Get the resume element
    const resumeElement = resumeRef.current;
    if (!resumeElement) return;
    
    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print your resume.');
      return;
    }
    
    // Get the computed styles to preserve them in print
    const computedStyle = window.getComputedStyle(resumeElement);
    
    // Clone the resume element
    const clonedResume = resumeElement.cloneNode(true) as HTMLElement;
    
    // Remove the watermark if present
    const watermark = clonedResume.querySelector('.absolute.bottom-2.right-4');
    if (watermark) {
      watermark.remove();
    }
    
    // Create a clean document with only the resume content
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.name || 'Resume'}</title>
          <style>
            /* Base styling for the page */
            @page {
              size: letter;
              margin: 0;
            }
            
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background-color: white;
              font-family: Arial, sans-serif;
            }
            
            /* Container styling */
            .resume-container {
              width: 8.5in;
              height: 11in;
              margin: 0 auto;
              background-color: white;
              box-shadow: none;
              overflow: hidden;
              position: relative;
            }
            
            /* Preserve resume template styling */
            .resume-${activeTemplate} {
              height: 100%;
              width: 100%;
            }
            
            /* Ensure text colors and backgrounds print correctly */
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* Specific styling from the original template */
            h1 { font-size: 24px; font-weight: bold; margin-bottom: 4px; }
            h2 { font-size: 18px; font-weight: normal; color: #4B5563; margin-bottom: 8px; }
            h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
            
            .mb-6 { margin-bottom: 1.5rem; }
            .p-8 { padding: 2rem; }
            
            /* Print media query */
            @media print {
              .resume-container {
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${clonedResume.outerHTML}
          </div>
          <script>
            window.onload = function() {
              // Wait for all resources to load
              setTimeout(() => {
                window.print();
                window.close();
              }, 800);
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;
    
    console.log('Drag ended:', result);
    
    // If dropped outside the list or didn't move
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    const newSectionOrder = Array.from(activeSections);
    const [removed] = newSectionOrder.splice(source.index, 1);
    newSectionOrder.splice(destination.index, 0, removed);
    
    console.log('New section order:', newSectionOrder);
    setActiveSections(newSectionOrder);
  };

  const addSection = (sectionType: string) => {
    if (!activeSections.includes(sectionType)) {
      setActiveSections([...activeSections, sectionType]);
    }
  };

  const addCustomSection = () => {
    if (!newCustomSectionName.trim()) return;
    
    const sectionKey = newCustomSectionName.toLowerCase().replace(/\s+/g, '_');
    
    // Check if this section already exists
    if (activeSections.includes(sectionKey)) {
      alert(`A section named "${newCustomSectionName}" already exists.`);
      return;
    }
    
    // Add the section to active sections
    setActiveSections([...activeSections, sectionKey]);
    
    // Add empty array for this custom section in resumeData
    setResumeData({
      ...resumeData,
      customSections: {
        ...resumeData.customSections,
        [sectionKey]: []
      }
    });
    
    // Reset input
    setNewCustomSectionName('');
    setShowCustomSectionInput(false);
  };

  // Function to add an item to a custom section
  const addCustomSectionItem = (sectionKey: string) => {
    const updatedCustomSections = {
      ...resumeData.customSections,
      [sectionKey]: [...(resumeData.customSections[sectionKey] || []), '']
    };
    
    setResumeData({
      ...resumeData,
      customSections: updatedCustomSections
    });
  };

  // Function to update a custom section item
  const updateCustomSectionItem = (sectionKey: string, index: number, value: string) => {
    const sectionItems = [...resumeData.customSections[sectionKey]];
    sectionItems[index] = value;
    
    setResumeData({
      ...resumeData,
      customSections: {
        ...resumeData.customSections,
        [sectionKey]: sectionItems
      }
    });
  };

  // Function to remove a custom section item
  const removeCustomSectionItem = (sectionKey: string, index: number) => {
    const sectionItems = [...resumeData.customSections[sectionKey]];
    sectionItems.splice(index, 1);
    
    setResumeData({
      ...resumeData,
      customSections: {
        ...resumeData.customSections,
        [sectionKey]: sectionItems
      }
    });
  };

  const exportToPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGeneratingPDF(true);
    
    try {
      // Create new PDF document with A4 dimensions (in mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // For each page in the resume
      for (let i = 0; i < pageCount; i++) {
        const pageNum = i + 1;
        const pageElement = document.getElementById(`resume-page-${pageNum}`);
        
        if (!pageElement) {
          console.error(`Page element #resume-page-${pageNum} not found`);
          continue;
        }
        
        // Make sure this page is visible for capturing
        const originalDisplay = pageElement.style.display;
        pageElement.style.display = 'block';
        
        // Use a delay to ensure DOM updates before capture
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Generate canvas from the page element
        const canvas = await html2canvas(pageElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: "#ffffff"
        });
        
        // Add to PDF (convert canvas to image)
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Add image to PDF (for first page or add new page for subsequent pages)
        if (i > 0) {
          pdf.addPage();
        }
        
        // Calculate dimensions to fit full page
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 dimensions in mm
        
        // Restore original display
        pageElement.style.display = originalDisplay;
      }
      
      // Save PDF with appropriate name
      pdf.save(`${resumeData.name || 'my'}_resume.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderSectionContent = (section: string) => {
    // Get section display name with proper formatting
    const getSectionDisplayName = (sectionId: string) => {
      // Map of standard section IDs to their display names
      const sectionNameMap: Record<string, string> = {
        'summary': 'Professional Summary',
        'employment': 'Work Experience',
        'education': 'Education',
        'skills': 'Skills',
        'links': 'Links',
        'certifications': 'Certifications',
        'projects': 'Projects',
        'awards': 'Awards & Achievements',
        'languages': 'Languages',
        'interests': 'Interests'
      };
      
      // Return mapped name or format custom section name
      return sectionNameMap[sectionId] || 
        sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/_/g, ' ');
    };
    
    // Determine section type for styling
    const getSectionType = (sectionId: string): 'essential' | 'additional' | 'custom' => {
      const essentialSections = ['contact', 'summary', 'employment', 'education', 'skills'];
      const additionalSections = ['certifications', 'projects', 'awards', 'languages', 'interests', 'links'];
      
      if (essentialSections.includes(sectionId)) return 'essential';
      if (additionalSections.includes(sectionId)) return 'additional';
      return 'custom';
    };
    
    // Helper function to create section header with consistent styling
    const renderSectionHeader = (title: string) => {
      const sectionType = getSectionType(section);
      const baseClasses = "resume-section-header text-base font-semibold mb-2";
      let templateClasses = "";
      
      if (activeTemplate === 'modern') {
        templateClasses = "bg-gray-800 text-white p-1 pl-3";
      } else if (activeTemplate.includes('minimalist')) {
        templateClasses = "border-b pb-1";
      } else if (activeTemplate.includes('professional')) {
        templateClasses = "border-b-2 border-gray-800 pb-1";
      } else if (activeTemplate.includes('creative')) {
        templateClasses = sectionType === 'custom' 
          ? "text-[color:var(--resume-accent)] pb-1" 
          : "border-b pb-1";
      } else {
        templateClasses = "border-b pb-1";
      }
      
      return (
        <h3 className={`${baseClasses} ${templateClasses}`} data-section-type={sectionType}>
          {title}
        </h3>
      );
    };
    
    // Wrap section content with appropriate classes
    const wrapSectionContent = (content: JSX.Element, sectionId: string) => {
      const sectionType = getSectionType(sectionId);
      return (
        <div className={`resume-section resume-section-${sectionType}`} data-section-id={sectionId}>
          {content}
        </div>
      );
    };
    
    if (section === 'summary' && resumeData.summary) {
      return wrapSectionContent(
        <>
          {renderSectionHeader(getSectionDisplayName(section))}
          <p className="text-sm text-gray-700">{resumeData.summary}</p>
        </>,
        section
      );
    }
    
    if (section === 'employment' && resumeData.employment.length > 0) {
      return wrapSectionContent(
        <>
          {renderSectionHeader(getSectionDisplayName(section))}
          <div className="space-y-4">
            {resumeData.employment.map((job, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex justify-between font-medium">
                  <span>{job.position}</span>
                  <span className="text-gray-600">{job.startDate} - {job.endDate || 'Present'}</span>
                </div>
                <div className="text-gray-600 mb-1">{job.company}</div>
                <ul className="list-disc pl-5 space-y-1">
                  {job.description.split('\n').map((line, index) => (
                    line.trim() ? <li key={index} className="text-gray-700">{line}</li> : null
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>,
        section
      );
    }
    
    if (section === 'education' && resumeData.education.length > 0) {
      return wrapSectionContent(
        <>
          {renderSectionHeader(getSectionDisplayName(section))}
          <div className="space-y-4">
            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="text-sm">
                <div className="flex justify-between font-medium">
                  <span>{edu.degree}</span>
                  <span className="text-gray-600">{edu.startDate} - {edu.endDate || edu.graduationDate}</span>
                </div>
                <div className="text-gray-600">{edu.institution}</div>
                {edu.location && <div className="text-gray-600 mb-1">{edu.location}</div>}
                {edu.gpa && <div className="text-gray-600 mb-1">GPA: {edu.gpa}</div>}
                {edu.description && <div className="text-gray-700 mt-1">{edu.description}</div>}
              </div>
            ))}
          </div>
        </>,
        section
      );
    }
    
    if (section === 'skills' && resumeData.skills.length > 0) {
      return wrapSectionContent(
        <>
          {renderSectionHeader(getSectionDisplayName(section))}
          {activeTemplate === 'modern' ? (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-sm text-xs">{skill}</span>
              ))}
            </div>
          ) : (
            <div className="columns-2 text-sm text-gray-700">
              {resumeData.skills.map((skill, idx) => (
                <div key={idx} className="mb-1">• {skill}</div>
              ))}
            </div>
          )}
        </>,
        section
      );
    }
    
    if (section === 'links' && resumeData.links.length > 0) {
      return wrapSectionContent(
        <>
          {renderSectionHeader(getSectionDisplayName(section))}
          <div className="space-y-1 text-sm">
            {resumeData.links.map((link, idx) => (
              <div key={idx} className="flex items-center">
                <LinkIcon className="h-3 w-3 mr-2 text-gray-500" />
                <span className="font-medium">{link.title || "Link"}: </span>
                <a href={link.url} className="text-blue-500 hover:underline ml-1 truncate">{link.url}</a>
              </div>
            ))}
          </div>
        </>,
        section
      );
    }
    
    // Unified handling for custom sections and predefined sections
    const customSectionKeys = Object.keys(resumeData.customSections || {});
    const predefinedSections = ['certifications', 'projects', 'awards', 'languages', 'interests', 'courses', 'activities', 'hobbies', 'references'];
    
    if (customSectionKeys.includes(section) || predefinedSections.includes(section)) {
      // Get items from customSections if available
      const items = resumeData.customSections && resumeData.customSections[section] 
        ? resumeData.customSections[section] 
        : [];
      
      if (items.length === 0) return null;
      
      return wrapSectionContent(
        <>
          {renderSectionHeader(getSectionDisplayName(section))}
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {items.map((item, idx) => (
              <li key={idx} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </>,
        section
      );
    }
    
    // If the section doesn't match any known type
    return null;
  };

  // Helper function to generate PDF using Puppeteer server
  const generatePuppeteerPDF = async (element: HTMLElement, fileName: string) => {
    try {
      const clonedElement = element.cloneNode(true) as HTMLElement;
      
      // Remove watermark for PDF export
      const watermark = clonedElement.querySelector('.absolute.bottom-2.right-4');
      if (watermark) {
        watermark.remove();
      }
      
      const response = await fetch('http://localhost:3001/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: clonedElement.innerHTML,
          fileName: fileName,
          pageCount: pageCount,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF from server');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log('PDF generated using server');
      return true;
    } catch (error) {
      console.error('Error generating PDF with server:', error);
      throw error;
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setActiveTemplate(templateId);
    setShowTemplateModal(false);
  };

  // Render a single page of the resume with proper page dimensions and content distribution
  const renderResumePage = (page: number) => {
    // Function that attaches a ref callback to the appropriate page
    const refCallback = (element: HTMLElement | null) => {
      if (element) {
        if (page === 1) {
          // First page uses mainRef
          resumeRef.current = element;
        } else {
          // Additional pages use the pageRefs array
          pageRefs.current[page - 1] = element;
        }
      }
    };
    
    // Only render visible pages and adjacent pages for performance
    const shouldRender = Math.abs(page - currentPage) <= 1 || isGeneratingPDF;
    
    if (!shouldRender) {
      return <div id={`resume-page-${page}`} data-page={page} style={{ display: 'none' }}></div>;
    }
    
    return (
      <ResumePageRenderer
        resumeData={resumeData}
        page={page}
        pageCount={pageCount}
        activeSections={activeSections}
        activeTemplate={activeTemplate}
        profilePhoto={profilePhoto}
        sectionPageMap={sectionPageMap}
        renderSectionContent={renderSectionContent}
        refCallback={refCallback}
      />
    );
  };

  const calculateResumeScore = () => {
    const totalScore = 100;
    const sections = [
      'name',
      'title',
      'email',
      'phone',
      'location',
      'summary',
      'employment',
      'education',
      'skills',
      'links',
    ];

    let currentScore = 0;

    sections.forEach((section) => {
      if (section === 'employment' || section === 'education') {
        if (resumeData[section as keyof ResumeData].length > 0) {
          currentScore += 10;
        }
      } else if (section === 'skills') {
        if (resumeData[section as keyof ResumeData].length > 5) {
          currentScore += 10;
        }
      } else if (section === 'links') {
        if (resumeData[section as keyof ResumeData].length > 0) {
          currentScore += 5;
        }
      } else {
        if (resumeData[section as keyof ResumeData].trim() !== '') {
          currentScore += 5;
        }
      }
    });

    setResumeScore(Math.min(currentScore, totalScore));
  };

  useEffect(() => {
    calculateResumeScore();
  }, [resumeData]);

  // Function to get default styling based on template
  const getTemplateDefaultStyling = (templateId: string) => {
    const styling: {
      font: string;
      color: string;
      headerStyle?: string;
      textColor?: string;
      backgroundColor?: string;
      headerTextColor?: string;
      sidebarColor?: string;
      sectionTitleStyle?: string;
    } = {
      font: 'Open Sans',
      color: '#3b82f6', // Default blue
    };

    // Set default styling based on template category
    if (templateId.startsWith('modern')) {
      styling.font = 'Roboto';
      styling.color = '#3b82f6'; // Blue
      styling.headerStyle = 'fullWidth';
      styling.sectionTitleStyle = 'borderBottom';
    } else if (templateId.startsWith('professional')) {
      styling.font = 'Georgia';
      styling.color = '#0d9488'; // Teal
      styling.headerStyle = 'subtle';
      styling.sectionTitleStyle = 'coloredText';
      
      if (templateId === 'professionalDark') {
        styling.backgroundColor = '#1e293b';
        styling.textColor = '#f8fafc';
        styling.headerTextColor = '#f8fafc';
      }
    } else if (templateId.startsWith('minimalist')) {
      styling.font = 'Inter';
      styling.color = '#64748b'; // Slate
      styling.headerStyle = 'clean';
      styling.sectionTitleStyle = 'uppercase';
    } else if (templateId.startsWith('creative')) {
      styling.font = 'Poppins';
      styling.color = templateId.includes('violet') ? '#8b5cf6' : '#f97316'; // Violet or Orange
      styling.headerStyle = templateId.includes('sidebar') ? 'sidebar' : 'gradient';
      styling.sectionTitleStyle = 'coloredText';
      
      if (templateId.includes('sidebar')) {
        styling.sidebarColor = styling.color;
      }
    } else if (templateId.startsWith('elegant')) {
      styling.font = 'Playfair Display';
      styling.color = '#6d28d9'; // Purple
      styling.headerStyle = 'serif';
      styling.sectionTitleStyle = 'serif';
    } else if (templateId.startsWith('startup')) {
      styling.font = 'Montserrat';
      styling.color = '#2563eb'; // Blue
      styling.headerStyle = 'modern';
      styling.sectionTitleStyle = 'tag';
    }

    return styling;
  };

  // Save style preset
  const saveStylePreset = (name: string) => {
    const newPreset = {
      name,
      template: activeTemplate,
      font: fontStyle,
      color: colorTheme,
      fontSize: fontSize,
      contentDensity: contentDensity,
      sectionSpacingSize: sectionSpacing,
      dateCreated: new Date().toISOString()
    };
    
    const updatedPresets = [...stylePresets, newPreset];
    setStylePresets(updatedPresets);
    
    // Save to localStorage
    saveStylePresets(updatedPresets);
  };

  // Apply style preset
  const applyStylePreset = (preset: {
    name: string, 
    template: string, 
    font: string, 
    color: string,
    fontScale?: number,
    lineSpacing?: number,
    sectionSpacing?: number,
    fontSize?: string,
    contentDensity?: string,
    sectionSpacingSize?: string
  }) => {
    setActiveTemplate(preset.template);
    setFontStyle(preset.font);
    setColorTheme(preset.color);
    
    // Apply typography settings if available
    if (preset.fontSize) {
      setFontSize(preset.fontSize);
    }
    
    if (preset.contentDensity) {
      setContentDensity(preset.contentDensity);
    }
    
    if (preset.sectionSpacingSize) {
      setSectionSpacing(preset.sectionSpacingSize);
    }
    
    // Save to localStorage
    saveActiveTemplate(preset.template);
    saveFontStyle(preset.font);
    saveColorTheme(preset.color);
    
    // Save typography settings to localStorage
    if (preset.fontSize) {
      saveFontSize(preset.fontSize);
    }
    
    if (preset.contentDensity) {
      saveContentDensity(preset.contentDensity);
    }
    
    if (preset.sectionSpacingSize) {
      saveSectionSpacing(preset.sectionSpacingSize);
    }
  };

  // Delete style preset
  const deleteStylePreset = (presetName: string) => {
    const updatedPresets = stylePresets.filter(preset => preset.name !== presetName);
    setStylePresets(updatedPresets);
    
    // Save to localStorage
    localStorage.setItem('stylePresets', JSON.stringify(updatedPresets));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left sidebar with controls */}
      <div className="w-80 bg-gray-900 text-white p-4 overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Resume Creator</h1>
          <div className="flex items-center space-x-2">
            {isAutoSaving ? (
              <div className="flex items-center text-xs text-gray-400">
                <Loader className="w-3 h-3 mr-1 animate-spin" />
                Saving...
              </div>
            ) : lastSavedTime ? (
              <div className="text-xs text-gray-400">Saved at {lastSavedTime}</div>
            ) : null}
          </div>
        </div>

        <div className="mb-6 bg-gray-800 rounded-lg p-4 flex items-center justify-between border border-gray-700">
          <div className="flex items-center">
            <div className="text-white text-sm font-medium bg-[#4ECCA3] rounded-full px-3 py-1 mr-2">{resumeScore}%</div>
            <span className="text-sm text-gray-300">Resume Progress</span>
          </div>
          <button 
            className="text-sm text-[#4ECCA3] hover:text-[#45B08C] flex items-center"
            onClick={() => setShowATSOptimizer(true)}
          >
            Optimize <span className="ml-1">→</span>
          </button>
        </div>

        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowTemplateGallery(true)}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <Layout className="w-4 h-4 mr-2" />
              Templates
            </button>
            <button 
              onClick={() => setShowSectionManager(true)}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <Move className="w-4 h-4 mr-2" />
              Sections
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('styling')}
              className={`flex-1 ${activeTab === 'styling' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg flex items-center justify-center`}
            >
              <PaintBucket className="w-4 h-4 mr-2" />
              Styling
            </button>
            <button 
              onClick={() => setActiveTab('typography')}
              className={`flex-1 ${activeTab === 'typography' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} text-white py-2 px-4 rounded-lg flex items-center justify-center`}
            >
              <Type className="w-4 h-4 mr-2" />
              Typography
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'styling' && (
          <div className="mb-6">
            <FontColorPicker 
              fontStyle={fontStyle}
              setFontStyle={setFontStyle}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
              activeTemplate={activeTemplate}
              onSavePreset={saveStylePreset}
              onShowPresets={() => setShowStylePresets(true)}
            />
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="mb-6">
            <TypographyControls
              fontScale={fontSize === 'small' ? 0.9 : fontSize === 'medium' ? 1.0 : 1.1}
              lineSpacing={contentDensity === 'compact' ? 1.2 : contentDensity === 'medium' ? 1.5 : 1.8}
              sectionSpacing={sectionSpacing === 'small' ? 0.75 : sectionSpacing === 'medium' ? 1.25 : 2}
              fontSize={fontSize}
              contentDensity={contentDensity}
              sectionSpacingSize={sectionSpacing}
              canSavePreset={true}
              onSaveAsPreset={() => setShowStylePresets(true)}
              onChangeFontScale={(scale) => {
                if (scale <= 0.9) setFontSize('small');
                else if (scale >= 1.1) setFontSize('large');
                else setFontSize('medium');
              }}
              onChangeLineSpacing={(spacing) => {
                if (spacing <= 1.3) setContentDensity('compact');
                else if (spacing >= 1.7) setContentDensity('spacious');
                else setContentDensity('medium');
              }}
              onChangeSectionSpacing={(spacing) => {
                if (spacing <= 1) setSectionSpacing('small');
                else if (spacing >= 1.75) setSectionSpacing('large');
                else setSectionSpacing('medium');
              }}
            />
          </div>
        )}

        {/* Rest of the sidebar content */}
        {/* ... */}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <div className="max-w-[800px] mx-auto bg-white shadow-lg rounded-lg p-8 min-h-[1056px]">
          {/* Resume Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1" contentEditable suppressContentEditableWarning>
              {resumeData.name || 'Your Name'}
            </h1>
            <p className="text-lg text-gray-600 mb-3" contentEditable suppressContentEditableWarning>
              {resumeData.title || 'Professional Title'}
            </p>
            <div className="flex flex-wrap text-sm text-gray-500 gap-3">
              {resumeData.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  <span contentEditable suppressContentEditableWarning>{resumeData.email}</span>
                </div>
              )}
              {resumeData.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span contentEditable suppressContentEditableWarning>{resumeData.phone}</span>
                </div>
              )}
              {resumeData.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span contentEditable suppressContentEditableWarning>{resumeData.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Resume Sections */}
          {activeSections.map((sectionId) => {
            switch (sectionId) {
              case 'summary':
                return (
                  <div key={sectionId} className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-1">Professional Summary</h2>
                    <p contentEditable suppressContentEditableWarning>
                      {resumeData.summary || 'A brief summary of your professional background and career goals.'}
                    </p>
                  </div>
                );
              case 'employment':
                return (
                  <div key={sectionId} className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-1">Work Experience</h2>
                    {resumeData.employment && resumeData.employment.length > 0 ? (
                      resumeData.employment.map((job, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-semibold" contentEditable suppressContentEditableWarning>
                              {job.position || 'Job Title'}
                            </h3>
                            <div className="text-sm text-gray-500" contentEditable suppressContentEditableWarning>
                              {job.startDate || 'Start Date'} - {job.endDate || 'Present'}
                            </div>
                          </div>
                          <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                            {job.company || 'Company Name'}
                          </div>
                          <p className="text-sm" contentEditable suppressContentEditableWarning>
                            {job.description || 'Job description and achievements.'}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold" contentEditable suppressContentEditableWarning>
                            Job Title
                          </h3>
                          <div className="text-sm text-gray-500" contentEditable suppressContentEditableWarning>
                            Start Date - End Date
                          </div>
                        </div>
                        <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                          Company Name
                        </div>
                        <p className="text-sm" contentEditable suppressContentEditableWarning>
                          Job description and achievements.
                        </p>
                      </div>
                    )}
                    <button 
                      className="text-blue-600 text-sm flex items-center mt-2 hover:text-blue-800"
                      onClick={() => {
                        const newEmployment = [...(resumeData.employment || []), {
                          company: 'New Company',
                          position: 'New Position',
                          startDate: 'Start Date',
                          endDate: 'Present',
                          description: 'Describe your responsibilities and achievements.'
                        }];
                        setResumeData({...resumeData, employment: newEmployment});
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Experience
                    </button>
                  </div>
                );
              case 'education':
                return (
                  <div key={sectionId} className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-1">Education</h2>
                    {resumeData.education && resumeData.education.length > 0 ? (
                      resumeData.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between mb-1">
                            <h3 className="font-semibold" contentEditable suppressContentEditableWarning>
                              {edu.degree || 'Degree'}
                            </h3>
                            <div className="text-sm text-gray-500" contentEditable suppressContentEditableWarning>
                              {edu.startDate || 'Start Date'} - {edu.endDate || edu.graduationDate}
                            </div>
                          </div>
                          <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                            {edu.institution || 'Institution Name'}
                          </div>
                          {edu.location && <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                            {edu.location}
                          </div>}
                          {edu.gpa && <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                            GPA: {edu.gpa}
                          </div>}
                          {edu.description && <div className="text-gray-700 mt-1" contentEditable suppressContentEditableWarning>
                            {edu.description}
                          </div>}
                        </div>
                      ))
                    ) : (
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold" contentEditable suppressContentEditableWarning>
                            Degree
                          </h3>
                          <div className="text-sm text-gray-500" contentEditable suppressContentEditableWarning>
                            Start Date - End Date
                          </div>
                        </div>
                        <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                          Institution Name
                        </div>
                        <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                          Location
                        </div>
                        <div className="text-gray-700 mb-1" contentEditable suppressContentEditableWarning>
                          GPA: 3.8/4.0
                        </div>
                      </div>
                    )}
                    <button 
                      className="text-blue-600 text-sm flex items-center mt-2 hover:text-blue-800"
                      onClick={() => {
                        const newEducation = [...(resumeData.education || []), {
                          institution: 'New Institution',
                          degree: 'New Degree',
                          graduationDate: 'Graduation Date',
                          gpa: '4.0/4.0',
                          description: 'Additional details about your education.'
                        }];
                        setResumeData({...resumeData, education: newEducation});
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Education
                    </button>
                  </div>
                );
              case 'skills':
                return (
                  <div key={sectionId} className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills && resumeData.skills.length > 0 ? (
                        resumeData.skills.map((skill, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newSkills = [...resumeData.skills];
                              newSkills[index] = e.currentTarget.textContent || '';
                              setResumeData({...resumeData, skills: newSkills});
                            }}
                          >
                            {skill}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">Add your skills here</div>
                      )}
                    </div>
                    <button 
                      className="text-blue-600 text-sm flex items-center mt-2 hover:text-blue-800"
                      onClick={() => {
                        const newSkills = [...(resumeData.skills || []), 'New Skill'];
                        setResumeData({...resumeData, skills: newSkills});
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Skill
                    </button>
                  </div>
                );
              default:
                // Handle custom sections
                if (customSections[sectionId]) {
                  return (
                    <div key={sectionId} className="mb-6">
                      <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-1">
                        {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace(/_/g, ' ')}
                      </h2>
                      <ul className="list-disc pl-5">
                        {customSections[sectionId].map((item, index) => (
                          <li 
                            key={index} 
                            className="mb-1"
                            contentEditable 
                            suppressContentEditableWarning
                            onBlur={(e) => {
                              const newCustomSections = {...customSections};
                              newCustomSections[sectionId][index] = e.currentTarget.textContent || '';
                              setCustomSections(newCustomSections);
                            }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                      <button 
                        className="text-blue-600 text-sm flex items-center mt-2 hover:text-blue-800"
                        onClick={() => {
                          const newCustomSections = {...customSections};
                          newCustomSections[sectionId] = [...(newCustomSections[sectionId] || []), 'New item'];
                          setCustomSections(newCustomSections);
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Item
                      </button>
                    </div>
                  );
                }
                return null;
            }
          })}
        </div>
      </div>

      {/* Modals */}
      {showTemplateGallery && (
        <TemplateGallery
          selectedTemplate={activeTemplate}
          onSelectTemplate={(templateId) => {
            setActiveTemplate(templateId);
            saveActiveTemplate(templateId);
            applyTemplateStyling();
          }}
          onClose={() => setShowTemplateGallery(false)}
        />
      )}

      {showStylePresets && (
        <StylePresets
          show={showStylePresets}
          onClose={() => setShowStylePresets(false)}
          onApplyPreset={(preset) => {
            applyStylePreset(preset);
          }}
          onSaveCurrentStyle={(name) => {
            saveStylePreset(name);
          }}
          onDeletePreset={(id) => {
            deleteStylePreset(id);
          }}
          presets={stylePresets.map((preset, index) => ({
            id: `preset-${index}`,
            name: preset.name,
            template: preset.template,
            font: preset.font,
            color: preset.color,
            fontSize: preset.fontSize || fontSize,
            contentDensity: preset.contentDensity || contentDensity,
            sectionSpacingSize: preset.sectionSpacing || sectionSpacing,
            fontScale: fontSize === 'small' ? 0.9 : fontSize === 'medium' ? 1.0 : 1.1,
            lineSpacing: contentDensity === 'compact' ? 1.2 : contentDensity === 'medium' ? 1.5 : 1.8,
            sectionSpacing: sectionSpacing === 'small' ? 0.75 : sectionSpacing === 'medium' ? 1.25 : 2,
            dateCreated: preset.dateCreated || new Date().toISOString()
          }))}
          currentStyle={{
            template: activeTemplate,
            font: fontStyle,
            color: colorTheme,
            fontSize: fontSize,
            contentDensity: contentDensity,
            sectionSpacingSize: sectionSpacing,
            fontScale: fontSize === 'small' ? 0.9 : fontSize === 'medium' ? 1.0 : 1.1,
            lineSpacing: contentDensity === 'compact' ? 1.2 : contentDensity === 'medium' ? 1.5 : 1.8,
            sectionSpacing: sectionSpacing === 'small' ? 0.75 : sectionSpacing === 'medium' ? 1.25 : 2
          }}
        />
      )}

      {showSectionManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Manage Resume Sections</h2>
                <button 
                  onClick={() => setShowSectionManager(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <ReorderableSections 
                activeSections={activeSections}
                setActiveSections={setActiveSections}
                customSections={customSections}
                setCustomSections={setCustomSections}
                onClose={() => setShowSectionManager(false)}
              />
            </div>
          </div>
        </div>
      )}

      {showATSOptimizer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">ATS Resume Optimizer</h2>
                <button 
                  onClick={() => setShowATSOptimizer(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <ATSOptimizer 
                resumeData={resumeData}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                atsScore={atsScore}
                setAtsScore={setAtsScore}
                atsSuggestions={atsSuggestions}
                setAtsSuggestions={setAtsSuggestions}
                onApplySuggestion={(section, updatedContent) => {
                  // Update resume data with the suggestion
                  setResumeData(prev => {
                    const newData = { ...prev };
                    
                    // Handle different section types
                    if (section === 'summary') {
                      newData.summary = updatedContent;
                    } else if (section === 'skills') {
                      newData.skills = updatedContent.split(',').map(skill => skill.trim());
                    } else if (section.startsWith('experience.')) {
                      const index = parseInt(section.split('.')[1]);
                      if (newData.experience && newData.experience[index]) {
                        newData.experience[index].description = updatedContent;
                      }
                    } else if (section.startsWith('education.')) {
                      const index = parseInt(section.split('.')[1]);
                      if (newData.education && newData.education[index]) {
                        newData.education[index].description = updatedContent;
                      }
                    }
                    
                    return newData;
                  });
                }}
                onClose={() => setShowATSOptimizer(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Other modals */}
      {/* ... */}
    </div>
  );
};

export default ResumeCreator;
