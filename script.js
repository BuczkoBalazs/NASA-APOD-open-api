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

const todayImageSection = (url, title, explanation) => {
    return `
    <section id="todaySection">
        <img src=${url}>
        <p>Title: ${title}</p>
        <article>Explanation: ${explanation}</article>
    </section>
    `
};

const todayVideoSection = (url, title, explanation) => {
    return `
    <section id="todaySection">
        <iframe src=${url}></iframe>
        <p>Title: ${title}</p>
        <article>Explanation: ${explanation}</article>
    </section>
    `
};

const gallery = (url) => {
    return `
    <section id="gallery">
        <image src=${url}>
    </section>
    `
}

// FUNCTIONS

// FETCH & RENDER
const getData = async (url, apiKey, date) => {
    const rootElement = document.getElementById("root");

    const response = await fetch(`${url}${apiKey}&date=${date}`);
    const data = await response.json();
    return (data.media_type === "image") ? rootElement.insertAdjacentHTML("beforeend", todayImageSection(data.url, data.title, data.explanation)) : rootElement.insertAdjacentHTML("beforeend", todayVideoSection(data.url, data.title, data.explanation))
};

// LOADEVENT

const loadEvent = () => {

    // VARIABLES
    const rootElement = document.getElementById("root");
    const url = "https://api.nasa.gov/planetary/apod";
    const apiKey = "?api_key=7ju7WWOshTgaMnMDVMQCe1DITfBsMJfO5rXe61hn";
    let today = new Date().toISOString().slice(0, 10);
    
    // RENDER HEADER
    rootElement.insertAdjacentHTML("beforeend", header());

    // FETCH & RENDER TODAY'S INFO
    getData(url, apiKey, today)

    //FETCH & RENDER INFO GIVEN BY USER

    const getUserGivenDate = (e) => {
        e.preventDefault();
        let classList = e.target.classList;
        if (classList.contains("submit-date")) {
            if(document.getElementById("todaySection")){
                document.getElementById("todaySection").remove();
            }

            let date = document.getElementById("date").value
     
            getData(url, apiKey, date)
        }
    };
    
    // ADDEVENT LISTENERS
    document.addEventListener("click", getUserGivenDate);
    
};
window.addEventListener("load", loadEvent);