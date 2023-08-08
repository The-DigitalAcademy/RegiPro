const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const docx = require("docx");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

if (fs.existsSync(path.join(__dirname, "..", "responses"))) {
  const business = require("../responses/response.js");

  console.log(business["Business Plan"])
  // console.log(business["Business Plan"].Conclusion)
  // console.log(business["Business Plan"]["Company Overview"]["Company Goals"]["Long-Term Goals"])
}



exports.handler = async (req, res, next) => {
  const { name, industry, description } = req.body;

  if (!name || !industry || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate 3000-word business plan for ${name} in ${industry}, outlining ${description}. Return JavaScript object without variables, keeping consistent format for all plans.
     `,
      temperature: 0,
      max_tokens: 4000,
    });
    console.log(response.data.choices[0].text);
    generateContent("response.js", response.data.choices[0].text);
    res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
  next();
};

const generateContent = async (logFileName, logItem) => {
  // const logItem = response.data.choices[0].text

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "responses"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "responses"));
    } else if (fs.existsSync(path.join(__dirname, "..", "responses"))) {
      await fsPromises.rm(path.join(__dirname, "..", "responses"), {
        recursive: true,
        force: true,
      });
      await fsPromises.mkdir(path.join(__dirname, "..", "responses"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "responses", logFileName),
      `module.exports = ${logItem}`
    );
  } catch (err) {
    console.log(err);
  }
};

// const logPlan = (req, res, next) => {
//     logEvents('response.js')
//     console.log(`Created`)
//     next()
// }
