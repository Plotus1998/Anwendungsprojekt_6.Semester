
import { Department, Measure } from "./types";

export const departments: Department[] = [
  { id: "d1", name: "IT" },
  { id: "d2", name: "HR" },
  { id: "d3", name: "Finance" },
  { id: "d4", name: "Operations" },
  { id: "d5", name: "Marketing" },
  { id: "d6", name: "Sales" },
];

export const measures: Measure[] = [
  {
    id: "m1",
    description: "Server Consolidation",
    department: "IT",
    costCenter: "IT-001",
    plannedSavings: 50000,
    realizedSavings: 48000,
    status: "fulfilled",
    roi: 320,
    lastUpdated: "2023-12-10",
  },
  {
    id: "m2",
    description: "Remote Work Policy",
    department: "HR",
    costCenter: "HR-042",
    plannedSavings: 30000,
    realizedSavings: 33000,
    status: "fulfilled",
    roi: 220,
    lastUpdated: "2024-01-15",
  },
  {
    id: "m3",
    description: "Supplier Renegotiation",
    department: "Finance",
    costCenter: "FI-103",
    plannedSavings: 120000,
    realizedSavings: 105000,
    status: "inProgress",
    roi: 175,
    lastUpdated: "2024-02-20",
  },
  {
    id: "m4",
    description: "Process Optimization",
    department: "Operations",
    costCenter: "OP-205",
    plannedSavings: 80000,
    realizedSavings: 45000,
    status: "risk",
    roi: 95,
    lastUpdated: "2024-03-05",
  },
  {
    id: "m5",
    description: "Digital Marketing Shift",
    department: "Marketing",
    costCenter: "MK-033",
    plannedSavings: 25000,
    realizedSavings: 27500,
    status: "fulfilled",
    roi: 180,
    lastUpdated: "2024-01-22",
  },
  {
    id: "m6",
    description: "CRM Implementation",
    department: "Sales",
    costCenter: "SA-112",
    plannedSavings: 65000,
    realizedSavings: 38000,
    status: "inProgress",
    roi: 110,
    lastUpdated: "2024-03-18",
  },
  {
    id: "m7",
    description: "Cloud Migration",
    department: "IT",
    costCenter: "IT-014",
    plannedSavings: 90000,
    realizedSavings: 82000,
    status: "fulfilled",
    roi: 205,
    lastUpdated: "2024-02-08",
  },
  {
    id: "m8",
    description: "Training Cost Reduction",
    department: "HR",
    costCenter: "HR-057",
    plannedSavings: 18000,
    realizedSavings: 16500,
    status: "fulfilled",
    roi: 140,
    lastUpdated: "2024-01-30",
  },
  {
    id: "m9",
    description: "Inventory Optimization",
    department: "Operations",
    costCenter: "OP-218",
    plannedSavings: 45000,
    realizedSavings: 42000,
    status: "inProgress",
    roi: 135,
    lastUpdated: "2024-02-25",
  },
  {
    id: "m10",
    description: "Financial Software Upgrade",
    department: "Finance",
    costCenter: "FI-121",
    plannedSavings: 35000,
    realizedSavings: 32000,
    status: "fulfilled",
    roi: 165,
    lastUpdated: "2024-01-05",
  },
  {
    id: "m11",
    description: "Campaign Efficiency",
    department: "Marketing",
    costCenter: "MK-047",
    plannedSavings: 22000,
    realizedSavings: 15000,
    status: "risk",
    roi: 85,
    lastUpdated: "2024-03-12",
  },
  {
    id: "m12",
    description: "Sales Process Automation",
    department: "Sales",
    costCenter: "SA-126",
    plannedSavings: 55000,
    realizedSavings: 52000,
    status: "fulfilled",
    roi: 190,
    lastUpdated: "2024-02-15",
  },
];

export const getSavingsByDepartment = () => {
  const departmentSavings = departments.map((dept) => {
    const deptMeasures = measures.filter((m) => m.department === dept.name);
    
    const plannedSum = deptMeasures.reduce((sum, measure) => sum + measure.plannedSavings, 0);
    const realizedSum = deptMeasures.reduce((sum, measure) => sum + measure.realizedSavings, 0);
    
    return {
      name: dept.name,
      planned: plannedSum,
      realized: realizedSum,
    };
  });

  return departmentSavings;
};

export const getSavingsByDate = () => {
  // Sort measures by date
  const sortedMeasures = [...measures].sort((a, b) => 
    new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
  );

  // Accumulate realized savings over time
  let cumulativeSum = 0;
  const cumulativeData = sortedMeasures.map(measure => {
    cumulativeSum += measure.realizedSavings;
    return {
      date: measure.lastUpdated,
      realizedSavings: cumulativeSum
    };
  });

  return cumulativeData;
};

export const calculateDashboardMetrics = () => {
  const totalPlannedSavings = measures.reduce((sum, m) => sum + m.plannedSavings, 0);
  const totalRealizedSavings = measures.reduce((sum, m) => sum + m.realizedSavings, 0);
  
  const fulfillmentCount = measures.filter(m => m.status === 'fulfilled').length;
  const fulfillmentRate = (fulfillmentCount / measures.length) * 100;
  
  // Calculate weighted average ROI
  const weightedRoiSum = measures.reduce((sum, m) => sum + (m.roi * m.realizedSavings), 0);
  const averageRoi = weightedRoiSum / totalRealizedSavings;
  
  return {
    totalPlannedSavings,
    totalRealizedSavings,
    averageRoi,
    fulfillmentRate
  };
};
