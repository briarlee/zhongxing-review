import { useState, useCallback, useMemo } from 'react';
import { ReviewData, ValueScores, ValueId, BehaviorScores, DoubaoConfig } from '../types';
import { calculateTotalScore, calculateGrade } from '../data/values';

const initialValueScores: ValueScores = {
  principle: [false, false, false, false],
  ambition: [false, false, false, false],
  sincerity: [false, false, false, false],
  strength: [false, false, false, false],
  innovation: [false, false, false, false],
  optimism: [false, false, false, false],
  neverGiveUp: [false, false, false, false]
};

const getCurrentQuarter = (): string => {
  const now = new Date();
  const quarter = Math.ceil((now.getMonth() + 1) / 3);
  return `${now.getFullYear()}Q${quarter}`;
};

export function useReviewStore() {
  // 基本信息
  const [employeeName, setEmployeeName] = useState('');
  const [employeeDept, setEmployeeDept] = useState('');
  const [employeePosition, setEmployeePosition] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [quarter, setQuarter] = useState(getCurrentQuarter());

  // 价值观评分
  const [valueScores, setValueScores] = useState<ValueScores>(initialValueScores);

  // 绩效评价
  const [businessResult, setBusinessResult] = useState('');
  const [growth, setGrowth] = useState('');
  const [issues, setIssues] = useState('');
  const [suggestions, setSuggestions] = useState('');

  // AI评语
  const [aiComment, setAiComment] = useState('');

  // API配置
  const [apiConfig, setApiConfig] = useState<DoubaoConfig>(() => {
    const saved = localStorage.getItem('doubao_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { apiKey: '', endpoint: '' };
      }
    }
    return { apiKey: '', endpoint: '' };
  });

  // 计算总分和档位
  const totalScore = useMemo(() => calculateTotalScore(valueScores), [valueScores]);
  const gradeConfig = useMemo(() => calculateGrade(totalScore), [totalScore]);

  // 更新单个价值观的某个行为评分
  const updateBehaviorScore = useCallback((valueId: ValueId, behaviorIndex: number, checked: boolean) => {
    setValueScores(prev => {
      const newScores = { ...prev };
      const behaviorScores = [...prev[valueId]] as BehaviorScores;
      behaviorScores[behaviorIndex] = checked;
      newScores[valueId] = behaviorScores;
      return newScores;
    });
  }, []);

  // 保存API配置
  const saveApiConfig = useCallback((config: DoubaoConfig) => {
    setApiConfig(config);
    localStorage.setItem('doubao_config', JSON.stringify(config));
  }, []);

  // 重置所有数据
  const resetAll = useCallback(() => {
    setEmployeeName('');
    setEmployeeDept('');
    setEmployeePosition('');
    setReviewerName('');
    setQuarter(getCurrentQuarter());
    setValueScores(initialValueScores);
    setBusinessResult('');
    setGrowth('');
    setIssues('');
    setSuggestions('');
    setAiComment('');
  }, []);

  // 获取完整的ReviewData对象
  const getReviewData = useCallback((): ReviewData => ({
    employeeName,
    employeeDept,
    employeePosition,
    reviewerName,
    quarter,
    valueScores,
    totalScore,
    grade: gradeConfig.grade,
    businessResult,
    growth,
    issues,
    suggestions,
    aiComment
  }), [
    employeeName, employeeDept, employeePosition, reviewerName, quarter,
    valueScores, totalScore, gradeConfig.grade,
    businessResult, growth, issues, suggestions, aiComment
  ]);

  return {
    // 基本信息
    employeeName,
    setEmployeeName,
    employeeDept,
    setEmployeeDept,
    employeePosition,
    setEmployeePosition,
    reviewerName,
    setReviewerName,
    quarter,
    setQuarter,

    // 价值观评分
    valueScores,
    updateBehaviorScore,

    // 计算属性
    totalScore,
    gradeConfig,

    // 绩效评价
    businessResult,
    setBusinessResult,
    growth,
    setGrowth,
    issues,
    setIssues,
    suggestions,
    setSuggestions,

    // AI评语
    aiComment,
    setAiComment,

    // API配置
    apiConfig,
    saveApiConfig,

    // 工具方法
    resetAll,
    getReviewData
  };
}

export type ReviewStore = ReturnType<typeof useReviewStore>;
