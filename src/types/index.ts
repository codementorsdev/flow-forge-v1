export interface Flow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
  globalVariables: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'draft';
  squashTestCaseId?: number;
}

export interface FlowStep {
  id: string;
  applicationId: string;
  application: Application;
  branch: string;
  testStage: string;
  testTag: string;
  order: number;
  initialTestData: Record<string, any>;
  squashStepIds: number[];
}

export interface Application {
  id: string;
  name: string;
  gitlabProjectId: string;
  personalAccessToken: string;
  description: string;
  status: 'active' | 'inactive';
}

export interface FlowExecution {
  id: string;
  flowId: string;
  flow: Flow;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  runtimeVariables: Record<string, any>;
  pipelineExecutions: PipelineExecution[];
  triggeredBy: string;
}

export interface PipelineExecution {
  id: string;
  pipelineId: number;
  pipelineUrl: string;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
  initialTestData: Record<string, any>;
  runtimeTestData: Record<string, any>;
  stepId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'editor' | 'operator' | 'admin' | 'auditor';
  avatar?: string;
  lastActive: string;
}

export interface ExecutionMetrics {
  totalExecutions: number;
  successRate: number;
  averageDuration: number;
  activeExecutions: number;
}

export interface NotificationPreferences {
  email: boolean;
  slack: boolean;
  inApp: boolean;
}

export type Theme = 'dark' | 'light';