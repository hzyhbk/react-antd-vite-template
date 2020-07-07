function openDownloadDialog(url, saveName) {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  let aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event;
  if (window.MouseEvent) {
    event = new MouseEvent('click');
  } else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent(
      'click',
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    );
  }
  aLink.dispatchEvent(event);
}
function sheet2blob(sheet, name) {
  const sheetName = name || 'sheet1';
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  var wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary',
  };
  const wbout = window.XLSX_STYLE.write(workbook, wopts);
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  // 字符串转ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return blob;
}
function setSheetStyle(sheet, columns) {
  sheet['!cols'] = columns.map(item => ({ wpx: 200 }));
  Object.keys(sheet).forEach(key => {
    if (typeof sheet[key] === 'object') {
      // 第一行是标题行
      if (/^[A-Z]+1$/.test(key)) {
        sheet[key].s = {
          font: {
            sz: 18,
            bold: true,
          },
          alignment: {
            vertical: 'center',
            wrapText: true,
          },
        };
      } else {
        sheet[key].s = {
          alignment: {
            vertical: 'center',
            wrapText: true,
          },
        };
      }
    }
  });
}
export function downloadExcelWithDom(dom, columns, saveName) {
  const fileName = saveName ? `${saveName}.xlsx` : '导出.xlsx';
  const sheet = window.XLSX.utils.table_to_book(dom).Sheets.Sheet1;
  setSheetStyle(sheet, columns);
  openDownloadDialog(sheet2blob(sheet), fileName);
}
