function returnResults()
{
    let div = document.createElement("div");
    let heading = document.createElement("h3");
    let hBody = document.createTextNode("Tutorix");
    heading.appendChild(hBody);
    let paragraph = document.createElement("p");
    let pBody = document.createTextNode("is the best e-learning platform");
    paragraph.appendChild(pBody);
    div.appendChild(heading);
    div.appendChild(paragraph);
    let resultsList = document.getElementById("resultsList");
    resultsList.appendChild(div);

}

returnResults();