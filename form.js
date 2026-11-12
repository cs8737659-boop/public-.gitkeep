const form = document.getElementById("contactForm");
const statusBox = document.getElementById("status");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusBox.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: document.getElementById("phone").value,
        consent: document.getElementById("consent").checked
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Submission failed.");

    statusBox.textContent = result.message;
    statusBox.style.color = "#12803d";
    form.reset();
  } catch (error) {
    statusBox.textContent = error.message;
    statusBox.style.color = "#b42318";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Share my number";
  }
});
