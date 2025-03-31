require('dotenv').config();
const Page = require("./src/models/page");
const connection = require("./config/database");
const cloudinary = require("./config/cloudinary");
const slug = require("slugify");

cloudinary.config({})
connection();

// const data = await fs.readFile('./pages.json', 'utf8');
// const jsonData = JSON.parse(data);
//
// for (const doc of jsonData) {
//     doc.id = doc.createdAt = doc.updatedAt = undefined;
//     doc.componentType = '67e822c4d08cfef0822d088c';
//     doc.industry = '67e822c4d08cfef0822d0881';
//     doc.stacks = '67e822c4d08cfef0822d0897';
//     doc.style = '67e822c4d08cfef0822d08a2';
//     doc.type = '67e822c4d08cfef0822d08ad';
//
//     // console.log(doc);
//     // return;
//     const pages = await Page.create(doc);
//     console.log(pages)
// }

const migrateFiles = async () => {
    const queryString = 'https://firebasestorage.googleapis.com/v0/b/pptdesigner-9ccaf.appspot.com/'
    const pages = await Page.find({
        pageImage: new RegExp(queryString, 'i'),
        pageCoverImage: new RegExp(queryString, 'i')
    });
    let updatedPagesCount = 0;

    for(let page of pages){
        const { pageImage, pageCoverImage, brandName } = page;

        try{
            const uploadResultImage = await cloudinary.uploader
                .upload(pageImage, {
                    public_id: `${slug(brandName)}-image-${Date.now()}`,
                    resource_type: 'image',
                    folder: 'pages'
                });

            const uploadResultCoverImage = await cloudinary.uploader
                .upload(pageCoverImage, {
                    public_id: `${slug(brandName)}-image-cover-${Date.now()}`,
                    resource_type: 'image',
                    folder: 'pages'
                });

            page.pageImage = uploadResultImage.secure_url;
            page.pageCoverImage = uploadResultCoverImage.secure_url;

            await page.save();
            updatedPagesCount++;
        }catch (err){
            console.error(err);
        }
    }

    return updatedPagesCount;
};

const runMigration = async () => {
    try {
        await migrateFiles();
        console.log('All migration\'s completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration error:', err);
        process.exit(1);
    }
};

runMigration();
