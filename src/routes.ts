import { Router } from "express";
import PermissionController from "./controllers/PermissionController";
import ProductController from "./controllers/ProductController";
import RoleController from "./controllers/RoleController";
import SessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";

import { is } from "./middlewares/permission";

const routes = Router();

//USER
routes.post('/user', UserController.create)

//SESSIONS
routes.post("/sessions", SessionController.create);

//PERMISSIONS
routes.post("/permissions", PermissionController.create);

//ROLE
routes.post("/role", RoleController.create);

//PRODUCT
routes.post("/products",is(["ROLE_ADMIN", "ROLE_ADMIN_FULL"]), ProductController.create);
routes.get("/products",is(["ROLE_ADMIN", "ROLE_USER", "ROLE_ADMIN_FULL"]), ProductController.index);
routes.get("/products/:id",is(["ROLE_ADMIN", "ROLE_USER", "ROLE_ADMIN_FULL"]), ProductController.show);

export { routes };