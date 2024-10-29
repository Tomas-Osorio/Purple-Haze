import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svkdacbyzmnptyglxixv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2a2RhY2J5em1ucHR5Z2x4aXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMzY2MjcsImV4cCI6MjA0NTgxMjYyN30.IrgYEf2uS_NB57a1H1ZbtdZAYLPiSd153JHccz6Yhdc';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;