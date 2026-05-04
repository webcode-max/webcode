const fs = require('fs');
const path = require('path');

const traverse = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules') traverse(fullPath);
    } else {
      if (fullPath.match(/\.(tsx|ts|jsx|js|html|css|json|svg)$/)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let orgContent = content;
        
        content = content.replace(/#00ff97/gi, '#CCFF33');
        content = content.replace(/#01ff97/gi, '#CCFF33');

        if (content !== orgContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated color in ${fullPath}`);
        }
      }
    }
  }
};

traverse(path.join(__dirname, 'src'));
traverse(path.join(__dirname, 'public'));
console.log("Done color replacement");
