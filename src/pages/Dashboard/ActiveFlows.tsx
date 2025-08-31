import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Play, Users, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

export default function ActiveFlows() {
  const { state } = useApp();
  const navigate = useNavigate();
  
  const activeFlows = state.flows.filter(flow => flow.status === 'active');

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <GitBranch className="h-5 w-5 mr-2 text-purple-400" />
          Active Flows
        </h2>
        <button 
          onClick={() => navigate('/flows')}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Manage flows
        </button>
      </div>

      <div className="space-y-4">
        {activeFlows.slice(0, 3).map((flow, index) => (
          <div
            key={flow.id}
            className="p-4 bg-gray-700/50 border border-gray-600/50 rounded-lg hover:bg-gray-700/70 transition-all duration-200 cursor-pointer card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`/flows/builder/${flow.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-white mb-2">{flow.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{flow.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    {flow.steps.length} steps
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Updated {formatDistanceToNow(flow.updatedAt)}
                  </span>
                </div>
              </div>

              <button 
                className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-cyan-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                onClick={(e) => {
                  e.stopPropagation();
                  // Trigger execution
                }}
              >
                Execute
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}