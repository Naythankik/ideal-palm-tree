const universalResource = (universal) => {
    return {
        id: universal._id,
        title: universal.title,
        name: universal.name,
        description: universal.description,
        createdAt: universal.createdAt,
        updatedAt: universal.updatedAt,
    };
};

module.exports = (universals) => {
    return universals.length ? universals.map(universal => universalResource(universal)) : universalResource(universals)
};
