import { Model } from "mongoose";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateShoppingCartDto } from "./dto/createShoppingCartDto";
import { UpdateShoppingCartDto } from "./dto/updateShoppingCartDto";
import { ShoppingCart } from "./entity/shoppingCartEntity";
import { Product } from "../products/entities/product.entity";
@Injectable()
export class ShoppingCartService {
    constructor(@InjectModel(ShoppingCart.name) private readonly ShoppingCartModel: Model<ShoppingCart>
        , @InjectModel(Product.name) private readonly productModel: Model<Product>
    ) { }

    async createShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
        const createdCart = new this.ShoppingCartModel(createShoppingCartDto);
        return createdCart.save();
    }

    async findAllShoppingCarts(): Promise<ShoppingCart[]> {
        return this.ShoppingCartModel.find().exec();
    }

    async findOneShoppingCart(id: string): Promise<ShoppingCart> {
        const cart = await this.ShoppingCartModel.findById(id).exec();
        if (!cart) {
            throw new NotFoundException(`Shopping cart with ID ${id} not found`);
        }
        return cart;
    }

    async updateOneShoppingCart(id: string, updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
        const updatedCart = await this.ShoppingCartModel.findByIdAndUpdate(id, updateShoppingCartDto, { new: true, runValidators: true }).exec();
        if (!updatedCart) {
            throw new NotFoundException(`Shopping cart with ID ${id} not found`);
        }
        return updatedCart;
    }

    async removeOneShoppingCart(id: string): Promise<ShoppingCart> {
        const result = await this.ShoppingCartModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Shopping cart with ID ${id} not found`);
        }
        return result;
    }

    async addItemToCart(
        cartId: string,
        productId: string,
        quantity: number,
        price?: number
    ): Promise<ShoppingCart> {
        const cart = await this.findOneShoppingCart(cartId);

        // Fetch product price from DB if price not provided
        const product = await this.productModel.findById(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        price = Number(price ?? product.price);

        // Ensure quantity is a valid number
        quantity = Number(quantity);
        if (isNaN(quantity) || quantity <= 0) {
            throw new BadRequestException('Quantity must be a positive number');
        }

        // Check if item already exists
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = Number(cart.items[itemIndex].quantity || 0) + quantity;
            cart.items[itemIndex].price = price;
        } else {
            cart.items.push({
                productId,
                quantity,
                price,
            });
        }

        // Sanitize all items to prevent NaN
        cart.items = cart.items.map((item) => ({
            productId: item.productId,
            quantity: Number(item.quantity) || 0,
            price: Number(item.price) || 0,
        }));

        // Recalculate totals
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        cart.finalPrice = cart.totalPrice - (cart.discount || 0);

        return cart.save();
    }


    async removeItemFromCart(cartId: string, productId: string): Promise<ShoppingCart> {
        const cart = await this.findOneShoppingCart(cartId);

        // Remove the item
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Sanitize remaining items in place
        cart.items.forEach(item => {
            item.quantity = Number(item.quantity) || 0;
            item.price = Number(item.price) || 0;
        });

        // Recalculate totals
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        cart.finalPrice = cart.totalPrice - (cart.discount || 0);

        return cart.save();
    }
    
    async clearCart(cartId: string): Promise<ShoppingCart> {
        const cart = await this.findOneShoppingCart(cartId);

        cart.items = []; // Clear the items
        cart.totalPrice = 0;
        cart.finalPrice = 0;

        return cart.save();
    }

}