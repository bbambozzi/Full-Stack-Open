const { response, json } = require('express')





http = require('http')
express = require('express')
const app = express()
app.use(express.json())

let notes = [{id: 1,    content: "HTML is easy",    date: "2022-05-30T17:30:31.098Z",    important: true  },
{    id: 2,    content: "Browser can execute only Javascript",    date: "2022-05-30T18:39:34.091Z",    important: false  },
{    id: 3,    content: "GET and POST are the most important methods of HTTP protocol",    date: "2022-05-30T19:20:14.298Z",    important: true  }]

const generateMaxId = () => { 
    const highestID = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
    return highestID + 1;
}

app.get('/' , (request, response) => {
    response.send('<h1>Hello, world!</h1>')
})

app.get('/api/notes' , (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id' , (request , response) => {
    let id = Number(request.params.id);
    const foundNote = notes.find(note => note.id === id)
    if (foundNote){
        response.json(foundNote)
    }
    else {
        response.status(400).json({
            "Error": "Not found"
        })
    }
}
)



app.post('/api/notes/:id' , (request , response) => {
    const body = request.body;

    if (!body || !body.content) {
        response.status(400).json({
            "error": "CONTENT MISSING."
        })
    }
    else {
        note = {
            "content": body.content,
            "important": body.important || false,
            "date": new Date(),
            "id": generateMaxId()

        }
        notes = notes.concat(note)
        response.json(note)
    }
})

app.delete('/api/notes/:id' , (request , response) => {
    const id = Number(request.params.id);
    notes = notes.filter(note => note.id !== id);
    response.status(204).end();
})

const PORT = 3001;

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
}) 
