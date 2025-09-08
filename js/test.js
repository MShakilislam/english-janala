
const createElement = (arr) =>{
    const htmlElemnt = arr.map((el) => `<span class="btn">${el}</span>`);
    console.log(htmlElemnt.join(" "))
}
const synonyms = ["abul","kabul","dabul"];
createElement(synonyms)