import toJSON from '@shared/helpers/mongo.helper';
import { Document, Schema, SchemaTypes, model } from 'mongoose';

enum ProductCategory {
    NFT = 'NFT',
    TOKEN = 'TOKEN',
    DEFI = 'DEFI',
    GAMEFI = 'GAMEFI',
    METAVERSE = 'METAVERSE',
    OTHER = 'OTHER',
}

enum BlockchainEnum {
    BTC = 'BTC',
    ETH = 'ETH',
    USDT = 'USDT',
    BNB = 'BNB',
    SOL = 'SOL',
    TON = 'TON',
    NEAR = 'NEAR',
}

interface ProductMetadata {
    traitType?: string;
    value?: any;
}

interface IProduct extends Document {
    id: string;
    name: string;
    description?: string;
    price: number;
    blockchain: BlockchainEnum;
    contractAddress?: string;
    tokenId?: string;
    category: ProductCategory;
    supply: number;
    isNFT: boolean;
    imageUrl?: string;
    author?: string;
    metadata: ProductMetadata[];
    createdAt: Date;
    updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true, min: 0 },
        blockchain: { type: String, enum: BlockchainEnum, required: true },
        contractAddress: { type: String },
        tokenId: { type: String },
        category: { type: String, enum: ProductCategory, required: true },
        supply: { type: Number, required: true, min: 0, default: 1 },
        isNFT: { type: Boolean, default: false },
        author: { type: String },
        metadata: [{ traitType: String, value: SchemaTypes.Mixed }],
        imageUrl: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

ProductSchema.plugin(toJSON);

const ProductModel = model<IProduct>('products', ProductSchema, 'products');

export { ProductCategory, BlockchainEnum, ProductModel, IProduct };
