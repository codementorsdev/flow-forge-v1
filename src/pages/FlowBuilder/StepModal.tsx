import React, { useState, useEffect } from 'react';
import { X, Server } from 'lucide-react';
import { FlowStep, Application } from '../../types';

interface StepModalProps {
  step?: FlowStep | null;
  applications: Application[];
  onSave: (step: FlowStep) => void;
  onClose: () => void;
}

export default function StepModal({ step, applications, onSave, onClose }: StepModalProps) {
  const [formData, setFormData] = useState({
    applicationId: step?.applicationId || '',
    branch: step?.branch || 'main',
    testStage: step?.testStage || '',
    testTag: step?.testTag || '',
    initialTestData: step ? JSON.stringify(step.initialTestData, null, 2) : '{}',
    squashStepIds: step?.squashStepIds.join(', ') || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.applicationId) newErrors.applicationId = 'Application is required';
    if (!formData.testStage) newErrors.testStage = 'Test stage is required';
    if (!formData.testTag) newErrors.testTag = 'Test tag is required';
    
    try {
      JSON.parse(formData.initialTestData);
    } catch (e) {
      newErrors.initialTestData = 'Invalid JSON format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const selectedApp = applications.find(app => app.id === formData.applicationId)!;
    
    const stepData: FlowStep = {
      id: step?.id || `step-${Date.now()}`,
      applicationId: formData.applicationId,
      application: selectedApp,
      branch: formData.branch,
      testStage: formData.testStage,
      testTag: formData.testTag,
      order: step?.order || 1,
      initialTestData: JSON.parse(formData.initialTestData),
      squashStepIds: formData.squashStepIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
    };

    onSave(stepData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <Server className="h-5 w-5 mr-2 text-cyan-400" />
            {step ? 'Edit Step' : 'Add Step'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Application *
            </label>
            <select
              value={formData.applicationId}
              onChange={(e) => setFormData(prev => ({ ...prev, applicationId: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            >
              <option value="">Select an application</option>
              {applications.map(app => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>
            {errors.applicationId && <p className="text-red-400 text-xs mt-1">{errors.applicationId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Branch
              </label>
              <input
                type="text"
                value={formData.branch}
                onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="main"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Test Stage *
              </label>
              <input
                type="text"
                value={formData.testStage}
                onChange={(e) => setFormData(prev => ({ ...prev, testStage: e.target.value }))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="e.g., build, test, deploy"
              />
              {errors.testStage && <p className="text-red-400 text-xs mt-1">{errors.testStage}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Test Tag *
            </label>
            <input
              type="text"
              value={formData.testTag}
              onChange={(e) => setFormData(prev => ({ ...prev, testTag: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="e.g., smoke, integration, e2e"
            />
            {errors.testTag && <p className="text-red-400 text-xs mt-1">{errors.testTag}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Squash Step IDs
            </label>
            <input
              type="text"
              value={formData.squashStepIds}
              onChange={(e) => setFormData(prev => ({ ...prev, squashStepIds: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="1001, 1002, 1003"
            />
            <p className="text-xs text-gray-500 mt-1">Comma-separated list of Squash test step IDs</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Initial Test Data
            </label>
            <textarea
              value={formData.initialTestData}
              onChange={(e) => setFormData(prev => ({ ...prev, initialTestData: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none font-mono text-sm"
              placeholder='{"key": "value"}'
            />
            {errors.initialTestData && <p className="text-red-400 text-xs mt-1">{errors.initialTestData}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-medium hover:from-cyan-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              {step ? 'Update Step' : 'Add Step'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}