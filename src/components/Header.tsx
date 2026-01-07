import React from 'react';
import { GradeConfig } from '../types';

interface HeaderProps {
  totalScore: number;
  gradeConfig: GradeConfig;
  onSettingsClick: () => void;
  onResetClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalScore,
  gradeConfig,
  onSettingsClick,
  onResetClick
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-gray-800">众行绩效考核评价</h1>
            <span className="text-sm text-gray-500">众行七剑 PASSION</span>
          </div>

          <div className="flex items-center space-x-6">
            {/* 实时得分显示 */}
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: gradeConfig.color }}>
                  {totalScore}
                  <span className="text-lg text-gray-400">/28</span>
                </div>
                <div className="text-xs text-gray-500">总分</div>
              </div>

              <div
                className="px-4 py-2 rounded-lg text-white font-bold text-lg"
                style={{ backgroundColor: gradeConfig.color }}
              >
                {gradeConfig.label}
              </div>

              <div className="text-sm text-gray-600 max-w-[150px]">
                {gradeConfig.description}
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onResetClick}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                重置
              </button>
              <button
                onClick={onSettingsClick}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
