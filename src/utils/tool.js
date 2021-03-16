const userOwnership = (request, valueToCompare) => {
  if (request._id.toString() !== valueToCompare.toString()) {
    return false;
  }

  return true;
};

module.exports = userOwnership;
