document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    once: true,
    mirror: false,
    offset: 80,
    duration: 1000,
    easing: "ease-out-quad",
  });

  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");

  const toggleMenu = () => {
    const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("hidden");
    menuIconOpen.classList.toggle("hidden");
    menuIconClose.classList.toggle("hidden");
  };
  menuBtn.addEventListener("click", toggleMenu);

  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuBtn.getAttribute("aria-expanded") === "true") {
        toggleMenu();
      }
    });
  });

  // --- NUEVO SCRIPT PARA LA ANIMACIÓN DE CÓDIGO ---
  const codeSnippetEl = document.getElementById("code-snippet");
  const code = [
    `<span class="code-comment">// app/Http/Controllers/ContactController.php</span>`,
    `<span class="code-keyword">namespace</span> App\\Http\\Controllers;`,
    ``,
    `<span class="code-keyword">class</span> <span class="code-class">ContactController</span> <span class="code-keyword">extends</span> <span class="code-class">Controller</span>`,
    `{`,
    `    <span class="code-keyword">public function</span> <span class="code-function">send</span>(<span class="code-class">Request</span> <span class="code-variable">$request</span>)`,
    `    {`,
    `        <span class="code-variable">$validated</span> = <span class="code-variable">$request</span>-><span class="code-function">validate</span>([`,
    `            <span class="code-string">'name'</span> => <span class="code-string">'required'</span>,`,
    `            <span class="code-string">'email'</span> => <span class="code-string">'required|email'</span>,`,
    `        ]);`,
    ``,
    `        <span class="code-comment">// Lógica para enviar el email...</span>`,
    `    }`,
    `}`,
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeCode() {
    if (!codeSnippetEl) return;
    if (lineIndex < code.length) {
      const currentLine = code[lineIndex];
      // Si la línea contiene etiquetas span, avanza rápido para mostrarla de una vez
      if (currentLine.includes("<span")) {
        codeSnippetEl.innerHTML = code.slice(0, lineIndex + 1).join("<br>");
        charIndex = currentLine.length;
      } else {
        codeSnippetEl.innerHTML =
          code.slice(0, lineIndex).join("<br>") + "<br>" + currentLine.substring(0, charIndex + 1);
      }

      if (charIndex < currentLine.length) {
        charIndex++;
        setTimeout(typeCode, 15);
      } else {
        charIndex = 0;
        lineIndex++;
        setTimeout(typeCode, 100);
      }
    } else {
      // Al finalizar, añade el cursor parpadeante
      codeSnippetEl.innerHTML = code.join("<br>") + '<span class="cursor"></span>';
    }
  }

  typeCode();
});

window.addEventListener("DOMContentLoaded", function () {
  // Selecciona el formulario y el div de estado por sus IDs
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  // Función para mostrar un mensaje de éxito
  function success() {
    form.reset(); // Limpia los campos del formulario
    status.innerHTML = "¡Gracias! Tu mensaje ha sido enviado.";
    status.style.color = "#22c55e"; // Color verde
  }

  // Función para mostrar un mensaje de error
  function error() {
    status.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
    status.style.color = "#ef4444"; // Color rojo
  }

  // Escucha el evento 'submit' del formulario
  form.addEventListener("submit", function (ev) {
    // Previene el comportamiento por defecto (el redireccionamiento)
    ev.preventDefault();

    const data = new FormData(form);

    // Envía los datos usando AJAX (Fetch API)
    ajax(form.method, form.action, data, success, error);
  });
});

// Función helper para la petición AJAX
function ajax(method, url, data, success, error) {
  fetch(url, {
    method: method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        success(); // Si todo salió bien, llama a la función de éxito
      } else {
        // Si Formspree devuelve un error, intenta obtener más detalles
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"].map((error) => error["message"]).join(", ");
          } else {
            error(); // Si no hay detalles, muestra el error genérico
          }
        });
      }
    })
    .catch(() => {
      error(); // Muestra error en caso de fallo de red
    });
}
