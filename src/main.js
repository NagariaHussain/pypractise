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