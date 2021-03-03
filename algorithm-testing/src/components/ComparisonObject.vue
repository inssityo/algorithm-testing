<template>
  <div class="parent">
    <h1><u>Similarity comparison using Jaccard or homebrew algorithms</u></h1>
    <div class="amtDiv">
      <label class="valLabel" for="ObjAmtField"> # of compared objects:</label>
      <input
        type="number"
        name="ObjAmtField"
        v-model.number="comparedObjAmt"
        @input="generateComparisonEntries"
      />

      <label class="keyLabel" for="amtField"> # of parameters:</label>
      <input type="number" name="amtField" v-model.number="parameterAmt" />
    </div>
    <h4><u>Object compared to others:</u></h4>
    <div v-for="(item, i) in parameterAmt" :key="i">
      <div class="valueDiv">
        <label class="keyLabel"> Key {{ i + 1 }}: </label>
        <input type="text" name="key" @input="handleInput" v-model="keys[i]" />
        <label class="valLabel" for="value">Value {{ i + 1 }}: </label>
        <input
          name="value"
          type="number"
          min="1"
          max="7"
          v-model="values[i]"
          @input="handleInput"
        />
      </div>
    </div>

    <div v-for="(val, j) in comparedObjAmt" :key="j">
      <h4>Comparison object {{ j + 1 }}</h4>
      <div v-for="(it, k) in parameterAmt" :key="k">
        <div class="valueDiv">
          <label class="keyLabel"> Key {{ k + 1 }}: </label>
          <input
            type="text"
            name="key"
            @input="handleInput"
            v-model="comparisonEntries[j].keys[k]"
          />
          <label class="valLabel" for="value">Value {{ k + 1 }}: </label>
          <input
            name="value"
            type="number"
            min="1"
            max="7"
            v-model="comparisonEntries[j].values[k]"
            @input="handleInput"
          />
        </div>
      </div>
      <p v-if="comparisonObjects[j] && comparisonObjects[j].similarity !==undefined">
        similarity: {{ comparisonObjects[j].similarity }}
      </p>
    </div>
    <button @click.prevent="calculateSimilarities">
      Calculate similarities
    </button>
  </div>
</template>

<script>
const jaccard = require("jaccard");
export default {
  name: "ComparisonObject",
  data() {
    return {
      parameterAmt: 0,
      comparedObjAmt: 0,
      values: [],
      keys: [],
      comparedObject: {},
      comparisonEntries: [],
      comparisonObjects: [],
      homeBrew: false,
    };
  },
  methods: {
    handleInput() {
      console.log(
        "Keys: ",
        this.keys,
        " Values: ",
        this.values,
        "Entries: ",
        this.comparisonEntries
      );
    },
    //Generates object from separate key and value arrays.
    toObject(keys, values) {
      const combined = keys.reduce(
        (obj, key, index) => ({ ...obj, [key]: values[index] }),
        {}
      );
      return combined;
    },
    generateComparedObject() {
      this.comparedObject = this.toObject(this.keys, this.values);
    },
    //Generates array entries for comparison objects
    generateComparisonEntries() {
      let temp = [];
      for (let loops = 0; loops < this.comparedObjAmt; loops++) {
        temp.push({ keys: [], values: [] });
      }
      this.comparisonEntries = temp;
    },
    //Generates objects from arrays of keys and values
    generateComparisonObjects() {
      this.comparisonEntries.forEach((element) => {
        const newObj = this.toObject(element.keys, element.values);
        this.comparisonObjects.push(newObj);
      });
    },
    //Returns common key values from objects
    getCommonKeys(obj1, obj2) {
      let commonKeys = Object.keys(obj2).filter((key) =>
        Object.keys(obj1).includes(key)
      );
      return commonKeys;
    },
    calculateSimilarities() {
      this.comparedObject = {}
      this.comparisonObjects = []
      this.generateComparedObject();
      this.generateComparisonObjects();
      if (this.homeBrew) {
        return true;
      }
      this.comparisonObjects.forEach((object) => {
        let commonKeys = this.getCommonKeys(this.comparedObject, object);
        let comparedValues = [];
        let comparisonValues = [];
        console.log(commonKeys)
        commonKeys.forEach((key) => {
          comparedValues.push(this.comparedObject[key]);
          comparisonValues.push(object[key]);
        });
        let similarity = jaccard.index(comparedValues, comparisonValues);
        console.log("similarity: ", similarity);
        similarity ? object.similarity = similarity : object.similarity = 0 
      });
    },
  },
};
</script>

<style scoped>
.valueDiv {
  margin-bottom: 0.5em;
}

.amtDiv {
  margin-bottom: 1em;
}

.keyLabel {
  margin-left: 1em;
  margin-right: 0.5em;
}

.valLabel {
  margin-right: 0.5em;
  margin-left: 1em;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  margin-top: 1em;
}
</style>
