const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Definitions for MIME types
const mimeTypes = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
};

// Express middleware to serve static files
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        const ext = path.extname(filePath);
        const mimeType = mimeTypes[ext];
        if (mimeType) {
            res.setHeader('Content-Type', mimeType);
        }
    }
}));

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/getDirectoryContent', (req, res) => {
    const dirPath = req.query.dirPath || path.join(__dirname, 'files');
    const content = getDirectoryContent(dirPath);
    res.json({ dirPath, content });
});

// Takes the contents of a given array, traverses each element to get its name, type, and full path, and returns this information as an array.
function getDirectoryContent(dirPath) {
    const fs = require('fs');
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    return items.map(item => {
        return {
            name: item.name,
            type: item.isDirectory() ? 'directory' : 'file',
            path: path.join(dirPath, item.name)
        };
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
