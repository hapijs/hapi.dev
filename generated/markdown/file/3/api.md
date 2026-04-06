## Methods

### `uniqueFilename(path, extension)`

Generate a random file name within a given path and optional extension.

- `path` - The file path within to generate a temporary file.
- `extension` - File extension.

```javascript
const File = require('@hapi/file');

const fileName = File.uniqueFilename('/root', '.txt'); //results in 'C:\root\1580115599192-8540-61d96458412e09d9.txt'
```
