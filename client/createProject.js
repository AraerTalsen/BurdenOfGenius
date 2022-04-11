function createProject()
{
    let title = document.getElementById("title");
    let name = document.getElementById("name");
    let sub = document.getElementById("subject");
    let credits = document.getElementById("credits");
    let preReq = document.getElementById("prerequisites");
    let adReq = document.getElementById("adReq");
    let desc = document.getElementById("description");
    //let files = document.getElementById("supDoc");

    let project = 
    {
        "title" : title.value,
        "name" : name.value,
        "subject" : sub.value,
        "credits" : credits.value,
        "prerequisites" : preReq.value,
        "additionalReqirements" : adReq.value,
        "description" : desc.value
    }

    fetch('http://localhost:3000/test',
    {
        method : 'POST',
        headers: {'Content-Type' : 'application/json'},
        body : JSON.stringify(project)
    })
    .then(response => response.json())
    .then(data => 
    {
        console.log(data)
        window.location.replace("home.html");
    });
    
}