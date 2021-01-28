import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

export const setAsArray = (list: any[]) => {
  return JSON.stringify(list).replace('[', '{').replace(']', '}').replace("'", '"');
};

export const dataOutPrepare = (rows: any[]) => {
  return rows.map((row) => {
    return {
      ...row,
      content: md.render(row.content),
      content_md: row.content,
    };
  });
};
