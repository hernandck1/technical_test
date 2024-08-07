# CIC Prueba Técnica

Este proyecto es una prueba técnica desarrollada para CIC, enfocada en una aplicación móvil para plataformas Android e iOS. La aplicación ha sido creada utilizando Ionic con Angular y Capacitor.

## Tecnologías Utilizadas

- **Ionic Framework**: Versión 8.2.6
- **Angular**: Versión 18.1.3
- **Capacitor**: Versión 6.1.1

### Detalles de la configuración

- **Ionic CLI**: 7.2.0
- **@angular-devkit/build-angular**: 18.1.3
- **@angular-devkit/schematics**: 18.1.3
- **@angular/cli**: 18.1.3
- **@ionic/angular-toolkit**: 11.0.1

### Capacitor Plugins

- **Capacitor CLI**: 6.1.1
- **@capacitor/android**: 6.1.1
- **@capacitor/core**: 6.1.1
- **@capacitor/ios**: 6.1.1

### Sistema

- **NodeJS**: v20.11.1
- **npm**: 10.8.2
- **OS**: macOS

## Funcionalidades Principales

### Uso de la Cámara

La aplicación utiliza el plugin nativo de cámara de Capacitor para tomar fotografías o seleccionar imágenes desde la biblioteca del dispositivo.

### Recorte de Imágenes

Para recortar las imágenes tomadas o seleccionadas, se utiliza un complemento de terceros llamado **Pica**. Pica es una biblioteca de JavaScript que permite redimensionar imágenes con alta calidad y eficiencia. Es utilizada para asegurarse de que las imágenes sean cuadradas y ajustadas adecuadamente antes de ser guardadas o utilizadas en la aplicación.

[Pica - GitHub Repository](https://github.com/nodeca/pica)

### Manejo de Datos

Los datos de la aplicación se manejan de forma local utilizando **localStorage**. Esto se debe a que los requisitos del proyecto no especificaban la necesidad de una conexión a una base de datos externa. Sin embargo, los datos presentados en el módulo "Mi Perfil" son actualizables, permitiendo al usuario modificar su información según sea necesario.

## Desarrollador

**Hernan David Catacoly**

Correo: [hernandck@msn.com](mailto:hernandck@msn.com)

---
