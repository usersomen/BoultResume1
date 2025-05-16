import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { HybridAnalyzer } from '../../utils/resumeAnalyzer';

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the multipart form data
    const form = formidable();
    const [fields, files] = await form.parse(req);
    const resumeFile = files.resume?.[0];

    if (!resumeFile) {
      return res.status(400).json({ error: 'No resume file provided' });
    }

    // Initialize the analyzer
    const analyzer = new HybridAnalyzer();

    // Extract text from the resume
    const resumeText = await analyzer.extract_text_from_file(
      resumeFile.filepath,
      resumeFile.mimetype?.split('/')[1] || 'pdf'
    );

    // Analyze the resume
    const analysis = await analyzer.analyze_resume(resumeText);

    // Store the analysis in Supabase
    const { data, error } = await supabase
      .from('resume_analyses')
      .insert([
        {
          user_id: req.headers['x-user-id'],
          resume_name: resumeFile.originalFilename,
          score: analysis.score,
          sections_found: analysis.sections_found,
          missing_sections: analysis.missing_sections,
          keywords_found: analysis.keywords_found,
          missing_keywords: analysis.missing_keywords,
          recommendations: analysis.recommendations,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error storing analysis:', error);
      throw error;
    }

    return res.status(200).json(analysis);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return res.status(500).json({ error: 'Failed to analyze resume' });
  }
}