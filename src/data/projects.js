export const homeFeaturedProjects = [
  {
    id: 'home-1',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Processed telemetry from 300+ vehicles across 14 states using Hadoop pipelines and delivered near real-time Power BI risk insights.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce'],
    projectUrl: '#',
  },
  {
    id: 'home-2',
    title: 'Instacart_Behavior_Dashboard',
    description:
      'Engineered SQL pipelines on 3M+ grocery orders for cohort analysis, demand forecasting, and customer segmentation dashboards.',
    icon: 'insights',
    tags: ['SQL', 'Tableau', 'Data Modeling'],
    projectUrl: '#',
  },
  {
    id: 'home-3',
    title: 'Heart_Disease_Prediction',
    description:
      'Built R-based feature engineering and model pipeline on 301K+ patient records with 91.44% accuracy using ensemble and neural methods.',
    icon: 'monitor_heart',
    tags: ['R', 'Random Forest', 'Neural Network'],
    projectUrl: '#',
  },
];

export const projects = [
  {
    id: 'proj-1',
    title: 'Scalable_Fleet_Risk_Analytics',
    description:
      'Fleet risk analytics platform built on Hadoop ecosystem to process large-scale telematics data and surface near real-time KPI dashboards for operations teams.',
    icon: 'local_shipping',
    tags: ['Hadoop', 'HDFS', 'MapReduce'],
    commit: 'f4c29d1',
    commitMessage: 'feat: add multi-state risk aggregation and vehicle scoring jobs',
    updatedAt: '2 weeks ago',
    codeUrl: '#',
    liveUrl: '#',
    category: 'data-eng',
  },
  {
    id: 'proj-2',
    title: 'Instacart_Behavior_Dashboard',
    description:
      'Customer analytics system on 3M+ order records with SQL-based cohort, retention, and demand pipelines feeding Tableau segmentation and forecasting dashboards.',
    icon: 'analytics',
    tags: ['SQL', 'Tableau', 'Forecasting'],
    commit: 'a92d8be',
    commitMessage: 'perf: optimize cohort query pipeline for large-order windows',
    updatedAt: '1 month ago',
    codeUrl: '#',
    liveUrl: '#',
    category: 'data-eng',
  },
  {
    id: 'proj-3',
    title: 'Heart_Disease_Prediction',
    description:
      'ML workflow over 301K+ patient records using R feature engineering, Random Forest, and Neural Network models achieving 91.44% classification accuracy.',
    icon: 'smart_toy',
    tags: ['R', 'Feature Engineering', 'ML'],
    commit: '7d1a5ef',
    commitMessage: 'model: improve ensemble evaluation and calibration metrics',
    updatedAt: '6 weeks ago',
    codeUrl: '#',
    liveUrl: '#',
    category: 'ml-ai',
  },
];
