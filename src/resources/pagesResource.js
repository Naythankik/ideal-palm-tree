const cloudinary = require('../../config/cloudinary');
const universalResource = require('../resources/universalResource');

const optimizeUrl = (url) => {
    return cloudinary.url(url, {
        fetch_format: 'auto',
        quality: 'auto'
    });
}

const autoCropUrl = (url) => {
    return cloudinary.url(url, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
}

const pageResource = (page) => {
    return {
        id: page._id,
        brandName: page.brandName,
        brandDescription: page.brandDescription,
        pageImage: optimizeUrl(page.pageImage) ?? page.pageImage,
        pageCoverImage: optimizeUrl(page.pageCoverImage) ?? page.pageCoverImage,
        websiteUrl: page.websiteUrl,
        mode: page.mode,
        componentType: universalResource(page.componentType),
        industry: universalResource(page.industry),
        stacks: universalResource(page.stacks),
        style: universalResource(page.style),
        type: universalResource(page.type),
        colorPalette: page.colorPalette,
        fonts: page.fonts,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
    };
};

module.exports = (pages) => {
    return pages.length > 0 ? pages.map(page => pageResource(page)) : pageResource(pages);
};
