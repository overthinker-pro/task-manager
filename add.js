document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const dueDate = document.getElementById("due-date").value;

    if (!title || !dueDate) {
      alert("Please fill in the required fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status: "Pending",
    };

    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    existingTasks.push(newTask);

    localStorage.setItem("tasks", JSON.stringify(existingTasks));

    window.location.href = "index.html";
  });
});
