import './style.css';
import 'alpinejs';
import MarkdownIt from 'markdown-it';

var md = new MarkdownIt();

window.fetchQuestion = () => {
    return fetch('/questions/q1.json')
    .then((r) => r.json())
    .then((d) => {
        return md.render(d.prompt_text)
    });
}