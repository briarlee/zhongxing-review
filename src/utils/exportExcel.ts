import ExcelJS from 'exceljs';
import { ReviewData } from '../types';
import { VALUES, GRADE_CONFIG } from '../data/values';

export async function exportToExcel(reviewData: ReviewData): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = '众行绩效考核系统';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('绩效考核评价');

  // 设置列宽
  sheet.columns = [
    { width: 18 },
    { width: 15 },
    { width: 50 },
    { width: 10 }
  ];

  // 标题样式
  const titleStyle: Partial<ExcelJS.Style> = {
    font: { bold: true, size: 18, color: { argb: 'FF1890FF' } },
    alignment: { horizontal: 'center', vertical: 'middle' }
  };

  const headerStyle: Partial<ExcelJS.Style> = {
    font: { bold: true, size: 12 },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE6F7FF' } },
    alignment: { horizontal: 'left', vertical: 'middle' }
  };

  const labelStyle: Partial<ExcelJS.Style> = {
    font: { bold: true, size: 11 },
    alignment: { horizontal: 'right', vertical: 'middle' }
  };

  const valueStyle: Partial<ExcelJS.Style> = {
    font: { size: 11 },
    alignment: { horizontal: 'left', vertical: 'middle', wrapText: true }
  };

  let rowNum = 1;

  // 标题
  sheet.mergeCells(`A${rowNum}:D${rowNum}`);
  const titleCell = sheet.getCell(`A${rowNum}`);
  titleCell.value = '众行绩效考核评价表';
  Object.assign(titleCell, { style: titleStyle });
  sheet.getRow(rowNum).height = 35;
  rowNum += 2;

  // 基本信息
  sheet.mergeCells(`A${rowNum}:D${rowNum}`);
  const infoHeader = sheet.getCell(`A${rowNum}`);
  infoHeader.value = '基本信息';
  Object.assign(infoHeader, { style: headerStyle });
  rowNum++;

  const basicInfo = [
    ['被考核人', reviewData.employeeName || '-'],
    ['部门', reviewData.employeeDept || '-'],
    ['职位', reviewData.employeePosition || '-'],
    ['评估人', reviewData.reviewerName || '-'],
    ['评估季度', reviewData.quarter]
  ];

  basicInfo.forEach(([label, value]) => {
    sheet.getCell(`A${rowNum}`).value = label;
    Object.assign(sheet.getCell(`A${rowNum}`), { style: labelStyle });
    sheet.mergeCells(`B${rowNum}:D${rowNum}`);
    sheet.getCell(`B${rowNum}`).value = value;
    Object.assign(sheet.getCell(`B${rowNum}`), { style: valueStyle });
    rowNum++;
  });

  rowNum++;

  // 价值观评分汇总
  sheet.mergeCells(`A${rowNum}:D${rowNum}`);
  const scoreHeader = sheet.getCell(`A${rowNum}`);
  scoreHeader.value = '价值观评分（众行七剑 PASSION）';
  Object.assign(scoreHeader, { style: headerStyle });
  rowNum++;

  // 总分和档位
  const gradeConfig = GRADE_CONFIG.find(g => g.grade === reviewData.grade)!;
  sheet.getCell(`A${rowNum}`).value = '总分';
  Object.assign(sheet.getCell(`A${rowNum}`), { style: labelStyle });
  sheet.getCell(`B${rowNum}`).value = `${reviewData.totalScore}/28分`;
  Object.assign(sheet.getCell(`B${rowNum}`), { style: valueStyle });
  sheet.getCell(`C${rowNum}`).value = '档位';
  Object.assign(sheet.getCell(`C${rowNum}`), { style: labelStyle });
  sheet.getCell(`D${rowNum}`).value = `${gradeConfig.label} - ${gradeConfig.description}`;
  Object.assign(sheet.getCell(`D${rowNum}`), { style: valueStyle });
  rowNum += 2;

  // 各价值观详细评分
  VALUES.forEach((value) => {
    const scores = reviewData.valueScores[value.id];
    const valueScore = scores.filter(Boolean).length;

    // 价值观名称
    sheet.mergeCells(`A${rowNum}:C${rowNum}`);
    sheet.getCell(`A${rowNum}`).value = `${value.nameCn}（${value.name}）- ${value.description}`;
    Object.assign(sheet.getCell(`A${rowNum}`), {
      style: {
        font: { bold: true, size: 11, color: { argb: 'FF1890FF' } },
        alignment: { vertical: 'middle', wrapText: true }
      }
    });
    sheet.getCell(`D${rowNum}`).value = `${valueScore}/4分`;
    Object.assign(sheet.getCell(`D${rowNum}`), {
      style: {
        font: { bold: true, size: 11 },
        alignment: { horizontal: 'center', vertical: 'middle' }
      }
    });
    sheet.getRow(rowNum).height = 25;
    rowNum++;

    // 行为项
    value.behaviors.forEach((behavior, index) => {
      sheet.getCell(`A${rowNum}`).value = scores[index] ? '✓' : '○';
      Object.assign(sheet.getCell(`A${rowNum}`), {
        style: {
          font: { size: 14, color: { argb: scores[index] ? 'FF52C41A' : 'FFD9D9D9' } },
          alignment: { horizontal: 'center', vertical: 'middle' }
        }
      });
      sheet.mergeCells(`B${rowNum}:D${rowNum}`);
      sheet.getCell(`B${rowNum}`).value = behavior;
      Object.assign(sheet.getCell(`B${rowNum}`), {
        style: {
          font: { size: 10 },
          alignment: { vertical: 'middle', wrapText: true }
        }
      });
      sheet.getRow(rowNum).height = 30;
      rowNum++;
    });

    rowNum++;
  });

  // 绩效评价
  sheet.mergeCells(`A${rowNum}:D${rowNum}`);
  const perfHeader = sheet.getCell(`A${rowNum}`);
  perfHeader.value = '绩效评价';
  Object.assign(perfHeader, { style: headerStyle });
  rowNum++;

  const perfItems = [
    ['业务结果', reviewData.businessResult],
    ['季度成长', reviewData.growth],
    ['存在问题', reviewData.issues],
    ['改进建议', reviewData.suggestions]
  ];

  perfItems.forEach(([label, value]) => {
    sheet.getCell(`A${rowNum}`).value = label;
    Object.assign(sheet.getCell(`A${rowNum}`), { style: labelStyle });
    sheet.mergeCells(`B${rowNum}:D${rowNum}`);
    sheet.getCell(`B${rowNum}`).value = value || '-';
    Object.assign(sheet.getCell(`B${rowNum}`), {
      style: { ...valueStyle, alignment: { ...valueStyle.alignment, wrapText: true } }
    });
    sheet.getRow(rowNum).height = Math.max(25, Math.ceil((value?.length || 0) / 40) * 18);
    rowNum++;
  });

  rowNum++;

  // AI评语
  if (reviewData.aiComment) {
    sheet.mergeCells(`A${rowNum}:D${rowNum}`);
    const aiHeader = sheet.getCell(`A${rowNum}`);
    aiHeader.value = 'AI综合评语';
    Object.assign(aiHeader, { style: headerStyle });
    rowNum++;

    sheet.mergeCells(`A${rowNum}:D${rowNum}`);
    sheet.getCell(`A${rowNum}`).value = reviewData.aiComment;
    Object.assign(sheet.getCell(`A${rowNum}`), {
      style: {
        font: { size: 11 },
        alignment: { vertical: 'top', wrapText: true }
      }
    });
    sheet.getRow(rowNum).height = Math.max(60, Math.ceil(reviewData.aiComment.length / 50) * 18);
  }

  // 导出
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `绩效考核_${reviewData.employeeName || '未命名'}_${reviewData.quarter}.xlsx`;
  link.click();
  URL.revokeObjectURL(link.href);
}
