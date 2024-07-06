// Obtener referencias a los elementos del DOM
const $text = document.getElementById("text");
const $resultWrapper = document.getElementById("result-wrapper");
const $result = document.getElementById("result-text");
const $buttonEncrypt = document.getElementById("button-encrypt");
const $buttonDecrypt = document.getElementById("button-decrypt");
const $buttonCopy = document.getElementById("button-copy");

// Función de encriptación
function encrypt(text) {
  const encryptionMap = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };

  return text
    .split("")
    .map((char) => encryptionMap[char] || char)
    .join("");
}

// Función de desencriptación
function decrypt(text) {
  const decryptionMap = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  let decryptedText = text;
  for (const [encoded, decoded] of Object.entries(decryptionMap)) {
    const regex = new RegExp(encoded, "g");
    decryptedText = decryptedText.replace(regex, decoded);
  }

  return decryptedText;
}

// Validar texto
function isValidText(text) {
  const regex = /^[a-z\s.,;:!?]*$/;
  return regex.test(text);
}

// Validar y mostrar alertas
function validateAndAlert(text) {
  if (!isValidText(text)) {
    alert("Recuerda que debe ser solo letras minúsculas y sin acentos");
    return false;
  }
  return true;
}

// Mostrar resultado en la interfaz
function displayResult(result) {
  if (result.length > 0) {
    $result.innerHTML = `<p>${result}</p>`;
    $result.style.textAlign = "left";
    $buttonCopy.style.display = "block";
  }
}

// Manejar evento de clic de encriptar
$buttonEncrypt.addEventListener("click", () => {
  const text = $text.value;
  if (validateAndAlert(text)) {
    displayResult(encrypt(text));
  }
});

// Manejar evento de clic de desencriptar
$buttonDecrypt.addEventListener("click", () => {
  const text = $text.value;
  if (validateAndAlert(text)) {
    displayResult(decrypt(text));
  }
});

// Manejar evento de clic de copiar
$buttonCopy.addEventListener("click", async () => {
  const resultText = $result.innerText;
  if (resultText.length) {
    try {
      await navigator.clipboard.writeText(resultText);
      $buttonCopy.innerText = "Texto Copiado";
      setTimeout(() => {
        $buttonCopy.innerText = "Copiar";
      }, 1000);
    } catch (error) {
      alert("Hubo un error al copiar el texto");
    }
  }
});
