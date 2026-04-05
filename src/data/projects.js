const githubProfile = 'https://github.com/prasannawarad';

export const homeFeaturedProjects = [
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
  },
  {
    id: 'home-3',
    title: 'RAGBase',
    description:
      'Full RAG pipeline — upload documents, build vector knowledge base with embeddings, ask questions with source-cited answers, chunk inspector, and analytics dashboard.',
    icon: 'manage_search',
    tags: ['React', 'RAG', 'Embeddings', 'Vector Search'],
    projectUrl: 'https://github.com/prasannawarad/ragbase',
  },
  {
    id: 'home-4',
    title: 'Credit_Risk_Modeling',
    description:
      'Credit risk pipeline on 255K+ lending records with SMOTE for 1:7.6 imbalance and XGBoost evaluation.',
    icon: 'paid',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SMOTE'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-5',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Hadoop (HDFS/MapReduce) data pipeline across 300+ assets in 14 states powering Power BI risk monitoring.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce', 'Power BI'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-6',
    title: 'Instacart_Customer_Behavior',
    description:
      'SQL + Tableau dashboards on 3M+ grocery transactions for segmentation, cohorts, and demand forecasting.',
    icon: 'insights',
    tags: ['SQL', 'Tableau', 'Analytics'],
    projectUrl: githubProfile,
  },
];

export const projects = [
  {
    id: 'proj-1',
    title: 'PrepAI_Pro',
    description:
      'AI interview intelligence platform with company research, personalized STAR stories, and 5-question mock interviews with real-time AI feedback, scoring, and improvement tips.',
    icon: 'smart_toy',
    tags: ['React', 'Gemini AI', 'Prompt Engineering', 'Gen AI'],
    commit: 'a7e3f1c',
    commitMessage: 'feat: upgrade to Gemini 2.5 Flash, embed API config, clean UI',
    updatedAt: 'recent',
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
    updatedAt: 'recent',
    codeUrl: 'https://github.com/prasannawarad/datadoc-ai',
    liveUrl: '#',
    category: 'data-eng',
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
    updatedAt: 'recent',
    codeUrl: 'https://github.com/prasannawarad/ragbase',
    liveUrl: '#',
    category: 'ml-ai',
  },
  {
    id: 'proj-4',
    title: 'Credit_Risk_Modeling',
    description:
      'Credit risk pipeline on 255K+ lending records with SMOTE; evaluated LR/RandomForest/XGBoost (ROC-AUC 0.737, accuracy 88.5%).',
    icon: 'paid',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SMOTE'],
    commit: 'c9f1a2b',
    commitMessage: 'model: add SMOTE + XGBoost eval for imbalanced data',
    updatedAt: 'recent',
    codeUrl: githubProfile,
    liveUrl: '#',
    category: 'ml-ai',
  },
  {
    id: 'proj-5',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Hadoop (HDFS, MapReduce) pipeline ingesting/transforming data for 300+ assets in 14 states with Power BI risk dashboards.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce', 'Power BI'],
    commit: 'f4c29d1',
    commitMessage: 'feat: add multi-state risk aggregation and vehicle scoring jobs',
    updatedAt: 'recent',
    codeUrl: githubProfile,
    liveUrl: '#',
    category: 'data-eng',
  },
  {
    id: 'proj-6',
    title: 'Instacart_Customer_Behavior',
    description:
      '3M+ grocery transactions processed via optimized SQL pipelines with Tableau dashboards for segmentation, cohorts, and demand forecasting.',
    icon: 'insights',
    tags: ['SQL', 'Tableau', 'Analytics'],
    commit: 'a92d8be',
    commitMessage: 'perf: optimize cohort query pipeline for large-order windows',
    updatedAt: 'recent',
    codeUrl: githubProfile,
    liveUrl: '#',
    category: 'data-eng',
  },
];
