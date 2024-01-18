import { YamlConfig } from "@graphql-mesh/types";
import {
  AdditionalStitchingBatchResolverObject,
  AdditionalStitchingResolverObject,
  AdditionalSubscriptionObject,
} from "@graphql-mesh/types/typings/config";
import { Query, MeshContext, Resolvers } from "../.mesh";

type ServiceDescription = YamlConfig.Source;
type AdditionalResolver =
  | AdditionalStitchingResolverObject
  | AdditionalStitchingBatchResolverObject
  | AdditionalSubscriptionObject;

type QueryType = "Query" | "Mutation" | "Subscription";

type StrictResolverTypes = {
  typeName: keyof Resolvers;
  sourceName: keyof MeshContext;
  sourceTypeName: QueryType;
  sourceFieldName: keyof Query;
};

type SingleResolver = Omit<
  AdditionalStitchingResolverObject,
  "targetTypeName" | "targetFieldName"
> &
  StrictResolverTypes;

type BatchedResolver = Omit<
  AdditionalStitchingBatchResolverObject,
  "targetTypeName" | "targetFieldName"
> &
  StrictResolverTypes;

type SubscriptionResolver = Omit<
  AdditionalSubscriptionObject,
  "targetTypeName" | "targetFieldName"
> &
  StrictResolverTypes;

type AnyResolver = SingleResolver | BatchedResolver | SubscriptionResolver;

type Connection = {
  additionalResolvers: AdditionalResolver;
  additionalTypeDefs: string;
};

export const describe = (source: YamlConfig.Source): ServiceDescription =>
  source;

export const expose = (definition: SingleResolver): SingleResolver =>
  definition;

export const exposeBatch = (definition: BatchedResolver): BatchedResolver =>
  definition;

export const exposeSubscription = (
  definition: SubscriptionResolver,
): SubscriptionResolver => definition;

export const connect = (
  targetTypeName: keyof Resolvers,
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
