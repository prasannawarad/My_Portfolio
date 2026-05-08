const githubProfile = 'https://github.com/prasannawarad';

export const homeFeaturedProjects = [
  {
    id: 'home-8',
    title: 'InvestIQ',
    description:
      'AI portfolio co-pilot for beginner investors — deterministic rebalance engine with drift, scenario, and panic modes; Groq-powered chat with ElevenLabs voice; Chrome extension that overlays financial news with contextual portfolio advice. Built for the Goldman Sachs / UTD JSOM Hackathon — placed 5th overall.',
    icon: 'candlestick_chart',
    tags: ['Next.js', 'Groq AI', 'AI Agent', 'ElevenLabs', 'Chrome Extension'],
    award: '5th Place · Goldman Sachs Hackathon',
    projectUrl: githubProfile,
    liveUrl: 'https://invest-iq-kuber.netlify.app',
  },
  {
    id: 'home-3',
    title: 'RAGBase',
    description:
      'Full RAG pipeline — upload documents, build vector knowledge base with embeddings, ask questions with source-cited answers, chunk inspector, and analytics dashboard.',
    icon: 'manage_search',
    tags: ['React', 'RAG', 'Embeddings', 'Vector Search'],
    projectUrl: 'https://github.com/prasannawarad/ragbase',
    liveUrl: 'https://ragbase-gamma.vercel.app/',
  },
  {
    id: 'home-1',
    title: 'PrepAI_Pro',
    description:
      'AI interview intelligence platform with company research, personalized STAR stories, and 5-question mock interviews with real-time AI feedback, scoring, and improvement tips.',
    icon: 'smart_toy',
    tags: ['React', 'Gemini AI', 'Prompt Engineering', 'Gen AI'],
    projectUrl: 'https://github.com/prasannawarad/prepai-pro',
    liveUrl: 'https://prepai-pro.netlify.app',
  },
  {
    id: 'home-2',
    title: 'DataDoc_AI',
    description:
      'Natural language data analysis platform — upload CSV, ask questions in English, AI generates SQL, executes in-browser, and auto-visualizes with Plotly charts.',
    icon: 'table_chart',
    tags: ['React', 'Gemini AI', 'SQL Engine', 'Plotly'],
    projectUrl: 'https://github.com/prasannawarad/datadoc-ai',
    liveUrl: 'https://datadocai.netlify.app/',
  },
  {
    id: 'home-7',
    title: 'CardioRisk',
    description:
      'Predictive health analytics pipeline in R across 319K+ CDC records; neural network reached 91.4% accuracy, 0.81 AUC, and 99.97% recall.',
    icon: 'favorite',
    tags: ['R', 'Statistical Modeling', 'ML Pipeline'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-4',
    title: 'Credit_Risk_Modeling',
    description:
      'Credit default prediction pipeline on 255K+ lending records with SMOTE for 1:7.6 imbalance; XGBoost reached 88.5% accuracy and 0.737 ROC-AUC.',
    icon: 'paid',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SMOTE'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-5',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Hadoop HDFS and MapReduce ingestion pipeline across 300+ assets in 14 states powering repeatable Power BI risk and maintenance analytics.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce', 'Power BI'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-6',
    title: 'Instacart_Customer_Behavior',
    description:
      'Optimized SQL pipelines and Tableau dashboards across 3M+ grocery transactions for segmentation, cohort retention, demand forecasting, and KPI reporting.',
    icon: 'insights',
    tags: ['SQL', 'Tableau', 'Analytics'],
    projectUrl: githubProfile,
  },
];

export const projects = [
  {
    id: 'proj-8',
    title: 'InvestIQ',
    description:
      'AI-powered portfolio co-pilot that helps non-savvy investors track holdings, understand risk in plain language, and rebalance confidently during market panics. AI agent Kuber spans a web dashboard, floating chat widget, and a Chrome extension that overlays financial news with contextual portfolio advice. Deterministic rebalance engine (drift, scenario, panic modes) surfaces transparent trade receipts — tax cost, fees, goal impact — without LLM hallucination. Built for the Goldman Sachs / UTD JSOM Hackathon (May 2026) — placed 5th overall.',
    icon: 'candlestick_chart',
    tags: ['Next.js', 'Groq AI', 'AI Agent', 'ElevenLabs', 'Chrome Extension'],
    award: '5th Place · Goldman Sachs Hackathon',
    commit: 'b8d3f2a',
    commitMessage: 'feat: deterministic rebalance engine with drift and panic modes',
    updatedAt: 'May 2026',
    codeUrl: githubProfile,
    liveUrl: 'https://invest-iq-kuber.netlify.app',
    category: 'ml-ai',
  },
  {
    id: 'proj-3',
    title: 'RAGBase',
    description:
      'Full RAG pipeline — upload documents, build vector knowledge base with embeddings, ask questions with source-cited answers, chunk inspector, and analytics dashboard.',
    icon: 'manage_search',
    tags: ['React', 'RAG', 'Embeddings', 'Vector Search'],
    commit: 'c9f5a2d',
    commitMessage: 'feat: full RAG pipeline with cited Q&A',
    updatedAt: 'Apr 2025',
    codeUrl: 'https://github.com/prasannawarad/ragbase',
    liveUrl: 'https://ragbase-gamma.vercel.app/',
    category: 'ml-ai',
  },
  {
    id: 'proj-1',
    title: 'PrepAI_Pro',
    description:
      'AI interview intelligence platform with company research, personalized STAR stories, and 5-question mock interviews with real-time AI feedback, scoring, and improvement tips.',
    icon: 'smart_toy',
    tags: ['React', 'Gemini AI', 'Prompt Engineering', 'Gen AI'],
    commit: 'a7e3f1c',
    commitMessage: 'feat: upgrade to Gemini 2.5 Flash, embed API config, clean UI',
    updatedAt: 'Mar 2025',
    codeUrl: 'https://github.com/prasannawarad/prepai-pro',
    liveUrl: 'https://prepai-pro.netlify.app',
    category: 'ml-ai',
  },
  {
    id: 'proj-2',
    title: 'DataDoc_AI',
    description:
      'Natural language data analysis platform — upload CSV, ask questions in English, AI generates SQL, executes in-browser, and auto-visualizes with Plotly charts.',
    icon: 'table_chart',
    tags: ['React', 'Gemini AI', 'SQL Engine', 'Plotly'],
    commit: 'b4d2e8f',
    commitMessage: 'feat: NL to SQL with auto visualization',
    updatedAt: 'Feb 2025',
    codeUrl: 'https://github.com/prasannawarad/datadoc-ai',
    liveUrl: 'https://datadocai.netlify.app/',
    category: 'data-eng',
  },
  {
    id: 'proj-7',
    title: 'CardioRisk',
    description:
      'Predictive health analytics pipeline in R evaluating 5 classifiers on 319K+ CDC health records; neural network reached 91.4% accuracy, 0.81 AUC, and 99.97% recall while Random Forest ranked the top clinical predictors.',
    icon: 'favorite',
    tags: ['R', 'Statistical Modeling', 'ML Pipeline'],
    commit: 'd3e7f1a',
    commitMessage: 'feat: add threshold tuning and sensitivity/specificity evaluation',
    updatedAt: 'Oct 2023',
    codeUrl: githubProfile,
    category: 'ml-ai',
  },
  {
    id: 'proj-4',
    title: 'Credit_Risk_Modeling',
    description:
      'Applied SMOTE to a 1:7.6 class imbalance across 255K+ lending records, then benchmarked logistic regression, random forest, and XGBoost with 5-fold cross-validation; XGBoost led at 88.5% accuracy and 0.737 ROC-AUC.',
    icon: 'paid',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SMOTE'],
    commit: 'c9f1a2b',
    commitMessage: 'model: add SMOTE + XGBoost eval for imbalanced data',
    updatedAt: 'Nov 2023',
    codeUrl: githubProfile,
    category: 'ml-ai',
  },
  {
    id: 'proj-5',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Distributed Hadoop HDFS and MapReduce ingestion pipeline for operational datasets across 300+ assets in 14 states, paired with Power BI dashboards for risk scores and predictive maintenance flags.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce', 'Power BI'],
    commit: 'f4c29d1',
    commitMessage: 'feat: add multi-state risk aggregation and vehicle scoring jobs',
    updatedAt: 'Mar 2024',
    codeUrl: githubProfile,
    category: 'data-eng',
  },
  {
    id: 'proj-6',
    title: 'Instacart_Customer_Behavior',
    description:
      'Processed 3M+ grocery transactions through optimized SQL pipelines for segmentation, cohort retention, and demand forecasting, then surfaced product velocity, fulfillment trends, and campaign ROI in Tableau.',
    icon: 'insights',
    tags: ['SQL', 'Tableau', 'Analytics'],
    commit: 'a92d8be',
    commitMessage: 'perf: optimize cohort query pipeline for large-order windows',
    updatedAt: 'Jan 2024',
    codeUrl: githubProfile,
    category: 'data-eng',
  },
];
