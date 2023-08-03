const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (req, res) => {
  const { name, industry, description } = req.body

  if (!name || !industry || !description) {
    return res.status(400).json({ message: 'All fields are required' })
  }
  try  {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0,
      max_tokens: 4000,
    });

    res.status(200).json({ text: response.data.choices[0].text });
  } catch(error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

function generatePrompt(name, industry, description) {
  return `Write a 3000 words business plan based on the following requirements
        business name: ${name}
        industry: ${industry}
        about business: ${description}
    .`;
}
