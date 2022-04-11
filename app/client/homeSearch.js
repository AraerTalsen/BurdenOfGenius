let searchBar = document.getElementById("search");

searchBar.addEventListener("keydown", (e) =>
{
    if(e.key === 'Enter')
    {
        var s = document.getElementById('search').value;

        sessionStorage.setItem('searchTerm', s)
        window.location.replace("resultsPage.html");
    }
});

function newProject()
{
    window.location.replace("createProject.html");
}