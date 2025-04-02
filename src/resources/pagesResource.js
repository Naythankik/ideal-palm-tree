const cloudinary = require('../../config/cloudinary');

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
        componentType: page.componentType,
        industry: page.industry,
        stack: page.stacks,
        style: page.style,
        type: page.type,
        colorPalette: page.colorPalette,
        createdAt: page.createdAt ?? null,
        updatedAt: page.updatedAt ?? null,
    };
};

module.exports = (pages) => {
    return pages.length > 1 ? pages.map(page => pageResource(page)) : pageResource(pages);
};
