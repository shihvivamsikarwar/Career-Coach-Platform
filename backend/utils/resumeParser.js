const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const parseResume = async (filePath) => {
  const ext = filePath.split(".").pop().toLowerCase();

  let text = "";

  if (ext === "pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    text = data.text;
  } else if (ext === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    text = result.value;
  }

  return text;
};

module.exports = parseResume;
