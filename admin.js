const urlInput = document.getElementById("siteUrl");
const qrBox = document.getElementById("qrcode");
let qr;

document.getElementById("makeQr").addEventListener("click", () => {
  const value = urlInput.value.trim();
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") throw new Error();
    qrBox.innerHTML = "";
    qr = new QRCode(qrBox, {
      text: parsed.origin,
      width: 230,
      height: 230,
      correctLevel: QRCode.CorrectLevel.H
    });
  } catch {
    alert("Enter a valid public website URL, such as https://your-site.onrender.com");
  }
});

document.getElementById("downloadQr").addEventListener("click", () => {
  const canvas = qrBox.querySelector("canvas");
  const img = qrBox.querySelector("img");
  const dataUrl = canvas ? canvas.toDataURL("image/png") : (img ? img.src : null);
  if (!dataUrl) return alert("Create the QR code first.");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "my-contact-qr.png";
  link.click();
});
