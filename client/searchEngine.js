let entries = [];
let percentMatch;
let threshold = 50;
let results = [];
let searchBar = document.getElementById("search");
let dataBase;

window.onload = function () 
{   
    let searchTerm = sessionStorage.getItem('searchTerm');
    let displayTerm = document.getElementById("searchTerm");
    displayTerm.textContent = `Showing all projects with \"${searchTerm}\"`; 

    fetch("projects.json")
    .then(response => response.json())
    .then(d => parseJSON(d.projects, searchTerm));
}

function parseJSON(input, s)
{
    console.log(input);
    dataBase = input;
    let entry = "";

    for(let i = 0; i < input.length; i++)
    {
        let title = input[i].title;
        let name = " Name: " + input[i].name;
        let sub = " Subject: " + input[i].subject;
        let desc = " Description: " + input[i].description;
        entry =  title + name + sub + desc;
        entries[i] = entry;
    }
    searchForTerm(s);
}


let fileContent = "";

searchBar.addEventListener("input", (e) =>
{
    //Add live search
});

searchBar.addEventListener("keydown", (e) =>
{
    if(e.key === 'Enter') searchForTerm(searchBar.value);
});

function searchForTerm(searchTerm)
{
    results = [];
    keyWords = searchTerm.split(" ");
    percentMatch = new Array(keyWords.length);

    for(let i =  0; i < entries.length; i++)
    {
        let wordIndex = 0;
        let count = 0;
        keyWords.forEach(function(word)
        {
            let wordMatch = 0;
            let bestMatch = 0;
            let index = 0;

            for(let j = 0; j < entries[i].length; j++)
            {
                if(entries[i][j].toLowerCase() == word[index].toLowerCase())
                {
                    wordMatch++;
                    if(index + 1 < word.length) index++;
                }
                else if(entries[i][j] == " " || entries[i][j] == "\n")
                {
                    bestMatch = wordMatch > bestMatch ? wordMatch : bestMatch;
                    wordMatch = 0;
                    index = 0;
                }
            }

            percentMatch[wordIndex] = bestMatch;
            wordIndex++;
            count += bestMatch;
        });
        let totalLetters = 0;
        keyWords.forEach(function(word){ totalLetters += word.length; });

        let finalScore = count / totalLetters * 100;

        if(finalScore >= threshold) results.push([dataBase[i], i]);
    }

    returnResults(results);
}

function returnResults(r)
{
    let resultsList = document.getElementById("resultsList");

    if(resultsList.childElementCount > 0)
    {
        while(resultsList.childElementCount > 0)
        {
            removeAllChildNodes(resultsList.firstChild);
            resultsList.firstChild.remove();
        } 
    }

    r.forEach(function(result)
    {
        let sections = parseResults(result[0]);

        let div = document.createElement("div");
        let heading = document.createElement("h3");
        let hBody = document.createTextNode(sections[0]);       
        heading.appendChild(hBody);
        heading.onclick = (e) => loadProject(e);
        div.appendChild(heading);

        for(let i = 1; i < 4; i++)
        {
            let paragraph = document.createElement("p");
            let pBody = document.createTextNode(sections[i]);
            paragraph.appendChild(pBody);
            
            div.appendChild(paragraph);
        }

        div.id = result[1];
        resultsList.appendChild(div);
    });
}

function removeAllChildNodes(parent) 
{
    while (parent.childElementCount > 0)   
        parent.firstChild.remove();
}

function parseResults(s)
{
    let sect = new Array(5);
    sect[0] = s.title;
    sect[1] = " Name: " + s.name;
    sect[2] = " Subject: " + s.subject;
    sect[3] = " Description: " + s.description;
    sect[4] = s.link;

    return sect;
}

function loadProject(event)
{
    sessionStorage.setItem('index', event.path[1].id)
    
    window.location.replace('projectPage.html');
}

function back()
{
    window.location.replace('home.html');
}