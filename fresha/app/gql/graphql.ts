/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ObjMap: { input: any; output: any; }
};

export type Appointments_Appointment = {
  __typename?: 'Appointments_Appointment';
  customer?: Maybe<Customers__Customer>;
  id: Scalars['Float']['output'];
  price: Appointments_Price;
};

export type Appointments_AppointmentsResponseDto = {
  __typename?: 'Appointments_AppointmentsResponseDto';
  data: Array<Maybe<Appointments_Appointment>>;
};

export enum Appointments_HttpMethod {
  Connect = 'CONNECT',
  Delete = 'DELETE',
  Get = 'GET',
  Head = 'HEAD',
  Options = 'OPTIONS',
  Patch = 'PATCH',
  Post = 'POST',
  Put = 'PUT',
  Trace = 'TRACE'
}

export type Appointments_Price = {
  __typename?: 'Appointments_Price';
  currency: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export enum ConnectivityState {
  Connecting = 'CONNECTING',
  Idle = 'IDLE',
  Ready = 'READY',
  Shutdown = 'SHUTDOWN',
  TransientFailure = 'TRANSIENT_FAILURE'
}

export type Price = {
  __typename?: 'Price';
  foorency: Scalars['String']['output'];
  value: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  /**
   *
   * >**Method**: `GET`
   * >**Base URL**: `http://localhost:3001/`
   * >**Path**: `/appointments`
   *
   *
   */
  AppController_getAppointments?: Maybe<Appointments_AppointmentsResponseDto>;
  customers_CustomersService_FindOne?: Maybe<Customers__Customer>;
  customers_CustomersService_FindOneByAppointmentId?: Maybe<Customers__Customer>;
  customers_CustomersService_connectivityState?: Maybe<ConnectivityState>;
  sales: Array<Sale>;
};


export type QueryCustomers_CustomersService_FindOneArgs = {
  input?: InputMaybe<Customers__CustomerById_Input>;
};


export type QueryCustomers_CustomersService_FindOneByAppointmentIdArgs = {
  input?: InputMaybe<Customers__CustomerByAppointmentId_Input>;
};


export type QueryCustomers_CustomersService_ConnectivityStateArgs = {
  tryToConnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Sale = {
  __typename?: 'Sale';
  id: Scalars['ID']['output'];
  price: Price;
};

export type Customers__Customer = {
  __typename?: 'customers__Customer';
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Customers__CustomerByAppointmentId_Input = {
  appointmentId?: InputMaybe<Scalars['Int']['input']>;
};

export type Customers__CustomerById_Input = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type AppointmentsssQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsssQuery = { __typename?: 'Query', AppController_getAppointments?: { __typename?: 'Appointments_AppointmentsResponseDto', data: Array<{ __typename?: 'Appointments_Appointment', id: number, customer?: { __typename?: 'customers__Customer', name?: string | null } | null, price: { __typename?: 'Appointments_Price', currency: string, value: number } } | null> } | null };


export const AppointmentsssDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"appointmentsss"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"AppController_getAppointments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AppointmentsssQuery, AppointmentsssQueryVariables>;