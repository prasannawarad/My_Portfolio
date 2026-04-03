const githubProfile = 'https://github.com/prasannawarad';

export const homeFeaturedProjects = [
  {
    id: 'home-1',
    title: 'Credit_Risk_Modeling',
    description:
      'Credit risk pipeline on 255K+ lending records with SMOTE for 1:7.6 imbalance and XGBoost evaluation.',
    icon: 'paid',
    tags: ['Python', 'scikit-learn', 'XGBoost', 'SMOTE'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-2',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Hadoop (HDFS/MapReduce) data pipeline across 300+ assets in 14 states powering Power BI risk monitoring.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce', 'Power BI'],
    projectUrl: githubProfile,
  },
  {
    id: 'home-3',
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
    id: 'proj-2',
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
    id: 'proj-3',
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
