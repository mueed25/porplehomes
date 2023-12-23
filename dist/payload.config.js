"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("payload/config");
var richtext_slate_1 = require("@payloadcms/richtext-slate");
var db_mongodb_1 = require("@payloadcms/db-mongodb");
var bundler_webpack_1 = require("@payloadcms/bundler-webpack");
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var Users_1 = require("./collections/Users");
var Properties_1 = require("./collections/Products/Properties");
var Orders_1 = require("./collections/Orders");
var PropertyFile_1 = require("./collections/PropertyFile");
var Workers_1 = require("./collections/Workers");
var Tenants_1 = require("./collections/Tenants");
var Media_1 = require("./collections/Media");
dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, '../.env')
});
exports.default = (0, config_1.buildConfig)({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users_1.Users, Properties_1.Properties, Media_1.Media, Orders_1.Orders, PropertyFile_1.PropertyFiles, Workers_1.Workers, Tenants_1.Tenants],
    routes: {
        admin: '/sell'
    },
    admin: {
        user: 'users',
        bundler: (0, bundler_webpack_1.webpackBundler)(),
        meta: {
            titleSuffix: 'Porplehomes',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jgg'
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: (0, richtext_slate_1.slateEditor)({}),
    db: (0, db_mongodb_1.mongooseAdapter)({
        url: process.env.MONGODB_URL,
    }),
    typescript: {
        outputFile: path_1.default.resolve(__dirname, 'payload-types-ts')
    }
});
