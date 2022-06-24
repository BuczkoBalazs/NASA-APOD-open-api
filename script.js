// HTML ELEMENTS

const header = () => {
    return `
    <form>
        <label for="date">Write a date in format YYYY-MM-DD</label>
        <input type="text" id="date" name="date">
        <button class="submit-date">Show me</button>
    </form>
    `
}

const imageSection = (url, title, explanation) => {
    return `
    <section id="todaySection">
        <img src=${url}>
        <p>Title: ${title}</p>
        <article>Explanation: ${explanation}</article>
    </section>
    `
};

const videoSection = (url, title, explanation) => {
    return `
    <section id="todaySection">
        <iframe src=${url}></iframe>
        <p>Title: ${title}</p>
        <article>Explanation: ${explanation}</article>
    </section>
    `
};

const gallerySection = (imageArray, component) => {
    return `
    <section id="gallery">
        <div class="swiper">
            <div class="swiper-wrapper">
                ${imageArray.map((image) => component(image)).join("")}
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </section>
    `
};

const galleryImages = ({ url }) => {
    return `
    <div class="swiper-slide">
        <img src=${url}>
    </div>    
    `
}

// FUNCTIONS

// FETCH & RENDER Landing page & page when user choose dates
const getData = async (url, apiKey, date) => {
    const response = await fetch(`${url}${apiKey}&date=${date}`);
    return response.json();
};


const getRandomData = async () => {
    const response =  await fetch("https://api.nasa.gov/planetary/apod?api_key=7ju7WWOshTgaMnMDVMQCe1DITfBsMJfO5rXe61hn&count=3");
    return response.json();
};


// LOADEVENT

const loadEvent = async () => {
    
    // VARIABLES
    const rootElement = document.getElementById("root");
    const url = "https://api.nasa.gov/planetary/apod";
    const apiKey = "?api_key=7ju7WWOshTgaMnMDVMQCe1DITfBsMJfO5rXe61hn";
    let today = new Date().toISOString().slice(0, 10);
    const todayData = await getData(url, apiKey, today);
    const randomData = await getRandomData();
    console.log(randomData);
    
    // RENDER HEADER
    rootElement.insertAdjacentHTML("beforeend", header());
    
    // FETCH & RENDER Landing page
    
    (todayData.media_type === "image") ?
    rootElement.insertAdjacentHTML("beforeend", imageSection(todayData.url, todayData.title, todayData.explanation)) :
    rootElement.insertAdjacentHTML("beforeend", videoSection(todayData.url, todayData.title, todayData.explanation))
    
    //FETCH & RENDER INFO GIVEN BY USER
    
    const getUserGivenDate = async (e) => {
        e.preventDefault();
        let classList = e.target.classList;
        if (classList.contains("submit-date")) {
            if(document.getElementById("todaySection")){
                document.getElementById("todaySection").remove();
            }
            
            let userGivenDate = document.getElementById("date").value
            
            const userChooseDate = await getData(url, apiKey, userGivenDate);
            
            (userChooseDate.media_type === "image") ?
            rootElement.insertAdjacentHTML("beforebegin", imageSection(userChooseDate.url, userChooseDate.title, userChooseDate.explanation)) :
            rootElement.insertAdjacentHTML("beforebegin", videoSection(userChooseDate.url, userChooseDate.title, userChooseDate.explanation))
        }
    };
    
    //FETCH & RENDER Gallery section
    
    if (randomData.map((image) => image.media_type === "image")) rootElement.insertAdjacentHTML("beforeend", gallerySection(randomData, galleryImages))
    
    // const swiper = new Swiper('.swiper');
    
    // ADDEVENT LISTENERS
    document.addEventListener("click", getUserGivenDate);
    
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 2000,
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });
};
window.addEventListener("load", loadEvent);