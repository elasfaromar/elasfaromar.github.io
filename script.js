// Function to fetch content from a file
function fetchFile(filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            return response.text();
        });
}

// Function to update the skills section in the HTML
function updateSkills(filePath, containerId) {
    fetchFile(filePath)
        .then(data => {
            const skills = data.split('\n').map(skill => skill.trim()).filter(skill => skill);
            const container = document.getElementById(containerId);
            container.innerHTML = skills.map(skill => `
                <div class="skill">
                    <h2>${skill}</h2>
                    <img src="images/${skill.toLowerCase().replace(/[^a-z0-9]/g, '')}.png" alt="${skill}">
                </div>
            `).join('');
        })
        .catch(error => console.error(error));
}

// Function to update the projects section in the HTML
function updateProjects(filePath, containerId) {
    fetchFile(filePath)
        .then(data => {
            const projects = data.split('\n').map(line => line.trim()).filter(line => line);
            const container = document.getElementById(containerId);
            container.innerHTML = projects.map(project => {
                // Split the project data based on the pipe (|) character
                const [title, technologies, description, image, link] = project.split('|');
                
                // If no link is provided, don't add the anchor tag
                const projectLink = link ? `<a href="${link}" target="_blank">` : '';
                const closingTag = link ? `</a>` : '';

                return `
                    ${projectLink}
                        <div class="project">
                            <h2>${title}</h2>
                            <img src="images/${image}" alt="${title}">
                            <p><strong>Technology:</strong> ${technologies}</p>
                            <p>${description}</p>
                        </div>
                    ${closingTag}
                `;
            }).join('');
        })
        .catch(error => console.error(error));
}

// Call the function to update the projects section
updateProjects('projects.txt', 'projects');

// Update Languages
updateSkills('languages.txt', 'languages-list');

// Update Tools
updateSkills('tools.txt', 'tools-list');
