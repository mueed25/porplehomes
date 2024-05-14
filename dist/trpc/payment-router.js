"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("./trpc");
var server_1 = require("@trpc/server");
var getPayloadClient_1 = require("../getPayloadClient");
// import { useRouter } from 'next/navigation'
exports.paymentRouter = (0, trpc_1.router)({
    createSession: trpc_1.privateProcedure
        .input(zod_1.z.object({ productid: zod_1.z.string() }))
        .mutation(function (_a) {
        var ctx = _a.ctx, input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, productid, payload, product, filteredProduct, order;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.user;
                        productid = input.productid;
                        if (productid.length === 0) {
                            throw new server_1.TRPCError({ code: 'BAD_REQUEST' });
                        }
                        return [4 /*yield*/, (0, getPayloadClient_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'property',
                                where: {
                                    id: {
                                        in: productid
                                    }
                                }
                            })];
                    case 2:
                        product = (_b.sent()).docs;
                        filteredProduct = product.filter(function (prod) { return Boolean(prod.price); });
                        return [4 /*yield*/, payload.create({
                                collection: 'orders',
                                data: {
                                    _isPaid: false,
                                    Status: "Processing",
                                    products: filteredProduct.map(function (prod) { return prod.id; }),
                                    user: user.id,
                                },
                            })];
                    case 3:
                        order = _b.sent();
                        return [2 /*return*/, { sucess: true, data: user.email, id: order.id }];
                }
            });
        });
    }),
    pollOrderStatus: trpc_1.privateProcedure
        .input(zod_1.z.object({ orderId: zod_1.z.string() }))
        .query(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var orderId, payload, orders, order;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orderId = input.orderId;
                        return [4 /*yield*/, (0, getPayloadClient_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'orders',
                                where: {
                                    id: {
                                        equals: orderId,
                                    },
                                },
                            })];
                    case 2:
                        orders = (_b.sent()).docs;
                        if (!orders.length) {
                            throw new server_1.TRPCError({ code: 'NOT_FOUND' });
                        }
                        order = orders[0];
                        return [2 /*return*/, { isPaid: order._isPaid }];
                }
            });
        });
    }),
    createTenant: trpc_1.privateProcedure
        .input(zod_1.z.object({
        Full_name: zod_1.z.string(),
        Phone_number: zod_1.z.string(),
        productId: zod_1.z.string(),
        Adress: zod_1.z.string(),
        Gender: zod_1.z.string(),
        City: zod_1.z.string(),
        State: zod_1.z.string()
    }))
        .mutation(function (_a) {
        var ctx = _a.ctx, input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var user, productId, Full_name, Phone_number, Gender, Adress, City, State, payload, product, filteredProduct;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user = ctx.user;
                        productId = input.productId, Full_name = input.Full_name, Phone_number = input.Phone_number, Gender = input.Gender, Adress = input.Adress, City = input.City, State = input.State;
                        if (productId.length === 0) {
                            throw new server_1.TRPCError({ code: 'BAD_REQUEST' });
                        }
                        return [4 /*yield*/, (0, getPayloadClient_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.find({
                                collection: 'property',
                                where: {
                                    id: {
                                        in: productId
                                    }
                                }
                            })];
                    case 2:
                        product = (_b.sent()).docs;
                        filteredProduct = product.filter(function (prod) { return Boolean(prod.id); });
                        return [4 /*yield*/, payload.create({
                                collection: 'Tenant',
                                data: {
                                    Gender: Gender,
                                    Full_name: Full_name,
                                    Phone_number: Phone_number,
                                    products: filteredProduct.map(function (prod) { return prod.id; }),
                                    user: user.id,
                                    Adress: Adress,
                                    City: City,
                                    State: State,
                                },
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { sucess: true }];
                }
            });
        });
    }),
    createAnnouncement: trpc_1.publicProcedure
        .input(zod_1.z.object({
        Email: zod_1.z.string(),
        Subject: zod_1.z.string(),
        Message: zod_1.z.string()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var Email, Subject, Message, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Email = input.Email, Subject = input.Subject, Message = input.Message;
                        return [4 /*yield*/, (0, getPayloadClient_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: 'Announce',
                                data: {
                                    Email: Email,
                                    Subject: Subject,
                                    Message: Message,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, { sucess: true }];
                }
            });
        });
    }),
    createMessage: trpc_1.publicProcedure
        .input(zod_1.z.object({
        Email: zod_1.z.string(),
        Message: zod_1.z.string(),
        Subject: zod_1.z.string()
    }))
        .mutation(function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var Email, Message, Subject, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Email = input.Email, Message = input.Message, Subject = input.Subject;
                        return [4 /*yield*/, (0, getPayloadClient_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: 'TenantM',
                                data: {
                                    Email: Email,
                                    Subject: Subject,
                                    Message: Message,
                                    Date: String(new Date().toLocaleString()),
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, { sucess: true }];
                }
            });
        });
    }),
    createTenant1: trpc_1.publicProcedure
        .input(zod_1.z.object({
        Full_name: zod_1.z.string(),
        Phone_number: zod_1.z.string(),
        Adress: zod_1.z.string(),
        Email: zod_1.z.string(),
        City: zod_1.z.string(),
        State: zod_1.z.string(),
        Unit_name: zod_1.z.string(),
        Unit_building: zod_1.z.string(),
        Unit_category: zod_1.z.string()
    }))
        .mutation(function (_a) {
        var ctx = _a.ctx, input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var Email, Full_name, Phone_number, Unit_name, Unit_building, Unit_category, Adress, City, State, payload;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        Email = input.Email, Full_name = input.Full_name, Phone_number = input.Phone_number, Unit_name = input.Unit_name, Unit_building = input.Unit_building, Unit_category = input.Unit_category, Adress = input.Adress, City = input.City, State = input.State;
                        return [4 /*yield*/, (0, getPayloadClient_1.getPayloadClient)()];
                    case 1:
                        payload = _b.sent();
                        return [4 /*yield*/, payload.create({
                                collection: 'Tenant1',
                                data: {
                                    Email: Email,
                                    Full_name: Full_name,
                                    Phone_number: Phone_number,
                                    Unit_name: Unit_name,
                                    Unit_building: Unit_building,
                                    Unit_category: Unit_category,
                                    Adress: Adress,
                                    City: City,
                                    State: State,
                                },
                            })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, { sucess: true }];
                }
            });
        });
    })
});
