document.addEventListener("DOMContentLoaded", () => {
  const taskTableBody = document.querySelector(".task-table-body");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskTableBody.innerHTML = "";

    tasks.forEach((task) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.description || "—"}</td>
          <td>${task.dueDate}</td>
          <td>${task.status}</td>
          <td>
  <div class="action-buttons">
    ${
      task.status === "Pending"
        ? `<button class="btn btn--success" data-id="${task.id}" data-action="complete">Complete</button>`
        : `<span class="done-label">Done</span>`
    }
    <button class="btn btn--danger" data-id="${
      task.id
    }" data-action="delete">Delete</button>
  </div>
</td>
        `;

      taskTableBody.appendChild(row);
    });
  }

  function updateTaskStatus(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.map((task) => {
      if (task.id == id) {
        task.status = "Completed";
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
  }

  function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredTasks = tasks.filter((task) => task.id != id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    loadTasks();
  }

  taskTableBody.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const id = target.getAttribute("data-id");
      const action = target.getAttribute("data-action");

      if (action === "complete") {
        updateTaskStatus(id);
      } else if (action === "delete") {
        deleteTask(id);
      }
    }
  });

  loadTasks();
});
