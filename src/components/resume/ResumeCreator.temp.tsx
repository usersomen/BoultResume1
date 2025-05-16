import React, { useState, useRef, useEffect } from 'react';
import { Upload, Plus, X, Download, Share, Printer, Move, Trash2, Mail, Phone, MapPin, Link as LinkIcon, AlertCircle, CheckCircle, PenLine, FileDown, Layout, Info, Languages as LanguagesIcon, Award, Folder as FolderIcon, Heart } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import TemplateSelector from './TemplateSelector';
import AIWritingAssistant from './AIWritingAssistant';
import PhotoUploader from './PhotoUploader';
import ImageCropper from '../common/ImageCropper';

// Rest of the file will be added in subsequent calls
