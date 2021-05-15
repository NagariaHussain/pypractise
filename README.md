# A Python Programming Questions Website

NO servers.
NO databases.

Just a Static Site!

Uses `pyodide` to evaluate python code in the browser.

## Some notes on `pyodide`

1. Capturing `stdout`:

```py
pyodide.runPython(`
    import sys
    import io

    sys.stdout = io.StringIO();
`);
```

Now, run any code that sends something to `stdout`:

```py
pyodide.runPython(
    print("Hello, World!")
);
```

Getting the output:

```js
let output = pyodide.runPython(`sys.stdout.getvalue()`);
console.log(output); // "Hello, World!\n"
```
