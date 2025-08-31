import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

export default function RecentExecutions() {
  const { state } = useApp();
  const navigate = useNavigate();
  
  const recentExecutions = [...state.executions]
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'running':
        return <Loader className="h-5 w-5 text-cyan-400 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/50 text-green-400 border-green-500/30';
      case 'failed':
        return 'bg-red-900/50 text-red-400 border-red-500/30';
      case 'running':
        return 'bg-cyan-900/50 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-gray-700/50 text-gray-400 border-gray-600/30';
    }
  };

  const getDuration = (execution: any) => {
    if (!execution.endTime) return 'Running...';
    const start = new Date(execution.startTime);
    const end = new Date(execution.endTime);
    const duration = Math.round((end.getTime() - start.getTime()) / 1000 / 60);
    return `${duration}m`;
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Play className="h-5 w-5 mr-2 text-cyan-400" />
          Recent Executions
        </h2>
        <button 
          onClick={() => navigate('/executions')}
          className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          View all
        </button>
      </div>

      <div className="space-y-4">
        {recentExecutions.map((execution, index) => (
          <div
            key={execution.id}
            className="flex items-center justify-between p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/70 transition-all duration-200 cursor-pointer card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`/executions/${execution.id}`)}
          >
            <div className="flex items-center space-x-4">
              {getStatusIcon(execution.status)}
              <div>
                <h3 className="font-medium text-white">{execution.flow.name}</h3>
                <p className="text-sm text-gray-400">
                  Started {formatDistanceToNow(execution.startTime)} ago
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-300">{getDuration(execution)}</div>
                <div className="text-xs text-gray-500">{execution.pipelineExecutions.length} pipelines</div>
              </div>
              <span className={`px-3 py-1 rounded-full border text-xs font-medium capitalize ${getStatusColor(execution.status)}`}>
                {execution.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}