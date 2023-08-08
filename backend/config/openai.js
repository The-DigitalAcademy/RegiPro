const { Configuration, OpenAIApi } = require("openai");
const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (req, res, next) => {
  const { name, industry, description } = req.body

  if (!name || !industry || !description) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try  {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Write a 3000 words business plan based on the following requirements
      business name: ${name}
      industry: ${industry}
      about business: ${description} 
      return as a Javascript object
  .`,
      temperature: 0,
      max_tokens: 4000,
    });
    console.log(response.data.choices[0].text)
    generateContent('response.js', response.data.choices[0].text)
    res.status(200).json({ text: response.data.choices[0].text });
  } catch(error) {
    res.status(500).json({ message: "Internal server error." });
  }
  next()

};


const generateContent = async (logFileName, logItem) => {
  
    // const logItem = response.data.choices[0].text

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'responses' ))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'responses'))
        } else if(fs.existsSync(path.join(__dirname, '..', 'responses' ))) {
          await fsPromises.rm(path.join(__dirname, '..', 'responses'), { recursive: true, force: true })
          await fsPromises.mkdir(path.join(__dirname, '..', 'responses'))
        }

        await fsPromises.appendFile(path.join(__dirname, '..', 'responses', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }

  
}

// const logPlan = (req, res, next) => {
//     logEvents('response.js')
//     console.log(`Created`)
//     next()
// }



