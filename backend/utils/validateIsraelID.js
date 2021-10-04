// Credit: https://gist.github.com/freak4pc/6802be89d019bca57756a675d761c5a8#gistcomment-1953878
const isValidIsraeliID = (id) => {
  var id = String(id).trim();
  if (id.length != 9 || isNaN(id)) return false;

  return (
    Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
    }) %
      10 ===
    0
  );
};

module.exports = isValidIsraeliID;
