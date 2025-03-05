// src/app/features/orders/models/order.spec.ts
import { Order } from './order';
import { StateOrder } from '../enums/state-order';

describe('Order Model', () => {
  it("devrait créer une instance avec les valeurs par défaut si aucun objet n'est fourni", () => {
    const order = new Order();
    expect(order.unitPrice).toBe(500);
    expect(order.nbOfDays).toBe(1);
    expect(order.vat).toBe(20);
    expect(order.state).toBe(StateOrder.OPTION);
    // Les propriétés sans valeur par défaut restent indéfinies
    expect(order.type).toBeUndefined();
    expect(order.customer).toBeUndefined();
    expect(order.comment).toBeUndefined();
    expect(order.id).toBeUndefined();
  });

  it('devrait assigner correctement les valeurs fournies', () => {
    // Assurez-vous que votre enum StateOrder possède la valeur CONFIRMED
    const customData = {
      unitPrice: 750,
      nbOfDays: 3,
      vat: 10,
      state: StateOrder.CONFIRMED, // Utilisez ici une valeur existante dans votre enum
      type: 'CustomType',
      customer: 'John Doe',
      comment: 'Commande urgente',
      id: 'order123',
    };

    const order = new Order(customData);
    expect(order.unitPrice).toBe(customData.unitPrice);
    expect(order.nbOfDays).toBe(customData.nbOfDays);
    expect(order.vat).toBe(customData.vat);
    expect(order.state).toBe(customData.state);
    expect(order.type).toBe(customData.type);
    expect(order.customer).toBe(customData.customer);
    expect(order.comment).toBe(customData.comment);
    expect(order.id).toBe(customData.id);
  });

  it('devrait conserver les valeurs par défaut pour les propriétés non fournies', () => {
    const customData = {
      unitPrice: 600,
      nbOfDays: 2,
    };

    const order = new Order(customData);
    // Les valeurs fournies écrasent les valeurs par défaut
    expect(order.unitPrice).toBe(600);
    expect(order.nbOfDays).toBe(2);
    // Les valeurs non précisées restent celles définies par défaut dans la classe
    expect(order.vat).toBe(20);
    expect(order.state).toBe(StateOrder.OPTION);
    // Les autres propriétés ne sont pas définies
    expect(order.type).toBeUndefined();
    expect(order.customer).toBeUndefined();
    expect(order.comment).toBeUndefined();
    expect(order.id).toBeUndefined();
  });
});
