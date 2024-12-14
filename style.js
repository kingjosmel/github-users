const btn = document.getElementById('btn');
const textDiv = document.getElementById('text-div');
const img = document.getElementById('img');
const imgDiv = document.getElementById('img-div');
let currentIndex = 0;
let users = [];

// Fetch the users from the API

function getUsers() {
    fetch('https://api.github.com/users')
        .then(res => res.json())
        .then(data => {
            users = data;
            addUser();
        })
        .catch(err => console.log(err)); // Log any fetch errors
}

// Function to display the current user and cycle to the next

function addUser() {
    if (users.length === 0) {
        // If users array is empty, fetch the users
        getUsers();
        return;
    }

    const user = users[currentIndex]; // Get the current user object
    currentIndex = (currentIndex + 1) % users.length; // Increment index and loop back if at the end

    // Clear the previous content in `textDiv`
    textDiv.innerHTML = '';

    img.setAttribute('src', `${user.avatar_url}`)




    // Creating a new div for user details and appending the new div

    const div = document.createElement('div');
    textDiv.appendChild(div);

    // Fill the div with the current user's details

    div.innerHTML = `
        <p>name: <span>${user.login}</span></p>
        <p>site_admin: <span>${user.site_admin}</span></p>
        <p>type: <span>${user.type}</span></p>
        <p>repoUrl: <span>${user.repos_url}</span></p>
    `;
}

// Add an event listener to the button

btn.addEventListener('click', addUser);

// Fetch the initial user data when the page loads

getUsers();
