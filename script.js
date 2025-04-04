const suggestions = document.getElementById("suggestions");
const searching = document.getElementById("name");
let currentSkins = [];

searching.addEventListener("input", async () => {
    try {
        const query = searching.value.trim();
        if (query.length === 0) {
            suggestions.innerHTML = '';
            currentSkins = [];
            return;
        }

        
        suggestions.innerHTML = `<li>Loading...</li>`;

        let response = await fetch("https://valorant-api.com/v1/weapons/skinchromas");

        if (!response.ok) {
            console.log("No data received");
            return;
        }

        let data = await response.json();
        const skin = data.data.filter(item =>
            item.displayName && item.displayName.toLowerCase().includes(query.toLowerCase())
        );

        if (skin.length === 0) {
            suggestions.innerHTML = `<li class="no-click">No Skin Found!!!</li>`;
            currentSkins = [];
        } else {
            suggestions.innerHTML = skin.slice(0, 15).map((item, index) =>
                `<li data-index="${index}">${item.displayName}</li>`
            ).join('');

            currentSkins = skin;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});


searching.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); 
        if (currentSkins.length > 0) {
            const firstSkin = currentSkins[0];
            finder(firstSkin.displayName, firstSkin);
        }
    }
});


suggestions.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li || li.classList.contains("no-click")) return;

    const index = li.getAttribute("data-index");
    const selectedSkin = currentSkins[index];

    if (selectedSkin) {
        finder(selectedSkin.displayName, selectedSkin);
    }
});

function finder(name, data) {
    suggestions.innerHTML = '';
    console.log(name);
    console.log(data);

    const imgele = document.getElementById("skinimg");
    const videle = document.getElementById("vid");

    document.getElementById("dispname").innerHTML = name;

    const img = data.fullRender || "https://via.placeholder.com/300x150?text=No+Image";
    imgele.src = img;
    imgele.style.display = "block";

    const vid = data.streamedVideo;
    if (vid) {
        videle.setAttribute("src", vid);
        videle.style.display = "block";
        document.getElementById("msg").innerHTML = "You can even DOWNLOAD this video";
    } else {
        document.getElementById("msg").innerHTML = "This skin DOSE NOT have a video";
        videle.removeAttribute("src");
        videle.style.display = "none";
    }
}
