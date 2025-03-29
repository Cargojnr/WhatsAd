import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
// import nodemailer from 'nodemailer';
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import os, { type } from "os";
import { timeStamp } from "console";
// import { WebSocketServer } from "ws";
import fs from "fs"
import http from "http"
// import https from "https"
import multer from "multer";

// const options = {
//     key: fs.readFileSync("./key.pem"),  
//     cert: fs.readFileSync("./cert.pem")
// };


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Store the uploaded files in the "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
    },
  });

  const upload = multer({ storage });


const app = express();
const server = http.createServer(app);
const port = process.env.port || 5000;
const pgSessionStore = pgSession(session);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow frontend connections
        methods: ["GET", "POST"]
    }
});
// const wss = new WebSocket.Server({port});
const saltRounds = 10;
env.config();

const db = new pg.Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // connectionString: process.env.DATABASE_URL,
    //   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});



// Get the local IP address
const getLocalIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const ifaceName in interfaces) {
        for (const iface of interfaces[ifaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address; // Return the first non-internal IPv4 address
            }
        }
    }
    return 'localhost'; // Fallback to localhost if no address is found
};

// Load SSL Certificate and Key




db.connect()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Database connection error:", err.stack);
    });


app.use(express.static("public"));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
    session({
        store: new pgSessionStore({
            pool: db,
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
            sameSite: 'strict'
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());



const activeUsers = new Set();
// let connectedUsers = new Set();

io.on('connection', (socket) => {

    const userId = socket.handshake.query.userId;

    if (userId) {
        console.log(`User ${userId} connected`);
        activeUsers.add(userId);
        socket.join(`user_${userId}`); // Join user's private room
        socket.broadcast.emit('userJoined', `~~anonym~~ ${userId} joined`);
    } else {
        console.error('User ID is missing from handshake query');
    }

    // Handle chat messages
    socket.on('message', (data) => {
        console.log(`Message from ${data.user}: ${data.text}`);
        const messageData = { user: data.user, text: data.text, timestamp: new Date() };
        io.emit('message', messageData); // Broadcast message to all
    });

    // Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', { user: data.user });
    });

    socket.on('stoppedTyping', () => {
        socket.broadcast.emit('stoppedTyping');
    });

    socket.on('disconnect', () => {
        if (userId && activeUsers.has(userId)) {
            console.log(`~~anonym~~ ${userId} disconnected.`);
            activeUsers.delete(userId);
            socket.broadcast.emit('userLeft', `~~anonym~~ ${userId} left`);
        }
    });
});






app.post("/register", async (req, res) => {
    const fName = req.body.fName
    const bName = req.body.bName
    const lName = req.body.lName
    const code = req.body.code
    const tel = req.body.tel
    const phone = code + tel
    const email = req.body.email
    const password = req.body.password
    const region = req.body.region
    const purpose = req.body.purpose

    if(purpose == "influencer"){
        try {
            const checkResult = await db.query("SELECT * FROM users WHERE phone = $1", [
                tel
            ]);
    
            if (checkResult.rows.length > 0) {
                res.json(`Account already exists. Try logging in.`)
            } else {
                //Password hashing
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log("Error hashing passwords:", err)
                    } else {
                        const result = await db.query("INSERT INTO users(firstName,lastName, phone,email, region, password, purpose) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
                            fName, lName, phone, email, region, hash, purpose
                        ]);
                        const user = result.rows[0];
                        console.log(user);
                        req.login(user, (err) => {
                            console.log(err);
                            res.json("Registered Successfully");
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        try {
            const checkResult = await db.query("SELECT * FROM users WHERE phone = $1", [
                tel
            ]);
    
            if (checkResult.rows.length > 0) {
                res.json(`Account already exists. Try logging in.`)
            } else {
                //Password hashing
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log("Error hashing passwords:", err)
                    } else {
                        const result = await db.query("INSERT INTO users(brandname, phone,email, region, password, purpose) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [
                            bName, phone, email, region, hash, purpose
                        ]);
                        const user = result.rows[0];
                        console.log(user);
                        req.login(user, (err) => {
                            console.log(err);
                            res.json("Registered Successfully");
                        })
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
  


});

app.post("/login", (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {
        if (err) {
            console.log('Authenticate error:', err)
            return next(err);
        }
        if (!user) {
            console.log('User not found, redirecting to login')
            return res.json("User not found");
        }



        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return next(err);
            }

            req.session.userId = user.user_id;
            res.json("Logged in");
        });
    })(req, res, next);

})



passport.use(new Strategy(async function verify(phone, password, cb) {
    console.log(phone)
    try {
        const result = await db.query("SELECT * FROM users WHERE phone =  $1 ", [
            phone
        ]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const storedHashedpassword = user.password;
            bcrypt.compare(password, storedHashedpassword, (err, isMatch) => {
                if (err) {
                    return cb(err);
                }
                if (isMatch) {
                    return cb(null, user);
                } else {
                    console.log('Incorrect password');
                    return cb(null, false);
                }
            });
        } else {
            return cb("User not found")
            // res.render("login", {message: `User not found.`});
        }

    } catch (error) {
        return cb(error);
    }

}));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});



server.listen(port, '0.0.0.0', () => {
    const localIP = getLocalIPAddress();
    console.log(`Server started on http://${localIP}:${port}`);
});