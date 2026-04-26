const csv = require("csv-parser");
const fs = require("fs");

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          title: data["Course Name"],
          description: data["Overview/Description"],
          category: data["Discipline/Major"],
          instructor: data["Professor Name"],
          duration: data["Duration (Months)"],
        });
      })
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

module.exports = parseCSV;