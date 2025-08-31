import React from 'react';
import { ExternalLink, Clock, CheckCircle, XCircle, Loader, ChevronDown } from 'lucide-react';
import { FlowExecution } from '../../types';

interface PipelineTimelineProps {
  execution: FlowExecution;
}

export default function PipelineTimeline({ execution }: PipelineTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
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
      case 'passed':
        return 'bg-green-900/50 text-green-400 border-green-500/30';
      case 'failed':
        return 'bg-red-900/50 text-red-400 border-red-500/30';
      case 'running':
        return 'bg-cyan-900/50 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-gray-700/50 text-gray-400 border-gray-600/30';
    }
  };

  const getDuration = (pipeline: any) => {
    if (!pipeline.endTime) return 'Running...';
    return `${Math.round(pipeline.duration / 60)}m ${pipeline.duration % 60}s`;
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Pipeline Timeline</h2>
      
      <div className="space-y-4">
        {execution.flow.steps.map((step, stepIndex) => {
          const pipelineExecution = execution.pipelineExecutions.find(p => p.stepId === step.id);
          
          return (
            <div key={step.id} className="relative">
              <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4 hover:bg-gray-700/70 transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {step.order}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{step.application.name}</h4>
                      <p className="text-sm text-gray-400">{step.testStage} • {step.testTag}</p>
                    </div>
                  </div>

                  {pipelineExecution ? (
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm text-gray-300">{getDuration(pipelineExecution)}</div>
                        <div className="text-xs text-gray-500">
                          {pipelineExecution.startTime ? new Date(pipelineExecution.startTime).toLocaleTimeString() : '—'}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(pipelineExecution.status)}
                        <span className={`px-2 py-1 rounded-full border text-xs font-medium capitalize ${getStatusColor(pipelineExecution.status)}`}>
                          {pipelineExecution.status}
                        </span>
                      </div>
                      
                      <a
                        href={pipelineExecution.pipelineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-500" />
                      <span className="px-2 py-1 rounded-full border border-gray-600 text-xs font-medium text-gray-500">
                        Pending
                      </span>
                    </div>
                  )}
                </div>

                {pipelineExecution && Object.keys(pipelineExecution.runtimeTestData).length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-600">
                    <h5 className="text-sm font-medium text-gray-300 mb-2">Runtime Data Output</h5>
                    <div className="bg-gray-800 rounded p-3">
                      <pre className="text-xs text-gray-400 overflow-auto">
                        {JSON.stringify(pipelineExecution.runtimeTestData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {stepIndex < execution.flow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <ChevronDown className="h-6 w-6 text-gray-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}