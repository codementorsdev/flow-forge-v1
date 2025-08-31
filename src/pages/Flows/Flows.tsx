import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, GitBranch, Play, Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDistanceToNow } from '../../utils/dateUtils';

export default function Flows() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredFlows = state.flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900/50 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-gray-700/50 text-gray-400 border-gray-600/30';
      case 'draft':
        return 'bg-amber-900/50 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-700/50 text-gray-400 border-gray-600/30';
    }
  };

  const handleDeleteFlow = (flowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this flow?')) {
      dispatch({ type: 'DELETE_FLOW', payload: flowId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Flows
        </h1>
        <button
          onClick={() => navigate('/flows/builder')}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Flow
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search flows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlows.map((flow, index) => (
          <div
            key={flow.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 cursor-pointer card-hover"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(`/flows/builder/${flow.id}`)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">{flow.name}</h3>
              </div>
              <span className={`px-2 py-1 rounded-full border text-xs font-medium capitalize ${getStatusColor(flow.status)}`}>
                {flow.status}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{flow.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Steps:</span>
                <span className="text-cyan-400 font-medium">{flow.steps.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Last updated:</span>
                <span className="text-gray-300">{formatDistanceToNow(flow.updatedAt)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/flows/builder/${flow.id}`);
                }}
                className="flex items-center px-3 py-1 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Trigger execution
                  }}
                  className="flex items-center px-3 py-1 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </button>
                <button
                  onClick={(e) => handleDeleteFlow(flow.id, e)}
                  className="flex items-center px-3 py-1 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFlows.length === 0 && (
        <div className="text-center py-12">
          <GitBranch className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No flows found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Create your first flow to get started with orchestration'
            }
          </p>
          <button
            onClick={() => navigate('/flows/builder')}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create First Flow
          </button>
        </div>
      )}
    </div>
  );
}