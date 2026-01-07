import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPdf(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('导出元素不存在');
  }

  // 临时修改样式以获得更好的导出效果
  const originalStyle = element.style.cssText;
  element.style.width = '800px';
  element.style.padding = '20px';
  element.style.backgroundColor = '#ffffff';

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgWidth = 210; // A4宽度 mm
    const pageHeight = 297; // A4高度 mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;

    // 添加图片到第一页
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 0.95),
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight
    );
    heightLeft -= pageHeight;

    // 如果内容超过一页，添加新页
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } finally {
    // 恢复原始样式
    element.style.cssText = originalStyle;
  }
}
