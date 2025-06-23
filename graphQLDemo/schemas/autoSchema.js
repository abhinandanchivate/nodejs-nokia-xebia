// it should use mongoose schema to work with graphql instead of redefing the schema.
import { schemaComposer } from "graphql-compose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import AssetModel from "../models/Assetsmodel.js";
import UserModel from "../models/Usersmodel.js";
import RoleModel from "../models/Rolemodel.js";
import { checkRole } from "../utils/rbac.js";

const AssetTC = composeWithMongoose(AssetModel);
const UserTC = composeWithMongoose(UserModel);
const RoleTC = composeWithMongoose(RoleModel);

const rbacResolver = (resolver, allowedRoles = []) =>
  resolver.wrapResolve((next) => async (rp) => {
    checkRole(rp.context.user, allowedRoles);
    return next(rp);
  });

schemaComposer.Query.addFields({
  assetById: rbacResolver(AssetTC.mongooseResolvers.findById(), [
    "admin",
    "manager",
    "viewer",
  ]),
  assetMany: rbacResolver(AssetTC.mongooseResolvers.findMany(), [
    "admin",
    "manager",
    "viewer",
  ]),
  userById: rbacResolver(UserTC.mongooseResolvers.findById(), ["admin"]),
  userMany: rbacResolver(UserTC.mongooseResolvers.findMany(), ["admin"]),
  roleMany: rbacResolver(RoleTC.mongooseResolvers.findMany(), ["admin"]),
});

schemaComposer.Mutation.addFields({
  assetCreate: rbacResolver(AssetTC.mongooseResolvers.createOne(), [
    "admin",
    "manager",
  ]),
  assetUpdateById: rbacResolver(AssetTC.mongooseResolvers.updateById(), [
    "admin",
  ]),
  assetRemoveById: rbacResolver(AssetTC.mongooseResolvers.removeById(), [
    "admin",
  ]),
  userCreate: rbacResolver(UserTC.mongooseResolvers.createOne(), ["admin"]),
  userUpdateById: rbacResolver(UserTC.mongooseResolvers.updateById(), [
    "admin",
  ]),
  userRemoveById: rbacResolver(UserTC.mongooseResolvers.removeById(), [
    "admin",
  ]),
  roleCreate: rbacResolver(RoleTC.mongooseResolvers.createOne(), ["admin"]),
  roleUpdateById: rbacResolver(RoleTC.mongooseResolvers.updateById(), [
    "admin",
  ]),
  roleRemoveById: rbacResolver(RoleTC.mongooseResolvers.removeById(), [
    "admin",
  ]),
});

export const graphqlSchema = schemaComposer.buildSchema();
