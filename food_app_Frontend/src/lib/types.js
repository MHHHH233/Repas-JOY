// Menu item type definition
export const MenuItemType = {
  id: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  rating: Number,
}

// Cart item type definition
export const CartItemType = {
  id: String,
  menuItem: MenuItemType,
  quantity: Number,
}

// Cart type definition
export const CartType = {
  items: [CartItemType],
  total: Number,
}
