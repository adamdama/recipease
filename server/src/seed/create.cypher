CREATE CONSTRAINT recipe_must_have_id
ON (n:Recipe)
ASSERT EXISTS (n.id)

CREATE CONSTRAINT recipe_unique_id
ON (n:Recipe)
ASSERT n.id IS UNIQUE

CREATE (n:Recipe {id:'bbacabd9-e0f4-46ca-9165-88e6c2abd0d8', title: 'Best Recipe', description: 'Delicious', method: ['Put it in the oven']})
CREATE (n:Recipe {id:'bbacabd9-e0f4-46ca-9165-88e6c2abd0d9', title: 'Favourite Recipe', description: 'Lovely', method: ['Put it in the oven']})