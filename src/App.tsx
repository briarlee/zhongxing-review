import React, { useState } from 'react';
import { Header } from './components/Header';
import { BasicInfo } from './components/BasicInfo';
import { ValueScorePanel } from './components/ValueScorePanel';
import { PerformanceForm } from './components/PerformanceForm';
import { AIComment } from './components/AIComment';
import { ExportButtons } from './components/ExportButtons';
import { SettingsModal } from './components/SettingsModal';
import { useReviewStore } from './hooks/useReviewStore';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const store = useReviewStore();

  const handleReset = () => {
    if (window.confirm('确定要重置所有数据吗？此操作不可恢复。')) {
      store.resetAll();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        totalScore={store.totalScore}
        gradeConfig={store.gradeConfig}
        onSettingsClick={() => setShowSettings(true)}
        onResetClick={handleReset}
      />

      <main className="max-w-6xl mx-auto px-4 py-6" id="review-content">
        {/* 基本信息 */}
        <BasicInfo
          employeeName={store.employeeName}
          setEmployeeName={store.setEmployeeName}
          employeeDept={store.employeeDept}
          setEmployeeDept={store.setEmployeeDept}
          employeePosition={store.employeePosition}
          setEmployeePosition={store.setEmployeePosition}
          reviewerName={store.reviewerName}
          setReviewerName={store.setReviewerName}
          quarter={store.quarter}
          setQuarter={store.setQuarter}
        />

        {/* 价值观评分面板 */}
        <ValueScorePanel
          valueScores={store.valueScores}
          onScoreChange={store.updateBehaviorScore}
        />

        {/* 绩效评价表单 */}
        <PerformanceForm
          businessResult={store.businessResult}
          setBusinessResult={store.setBusinessResult}
          growth={store.growth}
          setGrowth={store.setGrowth}
          issues={store.issues}
          setIssues={store.setIssues}
          suggestions={store.suggestions}
          setSuggestions={store.setSuggestions}
        />

        {/* AI评语 */}
        <AIComment
          apiConfig={store.apiConfig}
          reviewData={store.getReviewData()}
          aiComment={store.aiComment}
          setAiComment={store.setAiComment}
        />

        {/* 导出按钮 */}
        <ExportButtons reviewData={store.getReviewData()} />

        {/* 底部信息 */}
        <footer className="text-center text-gray-400 text-sm py-6">
          <p>众行绩效考核评价工具 v1.0</p>
          <p className="mt-1">Powered by 豆包大模型</p>
        </footer>
      </main>

      {/* 设置弹窗 */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiConfig={store.apiConfig}
        onSave={store.saveApiConfig}
      />
    </div>
  );
}

export default App;
