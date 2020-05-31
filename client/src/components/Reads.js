import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Button from 'react-bootstrap/Button';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

const Reads = () => {
    return (
        <div>
            <h1>TItle</h1>

            <img src="" alt="img-placeholder" />

            <p>Content</p>

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

            <div>
                Comments
            </div>
        </div>
    )
}

export default Reads;