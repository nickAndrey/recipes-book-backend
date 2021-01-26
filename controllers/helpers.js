const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

exports.setAsArray = (list) => {
  return JSON.stringify(list).replace('[', '{').replace(']', '}').replace("'", '"');
};

exports.dataOutPrepare = (rows) => {
  return rows.map((row) => {
    return {
      ...row,
      content: md.render(row.content),
      content_md: row.content,
    };
  });
};
