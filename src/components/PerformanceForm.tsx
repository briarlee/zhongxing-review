import React from 'react';

interface PerformanceFormProps {
  businessResult: string;
  setBusinessResult: (value: string) => void;
  growth: string;
  setGrowth: (value: string) => void;
  issues: string;
  setIssues: (value: string) => void;
  suggestions: string;
  setSuggestions: (value: string) => void;
}

export const PerformanceForm: React.FC<PerformanceFormProps> = ({
  businessResult,
  setBusinessResult,
  growth,
  setGrowth,
  issues,
  setIssues,
  suggestions,
  setSuggestions
}) => {
  const textareaClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        绩效评价
      </h2>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>
            业务结果评价
            <span className="text-gray-400 font-normal ml-2">对本季度业务目标达成情况的评价</span>
          </label>
          <textarea
            value={businessResult}
            onChange={(e) => setBusinessResult(e.target.value)}
            placeholder="请描述本季度的业务成果、目标达成情况..."
            rows={3}
            className={textareaClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            季度成长进步
            <span className="text-gray-400 font-normal ml-2">本季度在能力、技能等方面的成长</span>
          </label>
          <textarea
            value={growth}
            onChange={(e) => setGrowth(e.target.value)}
            placeholder="请描述本季度的成长亮点、能力提升..."
            rows={3}
            className={textareaClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            季度工作问题
            <span className="text-gray-400 font-normal ml-2">需要改进的方面和存在的问题</span>
          </label>
          <textarea
            value={issues}
            onChange={(e) => setIssues(e.target.value)}
            placeholder="请描述需要改进的地方、遇到的困难..."
            rows={3}
            className={textareaClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            新季度建议
            <span className="text-gray-400 font-normal ml-2">对下季度工作的建议和期望</span>
          </label>
          <textarea
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            placeholder="请提出下季度的工作建议、发展方向..."
            rows={3}
            className={textareaClass}
          />
        </div>
      </div>
    </div>
  );
};
