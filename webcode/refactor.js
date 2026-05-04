const fs = require('fs');
const path = require('path');

const traverse = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules') traverse(fullPath);
    } else {
      if (fullPath.match(/\.(tsx|ts|jsx|js|html|css|json|md)$/)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let orgContent = content;
        
        // replace Aivora with Webcode
        content = content.replace(/Aivora/g, 'Webcode');
        content = content.replace(/aivora/g, 'webcode');
        content = content.replace(/AIVORA/g, 'WEBCODE');

        // replace specific emails
        content = content.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|net|org|co|uk|us)/gi, 'admin@webcode.id');

        // replace specific phone numbers
        content = content.replace(/\+1\s*\(\d{3}\)\s*\d{3}-\d{4}/g, '087733564750');
        content = content.replace(/\+\(1\)\s*\d{3}\s*\d{3}\s*\d{4}/g, '087733564750');
        content = content.replace(/\+112304528597/g, '087733564750');
        content = content.replace(/\+1\s*800\s*\d{3}\s*\d{3}\s*\d{3}/g, '087733564750');

        if (content !== orgContent) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
};

traverse(path.join(__dirname, 'src'));
traverse(path.join(__dirname, 'public'));
console.log("Done");
