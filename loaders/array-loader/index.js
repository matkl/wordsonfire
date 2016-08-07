module.exports = function arrayLoader(content) {
  return `module.exports =  ${JSON.stringify(content.split('\n'))}`;
};
