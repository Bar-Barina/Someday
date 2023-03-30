const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

const configuration = new Configuration({
    organization: "org-v9PltONXqwikEb2nUOnNF8cp",
    apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express()
const http = require('http').createServer(app)


// Express App Config
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:3030', 'http://localhost:3030'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const reviewRoutes = require('./api/review/review.routes')
const boardRoutes = require('./api/board/board.routes')
const { setupSocketAPI } = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/board', boardRoutes)
setupSocketAPI(http)

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/board/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/api/openai', async (req, res) => {
    const { message } = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are a Console. asnwer with Javescript object that has inside an array of 2 groups and 4 tasks for each group,
        the title of each group will be the subject of the tasks and the title of the board will be the subject the Person gave you but the key name will be title
        Create key, value pairs from the following data and format the key, value pairs using JSON notation with keys, without trailing commas.
        Console: What is your board subject?.
        Person: developers.
        {
            "title": "developers",
            "description": "Add your board's description here",
            "members": [],
            "groups": [
                {
                    "_id": "ksd398fj3d32",
                    "title": "Frontend",
                    "color": "#037f4c",
                    "tasks": [
                        {
                            "id": "kjdshf7sdhf",
                            "taskTitle": "Develop the UI"
                        },
                        {
                            "id": "udshf87hdsf",
                            "taskTitle": "Create a login form"
                        },
                        {
                            "id": "ds98fjh3ufh",
                            "taskTitle": "Design an onboarding flow"
                        },
                        {
                            "id": "oisdnf87jefnwi",
                            "taskTitle": "Add authentication"
                        }
                    ]
                },
                {
                    "_id": "oisdjf9hdsf",
                    "title": "Backend",
                    "color": "#9cd326",
                    "tasks": [
                        {
                            "id": "987shdfn8f",
                            "taskTitle": "Write automated tests"
                        },
                        {
                            "id": "oisjd8f9",
                            "taskTitle": "Build a user profile page"
                        },
                        {
                            "id": "dsklfn873n",
                            "taskTitle": "Implement type"
                        },
                        {
                            "id": "3298jcds8df",
                            "taskTitle": "Make a backend"
                        }
                    ]
                }
            ]
        }
        Person: ${message}?`,
        max_tokens: 1000,
        temperature: 0
    })
    console.log('response.data', response.data)
    if (response.data.choices) {
        res.json({
            message: response.data.choices[0].text
        })
    }
})


const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})