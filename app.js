function addCourse() {
    const tbody = document.getElementById('course-list');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" placeholder="ชื่อวิชา (เช่น Math)"></td>
        <td><input type="number" class="credit" placeholder="หน่วยกิต"></td>
        <td><input type="number" class="grade" placeholder="เกรด" step="0.01"></td>
        <td>
            <button onclick="deleteRow(this)" class="btn-icon-delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;
    tbody.appendChild(newRow);
}

function deleteRow(button) {
    const row = button.closest('tr');
    if (row) { row.remove(); }
    calculateGPA();
}

function calculateGPA() {
    const credits = document.querySelectorAll('.credit');
    const grades = document.querySelectorAll('.grade');
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < credits.length; i++) {
        let creditValue = parseFloat(credits[i].value);
        let gradeValue = parseFloat(grades[i].value);
        if (!isNaN(creditValue) && !isNaN(gradeValue)) {
            totalPoints += (creditValue * gradeValue);
            totalCredits += creditValue;
        }
    }

    let gpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;
    document.querySelector('#gpa-result span').innerText = gpa.toFixed(2);
    updateDashboard();
}

function addTodo() {
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    if (input.value.trim() !== "") {
        const li = document.createElement('li');
        li.style = "background: white; margin-bottom: 10px; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1);";
        li.innerHTML = `
            <span onclick="toggleDone(this)" style="cursor: pointer; flex: 1;">${input.value}</span>
            <button onclick="deleteTodo(this)" class="btn-icon-delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        list.appendChild(li);
        input.value = "";
        updateDashboard();
    }
}

function deleteTodo(btn) {
    btn.parentElement.remove();
    updateDashboard();
}

function toggleDone(span) {
    if (span.style.textDecoration === 'line-through') {
        span.style.textDecoration = 'none';
        span.style.color = 'black';
    } else {
        span.style.textDecoration = 'line-through';
        span.style.color = '#888';
    }
    updateDashboard(); // อัปเดตเลขทันทีเมื่อขีดฆ่า
}

function updateDashboard() {
    const gpaResult = document.querySelector('#gpa-result span');
    const dashGpa = document.getElementById('dash-gpa');
    if (gpaResult && dashGpa) dashGpa.innerText = gpaResult.innerText;

    const allTodos = document.querySelectorAll('#todo-list li span');
    let pendingCount = 0;
    allTodos.forEach(todo => {
        if (todo.style.textDecoration !== 'line-through') {
            pendingCount++;
        }
    });
    const dashTodo = document.getElementById('dash-todo-count');
    if (dashTodo) dashTodo.innerText = pendingCount;

    const examDate = new Date("March 21, 2026").getTime();
    const now = new Date().getTime();
    const distance = examDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const dashDays = document.getElementById('dash-exam-days');
    if (dashDays) dashDays.innerText = (days > 0) ? days + " วัน" : "0 วัน";
}

function showPage(pageId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
    updateDashboard();
}

function startCountdown() {
    const examDate = new Date("April 4, 2026 09:00:00").getTime();
    setInterval(function() {
        const now = new Date().getTime();
        const distance = examDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            timerElement.innerHTML = distance < 0 ? "ถึงเวลาสอบแล้ว!" : `${days} วัน ${hours} ชม. ${minutes} นาที`;
        }
    }, 1000);
}

startCountdown();
updateDashboard();