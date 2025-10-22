# Presentación – Tema 2: jQuery y Google APIs

Este branch contiene:

- Presentación en PowerPoint (se genera automáticamente): `Tema2_jQuery_y_Google_APIs.pptx`.
- Script para generar la presentación: `crear_pptx_tema2.py`.
- Contenido en Markdown: `presentacion.md`.
- Demo de jQuery + Google Maps + Charts en `demo/`.
- Workflow de GitHub Actions que construye el .pptx y abre un Pull Request hacia `main`.

Autor en portada: Jafet.

## Requisitos locales
- Python 3.9+
- `pip install python-pptx`

Generar manualmente el .pptx:

```bash
python crear_pptx_tema2.py
```

## Demo
- Abre `demo/index.html` con un servidor local (recomendado).
- Reemplaza `TU_API_KEY` por tu API key de Google Maps (`Maps JavaScript` y `Directions` habilitados). Usa HTTPS o `localhost`.

## CI – Build automático del PPTX y PR
Cada push a este branch ejecuta el workflow `.github/workflows/build-and-pr.yml` que:
1. Instala `python-pptx`.
2. Ejecuta `crear_pptx_tema2.py`.
3. Commitea `Tema2_jQuery_y_Google_APIs.pptx` al mismo branch.
4. Crea (o actualiza) un Pull Request desde `presentacion-progra-4` hacia `main`.

Si ya hay un PR abierto, el workflow solo actualizará el PR con el archivo generado.