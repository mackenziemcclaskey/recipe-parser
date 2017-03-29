const convertFromFraction = (number) => {
  // number comes in -> 1 1/3
  if (number && number.split(' ').length > 1) {
    const [whole, fraction] = number.split(' ');
    let [a, b] = fraction.split('/');
    return keepThreeDecimals(parseInt(whole) + parseFloat(a/b));
  } else if (!number || number.split('-').length > 1) {
    return number;
  } else {
    let [a, b] = number.split('/');
    return b ? keepThreeDecimals(parseFloat(a/b)) : a;
  }
}

function keepThreeDecimals(val) {
  val = val.toString();
  return val.split(".")[0] + "." + val.split(".")[1].substring(0,3);
}

module.exports = {
  convertFromFraction
}