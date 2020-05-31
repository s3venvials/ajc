import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Button from 'react-bootstrap/Button';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

const LearnCards = (props) => {
    const [value, setValue] = useState("");
    let currentModule = [];
    const data = [
        {
            title: "Variable Assignment",
            context: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            code: "let x = 'thingy';"
        },
        {
            title: "For Loops",
            context: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            code: "for (var i = 0; i < 10; i++) { \n" +
                "console.log([i]); \n" +
                "}"
        },
        {
            title: "Arrays - Push",
            context: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            code: "let data = [{ name: 'Joe Smith' }]; \n" +
                "let temp = []; \n" +
                "temp.push[...data]"
        }
    ];

    let item = data.splice(Math.floor(Math.random() * data.length), Math.floor(Math.random() * data.length));
    currentModule = [...item];

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div>
            <CodeMirror
                value={value}
                options={{
                    mode: 'javascript',
                    theme: 'material',
                    lineNumbers: true
                }}
                onBeforeChange={(editor, data, value) => {
                    setValue({ value });
                }}
                onChange={(editor, value) => {
                    console.log('controlled', { value });
                }}
            />
            <Button style={{ marginTop: '1em' }} variant="primary">Execute Code</Button>
        </div>
    )
}

export default LearnCards;