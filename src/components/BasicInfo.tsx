import React from 'react';

interface BasicInfoProps {
  employeeName: string;
  setEmployeeName: (value: string) => void;
  employeeDept: string;
  setEmployeeDept: (value: string) => void;
  employeePosition: string;
  setEmployeePosition: (value: string) => void;
  reviewerName: string;
  setReviewerName: (value: string) => void;
  quarter: string;
  setQuarter: (value: string) => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({
  employeeName,
  setEmployeeName,
  employeeDept,
  setEmployeeDept,
  employeePosition,
  setEmployeePosition,
  reviewerName,
  setReviewerName,
  quarter,
  setQuarter
}) => {
  // 生成季度选项
  const generateQuarterOptions = () => {
    const options: string[] = [];
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 1; year <= currentYear + 1; year++) {
      for (let q = 1; q <= 4; q++) {
        options.push(`${year}Q${q}`);
      }
    }
    return options;
  };

  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        基本信息
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>被考核人</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="请输入姓名"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>部门</label>
          <input
            type="text"
            value={employeeDept}
            onChange={(e) => setEmployeeDept(e.target.value)}
            placeholder="请输入部门"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>职位</label>
          <input
            type="text"
            value={employeePosition}
            onChange={(e) => setEmployeePosition(e.target.value)}
            placeholder="请输入职位"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>评估人</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="请输入评估人姓名"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>评估季度</label>
          <select
            value={quarter}
            onChange={(e) => setQuarter(e.target.value)}
            className={inputClass}
          >
            {generateQuarterOptions().map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
