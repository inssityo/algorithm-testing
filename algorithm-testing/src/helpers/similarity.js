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
    console.log("CompArray", comparisonObjects, "CompObj", comparedObject)
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
