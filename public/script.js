// script.js

const contentContainer = document.getElementById('content-container');
const currentPathElement = document.getElementById('current-path');
const backButton = document.getElementById('back-button');

// This function represents an event listener that specifies what happens when the user clicks the "Back" button.
backButton.addEventListener('click', () => {
    const currentPath = currentPathElement.textContent;
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

    // Allows the return only within the file folder.
    if (parentPath.includes('files')) {
        fetchDirectoryContent(parentPath);
    } else {
        console.log('Dosya klasörü dışına çıkılamaz.');
    }
});

// This function is used to retrieve the contents of a specified directory from the server.
function fetchDirectoryContent(dirPath) {
    fetch(`/getDirectoryContent?dirPath=${encodeURIComponent(dirPath)}`)
        .then(response => response.json())
        .then(data => {
            currentPathElement.textContent = data.dirPath;
            showDirectoryContent(data.content);
        })
        .catch(error => console.error('Error fetching directory content:', error));

}

function showDirectoryContent(content) {
    contentContainer.innerHTML = '';
    content.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = item.name;
        if (item.type === 'directory') {
            itemElement.classList.add('directory');
            itemElement.addEventListener('click', () => {
                fetchDirectoryContent(item.path);
            });
        } else {
            itemElement.classList.add('file');
            itemElement.addEventListener('click', () => {
                // Actions to preview or download the file
                window.location.href = item.path;
            });
        }
        contentContainer.appendChild(itemElement);
    });
}

// 'files' folder by default
fetchDirectoryContent('files'); 
