export type SearchFullTextExpression = {
  fullText: {
    field: string;
    language: string;
    value: string;
    mustMatch?: 'any' | 'all';
  };
};

export type SearchExactExpression = {
  exact: {
    field: string;
    value: string;
    fieldType?: string;
  };
};

export type SearchRangeExpression = {
  range: {
    field: string;
    fieldType: string;
    gte?: number;
    lte?: number;
  };
};

export type SearchExpression = SearchFullTextExpression | SearchExactExpression | SearchRangeExpression;
export type SearchQuery = SearchExpression | { and: SearchExpression[] };