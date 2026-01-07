import React, { useState } from 'react';
import { DoubaoConfig, ReviewData } from '../types';
import { generateAIComment } from '../utils/doubaoApi';

interface AICommentProps {
  apiConfig: DoubaoConfig;
  reviewData: ReviewData;
  aiComment: string;
  setAiComment: (value: string) => void;
}

export const AIComment: React.FC<AICommentProps> = ({
  apiConfig,
  reviewData,
  aiComment,
  setAiComment
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    const result = await generateAIComment(apiConfig, reviewData);

    if (result.success && result.comment) {
      setAiComment(result.comment);
    } else {
      setError(result.error || '生成失败');
    }

    setLoading(false);
  };

  const isConfigured = apiConfig.apiKey && apiConfig.endpoint;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI综合评语
        </h2>

        <button
          onClick={handleGenerate}
          disabled={loading || !isConfigured}
          className={`px-4 py-2 rounded-lg text-white font-medium flex items-center transition-all ${
            loading || !isConfigured
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              生成中...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI生成评语
            </>
          )}
        </button>
      </div>

      {!isConfigured && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          请先在设置中配置API Key和接入点ID
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <textarea
        value={aiComment}
        onChange={(e) => setAiComment(e.target.value)}
        placeholder="点击 AI生成评语 按钮，或手动输入评语..."
        rows={6}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
      />

      {aiComment && (
        <div className="mt-2 text-xs text-gray-400 text-right">
          字数：{aiComment.length}
        </div>
      )}
    </div>
  );
};
