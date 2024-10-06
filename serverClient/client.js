async function postData(url, searchTopic) {
    skeletonLoader();
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchTopic)
    });

    return await response.json();
}

function skeletonLoader() {
    const mainDivSelector = document.getElementById("mainDiv");
    mainDivSelector.innerHTML = "";
    
    for (let i = 0; i < 5; i++){
        const childDivElement = document.createElement("div");
        childDivElement.innerHTML = `<br>
            <div class="search-result-element">       
                <div class="flex-container">
                    <div> <a href="#" class="icon skeleton"> <img src="#"> </a> </div>
                    <div>
                        <div class="skeleton skeleton-domain">  </div>
                        <div class="skeleton skeleton-link">  </div>
                    </div>
                </div>
                <div class="heading-div skeleton skeleton-heading">
                    
                </div>                  
                <div class="description skeleton skeleton-description">                

                </div>            
                <div class="description skeleton skeleton-description">                

                </div>
            </div>
        `;
        mainDivSelector.appendChild(childDivElement);
    }     
}

document.getElementById("searchBtn").onclick = function() {
    const searchTopic = document.getElementById("inputBox").value;

    postData("http://localhost:8080/submit",{ searchTopic:searchTopic})
     .then(searchResult => {
        populateMainDiv(searchResult)
     })
     .catch(error => {
        console.error("Error: ", error);
     });
};

/*const searchResult = [
    {
        "link": "https://www.javatpoint.com/array-in-java",
        "heading": "heading1",
        "description": "description1"
    },
    {
        "link": "https://www.geeksforgeeks.org/what-is-array",
        "heading": "heading2",
        "description": "description2"
    },
    {
        "link": "https://www.w3schools.com/java",
        "heading": "heading3",
        "description": "description3"
    }
]*/

function populateMainDiv(searchResult) {
    const mainDivSelector = document.getElementById("mainDiv");
    mainDivSelector.innerHTML = "";
    searchResult.map((item) => {
        title=item['title']
        link=item['link']
        desc = item['desc']
        const url = new URL(Object.values(item)[1]);
        const domainParts = url.hostname.split('.');

        const baseURL = url.origin;
        //console.log(baseURL);
        /*const fullURL = new URL("favicon.ico", baseURL);
        console.log(fullURL);
        const faviconURL = fullURL.toString();
        console.log(faviconURL);*/

        const domain = baseURL.split("/");
        const googleFaviconGrabber = "https://www.google.com/s2/favicons?domain=";
        //console.log(googleFaviconGrabber+domain[2]);

        const childDivElement = document.createElement("div");

        /*childDivElement.innerHTML = `<br>

            <a href="${Object.values(item)[0]}">            
            <div style="background: url(${googleFaviconGrabber+domain[2]}) center left no-repeat; padding: 5px 5px 5px 30px; text-decoration: none; font-color: black;">
            ${domainParts[1]} <br>
            ${Object.values(item)[0]}
            </div>
            <h5>${Object.values(item)[1]}</h5>
            </a>
            ${Object.values(item)[2]}
        `;*/

        childDivElement.innerHTML = `<br>
            <div class="search-result-element">       
                <div class="flex-container">
                    <div> <a href="${link}" class="icon"> <img src="${googleFaviconGrabber+domain[2]}"> </a> </div>
                    <div>
                        <div> <a href="${link}" class="domain"> ${domainParts[1]} </a> </div>
                        <div> <a href="${link}" class="link"> ${link} </a> </div>
                    </div>
                </div>
                <div class="heading-div">
                    <a href="${link}" class="heading"> ${title} </a>
                </div>                  
                <div class="description">   
                     ${desc.substring(0, 225) + " ..."}
                </div>
            </div>
        `;

        mainDivSelector.appendChild(childDivElement);
    })    
}