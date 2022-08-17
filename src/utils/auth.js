import jwt from "jsonwebtoken";

export const geneateAuthToken = (id) => {
    return jwt.sign(
        { userid: id},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
}