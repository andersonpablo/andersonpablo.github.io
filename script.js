const fileInput = document.getElementById("fileInput");
const downloadBtn = document.getElementById("downloadBtn");
const preview = document.getElementById("preview");

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  const img = new Image();

  reader.onload = e => img.src = e.target.result;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    preview.src = canvas.toDataURL("image/jpeg", 0.95);
    preview.style.display = "block";

    downloadBtn.disabled = false;
  };

  reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", () => {
  const now = new Date();
  const fileName =
    `foto_${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_` +
    `${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}.jpg`;

  canvas.toBlob(blob => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }, "image/jpeg", 0.95);
});