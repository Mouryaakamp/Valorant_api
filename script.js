async function getSkin() {
    try {
        let response = await fetch("https://valorant-api.com/v1/weapons/skinchromas");

        if (!response.ok) {
            console.log("No data received");
            return;
        }
        let data = await response.json();
        console.log(data);
        var name = document.getElementById("name").value;

        let skin = data.data.find(s => s.displayName.toLowerCase() == name.toLowerCase());
        console.log(skin);
        if (skin) {
            var dispname = skin.displayName;
            document.getElementById("dispname").innerHTML = dispname;
            const img = skin.fullRender;
            const imgele = document.getElementById("skinimg");
            imgele.src = img;
            imgele.style.display = "block";
        } else {
            document.getElementById("dispname").innerHTML = ("skin not found");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
