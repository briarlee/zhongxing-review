import React, { useState } from 'react';
import { ReviewData } from '../types';
import { exportToExcel } from '../utils/exportExcel';
import { exportToPdf } from '../utils/exportPdf';

interface ExportButtonsProps {
  reviewData: ReviewData;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({ reviewData }) => {
  const [excelLoading, setExcelLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleExportExcel = async () => {
    setExcelLoading(true);
    try {
      await exportToExcel(reviewData);
    } catch (error) {
      console.error('Excel导出失败:', error);
      alert('Excel导出失败，请重试');
    } finally {
      setExcelLoading(false);
    }
  };

  const handleExportPdf = async () => {
    setPdfLoading(true);
    try {
      await exportToPdf(
        'review-content',
        `绩效考核_${reviewData.employeeName || '未命名'}_${reviewData.quarter}.pdf`
      );
    } catch (error) {
      console.error('PDF导出失败:', error);
      alert('PDF导出失败，请重试');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        导出报告
      </h2>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExportExcel}
          disabled={excelLoading}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium rounded-lg flex items-center transition-all"
        >
          {excelLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              导出中...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              导出Excel
            </>
          )}
        </button>

        <button
          onClick={handleExportPdf}
          disabled={pdfLoading}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-medium rounded-lg flex items-center transition-all"
        >
          {pdfLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              导出中...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              导出PDF
            </>
          )}
        </button>
      </div>

      <p className="mt-3 text-sm text-gray-500">
        Excel格式适合存档和数据分析，PDF格式适合打印和分享
      </p>
    </div>
  );
};
