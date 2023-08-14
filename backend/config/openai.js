const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
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
  cloud_name: "dfyinxihm",
  api_key: "118732527716991",
  api_secret: "8CbQQIxezNSmI4YbjmvPFthyD4I",
});

if (fs.existsSync(path.join(__dirname, "..", "responses"))) {
  const business = require("../responses/response.js");

  console.log(business["Business Plan"]);
  // console.log(business["Business Plan"].Conclusion)
  // console.log(business["Business Plan"]["Company Overview"]["Company Goals"]["Long-Term Goals"])

  const generateWordDoc = async () => {
    let allParagraphs = [];

    for (let i = 0; i < business.length; i++) {
      const sectionParagraphs = [
        new Paragraph({
          text: business[i].section,
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          text: business[i].content,
        }),
        // ... (other paragraphs and content for the section)
      ];

      allParagraphs = allParagraphs.concat(sectionParagraphs);
    }

    const doc = new Document({
      // ... (document settings and styles)
      sections: [
        {
          children: allParagraphs,
        },
      ],
    });

    // for (let i = 0; i < business.length; i++) {
    // const doc = new Document({
    //   // sections: [
    //   //   {
    //   //     properties: {},
    //   //     children: [
    //   //       new Paragraph({
    //   //         children: [
    //   //           new TextRun({
    //   //             text: business["Business Plan"],
    //   //             bold: true,
    //   //           }),
    //   //           new TextRun({
    //   //             text: "\tGithub is the best",
    //   //             bold: true,
    //   //           }),
    //   //         ],
    //   //       }),
    //   //     ],
    //   //   },
    //   // ],

    //   creator: "RegiPro Software",
    //   title: "Sample Business Document",
    //   description: "Generated business plan",
    //   styles: {
    //     paragraphStyles: [
    //       {
    //         id: "Heading1",
    //         name: "Heading 1",
    //         basedOn: "Normal",
    //         next: "Normal",
    //         quickFormat: true,
    //         run: {
    //           size: 28,
    //           bold: true,
    //           italics: true,
    //           color: "red",
    //         },
    //         paragraph: {
    //           spacing: {
    //             after: 120,
    //           },
    //         },
    //       },
    //       {
    //         id: "Heading2",
    //         name: "Heading 2",
    //         basedOn: "Normal",
    //         next: "Normal",
    //         quickFormat: true,
    //         run: {
    //           size: 26,
    //           bold: true,
    //           underline: {
    //             type: UnderlineType.DOUBLE,
    //             color: "FF0000",
    //           },
    //         },
    //         paragraph: {
    //           spacing: {
    //             before: 240,
    //             after: 120,
    //           },
    //         },
    //       },
    //       {
    //         id: "aside",
    //         name: "Aside",
    //         basedOn: "Normal",
    //         next: "Normal",
    //         run: {
    //           color: "999999",
    //           italics: true,
    //         },
    //         paragraph: {
    //           indent: {
    //             left: 720,
    //           },
    //           spacing: {
    //             line: 276,
    //           },
    //         },
    //       },
    //       {
    //         id: "wellSpaced",
    //         name: "Well Spaced",
    //         basedOn: "Normal",
    //         quickFormat: true,
    //         paragraph: {
    //           spacing: {
    //             line: 276,
    //             before: 20 * 72 * 0.1,
    //             after: 20 * 72 * 0.05,
    //           },
    //         },
    //       },
    //       {
    //         id: "ListParagraph",
    //         name: "List Paragraph",
    //         basedOn: "Normal",
    //         quickFormat: true,
    //       },
    //     ],
    //   },
    //   numbering: {
    //     config: [
    //       {
    //         reference: "my-crazy-numbering",
    //         levels: [
    //           {
    //             level: 0,
    //             format: "lowerLetter",
    //             text: "%1)",
    //             alignment: AlignmentType.LEFT,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   sections: [
    //     {
    //       children: [
    //         new Paragraph({
    //           text: "Test heading1, bold and italicized",
    //           heading: HeadingLevel.HEADING_1,
    //         }),
    //         new Paragraph({
    //           text: business[i].section,
    //           heading: HeadingLevel.HEADING_2,
    //         }),
    //         new Paragraph({
    //           text: business[i].content,
    //         }),
    //         new Paragraph({
    //           text: "Option1",
    //           numbering: {
    //             reference: "my-crazy-numbering",
    //             level: 0,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Option5 -- override 2 to 5",
    //           numbering: {
    //             reference: "my-crazy-numbering",
    //             level: 0,
    //           },
    //         }),
    //         new Paragraph({
    //           text: "Option3",
    //           numbering: {
    //             reference: "my-crazy-numbering",
    //             level: 0,
    //           },
    //         }),
    //         new Paragraph({
    //           children: [
    //             new TextRun({
    //               text: "Some monospaced content",
    //               font: {
    //                 name: "Monospace",
    //               },
    //             }),
    //           ],
    //         }),
    //         new Paragraph({
    //           text: "An aside, in light gray italics and indented",
    //           style: "aside",
    //         }),
    //         new Paragraph({
    //           text: "This is normal, but well-spaced text",
    //           style: "wellSpaced",
    //         }),
    //         new Paragraph({
    //           children: [
    //             new TextRun({
    //               text: "This is a bold run,",
    //               bold: true,
    //             }),
    //             new TextRun(" switching to normal "),
    //             new TextRun({
    //               text: "and then underlined ",
    //               underline: {},
    //             }),
    //             new TextRun({
    //               text: "and back to normal.",
    //             }),
    //           ],
    //         }),
    //       ],
    //     },
    //   ],
    // });

    try {
      const buffer = await Packer.toBuffer(doc);

      // Upload to Cloudinary
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "raw" }, (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            throw error;
          }
          console.log(result.url);
          return result.url;
        })
        .end(buffer);
    } catch (error) {
      console.error("Error generating DOCX:", error);
      throw error;
    }
  };

  generateWordDoc();
}

exports.handler = async (req, res, next) => {
  const { name, industry, description } = req.body;

  if (!name || !industry || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate 3000-word business plan for ${name} in ${industry}, outlining ${description}. Return JavaScript array with section and content object properties, keeping consistent format for all plans.
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
