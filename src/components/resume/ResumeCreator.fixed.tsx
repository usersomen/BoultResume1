import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, Mail, Phone, MapPin, ChevronUp, ChevronDown, X, Plus, 
  Copy, Trash2, Save, ArrowLeft, ArrowRight, Download, Share, 
  Printer, Move, Link as LinkIcon, AlertCircle, CheckCircle, 
  PenLine, FileDown, Layout, Info, Languages as LanguagesIcon, 
  Award, Folder as FolderIcon, Heart, ChevronRight, ChevronLeft, 
  Document, Loader 
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

// This fixes the babel parsing error by properly using backtick template literals
const AnimatedAIAssistButton = () => {
  // Add custom animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce-slow {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
      .animate-bounce-slow {
        animation: bounce-slow 2s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // This helper component is used to apply the animation
  return (
    <button 
      onClick={() => setShowAIWritingHelp(true)}
      className="px-3 py-1 bg-[#4ECCA3] text-white text-xs rounded-full flex items-center hover:bg-[#45B08C] transition-colors animate-bounce-slow"
    >
      <PenLine className="h-3 w-3 mr-1" />
      AI-Assist
    </button>
  );
};
