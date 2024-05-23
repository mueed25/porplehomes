import { buildConfig } from "payload/config";
import {slateEditor} from '@payloadcms/richtext-slate'
import {mongooseAdapter} from '@payloadcms/db-mongodb'
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";
import dotenv from 'dotenv'
import {Users} from "./collections/Users";
import { Properties } from "./collections/Products/Properties";
import {Orders} from "./collections/Orders";
import { PropertyFiles } from "./collections/PropertyFile";
import { Workers } from "./collections/Workers";
import { Tenants } from "./collections/Tenants";
import { Media } from "./collections/Media";
import { Tenant } from "./collections/Tenant1";
import { Announcement } from "./collections/Announcement";
import { TenantMessage } from "./collections/TenantMessage";
import { Subscription } from "./collections/Subscription";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
})


export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
    collections: [Users,Properties,Media,Orders,PropertyFiles,Workers,Tenants, Tenant, Announcement, TenantMessage,Subscription],
    routes: {
        admin:'/sell'
    },
    admin: {
        user: 'users',
        bundler: webpackBundler(),
        meta: {
            titleSuffix: 'Porplehomes',
            favicon: '/favicon.ico',
            ogImage: '/thumbnail.jgg'
        },
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types-ts')
    }
})