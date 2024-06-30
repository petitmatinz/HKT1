document.getElementById('add-todo').addEventListener('click', addTodo);
document.getElementById('new-todo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const todoText = document.getElementById('new-todo').value.trim();
    if (todoText !== '') {
        const todoList = document.getElementById('todo-list');
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        
        const todoTextSpan = document.createElement('span');
        todoTextSpan.className = 'todo-text';
        todoTextSpan.textContent = todoText;
        todoTextSpan.addEventListener('click', toggleDone);
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.style.display = 'none';
        
        const editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.addEventListener('click', function() {
            editTodo(todoItem, todoTextSpan, editInput);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.addEventListener('click', function() {
            deleteTodo(todoItem);
        });

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';
        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);
        
        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(editInput);
        todoItem.appendChild(buttonsDiv);
        todoList.appendChild(todoItem);
        
        document.getElementById('new-todo').value = '';
    }
}

function deleteTodo(todoItem) {
    todoItem.remove();
}

function toggleDone(event) {
    const todoItem = event.target.parentElement;
    todoItem.classList.toggle('done');
}

function editTodo(todoItem, todoTextSpan, editInput) {
    if (editInput.style.display === 'none') {
        editInput.value = todoTextSpan.textContent;
        todoTextSpan.style.display = 'none';
        editInput.style.display = 'inline';
        editInput.focus();
        
        editInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                saveEdit(todoItem, todoTextSpan, editInput);
            }
        });
        editInput.addEventListener('blur', function() {
            saveEdit(todoItem, todoTextSpan, editInput);
        });
    }
}

function saveEdit(todoItem, todoTextSpan, editInput) {
    todoTextSpan.textContent = editInput.value.trim();
    todoTextSpan.style.display = 'inline';
    editInput.style.display = 'none';
}
