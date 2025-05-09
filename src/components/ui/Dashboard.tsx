
import { useState } from "react";
import { ChartBar, ChartLine, SortAsc, SortDesc, Table } from "lucide-react";

import KpiCard from "./KpiCard";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import StatusBadge from "./StatusBadge";
import DepartmentFilter from "./DepartmentFilter";

import { measures, getSavingsByDepartment, getSavingsByDate, calculateDashboardMetrics } from "@/lib/data";
import { Measure } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SortConfig {
  key: keyof Measure | null;
  direction: 'asc' | 'desc';
}

const Dashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'asc'
  });

  // Calculate KPI metrics
  const metrics = calculateDashboardMetrics();

  // Get chart data
  const departmentSavingsData = getSavingsByDepartment();
  const timelineData = getSavingsByDate();

  // Filter measures by department
  const filteredMeasures = selectedDepartment
    ? measures.filter((measure) => measure.department === selectedDepartment)
    : measures;

  // Apply sorting
  const sortedMeasures = [...filteredMeasures].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (key: keyof Measure) => {
    setSortConfig((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('de-DE', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getSortIcon = (key: keyof Measure) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <SortAsc className="h-3 w-3 ml-1" />
    ) : (
      <SortDesc className="h-3 w-3 ml-1" />
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard
          title="Geplante Einsparungen"
          value={formatCurrency(metrics.totalPlannedSavings)}
        />
        <KpiCard
          title="Realisierte Einsparungen"
          value={formatCurrency(metrics.totalRealizedSavings)}
        />
        <KpiCard
          title="Durchschnittlicher ROI"
          value={formatPercentage(metrics.averageRoi)}
        />
        <KpiCard
          title="Erfüllte Maßnahmen"
          value={`${formatPercentage(metrics.fulfillmentRate)}`}
          description={`${Math.round(metrics.fulfillmentRate * measures.length / 100)} von ${measures.length} Maßnahmen`}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              <div className="flex items-center">
                <ChartBar className="h-5 w-5 mr-2 text-muted-foreground" />
                Geplante vs. Realisierte Einsparungen nach Department
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={departmentSavingsData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              <div className="flex items-center">
                <ChartLine className="h-5 w-5 mr-2 text-muted-foreground" />
                Realisierte Einsparungen über Zeit
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={timelineData} />
          </CardContent>
        </Card>
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-md font-medium flex items-center">
            <Table className="h-5 w-5 mr-2 text-muted-foreground" />
            Maßnahmen
          </CardTitle>
          <DepartmentFilter 
            selectedDepartment={selectedDepartment}
            onSelectDepartment={setSelectedDepartment}
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left font-medium p-2 pl-0">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center" 
                      onClick={() => handleSort('description')}
                    >
                      Beschreibung
                      {getSortIcon('description')}
                    </Button>
                  </th>
                  <th className="text-left font-medium p-2">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center" 
                      onClick={() => handleSort('department')}
                    >
                      Department
                      {getSortIcon('department')}
                    </Button>
                  </th>
                  <th className="text-left font-medium p-2">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center" 
                      onClick={() => handleSort('costCenter')}
                    >
                      Kostenstelle
                      {getSortIcon('costCenter')}
                    </Button>
                  </th>
                  <th className="text-right font-medium p-2">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center ml-auto" 
                      onClick={() => handleSort('plannedSavings')}
                    >
                      Geplant
                      {getSortIcon('plannedSavings')}
                    </Button>
                  </th>
                  <th className="text-right font-medium p-2">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center ml-auto" 
                      onClick={() => handleSort('realizedSavings')}
                    >
                      Realisiert
                      {getSortIcon('realizedSavings')}
                    </Button>
                  </th>
                  <th className="text-left font-medium p-2">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center" 
                      onClick={() => handleSort('status')}
                    >
                      Status
                      {getSortIcon('status')}
                    </Button>
                  </th>
                  <th className="text-right font-medium p-2 pr-0">
                    <Button 
                      variant="ghost" 
                      className="hover:bg-transparent p-0 font-medium flex items-center ml-auto" 
                      onClick={() => handleSort('roi')}
                    >
                      ROI %
                      {getSortIcon('roi')}
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedMeasures.map((measure) => (
                  <tr key={measure.id} className="border-b">
                    <td className="p-2 pl-0">{measure.description}</td>
                    <td className="p-2">{measure.department}</td>
                    <td className="p-2">{measure.costCenter}</td>
                    <td className="p-2 text-right">{formatCurrency(measure.plannedSavings)}</td>
                    <td className="p-2 text-right">{formatCurrency(measure.realizedSavings)}</td>
                    <td className="p-2">
                      <StatusBadge status={measure.status} />
                    </td>
                    <td className="p-2 pr-0 text-right">{measure.roi}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
