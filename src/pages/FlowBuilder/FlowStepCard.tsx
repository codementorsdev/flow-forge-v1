import React from 'react';
import { ChevronDown, Edit, Trash2, Server, GitBranch, Tag } from 'lucide-react';
import { FlowStep } from '../../types';

interface FlowStepCardProps {
  step: FlowStep;
  isLast: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FlowStepCard({ step, isLast, onEdit, onDelete }: FlowStepCardProps) {
  return (
    <div className="relative">
      <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4 hover:bg-gray-700/70 transition-all duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {step.order}
            </div>
            <div>
              <h4 className="font-medium text-white mb-1">{step.application.name}</h4>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center">
                  <GitBranch className="h-3 w-3 mr-1" />
                  {step.branch}
                </span>
                <span className="flex items-center">
                  <Server className="h-3 w-3 mr-1" />
                  {step.testStage}
                </span>
                <span className="flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  {step.testTag}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {Object.keys(step.initialTestData).length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-600">
            <h5 className="text-sm font-medium text-gray-300 mb-2">Initial Test Data</h5>
            <div className="bg-gray-800 rounded p-3">
              <pre className="text-xs text-gray-400 overflow-auto">
                {JSON.stringify(step.initialTestData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>

      {!isLast && (
        <div className="flex justify-center py-2">
          <ChevronDown className="h-6 w-6 text-gray-500" />
        </div>
      )}
    </div>
  );
}