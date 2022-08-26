import jwt from "jsonwebtoken";

export const geneateAuthToken = (id) => {
    return jwt.sign(
        { userId: id},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
}