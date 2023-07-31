const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function generatePrompt(animal) {
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
module.exports =  { openai, generatePrompt };
