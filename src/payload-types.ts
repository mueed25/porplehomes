/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    property: Property;
    media: Media;
    orders: Order;
    property_files: PropertyFile;
    workers: Worker;
    Tenant: Tenant;
    Tenant1: Tenant1;
    Announce: Announce;
    TenantM: TenantM;
    subscription: Subscription;
    agentmedia: Agentmedia;
    advertisement: Advertisement;
    advert: Advert;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  products?: (string | Property)[] | null;
  product_files?: (string | PropertyFile)[] | null;
  role: 'admin' | 'user';
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "property".
 */
export interface Property {
  id: string;
  user?: (string | null) | User;
  Company_name: string;
  agentimage: {
    agentimages: string | Agentmedia;
    id?: string | null;
  }[];
  Agent_full_name: string;
  AgentContact_number: string;
  Agent_Gmail: string;
  name: string;
  unit_building: string;
  unit_category: string;
  Unit_name: string;
  description?: string | null;
  Payment_type: 'Rent' | 'Buy';
  price: number;
  Property_type: 'Housings' | 'Real Estate';
  State:
    | 'Abia'
    | 'Adamawa'
    | 'Akwa Ibom'
    | 'Anambra'
    | 'Bauchi'
    | 'Bayelsa'
    | 'Benue'
    | 'Borno'
    | 'Cross River'
    | 'Delta'
    | 'Ebonyi'
    | 'Edo'
    | 'Ekiti'
    | 'Enugu'
    | 'Gombe'
    | 'Imo'
    | 'Jigawa'
    | 'Kaduna'
    | 'Kano'
    | 'Katsina'
    | 'Kebbi'
    | 'Kogi'
    | 'Kwara'
    | 'Lagos'
    | 'Nasarawa'
    | 'Niger'
    | 'Ogun'
    | 'Ondo'
    | 'Osun'
    | 'Oyo'
    | 'Plateau'
    | 'Rivers'
    | 'Sokoto'
    | 'Taraba'
    | 'Yobe'
    | 'Zamfara'
    | 'Federal Capital Territory (FCT)';
  Bedrooms?: number | null;
  Days: string;
  property_files?: (string | null) | PropertyFile;
  approvedForSale?: ('pending' | 'approved' | 'denied') | null;
  images: {
    images: string | Media;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "agentmedia".
 */
export interface Agentmedia {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "property_files".
 */
export interface PropertyFile {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  _isPaid: boolean;
  user: string | User;
  Status: 'Paid' | 'Processing' | 'Failed' | 'Renewed';
  products: (string | Property)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "workers".
 */
export interface Worker {
  id: string;
  user?: (string | null) | User;
  Full_name: string;
  Phone_number: string;
  Working_field: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Tenant".
 */
export interface Tenant {
  id: string;
  user?: (string | null) | User;
  Full_name: string;
  Phone_number: string;
  Gender: string;
  Adress: string;
  City: string;
  State: string;
  products: (string | Property)[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Tenant1".
 */
export interface Tenant1 {
  id: string;
  Full_name: string;
  Phone_number: string;
  Adress: string;
  Email: string;
  City: string;
  State: string;
  Unit_name: string;
  Unit_building: string;
  Unit_category: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "Announce".
 */
export interface Announce {
  id: string;
  Email: string;
  Subject: string;
  Message: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TenantM".
 */
export interface TenantM {
  id: string;
  Email: string;
  Subject: string;
  Date: string;
  Message: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "subscription".
 */
export interface Subscription {
  id: string;
  user?: (string | null) | User;
  membership: 'standard' | 'premium';
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "advertisement".
 */
export interface Advertisement {
  id: string;
  user?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: {
    thumbnail?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    card?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
    tablet?: {
      url?: string | null;
      width?: number | null;
      height?: number | null;
      mimeType?: string | null;
      filesize?: number | null;
      filename?: string | null;
    };
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "advert".
 */
export interface Advert {
  id: string;
  user?: (string | null) | User;
  Description: string;
  images: {
    images: string | Advertisement;
    id?: string | null;
  }[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}