/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../lib/global/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/index.ts"), exports);


/***/ }),

/***/ "../../lib/global/src/lib/constant.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.app = void 0;
exports.app = {
    title: 'Food Court Ordering App',
    currencySymbol: '₱',
};


/***/ }),

/***/ "../../lib/global/src/lib/contracts/auth-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.auth = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/auth`;
exports.auth = (0, core_1.initContract)().router({
    register: {
        method: 'POST',
        path: `${prefix}/register`,
        body: schemas_1.RegisterSchema,
        responses: {
            201: schemas_1.UserSchema,
        },
        summary: 'Register user',
    },
    login: {
        method: 'POST',
        path: `${prefix}/login`,
        body: schemas_1.LoginSchema,
        responses: {
            201: schemas_1.LoginResponseSchema,
        },
        summary: 'Login user',
    },
    verify: {
        method: 'GET',
        path: `${prefix}/verify`,
        responses: {
            200: schemas_1.TokenUserSchema,
        },
        summary: "Get current user's details",
    },
    changePassword: {
        method: 'POST',
        path: `${prefix}/change-password`,
        body: schemas_1.ChangePasswordSchema,
        responses: {
            201: schemas_1.UserSchema,
        },
        summary: "Change user's password",
    },
    verifyEmail: {
        method: 'GET',
        path: `${prefix}/verify-email`,
        query: schemas_1.VerifyQuerySchema,
        responses: {
            200: zod_1.z.string(),
        },
        summary: "Verify user's email",
    },
    resendVerifyEmail: {
        method: 'POST',
        path: `${prefix}/resend-verify-email`,
        body: zod_1.z.string().nullable(),
        responses: {
            201: schemas_1.LoginResponseSchema,
        },
        summary: "Resend user's email verification",
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/category-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.category = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/categories`;
exports.category = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.CategorySchema,
        },
        body: schemas_1.CreateCategorySchema,
        summary: 'Create a category',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.CategorySchema,
        },
        summary: 'Get a category by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetCategoriesOptionsSchema,
        responses: {
            200: schemas_1.GetCategoriesResponseSchema,
        },
        summary: 'Get a paginated list of categories',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        body: schemas_1.UpdateCategorySchema,
        responses: {
            201: schemas_1.CategorySchema,
        },
        summary: 'Update category',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete category',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contract = void 0;
const user_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/user-controller.contract.ts");
const auth_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/auth-controller.contract.ts");
const transaction_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/transaction-controller.contract.ts");
const core_1 = __webpack_require__("@ts-rest/core");
const category_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/category-controller.contract.ts");
const store_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/store-controller.contract.ts");
const product_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/product-controller.contract.ts");
const order_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/order-controller.contract.ts");
const payment_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/payment-controller.contract.ts");
const role_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/role-controller.contract.ts");
const permission_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/permission-controller.contract.ts");
const statistic_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/statistic-controller.contract.ts");
const notification_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/notification-controller.contract.ts");
const store_rating_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/store-rating-controller.contract.ts");
const tag_controller_contract_1 = __webpack_require__("../../lib/global/src/lib/contracts/tag-controller.contract.ts");
exports.contract = (0, core_1.initContract)().router({
    user: user_controller_contract_1.user,
    auth: auth_controller_contract_1.auth,
    transaction: transaction_controller_contract_1.transaction,
    category: category_controller_contract_1.category,
    store: store_controller_contract_1.store,
    product: product_controller_contract_1.product,
    order: order_controller_contract_1.order,
    payment: payment_controller_contract_1.payment,
    role: role_controller_contract_1.role,
    permission: permission_controller_contract_1.permission,
    statistic: statistic_controller_contract_1.statistic,
    notification: notification_controller_contract_1.notification,
    storeRating: store_rating_controller_contract_1.storeRating,
    tag: tag_controller_contract_1.tag,
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/notification-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.notification = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/notifications`;
exports.notification = (0, core_1.initContract)().router({
    count: {
        method: 'GET',
        path: `${prefix}/count`,
        responses: {
            200: schemas_1.NotificationsCountSchema,
        },
        summary: 'Notifications Count',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.NotificationSchema,
        },
        summary: 'Get a notification by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetNotificationsOptionsSchema,
        responses: {
            200: schemas_1.GetNotificationsResponseSchema,
        },
        summary: 'Get a paginated list of notifications',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete notification',
    },
    read: {
        method: 'PATCH',
        path: `${prefix}/:id/read`,
        body: zod_1.z.any().optional(),
        responses: {
            201: zod_1.z.any().optional(),
        },
        summary: 'Read notification',
    },
    readAll: {
        method: 'PATCH',
        path: `${prefix}/read-all`,
        body: zod_1.z.any().optional(),
        responses: {
            201: zod_1.z.any().optional(),
        },
        summary: 'Read all notifications',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/order-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.order = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/orders`;
exports.order = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.OrderSchema,
        },
        body: schemas_1.CreateOrderSchema,
        summary: 'Create a order',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.OrderSchema,
        },
        summary: 'Get a order by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetOrdersOptionsSchema,
        responses: {
            200: schemas_1.GetOrdersResponseSchema,
        },
        summary: 'Get a paginated list of orders',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        query: schemas_1.UnrestrictedSchema,
        body: schemas_1.UpdateOrderSchema,
        responses: {
            201: schemas_1.OrderSchema,
        },
        summary: 'Update order',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete order',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/payment-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.payment = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/payments`;
exports.payment = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.PaymentSchema,
        },
        body: schemas_1.CreatePaymentSchema,
        summary: 'Create a payment',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.PaymentSchema,
        },
        summary: 'Get a payment by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetPaymentsOptionsSchema,
        responses: {
            200: schemas_1.GetPaymentsResponseSchema,
        },
        summary: 'Get a paginated list of payments',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        body: schemas_1.UpdatePaymentSchema,
        responses: {
            201: schemas_1.PaymentSchema,
        },
        summary: 'Update payment',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete payment',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/permission-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.permission = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const prefix = `/api/v1/permissions`;
exports.permission = (0, core_1.initContract)().router({
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.PermissionSchema,
        },
        summary: 'Get a permission by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetPermissionsOptionsSchema,
        responses: {
            200: schemas_1.GetPermissionsResponseSchema,
        },
        summary: 'Get a paginated list of permissions',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/product-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.product = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/products`;
exports.product = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        contentType: 'multipart/form-data',
        responses: {
            201: schemas_1.ProductSchema,
        },
        body: schemas_1.CreateProductSchema,
        summary: 'Create a product',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.ProductSchema,
        },
        summary: 'Get a product by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetProductsOptionsSchema,
        responses: {
            200: schemas_1.GetProductsResponseSchema,
        },
        summary: 'Get a paginated list of products',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        contentType: 'multipart/form-data',
        body: schemas_1.UpdateProductSchema,
        responses: {
            201: schemas_1.ProductSchema,
        },
        summary: 'Update product',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete product',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/role-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.role = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/roles`;
exports.role = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.RoleSchema,
        },
        body: schemas_1.CreateRoleSchema,
        summary: 'Create a role',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.RoleSchema,
        },
        summary: 'Get a role by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetRolesOptionsSchema,
        responses: {
            200: schemas_1.GetRolesResponseSchema,
        },
        summary: 'Get a paginated list of roles',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        body: schemas_1.UpdateRoleSchema,
        responses: {
            201: schemas_1.RoleSchema,
        },
        summary: 'Update role',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete role',
    },
    updatePermissions: {
        method: 'PATCH',
        path: `${prefix}/:id/permissions`,
        body: schemas_1.UpdateRolePermissionsSchema,
        responses: {
            201: schemas_1.RoleSchema,
        },
        summary: 'Update role permissions',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/statistic-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.statistic = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const prefix = `/api/v1/statistics`;
exports.statistic = (0, core_1.initContract)().router({
    dashboard: {
        method: 'GET',
        path: `${prefix}/dashboard`,
        query: schemas_1.UnrestrictedSchema,
        responses: {
            200: schemas_1.DashboardSchema,
        },
        summary: 'Get dashboard data',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/store-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.store = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/stores`;
exports.store = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        contentType: 'multipart/form-data',
        responses: {
            201: schemas_1.StoreSchema,
        },
        body: schemas_1.CreateStoreSchema,
        summary: 'Create a store',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.StoreSchema,
        },
        summary: 'Get a store by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetStoresOptionsSchema,
        responses: {
            200: schemas_1.GetStoresResponseSchema,
        },
        summary: 'Get a paginated list of stores',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        contentType: 'multipart/form-data',
        body: schemas_1.UpdateStoreSchema,
        responses: {
            201: schemas_1.StoreSchema,
        },
        summary: 'Update store',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete store',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/store-rating-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.storeRating = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/store-ratings`;
exports.storeRating = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.StoreRatingSchema,
        },
        body: schemas_1.CreateStoreRatingSchema,
        summary: 'Create a store rating',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.StoreRatingSchema,
        },
        summary: 'Get a store rating by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetStoreRatingsOptionsSchema,
        responses: {
            200: schemas_1.GetStoreRatingsResponseSchema,
        },
        summary: 'Get a paginated list of store ratings',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}`,
        body: schemas_1.UpdateStoreRatingSchema,
        responses: {
            201: schemas_1.StoreRatingSchema,
        },
        summary: 'Update store rating',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete store rating',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/tag-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tag = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/tags`;
exports.tag = (0, core_1.initContract)().router({
    create: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.TagSchema,
        },
        body: schemas_1.CreateTagSchema,
        summary: 'Create a tag',
    },
    get: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.TagSchema,
        },
        summary: 'Get a tag by id',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetTagsOptionsSchema,
        responses: {
            200: schemas_1.GetTagsResponseSchema,
        },
        summary: 'Get a paginated list of tags',
    },
    update: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        body: schemas_1.UpdateTagSchema,
        responses: {
            201: schemas_1.TagSchema,
        },
        summary: 'Update tag',
    },
    delete: {
        method: 'DELETE',
        path: `${prefix}/:id`,
        body: zod_1.z.any().optional(),
        responses: {
            204: zod_1.z.any().optional(),
        },
        summary: 'Delete tag',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/transaction-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.transaction = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const zod_1 = __webpack_require__("zod");
const prefix = `/api/v1/transactions`;
exports.transaction = (0, core_1.initContract)().router({
    balance: {
        method: 'GET',
        path: `${prefix}/balance`,
        responses: {
            200: zod_1.z.object({
                balance: zod_1.z.number(),
            }),
        },
        summary: "Get user's balance",
    },
    generate: {
        method: 'POST',
        path: `${prefix}/generate`,
        body: schemas_1.CreateTransactionSchema,
        responses: {
            201: schemas_1.TransactionSchema,
        },
        summary: 'Generate amount',
    },
    transfer: {
        method: 'POST',
        path: `${prefix}/transfer`,
        body: schemas_1.CreateTransactionSchema,
        responses: {
            201: schemas_1.TransactionSchema,
        },
        summary: 'Transfer fund',
    },
    getAll: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.GetTransactionsOptionsSchema,
        responses: {
            200: schemas_1.GetTransactionsResponseSchema,
        },
        summary: 'Get a paginated list of transaction',
    },
    pay: {
        method: 'POST',
        path: `${prefix}/pay`,
        body: schemas_1.PaySchema,
        responses: {
            201: schemas_1.TransactionSchema,
        },
        summary: 'Pay an order',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/contracts/user-controller.contract.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.user = void 0;
const core_1 = __webpack_require__("@ts-rest/core");
const schemas_1 = __webpack_require__("../../lib/global/src/lib/schemas/index.ts");
const prefix = `/api/v1/users`;
exports.user = (0, core_1.initContract)().router({
    createUser: {
        method: 'POST',
        path: `${prefix}`,
        responses: {
            201: schemas_1.UserSchema,
        },
        body: schemas_1.CreateUserSchema,
        summary: 'Create a user',
    },
    getUser: {
        method: 'GET',
        path: `${prefix}/:id`,
        responses: {
            200: schemas_1.UserSchema,
        },
        summary: 'Get a user by id',
    },
    getUsers: {
        method: 'GET',
        path: `${prefix}`,
        query: schemas_1.PaginationOptionsSchema,
        responses: {
            200: schemas_1.GetUsersResponseSchema,
        },
        summary: 'Get a paginated list of users',
    },
    updateUser: {
        method: 'PATCH',
        path: `${prefix}/:id`,
        body: schemas_1.UpdateUserSchema,
        responses: {
            201: schemas_1.UserSchema,
        },
        summary: 'Update user',
    },
    assignRole: {
        method: 'PATCH',
        path: `${prefix}/:id/assign-role`,
        body: schemas_1.UpdateUserRoleSchema,
        responses: {
            201: schemas_1.UserSchema,
        },
        summary: 'Assign user role',
    },
    unassignRole: {
        method: 'PATCH',
        path: `${prefix}/:id/unassign-role`,
        body: schemas_1.UpdateUserRoleSchema,
        responses: {
            201: schemas_1.UserSchema,
        },
        summary: 'Assign user role',
    },
});


/***/ }),

/***/ "../../lib/global/src/lib/helpers/currency.helper.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformCurrency = void 0;
class TransformCurrency {
    to(v) {
        return v * 100;
    }
    from(v) {
        return v / 100;
    }
}
exports.TransformCurrency = TransformCurrency;


/***/ }),

/***/ "../../lib/global/src/lib/helpers/form.helper.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cleanObject = exports.parseDataForm = exports.convertJsonToFormData = void 0;
const convertJsonToFormData = (json, formData = new FormData(), parentKey = '') => {
    for (const key in json) {
        if (json[key]) {
            const propName = parentKey ? `${parentKey}[${key}]` : key;
            const value = json[key];
            if (typeof value === 'object' && !(value instanceof File)) {
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        const nestedPropName = `${propName}[${index}]`;
                        (0, exports.convertJsonToFormData)(item, formData, nestedPropName); // Recursively convert nested array item
                    });
                }
                else {
                    (0, exports.convertJsonToFormData)(value, formData, propName); // Recursively convert nested object
                }
            }
            else {
                formData.append(propName, value);
            }
        }
    }
    return formData;
};
exports.convertJsonToFormData = convertJsonToFormData;
const parseDataForm = (data) => {
    for (const key of Object.keys(data)) {
        if (typeof data[key] === 'string') {
            data[key] = JSON.parse(data[key]);
        }
        else if (typeof data[key] === 'object') {
            (0, exports.parseDataForm)(data);
        }
    }
    return data;
};
exports.parseDataForm = parseDataForm;
const cleanObject = (obj) => {
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            (0, exports.cleanObject)(obj[key]);
        }
        if ([undefined, null].includes(obj[key])) {
            delete obj[key];
        }
    }
    return obj;
};
exports.cleanObject = cleanObject;


/***/ }),

/***/ "../../lib/global/src/lib/helpers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/helpers/user.helper.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/helpers/currency.helper.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/helpers/form.helper.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/helpers/notification.helper.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/helpers/string.helper.ts"), exports);


/***/ }),

/***/ "../../lib/global/src/lib/helpers/notification.helper.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNotificationMessages = exports.notificationMessage = void 0;
const constant_1 = __webpack_require__("../../lib/global/src/lib/constant.ts");
const interfaces_1 = __webpack_require__("../../lib/global/src/lib/interfaces/index.ts");
exports.notificationMessage = {
    [interfaces_1.NotificationType.AccountCreated]: {
        title: 'Account Created',
        description: 'You successfully created an account',
        to: '/manage',
    },
    [interfaces_1.NotificationType.AccountUpdated]: {
        title: 'Account Updated',
        description: 'You successfully updated your account',
        to: '/manage',
    },
    [interfaces_1.NotificationType.AmountReceived]: {
        title: 'Amount Received',
        description: `You received ${constant_1.app.currencySymbol}:amount from :user`,
        to: '/manage/wallet',
    },
    [interfaces_1.NotificationType.AmountSent]: {
        title: 'Amount Sent',
        description: `You sent ${constant_1.app.currencySymbol}:amount to :user`,
        to: '/manage/wallet',
    },
    [interfaces_1.NotificationType.OrderCreated]: {
        title: 'Order Created',
        description: 'Your order with reference id: :refId is created',
        to: '/manage/orders/:orderId',
    },
    [interfaces_1.NotificationType.OrderUpdated]: {
        title: 'Order Updated',
        description: 'Your order with reference id: :refId is updated',
        to: '/manage/orders/:orderId',
    },
    [interfaces_1.NotificationType.OrderDeleted]: {
        title: 'Order Delete',
        description: 'Your order with reference id: :refId is delete',
        to: '/manage/orders',
    },
    [interfaces_1.NotificationType.StoreOrderCreated]: {
        title: 'Store Order Created',
        description: 'An order with reference id: :refId is created',
        to: '/manage/stores/:storeId',
    },
    [interfaces_1.NotificationType.StoreOrderUpdated]: {
        title: 'Store Order Updated',
        description: 'You successfully updated order with reference id: :refId',
        to: '/manage/stores/:storeId',
    },
    [interfaces_1.NotificationType.StoreOrderDeleted]: {
        title: 'Store Order Deleted',
        description: 'You successfully deleted order with reference id: :refId',
        to: '/manage/stores',
    },
};
const getNotificationMessages = (notification) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const metadata = notification.metadata;
    const messages = Object.assign({}, exports.notificationMessage[notification.type]);
    messages.description = messages.description
        .replace(':refId', (_b = (_a = metadata.order) === null || _a === void 0 ? void 0 : _a.ref.toString()) !== null && _b !== void 0 ? _b : '')
        .replace(':user', (_d = (_c = metadata.user) === null || _c === void 0 ? void 0 : _c.firstName) !== null && _d !== void 0 ? _d : '')
        .replace(':amount', (_f = (_e = metadata.amount) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : '0');
    messages.to = messages.to
        .replace(':orderId', (_g = metadata.orderId) !== null && _g !== void 0 ? _g : '')
        .replace(':storeId', (_h = metadata.storeId) !== null && _h !== void 0 ? _h : '');
    return messages;
};
exports.getNotificationMessages = getNotificationMessages;


/***/ }),

/***/ "../../lib/global/src/lib/helpers/string.helper.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateColor = exports.generateDarkColor = exports.generatePastelColor = exports.generateRandomColor = exports.isUUID = void 0;
const isUUID = (str) => {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(str);
};
exports.isUUID = isUUID;
const generateRandomColor = (text) => {
    // Convert the text to a numerical value
    let numericValue = 0;
    for (let i = 0; i < text.length; i++) {
        numericValue += text.charCodeAt(i);
    }
    // Generate RGB values based on the numerical value
    const red = numericValue % 256;
    const green = (numericValue * 2) % 256;
    const blue = (numericValue * 3) % 256;
    // Convert RGB values to hexadecimal
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');
    // Return the generated color as a hexadecimal value
    return `#${redHex}${greenHex}${blueHex}`;
};
exports.generateRandomColor = generateRandomColor;
const generatePastelColor = (text) => {
    // Convert the text to a numerical value
    let numericValue = 0;
    for (let i = 0; i < text.length; i++) {
        numericValue += text.charCodeAt(i);
    }
    // Generate pastel RGB values based on the numerical value
    const hue = numericValue % 360;
    const saturation = 50 + ((numericValue * 2) % 50); // Limit saturation to a range of 50-100
    const lightness = 70 + ((numericValue * 3) % 10); // Limit lightness to a range of 70-80
    // Convert HSL values to RGB
    const { r, g, b } = hslToRgb(hue, saturation, lightness);
    // Convert RGB values to hexadecimal
    const redHex = Math.round(r).toString(16).padStart(2, '0');
    const greenHex = Math.round(g).toString(16).padStart(2, '0');
    const blueHex = Math.round(b).toString(16).padStart(2, '0');
    // Return the generated color as a hexadecimal value
    return `#${redHex}${greenHex}${blueHex}`;
};
exports.generatePastelColor = generatePastelColor;
// Helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
    const chroma = (1 - Math.abs(2 * (l / 100) - 1)) * (s / 100);
    const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l / 100 - chroma / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (0 <= h && h < 60) {
        r = chroma;
        g = x;
    }
    else if (60 <= h && h < 120) {
        r = x;
        g = chroma;
    }
    else if (120 <= h && h < 180) {
        g = chroma;
        b = x;
    }
    else if (180 <= h && h < 240) {
        g = x;
        b = chroma;
    }
    else if (240 <= h && h < 300) {
        r = x;
        b = chroma;
    }
    else if (300 <= h && h < 360) {
        r = chroma;
        b = x;
    }
    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;
    return { r, g, b };
};
const generateDarkColor = (text) => {
    // Convert the text to a numerical value
    let numericValue = 0;
    for (let i = 0; i < text.length; i++) {
        numericValue += text.charCodeAt(i);
    }
    // Generate dark RGB values based on the numerical value
    const hue = numericValue % 360;
    const saturation = 50 + ((numericValue * 2) % 50); // Limit saturation to a range of 50-100
    const lightness = 20 + ((numericValue * 3) % 30); // Limit lightness to a range of 20-50
    // Convert HSL values to RGB
    const { r, g, b } = hslToRgb(hue, saturation, lightness);
    // Convert RGB values to hexadecimal
    const redHex = Math.round(r).toString(16).padStart(2, '0');
    const greenHex = Math.round(g).toString(16).padStart(2, '0');
    const blueHex = Math.round(b).toString(16).padStart(2, '0');
    // Return the generated color as a hexadecimal value
    return `#${redHex}${greenHex}${blueHex}`;
};
exports.generateDarkColor = generateDarkColor;
exports.generateColor = exports.generateDarkColor;


/***/ }),

/***/ "../../lib/global/src/lib/helpers/user.helper.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkUserPermission = void 0;
const checkUserPermission = (user, permissions) => {
    var _a;
    const rolePermissions = (_a = user.roles[0]) === null || _a === void 0 ? void 0 : _a.permissions;
    if (!rolePermissions)
        return false;
    for (const permission of permissions) {
        return !!rolePermissions.find((code) => permission === code);
    }
    return false;
};
exports.checkUserPermission = checkUserPermission;


/***/ }),

/***/ "../../lib/global/src/lib/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/contracts/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/helpers/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/constant.ts"), exports);


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/auth.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/category.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/user.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/auth.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/pagination.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/transaction.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/permission.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/category.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/store.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/product.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/order.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/payment.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/role.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/statistic.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/notification.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/store-rating.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/interfaces/tag.ts"), exports);


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/notification.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationType = void 0;
var NotificationType;
(function (NotificationType) {
    NotificationType["StoreOrderCreated"] = "store-order-created";
    NotificationType["StoreOrderUpdated"] = "store-order-updated";
    NotificationType["StoreOrderDeleted"] = "store-order-deleted";
    NotificationType["OrderCreated"] = "order-created";
    NotificationType["OrderUpdated"] = "order-updated";
    NotificationType["OrderDeleted"] = "order-deleted";
    NotificationType["AccountCreated"] = "account-created";
    NotificationType["AccountUpdated"] = "account-updated";
    NotificationType["AmountSent"] = "amount-sent";
    NotificationType["AmountReceived"] = "amount-received";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/order.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "pending";
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["Preparing"] = "preparing";
    OrderStatus["Ready"] = "ready";
    OrderStatus["Completed"] = "completed";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/pagination.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/payment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentType = void 0;
var PaymentType;
(function (PaymentType) {
    PaymentType["Cash"] = "cash";
    PaymentType["Online"] = "online";
})(PaymentType = exports.PaymentType || (exports.PaymentType = {}));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/permission.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolePermission = void 0;
var RolePermission;
(function (RolePermission) {
    RolePermission["AuthChangePassword"] = "auth.change_password";
    RolePermission["UserCreate"] = "user.create";
    RolePermission["UserGet"] = "user.get";
    RolePermission["UserUpdate"] = "user.update";
    RolePermission["UserUpdateUnrestricted"] = "user.update.unrestricted";
    RolePermission["UserGetAll"] = "user.get_all";
    RolePermission["TransactionBalance"] = "transaction.balance";
    RolePermission["TransactionGenerate"] = "transaction.generate";
    RolePermission["TransactionTransfer"] = "transaction.transfer";
    RolePermission["TransactionGetTransactions"] = "transaction.get_transactions";
    RolePermission["CategoryCreate"] = "category.create";
    RolePermission["CategoryGet"] = "category.get";
    RolePermission["CategoryUpdate"] = "category.update";
    RolePermission["CategoryDelete"] = "category.delete";
    RolePermission["CategoryGetAll"] = "category.get_all";
    RolePermission["StoreCreate"] = "store.create";
    RolePermission["StoreGet"] = "store.get";
    RolePermission["StoreUpdate"] = "store.update";
    RolePermission["StoreUpdateUnrestricted"] = "store.update_unrestricted";
    RolePermission["StoreDelete"] = "store.delete";
    RolePermission["StoreDeleteUnrestricted"] = "store.delete_unrestricted";
    RolePermission["StoreGetAll"] = "store.get_all";
    RolePermission["StoreGetAllUnrestricted"] = "store.get_all_unrestricted";
    RolePermission["ProductCreate"] = "product.create";
    RolePermission["ProductGet"] = "product.get";
    RolePermission["ProductUpdate"] = "product.update";
    RolePermission["ProductDelete"] = "product.delete";
    RolePermission["ProductGetAll"] = "product.get_all";
    RolePermission["OrderCreate"] = "order.create";
    RolePermission["OrderGet"] = "order.get";
    RolePermission["OrderUpdate"] = "order.update";
    RolePermission["OrderUpdateUnrestricted"] = "order.update_unrestricted";
    RolePermission["OrderDelete"] = "order.delete";
    RolePermission["OrderDeleteUnrestricted"] = "order.delete_unrestricted";
    RolePermission["OrderGetAll"] = "order.get_all";
    RolePermission["OrderGetAllUnrestricted"] = "order.get_all_unrestricted";
    RolePermission["PaymentCreate"] = "payment.create";
    RolePermission["PaymentGet"] = "payment.get";
    RolePermission["PaymentUpdate"] = "payment.update";
    RolePermission["PaymentDelete"] = "payment.delete";
    RolePermission["PaymentGetAll"] = "payment.get_all";
    RolePermission["RoleCreate"] = "role.create";
    RolePermission["RoleGet"] = "role.get";
    RolePermission["RoleUpdate"] = "role.update";
    RolePermission["RoleDelete"] = "role.delete";
    RolePermission["RoleGetAll"] = "role.get_all";
})(RolePermission = exports.RolePermission || (exports.RolePermission = {}));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/product.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/role.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/statistic.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/store-rating.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/store.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/tag.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/transaction.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/interfaces/user.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/auth.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChangePasswordSchema = exports.VerifyQuerySchema = exports.LoginResponseSchema = exports.LoginSchema = exports.RegisterSchema = exports.CreateAuthSchema = exports.AuthSchema = void 0;
const zod_1 = __webpack_require__("zod");
const user_1 = __webpack_require__("../../lib/global/src/lib/schemas/user.ts");
const base = {
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
};
exports.AuthSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string() }, base));
exports.CreateAuthSchema = zod_1.z.object(base);
exports.RegisterSchema = user_1.CreateUserSchema.merge(exports.CreateAuthSchema);
exports.LoginSchema = zod_1.z.object(base);
exports.LoginResponseSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    user: user_1.UserSchema,
});
exports.VerifyQuerySchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
});
exports.ChangePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z.string(),
    newPassword: zod_1.z.string(),
    confirmPassword: zod_1.z.string(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/category.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetCategoriesOptionsSchema = exports.GetCategoriesResponseSchema = exports.UpdateCategorySchema = exports.CreateCategorySchema = exports.CategorySchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const base = {
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    type: zod_1.z.string(),
};
const ParentCategorySchema = zod_1.z.object(Object.assign({ id: zod_1.z.string() }, base));
exports.CategorySchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), parent: ParentCategorySchema.optional(), children: ParentCategorySchema.array().optional() }, base));
exports.CreateCategorySchema = zod_1.z.object(Object.assign(Object.assign({}, base), { parent: zod_1.z.string().optional() }));
exports.UpdateCategorySchema = zod_1.z.object(Object.assign(Object.assign({}, base), { parent: zod_1.z.string().optional() }));
exports.GetCategoriesResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.CategorySchema.array() }));
exports.GetCategoriesOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({
    search: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    parent: zod_1.z.string().optional(),
    isRoot: zod_1.z.preprocess((a) => a && a === 'true', zod_1.z.boolean().optional()),
}));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/file.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileSchema = void 0;
const zod_1 = __webpack_require__("zod");
exports.FileSchema = zod_1.z.object({
    name: zod_1.z.string(),
    type: zod_1.z.string(),
    size: zod_1.z.number().positive(),
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/user.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/auth.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/pagination.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/transaction.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/category.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/permission.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/role.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/store.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/product.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/order.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/payment.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/file.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/unrestricted.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/statistic.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/notification.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/store-rating.ts"), exports);
tslib_1.__exportStar(__webpack_require__("../../lib/global/src/lib/schemas/tag.ts"), exports);


/***/ }),

/***/ "../../lib/global/src/lib/schemas/notification.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsCountSchema = exports.GetNotificationsOptionsSchema = exports.GetNotificationsResponseSchema = exports.CreateNotificationSchema = exports.NotificationSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const user_1 = __webpack_require__("../../lib/global/src/lib/schemas/user.ts");
const interfaces_1 = __webpack_require__("../../lib/global/src/lib/interfaces/index.ts");
const order_1 = __webpack_require__("../../lib/global/src/lib/schemas/order.ts");
const store_1 = __webpack_require__("../../lib/global/src/lib/schemas/store.ts");
const base = {
    type: zod_1.z.enum([
        interfaces_1.NotificationType.AccountCreated,
        interfaces_1.NotificationType.AccountUpdated,
        interfaces_1.NotificationType.OrderCreated,
        interfaces_1.NotificationType.OrderUpdated,
        interfaces_1.NotificationType.OrderDeleted,
        interfaces_1.NotificationType.StoreOrderCreated,
        interfaces_1.NotificationType.StoreOrderUpdated,
        interfaces_1.NotificationType.StoreOrderDeleted,
        interfaces_1.NotificationType.AmountSent,
        interfaces_1.NotificationType.AmountReceived,
    ]),
    metadata: zod_1.z.object({
        orderId: zod_1.z.string().uuid().optional(),
        storeId: zod_1.z.string().uuid().optional(),
        status: zod_1.z.string().uuid().optional(),
        amount: zod_1.z.number().optional(),
        userId: zod_1.z.string().uuid().optional(),
        order: order_1.OrderSchema.optional(),
        store: store_1.StoreSchema.optional(),
        user: user_1.UserSchema.optional(),
    }),
};
exports.NotificationSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), user: user_1.UserSchema, opened: zod_1.z.boolean(), createdAt: zod_1.z.date() }, base));
exports.CreateNotificationSchema = zod_1.z.object(Object.assign({ store: zod_1.z.string(), user: zod_1.z.string().uuid() }, base));
exports.GetNotificationsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.NotificationSchema.array() }));
exports.GetNotificationsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({
    ids: zod_1.z.string().array().optional(),
    startDate: zod_1.z.preprocess((a) => a && new Date(a), zod_1.z.date().optional()),
    endDate: zod_1.z.preprocess((a) => a && new Date(a), zod_1.z.date().optional()),
}));
exports.NotificationsCountSchema = zod_1.z.object({
    all: zod_1.z.number(),
    account: zod_1.z.number(),
    order: zod_1.z.number(),
    storeOrder: zod_1.z.number(),
    wallet: zod_1.z.number(),
    items: exports.NotificationSchema.array(),
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/order.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetOrdersOptionsSchema = exports.GetOrdersResponseSchema = exports.UpdateOrderSchema = exports.CreateOrderSchema = exports.OrderSchema = exports.OrderProductSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const store_1 = __webpack_require__("../../lib/global/src/lib/schemas/store.ts");
const user_1 = __webpack_require__("../../lib/global/src/lib/schemas/user.ts");
const unrestricted_1 = __webpack_require__("../../lib/global/src/lib/schemas/unrestricted.ts");
exports.OrderProductSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    count: zod_1.z.number(),
    image: zod_1.z.string().optional(),
});
const base = {
    items: exports.OrderProductSchema.array(),
    status: zod_1.z.string(),
};
const OrderPaymentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    // order: z.lazy(() => OrderSchema),
    type: zod_1.z.string(),
    amountPaid: zod_1.z.number(),
    totalCost: zod_1.z.number(),
    change: zod_1.z.number(),
});
exports.OrderSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), ref: zod_1.z.number(), store: store_1.StoreSchema, user: user_1.UserSchema, payment: OrderPaymentSchema, createdAt: zod_1.z.date() }, base));
exports.CreateOrderSchema = zod_1.z.object(Object.assign({ store: zod_1.z.string(), user: zod_1.z.string() }, base));
exports.UpdateOrderSchema = zod_1.z.object(Object.assign({ store: zod_1.z.string(), user: zod_1.z.string() }, base));
exports.GetOrdersResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.OrderSchema.array() }));
exports.GetOrdersOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z
    .object({
    ids: zod_1.z.string().array().optional(),
    storeIds: zod_1.z.string().array().optional(),
    isPaid: zod_1.z.preprocess((a) => a === 'true', zod_1.z.boolean().optional()),
    userIds: zod_1.z.string().array().optional(),
    startDate: zod_1.z.preprocess((a) => a && new Date(a), zod_1.z.date().optional()),
    endDate: zod_1.z.preprocess((a) => a && new Date(a), zod_1.z.date().optional()),
})
    .merge(unrestricted_1.UnrestrictedSchema));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/pagination.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationResponseSchema = exports.PaginationOptionsSchema = void 0;
const zod_1 = __webpack_require__("zod");
exports.PaginationOptionsSchema = zod_1.z.object({
    search: zod_1.z.string().optional(),
    page: zod_1.z.preprocess((a) => (a ? parseInt(zod_1.z.string().parse(a)) : 1), zod_1.z.number().positive().optional()),
    perPage: zod_1.z.preprocess((a) => (a ? parseInt(zod_1.z.string().parse(a)) : 5), zod_1.z.number().optional()),
    orderBy: zod_1.z.string().optional(),
    orderDir: zod_1.z.enum(['ASC', 'DESC']).optional(),
});
exports.PaginationResponseSchema = zod_1.z.object({
    count: zod_1.z.number(),
    page: zod_1.z.number(),
    perPage: zod_1.z.number(),
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/payment.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPaymentsOptionsSchema = exports.GetPaymentsResponseSchema = exports.UpdatePaymentSchema = exports.CreatePaymentSchema = exports.PaymentSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const order_1 = __webpack_require__("../../lib/global/src/lib/schemas/order.ts");
const base = {
    type: zod_1.z.string(),
    amountPaid: zod_1.z.number(),
    totalCost: zod_1.z.number(),
};
exports.PaymentSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), order: zod_1.z.lazy(() => order_1.OrderSchema), change: zod_1.z.number() }, base));
exports.CreatePaymentSchema = zod_1.z
    .object(Object.assign({ order: zod_1.z.string() }, base))
    .refine((obj) => obj.amountPaid >= obj.totalCost, {
    message: 'Not enough amount',
    path: ['amountPaid'],
});
exports.UpdatePaymentSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { order: zod_1.z.string() }));
exports.GetPaymentsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.PaymentSchema.array() }));
exports.GetPaymentsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({
    ids: zod_1.z.string().array().optional(),
}));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/permission.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetPermissionsOptionsSchema = exports.GetPermissionsResponseSchema = exports.PermissionSchema = void 0;
const zod_1 = __webpack_require__("zod");
const category_1 = __webpack_require__("../../lib/global/src/lib/schemas/category.ts");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const base = {
    code: zod_1.z.string(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    category: category_1.CategorySchema,
};
exports.PermissionSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string() }, base));
exports.GetPermissionsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.PermissionSchema.array() }));
exports.GetPermissionsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({}));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/product.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetProductsOptionsSchema = exports.GetProductsResponseSchema = exports.UpdateProductSchema = exports.CreateProductSchema = exports.ProductSchema = exports.ProductSchemaNonCircular = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const category_1 = __webpack_require__("../../lib/global/src/lib/schemas/category.ts");
const file_1 = __webpack_require__("../../lib/global/src/lib/schemas/file.ts");
const store_1 = __webpack_require__("../../lib/global/src/lib/schemas/store.ts");
const base = {
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number().min(0.01, 'Price must be greater than 0.01'),
};
exports.ProductSchemaNonCircular = zod_1.z.object(Object.assign({ id: zod_1.z.string(), category: category_1.CategorySchema, categories: category_1.CategorySchema.array(), image: zod_1.z.string() }, base));
exports.ProductSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), store: zod_1.z.lazy(() => store_1.StoreSchema), category: category_1.CategorySchema, categories: category_1.CategorySchema.array(), image: zod_1.z.string() }, base));
exports.CreateProductSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { store: zod_1.z.string(), category: zod_1.z.string(), image: file_1.FileSchema.optional() }));
exports.UpdateProductSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { store: zod_1.z.string(), category: zod_1.z.string(), image: file_1.FileSchema.optional() }));
exports.GetProductsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.ProductSchema.array() }));
exports.GetProductsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({
    store: zod_1.z.string().optional(),
    ids: zod_1.z.string().array().optional(),
    categoryIds: zod_1.z.string().array().optional(),
}));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/role.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRolesOptionsSchema = exports.GetRolesResponseSchema = exports.UpdateRolePermissionsSchema = exports.UpdateRoleSchema = exports.CreateRoleSchema = exports.RoleSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const permission_1 = __webpack_require__("../../lib/global/src/lib/schemas/permission.ts");
const base = {
    title: zod_1.z.string(),
    description: zod_1.z.string(),
};
exports.RoleSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), permissions: permission_1.PermissionSchema.array(), createdAt: zod_1.z.date() }, base));
exports.CreateRoleSchema = zod_1.z.object(base);
exports.UpdateRoleSchema = zod_1.z.object(base);
exports.UpdateRolePermissionsSchema = zod_1.z.object({
    ids: zod_1.z.string().array(),
});
exports.GetRolesResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.RoleSchema.array() }));
exports.GetRolesOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({}));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/statistic.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardSchema = void 0;
const zod_1 = __webpack_require__("zod");
exports.DashboardSchema = zod_1.z.object({
    myStoresCount: zod_1.z.number(),
    myOrdersCount: zod_1.z.number(),
    myStoresOrdersCount: zod_1.z.number(),
    storesCount: zod_1.z.number().optional(),
    ordersCount: zod_1.z.number().optional(),
    usersCount: zod_1.z.number().optional(),
    rolesCount: zod_1.z.number().optional(),
    categoriesCount: zod_1.z.number().optional(),
    circulatingAmount: zod_1.z.number().optional(),
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/store-rating.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetStoreRatingsOptionsSchema = exports.GetStoreRatingsResponseSchema = exports.UpdateStoreRatingSchema = exports.CreateStoreRatingSchema = exports.StoreRatingSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const user_1 = __webpack_require__("../../lib/global/src/lib/schemas/user.ts");
const unrestricted_1 = __webpack_require__("../../lib/global/src/lib/schemas/unrestricted.ts");
const store_1 = __webpack_require__("../../lib/global/src/lib/schemas/store.ts");
const base = {
    rating: zod_1.z.number().min(1).max(5),
    comment: zod_1.z.string().optional(),
};
exports.StoreRatingSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), user: user_1.UserSchema, store: store_1.StoreSchema, createdAt: zod_1.z.date() }, base));
exports.CreateStoreRatingSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { user: zod_1.z.string().uuid(), store: zod_1.z.string().uuid() }));
exports.UpdateStoreRatingSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { user: zod_1.z.string().uuid(), store: zod_1.z.string().uuid() }));
exports.GetStoreRatingsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.StoreRatingSchema.array() }));
exports.GetStoreRatingsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z
    .object({
    store: zod_1.z.string().optional(),
    user: zod_1.z.string().optional(),
})
    .merge(unrestricted_1.UnrestrictedSchema));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/store.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetStoresOptionsSchema = exports.GetStoresResponseSchema = exports.UpdateStoreSchema = exports.CreateStoreSchema = exports.StoreSchema = exports.StoreSchemaNonCiruclar = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const user_1 = __webpack_require__("../../lib/global/src/lib/schemas/user.ts");
const file_1 = __webpack_require__("../../lib/global/src/lib/schemas/file.ts");
const unrestricted_1 = __webpack_require__("../../lib/global/src/lib/schemas/unrestricted.ts");
const tag_1 = __webpack_require__("../../lib/global/src/lib/schemas/tag.ts");
const product_1 = __webpack_require__("../../lib/global/src/lib/schemas/product.ts");
const base = {
    title: zod_1.z.string(),
    description: zod_1.z.string(),
};
exports.StoreSchemaNonCiruclar = zod_1.z.object(Object.assign({ id: zod_1.z.string(), owner: user_1.UserSchema, image: zod_1.z.string().optional(), rating: zod_1.z.number(), tags: tag_1.TagSchema.array() }, base));
exports.StoreSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), owner: user_1.UserSchema, image: zod_1.z.string().optional(), rating: zod_1.z.number(), tags: tag_1.TagSchema.array(), products: product_1.ProductSchema.array() }, base));
exports.CreateStoreSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { owner: zod_1.z.string(), image: file_1.FileSchema.optional(), tags: zod_1.z.string().array() }));
exports.UpdateStoreSchema = zod_1.z.object(Object.assign(Object.assign({}, base), { owner: zod_1.z.string(), image: file_1.FileSchema.optional(), tags: zod_1.z.string().array() }));
exports.GetStoresResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.StoreSchema.array() }));
exports.GetStoresOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z
    .object({
    search: zod_1.z.string().uuid().optional(),
    owner: zod_1.z.string().uuid().optional(),
    tags: zod_1.z.string().uuid().array().optional(),
})
    .merge(unrestricted_1.UnrestrictedSchema));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/tag.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetTagsOptionsSchema = exports.GetTagsResponseSchema = exports.UpdateTagSchema = exports.CreateTagSchema = exports.TagSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const base = {
    title: zod_1.z.string(),
    type: zod_1.z.string(),
};
exports.TagSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string() }, base));
exports.CreateTagSchema = zod_1.z.object(Object.assign({}, base));
exports.UpdateTagSchema = zod_1.z.object(Object.assign({}, base));
exports.GetTagsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.TagSchema.array() }));
exports.GetTagsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({
    type: zod_1.z.string().optional(),
}));


/***/ }),

/***/ "../../lib/global/src/lib/schemas/transaction.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaySchema = exports.GetTransactionsOptionsSchema = exports.GetTransactionsResponseSchema = exports.CreateTransactionSchema = exports.TransactionSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const user_1 = __webpack_require__("../../lib/global/src/lib/schemas/user.ts");
const base = {
    receiver: zod_1.z.string().length(13),
    amount: zod_1.z.number().min(1).multipleOf(0.01, 'Max of 2 decimal places'),
};
exports.TransactionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    sender: user_1.UserSchema,
    receiver: user_1.UserSchema,
    amount: zod_1.z.number(),
});
exports.CreateTransactionSchema = zod_1.z.object(base);
exports.GetTransactionsResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({
    list: exports.TransactionSchema.merge(zod_1.z.object({
        receiver: user_1.UserSchema.optional(),
        sender: user_1.UserSchema.optional(),
        createdAt: zod_1.z.date(),
    })).array(),
}));
exports.GetTransactionsOptionsSchema = pagination_1.PaginationOptionsSchema.merge(zod_1.z.object({
    ids: zod_1.z.string().array().optional(),
    userIds: zod_1.z.string().array().optional(),
}));
exports.PaySchema = zod_1.z.object({
    orderId: zod_1.z.string(),
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/unrestricted.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnrestrictedSchema = void 0;
const zod_1 = __webpack_require__("zod");
exports.UnrestrictedSchema = zod_1.z.object({
    unrestricted: zod_1.z.preprocess((a) => a && a === 'true', zod_1.z.boolean().optional()),
});


/***/ }),

/***/ "../../lib/global/src/lib/schemas/user.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUsersResponseSchema = exports.UpdateUserRoleSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.TokenUserSchema = exports.UserSchema = void 0;
const zod_1 = __webpack_require__("zod");
const pagination_1 = __webpack_require__("../../lib/global/src/lib/schemas/pagination.ts");
const role_1 = __webpack_require__("../../lib/global/src/lib/schemas/role.ts");
const base = {
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
};
exports.UserSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), roles: role_1.RoleSchema.array(), createdAt: zod_1.z.date(), uniqueCode: zod_1.z.string() }, base));
exports.TokenUserSchema = zod_1.z.object(Object.assign({ id: zod_1.z.string(), roles: role_1.RoleSchema.merge(zod_1.z.object({ permissions: zod_1.z.string().array() })).array(), createdAt: zod_1.z.date(), uniqueCode: zod_1.z.string() }, base));
exports.CreateUserSchema = zod_1.z.object(base);
exports.UpdateUserSchema = zod_1.z.object(base);
exports.UpdateUserRoleSchema = zod_1.z.object({ roleId: zod_1.z.string() });
exports.GetUsersResponseSchema = pagination_1.PaginationResponseSchema.merge(zod_1.z.object({ list: exports.UserSchema.array() }));


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const modules_1 = __webpack_require__("./src/app/modules/index.ts");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = tslib_1.__importDefault(__webpack_require__("./src/app/config/configuration.ts"));
const database_1 = __webpack_require__("./src/app/database/index.ts");
const express_1 = tslib_1.__importDefault(__webpack_require__("express"));
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(express_1.default.static((0, configuration_1.default)().multer.dest))
            .forRoutes('/files');
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            database_1.DatabaseModule,
            modules_1.MailModule,
            modules_1.UserModule,
            modules_1.AuthModule,
            modules_1.TransactionModule,
            modules_1.CategoryModule,
            modules_1.StoreModule,
            modules_1.ProductModule,
            modules_1.OrderModule,
            modules_1.PaymentModule,
            modules_1.RoleModule,
            modules_1.PermissionModule,
            modules_1.StatisticModule,
            modules_1.NotificationModule,
            modules_1.StoreRatingModule,
            modules_1.TagModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/app/config/configuration.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const entities_1 = tslib_1.__importDefault(__webpack_require__("./src/app/database/entities/index.ts"));
// import migrations from '../database/migrations';
const seeds_1 = tslib_1.__importDefault(__webpack_require__("./src/app/database/seeds/index.ts"));
const factories_1 = tslib_1.__importDefault(__webpack_require__("./src/app/database/factories/index.ts"));
const typeorm_naming_strategies_1 = __webpack_require__("typeorm-naming-strategies");
const path_1 = __webpack_require__("path");
const isDevelopment = "development" === 'development';
console.log((0, path_1.resolve)(__dirname, '../database/migrations'));
exports["default"] = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    return ({
        protocol: (_a = process.env.PROTOCOL) !== null && _a !== void 0 ? _a : 'http',
        host: (_b = process.env.HOST) !== null && _b !== void 0 ? _b : 'localhost',
        port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
        database: {
            type: process.env.DATABASE_TYPE,
            host: (_c = process.env.DATABASE_HOST) !== null && _c !== void 0 ? _c : 'localhost',
            port: process.env.DATABASE_PORT
                ? parseInt(process.env.DATABASE_PORT, 10)
                : 5432,
            username: (_d = process.env.DATABASE_USERNAME) !== null && _d !== void 0 ? _d : 'postgres',
            password: (_e = process.env.DATABASE_PASSWORD) !== null && _e !== void 0 ? _e : 'password',
            database: (_f = process.env.DATABASE_NAME) !== null && _f !== void 0 ? _f : 'users_ms',
            entities: entities_1.default,
            migrations: [(0, path_1.resolve)(__dirname, '../database/migrations/*.{ts,js}')],
            seeds: seeds_1.default,
            factories: factories_1.default,
            autoLoadEntities: true,
            synchronize: false,
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
            logging: true,
            ssl: { rejectUnauthorized: false },
        },
        jwt: {
            secret: (_g = process.env.JWT_SECRET) !== null && _g !== void 0 ? _g : 'supersecret',
            signOptions: { expiresIn: (_h = process.env.JWT_EXPIRES_IN) !== null && _h !== void 0 ? _h : '60s' },
        },
        mail: {
            transport: {
                host: (_j = process.env.MAIL_HOST) !== null && _j !== void 0 ? _j : 'smtp.gmail.com',
                port: (_k = process.env.MAIL_PORT) !== null && _k !== void 0 ? _k : 465,
                secure: process.env.MAIL_SECURE === 'true',
                auth: {
                    user: (_l = process.env.MAIL_USERNAME) !== null && _l !== void 0 ? _l : '',
                    pass: (_m = process.env.MAIL_PASSWORD) !== null && _m !== void 0 ? _m : '',
                },
            },
            from: (_o = process.env.MAIL_FROM) !== null && _o !== void 0 ? _o : 'admin@email.com',
        },
        multer: {
            dest: (0, path_1.resolve)(__dirname, (isDevelopment ? '../../../packages/api/' : './') + 'storage/uploads'),
        },
    });
};


/***/ }),

/***/ "./src/app/config/roles-permissions.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.permissions = exports.roles = void 0;
exports.roles = [
    {
        title: 'Superadmin',
        description: 'Root user of the system',
    },
    {
        title: 'User',
        description: 'User of the system',
    },
];
const AuthPermissions = {
    title: 'Auth',
    description: 'Auth related permissions',
    permissions: [
        {
            code: 'auth.change_password',
            title: 'Change Password',
            description: 'Allow to change password',
            roles: ['Superadmin', 'User'],
        },
    ],
};
const UserPermissions = {
    title: 'User',
    description: 'User related permissions',
    permissions: [
        {
            code: 'user.create',
            title: 'Create User',
            description: 'Allow to create user',
            roles: ['Superadmin'],
        },
        {
            code: 'user.get',
            title: 'Get User',
            description: 'Allow to get user',
            roles: ['Superadmin'],
        },
        {
            code: 'user.get_all',
            title: 'Get All Users',
            description: 'Allow to get all users',
            roles: ['Superadmin'],
        },
        {
            code: 'user.update',
            title: 'Update User',
            description: 'Allow to update user',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'user.update.unrestricted',
            title: 'Update User Unrestricted',
            description: 'Allow to update all user',
            roles: ['Superadmin'],
        },
    ],
};
const TransactionPermissions = {
    title: 'Transaction',
    description: 'Transaction related permissions',
    permissions: [
        {
            code: 'transaction.balance',
            title: 'Balance',
            description: 'Allow to check balance',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'transaction.generate',
            title: 'Generate',
            description: 'Allow to generate money',
            roles: ['Superadmin'],
        },
        {
            code: 'transaction.transfer',
            title: 'Transfer',
            description: 'Allow to transfer money',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'transaction.get_transactions',
            title: 'Get All Transactions',
            description: 'Allow to get all transactions',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'transaction.get_transactions_unrestricted',
            title: 'Get All Transactions Unrestricted',
            description: 'Allow to get all transactions of all users',
            roles: ['Superadmin'],
        },
    ],
};
const CategoryPermissions = {
    title: 'Category',
    description: 'Category related permissions',
    permissions: [
        {
            code: 'category.create',
            title: 'Create Category',
            description: 'Allow to create category',
            roles: ['Superadmin'],
        },
        {
            code: 'category.get',
            title: 'Get Category',
            description: 'Allow to get category',
            roles: ['Superadmin'],
        },
        {
            code: 'category.get_all',
            title: 'Get All Categories',
            description: 'Allow to get all categories',
            roles: ['Superadmin'],
        },
        {
            code: 'category.update',
            title: 'Update Category',
            description: 'Allow to update category',
            roles: ['Superadmin'],
        },
        {
            code: 'category.delete',
            title: 'Delete Category',
            description: 'Allow to delete category',
            roles: ['Superadmin'],
        },
    ],
};
const StorePermissions = {
    title: 'Store',
    description: 'Store related permissions',
    permissions: [
        {
            code: 'store.create',
            title: 'Create Store',
            description: 'Allow to create store',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'store.get',
            title: 'Get Store',
            description: 'Allow to get store',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'store.get_all',
            title: 'Get All Stores',
            description: 'Allow to get all stores',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'store.get_all_unrestricted',
            title: 'Get All Stores Unrestricted',
            description: 'Allow to get all stores of all users',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'store.update',
            title: 'Update Store',
            description: 'Allow to update store',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'store.update_unrestricted',
            title: 'Update Store Unrestricted',
            description: 'Allow to update store unrestricted',
            roles: ['Superadmin'],
        },
        {
            code: 'store.delete',
            title: 'Delete Store',
            description: 'Allow to delete store',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'store.delete_unrestricted',
            title: 'Delete Store Unrestricted',
            description: 'Allow to delete store unrestricted',
            roles: ['Superadmin'],
        },
    ],
};
const ProductPermissions = {
    title: 'Product',
    description: 'Product related permissions',
    permissions: [
        {
            code: 'product.create',
            title: 'Create Product',
            description: 'Allow to create product',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'product.get',
            title: 'Get Product',
            description: 'Allow to get product',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'product.get_all',
            title: 'Get All Categories',
            description: 'Allow to get all categories',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'product.update',
            title: 'Update Product',
            description: 'Allow to update product',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'product.delete',
            title: 'Delete Product',
            description: 'Allow to delete product',
            roles: ['Superadmin', 'User'],
        },
    ],
};
const OrderPermissions = {
    title: 'Order',
    description: 'Order related permissions',
    permissions: [
        {
            code: 'order.create',
            title: 'Create Order',
            description: 'Allow to create order',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'order.get',
            title: 'Get Order',
            description: 'Allow to get order',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'order.get_all',
            title: 'Get All Orders',
            description: 'Allow to get all categories',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'order.get_all_unrestricted',
            title: 'Get All Orders Unrestricted',
            description: 'Allow to get all categories unrestricted',
            roles: ['Superadmin'],
        },
        {
            code: 'order.update',
            title: 'Update Order',
            description: 'Allow to update order',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'order.update_unrestricted',
            title: 'Update Order Unrestricted',
            description: 'Allow to update order unrestricted',
            roles: ['Superadmin'],
        },
        {
            code: 'order.delete',
            title: 'Delete Order',
            description: 'Allow to delete order',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'order.delete_unrestricted',
            title: 'Delete Order Unrestricted',
            description: 'Allow to delete order unrestricted',
            roles: ['Superadmin'],
        },
    ],
};
const PaymentPermissions = {
    title: 'Payment',
    description: 'Payment related permissions',
    permissions: [
        {
            code: 'payment.create',
            title: 'Create Payment',
            description: 'Allow to create payment',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'payment.get',
            title: 'Get Payment',
            description: 'Allow to get payment',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'payment.get_all',
            title: 'Get All Payments',
            description: 'Allow to get all categories',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'payment.update',
            title: 'Update Payment',
            description: 'Allow to update payment',
            roles: ['Superadmin', 'User'],
        },
        {
            code: 'payment.delete',
            title: 'Delete Payment',
            description: 'Allow to delete payment',
            roles: ['Superadmin'],
        },
    ],
};
const RolePermissions = {
    title: 'Role',
    description: 'Role related permissions',
    permissions: [
        {
            code: 'role.create',
            title: 'Create Role',
            description: 'Allow to create role',
            roles: ['Superadmin'],
        },
        {
            code: 'role.get',
            title: 'Get Role',
            description: 'Allow to get role',
            roles: ['Superadmin'],
        },
        {
            code: 'role.get_all',
            title: 'Get All Roles',
            description: 'Allow to get all categories',
            roles: ['Superadmin'],
        },
        {
            code: 'role.update',
            title: 'Update Role',
            description: 'Allow to update role',
            roles: ['Superadmin'],
        },
        {
            code: 'role.delete',
            title: 'Delete Role',
            description: 'Allow to delete role',
            roles: ['Superadmin'],
        },
    ],
};
exports.permissions = [
    AuthPermissions,
    UserPermissions,
    TransactionPermissions,
    CategoryPermissions,
    StorePermissions,
    ProductPermissions,
    OrderPermissions,
    PaymentPermissions,
    RolePermissions,
];


/***/ }),

/***/ "./src/app/core/base.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const typeorm_1 = __webpack_require__("typeorm");
let BaseRepository = class BaseRepository extends typeorm_1.Repository {
    constructor(entity, dataSource) {
        super(entity, dataSource.createEntityManager());
        this.entity = entity;
        this.dataSource = dataSource;
    }
    searchFields() {
        return [];
    }
    mapRelations() {
        return undefined;
    }
    relations() {
        return {};
    }
    modifyWhere(conditions) {
        return conditions;
    }
    modifyResult(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return item;
        });
    }
    mapWhere(input) {
        const reducer = (curr, key) => (Object.assign(Object.assign({}, curr), { [key]: this.relations()[key]
                ? { id: Array.isArray(input[key]) ? (0, typeorm_1.In)(input[key]) : input[key] }
                : input[key] }));
        return Object.keys(input).reduce(reducer, {});
    }
    paginated(options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { search, page = 1, perPage = 10, orderBy, orderDir = 'ASC' } = options, otherOptions = tslib_1.__rest(options, ["search", "page", "perPage", "orderBy", "orderDir"]);
            const mappedWhere = this.mapWhere(otherOptions);
            const findAndCountOptions = Object.assign(Object.assign({}, otherOptions), { relations: this.relations(), where: this.modifyWhere(mappedWhere) });
            if (search) {
                findAndCountOptions.where = this.searchFields().map((key) => (Object.assign(Object.assign({}, this.modifyWhere(mappedWhere)), { [key]: (0, typeorm_1.Raw)((alias) => `LOWER(${alias}) LIKE LOWER(:value)`, {
                        value: `%${search}%`,
                    }) })));
            }
            if (perPage > -1) {
                findAndCountOptions.take = perPage;
                findAndCountOptions.skip = (page - 1) * perPage;
            }
            const convertStringToObject = (str, dir) => {
                const keys = str.split('.');
                const result = {};
                let currentObj = result;
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    currentObj[key] = i === keys.length - 1 ? dir : {};
                    currentObj = currentObj[key];
                }
                return result;
            };
            if (orderBy) {
                findAndCountOptions.order = convertStringToObject(orderBy, orderDir);
            }
            const [list, count] = yield this.findAndCount(findAndCountOptions);
            return {
                list: yield Promise.all(list.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.modifyResult(item); }))),
                count,
                page,
                perPage,
            };
        });
    }
    getById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.modifyResult(yield this.findOne({
                where: { id: id },
            }));
        });
    }
    getByIdWithRelations(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.modifyResult(yield this.findOne({
                where: { id: id },
                relations: this.relations(),
            }));
        });
    }
    getManyByIds(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const items = yield this.find({
                where: { id: (0, typeorm_1.In)(ids) },
            });
            return yield Promise.all(items.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.modifyResult(item); })));
        });
    }
    getManyByIdsWithRelations(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const items = yield this.find({
                where: { id: (0, typeorm_1.In)(ids) },
                relations: this.relations(),
            });
            return yield Promise.all(items.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield this.modifyResult(item); })));
        });
    }
    getPropertyValue(input, key) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const getValue = (key, value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return typeof this.mapRelations()[key] === 'function'
                    ? (yield this.mapRelations()[key])(input)
                    : this.mapRelations()[key].getById(value);
            });
            return ((_a = this.mapRelations()) === null || _a === void 0 ? void 0 : _a[key])
                ? yield getValue(key, input[key])
                : input[key];
        });
    }
    createWithRelations(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newItem = this.create(yield this.createRelationsInput(input));
            yield this.save(newItem);
            return this.getByIdWithRelations(newItem.id);
        });
    }
    updateWithRelations(id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = yield this.updateRelationsInput(id, input);
            yield this.save(data);
            return this.getByIdWithRelations(data.id);
        });
    }
    createRelationsInput(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const key of Object.keys(input)) {
                input[key] = yield this.getPropertyValue(input, key);
            }
            return input;
        });
    }
    updateRelationsInput(id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = typeof id === 'string'
                ? yield this.findOneBy({ id: id })
                : yield this.findOneBy(id);
            if (!data) {
                throw new common_1.NotFoundException();
            }
            for (const key of Object.keys(input)) {
                data[key] = yield this.getPropertyValue(input, key);
            }
            return (0, global_1.cleanObject)(data);
        });
    }
};
BaseRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.EntityTarget !== "undefined" && typeorm_1.EntityTarget) === "function" ? _a : Object, typeof (_b = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _b : Object])
], BaseRepository);
exports.BaseRepository = BaseRepository;


/***/ }),

/***/ "./src/app/core/base.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const base_repository_1 = __webpack_require__("./src/app/core/base.repository.ts");
let BaseService = class BaseService {
    constructor(repository) {
        this.repository = repository;
    }
    getById(id) {
        return this.repository.getByIdWithRelations(id);
    }
    getManyByIds(ids) {
        return this.repository.getManyByIdsWithRelations(ids);
    }
    create(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.repository.createWithRelations(input);
            this.onCreated(res);
            return res;
        });
    }
    getAll(query) {
        return this.repository.paginated(query);
    }
    update(id, input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prev = typeof id === 'string'
                ? yield this.getById(id)
                : yield this.repository.findOne(id);
            const res = yield this.repository.updateWithRelations(id, input);
            this.onUpdated(res, prev);
            return res;
        });
    }
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.getById(id);
            yield this.repository.delete({ id: id });
            this.onDeleted(res);
            return;
        });
    }
    onCreated(value) {
        return;
    }
    onUpdated(value, prevValue) {
        return;
    }
    onDeleted(value) {
        return;
    }
};
BaseService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof base_repository_1.BaseRepository !== "undefined" && base_repository_1.BaseRepository) === "function" ? _a : Object])
], BaseService);
exports.BaseService = BaseService;


/***/ }),

/***/ "./src/app/core/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/core/base.service.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/core/base.repository.ts"), exports);


/***/ }),

/***/ "./src/app/database/database.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const repositories_1 = tslib_1.__importDefault(__webpack_require__("./src/app/database/repositories/index.ts"));
const config_1 = __webpack_require__("@nestjs/config");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => configService.get('database'),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [],
        providers: [...repositories_1.default],
        exports: [...repositories_1.default],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;


/***/ }),

/***/ "./src/app/database/entities/category.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CategoryEntity_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let CategoryEntity = CategoryEntity_1 = class CategoryEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity_1, (category) => category.children),
    tslib_1.__metadata("design:type", CategoryEntity)
], CategoryEntity.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => CategoryEntity_1, (category) => category.parent),
    tslib_1.__metadata("design:type", Array)
], CategoryEntity.prototype, "children", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CategoryEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CategoryEntity.prototype, "createdAt", void 0);
CategoryEntity = CategoryEntity_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)('categories'),
    (0, typeorm_1.Index)(['parent', 'title', 'type'], { unique: true })
], CategoryEntity);
exports.CategoryEntity = CategoryEntity;


/***/ }),

/***/ "./src/app/database/entities/credential.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CredentialEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
let CredentialEntity = class CredentialEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], CredentialEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], CredentialEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], CredentialEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    tslib_1.__metadata("design:type", String)
], CredentialEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], CredentialEntity.prototype, "verified", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CredentialEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CredentialEntity.prototype, "updatedAt", void 0);
CredentialEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('credentials')
], CredentialEntity);
exports.CredentialEntity = CredentialEntity;


/***/ }),

/***/ "./src/app/database/entities/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/user.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/credential.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/transaction.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/category.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/permission.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/role.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/store.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/product.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/order.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/payment.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/notification.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/store-rating.entity.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/tag.entity.ts"), exports);
const category_entity_1 = __webpack_require__("./src/app/database/entities/category.entity.ts");
const credential_entity_1 = __webpack_require__("./src/app/database/entities/credential.entity.ts");
const notification_entity_1 = __webpack_require__("./src/app/database/entities/notification.entity.ts");
const order_entity_1 = __webpack_require__("./src/app/database/entities/order.entity.ts");
const payment_entity_1 = __webpack_require__("./src/app/database/entities/payment.entity.ts");
const permission_entity_1 = __webpack_require__("./src/app/database/entities/permission.entity.ts");
const product_entity_1 = __webpack_require__("./src/app/database/entities/product.entity.ts");
const role_entity_1 = __webpack_require__("./src/app/database/entities/role.entity.ts");
const store_rating_entity_1 = __webpack_require__("./src/app/database/entities/store-rating.entity.ts");
const store_entity_1 = __webpack_require__("./src/app/database/entities/store.entity.ts");
const tag_entity_1 = __webpack_require__("./src/app/database/entities/tag.entity.ts");
const transaction_entity_1 = __webpack_require__("./src/app/database/entities/transaction.entity.ts");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
exports["default"] = [
    user_entity_1.UserEntity,
    credential_entity_1.CredentialEntity,
    transaction_entity_1.TransactionEntity,
    category_entity_1.CategoryEntity,
    permission_entity_1.PermissionEntity,
    role_entity_1.RoleEntity,
    store_entity_1.StoreEntity,
    product_entity_1.ProductEntity,
    order_entity_1.OrderEntity,
    payment_entity_1.PaymentEntity,
    notification_entity_1.NotificationEntity,
    store_rating_entity_1.StoreRatingEntity,
    tag_entity_1.TagEntity,
];


/***/ }),

/***/ "./src/app/database/entities/notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationEntity = exports.NotificationType = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
var NotificationType;
(function (NotificationType) {
    NotificationType["StoreOrderCreated"] = "store-order-created";
    NotificationType["StoreOrderUpdated"] = "store-order-updated";
    NotificationType["StoreOrderDeleted"] = "store-order-deleted";
    NotificationType["OrderCreated"] = "order-created";
    NotificationType["OrderUpdated"] = "order-updated";
    NotificationType["OrderDeleted"] = "order-deleted";
    NotificationType["AccountCreated"] = "account-created";
    NotificationType["AccountUpdated"] = "account-updated";
    NotificationType["AmountSent"] = "amount-sent";
    NotificationType["AmountReceived"] = "amount-received";
})(NotificationType = exports.NotificationType || (exports.NotificationType = {}));
let NotificationEntity = class NotificationEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], NotificationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], NotificationEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], NotificationEntity.prototype, "opened", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: NotificationType,
    }),
    tslib_1.__metadata("design:type", String)
], NotificationEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof global_1.NotificationMetadata !== "undefined" && global_1.NotificationMetadata) === "function" ? _b : Object)
], NotificationEntity.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], NotificationEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], NotificationEntity.prototype, "deletedAt", void 0);
NotificationEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('notifications')
], NotificationEntity);
exports.NotificationEntity = NotificationEntity;


/***/ }),

/***/ "./src/app/database/entities/order.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const store_entity_1 = __webpack_require__("./src/app/database/entities/store.entity.ts");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
const payment_entity_1 = __webpack_require__("./src/app/database/entities/payment.entity.ts");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "pending";
    OrderStatus["Cancelled"] = "cancelled";
    OrderStatus["Preparing"] = "preparing";
    OrderStatus["Ready"] = "ready";
    OrderStatus["Completed"] = "completed";
})(OrderStatus || (OrderStatus = {}));
let OrderEntity = class OrderEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], OrderEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Generated)('increment'),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], OrderEntity.prototype, "ref", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.StoreEntity),
    tslib_1.__metadata("design:type", typeof (_a = typeof store_entity_1.StoreEntity !== "undefined" && store_entity_1.StoreEntity) === "function" ? _a : Object)
], OrderEntity.prototype, "store", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], OrderEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        transformer: {
            to: (v) => v.map((item) => (Object.assign(Object.assign({}, item), { price: item.price / 100 }))),
            from: (v) => v.map((item) => (Object.assign(Object.assign({}, item), { price: item.price * 100 }))),
        },
    }),
    tslib_1.__metadata("design:type", Array)
], OrderEntity.prototype, "items", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.Pending,
    }),
    tslib_1.__metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.PaymentEntity, (payment) => payment.order, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof payment_entity_1.PaymentEntity !== "undefined" && payment_entity_1.PaymentEntity) === "function" ? _c : Object)
], OrderEntity.prototype, "payment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], OrderEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], OrderEntity.prototype, "createdAt", void 0);
OrderEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('orders')
], OrderEntity);
exports.OrderEntity = OrderEntity;


/***/ }),

/***/ "./src/app/database/entities/payment.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const order_entity_1 = __webpack_require__("./src/app/database/entities/order.entity.ts");
var PaymentType;
(function (PaymentType) {
    PaymentType["Cash"] = "cash";
    PaymentType["Online"] = "online";
})(PaymentType || (PaymentType = {}));
let PaymentEntity = class PaymentEntity {
    calcChange() {
        this.change = this.amountPaid - this.totalCost;
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.OrderEntity, (order) => order.payment),
    tslib_1.__metadata("design:type", typeof (_a = typeof order_entity_1.OrderEntity !== "undefined" && order_entity_1.OrderEntity) === "function" ? _a : Object)
], PaymentEntity.prototype, "order", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentType,
        default: PaymentType.Cash,
    }),
    tslib_1.__metadata("design:type", String)
], PaymentEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        transformer: {
            to: (v) => v * 100,
            from: (v) => v / 100,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], PaymentEntity.prototype, "amountPaid", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        transformer: {
            to: (v) => v * 100,
            from: (v) => v / 100,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], PaymentEntity.prototype, "totalCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PaymentEntity.prototype, "change", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PaymentEntity.prototype, "calcChange", null);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PaymentEntity.prototype, "createdAt", void 0);
PaymentEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('payments')
], PaymentEntity);
exports.PaymentEntity = PaymentEntity;


/***/ }),

/***/ "./src/app/database/entities/permission.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const category_entity_1 = __webpack_require__("./src/app/database/entities/category.entity.ts");
let PermissionEntity = class PermissionEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], PermissionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], PermissionEntity.prototype, "code", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PermissionEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PermissionEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_entity_1.CategoryEntity !== "undefined" && category_entity_1.CategoryEntity) === "function" ? _a : Object)
], PermissionEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], PermissionEntity.prototype, "createdAt", void 0);
PermissionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('permissions')
], PermissionEntity);
exports.PermissionEntity = PermissionEntity;


/***/ }),

/***/ "./src/app/database/entities/product.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const category_entity_1 = __webpack_require__("./src/app/database/entities/category.entity.ts");
const store_entity_1 = __webpack_require__("./src/app/database/entities/store.entity.ts");
let ProductEntity = class ProductEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CategoryEntity),
    tslib_1.__metadata("design:type", typeof (_a = typeof category_entity_1.CategoryEntity !== "undefined" && category_entity_1.CategoryEntity) === "function" ? _a : Object)
], ProductEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.StoreEntity, (store) => store.products),
    tslib_1.__metadata("design:type", typeof (_b = typeof store_entity_1.StoreEntity !== "undefined" && store_entity_1.StoreEntity) === "function" ? _b : Object)
], ProductEntity.prototype, "store", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        transformer: {
            to: (v) => v * 100,
            from: (v) => v / 100,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        transformer: {
            to: (v) => v,
            from: (v) => {
                var _a, _b, _c;
                const protocol = (_a = process.env.PROTOCOL) !== null && _a !== void 0 ? _a : 'http';
                const host = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : 'localhost';
                const port = (_c = process.env.PORT) !== null && _c !== void 0 ? _c : '3000';
                return v && `${protocol}://${host}:${port}/files/${v}`;
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], ProductEntity.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ProductEntity.prototype, "createdAt", void 0);
ProductEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('products'),
    (0, typeorm_1.Index)(['title', 'store'], { unique: true })
], ProductEntity);
exports.ProductEntity = ProductEntity;


/***/ }),

/***/ "./src/app/database/entities/role.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const permission_entity_1 = __webpack_require__("./src/app/database/entities/permission.entity.ts");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
let RoleEntity = class RoleEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], RoleEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], RoleEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], RoleEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => permission_entity_1.PermissionEntity),
    (0, typeorm_1.JoinTable)({ name: 'role_permissions' }),
    tslib_1.__metadata("design:type", Array)
], RoleEntity.prototype, "permissions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity, (user) => user.roles),
    tslib_1.__metadata("design:type", Array)
], RoleEntity.prototype, "users", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], RoleEntity.prototype, "createdAt", void 0);
RoleEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('roles')
], RoleEntity);
exports.RoleEntity = RoleEntity;


/***/ }),

/***/ "./src/app/database/entities/store-rating.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRatingEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const store_entity_1 = __webpack_require__("./src/app/database/entities/store.entity.ts");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
let StoreRatingEntity = class StoreRatingEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], StoreRatingEntity.prototype, "storeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => store_entity_1.StoreEntity),
    (0, typeorm_1.JoinColumn)({ name: 'store_id' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof store_entity_1.StoreEntity !== "undefined" && store_entity_1.StoreEntity) === "function" ? _a : Object)
], StoreRatingEntity.prototype, "store", void 0);
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], StoreRatingEntity.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], StoreRatingEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    tslib_1.__metadata("design:type", Number)
], StoreRatingEntity.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], StoreRatingEntity.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], StoreRatingEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], StoreRatingEntity.prototype, "createdAt", void 0);
StoreRatingEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('store_ratings')
], StoreRatingEntity);
exports.StoreRatingEntity = StoreRatingEntity;


/***/ }),

/***/ "./src/app/database/entities/store.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
const product_entity_1 = __webpack_require__("./src/app/database/entities/product.entity.ts");
const tag_entity_1 = __webpack_require__("./src/app/database/entities/tag.entity.ts");
let StoreEntity = class StoreEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], StoreEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.stores),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], StoreEntity.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.store),
    tslib_1.__metadata("design:type", typeof (_b = typeof product_entity_1.ProductEntity !== "undefined" && product_entity_1.ProductEntity) === "function" ? _b : Object)
], StoreEntity.prototype, "products", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], StoreEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        transformer: {
            to: (v) => v,
            from: (v) => {
                var _a, _b, _c;
                const protocol = (_a = process.env.PROTOCOL) !== null && _a !== void 0 ? _a : 'http';
                const host = (_b = process.env.HOST) !== null && _b !== void 0 ? _b : 'localhost';
                const port = (_c = process.env.PORT) !== null && _c !== void 0 ? _c : '3000';
                return v && `${protocol}://${host}:${port}/files/${v}`;
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], StoreEntity.prototype, "image", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], StoreEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.TagEntity, (tag) => tag.stores),
    (0, typeorm_1.JoinTable)({ name: 'store_tags' }),
    tslib_1.__metadata("design:type", Array)
], StoreEntity.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], StoreEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ select: false, insert: false, readonly: true, nullable: true }),
    tslib_1.__metadata("design:type", Number)
], StoreEntity.prototype, "rating", void 0);
StoreEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('stores'),
    (0, typeorm_1.Index)(['title', 'owner'], { unique: true })
], StoreEntity);
exports.StoreEntity = StoreEntity;


/***/ }),

/***/ "./src/app/database/entities/tag.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const store_entity_1 = __webpack_require__("./src/app/database/entities/store.entity.ts");
let TagEntity = class TagEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], TagEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TagEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TagEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => store_entity_1.StoreEntity, (store) => store.tags),
    tslib_1.__metadata("design:type", Array)
], TagEntity.prototype, "stores", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], TagEntity.prototype, "createdAt", void 0);
TagEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('tags'),
    (0, typeorm_1.Index)(['title', 'type'], { unique: true })
], TagEntity);
exports.TagEntity = TagEntity;


/***/ }),

/***/ "./src/app/database/entities/transaction.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./src/app/database/entities/user.entity.ts");
let TransactionEntity = class TransactionEntity {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], TransactionEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.transactions),
    (0, typeorm_1.JoinColumn)({ name: 'sender' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], TransactionEntity.prototype, "sender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.transactions),
    (0, typeorm_1.JoinColumn)({ name: 'receiver' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], TransactionEntity.prototype, "receiver", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        transformer: {
            to: (v) => v * 100,
            from: (v) => v / 100,
        },
    }),
    tslib_1.__metadata("design:type", Number)
], TransactionEntity.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TransactionEntity.prototype, "createdAt", void 0);
TransactionEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('transactions')
], TransactionEntity);
exports.TransactionEntity = TransactionEntity;


/***/ }),

/***/ "./src/app/database/entities/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const credential_entity_1 = __webpack_require__("./src/app/database/entities/credential.entity.ts");
const role_entity_1 = __webpack_require__("./src/app/database/entities/role.entity.ts");
const transaction_entity_1 = __webpack_require__("./src/app/database/entities/transaction.entity.ts");
const store_entity_1 = __webpack_require__("./src/app/database/entities/store.entity.ts");
let UserEntity = class UserEntity {
    generateRandomString() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const timestamp = new Date().getTime().toString();
            const characters = 'T5NYVA3ISZU7M';
            let uniqueCode = '';
            for (let i = 0; i < timestamp.length; i++) {
                const digit = parseInt(timestamp[i]);
                uniqueCode += characters.charAt(digit);
            }
            this.uniqueCode = uniqueCode;
        });
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "uniqueCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => credential_entity_1.CredentialEntity, (credential) => credential.user),
    tslib_1.__metadata("design:type", typeof (_a = typeof credential_entity_1.CredentialEntity !== "undefined" && credential_entity_1.CredentialEntity) === "function" ? _a : Object)
], UserEntity.prototype, "credential", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.TransactionEntity, (transaction) => { var _a; return (_a = transaction.sender) !== null && _a !== void 0 ? _a : transaction.receiver; }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "transactions", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.RoleEntity, (role) => role.users),
    (0, typeorm_1.JoinTable)({ name: 'user_roles' }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => store_entity_1.StoreEntity, (store) => store.owner),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "stores", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], UserEntity.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.BeforeInsert)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserEntity.prototype, "generateRandomString", null);
UserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
exports.UserEntity = UserEntity;


/***/ }),

/***/ "./src/app/database/factories/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const user_factory_1 = tslib_1.__importDefault(__webpack_require__("./src/app/database/factories/user.factory.ts"));
exports["default"] = [user_factory_1.default];


/***/ }),

/***/ "./src/app/database/factories/user.factory.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const typeorm_extension_1 = __webpack_require__("typeorm-extension");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
exports["default"] = (0, typeorm_extension_1.setSeederFactory)(entities_1.UserEntity, (faker) => {
    const user = new entities_1.UserEntity();
    user.firstName = faker.name.firstName('male');
    user.lastName = faker.name.lastName('male');
    return user;
});


/***/ }),

/***/ "./src/app/database/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/database/entities/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/database.module.ts"), exports);


/***/ }),

/***/ "./src/app/database/repositories/category.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let CategoryRepository = class CategoryRepository extends core_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.CategoryEntity, dataSource);
    }
    getParentsByCategoryId(id) {
        return this.query(`
      WITH RECURSIVE category_tree AS (
        SELECT
          id,
          title,
          parent_id,
          description,
          type,
          created_at,
          1 AS level
        FROM
          categories
        WHERE
          id = '${id}'
      
        UNION ALL
      
        SELECT
          c.id,
          c.title,
          c.parent_id,
          c.description,
          c.type,
          c.created_at,
          ct.level + 1 AS level
        FROM
          categories c
        JOIN
          category_tree ct ON c.id = ct.parent_id
      )
      SELECT
        id,
        title,
        level
        description,
        type,
        created_at
      FROM
        category_tree
      ORDER BY
        level DESC, id;
    `);
    }
    searchFields() {
        return ['title'];
    }
    mapRelations() {
        return { parent: this };
    }
    relations() {
        return { parent: true, children: true };
    }
    modifyWhere(_a) {
        var { isRoot } = _a, conditions = tslib_1.__rest(_a, ["isRoot"]);
        if (isRoot !== undefined) {
            conditions.parent = isRoot ? (0, typeorm_1.IsNull)() : (0, typeorm_1.Not)((0, typeorm_1.IsNull)());
        }
        return conditions;
    }
};
CategoryRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;


/***/ }),

/***/ "./src/app/database/repositories/credential.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CredentialRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let CredentialRepository = class CredentialRepository extends core_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.CredentialEntity, dataSource);
    }
};
CredentialRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], CredentialRepository);
exports.CredentialRepository = CredentialRepository;


/***/ }),

/***/ "./src/app/database/repositories/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/user.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/credential.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/transaction.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/role.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/category.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/store.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/product.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/order.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/payment.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/permission.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/notification.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/store-rating.repository.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/database/repositories/tag.repository.ts"), exports);
const user_repository_1 = __webpack_require__("./src/app/database/repositories/user.repository.ts");
const credential_repository_1 = __webpack_require__("./src/app/database/repositories/credential.repository.ts");
const transaction_repository_1 = __webpack_require__("./src/app/database/repositories/transaction.repository.ts");
const role_repository_1 = __webpack_require__("./src/app/database/repositories/role.repository.ts");
const category_repository_1 = __webpack_require__("./src/app/database/repositories/category.repository.ts");
const store_repository_1 = __webpack_require__("./src/app/database/repositories/store.repository.ts");
const product_repository_1 = __webpack_require__("./src/app/database/repositories/product.repository.ts");
const order_repository_1 = __webpack_require__("./src/app/database/repositories/order.repository.ts");
const payment_repository_1 = __webpack_require__("./src/app/database/repositories/payment.repository.ts");
const permission_repository_1 = __webpack_require__("./src/app/database/repositories/permission.repository.ts");
const notification_repository_1 = __webpack_require__("./src/app/database/repositories/notification.repository.ts");
const store_rating_repository_1 = __webpack_require__("./src/app/database/repositories/store-rating.repository.ts");
const tag_repository_1 = __webpack_require__("./src/app/database/repositories/tag.repository.ts");
exports["default"] = [
    user_repository_1.UserRepository,
    credential_repository_1.CredentialRepository,
    transaction_repository_1.TransactionRepository,
    role_repository_1.RoleRepository,
    category_repository_1.CategoryRepository,
    store_repository_1.StoreRepository,
    product_repository_1.ProductRepository,
    order_repository_1.OrderRepository,
    payment_repository_1.PaymentRepository,
    permission_repository_1.PermissionRepository,
    notification_repository_1.NotificationRepository,
    store_rating_repository_1.StoreRatingRepository,
    tag_repository_1.TagRepository,
];


/***/ }),

/***/ "./src/app/database/repositories/notification.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const user_repository_1 = __webpack_require__("./src/app/database/repositories/user.repository.ts");
const order_repository_1 = __webpack_require__("./src/app/database/repositories/order.repository.ts");
const store_repository_1 = __webpack_require__("./src/app/database/repositories/store.repository.ts");
let NotificationRepository = class NotificationRepository extends core_1.BaseRepository {
    constructor(dataSource, userRepository, orderRepository, storeRepository) {
        super(entities_1.NotificationEntity, dataSource);
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.storeRepository = storeRepository;
    }
    mapRelations() {
        return {
            user: this.userRepository,
        };
    }
    relations() {
        return {
            user: true,
        };
    }
    modifyResult(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, item), { metadata: Object.assign(Object.assign({}, item.metadata), { order: item.metadata.orderId &&
                        (yield this.orderRepository.getByIdWithRelations(item.metadata.orderId)), store: item.metadata.storeId &&
                        (yield this.storeRepository.getByIdWithRelations(item.metadata.storeId)), user: item.metadata.userId &&
                        (yield this.userRepository.getByIdWithRelations(item.metadata.userId)) }) });
        });
    }
    getItems(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder('notifications')
                .leftJoinAndSelect('notifications.user', 'user')
                .where('notifications.user_id = :userId', { userId })
                .take(5)
                .orderBy('notifications.createdAt', 'DESC')
                .getMany();
            return Promise.all(result.map((item) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, item), { metadata: Object.assign(Object.assign({}, item.metadata), { order: item.metadata.orderId &&
                            (yield this.orderRepository.getByIdWithRelations(item.metadata.orderId)), store: item.metadata.storeId &&
                            (yield this.storeRepository.getByIdWithRelations(item.metadata.storeId)), user: item.metadata.userId &&
                            (yield this.userRepository.getByIdWithRelations(item.metadata.userId)) }) }));
            })));
        });
    }
};
NotificationRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof order_repository_1.OrderRepository !== "undefined" && order_repository_1.OrderRepository) === "function" ? _c : Object, typeof (_d = typeof store_repository_1.StoreRepository !== "undefined" && store_repository_1.StoreRepository) === "function" ? _d : Object])
], NotificationRepository);
exports.NotificationRepository = NotificationRepository;


/***/ }),

/***/ "./src/app/database/repositories/order.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const user_repository_1 = __webpack_require__("./src/app/database/repositories/user.repository.ts");
const store_repository_1 = __webpack_require__("./src/app/database/repositories/store.repository.ts");
const payment_repository_1 = __webpack_require__("./src/app/database/repositories/payment.repository.ts");
let OrderRepository = class OrderRepository extends core_1.BaseRepository {
    constructor(dataSource, userRepository, storeRepository, paymenRepository) {
        super(entities_1.OrderEntity, dataSource);
        this.userRepository = userRepository;
        this.storeRepository = storeRepository;
        this.paymenRepository = paymenRepository;
    }
    mapRelations() {
        return {
            user: this.userRepository,
            store: this.storeRepository,
            payment: this.paymenRepository,
        };
    }
    relations() {
        return {
            user: true,
            payment: true,
            store: { owner: true },
        };
    }
    modifyWhere(_a) {
        var { ids, storeIds, isPaid, userIds, startDate, endDate } = _a, conditions = tslib_1.__rest(_a, ["ids", "storeIds", "isPaid", "userIds", "startDate", "endDate"]);
        if (ids)
            conditions.id = (0, typeorm_1.In)(ids);
        if (storeIds) {
            conditions.store = { id: (0, typeorm_1.In)(storeIds) };
        }
        if (isPaid) {
            conditions.payment = (0, typeorm_1.Not)((0, typeorm_1.IsNull)());
        }
        if (userIds) {
            conditions.user = { id: (0, typeorm_1.In)(userIds) };
        }
        if (startDate && endDate) {
            conditions.createdAt = (0, typeorm_1.Between)(startDate, endDate);
        }
        else if (startDate) {
            conditions.createdAt = (0, typeorm_1.MoreThanOrEqual)(startDate);
        }
        else if (endDate) {
            conditions.createdAt = (0, typeorm_1.LessThanOrEqual)(endDate);
        }
        return conditions;
    }
};
OrderRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof store_repository_1.StoreRepository !== "undefined" && store_repository_1.StoreRepository) === "function" ? _c : Object, typeof (_d = typeof payment_repository_1.PaymentRepository !== "undefined" && payment_repository_1.PaymentRepository) === "function" ? _d : Object])
], OrderRepository);
exports.OrderRepository = OrderRepository;


/***/ }),

/***/ "./src/app/database/repositories/payment.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const order_repository_1 = __webpack_require__("./src/app/database/repositories/order.repository.ts");
let PaymentRepository = class PaymentRepository extends core_1.BaseRepository {
    constructor(dataSource, orderRepository) {
        super(entities_1.PaymentEntity, dataSource);
        this.orderRepository = orderRepository;
    }
    mapRelations() {
        return {
            order: this.orderRepository,
        };
    }
    relations() {
        return {
            order: true,
        };
    }
};
PaymentRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => order_repository_1.OrderRepository))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof order_repository_1.OrderRepository !== "undefined" && order_repository_1.OrderRepository) === "function" ? _b : Object])
], PaymentRepository);
exports.PaymentRepository = PaymentRepository;


/***/ }),

/***/ "./src/app/database/repositories/permission.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let PermissionRepository = class PermissionRepository extends core_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.PermissionEntity, dataSource);
    }
    relations() {
        return {
            category: true,
        };
    }
};
PermissionRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], PermissionRepository);
exports.PermissionRepository = PermissionRepository;


/***/ }),

/***/ "./src/app/database/repositories/product.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const store_repository_1 = __webpack_require__("./src/app/database/repositories/store.repository.ts");
const category_repository_1 = __webpack_require__("./src/app/database/repositories/category.repository.ts");
let ProductRepository = class ProductRepository extends core_1.BaseRepository {
    constructor(dataSource, storeRepository, categoryRepository) {
        super(entities_1.ProductEntity, dataSource);
        this.storeRepository = storeRepository;
        this.categoryRepository = categoryRepository;
    }
    modifyResult(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, item), { categories: yield this.categoryRepository.getParentsByCategoryId(item.category.id) });
        });
    }
    searchFields() {
        return ['title'];
    }
    mapRelations() {
        return {
            store: this.storeRepository,
            category: this.categoryRepository,
        };
    }
    relations() {
        return {
            store: true,
            category: true,
        };
    }
    modifyWhere(_a) {
        var { ids, categoryIds } = _a, conditions = tslib_1.__rest(_a, ["ids", "categoryIds"]);
        if (ids)
            conditions.id = (0, typeorm_1.In)(ids);
        if (categoryIds) {
            conditions.category = [
                { id: (0, typeorm_1.In)(categoryIds) },
                { parent: (0, typeorm_1.In)(categoryIds) },
            ];
        }
        return conditions;
    }
};
ProductRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof store_repository_1.StoreRepository !== "undefined" && store_repository_1.StoreRepository) === "function" ? _b : Object, typeof (_c = typeof category_repository_1.CategoryRepository !== "undefined" && category_repository_1.CategoryRepository) === "function" ? _c : Object])
], ProductRepository);
exports.ProductRepository = ProductRepository;


/***/ }),

/***/ "./src/app/database/repositories/role.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let RoleRepository = class RoleRepository extends core_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.RoleEntity, dataSource);
    }
    relations() {
        return {
            permissions: true,
        };
    }
};
RoleRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], RoleRepository);
exports.RoleRepository = RoleRepository;


/***/ }),

/***/ "./src/app/database/repositories/store-rating.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRatingRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const user_repository_1 = __webpack_require__("./src/app/database/repositories/user.repository.ts");
let StoreRatingRepository = class StoreRatingRepository extends core_1.BaseRepository {
    constructor(dataSource, storeRepository, userRepository) {
        super(entities_1.StoreRatingEntity, dataSource);
        this.storeRepository = storeRepository;
        this.userRepository = userRepository;
    }
    mapRelations() {
        return {
            store: this.storeRepository,
            user: this.userRepository,
        };
    }
    relations() {
        return {
            store: true,
            user: true,
        };
    }
};
StoreRatingRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _c : Object])
], StoreRatingRepository);
exports.StoreRatingRepository = StoreRatingRepository;


/***/ }),

/***/ "./src/app/database/repositories/store.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const user_repository_1 = __webpack_require__("./src/app/database/repositories/user.repository.ts");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const store_rating_repository_1 = __webpack_require__("./src/app/database/repositories/store-rating.repository.ts");
const tag_repository_1 = __webpack_require__("./src/app/database/repositories/tag.repository.ts");
let StoreRepository = class StoreRepository extends core_1.BaseRepository {
    constructor(dataSource, ownerRepository, storeRatingRepository, tagRepository) {
        super(entities_1.StoreEntity, dataSource);
        this.ownerRepository = ownerRepository;
        this.storeRatingRepository = storeRatingRepository;
        this.tagRepository = tagRepository;
    }
    searchFields() {
        return ['title'];
    }
    modifyResult(item) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rating = yield this.storeRatingRepository.average('rating', {
                storeId: item.id,
            });
            return Object.assign(Object.assign({}, item), { rating });
        });
    }
    mapRelations() {
        return {
            owner: this.ownerRepository,
            tags: (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return yield this.getTags(input.tags);
            }),
        };
    }
    relations() {
        return {
            owner: true,
            tags: true,
            products: true,
        };
    }
    getTags(items) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tags = [];
            for (const item of items) {
                if ((0, global_1.isUUID)(item)) {
                    const tag = yield this.tagRepository.getById(item);
                    tags.push(tag);
                }
                else {
                    let tag = yield this.tagRepository.findOneBy({
                        title: item,
                        type: 'product',
                    });
                    if (!tag) {
                        tag = yield this.tagRepository.createWithRelations({
                            title: item,
                            type: 'product',
                        });
                    }
                    tags.push(tag);
                }
            }
            return tags;
        });
    }
};
StoreRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof store_rating_repository_1.StoreRatingRepository !== "undefined" && store_rating_repository_1.StoreRatingRepository) === "function" ? _c : Object, typeof (_d = typeof tag_repository_1.TagRepository !== "undefined" && tag_repository_1.TagRepository) === "function" ? _d : Object])
], StoreRepository);
exports.StoreRepository = StoreRepository;


/***/ }),

/***/ "./src/app/database/repositories/tag.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let TagRepository = class TagRepository extends core_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.TagEntity, dataSource);
    }
    searchFields() {
        return ['title'];
    }
};
TagRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], TagRepository);
exports.TagRepository = TagRepository;


/***/ }),

/***/ "./src/app/database/repositories/transaction.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const user_repository_1 = __webpack_require__("./src/app/database/repositories/user.repository.ts");
let TransactionRepository = class TransactionRepository extends core_1.BaseRepository {
    constructor(dataSource, userRepository) {
        super(entities_1.TransactionEntity, dataSource);
        this.userRepository = userRepository;
    }
    mapRelations() {
        return {
            sender: this.userRepository,
            receiver: this.userRepository,
        };
    }
    relations() {
        return {
            sender: true,
            receiver: true,
        };
    }
    modifyWhere(_a) {
        var { ids, userIds } = _a, conditions = tslib_1.__rest(_a, ["ids", "userIds"]);
        if (ids)
            conditions.id = (0, typeorm_1.In)(ids);
        if (userIds) {
            return [
                Object.assign(Object.assign({}, conditions), { sender: (0, typeorm_1.In)(userIds) }),
                Object.assign(Object.assign({}, conditions), { receiver: (0, typeorm_1.In)(userIds) }),
            ];
        }
        return conditions;
    }
    balance(userId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder()
                .select(`SUM(
            amount *
            (
                CASE
                    WHEN receiver = :userId
                    THEN 1
                    ELSE -1
                END
            )
          )`, 'balance')
                .where(`(receiver != sender OR receiver IS NULL OR sender IS NULL) AND (receiver = :userId OR sender = :userId)`)
                .setParameters({ userId })
                .getRawOne();
            return +((_a = result === null || result === void 0 ? void 0 : result.balance) !== null && _a !== void 0 ? _a : 0) / 100;
        });
    }
    systemCirculatingAmount() {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.createQueryBuilder()
                .select(`SUM(
            amount *
            (
                CASE
                    WHEN receiver IS NULL
                    THEN -1
                    ELSE 1
                END
            )
          )`, 'balance')
                .where(`receiver IS NULL OR sender IS NULL`)
                .getRawOne();
            return +((_a = result === null || result === void 0 ? void 0 : result.balance) !== null && _a !== void 0 ? _a : 0) / 100;
        });
    }
};
TransactionRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _b : Object])
], TransactionRepository);
exports.TransactionRepository = TransactionRepository;


/***/ }),

/***/ "./src/app/database/repositories/user.repository.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let UserRepository = class UserRepository extends core_1.BaseRepository {
    constructor(dataSource) {
        super(entities_1.UserEntity, dataSource);
    }
    relations() {
        return {
            roles: { permissions: true },
        };
    }
};
UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserRepository);
exports.UserRepository = UserRepository;


/***/ }),

/***/ "./src/app/database/seeds/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const role_seeder_1 = tslib_1.__importDefault(__webpack_require__("./src/app/database/seeds/role.seeder.ts"));
exports["default"] = [role_seeder_1.default];


/***/ }),

/***/ "./src/app/database/seeds/role.seeder.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const entities_1 = __webpack_require__("./src/app/database/entities/index.ts");
const roles_permissions_1 = __webpack_require__("./src/app/config/roles-permissions.ts");
class RoleSeeder {
    run(dataSource) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryRepository = dataSource.getRepository(entities_1.CategoryEntity);
            const permissionRepository = dataSource.getRepository(entities_1.PermissionEntity);
            const roleRepository = dataSource.getRepository(entities_1.RoleEntity);
            const rolesPermissions = roles_permissions_1.roles.reduce((curr, item) => (Object.assign(Object.assign({}, curr), { [item.title]: [] })), {});
            for (const item of roles_permissions_1.permissions) {
                const { generatedMaps } = yield categoryRepository.upsert({
                    title: item.title,
                    description: item.description,
                    type: 'permission',
                }, ['title', 'type', 'parent']);
                const newPermissions = yield permissionRepository.upsert(item.permissions.map((permission) => (Object.assign(Object.assign({}, permission), { category: generatedMaps[0] }))), ['code']);
                newPermissions.generatedMaps.forEach((permission, i) => {
                    item.permissions[i].roles.forEach((key) => {
                        rolesPermissions[key].push(permission);
                    });
                });
            }
            for (const role of roles_permissions_1.roles) {
                const newRole = (_a = (yield roleRepository.findOneBy({ title: role.title }))) !== null && _a !== void 0 ? _a : new entities_1.RoleEntity();
                newRole.title = role.title;
                newRole.description = role.description;
                newRole.permissions = rolesPermissions[role.title];
                yield roleRepository.save(newRole);
            }
        });
    }
}
exports["default"] = RoleSeeder;


/***/ }),

/***/ "./src/app/helpers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/helpers/password.helper.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/helpers/storage.helper.ts"), exports);


/***/ }),

/***/ "./src/app/helpers/password.helper.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkPassword = exports.hashPassword = void 0;
const tslib_1 = __webpack_require__("tslib");
const bcrypt = tslib_1.__importStar(__webpack_require__("bcrypt"));
const hashPassword = (password) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt.genSalt();
    return yield bcrypt.hash(password, salt);
});
exports.hashPassword = hashPassword;
const checkPassword = (password, hash) => tslib_1.__awaiter(void 0, void 0, void 0, function* () { return bcrypt.compare(password, hash); });
exports.checkPassword = checkPassword;


/***/ }),

/***/ "./src/app/helpers/storage.helper.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.uploadStorage = void 0;
const tslib_1 = __webpack_require__("tslib");
const multer_1 = __webpack_require__("multer");
const configuration_1 = tslib_1.__importDefault(__webpack_require__("./src/app/config/configuration.ts"));
exports.uploadStorage = (0, multer_1.diskStorage)({
    destination: (0, configuration_1.default)().multer.dest,
    filename: (req, file, callback) => {
        // Generate a unique file name or use the original file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, uniqueSuffix + '-' + file.originalname);
    },
});


/***/ }),

/***/ "./src/app/interceptors/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/interceptors/parse-body.interceptor.ts"), exports);


/***/ }),

/***/ "./src/app/interceptors/parse-body.interceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseBodyInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const operators_1 = __webpack_require__("rxjs/operators");
let ParseBodyInterceptor = class ParseBodyInterceptor {
    intercept(context, next) {
        // console.log('Before request execution');
        const request = context.switchToHttp().getRequest();
        // Modify the request or perform any necessary operations
        request.body = (0, global_1.parseDataForm)(request.body);
        return next.handle().pipe((0, operators_1.tap)(() => {
            // console.log('After request execution');
            // Modify the response or perform any necessary operations
        }));
    }
};
ParseBodyInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ParseBodyInterceptor);
exports.ParseBodyInterceptor = ParseBodyInterceptor;


/***/ }),

/***/ "./src/app/modules/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const controllers_1 = __webpack_require__("./src/app/modules/auth/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/auth/services/index.ts");
const strategies_1 = __webpack_require__("./src/app/modules/auth/strategies/index.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => configService.get('jwt'),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [controllers_1.AuthController],
        providers: [services_1.AuthService, strategies_1.LocalStrategy, strategies_1.JwtStrategy],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/app/modules/auth/controllers/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const services_1 = __webpack_require__("./src/app/modules/auth/services/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const decorators_1 = __webpack_require__("./src/app/modules/auth/decorators/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.auth);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.register(body);
            return { status: 201, body: user };
        });
    }
    login({ user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.login(user);
            return { status: 201, body: result };
        });
    }
    verify({ user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return { status: 201, body: user };
        });
    }
    changePassword({ user }, { body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authService.changePassword(user.id, body);
            return { status: 201, body: user };
        });
    }
    verifyEmail({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.verifyEmail(query.accessToken);
            return { status: 201, body: user };
        });
    }
    resendVerifyEmail({ user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.resendVerifyEmail(user.id);
            return { status: 201, body: result };
        });
    }
};
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.register),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.LocalAuthGuard),
    (0, nest_1.TsRest)(c.login),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, nest_1.TsRest)(c.verify),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(global_1.RolePermission.AuthChangePassword),
    (0, nest_1.TsRest)(c.changePassword),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.verifyEmail),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, nest_1.TsRest)(c.resendVerifyEmail),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerifyEmail", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.AuthService !== "undefined" && services_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./src/app/modules/auth/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/controllers/auth.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/auth/decorators/auth.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Auth = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const Auth = () => (0, common_1.SetMetadata)('auth', true);
exports.Auth = Auth;


/***/ }),

/***/ "./src/app/modules/auth/decorators/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/decorators/permission.decorator.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/decorators/auth.decorator.ts"), exports);


/***/ }),

/***/ "./src/app/modules/auth/decorators/permission.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Permissions = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const Permissions = (...permissions) => (0, common_1.SetMetadata)('permissions', permissions);
exports.Permissions = Permissions;


/***/ }),

/***/ "./src/app/modules/auth/guards/allow-unauthorize.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllowUnauthorize = void 0;
const common_1 = __webpack_require__("@nestjs/common");
const AllowUnauthorize = () => (0, common_1.SetMetadata)('ALLOW_UNAUTHORIZE', true);
exports.AllowUnauthorize = AllowUnauthorize;


/***/ }),

/***/ "./src/app/modules/auth/guards/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/guards/local-auth.guard.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/guards/jwt-auth.guard.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/guards/permission.guard.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/guards/allow-unauthorize.guard.ts"), exports);


/***/ }),

/***/ "./src/app/modules/auth/guards/jwt-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const passport_1 = __webpack_require__("@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const allowUnauthorize = this.reflector.get('ALLOW_UNAUTHORIZE', context.getHandler());
        const request = context.switchToHttp().getRequest();
        if (allowUnauthorize && !request.headers.authorization) {
            return true;
        }
        // Add your custom logic before calling the parent canActivate() method
        // For example, you can perform additional checks or validations
        // You can access the request using context.switchToHttp().getRequest()
        return super.canActivate(context);
    }
};
JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./src/app/modules/auth/guards/local-auth.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const passport_1 = __webpack_require__("@nestjs/passport");
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
LocalAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./src/app/modules/auth/guards/permission.guard.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionGuard = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
let PermissionGuard = class PermissionGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const permissions = this.reflector.get('permissions', context.getHandler());
        if (!permissions)
            return true;
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return (0, global_1.checkUserPermission)(user, permissions);
    }
};
PermissionGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;


/***/ }),

/***/ "./src/app/modules/auth/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/auth.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/guards/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/decorators/index.ts"), exports);


/***/ }),

/***/ "./src/app/modules/auth/services/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("typeorm");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const jwt_1 = __webpack_require__("@nestjs/jwt");
const mail_1 = __webpack_require__("./src/app/modules/mail/index.ts");
const helpers_1 = __webpack_require__("./src/app/helpers/index.ts");
let AuthService = class AuthService {
    constructor(dataSource, credentialRepository, userRepository, roleRepository, jwtService, mailService) {
        this.dataSource = dataSource;
        this.credentialRepository = credentialRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    register({ firstName, lastName, email, password }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (yield this.credentialRepository.findOneBy({ email })) {
                throw new common_1.BadRequestException('Email already exists');
            }
            const queryRunner = this.dataSource.createQueryRunner();
            yield queryRunner.connect();
            const user = this.userRepository.create({ firstName, lastName });
            const credential = this.credentialRepository.create({
                email,
                password: yield (0, helpers_1.hashPassword)(password),
            });
            yield queryRunner.startTransaction();
            try {
                user.roles = [
                    yield this.roleRepository.findOne({ where: { title: 'User' } }),
                ];
                yield queryRunner.manager.save(user);
                credential.user = user;
                yield queryRunner.manager.save(credential);
                yield queryRunner.commitTransaction();
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                yield queryRunner.release();
            }
            const accessToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '15m' });
            delete credential.user;
            user.credential = credential;
            yield this.mailService.sendUserConfirmation(user, accessToken);
            return user;
        });
    }
    validateUser({ email, password }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const credential = yield this.credentialRepository.findOne({
                where: { email },
                relations: ['user'],
            });
            if (!credential || !(yield (0, helpers_1.checkPassword)(password, credential.password))) {
                throw new common_1.UnauthorizedException();
            }
            return credential.user;
        });
    }
    login(user) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { sub: user.id };
            return {
                accessToken: this.jwtService.sign(payload),
                user,
            };
        });
    }
    changePassword(id, { currentPassword, newPassword }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const credential = yield this.credentialRepository.findOneBy({
                user: { id },
            });
            if (!credential ||
                !(yield (0, helpers_1.checkPassword)(currentPassword, credential.password))) {
                throw new common_1.ForbiddenException();
            }
            credential.password = yield (0, helpers_1.hashPassword)(newPassword);
            yield this.credentialRepository.save(credential);
        });
    }
    verifyEmail(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.jwtService.verify(token);
                const credential = yield this.credentialRepository.findOne({
                    where: {
                        user: { id: result.sub },
                    },
                    relations: ['user'],
                });
                credential.verified = true;
                yield this.credentialRepository.save(credential);
                return 'Thank you for verifying your email!';
            }
            catch (err) {
                throw new common_1.UnauthorizedException();
            }
        });
    }
    resendVerifyEmail(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { sub: id };
            const user = yield this.userRepository.findOne({
                where: { id },
                relations: ['credential'],
            });
            const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
            yield this.mailService.sendUserConfirmation(user, accessToken);
            return {
                accessToken,
            };
        });
    }
    verifyClientToken(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.jwtService.verify(token);
                return this.userRepository.findOneBy({ id: result.sub });
            }
            catch (err) {
                return;
            }
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof database_1.CredentialRepository !== "undefined" && database_1.CredentialRepository) === "function" ? _b : Object, typeof (_c = typeof database_1.UserRepository !== "undefined" && database_1.UserRepository) === "function" ? _c : Object, typeof (_d = typeof database_1.RoleRepository !== "undefined" && database_1.RoleRepository) === "function" ? _d : Object, typeof (_e = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _e : Object, typeof (_f = typeof mail_1.MailService !== "undefined" && mail_1.MailService) === "function" ? _f : Object])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/modules/auth/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/services/auth.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/auth/strategies/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/strategies/local.strategy.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/strategies/jwt.strategy.ts"), exports);


/***/ }),

/***/ "./src/app/modules/auth/strategies/jwt.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_jwt_1 = __webpack_require__("passport-jwt");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const database_1 = __webpack_require__("./src/app/database/index.ts");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, userRepository) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt').secret,
        });
        this.configService = configService;
        this.userRepository = userRepository;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: payload.sub },
                relations: {
                    roles: {
                        permissions: true,
                    },
                },
            });
            if (!user)
                throw new common_1.UnauthorizedException();
            return Object.assign(Object.assign({}, user), { roles: user.roles.map((role) => {
                    return Object.assign(Object.assign({}, role), { permissions: role.permissions.map(({ code }) => code) });
                }) });
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof database_1.UserRepository !== "undefined" && database_1.UserRepository) === "function" ? _b : Object])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/app/modules/auth/strategies/local.strategy.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const tslib_1 = __webpack_require__("tslib");
const passport_local_1 = __webpack_require__("passport-local");
const passport_1 = __webpack_require__("@nestjs/passport");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./src/app/modules/auth/services/auth.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
        this.authService = authService;
    }
    validate(email, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser({ email, password });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
LocalStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),

/***/ "./src/app/modules/category/category.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/category/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/category/services/index.ts");
let CategoryModule = class CategoryModule {
};
CategoryModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.CategoryController],
        providers: [services_1.CategoryService],
    })
], CategoryModule);
exports.CategoryModule = CategoryModule;


/***/ }),

/***/ "./src/app/modules/category/controllers/category.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const services_1 = __webpack_require__("./src/app/modules/category/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.category);
let CategoryController = class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.create(body);
            return { status: 201, body: category };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.getById(params.id);
            if (!category) {
                return { status: 404, body: null };
            }
            return { status: 200, body: category };
        });
    }
    // @Permissions(RolePermission.CategoryGetAll)
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categories = yield this.categoryService.getAll(query);
            return { status: 200, body: categories };
        });
    }
    update({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.categoryService.update(params.id, body);
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.categoryService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.CategoryCreate),
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.CategoryGet),
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "get", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.CategoryUpdate),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.CategoryDelete),
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CategoryController.prototype, "delete", null);
CategoryController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.CategoryService !== "undefined" && services_1.CategoryService) === "function" ? _a : Object])
], CategoryController);
exports.CategoryController = CategoryController;


/***/ }),

/***/ "./src/app/modules/category/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/category/controllers/category.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/category/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/category/category.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/category/services/category.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CategoryService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let CategoryService = class CategoryService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
CategoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.CategoryRepository !== "undefined" && database_1.CategoryRepository) === "function" ? _a : Object])
], CategoryService);
exports.CategoryService = CategoryService;


/***/ }),

/***/ "./src/app/modules/category/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/category/services/category.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/user/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/auth/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/mail/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/transaction/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/category/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/product/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/order/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/payment/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/role/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/statistic/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/permission/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/notification/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store-rating/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/tag/index.ts"), exports);


/***/ }),

/***/ "./src/app/modules/mail/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/mail/services/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/mail/mail.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/mail/mail.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const mailer_1 = __webpack_require__("@nestjs-modules/mailer");
const handlebars_adapter_1 = __webpack_require__("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = __webpack_require__("@nestjs/common");
const mail_service_1 = __webpack_require__("./src/app/modules/mail/services/mail.service.ts");
const path_1 = __webpack_require__("path");
const config_1 = __webpack_require__("@nestjs/config");
let MailModule = class MailModule {
};
MailModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: (config) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        transport: config.get('mail.transport'),
                        defaults: {
                            from: `"No Reply" <${config.get('mail.from')}>`,
                        },
                        template: {
                            dir: (0, path_1.resolve)(__dirname, './assets/templates'),
                            adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                            options: {
                                strict: true,
                            },
                        },
                    });
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService], // 👈 export for DI
    })
], MailModule);
exports.MailModule = MailModule;


/***/ }),

/***/ "./src/app/modules/mail/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/mail/services/mail.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/mail/services/mail.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailService = void 0;
const tslib_1 = __webpack_require__("tslib");
const mailer_1 = __webpack_require__("@nestjs-modules/mailer");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
let MailService = class MailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    sendUserConfirmation(user, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = `${this.configService.get('host')}:${this.configService.get('port')}/api/v1/auth/verify-email?accessToken=${token}`;
            yield this.mailerService.sendMail({
                to: user.credential.email,
                // from: '"Support Team" <support@example.com>', // override default from
                subject: 'Please confirm your Email',
                template: 'verification',
                context: {
                    name: user.firstName,
                    url,
                },
            });
        });
    }
};
MailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], MailService);
exports.MailService = MailService;


/***/ }),

/***/ "./src/app/modules/notification/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/notification/controllers/notification.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/notification/controllers/notification.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const services_1 = __webpack_require__("./src/app/modules/notification/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.notification);
let NotificationController = class NotificationController {
    constructor(service) {
        this.service = service;
    }
    count({ user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getNotificationCount(user.id);
            return { status: 200, body: result };
        });
    }
    get({ params }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const notification = yield this.service.getById(params.id);
            if (!notification || notification.user.id !== user.id) {
                throw new common_1.NotFoundException();
            }
            return { status: 200, body: notification };
        });
    }
    getAll({ query }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const notifications = yield this.service.getAll(Object.assign(Object.assign({}, query), { user: user.id }));
            return { status: 200, body: notifications };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.service.delete(params.id);
            return { status: 204, body: '' };
        });
    }
    read({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.service.read(params.id);
            return { status: 202, body: '' };
        });
    }
    readAll({ user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.service.readAll(user.id);
            return { status: 202, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.count),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "count", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "get", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "delete", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.read),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "read", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.readAll),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NotificationController.prototype, "readAll", null);
NotificationController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.NotificationService !== "undefined" && services_1.NotificationService) === "function" ? _a : Object])
], NotificationController);
exports.NotificationController = NotificationController;


/***/ }),

/***/ "./src/app/modules/notification/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/notification/notification.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/notification/notification.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/notification/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/notification/services/index.ts");
const store_1 = __webpack_require__("./src/app/modules/store/index.ts");
let NotificationModule = class NotificationModule {
};
NotificationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.NotificationController],
        providers: [services_1.NotificationService, store_1.StoreService],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;


/***/ }),

/***/ "./src/app/modules/notification/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/notification/services/notification.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/notification/services/notification.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const typeorm_1 = __webpack_require__("typeorm");
let NotificationService = class NotificationService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    getNotificationCount(userId) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = { id: userId };
            const all = yield this.repository.count({
                where: {
                    user,
                    opened: false,
                },
            });
            const account = yield this.repository.count({
                where: {
                    user,
                    opened: false,
                    type: (0, typeorm_1.In)([
                        database_1.NotificationType.AccountCreated,
                        database_1.NotificationType.AccountUpdated,
                    ]),
                },
            });
            const order = yield this.repository.count({
                where: {
                    user,
                    opened: false,
                    type: (0, typeorm_1.In)([
                        database_1.NotificationType.OrderCreated,
                        database_1.NotificationType.OrderUpdated,
                        database_1.NotificationType.OrderDeleted,
                    ]),
                },
            });
            const storeOrder = yield this.repository.count({
                where: {
                    user,
                    opened: false,
                    type: (0, typeorm_1.In)([
                        database_1.NotificationType.StoreOrderCreated,
                        database_1.NotificationType.StoreOrderUpdated,
                        database_1.NotificationType.StoreOrderDeleted,
                    ]),
                },
            });
            const wallet = yield this.repository.count({
                where: {
                    user,
                    opened: false,
                    type: (0, typeorm_1.In)([
                        database_1.NotificationType.AmountReceived,
                        database_1.NotificationType.AmountSent,
                    ]),
                },
            });
            const items = (_a = (yield this.repository.paginated({
                perPage: 5,
                orderBy: 'createdAt',
                orderDir: 'DESC',
                user: userId,
            })).list) !== null && _a !== void 0 ? _a : [];
            return {
                all,
                account,
                order,
                storeOrder,
                wallet,
                items,
            };
        });
    }
    read(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const notification = yield this.repository.getById(id);
            notification.opened = true;
            yield this.repository.save(notification);
        });
    }
    readAll(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.repository.update({ user: { id: userId } }, { opened: true });
        });
    }
};
NotificationService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.NotificationRepository !== "undefined" && database_1.NotificationRepository) === "function" ? _a : Object])
], NotificationService);
exports.NotificationService = NotificationService;


/***/ }),

/***/ "./src/app/modules/order/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/order/controllers/order.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/order/controllers/order.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const services_1 = __webpack_require__("./src/app/modules/order/services/index.ts");
const services_2 = __webpack_require__("./src/app/modules/store/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.order);
let OrderController = class OrderController {
    constructor(orderService, storeService) {
        this.orderService = orderService;
        this.storeService = storeService;
    }
    create({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderService.create(body);
            return { status: 201, body: order };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderService.getById(params.id);
            if (!order) {
                return { status: 404, body: null };
            }
            return { status: 200, body: order };
        });
    }
    getAll({ query }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { unrestricted } = query, rest = tslib_1.__rest(query, ["unrestricted"]);
            if (!unrestricted && rest.storeIds) {
                const stores = yield this.storeService.getManyByIds(rest.storeIds);
                const storeIds = stores.reduce((curr, item) => {
                    return item.owner.id === user.id ? [...curr, item.id] : curr;
                }, []);
                rest.storeIds = storeIds;
            }
            else if (!unrestricted && user) {
                rest.userIds = [user.id];
            }
            else if (!(0, global_1.checkUserPermission)(user, [global_1.RolePermission.OrderGetAllUnrestricted])) {
                throw new common_1.ForbiddenException();
            }
            const users = yield this.orderService.getAll(rest);
            return { status: 200, body: users };
        });
    }
    update({ query, params, body }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { unrestricted } = query;
            const order = yield this.orderService.getById(params.id);
            if (!unrestricted &&
                order.store.owner.id !== user.id &&
                !(0, global_1.checkUserPermission)(user, [global_1.RolePermission.OrderUpdateUnrestricted])) {
                throw new common_1.ForbiddenException();
            }
            const updatedUser = yield this.orderService.update(params.id, body);
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.orderService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.OrderCreate),
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.OrderGet),
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "get", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.OrderGetAll, global_1.RolePermission.OrderGetAllUnrestricted),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.OrderUpdate),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.OrderDelete),
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
OrderController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.OrderService !== "undefined" && services_1.OrderService) === "function" ? _a : Object, typeof (_b = typeof services_2.StoreService !== "undefined" && services_2.StoreService) === "function" ? _b : Object])
], OrderController);
exports.OrderController = OrderController;


/***/ }),

/***/ "./src/app/modules/order/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/order/order.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/order/services/index.ts"), exports);


/***/ }),

/***/ "./src/app/modules/order/order.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/order/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/order/services/index.ts");
const store_1 = __webpack_require__("./src/app/modules/store/index.ts");
let OrderModule = class OrderModule {
};
OrderModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.OrderController],
        providers: [services_1.OrderService, store_1.StoreService],
    })
], OrderModule);
exports.OrderModule = OrderModule;


/***/ }),

/***/ "./src/app/modules/order/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/order/services/order.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/order/services/order.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
let OrderService = class OrderService extends core_1.BaseService {
    constructor(repository, notificationRepository) {
        super(repository);
        this.repository = repository;
        this.notificationRepository = notificationRepository;
    }
    onCreated(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.notificationRepository.createWithRelations({
                user: order.user.id,
                type: global_1.NotificationType.OrderCreated,
                metadata: {
                    orderId: order.id,
                },
            });
            yield this.notificationRepository.createWithRelations({
                user: order.store.owner.id,
                type: global_1.NotificationType.StoreOrderCreated,
                metadata: {
                    orderId: order.id,
                    storeId: order.store.id,
                },
            });
            return;
        });
    }
    onUpdated(order, prev) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const baseMetadata = {
                orderId: order.id,
            };
            if (prev.status !== order.status) {
                baseMetadata.status = order.status;
            }
            if (((_a = prev.payment) === null || _a === void 0 ? void 0 : _a.id) !== ((_b = order.payment) === null || _b === void 0 ? void 0 : _b.id)) {
                baseMetadata.amount = order.payment.totalCost;
            }
            yield this.notificationRepository.createWithRelations({
                user: order.user.id,
                type: global_1.NotificationType.OrderUpdated,
                metadata: Object.assign({}, baseMetadata),
            });
            yield this.notificationRepository.createWithRelations({
                user: order.store.owner.id,
                type: global_1.NotificationType.StoreOrderUpdated,
                metadata: Object.assign(Object.assign({}, baseMetadata), { storeId: order.store.id }),
            });
            return;
        });
    }
    onDeleted(order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.notificationRepository.createWithRelations({
                user: order.user.id,
                type: global_1.NotificationType.OrderDeleted,
                metadata: {
                    orderId: order.id,
                },
            });
            yield this.notificationRepository.createWithRelations({
                user: order.store.owner.id,
                type: global_1.NotificationType.StoreOrderDeleted,
                metadata: {
                    orderId: order.id,
                    storeId: order.store.id,
                },
            });
            return;
        });
    }
};
OrderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.OrderRepository !== "undefined" && database_1.OrderRepository) === "function" ? _a : Object, typeof (_b = typeof database_1.NotificationRepository !== "undefined" && database_1.NotificationRepository) === "function" ? _b : Object])
], OrderService);
exports.OrderService = OrderService;


/***/ }),

/***/ "./src/app/modules/payment/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/payment/controllers/payment.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/payment/controllers/payment.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const services_1 = __webpack_require__("./src/app/modules/payment/services/index.ts");
const order_1 = __webpack_require__("./src/app/modules/order/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.payment);
let PaymentController = class PaymentController {
    constructor(paymentService, orderService) {
        this.paymentService = paymentService;
        this.orderService = orderService;
    }
    create({ body }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderService.getById(body.order);
            if (order.user !== user.id && order.store.owner.id !== user.id) {
                throw new common_1.ForbiddenException();
            }
            const payment = yield this.paymentService.create(body);
            return { status: 201, body: payment };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentService.getById(params.id);
            if (!payment) {
                return { status: 404, body: null };
            }
            return { status: 200, body: payment };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.paymentService.getAll(query);
            return { status: 200, body: users };
        });
    }
    update({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.paymentService.update(params.id, body);
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.paymentService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.PaymentCreate),
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.PaymentGet),
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "get", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.PaymentGetAll),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.PaymentUpdate),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.PaymentDelete),
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "delete", null);
PaymentController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.PaymentService !== "undefined" && services_1.PaymentService) === "function" ? _a : Object, typeof (_b = typeof order_1.OrderService !== "undefined" && order_1.OrderService) === "function" ? _b : Object])
], PaymentController);
exports.PaymentController = PaymentController;


/***/ }),

/***/ "./src/app/modules/payment/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/payment/payment.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/payment/payment.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/payment/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/payment/services/index.ts");
const order_1 = __webpack_require__("./src/app/modules/order/index.ts");
let PaymentModule = class PaymentModule {
};
PaymentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.PaymentController],
        providers: [services_1.PaymentService, order_1.OrderService],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;


/***/ }),

/***/ "./src/app/modules/payment/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/payment/services/payment.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/payment/services/payment.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let PaymentService = class PaymentService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
PaymentService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.PaymentRepository !== "undefined" && database_1.PaymentRepository) === "function" ? _a : Object])
], PaymentService);
exports.PaymentService = PaymentService;


/***/ }),

/***/ "./src/app/modules/permission/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/permission/controllers/permission.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/permission/controllers/permission.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const services_1 = __webpack_require__("./src/app/modules/permission/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.permission);
let PermissionController = class PermissionController {
    constructor(service) {
        this.service = service;
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const role = yield this.service.getById(params.id);
            if (!role) {
                return { status: 404, body: null };
            }
            return { status: 200, body: role };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAll(query);
            return { status: 200, body: users };
        });
    }
};
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "get", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PermissionController.prototype, "getAll", null);
PermissionController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.PermissionService !== "undefined" && services_1.PermissionService) === "function" ? _a : Object])
], PermissionController);
exports.PermissionController = PermissionController;


/***/ }),

/***/ "./src/app/modules/permission/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/permission/permission.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/permission/permission.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/permission/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/permission/services/index.ts");
let PermissionModule = class PermissionModule {
};
PermissionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.PermissionController],
        providers: [services_1.PermissionService],
    })
], PermissionModule);
exports.PermissionModule = PermissionModule;


/***/ }),

/***/ "./src/app/modules/permission/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/permission/services/permission.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/permission/services/permission.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PermissionService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let PermissionService = class PermissionService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
PermissionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.PermissionRepository !== "undefined" && database_1.PermissionRepository) === "function" ? _a : Object])
], PermissionService);
exports.PermissionService = PermissionService;


/***/ }),

/***/ "./src/app/modules/product/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/product/controllers/product.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/product/controllers/product.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const services_1 = __webpack_require__("./src/app/modules/product/services/index.ts");
const helpers_1 = __webpack_require__("./src/app/helpers/index.ts");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const interceptors_1 = __webpack_require__("./src/app/interceptors/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.product);
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    create({ body }, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.create(Object.assign(Object.assign({}, body), { image: image === null || image === void 0 ? void 0 : image.filename }));
            return { status: 201, body: product };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.getById(params.id);
            if (!product) {
                return { status: 404, body: null };
            }
            return { status: 200, body: product };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.productService.getAll(query);
            return { status: 200, body: users };
        });
    }
    update({ params, body }, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.productService.update(params.id, Object.assign(Object.assign({}, body), { image: image === null || image === void 0 ? void 0 : image.filename }));
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.productService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.ProductCreate),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: helpers_1.uploadStorage }), interceptors_1.ParseBodyInterceptor),
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.ProductGet),
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "get", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.ProductGetAll),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.ProductUpdate),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: helpers_1.uploadStorage }), interceptors_1.ParseBodyInterceptor),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_e = typeof Express !== "undefined" && (_d = Express.Multer) !== void 0 && _d.File) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.ProductDelete),
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.ProductService !== "undefined" && services_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),

/***/ "./src/app/modules/product/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/product/product.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/product/product.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/product/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/product/services/index.ts");
let ProductModule = class ProductModule {
};
ProductModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.ProductController],
        providers: [services_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;


/***/ }),

/***/ "./src/app/modules/product/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/product/services/product.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/product/services/product.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let ProductService = class ProductService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
ProductService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.ProductRepository !== "undefined" && database_1.ProductRepository) === "function" ? _a : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),

/***/ "./src/app/modules/role/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/role/controllers/role.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/role/controllers/role.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const services_1 = __webpack_require__("./src/app/modules/role/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.role);
let RoleController = class RoleController {
    constructor(service) {
        this.service = service;
    }
    create({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const role = yield this.service.create(body);
            return { status: 201, body: role };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const role = yield this.service.getById(params.id);
            if (!role) {
                return { status: 404, body: null };
            }
            return { status: 200, body: role };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.service.getAll(query);
            return { status: 200, body: users };
        });
    }
    update({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedRole = yield this.service.update(params.id, body);
            return { status: 201, body: updatedRole };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.service.delete(params.id);
            return { status: 204, body: '' };
        });
    }
    updatePermissions({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedRole = yield this.service.updatePermissions(params.id, body.ids);
            return { status: 204, body: updatedRole };
        });
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.RoleCreate),
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "create", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.RoleGet),
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "get", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.RoleGetAll),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.RoleUpdate),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.RoleDelete),
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, auth_1.Permissions)(global_1.RolePermission.RoleUpdate),
    (0, nest_1.TsRest)(c.updatePermissions),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RoleController.prototype, "updatePermissions", null);
RoleController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.RoleService !== "undefined" && services_1.RoleService) === "function" ? _a : Object])
], RoleController);
exports.RoleController = RoleController;


/***/ }),

/***/ "./src/app/modules/role/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/role/role.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/role/role.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/role/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/role/services/index.ts");
let RoleModule = class RoleModule {
};
RoleModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.RoleController],
        providers: [services_1.RoleService],
    })
], RoleModule);
exports.RoleModule = RoleModule;


/***/ }),

/***/ "./src/app/modules/role/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/role/services/role.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/role/services/role.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RoleService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let RoleService = class RoleService extends core_1.BaseService {
    constructor(repository, permissionRepository) {
        super(repository);
        this.repository = repository;
        this.permissionRepository = permissionRepository;
    }
    updatePermissions(id, permissionIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const role = yield this.repository.findOne({
                where: { id },
                relations: { permissions: true },
            });
            const permissionIdsSet = new Set(permissionIds);
            role.permissions = role.permissions.filter(({ id }) => {
                if (permissionIdsSet.has(id)) {
                    permissionIdsSet.delete(id);
                    return true;
                }
                return false;
            });
            for (const permissionId of Array.from(permissionIdsSet)) {
                const permission = yield this.permissionRepository.findOneBy({
                    id: permissionId,
                });
                role.permissions.push(permission);
            }
            return this.repository.save(role);
        });
    }
};
RoleService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.RoleRepository !== "undefined" && database_1.RoleRepository) === "function" ? _a : Object, typeof (_b = typeof database_1.PermissionRepository !== "undefined" && database_1.PermissionRepository) === "function" ? _b : Object])
], RoleService);
exports.RoleService = RoleService;


/***/ }),

/***/ "./src/app/modules/statistic/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/statistic/controllers/statistic.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/statistic/controllers/statistic.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const services_1 = __webpack_require__("./src/app/modules/statistic/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.statistic);
let StatisticController = class StatisticController {
    constructor(service) {
        this.service = service;
    }
    dashboard({ query }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { unrestricted } = query;
            const body = {};
            body.myStoresCount = yield this.service.getStoresCount(user.id);
            body.myOrdersCount = yield this.service.getOrdersCount(user.id);
            body.myStoresOrdersCount = yield this.service.getStoresOrdersCount(user.id);
            if (unrestricted) {
                if ((0, global_1.checkUserPermission)(user, [global_1.RolePermission.UserGetAll])) {
                    body.usersCount = yield this.service.getOrdersCount();
                }
                if ((0, global_1.checkUserPermission)(user, [global_1.RolePermission.RoleGetAll])) {
                    body.rolesCount = yield this.service.getRolesCount();
                }
                if ((0, global_1.checkUserPermission)(user, [global_1.RolePermission.CategoryGetAll])) {
                    body.categoriesCount = yield this.service.getCategoriesCount();
                }
                body.storesCount = yield this.service.getStoresCount();
                body.ordersCount = yield this.service.getOrdersCount();
                body.circulatingAmount = yield this.service.getCirculatingAmount();
            }
            return { status: 200, body };
        });
    }
};
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.dashboard),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StatisticController.prototype, "dashboard", null);
StatisticController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.StatisticService !== "undefined" && services_1.StatisticService) === "function" ? _a : Object])
], StatisticController);
exports.StatisticController = StatisticController;


/***/ }),

/***/ "./src/app/modules/statistic/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/statistic/statistic.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/statistic/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/statistic/services/statistic.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/statistic/services/statistic.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
let StatisticService = class StatisticService {
    constructor(userRepository, roleRepository, storeRepository, orderRepository, categoryRepository, transactionRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.storeRepository = storeRepository;
        this.orderRepository = orderRepository;
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
    }
    getStoresCount(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const options = userId
                ? {
                    where: { owner: { id: userId } },
                }
                : undefined;
            return this.storeRepository.count(options);
        });
    }
    getOrdersCount(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const options = userId
                ? {
                    where: { user: { id: userId } },
                }
                : undefined;
            return this.orderRepository.count(options);
        });
    }
    getStoresOrdersCount(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.count({
                where: { store: { owner: { id: userId } } },
            });
        });
    }
    getUsersCount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userRepository.count();
        });
    }
    getRolesCount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.roleRepository.count();
        });
    }
    getCategoriesCount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.count();
        });
    }
    getCirculatingAmount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.transactionRepository.systemCirculatingAmount();
        });
    }
};
StatisticService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.UserRepository !== "undefined" && database_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof database_1.RoleRepository !== "undefined" && database_1.RoleRepository) === "function" ? _b : Object, typeof (_c = typeof database_1.StoreRepository !== "undefined" && database_1.StoreRepository) === "function" ? _c : Object, typeof (_d = typeof database_1.OrderRepository !== "undefined" && database_1.OrderRepository) === "function" ? _d : Object, typeof (_e = typeof database_1.CategoryRepository !== "undefined" && database_1.CategoryRepository) === "function" ? _e : Object, typeof (_f = typeof database_1.TransactionRepository !== "undefined" && database_1.TransactionRepository) === "function" ? _f : Object])
], StatisticService);
exports.StatisticService = StatisticService;


/***/ }),

/***/ "./src/app/modules/statistic/statistic.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatisticModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/statistic/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/statistic/services/index.ts");
let StatisticModule = class StatisticModule {
};
StatisticModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.StatisticController],
        providers: [services_1.StatisticService],
    })
], StatisticModule);
exports.StatisticModule = StatisticModule;


/***/ }),

/***/ "./src/app/modules/store-rating/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store-rating/controllers/store-rating.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/store-rating/controllers/store-rating.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRatingController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const services_1 = __webpack_require__("./src/app/modules/store-rating/services/index.ts");
const interceptors_1 = __webpack_require__("./src/app/interceptors/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.storeRating);
let StoreRatingController = class StoreRatingController {
    constructor(storeRatingService) {
        this.storeRatingService = storeRatingService;
    }
    create({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(body);
            const store = yield this.storeRatingService.create(body);
            return { status: 201, body: store };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const store = yield this.storeRatingService.getById(params.id);
            if (!store) {
                return { status: 404, body: null };
            }
            return { status: 200, body: store };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const stores = yield this.storeRatingService.getAll(query);
            return { status: 200, body: stores };
        });
    }
    update({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.storeRatingService.update({
                userId: body.user,
                storeId: body.store,
            }, body);
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.storeRatingService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "create", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "get", null);
tslib_1.__decorate([
    (0, guards_1.AllowUnauthorize)(),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.ParseBodyInterceptor),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "update", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreRatingController.prototype, "delete", null);
StoreRatingController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.StoreRatingService !== "undefined" && services_1.StoreRatingService) === "function" ? _a : Object])
], StoreRatingController);
exports.StoreRatingController = StoreRatingController;


/***/ }),

/***/ "./src/app/modules/store-rating/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store-rating/store-rating.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store-rating/services/index.ts"), exports);


/***/ }),

/***/ "./src/app/modules/store-rating/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store-rating/services/store-rating.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/store-rating/services/store-rating.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRatingService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let StoreRatingService = class StoreRatingService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
StoreRatingService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.StoreRatingRepository !== "undefined" && database_1.StoreRatingRepository) === "function" ? _a : Object])
], StoreRatingService);
exports.StoreRatingService = StoreRatingService;


/***/ }),

/***/ "./src/app/modules/store-rating/store-rating.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreRatingModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/store-rating/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/store-rating/services/index.ts");
let StoreRatingModule = class StoreRatingModule {
};
StoreRatingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.StoreRatingController],
        providers: [services_1.StoreRatingService],
    })
], StoreRatingModule);
exports.StoreRatingModule = StoreRatingModule;


/***/ }),

/***/ "./src/app/modules/store/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store/controllers/store.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/store/controllers/store.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const services_1 = __webpack_require__("./src/app/modules/store/services/index.ts");
const platform_express_1 = __webpack_require__("@nestjs/platform-express");
const helpers_1 = __webpack_require__("./src/app/helpers/index.ts");
const interceptors_1 = __webpack_require__("./src/app/interceptors/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.store);
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    create({ body }, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const store = yield this.storeService.create(Object.assign(Object.assign({}, body), { image: image === null || image === void 0 ? void 0 : image.filename }));
            return { status: 201, body: store };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const store = yield this.storeService.getById(params.id);
            if (!store) {
                return { status: 404, body: null };
            }
            return { status: 200, body: store };
        });
    }
    getAll({ query }, { user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { unrestricted } = query, rest = tslib_1.__rest(query, ["unrestricted"]);
            if (!unrestricted && user) {
                rest.owner = user.id;
            }
            const stores = yield this.storeService.getAll(rest);
            return { status: 200, body: stores };
        });
    }
    update({ params, body }, image) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.storeService.update(params.id, Object.assign(Object.assign({}, body), { image: image === null || image === void 0 ? void 0 : image.filename }));
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.storeService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.StoreCreate),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: helpers_1.uploadStorage }), interceptors_1.ParseBodyInterceptor),
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "create", null);
tslib_1.__decorate([
    (0, guards_1.AllowUnauthorize)(),
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "get", null);
tslib_1.__decorate([
    (0, guards_1.AllowUnauthorize)(),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.StoreUpdate),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: helpers_1.uploadStorage }), interceptors_1.ParseBodyInterceptor),
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_e = typeof Express !== "undefined" && (_d = Express.Multer) !== void 0 && _d.File) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "update", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.StoreDelete),
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StoreController.prototype, "delete", null);
StoreController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.StoreService !== "undefined" && services_1.StoreService) === "function" ? _a : Object])
], StoreController);
exports.StoreController = StoreController;


/***/ }),

/***/ "./src/app/modules/store/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store/store.module.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store/services/index.ts"), exports);


/***/ }),

/***/ "./src/app/modules/store/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/store/services/store.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/store/services/store.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let StoreService = class StoreService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
StoreService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.StoreRepository !== "undefined" && database_1.StoreRepository) === "function" ? _a : Object])
], StoreService);
exports.StoreService = StoreService;


/***/ }),

/***/ "./src/app/modules/store/store.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/store/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/store/services/index.ts");
let StoreModule = class StoreModule {
};
StoreModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.StoreController],
        providers: [services_1.StoreService],
    })
], StoreModule);
exports.StoreModule = StoreModule;


/***/ }),

/***/ "./src/app/modules/tag/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/tag/controllers/tag.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/tag/controllers/tag.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const services_1 = __webpack_require__("./src/app/modules/tag/services/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.tag);
let TagController = class TagController {
    constructor(tagService) {
        this.tagService = tagService;
    }
    create({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tag = yield this.tagService.create(body);
            return { status: 201, body: tag };
        });
    }
    get({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tag = yield this.tagService.getById(params.id);
            if (!tag) {
                return { status: 404, body: null };
            }
            return { status: 200, body: tag };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categories = yield this.tagService.getAll(query);
            return { status: 200, body: categories };
        });
    }
    update({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.tagService.update(params.id, body);
            return { status: 201, body: updatedUser };
        });
    }
    delete({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.tagService.delete(params.id);
            return { status: 204, body: '' };
        });
    }
};
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.create),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "create", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.get),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "get", null);
tslib_1.__decorate([
    (0, guards_1.AllowUnauthorize)(),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.update),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "update", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.delete),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TagController.prototype, "delete", null);
TagController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.TagService !== "undefined" && services_1.TagService) === "function" ? _a : Object])
], TagController);
exports.TagController = TagController;


/***/ }),

/***/ "./src/app/modules/tag/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/tag/tag.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/tag/services/category.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let TagService = class TagService extends core_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
TagService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.TagRepository !== "undefined" && database_1.TagRepository) === "function" ? _a : Object])
], TagService);
exports.TagService = TagService;


/***/ }),

/***/ "./src/app/modules/tag/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/tag/services/category.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/tag/tag.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TagModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/tag/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/tag/services/index.ts");
let TagModule = class TagModule {
};
TagModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.TagController],
        providers: [services_1.TagService],
    })
], TagModule);
exports.TagModule = TagModule;


/***/ }),

/***/ "./src/app/modules/transaction/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/transaction/controllers/transaction.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/transaction/controllers/transaction.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const services_1 = __webpack_require__("./src/app/modules/transaction/services/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.transaction);
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    balance({ user }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionService.balance(user.id);
            return { status: 200, body: result };
        });
    }
    generate({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionService.generate(body);
            return { status: 201, body: result };
        });
    }
    transfer({ user }, { body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionService.transfer(body, user.id);
            return { status: 201, body: result };
        });
    }
    getAll({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionService.getAll(query);
            return { status: 200, body: result };
        });
    }
    pay({ user }, { body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.transactionService.pay(body, user.id);
            return { status: 201, body: result };
        });
    }
};
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.TransactionBalance),
    (0, nest_1.TsRest)(c.balance),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "balance", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.TransactionGenerate),
    (0, nest_1.TsRest)(c.generate),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "generate", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.TransactionTransfer),
    (0, nest_1.TsRest)(c.transfer),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "transfer", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.TransactionGetTransactions),
    (0, nest_1.TsRest)(c.getAll),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, nest_1.TsRest)(c.pay),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TransactionController.prototype, "pay", null);
TransactionController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.TransactionService !== "undefined" && services_1.TransactionService) === "function" ? _a : Object])
], TransactionController);
exports.TransactionController = TransactionController;


/***/ }),

/***/ "./src/app/modules/transaction/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/transaction/services/index.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./src/app/modules/transaction/transaction.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/transaction/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/transaction/services/transaction.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/transaction/services/transaction.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let TransactionService = class TransactionService extends core_1.BaseService {
    constructor(repository, userRepository, orderRepository, paymentRepository, notificationRepository) {
        super(repository);
        this.repository = repository;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.paymentRepository = paymentRepository;
        this.notificationRepository = notificationRepository;
    }
    balance(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const balance = yield this.repository.balance(userId);
            return { balance };
        });
    }
    generate(input) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const receiverData = yield this.userRepository.findOneBy({
                uniqueCode: input.receiver,
            });
            if (!receiverData)
                throw new common_1.BadRequestException("The user doesn't exists");
            const transaction = this.repository.create({
                receiver: { id: receiverData.id },
                amount: input.amount,
            });
            const createdTransaction = yield this.repository.save(transaction);
            yield this.notificationRepository.createWithRelations({
                type: global_1.NotificationType.AmountReceived,
                user: receiverData.id,
                metadata: {
                    amount: input.amount,
                },
            });
            return createdTransaction;
        });
    }
    transfer(input, sender) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const receiverData = yield this.userRepository.findOneBy({
                uniqueCode: input.receiver,
            });
            if (!receiverData)
                throw new common_1.BadRequestException("The user doesn't exists");
            const result = yield this.balance(sender);
            if (input.amount > +((_a = result === null || result === void 0 ? void 0 : result.balance) !== null && _a !== void 0 ? _a : 0)) {
                throw new common_1.BadRequestException('Balance is not enough');
            }
            if (input.receiver === sender) {
                throw new common_1.BadRequestException("Can't send amount to yourself");
            }
            const transaction = this.repository.create({
                receiver: { id: receiverData.id },
                sender: { id: sender },
                amount: input.amount,
            });
            const createdTransaction = yield this.repository.save(transaction);
            yield this.notificationRepository.createWithRelations({
                type: global_1.NotificationType.AmountReceived,
                user: receiverData.id,
                metadata: {
                    amount: input.amount,
                    userId: sender,
                },
            });
            yield this.notificationRepository.createWithRelations({
                type: global_1.NotificationType.AmountSent,
                user: sender,
                metadata: {
                    amount: input.amount,
                    userId: receiverData.id,
                },
            });
            return createdTransaction;
        });
    }
    pay(input, sender) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderData = yield this.orderRepository.findOne({
                where: {
                    id: input.orderId,
                },
                relations: ['store', 'store.owner'],
            });
            if (!orderData)
                throw new common_1.BadRequestException("The order doesn't exists");
            const result = yield this.balance(sender);
            const reducer = (curr, item) => {
                return curr + item.price * item.count;
            };
            const totalCost = orderData.items.reduce(reducer, 0);
            if (totalCost > +((_a = result === null || result === void 0 ? void 0 : result.balance) !== null && _a !== void 0 ? _a : 0)) {
                throw new common_1.BadRequestException('Balance is not enough');
            }
            const transaction = this.repository.create({
                receiver: { id: orderData.store.owner.id },
                sender: { id: sender },
                amount: totalCost,
            });
            const createdTransaction = yield this.repository.save(transaction);
            const payment = this.paymentRepository.create({
                order: { id: orderData.id },
                amountPaid: totalCost,
                totalCost,
                change: 0,
                type: global_1.PaymentType.Online,
            });
            yield this.paymentRepository.save(payment);
            yield this.notificationRepository.createWithRelations({
                type: global_1.NotificationType.AmountReceived,
                user: transaction.receiver.id,
                metadata: {
                    orderId: orderData.id,
                    storeId: orderData.store.id,
                    amount: totalCost,
                    userId: sender,
                },
            });
            yield this.notificationRepository.createWithRelations({
                type: global_1.NotificationType.AmountSent,
                user: sender,
                metadata: {
                    orderId: orderData.id,
                    amount: totalCost,
                    userId: transaction.receiver.id,
                },
            });
            return createdTransaction;
        });
    }
};
TransactionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.TransactionRepository !== "undefined" && database_1.TransactionRepository) === "function" ? _a : Object, typeof (_b = typeof database_1.UserRepository !== "undefined" && database_1.UserRepository) === "function" ? _b : Object, typeof (_c = typeof database_1.OrderRepository !== "undefined" && database_1.OrderRepository) === "function" ? _c : Object, typeof (_d = typeof database_1.PaymentRepository !== "undefined" && database_1.PaymentRepository) === "function" ? _d : Object, typeof (_e = typeof database_1.NotificationRepository !== "undefined" && database_1.NotificationRepository) === "function" ? _e : Object])
], TransactionService);
exports.TransactionService = TransactionService;


/***/ }),

/***/ "./src/app/modules/transaction/transaction.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransactionModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/transaction/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/transaction/services/index.ts");
let TransactionModule = class TransactionModule {
};
TransactionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [controllers_1.TransactionController],
        providers: [services_1.TransactionService],
    })
], TransactionModule);
exports.TransactionModule = TransactionModule;


/***/ }),

/***/ "./src/app/modules/user/controllers/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/user/controllers/user.controller.ts"), exports);


/***/ }),

/***/ "./src/app/modules/user/controllers/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nest_1 = __webpack_require__("@ts-rest/nest");
const common_1 = __webpack_require__("@nestjs/common");
const global_1 = __webpack_require__("../../lib/global/src/index.ts");
const services_1 = __webpack_require__("./src/app/modules/user/services/index.ts");
const guards_1 = __webpack_require__("./src/app/modules/auth/guards/index.ts");
const auth_1 = __webpack_require__("./src/app/modules/auth/index.ts");
const c = (0, nest_1.nestControllerContract)(global_1.contract.user);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser({ body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = yield this.userService.create(body);
            return { status: 201, body: post };
        });
    }
    getUser({ params }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const post = yield this.userService.getById(params.id);
            if (!post) {
                return { status: 404, body: null };
            }
            return { status: 200, body: post };
        });
    }
    getUsers({ query }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAll(query);
            return { status: 200, body: users };
        });
    }
    updateUser({ user }, { params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (user.id !== params.id &&
                !(0, global_1.checkUserPermission)(user, [global_1.RolePermission.UserUpdateUnrestricted])) {
                throw new common_1.ForbiddenException();
            }
            const updatedUser = yield this.userService.update(params.id, body);
            return { status: 201, body: updatedUser };
        });
    }
    assignRole({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userService.assignRole(params.id, body.roleId);
            return { status: 201, body: updatedUser };
        });
    }
    unassignRole({ params, body }) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userService.unassignRole(params.id, body.roleId);
            return { status: 201, body: updatedUser };
        });
    }
};
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.UserCreate),
    (0, nest_1.TsRest)(c.createUser),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.UserGet),
    (0, nest_1.TsRest)(c.getUser),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.UserGetAll),
    (0, nest_1.TsRest)(c.getUsers),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.UserUpdate, global_1.RolePermission.UserUpdateUnrestricted),
    (0, nest_1.TsRest)(c.updateUser),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.UserUpdate, global_1.RolePermission.UserUpdateUnrestricted),
    (0, nest_1.TsRest)(c.assignRole),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "assignRole", null);
tslib_1.__decorate([
    (0, auth_1.Permissions)(global_1.RolePermission.UserUpdate, global_1.RolePermission.UserUpdateUnrestricted),
    (0, nest_1.TsRest)(c.unassignRole),
    tslib_1.__param(0, (0, nest_1.TsRestRequest)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "unassignRole", null);
UserController = tslib_1.__decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.PermissionGuard),
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof services_1.UserService !== "undefined" && services_1.UserService) === "function" ? _a : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./src/app/modules/user/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/user/user.module.ts"), exports);


/***/ }),

/***/ "./src/app/modules/user/services/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./src/app/modules/user/services/user.service.ts"), exports);


/***/ }),

/***/ "./src/app/modules/user/services/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const database_1 = __webpack_require__("./src/app/database/index.ts");
const core_1 = __webpack_require__("./src/app/core/index.ts");
let UserService = class UserService extends core_1.BaseService {
    constructor(repository, roleRepository) {
        super(repository);
        this.repository = repository;
        this.roleRepository = roleRepository;
    }
    assignRole(id, roleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getById(id);
            const role = yield this.roleRepository.findOneBy({ id: roleId });
            user.roles.push(role);
            return this.repository.save(user);
        });
    }
    unassignRole(id, roleId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.repository.getById(id);
            user.roles = user.roles.filter((role) => role.id !== roleId);
            return this.repository.save(user);
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof database_1.UserRepository !== "undefined" && database_1.UserRepository) === "function" ? _a : Object, typeof (_b = typeof database_1.RoleRepository !== "undefined" && database_1.RoleRepository) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./src/app/modules/user/user.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const controllers_1 = __webpack_require__("./src/app/modules/user/controllers/index.ts");
const services_1 = __webpack_require__("./src/app/modules/user/services/index.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [controllers_1.UserController],
        providers: [services_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "@nestjs-modules/mailer":
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),

/***/ "@nestjs-modules/mailer/dist/adapters/handlebars.adapter":
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/jwt":
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/platform-express":
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@ts-rest/core":
/***/ ((module) => {

module.exports = require("@ts-rest/core");

/***/ }),

/***/ "@ts-rest/nest":
/***/ ((module) => {

module.exports = require("@ts-rest/nest");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "express":
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "multer":
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ "passport-jwt":
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),

/***/ "rxjs/operators":
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "typeorm-extension":
/***/ ((module) => {

module.exports = require("typeorm-extension");

/***/ }),

/***/ "typeorm-naming-strategies":
/***/ ((module) => {

module.exports = require("typeorm-naming-strategies");

/***/ }),

/***/ "zod":
/***/ ((module) => {

module.exports = require("zod");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./src/app/app.module.ts");
const configuration_1 = tslib_1.__importDefault(__webpack_require__("./src/app/config/configuration.ts"));
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        // const globalPrefix = 'api/v1';
        // app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        const port = (0, configuration_1.default)().port;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map