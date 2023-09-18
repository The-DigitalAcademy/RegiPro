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
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.handler = async (req, res) => {
  const { name, industry, description } = req.body;

  if (!name || !industry || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate 3000-word business plan for ${name} in ${industry}, outlining ${description}. Return JavaScript array with section and content JSON properties, make sure the contents are covered with double qoutes , with no slashes keeping consistent format for all plans.
     `,
      temperature: 0,
      max_tokens: 4000,
    });

    let arr = response.data.choices[0].text;
    arr = arr.replace(/^"|\s*"$/g, ""); // Remove surrounding quotes
    console.log(typeof arr);
    console.log(arr);

    try {
      const cleanedJson = JSON.parse(arr);
      const cleanedJson_2 = cleanedJson.map((item) => ({
        ...item,
        content: item.content.replace(/\\"/g, " "),
      }));

      const parsedArray = cleanedJson_2.map((item) => ({
        ...item,
        content: item.content.replace(/"/g, ""),
      }));
      console.log(parsedArray);
      let allParagraphs = [];

      if (Array.isArray(parsedArray)) {
        // Add a heading with the business name and "Business Plan"
        const businessNameHeading = new Paragraph({
          text: `${name} Business Plan`,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400, // Adjust the spacing as needed (in twips, 200 = 1/4 inch)
          },
        });

        allParagraphs.push(businessNameHeading);

        parsedArray.forEach((section) => {
          const sectionParagraphs = [
            new Paragraph({
              text: section.section,
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: "", // Add an empty line between each content
            }),
          ];

          // Split the content into paragraphs based on line breaks
          const contentParagraphs = section.content
            .split("\n")
            .map((contentItem) => {
              return new Paragraph({
                text: contentItem,
                spacing: {
                  after: 200, // Adjust the spacing as needed (in twips, 200 = 1/4 inch)
                },
              });
            });

          sectionParagraphs.push(...contentParagraphs); // Add content paragraphs to the section

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

        const docUrl = uploadResult.secure_url;

        res.status(200).json({ url: docUrl });
        console.log("this is an array");
      } else {
        console.error("Parsed content is not an array.");
      }
    } catch (error) {
      console.error("Error parsing the content as JSON:", error);
      res.status(400).json({ message: "Bad Request: Invalid JSON" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
