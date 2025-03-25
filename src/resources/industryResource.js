const industryResource = (industry) => {
    return {
        id: industry._id,
        title: industry.title,
        name: industry.name,
        description: industry.description,
        createdAt: industry.createdAt ?? null,
        updatedAt: industry.updatedAt ?? null,
    };
};

module.exports = (industries) => {
    return industries.length ? industries.map(industry => industryResource(industry)) : industryResource(industries)
};
