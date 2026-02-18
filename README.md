PokéWiki PWA: 
Este proyecto es una Aplicación Web Progresiva (PWA) desarrollada con React y Vite. Permite explorar el universo Pokémon con una estética nostálgica de consola de 8 bits, integrando datos en tiempo real de la PokéAPI.

Enlace del Proyecto: https://pokedex-tau-vert.vercel.app/

Proceso de Desarrollo
1. Ideación
El objetivo principal fue crear una enciclopedia Pokémon que no solo fuera informativa, sino que ofreciera una experiencia de usuario (UX) de aplicación nativa. Se optó por un diseño "Ultra-Wide" responsivo que se adapta a monitores de PC y dispositivos móviles, utilizando tipografías pixeladas y una paleta de colores vibrante.

2. Implementación Técnica
Frontend Moderno: Construido con React 18 utilizando Vite para un empaquetado ultra rápido.

Consumo de API: Integración de REST API (PokéAPI) mediante el uso de fetch, useEffect y useState para gestionar datos asíncronos.

Navegación: Implementación de React Router DOM para una experiencia de Single Page Application (SPA) sin recargas de página.

Estilos: CSS puro basado en Grid Layout y Flexbox para garantizar que los elementos se centren dinámicamente, incluso cuando las filas están incompletas.

3. Características de PWA (Obligatorias)
La aplicación cumple con los estándares modernos de una PWA:

Manifest.json: Configurado para definir colores de tema, iconos y modo de visualización standalone.

Service Worker: Implementado mediante vite-plugin-pwa para gestionar el ciclo de vida de la aplicación.

Instalación: La app es instalable. En el navegador (PC o Android), aparecerá un botón de instalación en la barra de direcciones o en el menú de opciones.

Modo Offline: Utiliza estrategias de caché de Workbox para almacenar los datos de la API y los sprites de los Pokémon, permitiendo que la información consultada esté disponible sin conexión a internet.

Cómo ver y utilizar la App
Instalación vía Vercel
Para visualizar la aplicación en su estado final de publicación:

Haz clic en el enlace: pokedex-tau-vert.vercel.app.

Para instalar en PC: Busca el icono de "Instalar App" (monitor con flecha) que aparece a la derecha de la barra de direcciones de Chrome/Edge.

Para instalar en Móvil: Selecciona "Agregar a la pantalla de inicio" desde el menú del navegador.

Ejecución Local
Si deseas ejecutar el código en tu entorno de desarrollo:

Bash
# 1. Clonar el repositorio
git clone [tu-url-de-github]

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Construir para producción (PWA)
npm run build
🛠️ Tecnologías Utilizadas
React (Biblioteca principal)

Vite (Herramienta de construcción)

Vite PWA Plugin (Service Worker y Manifest)

React Router (Enrutamiento)

PokéAPI (Fuente de datos)
