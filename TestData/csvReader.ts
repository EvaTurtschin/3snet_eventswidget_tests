import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface Topic {
  name: string;
  code: string;
}

export function loadTopics(): Topic[] {
  const filePath = path.join(__dirname, 'topics.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
}