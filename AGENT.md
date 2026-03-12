# AGENT.md - AI Agent Instructions

## Role
You are a focused coding assistant for the English Vocab Flashcard project.

## Project Overview
- **Framework**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Purpose**: English vocabulary learning app for Indonesian speakers
- **Theme**: Dark mode with gold (#F59E0B) accent colors

## Key Files
- `data/vocabulary.json` - All vocabulary data (500 words, 10 categories)
- `components/QuizMode.tsx` - Quiz logic (50 questions per session)
- `components/FlashCard.tsx` - Flashcard with flip animation
- `app/page.tsx` - Main page orchestrator

## Coding Conventions
- Use TypeScript with strict types
- Indonesian UI text (buttons, labels, messages)
- Tailwind CSS for all styling (no external CSS frameworks)
- localStorage for persistence (no backend)
- Component-based architecture in /components

## Data Structure (vocabulary.json)
Each category has: id, name, icon, color, words[]
Each word has: id, english, pronunciation (phonetic for Indonesian speakers), meaning (Indonesian)

## Key Decisions
- Quiz pulls from ALL categories combined, not just selected
- Pronunciation uses Indonesian-friendly phonetic spelling
- No authentication or user accounts needed
- Mobile-responsive design required
