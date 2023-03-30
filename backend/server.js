const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const OpenAI = require('openai')
const { Configuration, OpenAIApi } = OpenAI

const configuration = new Configuration({
    organization: "org-v9PltONXqwikEb2nUOnNF8cp",
    apiKey: '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',
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
        the title of each group will be the subject of the tasks.
        Console: What is your board subject?.
        Person: developers.
        Console: board: {
            groups: [
                {
                    title: 'Frontend',
                    color: '#037f4c,
                    tasks: [
                        {
                            title: 'Develop the UI'
                        },
                        {
                            title: 'Create a login form'
                        },
                        {
                            title: 'Design an onboarding flow'
                        },
                        {
                            title: 'Add authentication'
                        }
                    ]
                },
                {
                    title: 'Backend',
                    color: '#9cd326',
                    tasksk: [
                        {
                            title: 'Write automated tests'
                        },
                        {
                            title: 'Build a user profile page'
                        },
                        {
                            title: 'Implement type'
                        },
                        {
                            title: 'Make a backend'
                        }
                    ]
                }
            ]
        }.
        Person: ${message}?`,
        max_tokens: 500,
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