let pageContent;

window.onload = function () 
{
    fetch("projects.json")
    .then(response => response.json())
    .then(d =>
    {
        pageContent = d.projects[sessionStorage.getItem('index')];
        populatePage();
    });
}

function populatePage()
{
    let title = document.getElementById("title");
    let name = document.getElementById("name");
    let subject = document.getElementById("subject");
    let credits = document.getElementById("credits");
    let prerequisites = document.getElementById("prerequisites");
    let adReq = document.getElementById("adReq");
    let description = document.getElementById("description");
 
    title.textContent = pageContent.title;
    name.textContent = pageContent.name;
    subject.textContent = pageContent.subject;
    credits.textContent = pageContent.credits;
    prerequisites.textContent = pageContent.prerequisites;
    adReq.textContent = pageContent.additionalReqirements;
    description.textContent = pageContent.description;
}

function back()
{
    window.location.replace('resultsPage.html');
}