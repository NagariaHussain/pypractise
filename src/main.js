import './style.css';
import 'alpinejs';
import MarkdownIt from 'markdown-it';
import '../vendor/ace';

// Configure code editor
ace.config.set('basePath', '/vendor');
const editor = ace.edit("code-editor");
editor.setTheme("ace/theme/dracula");
editor.session.setMode("ace/mode/python");

const md = new MarkdownIt();

window.fetchQuestion = () => {
    return fetch('/questions/q1.json')
    .then((r) => r.json())
    .then((d) => {
        editor.setValue(d.starter_code);
        return md.render(d.prompt_text);
    });
}

async function main(){
    console.log("Loading pyodide...");
    await loadPyodide({
        indexURL : "https://cdn.jsdelivr.net/pyodide/v0.17.0/full/"
    });
}


const output = document.getElementById("output");

let pyodideReadyPromise = main();

window.evaluatePython = async function() {
    let code = editor.getValue();
    let out;

    await pyodideReadyPromise;
    try {
        // To capture stdout
        await pyodide.runPythonAsync(`import sys\nimport io\nsys.stdout = io.StringIO()`)
        // Run the desired code
        await pyodide.runPythonAsync(code);
        // Get the output and print
        output.innerText = pyodide.runPython('sys.stdout.getvalue()');
    } catch(err) {
        return err;
    }
    return out;
}
