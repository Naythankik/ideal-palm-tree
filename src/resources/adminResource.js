const adminResource = (admin) => {
    return {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        isVerified: admin.isVerified,
        verificationToken: admin.verificationToken,
        createdAt: admin.createdAt ?? null,
        updatedAt: admin.updatedAt ?? null
    }
}

module.exports = (admins) => {
    return admins.length > 1 ? admins.map(admin => adminResource(admin)) : adminResource(admins)
};
