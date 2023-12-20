import { YamlConfig } from "@graphql-mesh/types";
import {
  AdditionalStitchingBatchResolverObject,
  AdditionalStitchingResolverObject,
  AdditionalSubscriptionObject,
} from "@graphql-mesh/types/typings/config";
import { ResolversParentTypes, Query } from "../.mesh";

type ServiceDescription = YamlConfig.Source;
// TODO create a typed version, now all fields are just strings
type additionalResolver =
  | AdditionalStitchingResolverObject
  | AdditionalStitchingBatchResolverObject
  | AdditionalSubscriptionObject;

type TypeName = {
  typeName: string;
};

type SingleResolver = Omit<
  AdditionalStitchingResolverObject,
  "targetTypeName" | "targetFieldName"
> &
  TypeName & { sourceFieldName: keyof Query };

type BatchedResolver = Omit<
  AdditionalStitchingBatchResolverObject,
  "targetTypeName" | "targetFieldName"
> &
  TypeName & { sourceFieldName: keyof Query };

type SubscriptionResolver = Omit<
  AdditionalSubscriptionObject,
  "targetTypeName" | "targetFieldName"
> &
  TypeName & { sourceFieldName: keyof Query };

type AnyResolver = SingleResolver | BatchedResolver | SubscriptionResolver;

type Connection = {
  additionalResolvers: additionalResolver;
  additionalTypeDefs: string;
};

export const describe = (source: YamlConfig.Source): ServiceDescription =>
  source;

export const expose = (
  definition: AdditionalStitchingResolverObject,
): AdditionalStitchingResolverObject => definition;

export const exposeBatch = (definition: BatchedResolver): BatchedResolver =>
  definition;

export const exposeSubscription = (
  definition: AdditionalSubscriptionObject,
): AdditionalSubscriptionObject => definition;

export const connect = (
  targetTypeName: keyof ResolversParentTypes,
  targetFieldName: string,
  fieldResolver: AnyResolver,
): Connection => {
  return {
    additionalTypeDefs: `
    extend type ${targetTypeName} {
      ${targetFieldName}: ${fieldResolver.typeName}
    }
  `,
    additionalResolvers: {
      targetTypeName,
      targetFieldName,
      ...fieldResolver,
    },
  };
};

export const init = (
  services: ServiceDescription[],
  connections: Connection[],
): Pick<
  YamlConfig.Config,
  "sources" | "additionalResolvers" | "additionalTypeDefs"
> => {
  return {
    sources: services,
    additionalResolvers: connections.map(
      (connection) => connection.additionalResolvers,
    ),
    additionalTypeDefs: connections
      .map((connection) => connection.additionalTypeDefs)
      .join("\n"),
  };
};
