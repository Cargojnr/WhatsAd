import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcryptjs";
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import passport from "passport";
import { Strategy } from "passport-local";
import env from "dotenv";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import http from "http"



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const server = http.createServer(app);
const port = process.env.port || 3000;
const pgSessionStore = pgSession(session);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow frontend connections
        methods: ["GET", "POST"]
    }
});

const saltRounds = 10;
env.config();

const db = new pg.Client({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});



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



app.get("/all-users/:role", async(req, res) => {
    const role = req.params.role
    try{
        const result = await db.query("SELECT * FROM users WHERE purpose = $1",[role])
        const usersDetail = result.rows;

        res.json({usersDetail})
    } catch(err) {
        console.log(err)
    }
})

app.get("/user/:id", async(req, res) => {
    const id = req.params.id
    if(req.isAuthenticated){
    try{
        const result = await db.query("SELECT * FROM users WHERE id = $1",[id])
        const userDetails = result.rows;

        const firstName = req.user.firstname
        const lastName = req.user.lastname

        const fullName = [firstName, lastName]

        res.json({userId: req.user.id,fullName, profilePicture: req.user.profile_picture, userDetails})
    } catch(err) {
        console.log(err)
    }
} else {
    res.redirect("/login")
}
})


app.get("/active-users/?role", async (req, res) => {
    const role = req.query.role
    try {
      const ids = Array.from(activeUsers);
      if (ids.length === 0) return res.json([]);
      let result;
      if(role !== null) {
        result = await db.query(
            `SELECT id, active_status,verified, username, profile_picture FROM users WHERE purpose = $1 AND id = ANY($2::int[]) `,
            [role, ids]
          );
      } else {
         result = await db.query(
            `SELECT id, active_status,verified, username, profile_picture FROM users WHERE id = ANY($1::int[])`,
            [ids]
          );
      }
     
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: "Could not retrieve active users" });
    }
  });

    // routes/user.js or wherever you define routes
app.get('/api/active-status/:user', async (req, res) => {
    const user = req.params.user
    if (!req.isAuthenticated()) {
        return res.status(401).json({ active: false });
    }

    try {
        const result = await db.query('SELECT active_status FROM users WHERE id = $1', [user]);
        res.json({ active: result.rows[0].active_status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching active status' });
    }
});

app.get("/profile", async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id;
        const role = req.user.purpose
        try {
            const result = await db.query("SELECT active_status,verified,profile_picture FROM users  WHERE purpose = $1 AND id = $2", [role, userId]) 

            const firstName = req.user.firstname
            const lastName = req.user.lastname
    
            const fullName = [firstName, lastName]
            const userDetails = result.rows;

            res.json({ userId: req.user.id, fullName, activeStatus: req.user.active_status, verification:req.user.verified, profilePicture: req.user.profile_picture, profile: userDetails});
        } catch (err) {
            console.log(err)
        }
    }

})

app.get("/profile/:user", async(req, res) => {
    if(req.isAuthenticated()){
        const userId = req.params.user;
         try{
            const result = await db.query("SELECT active_status, verified, profile_picture FROM users WHERE id = $1 ORDER by secrets.id DESC", [userId])
            
            const userProfile = result.rows;
            const userid = userProfile[0].user_id
            const activeStatus = userProfile.active_status;
            const verification = userProfile[0].verified
            const userPicture = userProfile[0].profile_picture

            console.log(userPicture)
            res.json({userId:req.user.id, profileId: userid, verification: verification, userPicture, activeStatus:  activeStatus, profilePicture: req.user.profile_picture, userProfile})

         } catch(err){
            console.log(err)
         }
    } else {
        res.redirect("/login")
    }
})

app.get("/feeds/", async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id
        const role = req.params.role
        try {
          
            const allUsers = await db.query("SELECT id, verified, username, profile_picture FROM users");

            
            const userInfo = await db.query(`SELECT verified, profile_picture FROM users WHERE id = $1`, [userId]);
            const userRole = userInfo.rows[0].purpose;

            let result;
            if(userRole == "influencer"){
              result = await db.query("SELECT timestamp, verified, campaigns.id, profile_picture, FROM campaigns JOIN users ON users.id = user_id ORDER BY campaigns.id DESC ")
            }  else {
               result = await db.query("SELECT timestamp, verified, gigs.id, profile_picture, FROM gigs JOIN users ON users.id = user_id ORDER BY campaigns.id DESC ")
            }


            const feeds = result.rows;
            res.json({allUsers: allUsers.rows, feeds: feeds, userId: req.user.id, activeStatus: req.user.active_status, verification:req.user.verified, profilePicture: req.user.profile_picture })
        } catch (err) {
            console.log(err)
        }
    } else {
        res.redirect("login")
    }
})

app.get("/feeds/:role", async (req, res) => {
    if (req.isAuthenticated()) {
        const userId = req.user.id
        const role = req.params.role
        try {

            let result;
            if(role == "influencer"){
              result = await db.query("SELECT timestamp, verified, campaigns.id, profile_picture, FROM campaigns JOIN users ON users.id = user_id ORDER BY campaigns.id DESC ")
            }  else {
               result = await db.query("SELECT timestamp, verified, gigs.id, profile_picture, FROM gigs JOIN users ON users.id = user_id ORDER BY campaigns.id DESC ")
            }


            const feeds = result.rows;
            res.json({allUsers: allUsers.rows, feeds: feeds, userId: userId, activeStatus: req.user.active_status, verification:req.user.verified, profilePicture: req.user.profile_picture })
        } catch (err) {
            console.log(err)
        }
    } else {
        res.redirect("login")
    }
})



app.post("/register", async (req, res) => {
    const fName = req.body.fName
    const bName = req.body.bName
    const lName = req.body.lName
    const code = req.body.code || "233"
    const tel = req.body.tel
    const phone = code + tel
    const email = req.body.email
    const password = req.body.password
    const region = req.body.region
    const purpose = req.body.purpose
  
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
                        let result;
                        if(purpose == "influencer"){
                        result = await db.query("INSERT INTO users(firstname,lastname, phone,email, region, password, purpose) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [
                            fName, lName, phone, email, region, hash, purpose
                        ]);
                       } else {
                         result = await db.query("INSERT INTO users(brandname, phone,email, region, password, purpose) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [
                            bName, phone, email, region, hash, purpose
                        ]);
                       }
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



passport.use(new Strategy({
    usernameField: 'phone',  // <-- this should match your form/body field
    passwordField: 'password',
    passReqToCallback: true
}, async function verify(req, tel, password, cb) {
    console.log(tel)
    const code = req.body.code || "233";  // default if needed
const fullPhone = code + tel;
    try {
        const result = await db.query("SELECT * FROM users WHERE phone = $1", [fullPhone]);

        if (result.rows.length === 0) {
            return cb(null, false); // user not found
        }

        const user = result.rows[0];
        const storedHashedPassword = user.password;

        bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
            if (err) return cb(err);
            if (!isMatch) return cb(null, false); // incorrect password
            return cb(null, user);
        });

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
    console.log(`Server started on http://localhost:${port}`);
});