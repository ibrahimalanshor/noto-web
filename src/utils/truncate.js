export default (str, options = {}) => {
  const length = options.length || 30;
  const endString = options.endString || '...';

  return str.slice(0, length) + `${endString}`;
};
