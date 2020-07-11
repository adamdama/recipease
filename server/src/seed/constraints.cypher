CREATE CONSTRAINT recipe_must_have_id
ON (n:Recipe)
ASSERT EXISTS (n.id);

CREATE CONSTRAINT recipe_unique_id
ON (n:Recipe)
ASSERT n.id IS UNIQUE;

CREATE CONSTRAINT user_must_have_id
ON (n:User)
ASSERT EXISTS (n.id);

CREATE CONSTRAINT user_unique_id
ON (n:User)
ASSERT n.id IS UNIQUE;