// 价值观行为评分类型
export type BehaviorScores = [boolean, boolean, boolean, boolean];

// 价值观评分集合
export interface ValueScores {
  principle: BehaviorScores;
  ambition: BehaviorScores;
  sincerity: BehaviorScores;
  strength: BehaviorScores;
  innovation: BehaviorScores;
  optimism: BehaviorScores;
  neverGiveUp: BehaviorScores;
}

// 价值观ID类型
export type ValueId = keyof ValueScores;

// 考核档位
export type Grade = 'A' | 'B' | 'C' | 'D';

// 完整的考核数据
export interface ReviewData {
  // 基本信息
  employeeName: string;
  employeeDept: string;
  employeePosition: string;
  reviewerName: string;
  quarter: string;

  // 价值观评分
  valueScores: ValueScores;

  // 计算属性
  totalScore: number;
  grade: Grade;

  // 绩效评价
  businessResult: string;
  growth: string;
  issues: string;
  suggestions: string;

  // AI生成评语
  aiComment: string;
}

// 价值观定义
export interface ValueDefinition {
  id: ValueId;
  name: string;
  nameCn: string;
  description: string;
  behaviors: [string, string, string, string];
}

// 豆包API配置
export interface DoubaoConfig {
  apiKey: string;
  endpoint: string;
}

// 档位配置
export interface GradeConfig {
  grade: Grade;
  minScore: number;
  maxScore: number;
  label: string;
  description: string;
  color: string;
}
