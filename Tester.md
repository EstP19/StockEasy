# Descripción de Pruebas para Componentes

Este documento describe las pruebas realizadas para los componentes `LoginForm`, `Sales` e `Inventory`, con el propósito de asegurar la funcionalidad y fiabilidad en cada módulo.

---

## Tabla de Contenido
- [Componente LoginForm](#componente-loginform)
  - [Renderizado del Formulario de Inicio de Sesión](#prueba-renderizado-del-formulario-de-inicio-de-sesión)
  - [Entrada de Usuario y Contraseña](#prueba-entrada-de-usuario-y-contraseña)
  - [Inicio de Sesión con Credenciales Válidas](#prueba-inicio-de-sesión-con-credenciales-válidas)
- [Componente Sales](#componente-sales)
  - [Renderizado del Componente](#prueba-renderizado-del-componente)
  - [Obtener y Mostrar Productos de Venta](#prueba-obtener-y-mostrar-productos-de-venta)
  - [Agregar un Nuevo Producto de Venta](#prueba-agregar-un-nuevo-producto-de-venta)
  - [Editar un Producto Existente](#prueba-editar-un-producto-existente)
  - [Eliminar un Producto](#prueba-eliminar-un-producto)
- [Componente Inventory](#componente-inventory)
  - [Renderizado de Inventario y Visualización de Productos](#prueba-renderizado-de-inventario-y-visualización-de-productos)
  - [Agregar un Nuevo Producto](#prueba-agregar-un-nuevo-producto)
  - [Editar un Producto Existente](#prueba-editar-un-producto-existente)
  - [Eliminar un Producto](#prueba-eliminar-un-producto)
  - [Búsqueda de un Producto](#prueba-búsqueda-de-un-producto)

---

## Componente LoginForm

### Prueba: Renderizado del Formulario de Inicio de Sesión

```js
// Descripción: Verifica que el componente LoginForm se renderice correctamente sin errores, mostrando el texto "Iniciar sesión".
it('renders login form without crashing', () => {
    render(<LoginForm />);
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
});
```

## Prueba: Entrada de Usuario y Contraseña
### Descripción: Asegura que los campos de correo electrónico y contraseña acepten entrada de datos correctamente.
```js
it('allows user to enter email and password', () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });

    expect(screen.getByPlaceholderText('Correo electrónico').value).toBe('test@example.com');
    expect(screen.getByPlaceholderText('Contraseña').value).toBe('password123');
});
```
## Prueba: Inicio de Sesión con Credenciales Válidas
### Descripción: Comprueba que el formulario de inicio de sesión llama al método de autenticación con las credenciales correctas.
```js
it('logs in with valid credentials', async () => {
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'valid@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'correctpassword' } });
    fireEvent.click(screen.getByText('Iniciar sesión'));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('valid@example.com', 'correctpassword'));
});

```
## Componente Sales
### Prueba: Renderizado del Componente

```js
// Prueba: Renderizado del Componente
// Descripción: Verifica que el componente Sales se renderice sin problemas.
it('should render without crashing', () => {
    render(<Sales onNavigate={mockOnNavigate} />);
    expect(screen.getByText('Ventas')).toBeInTheDocument();
});
```

## Prueba: Obtener y Mostrar Productos de Venta
### Descripción: Asegura que los productos se obtengan y se muestren correctamente en la lista de ventas.
```js
it('should fetch and display sales products', async () => {
    render(<Sales onNavigate={mockOnNavigate} />);
    await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
});
```
## Prueba: Agregar un Nuevo Producto de Venta
### Descripción: Comprueba que un nuevo producto de venta pueda agregarse correctamente y muestre un mensaje de éxito.
```js
it('should add a new sale product', async () => {
    render(<Sales onNavigate={mockOnNavigate} />);
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Cantidad'), { target: { value: '5' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '20' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Newly added' } });
    fireEvent.click(screen.getByText('Agregar Producto de Venta'));

    await waitFor(() => expect(screen.getByText('Producto agregado con éxito.')).toBeInTheDocument());
});
```
## Prueba: Editar un Producto Existente
### Descripción: Simula la edición de un producto y verifica que se muestre un mensaje de éxito tras la actualización.
```js
it('should edit an existing sale product', async () => {
    render(<Sales onNavigate={mockOnNavigate} />);
    fireEvent.click(screen.getByText('Editar'));
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByText('Guardar Cambios'));

    await waitFor(() => expect(screen.getByText('Producto editado con éxito.')).toBeInTheDocument());
});
```
## Prueba: Eliminar un Producto
### Descripción: Verifica que un producto pueda eliminarse y desaparezca de la lista de productos.
```js
it('should delete a sale product', async () => {
    render(<Sales onNavigate={mockOnNavigate} />);
    window.confirm = jest.fn(() => true);
    fireEvent.click(screen.getByText('Eliminar'));

    await waitFor(() => expect(screen.getByText('Producto eliminado con éxito.')).toBeInTheDocument());
});
``` 
## Componente Inventory
### Prueba: Renderizado de Inventario y Visualización de Productos
```js
// Descripción: Comprueba que el componente Inventory se renderice correctamente y que se muestren los productos iniciales.
test('renders inventory and shows initial products', async () => {
    expect(await screen.findByText('Inventario')).toBeInTheDocument();
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
});
```

## Prueba: Agregar un Nuevo Producto
### Descripción: Simula la adición de un nuevo producto en inventario y confirma que se muestre el mensaje de éxito y el producto en la lista.
```js
test('adds a new product', async () => {
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Cantidad'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '15' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Newly added' } });
    fireEvent.click(screen.getByText('Agregar Producto'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Producto agregado con éxito');
    });
});
```
## Prueba: Editar un Producto Existente
### Descripción: Verifica la edición de un producto existente y la visualización del mensaje de éxito.
```js
test('edits an existing product', async () => {
    fireEvent.click(screen.getByText('Editar', { selector: 'button' }));
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByText('Guardar Cambios'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Producto actualizado con éxito');
    });
});
```
## Prueba: Eliminar un Producto
### Descripción: Simula la eliminación de un producto y comprueba que el mensaje de éxito aparezca y que el producto ya no esté visible.
```js
test('deletes a product', async () => {
    const deleteButton = screen.getAllByText('Eliminar')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Producto eliminado con éxito');
    });
});
```
## Prueba: Búsqueda de un Producto
```js
test('searches for a product', async () => {
    const searchInput = screen.getByPlaceholderText('Buscar producto');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
```
