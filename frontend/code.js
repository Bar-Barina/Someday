// Front

async sendQ() {
    if (this.txt) {
      this.res = this.txt;
      this.txt = "";
    } else if (this.rec) {
      this.res = this.rec;
      this.rec = "";
    }
    this.isLoading = true;
    const url = "http://localhost:3030/api/openai";
    let res = await axios.post(url, { message: this.res });
    if (res.data.message.length < 100) {
      this.msg = res.data.message;
      this.isLoading = false;
      return;
    }
    res = JSON.parse(res.data.message);
    const boardToCreate = this.createBoard(res);
    const board = await this.$store.dispatch({
      type: "addBoard",
      board: boardToCreate,
    });
    this.$emit("AIboard", board);
    this.closeAI();
  },
  createBoard(res) {
    const taskAI = boardService.getEmptyTask();
    delete taskAI.taskTitle;
    res.groups.forEach((group) => {
      group.tasks.forEach((task) => {
        Object.assign(task, taskAI);
      });
    });
    res.labels = boardService.getDefaultLabels();
    return res;
  }

//   Back

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
        max_tokens: 700,
        temperature: 0
    },
    )
    if (response.data.choices) {
        res.json({
            message: response.data.choices[0].text
        })
    }
})