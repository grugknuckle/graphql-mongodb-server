export default `
  type Quote {
    _id: ID!
    body: String!
    source: String!
    author: String!
    tags: [String!]!
    votes: Int!
  }

  type Query {
    quote(_id: ID!): Quote!
    quotes: [Quote!]!
  }

  type Mutation {
    createQuote(quote: CreateQuoteInput): Quote!
    updateQuote(_id: ID!, quote: UpdateQuoteInput): Quote!
    deleteQuote(_id: ID!): Quote!
  }

  type Subscription {
    quote: QuoteSubscriptionPayload!
  }

  type QuoteSubscriptionPayload {
    mutation: MutationType!
    quote: Quote!
  }

  input CreateQuoteInput {
    body: String!
    author: String!
    source: String!
    tags: [String!]!
  }
  
  input UpdateQuoteInput {
    body: String,
    author: String
    source: String
    tags: [String]
    votes: Int
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;