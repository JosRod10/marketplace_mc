import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'; // Importar map desde rxjs/operators
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  private userSource = new BehaviorSubject<any>(null);
  currentUser = this.userSource.asObservable();

  constructor(private firestore: Firestore, 
    private http: HttpClient, 
    private storage: Storage,
    private router: Router
  ) {}

    // Método para agregar un producto con imagen
  // async agregarProducto(producto: FormData): Promise<void> {
  //   const imagenFile = producto.get('imagen') as File; // Obtén el archivo de imagen del FormData

    // Sube la imagen a Firebase Storage
    // const imagenUrl = await this.subirImagen(imagenFile);

    // Guarda los datos del producto en Firestore, incluyendo la URL de la imagen
    // const productosRef = collection(this.firestore, 'productos');
    // await addDoc(productosRef, {
    //   nombre: producto.get('nombre'),
    //   descripcion: producto.get('descripcion'),
    //   precio: producto.get('precio'),
    //   imagenUrl: imagenUrl,
    // });

    // console.log('Producto agregado correctamente');
    //this.router.navigate(['/home']); // Redirige al home después de agregar el producto
  // }

  // Método para subir la imagen a Firebase Storage
  // private async subirImagen(imagenFile: File): Promise<string> {
  //   const storageRef = ref(this.storage, `productos/${imagenFile.name}`); // Ruta en Storage
  //   await uploadBytes(storageRef, imagenFile); // Sube el archivo
  //   const imagenUrl = await getDownloadURL(storageRef); // Obtiene la URL de descarga
  //   return imagenUrl;
  // }

  // Método para agregar un producto con imagen
async agregarProducto(producto: FormData): Promise<void> {
  const imagenFile = producto.get('imagen') as File; // Obtén el archivo de imagen del FormData
  const imagenBase64 = await this.convertirImagenABase64(imagenFile); // Convierte la imagen a Base64

  // Guarda los datos del producto en Firestore, incluyendo la imagen en Base64
  const productosRef = collection(this.firestore, 'productos');
  await addDoc(productosRef, {
    nombre: producto.get('nombre'),
    descripcion: producto.get('descripcion'),
    precio: producto.get('precio'),
    imagenBase64: imagenBase64, // Guarda la imagen como Base64
    nomNegocio: producto.get('nomNegocio'),
  });

  console.log('Producto agregado correctamente');
  this.router.navigate(['/home']); // Redirige al home después de agregar el producto
}

// Método para convertir la imagen a Base64
private convertirImagenABase64(imagenFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // Retorna el string en Base64
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(imagenFile); // Convierte la imagen a Base64
  });
}

async agregarUsuario(usuario: any): Promise<void> {
 
  // Guarda los datos del usuario en Firestore
  const usuarioRef = collection(this.firestore, 'usuarios');
  await addDoc(usuarioRef, {
    nombre: usuario.displayName, // Accede directamente a las propiedades del objeto
    correo: usuario.email,
    tipoUsuario: usuario.tipoUsuario,
    negocio: usuario.tipoUsuario === 'cliente' ? '' : usuario.nomNegocio, // Verifica el tipo de usuario
    token: usuario.accessToken,
    uid: usuario.uid,
    fecha: usuario.lastSignInTime,
    contrasena: usuario.contrasena,

  });

  console.log('Usuario agregado correctamente');
}

updateUser(user: any) {
  this.userSource.next(user);
}


  // Obtiene todos los productos de Firestore
  // obtenerProductos(): Observable<any[]> {
  //   const productosRef = collection(this.firestore, 'productos'); // Referencia a la colección "productos"
  //   return collectionData(productosRef, { idField: 'id' }) as Observable<any[]>; // Obtiene los productos
  // }

  // Obtiene todos los productos de Firestore
obtenerProductos(): Observable<any[]> {
  const productosRef = collection(this.firestore, 'productos'); // Referencia a la colección "productos"
  
  return collectionData(productosRef, { idField: 'id' }).pipe(
    map((productos: any[]) => 
      productos.map(producto => {
        // Aquí se asume que 'imagenBase64' es el campo donde guardaste la imagen
        return {
          ...producto,
          imagenUrl: producto.imagenBase64 // Se puede usar para mostrar la imagen
        };
      })
    )
  ) as Observable<any[]>; // Obtiene los productos
}


  async obtenerProductoPorId(id: string): Promise<any> {
    const productoRef = doc(this.firestore, 'productos', id); // Referencia al documento
    const productoDoc = await getDoc(productoRef); // Obtiene el documento
    if (productoDoc.exists()) {
      return { id: productoDoc.id, ...productoDoc.data() }; // Retorna el producto con su ID
    } else {
      throw new Error('Producto no encontrado');
    }
  }

  actualizarProducto(productoId: string, datosActualizados: any): Promise<void> {
    const productoRef = doc(this.firestore, 'productos', productoId);
    return updateDoc(productoRef, datosActualizados);
  }

  // Método para eliminar el producto
  // eliminarProducto(productoId: string): Promise<void> {
  //   const productoRef = doc(this.firestore, 'productos', productoId); // Referencia al producto en Firestore
  //   return deleteDoc(productoRef); // Elimina el producto de Firebase
  // }

  // Método para eliminar el producto con confirmación
eliminarProducto(productoId: string): Promise<void> {
  // Muestra un mensaje de confirmación antes de proceder
  const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.');
  
  if (confirmar) {
    const productoRef = doc(this.firestore, 'productos', productoId); // Referencia al producto en Firestore
    return deleteDoc(productoRef) // Elimina el producto de Firebase
      .then(() => {
        console.log('Producto eliminado correctamente');
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  } else {
    console.log('Eliminación cancelada');
    return Promise.resolve(); // Si el usuario cancela, no hace nada
  }
}

  
}