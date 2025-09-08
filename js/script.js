const createElement = (arr) =>{
    const htmlElemnt = arr.map((el) => `<span class="btn">${el}</span>`);
    return (htmlElemnt.join(" "))
}

const manegeSpinner = (spiner) => {
    if(spiner == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    }
    else{
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}




const loadLessone = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => loadDisplayLesson(json.data))
}
// ssecound section 
const removeBtn =() =>{
    const lessonButton = document.querySelectorAll(".lasson-btn");
    lessonButton.forEach((btn) =>btn.classList.remove("active") )
}
const loadLevelWord = (id) => {
    manegeSpinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeBtn()
            const ClickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(ClickBtn)
            ClickBtn.classList.add("active");
            displyWords(data.data)
        })
}
//  details button 
 const loadWordDetail = async(id) =>{
        const url = `https://openapi.programming-hero.com/api/word/${id}`;
        console.log(url)
        const res = await fetch(url);
        const btnDtails =await res.json()
        displayWordDtails(btnDtails.data)
    }
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5



    const displayWordDtails = (woed) =>{
        console.log(woed)
        const ditailbox = document.getElementById("dtail-container");
        ditailbox.innerHTML = `
        
         <div>
          <h2 class="text-2xl font-bold">${woed.word} (<i class="fa-solid fa-microphone-lines"></i> :${woed.pronunciation})</h2>
        </div>
        <div>
          <h2>meaning</h2>
          <p>${woed.meaning}</p>
        </div>
        <div>
          <h2>Example</h2>
          <p>${woed.sentence}</p>
        </div>
        <div>
          <h2>synonyms</h2>
          <div>${createElement(woed.synonyms)}</div>
        </div>
        
        `

        document.getElementById("word_modal").showModal();
    }

    // secound wors ar jonno 
const displyWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
                 <div class="bg-[#DFF2Fd] col-span-full py-7 text-center rounded-lg font-bangla">
                 <img src="./assets/alert-error.png" alt="" class="mx-auto">
      <p class="text-xl pb-6 text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h4 class="text-4xl font-bold">নেক্সট Lesson এ যান</h4>
    </div>
            `;
            manegeSpinner(false)
        return;
    }
    words.forEach(word => {
        console.log(word)

        const card = document.createElement("div");
        card.innerHTML = `
       <div class="bg-white text-center py-10 px-4 space-y-4 rounded-md">
      <h1 class="font-bold text-xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h1>
      <p class="font-semibold">Meaning / pronunciation</p>
      <div class="text-2xl font-semibold font-bangla">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</div>
      <div class="flex justify-between items-center">
        <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-info"></i></button>
        <button class="btn  bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
      </div>
    </div>
        `
        wordContainer.append(card)
    });
    manegeSpinner(false)

}


// first Selection
const loadDisplayLesson = (lesson) => {
    // step -1
    const lessoneContainer = document.getElementById("lavl-container");
    lessoneContainer.innerHTML = "";
    // step -2
    for (let lessons of lesson) {
        // step - 3
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lessons.level_no}"
         onclick="loadLevelWord(${lessons.level_no})", class="btn btn-outline btn-primary px-2 lasson-btn">Lesson - ${lessons.level_no}</button>`


        lessoneContainer.append(btnDiv)
    }
}

loadLessone()

document.getElementById("btn-search").addEventListener("click", ()=>{
    removeBtn()
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue)

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        const filtterWord = allWords.filter(word => word.word.toLowerCase().includes(searchValue))

        displyWords(filtterWord)

    })
})