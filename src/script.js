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
                code.slice(0, lineIndex).join("<br>") +
                "<br>" +
                currentLine.substring(0, charIndex + 1);
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
    