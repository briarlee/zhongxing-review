import { DoubaoConfig, ReviewData } from '../types';
import { VALUES } from '../data/values';

export interface AIGenerateResult {
  success: boolean;
  comment?: string;
  error?: string;
}

export async function generateAIComment(
  config: DoubaoConfig,
  reviewData: ReviewData
): Promise<AIGenerateResult> {
  if (!config.apiKey || !config.endpoint) {
    return {
      success: false,
      error: '请先配置API Key和接入点ID'
    };
  }

  const valueScoresText = Object.entries(reviewData.valueScores)
    .map(([key, scores]) => {
      const value = VALUES.find(v => v.id === key);
      const score = scores.filter(Boolean).length;
      return `- ${value?.nameCn}(${value?.name}): ${score}/4分`;
    })
    .join('\n');

  const systemPrompt = `你是众行公司的HR专家，精通价值观考核和绩效评价。请根据提供的评分数据，用专业、温暖、建设性的语言生成综合评语。
评语要求：
1. 先肯定优点和亮点
2. 客观指出需要改进的方面
3. 给出具体可行的建议
4. 语言简洁有力，控制在200字以内`;

  const userPrompt = `请根据以下考核数据生成综合评语：

被考核人：${reviewData.employeeName || '未填写'}
评估季度：${reviewData.quarter}

价值观得分：${reviewData.totalScore}/28分（${reviewData.grade}档）
各项得分：
${valueScoresText}

业务结果：${reviewData.businessResult || '未填写'}
季度成长：${reviewData.growth || '未填写'}
存在问题：${reviewData.issues || '未填写'}
改进建议：${reviewData.suggestions || '未填写'}`;

  try {
    const response = await fetch(
      'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
          model: config.endpoint,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: `API请求失败: ${response.status} ${errorData.error?.message || response.statusText}`
      };
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return {
        success: false,
        error: 'API返回数据格式异常'
      };
    }

    return {
      success: true,
      comment: data.choices[0].message.content
    };
  } catch (error) {
    return {
      success: false,
      error: `网络错误: ${error instanceof Error ? error.message : '未知错误'}`
    };
  }
}
