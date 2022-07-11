// HTML ELEMENTS

const header = () => {
    return `
    <header>
        <form>
            <label for="date">To choose a different day than today enter it using format: YYYY-MM-DD</label>
            <input type="text" id="date" name="date">
            <button class="submit-date">Show me</button>
        </form>
    </header>
    `
};

const imageSection = (url, title, explanation) => {
    return `
    <section id="todaySection">
        <img src=${url}>
        <div class="todayDetails">
            <p>${title}</p>
            <article>${explanation}</article>
        </div>
    </section>
    `
};

const videoSection = (url, title, explanation) => {
    return `
    <section id="todaySection">
        <iframe src=${url}></iframe>
        <div class="todayDetails">
            <p>${title}</p>
            <article>${explanation}</article>
        </div>
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

const galleryPics = ({ media_type, url }) => {
    return `
    <div class="swiper-slide">
        ${(media_type === "image") ? `<img src=${url}>` : `<iframe src=${url}></iframe>`}
    </div>    
    `
};

// FUNCTIONS

// FETCH & RENDER Landing page & page when user choose dates
const getData = async (url, apiKey, date) => {
    const response = await fetch(`${url}${apiKey}&date=${date}`);
    return response.json();
};


const getRandomData = async () => {
    const response =  await fetch("https://api.nasa.gov/planetary/apod?api_key=7ju7WWOshTgaMnMDVMQCe1DITfBsMJfO5rXe61hn&count=6");
    return response.json()
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
    rootElement.insertAdjacentHTML("beforeend", videoSection(todayData.url, todayData.title, todayData.explanation));
    
    //FETCH & RENDER INFO GIVEN BY USER
    
    const getUserGivenDate = async (e) => {
        e.preventDefault();
        let classList = e.target.classList;
        if (classList.contains("submit-date")) {
            if(document.getElementById("todaySection")){
                document.getElementById("todaySection").remove();
            }
            
            let userGivenDate = document.getElementById("date").value;
            
            const userChooseDate = await getData(url, apiKey, userGivenDate);
            
            (userChooseDate.media_type === "image") ?
            rootElement.insertAdjacentHTML("afterbegin", imageSection(userChooseDate.url, userChooseDate.title, userChooseDate.explanation)) :
            rootElement.insertAdjacentHTML("afterbegin", videoSection(userChooseDate.url, userChooseDate.title, userChooseDate.explanation));
        };
    };
    
    //FETCH & RENDER Gallery section
    
    rootElement.insertAdjacentHTML("beforeend", gallerySection(randomData, galleryPics));
    
    // ADDEVENT LISTENERS
    document.addEventListener("click", getUserGivenDate);
    
    // SWIPER CONSTRUCTOR

    const swiper = new Swiper('.swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'coverflow',
        effect: 'flip',
        flipEffect: {
          slideShadows: false,
        },
    });
};
window.addEventListener("load", loadEvent);