const pageResource = (page) => {
    return {
        id: page._id,
        brandName: page.brandName,
        brandDescription: page.description,
        pageImage: page.pageImage,
        pageCoverImage: page.pageCoverImage,
        websiteUrl: page.websiteUrl,
        mode: page.mode,
        componentType: page.componentType,
        industry: page.industry,
        stack: page.stack,
        style: page.style,
        colorPalette: page.colorPalette,
        createdAt: page.createdAt ?? null,
        updatedAt: page.updatedAt ?? null,
    };
};

module.exports = (pages) => {
    return pages.length ? pages.map(page => pageResource(page)) : pageResource(pages);
};
