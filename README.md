# StockEasy

## Descripción de nuestro proyecto

**StockEasy** es una aplicación web diseñada para gestionar inventarios de manera fácil y eficiente. Permite a los usuarios realizar un seguimiento en tiempo real del stock de productos, gestionar categorías, proveedores, y realizar análisis detallados del inventario. Desarrollado como parte de un proyecto universitario, StockEasy busca automatizar las tareas relacionadas con el inventario utilizando tecnologías modernas como **React**, **Next.js**, **Supabase**, **TailwindCSS** y **NextAuth**.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Contribuidores](#contribuidores)
- [Licencia](#licencia)

## Características

- **Gestión de productos**: Añadir, editar y eliminar productos del inventario.
- **Actualización en tiempo real**: Sincronización de datos gracias a Supabase.
- **Gestión de categorías**: Organización de productos en diferentes categorías.
- **Alertas de inventario bajo**: Notificaciones cuando el stock de un producto está por debajo de un umbral definido.
- **Autenticación segura**: Autenticación y gestión de usuarios mediante NextAuth.
- **Interfaz moderna y responsive**: Diseñada con TailwindCSS para ser rápida y atractiva en cualquier dispositivo.

## Tecnologías Utilizadas

- **React**: Para la creación de componentes y gestión del estado.
- **Next.js**: Framework para SSR (Server-Side Rendering) y optimización de la web.
- **Supabase**: Base de datos y autenticación en tiempo real basada en PostgreSQL.
- **TailwindCSS**: Framework CSS para un diseño eficiente y estilización moderna.
- **NextAuth**: Solución completa de autenticación para Next.js.
- **Vercel**: Para el despliegue y hosting del proyecto.

## Uso

### Añadir un producto
1. Navega a la sección **Inventario** en el menú principal.
2. Haz clic en **Añadir Producto**.
3. Rellena los campos requeridos como nombre del producto, categoría, cantidad y precio.
4. Guarda el producto para que se añada al inventario.

### Actualizar stock
1. En la tabla de inventario, selecciona el producto cuyo stock deseas actualizar.
2. Haz clic en **Editar** e ingresa la nueva cantidad de stock disponible.
3. Guarda los cambios.

## Proceso de Desarrollo

### 1. Planificación
Primero, el equipo se reunió para discutir los requisitos y funcionalidades clave del software. Identificamos las necesidades de los usuarios y creamos un esquema de las funciones más importantes, como la gestión de productos, categorías, y alertas de inventario bajo. También decidimos utilizar una arquitectura basada en el stack **React + Next.js + Supabase** para garantizar una escalabilidad óptima.

### 2. Diseño de la interfaz
Usamos **Excalidraw** para diseñar prototipos de alta fidelidad de las pantallas clave de la aplicación. Esto incluyó la creación de un dashboard para la gestión de productos, así como formularios para la entrada y edición de datos.

### 3. División del trabajo
- **Frontend (React y TailwindCSS)**: Dos miembros trabajaron en los componentes de la interfaz de usuario, asegurando que la aplicación fuera responsiva y atractiva visualmente.
- **Backend (Supabase y Next.js API)**: Un miembro se enfocó en la integración con la base de datos y la configuración del backend usando Supabase para manejar el almacenamiento de datos y la autenticación.
- **Autenticación (NextAuth)**: Un miembro implementó la autenticación segura utilizando NextAuth para garantizar el acceso adecuado a la aplicación.

### 4. Integración de Supabase
Se creó una instancia de Supabase y se configuraron las tablas necesarias para productos, categorías y usuarios. Supabase nos permitió realizar operaciones CRUD (crear, leer, actualizar y eliminar) en tiempo real sin necesidad de configurar un servidor de base de datos desde cero.

### 5. Autenticación con NextAuth
Se configuró **NextAuth** para manejar la autenticación de usuarios, permitiendo el registro e inicio de sesión con proveedores como Google. Esto garantizó que solo usuarios autenticados pudieran gestionar el inventario.

### 6. Pruebas
Realizamos pruebas unitarias en los componentes clave del frontend y backend. Además, se llevaron a cabo pruebas de integración para asegurarnos de que el flujo de datos entre la interfaz y la base de datos fuera correcto. Cada miembro hizo revisiones cruzadas del código.

> Debido a la complejidad de las pruebas unitarias decidimos hacer un archivo markdown aparte para esta documentación.

[Sigase aqui 📒](https://github.com/EstP19/StockEasy/blob/main/src/PruebasUnitarias/Tester.md)

### 7. Despliegue
Finalmente, desplegamos la aplicación en **Vercel**, que facilitó el despliegue continuo con cada cambio hecho en el repositorio de GitHub.

## Contribuidores

Este proyecto está siendo desarrollado por:

- **Romer Alexander Almeida** - Frontend Developer
- **Juan Esteban Santander Acero** - Backend Developer
- **Yesi Esteban Pantoja Cuellar** - Full-Stack Developer
- **Javier Nicolas Salas Liñeiro** - Project Manager

## Licencia

Este proyecto está bajo la licencia MIT - consulta el archivo [LICENSE](./LICENSE) para más detalles.
