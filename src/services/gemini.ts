import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import mammoth from 'mammoth';
import { getWorker } from '../utils/pdfjs-worker';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Set up PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = await getWorker();

export interface ResumeAnalysisResult {
  overall: number;
  atsScore: number;
  sections: {
    [key: string]: {
      score: number;
      feedback: string[];
    };
  };
  improvements: string[];
  strengths: string[];
}

export async function analyzeResumeWithGemini(fileContent: string): Promise<ResumeAnalysisResult> {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create a prompt for resume analysis
    const prompt = `
      Analyze this resume and provide detailed feedback in the following format:
      1. Overall score (0-100)
      2. ATS compatibility score (0-100)
      3. Section-by-section analysis with scores and specific feedback
      4. List of strengths
      5. List of suggested improvements
      
      Focus on:
      - ATS compatibility
      - Use of keywords
      - Quantifiable achievements
      - Professional formatting
      - Section organization
      - Action verbs
      - Technical skills presentation
      
      Resume content:
      ${fileContent}
    `;

    // Generate the analysis
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response and structure it
    // This is a simplified version - you'll need to implement proper parsing based on your actual response format
    const analysis: ResumeAnalysisResult = {
      overall: 75, // Parse from response
      atsScore: 82, // Parse from response
      sections: {
        experience: {
          score: 85,
          feedback: [
            'Good use of action verbs',
            'Consider adding more quantifiable achievements',
            'Some bullet points could be more concise'
          ]
        },
        skills: {
          score: 70,
          feedback: [
            'Include more industry-specific keywords',
            'Technical skills section could be expanded',
            'Consider grouping skills by category'
          ]
        },
        education: {
          score: 90,
          feedback: [
            'Well-structured education section',
            'Consider adding relevant coursework',
            'GPA could be included if above 3.5'
          ]
        }
      },
      improvements: [
        'Add more industry-specific keywords to improve ATS compatibility',
        'Include a brief professional summary',
        'Quantify achievements with specific metrics',
        'Use more action verbs in experience descriptions'
      ],
      strengths: [
        'Clear chronological structure',
        'Good use of professional formatting',
        'Relevant experience well highlighted',
        'Consistent styling throughout'
      ]
    };

    return analysis;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    // For PDF files
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      let fullText = '';
      
      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item) => {
            if ('str' in item) {
              return item.str;
            }
            return '';
          })
          .join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText.trim();
    }

    // For Word documents (docx)
    if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value.trim();
    }

    // For Word documents (doc)
    if (file.type === 'application/msword') {
      throw new Error('Legacy .doc files are not supported. Please convert to .docx format.');
    }

    // For plain text files
    if (file.type === 'text/plain') {
      return await file.text();
    }

    throw new Error('Unsupported file type. Please upload a PDF or Word document.');
  } catch (error: unknown) {
    console.error('Error extracting text from file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to extract text from file: ${errorMessage}`);
  }
} 