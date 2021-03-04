const jaccard = require('jaccard')

//Returns common key values from two objects.
exports.getCommonKeys = (obj1, obj2) => {
  let commonKeys = Object.keys(obj2).filter((key) =>
    Object.keys(obj1).includes(key)
  );
  return commonKeys;
}

//Generates object from separate key and value arrays.
exports.toObject = (keys, values) => {
  const combined = keys.reduce(
    (obj, key, index) => ({ ...obj, [key]: values[index] }),
    {}
  );
  return combined;
}

exports.calculateJaccard = (comparisonObjects, comparedObject) => {
  comparisonObjects.forEach((object) => {
    let commonKeys = this.getCommonKeys(comparedObject, object);
    let comparedValues = [];
    let comparisonValues = [];
    console.log(commonKeys)
    commonKeys.forEach((key) => {
      comparedValues.push(comparedObject[key]);
      comparisonValues.push(object[key]);
    });
    let similarity = jaccard.index(comparedValues, comparisonValues);
    console.log("similarity: ", similarity);
    similarity ? object.similarity = similarity : object.similarity = 0
  });
}

//
exports.calculateCustomSimilarity = (comparisonObjects, comparedObject) => {
  comparisonObjects.forEach((object) => {
    let commonKeys = this.getCommonKeys(comparedObject, object);
    console.log(commonKeys)
    let comparedValues = [];
    let comparisonValues = [];
    commonKeys.forEach((key) => {
      comparedValues.push(comparedObject[key])
      comparisonValues.push(object[key])
    })
    let similarity = this.customSimilarityIndex(comparedValues, comparisonValues)
    similarity ? object.similarity = similarity : object.similarity = 0
  })
}

exports.customSimilarityIndex = (comparedValues, comparisonValues) => {
  if (comparisonValues.length) {
    let differenceSum = 0;
    for (let i = 0; i < comparisonValues.length; i++) {
      differenceSum += Math.abs(comparisonValues[i] - comparedValues[i])
      console.log(differenceSum)
    }
    let avgDifference = (differenceSum / comparisonValues.length)
    return avgDifference
  }
  return "No similar fields"
}