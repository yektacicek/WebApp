# File Browser Script

This is the JavaScript code for your File Browser application. It handles the functionality to navigate through directories, display their contents, and interact with files.

## Event Listener for Back Button

This part of the code adds an event listener to the "Back" button. When the user clicks the button, it determines the current directory path and allows returning only within the "files" folder.

```javascript
// This function represents an event listener that specifies what happens when the user clicks the "Back" button.
backButton.addEventListener('click', () => {
    const currentPath = currentPathElement.textContent;
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));

    // Allows the return only within the "files" folder.
    if (parentPath.includes('files')) {
        fetchDirectoryContent(parentPath);
    } else {
        console.log('Cannot go beyond the "files" folder.');
    }
});
