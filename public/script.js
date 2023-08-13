// script.js

const contentContainer = document.getElementById('content-container');
const currentPathElement = document.getElementById('current-path');
const backButton = document.getElementById('back-button');


backButton.addEventListener('click', () => {
    const currentPath = currentPathElement.textContent;
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

    // Sadece dosya klasörü içinde geri gitmeyi sağlayın
    if (parentPath.includes('files')) {
        fetchDirectoryContent(parentPath);
    } else {
        console.log('Dosya klasörü dışına çıkılamaz.');
    }
});

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
        }
        contentContainer.appendChild(itemElement);
    });
}

// İlk yükleme için başlangıç dizini içeriğini alalım.
fetchDirectoryContent('files'); // Varsayılan olarak 'files' klasörünü alıyoruz
