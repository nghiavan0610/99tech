import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { BlockchainEnum } from '../enums/blockchain.enum';
import { ProductCategory } from '../enums/product.enum';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    },
    toJSON: {
        transform: (doc: HydratedDocument<Product>, ret) => {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
        },
    },
})
export class Product {
    id: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String })
    description?: string;

    @Prop({ type: Number, min: 0, required: true })
    price: number;

    @Prop({ type: String, enum: BlockchainEnum, required: true })
    blockchain: BlockchainEnum;

    @Prop({
        type: String,
        validate: {
            validator: function (v: string) {
                // Basic validation for ethereum-style addresses
                return !v || /^0x[a-fA-F0-9]{40}$/.test(v);
            },
            message: 'Invalid contract address format',
        },
    })
    contractAddress?: string;

    @Prop({ type: String })
    tokenId?: string;

    @Prop({ type: String, enum: ProductCategory, required: true })
    category: ProductCategory;

    @Prop({ type: Number, required: true, min: 0, default: 1 })
    supply: number;

    @Prop({ type: Boolean, default: false })
    isNFT: boolean;

    @Prop({ type: String })
    imageUrl?: string;

    // TODO: Relation for User schema
    @Prop({ type: String })
    author?: string;

    @Prop([{ traitType: String, value: SchemaTypes.Mixed }])
    metadata: {
        traitType: string;
        value: any;
    }[];

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: Date })
    updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
