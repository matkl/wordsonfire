import words from 'array-loader!./en.txt'; // eslint-disable-line

export class Dictionary {
  constructor() {
    this.cardinality = 0;
    this.frequencies = {};
    this.updateFrequencies();
  }
  contains(word) {
    return words.indexOf(word) >= 0;
  }
  updateFrequencies() {
    const { frequencies } = this;
    let cardinality = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      for (let j = 0; j < word.length; j++) {
        const c = word[j];
        if (!frequencies[c]) frequencies[c] = 0;
        frequencies[c] += 1;
      }
      cardinality += word.length;
    }

    this.cardinality = cardinality;
  }
  generateRandomLetter() {
    const n = Math.floor(Math.random() * this.cardinality);
    const letters = Object.keys(this.frequencies);
    let i = 0;

    for (const letter of letters) {
      i += this.frequencies[letter];
      if (n <= i) return letter;
    }

    return null;
  }
}

export default new Dictionary();
