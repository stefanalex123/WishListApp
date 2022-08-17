import jwt from "jsonwebtoken";

export const jwtMiddleware = async (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing JWT_SECRET env var')
    }

    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(403).send("Unauthorized")
        return
    }

    const token = authHeader.split('Bearer ')[1]
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        try {
            if (err) {
                res.status(403).send("Invalid token");
            } else {
                req.auth = decoded;
                next()
            }
        } catch (e) {
            res.status(422).send("Invalid token");
        }
    })
}