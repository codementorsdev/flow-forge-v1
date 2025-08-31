import React from 'react';
import MetricsCards from './MetricsCards';
import RecentExecutions from './RecentExecutions';
import ActiveFlows from './ActiveFlows';
import ExecutionChart from './ExecutionChart';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <div className="text-sm text-gray-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <MetricsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExecutionChart />
        <ActiveFlows />
      </div>

      <RecentExecutions />
    </div>
  );
}