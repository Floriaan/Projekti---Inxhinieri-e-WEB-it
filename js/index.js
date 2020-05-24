const toggleMovieEl = [
    document.getElementById("moviesWrapper"),
    document.getElementById("showMoreMovies"),
    "expand-movies"
];

const toggleNewsEl = [
    document.getElementById("newsWrapper"),
    document.getElementById("showMoreNews"),
    "expand-news"
];

function toggleWrapper(element, button, classList){
    let wrapperState = element.getAttribute("data-collapsed");
    if(wrapperState === "true"){
        element.setAttribute("data-collapsed", false);
        element.classList.add(classList);
        button.textContent = "show less"
    }
    else{
        element.setAttribute("data-collapsed", true);
        element.classList.remove(classList);
        button.textContent = "load more"
    }
}

showMoreNews.addEventListener(
    "click",
    () => {
        toggleWrapper(...toggleNewsEl);
    }
);

showMoreMovies.addEventListener(
    "click",
    function(){
        toggleWrapper(...toggleMovieEl);
    }
);



const movie = {
    movieTrailers: {
        missionImpossible: "https://www.youtube.com/embed/Ohws8y572KE",
        venom: "https://www.youtube.com/embed/u9Mv98Gr5pY",
        jurassicWorld: "https://www.youtube.com/embed/vn9mMeWcgoM",
        avengers: "https://www.youtube.com/embed/eOrNdBpGMv8"
    },
    autoplay: "?autoplay=1",
    trailer: document.getElementById("trailer"),
    trailerWrapper: document.getElementById("trailerWrapper"),

    initializeTrailer: function(button){
        let movieToPlay = button.getAttribute("data-movie-trailer");
        this.trailer.setAttribute("data-now-playing", movieToPlay);
        this.trailer.setAttribute("src", `${this.movieTrailers[movieToPlay]}${this.autoplay}`);
        this.openTrailerWrapper();
    },
    openTrailerWrapper: function(){
        movie.trailerWrapper.classList.add("display-trailer");
        document.addEventListener("keydown", (event) => {
            console.log(event.key);
            if(event.key === "Escape"){
                this.closeTrailerWrapper();
            }
        });
        this.trailerWrapper.addEventListener("click", (event) => {
            event.stopPropagation();
            let trailer = this.trailerWrapper.querySelector(".trailer");
            if(event.target !== trailer){
                this.closeTrailerWrapper();
            }
        });
    },
    closeTrailerWrapper: function(){
        movie.trailerWrapper.classList.remove("display-trailer");
        this.trailer.setAttribute("src", "");
        this.trailer.setAttribute("data-now-playing", "");
    },
};

document.querySelectorAll(".play-button").forEach(
    button => {
        button.addEventListener("click", () => {
            movie.initializeTrailer(button);
        });
    }
);

document.getElementById("closeTrailer").addEventListener("click", () => {
    movie.closeTrailerWrapper();
});

const addToListData = {
    moviesList: ["Jurassic World", "The Avengers", "Mission Impossible", "Venom"],
    addedMovies: [],
    announceWrapper: document.getElementById("announceWrapper"),
    announce: document.getElementById("announce"),
    highlight: document.getElementById("highlight"),
    itemsNo: document.getElementById("itemsNo")
};

function showAnnouncement(text, highlight = ""){
    addToListData["highlight"].textContent = highlight;
    addToListData["announce"].textContent = text;
    addToListData["announceWrapper"].classList.add("show-announcement");
    setTimeout(() => {
        addToListData["announceWrapper"].classList.remove("show-announcement");
    } ,5000);
}

let assignMovieListCounter = () => {
    if(addToListData["addedMovies"].length === 0){
        addToListData["itemsNo"].style.display = "none";
    }
    else{
        addToListData["itemsNo"].style.display = "inline-flex";
        addToListData["itemsNo"].textContent = addToListData["addedMovies"].length;
    }
};

assignMovieListCounter();

function addMovieToList(movie){
    if(addToListData["addedMovies"].includes(movie)){
        showAnnouncement("This movie has been already added to the list.");
    }
    else if(!addToListData["moviesList"].includes(movie)){
        showAnnouncement("Movie does not exist.");
    }
    else{
        showAnnouncement(" has been added to the list. Check your list for more details.", movie);
        addToListData["addedMovies"].push(movie);
        assignMovieListCounter();
    }
}

const addTolistButtons = document.querySelectorAll(".add-to-list");
addTolistButtons.forEach(button => {
    button.addEventListener("click", () => {
        addMovieToList(button.parentElement.parentElement.getAttribute("data-movie"));
    });
});