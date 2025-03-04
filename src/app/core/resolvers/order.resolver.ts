import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { OrdersService } from '../../features/orders/services/orders.service';
import { Order } from '../../features/orders/models/order';

export const orderResolver: ResolveFn<Order | null> = (route, state) => {
  const id = route.paramMap.get('id');
  if (!id) {
    // Gérer le cas où l'ID est manquant
    // Par exemple, rediriger ou retourner une valeur par défaut
    return of(null);
  }
  return inject(OrdersService)
    .getItemById(id)
    .pipe(
      catchError((error) => {
        // Gérer l'erreur, par exemple en redirigeant l'utilisateur
        // ou en retournant une valeur par défaut
        console.error('Erreur lors de la récupération de la commande', error);
        return of(null);
      })
    );
};
