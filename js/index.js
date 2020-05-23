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
        jurassicPark: null
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