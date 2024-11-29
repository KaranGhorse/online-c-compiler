const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require('path')

const app = express();
app.use(bodyParser.json());
app.use(require("cors")());

app.post("/run", (req, res) => {
  const code = req.body.code;
  // console.log('/run',code)
  // Write user code to a file in the current directory
  const filePath = path.join(__dirname, 'code.c'); 
  fs.writeFileSync(filePath, code);

  // Use Docker to compile and run the code
  exec(
    `docker run --rm -v "C:/Users/karan/Desktop/New folder/codeEditor:/app" c-compiler`, 
    (error, stdout, stderr) => {
      if (error || stderr) {
        console.log(error)
        return res.json({ error: stderr || error.message });
      }
      console.log(stdout)
      res.json({ output: stdout });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
