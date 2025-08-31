import { Flow, FlowExecution, Application, User, PipelineExecution } from '../types';

export const mockApplications: Application[] = [
  {
    id: 'app-1',
    name: 'Frontend App',
    gitlabProjectId: 'orkestra/frontend-app',
    personalAccessToken: 'glpat-xxxxxxxxxxxx',
    description: 'Main frontend application with React and TypeScript',
    status: 'active'
  },
  {
    id: 'app-2',
    name: 'API Gateway',
    gitlabProjectId: 'orkestra/api-gateway',
    personalAccessToken: 'glpat-yyyyyyyyyyyy',
    description: 'Central API gateway service',
    status: 'active'
  },
  {
    id: 'app-3',
    name: 'Payment Service',
    gitlabProjectId: 'orkestra/payment-service',
    personalAccessToken: 'glpat-zzzzzzzzzzzz',
    description: 'Microservice handling payment processing',
    status: 'active'
  }
];

export const mockFlows: Flow[] = [
  {
    id: 'flow-1',
    name: 'E2E User Journey',
    description: 'Complete user registration and checkout flow',
    steps: [
      {
        id: 'step-1',
        applicationId: 'app-1',
        application: mockApplications[0],
        branch: 'main',
        testStage: 'integration',
        testTag: 'user-registration',
        order: 1,
        initialTestData: { username: 'test@example.com', password: 'password123' },
        squashStepIds: [1001, 1002]
      },
      {
        id: 'step-2',
        applicationId: 'app-2',
        application: mockApplications[1],
        branch: 'main',
        testStage: 'api',
        testTag: 'user-validation',
        order: 2,
        initialTestData: {},
        squashStepIds: [2001]
      },
      {
        id: 'step-3',
        applicationId: 'app-3',
        application: mockApplications[2],
        branch: 'main',
        testStage: 'integration',
        testTag: 'payment-flow',
        order: 3,
        initialTestData: { amount: 99.99, currency: 'USD' },
        squashStepIds: [3001, 3002]
      }
    ],
    globalVariables: { environment: 'staging', timeout: 300 },
    createdAt: '2025-01-08T10:00:00Z',
    updatedAt: '2025-01-08T15:30:00Z',
    status: 'active',
    squashTestCaseId: 123
  },
  {
    id: 'flow-2',
    name: 'Smoke Test Suite',
    description: 'Quick smoke tests across all critical services',
    steps: [
      {
        id: 'step-4',
        applicationId: 'app-1',
        application: mockApplications[0],
        branch: 'develop',
        testStage: 'smoke',
        testTag: 'health-check',
        order: 1,
        initialTestData: {},
        squashStepIds: [4001]
      },
      {
        id: 'step-5',
        applicationId: 'app-2',
        application: mockApplications[1],
        branch: 'develop',
        testStage: 'smoke',
        testTag: 'api-health',
        order: 2,
        initialTestData: {},
        squashStepIds: [5001]
      }
    ],
    globalVariables: { environment: 'production', retries: 3 },
    createdAt: '2025-01-07T09:00:00Z',
    updatedAt: '2025-01-08T11:20:00Z',
    status: 'active'
  }
];

export const mockPipelineExecutions: PipelineExecution[] = [
  {
    id: 'pipe-1',
    pipelineId: 12345,
    pipelineUrl: 'https://gitlab.com/orkestra/frontend-app/-/pipelines/12345',
    status: 'passed',
    startTime: '2025-01-08T14:00:00Z',
    endTime: '2025-01-08T14:15:30Z',
    duration: 930,
    initialTestData: { username: 'test@example.com', password: 'password123' },
    runtimeTestData: { userId: 'user-abc123', sessionToken: 'tok-xyz789' },
    stepId: 'step-1'
  },
  {
    id: 'pipe-2',
    pipelineId: 12346,
    pipelineUrl: 'https://gitlab.com/orkestra/api-gateway/-/pipelines/12346',
    status: 'passed',
    startTime: '2025-01-08T14:16:00Z',
    endTime: '2025-01-08T14:22:45Z',
    duration: 405,
    initialTestData: { userId: 'user-abc123' },
    runtimeTestData: { validationStatus: 'verified', apiKey: 'key-def456' },
    stepId: 'step-2'
  },
  {
    id: 'pipe-3',
    pipelineId: 12347,
    pipelineUrl: 'https://gitlab.com/orkestra/payment-service/-/pipelines/12347',
    status: 'failed',
    startTime: '2025-01-08T14:23:00Z',
    endTime: '2025-01-08T14:25:30Z',
    duration: 150,
    initialTestData: { amount: 99.99, currency: 'USD', apiKey: 'key-def456' },
    runtimeTestData: { errorCode: 'PAYMENT_DECLINED', retryAttempts: 3 },
    stepId: 'step-3'
  }
];

export const mockExecutions: FlowExecution[] = [
  {
    id: 'exec-1',
    flowId: 'flow-1',
    flow: mockFlows[0],
    status: 'failed',
    startTime: '2025-01-08T14:00:00Z',
    endTime: '2025-01-08T14:25:30Z',
    runtimeVariables: { 
      environment: 'staging', 
      timeout: 300,
      userId: 'user-abc123',
      sessionToken: 'tok-xyz789'
    },
    pipelineExecutions: mockPipelineExecutions,
    triggeredBy: 'john.doe@company.com'
  },
  {
    id: 'exec-2',
    flowId: 'flow-2',
    flow: mockFlows[1],
    status: 'completed',
    startTime: '2025-01-08T12:00:00Z',
    endTime: '2025-01-08T12:08:45Z',
    runtimeVariables: { environment: 'production', retries: 3 },
    pipelineExecutions: [
      {
        id: 'pipe-4',
        pipelineId: 12348,
        pipelineUrl: 'https://gitlab.com/orkestra/frontend-app/-/pipelines/12348',
        status: 'passed',
        startTime: '2025-01-08T12:00:00Z',
        endTime: '2025-01-08T12:04:30Z',
        duration: 270,
        initialTestData: {},
        runtimeTestData: { healthStatus: 'green', responseTime: 150 },
        stepId: 'step-4'
      },
      {
        id: 'pipe-5',
        pipelineId: 12349,
        pipelineUrl: 'https://gitlab.com/orkestra/api-gateway/-/pipelines/12349',
        status: 'passed',
        startTime: '2025-01-08T12:05:00Z',
        endTime: '2025-01-08T12:08:45Z',
        duration: 225,
        initialTestData: {},
        runtimeTestData: { healthStatus: 'green', responseTime: 95 },
        stepId: 'step-5'
      }
    ],
    triggeredBy: 'jane.smith@company.com'
  },
  {
    id: 'exec-3',
    flowId: 'flow-1',
    flow: mockFlows[0],
    status: 'running',
    startTime: '2025-01-08T16:00:00Z',
    runtimeVariables: { 
      environment: 'staging', 
      timeout: 300,
      userId: 'user-def456'
    },
    pipelineExecutions: [
      {
        id: 'pipe-6',
        pipelineId: 12350,
        pipelineUrl: 'https://gitlab.com/orkestra/frontend-app/-/pipelines/12350',
        status: 'running',
        startTime: '2025-01-08T16:00:00Z',
        duration: 0,
        initialTestData: { username: 'test2@example.com', password: 'password456' },
        runtimeTestData: {},
        stepId: 'step-1'
      }
    ],
    triggeredBy: 'mike.johnson@company.com'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastActive: '2025-01-08T16:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'operator',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastActive: '2025-01-08T15:45:00Z'
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'editor',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastActive: '2025-01-08T14:30:00Z'
  },
  {
    id: 'user-4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'viewer',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastActive: '2025-01-08T13:20:00Z'
  }
];