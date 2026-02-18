# 🔧 Resolver Errores del IDE en VSCode

Los errores que ves en el tab "PROBLEMS" de VSCode son **falsos positivos** del IDE. El proyecto compila y funciona correctamente.

## ✅ Estado Actual

- ✅ **Build exitoso**: El proyecto compila sin errores
- ✅ **Dependencias instaladas**: Todas las librerías necesarias están instaladas
- ✅ **Extensiones VSCode**: Tailwind CSS IntelliSense y ESLint instalados
- ✅ **Variables de entorno**: `.env.local` creado (usando mock data por defecto)

## 🚀 Solución Rápida (1 minuto)

### Paso 1: Reiniciar el Servidor de TypeScript

En VSCode:
1. Presiona **`Ctrl + Shift + P`** (o `Cmd + Shift + P` en Mac)
2. Escribe: **TypeScript: Restart TS Server**
3. Presiona Enter

Esto hará que VSCode recargue el `tsconfig.json` y reconozca los alias `@/`.

### Paso 2: Recargar VSCode

Presiona **`Ctrl + Shift + P`** → Escribe: **Developer: Reload Window**

---

## 🎯 Verificación

Después de recargar, los errores deberían desaparecer. Si quedan algunos errores de CSS de Tailwind, ignóralos - son cosméticos y no afectan la funcionalidad.

## 🧪 Probar el Proyecto

```bash
# Iniciar servidor de desarrollo
pnpm dev

# El sitio estará disponible en:
# http://localhost:3000 (redirige a /en)
```

## 📝 Notas

### Errores que puedes ignorar:
- ❌ `Unknown at rule @tailwind` → Ignorar (Tailwind funciona correctamente)
- ❌ `Unknown at rule @apply` → Ignorar (Tailwind funciona correctamente)

### Errores que se resuelven con el reinicio:
- ✅ `Cannot find module '@/config/site'` → Se resuelve al reiniciar TS Server
- ✅ `Parameter 'X' implicitly has an 'any' type` → Se resuelve cuando TypeScript detecta los tipos

---

## 🔄 Si los errores persisten

1. **Cerrar y abrir el archivo** donde ves errores
2. **Abrir la carpeta raíz del proyecto** en VSCode (no una subcarpeta)
3. **Ejecutar verificación completa**:
   ```bash
   ./verify-setup.sh
   ```

---

## 📦 Configuración de Sanity CMS

El proyecto está configurado para usar **mock data** por defecto. Para conectar con Sanity CMS real:

1. Sigue la guía: [sanity-schema/README.md](../sanity-schema/README.md)
2. Edita `.env.local` con tus credenciales de Sanity
3. Reinicia el servidor: `pnpm dev`

---

## ✨ ¡Todo está listo!

El proyecto funciona perfectamente. Los errores del IDE son cosméticos y desaparecerán al reiniciar TypeScript Server.

**Comando para iniciar**: `pnpm dev`
