# 🏦 SGIP - Sistema de Gestión de Inversiones y Préstamos (Banco Sol)

Frontend del sistema SGIP desarrollado para la prueba técnica de Banco Sol. Esta aplicación permite simular préstamos bajo el sistema de amortización francesa, guardar el historial en una base de datos y visualizar la trazabilidad de las transacciones.

## 🚀 Tecnologías Utilizadas

* **Framework:** Next.js (App Router) / React
* **Estilos:** Tailwind CSS
* **Peticiones HTTP:** Axios
* **Backend API:** .NET Core (C#) + Entity Framework Core
* **Base de Datos:** PostgreSQL

## ✨ Funcionalidades Principales (Requerimientos Cumplidos)

1. **Simulador de Préstamos:** Cálculo exacto de cuotas mensuales usando TEA (Tasa Efectiva Anual).
2. **Generación de Cronograma:** Desglose detallado de Capital, Interés y Saldo por cada cuota.
3. **Persistencia de Datos:** Guardado de simulaciones confirmadas en la base de datos relacional.
4. **Portafolio de Créditos:** Listado global de todos los préstamos registrados.
5. **Historial de Transacciones:** Registro inmutable de los movimientos y desembolsos.

## ⚙️ Estructura del Proyecto

Se aplicó una arquitectura limpia de componentes y separación de responsabilidades:
* `/src/app/loans/simulate`: Interfaz de simulación y cálculo.
* `/src/app/loans/[id]`: Rutas dinámicas para visualizar el detalle de un préstamo específico.
* `/src/lib/api.ts`: Configuración centralizada del cliente HTTP (Axios) para comunicación con la API.

## 🛠️ Instalación y Ejecución Local

### Prerrequisitos
* Node.js (v18 o superior)
* Tener el backend (`sgip-bancosol-api`) corriendo localmente en el puerto configurado.

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/TU_USUARIO/sgip-bancosol-frontend.git](https://github.com/TU_USUARIO/sgip-bancosol-frontend.git)

2. Instalar Dependencias
```bash
   npm install

3. Configurar variables de entorno
    . Crear un archivo .env.local en la raíz.
    . Agregar la URL de la API: NEXT_PUBLIC_API_URL=http://localhost:5000/api (Ajustar según puerto de API)

4. Iniciar el servidor de desarrollo:
    npm run dev
   