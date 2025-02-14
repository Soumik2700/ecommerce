import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Model/user.model.js";

export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        // Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        //Check existing user   
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "A user already exist wit this email!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "Registration sucessful!"
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error!",
            error: err.message
        })
    }
}

//Function declairation for login
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        //Validate fields
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required!"
            })
        }

        //Check the email is authorized or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email!"
            })
        }

        //Password validation
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        //generate token
        const token = jwt.sign({ userId: user._id }, "my_very_secure_secret_key", { expiresIn: "10m" });

        res.status(200).json({ message: "Login sucessful!", token })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error!",
            error: err.message
        })
    }
}

export function authenticateUser(req, res, next) {
    const token = req.header("Authorization")
    // console.log(token)

    //Tooken validation
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided!" });
    }

    try {

        //Decode the token
        const decoded = jwt.verify(token, "my_very_secure_secret_key");
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token!" });
    }
}