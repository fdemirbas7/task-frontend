import gql from 'graphql-tag';

export const GET_EVENTS = gql`
  query {
    events {
      name
      leadId
      value
    }
  }
`;

export const GET_EVENT = gql`
  query event($leadId: ID!) {
    event(leadId: $leadId) {
      name
      leadId
      value
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($name: String!, $leadId: ID!) {
    createEvent(name: $name, leadId: $leadId) {
      name
      leadId
      value
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($leadId: ID!, $payload: Int!) {
    updateEvent(leadId: $leadId, payload: $payload) {
      name
      leadId
      value
    }
  }
`;

export const EVENT_SUBSCRIPTION = gql`
  subscription {
    eventUpdated {
      leadId
      value
    }
  }
`;
