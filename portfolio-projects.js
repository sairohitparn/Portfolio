// Shared project content keeps both portfolio presentations consistent.
window.portfolioProjects = {
  chat3gpp: {
    index: '04', category: 'PROJECT / CHAT3GPP', company: 'Chat3GPP / AI research application',
    title: 'Chat3GPP: Pathway-powered telecom research',
    description: 'An agentic research assistant for 3GPP standards, with a Pathway pipeline for document ingestion, indexing, and retrieval to support cited answers.',
    facts: [['RETRIEVAL', 'Pathway RAG pipeline', 'Document ingestion, chunking, embeddings, and hybrid search'], ['KNOWLEDGE', 'Global + user knowledge bases', '3GPP standards and private document uploads']],
    tags: ['Python', 'Pathway', 'Neo4j', 'RAG'], action: 'Open project dossier',
    sections: [
      ['The problem', 'Researching 3GPP standards requires finding relevant material across dense technical documents and connecting it to the question. Chat3GPP combines agent orchestration, document retrieval, and a knowledge graph to produce answers with source citations.'],
      ['Pathway retrieval pipeline', 'Documents are ingested, parsed, split into chunks, embedded, and indexed through Pathway. Hybrid vector and BM25 retrieval finds relevant passages, which the generation service assembles as context for an LLM answer. Separate stores support the shared standards corpus and user-uploaded documents.'],
      ['Pipeline capabilities', ['Document ingestion and vectorization support searchable knowledge bases.', 'Semantic retrieval and lexical matching cover both conceptual questions and exact technical identifiers.', 'Global and per-user Pathway stores provide separate retrieval routes for standards and uploaded material.', 'The retrieval and generation service supplies document context to the agent workflow for cited answers.']],
      ['Agent workflow', 'A classifier routes questions; a planner breaks complex research into dependent tasks. Specialized agents retrieve information through the RAG service and Neo4j, while a drafter assembles the response. WebSockets stream execution updates to the React interface.'],
      ['Application architecture', 'React and Vite provide the frontend, Flask handles authentication and chat history, and Python services coordinate agent execution and retrieval. The platform also uses Neo4j, PostgreSQL with pgvector, Redis, and Nginx.']
    ]
  },
  ats: {
    index: '05', category: 'PROJECT / ATS RESUME SCORER', company: 'ATS Resume Scorer / AI application',
    title: 'ATS Resume Scorer: feedback grounded in the resume',
    description: 'A resume analysis application that compares resumes with job descriptions, identifies missing skills, and returns prioritized feedback with downloadable reports.',
    facts: [['MATCHING', 'Semantic + keyword similarity', 'Sentence-BERT and RapidFuzz'], ['APPLICATION', 'FastAPI + Streamlit', 'Supabase authentication and saved analysis history']],
    tags: ['FastAPI', 'Sentence-BERT', 'Llama 3.3', 'Streamlit'], action: 'Open project dossier',
    sections: [
      ['The problem', 'A resume can mention a skill without showing where it was used. This project combines job-description matching with checks for supporting evidence in projects and work experience, then explains what to improve.'],
      ['How it works', ['Llama 3.3 70B, accessed through Groq, parses resume content.', 'Sentence-BERT embeddings and fuzzy keyword matching compare the resume with a job description.', 'A five-component score covers formatting, keywords, content, skill validation, and ATS compatibility.', 'Feedback includes issue priority, suggested fixes, and before-and-after examples.']],
      ['Application engineering', 'FastAPI and Pydantic provide the backend, with a Streamlit interface. Supabase supports email/password and Google authentication plus saved analysis history. Jinja2 and WeasyPrint generate downloadable PDF reports.']
    ]
  }
};

const cinematic = Boolean(document.querySelector('.chapter-nav'));
const section = document.createElement('section');
section.id = 'personal-projects';
section.className = `personal-projects ${cinematic ? 'projects-hud' : 'projects-classic'}`;
section.setAttribute('aria-labelledby', 'personal-projects-title');
const label = document.createElement('p'); label.className = 'projects-label'; label.textContent = cinematic ? 'PROJECT ARCHIVE / 04-05' : 'PROJECTS / APPLIED AI';
const heading = document.createElement('h2'); heading.id = 'personal-projects-title'; heading.textContent = cinematic ? 'Research & builds.' : 'A closer look at what I build.';
section.append(label, heading);
const grid = document.createElement('div'); grid.className = 'personal-project-grid';
Object.entries(window.portfolioProjects).forEach(([key, project]) => {
  const button = document.createElement('button'); button.className = 'personal-project';
  button.setAttribute(cinematic ? 'data-section' : 'data-project', key);
  if (!cinematic) button.setAttribute('aria-haspopup', 'dialog');
  const index = document.createElement('span'); index.className = 'personal-project-index'; index.textContent = `${project.index} / ${key === 'chat3gpp' ? 'RETRIEVAL SYSTEMS' : 'AI APPLICATION'}`;
  const title = document.createElement('h3'); title.textContent = key === 'chat3gpp' ? 'Chat3GPP' : 'ATS Resume Scorer';
  const description = document.createElement('p'); description.textContent = project.description;
  const feature = document.createElement('div'); feature.className = 'project-feature';
  const result = document.createElement('strong'); result.textContent = key === 'chat3gpp' ? 'Ingest → Retrieve → Cite' : 'Parse → Match → Explain';
  const note = document.createElement('small'); note.textContent = key === 'chat3gpp' ? 'Pathway indexing, hybrid retrieval, and source-grounded answers' : 'Semantic similarity, skill evidence, and prioritized feedback';
  feature.append(result, note);
  const tags = document.createElement('div'); tags.className = 'personal-project-tags';
  project.tags.forEach(value => { const tag = document.createElement('span'); tag.textContent = value; tags.append(tag); });
  const action = document.createElement('span'); action.className = 'personal-project-action'; action.textContent = cinematic ? 'Load project dossier ↗' : 'Explore project ↗';
  button.append(index, title, description, feature, tags, action); grid.append(button);
});
section.append(grid);
const anchor = cinematic ? document.querySelector('.contact-bar') : document.querySelector('#about');
anchor.before(section);
