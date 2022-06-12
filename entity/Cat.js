import typeorm from "typeorm";

const { EntitySchema } = typeorm;

export default new EntitySchema({
        name: "Category",
        tableName: "categorys",
        columns: {
            id: {
            primary: true,
            type: "int",
            generated: true,
            },
            category: {
                type: "varchar",
            },
            enabled: {
            type: "boolean",
            },
        },
        relations: {
            users: {
                target: "User",
                type: "many-to-one",
                joinTable: true,
                cascade: true,
                inverseSide: "Category",
            }
        }
});
