import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Flows from './pages/Flows/Flows';
import Executions from './pages/Executions/Executions';
import Applications from './pages/Applications/Applications';
import Users from './pages/Users/Users';
import FlowBuilder from './pages/FlowBuilder/FlowBuilder';
import ExecutionDetails from './pages/ExecutionDetails/ExecutionDetails';
import './styles/animations.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/flows" element={<Flows />} />
              <Route path="/flows/builder/:id?" element={<FlowBuilder />} />
              <Route path="/executions" element={<Executions />} />
              <Route path="/executions/:id" element={<ExecutionDetails />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;