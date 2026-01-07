import { ValueDefinition, GradeConfig, ValueScores } from '../types';

export const VALUES: ValueDefinition[] = [
  {
    id: 'principle',
    name: 'Principle',
    nameCn: '原则',
    description: '如果承诺了就必须做到，如果做不到就承认做不到，实事求是',
    behaviors: [
      '以客观事实结合主观意愿定下工作目标，不轻诺也不畏诺',
      '目标完成的过程中要全力以赴，使命必达，不犹豫也不怯懦',
      '勇于挑战目标，敢于承担结果，控制自己不要做出"自我辩护"的第一反应',
      '未来企业中，只有信奉原则者的生存空间，而没有彷徨犹豫者的立足之地，如实观照'
    ]
  },
  {
    id: 'ambition',
    name: 'Ambition',
    nameCn: '愿望',
    description: '心中怀有能渗透到潜意识之中的，强烈而持久的愿望',
    behaviors: [
      '工作是自己创造的，不是别人给的，你正在做的就是头等大事',
      '工作不要被动，要领先于人，凡事找方法而不是找借口',
      '永远正向思考，积极行动，减少感性的烦恼，一旦出现立即正面处理',
      '渗透到潜意识中的愿力可以推动自己和周围的人，推动与被推动之间，久而久之即有天壤之别'
    ]
  },
  {
    id: 'sincerity',
    name: 'Sincerity',
    nameCn: '真诚',
    description: '真诚面对自我，坦诚对待他人，自强不息，厚德载物',
    behaviors: [
      '诚实正直，言行一致，真实不装',
      '心怀感恩，尊重客户，诚信为先',
      '真实面对自我，善于倾听，尊重不同意见，自强不息',
      '诚意面对客户，追求客户满意甚至超越客户期待，厚德载物'
    ]
  },
  {
    id: 'strength',
    name: 'Strength',
    nameCn: '力量',
    description: '真正的力量就是坚持正直本分的勇气，做对的事情，把事情做对，保持平常心',
    behaviors: [
      '做对的事情，要敢于取舍，要有不为清单',
      '把事情做对，要擅于聚焦，要持续学习，追求极致',
      '坚守正直和本分，做人要正直，做事要本分',
      '拥有平常心，穿透表象的迷雾，回归事物的本源'
    ]
  },
  {
    id: 'innovation',
    name: 'Innovation',
    nameCn: '创新',
    description: '不断从事创造性的工作，今天要比昨天好，明天更胜过今天，日益精进',
    behaviors: [
      '工作中要有创新意识，不断建立新方法和新思路',
      '保持好奇，不满足于现状，不自我设限',
      '清晨三问，静夜三思，日拱一卒，日益精进',
      '面对变化不抱怨，拥抱变化甚至能创造变化，带来突破性结果'
    ]
  },
  {
    id: 'optimism',
    name: 'Optimism',
    nameCn: '乐观',
    description: '拥有单纯和感恩的心，始终保持乐观向上的态度，相信愿力的力量',
    behaviors: [
      '每天微笑面对工作，内心坚定，正面影响和推动团队成长',
      '乐观看待这个世界，怀有希望，可以从客户的拒绝开始，但一定要到客户的满意为止',
      '相信美好的事情总会发生，因为相信所以简单',
      '心存善念，常怀敬畏，保持谦和'
    ]
  },
  {
    id: 'neverGiveUp',
    name: 'Never Give Up',
    nameCn: '永不言弃',
    description: '无论在何种情况下，不要害怕和胆怯，永远不要放弃心中的理想和希望',
    behaviors: [
      '勇于选择，坚守选择，不要害怕和胆怯',
      '敢于担当，不计较个人得失，需要的时候能挺身而出',
      '理想还是要有的，万一实现了呢？人因理想而伟大',
      '无论遇到何种困难，永远不要放弃心中的理想和希望'
    ]
  }
];

export const GRADE_CONFIG: GradeConfig[] = [
  {
    grade: 'A',
    minScore: 24,
    maxScore: 28,
    label: 'A档',
    description: '卓越，众行价值观的榜样',
    color: '#52c41a'
  },
  {
    grade: 'B',
    minScore: 20,
    maxScore: 24,
    label: 'B档',
    description: '优秀，值得众行人学习',
    color: '#1890ff'
  },
  {
    grade: 'C',
    minScore: 14,
    maxScore: 20,
    label: 'C档',
    description: '合格，符合价值观基本要求',
    color: '#faad14'
  },
  {
    grade: 'D',
    minScore: 0,
    maxScore: 14,
    label: 'D档',
    description: '不合格，需要明确的改进计划',
    color: '#ff4d4f'
  }
];

export function calculateGrade(score: number): GradeConfig {
  if (score >= 24) return GRADE_CONFIG[0];
  if (score >= 20) return GRADE_CONFIG[1];
  if (score >= 14) return GRADE_CONFIG[2];
  return GRADE_CONFIG[3];
}

export function calculateTotalScore(valueScores: ValueScores): number {
  return Object.values(valueScores).reduce((total, scores) => {
    return total + scores.filter(Boolean).length;
  }, 0);
}
