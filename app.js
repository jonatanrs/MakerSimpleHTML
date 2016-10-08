window.onload = function () {
    // Load the selected file in the DOM
    document.getElementById("myBtn").onchange = function (evt) {
        f = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            document.body.innerText = e.target.result;
        };
        reader.readAsText(f);
    };

    // Alert when leaving the page
    window.onbeforeunload = function () {
        return "Did you save your stuff?"
    }

    var Undo = new Array();
    var Redo = new Array();

    document.onkeydown = function (event) {
        event.preventDefault();
        var sel = window.getSelection();
        var texto = sel.toString();
        if (event.key == 'F11' || event.key == 'F12' || texto.length > 0) {
            var tag = null;
            switch (event.key) {
                // H1
                case 'F1':
                    tag = document.createElement("h1");
                    var text = document.createTextNode(texto);
                    tag.appendChild(text);
                    break;
                // H2
                case 'F2':
                    tag = document.createElement("h2");
                    var text = document.createTextNode(texto);
                    tag.appendChild(text);
                    break;
                // Paragraph
                case 'F3':
                    tag = document.createElement("p");
                    var text = document.createTextNode(texto);
                    tag.appendChild(text);
                    break;
                // List
                case 'F4':
                    tag = document.createElement("ul");
                    texto.split("\n").filter(Boolean).forEach(function (ele) {
                        var li = document.createElement("li");
                        li.appendChild(document.createTextNode(ele))
                        tag.appendChild(li);
                    });
                    break;
                // Special case
                case 'F5':
                    tag = document.createElement("div");
                    tag.style.backgroundColor = "red"
                    var text = document.createTextNode(texto);
                    tag.appendChild(text);
                    break;
                // Undo
                case 'F11':
                    var content = Undo.pop();
                    if (content) {
                        Redo.push(document.body.innerHTML);
                        document.body.innerHTML = content;
                    }
                    return;
                // Redo
                case 'F12':
                    var content = Redo.pop();
                    if (content) {
                        Undo.push(document.body.innerHTML);
                        document.body.innerHTML = content;
                    }
                    return;
                // Delete
                case 'Delete':
                    Undo.push(document.body.innerHTML);
                    Redo = new Array();
                    range = sel.getRangeAt(0);
                    range.deleteContents();
                    return;
                default:
                    break;
            }

            Undo.push(document.body.innerHTML);
            Redo = new Array();

            // The new label is inserted
            if (tag != null) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode(tag);
            }
        }
    };
};