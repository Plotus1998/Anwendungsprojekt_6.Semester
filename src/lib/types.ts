
export interface Measure {
  id: string;
  description: string;
  department: string;
  costCenter: string;
  plannedSavings: number;
  realizedSavings: number;
  status: 'fulfilled' | 'inProgress' | 'risk';
  roi: number;
  lastUpdated: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface DashboardMetrics {
  totalPlannedSavings: number;
  totalRealizedSavings: number;
  averageRoi: number;
  fulfillmentRate: number;
}
