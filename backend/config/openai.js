const { Configuration, OpenAIApi } = require("openai")
const configuration = new Configuration({
  apiKey: process.env.OPENAI
})
const openai = new OpenAIApi(configuration)

exports.handler = async (req, res) => {
    if (typeof req.body.prompt === "string") {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: req.body.prompt,
          temperature: 0,
          max_tokens: 1000
        })

        res.status(200).json({ text: response.data.choices[0].text })
    } else {
        res.status(200).json({ text: "Invalid prompt provided." })
    }    
        }

        function generatePrompt(animal) {
            const capitalizedAnimal =
              animal[0].toUpperCase() + animal.slice(1).toLowerCase();
            return `Suggest three names for an animal that is a superhero.
          
          Animal: Cat
          Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
          Animal: Dog
          Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
          Animal: ${capitalizedAnimal}
          Names:`;
          }
  
        
      