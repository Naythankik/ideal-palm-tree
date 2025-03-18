const subscriberResource = (subscriber) => {
    return {
        id: subscriber._id,
        email: subscriber.email,
        createdAt: subscriber.createdAt ?? null,
        updatedAt: subscriber.updatedAt ?? null,
    };
};

module.exports = (subscribers) => {
    return subscribers.map(subscriber => subscriberResource(subscriber));
};
