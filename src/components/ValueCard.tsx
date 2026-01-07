import React from 'react';
import { ValueDefinition, BehaviorScores, ValueId } from '../types';

interface ValueCardProps {
  value: ValueDefinition;
  scores: BehaviorScores;
  onScoreChange: (valueId: ValueId, behaviorIndex: number, checked: boolean) => void;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  value,
  scores,
  onScoreChange
}) => {
  const currentScore = scores.filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* 卡片头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">
              {value.nameCn}
              <span className="ml-2 text-blue-100 text-sm font-normal">
                {value.name}
              </span>
            </h3>
            <p className="text-blue-100 text-sm mt-1">{value.description}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-2 text-white">
            <span className="text-2xl font-bold">{currentScore}</span>
            <span className="text-sm">/4</span>
          </div>
        </div>
      </div>

      {/* 行为项评分 */}
      <div className="p-4 space-y-3">
        {value.behaviors.map((behavior, index) => (
          <label
            key={index}
            className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${
              scores[index]
                ? 'bg-blue-50 border border-blue-200'
                : 'bg-gray-50 border border-transparent hover:bg-gray-100'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={scores[index]}
                onChange={(e) => onScoreChange(value.id, index, e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                  scores[index]
                    ? 'bg-blue-500 text-white'
                    : 'border-2 border-gray-300'
                }`}
              >
                {scores[index] && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span
              className={`ml-3 text-sm leading-relaxed ${
                scores[index] ? 'text-blue-800' : 'text-gray-600'
              }`}
            >
              {behavior}
            </span>
          </label>
        ))}
      </div>

      {/* 进度条 */}
      <div className="px-4 pb-4">
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
            style={{ width: `${(currentScore / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
