document.addEventListener("DOMContentLoaded", function () {
  const noteTitle = document.getElementById("noteTitle");
  const noteContent = document.getElementById("noteContent");
  const saveButton = document.getElementById("saveNote");
  const notesContainer = document.getElementById("notesContainer");

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = ""; 
    notes.forEach((note, index) => {
      const noteItem = document.createElement("div");
      noteItem.classList.add("note-item");
      noteItem.innerHTML = `<strong>${note.title}</strong><p>${note.content}</p>`;
      noteItem.addEventListener("click", () => deleteNote(index));
      notesContainer.appendChild(noteItem);
    });
  }

  function saveNote() {
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();
    if (!title || !content) return;

    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));

    noteTitle.value = "";
    noteContent.value = "";
    loadNotes();
  }

  function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  }

  saveButton.addEventListener("click", saveNote);
  loadNotes();
});
