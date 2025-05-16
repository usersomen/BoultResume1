/*
  # Resume Analysis Schema

  1. New Tables
    - `resume_analyses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `resume_name` (text)
      - `score` (integer)
      - `sections_found` (text[])
      - `missing_sections` (text[])
      - `keywords_found` (jsonb)
      - `missing_keywords` (jsonb)
      - `recommendations` (text[])
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `resume_analyses` table
    - Add policies for authenticated users to manage their own analyses
*/

-- Create resume analyses table
CREATE TABLE IF NOT EXISTS resume_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  resume_name text NOT NULL,
  score integer NOT NULL,
  sections_found text[] NOT NULL,
  missing_sections text[] NOT NULL,
  keywords_found jsonb NOT NULL,
  missing_keywords jsonb NOT NULL,
  recommendations text[] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE resume_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own analyses"
  ON resume_analyses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analyses"
  ON resume_analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX resume_analyses_user_id_idx ON resume_analyses(user_id);
CREATE INDEX resume_analyses_created_at_idx ON resume_analyses(created_at);