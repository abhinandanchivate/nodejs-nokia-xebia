import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import AssetModel from "../models/Assetsmodel.js";
import UserModel from "../models/Usersmodel.js";
import RoleModel from "../models/Rolemodel.js";
import { checkRole } from "../utils/rbac.js";

console.log("AssetModel name:", AssetModel.modelName); // Should print 'Asset'

// Create type composers from Mongoose models
const AssetTC = composeWithMongoose(AssetModel, { schemaComposer });
const UserTC = composeWithMongoose(UserModel, { schemaComposer });
const RoleTC = composeWithMongoose(RoleModel, { schemaComposer });

// RBAC wrapper
const rbacResolver = (resolver, allowedRoles = []) =>
  resolver.wrapResolve((next) => async (rp) => {
    checkRole(rp.context.user, allowedRoles);
    return next(rp);
  });

console.log("AssetTC keys:", Object.keys(AssetTC));

//  Register queries using getResolver()
schemaComposer.Query.addFields({
  assetById: rbacResolver(AssetTC.getResolver("findById"), [
    "admin",
    "manager",
    "viewer",
  ]),
  assetMany: rbacResolver(AssetTC.getResolver("findMany"), [
    "admin",
    "manager",
    "viewer",
  ]),
  userById: rbacResolver(UserTC.getResolver("findById"), ["admin"]),
  userMany: rbacResolver(UserTC.getResolver("findMany"), ["admin"]),
  roleMany: rbacResolver(RoleTC.getResolver("findMany"), ["admin"]),
});

//  Register mutations using getResolver()
schemaComposer.Mutation.addFields({
  assetCreate: rbacResolver(AssetTC.getResolver("createOne"), [
    "admin",
    "manager",
  ]),
  assetUpdateById: rbacResolver(AssetTC.getResolver("updateById"), ["admin"]),
  assetRemoveById: rbacResolver(AssetTC.getResolver("removeById"), ["admin"]),

  userCreate: rbacResolver(UserTC.getResolver("createOne"), ["admin"]),
  userUpdateById: rbacResolver(UserTC.getResolver("updateById"), ["admin"]),
  userRemoveById: rbacResolver(UserTC.getResolver("removeById"), ["admin"]),

  roleCreate: rbacResolver(RoleTC.getResolver("createOne"), ["admin"]),
  roleUpdateById: rbacResolver(RoleTC.getResolver("updateById"), ["admin"]),
  roleRemoveById: rbacResolver(RoleTC.getResolver("removeById"), ["admin"]),
});

//  Build the schema
export const graphqlSchema = schemaComposer.buildSchema();
