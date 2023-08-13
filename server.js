const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.static(path.join(__dirname, 'public')));

app.get('/getDirectoryContent', (req, res) => {
    const dirPath = req.query.dirPath || path.join(__dirname, 'files');
    const content = getDirectoryContent(dirPath);
    res.json({ dirPath, content });
});

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
