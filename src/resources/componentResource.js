const componentResource = (component) => {
    return {
        id: component._id,
        title: component.title,
        name: component.name,
        description: component.description,
        createdAt: component.createdAt ?? null,
        updatedAt: component.updatedAt ?? null,
    };
};

module.exports = (components) => {
    return components.length ? components.map(component => componentResource(component)) : componentResource(components)
};
