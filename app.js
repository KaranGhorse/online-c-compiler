const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require('path')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(require("cors")());

app.get("/run", (req, res) => {
  const hey = "Hello mr. Dev";
   res.json({ hey });
});

app.post("/run", (req, res) => {
  const code = req.body.code;
  // console.log('/run',code)
  // Write user code to a file in the current directory
  const filePath = path.join(__dirname, 'code.c'); 
  fs.writeFileSync(filePath, code);

  // Use Docker to compile and run the code
  exec(
     `docker run --rm -v "$(pwd):/app" c-compiler`, 
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
