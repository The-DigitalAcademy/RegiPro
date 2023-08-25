const { Configuration, OpenAIApi } = require("openai");
const cloudinary = require("cloudinary");
const docx = require("docx");
const {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  UnderlineType,
} = docx;

let sectionNumber = 1; // Initialize section numbering

const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dfyinxihm",
  api_key: "118732527716991",
  api_secret: "8CbQQIxezNSmI4YbjmvPFthyD4I",
});

exports.handler = async (req, res) => {
  const { name, industry, description } = req.body;

  if (!name || !industry || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate 3000-word business plan for ${name} in ${industry}, outlining ${description}. Return JavaScript array with section and content JSON properties, keeping consistent format for all plans.
     `,
      temperature: 0,
      max_tokens: 4000,
    });

    let arr = response.data.choices[0].text;
    arr = arr.replace(/^"|\s*"$/g, ""); // Remove surrounding quotes
    console.log(typeof arr);

    try {
      const parsedArray = JSON.parse(arr);
      let allParagraphs = [];

      if (Array.isArray(parsedArray)) {
        parsedArray.forEach((section) => {
          const sectionParagraphs = [
            new Paragraph({
              text: `${sectionNumber}. ${section.section}`, // Add numbering to section title

              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: '',  // Add an empty line between each content
            })
          ];
    
          Object.entries(section.content).forEach(([key, value]) => {
            sectionParagraphs.push(
             
              new Paragraph({
                text: value,
              }),
              new Paragraph({
                text: '',  // Add an empty line between each content
              })
            );
          });
          sectionNumber++; // Increment section numbering
          allParagraphs = allParagraphs.concat(sectionParagraphs);
        });

        const doc = new Document({
          // ... (document settings and styles)
          sections: [
            {
              children: allParagraphs,
            },
          ],
        });

        const buffer = await Packer.toBuffer(doc);

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { resource_type: "raw" },
            (error, result) => {
              if (error) {
                console.error("Error uploading to Cloudinary:", error);
                reject(error);
              }
              resolve(result);
            }
          );

          uploadStream.end(buffer);
        });

        const imageUrl = uploadResult.secure_url;

        res.status(200).json({ url: imageUrl });
        console.log("this is an array");
      } else {
        console.error("Parsed content is not an array.");
      }
    } catch (error) {
      console.error("Error parsing the content as JSON:", error);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
