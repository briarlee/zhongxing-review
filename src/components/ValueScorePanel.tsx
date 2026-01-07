import React from 'react';
import { ValueCard } from './ValueCard';
import { VALUES } from '../data/values';
import { ValueScores, ValueId } from '../types';

interface ValueScorePanelProps {
  valueScores: ValueScores;
  onScoreChange: (valueId: ValueId, behaviorIndex: number, checked: boolean) => void;
}

export const ValueScorePanel: React.FC<ValueScorePanelProps> = ({
  valueScores,
  onScoreChange
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        价值观评分（众行七剑 PASSION）
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {VALUES.map((value) => (
          <ValueCard
            key={value.id}
            value={value}
            scores={valueScores[value.id]}
            onScoreChange={onScoreChange}
          />
        ))}
      </div>
    </div>
  );
};
